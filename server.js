import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all domains (allows GitHub Pages and multiple client PCs to talk to this backend)
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control', 'Pragma', 'Expires']
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Paths
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'students.json');
const backupDir = path.join(dataDir, 'backups');
if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
}

// Ensure database file exists
if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, '[]', 'utf8');
}

// -------------------------------------------------------------
// Database Helper Functions
// -------------------------------------------------------------
function readStudentsDB() {
    try {
        if (!fs.existsSync(dbPath)) return [];
        let raw = fs.readFileSync(dbPath, 'utf8');
        if (raw.charCodeAt(0) === 0xFEFF) {
            raw = raw.slice(1);
        }
        const parsed = JSON.parse(raw.trim());
        return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
        console.error('Error reading students database:', err.message);
        return [];
    }
}

function writeStudentsDB(students) {
    if (!Array.isArray(students)) return false;
    try {
        // Rolling backup (keep up to 10 backups)
        if (fs.existsSync(dbPath)) {
            const backupFile = path.join(backupDir, `students_backup_${Date.now()}.json`);
            fs.copyFileSync(dbPath, backupFile);
            
            // Clean up old backups
            const backups = fs.readdirSync(backupDir)
                .filter(f => f.startsWith('students_backup_'))
                .sort()
                .reverse();
            if (backups.length > 10) {
                backups.slice(10).forEach(old => {
                    try { fs.unlinkSync(path.join(backupDir, old)); } catch(e) {}
                });
            }
        }

        // Atomic write: write to temp file then rename
        const tempPath = dbPath + '.tmp';
        fs.writeFileSync(tempPath, JSON.stringify(students, null, 4), 'utf8');
        fs.renameSync(tempPath, dbPath);
        return true;
    } catch (err) {
        console.error('Error writing students database:', err.message);
        return false;
    }
}

// Intelligent bidirectional CRDT merge
function mergeStudentDatasets(localList, incomingList) {
    if (!Array.isArray(localList)) localList = [];
    if (!Array.isArray(incomingList)) incomingList = [];

    const map = new Map();

    const getKey = (s) => {
        if (!s) return '';
        const roll = (s.rollNumber || '').trim().toUpperCase();
        if (roll) return 'ROLL:' + roll;
        if (s.id) return 'ID:' + String(s.id).trim();
        return '';
    };

    const getTime = (s) => {
        if (!s) return 0;
        const t = s.updatedAt || s.resultsUpdated || s.deletedAt || s.createdAt || 0;
        const d = new Date(t).getTime();
        return isNaN(d) ? 0 : d;
    };

    localList.forEach(item => {
        const k = getKey(item);
        if (k) map.set(k, { ...item });
    });

    let changedCount = 0;

    incomingList.forEach(incoming => {
        const k = getKey(incoming);
        if (!k) return;

        if (!map.has(k)) {
            map.set(k, { ...incoming });
            changedCount++;
        } else {
            const current = map.get(k);

            // Handle tombstones/deletions
            if (incoming._deleted || current._deleted || incoming.status === 'DELETED' || current.status === 'DELETED') {
                const curDel = (current._deleted || current.status === 'DELETED') ? new Date(current.deletedAt || current.updatedAt || 0).getTime() : 0;
                const incDel = (incoming._deleted || incoming.status === 'DELETED') ? new Date(incoming.deletedAt || incoming.updatedAt || 0).getTime() : 0;
                const maxDel = Math.max(curDel, incDel);
                const curAct = (!current._deleted && current.status !== 'DELETED') ? getTime(current) : 0;
                const incAct = (!incoming._deleted && incoming.status !== 'DELETED') ? getTime(incoming) : 0;
                const maxAct = Math.max(curAct, incAct);

                if (maxDel > maxAct) {
                    map.set(k, {
                        ...(current._deleted ? current : incoming),
                        _deleted: true,
                        status: 'DELETED',
                        deletedAt: new Date(maxDel).toISOString()
                    });
                    return;
                }
            }

            // Both active: compare timestamps
            const incTime = getTime(incoming);
            const curTime = getTime(current);

            if (incTime > curTime) {
                map.set(k, { ...current, ...incoming });
                changedCount++;
            } else if (curTime > incTime) {
                map.set(k, { ...incoming, ...current });
            } else {
                const curHasRes = Array.isArray(current.results) && current.results.length > 0;
                const incHasRes = Array.isArray(incoming.results) && incoming.results.length > 0;
                if (!curHasRes && incHasRes) {
                    map.set(k, { ...current, ...incoming });
                    changedCount++;
                }
            }
        }
    });

    return {
        merged: Array.from(map.values()),
        changedCount
    };
}

