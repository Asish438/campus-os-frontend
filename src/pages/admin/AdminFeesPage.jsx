import React from 'react';
import { DollarSign, CreditCard, CheckCircle2 } from 'lucide-react';
import { useCampus } from '../../context/CampusContext';

export const AdminFeesPage = () => {
  const { fees } = useCampus();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          University Revenue & Bursar Accounts
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Institutional collections ledger and fee reconciliations
        </p>
      </div>

      <div className="campus-card">
        <div className="campus-card-header">
          <h3 className="campus-card-title">Fee Head Collections Summary</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="campus-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Target Budget</th>
                <th>Total Collected</th>
                <th>Pending Dues</th>
                <th>Recovery Progress</th>
              </tr>
            </thead>
            <tbody>
              {fees.breakdown.map((item, idx) => (
                <tr key={idx}>
                  <td className="font-bold text-slate-900 dark:text-white">{item.type}</td>
                  <td className="font-mono text-xs">₹{(item.total * 40).toLocaleString('en-IN')}</td>
                  <td className="font-mono text-xs text-emerald-600 font-bold">₹{(item.paid * 40).toLocaleString('en-IN')}</td>
                  <td className="font-mono text-xs text-rose-600 font-bold">₹{(item.pending * 40).toLocaleString('en-IN')}</td>
                  <td>
                    <span className="text-xs font-bold font-mono text-indigo-600">
                      {Math.round((item.paid / item.total) * 100)}%
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

export default AdminFeesPage;
