import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Announcement, AnnouncementPriority } from '../../types';
import { Badge } from '../common/Badge';
import { CreateBroadcastModal } from './CreateBroadcastModal';
import { 
  FiVolume2, 
  FiPlus, 
  FiAlertTriangle, 
  FiCheckCircle, 
  FiTrash2, 
  FiTag, 
  FiClock, 
  FiBookmark, 
  FiCheck,
  FiUsers
} from 'react-icons/fi';

export const BroadcastView: React.FC = () => {
  const { 
    announcements, 
    currentUser, 
    acknowledgeAnnouncement, 
    deleteAnnouncement, 
    users 
  } = useApp();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const isSuperAdmin = currentUser.role === 'super_admin';

  const filteredAnnouncements = useMemo(() => {
    return announcements.filter(a => {
      if (a.targetAudience === 'specific' && a.targetAdminId && a.targetAdminId !== currentUser.id && !isSuperAdmin) {
        return false;
      }
      if (priorityFilter !== 'all' && a.priority !== priorityFilter) {
        return false;
      }
      return true;
    });
  }, [announcements, priorityFilter, currentUser, isSuperAdmin]);

  const priorityVariantMap: Record<AnnouncementPriority, 'rose' | 'purple' | 'blue' | 'slate'> = {
    urgent: 'rose',
    strategy: 'purple',
    update: 'blue',
    system: 'slate',
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Top Header */}
      <div className="p-4 rounded-xl bg-navy-900 border border-navy-750 shadow-panel flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-100">Broadcast Announcements & Operational Directives</h2>
            <Badge variant="amber" size="sm">{announcements.length} Active Memos</Badge>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Internal operations bulletins, Meta API token rotation notices, and campaign scaling rules.
          </p>
        </div>

        {isSuperAdmin && (
          <button
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-subtle transition-colors self-start sm:self-auto shrink-0"
          >
            <FiPlus className="w-3.5 h-3.5" />
            <span>Post Operational Memo</span>
          </button>
        )}
      </div>

      {/* Priority Filters Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setPriorityFilter('all')}
          className={`px-3 py-1 rounded-md font-medium border transition-colors ${
            priorityFilter === 'all'
              ? 'bg-navy-800 text-white border-navy-700 font-semibold'
              : 'bg-navy-900 text-slate-400 border-navy-800 hover:text-slate-200'
          }`}
        >
          All Memos ({announcements.length})
        </button>

        <button
          onClick={() => setPriorityFilter('urgent')}
          className={`px-2.5 py-1 rounded-md font-medium border transition-colors flex items-center gap-1 ${
            priorityFilter === 'urgent'
              ? 'bg-rose-950 text-rose-300 border-rose-800/60 font-semibold'
              : 'bg-navy-900 text-rose-400/80 border-navy-800 hover:bg-rose-950/30'
          }`}
        >
          <span>🚨 Urgent Alerts</span>
          <span className="text-[10px] font-mono">
            {announcements.filter(a => a.priority === 'urgent').length}
          </span>
        </button>

        <button
          onClick={() => setPriorityFilter('strategy')}
          className={`px-2.5 py-1 rounded-md font-medium border transition-colors flex items-center gap-1 ${
            priorityFilter === 'strategy'
              ? 'bg-purple-950 text-purple-300 border-purple-800/60 font-semibold'
              : 'bg-navy-900 text-purple-400/80 border-navy-800 hover:bg-purple-950/30'
          }`}
        >
          <span>🎯 Strategy</span>
          <span className="text-[10px] font-mono">
            {announcements.filter(a => a.priority === 'strategy').length}
          </span>
        </button>

        <button
          onClick={() => setPriorityFilter('update')}
          className={`px-2.5 py-1 rounded-md font-medium border transition-colors flex items-center gap-1 ${
            priorityFilter === 'update'
              ? 'bg-blue-950 text-blue-300 border-blue-800/60 font-semibold'
              : 'bg-navy-900 text-sky-400/80 border-navy-800 hover:bg-blue-950/30'
          }`}
        >
          <span>📢 Protocols & SLAs</span>
          <span className="text-[10px] font-mono">
            {announcements.filter(a => a.priority === 'update').length}
          </span>
        </button>
      </div>

      {/* Announcements Feed */}
      <div className="space-y-3">
        {filteredAnnouncements.map(item => {
          const isAcknowledged = item.acknowledgedUserIds.includes(currentUser.id);
          const author = users.find(u => u.id === item.authorId);

          return (
            <div
              key={item.id}
              className={`bg-navy-900 rounded-xl border p-4 shadow-panel transition-colors ${
                item.isPinned
                  ? 'border-amber-500/40 bg-gradient-to-r from-navy-900 via-navy-900 to-amber-950/10'
                  : 'border-navy-750 hover:border-slate-600'
              }`}
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  {item.isPinned && (
                    <span className="p-1 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30 text-[10px] font-semibold flex items-center gap-1">
                      <FiBookmark className="w-3 h-3" /> PINNED
                    </span>
                  )}
                  <Badge variant={priorityVariantMap[item.priority]} size="sm">
                    {item.priority.toUpperCase()}
                  </Badge>
                  <h3 className="text-xs font-semibold text-slate-100">{item.title}</h3>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                  <FiClock className="w-3 h-3" />
                  <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Body */}
              <p className="text-xs text-slate-300 leading-relaxed mb-3 pl-0.5">
                {item.content}
              </p>

              {/* Tags */}
              {item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {item.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.2 rounded bg-navy-800 text-slate-300 border border-navy-750 flex items-center gap-1 font-mono"
                    >
                      <FiTag className="w-2.5 h-2.5 text-slate-400" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Footer */}
              <div className="pt-2.5 border-t border-navy-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
                {/* Author Info */}
                <div className="flex items-center gap-2">
                  <img
                    src={item.authorAvatar}
                    alt={item.authorName}
                    className="w-5 h-5 rounded-full object-cover ring-1 ring-navy-700"
                  />
                  <span className="text-slate-300 text-xs font-medium">{item.authorName}</span>
                  <span className="text-[10px] text-slate-500 font-mono">(Master Admin)</span>
                </div>

                {/* Acknowledgment & Delete */}
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center gap-1 text-slate-400 text-[11px] font-mono">
                    <FiUsers className="w-3 h-3 text-slate-500" />
                    <span>{item.acknowledgedUserIds.length}/{users.length} Acknowledged</span>
                  </div>

                  {!isAcknowledged ? (
                    <button
                      onClick={() => acknowledgeAnnouncement(item.id)}
                      className="px-2.5 py-1 rounded bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs shadow-subtle flex items-center gap-1 transition-colors"
                    >
                      <FiCheck className="w-3 h-3" />
                      <span>Acknowledge Memo</span>
                    </button>
                  ) : (
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/50 font-semibold text-[11px] flex items-center gap-1">
                      <FiCheckCircle className="w-3 h-3" />
                      <span>Acknowledged</span>
                    </span>
                  )}

                  {isSuperAdmin && (
                    <button
                      onClick={() => deleteAnnouncement(item.id)}
                      className="p-1 rounded bg-navy-800 hover:bg-rose-950/60 text-slate-400 hover:text-rose-300 border border-navy-750 transition-colors"
                      title="Archive Announcement"
                    >
                      <FiTrash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Broadcast Modal */}
      <CreateBroadcastModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
    </div>
  );
};