// -------------------------------------------------------------
// API Endpoints
// -------------------------------------------------------------

// Middleware to prevent caching on API and data responses
function noCacheHeaders(req, res, next) {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
}

// Health Check
app.get('/api/health', noCacheHeaders, (req, res) => {
    const students = readStudentsDB();
    const active = students.filter(s => !s._deleted && s.status !== 'DELETED');
    res.json({
        status: 'ok',
        service: 'Sikkim Board of School Education API',
        serverTime: new Date().toISOString(),
        totalStudents: active.length,
        rawRecords: students.length
    });
});

// GET all students
app.get(['/api/students', '/api/db'], noCacheHeaders, (req, res) => {
    const students = readStudentsDB();
    const includeDeleted = req.query.includeDeleted === 'true';
    if (includeDeleted) {
        return res.json(students);
    }
    const active = students.filter(s => !s._deleted && s.status !== 'DELETED');
    res.json(active);
});

// GET single student by Roll or ID
app.get('/api/students/:idOrRoll', noCacheHeaders, (req, res) => {
    const idOrRoll = (req.params.idOrRoll || '').trim().toUpperCase();
    const students = readStudentsDB();
    const student = students.find(s => 
        (!s._deleted && s.status !== 'DELETED') && 
        (String(s.id) === idOrRoll || (s.rollNumber && s.rollNumber.trim().toUpperCase() === idOrRoll))
    );
    if (!student) {
        return res.status(404).json({ error: 'Student not found', rollNumber: idOrRoll });
    }
    res.json(student);
});

// POST save student (create or update)
app.post('/api/students', noCacheHeaders, (req, res) => {
    try {
        const student = req.body;
        if (!student || !student.name || !student.rollNumber) {
            return res.status(400).json({ error: 'Name and Roll Number are required' });
        }

        const normalizedRoll = (student.rollNumber || '').trim().toUpperCase();
        const students = readStudentsDB();
        const nowIso = new Date().toISOString();

        const sanitized = {
            ...student,
            name: (student.name || '').trim().toUpperCase(),
            rollNumber: normalizedRoll,
            registrationNumber: (student.registrationNumber || '').trim().toUpperCase(),
            fatherName: (student.fatherName || '').trim().toUpperCase(),
            motherName: (student.motherName || '').trim().toUpperCase(),
            address: (student.address || '').trim().toUpperCase(),
            course: (student.course || '').trim().toUpperCase(),
            session: (student.session || '2025-2026').trim().toUpperCase(),
            passingYear: String(student.passingYear || '2026').trim(),
            _deleted: false,
            updatedAt: nowIso
        };

        // Find existing
        let existingIdx = -1;
        if (sanitized.id) {
            existingIdx = students.findIndex(s => String(s.id) === String(sanitized.id));
        }
        if (existingIdx < 0 && normalizedRoll) {
            existingIdx = students.findIndex(s => s.rollNumber && s.rollNumber.trim().toUpperCase() === normalizedRoll);
        }

        if (existingIdx >= 0) {
            students[existingIdx] = {
                ...students[existingIdx],
                ...sanitized,
                updatedAt: nowIso
            };
        } else {
            sanitized.id = sanitized.id || 'STU_' + Date.now();
            sanitized.createdAt = sanitized.createdAt || nowIso;
            students.unshift(sanitized);
        }

        writeStudentsDB(students);
        const active = students.filter(s => !s._deleted && s.status !== 'DELETED');
        res.json({
            success: true,
            message: 'Student saved successfully',
            student: sanitized,
            totalStudents: active.length
        });
    } catch (err) {
        console.error('Error in POST /api/students:', err);
        res.status(500).json({ error: 'Internal server error', message: err.message });
    }
});

