import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { User } from '../../types';
import { Modal } from '../common/Modal';
import { FiEdit2, FiCheck } from 'react-icons/fi';

interface EditAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  admin: User | null;
}

export const EditAdminModal: React.FC<EditAdminModalProps> = ({
  isOpen,
  onClose,
  admin,
}) => {
  const { updateAdmin, campaigns } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [selectedCampaignIds, setSelectedCampaignIds] = useState<string[]>([]);
  const [canManageLeads, setCanManageLeads] = useState(true);
  const [canExportData, setCanExportData] = useState(true);
  const [canCreateInvoices, setCanCreateInvoices] = useState(false);

  useEffect(() => {
    if (admin) {
      setName(admin.name);
      setEmail(admin.email);
      setTitle(admin.title);
      setPhone(admin.phone || '');
      setLocation(admin.location || '');
      setSelectedCampaignIds(admin.assignedCampaignIds || []);
      setCanManageLeads(admin.permissions.canManageLeads);
      setCanExportData(admin.permissions.canExportData);
      setCanCreateInvoices(admin.permissions.canCreateInvoices);
    }
  }, [admin]);

  if (!admin) return null;

  const toggleCampaign = (id: string) => {
    setSelectedCampaignIds(prev => 
      prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    updateAdmin(admin.id, {
      name,
      email,
      title,
      phone,
      location,
      assignedCampaignIds: selectedCampaignIds,
      permissions: {
        ...admin.permissions,
        canManageLeads,
        canExportData,
        canCreateInvoices,
      }
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Edit Admin: ${admin.name}`}
      subtitle="Modify campaign assignments, permissions, and profile parameters."
      maxWidth="2xl"
      icon={FiEdit2}
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-navy-800 border border-navy-700 text-slate-100 text-sm focus:outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-navy-800 border border-navy-700 text-slate-100 text-xs focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Job Title</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-navy-800 border border-navy-700 text-slate-100 text-xs focus:outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Location</label>
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-navy-800 border border-navy-700 text-slate-100 text-xs focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>

        {/* Assigned Meta Campaigns Selector */}
        <div className="p-3.5 rounded-xl bg-navy-850 border border-navy-700 space-y-2">
          <label className="block font-semibold text-slate-200">
            🎯 Assigned Meta Ad Campaigns
          </label>
          <div className="max-h-36 overflow-y-auto space-y-1.5 pt-1">
            {campaigns.map(camp => {
              const isChecked = selectedCampaignIds.includes(camp.id);
              return (
                <div
                  key={camp.id}
                  onClick={() => toggleCampaign(camp.id)}
                  className={`p-2 rounded-lg border flex items-center justify-between cursor-pointer transition-colors ${
                    isChecked
                      ? 'bg-brand-600/15 border-brand-500 text-white'
                      : 'bg-navy-900 border-navy-750 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <div>
                    <span className="font-semibold text-xs text-slate-200">{camp.name}</span>
                    <span className="text-[10px] text-slate-400 block font-mono">
                      {camp.code} • ₹{camp.dailyBudget.toLocaleString('en-IN')}/day
                    </span>
                  </div>
                  <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                    isChecked ? 'bg-brand-600 border-brand-500 text-white' : 'border-slate-600'
                  }`}>
                    {isChecked && <FiCheck className="w-3 h-3" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Permissions */}
        <div className="p-3.5 rounded-xl bg-navy-850 border border-navy-700 space-y-2">
          <label className="block font-semibold text-slate-200">
            🛡️ Role Permissions
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <label className="flex items-center gap-2 p-2 rounded bg-navy-900 border border-navy-750 cursor-pointer">
              <input
                type="checkbox"
                checked={canManageLeads}
                onChange={e => setCanManageLeads(e.target.checked)}
                className="rounded bg-navy-800 text-brand-600"
              />
              <span className="text-slate-300 text-[11px]">Manage Leads</span>
            </label>

            <label className="flex items-center gap-2 p-2 rounded bg-navy-900 border border-navy-750 cursor-pointer">
              <input
                type="checkbox"
                checked={canExportData}
                onChange={e => setCanExportData(e.target.checked)}
                className="rounded bg-navy-800 text-brand-600"
              />
              <span className="text-slate-300 text-[11px]">Export CSV Data</span>
            </label>

            <label className="flex items-center gap-2 p-2 rounded bg-navy-900 border border-navy-750 cursor-pointer">
              <input
                type="checkbox"
                checked={canCreateInvoices}
                onChange={e => setCanCreateInvoices(e.target.checked)}
                className="rounded bg-navy-800 text-brand-600"
              />
              <span className="text-slate-300 text-[11px]">Create Invoices</span>
            </label>
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
            Save Admin Changes
          </button>
        </div>
      </form>
    </Modal>
  );
};
