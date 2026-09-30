import React from 'react';
import { useCampus } from '../../context/CampusContext';
import KpiCard from '../../components/common/KpiCard';
import StatusBadge from '../../components/common/StatusBadge';
import {
  DollarSign,
  CreditCard,
  Building,
  CheckCircle2,
  AlertTriangle,
  Receipt,
  Download
} from 'lucide-react';

export const AccountsDashboard = () => {
  const { fees } = useCampus();

  const departmentSummary = [
    { dept: 'Computer Science & Engineering', students: 1240, billed: '₹1.48 Cr', collected: '₹1.22 Cr', pending: '₹26.4 L', recovery: '82%' },
    { dept: 'Electronics & Communication', students: 980, billed: '₹1.17 Cr', collected: '₹98.2 L', pending: '₹19.4 L', recovery: '84%' },
    { dept: 'Mechanical Engineering', students: 780, billed: '₹93.6 L', collected: '₹74.8 L', pending: '₹18.8 L', recovery: '80%' },
    { dept: 'Civil Engineering', students: 620, billed: '₹74.4 L', collected: '₹58.0 L', pending: '₹16.4 L', recovery: '78%' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Accounts & Bursar Treasury 💰
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Monsoon 2026 Academic Term Collection Ledger • Finance Division
          </p>
        </div>
      </div>

      {/* Top Financial KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total Billed Dues"
          value="₹5.82 Cr"
          subtext="Institutional Semester Billing"
          icon={DollarSign}
          variant="indigo"
        />
        <KpiCard
          title="Total Collected"
          value="₹4.74 Cr"
          subtext="81.4% Recovery Rate"
          icon={CheckCircle2}
          variant="emerald"
        />
        <KpiCard
          title="Campus Outstanding"
          value="₹1.08 Cr"
          subtext="312 Students Pending"
          icon={AlertTriangle}
          variant="rose"
        />
        <KpiCard
          title="Recent Receipts"
          value={fees.transactions.length.toString()}
          subtext="Today's Digital Cleared Dues"
          icon={Receipt}
          variant="cyan"
        />
      </div>

      {/* Department-Wise Collection Matrix */}
      <div className="campus-card">
        <div className="campus-card-header">
          <h3 className="campus-card-title">Departmental Fee Collection Ledger</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="campus-table">
            <thead>
              <tr>
                <th>Department</th>
                <th>Enrolled</th>
                <th>Total Billed</th>
                <th>Collected</th>
                <th>Outstanding</th>
                <th>Recovery %</th>
              </tr>
            </thead>
            <tbody>
              {departmentSummary.map((d) => (
                <tr key={d.dept}>
                  <td className="font-bold text-slate-900 dark:text-white">{d.dept}</td>
                  <td className="font-mono text-xs">{d.students}</td>
                  <td className="font-mono text-xs font-semibold">{d.billed}</td>
                  <td className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-bold">{d.collected}</td>
                  <td className="font-mono text-xs text-rose-600 dark:text-rose-400 font-bold">{d.pending}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: d.recovery }}
                        />
                      </div>
                      <span className="text-xs font-bold font-mono">{d.recovery}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Student Payments Table */}
      <div className="campus-card">
        <div className="campus-card-header">
          <h3 className="campus-card-title">Recent Verified Digital Transactions</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="campus-table">
            <thead>
              <tr>
                <th>Receipt No</th>
                <th>Transaction ID</th>
                <th>Date</th>
                <th>Fee Head</th>
                <th>Amount</th>
                <th>Gateway Mode</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {fees.transactions.map((txn) => (
                <tr key={txn.id}>
                  <td className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    {txn.receiptNo}
                  </td>
                  <td className="font-mono text-xs text-slate-600 dark:text-slate-300">{txn.id}</td>
                  <td className="text-xs text-slate-500 whitespace-nowrap">{txn.date}</td>
                  <td className="font-semibold text-xs text-slate-800 dark:text-slate-200">{txn.feeType}</td>
                  <td className="font-mono font-bold text-xs text-slate-900 dark:text-white">
                    ₹{txn.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="text-xs text-slate-500">{txn.method}</td>
                  <td>
                    <StatusBadge status={txn.status} size="sm" />
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

export default AccountsDashboard;
