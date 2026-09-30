import React from 'react';
import { useCampus } from '../../context/CampusContext';
import StatusBadge from '../../components/common/StatusBadge';
import { AlertTriangle, Wrench } from 'lucide-react';

export const AdminComplaintsPage = () => {
  const { complaints } = useCampus();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Campus-Wide Grievance & Maintenance Operations
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Executive View of Estate & Hostel Service Tickets
        </p>
      </div>

      <div className="campus-card">
        <div className="campus-card-header">
          <h3 className="campus-card-title">Live Grievance Log</h3>
          <span className="text-xs text-slate-400">Total: {complaints.length} tickets</span>
        </div>

        <div className="overflow-x-auto">
          <table className="campus-table">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Student</th>
                <th>Hostel & Room</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Department</th>
                <th>Assigned Tech</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map(c => (
                <tr key={c.id}>
                  <td className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">{c.id}</td>
                  <td className="font-bold text-slate-900 dark:text-white">{c.student}</td>
                  <td className="text-xs">{c.hostel}, {c.room}</td>
                  <td className="text-xs font-semibold">{c.category}</td>
                  <td>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      c.priority === 'High' ? 'bg-rose-50 text-rose-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {c.priority}
                    </span>
                  </td>
                  <td><StatusBadge status={c.status} size="sm" /></td>
                  <td className="text-xs text-slate-500">{c.department}</td>
                  <td className="text-xs text-slate-600 dark:text-slate-300 font-medium">{c.assignedTo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminComplaintsPage;
