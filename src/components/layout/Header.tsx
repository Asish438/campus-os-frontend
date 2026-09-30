import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Menu, 
  Search, 
  Sun, 
  Moon, 
  Bell, 
  ChevronDown, 
  User, 
  KeyRound, 
  Settings as SettingsIcon, 
  LogOut,
  X,
  CheckCircle,
  FileCheck,
  Banknote,
  Landmark,
  Shield,
  Clock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

interface HeaderProps {
  onLogoutClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLogoutClick }) => {
  const {
    theme,
    toggleTheme,
    currentRole,
    setCurrentRole,
    setSidebarOpen,
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
  } = useApp();

  const navigate = useNavigate();

  // Dropdown toggles
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close popovers on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotificationOpen(false);
      }
      if (roleRef.current && !roleRef.current.contains(e.target as Node)) {
        setRoleSwitcherOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const roles: UserRole[] = [
    'Super Admin',
    'Admin',
    'Manager',
    'Accountant',
    'Cashier',
    'Loan Officer',
    'KYC Officer'
  ];

  const handleSearchResultClick = (url: string) => {
    clearSearch();
    setSearchFocused(false);
    navigate(url);
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 px-4 sm:px-6 flex items-center justify-between gap-4 transition-colors">
      {/* Left: Hamburger & Global Search */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        {/* Mobile Toggle */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Open Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Desktop Sidebar Collapse Toggle */}
        <button
          onClick={toggleDesktopSidebar}
          className="hidden lg:flex p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Toggle Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Bar */}
        <div ref={searchRef} className="relative flex-1">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              placeholder="Search members, accounts, loans, etc..."
              className="w-full pl-9 pr-8 py-2 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-150 dark:hover:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 border border-transparent focus:border-blue-500/50 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-inner/10"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Search Dropdown Results */}
          {searchFocused && searchQuery.trim().length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden z-50 max-h-96 overflow-y-auto">
              {isSearching ? (
                <div className="p-4 text-center text-xs text-slate-400">Searching records...</div>
              ) : searchResults.length === 0 ? (
                <div className="p-4 text-center text-xs text-slate-500">
                  No matching members, accounts or loans found.
                </div>
              ) : (
                <div className="py-2">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Results ({searchResults.length})
                  </div>
                  {searchResults.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSearchResultClick(item.url)}
                      className="px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-750 last:border-0"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          item.type === 'Member' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' :
                          item.type === 'Account' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300' :
                          item.type === 'Loan' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300' :
                          'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
                        }`}>
                          {item.type}
                        </span>
                        <div>
                          <div className="text-xs font-semibold text-slate-800 dark:text-slate-100">
                            {item.title}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400">
                            {item.subtitle}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right: Role Switcher, Theme, Notifications, Admin Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Simulated Role Switcher */}
        <div ref={roleRef} className="relative hidden md:block">
          <button
            onClick={() => setRoleSwitcherOpen(prev => !prev)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200/60 dark:border-slate-700/60"
            title="Simulate Role"
          >
            <Shield className="w-3.5 h-3.5 text-blue-500" />
            <span>Role: <strong className="text-blue-600 dark:text-blue-400">{currentRole}</strong></span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {roleSwitcherOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl py-1.5 z-50">
              <div className="px-3 py-1 text-[10px] uppercase font-bold text-slate-400">
                Simulate Active Role
              </div>
              {roles.map(r => (
                <button
                  key={r}
                  onClick={() => {
                    setCurrentRole(r);
                    setRoleSwitcherOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs font-medium flex items-center justify-between ${
                    currentRole === r
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                  }`}
                >
                  <span>{r}</span>
                  {currentRole === r && <CheckCircle className="w-3.5 h-3.5 text-blue-500" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
        >
          {theme === 'light' ? (
            <Moon className="w-5 h-5 text-slate-600" />
          ) : (
            <Sun className="w-5 h-5 text-amber-400" />
          )}
        </button>

        {/* Notification Bell */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => setNotificationOpen(prev => !prev)}
            className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadNotificationCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white dark:ring-slate-900 animate-pulse">
                {unreadNotificationCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {notificationOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl z-50 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-700/80 bg-slate-50/70 dark:bg-slate-800/80">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">
                    Notifications
                  </span>
                  {unreadNotificationCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400">
                      {unreadNotificationCount} new
                    </span>
                  )}
                </div>
                <button
                  onClick={markAllNotificationsAsRead}
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Mark all as read
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700/60">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-400">
                    No new notifications
                  </div>
                ) : (
                  notifications.map(n => (
                    <div
                      key={n.id}
                      onClick={() => {
                        markNotificationAsRead(n.id);
                        if (n.link) {
                          setNotificationOpen(false);
                          navigate(n.link);
                        }
                      }}
                      className={`p-3.5 hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors cursor-pointer flex items-start gap-3 ${
                        !n.read ? 'bg-blue-50/40 dark:bg-blue-950/20' : ''
                      }`}
                    >
                      <div className={`p-2 rounded-xl shrink-0 ${
                        n.type === 'kyc' ? 'bg-amber-100 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400' :
                        n.type === 'loan' ? 'bg-rose-100 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400' :
                        n.type === 'fd' ? 'bg-purple-100 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400' :
                        'bg-blue-100 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400'
                      }`}>
                        {n.type === 'kyc' && <FileCheck className="w-4 h-4" />}
                        {n.type === 'loan' && <Banknote className="w-4 h-4" />}
                        {n.type === 'fd' && <Landmark className="w-4 h-4" />}
                        {n.type === 'member' && <User className="w-4 h-4" />}
                        {n.type === 'system' && <Bell className="w-4 h-4" />}
                      </div>
                      <div className="flex-1 text-xs">
                        <div className="font-semibold text-slate-900 dark:text-white flex items-center justify-between">
                          <span>{n.title}</span>
                          {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                          {n.description}
                        </p>
                        <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1">
                          <Clock className="w-3 h-3" />
                          <span>{n.time}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Admin Profile Dropdown */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => setProfileDropdownOpen(prev => !prev)}
            className="flex items-center gap-2.5 p-1.5 pl-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
              AD
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 dark:text-white leading-none">
                Admin
              </span>
              <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 mt-0.5">
                Super Admin
              </span>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>

          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl py-2 z-50">
              <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700/60">
                <p className="text-xs font-bold text-slate-900 dark:text-white">Alok Ranjan Mohapatra</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">admin@apexcoopbank.in</p>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    navigate('/settings');
                  }}
                  className="w-full px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2.5"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  <span>My Profile</span>
                </button>
                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    navigate('/settings');
                  }}
                  className="w-full px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2.5"
                >
                  <KeyRound className="w-4 h-4 text-slate-400" />
                  <span>Change Password</span>
                </button>
                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    navigate('/settings');
                  }}
                  className="w-full px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2.5"
                >
                  <SettingsIcon className="w-4 h-4 text-slate-400" />
                  <span>Settings</span>
                </button>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-700/60 pt-1">
                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    onLogoutClick();
                  }}
                  className="w-full px-4 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2.5"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
