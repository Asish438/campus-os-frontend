import { 
  User, 
  MetaCampaign, 
  Lead, 
  Announcement, 
  Invoice, 
  CustomerProfile, 
  SystemSettings 
} from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'usr_superadmin',
    name: 'Briskode',
    email: 'admin@briskode.com',
    role: 'super_admin',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    title: 'Executive Command & Operations',
    status: 'active',
    assignedCampaignIds: ['cmp_1', 'cmp_2', 'cmp_3', 'cmp_4', 'cmp_5', 'cmp_6'],
    phone: '+91 98201 00001',
    location: 'Briskode HQ',
    lastActive: 'Active now',
    createdAt: '2025-01-10T08:00:00Z',
    permissions: {
      canManageLeads: true,
      canViewAssignedCampaignsOnly: false,
      canExportData: true,
      canCreateInvoices: true,
      canEditSettings: true,
    }
  },
  {
    id: 'usr_admin_1',
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@meridiangrowth.io',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    title: 'Senior Meta Media Buyer & Creative Lead',
    status: 'active',
    assignedCampaignIds: ['cmp_1', 'cmp_2', 'cmp_6'],
    assignedLeadCount: 42,
    phone: '+1 (212) 555-0194',
    location: 'New York Office',
    lastActive: '14 mins ago',
    createdAt: '2025-02-01T09:30:00Z',
    permissions: {
      canManageLeads: true,
      canViewAssignedCampaignsOnly: true,
      canExportData: true,
      canCreateInvoices: false,
      canEditSettings: false,
    }
  },
  {
    id: 'usr_admin_2',
    name: 'Marcus Cole',
    email: 'marcus.cole@meridiangrowth.io',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    title: 'Lead Operations & Inbound Retention Lead',
    status: 'active',
    assignedCampaignIds: ['cmp_3', 'cmp_5'],
    assignedLeadCount: 28,
    phone: '+1 (312) 440-9821',
    location: 'Chicago Office',
    lastActive: '32 mins ago',
    createdAt: '2025-02-15T11:00:00Z',
    permissions: {
      canManageLeads: true,
      canViewAssignedCampaignsOnly: true,
      canExportData: true,
      canCreateInvoices: true,
      canEditSettings: false,
    }
  },
  {
    id: 'usr_admin_3',
    name: 'Elena Rostova',
    email: 'elena.rostova@meridiangrowth.io',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    title: 'Performance Creative & Reels Strategist',
    status: 'active',
    assignedCampaignIds: ['cmp_4'],
    assignedLeadCount: 19,
    phone: '+1 (512) 832-1144',
    location: 'Austin Office',
    lastActive: '2 hours ago',
    createdAt: '2025-03-01T14:20:00Z',
    permissions: {
      canManageLeads: true,
      canViewAssignedCampaignsOnly: true,
      canExportData: false,
      canCreateInvoices: false,
      canEditSettings: false,
    }
  }
];

