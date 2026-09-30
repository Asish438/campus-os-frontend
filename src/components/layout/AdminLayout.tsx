import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useApp } from '../../context/AppContext';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { useToast } from '../../context/ToastContext';

export const AdminLayout: React.FC = () => {
  const { desktopSidebarCollapsed } = useApp();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    addToast({
      type: 'info',
      title: 'Session Ended',
      message: 'You have been safely logged out of BankAdmin portal.'
    });
    // For demo, renavigate to dashboard or login
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 flex flex-col transition-colors">
      {/* Fixed Navy Sidebar */}
      <Sidebar onLogoutClick={() => setShowLogoutConfirm(true)} />

      {/* Main Layout Area offset by sidebar */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          desktopSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
        }`}
      >
        {/* Top Navbar */}
        <Header onLogoutClick={() => setShowLogoutConfirm(true)} />

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Logout Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={handleLogout}
        title="Confirm Logout"
        message="Are you sure you want to log out of the BankAdmin Admin Portal? Your current administrative session will be terminated."
        confirmText="Logout Now"
        variant="danger"
      />
    </div>
  );
};
