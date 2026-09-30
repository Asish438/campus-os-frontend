import React, { useState } from 'react';
import { Send, Bell } from 'lucide-react';
import { useCampus } from '../../context/CampusContext';

export const AdminCommunicationPage = () => {
  const { addNotification, addToast } = useCampus();
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [targetAudience, setTargetAudience] = useState('All Campus (Students & Staff)');

  const handleSendBroadcast = (e) => {
    e.preventDefault();
    if (!broadcastTitle || !broadcastMessage) return;

    addNotification({
      type: 'Admin',
      title: `[University Broadcast] ${broadcastTitle}`,
      message: broadcastMessage,
      link: '/student/notices'
    });

    addToast({
      title: 'University Broadcast Dispatched',
      message: `Delivered to ${targetAudience} via push alert.`,
      type: 'success'
    });

    setBroadcastTitle('');
    setBroadcastMessage('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Campus Communication Hub
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Executive Announcements, Emergency Push Notifications & Email Broadcasts
        </p>
      </div>

      <div className="campus-card max-w-2xl">
        <form onSubmit={handleSendBroadcast} className="space-y-4 text-xs">
          <div>
            <label className="form-label">Audience Scope</label>
            <select
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              className="form-select"
            >
              <option>All Campus (Students & Staff)</option>
              <option>Undergraduate Students Only</option>
              <option>Hostel Residents Only</option>
              <option>Faculty & Staff Only</option>
            </select>
          </div>

          <div>
            <label className="form-label">Broadcast Subject</label>
            <input
              type="text"
              required
              value={broadcastTitle}
              onChange={(e) => setBroadcastTitle(e.target.value)}
              placeholder="e.g. Severe Weather Advisory: Afternoon Classes Suspended"
              className="form-input"
            />
          </div>

          <div>
            <label className="form-label">Notification Message</label>
            <textarea
              rows={4}
              required
              value={broadcastMessage}
              onChange={(e) => setBroadcastMessage(e.target.value)}
              placeholder="Enter institutional notice text..."
              className="form-textarea"
            />
          </div>

          <button type="submit" className="btn btn-primary py-2.5">
            <Send className="w-4 h-4" />
            Dispatch Broadcast Notification
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminCommunicationPage;