export const INITIAL_CAMPAIGNS: MetaCampaign[] = [
  {
    id: 'cmp_1',
    name: '[US/CA] [B2B SaaS] [Advantage+ Lead Gen] [Form v2.4]',
    code: 'FB-IG-LEAD-2025-01',
    platform: 'both',
    objective: 'LEAD_GENERATION',
    status: 'ACTIVE',
    dailyBudget: 28000,
    totalBudget: 850000,
    spend: 485000,
    reach: 345000,
    impressions: 780000,
    clicks: 18400,
    ctr: 2.55,
    leadsCount: 1650,
    cpl: 293.93,
    roas: 4.8,
    assignedAdminId: 'usr_admin_1',
    creative: {
      headline: 'Cut Inbound Lead Response Latency Under 60 Seconds',
      primaryText: 'Enterprise sales teams losing 35% of pipeline to slow follow-ups. Connect Meta Instant Forms directly to automated routing and close enterprise accounts 3x faster.',
      callToAction: 'SIGN_UP',
      mediaUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
      mediaType: 'image',
      format: 'FEED_POST',
      formName: 'Enterprise_Tier1_Qualification_Form_v2.4',
      targetUrl: 'https://meridiangrowth.io/enterprise-demo'
    },
    targetAudience: {
      ageRange: '28-55',
      locations: ['India', 'United States', 'United Kingdom'],
      interests: ['B2B SaaS Founders', 'Demand Generation', 'Salesforce CRM', 'HubSpot']
    },
    startDate: '2025-06-01',
    createdAt: '2025-05-28T10:00:00Z',
    pixelId: 'px_889201948291032'
  },
  {
    id: 'cmp_2',
    name: '[India/Global] [IG Reels] [Founder Story] [High-Ticket Consulting]',
    code: 'IG-REELS-CONSULT-02',
    platform: 'instagram',
    objective: 'STORIES_REELS',
    status: 'ACTIVE',
    dailyBudget: 22000,
    totalBudget: 660000,
    spend: 380000,
    reach: 520000,
    impressions: 1250000,
    clicks: 24800,
    ctr: 2.01,
    leadsCount: 1220,
    cpl: 311.47,
    roas: 5.4,
    assignedAdminId: 'usr_admin_1',
    creative: {
      headline: 'How we scaled portfolio spend from ₹3L to ₹25L/mo profitably',
      primaryText: 'Detailed 60s breakdown of our full-funnel Meta bidding and creative testing frameworks. Tap below to access the full confidential media buying playbook.',
      callToAction: 'LEARN_MORE',
      mediaUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=80',
      mediaType: 'video',
      format: 'REELS_VIDEO',
      targetUrl: 'https://meridiangrowth.io/playbook'
    },
    targetAudience: {
      ageRange: '25-48',
      locations: ['India', 'United Arab Emirates', 'Singapore'],
      interests: ['Venture Capital', 'E-commerce Management', 'Direct Response Media']
    },
    startDate: '2025-06-15',
    createdAt: '2025-06-12T14:30:00Z',
    pixelId: 'px_889201948291032'
  },
  {
    id: 'cmp_3',
    name: '[India/APAC] [BOFU Retargeting] [Demo Abandoners] [Dynamic Catalog]',
    code: 'FB-CONV-RETARGET-03',
    platform: 'facebook',
    objective: 'CONVERSIONS',
    status: 'ACTIVE',
    dailyBudget: 18000,
    totalBudget: 540000,
    spend: 295000,
    reach: 180000,
    impressions: 420000,
    clicks: 12600,
    ctr: 3.68,
    leadsCount: 940,
    cpl: 313.82,
    roas: 6.2,
    assignedAdminId: 'usr_admin_2',
    creative: {
      headline: 'Your custom configuration is reserved • Book onboard session',
      primaryText: 'Finalize your enterprise deployment this quarter. Lock in dedicated 24/7 solutions engineering and CAPI server container architecture.',
      callToAction: 'BOOK_NOW',
      mediaUrl: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&auto=format&fit=crop&q=80',
      mediaType: 'image',
      format: 'FEED_POST',
      targetUrl: 'https://meridiangrowth.io/onboard-session'
    },
    targetAudience: {
      ageRange: '30-60',
      locations: ['India', 'Singapore'],
      interests: ['Visited /pricing (Last 30 Days)', 'Initiated Onboarding Flow']
    },
    startDate: '2025-07-01',
    createdAt: '2025-06-29T11:15:00Z',
    pixelId: 'px_889201948291032'
  },
  {
    id: 'cmp_4',
    name: '[IG Story] [Audience Quiz] [Marketing Efficiency Benchmark]',
    code: 'IG-STORY-QUIZ-04',
    platform: 'instagram',
    objective: 'TRAFFIC',
    status: 'ACTIVE',
    dailyBudget: 12000,
    totalBudget: 360000,
    spend: 195000,
    reach: 340000,
    impressions: 780000,
    clicks: 19500,
    ctr: 2.32,
    leadsCount: 780,
    cpl: 250.00,
    roas: 3.9,
    assignedAdminId: 'usr_admin_3',
    creative: {
      headline: 'What is your true blended Meta CAC? Take the 2-min benchmark',
      primaryText: 'Swipe up to benchmark your cost per acquisition and ROAS against the top 1% of direct-response brands.',
      callToAction: 'APPLY_NOW',
      mediaUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=80',
      mediaType: 'image',
      format: 'STORY_CARD',
      targetUrl: 'https://meridiangrowth.io/cac-audit'
    },
    targetAudience: {
      ageRange: '22-40',
      locations: ['India', 'Southeast Asia'],
      interests: ['Growth Marketing', 'Meta Ads Specialist', 'Shopify Plus']
    },
    startDate: '2025-07-10',
    createdAt: '2025-07-08T09:00:00Z',
    pixelId: 'px_889201948291032'
  },
  {
    id: 'cmp_5',
    name: '[BLR/MUM] [Executive Round Table] [Private Summit Pass]',
    code: 'FB-IG-VIP-SUMMIT-05',
    platform: 'both',
    objective: 'LEAD_GENERATION',
    status: 'PAUSED',
    dailyBudget: 35000,
    totalBudget: 700000,
    spend: 280000,
    reach: 190000,
    impressions: 390000,
    clicks: 8900,
    ctr: 2.39,
    leadsCount: 650,
    cpl: 430.76,
    roas: 5.1,
    assignedAdminId: 'usr_admin_2',
    creative: {
      headline: 'Private Summit for CMOs & Heads of Performance Acquisition',
      primaryText: 'Join 50 senior growth leaders in Bengaluru or stream the closed-door keynote on Advantage+ AI bidding strategies.',
      callToAction: 'GET_QUOTE',
      mediaUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80',
      mediaType: 'image',
      format: 'FEED_POST',
      formName: 'Executive_VIP_Pass_Form',
      targetUrl: 'https://meridiangrowth.io/summit'
    },
    targetAudience: {
      ageRange: '32-58',
      locations: ['Bengaluru', 'Mumbai', 'Delhi NCR'],
      interests: ['Chief Marketing Officers', 'VP Growth', 'Venture Funded Founders']
    },
    startDate: '2025-07-01',
    endDate: '2025-07-20',
    createdAt: '2025-06-25T16:00:00Z',
    pixelId: 'px_889201948291032'
  },
  {
    id: 'cmp_6',
    name: '[Advantage+ Catalog] [Flash Conversions] [CAPI Server-Side]',
    code: 'FB-ECOM-FLASH-06',
    platform: 'both',
    objective: 'CONVERSIONS',
    status: 'ACTIVE',
    dailyBudget: 45000,
    totalBudget: 1350000,
    spend: 690000,
    reach: 720000,
    impressions: 1650000,
    clicks: 34000,
    ctr: 2.06,
    leadsCount: 2380,
    cpl: 289.91,
    roas: 5.9,
    assignedAdminId: 'usr_admin_1',
    creative: {
      headline: 'Recover 30% of lost browser conversion signals via Meta CAPI',
      primaryText: 'Deploy server-side Conversions API in under 15 minutes. Stop losing attribution data to Safari ITP and browser blockers.',
      callToAction: 'SIGN_UP',
      mediaUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
      mediaType: 'image',
      format: 'FEED_POST',
      targetUrl: 'https://meridiangrowth.io/capi-setup'
    },
    targetAudience: {
      ageRange: '24-50',
      locations: ['India', 'Global Tier 1'],
      interests: ['Shopify Plus', 'Direct to Consumer Brands', 'Omnichannel Retail']
    },
    startDate: '2025-07-15',
    createdAt: '2025-07-12T10:30:00Z',
    pixelId: 'px_889201948291032'
  }
];

