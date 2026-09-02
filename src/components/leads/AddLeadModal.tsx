import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LeadSource, LeadStatus } from '../../types';
import { Modal } from '../common/Modal';
import { FiTarget } from 'react-icons/fi';

interface AddLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddLeadModal: React.FC<AddLeadModalProps> = ({ isOpen, onClose }) => {
  const { addLead, campaigns, users, currentUser } = useApp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [source, setSource] = useState<LeadSource>('Instagram Lead Form');
  const [campaignId, setCampaignId] = useState(campaigns[0]?.id || '');
  const [assignedAdminId, setAssignedAdminId] = useState(currentUser.id);
  const [estimatedValue, setEstimatedValue] = useState(150000);
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) return;

    const selectedCampaign = campaigns.find(c => c.id === campaignId);

    addLead({
      fullName,
      email,
      phone: phone || '+1 (555) 019-8201',
      company: company || 'Enterprise Client',
      source,
      campaignId: campaignId || 'cmp_1',
      campaignName: selectedCampaign?.name || 'Manual Inbound Entry',
      assignedAdminId: assignedAdminId || currentUser.id,
      status: 'new',
      estimatedValue: Number(estimatedValue),
      score: 85,
      pipelineCategory: 'active',
      followUpRequired: true,
      nextFollowUpAction: 'Conduct Inbound Discovery Call & Needs Assessment',
      nextFollowUpDate: 'Today',
      notes: notes || 'Lead captured via manual CRM entry'
    });

    onClose();
    // Reset
    setFullName('');
    setEmail('');
    setPhone('');
    setCompany('');
    setNotes('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Capture Inbound Lead"
      subtitle="Register a new prospect into the real-time Meta attribution pipeline."
      maxWidth="lg"
      icon={FiTarget}
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block font-semibold text-slate-300 mb-1">Full Name *</label>
          <input
            type="text"
            required
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            placeholder="e.g. Jordan Mitchell"
            className="w-full px-3 py-2 rounded-lg bg-navy-800 border border-navy-700 text-slate-100 text-sm focus:outline-none focus:border-brand-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Email Address *</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="jordan@company.com"
              className="w-full px-3 py-2 rounded-lg bg-navy-800 border border-navy-700 text-slate-100 text-xs focus:outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="+1 (415) 555-0199"
              className="w-full px-3 py-2 rounded-lg bg-navy-800 border border-navy-700 text-slate-100 text-xs focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Company Name</label>
            <input
              type="text"
              value={company}
              onChange={e => setCompany(e.target.value)}
              placeholder="e.g. Acme Innovations"
              className="w-full px-3 py-2 rounded-lg bg-navy-800 border border-navy-700 text-slate-100 text-xs focus:outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Est. Deal Value (₹)</label>
            <input
              type="number"
              value={estimatedValue}
              onChange={e => setEstimatedValue(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg bg-navy-800 border border-navy-700 text-slate-100 text-xs font-mono focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Lead Source</label>
            <select
              value={source}
              onChange={e => setSource(e.target.value as LeadSource)}
              className="w-full px-3 py-2 rounded-lg bg-navy-800 border border-navy-700 text-slate-100 text-xs focus:outline-none focus:border-brand-500"
            >
              <option value="Instagram Lead Form">Instagram Lead Form</option>
              <option value="Facebook Ads">Facebook Ads</option>
              <option value="Instagram Reels Promo">Instagram Reels Promo</option>
              <option value="Direct Ad Click">Direct Ad Click</option>
              <option value="Referral">Referral</option>
            </select>
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

        <div>
          <label className="block font-semibold text-slate-300 mb-1">Assign To Admin</label>
          <select
            value={assignedAdminId}
            onChange={e => setAssignedAdminId(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-navy-800 border border-navy-700 text-slate-100 text-xs focus:outline-none focus:border-brand-500"
          >
            {users.map(u => (
              <option key={u.id} value={u.id}>
                {u.name} ({u.role === 'super_admin' ? 'Super Admin' : 'Admin'})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold text-slate-300 mb-1">Initial Discovery Notes</label>
          <textarea
            rows={2}
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Key requirements, budget timeline, qualification criteria..."
            className="w-full px-3 py-2 rounded-lg bg-navy-800 border border-navy-700 text-slate-100 text-xs focus:outline-none focus:border-brand-500"
          />
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
            Save & Dispatch Lead
          </button>
        </div>
      </form>
    </Modal>
  );
};
