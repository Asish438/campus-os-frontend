export type UserRole = 
  | 'Super Admin' 
  | 'Admin' 
  | 'Manager' 
  | 'Accountant' 
  | 'Cashier' 
  | 'Loan Officer' 
  | 'KYC Officer';

export type KYCStatus = 'Approved' | 'Pending' | 'Under Review' | 'Rejected';
export type AccountStatus = 'Active' | 'Inactive' | 'Frozen' | 'Closed';
export type LoanStatus = 'Pending' | 'Under Review' | 'Approved' | 'Rejected' | 'Active' | 'Completed' | 'Overdue';
export type PaymentMode = 'Cash' | 'UPI' | 'Bank Transfer';

export interface MemberDocument {
  type: string;
  name: string;
  status: KYCStatus;
  fileUrl: string;
  uploadedDate: string;
  documentNumber?: string;
  rejectionReason?: string;
}

export interface Member {
  id: string; // M1001
  firstName: string;
  middleName?: string;
  lastName: string;
  fullName: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other';
  mobile: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
  occupation: string;
  nomineeName: string;
  nomineeRelation: string;
  branch: string;
  kycStatus: KYCStatus;
  accountStatus: 'Active' | 'Inactive';
  joiningDate: string;
  avatar: string;
  documents: MemberDocument[];
}

export interface KYCRecord {
  id: string; // KYC-201
  memberId: string;
  memberName: string;
  memberMobile: string;
  documentType: string;
  documentNumber: string;
  submittedDate: string;
  status: KYCStatus;
  reviewedBy: string;
  rejectionReason?: string;
}

export interface SavingsAccount {
  accountNumber: string; // SB10029381
  memberId: string;
  memberName: string;
  openingDate: string;
  balance: number;
  status: 'Active' | 'Frozen' | 'Closed';
  interestRate: number; // e.g., 4.0
}

export interface RDInstallment {
  installmentNo: number;
  dueDate: string;
  amount: number;
  paidDate?: string;
  status: 'Paid' | 'Pending' | 'Overdue';
}

export interface RDAccount {
  rdNumber: string; // RD500124
  memberId: string;
  memberName: string;
  installmentAmount: number;
  frequency: 'Monthly' | 'Quarterly';
  interestRate: number; // 7.0
  tenureMonths: number;
  startDate: string;
  maturityDate: string;
  maturityAmount: number;
  paidInstallments: number;
  totalInstallments: number;
  status: 'Active' | 'Pending' | 'Matured' | 'Closed';
  schedule: RDInstallment[];
}

export interface FDAccount {
  fdNumber: string; // FD800392
  memberId: string;
  memberName: string;
  principalAmount: number;
  interestRate: number; // 7.5
  tenureMonths: number;
  startDate: string;
  maturityDate: string;
  maturityAmount: number;
  status: 'Active' | 'Maturing Soon' | 'Matured' | 'Closed';
}

export interface LoanEMISchedule {
  emiNo: number;
  dueDate: string;
  principal: number;
  interest: number;
  emiAmount: number;
  paidAmount: number;
  status: 'Paid' | 'Pending' | 'Partial' | 'Overdue';
}

export interface Loan {
  loanId: string; // LN10025
  memberId: string;
  memberName: string;
  loanType: 'Personal Loan' | 'Home Loan' | 'Vehicle Loan' | 'Agriculture Loan' | 'Business Loan' | 'Gold Loan';
  requestedAmount: number;
  approvedAmount: number;
  interestRate: number; // e.g. 10.5
  tenureMonths: number;
  emi: number;
  outstandingAmount: number;
  disbursementDate: string;
  status: LoanStatus;
  schedule: LoanEMISchedule[];
}

export interface Transaction {
  id: string; // TXN98412
  memberId: string;
  memberName: string;
  accountNumber?: string;
  type: 'Deposit' | 'Withdrawal' | 'RD Installment' | 'Loan EMI' | 'FD Deposit' | 'Interest' | 'Transfer';
  amount: number;
  previousBalance?: number;
  newBalance?: number;
  paymentMode: PaymentMode;
  date: string;
  referenceNumber?: string;
}

export interface Collection {
  id: string; // COL5012
  memberId: string;
  memberName: string;
  collectionType: 'Savings Deposit' | 'RD Installment' | 'Loan EMI' | 'FD Deposit' | 'Other';
  amount: number;
  paymentMode: PaymentMode;
  collectedBy: string;
  date: string;
  status: 'Completed' | 'Pending' | 'Cancelled';
  receiptNo: string;
}

export interface AccountingEntry {
  id: string; // ACC-401
  date: string;
  description: string;
  category: string;
  type: 'Income' | 'Expense';
  debit: number;
  credit: number;
  balance: number;
  paymentMode: PaymentMode;
}

export interface StaffUser {
  id: string; // STF-101
  name: string;
  email: string;
  mobile: string;
  role: UserRole;
  status: 'Active' | 'Inactive';
  lastLogin: string;
  branch: string;
}

export interface PermissionMatrixItem {
  module: string;
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
  approve: boolean;
  export: boolean;
}

export interface AuditLog {
  id: string; // LOG-8001
  user: string;
  action: string;
  module: string;
  description: string;
  ipAddress: string;
  dateTime: string;
  status: 'Success' | 'Failed' | 'Warning';
}

export interface AppNotification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'kyc' | 'loan' | 'fd' | 'member' | 'system';
  read: boolean;
  link?: string;
}

export interface InstitutionSettings {
  name: string;
  subtitle: string;
  registrationNumber: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  branch: string;
  currency: string;
}