export const INITIAL_LEADS: Lead[] = [
  // NEW LEADS (Captured real-time from active campaigns)
  {
    id: 'lead_101',
    fullName: 'Victoria Sterling',
    email: 'v.sterling@vanguardtech.co',
    phone: '+1 (415) 329-8819',
    company: 'Vanguard Tech Solutions',
    jobTitle: 'Director of Growth & Media',
    source: 'Instagram Lead Form',
    campaignId: 'cmp_1',
    campaignName: '[US/CA] [B2B SaaS] [Advantage+ Lead Gen] [Form v2.4]',
    assignedAdminId: 'usr_admin_1',
    status: 'new',
    estimatedValue: 18500,
    score: 94,
    notes: 'Submitted Instant Form 8 mins ago. Indicated urgent need to replace manual lead spreadsheet routing.',
    pipelineCategory: 'active',
    followUpRequired: true,
    nextFollowUpAction: 'Conduct Inbound VoIP Discovery Call (SLA: 7m left)',
    nextFollowUpDate: 'Today, 2:00 PM',
    formAnswers: [
      { question: 'Current Monthly Ad Spend', answer: '$50,000 - $100,000 / mo' },
      { question: 'Primary Operational Hurdle', answer: 'Delayed follow-ups losing 40% of inbound lead velocity' },
      { question: 'Company Headcount', answer: '120 Full-time Employees' }
    ],
    dateCaptured: '2025-08-01T10:15:00Z',
    interactions: [
      {
        id: 'int_1',
        date: '2025-08-01T10:15:00Z',
        type: 'note',
        note: 'Lead ingested via Meta Instant Lead Webhook (Form: Enterprise_Tier1_Qualification_Form_v2.4)',
        performedBy: 'Meta Graph Webhook'
      }
    ]
  },
  {
    id: 'lead_102',
    fullName: 'Liam Hemsworth-Wright',
    email: 'liam@nexusretail.com',
    phone: '+1 (312) 890-4412',
    company: 'Nexus Retail Brands',
    jobTitle: 'Chief Commercial Officer',
    source: 'Instagram Reels Promo',
    campaignId: 'cmp_2',
    campaignName: '[US] [IG Reels] [Founder Story] [High-Ticket Consulting]',
    assignedAdminId: 'usr_admin_1',
    status: 'new',
    estimatedValue: 32000,
    score: 89,
    notes: 'Watched 100% of founder Reels breakdown. Inquired about portfolio audit across 12 e-commerce storefronts.',
    pipelineCategory: 'active',
    followUpRequired: true,
    nextFollowUpAction: 'Send Custom Reels & Advantage+ Media Audit Scope',
    nextFollowUpDate: 'Today, 4:30 PM',
    formAnswers: [
      { question: 'Current Monthly Ad Spend', answer: '$100,000+ / mo' },
      { question: 'Primary Target', answer: 'Scale blended ROAS above 4.5x on Meta Advantage+ Shopping' }
    ],
    dateCaptured: '2025-08-01T09:40:00Z',
    interactions: [
      {
        id: 'int_2',
        date: '2025-08-01T09:40:00Z',
        type: 'note',
        note: 'Captured via Instagram Reels video bio link submission',
        performedBy: 'Meta Webhook'
      }
    ]
  },
  {
    id: 'lead_103',
    fullName: 'Derrick Zhao',
    email: 'derrick@finflow.io',
    phone: '+1 (650) 412-9901',
    company: 'FinFlow Protocol',
    jobTitle: 'Head of User Acquisition',
    source: 'Facebook Ads',
    campaignId: 'cmp_6',
    campaignName: '[Advantage+ Catalog] [Flash Conversions] [CAPI Server-Side]',
    assignedAdminId: 'usr_admin_1',
    status: 'new',
    estimatedValue: 24000,
    score: 91,
    notes: 'Registered for CAPI server-side sync onboarding.',
    pipelineCategory: 'active',
    followUpRequired: false,
    nextFollowUpAction: 'Awaiting client technical configuration details',
    nextFollowUpDate: 'Tomorrow, 10:00 AM',
    formAnswers: [
      { question: 'Store Platform', answer: 'Shopify Plus' },
      { question: 'Annual Gross Merchandise Value', answer: '$15M - $30M' }
    ],
    dateCaptured: '2025-08-01T08:20:00Z',
    interactions: [
      {
        id: 'int_3',
        date: '2025-08-01T08:20:00Z',
        type: 'note',
        note: 'Ingested via Facebook CAPI Lead form event',
        performedBy: 'Meta Webhook'
      }
    ]
  },
  {
    id: 'lead_104',
    fullName: 'Sophia Ramirez',
    email: 'sophia@aerocloud.ai',
    phone: '+1 (512) 773-1940',
    company: 'AeroCloud Systems',
    jobTitle: 'VP Revenue Operations',
    source: 'Facebook Ads',
    campaignId: 'cmp_3',
    campaignName: '[Global] [BOFU Retargeting] [Demo Abandoners] [Dynamic Catalog]',
    assignedAdminId: 'usr_admin_2',
    status: 'new',
    estimatedValue: 45000,
    score: 98,
    notes: 'Triggered pricing page retargeting ad. Completed full form requesting immediate enterprise onboarding.',
    pipelineCategory: 'active',
    followUpRequired: true,
    nextFollowUpAction: 'Prepare Enterprise Master Agreement & CAPI Container Plan',
    nextFollowUpDate: 'Today, 5:00 PM',
    formAnswers: [
      { question: 'Deployment Urgency', answer: 'Immediate (Within 14 Days)' },
      { question: 'Seats Required', answer: '50+ Enterprise Accounts' }
    ],
    dateCaptured: '2025-08-01T07:55:00Z',
    interactions: [
      {
        id: 'int_4',
        date: '2025-08-01T07:55:00Z',
        type: 'note',
        note: 'Retargeting pixel match captured (Match Quality: 9.6/10)',
        performedBy: 'Meta CAPI Engine'
      }
    ]
  },
  {
    id: 'lead_105',
    fullName: 'Amir Al-Mansoor',
    email: 'amir@solardynamics.de',
    phone: '+49 89 2441 902',
    company: 'SolarDynamics Global',
    jobTitle: 'Managing Director EMEA',
    source: 'Instagram Lead Form',
    campaignId: 'cmp_1',
    campaignName: '[US/CA] [B2B SaaS] [Advantage+ Lead Gen] [Form v2.4]',
    assignedAdminId: 'usr_admin_1',
    status: 'new',
    estimatedValue: 28000,
    score: 85,
    notes: 'Inquired about automated multi-language lead routing across DACH and UK sales reps.',
    pipelineCategory: 'active',
    followUpRequired: false,
    nextFollowUpAction: 'Email sent; waiting on European timezone window',
    nextFollowUpDate: 'Thursday, 9:00 AM CET',
    dateCaptured: '2025-07-31T22:10:00Z',
    interactions: [
      {
        id: 'int_5',
        date: '2025-07-31T22:10:00Z',
        type: 'note',
        note: 'Lead ingested from European Ad Set targeting',
        performedBy: 'Meta Webhook'
      }
    ]
  },

  // OLD / CONTACTED LEADS
  {
    id: 'lead_201',
    fullName: 'Bradley Cooper-Hayes',
    email: 'bradley@apexlogistics.com',
    phone: '+1 (206) 918-3321',
    company: 'Apex Freight Logistics',
    jobTitle: 'Chief Operating Officer',
    source: 'Facebook Ads',
    campaignId: 'cmp_1',
    campaignName: '[US/CA] [B2B SaaS] [Advantage+ Lead Gen] [Form v2.4]',
    assignedAdminId: 'usr_admin_1',
    status: 'qualified',
    estimatedValue: 55000,
    score: 96,
    notes: 'Discovery call completed. Confirmed $750k annual paid media budget. Technical architecture demo scheduled.',
    pipelineCategory: 'active',
    followUpRequired: true,
    nextFollowUpAction: 'Host Technical Architecture Demo with Engineering Team',
    nextFollowUpDate: 'Thursday, 2:00 PM EST',
    dateCaptured: '2025-07-20T14:30:00Z',
    lastContactedDate: '2025-07-29T16:00:00Z',
    interactions: [
      {
        id: 'int_6',
        date: '2025-07-20T14:30:00Z',
        type: 'note',
        note: 'Captured from Facebook Instant Form campaign',
        performedBy: 'Meta Webhook'
      },
      {
        id: 'int_7',
        date: '2025-07-22T10:00:00Z',
        type: 'call',
        note: 'Initial 30-min discovery call conducted with Sarah Jenkins. High urgency.',
        performedBy: 'Sarah Jenkins'
      },
      {
        id: 'int_8',
        date: '2025-07-29T16:00:00Z',
        type: 'status_change',
        note: 'Pipeline stage upgraded: Contacted → Qualified',
        performedBy: 'Sarah Jenkins'
      }
    ]
  },
  {
    id: 'lead_202',
    fullName: 'Elena Vasquez',
    email: 'elena@solislabs.io',
    phone: '+1 (305) 609-2218',
    company: 'Solis Biotech Labs',
    jobTitle: 'VP of Global Marketing',
    source: 'Instagram Reels Promo',
    campaignId: 'cmp_2',
    campaignName: '[US] [IG Reels] [Founder Story] [High-Ticket Consulting]',
    assignedAdminId: 'usr_admin_1',
    status: 'closed',
    estimatedValue: 42000,
    score: 100,
    notes: 'Closed annual retainer for full Meta media buying & CAPI integration. Invoice INV-2025-081 settled.',
    pipelineCategory: 'non_active',
    followUpRequired: false,
    nextFollowUpAction: 'Active retainer client in onboarding; no sales follow-up needed',
    nextFollowUpDate: 'End of Month',
    dateCaptured: '2025-07-10T11:00:00Z',
    lastContactedDate: '2025-07-28T14:00:00Z',
    interactions: [
      {
        id: 'int_9',
        date: '2025-07-10T11:00:00Z',
        type: 'note',
        note: 'Reels video ad conversion recorded',
        performedBy: 'Meta Webhook'
      },
      {
        id: 'int_10',
        date: '2025-07-28T14:00:00Z',
        type: 'status_change',
        note: 'Master Services Agreement executed. Invoice INV-2025-081 paid via Wire.',
        performedBy: 'Alexander Vance'
      }
    ]
  },
  {
    id: 'lead_203',
    fullName: 'Raymond Thorne',
    email: 'r.thorne@thorneworldwide.com',
    phone: '+1 (404) 772-9011',
    company: 'Thorne Capital Partners',
    jobTitle: 'Managing Partner',
    source: 'Facebook Ads',
    campaignId: 'cmp_5',
    campaignName: '[NYC/LON] [Executive Round Table] [Private Summit Pass]',
    assignedAdminId: 'usr_admin_2',
    status: 'contacted',
    estimatedValue: 35000,
    score: 82,
    notes: 'Consultation with Marcus Cole. Reviewing proposal deck with investment committee.',
    pipelineCategory: 'active',
    followUpRequired: true,
    nextFollowUpAction: 'Check in on Investment Committee Review Decision',
    nextFollowUpDate: 'Friday, 11:30 AM',
    dateCaptured: '2025-07-18T16:45:00Z',
    lastContactedDate: '2025-07-30T11:30:00Z',
    interactions: [
      {
        id: 'int_11',
        date: '2025-07-18T16:45:00Z',
        type: 'note',
        note: 'VIP Round Table pass registered',
        performedBy: 'Meta Webhook'
      },
      {
        id: 'int_12',
        date: '2025-07-30T11:30:00Z',
        type: 'email',
        note: 'Custom performance scope and media allocation deck dispatched',
        performedBy: 'Marcus Cole'
      }
    ]
  },
  {
    id: 'lead_204',
    fullName: 'Chloe Bennett',
    email: 'chloe@luxebeauty.co',
    phone: '+1 (310) 902-8844',
    company: 'Luxe Botanicals Beauty',
    jobTitle: 'Founder & CEO',
    source: 'Instagram Lead Form',
    campaignId: 'cmp_4',
    campaignName: '[IG Story] [Audience Quiz] [Marketing Efficiency Benchmark]',
    assignedAdminId: 'usr_admin_3',
    status: 'contacted',
    estimatedValue: 16000,
    score: 78,
    notes: 'Completed Benchmark Quiz. Exploring UGC Reels production and Advantage+ Catalog setup.',
    pipelineCategory: 'active',
    followUpRequired: true,
    nextFollowUpAction: 'Send UGC Reels Production Creative Moodboard',
    nextFollowUpDate: 'Monday, 1:00 PM PST',
    dateCaptured: '2025-07-22T08:15:00Z',
    lastContactedDate: '2025-07-27T15:20:00Z',
    interactions: [
      {
        id: 'int_13',
        date: '2025-07-22T08:15:00Z',
        type: 'note',
        note: 'Benchmark Audit score computed: 71/100',
        performedBy: 'Audit Engine'
      }
    ]
  },
  {
    id: 'lead_205',
    fullName: 'Gregory Chen',
    email: 'gregory@matrixanalytics.net',
    phone: '+1 (617) 509-3320',
    company: 'Matrix Health Analytics',
    jobTitle: 'Head of Demand Gen',
    source: 'Direct Ad Click',
    campaignId: 'cmp_3',
    campaignName: '[Global] [BOFU Retargeting] [Demo Abandoners] [Dynamic Catalog]',
    assignedAdminId: 'usr_admin_2',
    status: 'lost',
    estimatedValue: 22000,
    score: 45,
    notes: 'Media spend allocation frozen until Q1 2026 due to internal hiring freeze.',
    pipelineCategory: 'non_active',
    followUpRequired: true,
    nextFollowUpAction: 'Schedule Q1 2026 Budget Re-engagement Check-in',
    nextFollowUpDate: 'Dec 15, 2025',
    dateCaptured: '2025-07-05T13:20:00Z',
    lastContactedDate: '2025-07-25T10:00:00Z',
    interactions: [
      {
        id: 'int_14',
        date: '2025-07-25T10:00:00Z',
        type: 'status_change',
        note: 'Opportunity archived - Budget freeze until Q1',
        performedBy: 'Marcus Cole'
      }
    ]
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann_1',
    title: 'Meta Graph API v20.0 Gateway Token Rotation Completed',
    content: 'All Campaign Media Buyers: Our Conversions API (CAPI) server token rotation has completed successfully across all client ad accounts. Please review your Event Match Quality scores in Ads Manager to ensure event scores remain above 8.5/10.',
    priority: 'urgent',
    authorId: 'usr_superadmin',
    authorName: 'Briskode',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    targetAudience: 'all',
    isPinned: true,
    createdAt: '2025-08-01T08:00:00Z',
    tags: ['Meta Graph API', 'CAPI Gateway', 'High Priority'],
    acknowledgedUserIds: ['usr_admin_1']
  },
  {
    id: 'ann_2',
    title: 'Q3 Agency Milestone: $340k Managed Media Spend at 5.2x Blended ROAS',
    content: 'Outstanding work by Sarah Jenkins and the growth creative team! Our new Instagram Reels creative testing sprint decreased portfolio CPL by 26% while sustaining record high-ticket demo acquisition volume.',
    priority: 'strategy',
    authorId: 'usr_superadmin',
    authorName: 'Briskode',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    targetAudience: 'all',
    isPinned: false,
    createdAt: '2025-07-31T17:30:00Z',
    tags: ['Milestone', 'ROAS', 'Growth'],
    acknowledgedUserIds: ['usr_admin_1', 'usr_admin_2', 'usr_admin_3']
  },
  {
    id: 'ann_3',
    title: 'Operational Directive: 15-Minute Inbound Lead Response SLA',
    content: 'Admins & SDRs: Real-time webhooks for Meta Instant Lead Forms are active. Inbound prospects in the "New Leads" queue must be contacted within 15 minutes of capture to maintain our 38% qualification close rate.',
    priority: 'update',
    authorId: 'usr_superadmin',
    authorName: 'Briskode',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    targetAudience: 'all',
    isPinned: false,
    createdAt: '2025-07-28T10:00:00Z',
    tags: ['SDR Protocols', 'SLA', 'Workflow'],
    acknowledgedUserIds: ['usr_admin_1', 'usr_admin_2']
  },
  {
    id: 'ann_4',
    title: 'Scheduled Telemetry Maintenance: Meta Ad Account Ingestion Sync',
    content: 'The background data pipeline syncing spend and conversion postbacks will undergo routine database indexing this Sunday at 02:00 UTC. Active ad campaigns and bidding will not be interrupted.',
    priority: 'system',
    authorId: 'usr_superadmin',
    authorName: 'Briskode',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    targetAudience: 'all',
    isPinned: false,
    createdAt: '2025-07-25T14:15:00Z',
    tags: ['Maintenance', 'Telemetry Engine'],
    acknowledgedUserIds: ['usr_admin_2', 'usr_admin_3']
  }
];

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'inv_101',
    invoiceNumber: 'INV-2025-081',
    clientName: 'Elena Vasquez',
    clientEmail: 'elena@solislabs.io',
    clientCompany: 'Solis Biotech Labs',
    clientAddress: 'Bandra-Kurla Complex, Bandra East, Mumbai, MH 400051',
    campaignId: 'cmp_2',
    campaignName: '[India/Global] [IG Reels] [Founder Story] [High-Ticket Consulting]',
    assignedAdminId: 'usr_admin_1',
    amount: 145000,
    taxAmount: 26100,
    totalAmount: 171100,
    status: 'paid',
    issueDate: '2025-07-28',
    dueDate: '2025-08-11',
    paidDate: '2025-07-29',
    paymentMethod: 'RTGS / HDFC Corporate NetBanking',
    items: [
      {
        id: 'item_1',
        description: 'Meta Ads Management & Creative Production (Month 1 Retainer)',
        campaignId: 'cmp_2',
        quantity: 1,
        unitPrice: 95000,
        amount: 95000
      },
      {
        id: 'item_2',
        description: 'CAPI Dedicated Server Pipeline Setup & Pixel Health Audit',
        quantity: 1,
        unitPrice: 50000,
        amount: 50000
      }
    ],
    notes: 'Paid in full via RTGS corporate transfer. GST 18% applied.'
  },
  {
    id: 'inv_102',
    invoiceNumber: 'INV-2025-082',
    clientName: 'Bradley Cooper-Hayes',
    clientEmail: 'bradley@apexlogistics.com',
    clientCompany: 'Apex Freight Logistics',
    clientAddress: 'Outer Ring Road, Bellandur, Bengaluru, KA 560103',
    campaignId: 'cmp_1',
    campaignName: '[US/CA] [B2B SaaS] [Advantage+ Lead Gen] [Form v2.4]',
    assignedAdminId: 'usr_admin_1',
    amount: 220000,
    taxAmount: 39600,
    totalAmount: 259600,
    status: 'pending',
    issueDate: '2025-07-30',
    dueDate: '2025-08-14',
    items: [
      {
        id: 'item_3',
        description: 'Enterprise Pipeline Automation & Meta Lead Gen Management License',
        campaignId: 'cmp_1',
        quantity: 1,
        unitPrice: 180000,
        amount: 180000
      },
      {
        id: 'item_4',
        description: 'Custom Webhook Routing & CRM Ingestion Architecture',
        quantity: 1,
        unitPrice: 40000,
        amount: 40000
      }
    ],
    notes: 'Payment terms: Net 15 via NEFT/RTGS or Corporate IMPS.'
  },
  {
    id: 'inv_103',
    invoiceNumber: 'INV-2025-083',
    clientName: 'Raymond Thorne',
    clientEmail: 'r.thorne@thorneworldwide.com',
    clientCompany: 'Thorne Capital Partners',
    clientAddress: 'DLF Cyber City, Phase II, Gurugram, HR 122002',
    campaignId: 'cmp_5',
    campaignName: '[NYC/LON] [Executive Round Table] [Private Summit Pass]',
    assignedAdminId: 'usr_admin_2',
    amount: 85000,
    taxAmount: 15300,
    totalAmount: 100300,
    status: 'pending',
    issueDate: '2025-07-25',
    dueDate: '2025-08-08',
    items: [
      {
        id: 'item_5',
        description: 'Executive Performance Summit Sponsorship & Custom Lead Dossier',
        campaignId: 'cmp_5',
        quantity: 1,
        unitPrice: 85000,
        amount: 85000
      }
    ],
    notes: 'Awaiting corporate purchase order sign-off from accounts payable.'
  },
  {
    id: 'inv_104',
    invoiceNumber: 'INV-2025-084',
    clientName: 'Marcus Vance',
    clientEmail: 'm.vance@vanguardfin.com',
    clientCompany: 'Vanguard Financial Group',
    clientAddress: 'Nariman Point, Marine Drive, Mumbai, MH 400021',
    campaignId: 'cmp_3',
    campaignName: '[Global] [BOFU Retargeting] [Demo Abandoners] [Dynamic Catalog]',
    assignedAdminId: 'usr_admin_2',
    amount: 128000,
    taxAmount: 23040,
    totalAmount: 151040,
    status: 'overdue',
    issueDate: '2025-07-01',
    dueDate: '2025-07-15',
    items: [
      {
        id: 'item_6',
        description: 'Omnichannel Retargeting Campaign Optimization & Media Management',
        campaignId: 'cmp_3',
        quantity: 1,
        unitPrice: 128000,
        amount: 128000
      }
    ],
    notes: 'Overdue follow-up reminder sent. Admin Marcus Cole investigating with client finance team.'
  }
];

