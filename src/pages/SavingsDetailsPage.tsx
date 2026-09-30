import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  PiggyBank, 
  ArrowLeft, 
  Download, 
  Printer, 
  User, 
  Calendar, 
  Percent, 
  Coins, 
  ArrowUpRight, 
  ArrowDownLeft,
  FileSpreadsheet
} from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { StatusBadge } from '../components/common/StatusBadge';
import { EmptyState } from '../components/common/EmptyState';
import { savingsService } from '../services/apiService';
import { SavingsAccount, Transaction } from '../types';
import { INITIAL_TRANSACTIONS, formatINR } from '../mock/mockData';
import { useToast } from '../context/ToastContext';

export const SavingsDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [account, setAccount] = useState<SavingsAccount | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAccount = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const acc = await savingsService.getByNumber(id);
        if (acc) {
          setAccount(acc);
          const filteredTxns = INITIAL_TRANSACTIONS.filter(
            t => t.accountNumber === acc.accountNumber || t.memberId === acc.memberId
          );
          setTransactions(filteredTxns.length > 0 ? filteredTxns : INITIAL_TRANSACTIONS.slice(0, 8));
        }
      } finally {
        setLoading(false);
      }
    };
    loadAccount();
  }, [id]);

  const handleDownloadStatement = () => {
    if (!account) return;
    const csvRows = [
      ['Transaction ID', 'Date', 'Type', 'Amount', 'Payment Mode', 'New Balance'],
      ...transactions.map(t => [
        t.id,
        t.date,
        t.type,
        t.amount.toString(),
        t.paymentMode,
        (t.newBalance || 0).toString()
      ])
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.map(e => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Statement_${account.accountNumber}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast({
      type: 'success',
      title: 'Statement Downloaded',
      message: `Account statement for ${account.accountNumber} exported as CSV.`
    });
  };

  const handlePrintStatement = () => {
    window.print();
  };

  if (loading) {
    return <div className="p-8 text-center text-xs text-slate-500">Loading savings account...</div>;
  }

  if (!account) {
    return (
      <EmptyState
        title="Account Not Found"
        description="The requested savings account number does not exist."
        actionText="Back to Savings"
        onAction={() => navigate('/savings')}
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Savings Account: ${account.accountNumber}`}
        subtitle={`Primary account of ${account.memberName} (${account.memberId})`}
        breadcrumbs={[
          { label: 'Dashboard', url: '/dashboard' },
          { label: 'Savings Accounts', url: '/savings' },
          { label: account.accountNumber }
        ]}
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/savings')}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={handleDownloadStatement}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download Statement</span>
            </button>
            <button
              onClick={handlePrintStatement}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print Statement</span>
            </button>
          </div>
        }
      />

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Balance Card */}
        <div className="bg-gradient-to-tr from-blue-600 to-indigo-700 rounded-2xl p-5 text-white shadow-md">
          <div className="flex items-center justify-between opacity-80 text-xs uppercase font-semibold tracking-wider mb-2">
            <span>Available Balance</span>
            <Coins className="w-4 h-4" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {formatINR(account.balance)}
          </div>
          <div className="mt-3 text-[11px] opacity-80 flex items-center gap-1">
            <span>Acc Status:</span>
            <span className="font-bold">{account.status}</span>
          </div>
        </div>

        {/* Account Details */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700/60 shadow-sm space-y-2">
          <span className="text-xs font-semibold uppercase text-slate-400">Account Holder</span>
          <div className="text-base font-bold text-slate-900 dark:text-white truncate">
            {account.memberName}
          </div>
          <p className="text-xs text-slate-500 font-mono">Member ID: {account.memberId}</p>
        </div>

        {/* Opening Date */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700/60 shadow-sm space-y-2">
          <span className="text-xs font-semibold uppercase text-slate-400">Opening Date</span>
          <div className="text-base font-bold text-slate-900 dark:text-white">
            {account.openingDate}
          </div>
          <p className="text-xs text-slate-500">Regular Savings Scheme</p>
        </div>

        {/* Interest Rate */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700/60 shadow-sm space-y-2">
          <span className="text-xs font-semibold uppercase text-slate-400">Annual Interest</span>
          <div className="text-base font-bold text-emerald-600 dark:text-emerald-400">
            {account.interestRate}% p.a.
          </div>
          <p className="text-xs text-slate-500">Credited Quarterly</p>
        </div>
      </div>

      {/* Transaction Statement Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Account Transaction Statement
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Complete deposit and debit entries with balance progression
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-750 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-100 dark:border-slate-700/80">
              <tr>
                <th className="px-4 py-3">TXN ID</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Transaction Type</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Previous Balance</th>
                <th className="px-4 py-3">New Balance</th>
                <th className="px-4 py-3 text-right">Mode</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
              {transactions.map(txn => {
                const isCredit = txn.type === 'Deposit' || txn.type === 'Interest';
                return (
                  <tr key={txn.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-750/50 transition-colors">
                    <td className="px-4 py-3.5 font-mono font-semibold text-slate-700 dark:text-slate-300">
                      {txn.id}
                    </td>
                    <td className="px-4 py-3.5 text-slate-500 dark:text-slate-400">
                      {txn.date}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200">
                        {isCredit ? (
                          <ArrowDownLeft className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <ArrowUpRight className="w-3.5 h-3.5 text-rose-500" />
                        )}
                        <span>{txn.type}</span>
                      </div>
                    </td>
                    <td className={`px-4 py-3.5 font-bold ${isCredit ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {isCredit ? '+' : '-'}{formatINR(txn.amount)}
                    </td>
                    <td className="px-4 py-3.5 text-slate-500 dark:text-slate-400">
                      {formatINR(txn.previousBalance || 50000)}
                    </td>
                    <td className="px-4 py-3.5 font-semibold text-slate-900 dark:text-white">
                      {formatINR(txn.newBalance || 50000)}
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                        {txn.paymentMode}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
