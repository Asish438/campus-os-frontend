import React from 'react';

export const KpiCard = ({
  title,
  value,
  subtext,
  icon: Icon,
  trend,
  trendPositive,
  variant = 'default',
  onClick,
  badge
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'blue':
      case 'indigo':
        return {
          bg: 'bg-white dark:bg-slate-900',
          border: 'border-blue-200 dark:border-blue-900/60',
          iconBg: 'bg-blue-600 text-white shadow-blue-500/25',
          text: 'text-blue-600 dark:text-blue-400'
        };
      case 'amber':
        return {
          bg: 'bg-white dark:bg-slate-900',
          border: 'border-amber-200 dark:border-amber-900/50',
          iconBg: 'bg-amber-500 text-white shadow-amber-500/25',
          text: 'text-amber-600 dark:text-amber-400'
        };
      case 'emerald':
        return {
          bg: 'bg-white dark:bg-slate-900',
          border: 'border-emerald-200 dark:border-emerald-900/50',
          iconBg: 'bg-emerald-600 text-white shadow-emerald-500/25',
          text: 'text-emerald-600 dark:text-emerald-400'
        };
      case 'rose':
        return {
          bg: 'bg-white dark:bg-slate-900',
          border: 'border-rose-200 dark:border-rose-900/50',
          iconBg: 'bg-rose-600 text-white shadow-rose-500/25',
          text: 'text-rose-600 dark:text-rose-400'
        };
      case 'cyan':
        return {
          bg: 'bg-white dark:bg-slate-900',
          border: 'border-cyan-200 dark:border-cyan-900/50',
          iconBg: 'bg-cyan-600 text-white shadow-cyan-500/25',
          text: 'text-cyan-600 dark:text-cyan-400'
        };
      default:
        return {
          bg: 'bg-white dark:bg-slate-900',
          border: 'border-slate-200 dark:border-slate-800',
          iconBg: 'bg-blue-50 text-blue-600 dark:bg-slate-800 dark:text-blue-400',
          text: 'text-slate-900 dark:text-white'
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div
      onClick={onClick}
      className={`relative p-5 rounded-2xl border transition-all duration-200 ${styles.bg} ${styles.border} ${
        onClick ? 'cursor-pointer hover:shadow-md hover:-translate-y-0.5' : 'shadow-sm'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {value}
            </h3>
            {badge && (
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                {badge}
              </span>
            )}
          </div>
          {subtext && (
            <p className="text-xs text-slate-500 dark:text-slate-400 pt-0.5">
              {subtext}
            </p>
          )}
        </div>

        {Icon && (
          <div className={`p-3 rounded-xl shadow-sm ${styles.iconBg}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {trend && (
        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center gap-1.5 text-xs">
          <span
            className={`font-semibold ${
              trendPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
            }`}
          >
            {trend}
          </span>
          <span className="text-slate-400 dark:text-slate-500">vs target</span>
        </div>
      )}
    </div>
  );
};

export default KpiCard;
