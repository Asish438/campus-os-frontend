import React from 'react';
import { Modal } from './Modal';
import { Printer, Download, CheckCircle } from 'lucide-react';
import { formatINR } from '../../mock/mockData';

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    receiptNo: string;
    date: string;
    memberName: string;
    memberId: string;
    type: string;
    amount: number;
    paymentMode: string;
    referenceNo?: string;
    collectedBy?: string;
    notes?: string;
  } | null;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  isOpen,
  onClose,
  data
}) => {
  if (!data) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Transaction Receipt"
      subtitle="Official Payment Voucher & Acknowledgement"
      size="md"
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2 text-sm font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            Print Receipt
          </button>
        </>
      }
    >
      <div className="printable-receipt p-4 border border-dashed border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50/50 dark:bg-slate-900/40 text-slate-900 dark:text-slate-100 space-y-4">
        {/* Header */}
        <div className="text-center pb-3 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-center gap-2 mb-1">
            <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
              B
            </div>
            <span className="font-bold text-base tracking-tight">BankAdmin Co-operative Bank</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Head Office: Plot 142, Janpath, Sahid Nagar, Bhubaneswar, Odisha
          </p>
          <div className="mt-2 inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
            <CheckCircle className="w-3.5 h-3.5" />
            PAYMENT ACKNOWLEDGEMENT
          </div>
        </div>

        {/* Voucher Info */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-slate-500 dark:text-slate-400 block">Receipt Number</span>
            <span className="font-mono font-semibold">{data.receiptNo}</span>
          </div>
          <div className="text-right">
            <span className="text-slate-500 dark:text-slate-400 block">Date & Time</span>
            <span className="font-medium">{data.date}</span>
          </div>
          <div>
            <span className="text-slate-500 dark:text-slate-400 block">Member Details</span>
            <span className="font-semibold">{data.memberName}</span>
            <span className="text-slate-500 block">ID: {data.memberId}</span>
          </div>
          <div className="text-right">
            <span className="text-slate-500 dark:text-slate-400 block">Payment Mode</span>
            <span className="font-semibold">{data.paymentMode}</span>
            {data.referenceNo && <span className="text-slate-500 block font-mono text-[10px]">{data.referenceNo}</span>}
          </div>
        </div>

        {/* Amount Box */}
        <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
          <div className="text-xs text-slate-500 dark:text-slate-400">Transaction Purpose</div>
          <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">{data.type}</div>
          <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
            {formatINR(data.amount)}
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-2 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between border-t border-slate-200 dark:border-slate-700">
          <span>Collected By: {data.collectedBy || 'Authorized Cashier'}</span>
          <span>Computer Generated Receipt</span>
        </div>
      </div>
    </Modal>
  );
};
