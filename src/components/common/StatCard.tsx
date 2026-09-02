import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  icon: LucideIcon | React.ComponentType<{ className?: string }>;
  accentColor?: 'blue' | 'sky' | 'emerald' | 'amber' | 'purple' | 'rose';
  secondaryValue?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  icon: Icon,
  secondaryValue,
}) => {
  return (
    <div className="bg-white dark:bg-navy-900/90 antigravity-glass rounded-xl p-4 border border-slate-200 dark:border-navy-750 shadow-sm relative group hover:border-cyan-500/40 transition-all flex flex-col justify-between">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider truncate">{title}</p>
          <div className="flex items-baseline gap-2 mt-1.5">
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight font-mono truncate">
              {value}
            </h3>
            {secondaryValue && (
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono shrink-0">
                {secondaryValue}
              </span>
            )}
          </div>
        </div>
        <div className="p-2 rounded-lg bg-slate-100 dark:bg-navy-800/80 border border-slate-200 dark:border-navy-700 text-cyan-600 dark:text-cyan-400 shadow-sm shrink-0">
          <Icon className="w-4 h-4" />
        </div>
      </div>

      {(subtitle || trend) && (
        <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-navy-800 flex items-center justify-between gap-2 text-xs">
          {trend && (
            <div className="flex items-center gap-1.5 font-medium shrink-0">
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold font-mono whitespace-nowrap ${
                  trend.isPositive
                    ? 'theme-badge-success'
                    : 'bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-950/90 dark:text-rose-400 dark:border-rose-500/40'
                }`}
              >
                {trend.isPositive ? '↑' : '↓'} {trend.value}
              </span>
              <span className="text-slate-500 dark:text-slate-400 text-[10px] hidden sm:inline whitespace-nowrap">vs last month</span>
            </div>
          )}
          {subtitle && (
            <span className="text-slate-500 dark:text-slate-400 text-[11px] truncate text-right ml-auto" title={subtitle}>
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
