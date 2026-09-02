import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User } from '../../types';
import { Modal } from '../common/Modal';
import { FiTrash2, FiAlertTriangle, FiArrowRight } from 'react-icons/fi';

interface RemoveAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  admin: User | null;
}

export const RemoveAdminModal: React.FC<RemoveAdminModalProps> = ({
  isOpen,
  onClose,
  admin,
}) => {
  const { deleteAdmin, users, campaigns, filteredLeads } = useApp();

  const [reassignToUserId, setReassignToUserId] = useState<string>(
    users.find(u => u.id !== admin?.id)?.id || ''
  );

  if (!admin) return null;

  const assignedCampaigns = campaigns.filter(c => c.assignedAdminId === admin.id);
  const eligibleReassignees = users.filter(u => u.id !== admin.id);

  const handleConfirmDelete = () => {
    deleteAdmin(admin.id, reassignToUserId);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Remove Admin Account & Reassign Assets"
      subtitle={`Revoking permissions for ${admin.name}`}
      maxWidth="md"
      icon={FiTrash2}
    >
      <div className="space-y-4 text-xs">
        {/* Warning Callout */}
        <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-200 flex items-start gap-3">
          <FiAlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-rose-100">Permanent Access Revocation</p>
            <p className="text-[11px] text-rose-300/90 mt-0.5 leading-relaxed">
              This will remove {admin.name}'s login credentials and access to the Meta Operations Command Center.
            </p>
          </div>
        </div>

        {/* Affected Assets Summary */}
        <div className="p-3.5 rounded-xl bg-navy-850 border border-navy-750 space-y-2">
          <p className="font-semibold text-slate-200 text-xs">Assets currently managed by this Admin:</p>
          <div className="flex justify-between py-1 border-b border-navy-800 text-slate-300">
            <span>Active Meta Campaigns:</span>
            <span className="font-mono font-bold text-sky-400">{assignedCampaigns.length} campaigns</span>
          </div>
          <div className="flex justify-between py-1 text-slate-300">
            <span>Assigned Lead Queue:</span>
            <span className="font-mono font-bold text-emerald-400">{admin.assignedLeadCount || 0} leads</span>
          </div>
        </div>

        {/* Reassignment Target Selector */}
        <div className="p-3.5 rounded-xl bg-navy-850 border border-navy-700 space-y-2">
          <label className="block font-semibold text-slate-200">
            Reassign All Active Campaigns & Leads To: *
          </label>
          <select
            value={reassignToUserId}
            onChange={e => setReassignToUserId(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-navy-800 border border-navy-700 text-slate-200 text-xs focus:outline-none focus:border-brand-500"
          >
            {eligibleReassignees.map(u => (
              <option key={u.id} value={u.id}>
                {u.name} ({u.role === 'super_admin' ? 'Super Admin (Global)' : 'Admin'})
              </option>
            ))}
          </select>
          <p className="text-[10px] text-slate-400">
            All active Meta Ad leads and campaigns will instantly migrate to this user's view.
          </p>
        </div>

        {/* Modal Actions */}
        <div className="flex justify-end gap-2 pt-3 border-t border-navy-750">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-navy-800 hover:bg-navy-750 text-slate-300 text-xs font-semibold"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirmDelete}
            className="px-5 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md shadow-rose-600/20 flex items-center gap-1.5"
          >
            <FiTrash2 className="w-3.5 h-3.5" />
            <span>Confirm Removal & Reassign</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
