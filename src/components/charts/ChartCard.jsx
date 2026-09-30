import React from 'react';

export const ChartCard = ({ title, subtitle, action, children, minHeight = 'h-64' }) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800/80">
        <div>
          <h4 className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">
            {title}
          </h4>
          {subtitle && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
        {action && <div>{action}</div>}
      </div>
      <div className={`w-full ${minHeight} flex items-center justify-center`}>
        {children}
      </div>
    </div>
  );
};

export default ChartCard;
