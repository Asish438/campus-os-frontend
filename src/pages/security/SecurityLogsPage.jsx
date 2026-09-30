import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import StatusBadge from '../../components/common/StatusBadge';
import SearchBar from '../../components/common/SearchBar';
import { FileText, LogIn, LogOut, ShieldCheck, Download } from 'lucide-react';

export const SecurityLogsPage = () => {
  const { securityLogs } = useCampus();
  const [search, setSearch] = useState('');

  const filteredLogs = securityLogs.filter(l =>
    l.entityName.toLowerCase().includes(search.toLowerCase()) ||
    l.entityId.toLowerCase().includes(search.toLowerCase()) ||
    l.passId.toLowerCase().includes(search.toLowerCase()) ||
    l.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Security Access & Turnstile Audit Trail
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Immutable log record of campus boundary crossings, QR validations, and visitor ingress
          </p>
        </div>

        <div className="w-full sm:w-72">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search by student name, ID, or pass..."
          />
        </div>
      </div>

      <div className="campus-card">
        <div className="campus-card-header">
          <h3 className="campus-card-title">Live Gate 1 Access Log</h3>
          <span className="text-xs text-slate-400">Total Entries: {securityLogs.length}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="campus-table">
            <thead>
              <tr>
                <th>Log ID</th>
                <th>Timestamp</th>
                <th>Event Type</th>
                <th>Subject Entity</th>
                <th>Identity Reference</th>
                <th>Pass / Badge ID</th>
                <th>Gate Terminal</th>
                <th>Officer on Duty</th>
                <th>Verification Notes</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id}>
                  <td className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    {log.id}
                  </td>
                  <td className="font-mono text-xs text-slate-500 whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td>
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        log.type === 'ENTRY'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                          : 'bg-rose-50 text-rose-700 border-rose-300'
                      }`}
                    >
                      {log.type === 'ENTRY' ? <LogIn className="w-3 h-3" /> : <LogOut className="w-3 h-3" />}
                      {log.type}
                    </span>
                  </td>
                  <td className="font-bold text-slate-900 dark:text-white text-xs">
                    {log.entityName}
                  </td>
                  <td className="font-mono text-xs text-slate-600 dark:text-slate-300">
                    {log.entityId}
                  </td>
                  <td className="font-mono text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                    {log.passId}
                  </td>
                  <td className="text-xs text-slate-500 whitespace-nowrap">{log.gate}</td>
                  <td className="text-xs text-slate-500">{log.verifiedBy}</td>
                  <td className="text-xs text-slate-500 max-w-xs truncate">{log.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SecurityLogsPage;