// PUT update student
app.put('/api/students/:id', noCacheHeaders, (req, res) => {
    try {
        const id = req.params.id;
        const updates = req.body;
        const students = readStudentsDB();
        const idx = students.findIndex(s => String(s.id) === String(id));
        if (idx < 0) {
            return res.status(404).json({ error: 'Student not found with ID ' + id });
        }

        const nowIso = new Date().toISOString();
        students[idx] = {
            ...students[idx],
            ...updates,
            updatedAt: nowIso
        };

        writeStudentsDB(students);
        res.json({ success: true, student: students[idx] });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error', message: err.message });
    }
});

// DELETE student
app.delete('/api/students/:id', noCacheHeaders, (req, res) => {
    try {
        const id = req.params.id;
        const students = readStudentsDB();
        const target = students.find(s => String(s.id) === String(id));
        const nowIso = new Date().toISOString();

        if (target) {
            target._deleted = true;
            target.status = 'DELETED';
            target.deletedAt = nowIso;
            target.updatedAt = nowIso;
        } else {
            students.push({
                id: String(id),
                _deleted: true,
                status: 'DELETED',
                deletedAt: nowIso,
                updatedAt: nowIso
            });
        }

        writeStudentsDB(students);
        const active = students.filter(s => !s._deleted && s.status !== 'DELETED');
        res.json({ success: true, message: 'Student deleted', id, totalStudents: active.length });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error', message: err.message });
    }
});

// POST Multi-device Synchronization Endpoint
app.post('/api/sync', noCacheHeaders, (req, res) => {
    try {
        const incoming = Array.isArray(req.body) ? req.body : (req.body && req.body.students ? req.body.students : []);
        if (!Array.isArray(incoming)) {
            return res.status(400).json({ error: 'Payload must contain a students array' });
        }

        const currentDB = readStudentsDB();
        const { merged, changedCount } = mergeStudentDatasets(currentDB, incoming);

        writeStudentsDB(merged);
        const active = merged.filter(s => !s._deleted && s.status !== 'DELETED');

        res.json({
            success: true,
            status: 'synced',
            changedCount,
            totalStudents: active.length,
            students: active,
            rawRecords: merged
        });
    } catch (err) {
        console.error('Error in /api/sync:', err);
        res.status(500).json({ error: 'Sync failed', message: err.message });
    }
});

// GET Backup Download
app.get('/api/backup', noCacheHeaders, (req, res) => {
    const students = readStudentsDB();
    const active = students.filter(s => !s._deleted && s.status !== 'DELETED');
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="sbse_students_backup_${Date.now()}.json"`);
    res.send(JSON.stringify(active, null, 4));
});

// POST Restore / Import Database
app.post('/api/restore', noCacheHeaders, (req, res) => {
    try {
        const list = Array.isArray(req.body) ? req.body : (req.body && req.body.students ? req.body.students : null);
        if (!Array.isArray(list)) {
            return res.status(400).json({ error: 'Invalid backup format. Must be an array of students.' });
        }
        writeStudentsDB(list);
        const active = list.filter(s => !s._deleted && s.status !== 'DELETED');
        res.json({ success: true, message: 'Database restored successfully', totalStudents: active.length });
    } catch (err) {
        res.status(500).json({ error: 'Failed to restore', message: err.message });
    }
});

// -------------------------------------------------------------
// Static Website Serving & Cache Control
// -------------------------------------------------------------
const staticOptions = {
    setHeaders: (res, filePath) => {
        // Strict cache prevention for HTML, JS, and JSON
        if (filePath.endsWith('.html') || filePath.endsWith('.js') || filePath.endsWith('.json')) {
            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
            res.setHeader('Pragma', 'no-cache');
            res.setHeader('Expires', '0');
        }
    }
};

app.use(express.static(__dirname, staticOptions));

// Root and common entry points
app.get('/', (req, res) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/admin', (req, res) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.sendFile(path.join(__dirname, 'admin.html'));
});

app.get('/result', (req, res) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.sendFile(path.join(__dirname, 'result.html'));
});

app.get('/results', (req, res) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.sendFile(path.join(__dirname, 'results.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`   Sikkim Board of School Education - Server Live   `);
    console.log(`   Listening on port: ${PORT}                          `);
    console.log(`   Local URL: http://localhost:${PORT}                 `);
    console.log(`   API Endpoint: http://localhost:${PORT}/api/students `);
    console.log(`====================================================`);
});
