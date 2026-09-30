import React from 'react';

export const LoadingSkeleton = ({ count = 3, height = 'h-12', className = '' }) => {
  return (
    <div className={`space-y-3 w-full animate-pulse ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`w-full bg-slate-200 dark:bg-slate-800 rounded-lg ${height}`}
        />
      ))}
    </div>
  );
};

export const CardSkeleton = () => {
  return (
    <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 animate-pulse space-y-4">
      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3"></div>
      <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-1/2"></div>
      <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
    </div>
  );
};

export default LoadingSkeleton;
