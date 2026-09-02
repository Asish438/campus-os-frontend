import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { 
  User, 
  MetaCampaign, 
  Lead, 
  Announcement, 
  Invoice, 
  CustomerProfile, 
  SystemSettings,
  NavigationTab,
  LeadsSubTab,
  LeadStatus,
  CampaignStatus,
  InvoiceStatus,
  ThemeMode,
  AppNotification
} from '../types';
import { 
  INITIAL_USERS, 
  INITIAL_CAMPAIGNS, 
  INITIAL_LEADS, 
  INITIAL_ANNOUNCEMENTS, 
  INITIAL_INVOICES, 
  INITIAL_CUSTOMERS, 
  INITIAL_SETTINGS,
  INITIAL_NOTIFICATIONS
} from '../mock/seedData';

interface ToastNotification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
  title?: string;
}

interface AppContextType {
  currentUser: User;
  users: User[];
  campaigns: MetaCampaign[];
  leads: Lead[];
  announcements: Announcement[];
  invoices: Invoice[];
  customers: CustomerProfile[];
  settings: SystemSettings;
  activeTab: NavigationTab;
  leadsSubTab: LeadsSubTab;
  toasts: ToastNotification[];
  
  // Navigation
  setActiveTab: (tab: NavigationTab) => void;
  setLeadsSubTab: (subTab: LeadsSubTab) => void;
  
  // User / Persona Management
  switchPersona: (userId: string) => void;
  createAdmin: (userData: Omit<User, 'id' | 'createdAt' | 'lastActive'>) => void;
  updateAdmin: (userId: string, updates: Partial<User>) => void;
  deleteAdmin: (userId: string, reassignToUserId: string) => void;
  
  // Campaign Management
  addCampaign: (campaign: Omit<MetaCampaign, 'id' | 'createdAt' | 'spend' | 'reach' | 'impressions' | 'clicks' | 'ctr' | 'leadsCount' | 'cpl' | 'roas'>) => void;
  updateCampaign: (campaignId: string, updates: Partial<MetaCampaign>) => void;
  toggleCampaignStatus: (campaignId: string) => void;
  
  // Leads Management
  addLead: (lead: Omit<Lead, 'id' | 'dateCaptured' | 'interactions'>) => void;
  updateLeadStatus: (leadId: string, status: LeadStatus, note?: string) => void;
  assignLead: (leadId: string, adminId: string) => void;
  exportLeadsCSV: (leadsToExport?: Lead[]) => void;
  
  // Invoices Management
  createInvoice: (invoice: Omit<Invoice, 'id' | 'invoiceNumber'>) => void;
  updateInvoiceStatus: (invoiceId: string, status: InvoiceStatus) => void;
  deleteInvoice: (invoiceId: string) => void;
  
  // Announcement Management
  createAnnouncement: (announcement: Omit<Announcement, 'id' | 'createdAt' | 'acknowledgedUserIds' | 'authorId' | 'authorName' | 'authorAvatar'>) => void;
  acknowledgeAnnouncement: (announcementId: string) => void;
  deleteAnnouncement: (announcementId: string) => void;
  
  // Customer 360 & Lead Pipeline
  addCustomerNote: (customerId: string, note: string) => void;
  toggleLeadFollowUp: (leadId: string) => void;
  toggleLeadPipelineCategory: (leadId: string) => void;
  toggleCustomerFollowUp: (customerId: string) => void;
  toggleCustomerPipelineCategory: (customerId: string) => void;
  updateLeadFollowUpAction: (leadId: string, action: string, date?: string) => void;
  updateCustomerFollowUpAction: (customerId: string, action: string, date?: string) => void;
  
  // Settings & Reset
  updateSettings: (newSettings: Partial<SystemSettings>) => void;
  resetToDefaultData: () => void;

