import { 
  INITIAL_MEMBERS, 
  INITIAL_SAVINGS_ACCOUNTS, 
  INITIAL_RD_ACCOUNTS, 
  INITIAL_FD_ACCOUNTS, 
  INITIAL_LOANS, 
  INITIAL_TRANSACTIONS, 
  INITIAL_COLLECTIONS, 
  INITIAL_ACCOUNTING, 
  INITIAL_STAFF, 
  INITIAL_AUDIT_LOGS,
  INITIAL_NOTIFICATIONS,
  INITIAL_INSTITUTION,
  DEFAULT_PERMISSION_MATRIX
} from '../mock/mockData';
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
  KYCStatus
} from '../types';

// In-Memory state store backed by localStorage for seamless UX persistence
const STORAGE_KEYS = {
  MEMBERS: 'bankadmin_members',
  SAVINGS: 'bankadmin_savings',
  RD: 'bankadmin_rd',
  FD: 'bankadmin_fd',
  LOANS: 'bankadmin_loans',
  TXNS: 'bankadmin_transactions',
  COLLECTIONS: 'bankadmin_collections',
  ACCOUNTING: 'bankadmin_accounting',
  STAFF: 'bankadmin_staff',
  AUDIT: 'bankadmin_audit',
  NOTIFS: 'bankadmin_notifs',
  INSTITUTION: 'bankadmin_institution',
  PERMISSIONS: 'bankadmin_permissions',
};

const getStored = <T>(key: string, fallback: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
};

const setStored = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error('Storage error:', err);
  }
};

// Member Service
export const memberService = {
  getAll: async (): Promise<Member[]> => {
    return getStored<Member[]>(STORAGE_KEYS.MEMBERS, INITIAL_MEMBERS);
  },
  getById: async (id: string): Promise<Member | undefined> => {
    const members = getStored<Member[]>(STORAGE_KEYS.MEMBERS, INITIAL_MEMBERS);
    return members.find(m => m.id === id);
  },
  create: async (memberData: Omit<Member, 'id' | 'fullName' | 'joiningDate' | 'avatar' | 'documents'>): Promise<Member> => {
    const members = getStored<Member[]>(STORAGE_KEYS.MEMBERS, INITIAL_MEMBERS);
    const newId = `M${1000 + members.length + 1}`;
    const newMember: Member = {
      ...memberData,
      id: newId,
      fullName: `${memberData.firstName} ${memberData.lastName}`,
      joiningDate: new Date().toISOString().split('T')[0],
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80',
      documents: [
        { type: 'Aadhaar Card', name: 'aadhaar_doc.pdf', status: 'Pending', fileUrl: '#', uploadedDate: new Date().toISOString().split('T')[0] },
        { type: 'PAN Card', name: 'pan_doc.pdf', status: 'Pending', fileUrl: '#', uploadedDate: new Date().toISOString().split('T')[0] },
      ]
    };
    const updated = [newMember, ...members];
    setStored(STORAGE_KEYS.MEMBERS, updated);
    auditService.log('MEMBER_CREATED', 'Members', `New member ${newMember.fullName} (${newId}) registered.`);
    return newMember;
  },
  updateKyc: async (memberId: string, status: KYCStatus, reason?: string): Promise<void> => {
    const members = getStored<Member[]>(STORAGE_KEYS.MEMBERS, INITIAL_MEMBERS);
    const updated = members.map(m => {
      if (m.id === memberId) {
        return {
          ...m,
          kycStatus: status,
          documents: m.documents.map(d => ({
            ...d,
            status,
            rejectionReason: status === 'Rejected' ? reason : undefined
          }))
        };
      }
      return m;
    });
    setStored(STORAGE_KEYS.MEMBERS, updated);
    auditService.log(status === 'Approved' ? 'KYC_APPROVED' : 'KYC_REJECTED', 'KYC Verification', `Member ${memberId} KYC status changed to ${status}.`);
  },
  toggleAccountStatus: async (memberId: string): Promise<void> => {
    const members = getStored<Member[]>(STORAGE_KEYS.MEMBERS, INITIAL_MEMBERS);
    const updated = members.map(m => {
      if (m.id === memberId) {
        return { ...m, accountStatus: m.accountStatus === 'Active' ? 'Inactive' : 'Active' as 'Active' | 'Inactive' };
      }
      return m;
    });
    setStored(STORAGE_KEYS.MEMBERS, updated);
    auditService.log('MEMBER_UPDATED', 'Members', `Toggled account status for member ${memberId}.`);
  }
};

