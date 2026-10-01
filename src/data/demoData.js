// Demo Data for Campus OS

export const DEMO_USERS = {
  student: {
    id: 'usr_stu_001',
    name: 'Sai',
    fullName: 'Sai Krishna Mohanty',
    email: 'student@campusos.com',
    password: 'student123',
    role: 'STUDENT',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250',
    studentId: 'BPUT2026001',
    program: 'B.Tech',
    department: 'Computer Science & Engineering',
    year: '3rd Year',
    semester: 'Semester 5',
    section: 'CSE-A',
    hostel: 'Aryabhatta Hall of Residence',
    block: 'Block-B',
    room: 'Room 304',
    phone: '+91 98765 43210',
    emergencyContact: '+91 98765 43219',
    cgpa: '8.84',
    bloodGroup: 'O+',
  },
  faculty: {
    id: 'usr_fac_001',
    name: 'Dr. Aris Thorne',
    fullName: 'Dr. Aris Thorne, Ph.D',
    email: 'faculty@campusos.com',
    password: 'faculty123',
    role: 'FACULTY',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    facultyId: 'FAC2021045',
    department: 'Computer Science & Engineering',
    designation: 'Associate Professor',
    coursesCount: 3,
    activeStudents: 180,
  },
  warden: {
    id: 'usr_war_001',
    name: 'Col. Rajesh Sharma (Retd.)',
    fullName: 'Col. Rajesh Sharma',
    email: 'warden@campusos.com',
    password: 'warden123',
    role: 'WARDEN',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=250',
    wardenId: 'WAR2019012',
    hostelAssigned: 'Aryabhatta & Ramanujan Halls',
    phone: '+91 94370 11223',
  },
  security: {
    id: 'usr_sec_001',
    name: 'Inspector M. Pradhan',
    fullName: 'Inspector M. Pradhan',
    email: 'security@campusos.com',
    password: 'security123',
    role: 'SECURITY',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    gateAssigned: 'Main Security Gate 1',
    badgeId: 'SEC089',
  },
  accounts: {
    id: 'usr_acc_001',
    name: 'Priyanka Das',
    fullName: 'Priyanka Das',
    email: 'accounts@campusos.com',
    password: 'accounts123',
    role: 'ACCOUNTS',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    office: 'Finance & Accounts Section',
    officerId: 'ACC2018004',
  },
  transport: {
    id: 'usr_tra_001',
    name: 'Ramesh Mohapatra',
    fullName: 'Ramesh Mohapatra',
    email: 'transport@campusos.com',
    password: 'transport123',
    role: 'TRANSPORT',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=250',
    designation: 'Fleet Supervisor',
    fleetId: 'TR-DISPATCH-01',
  },
  admin: {
    id: 'usr_adm_001',
    name: 'Dr. S. K. Patnaik',
    fullName: 'Dr. S. K. Patnaik (Dean Academics & Systems)',
    email: 'admin@campusos.com',
    password: 'admin123',
    role: 'ADMIN',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250',
    roleTitle: 'Chief Administrator',
  }
};

export const INITIAL_ATTENDANCE = {
  overallPercentage: 68,
  totalConducted: 200,
  totalAttended: 136,
  requiredPercentage: 75,
  subjects: [
    {
      id: 'sub_cn',
      code: 'CS501',
      name: 'Computer Networks',
      faculty: 'Dr. Aris Thorne',
      conducted: 50,
      attended: 34,
      missed: 16,
      percentage: 68,
      status: 'warning',
      room: 'LH-201',
      schedule: 'Mon, Wed, Fri 09:00 AM'
    },
    {
      id: 'sub_os',
      code: 'CS502',
      name: 'Operating Systems',
      faculty: 'Prof. Ananya Sen',
      conducted: 52,
      attended: 38,
      missed: 14,
      percentage: 73,
      status: 'warning',
      room: 'LH-203',
      schedule: 'Tue, Thu 10:30 AM'
    },
    {
      id: 'sub_dbms',
      code: 'CS503',
      name: 'Database Management Systems',
      faculty: 'Dr. R. K. Behera',
      conducted: 48,
      attended: 31,
      missed: 17,
      percentage: 65,
      status: 'danger',
      room: 'LH-105',
      schedule: 'Mon, Wed 02:00 PM'
    },
    {
      id: 'sub_ml',
      code: 'CS504',
      name: 'Machine Learning',
      faculty: 'Dr. Sourav Mishra',
      conducted: 50,
      attended: 33,
      missed: 17,
      percentage: 66,
      status: 'danger',
      room: 'Lab-3',
      schedule: 'Thu, Fri 03:30 PM'
    }
  ]
};

