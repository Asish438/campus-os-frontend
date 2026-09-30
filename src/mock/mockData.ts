import { 
  Member, 
  SavingsAccount, 
  RDAccount, 
  FDAccount, 
  Loan, 
  Transaction, 
  Collection, 
  AccountingEntry, 
  StaffUser, 
  AuditLog, 
  AppNotification, 
  InstitutionSettings,
  PermissionMatrixItem,
  UserRole
} from '../types';

export const INITIAL_INSTITUTION: InstitutionSettings = {
  name: 'Odisha State Apex Co-operative Bank Ltd.',
  subtitle: 'Head Office & Central Administration',
  registrationNumber: 'OSACB/REG/1984/0491',
  address: 'Plot No. 142, Sahid Nagar, Janpath, Bhubaneswar, Odisha - 751007',
  phone: '+91 674 254 8921',
  email: 'admin@apexcoopbank.in',
  website: 'https://apexcoopbank.in',
  branch: 'Main Branch - Bhubaneswar',
  currency: '₹ (INR)',
};

// Helper for Indian Currency Formatting
export const formatINR = (val: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);
};

// Realistic Indian Names & Cities
const firstNames = [
  'Rahul', 'Priya', 'Amit', 'Sneha', 'Rohit', 'Sunita', 'Rajesh', 'Deepak', 'Manas', 'Pooja',
  'Sanjay', 'Ananya', 'Alok', 'Smita', 'Bikash', 'Swati', 'Tapan', 'Rasmita', 'Debasish', 'Monalisa',
  'Subhash', 'Nibedita', 'Pradeep', 'Lipika', 'Soumya', 'Barsha', 'Kailash', 'Meenakshi', 'Chitta', 'Santosh',
  'Gayatri', 'Jitendra', 'Archana', 'Ashok', 'Sasmita', 'Bibhuti', 'Sandhya', 'Biswajit', 'Kavita', 'Suresh',
  'Geetanjali', 'Sudhir', 'Mamata', 'Manoj', 'Bijay', 'Suchitra', 'Niranjan', 'Jayanti', 'Harish', 'Pranati',
  'Abhimanyu', 'Urmila', 'Ranjan', 'Tanushree', 'Prakash'
];

const lastNames = [
  'Kumar', 'Sharma', 'Das', 'Patra', 'Mehta', 'Mohanty', 'Nayak', 'Jena', 'Rout', 'Verma',
  'Mishra', 'Sahoo', 'Pradhan', 'Behera', 'Samal', 'Tripathy', 'Panda', 'Swain', 'Panigrahi', 'Barik',
  'Muduli', 'Acharya', 'Mallick', 'Padhi', 'Bhoi', 'Biswal', 'Mohapatra', 'Sethy', 'Khatua', 'Kar'
];

const cities = [
  'Bhubaneswar', 'Cuttack', 'Puri', 'Rourkela', 'Sambalpur', 
  'Berhampur', 'Balasore', 'Angul', 'Baripada', 'Jharsuguda'
];

const branches = [
  'Bhubaneswar Main Branch',
  'Cuttack Link Road Branch',
  'Puri Grand Road Branch',
  'Rourkela Civil Township Branch',
  'Sambalpur VSS Marg Branch'
];

const occupations = [
  'Government Employee', 'Software Engineer', 'Small Business Owner', 'Teacher', 
  'Agricultural Farmer', 'Civil Contractor', 'Chartered Accountant', 'Healthcare Worker',
  'Retailer', 'Transport Operator'
];

