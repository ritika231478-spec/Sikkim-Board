// SBSE Data Manager - Sikkim Board of School Education
// Centralized Data Layer with Full NIOS Subject Reference Scheme & DD/MM/YYYY Support

const SBSE_STORAGE_KEY = 'sikkimStudents';

// Comprehensive Subject Scheme derived from E:\Nios (Subject code reference)
const SBSE_FULL_SUBJECT_CATALOG = {
    MATRICULATION: {
        title: 'SECONDARY (10th)',
        groups: [
            {
                name: 'GROUP A: LANGUAGES',
                subjects: [
                    { code: '201', name: 'HINDI', maxMarks: 100 },
                    { code: '202', name: 'ENGLISH', maxMarks: 100, isDefault: true },
                    { code: '203', name: 'BENGALI', maxMarks: 100 },
                    { code: '204', name: 'MARATHI', maxMarks: 100 },
                    { code: '205', name: 'TELUGU', maxMarks: 100 },
                    { code: '206', name: 'URDU', maxMarks: 100 },
                    { code: '207', name: 'GUJARATI', maxMarks: 100 },
                    { code: '208', name: 'KANNADA', maxMarks: 100 },
                    { code: '209', name: 'SANSKRIT', maxMarks: 100 },
                    { code: '210', name: 'PUNJABI', maxMarks: 100 },
                    { code: '228', name: 'ASSAMESE', maxMarks: 100 },
                    { code: '231', name: 'NEPALI', maxMarks: 100, isDefault: true },
                    { code: '232', name: 'MALAYALAM', maxMarks: 100 },
                    { code: '233', name: 'ODIA', maxMarks: 100 },
                    { code: '235', name: 'ARABIC', maxMarks: 100 },
                    { code: '236', name: 'PERSIAN', maxMarks: 100 },
                    { code: '237', name: 'TAMIL', maxMarks: 100 }
                ]
            },
            {
                name: 'GROUP B: ACADEMIC COURSES',
                subjects: [
                    { code: '211', name: 'MATHEMATICS', maxMarks: 100, isDefault: true },
                    { code: '212', name: 'SCIENCE AND TECHNOLOGY', maxMarks: 100, isDefault: true },
                    { code: '213', name: 'SOCIAL SCIENCE', maxMarks: 100, isDefault: true },
                    { code: '214', name: 'ECONOMICS', maxMarks: 100 },
                    { code: '215', name: 'BUSINESS STUDIES', maxMarks: 100 },
                    { code: '216', name: 'HOME SCIENCE', maxMarks: 100 },
                    { code: '222', name: 'PSYCHOLOGY', maxMarks: 100 },
                    { code: '223', name: 'INDIAN CULTURE & HERITAGE', maxMarks: 100 },
                    { code: '224', name: 'ACCOUNTANCY', maxMarks: 100 },
                    { code: '225', name: 'PAINTING', maxMarks: 100 },
                    { code: '229', name: 'DATA ENTRY OPERATIONS', maxMarks: 100, isDefault: true }
                ]
            },
            {
                name: 'INDIAN KNOWLEDGE TRADITION (IKT)',
                subjects: [
                    { code: '245', name: 'VEDA ADHYAN', maxMarks: 100 },
                    { code: '246', name: 'SANSKRIT VYAKARAN', maxMarks: 100 },
                    { code: '247', name: 'BHARATIYA DARSHAN', maxMarks: 100 },
                    { code: '248', name: 'SANSKRIT SAHITYA', maxMarks: 100 }
                ]
            },
            {
                name: 'VOCATIONAL COURSES',
                subjects: [
                    { code: '217', name: 'TYPEWRITING (HINDI)', maxMarks: 100 },
                    { code: '218', name: 'TYPEWRITING (ENGLISH)', maxMarks: 100 },
                    { code: '221', name: 'TYPEWRITING (URDU)', maxMarks: 100 },
                    { code: '251', name: 'JUTE PRODUCTION', maxMarks: 100 },
                    { code: '252', name: 'CARPENTRY', maxMarks: 100 },
                    { code: '253', name: 'SOLAR ENERGY TECHNICIAN', maxMarks: 100 },
                    { code: '254', name: 'BIO GAS TECHNICIAN', maxMarks: 100 },
                    { code: '255', name: 'LAUNDRY SERVICES', maxMarks: 100 },
                    { code: '256', name: 'BAKERY & CONFECTIONERY', maxMarks: 100 },
                    { code: '257', name: 'WELDING TECHNOLOGY', maxMarks: 100 }
                ]
            }
        ]
    },
    INTERMEDIATE: {
        title: 'SENIOR SECONDARY (12th)',
        groups: [
            {
                name: 'GROUP A: LANGUAGES',
                subjects: [
                    { code: '301', name: 'HINDI', maxMarks: 100, isDefault: true },
                    { code: '302', name: 'ENGLISH', maxMarks: 100, isDefault: true },
                    { code: '303', name: 'BENGALI', maxMarks: 100 },
                    { code: '304', name: 'TAMIL', maxMarks: 100 },
                    { code: '305', name: 'ODIA', maxMarks: 100 },
                    { code: '306', name: 'URDU', maxMarks: 100 },
                    { code: '307', name: 'GUJARATI', maxMarks: 100 },
                    { code: '309', name: 'SANSKRIT', maxMarks: 100 },
                    { code: '310', name: 'PUNJABI', maxMarks: 100 },
                    { code: '341', name: 'ARABIC', maxMarks: 100 },
                    { code: '342', name: 'PERSIAN', maxMarks: 100 }
                ]
            },
            {
                name: 'GROUP B: ACADEMIC & SOCIAL SCIENCES',
                subjects: [
                    { code: '311', name: 'MATHEMATICS', maxMarks: 100, isDefault: true },
                    { code: '316', name: 'GEOGRAPHY', maxMarks: 100 },
                    { code: '318', name: 'ECONOMICS', maxMarks: 100 },
                    { code: '319', name: 'BUSINESS STUDIES', maxMarks: 100 },
                    { code: '321', name: 'HOME SCIENCE', maxMarks: 100 },
                    { code: '328', name: 'PSYCHOLOGY', maxMarks: 100 },
                    { code: '332', name: 'PAINTING', maxMarks: 100 },
                    { code: '336', name: 'DATA ENTRY OPERATIONS', maxMarks: 100 },
                    { code: '337', name: 'TOURISM', maxMarks: 100 },
                    { code: '345', name: 'VEDA ADHYAN', maxMarks: 100 },
                    { code: '346', name: 'SANSKRIT VYAKARAN', maxMarks: 100 },
                    { code: '347', name: 'BHARATIYA DARSHAN', maxMarks: 100 },
                    { code: '348', name: 'SANSKRIT SAHITYA', maxMarks: 100 }
                ]
            },
            {
                name: 'GROUPS C, D, E & F: CORE SCIENCES & HUMANITIES',
                subjects: [
                    { code: '312', name: 'PHYSICS', maxMarks: 100, isDefault: true },
                    { code: '313', name: 'CHEMISTRY', maxMarks: 100, isDefault: true },
                    { code: '314', name: 'BIOLOGY', maxMarks: 100, isDefault: true },
                    { code: '315', name: 'HISTORY', maxMarks: 100 },
                    { code: '317', name: 'POLITICAL SCIENCE', maxMarks: 100 },
                    { code: '320', name: 'ACCOUNTANCY', maxMarks: 100 },
                    { code: '330', name: 'COMPUTER SCIENCE', maxMarks: 100 },
                    { code: '331', name: 'SOCIOLOGY', maxMarks: 100 },
                    { code: '333', name: 'ENVIRONMENTAL SCIENCE', maxMarks: 100 },
                    { code: '335', name: 'MASS COMMUNICATION', maxMarks: 100 },
                    { code: '338', name: 'INTRODUCTION TO LAW', maxMarks: 100 },
                    { code: '339', name: 'LIBRARY AND INFORMATION SCIENCE', maxMarks: 100 }
                ]
            },
            {
                name: 'VOCATIONAL COURSES',
                subjects: [
                    { code: '322', name: 'TYPEWRITING (HINDI)', maxMarks: 100 },
                    { code: '323', name: 'TYPEWRITING (ENGLISH)', maxMarks: 100 },
                    { code: '324', name: 'STENOGRAPHY (HINDI)', maxMarks: 100 },
                    { code: '325', name: 'STENOGRAPHY (ENGLISH)', maxMarks: 100 },
                    { code: '326', name: 'SECRETARIAL PRACTICE', maxMarks: 100 },
                    { code: '329', name: 'STENOGRAPHY (URDU)', maxMarks: 100 },
                    { code: '364', name: 'TYPEWRITING (URDU)', maxMarks: 100 },
                    { code: '351', name: 'PLANT PROTECTION', maxMarks: 100 },
                    { code: '352', name: 'WATER MANAGEMENT FOR CROP PRODUCTION', maxMarks: 100 },
                    { code: '353', name: 'OYSTER MUSHROOM PRODUCTION', maxMarks: 100 },
                    { code: '354', name: 'FURNITURE AND CABINET MAKING', maxMarks: 100 },
                    { code: '355', name: 'ELECTROPLATING', maxMarks: 100 },
                    { code: '356', name: 'HOUSE KEEPING', maxMarks: 100 },
                    { code: '357', name: 'CATERING MANAGEMENT', maxMarks: 100 },
                    { code: '358', name: 'FOOD PROCESSING', maxMarks: 100 },
                    { code: '359', name: 'PLAY CENTRE MANAGEMENT', maxMarks: 100 },
                    { code: '360', name: 'HOTEL FRONT OFFICE OPERATION', maxMarks: 100 },
                    { code: '361', name: 'POULTRY FARMING', maxMarks: 100 },
                    { code: '362', name: 'SOIL AND FERTILIZER MANAGEMENT', maxMarks: 100 },
                    { code: '363', name: 'PRESERVATION OF FRUITS AND VEGETABLES', maxMarks: 100 }
                ]
            }
        ]
    }
};

