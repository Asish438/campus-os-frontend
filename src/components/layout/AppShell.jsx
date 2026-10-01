import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import ToastContainer from '../notifications/Toast';
import { useAuth } from '../../context/AuthContext';
import { useCampus } from '../../context/CampusContext';
import { useWebSocket } from '../../hooks/useWebSocket';

export const AppShell = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { user } = useAuth();
  const { addToast } = useCampus();

  // Listen for real-time notifications via WebSocket
  useWebSocket(user?.id ? `/topic/notifications/${user.id}` : null, (message) => {
      // It expects a message body from WebSocket which is the Notification entity
      const title = message.title || 'New Notification';
      const detail = message.message || 'You have a new update.';
      
      let type = 'info';
      if (message.type === 'ALERT') type = 'error';
      if (message.type === 'UPDATE') type = 'warning';
      
      addToast(title, detail, type);
  });

  return (
    <div className="flex h-screen overflow-hidden bg-[#f4f7fc] dark:bg-[#070b14] font-sans relative selection:bg-blue-600 selection:text-white">
      {/* Ambient Background Aura Orbs for Translucent Glass Plates */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-blue-400/15 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-10 right-10 w-96 h-96 bg-indigo-400/15 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed top-1/2 right-1/3 w-80 h-80 bg-sky-300/15 dark:bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Desktop Fixed Sidebar */}
      <div className="hidden lg:flex shrink-0 h-full">
        <Sidebar />
      </div>

      {/* Mobile Drawer Backdrop & Sidebar */}
      {mobileDrawerOpen && (
        <div
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          onClick={() => setMobileDrawerOpen(false)}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 lg:hidden transform transition-transform duration-300 ease-in-out ${
          mobileDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar isMobile={true} onCloseMobile={() => setMobileDrawerOpen(false)} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Topbar onToggleMobileDrawer={() => setMobileDrawerOpen(prev => !prev)} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-transparent">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Global Toast Alerts */}
      <ToastContainer />
    </div>
  );
};

export default AppShell;