// Generate 55 Members
export const INITIAL_MEMBERS: Member[] = Array.from({ length: 55 }, (_, i) => {
  const fName = firstNames[i % firstNames.length];
  const lName = lastNames[i % lastNames.length];
  const city = cities[i % cities.length];
  const idNum = 1001 + i;
  const isPending = i % 5 === 2;
  const isRejected = i % 14 === 0;
  const isReview = i % 7 === 3;
  const kycStatus = isRejected ? 'Rejected' : isPending ? 'Pending' : isReview ? 'Under Review' : 'Approved';
  const accountStatus = i % 12 === 0 ? 'Inactive' : 'Active';

  return {
    id: `M${idNum}`,
    firstName: fName,
    lastName: lName,
    fullName: `${fName} ${lName}`,
    dob: `19${75 + (i % 25)}-0${(i % 9) + 1}-${10 + (i % 18)}`,
    gender: i % 3 === 1 ? 'Female' : 'Male',
    mobile: `+91 ${9800000000 + i * 37319}`,
    email: `${fName.toLowerCase()}.${lName.toLowerCase()}${idNum}@gmail.com`,
    address: `Plot #${12 + i}, Sector ${(i % 9) + 1}, VIP Enclave`,
    city,
    state: 'Odisha',
    pinCode: `75${1001 + (i % 30)}`,
    occupation: occupations[i % occupations.length],
    nomineeName: `${firstNames[(i + 15) % firstNames.length]} ${lName}`,
    nomineeRelation: i % 2 === 0 ? 'Spouse' : 'Child',
    branch: branches[i % branches.length],
    kycStatus,
    accountStatus,
    joiningDate: `2024-0${(i % 9) + 1}-${10 + (i % 18)}`,
    avatar: `https://images.unsplash.com/photo-${1500000000000 + (i * 1234567) % 99999999}?auto=format&fit=crop&w=120&h=120&q=80`,
    documents: [
      {
        type: 'Aadhaar Card',
        name: `AADHAAR_${idNum}.pdf`,
        status: kycStatus,
        fileUrl: '#',
        uploadedDate: `2024-0${(i % 9) + 1}-12`,
        documentNumber: `XXXX-XXXX-${4000 + (i * 17) % 5000}`,
        rejectionReason: isRejected ? 'Document text blurry and edges cropped.' : undefined
      },
      {
        type: 'PAN Card',
        name: `PAN_${idNum}.pdf`,
        status: kycStatus,
        fileUrl: '#',
        uploadedDate: `2024-0${(i % 9) + 1}-12`,
        documentNumber: `ABCDE${1000 + i}F`,
        rejectionReason: isRejected ? 'Signature mismatch with personal declaration.' : undefined
      },
      {
        type: 'Address Proof',
        name: `ELECTRICITY_BILL_${idNum}.pdf`,
        status: kycStatus,
        fileUrl: '#',
        uploadedDate: `2024-0${(i % 9) + 1}-12`,
        documentNumber: `BILL-${9000 + i}`
      }
    ]
  };
});

// Generate 35 Savings Accounts
export const INITIAL_SAVINGS_ACCOUNTS: SavingsAccount[] = Array.from({ length: 35 }, (_, i) => {
  const member = INITIAL_MEMBERS[i % INITIAL_MEMBERS.length];
  const isFrozen = i === 4 || i === 18;
  const isClosed = i === 29;
  const status = isFrozen ? 'Frozen' : isClosed ? 'Closed' : 'Active';
  const balance = 12000 + ((i * 47321) % 450000);

  return {
    accountNumber: `SB${10029300 + i}`,
    memberId: member.id,
    memberName: member.fullName,
    openingDate: member.joiningDate,
    balance,
    status,
    interestRate: 4.0
  };
});

// Generate 25 RD Accounts
export const INITIAL_RD_ACCOUNTS: RDAccount[] = Array.from({ length: 25 }, (_, i) => {
  const member = INITIAL_MEMBERS[(i + 5) % INITIAL_MEMBERS.length];
  const installmentAmount = [1000, 2000, 3000, 5000, 10000][i % 5];
  const tenureMonths = [12, 24, 36, 48, 60][i % 5];
  const paidInstallments = Math.min(tenureMonths, (i % 8) + 4);
  const status = paidInstallments >= tenureMonths ? 'Matured' : i % 7 === 1 ? 'Pending' : 'Active';
  const maturityAmount = Math.round(installmentAmount * tenureMonths * 1.12);

  const schedule = Array.from({ length: Math.min(tenureMonths, 12) }, (_, s) => {
    const isPaid = s < paidInstallments;
    return {
      installmentNo: s + 1,
      dueDate: `2024-0${Math.min(9, s + 1)}-15`,
      amount: installmentAmount,
      paidDate: isPaid ? `2024-0${Math.min(9, s + 1)}-14` : undefined,
      status: isPaid ? ('Paid' as const) : s === paidInstallments ? ('Pending' as const) : ('Overdue' as const)
    };
  });

  return {
    rdNumber: `RD${500100 + i}`,
    memberId: member.id,
    memberName: member.fullName,
    installmentAmount,
    frequency: 'Monthly',
    interestRate: 7.25,
    tenureMonths,
    startDate: '2024-01-15',
    maturityDate: `202${5 + Math.floor(tenureMonths / 12)}-01-15`,
    maturityAmount,
    paidInstallments,
    totalInstallments: tenureMonths,
    status,
    schedule
  };
});

