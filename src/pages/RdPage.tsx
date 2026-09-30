import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Repeat, 
  CheckCircle, 
  Clock, 
  Calendar, 
  Search, 
  Eye, 
  Coins, 
  TrendingUp,
  FileCheck
} from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { StatCard } from '../components/common/StatCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { Modal } from '../components/common/Modal';
import { Pagination } from '../components/common/Pagination';
import { EmptyState } from '../components/common/EmptyState';
import { rdService } from '../services/apiService';
import { RDAccount } from '../types';
import { formatINR } from '../mock/mockData';

export const RdPage: React.FC = () => {
  const navigate = useNavigate();
  const [rds, setRds] = useState<RDAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Selected RD for details modal
  const [selectedRd, setSelectedRd] = useState<RDAccount | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await rdService.getAll();
        setRds(data);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Stats
  const totalRds = rds.length;
  const activeRds = rds.filter(r => r.status === 'Active').length;
  const maturedRds = rds.filter(r => r.status === 'Matured').length;
  const pendingInstallments = rds.reduce((sum, r) => sum + (r.totalInstallments - r.paidInstallments), 0);

  // Filter
  const filtered = useMemo(() => {
    return rds.filter(r => {
      const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
      const matchesSearch = 
        r.rdNumber.toLowerCase().includes(search.toLowerCase()) ||
        r.memberName.toLowerCase().includes(search.toLowerCase()) ||
        r.memberId.toLowerCase().includes(search.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [rds, statusFilter, search]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Recurring Deposit Management"
        subtitle="Track recurring monthly deposit accounts, maturity schedules, and installment arrears."
        breadcrumbs={[
          { label: 'Dashboard', url: '/dashboard' },
          { label: 'RD Management' }
        ]}
      />

      {/* 4 Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total RD Accounts"
          value={totalRds}
          icon={<Repeat className="w-5 h-5" />}
          color="blue"
        />
        <StatCard
          title="Active RD"
          value={activeRds}
          icon={<CheckCircle className="w-5 h-5" />}
          color="emerald"
        />
        <StatCard
          title="Matured RD"
          value={maturedRds}
          icon={<Coins className="w-5 h-5" />}
          color="purple"
          onClick={() => setStatusFilter('Matured')}
        />
        <StatCard
          title="Pending Installments"
          value={pendingInstallments}
          icon={<Clock className="w-5 h-5" />}
          color="amber"
        />
      </div>

      {/* Filter and Search */}
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
            placeholder="Search RD number, member name or member ID..."
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
            <option value="Pending">Pending</option>
            <option value="Matured">Matured</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      {/* RD Accounts Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <EmptyState
            title="No RD accounts found"
            description="No recurring deposit records match the specified search query or filter."
          />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-750 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-100 dark:border-slate-700/80">
                  <tr>
                    <th className="px-4 py-3">RD Number</th>
                    <th className="px-4 py-3">Member</th>
                    <th className="px-4 py-3">Installment</th>
                    <th className="px-4 py-3">Frequency</th>
                    <th className="px-4 py-3">Rate</th>
                    <th className="px-4 py-3">Start Date</th>
                    <th className="px-4 py-3">Maturity Date</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                  {paginated.map(rd => (
                    <tr key={rd.rdNumber} className="hover:bg-slate-50/80 dark:hover:bg-slate-750/50 transition-colors">
                      <td className="px-4 py-3.5 font-mono font-bold text-blue-600 dark:text-blue-400">
                        {rd.rdNumber}
                      </td>
                      <td className="px-4 py-3.5">
                        <div 
                          onClick={() => navigate(`/members/${rd.memberId}`)}
                          className="font-semibold text-slate-900 dark:text-white hover:text-blue-600 cursor-pointer"
                        >
                          {rd.memberName}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          ID: {rd.memberId}
                        </div>
                      </td>
                      <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white">
                        {formatINR(rd.installmentAmount)}
                      </td>
                      <td className="px-4 py-3.5 text-slate-500 dark:text-slate-400">
                        {rd.frequency}
                      </td>
                      <td className="px-4 py-3.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                        {rd.interestRate}% p.a.
                      </td>
                      <td className="px-4 py-3.5 text-slate-500 dark:text-slate-400">
                        {rd.startDate}
                      </td>
                      <td className="px-4 py-3.5 text-slate-500 dark:text-slate-400">
                        {rd.maturityDate}
                      </td>
                      <td className="px-4 py-3.5">
                        <StatusBadge status={rd.status} />
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <button
                          onClick={() => {
                            setSelectedRd(rd);
                            setShowDetailsModal(true);
                          }}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors"
                          title="View Schedule & Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
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

      {/* RD Details & Schedule Modal */}
      {selectedRd && (
        <Modal
          isOpen={showDetailsModal}
          onClose={() => setShowDetailsModal(false)}
          title={`Recurring Deposit: ${selectedRd.rdNumber}`}
          subtitle={`Depositor: ${selectedRd.memberName} (${selectedRd.memberId})`}
          size="lg"
          footer={
            <button
              onClick={() => setShowDetailsModal(false)}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700"
            >
              Close
            </button>
          }
        >
          <div className="space-y-6">
            {/* Meta summary grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs">
              <div>
                <span className="text-slate-400 block">Monthly Installment</span>
                <span className="font-bold text-sm text-slate-900 dark:text-white">
                  {formatINR(selectedRd.installmentAmount)}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Tenure</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {selectedRd.tenureMonths} Months ({selectedRd.frequency})
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Interest Rate</span>
                <span className="font-bold text-emerald-600">
                  {selectedRd.interestRate}% p.a.
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Expected Maturity</span>
                <span className="font-bold text-sm text-blue-600 dark:text-blue-400">
                  {formatINR(selectedRd.maturityAmount)}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Start Date</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">{selectedRd.startDate}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Maturity Date</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">{selectedRd.maturityDate}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Paid Installments</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {selectedRd.paidInstallments} of {selectedRd.totalInstallments}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Account Status</span>
                <StatusBadge status={selectedRd.status} />
              </div>
            </div>

            {/* Installment Schedule Table */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Installment Payment Schedule
              </h4>
              <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden max-h-60 overflow-y-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-750 text-slate-500 sticky top-0 font-semibold border-b border-slate-200 dark:border-slate-700">
                    <tr>
                      <th className="px-3 py-2">Installment No.</th>
                      <th className="px-3 py-2">Due Date</th>
                      <th className="px-3 py-2">Amount</th>
                      <th className="px-3 py-2">Paid Date</th>
                      <th className="px-3 py-2 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                    {selectedRd.schedule.map(inst => (
                      <tr key={inst.installmentNo}>
                        <td className="px-3 py-2 font-mono font-semibold">#{inst.installmentNo}</td>
                        <td className="px-3 py-2 text-slate-500">{inst.dueDate}</td>
                        <td className="px-3 py-2 font-bold">{formatINR(inst.amount)}</td>
                        <td className="px-3 py-2 text-slate-500">{inst.paidDate || '—'}</td>
                        <td className="px-3 py-2 text-right">
                          <StatusBadge status={inst.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
