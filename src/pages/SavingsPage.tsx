import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  PiggyBank, 
  CheckCircle, 
  Snowflake, 
  Lock, 
  Search, 
  Filter, 
  Eye, 
  FileText, 
  Coins,
  ArrowRight
} from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { StatCard } from '../components/common/StatCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { Pagination } from '../components/common/Pagination';
import { EmptyState } from '../components/common/EmptyState';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { savingsService } from '../services/apiService';
import { SavingsAccount } from '../types';
import { formatINR } from '../mock/mockData';
import { useToast } from '../context/ToastContext';

export const SavingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [accounts, setAccounts] = useState<SavingsAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Freeze / Unfreeze confirmation
  const [selectedAcc, setSelectedAcc] = useState<SavingsAccount | null>(null);
  const [showFreezeConfirm, setShowFreezeConfirm] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await savingsService.getAll();
      setAccounts(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Stats
  const totalAccounts = accounts.length;
  const activeAccounts = accounts.filter(a => a.status === 'Active').length;
  const frozenAccounts = accounts.filter(a => a.status === 'Frozen').length;
  const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0);

  // Filter logic
  const filtered = useMemo(() => {
    return accounts.filter(a => {
      const matchesStatus = statusFilter === 'All' || a.status === statusFilter;
      const matchesSearch = 
        a.accountNumber.toLowerCase().includes(search.toLowerCase()) ||
        a.memberName.toLowerCase().includes(search.toLowerCase()) ||
        a.memberId.toLowerCase().includes(search.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [accounts, statusFilter, search]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleToggleFreeze = async () => {
    if (!selectedAcc) return;
    try {
      await savingsService.toggleFreeze(selectedAcc.accountNumber);
      addToast({
        type: selectedAcc.status === 'Active' ? 'warning' : 'success',
        title: selectedAcc.status === 'Active' ? 'Account Frozen' : 'Account Reactivated',
        message: `Account ${selectedAcc.accountNumber} has been ${
          selectedAcc.status === 'Active' ? 'frozen' : 'unfrozen'
        }.`
      });
      setShowFreezeConfirm(false);
      loadData();
    } catch {
      addToast({ type: 'error', message: 'Failed to update account status.' });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Savings Accounts"
        subtitle="Manage member savings deposits, ledger balances, interest accruals, and freeze restrictions."
        breadcrumbs={[
          { label: 'Dashboard', url: '/dashboard' },
          { label: 'Savings Accounts' }
        ]}
      />

      {/* 4 Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Accounts"
          value={totalAccounts}
          icon={<PiggyBank className="w-5 h-5" />}
          color="blue"
        />
        <StatCard
          title="Active Accounts"
          value={activeAccounts}
          icon={<CheckCircle className="w-5 h-5" />}
          color="emerald"
        />
        <StatCard
          title="Frozen Accounts"
          value={frozenAccounts}
          icon={<Snowflake className="w-5 h-5" />}
          color="amber"
          onClick={() => setStatusFilter('Frozen')}
        />
        <StatCard
          title="Total Balance"
          value={formatINR(totalBalance)}
          icon={<Coins className="w-5 h-5" />}
          color="indigo"
        />
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by account number, member name or member ID..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={e => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="All">Filter: All Statuses</option>
            <option value="Active">Active</option>
            <option value="Frozen">Frozen</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Accounts Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <EmptyState
            title="No savings accounts found"
            description="No savings deposit records match your current filter selection."
          />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-750 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-100 dark:border-slate-700/80">
                  <tr>
                    <th className="px-4 py-3">Account Number</th>
                    <th className="px-4 py-3">Member</th>
                    <th className="px-4 py-3">Opening Date</th>
                    <th className="px-4 py-3">Balance</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                  {paginated.map(acc => (
                    <tr key={acc.accountNumber} className="hover:bg-slate-50/80 dark:hover:bg-slate-750/50 transition-colors">
                      <td className="px-4 py-3.5 font-mono font-bold text-blue-600 dark:text-blue-400">
                        {acc.accountNumber}
                      </td>
                      <td className="px-4 py-3.5">
                        <div 
                          onClick={() => navigate(`/members/${acc.memberId}`)}
                          className="font-semibold text-slate-900 dark:text-white hover:text-blue-600 cursor-pointer"
                        >
                          {acc.memberName}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          ID: {acc.memberId}
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-slate-500 dark:text-slate-400">
                        {acc.openingDate}
                      </td>
                      <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white">
                        {formatINR(acc.balance)}
                      </td>
                      <td className="px-4 py-3.5">
                        <StatusBadge status={acc.status} />
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => navigate(`/savings/${acc.accountNumber}`)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors"
                            title="View Statement & Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => {
                              setSelectedAcc(acc);
                              setShowFreezeConfirm(true);
                            }}
                            className={`p-1.5 rounded-lg transition-colors ${
                              acc.status === 'Active'
                                ? 'text-slate-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/40'
                                : 'text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
                            }`}
                            title={acc.status === 'Active' ? 'Freeze Account' : 'Activate Account'}
                          >
                            {acc.status === 'Active' ? <Snowflake className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                          </button>

                          <button
                            onClick={() => navigate(`/savings/${acc.accountNumber}`)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/40 transition-colors"
                            title="Statement"
                          >
                            <FileText className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              totalItems={filtered.length}
              pageSize={pageSize}
            />
          </>
        )}
      </div>

      {/* Freeze Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showFreezeConfirm}
        onClose={() => setShowFreezeConfirm(false)}
        onConfirm={handleToggleFreeze}
        title={selectedAcc?.status === 'Active' ? 'Freeze Savings Account' : 'Unfreeze Savings Account'}
        message={`Are you sure you want to ${
          selectedAcc?.status === 'Active'
            ? 'place a temporary debit/credit freeze on account'
            : 'remove freeze restrictions on account'
        } ${selectedAcc?.accountNumber} (${selectedAcc?.memberName})?`}
        confirmText={selectedAcc?.status === 'Active' ? 'Freeze Account' : 'Unfreeze Account'}
        variant={selectedAcc?.status === 'Active' ? 'warning' : 'success'}
      />
    </div>
  );
};