// Generate 25 FD Accounts
export const INITIAL_FD_ACCOUNTS: FDAccount[] = Array.from({ length: 25 }, (_, i) => {
  const member = INITIAL_MEMBERS[(i + 10) % INITIAL_MEMBERS.length];
  const principalAmount = [25000, 50000, 100000, 250000, 500000][i % 5];
  const tenureMonths = [12, 24, 36, 60][i % 4];
  const interestRate = 7.75;
  const maturityAmount = Math.round(principalAmount * Math.pow(1 + (interestRate / 100) / 4, (tenureMonths / 12) * 4));
  const status = i === 2 || i === 8 ? 'Maturing Soon' : i === 20 ? 'Matured' : 'Active';

  return {
    fdNumber: `FD${800300 + i}`,
    memberId: member.id,
    memberName: member.fullName,
    principalAmount,
    interestRate,
    tenureMonths,
    startDate: '2023-04-10',
    maturityDate: i === 2 ? '2024-10-05' : '2025-04-10',
    maturityAmount,
    status
  };
});

// Generate 25 Loans
export const INITIAL_LOANS: Loan[] = Array.from({ length: 25 }, (_, i) => {
  const member = INITIAL_MEMBERS[(i + 15) % INITIAL_MEMBERS.length];
  const types: Loan['loanType'][] = [
    'Personal Loan', 'Home Loan', 'Vehicle Loan', 'Agriculture Loan', 'Business Loan', 'Gold Loan'
  ];
  const loanType = types[i % types.length];
  const requestedAmount = [100000, 250000, 500000, 1200000, 2000000, 350000][i % 6];
  const approvedAmount = Math.round(requestedAmount * 0.95);
  const interestRate = [9.5, 8.75, 9.0, 7.0, 11.5, 8.5][i % 6];
  const tenureMonths = [24, 60, 36, 12, 48, 18][i % 6];
  const monthlyRate = interestRate / 12 / 100;
  const emi = Math.round(
    (approvedAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
    (Math.pow(1 + monthlyRate, tenureMonths) - 1)
  );
  const statuses: Loan['status'][] = [
    'Active', 'Active', 'Pending', 'Under Review', 'Approved', 'Overdue', 'Completed', 'Rejected'
  ];
  const status = statuses[i % statuses.length];
  const outstandingAmount = status === 'Completed' ? 0 : Math.round(approvedAmount * 0.72);

  const schedule = Array.from({ length: 12 }, (_, s) => {
    const isPaid = s < 5 && status !== 'Pending';
    const isOverdue = s === 5 && status === 'Overdue';
    return {
      emiNo: s + 1,
      dueDate: `2024-0${Math.min(9, s + 1)}-10`,
      principal: Math.round(emi * 0.65),
      interest: Math.round(emi * 0.35),
      emiAmount: emi,
      paidAmount: isPaid ? emi : 0,
      status: isPaid ? ('Paid' as const) : isOverdue ? ('Overdue' as const) : ('Pending' as const)
    };
  });

  return {
    loanId: `LN${10020 + i}`,
    memberId: member.id,
    memberName: member.fullName,
    loanType,
    requestedAmount,
    approvedAmount,
    interestRate,
    tenureMonths,
    emi,
    outstandingAmount,
    disbursementDate: '2024-01-20',
    status,
    schedule
  };
});

// Generate 60 Transactions
export const INITIAL_TRANSACTIONS: Transaction[] = Array.from({ length: 60 }, (_, i) => {
  const member = INITIAL_MEMBERS[i % INITIAL_MEMBERS.length];
  const types: Transaction['type'][] = [
    'Deposit', 'Withdrawal', 'RD Installment', 'Loan EMI', 'FD Deposit', 'Interest'
  ];
  const type = types[i % types.length];
  const modes: Transaction['paymentMode'][] = ['Cash', 'UPI', 'Bank Transfer'];
  const paymentMode = modes[i % modes.length];
  const amounts = [5000, 2000, 5250, 50000, 12000, 8500, 25000, 1500, 3000];
  const amount = amounts[i % amounts.length];

  return {
    id: `TXN${98400 + i}`,
    memberId: member.id,
    memberName: member.fullName,
    accountNumber: `SB${10029300 + (i % 35)}`,
    type,
    amount,
    previousBalance: 45000 + i * 500,
    newBalance: type === 'Withdrawal' ? (45000 + i * 500 - amount) : (45000 + i * 500 + amount),
    paymentMode,
    date: `2024-09-${String(20 - (i % 15)).padStart(2, '0')} 11:${String((i * 7) % 60).padStart(2, '0')}`,
    referenceNumber: `REF-IN-${20240900 + i}`
  };
});

// Generate 25 Cashier Collections
export const INITIAL_COLLECTIONS: Collection[] = Array.from({ length: 25 }, (_, i) => {
  const member = INITIAL_MEMBERS[(i + 8) % INITIAL_MEMBERS.length];
  const types: Collection['collectionType'][] = [
    'Savings Deposit', 'RD Installment', 'Loan EMI', 'FD Deposit', 'Other'
  ];
  const modes: Collection['paymentMode'][] = ['Cash', 'UPI', 'Bank Transfer'];
  const cashiers = ['Sunil Mohanty (Cashier-1)', 'Anita Biswal (Cashier-2)', 'Debendra Sahu (Desk-3)'];
  const amounts = [5250, 2000, 15000, 8500, 25000, 50000, 3500];

  return {
    id: `COL${5010 + i}`,
    memberId: member.id,
    memberName: member.fullName,
    collectionType: types[i % types.length],
    amount: amounts[i % amounts.length],
    paymentMode: modes[i % modes.length],
    collectedBy: cashiers[i % cashiers.length],
    date: `2024-09-${String(22 - (i % 5)).padStart(2, '0')} 10:${String((i * 9) % 60).padStart(2, '0')}`,
    status: 'Completed',
    receiptNo: `RCP-2024-${8800 + i}`
  };
});

// Generate Accounting Ledger Entries
export const INITIAL_ACCOUNTING: AccountingEntry[] = [
  { id: 'ACC-101', date: '2024-09-22', description: 'Loan EMI Collections for Today', category: 'Interest', type: 'Income', debit: 0, credit: 185000, balance: 1485230, paymentMode: 'UPI' },
  { id: 'ACC-102', date: '2024-09-22', description: 'Counter Cash Deposits', category: 'Service Charges', type: 'Income', debit: 0, credit: 125000, balance: 1610230, paymentMode: 'Cash' },
  { id: 'ACC-103', date: '2024-09-21', description: 'Office Generator Fuel & Maintenance', category: 'Maintenance', type: 'Expense', debit: 14500, credit: 0, balance: 1470730, paymentMode: 'Bank Transfer' },
  { id: 'ACC-104', date: '2024-09-21', description: 'Late Payment Penalties collected', category: 'Penalty', type: 'Income', debit: 0, credit: 8400, balance: 1479130, paymentMode: 'Cash' },
  { id: 'ACC-105', date: '2024-09-20', description: 'Staff Monthly Tea & Hospitality Expense', category: 'Office Expense', type: 'Expense', debit: 6200, credit: 0, balance: 1472930, paymentMode: 'UPI' },
  { id: 'ACC-106', date: '2024-09-18', description: 'Electricity Bill - Bhubaneswar HO', category: 'Electricity', type: 'Expense', debit: 38400, credit: 0, balance: 1434530, paymentMode: 'Bank Transfer' },
  { id: 'ACC-107', date: '2024-09-15', description: 'Staff Monthly Salary Advance', category: 'Salary', type: 'Expense', debit: 180000, credit: 0, balance: 1254530, paymentMode: 'Bank Transfer' },
  { id: 'ACC-108', date: '2024-09-10', description: 'Annual Server & Cloud Security Maintenance', category: 'Other', type: 'Expense', debit: 45000, credit: 0, balance: 1209530, paymentMode: 'Bank Transfer' }
];

// Generate 22 Staff Users
export const INITIAL_STAFF: StaffUser[] = [
  { id: 'STF-101', name: 'Alok Ranjan Mohapatra', email: 'alok.mohapatra@apexcoopbank.in', mobile: '+91 94370 12345', role: 'Super Admin', status: 'Active', lastLogin: 'Today, 09:30 AM', branch: 'Bhubaneswar Main Branch' },
  { id: 'STF-102', name: 'Smita Tripathy', email: 'smita.tripathy@apexcoopbank.in', mobile: '+91 94371 23456', role: 'Manager', status: 'Active', lastLogin: 'Today, 09:15 AM', branch: 'Bhubaneswar Main Branch' },
  { id: 'STF-103', name: 'Debasish Panda', email: 'debasish.panda@apexcoopbank.in', mobile: '+91 94372 34567', role: 'Accountant', status: 'Active', lastLogin: 'Yesterday, 06:10 PM', branch: 'Bhubaneswar Main Branch' },
  { id: 'STF-104', name: 'Sunil Mohanty', email: 'sunil.mohanty@apexcoopbank.in', mobile: '+91 94373 45678', role: 'Cashier', status: 'Active', lastLogin: 'Today, 08:45 AM', branch: 'Bhubaneswar Main Branch' },
  { id: 'STF-105', name: 'Anita Biswal', email: 'anita.biswal@apexcoopbank.in', mobile: '+91 94374 56789', role: 'Cashier', status: 'Active', lastLogin: 'Today, 08:50 AM', branch: 'Cuttack Link Road Branch' },
  { id: 'STF-106', name: 'Bikash Rout', email: 'bikash.rout@apexcoopbank.in', mobile: '+91 94375 67890', role: 'Loan Officer', status: 'Active', lastLogin: 'Today, 10:00 AM', branch: 'Bhubaneswar Main Branch' },
  { id: 'STF-107', name: 'Rasmita Mishra', email: 'rasmita.mishra@apexcoopbank.in', mobile: '+91 94376 78901', role: 'KYC Officer', status: 'Active', lastLogin: 'Today, 09:40 AM', branch: 'Bhubaneswar Main Branch' },
  { id: 'STF-108', name: 'Tapan Kumar Behera', email: 'tapan.behera@apexcoopbank.in', mobile: '+91 94377 89012', role: 'Manager', status: 'Active', lastLogin: 'Yesterday, 04:30 PM', branch: 'Cuttack Link Road Branch' },
  { id: 'STF-109', name: 'Lipika Pradhan', email: 'lipika.pradhan@apexcoopbank.in', mobile: '+91 94378 90123', role: 'Loan Officer', status: 'Active', lastLogin: 'Yesterday, 05:20 PM', branch: 'Puri Grand Road Branch' },
  { id: 'STF-110', name: 'Soumya Sahu', email: 'soumya.sahu@apexcoopbank.in', mobile: '+91 94379 01234', role: 'KYC Officer', status: 'Inactive', lastLogin: '2024-09-10', branch: 'Rourkela Civil Township Branch' },
  { id: 'STF-111', name: 'Kailash Ch. Jena', email: 'kailash.jena@apexcoopbank.in', mobile: '+91 94380 12345', role: 'Accountant', status: 'Active', lastLogin: 'Today, 10:15 AM', branch: 'Sambalpur VSS Marg Branch' },
  { id: 'STF-112', name: 'Meenakshi Nayak', email: 'meenakshi.nayak@apexcoopbank.in', mobile: '+91 94381 23456', role: 'Cashier', status: 'Active', lastLogin: 'Today, 09:05 AM', branch: 'Puri Grand Road Branch' },
  { id: 'STF-113', name: 'Santosh Kumar Barik', email: 'santosh.barik@apexcoopbank.in', mobile: '+91 94382 34567', role: 'Admin', status: 'Active', lastLogin: 'Today, 09:00 AM', branch: 'Head Office' },
  { id: 'STF-114', name: 'Gayatri Swain', email: 'gayatri.swain@apexcoopbank.in', mobile: '+91 94383 45678', role: 'Loan Officer', status: 'Active', lastLogin: 'Today, 10:45 AM', branch: 'Cuttack Link Road Branch' },
  { id: 'STF-115', name: 'Jitendra Muduli', email: 'jitendra.muduli@apexcoopbank.in', mobile: '+91 94384 56789', role: 'KYC Officer', status: 'Active', lastLogin: 'Today, 08:30 AM', branch: 'Sambalpur VSS Marg Branch' },
  { id: 'STF-116', name: 'Archana Padhi', email: 'archana.padhi@apexcoopbank.in', mobile: '+91 94385 67890', role: 'Manager', status: 'Active', lastLogin: 'Yesterday, 05:40 PM', branch: 'Puri Grand Road Branch' },
  { id: 'STF-117', name: 'Ashok Bhoi', email: 'ashok.bhoi@apexcoopbank.in', mobile: '+91 94386 78901', role: 'Cashier', status: 'Inactive', lastLogin: '2024-09-08', branch: 'Head Office' },
  { id: 'STF-118', name: 'Sasmita Acharya', email: 'sasmita.acharya@apexcoopbank.in', mobile: '+91 94387 89012', role: 'Accountant', status: 'Active', lastLogin: 'Today, 09:55 AM', branch: 'Cuttack Link Road Branch' },
  { id: 'STF-119', name: 'Sandhya Biswal', email: 'sandhya.biswal@apexcoopbank.in', mobile: '+91 94388 90123', role: 'Loan Officer', status: 'Active', lastLogin: 'Today, 11:00 AM', branch: 'Rourkela Civil Township Branch' },
  { id: 'STF-120', name: 'Pranati Das', email: 'pranati.das@apexcoopbank.in', mobile: '+91 94389 01234', role: 'KYC Officer', status: 'Active', lastLogin: 'Today, 09:20 AM', branch: 'Cuttack Link Road Branch' }
];

// 50+ Audit Logs
export const INITIAL_AUDIT_LOGS: AuditLog[] = Array.from({ length: 52 }, (_, i) => {
  const users = ['alok.mohapatra', 'smita.tripathy', 'debasish.panda', 'sunil.mohanty', 'bikash.rout', 'rasmita.mishra'];
  const actions = [
    'LOGIN', 'LOGOUT', 'MEMBER_CREATED', 'MEMBER_UPDATED', 'KYC_APPROVED', 
    'KYC_REJECTED', 'ACCOUNT_CREATED', 'ACCOUNT_UPDATED', 'DEPOSIT', 'WITHDRAWAL', 
    'LOAN_APPROVED', 'LOAN_REJECTED', 'REPORT_EXPORTED'
  ];
  const modules = [
    'Auth', 'Members', 'KYC Verification', 'Savings Accounts', 'Cashier Collection', 
    'Loan Approval', 'Accounting', 'Reports', 'Staff Security'
  ];
  const action = actions[i % actions.length];
  const user = users[i % users.length];
  const module = modules[i % modules.length];
  const status = i % 17 === 3 ? 'Failed' : i % 25 === 7 ? 'Warning' : 'Success';

  return {
    id: `LOG-80${String(i + 1).padStart(2, '0')}`,
    user,
    action,
    module,
    description: `Action ${action} executed by user ${user} for reference REF-${1000 + i}.`,
    ipAddress: `192.168.1.${10 + (i % 80)}`,
    dateTime: `2024-09-22 10:${String(59 - (i % 60)).padStart(2, '0')}:${String((i * 13) % 60).padStart(2, '0')}`,
    status
  };
});

// Notifications
export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  { id: 'NOTIF-1', title: 'KYC Verification Pending', description: 'KYC verification pending for Member M1002 (Priya Sharma)', time: '10 mins ago', type: 'kyc', read: false, link: '/kyc' },
  { id: 'NOTIF-2', title: 'Overdue Loan Alert', description: 'Loan LN10025 is overdue for Member Amit Das. EMI ₹8,450 unpaid.', time: '25 mins ago', type: 'loan', read: false, link: '/loans' },
  { id: 'NOTIF-3', title: 'FD Maturing Soon', description: 'FD FD10021 is maturing in 7 days for Sneha Patra.', time: '1 hour ago', type: 'fd', read: false, link: '/fd' },
  { id: 'NOTIF-4', title: 'New Member Registered', description: 'New member Rahul Kumar (M1001) registered from Bhubaneswar Branch.', time: '2 hours ago', type: 'member', read: true, link: '/members' },
  { id: 'NOTIF-5', title: 'Cashier Limit Reached', description: 'Cashier Sunil Mohanty counter cash vault balance exceeded ₹3,00,000.', time: '3 hours ago', type: 'system', read: true, link: '/collections' }
];