// Pure calculation utility for attendance
export function calculateAttendanceImpact(conducted, attended, requiredTarget = 75) {
  const currentPct = conducted === 0 ? 0 : Math.round((attended / conducted) * 100);
  
  // consecutive classes needed to reach target %:
  // (attended + x) / (conducted + x) >= target/100
  // 100 * attended + 100x >= target * conducted + target * x
  // x * (100 - target) >= target * conducted - 100 * attended
  const targetFraction = requiredTarget / 100;
  let classesNeeded = 0;
  if (currentPct < requiredTarget) {
    classesNeeded = Math.ceil(
      (targetFraction * conducted - attended) / (1 - targetFraction)
    );
    if (classesNeeded < 0) classesNeeded = 0;
  }

  // Can miss next class?
  // Check if attended / (conducted + 1) >= targetFraction
  const pctIfMissNext = Math.round((attended / (conducted + 1)) * 100);
  const canMiss = pctIfMissNext >= requiredTarget;

  // Max classes one can safely miss while staying >= requiredTarget:
  // attended / (conducted + y) >= targetFraction => y <= (attended - targetFraction*conducted)/targetFraction
  let safeMissCount = 0;
  if (currentPct >= requiredTarget) {
    safeMissCount = Math.floor((attended - targetFraction * conducted) / targetFraction);
    if (safeMissCount < 0) safeMissCount = 0;
  }

  return {
    currentPct,
    classesNeeded,
    canMissNext: canMiss,
    pctIfMissNext,
    safeMissCount,
    message: currentPct < requiredTarget 
      ? `You need to attend the next ${classesNeeded} consecutive classes to reach ${requiredTarget}%.`
      : `You are safely above ${requiredTarget}%. You can miss up to ${safeMissCount} class(es).`
  };
}

export const INITIAL_TODAYS_CLASSES = [
  { id: 1, subject: 'Computer Networks', time: '09:00 AM - 10:00 AM', room: 'LH-201', faculty: 'Dr. Aris Thorne', status: 'Ongoing' },
  { id: 2, subject: 'Operating Systems', time: '10:30 AM - 11:30 AM', room: 'LH-203', faculty: 'Prof. Ananya Sen', status: 'Upcoming' },
  { id: 3, subject: 'Machine Learning Lab', time: '02:00 PM - 04:00 PM', room: 'Lab-3B', faculty: 'Dr. Sourav Mishra', status: 'Upcoming' }
];

export const INITIAL_FEES = {
  total: 120000,
  paid: 98000,
  pending: 22000,
  dueDate: '15 Oct 2026',
  breakdown: [
    { type: 'Tuition Fee (Sem 5)', total: 65000, paid: 65000, pending: 0, status: 'PAID' },
    { type: 'Hostel & Mess Charges', total: 35000, paid: 20000, pending: 15000, status: 'PARTIAL' },
    { type: 'Examination Fee', total: 5000, paid: 5000, pending: 0, status: 'PAID' },
    { type: 'Library & Digital Access', total: 5000, paid: 5000, pending: 0, status: 'PAID' },
    { type: 'Lab & Innovation Fund', total: 10000, paid: 3000, pending: 7000, status: 'PARTIAL' }
  ],
  transactions: [
    { id: 'TXN-98214', date: '12 Aug 2026', amount: 65000, feeType: 'Tuition Fee (Sem 5)', method: 'UPI / HDFC', status: 'SUCCESS', receiptNo: 'RCP-2026-881' },
    { id: 'TXN-91024', date: '28 Aug 2026', amount: 20000, feeType: 'Hostel & Mess Charges', method: 'Net Banking / SBI', status: 'SUCCESS', receiptNo: 'RCP-2026-902' },
    { id: 'TXN-88710', date: '04 Sep 2026', amount: 13000, feeType: 'Exam & Library Dues', method: 'Card / Axis', status: 'SUCCESS', receiptNo: 'RCP-2026-944' }
  ]
};

