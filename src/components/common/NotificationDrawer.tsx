import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { AppNotification } from '../../types';
import { 
  FiBell, 
  FiX, 
  FiCheck, 
  FiCheckCircle, 
  FiTarget, 
  FiFileText, 
  FiVolume2, 
  FiTrendingUp, 
  FiShield, 
  FiChevronRight,
  FiClock,
  FiTrash2
} from 'react-icons/fi';

export const NotificationDrawer: React.FC = () => {
  const { 
    notifications, 
    unreadNotificationsCount, 
    markNotificationAsRead, 
    markAllNotificationsAsRead, 
    clearNotification,
    isNotificationDrawerOpen, 
    setIsNotificationDrawerOpen,
    setActiveTab 
  } = useApp();

  const [filter, setFilter] = useState<'all' | 'unread' | 'lead' | 'invoice' | 'broadcast'>('all');

  const filteredNotifications = useMemo(() => {
    return notifications.filter(n => {
      if (filter === 'unread') return !n.read;
      if (filter === 'lead') return n.type === 'lead';
      if (filter === 'invoice') return n.type === 'invoice';
      if (filter === 'broadcast') return n.type === 'broadcast';
      return true;
    });
  }, [notifications, filter]);

  if (!isNotificationDrawerOpen) return null;

  const getNotificationIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'lead':
        return <FiTarget className="w-4 h-4 text-emerald-400" />;
      case 'invoice':
        return <FiFileText className="w-4 h-4 text-amber-400" />;
      case 'broadcast':
        return <FiVolume2 className="w-4 h-4 text-purple-400" />;
      case 'campaign':
        return <FiTrendingUp className="w-4 h-4 text-sky-400" />;
      default:
        return <FiShield className="w-4 h-4 text-blue-400" />;
    }
  };

  const handleNotificationClick = (notif: AppNotification) => {
    markNotificationAsRead(notif.id);
    if (notif.targetTab) {
      setActiveTab(notif.targetTab);
      setIsNotificationDrawerOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Backdrop */}
      <div 
        onClick={() => setIsNotificationDrawerOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Flyout Notification Bar */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-navy-900 border-l border-navy-750 shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
          
          {/* Header */}
          <div className="p-4 border-b border-navy-750 flex items-center justify-between bg-navy-950/50">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand-600/20 border border-brand-500/30 flex items-center justify-center text-brand-400">
                <FiBell className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-100">Activity & Alerts</h3>
                  {unreadNotificationsCount > 0 && (
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded font-semibold bg-brand-600 text-white shadow-subtle">
                      {unreadNotificationsCount} New
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400">Meta CAPI events, SLAs & team memos</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {unreadNotificationsCount > 0 && (
                <button
                  onClick={markAllNotificationsAsRead}
                  className="px-2.5 py-1 rounded text-[11px] font-medium text-slate-300 hover:text-white bg-navy-850 hover:bg-navy-800 border border-navy-700 transition-colors flex items-center gap-1"
                  title="Mark all as read"
                >
                  <FiCheck className="w-3 h-3 text-emerald-400" />
                  <span>Mark all read</span>
                </button>
              )}

              <button
                onClick={() => setIsNotificationDrawerOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-navy-800 transition-colors"
                title="Close"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Filter Pills Rail */}
          <div className="px-4 py-2.5 border-b border-navy-750 bg-navy-900/80 flex items-center gap-1.5 overflow-x-auto text-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-brand-600 text-white font-semibold shadow-subtle'
                  : 'text-slate-400 hover:text-slate-200 bg-navy-850 border border-navy-800'
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                filter === 'unread'
                  ? 'bg-brand-600 text-white font-semibold shadow-subtle'
                  : 'text-slate-400 hover:text-slate-200 bg-navy-850 border border-navy-800'
              }`}
            >
              Unread ({unreadNotificationsCount})
            </button>
            <button
              onClick={() => setFilter('lead')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                filter === 'lead'
                  ? 'bg-emerald-600 text-white font-semibold shadow-subtle'
                  : 'text-slate-400 hover:text-slate-200 bg-navy-850 border border-navy-800'
              }`}
            >
              Leads
            </button>
            <button
              onClick={() => setFilter('invoice')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                filter === 'invoice'
                  ? 'bg-amber-600 text-white font-semibold shadow-subtle'
                  : 'text-slate-400 hover:text-slate-200 bg-navy-850 border border-navy-800'
              }`}
            >
              Billing
            </button>
            <button
              onClick={() => setFilter('broadcast')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                filter === 'broadcast'
                  ? 'bg-purple-600 text-white font-semibold shadow-subtle'
                  : 'text-slate-400 hover:text-slate-200 bg-navy-850 border border-navy-800'
              }`}
            >
              Memos
            </button>
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-2.5 pipeline-column-scroll">
            {filteredNotifications.length === 0 ? (
              <div className="p-12 text-center text-slate-400 text-xs">
                <FiCheckCircle className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <p className="font-semibold text-slate-300">All caught up!</p>
                <p className="text-[11px] text-slate-500 mt-0.5">No notifications in this queue</p>
              </div>
            ) : (
              filteredNotifications.map(notif => (
                <div
                  key={notif.id}
                  onClick={() => handleNotificationClick(notif)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer group relative ${
                    !notif.read
                      ? 'bg-navy-850 border-brand-500/40 hover:border-brand-400 shadow-panel'
                      : 'bg-navy-900/60 border-navy-800 hover:border-navy-700 text-slate-400'
                  }`}
                >
                  {/* Unread Glow Dot */}
                  {!notif.read && (
                    <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-brand-400 shadow-glow" />
                  )}

                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg shrink-0 ${
                      !notif.read ? 'bg-navy-950 border border-navy-750' : 'bg-navy-950/60'
                    }`}>
                      {getNotificationIcon(notif.type)}
                    </div>

                    <div className="flex-1 min-w-0 pr-4">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h4 className={`text-xs font-semibold truncate ${
                          !notif.read ? 'text-slate-100 group-hover:text-brand-300' : 'text-slate-300'
                        }`}>
                          {notif.title}
                        </h4>
                        {notif.badgeText && (
                          <span className="text-[9px] font-mono font-semibold px-1.5 py-0.2 rounded bg-navy-950 text-slate-300 border border-navy-700 shrink-0">
                            {notif.badgeText}
                          </span>
                        )}
                      </div>

                      <p className={`text-[11px] leading-relaxed ${
                        !notif.read ? 'text-slate-300' : 'text-slate-400'
                      }`}>
                        {notif.message}
                      </p>

                      <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-navy-800 text-[10px] text-slate-500">
                        <span className="flex items-center gap-1">
                          <FiClock className="w-2.5 h-2.5" />
                          <span>{notif.timestamp}</span>
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              clearNotification(notif.id);
                            }}
                            className="hover:text-rose-400 p-0.5 transition-colors"
                            title="Dismiss notification"
                          >
                            <FiTrash2 className="w-3 h-3" />
                          </button>

                          <span className="text-brand-400 font-semibold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                            <span>Open</span>
                            <FiChevronRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-navy-750 bg-navy-950/60 text-center text-[11px] text-slate-500">
            Real-time webhook notifications & SLA monitoring
          </div>
        </div>
      </div>
    </div>
  );
};