// Savings Account Service
export const savingsService = {
  getAll: async (): Promise<SavingsAccount[]> => {
    return getStored<SavingsAccount[]>(STORAGE_KEYS.SAVINGS, INITIAL_SAVINGS_ACCOUNTS);
  },
  getByNumber: async (accountNumber: string): Promise<SavingsAccount | undefined> => {
    const accounts = getStored<SavingsAccount[]>(STORAGE_KEYS.SAVINGS, INITIAL_SAVINGS_ACCOUNTS);
    return accounts.find(a => a.accountNumber === accountNumber);
  },
  toggleFreeze: async (accountNumber: string): Promise<void> => {
    const accounts = getStored<SavingsAccount[]>(STORAGE_KEYS.SAVINGS, INITIAL_SAVINGS_ACCOUNTS);
    const updated = accounts.map(a => {
      if (a.accountNumber === accountNumber) {
        return { ...a, status: a.status === 'Active' ? 'Frozen' : 'Active' as 'Active' | 'Frozen' };
      }
      return a;
    });
    setStored(STORAGE_KEYS.SAVINGS, updated);
    auditService.log('ACCOUNT_UPDATED', 'Savings Accounts', `Account ${accountNumber} status toggled.`);
  }
};

// RD Service
export const rdService = {
  getAll: async (): Promise<RDAccount[]> => {
    return getStored<RDAccount[]>(STORAGE_KEYS.RD, INITIAL_RD_ACCOUNTS);
  },
  getByNumber: async (rdNumber: string): Promise<RDAccount | undefined> => {
    const rds = getStored<RDAccount[]>(STORAGE_KEYS.RD, INITIAL_RD_ACCOUNTS);
    return rds.find(r => r.rdNumber === rdNumber);
  }
};

// FD Service
export const fdService = {
  getAll: async (): Promise<FDAccount[]> => {
    return getStored<FDAccount[]>(STORAGE_KEYS.FD, INITIAL_FD_ACCOUNTS);
  },
  getByNumber: async (fdNumber: string): Promise<FDAccount | undefined> => {
    const fds = getStored<FDAccount[]>(STORAGE_KEYS.FD, INITIAL_FD_ACCOUNTS);
    return fds.find(f => f.fdNumber === fdNumber);
  },
  renew: async (fdNumber: string): Promise<void> => {
    const fds = getStored<FDAccount[]>(STORAGE_KEYS.FD, INITIAL_FD_ACCOUNTS);
    const updated = fds.map(f => f.fdNumber === fdNumber ? { ...f, status: 'Active' as const } : f);
    setStored(STORAGE_KEYS.FD, updated);
    auditService.log('ACCOUNT_UPDATED', 'FD Management', `FD ${fdNumber} renewed.`);
  },
  close: async (fdNumber: string): Promise<void> => {
    const fds = getStored<FDAccount[]>(STORAGE_KEYS.FD, INITIAL_FD_ACCOUNTS);
    const updated = fds.map(f => f.fdNumber === fdNumber ? { ...f, status: 'Closed' as const } : f);
    setStored(STORAGE_KEYS.FD, updated);
    auditService.log('ACCOUNT_UPDATED', 'FD Management', `FD ${fdNumber} closed upon settlement.`);
  }
};

// Loan Service
export const loanService = {
  getAll: async (): Promise<Loan[]> => {
    return getStored<Loan[]>(STORAGE_KEYS.LOANS, INITIAL_LOANS);
  },
  getById: async (loanId: string): Promise<Loan | undefined> => {
    const loans = getStored<Loan[]>(STORAGE_KEYS.LOANS, INITIAL_LOANS);
    return loans.find(l => l.loanId === loanId);
  },
  approve: async (loanId: string): Promise<void> => {
    const loans = getStored<Loan[]>(STORAGE_KEYS.LOANS, INITIAL_LOANS);
    const updated = loans.map(l => l.loanId === loanId ? { ...l, status: 'Approved' as const } : l);
    setStored(STORAGE_KEYS.LOANS, updated);
    auditService.log('LOAN_APPROVED', 'Loan Approval', `Loan ${loanId} approved by Admin.`);
  },
  reject: async (loanId: string, reason?: string): Promise<void> => {
    const loans = getStored<Loan[]>(STORAGE_KEYS.LOANS, INITIAL_LOANS);
    const updated = loans.map(l => l.loanId === loanId ? { ...l, status: 'Rejected' as const } : l);
    setStored(STORAGE_KEYS.LOANS, updated);
    auditService.log('LOAN_REJECTED', 'Loan Approval', `Loan ${loanId} rejected. Reason: ${reason || 'Criteria not met'}`);
  }
};

// Collection Service
export const collectionService = {
  getAll: async (): Promise<Collection[]> => {
    return getStored<Collection[]>(STORAGE_KEYS.COLLECTIONS, INITIAL_COLLECTIONS);
  },
  add: async (data: Omit<Collection, 'id' | 'receiptNo' | 'status'>): Promise<Collection> => {
    const collections = getStored<Collection[]>(STORAGE_KEYS.COLLECTIONS, INITIAL_COLLECTIONS);
    const id = `COL${5000 + collections.length + 1}`;
    const newCollection: Collection = {
      ...data,
      id,
      status: 'Completed',
      receiptNo: `RCP-2024-${8900 + collections.length}`
    };
    const updated = [newCollection, ...collections];
    setStored(STORAGE_KEYS.COLLECTIONS, updated);
    auditService.log('DEPOSIT', 'Cashier Collection', `Collection ${id} recorded for ₹${data.amount} via ${data.paymentMode}.`);
    return newCollection;
  }
};