export const INITIAL_COMPLAINTS = [
  {
    id: 'CMP-2026-104',
    student: 'Sai Krishna Mohanty',
    studentId: 'BPUT2026001',
    hostel: 'Aryabhatta Hall of Residence',
    block: 'Block-B',
    room: 'Room 304',
    description: 'The tap in my bathroom has been leaking for four days.',
    category: 'Plumbing',
    priority: 'High',
    department: 'Maintenance',
    status: 'SUBMITTED', // SUBMITTED, ASSIGNED, IN_PROGRESS, RESOLVED
    assignedTo: 'Manoj Rout (Plumbing Specialist)',
    createdAt: '2026-09-29 08:30 AM',
    updatedAt: '2026-09-29 08:30 AM',
    timeline: [
      { time: '2026-09-29 08:30 AM', event: 'Complaint logged with AI auto-classification (Plumbing / High)' }
    ]
  },
  {
    id: 'CMP-2026-098',
    student: 'Rahul Verma',
    studentId: 'BPUT2026042',
    hostel: 'Aryabhatta Hall of Residence',
    block: 'Block-A',
    room: 'Room 112',
    description: 'Ceiling fan making screeching noise and rotating at very slow speed.',
    category: 'Electrical',
    priority: 'Medium',
    department: 'Electrical Maintenance',
    status: 'IN_PROGRESS',
    assignedTo: 'Bikash Das (Electrician)',
    createdAt: '2026-09-27 10:15 AM',
    updatedAt: '2026-09-28 02:45 PM',
    timeline: [
      { time: '2026-09-27 10:15 AM', event: 'Complaint logged' },
      { time: '2026-09-27 11:30 AM', event: 'Assigned to Bikash Das' },
      { time: '2026-09-28 02:45 PM', event: 'Capacitor replacement in progress' }
    ]
  },
  {
    id: 'CMP-2026-081',
    student: 'Sai Krishna Mohanty',
    studentId: 'BPUT2026001',
    hostel: 'Aryabhatta Hall of Residence',
    block: 'Block-B',
    room: 'Room 304',
    description: 'Wi-Fi router on 3rd floor hallway experiencing frequent packet drop and DNS timeouts.',
    category: 'Network / Wi-Fi',
    priority: 'High',
    department: 'Campus IT Center',
    status: 'RESOLVED',
    assignedTo: 'SysAdmin Team',
    createdAt: '2026-09-20 04:00 PM',
    updatedAt: '2026-09-21 11:00 AM',
    timeline: [
      { time: '2026-09-20 04:00 PM', event: 'Logged by student' },
      { time: '2026-09-21 09:30 AM', event: 'Technician re-spliced optical patch' },
      { time: '2026-09-21 11:00 AM', event: 'Resolved & verified by student' }
    ]
  }
];

export const INITIAL_GATE_PASSES = [
  {
    id: 'GP-2026-8841',
    student: 'Sai Krishna Mohanty',
    studentId: 'BPUT2026001',
    hostel: 'Aryabhatta Hall',
    room: 'Room 304',
    phone: '+91 98765 43210',
    purpose: 'Medical Consultation at Apollo Clinic & essential project components purchase',
    destination: 'Bhubaneswar Central Market & Clinic',
    date: '2026-09-30',
    outTime: '04:30 PM',
    returnTime: '08:30 PM',
    status: 'Approved', // Pending, Approved, Rejected
    approvedBy: 'Col. Rajesh Sharma (Warden)',
    approvedAt: '2026-09-30 11:15 AM',
    qrPayload: JSON.stringify({
      passId: 'GP-2026-8841',
      student: 'Sai Krishna Mohanty',
      studentId: 'BPUT2026001',
      hostel: 'Aryabhatta Hall',
      room: '304',
      purpose: 'Medical Consultation & project supplies',
      date: '2026-09-30',
      validOut: '04:30 PM',
      validReturn: '08:30 PM',
      status: 'VALID'
    })
  },
  {
    id: 'GP-2026-8842',
    student: 'Aman Deep',
    studentId: 'BPUT2026088',
    hostel: 'Ramanujan Hall',
    room: 'Room 214',
    phone: '+91 98111 22334',
    purpose: 'Weekend family visit to home',
    destination: 'Cuttack Railway Station',
    date: '2026-10-02',
    outTime: '02:00 PM',
    returnTime: '2026-10-04 07:00 PM',
    status: 'Pending',
    approvedBy: null,
    approvedAt: null,
    qrPayload: null
  }
];

