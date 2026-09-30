import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import KpiCard from '../../components/common/KpiCard';
import StatusBadge from '../../components/common/StatusBadge';
import Modal from '../../components/modals/Modal';
import {
  CreditCard,
  DollarSign,
  Download,
  CheckCircle2,
  Calendar,
  AlertCircle,
  FileText,
  ShieldCheck,
  Receipt
} from 'lucide-react';

export const FeesPage = () => {
  const { fees, recordFeePayment } = useCampus();

  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedFeeType, setSelectedFeeType] = useState('Hostel & Mess Charges');
  const [payAmount, setPayAmount] = useState(15000);
  const [paying, setPaying] = useState(false);
  const [activeReceipt, setActiveReceipt] = useState(null);

  const handlePayNow = () => {
    setPaying(true);
    setTimeout(() => {
      recordFeePayment(payAmount, selectedFeeType);
      setPaying(false);
      setPaymentModalOpen(false);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Semester Tuition & Campus Dues
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Monsoon 2026 Term • Accounts & Bursar Portal
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setPaymentModalOpen(true)}
            className="btn btn-primary btn-sm shadow-sm"
          >
            <CreditCard className="w-4 h-4" />
            Make Immediate Payment
          </button>
        </div>
      </div>

      {/* Top Financial KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total Billed"
          value={`₹${fees.total.toLocaleString('en-IN')}`}
          subtext="Full Academic Year"
          icon={DollarSign}
          variant="blue"
        />
        <KpiCard
          title="Total Paid"
          value={`₹${fees.paid.toLocaleString('en-IN')}`}
          subtext="Cleared through UPI/Bank"
          icon={CheckCircle2}
          variant="emerald"
        />
        <KpiCard
          title="Pending Balance"
          value={`₹${fees.pending.toLocaleString('en-IN')}`}
          subtext="Due before late penalty"
          icon={AlertCircle}
          variant="rose"
        />
        <KpiCard
          title="Final Due Date"
          value={fees.dueDate}
          subtext="15 Days Remaining"
          icon={Calendar}
          variant="amber"
        />
      </div>

      {/* Breakdown Matrix */}
      <div className="campus-card">
        <div className="campus-card-header">
          <div>
            <h3 className="campus-card-title">Fee Head Breakdown</h3>
            <p className="campus-card-subtitle">Itemized disbursement schedule across university departments</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="campus-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Total Dues</th>
                <th>Amount Paid</th>
                <th>Outstanding</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {fees.breakdown.map((item, idx) => (
                <tr key={idx}>
                  <td className="font-bold text-slate-800 dark:text-slate-200">
                    {item.type}
                  </td>
                  <td className="font-mono">₹{item.total.toLocaleString('en-IN')}</td>
                  <td className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                    ₹{item.paid.toLocaleString('en-IN')}
                  </td>
                  <td className="font-mono text-rose-600 dark:text-rose-400 font-bold">
                    ₹{item.pending.toLocaleString('en-IN')}
                  </td>
                  <td>
                    <StatusBadge status={item.status} size="sm" />
                  </td>
                  <td>
                    {item.pending > 0 ? (
                      <button
                        onClick={() => {
                          setSelectedFeeType(item.type);
                          setPayAmount(item.pending);
                          setPaymentModalOpen(true);
                        }}
                        className="btn btn-outline btn-sm text-[11px]"
                      >
                        Clear Dues
                      </button>
                    ) : (
                      <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Cleared
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment History Table */}
      <div className="campus-card">
        <div className="campus-card-header">
          <div>
            <h3 className="campus-card-title">Official Payment History & Tax Receipts</h3>
            <p className="campus-card-subtitle">Automated cryptographic receipts signed by Accounts & Bursar</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="campus-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Transaction ID</th>
                <th>Fee Head</th>
                <th>Payment Mode</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Receipt</th>
              </tr>
            </thead>
            <tbody>
              {fees.transactions.map((txn) => (
                <tr key={txn.id}>
                  <td className="text-slate-500 font-mono text-xs">{txn.date}</td>
                  <td className="font-mono font-bold text-blue-600 dark:text-blue-400 text-xs">
                    {txn.id}
                  </td>
                  <td className="font-semibold text-slate-800 dark:text-slate-200">{txn.feeType}</td>
                  <td className="text-xs text-slate-500">{txn.method}</td>
                  <td className="font-mono font-bold text-slate-900 dark:text-white">
                    ₹{txn.amount.toLocaleString('en-IN')}
                  </td>
                  <td>
                    <StatusBadge status={txn.status} size="sm" />
                  </td>
                  <td>
                    <button
                      onClick={() => setActiveReceipt(txn)}
                      className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                    >
                      <Receipt className="w-3.5 h-3.5" />
                      {txn.receiptNo}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Make Payment Modal */}
      <Modal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        title="Immediate Online Fee Payment"
        subtitle="Campus OS Instant Payment Gateway Simulator"
      >
        <div className="space-y-4 text-xs">
          <div>
            <label className="form-label">Select Fee Head</label>
            <select
              value={selectedFeeType}
              onChange={(e) => setSelectedFeeType(e.target.value)}
              className="form-select"
            >
              {fees.breakdown.map((b, i) => (
                <option key={i} value={b.type}>
                  {b.type} (Pending: ₹{b.pending.toLocaleString('en-IN')})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="form-label">Payment Amount (₹)</label>
            <input
              type="number"
              value={payAmount}
              onChange={(e) => setPayAmount(Number(e.target.value))}
              className="form-input text-base font-bold font-mono"
            />
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-slate-400">Selected Method:</span>
            <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-indigo-500" /> UPI Instant Verification (Demo)
            </span>
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3">
            <button
              onClick={() => setPaymentModalOpen(false)}
              className="btn btn-secondary btn-sm"
            >
              Cancel
            </button>
            <button
              onClick={handlePayNow}
              disabled={paying || payAmount <= 0}
              className="btn btn-primary btn-sm"
            >
              {paying ? 'Processing Payment...' : `Pay ₹${payAmount.toLocaleString('en-IN')} Now`}
            </button>
          </div>
        </div>
      </Modal>

      {/* View Digital Receipt Modal */}
      {activeReceipt && (
        <Modal
          isOpen={Boolean(activeReceipt)}
          onClose={() => setActiveReceipt(null)}
          title="Official University Fee Receipt"
          subtitle={`Receipt No: ${activeReceipt.receiptNo}`}
        >
          <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
            <div className="text-center pb-4 border-b border-slate-200 dark:border-slate-700">
              <h4 className="font-extrabold text-base text-slate-900 dark:text-white">CAMPUS OS UNIVERSITY</h4>
              <p className="text-slate-500">Finance & Accounts Bursar Division</p>
              <p className="font-mono text-[11px] text-emerald-600 font-bold mt-1">STATUS: PAYMENT VERIFIED</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Transaction ID:</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{activeReceipt.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Payment Date:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{activeReceipt.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Fee Purpose:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{activeReceipt.feeType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Payment Channel:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{activeReceipt.method}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <span className="font-bold text-slate-900 dark:text-white">Total Amount Paid:</span>
                <span className="text-lg font-extrabold text-emerald-600 font-mono">
                  ₹{activeReceipt.amount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-end">
              <button
                onClick={() => setActiveReceipt(null)}
                className="btn btn-secondary btn-sm"
              >
                Close Receipt
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default FeesPage;
