import React from 'react';

export const StatusBadge = ({ status, size = 'md' }) => {
  const normalized = String(status || '').toUpperCase().trim();

  let colorClasses = 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';
  let dotColor = 'bg-slate-400';

  if (['APPROVED', 'RESOLVED', 'ACTIVE', 'PAID', 'SUCCESS', 'VALID', 'ONGOING'].includes(normalized)) {
    colorClasses = 'bg-emerald-50 text-emerald-700 border-emerald-200/80 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/60';
    dotColor = 'bg-emerald-500';
  } else if (['PENDING', 'SUBMITTED', 'ASSIGNED', 'PARTIAL', 'UPCOMING', 'AT CAMPUS'].includes(normalized)) {
    colorClasses = 'bg-amber-50 text-amber-700 border-amber-200/80 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/60';
    dotColor = 'bg-amber-500';
  } else if (['REJECTED', 'DANGER', 'OVERDUE', 'HIGH', 'URGENT', 'FAILED'].includes(normalized)) {
    colorClasses = 'bg-rose-50 text-rose-700 border-rose-200/80 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800/60';
    dotColor = 'bg-rose-500';
  } else if (['IN_PROGRESS', 'IN PROGRESS', 'IN TRANSIT', 'BOARDING', 'CHECKED-IN'].includes(normalized)) {
    colorClasses = 'bg-indigo-50 text-indigo-700 border-indigo-200/80 dark:bg-indigo-950/40 dark:text-indigo-400 dark:border-indigo-800/60';
    dotColor = 'bg-indigo-500';
  } else if (['MEDIUM', 'CHECKED-OUT'].includes(normalized)) {
    colorClasses = 'bg-sky-50 text-sky-700 border-sky-200/80 dark:bg-sky-950/40 dark:text-sky-400 dark:border-sky-800/60';
    dotColor = 'bg-sky-500';
  }

  const sizeClasses = size === 'sm' 
    ? 'px-2 py-0.5 text-[10px]' 
    : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold rounded-full border tracking-wide uppercase ${sizeClasses} ${colorClasses}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      {status}
    </span>
  );
};

export default StatusBadge;
