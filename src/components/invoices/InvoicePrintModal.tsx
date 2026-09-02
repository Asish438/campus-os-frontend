import React from 'react';
import { Invoice } from '../../types';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { FiPrinter, FiCheckCircle, FiFileText } from 'react-icons/fi';

interface InvoicePrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: Invoice | null;
}

export const InvoicePrintModal: React.FC<InvoicePrintModalProps> = ({
  isOpen,
  onClose,
  invoice,
}) => {
  if (!invoice) return null;

  const handlePrint = () => {
    window.print();
  };

  const statusVariantMap = {
    paid: 'emerald' as const,
    pending: 'blue' as const,
    overdue: 'rose' as const,
    draft: 'slate' as const,
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Billing Dossier: ${invoice.invoiceNumber}`}
      subtitle={`Client Account: ${invoice.clientCompany}`}
      maxWidth="3xl"
      icon={FiFileText}
    >
      <div className="space-y-5 text-xs" id="printable-invoice">
        {/* Actions bar */}
        <div className="flex justify-end gap-2 pb-2.5 border-b border-navy-750 print:hidden">
          <button
            onClick={handlePrint}
            className="px-3 py-1.5 rounded-lg bg-navy-800 hover:bg-navy-750 text-slate-200 font-semibold border border-navy-700 flex items-center gap-1.5"
          >
            <FiPrinter className="w-3.5 h-3.5 text-sky-400" />
            <span>Print / Save PDF</span>
          </button>
        </div>

        {/* Invoice Body Card */}
        <div className="p-6 rounded-xl bg-navy-950 border border-navy-750 space-y-5 text-slate-200">
          {/* Top Header */}
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base text-slate-100 tracking-tight">MERIDIAN GROWTH DIGITAL</span>
                <Badge variant={statusVariantMap[invoice.status]} size="sm">
                  {invoice.status.toUpperCase()}
                </Badge>
              </div>
              <p className="text-slate-400 text-[11px] mt-0.5">Performance Media Buying & CAPI Solutions</p>
              <p className="text-slate-500 text-[11px]">500 Howard Street, Suite 1400, San Francisco, CA 94105 • Tax ID: 94-8201948</p>
            </div>

            <div className="text-right font-mono">
              <h2 className="text-lg font-bold text-sky-400">{invoice.invoiceNumber}</h2>
              <p className="text-slate-400 text-[11px] mt-0.5">Issued: {invoice.issueDate}</p>
              <p className="text-slate-400 text-[11px]">Due: {invoice.dueDate}</p>
            </div>
          </div>

          {/* Client Details */}
          <div className="grid grid-cols-2 gap-4 p-3.5 rounded-lg bg-navy-900 border border-navy-800">
            <div>
              <span className="text-[10px] uppercase font-semibold text-slate-400 block mb-1">Billed Client:</span>
              <p className="font-semibold text-slate-100">{invoice.clientName}</p>
              <p className="text-slate-300">{invoice.clientCompany}</p>
              <p className="text-slate-400 text-[11px]">{invoice.clientAddress}</p>
              <p className="text-sky-400 font-mono text-[11px] mt-0.5">{invoice.clientEmail}</p>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase font-semibold text-slate-400 block mb-1">Campaign Association:</span>
              <p className="font-medium text-slate-200">{invoice.campaignName || 'Retainer Deliverables'}</p>
              {invoice.paidDate && (
                <p className="text-emerald-400 text-[11px] mt-1 font-mono flex items-center justify-end gap-1">
                  <FiCheckCircle className="w-3 h-3" /> Paid on {invoice.paidDate}
                </p>
              )}
            </div>
          </div>

          {/* Line Items Table */}
          <div>
            <table className="w-full text-left text-xs">
              <thead className="bg-navy-900 text-slate-400 uppercase font-mono text-[10px] border-b border-navy-800">
                <tr>
                  <th className="py-2.5 px-3">Service Description</th>
                  <th className="py-2.5 px-3 text-center">Qty</th>
                  <th className="py-2.5 px-3 text-right">Unit Rate</th>
                  <th className="py-2.5 px-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-850 font-mono text-xs">
                {invoice.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-2.5 px-3 font-sans text-slate-200">{item.description}</td>
                    <td className="py-2.5 px-3 text-center text-slate-400">{item.quantity}</td>
                    <td className="py-2.5 px-3 text-right text-slate-300">₹{item.unitPrice.toLocaleString('en-IN')}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-slate-100">₹{item.amount.toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals Calculation */}
          <div className="flex justify-end pt-2 border-t border-navy-800">
            <div className="w-56 space-y-1 text-xs font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal:</span>
                <span>₹{invoice.amount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>GST (18%):</span>
                <span>₹{invoice.taxAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-100 pt-1.5 border-t border-navy-750">
                <span>Total Amount:</span>
                <span className="text-emerald-400">₹{invoice.totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {invoice.notes && (
            <div className="p-3 rounded-lg bg-navy-900 border border-navy-800 text-[11px] text-slate-400">
              <strong className="text-slate-300">Payment Instructions:</strong> {invoice.notes}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
