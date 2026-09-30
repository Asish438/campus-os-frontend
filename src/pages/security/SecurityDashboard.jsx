import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCampus } from '../../context/CampusContext';
import KpiCard from '../../components/common/KpiCard';
import StatusBadge from '../../components/common/StatusBadge';
import {
  ShieldCheck,
  ScanLine,
  Users,
  LogOut,
  LogIn,
  AlertTriangle,
  ArrowRight,
  Clock
} from 'lucide-react';

export const SecurityDashboard = () => {
  const { user } = useAuth();
  const { gatePasses, securityLogs, visitors } = useCampus();
  const navigate = useNavigate();

  const activePasses = gatePasses.filter(p => p.status === 'Approved');
  const visitorsToday = visitors.filter(v => v.visitDate === '2026-09-30');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Security Control & Access Gate 1 🛡️
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {user?.name || 'Inspector M. Pradhan'} • {user?.gateAssigned || 'Main Security Gate 1'}
          </p>
          <p className="text-xs font-mono text-indigo-600 dark:text-indigo-400 font-bold mt-1">
            Badge: {user?.badgeId || 'SEC089'} • Terminal IP: 10.20.1.14
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/security/scanner')}
            className="btn btn-primary btn-sm shadow-md shadow-indigo-600/20"
          >
            <ScanLine className="w-4 h-4 text-cyan-300" />
            Launch QR Pass Scanner
          </button>
        </div>
      </div>

      {/* Security KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiCard
          title="Active Gate Passes"
          value={activePasses.length.toString()}
          subtext="Approved by Warden"
          icon={ShieldCheck}
          variant="indigo"
          onClick={() => navigate('/security/scanner')}
        />
        <KpiCard
          title="Visitors Today"
          value={visitorsToday.length.toString()}
          subtext="Expected at Gate 1"
          icon={Users}
          variant="cyan"
          onClick={() => navigate('/security/visitors')}
        />
        <KpiCard
          title="Currently Outside"
          value="48 Students"
          subtext="Valid Pass Window"
          icon={LogOut}
          variant="amber"
          onClick={() => navigate('/security/logs')}
        />
        <KpiCard
          title="Expected Returns"
          value="34 by 8:30 PM"
          subtext="Curfew Check 09:30 PM"
          icon={LogIn}
          variant="emerald"
          onClick={() => navigate('/security/logs')}
        />
        <KpiCard
          title="Security Alerts"
          value="0 Breaches"
          subtext="All RFID Gates Normal"
          icon={AlertTriangle}
          variant="rose"
        />
      </div>

      {/* Recent Gate Activity Stream */}
      <div className="campus-card">
        <div className="campus-card-header">
          <div>
            <h3 className="campus-card-title">Live Gate Log Stream</h3>
            <p className="campus-card-subtitle">Real-time turnstile verification at Gate 1</p>
          </div>
          <button
            onClick={() => navigate('/security/logs')}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            Audit History <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {securityLogs.slice(0, 5).map((log) => (
            <div key={log.id} className="py-3.5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                    log.type === 'ENTRY'
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 border border-emerald-300'
                      : 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 border border-rose-300'
                  }`}
                >
                  {log.type === 'ENTRY' ? <LogIn className="w-4 h-4" /> : <LogOut className="w-4 h-4" />}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {log.entityName} ({log.entityId})
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    {log.notes} • Pass: {log.passId}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300">
                  {log.timestamp}
                </span>
                <p className="text-[10px] text-slate-400">{log.gate}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecurityDashboard;
