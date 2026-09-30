import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

export const AdminAuditLogsPage = () => {
  const auditLogs = [
    { id: 'AUD-901', timestamp: '2026-09-30 01:45 PM', actor: 'Dr. S. K. Patnaik', action: 'BATCH_ATTENDANCE_OVERRIDE', target: 'CS503 Sec B', ip: '10.20.1.14', status: 'SUCCESS' },
    { id: 'AUD-900', timestamp: '2026-09-30 11:15 AM', actor: 'Col. Rajesh Sharma', action: 'GATE_PASS_APPROVED', target: 'GP-2026-8841', ip: '10.20.4.88', status: 'SUCCESS' },
    { id: 'AUD-899', timestamp: '2026-09-30 09:30 AM', actor: 'Priyanka Das', action: 'FEE_RECEIPT_GENERATED', target: 'RCP-2026-944', ip: '10.20.2.11', status: 'SUCCESS' },
    { id: 'AUD-898', timestamp: '2026-09-29 08:30 AM', actor: 'AI_AGENT_PIPELINE', action: 'AUTO_CLASSIFY_COMPLAINT', target: 'CMP-2026-104', ip: '127.0.0.1', status: 'SUCCESS' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          System Security & Access Audit Trails
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Cryptographically chained ledger of administrator overrides and security events
        </p>
      </div>

      <div className="campus-card">
        <div className="overflow-x-auto">
          <table className="campus-table">
            <thead>
              <tr>
                <th>Audit ID</th>
                <th>Timestamp</th>
                <th>Principal Actor</th>
                <th>Action Event</th>
                <th>Target Object</th>
                <th>Origin IP</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map(l => (
                <tr key={l.id}>
                  <td className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">{l.id}</td>
                  <td className="text-xs text-slate-500">{l.timestamp}</td>
                  <td className="font-bold text-slate-900 dark:text-white">{l.actor}</td>
                  <td className="font-mono text-xs font-semibold text-slate-700 dark:text-slate-300">{l.action}</td>
                  <td className="font-mono text-xs">{l.target}</td>
                  <td className="font-mono text-xs text-slate-400">{l.ip}</td>
                  <td>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-300">
                      {l.status}
                    </span>
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

export default AdminAuditLogsPage;
