import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCampus } from '../../context/CampusContext';
import KpiCard from '../../components/common/KpiCard';
import StatusBadge from '../../components/common/StatusBadge';
import {
  Building2,
  AlertTriangle,
  QrCode,
  Users,
  BedDouble,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const WardenDashboard = () => {
  const { user } = useAuth();
  const { complaints, gatePasses, visitors } = useCampus();
  const navigate = useNavigate();

  const openComplaints = complaints.filter(c => c.status !== 'RESOLVED');
  const highPriority = complaints.filter(c => ['High', 'Urgent'].includes(c.priority) && c.status !== 'RESOLVED');
  const pendingGatePasses = gatePasses.filter(p => p.status === 'Pending');
  const visitorsToday = visitors.filter(v => v.visitDate === '2026-09-30');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Chief Warden Command Desk 🏢
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {user?.name || 'Col. Rajesh Sharma (Retd.)'} • {user?.hostelAssigned || 'Aryabhatta & Ramanujan Halls'}
          </p>
          <p className="text-xs font-mono text-indigo-600 dark:text-indigo-400 font-bold mt-1">
            Warden ID: {user?.wardenId || 'WAR2019012'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/warden/complaints')}
            className="btn btn-primary btn-sm shadow-sm"
          >
            <AlertTriangle className="w-4 h-4" />
            Resolve Maintenance Queue
          </button>
          <button
            onClick={() => navigate('/warden/gate-pass')}
            className="btn btn-secondary btn-sm"
          >
            <QrCode className="w-4 h-4" />
            Review Gate Passes
          </button>
        </div>
      </div>

      {/* Top Warden KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiCard
          title="Open Complaints"
          value={openComplaints.length.toString()}
          subtext="Requiring Technician"
          icon={AlertTriangle}
          variant="amber"
          onClick={() => navigate('/warden/complaints')}
        />
        <KpiCard
          title="High Priority"
          value={highPriority.length.toString()}
          subtext="Urgent Estate Attention"
          icon={AlertTriangle}
          variant="rose"
          onClick={() => navigate('/warden/complaints')}
        />
        <KpiCard
          title="Pending Gate Passes"
          value={pendingGatePasses.length.toString()}
          subtext="Awaiting Warden Approval"
          icon={QrCode}
          variant="indigo"
          onClick={() => navigate('/warden/gate-pass')}
        />
        <KpiCard
          title="Visitors Today"
          value={visitorsToday.length.toString()}
          subtext="Registered at Gate"
          icon={Users}
          variant="cyan"
          onClick={() => navigate('/warden/visitors')}
        />
        <KpiCard
          title="Occupied Rooms"
          value="482 / 500"
          subtext="96.4% Hostel Capacity"
          icon={BedDouble}
          variant="emerald"
          onClick={() => navigate('/warden/hostel')}
        />
      </div>

      {/* Two Column Layout: Urgent Complaints & Pending Gate Passes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Urgent Complaints */}
        <div className="campus-card">
          <div className="campus-card-header">
            <div>
              <h3 className="campus-card-title">Pending Maintenance Tickets</h3>
              <p className="campus-card-subtitle">AI-Triaged issue reports from hostel residents</p>
            </div>
            <button
              onClick={() => navigate('/warden/complaints')}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              Open Full Queue <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {complaints.slice(0, 4).map((c) => (
              <div
                key={c.id}
                className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">
                        {c.id}
                      </span>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        {c.student} ({c.room})
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                      {c.description}
                    </p>
                  </div>
                  <StatusBadge status={c.status} size="sm" />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                  <span>Category: <strong className="text-indigo-600 dark:text-indigo-400">{c.category}</strong> ({c.priority} Priority)</span>
                  <button
                    onClick={() => navigate('/warden/complaints')}
                    className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    Take Action →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Gate Passes */}
        <div className="campus-card">
          <div className="campus-card-header">
            <div>
              <h3 className="campus-card-title">Outpass Authorizations</h3>
              <p className="campus-card-subtitle">Approve student digital passes to generate Security QR</p>
            </div>
            <button
              onClick={() => navigate('/warden/gate-pass')}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              All Passes <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {gatePasses.map((p) => (
              <div
                key={p.id}
                className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">
                        {p.id}
                      </span>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        {p.student} ({p.room})
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                      Destination: <strong>{p.destination}</strong>
                    </p>
                    <p className="text-[11px] text-slate-400 italic">"{p.purpose}"</p>
                  </div>
                  <StatusBadge status={p.status} size="sm" />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                  <span>Timing: {p.outTime} → {p.returnTime}</span>
                  <button
                    onClick={() => navigate('/warden/gate-pass')}
                    className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    Review Pass →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WardenDashboard;
