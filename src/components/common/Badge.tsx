import React from 'react';

interface BadgeProps {
  variant?: 'emerald' | 'blue' | 'purple' | 'amber' | 'rose' | 'slate' | 'cyan' | 'indigo';
  children: React.ReactNode;
  size?: 'sm' | 'md';
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'slate',
  children,
  size = 'md',
  className = '',
  dot = false,
}) => {
  const variantStyles = {
    emerald: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.15)]',
    blue: 'bg-blue-950/80 text-blue-300 border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.15)]',
    purple: 'bg-purple-950/80 text-purple-300 border-purple-500/30 shadow-[0_0_10px_rgba(168,85,247,0.2)]',
    amber: 'bg-amber-950/80 text-amber-300 border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.15)]',
    rose: 'bg-rose-950/80 text-rose-300 border-rose-500/30 shadow-[0_0_10px_rgba(244,63,94,0.15)]',
    slate: 'bg-navy-800/80 text-slate-300 border-navy-700',
    cyan: 'bg-cyan-950/80 text-cyan-300 border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.2)]',
    indigo: 'bg-indigo-950/80 text-indigo-300 border-indigo-500/30 shadow-[0_0_10px_rgba(99,102,241,0.15)]',
  };

  const dotColors = {
    emerald: 'bg-emerald-400',
    blue: 'bg-blue-400',
    purple: 'bg-purple-400',
    amber: 'bg-amber-400',
    rose: 'bg-rose-400',
    slate: 'bg-slate-400',
    cyan: 'bg-cyan-400',
    indigo: 'bg-indigo-400',
  };

  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5 font-semibold font-mono uppercase tracking-wide',
    md: 'text-xs px-2.5 py-1 font-semibold font-mono uppercase tracking-wide',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]} animate-pulse`} />}
      {children}
    </span>
  );
};
