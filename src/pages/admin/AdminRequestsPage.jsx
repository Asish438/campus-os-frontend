import React from 'react';
import { useCampus } from '../../context/CampusContext';
import StatusBadge from '../../components/common/StatusBadge';
import { Layers, QrCode, Users } from 'lucide-react';

export const AdminRequestsPage = () => {
  const { gatePasses, visitors } = useCampus();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Institutional Request Central Desk
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Consolidated View of Gate Passes, Leaves & Visitor Permissions
        </p>
      </div>

      <div className="campus-card">
        <div className="campus-card-header">
          <h3 className="campus-card-title">Student Gate Pass Authorizations</h3>
          <span className="text-xs text-slate-400">Count: {gatePasses.length}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="campus-table">
            <thead>
              <tr>
                <th>Pass ID</th>
                <th>Student</th>
                <th>Destination</th>
                <th>Out - Return Time</th>
                <th>Status</th>
                <th>Approved By</th>
              </tr>
            </thead>
            <tbody>
              {gatePasses.map(p => (
                <tr key={p.id}>
                  <td className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">{p.id}</td>
                  <td className="font-bold">{p.student}</td>
                  <td className="text-xs">{p.destination}</td>
                  <td className="text-xs font-mono">{p.outTime} → {p.returnTime}</td>
                  <td><StatusBadge status={p.status} size="sm" /></td>
                  <td className="text-xs text-slate-500">{p.approvedBy || 'Pending Review'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminRequestsPage;
