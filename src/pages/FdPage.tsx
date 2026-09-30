import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Landmark, 
  CheckCircle, 
  AlertTriangle, 
  Coins, 
  Search, 
  Eye, 
  RefreshCw, 
  XCircle, 
  Printer, 
  Receipt 
} from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { StatCard } from '../components/common/StatCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { Modal } from '../components/common/Modal';
import { ReceiptModal } from '../components/common/ReceiptModal';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { Pagination } from '../components/common/Pagination';
import { EmptyState } from '../components/common/EmptyState';
import { fdService } from '../services/apiService';
import { FDAccount } from '../types';
import { formatINR } from '../mock/mockData';
import { useToast } from '../context/ToastContext';

export const FdPage: React.FC = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [fds, setFds] = useState<FDAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Modals state
  const [selectedFd, setSelectedFd] = useState<FDAccount | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [receiptData, setReceiptData] = useState<any>(null);

  // Renew / Close confirmations
  const [showRenewConfirm, setShowRenewConfirm] = useState(false);
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fdService.getAll();
      setFds(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Stats
  const totalFds = fds.length;
  const activeFds = fds.filter(f => f.status === 'Active').length;
  const maturingSoonFds = fds.filter(f => f.status === 'Maturing Soon').length;
  const maturedFds = fds.filter(f => f.status === 'Matured').length;

  // Filter logic
  const filtered = useMemo(() => {
    return fds.filter(f => {
      const matchesStatus = statusFilter === 'All' || f.status === statusFilter;
      const matchesSearch = 
        f.fdNumber.toLowerCase().includes(search.toLowerCase()) ||
        f.memberName.toLowerCase().includes(search.toLowerCase()) ||
        f.memberId.toLowerCase().includes(search.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [fds, statusFilter, search]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleRenew = async () => {
    if (!selectedFd) return;
    try {
      await fdService.renew(selectedFd.fdNumber);
      addToast({
        type: 'success',
        title: 'FD Renewed',
        message: `Fixed deposit ${selectedFd.fdNumber} renewed for another tenure.`
      });
      setShowRenewConfirm(false);
      loadData();
    } catch {
      addToast({ type: 'error', message: 'Failed to renew FD.' });
    }
  };

  const handleClose = async () => {
    if (!selectedFd) return;
    try {
      await fdService.close(selectedFd.fdNumber);
      addToast({
        type: 'info',
        title: 'FD Closed',
        message: `Fixed deposit ${selectedFd.fdNumber} closed and maturity funds credited to savings.`
      });
      setShowCloseConfirm(false);
      loadData();
    } catch {
      addToast({ type: 'error', message: 'Failed to close FD.' });
    }
  };

  const openReceipt = (fd: FDAccount) => {
    setReceiptData({
      receiptNo: `CERT-${fd.fdNumber}`,
      date: fd.startDate,
      memberName: fd.memberName,
      memberId: fd.memberId,
      type: `Fixed Deposit Certificate (${fd.tenureMonths} Mo @ ${fd.interestRate}%)`,
      amount: fd.principalAmount,
      paymentMode: 'Bank Transfer',
      referenceNo: `FD-AC-${fd.fdNumber}`,
      collectedBy: 'Authorized FD Registrar',
      notes: `Expected Maturity Amount: ₹${fd.maturityAmount.toLocaleString('en-IN')} on ${fd.maturityDate}`
    });
    setShowReceiptModal(true);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Fixed Deposit Management"
        subtitle="Manage member term deposits, interest certificates, maturity processing and roll-over renewals."
        breadcrumbs={[
          { label: 'Dashboard', url: '/dashboard' },
          { label: 'FD Management' }
        ]}
      />

      {/* 4 Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total FD Accounts"
          value={totalFds}
          icon={<Landmark className="w-5 h-5" />}
          color="blue"
        />
        <StatCard
          title="Active FD"
          value={activeFds}
          icon={<CheckCircle className="w-5 h-5" />}
          color="emerald"
        />
        <StatCard
          title="Maturing Soon"
          value={maturingSoonFds}
          icon={<AlertTriangle className="w-5 h-5" />}
          color="amber"
          onClick={() => setStatusFilter('Maturing Soon')}
        />
        <StatCard
          title="Matured FD"
          value={maturedFds}
          icon={<Coins className="w-5 h-5" />}
          color="purple"
          onClick={() => setStatusFilter('Matured')}
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
            placeholder="Search FD number, member name or ID..."
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
            <option value="Maturing Soon">Maturing Soon</option>
            <option value="Matured">Matured</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      {/* FD Accounts Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <EmptyState
            title="No fixed deposit records found"
            description="No FD accounts match your specified filter criteria."
          />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-750 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-100 dark:border-slate-700/80">
                  <tr>
                    <th className="px-4 py-3">FD Number</th>
                    <th className="px-4 py-3">Member</th>
                    <th className="px-4 py-3">Principal Amount</th>
                    <th className="px-4 py-3">Interest Rate</th>
                    <th className="px-4 py-3">Tenure</th>
                    <th className="px-4 py-3">Start Date</th>
                    <th className="px-4 py-3">Maturity Date</th>
                    <th className="px-4 py-3">Maturity Amount</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                  {paginated.map(fd => (
                    <tr key={fd.fdNumber} className="hover:bg-slate-50/80 dark:hover:bg-slate-750/50 transition-colors">
                      <td className="px-4 py-3.5 font-mono font-bold text-blue-600 dark:text-blue-400">
                        {fd.fdNumber}
                      </td>
                      <td className="px-4 py-3.5">
                        <div 
                          onClick={() => navigate(`/members/${fd.memberId}`)}
                          className="font-semibold text-slate-900 dark:text-white hover:text-blue-600 cursor-pointer"
                        >
                          {fd.memberName}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          ID: {fd.memberId}
                        </div>
                      </td>
                      <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white">
                        {formatINR(fd.principalAmount)}
                      </td>
                      <td className="px-4 py-3.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                        {fd.interestRate}% p.a.
                      </td>
                      <td className="px-4 py-3.5 text-slate-500 dark:text-slate-400">
                        {fd.tenureMonths} Months
                      </td>
                      <td className="px-4 py-3.5 text-slate-500 dark:text-slate-400">
                        {fd.startDate}
                      </td>
                      <td className="px-4 py-3.5 text-slate-500 dark:text-slate-400">
                        {fd.maturityDate}
                      </td>
                      <td className="px-4 py-3.5 font-bold text-emerald-600 dark:text-emerald-400">
                        {formatINR(fd.maturityAmount)}
                      </td>
                      <td className="px-4 py-3.5">
                        <StatusBadge status={fd.status} />
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => {
                              setSelectedFd(fd);
                              setShowDetailsModal(true);
                            }}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => {
                              setSelectedFd(fd);
                              setShowRenewConfirm(true);
                            }}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors"
                            title="Renew FD"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => {
                              setSelectedFd(fd);
                              setShowCloseConfirm(true);
                            }}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                            title="Close / Settle FD"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => openReceipt(fd)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/40 transition-colors"
                            title="Print FD Certificate"
                          >
                            <Printer className="w-4 h-4" />
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

      {/* FD Details Modal */}
      {selectedFd && (
        <Modal
          isOpen={showDetailsModal}
          onClose={() => setShowDetailsModal(false)}
          title={`Fixed Deposit Certificate: ${selectedFd.fdNumber}`}
          subtitle={`Depositor: ${selectedFd.memberName} (${selectedFd.memberId})`}
          size="md"
          footer={
            <div className="flex items-center justify-between w-full">
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  openReceipt(selectedFd);
                }}
                className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Certificate</span>
              </button>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-blue-600 text-white"
              >
                Close
              </button>
            </div>
          }
        >
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-700 text-white text-center">
              <span className="text-xs uppercase tracking-wider opacity-80">Principal Investment</span>
              <div className="text-3xl font-extrabold mt-1">{formatINR(selectedFd.principalAmount)}</div>
              <div className="mt-2 text-xs opacity-90">
                Interest Rate: <strong>{selectedFd.interestRate}% p.a. Compounded Quarterly</strong>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <div>
                <span className="text-slate-400 block">Tenure</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedFd.tenureMonths} Months</span>
              </div>
              <div>
                <span className="text-slate-400 block">Deposit Status</span>
                <StatusBadge status={selectedFd.status} />
              </div>
              <div>
                <span className="text-slate-400 block">Booking Date</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedFd.startDate}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Maturity Date</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedFd.maturityDate}</span>
              </div>
              <div className="col-span-2 pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <span className="font-bold text-slate-700 dark:text-slate-300">Expected Maturity Payout</span>
                <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
                  {formatINR(selectedFd.maturityAmount)}
                </span>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Confirmation for Renew */}
      <ConfirmDialog
        isOpen={showRenewConfirm}
        onClose={() => setShowRenewConfirm(false)}
        onConfirm={handleRenew}
        title="Renew Fixed Deposit"
        message={`Renew FD ${selectedFd?.fdNumber} for ${selectedFd?.memberName} for another term of ${selectedFd?.tenureMonths} months at prevailing interest rate?`}
        confirmText="Confirm Renewal"
        variant="success"
      />

      {/* Confirmation for Close */}
      <ConfirmDialog
        isOpen={showCloseConfirm}
        onClose={() => setShowCloseConfirm(false)}
        onConfirm={handleClose}
        title="Close Fixed Deposit"
        message={`Settle and close FD ${selectedFd?.fdNumber}? Principal plus accrued interest (${formatINR(selectedFd?.maturityAmount || 0)}) will be credited to member savings.`}
        confirmText="Close & Disburse"
        variant="danger"
      />

      {/* Printable Receipt Modal */}
      <ReceiptModal
        isOpen={showReceiptModal}
        onClose={() => setShowReceiptModal(false)}
        data={receiptData}
      />
    </div>
  );
};