  // Theme Management (Light / Dark mode)
  theme: import('../types').ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: import('../types').ThemeMode) => void;

  // Notifications Management
  notifications: import('../types').AppNotification[];
  unreadNotificationsCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  clearNotification: (id: string) => void;
  isNotificationDrawerOpen: boolean;
  setIsNotificationDrawerOpen: (open: boolean) => void;
  
  // Filtered Data Getters (Role-based isolation)
  filteredCampaigns: MetaCampaign[];
  filteredLeads: Lead[];
  filteredInvoices: Invoice[];
  filteredCustomers: CustomerProfile[];
  unreadAnnouncementsCount: number;
  
  // Toast notifications
  addToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error', title?: string) => void;
  removeToast: (id: string) => void;
}

const STORAGE_PREFIX = 'briskode_meta_crm_v6_';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load or initialize state from localStorage
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}users`);
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [currentUserId, setCurrentUserId] = useState<string>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}current_user_id`);
    return saved || INITIAL_USERS[0].id;
  });

  const [campaigns, setCampaigns] = useState<MetaCampaign[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}campaigns`);
    return saved ? JSON.parse(saved) : INITIAL_CAMPAIGNS;
  });

  const [leads, setLeads] = useState<Lead[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}leads`);
    if (!saved) return INITIAL_LEADS;
    try {
      const parsed: Lead[] = JSON.parse(saved);
      return parsed.map((l, idx) => ({
        ...l,
        pipelineCategory: l.pipelineCategory || (l.status === 'lost' || l.status === 'closed' ? 'non_active' : 'active'),
        followUpRequired: typeof l.followUpRequired === 'boolean' ? l.followUpRequired : (idx % 2 === 0),
        nextFollowUpAction: l.nextFollowUpAction || (l.followUpRequired ? 'Schedule strategy call with team' : 'Awaiting client update'),
        nextFollowUpDate: l.nextFollowUpDate || 'Tomorrow, 2:00 PM'
      }));
    } catch {
      return INITIAL_LEADS;
    }
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}announcements`);
    return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
  });

  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}invoices`);
    return saved ? JSON.parse(saved) : INITIAL_INVOICES;
  });

  const [customers, setCustomers] = useState<CustomerProfile[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}customers`);
    if (!saved) return INITIAL_CUSTOMERS;
    try {
      const parsed: CustomerProfile[] = JSON.parse(saved);
      return parsed.map(c => ({
        ...c,
        pipelineCategory: c.pipelineCategory || (c.status === 'churned' ? 'non_active' : 'active'),
        followUpRequired: typeof c.followUpRequired === 'boolean' ? c.followUpRequired : true,
        nextFollowUpAction: c.nextFollowUpAction || 'Quarterly Strategy & Attribution Sync',
        nextFollowUpDate: c.nextFollowUpDate || 'Next Week'
      }));
    } catch {
      return INITIAL_CUSTOMERS;
    }
  });

  const [settings, setSettings] = useState<SystemSettings>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}settings`);
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [leadsSubTab, setLeadsSubTab] = useState<LeadsSubTab>('all');
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // Theme Mode (Dark / Light)
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}theme`);
    return (saved as ThemeMode) || 'dark';
  });

  // App Notifications
  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}notifications`);
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // Notification Drawer open state
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);

  // Sync Theme to HTML Root
  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}theme`, theme);
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    }
  }, [theme]);

  // Sync Notifications to localStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}notifications`, JSON.stringify(notifications));
  }, [notifications]);

  const toggleTheme = () => {
    setThemeState(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
  };

  const unreadNotificationsCount = useMemo(() => {
    return notifications.filter(n => !n.read).length;
  }, [notifications]);

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    addToast('All notifications marked as read', 'info', 'Notifications Updated');
  };

  const clearNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}users`, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}current_user_id`, currentUserId);
  }, [currentUserId]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}campaigns`, JSON.stringify(campaigns));
  }, [campaigns]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}leads`, JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}announcements`, JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}invoices`, JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}customers`, JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}settings`, JSON.stringify(settings));
  }, [settings]);

  // Active current user object
  const currentUser = useMemo(() => {
    return users.find(u => u.id === currentUserId) || users[0] || INITIAL_USERS[0];
  }, [users, currentUserId]);

  // Toast notification helper
  const addToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info', title?: string) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    setToasts(prev => [...prev, { id, type, message, title }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Role-based data filtration
  const filteredCampaigns = useMemo(() => {
    if (currentUser.role === 'super_admin') {
      return campaigns;
    }
    // Admin sees only campaigns assigned to them
    return campaigns.filter(c => c.assignedAdminId === currentUser.id);
  }, [campaigns, currentUser]);

  const filteredLeads = useMemo(() => {
    let list = leads;
    if (currentUser.role !== 'super_admin') {
      list = list.filter(l => l.assignedAdminId === currentUser.id);
    }
    return list;
  }, [leads, currentUser]);

  const filteredInvoices = useMemo(() => {
    if (currentUser.role === 'super_admin') {
      return invoices;
    }
    return invoices.filter(inv => inv.assignedAdminId === currentUser.id);
  }, [invoices, currentUser]);

  const filteredCustomers = useMemo(() => {
    if (currentUser.role === 'super_admin') {
      return customers;
    }
    return customers.filter(cust => cust.assignedAdminId === currentUser.id);
  }, [customers, currentUser]);

  const unreadAnnouncementsCount = useMemo(() => {
    return announcements.filter(a => !a.acknowledgedUserIds.includes(currentUser.id)).length;
  }, [announcements, currentUser.id]);

  // Persona switching
  const switchPersona = (userId: string) => {
    const targetUser = users.find(u => u.id === userId);
    if (targetUser) {
      setCurrentUserId(userId);
      addToast(
        `Switched active persona to ${targetUser.name} (${targetUser.role === 'super_admin' ? 'Super Admin' : 'Admin'})`,
        'info',
        'Persona Switched'
      );
    }
  };

  // Admin CRUD
  const createAdmin = (userData: Omit<User, 'id' | 'createdAt' | 'lastActive'>) => {
    const id = `usr_admin_${Date.now()}`;
    const newAdmin: User = {
      ...userData,
      id,
      createdAt: new Date().toISOString(),
      lastActive: 'Just created'
    };
    setUsers(prev => [...prev, newAdmin]);
    addToast(`Admin account created for ${newAdmin.name}`, 'success', 'Admin Created');
  };

  const updateAdmin = (userId: string, updates: Partial<User>) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, ...updates } : u));
    addToast(`Admin profile updated successfully`, 'success', 'Admin Updated');
  };

  const deleteAdmin = (userId: string, reassignToUserId: string) => {
    const adminToDelete = users.find(u => u.id === userId);
    if (!adminToDelete) return;
    if (adminToDelete.role === 'super_admin') {
      addToast('Cannot delete the root Super Admin account.', 'error', 'Action Denied');
      return;
    }

    // Reassign campaigns
    setCampaigns(prev => prev.map(c => c.assignedAdminId === userId ? { ...c, assignedAdminId: reassignToUserId } : c));
    
    // Reassign leads
    setLeads(prev => prev.map(l => l.assignedAdminId === userId ? { ...l, assignedAdminId: reassignToUserId } : l));
    
    // Reassign invoices
    setInvoices(prev => prev.map(inv => inv.assignedAdminId === userId ? { ...inv, assignedAdminId: reassignToUserId } : inv));
    
    // Reassign customers
    setCustomers(prev => prev.map(cust => cust.assignedAdminId === userId ? { ...cust, assignedAdminId: reassignToUserId } : cust));

    // Remove user
    setUsers(prev => prev.filter(u => u.id !== userId));

    // If current user was the deleted user, switch to Super Admin
    if (currentUserId === userId) {
      setCurrentUserId(INITIAL_USERS[0].id);
    }

    addToast(
      `Removed ${adminToDelete.name}. All campaigns, leads, and assets were safely reassigned.`,
      'warning',
      'Admin Removed & Assets Reassigned'
    );
  };

  // Campaign Management
  const addCampaign = (campaignData: Omit<MetaCampaign, 'id' | 'createdAt' | 'spend' | 'reach' | 'impressions' | 'clicks' | 'ctr' | 'leadsCount' | 'cpl' | 'roas'>) => {
    const id = `cmp_${Date.now()}`;
    const newCampaign: MetaCampaign = {
      ...campaignData,
      id,
      spend: 0,
      reach: 0,
      impressions: 0,
      clicks: 0,
      ctr: 0,
      leadsCount: 0,
      cpl: 0,
      roas: 0,
      createdAt: new Date().toISOString()
    };
    
    setCampaigns(prev => [newCampaign, ...prev]);

    // Update user's assignedCampaignIds
    if (campaignData.assignedAdminId) {
      setUsers(prev => prev.map(u => {
        if (u.id === campaignData.assignedAdminId && !u.assignedCampaignIds.includes(id)) {
          return { ...u, assignedCampaignIds: [...u.assignedCampaignIds, id] };
        }
        return u;
      }));
    }

    addToast(`New Meta Ad Campaign "${newCampaign.name}" launched and assigned!`, 'success', 'Campaign Published');
  };

  const updateCampaign = (campaignId: string, updates: Partial<MetaCampaign>) => {
    setCampaigns(prev => prev.map(c => c.id === campaignId ? { ...c, ...updates } : c));
    addToast('Campaign parameters updated successfully', 'success', 'Campaign Updated');
  };

  const toggleCampaignStatus = (campaignId: string) => {
    setCampaigns(prev => prev.map(c => {
      if (c.id === campaignId) {
        const nextStatus: CampaignStatus = c.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';
        addToast(`Campaign "${c.name}" status changed to ${nextStatus}`, 'info', 'Status Updated');
        return { ...c, status: nextStatus };
      }
      return c;
    }));
  };

  // Leads Management
  const addLead = (leadData: Omit<Lead, 'id' | 'dateCaptured' | 'interactions'>) => {
    const id = `lead_${Date.now()}`;
    const now = new Date().toISOString();
    const newLead: Lead = {
      ...leadData,
      id,
      dateCaptured: now,
      pipelineCategory: leadData.pipelineCategory || 'active',
      followUpRequired: typeof leadData.followUpRequired === 'boolean' ? leadData.followUpRequired : true,
      nextFollowUpAction: leadData.nextFollowUpAction || 'Immediate Inbound Follow-up & Qualification Call',
      nextFollowUpDate: leadData.nextFollowUpDate || 'Today, 3:00 PM',
      interactions: [
        {
          id: `int_${Date.now()}`,
          date: now,
          type: 'note',
          note: `Manually added by ${currentUser.name}`,
          performedBy: currentUser.name
        }
      ]
    };
    setLeads(prev => [newLead, ...prev]);
    addToast(`Lead "${newLead.fullName}" created successfully`, 'success', 'Lead Added');
  };

  const updateLeadStatus = (leadId: string, status: LeadStatus, note?: string) => {
    const now = new Date().toISOString();
    setLeads(prev => prev.map(l => {
      if (l.id === leadId) {
        const interaction = {
          id: `int_${Date.now()}`,
          date: now,
          type: 'status_change' as const,
          note: note || `Status changed from ${l.status.toUpperCase()} to ${status.toUpperCase()} by ${currentUser.name}`,
          performedBy: currentUser.name
        };
        return {
          ...l,
          status,
          lastContactedDate: status !== 'new' ? now : l.lastContactedDate,
          interactions: [interaction, ...l.interactions]
        };
      }
      return l;
    }));
    addToast(`Lead status updated to ${status.toUpperCase()}`, 'success', 'Lead Status Changed');
  };

  const assignLead = (leadId: string, adminId: string) => {
    const targetAdmin = users.find(u => u.id === adminId);
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, assignedAdminId: adminId } : l));
    addToast(`Lead assigned to ${targetAdmin?.name || 'Admin'}`, 'info', 'Lead Reassigned');
  };

  const exportLeadsCSV = (leadsToExport?: Lead[]) => {
    const exportData = leadsToExport || filteredLeads;
    if (exportData.length === 0) {
      addToast('No leads available to export.', 'warning', 'Export Empty');
      return;
    }

    const headers = ['ID', 'Full Name', 'Email', 'Phone', 'Company', 'Source', 'Campaign', 'Status', 'Estimated Value ($)', 'Score', 'Date Captured'];
    const rows = exportData.map(l => [
      l.id,
      `"${l.fullName}"`,
      l.email,
      `"${l.phone}"`,
      `"${l.company}"`,
      `"${l.source}"`,
      `"${l.campaignName}"`,
      l.status.toUpperCase(),
      l.estimatedValue,
      l.score,
      new Date(l.dateCaptured).toLocaleString()
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `meta_leads_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast(`Exported ${exportData.length} leads to CSV`, 'success', 'Export Complete');
  };

  // Invoices Management
  const createInvoice = (invoiceData: Omit<Invoice, 'id' | 'invoiceNumber'>) => {
    const id = `inv_${Date.now()}`;
    const invoiceNumber = `INV-2025-${Math.floor(100 + Math.random() * 900)}`;
    const newInvoice: Invoice = {
      ...invoiceData,
      id,
      invoiceNumber
    };
    setInvoices(prev => [newInvoice, ...prev]);
    addToast(`Invoice ${invoiceNumber} generated for ${newInvoice.clientName}`, 'success', 'Invoice Created');
  };

  const updateInvoiceStatus = (invoiceId: string, status: InvoiceStatus) => {
    setInvoices(prev => prev.map(inv => {
      if (inv.id === invoiceId) {
        return {
          ...inv,
          status,
          paidDate: status === 'paid' ? new Date().toISOString().split('T')[0] : inv.paidDate
        };
      }
      return inv;
    }));
    addToast(`Invoice status updated to ${status.toUpperCase()}`, 'success', 'Invoice Updated');
  };

  const deleteInvoice = (invoiceId: string) => {
    setInvoices(prev => prev.filter(inv => inv.id !== invoiceId));
    addToast('Invoice deleted successfully', 'warning', 'Invoice Removed');
  };

  // Announcements Management
  const createAnnouncement = (data: Omit<Announcement, 'id' | 'createdAt' | 'acknowledgedUserIds' | 'authorId' | 'authorName' | 'authorAvatar'>) => {
    const id = `ann_${Date.now()}`;
    const newAnnouncement: Announcement = {
      ...data,
      id,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      createdAt: new Date().toISOString(),
      acknowledgedUserIds: [currentUser.id]
    };
    setAnnouncements(prev => [newAnnouncement, ...prev]);
    addToast(`Broadcast announcement published to team`, 'success', 'Broadcast Live');
  };

  const acknowledgeAnnouncement = (announcementId: string) => {
    setAnnouncements(prev => prev.map(a => {
      if (a.id === announcementId && !a.acknowledgedUserIds.includes(currentUser.id)) {
        return {
          ...a,
          acknowledgedUserIds: [...a.acknowledgedUserIds, currentUser.id]
        };
      }
      return a;
    }));
    addToast('Announcement marked as acknowledged', 'info', 'Acknowledged');
  };

  const deleteAnnouncement = (announcementId: string) => {
    setAnnouncements(prev => prev.filter(a => a.id !== announcementId));
    addToast('Announcement removed', 'warning', 'Broadcast Deleted');
  };

  // Customer 360
  const addCustomerNote = (customerId: string, note: string) => {
    setCustomers(prev => prev.map(c => {
      if (c.id === customerId) {
        return {
          ...c,
          notes: `${c.notes}\n[${new Date().toLocaleDateString()} - ${currentUser.name}]: ${note}`,
          touchpoints: [
            ...c.touchpoints,
            {
              date: new Date().toISOString().split('T')[0],
              channel: 'Internal Strategy Note',
              description: note
            }
          ]
        };
      }
      return c;
    }));
    addToast('Note added to customer profile', 'success', 'Note Saved');
  };

  const toggleLeadFollowUp = (leadId: string) => {
    setLeads(prev => prev.map(l => {
      if (l.id === leadId) {
        const next = !l.followUpRequired;
        addToast(
          next ? `Follow-up flagged for ${l.fullName}` : `Follow-up resolved for ${l.fullName}`,
          'info',
          'Pipeline Updated'
        );
        return { ...l, followUpRequired: next };
      }
      return l;
    }));
  };

  const toggleLeadPipelineCategory = (leadId: string) => {
    setLeads(prev => prev.map(l => {
      if (l.id === leadId) {
        const nextCategory = l.pipelineCategory === 'active' ? 'non_active' : 'active';
        addToast(
          `Moved ${l.fullName} to ${nextCategory === 'active' ? 'Active Inbound' : 'Non-Active / Closed'}`,
          'info',
          'Pipeline Category Changed'
        );
        return { ...l, pipelineCategory: nextCategory };
      }
      return l;
    }));
  };

  const toggleCustomerFollowUp = (customerId: string) => {
    setCustomers(prev => prev.map(c => {
      if (c.id === customerId) {
        const next = !c.followUpRequired;
        addToast(
          next ? `Follow-up scheduled for ${c.company}` : `Follow-up cleared for ${c.company}`,
          'info',
          'Account Pipeline'
        );
        return { ...c, followUpRequired: next };
      }
      return c;
    }));
  };

  const toggleCustomerPipelineCategory = (customerId: string) => {
    setCustomers(prev => prev.map(c => {
      if (c.id === customerId) {
        const nextCategory = c.pipelineCategory === 'active' ? 'non_active' : 'active';
        addToast(
          `Account ${c.company} moved to ${nextCategory === 'active' ? 'Active Retainer' : 'Non-Active / Archived'}`,
          'info',
          'Account Category Changed'
        );
        return { ...c, pipelineCategory: nextCategory };
      }
      return c;
    }));
  };

  const updateLeadFollowUpAction = (leadId: string, action: string, date?: string) => {
    setLeads(prev => prev.map(l => {
      if (l.id === leadId) {
        return {
          ...l,
          nextFollowUpAction: action,
          nextFollowUpDate: date || l.nextFollowUpDate,
          followUpRequired: true
        };
      }
      return l;
    }));
    addToast('Follow-up task updated', 'success', 'Task Saved');
  };

  const updateCustomerFollowUpAction = (customerId: string, action: string, date?: string) => {
    setCustomers(prev => prev.map(c => {
      if (c.id === customerId) {
        return {
          ...c,
          nextFollowUpAction: action,
          nextFollowUpDate: date || c.nextFollowUpDate,
          followUpRequired: true
        };
      }
      return c;
    }));
    addToast('Client follow-up action scheduled', 'success', 'Action Scheduled');
  };

  // Settings & Reset
  const updateSettings = (newSettings: Partial<SystemSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    addToast('System settings updated and synced with Meta Graph API', 'success', 'Settings Saved');
  };

  const resetToDefaultData = () => {
    setUsers(INITIAL_USERS);
    setCurrentUserId(INITIAL_USERS[0].id);
    setCampaigns(INITIAL_CAMPAIGNS);
    setLeads(INITIAL_LEADS);
    setAnnouncements(INITIAL_ANNOUNCEMENTS);
    setInvoices(INITIAL_INVOICES);
    setCustomers(INITIAL_CUSTOMERS);
    setSettings(INITIAL_SETTINGS);
    localStorage.clear();
    addToast('Command Center reset to original sample state.', 'info', 'Reset Complete');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        campaigns,
        leads,
        announcements,
        invoices,
        customers,
        settings,
        activeTab,
        leadsSubTab,
        toasts,
        setActiveTab,
        setLeadsSubTab,
        switchPersona,
        createAdmin,
        updateAdmin,
        deleteAdmin,
        addCampaign,
        updateCampaign,
        toggleCampaignStatus,
        addLead,
        updateLeadStatus,
        assignLead,
        exportLeadsCSV,
        createInvoice,
        updateInvoiceStatus,
        deleteInvoice,
        createAnnouncement,
        acknowledgeAnnouncement,
        deleteAnnouncement,
        addCustomerNote,
        toggleLeadFollowUp,
        toggleLeadPipelineCategory,
        toggleCustomerFollowUp,
        toggleCustomerPipelineCategory,
        updateLeadFollowUpAction,
        updateCustomerFollowUpAction,
        updateSettings,
        resetToDefaultData,
        theme,
        toggleTheme,
        setTheme,
        notifications,
        unreadNotificationsCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        clearNotification,
        isNotificationDrawerOpen,
        setIsNotificationDrawerOpen,
        filteredCampaigns,
        filteredLeads,
        filteredInvoices,
        filteredCustomers,
        unreadAnnouncementsCount,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