export const INITIAL_CUSTOMERS: CustomerProfile[] = [
  {
    id: 'cust_1',
    fullName: 'Elena Vasquez',
    email: 'elena@solislabs.io',
    phone: '+91 98201 44120',
    company: 'Solis Biotech Labs',
    industry: 'Biotechnology & Life Sciences',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80',
    status: 'vip',
    ltv: 620000,
    firstTouchCampaignId: 'cmp_2',
    firstTouchCampaignName: '[India/Global] [IG Reels] [Founder Story] [High-Ticket Consulting]',
    convertingCampaignId: 'cmp_2',
    convertingCampaignName: '[India/Global] [IG Reels] [Founder Story] [High-Ticket Consulting]',
    convertingAdFormat: 'REELS_VIDEO',
    assignedAdminId: 'usr_admin_1',
    createdAt: '2025-07-10T11:00:00Z',
    dealsCount: 2,
    pipelineCategory: 'active',
    followUpRequired: true,
    nextFollowUpAction: 'Quarterly Executive Review & CAPI Attribution Scaling',
    nextFollowUpDate: 'Aug 15, 2:00 PM',
    invoices: [INITIAL_INVOICES[0]],
    touchpoints: [
      {
        date: '2025-07-10',
        channel: 'Instagram Reels Video Ad',
        description: 'Watched 100% of 60s founder video breakdown, clicked bio link.'
      },
      {
        date: '2025-07-12',
        channel: 'Discovery Call',
        description: '30-minute media strategy evaluation with Sarah Jenkins.'
      },
      {
        date: '2025-07-28',
        channel: 'Retainer Agreement',
        description: 'Signed annual enterprise media management agreement (₹6,20,000 ARR).'
      }
    ],
    notes: 'Key executive stakeholder. Prefers bi-weekly Slack metric digests and monthly video syncs.'
  },
  {
    id: 'cust_2',
    fullName: 'Bradley Cooper-Hayes',
    email: 'bradley@apexlogistics.com',
    phone: '+91 98450 19283',
    company: 'Apex Freight Logistics',
    industry: 'Supply Chain & Global Logistics',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    status: 'active',
    ltv: 485000,
    firstTouchCampaignId: 'cmp_1',
    firstTouchCampaignName: '[US/CA] [B2B SaaS] [Advantage+ Lead Gen] [Form v2.4]',
    convertingCampaignId: 'cmp_1',
    convertingCampaignName: '[US/CA] [B2B SaaS] [Advantage+ Lead Gen] [Form v2.4]',
    convertingAdFormat: 'FEED_POST',
    assignedAdminId: 'usr_admin_1',
    createdAt: '2025-07-20T14:30:00Z',
    dealsCount: 1,
    pipelineCategory: 'active',
    followUpRequired: false,
    nextFollowUpAction: 'System integration live; ongoing automated routing active',
    nextFollowUpDate: 'Sept 01, 2025',
    invoices: [INITIAL_INVOICES[1]],
    touchpoints: [
      {
        date: '2025-07-20',
        channel: 'Facebook Feed Instant Form',
        description: 'Submitted Instant Qualification Form via Mobile News Feed.'
      },
      {
        date: '2025-07-22',
        channel: 'Technical Review',
        description: 'Technical architecture review with systems team.'
      }
    ],
    notes: 'Currently piloting automated pipeline routing with 15 logistics regional centers.'
  },
  {
    id: 'cust_3',
    fullName: 'Victoria Sterling',
    email: 'v.sterling@vanguardtech.co',
    phone: '+91 97110 38291',
    company: 'Vanguard Tech Solutions',
    industry: 'Enterprise Software & Cloud',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    status: 'lead',
    ltv: 185000,
    firstTouchCampaignId: 'cmp_1',
    firstTouchCampaignName: '[US/CA] [B2B SaaS] [Advantage+ Lead Gen] [Form v2.4]',
    convertingCampaignId: 'cmp_1',
    convertingCampaignName: '[US/CA] [B2B SaaS] [Advantage+ Lead Gen] [Form v2.4]',
    convertingAdFormat: 'FEED_POST',
    assignedAdminId: 'usr_admin_1',
    createdAt: '2025-08-01T10:15:00Z',
    dealsCount: 0,
    pipelineCategory: 'active',
    followUpRequired: true,
    nextFollowUpAction: 'Priority Inbound Discovery Call (SLA: 7m left)',
    nextFollowUpDate: 'Today, 2:00 PM',
    invoices: [],
    touchpoints: [
      {
        date: '2025-08-01',
        channel: 'Instagram Instant Form',
        description: 'Captured in real-time via Meta Instant Qualification Form.'
      }
    ],
    notes: 'High-priority inbound lead. Assigned to Sarah Jenkins for fast 15-minute response SLA.'
  },
  {
    id: 'cust_4',
    fullName: 'Liam Hemsworth-Wright',
    email: 'liam@nexusretail.com',
    phone: '+91 99201 88402',
    company: 'Nexus Retail Brands',
    industry: 'Omnichannel Retail & E-Commerce',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    status: 'lead',
    ltv: 320000,
    firstTouchCampaignId: 'cmp_2',
    firstTouchCampaignName: '[US] [IG Reels] [Founder Story] [High-Ticket Consulting]',
    convertingCampaignId: 'cmp_2',
    convertingCampaignName: '[US] [IG Reels] [Founder Story] [High-Ticket Consulting]',
    convertingAdFormat: 'REELS_VIDEO',
    assignedAdminId: 'usr_admin_1',
    createdAt: '2025-08-01T09:40:00Z',
    dealsCount: 0,
    pipelineCategory: 'active',
    followUpRequired: true,
    nextFollowUpAction: 'Deliver Advantage+ Shopping Audit & Catalog Strategy',
    nextFollowUpDate: 'Today, 4:30 PM',
    invoices: [],
    touchpoints: [
      {
        date: '2025-08-01',
        channel: 'Instagram Reels Video Ad',
        description: 'Completed video view and initiated consultation request.'
      }
    ],
    notes: 'Looking to transition media budget from TikTok Ads back to Meta Advantage+.'
  },
  {
    id: 'cust_5',
    fullName: 'Raymond Thorne',
    email: 'r.thorne@thorneworldwide.com',
    phone: '+91 98190 22391',
    company: 'Thorne Capital Partners',
    industry: 'Private Equity & Venture Capital',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    status: 'lead',
    ltv: 350000,
    firstTouchCampaignId: 'cmp_5',
    firstTouchCampaignName: '[NYC/LON] [Executive Round Table] [Private Summit Pass]',
    convertingCampaignId: 'cmp_5',
    convertingCampaignName: '[NYC/LON] [Executive Round Table] [Private Summit Pass]',
    convertingAdFormat: 'FEED_POST',
    assignedAdminId: 'usr_admin_2',
    createdAt: '2025-07-18T16:45:00Z',
    dealsCount: 0,
    pipelineCategory: 'active',
    followUpRequired: true,
    nextFollowUpAction: 'Investment Committee Review Follow-up',
    nextFollowUpDate: 'Friday, 11:30 AM',
    invoices: [INITIAL_INVOICES[2]],
    touchpoints: [
      {
        date: '2025-07-18',
        channel: 'Facebook VIP Executive Form',
        description: 'Registered for closed-door executive summit.'
      }
    ],
    notes: 'Awaiting corporate purchase order sign-off.'
  },
  {
    id: 'cust_6',
    fullName: 'Gregory Chen',
    email: 'gregory@matrixanalytics.net',
    phone: '+91 96190 44812',
    company: 'Matrix Health Analytics',
    industry: 'Healthcare Analytics',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
    status: 'churned',
    ltv: 220000,
    firstTouchCampaignId: 'cmp_3',
    firstTouchCampaignName: '[Global] [BOFU Retargeting] [Demo Abandoners] [Dynamic Catalog]',
    convertingCampaignId: 'cmp_3',
    convertingCampaignName: '[Global] [BOFU Retargeting] [Demo Abandoners] [Dynamic Catalog]',
    convertingAdFormat: 'FEED_POST',
    assignedAdminId: 'usr_admin_2',
    createdAt: '2025-07-05T13:20:00Z',
    dealsCount: 0,
    pipelineCategory: 'non_active',
    followUpRequired: true,
    nextFollowUpAction: 'Q1 2026 Budget Re-engagement Outreach',
    nextFollowUpDate: 'Dec 15, 2025',
    invoices: [],
    touchpoints: [
      {
        date: '2025-07-05',
        channel: 'Direct Ad Click',
        description: 'Pricing page conversion.'
      }
    ],
    notes: 'Hiring freeze delayed deployment. Re-engage in late Q4.'
  }
];

