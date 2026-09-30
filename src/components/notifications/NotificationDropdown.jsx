import React, { useRef, useEffect } from 'react';
import { useCampus } from '../../context/CampusContext';
import { useNavigate } from 'react-router-dom';
import { Bell, CheckCheck, ExternalLink, AlertCircle } from 'lucide-react';

export const NotificationDropdown = ({ isOpen, onClose }) => {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useCampus();
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotificationClick = (item) => {
    markNotificationRead(item.id);
    if (item.link) {
      navigate(item.link);
      onClose();
    }
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-50 overflow-hidden animate-fade-in"
    >
      <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/40">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
            Notifications
          </h4>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-rose-500 text-white">
              {unreadCount} new
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllNotificationsRead}
            className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 font-semibold"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            Mark all read
          </button>
        )}
      </div>

      <div className="max-h-[380px] overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
        {notifications.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400">
            No notifications to display
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => handleNotificationClick(n)}
              className={`p-3.5 transition-colors cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-start gap-3 ${
                !n.read ? 'bg-indigo-50/30 dark:bg-indigo-950/20' : ''
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                  !n.read ? 'bg-indigo-600' : 'bg-transparent'
                }`}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                    {n.type}
                  </span>
                  <span className="text-[10px] text-slate-400">{n.time}</span>
                </div>
                <h5 className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                  {n.title}
                </h5>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                  {n.message}
                </p>
                {n.actionRequired && (
                  <span className="inline-flex items-center gap-1 mt-1.5 text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-900/40">
                    <AlertCircle className="w-3 h-3" />
                    Action Required
                  </span>
                )}
              </div>
              {n.link && (
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-1" />
              )}
            </div>
          ))
        )}
      </div>

      <div className="p-2 border-t border-slate-100 dark:border-slate-800 text-center bg-slate-50/30 dark:bg-slate-900">
        <button
          onClick={() => {
            navigate('/student/notifications');
            onClose();
          }}
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 py-1"
        >
          View all notifications
        </button>
      </div>
    </div>
  );
};

export default NotificationDropdown;
