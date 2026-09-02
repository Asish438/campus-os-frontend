import React from 'react';
import { useApp } from '../../context/AppContext';
import { FiCheckCircle, FiInfo, FiAlertTriangle, FiAlertCircle, FiX } from 'react-icons/fi';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  const iconMap = {
    success: <FiCheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />,
    info: <FiInfo className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />,
    warning: <FiAlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />,
    error: <FiAlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />,
  };

  const borderMap = {
    success: 'border-emerald-700/60 bg-emerald-950/90 text-slate-100',
    info: 'border-sky-700/60 bg-navy-900/95 text-slate-100',
    warning: 'border-amber-700/60 bg-amber-950/90 text-slate-100',
    error: 'border-rose-700/60 bg-rose-950/90 text-slate-100',
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`pointer-events-auto p-4 rounded-xl border shadow-2xl backdrop-blur-md flex items-start gap-3 transform transition-all duration-300 animate-in slide-in-from-bottom-5 ${borderMap[toast.type]}`}
        >
          {iconMap[toast.type]}
          <div className="flex-1 text-xs">
            {toast.title && <p className="font-semibold text-slate-200 mb-0.5 text-sm">{toast.title}</p>}
            <p className="text-slate-300 leading-relaxed">{toast.message}</p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
