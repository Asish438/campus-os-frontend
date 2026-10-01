import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useCampus } from '../../context/CampusContext';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  Sun,
  Moon,
  Bell,
  Camera,
  Search,
  ChevronDown,
  Sparkles,
  Shield,
  GraduationCap,
  Users,
  Bus,
  DollarSign,
  UserCheck
} from 'lucide-react';
import NotificationDropdown from '../notifications/NotificationDropdown';

export const Topbar = ({ onToggleMobileDrawer }) => {
  const { user, role, switchRole } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { notifications } = useCampus();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const unreadNotifications = notifications.filter(n => !n.read).length;

  const roles = [
    { id: 'STUDENT', label: 'Student', icon: GraduationCap, path: '/student/dashboard' },
    { id: 'FACULTY', label: 'Faculty', icon: UserCheck, path: '/faculty/dashboard' },
    { id: 'WARDEN', label: 'Warden', icon: Users, path: '/warden/dashboard' },
    { id: 'SECURITY', label: 'Security', icon: Shield, path: '/security/dashboard' },
    { id: 'ACCOUNTS', label: 'Accounts', icon: DollarSign, path: '/accounts/dashboard' },
    { id: 'TRANSPORT', label: 'Transport', icon: Bus, path: '/transport/dashboard' },
    { id: 'ADMIN', label: 'Admin', icon: Sparkles, path: '/admin/dashboard' }
  ];

  const handleRoleChange = (r) => {
    switchRole(r.id);
    setShowRoleSwitcher(false);
    navigate(r.path);
  };

  const handleGlobalSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (searchQuery.toLowerCase().includes('fee')) navigate('/student/fees');
    else if (searchQuery.toLowerCase().includes('attend')) navigate('/student/attendance');
    else if (searchQuery.toLowerCase().includes('bus') || searchQuery.toLowerCase().includes('transport')) navigate('/student/transport');
    else if (searchQuery.toLowerCase().includes('pass') || searchQuery.toLowerCase().includes('gate')) navigate('/student/gate-pass');
    else if (searchQuery.toLowerCase().includes('hostel') || searchQuery.toLowerCase().includes('complaint')) navigate('/student/complaints');
    else if (searchQuery.toLowerCase().includes('ai') || searchQuery.toLowerCase().includes('study')) navigate('/student/ai-study');
    else navigate('/student/dashboard');
  };

  return (
    <header className="h-16 px-4 lg:px-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      {/* Left Area: Mobile Drawer Toggle & Search */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileDrawer}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        <form onSubmit={handleGlobalSearch} className="relative hidden md:block w-72 lg:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search campus modules, passes, notices, fees..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-100 dark:bg-slate-800/70 border border-transparent focus:border-indigo-500 dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-slate-900 rounded-xl transition-all text-slate-800 dark:text-slate-100 placeholder:text-slate-400 outline-none"
          />
        </form>
      </div>

      {/* Right Area: Role Quick Switcher, Dark Mode, Notifications, User */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Live Demo Fast Role Switcher */}
        <div className="relative">
          <button
            onClick={() => setShowRoleSwitcher(prev => !prev)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900/60 hover:bg-blue-100/70 transition-colors shadow-xs"
          >
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span className="hidden sm:inline text-slate-500 dark:text-slate-400">Portal:</span>
            <span className="font-bold text-blue-700 dark:text-blue-300">{role}</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-60 text-blue-600" />
          </button>

          {showRoleSwitcher && (
            <div className="absolute right-0 top-full mt-2 w-52 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-1.5 z-50 animate-fade-in">
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Switch Perspective
              </div>
              {roles.map((r) => {
                const Icon = r.icon;
                const isCurrent = r.id === role;
                return (
                  <button
                    key={r.id}
                    onClick={() => handleRoleChange(r)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                      isCurrent
                        ? 'bg-blue-600 text-white font-bold shadow-sm shadow-blue-500/20'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-700'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{r.label} Portal</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Theme Switcher */}
        <button
          onClick={toggleTheme}
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          {theme === 'light' ? (
            <Moon className="w-4 h-4" />
          ) : (
            <Sun className="w-4 h-4 text-amber-400" />
          )}
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(prev => !prev)}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifications > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
            )}
          </button>

          <NotificationDropdown
            isOpen={showNotifications}
            onClose={() => setShowNotifications(false)}
          />
        </div>

        {/* Profile Pill */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
                    <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150'}
            alt={user?.name || 'User'}
            className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/20"
          />
          <div className="hidden xl:block text-left">
            <p className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-tight">
              {user?.name || 'Sai'}
            </p>
            <p className="text-[10px] text-slate-400 leading-tight">
              {user?.studentId || user?.department || role}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
