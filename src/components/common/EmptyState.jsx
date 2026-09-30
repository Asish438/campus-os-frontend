import React from 'react';
import { Inbox, AlertCircle } from 'lucide-react';

export const EmptyState = ({
  icon: Icon = Inbox,
  title = 'No records found',
  description = 'There is currently no data to display in this view.',
  actionText,
  onAction
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20">
      <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mb-3">
        <Icon className="w-6 h-6" />
      </div>
      <h4 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-1">
        {title}
      </h4>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-4">
        {description}
      </p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="btn btn-primary btn-sm"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export const ErrorState = ({
  title = 'Failed to load information',
  message = 'An unexpected error occurred while communicating with the server.',
  onRetry
}) => {
  return (
    <div className="p-6 rounded-2xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-950/20 text-center">
      <AlertCircle className="w-8 h-8 text-rose-500 mx-auto mb-2" />
      <h4 className="text-sm font-bold text-rose-800 dark:text-rose-300 mb-1">{title}</h4>
      <p className="text-xs text-rose-600 dark:text-rose-400 mb-4">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn btn-sm btn-danger">
          Try Again
        </button>
      )}
    </div>
  );
};

export default EmptyState;
