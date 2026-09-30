import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  PiggyBank, 
  Repeat, 
  Landmark, 
  Banknote, 
  Receipt, 
  BookOpen, 
  FileBarChart2, 
  UserCheck, 
  ShieldCheck, 
  Settings as SettingsIcon, 
  LogOut,
  ChevronDown,
  Building2,
  X,
  UserPlus,
  FileCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface SidebarProps {
  onLogoutClick: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onLogoutClick }) => {
  const { 
    sidebarOpen, 
    setSidebarOpen, 
    desktopSidebarCollapsed 
  } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  // State for collapsible submenus
  const [membersExpanded, setMembersExpanded] = useState(
    location.pathname.startsWith('/members') || location.pathname.startsWith('/kyc')
  );

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5 shrink-0" />,
      to: '/dashboard'
    },
    {
      id: 'members',
      label: 'Members & KYC',
      icon: <Users className="w-5 h-5 shrink-0" />,
      to: '/members',
      hasSubmenu: true,
      isExpanded: membersExpanded,
      toggle: () => setMembersExpanded(prev => !prev),
      subItems: [
        { label: 'All Members', to: '/members', icon: <Users className="w-4 h-4" /> },
        { label: '+ Add Member', to: '/members/add', icon: <UserPlus className="w-4 h-4" /> },
        { label: 'KYC Verification', to: '/kyc', icon: <FileCheck className="w-4 h-4" /> }
      ]
    },
    {
      id: 'savings',
      label: 'Savings Account',
      icon: <PiggyBank className="w-5 h-5 shrink-0" />,
      to: '/savings'
    },
    {
      id: 'rd',
      label: 'RD Management',
      icon: <Repeat className="w-5 h-5 shrink-0" />,
      to: '/rd'
    },
    {
      id: 'fd',
      label: 'FD Management',
      icon: <Landmark className="w-5 h-5 shrink-0" />,
      to: '/fd'
    },
    {
      id: 'loans',
      label: 'Loan Management',
      icon: <Banknote className="w-5 h-5 shrink-0" />,
      to: '/loans'
    },
    {
      id: 'collections',
      label: 'Cashier & Collection',
      icon: <Receipt className="w-5 h-5 shrink-0" />,
      to: '/collections'
    },
    {
      id: 'accounting',
      label: 'Accounting',
      icon: <BookOpen className="w-5 h-5 shrink-0" />,
      to: '/accounting'
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: <FileBarChart2 className="w-5 h-5 shrink-0" />,
      to: '/reports'
    },
    {
      id: 'staff',
      label: 'Staff / Users',
      icon: <UserCheck className="w-5 h-5 shrink-0" />,
      to: '/staff'
    },
    {
      id: 'audit-logs',
      label: 'Security & Audit Logs',
      icon: <ShieldCheck className="w-5 h-5 shrink-0" />,
      to: '/audit-logs'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <SettingsIcon className="w-5 h-5 shrink-0" />,
      to: '/settings'
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 ease-in-out flex flex-col bg-[#0b132b] text-slate-200 border-r border-slate-800/80 ${
          desktopSidebarCollapsed ? 'lg:w-20' : 'lg:w-64'
        } ${sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-slate-800/80 bg-[#070d1e]">
          <div 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-3 cursor-pointer overflow-hidden"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-blue-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            {(!desktopSidebarCollapsed || sidebarOpen) && (
              <div className="flex flex-col">
                <span className="text-base font-extrabold tracking-tight text-white leading-none">
                  BankAdmin
                </span>
                <span className="text-[10px] font-semibold tracking-wider text-blue-400 uppercase mt-1">
                  Admin Portal
                </span>
              </div>
            )}
          </div>

          {/* Close for mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 scrollbar-thin">
          {menuItems.map(item => {
            if (item.hasSubmenu) {
              const isSubActive = item.subItems?.some(s => location.pathname === s.to);
              return (
                <div key={item.id} className="space-y-1">
                  <button
                    type="button"
                    onClick={() => {
                      if (desktopSidebarCollapsed) {
                        navigate('/members');
                      } else {
                        item.toggle?.();
                      }
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isSubActive
                        ? 'bg-blue-600/15 text-blue-400'
                        : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      {(!desktopSidebarCollapsed || sidebarOpen) && (
                        <span>{item.label}</span>
                      )}
                    </div>
                    {(!desktopSidebarCollapsed || sidebarOpen) && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          item.isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </button>

                  {/* Submenu links */}
                  {(!desktopSidebarCollapsed || sidebarOpen) && item.isExpanded && (
                    <div className="pl-9 pr-2 py-1 space-y-1">
                      {item.subItems?.map(sub => {
                        const active = location.pathname === sub.to;
                        return (
                          <NavLink
                            key={sub.to}
                            to={sub.to}
                            onClick={() => setSidebarOpen(false)}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                              active
                                ? 'bg-blue-600 text-white font-semibold shadow-xs'
                                : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                            }`}
                          >
                            {sub.icon}
                            <span>{sub.label}</span>
                          </NavLink>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <NavLink
                key={item.id}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white font-semibold shadow-sm shadow-blue-600/30'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`
                }
                title={desktopSidebarCollapsed ? item.label : undefined}
              >
                {item.icon}
                {(!desktopSidebarCollapsed || sidebarOpen) && (
                  <span className="truncate">{item.label}</span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Item 13: Logout */}
        <div className="p-3 border-t border-slate-800/80 bg-[#070d1e]/60">
          <button
            type="button"
            onClick={onLogoutClick}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors"
            title={desktopSidebarCollapsed ? 'Logout' : undefined}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {(!desktopSidebarCollapsed || sidebarOpen) && (
              <span>Logout</span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};
