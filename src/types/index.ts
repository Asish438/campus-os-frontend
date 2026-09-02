export type UserRole = 'super_admin' | 'admin';

export interface AdminPermission {
  canManageLeads: boolean;
  canViewAssignedCampaignsOnly: boolean;
  canExportData: boolean;
  canCreateInvoices: boolean;
  canEditSettings: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  title: string;
  status: 'active' | 'inactive';
  assignedCampaignIds: string[];
  assignedLeadCount?: number;
  phone?: string;
  location?: string;
  lastActive: string;
  createdAt: string;
  permissions: AdminPermission;
}

export type AdPlatform = 'facebook' | 'instagram' | 'both';

export type AdObjective = 
  | 'LEAD_GENERATION'
  | 'TRAFFIC'
  | 'CONVERSIONS'
  | 'STORIES_REELS';

export type CampaignStatus = 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'DRAFT';

export type CreativeFormat = 'FEED_POST' | 'REELS_VIDEO' | 'STORY_CARD' | 'CAROUSEL';

export interface AdCreative {
  headline: string;
  primaryText: string;
  callToAction: 'LEARN_MORE' | 'SIGN_UP' | 'APPLY_NOW' | 'GET_QUOTE' | 'CONTACT_US' | 'BOOK_NOW';
  mediaUrl: string;
  mediaType: 'image' | 'video';
  format: CreativeFormat;
  targetUrl?: string;
  formName?: string;
}

export interface MetaCampaign {
  id: string;
  name: string;
  code: string;
  platform: AdPlatform;
  objective: AdObjective;
  status: CampaignStatus;
  dailyBudget: number;
  totalBudget: number;
  spend: number;
  reach: number;
  impressions: number;
  clicks: number;
  ctr: number; // Click-through rate %
  leadsCount: number;
  cpl: number; // Cost per lead
  roas: number; // Return on ad spend
  assignedAdminId: string; // assigned Admin user ID
  creative: AdCreative;
  targetAudience: {
    ageRange: string;
    locations: string[];
    interests: string[];
  };
  startDate: string;
  endDate?: string;
  createdAt: string;
  pixelId?: string;
}

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'closed' | 'lost';

export type LeadSource = 
  | 'Instagram Lead Form'
  | 'Facebook Ads'
  | 'Instagram Reels Promo'
  | 'Direct Ad Click'
  | 'Referral';

export interface LeadInteraction {
  id: string;
  date: string;
  type: 'call' | 'email' | 'meeting' | 'note' | 'status_change';
  note: string;
  performedBy: string;
}

export interface Lead {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  company: string;
  jobTitle?: string;
  source: LeadSource;
  campaignId: string;
  campaignName: string;
  assignedAdminId: string;
  status: LeadStatus;
  estimatedValue: number;
  score: number; // 0-100
  notes: string;
  formAnswers?: { question: string; answer: string }[];
  dateCaptured: string;
  lastContactedDate?: string;
  pipelineCategory: 'active' | 'non_active';
  followUpRequired: boolean;
  nextFollowUpAction?: string;
  nextFollowUpDate?: string;
  interactions: LeadInteraction[];
}

export type AnnouncementPriority = 'urgent' | 'update' | 'system' | 'strategy';

export interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: AnnouncementPriority;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  targetAudience: 'all' | 'specific';
  targetAdminId?: string;
  isPinned: boolean;
  createdAt: string;
  tags: string[];
  acknowledgedUserIds: string[]; // List of user IDs who acknowledged this
}

export type InvoiceStatus = 'paid' | 'pending' | 'overdue' | 'draft';

export interface InvoiceItem {
  id: string;
  description: string;
  campaignId?: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  clientCompany: string;
  clientAddress: string;
  campaignId?: string;
  campaignName?: string;
  assignedAdminId: string;
  amount: number;
  taxAmount: number;
  totalAmount: number;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
  paidDate?: string;
  paymentMethod?: string;
  items: InvoiceItem[];
  notes?: string;
}

export interface CustomerProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  avatar: string;
  status: 'active' | 'churned' | 'lead' | 'vip';
  ltv: number;
  firstTouchCampaignId: string;
  firstTouchCampaignName: string;
  convertingCampaignId: string;
  convertingCampaignName: string;
  convertingAdFormat: CreativeFormat;
  assignedAdminId: string;
  createdAt: string;
  dealsCount: number;
  pipelineCategory: 'active' | 'non_active';
  followUpRequired: boolean;
  nextFollowUpAction?: string;
  nextFollowUpDate?: string;
  invoices: Invoice[];
  touchpoints: {
    date: string;
    channel: string;
    description: string;
    icon?: string;
  }[];
  notes: string;
}

export interface SystemSettings {
  adAccountId: string;
  adAccountName: string;
  businessManagerId: string;
  graphApiVersion: string;
  apiTokenStatus: 'connected' | 'expired' | 'rate_limited';
  metaPixelId: string;
  leadWebhookUrl: string;
  autoSyncIntervalMinutes: number;
  currency: string;
  timezone: string;
  dailyNotificationDigest: boolean;
  leadAlertWebhook: string;
}

export type NavigationTab = 
  | 'dashboard'
  | 'broadcast'
  | 'invoices'
  | 'leads'
  | 'customer360'
  | 'leadPipeline'
  | 'team'
  | 'settings';

export type LeadsSubTab = 'all' | 'new' | 'old';
export type Customer360Tab = 'pipeline' | 'dossier' | 'journey';
export type PipelineFollowFilter = 'all' | 'follows' | 'not_follows';
export type ThemeMode = 'dark' | 'light';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'lead' | 'invoice' | 'broadcast' | 'campaign' | 'system';
  targetTab?: NavigationTab;
  badgeText?: string;
}