export const INITIAL_VISITORS = [
  {
    id: 'VIS-2026-302',
    visitorName: 'Ramesh Mohanty',
    relationship: 'Father',
    phone: '+91 98765 43219',
    studentName: 'Sai Krishna Mohanty',
    studentId: 'BPUT2026001',
    visitDate: '2026-09-30',
    expectedArrival: '03:30 PM',
    purpose: 'Delivering semester care package and personal medicines',
    status: 'Approved', // Pending, Approved, Checked-In, Checked-Out, Rejected
    checkedInAt: null,
    checkedOutAt: null
  },
  {
    id: 'VIS-2026-299',
    visitorName: 'Dr. Meera Patel',
    relationship: 'Guest Lecturer / Industry Mentor',
    phone: '+91 94371 88990',
    studentName: 'CSE Department',
    studentId: 'FAC2021045',
    visitDate: '2026-09-30',
    expectedArrival: '11:00 AM',
    purpose: 'AI Systems Capstone Evaluation',
    status: 'Checked-In',
    checkedInAt: '2026-09-30 10:55 AM',
    checkedOutAt: null
  }
];

export const INITIAL_BUSES = [
  {
    id: 'BUS-03',
    busNumber: 'OD-02-AX-4412',
    route: 'Campus → Bhubaneswar (Master Canteen)',
    stops: ['Campus Gate 1', 'Infocity Square', 'Patia', 'Jaydev Vihar', 'Master Canteen'],
    driverName: 'Sanjay Swain',
    driverPhone: '+91 98610 99881',
    departureTime: '5:00 PM',
    status: 'At Campus', // 'At Campus', 'Boarding', 'In Transit', 'Completed'
    capacity: 45,
    expectedPassengers: 38,
    confirmedPassengers: 34,
    boardedPassengers: 28,
    isCurrentUserConfirmed: false
  },
  {
    id: 'BUS-01',
    busNumber: 'OD-02-BV-1109',
    route: 'Campus → Cuttack (Badambadi)',
    stops: ['Campus Gate 1', 'Trisulia Bridge', 'Madhupatna', 'Badambadi'],
    driverName: 'Kailash Jena',
    driverPhone: '+91 94370 77112',
    departureTime: '5:30 PM',
    status: 'At Campus',
    capacity: 50,
    expectedPassengers: 42,
    confirmedPassengers: 40,
    boardedPassengers: 12,
    isCurrentUserConfirmed: false
  },
  {
    id: 'BUS-05',
    busNumber: 'OD-02-CZ-9082',
    route: 'Campus → AIIMS & Khandagiri',
    stops: ['Campus Gate 1', 'Baramunda', 'Khandagiri', 'AIIMS Nagar'],
    driverName: 'Pradeep Nayak',
    driverPhone: '+91 99380 44552',
    departureTime: '6:15 PM',
    status: 'At Campus',
    capacity: 35,
    expectedPassengers: 25,
    confirmedPassengers: 22,
    boardedPassengers: 0,
    isCurrentUserConfirmed: false
  }
];

export const INITIAL_SECURITY_LOGS = [
  {
    id: 'LOG-9941',
    timestamp: '2026-09-30 01:15 PM',
    type: 'EXIT',
    entityType: 'STUDENT',
    entityName: 'Pooja Sethi',
    entityId: 'BPUT2026119',
    passId: 'GP-2026-8835',
    gate: 'Main Security Gate 1',
    verifiedBy: 'Inspector M. Pradhan',
    notes: 'Verified via QR Code scan. Valid until 06:00 PM.'
  },
  {
    id: 'LOG-9940',
    timestamp: '2026-09-30 10:55 AM',
    type: 'ENTRY',
    entityType: 'VISITOR',
    entityName: 'Dr. Meera Patel',
    entityId: 'VIS-2026-299',
    passId: 'VIS-2026-299',
    gate: 'Main Security Gate 1',
    verifiedBy: 'Inspector M. Pradhan',
    notes: 'Official guest badge #14 issued.'
  },
  {
    id: 'LOG-9939',
    timestamp: '2026-09-30 08:45 AM',
    type: 'ENTRY',
    entityType: 'FACULTY',
    entityName: 'Dr. Aris Thorne',
    entityId: 'FAC2021045',
    passId: 'FAC-RFID-102',
    gate: 'Faculty Vehicle Gate 2',
    verifiedBy: 'Automated RFID Boom Barrier',
    notes: 'Authorized vehicle OD-02-BC-8989'
  }
];