// Date Format Helpers (Standardizing on DD/MM/YYYY)
function formatToDDMMYYYY(dateStr) {
    if (!dateStr) return '';
    dateStr = dateStr.trim();

    // Already DD/MM/YYYY
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
        return dateStr;
    }
    // DD-MM-YYYY -> DD/MM/YYYY
    if (/^\d{2}-\d{2}-\d{4}$/.test(dateStr)) {
        return dateStr.replace(/-/g, '/');
    }
    // YYYY-MM-DD -> DD/MM/YYYY
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
        const parts = dateStr.split('-');
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    // YYYY/MM/DD -> DD/MM/YYYY
    if (/^\d{4}\/\d{2}\/\d{2}$/.test(dateStr)) {
        const parts = dateStr.split('/');
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }

    // Try parsing as standard date
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
        const dd = String(d.getDate()).padStart(2, '0');
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const yyyy = d.getFullYear();
        return `${dd}/${mm}/${yyyy}`;
    }

    return dateStr.toUpperCase();
}

// Practical Subject Codes from NIOS Reference Scheme
const SBSE_PRACTICAL_CODES = [
    '211', '212', '216', '225', '229', '217', '218', '221', '251', '252', '253', '254', '255', '256', '257',
    '312', '313', '314', '316', '321', '330', '332', '333', '335', '336', '339',
    '322', '323', '324', '325', '326', '329', '364', '351', '352', '353', '354', '355', '356', '357', '358', '359', '360', '361', '362', '363'
];

