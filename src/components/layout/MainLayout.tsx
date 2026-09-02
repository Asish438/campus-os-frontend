import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';
import { ToastContainer } from '../common/ToastContainer';
import { DashboardView } from '../dashboard/DashboardView';
import { LeadsView } from '../leads/LeadsView';
import { BroadcastView } from '../broadcast/BroadcastView';
import { Customer360View } from '../customer360/Customer360View';
import { LeadPipelineView } from '../pipeline/LeadPipelineView';
import { SystemSettingsView } from '../settings/SystemSettingsView';
import { CampaignCreateModal } from '../campaigns/CampaignCreateModal';
import { AddLeadModal } from '../leads/AddLeadModal';
import { CreateBroadcastModal } from '../broadcast/CreateBroadcastModal';
import { NotificationDrawer } from '../common/NotificationDrawer';

export const MainLayout: React.FC = () => {
  const { activeTab, theme } = useApp();

  // Mobile sidebar state
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Quick action modals
  const [isNewCampaignOpen, setIsNewCampaignOpen] = useState(false);
  const [isNewLeadOpen, setIsNewLeadOpen] = useState(false);
  const [isNewBroadcastOpen, setIsNewBroadcastOpen] = useState(false);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView onOpenNewCampaign={() => setIsNewCampaignOpen(true)} />;
      case 'broadcast':
        return <BroadcastView />;
      case 'leads':
        return <LeadsView />;
      case 'customer360':
        return <Customer360View />;
      case 'leadPipeline':
        return <LeadPipelineView />;
      case 'settings':
        return <SystemSettingsView />;
      default:
        return <DashboardView onOpenNewCampaign={() => setIsNewCampaignOpen(true)} />;
    }
  };

  return (
    <div className={`flex h-screen w-screen overflow-hidden relative transition-colors duration-200 ${
      theme === 'light' ? 'bg-[#F8FAFC] text-slate-900' : 'bg-navy-950 text-slate-100'
    }`}>
      {/* Background Ambient Image Layer */}
      <div 
        className={`fixed inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-500 ${
          theme === 'dark' 
            ? 'opacity-25 mix-blend-screen bg-center bg-cover bg-no-repeat' 
            : 'opacity-10 mix-blend-multiply bg-center bg-cover bg-no-repeat filter saturate-150'
        }`}
        style={{ backgroundImage: `url('/crm_bg.jpg')` }}
      />

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex h-full shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay Drawer */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          {/* Drawer Sidebar */}
          <div className="relative z-10 w-64 h-full shadow-2xl animate-in slide-in-from-left duration-200">
            <Sidebar onCloseMobile={() => setIsMobileSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Column */}
      <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden relative z-10">
        {/* Top Navbar */}
        <TopNavbar
          onOpenNewCampaign={() => setIsNewCampaignOpen(true)}
          onOpenNewLead={() => setIsNewLeadOpen(true)}
          onOpenNewBroadcast={() => setIsNewBroadcastOpen(true)}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
        />

        {/* Isolated Scroll Container for Active Screen */}
        <main className={`flex-1 overflow-y-auto p-3 sm:p-5 lg:p-7 transition-colors duration-200 ${
          theme === 'light' ? 'bg-[#F8FAFC]' : 'bg-[#030712]/90'
        }`}>
          <div className="max-w-7xl mx-auto w-full">
            {renderActiveView()}
          </div>
        </main>
      </div>

      {/* Modals */}
      <CampaignCreateModal
        isOpen={isNewCampaignOpen}
        onClose={() => setIsNewCampaignOpen(false)}
      />

      <AddLeadModal
        isOpen={isNewLeadOpen}
        onClose={() => setIsNewLeadOpen(false)}
      />

      <CreateBroadcastModal
        isOpen={isNewBroadcastOpen}
        onClose={() => setIsNewBroadcastOpen(false)}
      />

      {/* Notification Center Drawer */}
      <NotificationDrawer />

      {/* Toast Notification Container */}
      <ToastContainer />
    </div>
  );
};