export const INITIAL_SETTINGS: SystemSettings = {
  adAccountId: 'act_88492019482',
  adAccountName: 'Briskode Meta Ads Production Account',
  businessManagerId: 'bm_990142851',
  graphApiVersion: 'v20.0 (Meta Graph API Enterprise)',
  apiTokenStatus: 'connected',
  metaPixelId: 'px_889201948291032',
  leadWebhookUrl: 'https://api.briskode.com/webhooks/meta-leadgen-v2',
  autoSyncIntervalMinutes: 5,
  currency: 'INR (₹)',
  timezone: 'Asia/Kolkata (IST +5:30)',
  dailyNotificationDigest: true,
  leadAlertWebhook: 'https://hooks.slack.com/services/T00/B00/X89201'
};

export const INITIAL_NOTIFICATIONS: import('../types').AppNotification[] = [
  {
    id: 'notif_1',
    title: 'Urgent Inbound Lead SLA',
    message: 'Liam Hemsworth-Wright submitted Meta Instant Lead Form for Enterprise Tier (₹1,85,000). Response SLA: 7m remaining.',
    timestamp: '2 mins ago',
    read: false,
    type: 'lead',
    targetTab: 'leadPipeline',
    badgeText: 'High Priority'
  },
  {
    id: 'notif_2',
    title: 'Lead Deal Secured (₹2,20,000.00)',
    message: 'Horizon AI Labs has confirmed Retainer Deal via Meta Lead routing.',
    timestamp: '14 mins ago',
    read: false,
    type: 'lead',
    targetTab: 'leadPipeline',
    badgeText: 'Converted'
  },
  {
    id: 'notif_3',
    title: 'Emergency Strategy Broadcast',
    message: 'Briskode posted: "Q4 Meta CAPI Graph API Token Refresh & Creative Scaling Strategy". Acknowledgment required.',
    timestamp: '1 hour ago',
    read: false,
    type: 'broadcast',
    targetTab: 'broadcast',
    badgeText: 'Memo'
  },
  {
    id: 'notif_4',
    title: 'Campaign Performance Threshold Exceeded',
    message: '[India/APAC] [Advantage+ Lead Gen] exceeded target ROAS at 4.8x (1,650 Leads).',
    timestamp: '3 hours ago',
    read: true,
    type: 'campaign',
    targetTab: 'dashboard',
    badgeText: '4.8x ROAS'
  },
  {
    id: 'notif_5',
    title: 'Scheduled Follow-Up Due',
    message: 'Scheduled VoIP Discovery Call with Victoria Sterling (Summit Logistics Cloud) is scheduled for today.',
    timestamp: '5 hours ago',
    read: true,
    type: 'lead',
    targetTab: 'leadPipeline',
    badgeText: 'Follow-Up'
  }
];
