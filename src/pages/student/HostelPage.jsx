import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCampus } from '../../context/CampusContext';
import { HOSTEL_INFO } from '../../data/demoData';
import StatusBadge from '../../components/common/StatusBadge';
import {
  Building2,
  Users,
  UtensilsCrossed,
  ShieldAlert,
  AlertTriangle,
  ArrowRight,
  PhoneCall,
  CheckCircle2,
  Clock
} from 'lucide-react';

export const HostelPage = () => {
  const navigate = useNavigate();
  const { complaints } = useCampus();

  const myComplaints = complaints.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Hostel & Residence Life
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {HOSTEL_INFO.name} • {HOSTEL_INFO.block} • {HOSTEL_INFO.room}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/student/complaints')}
            className="btn btn-primary btn-sm shadow-sm"
          >
            <AlertTriangle className="w-4 h-4" />
            File Maintenance Complaint
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="campus-card">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs uppercase font-bold text-slate-400">Room Allotment</p>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">{HOSTEL_INFO.room}</h4>
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {HOSTEL_INFO.block} • Aryabhatta Senior Residence
          </p>
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs flex items-center justify-between">
            <span className="text-slate-400">Hostel Caretaker:</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">Mr. B. K. Jena</span>
          </div>
        </div>

        <div className="campus-card">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs uppercase font-bold text-slate-400">Chief Warden</p>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">{HOSTEL_INFO.warden}</h4>
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Office: Ground Floor, Admin Block (09:00 AM - 05:00 PM)
          </p>
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs flex items-center justify-between">
            <span className="text-slate-400">Emergency Helpline:</span>
            <span className="font-semibold text-blue-600 dark:text-blue-400">+91 94370 11223</span>
          </div>
        </div>

        <div className="campus-card">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs uppercase font-bold text-slate-400">Night Curfew</p>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">09:30 PM</h4>
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Mandatory biometric roll call conducted at room floor desks
          </p>
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs flex items-center justify-between">
            <span className="text-slate-400">Digital Gate Pass:</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">Active</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Roommates Card */}
        <div className="campus-card">
          <div className="campus-card-header">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              <h3 className="campus-card-title">Room 304 Residents</h3>
            </div>
          </div>
          <div className="space-y-3">
            {HOSTEL_INFO.roommates.map((rm, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800"
              >
                <div>
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white">{rm.name}</h5>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {rm.branch} • {rm.roll}
                  </p>
                </div>
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                  {rm.bed}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Mess Menu */}
        <div className="campus-card">
          <div className="campus-card-header">
            <div className="flex items-center gap-2">
              <UtensilsCrossed className="w-4 h-4 text-amber-500" />
              <h3 className="campus-card-title">Today's Mess Menu ({HOSTEL_INFO.messMenu.today})</h3>
            </div>
            <span className="text-xs font-bold text-emerald-600">Pure Veg & Non-Veg Counters</span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
              <span className="font-bold text-slate-700 dark:text-slate-300">Breakfast (07:30 AM - 09:30 AM):</span>
              <p className="text-slate-500 dark:text-slate-400 mt-0.5">{HOSTEL_INFO.messMenu.breakfast}</p>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
              <span className="font-bold text-slate-700 dark:text-slate-300">Lunch (12:30 PM - 02:30 PM):</span>
              <p className="text-slate-500 dark:text-slate-400 mt-0.5">{HOSTEL_INFO.messMenu.lunch}</p>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
              <span className="font-bold text-slate-700 dark:text-slate-300">Evening Snacks (05:00 PM - 06:15 PM):</span>
              <p className="text-slate-500 dark:text-slate-400 mt-0.5">{HOSTEL_INFO.messMenu.snacks}</p>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
              <span className="font-bold text-slate-700 dark:text-slate-300">Dinner (08:00 PM - 10:00 PM):</span>
              <p className="text-slate-500 dark:text-slate-400 mt-0.5">{HOSTEL_INFO.messMenu.dinner}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Complaints History */}
      <div className="campus-card">
        <div className="campus-card-header">
          <div>
            <h3 className="campus-card-title">Recent Hostel Maintenance Tickets</h3>
            <p className="campus-card-subtitle">AI-classified tickets synced live with Warden & Estate operations</p>
          </div>
          <button
            onClick={() => navigate('/student/complaints')}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            Manage All Complaints <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {myComplaints.map((c) => (
            <div key={c.id} className="py-3 flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    {c.id}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {c.category}
                  </span>
                </div>
                <p className="text-xs text-slate-800 dark:text-slate-200 mt-1">
                  {c.description}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Logged: {c.createdAt} • Assigned to: {c.assignedTo}
                </p>
              </div>
              <StatusBadge status={c.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HostelPage;