// Accounting Service
export const accountingService = {
  getEntries: async (): Promise<AccountingEntry[]> => {
    return getStored<AccountingEntry[]>(STORAGE_KEYS.ACCOUNTING, INITIAL_ACCOUNTING);
  },
  addEntry: async (entry: Omit<AccountingEntry, 'id' | 'balance'>): Promise<AccountingEntry> => {
    const entries = getStored<AccountingEntry[]>(STORAGE_KEYS.ACCOUNTING, INITIAL_ACCOUNTING);
    const lastBalance = entries.length > 0 ? entries[0].balance : 1500000;
    const newBalance = entry.type === 'Income' ? lastBalance + entry.credit : lastBalance - entry.debit;
    const newEntry: AccountingEntry = {
      ...entry,
      id: `ACC-${500 + entries.length + 1}`,
      balance: newBalance
    };
    const updated = [newEntry, ...entries];
    setStored(STORAGE_KEYS.ACCOUNTING, updated);
    auditService.log(entry.type === 'Income' ? 'DEPOSIT' : 'WITHDRAWAL', 'Accounting', `Accounting entry added: ${entry.description}`);
    return newEntry;
  }
};

// Staff Service
export const staffService = {
  getAll: async (): Promise<StaffUser[]> => {
    return getStored<StaffUser[]>(STORAGE_KEYS.STAFF, INITIAL_STAFF);
  },
  add: async (staffData: Omit<StaffUser, 'id' | 'lastLogin'>): Promise<StaffUser> => {
    const staff = getStored<StaffUser[]>(STORAGE_KEYS.STAFF, INITIAL_STAFF);
    const newStaff: StaffUser = {
      ...staffData,
      id: `STF-${100 + staff.length + 1}`,
      lastLogin: 'Never'
    };
    const updated = [newStaff, ...staff];
    setStored(STORAGE_KEYS.STAFF, updated);
    auditService.log('STAFF_CREATED', 'Staff Security', `New staff user ${newStaff.name} created.`);
    return newStaff;
  },
  toggleStatus: async (id: string): Promise<void> => {
    const staff = getStored<StaffUser[]>(STORAGE_KEYS.STAFF, INITIAL_STAFF);
    const updated = staff.map(s => s.id === id ? { ...s, status: s.status === 'Active' ? 'Inactive' : 'Active' as 'Active' | 'Inactive' } : s);
    setStored(STORAGE_KEYS.STAFF, updated);
    auditService.log('STAFF_UPDATED', 'Staff Security', `Staff ${id} status modified.`);
  }
};

// Audit Service
export const auditService = {
  getAll: async (): Promise<AuditLog[]> => {
    return getStored<AuditLog[]>(STORAGE_KEYS.AUDIT, INITIAL_AUDIT_LOGS);
  },
  log: (action: string, module: string, description: string): void => {
    const logs = getStored<AuditLog[]>(STORAGE_KEYS.AUDIT, INITIAL_AUDIT_LOGS);
    const newLog: AuditLog = {
      id: `LOG-80${String(logs.length + 1).padStart(2, '0')}`,
      user: 'alok.mohapatra (Admin)',
      action,
      module,
      description,
      ipAddress: '192.168.1.15',
      dateTime: new Date().toISOString().replace('T', ' ').substring(0, 19),
      status: 'Success'
    };
    setStored(STORAGE_KEYS.AUDIT, [newLog, ...logs]);
  }
};

// Institution & Settings Service
export const settingsService = {
  getInstitution: (): InstitutionSettings => {
    return getStored<InstitutionSettings>(STORAGE_KEYS.INSTITUTION, INITIAL_INSTITUTION);
  },
  saveInstitution: (settings: InstitutionSettings): void => {
    setStored(STORAGE_KEYS.INSTITUTION, settings);
    auditService.log('SETTINGS_UPDATED', 'Settings', 'Institution settings updated.');
  },
  getPermissions: (): PermissionMatrixItem[] => {
    return getStored<PermissionMatrixItem[]>(STORAGE_KEYS.PERMISSIONS, DEFAULT_PERMISSION_MATRIX);
  },
  savePermissions: (permissions: PermissionMatrixItem[]): void => {
    setStored(STORAGE_KEYS.PERMISSIONS, permissions);
    auditService.log('PERMISSIONS_UPDATED', 'Security', 'Role permissions matrix updated.');
  }
};
