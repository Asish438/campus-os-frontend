import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AnnouncementPriority } from '../../types';
import { Modal } from '../common/Modal';
import { FiVolume2, FiAlertTriangle, FiFlag } from 'react-icons/fi';

interface CreateBroadcastModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateBroadcastModal: React.FC<CreateBroadcastModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { createAnnouncement, users } = useApp();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState<AnnouncementPriority>('urgent');
  const [targetAudience, setTargetAudience] = useState<'all' | 'specific'>('all');
  const [targetAdminId, setTargetAdminId] = useState('');
  const [isPinned, setIsPinned] = useState(false);
  const [tagsInput, setTagsInput] = useState('Meta API, Operations, Priority');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    createAnnouncement({
      title,
      content,
      priority,
      targetAudience,
      targetAdminId: targetAudience === 'specific' ? targetAdminId : undefined,
      isPinned,
      tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean)
    });

    onClose();
    setTitle('');
    setContent('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Broadcast Announcement"
      subtitle="Publish an operational memo or priority alert to the team command center."
      maxWidth="2xl"
      icon={FiVolume2}
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block font-semibold text-slate-300 mb-1">Broadcast Title *</label>
          <input
            type="text"
            required
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="e.g. 🚨 CRITICAL: Meta Graph API Token Refresh Required"
            className="w-full px-3.5 py-2 rounded-lg bg-navy-800 border border-navy-700 text-slate-100 text-sm focus:outline-none focus:border-brand-500"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-300 mb-1.5">Priority Level</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'urgent', label: '🚨 Urgent', color: 'border-rose-500 bg-rose-950/40 text-rose-300' },
              { id: 'strategy', label: '🎯 Strategy', color: 'border-purple-500 bg-purple-950/40 text-purple-300' },
              { id: 'update', label: '📢 Update', color: 'border-blue-500 bg-blue-950/40 text-sky-300' },
              { id: 'system', label: '🔧 System', color: 'border-slate-500 bg-slate-800 text-slate-300' },
            ].map(p => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPriority(p.id as AnnouncementPriority)}
                className={`p-2 rounded-lg border text-center font-semibold transition-all ${
                  priority === p.id ? p.color + ' ring-2 ring-brand-500 shadow-md' : 'border-navy-700 bg-navy-800 text-slate-400'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-300 mb-1">Announcement Body *</label>
          <textarea
            rows={4}
            required
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Type comprehensive instructions, action items, or milestone updates..."
            className="w-full px-3.5 py-2 rounded-lg bg-navy-800 border border-navy-700 text-slate-100 text-xs focus:outline-none focus:border-brand-500 leading-relaxed"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Target Audience</label>
            <select
              value={targetAudience}
              onChange={e => setTargetAudience(e.target.value as 'all' | 'specific')}
              className="w-full px-3 py-2 rounded-lg bg-navy-800 border border-navy-700 text-slate-200 text-xs focus:outline-none focus:border-brand-500"
            >
              <option value="all">All Operations Admins</option>
              <option value="specific">Specific Admin Only</option>
            </select>
          </div>

          {targetAudience === 'specific' && (
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Select Recipient Admin</label>
              <select
                value={targetAdminId}
                onChange={e => setTargetAdminId(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-navy-800 border border-navy-700 text-slate-200 text-xs focus:outline-none focus:border-brand-500"
              >
                {users.map(u => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div>
          <label className="block font-semibold text-slate-300 mb-1">Tags (Comma-separated)</label>
          <input
            type="text"
            value={tagsInput}
            onChange={e => setTagsInput(e.target.value)}
            placeholder="CAPI, Graph API, SLA"
            className="w-full px-3 py-2 rounded-lg bg-navy-800 border border-navy-700 text-slate-200 text-xs focus:outline-none focus:border-brand-500"
          />
        </div>

        <div className="pt-2">
          <label className="flex items-center gap-2 p-2.5 rounded-lg bg-navy-850 border border-navy-750 cursor-pointer">
            <input
              type="checkbox"
              checked={isPinned}
              onChange={e => setIsPinned(e.target.checked)}
              className="rounded bg-navy-800 text-brand-600 focus:ring-0"
            />
            <div>
              <span className="font-semibold text-slate-200 text-xs">📌 Pin Announcement to Top</span>
              <p className="text-[11px] text-slate-400">Keep this notice highlighted at the top of the command center.</p>
            </div>
          </label>
        </div>

        <div className="flex justify-end gap-2 pt-3 border-t border-navy-750">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-navy-800 hover:bg-navy-750 text-slate-300 text-xs font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-md"
          >
            Publish Broadcast
          </button>
        </div>
      </form>
    </Modal>
  );
};
