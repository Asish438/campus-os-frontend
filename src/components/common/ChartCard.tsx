import React, { ReactNode } from 'react';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  actionSlot?: ReactNode;
  children: ReactNode;
  className?: string;
}

export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  subtitle,
  actionSlot,
  children,
  className = ''
}) => {
  return (
    <div className={`bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm p-5 flex flex-col ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-2 border-b border-slate-100 dark:border-slate-700/60">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
        {actionSlot && <div>{actionSlot}</div>}
      </div>
      <div className="flex-1 w-full min-h-[260px]">
        {children}
      </div>
    </div>
  );
};