export const INITIAL_ASSIGNMENTS = [
  {
    id: 'ASN-01',
    title: 'OS Process Synchronization & Deadlock Simulator',
    course: 'Operating Systems (CS502)',
    faculty: 'Prof. Ananya Sen',
    dueDate: '03 Oct 2026, 11:59 PM',
    status: 'Pending',
    totalMarks: 50,
    submissionType: 'GitHub Repository URL + Report PDF'
  },
  {
    id: 'ASN-02',
    title: 'BGP & Subnetting Routing Protocol Analysis',
    course: 'Computer Networks (CS501)',
    faculty: 'Dr. Aris Thorne',
    dueDate: '05 Oct 2026, 05:00 PM',
    status: 'Pending',
    totalMarks: 30,
    submissionType: 'Packet Tracer (.pkt) + Design Doc'
  },
  {
    id: 'ASN-03',
    title: 'Linear Regression & SVM from Scratch in NumPy',
    course: 'Machine Learning (CS504)',
    faculty: 'Dr. Sourav Mishra',
    dueDate: '08 Oct 2026, 11:59 PM',
    status: 'Pending',
    totalMarks: 40,
    submissionType: 'Jupyter Notebook (.ipynb)'
  },
  {
    id: 'ASN-04',
    title: 'Normalized Schema Design & 3NF SQL Triggers',
    course: 'DBMS (CS503)',
    faculty: 'Dr. R. K. Behera',
    dueDate: '24 Sep 2026',
    status: 'Graded',
    score: '28 / 30',
    totalMarks: 30,
    submissionType: 'Submitted on time'
  }
];

export const INITIAL_NOTICES = [
  {
    id: 'NOT-101',
    title: 'Smart India Hackathon 2026 Internal Campus Screening',
    date: '30 Sep 2026',
    category: 'Academic',
    department: 'R&D and Innovation Cell',
    isNew: true,
    content: 'All shortlisted teams for SIH 2026 must present their working prototypes in the Auditorium at 02:00 PM tomorrow. Jury panels from leading tech firms will evaluate submissions.'
  },
  {
    id: 'NOT-102',
    title: 'Campus Central Library 24x7 Reading Room Opening for Mid-Terms',
    date: '29 Sep 2026',
    category: 'Campus Facilities',
    department: 'Library Services',
    isNew: true,
    content: 'From October 1st through Mid-Term examinations, Central Library Floors 1 & 2 will remain open 24 hours with dedicated high-speed fiber wi-fi and coffee kiosk facilities.'
  },
  {
    id: 'NOT-103',
    title: 'Semester Fee Dues: Final Clearance Window without Fine',
    date: '28 Sep 2026',
    category: 'Finance',
    department: 'Accounts Section',
    isNew: true,
    content: 'Students with outstanding balance for Monsoon 2026 must clear pending fees before October 15 to avoid hall-ticket hold and late payment surcharges.'
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'ntf_01',
    type: 'Fees',
    title: 'Fee Due Reminder',
    message: 'Hostel and Lab dues of ₹22,000 are pending. Due date: 15 Oct 2026.',
    time: '10 mins ago',
    read: false,
    actionRequired: true,
    link: '/student/fees'
  },
  {
    id: 'ntf_02',
    type: 'Attendance',
    title: 'Attendance Alert: DBMS (65%)',
    message: 'Your DBMS attendance has dipped below 75%. Attend the next 6 classes to regain eligibility.',
    time: '2 hours ago',
    read: false,
    actionRequired: true,
    link: '/student/attendance'
  },
  {
    id: 'ntf_03',
    type: 'Gate Pass',
    title: 'Gate Pass Approved',
    message: 'Your gate pass GP-2026-8841 has been approved by Warden Col. Sharma. Digital QR is ready.',
    time: '3 hours ago',
    read: true,
    actionRequired: false,
    link: '/student/gate-pass'
  },
  {
    id: 'ntf_04',
    type: 'Transport',
    title: 'Bus Route Alert',
    message: 'BUS-03 to Bhubaneswar is scheduled for 5:00 PM departure from Gate 1.',
    time: 'Yesterday',
    read: true,
    actionRequired: false,
    link: '/student/transport'
  }
];

