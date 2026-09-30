import React from 'react';

export const CardSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700/60 animate-pulse">
      <div className="flex justify-between items-center mb-4">
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3" />
        <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-xl" />
      </div>
      <div className="h-7 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-3" />
      <div className="h-3 bg-slate-100 dark:bg-slate-750 rounded w-2/3" />
    </div>
  );
};

export const TableSkeleton: React.FC<{ rows?: number }> = ({ rows = 5 }) => {
  return (
    <div className="w-full bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 p-4 animate-pulse">
      <div className="h-10 bg-slate-100 dark:bg-slate-750 rounded-xl mb-4" />
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="h-12 bg-slate-50 dark:bg-slate-800/80 rounded-lg flex items-center px-4 gap-4">
            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700" />
            <div className="flex-1 h-4 bg-slate-200 dark:bg-slate-700 rounded" />
            <div className="w-24 h-4 bg-slate-200 dark:bg-slate-700 rounded" />
            <div className="w-16 h-6 bg-slate-200 dark:bg-slate-700 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
};
