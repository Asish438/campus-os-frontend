import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import { Bell, Send } from 'lucide-react';

export const FacultyAnnouncementsPage = () => {
  const { addNotification, addToast } = useCampus();
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const handlePost = (e) => {
    e.preventDefault();
    if (!title || !message) return;

    addNotification({
      type: 'Academic',
      title: `Faculty Announcement: ${title}`,
      message,
      link: '/student/notices'
    });

    addToast({
      title: 'Announcement Published',
      message: 'Broadcasted to all enrolled students.',
      type: 'success'
    });

    setTitle('');
    setMessage('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Course Broadcast Announcements
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Publish immediate notifications to student dashboards & mobile alerts
        </p>
      </div>

      <div className="campus-card max-w-2xl">
        <form onSubmit={handlePost} className="space-y-4 text-xs">
          <div>
            <label className="form-label">Subject / Announcement Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. CS501 Midterm Review Session Rescheduled"
              className="form-input"
            />
          </div>

          <div>
            <label className="form-label">Detailed Message</label>
            <textarea
              rows={4}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter announcement details, zoom links, or syllabus notes..."
              className="form-textarea"
            />
          </div>

          <button type="submit" className="btn btn-primary py-2.5">
            <Send className="w-4 h-4" />
            Broadcast to Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default FacultyAnnouncementsPage;
