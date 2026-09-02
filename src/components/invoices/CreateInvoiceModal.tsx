import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { InvoiceStatus, InvoiceItem } from '../../types';
import { Modal } from '../common/Modal';
import { FiFileText, FiPlus, FiTrash2 } from 'react-icons/fi';

interface CreateInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateInvoiceModal: React.FC<CreateInvoiceModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { createInvoice, campaigns, users, currentUser } = useApp();

  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientCompany, setClientCompany] = useState('');
  const [clientAddress, setClientAddress] = useState('100 Main St, New York, NY 10001');
  const [campaignId, setCampaignId] = useState(campaigns[0]?.id || '');
  const [assignedAdminId, setAssignedAdminId] = useState(currentUser.id);
  const [status, setStatus] = useState<InvoiceStatus>('pending');
  const [dueDate, setDueDate] = useState('2025-08-30');
  const [notes, setNotes] = useState('Payment due within 15 days via Wire Transfer.');

  // Line items
  const [items, setItems] = useState<InvoiceItem[]>([
    {
      id: 'item_1',
      description: 'Meta Ads Management & Creative Optimization',
      quantity: 1,
      unitPrice: 85000,
      amount: 85000
    }
  ]);

  const addItem = () => {
    setItems(prev => [
      ...prev,
      {
        id: `item_${Date.now()}`,
        description: 'CAPI Dedicated Server Pipeline Setup',
        quantity: 1,
        unitPrice: 25000,
        amount: 25000
      }
    ]);
  };

  const removeItem = (id: string) => {
    if (items.length <= 1) return;
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const updateItem = (id: string, field: keyof InvoiceItem, val: any) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: val };
        if (field === 'quantity' || field === 'unitPrice') {
          updated.amount = updated.quantity * updated.unitPrice;
        }
        return updated;
      }
      return item;
    }));
  };

  const subtotal = items.reduce((acc, i) => acc + i.amount, 0);
  const taxAmount = Math.round(subtotal * 0.18);
  const totalAmount = subtotal + taxAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientCompany.trim()) return;

    const selectedCampaign = campaigns.find(c => c.id === campaignId);

    createInvoice({
      clientName,
      clientEmail: clientEmail || 'billing@client.com',
      clientCompany,
      clientAddress,
      campaignId,
      campaignName: selectedCampaign?.name || 'Retainer Services',
      assignedAdminId: assignedAdminId || currentUser.id,
      amount: subtotal,
      taxAmount,
      totalAmount,
      status,
      issueDate: new Date().toISOString().split('T')[0],
      dueDate,
      items,
      notes
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Generate Client Invoice"
      subtitle="Bill client for Meta Ad spend management, setup, and conversion retainers."
      maxWidth="3xl"
      icon={FiFileText}
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Client Full Name *</label>
            <input
              type="text"
              required
              value={clientName}
              onChange={e => setClientName(e.target.value)}
              placeholder="e.g. Rachel Adams"
              className="w-full px-3 py-2 rounded-lg bg-navy-800 border border-navy-700 text-slate-100 text-sm focus:outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Company Name *</label>
            <input
              type="text"
              required
              value={clientCompany}
              onChange={e => setClientCompany(e.target.value)}
              placeholder="e.g. Apex Biotech Solutions"
              className="w-full px-3 py-2 rounded-lg bg-navy-800 border border-navy-700 text-slate-100 text-sm focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Billing Email</label>
            <input
              type="email"
              value={clientEmail}
              onChange={e => setClientEmail(e.target.value)}
              placeholder="billing@apexbiotech.io"
              className="w-full px-3 py-2 rounded-lg bg-navy-800 border border-navy-700 text-slate-100 text-xs focus:outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Attributed Campaign</label>
            <select
              value={campaignId}
              onChange={e => setCampaignId(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-navy-800 border border-navy-700 text-slate-100 text-xs focus:outline-none focus:border-brand-500 truncate"
            >
              {campaigns.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Itemized Line Items */}
        <div className="p-3.5 rounded-xl bg-navy-850 border border-navy-700 space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-slate-200 uppercase tracking-wider text-[10px]">
              Itemized Deliverables & Service Fees
            </span>
            <button
              type="button"
              onClick={addItem}
              className="px-2.5 py-1 rounded bg-navy-800 hover:bg-brand-600 text-slate-300 hover:text-white border border-navy-750 font-semibold text-[11px] flex items-center gap-1 transition-colors"
            >
              <FiPlus className="w-3 h-3" />
              <span>Add Line Item</span>
            </button>
          </div>

          <div className="space-y-2">
            {items.map((item, idx) => (
              <div key={item.id} className="grid grid-cols-12 gap-2 items-center">
                <div className="col-span-6">
                  <input
                    type="text"
                    value={item.description}
                    onChange={e => updateItem(item.id, 'description', e.target.value)}
                    placeholder="Description of service..."
                    className="w-full px-2.5 py-1.5 rounded bg-navy-900 border border-navy-750 text-slate-200 text-xs"
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={e => updateItem(item.id, 'quantity', Number(e.target.value))}
                    className="w-full px-2 py-1.5 rounded bg-navy-900 border border-navy-750 text-slate-200 text-xs text-center font-mono"
                  />
                </div>
                <div className="col-span-3">
                  <input
                    type="number"
                    min="0"
                    value={item.unitPrice}
                    onChange={e => updateItem(item.id, 'unitPrice', Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded bg-navy-900 border border-navy-750 text-slate-200 text-xs text-right font-mono"
                  />
                </div>
                <div className="col-span-1 text-center">
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="text-slate-500 hover:text-rose-400 p-1"
                  >
                    <FiTrash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-navy-750 flex justify-end">
            <div className="text-right font-mono text-xs space-y-1">
              <p className="text-slate-400">Subtotal: ₹{subtotal.toLocaleString('en-IN')}</p>
              <p className="text-slate-400">GST (18%): ₹{taxAmount.toLocaleString('en-IN')}</p>
              <p className="text-emerald-400 font-bold text-sm">Total: ₹{totalAmount.toLocaleString('en-IN')}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Invoice Status</label>
            <select
              value={status}
              onChange={e => setStatus(e.target.value as InvoiceStatus)}
              className="w-full px-3 py-2 rounded-lg bg-navy-800 border border-navy-700 text-slate-100 text-xs focus:outline-none focus:border-brand-500"
            >
              <option value="pending">Pending Payment</option>
              <option value="paid">Paid in Full</option>
              <option value="draft">Draft</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-navy-800 border border-navy-700 text-slate-100 text-xs focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-3 border-t border-navy-750">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-navy-800 hover:bg-navy-750 text-slate-300 text-xs font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-md"
          >
            Generate & Issue Invoice
          </button>
        </div>
      </form>
    </Modal>
  );
};
