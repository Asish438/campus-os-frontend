import React from 'react';
import { useCampus } from '../../context/CampusContext';
import StatusBadge from '../../components/common/StatusBadge';
import { Users, CheckCircle2, XCircle } from 'lucide-react';

export const WardenVisitorsPage = () => {
  const { visitors, updateVisitorStatus } = useCampus();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Hostel Visitor Clearance Desk
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Approve or reject parent and guest visitation permissions
        </p>
      </div>

      <div className="campus-card">
        <div className="campus-card-header">
          <h3 className="campus-card-title">Registered Visitor Requests</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="campus-table">
            <thead>
              <tr>
                <th>Visitor</th>
                <th>Relationship</th>
                <th>Visiting Student</th>
                <th>Date & Time</th>
                <th>Purpose</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {visitors.map((v) => (
                <tr key={v.id}>
                  <td>
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white">{v.visitorName}</span>
                      <p className="text-[11px] text-slate-500 font-mono">{v.phone}</p>
                    </div>
                  </td>
                  <td className="text-xs">{v.relationship}</td>
                  <td className="font-semibold text-xs">{v.studentName}</td>
                  <td className="text-xs text-slate-500 whitespace-nowrap">{v.visitDate} ({v.expectedArrival})</td>
                  <td className="text-xs text-slate-600 dark:text-slate-300 max-w-xs">{v.purpose}</td>
                  <td>
                    <StatusBadge status={v.status} size="sm" />
                  </td>
                  <td>
                    {v.status === 'Pending' ? (
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => updateVisitorStatus(v.id, 'Approved')}
                          className="btn btn-success btn-sm text-[11px]"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                        </button>
                        <button
                          onClick={() => updateVisitorStatus(v.id, 'Rejected')}
                          className="btn btn-danger btn-sm text-[11px]"
                        >
                          <XCircle className="w-3.5 h-3.5" /> Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 font-mono">Processed</span>
                    )}
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

export default WardenVisitorsPage;
