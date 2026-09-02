import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { FiUserPlus, FiShield, FiCheck } from 'react-icons/fi';

interface AddAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddAdminModal: React.FC<AddAdminModalProps> = ({ isOpen, onClose }) => {
  const { createAdmin, campaigns } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('Campaign & Lead Operations Specialist');
  const [phone, setPhone] = useState('+1 (415) 555-0188');
  const [location, setLocation] = useState('San Francisco, CA');
  const [selectedCampaignIds, setSelectedCampaignIds] = useState<string[]>([]);
  const [avatar, setAvatar] = useState('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80');

  // Permissions
  const [canManageLeads, setCanManageLeads] = useState(true);
  const [canExportData, setCanExportData] = useState(true);
  const [canCreateInvoices, setCanCreateInvoices] = useState(false);

  const toggleCampaign = (id: string) => {
    setSelectedCampaignIds(prev => 
      prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    createAdmin({
      name,
      email,
      title,
      role: 'admin',
      avatar,
      phone,
      location,
      status: 'active',
      assignedCampaignIds: selectedCampaignIds,
      assignedLeadCount: 0,
      permissions: {
        canManageLeads,
        canViewAssignedCampaignsOnly: true,
        canExportData,
        canCreateInvoices,
        canEditSettings: false,
      }
    });

    onClose();
    setName('');
    setEmail('');
    setSelectedCampaignIds([]);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Admin Account"
      subtitle="Provision access, assign active Meta campaigns, and configure role scopes."
      maxWidth="2xl"
      icon={FiUserPlus}
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Full Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. David Vance"
              className="w-full px-3 py-2 rounded-lg bg-navy-800 border border-navy-700 text-slate-100 text-sm focus:outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Corporate Email Address *</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="david.vance@apexmeta.io"
              className="w-full px-3 py-2 rounded-lg bg-navy-800 border border-navy-700 text-slate-100 text-xs focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Job Title / Role Specialization</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Meta Ads Strategist"
              className="w-full px-3 py-2 rounded-lg bg-navy-800 border border-navy-700 text-slate-100 text-xs focus:outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Office Location</label>
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="San Francisco, CA"
              className="w-full px-3 py-2 rounded-lg bg-navy-800 border border-navy-700 text-slate-100 text-xs focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>

        {/* Assigned Meta Campaigns Selector */}
        <div className="p-3.5 rounded-xl bg-navy-850 border border-navy-700 space-y-2">
          <label className="block font-semibold text-slate-200">
            🎯 Assign Meta Ad Campaigns (Live Assets)
          </label>
          <p className="text-[11px] text-slate-400">
            Select which active campaigns this admin is responsible for monitoring.
          </p>

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

        {/* Permissions Toggles */}
        <div className="p-3.5 rounded-xl bg-navy-850 border border-navy-700 space-y-2">
          <label className="block font-semibold text-slate-200">
            🛡️ Assigned Role Permissions
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <label className="flex items-center gap-2 p-2 rounded bg-navy-900 border border-navy-750 cursor-pointer">
              <input
                type="checkbox"
                checked={canManageLeads}
                onChange={e => setCanManageLeads(e.target.checked)}
                className="rounded bg-navy-800 text-brand-600 focus:ring-0"
              />
              <span className="text-slate-300 text-[11px]">Manage Leads</span>
            </label>

            <label className="flex items-center gap-2 p-2 rounded bg-navy-900 border border-navy-750 cursor-pointer">
              <input
                type="checkbox"
                checked={canExportData}
                onChange={e => setCanExportData(e.target.checked)}
                className="rounded bg-navy-800 text-brand-600 focus:ring-0"
              />
              <span className="text-slate-300 text-[11px]">Export CSV Data</span>
            </label>

            <label className="flex items-center gap-2 p-2 rounded bg-navy-900 border border-navy-750 cursor-pointer">
              <input
                type="checkbox"
                checked={canCreateInvoices}
                onChange={e => setCanCreateInvoices(e.target.checked)}
                className="rounded bg-navy-800 text-brand-600 focus:ring-0"
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
            Provision Admin Account
          </button>
        </div>
      </form>
    </Modal>
  );
};
