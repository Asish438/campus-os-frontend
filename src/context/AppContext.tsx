import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserRole, AppNotification, Member, SavingsAccount, Loan, Transaction, RDAccount, FDAccount } from '../types';
import { INITIAL_NOTIFICATIONS } from '../mock/mockData';
import { memberService, savingsService, loanService, rdService, fdService } from '../services/apiService';

interface GlobalSearchResult {
  type: 'Member' | 'Account' | 'RD' | 'FD' | 'Loan' | 'Transaction';
  id: string;
  title: string;
  subtitle: string;
  url: string;
}

interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  compactMode: boolean;
  toggleCompactMode: () => void;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  desktopSidebarCollapsed: boolean;
  toggleDesktopSidebar: () => void;
  notifications: AppNotification[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  unreadNotificationCount: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: GlobalSearchResult[];
  isSearching: boolean;
  clearSearch: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('bankadmin_theme');
    return (saved === 'dark' || saved === 'light') ? saved : 'light';
  });

  const [compactMode, setCompactMode] = useState<boolean>(() => {
    return localStorage.getItem('bankadmin_compact') === 'true';
  });

  // Current Role (Super Admin by default)
  const [currentRole, setCurrentRole] = useState<UserRole>('Super Admin');

  // Sidebar states
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [desktopSidebarCollapsed, setDesktopSidebarCollapsed] = useState<boolean>(false);

  // Notifications
  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('bankadmin_notifs');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // Search
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<GlobalSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Synchronize theme class on document element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('bankadmin_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const toggleCompactMode = () => {
    setCompactMode(prev => {
      const next = !prev;
      localStorage.setItem('bankadmin_compact', String(next));
      return next;
    });
  };

  const toggleDesktopSidebar = () => {
    setDesktopSidebarCollapsed(prev => !prev);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => {
      const updated = prev.map(n => n.id === id ? { ...n, read: true } : n);
      localStorage.setItem('bankadmin_notifs', JSON.stringify(updated));
      return updated;
    });
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => {
      const updated = prev.map(n => ({ ...n, read: true }));
      localStorage.setItem('bankadmin_notifs', JSON.stringify(updated));
      return updated;
    });
  };

  const unreadNotificationCount = notifications.filter(n => !n.read).length;

  // Search logic
  useEffect(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timeout = setTimeout(async () => {
      try {
        const [members, savings, rds, fds, loans] = await Promise.all([
          memberService.getAll(),
          savingsService.getAll(),
          rdService.getAll(),
          fdService.getAll(),
          loanService.getAll()
        ]);

        const results: GlobalSearchResult[] = [];

        // Search Members
        members.forEach(m => {
          if (
            m.fullName.toLowerCase().includes(query) ||
            m.id.toLowerCase().includes(query) ||
            m.mobile.includes(query)
          ) {
            results.push({
              type: 'Member',
              id: m.id,
              title: `${m.fullName} (${m.id})`,
              subtitle: `Mobile: ${m.mobile} • Branch: ${m.branch}`,
              url: `/members/${m.id}`
            });
          }
        });

        // Search Savings
        savings.forEach(s => {
          if (
            s.accountNumber.toLowerCase().includes(query) ||
            s.memberName.toLowerCase().includes(query)
          ) {
            results.push({
              type: 'Account',
              id: s.accountNumber,
              title: `Savings: ${s.accountNumber}`,
              subtitle: `Holder: ${s.memberName} • Balance: ₹${s.balance.toLocaleString('en-IN')}`,
              url: `/savings/${s.accountNumber}`
            });
          }
        });

        // Search RD
        rds.forEach(r => {
          if (
            r.rdNumber.toLowerCase().includes(query) ||
            r.memberName.toLowerCase().includes(query)
          ) {
            results.push({
              type: 'RD',
              id: r.rdNumber,
              title: `Recurring Deposit: ${r.rdNumber}`,
              subtitle: `Holder: ${r.memberName} • ₹${r.installmentAmount.toLocaleString('en-IN')}/mo`,
              url: `/rd`
            });
          }
        });

        // Search FD
        fds.forEach(f => {
          if (
            f.fdNumber.toLowerCase().includes(query) ||
            f.memberName.toLowerCase().includes(query)
          ) {
            results.push({
              type: 'FD',
              id: f.fdNumber,
              title: `Fixed Deposit: ${f.fdNumber}`,
              subtitle: `Holder: ${f.memberName} • Principal: ₹${f.principalAmount.toLocaleString('en-IN')}`,
              url: `/fd`
            });
          }
        });

        // Search Loans
        loans.forEach(l => {
          if (
            l.loanId.toLowerCase().includes(query) ||
            l.memberName.toLowerCase().includes(query)
          ) {
            results.push({
              type: 'Loan',
              id: l.loanId,
              title: `Loan: ${l.loanId} (${l.loanType})`,
              subtitle: `Borrower: ${l.memberName} • Status: ${l.status}`,
              url: `/loans/${l.loanId}`
            });
          }
        });

        setSearchResults(results.slice(0, 15));
      } finally {
        setIsSearching(false);
      }
    }, 200);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        compactMode,
        toggleCompactMode,
        currentRole,
        setCurrentRole,
        sidebarOpen,
        setSidebarOpen,
        desktopSidebarCollapsed,
        toggleDesktopSidebar,
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        unreadNotificationCount,
        searchQuery,
        setSearchQuery,
        searchResults,
        isSearching,
        clearSearch
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
