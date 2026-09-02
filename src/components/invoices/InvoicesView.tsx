import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Invoice, InvoiceStatus } from '../../types';
import { StatCard } from '../common/StatCard';
import { Badge } from '../common/Badge';
import { CreateInvoiceModal } from './CreateInvoiceModal';
import { InvoicePrintModal } from './InvoicePrintModal';
import { 
  FiFileText, 
  FiPlus, 
  FiCheckCircle, 
  FiClock, 
  FiAlertCircle, 
  FiSearch, 
  FiPrinter, 
  FiTrash2 
} from 'react-icons/fi';
import { FaRupeeSign } from 'react-icons/fa';

export const InvoicesView: React.FC = () => {
  const { 
    filteredInvoices, 
    currentUser, 
    updateInvoiceStatus, 
    deleteInvoice 
  } = useApp();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedPrintInvoice, setSelectedPrintInvoice] = useState<Invoice | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Financial aggregates
  const totalInvoiced = useMemo(() => 
    filteredInvoices.reduce((acc, inv) => acc + inv.totalAmount, 0), [filteredInvoices]);

  const paidAmount = useMemo(() => 
    filteredInvoices
      .filter(inv => inv.status === 'paid')
      .reduce((acc, inv) => acc + inv.totalAmount, 0), [filteredInvoices]);

  const pendingAmount = useMemo(() => 
    filteredInvoices
      .filter(inv => inv.status === 'pending')
      .reduce((acc, inv) => acc + inv.totalAmount, 0), [filteredInvoices]);

  const overdueAmount = useMemo(() => 
    filteredInvoices
      .filter(inv => inv.status === 'overdue')
      .reduce((acc, inv) => acc + inv.totalAmount, 0), [filteredInvoices]);

  // Filtered list
  const displayedInvoices = useMemo(() => {
    return filteredInvoices.filter(inv => {
      if (statusFilter !== 'all' && inv.status !== statusFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches = 
          inv.invoiceNumber.toLowerCase().includes(q) ||
          inv.clientName.toLowerCase().includes(q) ||
          inv.clientCompany.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [filteredInvoices, statusFilter, searchQuery]);

  return (
    <div className="space-y-4 pb-12">
      {/* Top Header */}
      <div className="p-4 rounded-xl bg-navy-900 border border-navy-750 shadow-panel flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-100">Invoicing & Retainer Ledger</h2>
            <Badge variant="blue" size="sm">{filteredInvoices.length} Statements</Badge>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Client retainer billing, media management fee statements, and payment tracking.
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-subtle transition-colors self-start sm:self-auto shrink-0"
        >
          <FiPlus className="w-3.5 h-3.5" />
          <span>Generate Client Statement</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <StatCard
          title="Total Billed Ledger"
          value={`₹${totalInvoiced.toLocaleString('en-IN')}`}
          trend={{ value: '18.4%', isPositive: true }}
          subtitle="Cumulative ledger billed"
          icon={FaRupeeSign}
        />

        <StatCard
          title="Settled Payments"
          value={`₹${paidAmount.toLocaleString('en-IN')}`}
          trend={{ value: 'Verified', isPositive: true }}
          subtitle="Collected via Wire / UPI / NetBanking"
          icon={FiCheckCircle}
        />

        <StatCard
          title="Pending Receivables"
          value={`₹${pendingAmount.toLocaleString('en-IN')}`}
          subtitle="Net 15/30 payment terms"
          icon={FiClock}
        />

        <StatCard
          title="Overdue Balance"
          value={`₹${overdueAmount.toLocaleString('en-IN')}`}
          subtitle="Requires follow-up"
          icon={FiAlertCircle}
        />
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-navy-900 border border-navy-750 p-3 rounded-xl shadow-panel text-xs">
        {/* Status Filter */}
        <div className="flex items-center gap-1 p-1 bg-navy-950 rounded-lg border border-navy-800 self-start sm:self-auto">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1 rounded font-medium transition-colors ${
              statusFilter === 'all' ? 'bg-navy-800 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Statements
          </button>
          <button
            onClick={() => setStatusFilter('paid')}
            className={`px-2.5 py-1 rounded font-medium transition-colors ${
              statusFilter === 'paid' ? 'bg-emerald-950 text-emerald-300 font-semibold' : 'text-emerald-400/90 hover:text-emerald-300'
            }`}
          >
            Paid
          </button>
          <button
            onClick={() => setStatusFilter('pending')}
            className={`px-2.5 py-1 rounded font-medium transition-colors ${
              statusFilter === 'pending' ? 'bg-blue-950 text-sky-300 font-semibold' : 'text-sky-400/90 hover:text-sky-300'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setStatusFilter('overdue')}
            className={`px-2.5 py-1 rounded font-medium transition-colors ${
              statusFilter === 'overdue' ? 'bg-rose-950 text-rose-300 font-semibold' : 'text-rose-400/90 hover:text-rose-300'
            }`}
          >
            Overdue
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <FiSearch className="absolute left-3 top-2.5 text-slate-400 w-3.5 h-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search statement #, client..."
            className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-navy-800 border border-navy-700 text-slate-100 text-xs focus:outline-none focus:border-brand-500"
          />
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-navy-900 border border-navy-750 rounded-xl overflow-hidden shadow-panel">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-navy-950 text-slate-400 uppercase font-mono text-[10px] border-b border-navy-750">
              <tr>
                <th className="py-3 px-4">Statement #</th>
                <th className="py-3 px-4">Client & Organization</th>
                <th className="py-3 px-4">Campaign Association</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-800">
              {displayedInvoices.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-slate-400">
                    <FiFileText className="w-6 h-6 text-slate-600 mx-auto mb-1.5" />
                    <p className="font-semibold text-slate-300">No invoices match your filter</p>
                  </td>
                </tr>
              ) : (
                displayedInvoices.map(inv => {
                  return (
                    <tr key={inv.id} className="hover:bg-navy-800/50 transition-colors group">
                      {/* Invoice # */}
                      <td className="py-3 px-4 font-mono font-semibold text-sky-400">
                        {inv.invoiceNumber}
                      </td>

                      {/* Client */}
                      <td className="py-3 px-4">
                        <p className="font-semibold text-slate-100">{inv.clientCompany}</p>
                        <p className="text-[11px] text-slate-400">{inv.clientName}</p>
                      </td>

                      {/* Campaign */}
                      <td className="py-3 px-4">
                        <span className="text-slate-200 line-clamp-1 max-w-[200px]">
                          {inv.campaignName || 'Retainer Services'}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {inv.items.length} line items
                        </span>
                      </td>

                      {/* Amount */}
                      <td className="py-3 px-4 font-mono">
                        <span className="font-semibold text-slate-100 text-xs">
                          ₹{inv.totalAmount.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] text-slate-400 block">
                          Tax: ₹{inv.taxAmount.toLocaleString('en-IN')}
                        </span>
                      </td>

                      {/* Status Selector */}
                      <td className="py-3 px-4">
                        <select
                          value={inv.status}
                          onChange={e => updateInvoiceStatus(inv.id, e.target.value as InvoiceStatus)}
                          className={`px-2 py-0.5 rounded text-[11px] font-semibold uppercase border bg-navy-850 cursor-pointer focus:outline-none ${
                            inv.status === 'paid'
                              ? 'text-emerald-400 border-emerald-800/60'
                              : inv.status === 'pending'
                              ? 'text-sky-400 border-blue-800/60'
                              : inv.status === 'overdue'
                              ? 'text-rose-400 border-rose-800/60'
                              : 'text-slate-400 border-slate-700'
                          }`}
                        >
                          <option value="paid">PAID</option>
                          <option value="pending">PENDING</option>
                          <option value="overdue">OVERDUE</option>
                          <option value="draft">DRAFT</option>
                        </select>
                      </td>

                      {/* Due Date */}
                      <td className="py-3 px-4 font-mono text-[11px] text-slate-300">
                        {inv.dueDate}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => setSelectedPrintInvoice(inv)}
                            className="p-1 rounded bg-navy-800 hover:bg-brand-600 text-slate-300 hover:text-white border border-navy-700 transition-colors"
                            title="View Printable Statement"
                          >
                            <FiPrinter className="w-3.5 h-3.5" />
                          </button>

                          {currentUser.role === 'super_admin' && (
                            <button
                              onClick={() => deleteInvoice(inv.id)}
                              className="p-1 rounded bg-navy-800 hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 border border-navy-700 transition-colors"
                              title="Delete Invoice"
                            >
                              <FiTrash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <CreateInvoiceModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />

      <InvoicePrintModal
        isOpen={Boolean(selectedPrintInvoice)}
        onClose={() => setSelectedPrintInvoice(null)}
        invoice={selectedPrintInvoice}
      />
    </div>
  );
};