// Role & Permissions Initial Matrix
export const DEFAULT_PERMISSION_MATRIX: PermissionMatrixItem[] = [
  { module: 'Dashboard', view: true, create: false, edit: false, delete: false, approve: false, export: true },
  { module: 'Members', view: true, create: true, edit: true, delete: true, approve: false, export: true },
  { module: 'KYC', view: true, create: true, edit: true, delete: false, approve: true, export: true },
  { module: 'Savings', view: true, create: true, edit: true, delete: false, approve: true, export: true },
  { module: 'RD', view: true, create: true, edit: true, delete: false, approve: true, export: true },
  { module: 'FD', view: true, create: true, edit: true, delete: false, approve: true, export: true },
  { module: 'Loans', view: true, create: true, edit: true, delete: false, approve: true, export: true },
  { module: 'Collection', view: true, create: true, edit: true, delete: false, approve: true, export: true },
  { module: 'Accounting', view: true, create: true, edit: true, delete: false, approve: true, export: true },
  { module: 'Reports', view: true, create: false, edit: false, delete: false, approve: false, export: true },
  { module: 'Staff', view: true, create: true, edit: true, delete: true, approve: true, export: true },
  { module: 'Security', view: true, create: false, edit: false, delete: false, approve: false, export: true },
  { module: 'Settings', view: true, create: true, edit: true, delete: false, approve: true, export: true }
];