function isPracticalSubject(name, code) {
    if (code && SBSE_PRACTICAL_CODES.includes(String(code).trim())) return true;
    const n = (name || '').toUpperCase();
    return [
        'SCIENCE', 'PHYSICS', 'CHEMISTRY', 'BIOLOGY', 'COMPUTER', 'DATA ENTRY', 
        'PAINTING', 'GEOGRAPHY', 'HOME SCIENCE', 'MASS COMMUNICATION', 'ENVIRONMENTAL',
        'TOURISM', 'TYPEWRITING', 'STENOGRAPHY', 'SECRETARIAL', 'VOCATIONAL'
    ].some(kw => n.includes(kw));
}

// Initial Seed Data (Empty - 0 demo students)
const DEFAULT_STUDENTS = [];

const SBSEData = {
    isPracticalSubject: isPracticalSubject,
    practicalCodes: SBSE_PRACTICAL_CODES,

    // Get all students
    getStudents: function() {
        // One-time purge of legacy demo students
        if (!localStorage.getItem('sbse_demo_purged_2026_v2')) {
            localStorage.setItem('sbse_demo_purged_2026_v2', 'true');
            let existing = [];
            try {
                const r = localStorage.getItem(SBSE_STORAGE_KEY);
                if (r) existing = JSON.parse(r) || [];
            } catch(e) {}
            if (Array.isArray(existing)) {
                const filtered = existing.filter(s => 
                    s.id !== '1710000001' && s.id !== '1710000002' && s.id !== '1710000003' &&
                    s.rollNumber !== 'SBSE-2026-101' && s.rollNumber !== 'SBSE-2026-202' && s.rollNumber !== 'SBSE-2026-103'
                );
                localStorage.setItem(SBSE_STORAGE_KEY, JSON.stringify(filtered));
            }
        }

        const raw = localStorage.getItem(SBSE_STORAGE_KEY);
        if (!raw) {
            localStorage.setItem(SBSE_STORAGE_KEY, JSON.stringify([]));
            return [];
        }
        try {
            const list = JSON.parse(raw);
            if (!Array.isArray(list)) {
                localStorage.setItem(SBSE_STORAGE_KEY, JSON.stringify([]));
                return [];
            }
            // Ensure DOB is in DD/MM/YYYY and all text is Uppercase
            return list.map(s => ({
                ...s,
                name: (s.name || '').toUpperCase(),
                fatherName: (s.fatherName || '').toUpperCase(),
                motherName: (s.motherName || '').toUpperCase(),
                address: (s.address || '').toUpperCase(),
                rollNumber: (s.rollNumber || '').toUpperCase(),
                registrationNumber: (s.registrationNumber || '').toUpperCase(),
                session: (s.session || '').toUpperCase(),
                dob: formatToDDMMYYYY(s.dob)
            }));
        } catch (e) {
            console.error('Error parsing students', e);
            return [];
        }
    },

    // Save student (insert or update)
    saveStudent: function(student) {
        const students = this.getStudents();
        const normalizedRoll = (student.rollNumber || '').trim().toUpperCase();
        
        // Capitalize all fields & format DOB
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
            dob: formatToDDMMYYYY(student.dob),
            enrolledSubjects: student.enrolledSubjects && student.enrolledSubjects.length > 0 ? student.enrolledSubjects : this.getDefaultSubjects(student.course)
        };

        const existingIndex = students.findIndex(s => 
            String(s.id) === String(sanitized.id) || 
            (s.rollNumber && s.rollNumber.trim().toUpperCase() === normalizedRoll)
        );
        
        if (existingIndex >= 0) {
            students[existingIndex] = { ...students[existingIndex], ...sanitized, updatedAt: new Date().toISOString() };
        } else {
            students.unshift({
                id: sanitized.id || 'STU_' + Date.now(),
                createdAt: new Date().toISOString(),
                results: [],
                totalMarks: 0,
                maxTotal: 0,
                percentage: 0,
                grade: 'PENDING',
                status: 'PENDING',
                ...sanitized
            });
        }
        
        localStorage.setItem(SBSE_STORAGE_KEY, JSON.stringify(students));
        return students;
    },

    // Find student by ID
    getStudentById: function(id) {
        const students = this.getStudents();
        return students.find(s => String(s.id) === String(id)) || null;
    },

    // Find student by Roll Number
    getStudentByRoll: function(rollNumber) {
        if (!rollNumber) return null;
        const normalized = rollNumber.trim().toUpperCase();
        const students = this.getStudents();
        return students.find(s => s.rollNumber && s.rollNumber.trim().toUpperCase() === normalized) || null;
    },

    // Delete student
    deleteStudent: function(id) {
        let students = this.getStudents();
        students = students.filter(s => String(s.id) !== String(id));
        localStorage.setItem(SBSE_STORAGE_KEY, JSON.stringify(students));
        return students;
    },

    // Get default subjects for a course
    getDefaultSubjects: function(course) {
        const cat = SBSE_FULL_SUBJECT_CATALOG[course] || SBSE_FULL_SUBJECT_CATALOG.MATRICULATION;
        const defaults = [];
        cat.groups.forEach(g => {
            g.subjects.forEach(s => {
                if (s.isDefault) defaults.push({ code: s.code, name: s.name, maxMarks: s.maxMarks || 100 });
            });
        });
        return defaults;
    },

    // Get subjects for a student (enrolled subjects or defaults)
    getSubjectsForStudent: function(student) {
        if (student && student.enrolledSubjects && Array.isArray(student.enrolledSubjects) && student.enrolledSubjects.length > 0) {
            return student.enrolledSubjects;
        }
        return this.getDefaultSubjects(student ? student.course : 'MATRICULATION');
    },

    // Calculate marks, grade, status supporting Theory & Practical
    calculateResult: function(resultsList) {
        if (!resultsList || resultsList.length === 0) {
            return { totalMarks: 0, maxTotal: 0, percentage: 0, grade: 'PENDING', status: 'PENDING' };
        }

        let totalMarks = 0;
        let maxTotal = 0;
        let hasFailedSubject = false;

        resultsList.forEach(r => {
            const max = parseFloat(r.maxMarks) || 100;
            
            // Theory marks
            let th = 0;
            if (r.theory !== undefined && r.theory !== null && r.theory !== '') {
                th = parseFloat(r.theory) || 0;
            } else if (r.marks !== undefined && r.marks !== null) {
                th = parseFloat(r.marks) || 0;
            }

            // Practical marks
            let pr = 0;
            const prStr = (r.practical !== undefined && r.practical !== null) ? String(r.practical).trim().toUpperCase() : '';
            const isNonPractical = prStr === 'XX' || prStr === '-' || prStr === 'NA';
            if (!isNonPractical && prStr !== '' && !isNaN(parseFloat(prStr))) {
                pr = parseFloat(prStr) || 0;
            }

            const subjectTotal = th + pr;
            r.theory = th;
            r.practical = isNonPractical ? 'XX' : (r.practical !== undefined && r.practical !== null && r.practical !== '' ? r.practical : (isPracticalSubject(r.subjectName, r.subjectCode) ? pr : 'XX'));
            r.marks = subjectTotal;
            r.total = subjectTotal;

            totalMarks += subjectTotal;
            maxTotal += max;
            if (subjectTotal < (max * 0.33)) {
                hasFailedSubject = true;
            }
        });

        const percentage = maxTotal > 0 ? parseFloat(((totalMarks / maxTotal) * 100).toFixed(2)) : 0;
        
        let grade = 'F';
        if (percentage >= 90) grade = 'A+';
        else if (percentage >= 80) grade = 'A';
        else if (percentage >= 70) grade = 'B+';
        else if (percentage >= 60) grade = 'B';
        else if (percentage >= 50) grade = 'C';
        else if (percentage >= 33) grade = 'D';

        const status = (percentage >= 33 && !hasFailedSubject) ? 'PASS' : 'FAIL';

        return {
            totalMarks,
            maxTotal,
            percentage,
            grade,
            status
        };
    },

    // Update marks for student
    saveResults: function(studentId, marksArray) {
        const students = this.getStudents();
        const student = students.find(s => String(s.id) === String(studentId));
        if (!student) return null;

        const calc = this.calculateResult(marksArray);
        student.results = marksArray;
        student.totalMarks = calc.totalMarks;
        student.maxTotal = calc.maxTotal;
        student.percentage = calc.percentage;
        student.grade = calc.grade;
        student.status = calc.status;
        student.resultsUpdated = new Date().toISOString();

        localStorage.setItem(SBSE_STORAGE_KEY, JSON.stringify(students));
        return student;
    }
};

