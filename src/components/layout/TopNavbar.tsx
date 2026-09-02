import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FiShield, 
  FiPlus, 
  FiBell, 
  FiRefreshCw, 
  FiChevronDown, 
  FiLayers, 
  FiTarget, 
  FiVolume2, 
  FiCalendar, 
  FiSun, 
  FiMoon, 
  FiMenu 
} from 'react-icons/fi';

interface TopNavbarProps {
  onOpenNewCampaign: () => void;
  onOpenNewLead: () => void;
  onOpenNewBroadcast: () => void;
  onOpenMobileSidebar?: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  onOpenNewCampaign,
  onOpenNewLead,
  onOpenNewBroadcast,
  onOpenMobileSidebar,
}) => {
  const { 
    currentUser, 
    activeTab, 
    unreadNotificationsCount, 
    setIsNotificationDrawerOpen, 
    theme, 
    toggleTheme, 
    addToast 
  } = useApp();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [dateRange, setDateRange] = useState('Last 30 Days');

  const createRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (createRef.current && !createRef.current.contains(e.target as Node)) {
        setIsCreateOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      addToast('Attribution telemetry synced with Meta Graph API (264 events ingested)', 'success', 'Telemetry Synced');
    }, 1100);
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Meta Ads Manager & Performance Hub';
      case 'broadcast': return 'Broadcast Announcements';
      case 'leads': return 'Lead Ingestion & Records';
      case 'customer360': return 'Customer 360 & Attribution Dossiers';
      case 'leadPipeline': return 'Lead Pipeline Command (4-Column Board)';
      case 'settings': return 'System Configurations & API Webhooks';
      default: return 'Command Overview';
    }
  };

  return (
    <header className="h-16 px-3 sm:px-5 theme-navbar border-b flex items-center justify-between z-30 shrink-0 select-none transition-colors duration-200">
      {/* Left: Mobile Hamburger & View Title */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        {onOpenMobileSidebar && (
          <button
            onClick={onOpenMobileSidebar}
            className="lg:hidden p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-navy-800 border border-slate-200 dark:border-navy-700 transition-colors shrink-0"
            title="Open Navigation Menu"
          >
            <FiMenu className="w-4 h-4" />
          </button>
        )}

        <h1 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 tracking-tight truncate">
          {getTabTitle()}
        </h1>
      </div>

      {/* Right Action Rail & Profile */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
        {/* Date Range Selector (Desktop) */}
        <div className="hidden xl:flex items-center gap-1 bg-slate-100 dark:bg-navy-800 border border-slate-200 dark:border-navy-700 rounded-lg p-1 text-xs">
          <FiCalendar className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 ml-1.5" />
          {['Last 7 Days', 'Last 30 Days', 'Q3 To Date'].map(range => (
            <button
              key={range}
              onClick={() => {
                setDateRange(range);
                addToast(`Telemetry filtered to ${range}`, 'info', 'Date Range Updated');
              }}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                dateRange === range
                  ? 'bg-brand-600 text-white dark:bg-navy-700 dark:text-white font-semibold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {range}
            </button>
          ))}
        </div>

        {/* Sync Button */}
        <button
          onClick={handleManualSync}
          disabled={isSyncing}
          className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-navy-800 hover:bg-slate-200 dark:hover:bg-navy-750 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-navy-700 transition-colors"
          title="Force refresh with Meta Graph API"
        >
          <FiRefreshCw className={`w-3.5 h-3.5 text-sky-500 dark:text-sky-400 ${isSyncing ? 'animate-spin' : ''}`} />
          <span className="hidden lg:inline">Sync Meta</span>
        </button>

        {/* Theme Toggle Button (Sun/Moon) */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-slate-100 dark:bg-navy-800 hover:bg-slate-200 dark:hover:bg-navy-750 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-navy-700 transition-colors"
          title={theme === 'dark' ? 'Switch to White Theme' : 'Switch to Antigravity Dark Theme'}
        >
          {theme === 'dark' ? (
            <FiSun className="w-4 h-4 text-amber-400" />
          ) : (
            <FiMoon className="w-4 h-4 text-indigo-600" />
          )}
        </button>

        {/* Quick Create Dropdown */}
        <div className="relative" ref={createRef}>
          <button
            onClick={() => setIsCreateOpen(!isCreateOpen)}
            className="flex items-center gap-1 sm:gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold antigravity-button-primary bg-brand-600 hover:bg-brand-500 text-white shadow-subtle transition-all"
          >
            <FiPlus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Create</span>
            <FiChevronDown className="w-3 h-3 opacity-80" />
          </button>

          {isCreateOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-lg shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3 py-1.5 border-b border-slate-100 dark:border-navy-800 text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                Operational Actions
              </div>

              {currentUser.role === 'super_admin' && (
                <button
                  onClick={() => {
                    setIsCreateOpen(false);
                    onOpenNewCampaign();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-navy-800 text-left transition-colors"
                >
                  <FiLayers className="w-4 h-4 text-sky-500 dark:text-sky-400 shrink-0" />
                  <div>
                    <p className="font-semibold">New Meta Campaign</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">Advantage+ & Reels video</p>
                  </div>
                </button>
              )}

              <button
                onClick={() => {
                  setIsCreateOpen(false);
                  onOpenNewLead();
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-navy-800 text-left transition-colors"
              >
                <FiTarget className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                <div>
                  <p className="font-semibold">Capture Inbound Lead</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Manual pipeline entry</p>
                </div>
              </button>

              {currentUser.role === 'super_admin' && (
                <button
                  onClick={() => {
                    setIsCreateOpen(false);
                    onOpenNewBroadcast();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-navy-800 text-left transition-colors border-t border-slate-100 dark:border-navy-800 mt-1"
                >
                  <FiVolume2 className="w-4 h-4 text-purple-500 dark:text-purple-400 shrink-0" />
                  <div>
                    <p className="font-semibold">Post Team Broadcast</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">Emergency & strategy memo</p>
                  </div>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Bell / Broadcast Notifications */}
        <button
          onClick={() => setIsNotificationDrawerOpen(true)}
          className="relative p-2 rounded-lg bg-slate-100 dark:bg-navy-800 hover:bg-slate-200 dark:hover:bg-navy-750 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-navy-700 transition-colors"
          title="System Notifications"
        >
          <FiBell className="w-4 h-4" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500" />
          )}
        </button>

        {/* Briskode SuperAdmin Profile Pill (Clean Static Profile Badge) */}
        <div className="flex items-center gap-1.5 sm:gap-2 pl-1 pr-2.5 py-1 rounded-lg bg-slate-100 dark:bg-navy-800 border border-slate-200 dark:border-navy-700">
          {/* Logo / Monogram slot */}
          <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center shadow-sm border border-blue-400/20 shrink-0 overflow-hidden">
          <img
  src="/image.png"
  alt="BK"
  className="w-full h-full object-contain scale-175"
/>
          </div>
          <div className="hidden sm:block text-left">
            <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
              Briskode
            </span>
          </div>
          <span className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.2 rounded theme-badge-amber">
            Super
          </span>
        </div>
      </div>
    </header>
  );
};
