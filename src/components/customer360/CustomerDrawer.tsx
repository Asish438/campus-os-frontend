import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CustomerProfile } from '../../types';
import { Drawer } from '../common/Drawer';
import { Badge } from '../common/Badge';
import { 
  FiUsers, 
  FiMail, 
  FiPhone, 
  FiDollarSign, 
  FiLayers, 
  FiClock, 
  FiFileText, 
  FiSend,
  FiTrendingUp,
  FiAward,
  FiCheckCircle,
  FiAlertCircle
} from 'react-icons/fi';
import { FaInstagram, FaFacebook } from 'react-icons/fa';

interface CustomerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  customer: CustomerProfile | null;
}

export const CustomerDrawer: React.FC<CustomerDrawerProps> = ({
  isOpen,
  onClose,
  customer,
}) => {
  const { 
    addCustomerNote, 
    toggleCustomerFollowUp, 
    toggleCustomerPipelineCategory, 
    updateCustomerFollowUpAction,
    users 
  } = useApp();

  const [newNote, setNewNote] = useState('');
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [taskText, setTaskText] = useState('');
  const [taskDate, setTaskDate] = useState('');

  if (!customer) return null;

  const assignedAdmin = users.find(u => u.id === customer.assignedAdminId);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    addCustomerNote(customer.id, newNote);
    setNewNote('');
  };

  const handleSaveFollowUpTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskText.trim()) return;
    updateCustomerFollowUpAction(customer.id, taskText, taskDate);
    setIsEditingTask(false);
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={customer.fullName}
      subtitle={`${customer.company} • ${customer.industry}`}
      width="xl"
      icon={FiUsers}
    >
      <div className="space-y-4 text-xs">
        {/* Profile Overview Card */}
        <div className="p-3.5 rounded-lg bg-navy-850 border border-navy-750 space-y-3">
          <div className="flex items-center gap-3">
            <img
              src={customer.avatar}
              alt={customer.fullName}
              className="w-12 h-12 rounded-lg object-cover ring-1 ring-navy-700"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-xs text-slate-100">{customer.fullName}</h3>
                <Badge variant={customer.status === 'vip' ? 'amber' : 'emerald'} size="sm">
                  {customer.status.toUpperCase()}
                </Badge>
              </div>
              <p className="text-[11px] text-slate-400">{customer.company}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-navy-800 font-mono">
            <div className="p-2 rounded bg-navy-900 border border-navy-800">
              <span className="text-[10px] text-slate-400 font-sans block">Lifetime Value (LTV)</span>
              <span className="font-bold text-emerald-400 text-xs">₹{customer.ltv.toLocaleString('en-IN')}</span>
            </div>
            <div className="p-2 rounded bg-navy-900 border border-navy-800">
              <span className="text-[10px] text-slate-400 font-sans block">Closed Deals</span>
              <span className="font-bold text-sky-400 text-xs">{customer.dealsCount} Contracts</span>
            </div>
          </div>
        </div>

        {/* Lead Pipeline & Follow-up Controls */}
        <div className="p-3.5 rounded-lg bg-navy-850 border border-navy-750 space-y-2.5">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider">
              Pipeline Column & Follow-Up Workflow
            </h4>
            <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${
              customer.pipelineCategory === 'active'
                ? 'bg-emerald-950 text-emerald-300 border-emerald-800/40'
                : 'bg-navy-800 text-slate-400 border-navy-700'
            }`}>
              {customer.pipelineCategory === 'active' ? '🟢 Active Column' : '📁 Non-Active Column'}
            </span>
          </div>

          <div className={`p-2.5 rounded border text-xs ${
            customer.followUpRequired
              ? 'bg-amber-950/30 border-amber-500/30 text-amber-200'
              : 'bg-navy-900 border-navy-800 text-slate-300'
          }`}>
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-[11px] uppercase font-mono flex items-center gap-1.5">
                {customer.followUpRequired ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <span className="text-amber-300">🔔 Follow-up Required (Follows)</span>
                  </>
                ) : (
                  <>
                    <span className="w-2 h-2 rounded-full bg-slate-500" />
                    <span className="text-slate-400">⏸️ On Track (Not Follows)</span>
                  </>
                )}
              </span>

              {customer.nextFollowUpDate && (
                <span className="text-[10px] font-mono text-slate-400">
                  {customer.nextFollowUpDate}
                </span>
              )}
            </div>

            <p className="text-[11px] text-slate-300 leading-relaxed">
              {customer.nextFollowUpAction || 'No upcoming scheduled follow-up action.'}
            </p>
          </div>

          <div className="flex gap-2 pt-1">
            <button
              onClick={() => toggleCustomerFollowUp(customer.id)}
              className={`flex-1 py-1.5 px-2 rounded text-xs font-semibold border transition-colors ${
                customer.followUpRequired
                  ? 'bg-amber-950 text-amber-300 border-amber-800/60 hover:bg-amber-900'
                  : 'bg-navy-800 text-slate-200 border-navy-700 hover:bg-navy-750'
              }`}
            >
              {customer.followUpRequired ? 'Clear Follow Flag' : 'Flag Follow-Up Needed'}
            </button>

            <button
              onClick={() => toggleCustomerPipelineCategory(customer.id)}
              className="py-1.5 px-3 rounded text-xs font-semibold bg-navy-800 hover:bg-navy-750 text-slate-200 border border-navy-700"
            >
              Move to {customer.pipelineCategory === 'active' ? 'Non-Active' : 'Active'}
            </button>
          </div>
        </div>

        {/* Meta Ads Multi-Touch Attribution */}
        <div className="p-3.5 rounded-lg bg-navy-850 border border-navy-750 space-y-2.5">
          <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider flex items-center gap-2">
            <FiAward className="text-amber-400" />
            <span>Meta Ads Attribution Path</span>
          </h4>

          <div className="space-y-2 text-slate-300">
            <div className="p-2.5 rounded bg-navy-900 border border-navy-800">
              <span className="text-[10px] uppercase font-bold text-sky-400 block">First Touch Attribution</span>
              <p className="font-semibold text-slate-100 mt-0.5">{customer.firstTouchCampaignName}</p>
              <p className="text-[10px] text-slate-400">Captured through initial awareness creative</p>
            </div>

            <div className="p-2.5 rounded bg-navy-900 border border-navy-800">
              <span className="text-[10px] uppercase font-bold text-emerald-400 block">Converting Ad Touchpoint</span>
              <p className="font-semibold text-slate-100 mt-0.5">{customer.convertingCampaignName}</p>
              <p className="text-[10px] text-slate-400">Format: {customer.convertingAdFormat}</p>
            </div>
          </div>
        </div>

        {/* Customer Journey Timeline */}
        <div className="p-3.5 rounded-lg bg-navy-850 border border-navy-750 space-y-2.5">
          <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider">
            Customer Touchpoint Journey
          </h4>
          
          <div className="space-y-2 pt-1 max-h-48 overflow-y-auto">
            {customer.touchpoints.map((tp, idx) => (
              <div key={idx} className="p-2.5 rounded bg-navy-900 border border-navy-800 text-[11px]">
                <div className="flex justify-between items-center text-slate-400 mb-0.5">
                  <span className="font-semibold text-sky-400">{tp.channel}</span>
                  <span className="font-mono">{tp.date}</span>
                </div>
                <p className="text-slate-200 leading-relaxed">{tp.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Add Account Note */}
        <div className="p-3.5 rounded-lg bg-navy-850 border border-navy-750 space-y-2.5">
          <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider">
            Account Notes & Directives
          </h4>
          
          <form onSubmit={handleAddNote} className="flex gap-2">
            <input
              type="text"
              value={newNote}
              onChange={e => setNewNote(e.target.value)}
              placeholder="Add an executive note or client update..."
              className="flex-1 px-3 py-1.5 rounded bg-navy-800 border border-navy-700 text-slate-200 text-xs focus:outline-none focus:border-brand-500"
            />
            <button
              type="submit"
              className="px-3 py-1.5 rounded bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs"
            >
              Add Note
            </button>
          </form>

          <p className="text-slate-300 bg-navy-900 p-2.5 rounded border border-navy-800 text-[11px] whitespace-pre-wrap leading-relaxed">
            {customer.notes}
          </p>
        </div>
      </div>
    </Drawer>
  );
};