// Calculate Marksheet Issue Date:
// Any date in August of the student's final examination year, strictly guaranteed NOT to be Sunday
function getMarksheetIssueDate(student) {
    if (!student) return '18/08/2026';
    if (student.issueDate && typeof student.issueDate === 'string' && student.issueDate.trim()) {
        const custom = student.issueDate.trim();
        const parts = custom.split(/[-/]/);
        if (parts.length === 3) {
            let [d, m, y] = parts.map(Number);
            if (y < 100) y += 2000;
            // Month 8 is August
            if (m === 8 && d >= 1 && d <= 31) {
                const dt = new Date(y, 7, d);
                if (dt.getDay() === 0) {
                    // Shift Sunday to Monday
                    const shifted = new Date(y, 7, d + 1);
                    const dd = String(shifted.getDate()).padStart(2, '0');
                    const mm = String(shifted.getMonth() + 1).padStart(2, '0');
                    return `${dd}/${mm}/${shifted.getFullYear()}`;
                }
                return `${String(d).padStart(2, '0')}/08/${y}`;
            }
        }
        return custom;
    }

    // Determine final examination year from passingYear or session
    let finalYear = 2026;
    if (student.passingYear && !isNaN(parseInt(student.passingYear))) {
        finalYear = parseInt(student.passingYear);
    } else if (student.session) {
        const parts = String(student.session).split(/[-/]/);
        if (parts.length > 1) {
            let lastPart = parts[parts.length - 1].trim();
            if (lastPart.length === 2) lastPart = '20' + lastPart;
            const parsed = parseInt(lastPart);
            if (!isNaN(parsed)) finalYear = parsed;
        } else {
            const parsed = parseInt(parts[0]);
            if (!isNaN(parsed)) finalYear = parsed;
        }
    }

    // Deterministic selection based on student identity
    let seed = 0;
    const seedStr = String(student.rollNumber || student.id || student.name || 'SBSE');
    for (let i = 0; i < seedStr.length; i++) {
        seed = (seed * 31 + seedStr.charCodeAt(i)) & 0xffffffff;
    }
    const dayOffset = Math.abs(seed) % 15; // 0 to 14
    let day = 10 + dayOffset; // 10 to 24 of August

    let dt = new Date(finalYear, 7, day);

    // Guaranteed NOT to be Sunday (0 in JS)
    if (dt.getDay() === 0) {
        day += 1; // Shift to Monday
        dt = new Date(finalYear, 7, day);
    }

    const dd = String(dt.getDate()).padStart(2, '0');
    const mm = String(dt.getMonth() + 1).padStart(2, '0'); // '08'
    const yyyy = dt.getFullYear();

    return `${dd}/${mm}/${yyyy}`;
}

