import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { NavigationTab, LeadsSubTab } from '../../types';
import { 
  FiBarChart2, 
  FiVolume2, 
  FiTarget, 
  FiFolder, 
  FiSettings,
  FiChevronDown,
  FiChevronRight,
  FiShield,
  FiUserCheck,
  FiActivity,
  FiX
} from 'react-icons/fi';

interface SidebarProps {
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onCloseMobile }) => {
  const { 
    activeTab, 
    setActiveTab, 
    leadsSubTab, 
    setLeadsSubTab, 
    currentUser, 
    filteredLeads, 
    unreadNotificationsCount,
    filteredCampaigns
  } = useApp();

  const [leadsExpanded, setLeadsExpanded] = useState<boolean>(true);

  // Dynamic counts
  const newLeadsCount = filteredLeads.filter(l => l.status === 'new').length;
  const oldLeadsCount = filteredLeads.filter(l => l.status !== 'new').length;
  const activeCampaignsCount = filteredCampaigns.filter(c => c.status === 'ACTIVE').length;

  const handleNavClick = (tab: NavigationTab) => {
    setActiveTab(tab);
    if (onCloseMobile) onCloseMobile();
  };

  const handleLeadsClick = () => {
    setActiveTab('leads');
    setLeadsExpanded(!leadsExpanded);
  };

  const selectLeadsSub = (sub: LeadsSubTab) => {
    setActiveTab('leads');
    setLeadsSubTab(sub);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <aside className="w-64 theme-sidebar border-r flex flex-col h-full shrink-0 select-none z-20 transition-colors duration-200">
      {/* Brand & Organization Header (Briskode with Logo Slot) */}
      <div className="h-16 px-4 border-b border-slate-200 dark:border-navy-750 flex items-center justify-between shrink-0 bg-slate-50/50 dark:bg-navy-900/60">
        <div className="flex items-center gap-3 min-w-0">
          {/* Logo container with fallback monogram */}
         <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center shadow-sm border border-blue-400/20 shrink-0 overflow-hidden">
            <img
              src="/image.png"
              alt="BK"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xs text-slate-900 dark:text-slate-100 tracking-tight truncate">
                Briskode
              </span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono truncate">
              Marketing Ops Command
            </p>
          </div>
        </div>

        {/* Mobile Close button */}
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors"
            title="Close Sidebar"
          >
            <FiX className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Role Context Bar (Briskode) */}
      <div className="px-4 py-2.5 bg-slate-50 dark:bg-navy-900/40 border-b border-slate-200 dark:border-navy-750 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            {currentUser.role === 'super_admin' ? (
              <span className="p-1 rounded bg-amber-500/10 text-amber-500 dark:text-amber-400 border border-amber-500/20 shrink-0">
                <FiShield className="w-3.5 h-3.5" />
              </span>
            ) : (
              <span className="p-1 rounded bg-blue-500/10 text-blue-600 dark:text-sky-400 border border-blue-500/20 shrink-0">
                <FiUserCheck className="w-3.5 h-3.5" />
              </span>
            )}
            <div className="min-w-0">
              <p className="text-[11px] font-bold text-slate-900 dark:text-slate-200 truncate">
                {currentUser.name}
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                {currentUser.role === 'super_admin' ? 'Master Admin' : 'Assigned Media Lead'}
              </p>
            </div>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" title="Active Connection" />
        </div>
      </div>

      {/* Navigation Hierarchy */}
      <div className="flex-1 overflow-y-auto px-2.5 py-3 space-y-1">
        <div className="px-2 pt-1 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Command & Operations
        </div>

        {/* 1. Dashboard */}
        <button
          onClick={() => handleNavClick('dashboard')}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'dashboard'
              ? 'bg-brand-600 text-white shadow-sm'
              : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-navy-800/80'
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <FiBarChart2 className={`w-4 h-4 shrink-0 ${activeTab === 'dashboard' ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
            <span className="truncate">Dashboard</span>
          </div>
          {activeCampaignsCount > 0 && (
            <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded shrink-0 ${
              activeTab === 'dashboard' ? 'bg-white/20 text-white' : 'theme-badge-success'
            }`}>
              {activeCampaignsCount} Active
            </span>
          )}
        </button>

        {/* 2. Broadcast Announcement */}
        <button
          onClick={() => handleNavClick('broadcast')}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'broadcast'
              ? 'bg-brand-600 text-white shadow-sm'
              : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-navy-800/80'
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <FiVolume2 className={`w-4 h-4 shrink-0 ${activeTab === 'broadcast' ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
            <span className="truncate">Broadcast Announcement</span>
          </div>
          {unreadNotificationsCount > 0 && (
            <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
          )}
        </button>

        {/* 3. All Leads (with collapsible sub-nav) */}
        <div className="space-y-0.5">
          <button
            onClick={handleLeadsClick}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'leads'
                ? 'bg-slate-100 dark:bg-navy-800 text-slate-900 dark:text-white border border-slate-200 dark:border-navy-700'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-navy-800/80'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <FiTarget className={`w-4 h-4 shrink-0 ${activeTab === 'leads' ? 'text-brand-600 dark:text-brand-400' : 'text-slate-500 dark:text-slate-400'}`} />
              <span className="truncate">All Leads</span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-200 dark:bg-navy-900 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-navy-750">
                {filteredLeads.length}
              </span>
              {leadsExpanded ? <FiChevronDown className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" /> : <FiChevronRight className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />}
            </div>
          </button>

          {/* Sub-nav items */}
          {leadsExpanded && (
            <div className="pl-6 pr-1 py-1 space-y-1 border-l border-slate-200 dark:border-navy-800 ml-4 animate-in slide-in-from-top-1 duration-150">
              <button
                onClick={() => selectLeadsSub('new')}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-[11px] transition-colors ${
                  activeTab === 'leads' && leadsSubTab === 'new'
                    ? 'theme-badge-success font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-navy-850'
                }`}
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span className="truncate">New Leads</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
                  {newLeadsCount}
                </span>
              </button>

              <button
                onClick={() => selectLeadsSub('old')}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-[11px] transition-colors ${
                  activeTab === 'leads' && leadsSubTab === 'old'
                    ? 'bg-slate-200 dark:bg-navy-800 text-slate-900 dark:text-slate-100 font-bold border border-slate-300 dark:border-navy-700'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-navy-850'
                }`}
              >
                <span className="truncate">Old / Contacted</span>
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 shrink-0">
                  {oldLeadsCount}
                </span>
              </button>
            </div>
          )}
        </div>

        {/* 4. Customer 360 */}
        <button
          onClick={() => handleNavClick('customer360')}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'customer360'
              ? 'bg-brand-600 text-white shadow-sm'
              : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-navy-800/80'
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <FiFolder className={`w-4 h-4 shrink-0 ${activeTab === 'customer360' ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
            <span className="truncate">Customer 360</span>
          </div>
        </button>

        {/* 5. Lead Pipeline Columns (4-Col) */}
        <button
          onClick={() => handleNavClick('leadPipeline')}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'leadPipeline'
              ? 'bg-brand-600 text-white shadow-sm'
              : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-navy-800/80'
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <FiActivity className={`w-4 h-4 shrink-0 ${activeTab === 'leadPipeline' ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
            <span className="truncate">Lead Pipeline (4-Col)</span>
          </div>
          <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded theme-badge-amber">
            4-Col
          </span>
        </button>

        {/* 6. System Settings */}
        <button
          onClick={() => handleNavClick('settings')}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'settings'
              ? 'bg-brand-600 text-white shadow-sm'
              : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-navy-800/80'
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <FiSettings className={`w-4 h-4 shrink-0 ${activeTab === 'settings' ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
            <span className="truncate">System Settings</span>
          </div>
        </button>
      </div>
    </aside>
  );
};