export const HOSTEL_INFO = {
  name: 'Aryabhatta Hall of Residence',
  block: 'Block-B (Senior Wing)',
  room: 'Room 304',
  warden: 'Col. Rajesh Sharma (Retd.)',
  caretaker: 'Mr. B. K. Jena (+91 94370 44991)',
  roommates: [
    { name: 'Sai Krishna Mohanty', branch: 'CSE 3rd Yr', roll: 'BPUT2026001', bed: 'Bed A' },
    { name: 'Abhishek Pattanaik', branch: 'ECE 3rd Yr', roll: 'BPUT2026019', bed: 'Bed B' },
    { name: 'Debasish Swain', branch: 'CSE 3rd Yr', roll: 'BPUT2026034', bed: 'Bed C' }
  ],
  rules: [
    'Night roll call is strictly conducted at 09:30 PM every day.',
    'Digital Gate Pass approval is mandatory for leaving after 07:00 PM or overnight stay.',
    'Electrical heating appliances (induction cooktops, immersion rods) are strictly prohibited.',
    'Quiet hours apply between 11:00 PM and 06:00 AM in all corridors and study rooms.'
  ],
  messMenu: {
    today: 'Wednesday',
    breakfast: 'Idli, Sambar, Coconut Chutney, Boiled Egg / Banana, Tea/Coffee',
    lunch: 'Steamed Basmati Rice, Dal Tadka, Paneer Butter Masala / Fish Curry, Mixed Salad, Papad',
    snacks: 'Vegetable Samosa with Mint Chutney, Masala Chai',
    dinner: 'Tandoori Roti, Chicken Korma / Kadai Mushroom, Jeera Rice, Dal Fry, Gulab Jamun'
  }
};

// AI Study Assistant Predefined Course Contexts & Responses
export const AI_STUDY_COURSES = [
  {
    id: 'cn',
    name: 'Computer Networks (CS501)',
    modules: ['Module 1: Physical & Data Link Layer', 'Module 2: Network Layer & IP Addressing', 'Module 3: Address Resolution Protocol (ARP) & ICMP', 'Module 4: Transport Layer TCP/UDP', 'Module 5: Application Layer DNS, HTTP, SSH']
  },
  {
    id: 'os',
    name: 'Operating Systems (CS502)',
    modules: ['Module 1: Process Concept & Threads', 'Module 2: CPU Scheduling Algorithms', 'Module 3: Concurrency, Semaphores & Mutex', 'Module 4: Deadlocks & Banker Algorithm', 'Module 5: Virtual Memory & Page Replacement']
  },
  {
    id: 'dbms',
    name: 'Database Management Systems (CS503)',
    modules: ['Module 1: Relational Model & ER Diagrams', 'Module 2: Advanced SQL & Views', 'Module 3: Normalization 1NF to BCNF', 'Module 4: Transaction Processing & ACID', 'Module 5: Concurrency Control & Indexing']
  },
  {
    id: 'ml',
    name: 'Machine Learning (CS504)',
    modules: ['Module 1: Supervised Learning & Regression', 'Module 2: Classification (Logistic, SVM, Decision Trees)', 'Module 3: Unsupervised Clustering & PCA', 'Module 4: Neural Networks Fundamentals', 'Module 5: Model Evaluation & Regularization']
  }
];

