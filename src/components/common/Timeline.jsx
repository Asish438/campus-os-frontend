import React from 'react';

export const Timeline = ({ events = [] }) => {
  return (
    <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
      {events.map((evt, idx) => (
        <div key={idx} className="relative">
          <div className="absolute -left-6 top-1 w-3 h-3 rounded-full border-2 border-white dark:border-slate-900 bg-indigo-600" />
          <p className="text-xs font-medium text-slate-400">{evt.time}</p>
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{evt.event}</p>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