// Dashboard Charts Data
export const MEMBER_GROWTH_DATA = {
  thisYear: [
    { month: 'Jan', members: 780, active: 720 },
    { month: 'Feb', members: 840, active: 780 },
    { month: 'Mar', members: 910, active: 850 },
    { month: 'Apr', members: 970, active: 900 },
    { month: 'May', members: 1040, active: 960 },
    { month: 'Jun', members: 1100, active: 1010 },
    { month: 'Jul', members: 1160, active: 1070 },
    { month: 'Aug', members: 1210, active: 1100 },
    { month: 'Sep', members: 1248, active: 1132 },
  ],
  lastYear: [
    { month: 'Jan', members: 520, active: 480 },
    { month: 'Feb', members: 560, active: 510 },
    { month: 'Mar', members: 610, active: 560 },
    { month: 'Apr', members: 650, active: 600 },
    { month: 'May', members: 690, active: 640 },
    { month: 'Jun', members: 720, active: 670 },
    { month: 'Jul', members: 745, active: 690 },
    { month: 'Aug', members: 770, active: 710 },
    { month: 'Sep', members: 780, active: 720 },
  ]
};

export const COLLECTION_OVERVIEW_DATA = [
  { month: 'Apr', cash: 125000, upi: 185000, bankTransfer: 95000 },
  { month: 'May', cash: 140000, upi: 210000, bankTransfer: 110000 },
  { month: 'Jun', cash: 135000, upi: 240000, bankTransfer: 125000 },
  { month: 'Jul', cash: 160000, upi: 280000, bankTransfer: 140000 },
  { month: 'Aug', cash: 155000, upi: 310000, bankTransfer: 150000 },
  { month: 'Sep', cash: 175000, upi: 345000, bankTransfer: 165000 },
];

export const LOAN_STATUS_DATA = [
  { name: 'Active', value: 98, color: '#16a34a' },
  { name: 'Pending', value: 24, color: '#f59e0b' },
  { name: 'Approved', value: 16, color: '#3b82f6' },
  { name: 'Rejected', value: 8, color: '#ef4444' },
  { name: 'Completed', value: 45, color: '#8b5cf6' },
  { name: 'Overdue', value: 12, color: '#dc2626' },
];