export const AI_PRESET_ANSWERS = {
  arp: `### **Address Resolution Protocol (ARP) Explained Simply**

Think of ARP as the campus directory operator for your local network.

---

#### 1. Why do we need it?
* **IP Address (Logical)**: Like your college roll number or postal address. Routers use this to find what room or network you belong to.
* **MAC Address (Physical)**: Like your biometric fingerprint, permanently etched into your device's network card (NIC).

When your laptop wants to talk to a printer or default gateway on the same local network:
> It knows the target **IP Address** (e.g., \`192.168.1.1\`), but switches and Ethernet frames only deliver data using **MAC Addresses** (e.g., \`00:1A:2B:3C:4D:5E\`).

---

#### 2. How ARP Works (The 2-Step Protocol)

1. **ARP Request (Broadcast - "Hey everyone!")**:
   * Your laptop yells across the local LAN:
   > *"Who has IP 192.168.1.1? Please tell 192.168.1.45!"*
   * Every device on the local switch hears this packet (\`FF:FF:FF:FF:FF:FF\`).

2. **ARP Reply (Unicast - "It's me!")**:
   * The actual owner of that IP replies directly to your laptop's MAC:
   > *"I have 192.168.1.1! My physical MAC is 00:1A:2B:3C:4D:5E."*

3. **ARP Cache (Remembering)**:
   * Your device saves this mapping in its **ARP Table** for a few minutes so it doesn't have to scream again.

---

#### 3. Key Exam Points
* **Protocol Layer**: Operates between Layer 2 (Data Link) and Layer 3 (Network).
* **Vulnerability**: *ARP Spoofing / Cache Poisoning* — since ARP has no built-in authentication, an attacker can falsely claim they own the router's IP to intercept campus traffic.`,

  notes_cn: `### **Computer Networks: Quick Revision Notes for Exam**

* **OSI vs TCP/IP Layers**:
  * Physical -> Data Link (Frames, MAC) -> Network (Packets, IP) -> Transport (Segments, TCP/UDP) -> Application.
* **TCP vs UDP**:
  * **TCP**: Connection-oriented, 3-way handshake (SYN, SYN-ACK, ACK), reliable, flow control (Sliding Window), congestion control.
  * **UDP**: Connectionless, best-effort, lightweight, low-latency (used in DNS, VoIP, Video Streaming).
* **Subnetting Formula**:
  * Number of usable hosts = \\(2^{(32 - \\text{prefix})} - 2\\).
* **Key Protocols**:
  * **ARP**: IP to MAC resolution.
  * **DHCP**: Dynamic host configuration (DORA: Discover, Offer, Request, Acknowledge).
  * **DNS**: Domain Name to IP resolution (UDP port 53).`,

  quiz_os: `### **Practice Quiz: Operating Systems (5 Questions)**

1. **Which condition is NOT required for a deadlock to occur?**
   * A) Mutual Exclusion
   * B) Hold and Wait
   * C) Preemption *(Correct - No preemption is required)*
   * D) Circular Wait

2. **What does the dirty bit in a page table entry signify?**
   * A) The page has suffered a page fault
   * B) The page has been modified since it was read from disk *(Correct)*
   * C) The page is corrupt
   * D) The page is read-only

3. **In the Banker's Algorithm, what does the 'Need' matrix represent?**
   * \\(\\text{Need}[i][j] = \\text{Max}[i][j] - \\text{Allocation}[i][j]\\)

4. **Which scheduling algorithm can cause starvation for CPU-intensive processes?**
   * Shortest Job First (SJF) / Shortest Remaining Time First (SRTF).

5. **What is thrashing?**
   * A state where the CPU spends more time swapping pages in and out than executing useful instructions due to insufficient page frames.`,

  important_questions: `### **Top 5 High-Yield Examination Questions (Semester 5)**

1. **Computer Networks**:
   * Explain Dijkstra's Link-State algorithm vs Distance Vector algorithm (Count to Infinity problem & Split Horizon).
2. **Operating Systems**:
   * Solve a 5-process Banker's Algorithm safety & resource request problem with step-by-step vector arithmetic.
3. **DBMS**:
   * Given functional dependencies \\(R(A, B, C, D, E)\\), find candidate keys and decompose into BCNF / 3NF preserving dependencies.
4. **Machine Learning**:
   * Derive the gradient descent update rule for Logistic Regression with Cross-Entropy Loss.
5. **System Architecture**:
   * Compare microkernel vs monolithic kernel architectures in modern operating systems.`
};
