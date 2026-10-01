import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  GraduationCap,
  CalendarCheck2,
  Sparkles,
  Camera,
  BookOpen,
  Building2,
  AlertTriangle,
  QrCode,
  Users,
  Bus,
  CreditCard,
  FileText,
  Bell,
  User,
  ShieldCheck,
  ScanLine,
  FileSpreadsheet,
  Layers,
  BarChart3,
  Sliders,
  DollarSign,
  Send,
  Building,
  School,
  LogOut,
  ChevronRight
} from 'lucide-react';

export const Sidebar = ({ isMobile = false, onCloseMobile }) => {
  const { user, role, logout } = useAuth();

  const getNavLinks = () => {
    switch (role) {
      case 'STUDENT':
        return [
          { group: 'Core', items: [
            { to: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { to: '/student/academics', label: 'Academics', icon: GraduationCap },
            { to: '/student/attendance', label: 'Attendance', icon: CalendarCheck2, badge: '68%' },
            { to: '/student/ai-study', label: 'AI Study Assistant', icon: Sparkles,
  Camera, highlight: true },
            { to: '/student/assignments', label: 'Assignments', icon: BookOpen, badge: '3' },
          ]},
          { group: 'Campus Life', items: [
            { to: '/student/hostel', label: 'Hostel & Mess', icon: Building2 },
            { to: '/student/complaints', label: 'Complaints', icon: AlertTriangle },
            { to: '/student/gate-pass', label: 'Gate Pass', icon: QrCode },
            { to: '/student/visitors', label: 'Visitors', icon: Users },
            { to: '/student/transport', label: 'Transport', icon: Bus },
          ]},
          { group: 'Services & Profile', items: [
            { to: '/student/fees', label: 'Fees & Dues', icon: CreditCard },
            { to: '/student/documents', label: 'Documents', icon: FileText },
            { to: '/student/notices', label: 'Notices', icon: Bell },
            { to: '/student/profile', label: 'Student Profile', icon: User },
          ]}
        ];

      case 'FACULTY':
        return [
          { group: 'Teaching', items: [
            { to: '/faculty/dashboard', label: 'Faculty Dashboard', icon: LayoutDashboard },
            { to: '/faculty/courses', label: 'Assigned Courses', icon: BookOpen },
            { to: '/faculty/attendance', label: 'Class Attendance', icon: CalendarCheck2 },
            { to: '/faculty/modules', label: 'AI Module Upload', icon: Sparkles,
  Camera, highlight: true },
            { to: '/faculty/assignments', label: 'Assignments', icon: FileSpreadsheet },
            { to: '/faculty/students', label: 'Students Roster', icon: Users },
            { to: '/faculty/announcements', label: 'Announcements', icon: Bell },
          ]}
        ];

      case 'WARDEN':
        return [
          { group: 'Hostel Control', items: [
            { to: '/warden/dashboard', label: 'Warden Dashboard', icon: LayoutDashboard },
            { to: '/warden/complaints', label: 'Hostel Complaints', icon: AlertTriangle, highlight: true },
            { to: '/warden/gate-pass', label: 'Gate Passes', icon: QrCode },
            { to: '/warden/visitors', label: 'Visitors Desk', icon: Users },
            { to: '/warden/hostel', label: 'Hostel Management', icon: Building2 },
          ]}
        ];

      case 'SECURITY':
        return [
          { group: 'Access Control', items: [
            { to: '/security/dashboard', label: 'Security Command', icon: ShieldCheck },
            { to: '/security/scanner', label: 'QR Pass Scanner', icon: ScanLine, highlight: true },
            { to: '/security/visitors', label: 'Visitor Logs', icon: Users },
            { to: '/security/logs', label: 'Audit Gate Logs', icon: FileText },
          ]}
        ];

      case 'ACCOUNTS':
        return [
          { group: 'Finance & Dues', items: [
            { to: '/accounts/dashboard', label: 'Accounts Dashboard', icon: DollarSign },
          ]}
        ];

      case 'TRANSPORT':
        return [
          { group: 'Fleet Dispatch', items: [
            { to: '/transport/dashboard', label: 'Fleet Command', icon: Bus, highlight: true },
          ]}
        ];

      case 'ADMIN':
        return [
          { group: 'Command Center', items: [
            { to: '/admin/dashboard', label: 'Command Overview', icon: LayoutDashboard },
            { to: '/admin/students', label: 'Student Directory', icon: Users },
            { to: '/admin/departments', label: 'Departments', icon: Building },
            { to: '/admin/academics', label: 'Academic Programs', icon: School },
            { to: '/admin/attendance', label: 'Campus Attendance', icon: CalendarCheck2 },
          ]},
          { group: 'Operations', items: [
            { to: '/admin/requests', label: 'Student Requests', icon: Layers },
            { to: '/admin/complaints', label: 'Campus Complaints', icon: AlertTriangle },
            { to: '/admin/hostel', label: 'Hostel Matrix', icon: Building2 },
            { to: '/admin/fees', label: 'Fee Collections', icon: CreditCard },
            { to: '/admin/transport', label: 'Transport Fleet', icon: Bus },
          ]},
          { group: 'Enterprise Intelligence', items: [
            { to: '/admin/communication', label: 'Broadcasts', icon: Send },
            { to: '/admin/analytics', label: 'Analytics Engine', icon: BarChart3 },
            { to: '/admin/reports', label: 'Regulatory Reports', icon: FileSpreadsheet },
            { to: '/admin/audit-logs', label: 'Security Audit Logs', icon: ShieldCheck },
            { to: '/admin/settings', label: 'System Settings', icon: Sliders },
          ]}
        ];

      default:
        return [];
    }
  };

  const navGroups = getNavLinks();

  return (
    <motion.aside
      initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.3 }}
      className={`flex flex-col h-full bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-r border-slate-200/90 dark:border-slate-800 select-none ${
        isMobile ? 'w-full' : 'w-64 shrink-0'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 px-5 flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800">
        <NavLink
          to="/"
          className="flex items-center gap-2.5 font-bold tracking-tight text-slate-900 dark:text-white group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
            <School className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base tracking-wider font-extrabold text-slate-900 dark:text-white">CAMPUS</span>
              <span className="text-xs px-1.5 py-0.2 rounded bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 font-mono font-bold border border-blue-200 dark:border-blue-900">
                OS
              </span>
            </div>
            <p className="text-[9px] text-slate-400 font-medium tracking-tight">Campus Life, Debugged.</p>
          </div>
        </NavLink>
      </div>

      {/* Role Badge Indicator */}
      <div className="px-4 py-2 bg-blue-50/70 dark:bg-blue-950/30 border-b border-blue-100 dark:border-blue-900/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800 dark:text-blue-300">
            {role} PORTAL
          </span>
        </div>
        <span className="text-[10px] text-blue-600 dark:text-blue-400 font-mono font-bold">v3.0 Active</span>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {navGroups.map((grp, idx) => (
          <div key={idx} className="space-y-1">
            <h5 className="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
              {grp.group}
            </h5>
            {grp.items.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => isMobile && onCloseMobile && onCloseMobile()}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 font-bold'
                        : item.highlight
                        ? 'text-blue-700 bg-blue-50/80 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/50 dark:text-blue-300 border border-blue-200 dark:border-blue-900/60'
                        : 'text-slate-600 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50/60 dark:hover:bg-slate-800/60'
                    }`
                  }
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover:bg-blue-100 dark:group-hover:bg-slate-700">
                      {item.badge}
                    </span>
                  )}
                  {item.highlight && !item.badge && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping" />
                  )}
                </NavLink>
              );
            })}
          </div>
        ))}
      </div>

      {/* User Session Footer */}
      <div className="p-3 border-t border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900">
        <div className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 shadow-xs">
          <div className="flex items-center gap-2.5 min-w-0">
                        <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150'}
              alt={user?.name || 'User'}
              className="w-8 h-8 rounded-lg object-cover border border-slate-200 dark:border-slate-700 shrink-0"
            />
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                {user?.name || 'Sai'}
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                {user?.studentId || user?.email || role}
              </p>
            </div>
          </div>
          <button
            onClick={logout}
            title="Sign Out"
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
