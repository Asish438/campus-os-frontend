import React from 'react';
import { useCampus } from '../../context/CampusContext';
import StatusBadge from '../../components/common/StatusBadge';
import { Users, LogIn, LogOut, CheckCircle2 } from 'lucide-react';

export const SecurityVisitorsPage = () => {
  const { visitors, updateVisitorStatus } = useCampus();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Security Visitor Check-In Desk
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Verify physical credentials, issue badge IDs, and record turnstile entry/exit timestamps
        </p>
      </div>

      <div className="campus-card">
        <div className="campus-card-header">
          <h3 className="campus-card-title">Authorized Visitors Roster</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="campus-table">
            <thead>
              <tr>
                <th>Visitor Name</th>
                <th>Relationship</th>
                <th>Meeting Student</th>
                <th>Phone</th>
                <th>Expected Time</th>
                <th>Status</th>
                <th>Check-In Time</th>
                <th>Check-Out Time</th>
                <th>Security Actions</th>
              </tr>
            </thead>
            <tbody>
              {visitors.map((v) => (
                <tr key={v.id}>
                  <td className="font-bold text-slate-900 dark:text-white">{v.visitorName}</td>
                  <td className="text-xs">{v.relationship}</td>
                  <td className="font-semibold text-xs">{v.studentName}</td>
                  <td className="font-mono text-xs">{v.phone}</td>
                  <td className="text-xs text-slate-500 whitespace-nowrap">{v.visitDate} ({v.expectedArrival})</td>
                  <td>
                    <StatusBadge status={v.status} size="sm" />
                  </td>
                  <td className="font-mono text-xs text-slate-500">{v.checkedInAt || '-'}</td>
                  <td className="font-mono text-xs text-slate-500">{v.checkedOutAt || '-'}</td>
                  <td>
                    <div className="flex items-center gap-1.5">
                      {v.status === 'Approved' && (
                        <button
                          onClick={() => updateVisitorStatus(v.id, 'Checked-In')}
                          className="btn btn-success btn-sm text-[11px]"
                        >
                          <LogIn className="w-3.5 h-3.5" /> Check-In
                        </button>
                      )}
                      {v.status === 'Checked-In' && (
                        <button
                          onClick={() => updateVisitorStatus(v.id, 'Checked-Out')}
                          className="btn btn-danger btn-sm text-[11px]"
                        >
                          <LogOut className="w-3.5 h-3.5" /> Check-Out
                        </button>
                      )}
                      {v.status === 'Checked-Out' && (
                        <span className="text-xs text-slate-400 font-semibold">Completed</span>
                      )}
                      {v.status === 'Pending' && (
                        <span className="text-xs text-amber-600 font-semibold">Awaiting Warden</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SecurityVisitorsPage;
