import React from 'react';
import { INITIAL_NOTICES } from '../../data/demoData';
import { Bell, Calendar, Building, Sparkles } from 'lucide-react';

export const NoticesPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          University Notices & Circulars
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Official Institutional Notifications Broadcast from Administration
        </p>
      </div>

      <div className="space-y-4">
        {INITIAL_NOTICES.map((n) => (
          <div
            key={n.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2.5"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900 uppercase">
                  {n.category}
                </span>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {n.department}
                </span>
              </div>
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {n.date}
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {n.title}
            </h3>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {n.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoticesPage;