// Generate QR verification text containing candidate details
function generateStudentQrText(student) {
    if (!student) return '';
    const dobFormatted = formatToDDMMYYYY(student.dob) || student.dob || '---';
    const issueDate = getMarksheetIssueDate(student);
    const lines = [
        `Student Name: ${(student.name || '').toUpperCase()}`,
        `Father Name: ${(student.fatherName || '---').toUpperCase()}`,
        `Mother Name: ${(student.motherName || '---').toUpperCase()}`,
        `Date of Birth: ${dobFormatted}`,
        `Course: ${(student.course || '---').toUpperCase()}`,
        `Session: ${(student.session || '2025-2026').toUpperCase()}`,
        `Roll Number: ${(student.rollNumber || '---').toUpperCase()}`,
        `Result Status: ${(student.status || 'PASS').toUpperCase()}`,
        `Date of Issue: ${issueDate}`
    ];
    return lines.join('\n');
}

// Render QR Code inside container element using crisp vector SVG
function renderStudentQrCode(containerId, student) {
    const el = document.getElementById(containerId);
    if (!el || !student) return;
    el.innerHTML = '';

    const qrText = generateStudentQrText(student);

    // 1. Primary: Vector SVG generator from qrcode-generator.min.js (scalable, crisp, independent of canvas)
    if (typeof qrcode === 'function') {
        try {
            // Type 0 auto-detects minimum version. 'M' (15%) redundancy for fast scanning & durability
            const qr = qrcode(0, 'M');
            qr.addData(qrText);
            qr.make();
            // Generate pure SVG with standard 4-module quiet zone margin
            const svgTag = qr.createSvgTag({ scalable: true, margin: 4 });
            el.innerHTML = svgTag;

            const svgEl = el.querySelector('svg');
            if (svgEl) {
                svgEl.setAttribute('shape-rendering', 'crispEdges');
                svgEl.setAttribute('role', 'img');
                svgEl.setAttribute('aria-label', `Verification QR Code for ${student.name}`);
                svgEl.style.display = 'block';
                svgEl.style.margin = '0 auto';
                svgEl.style.width = '125px';
                svgEl.style.height = '125px';
            }
            return;
        } catch (e) {
            console.warn('Vector QR generator error, falling back to image', e);
        }
    }

    // 2. High-reliability fallback image with margin and crisp sizing
    const encoded = encodeURIComponent(qrText);
    const img = document.createElement('img');
    img.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&margin=4&data=${encoded}`;
    img.alt = `Verification QR Code for ${student.name}`;
    img.style.width = '125px';
    img.style.height = '125px';
    img.style.display = 'block';
    img.style.margin = '0 auto';
    img.style.imageRendering = 'pixelated';
    el.appendChild(img);
}

window.SBSEData = SBSEData;
window.SBSE_FULL_SUBJECT_CATALOG = SBSE_FULL_SUBJECT_CATALOG;
window.formatToDDMMYYYY = formatToDDMMYYYY;
window.isPracticalSubject = isPracticalSubject;
window.SBSE_PRACTICAL_CODES = SBSE_PRACTICAL_CODES;
window.getMarksheetIssueDate = getMarksheetIssueDate;
window.generateStudentQrText = generateStudentQrText;
window.renderStudentQrCode = renderStudentQrCode;
SBSEData.getMarksheetIssueDate = getMarksheetIssueDate;
SBSEData.generateStudentQrText = generateStudentQrText;
SBSEData.renderStudentQrCode = renderStudentQrCode;
