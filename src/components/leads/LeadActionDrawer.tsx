import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Lead, LeadStatus } from '../../types';
import { Drawer } from '../common/Drawer';
import { Badge } from '../common/Badge';
import { 
  FiTarget, 
  FiMail, 
  FiPhone, 
  FiBriefcase, 
  FiClock, 
  FiSend, 
  FiCheckCircle, 
  FiFileText,
  FiTrendingUp,
  FiActivity,
  FiShield
} from 'react-icons/fi';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

interface LeadActionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
}

export const LeadActionDrawer: React.FC<LeadActionDrawerProps> = ({
  isOpen,
  onClose,
  lead,
}) => {
  const { 
    updateLeadStatus, 
    assignLead, 
    toggleLeadFollowUp, 
    toggleLeadPipelineCategory, 
    users, 
    currentUser, 
    campaigns, 
    addToast 
  } = useApp();
  const [newNote, setNewNote] = useState('');
  const [isCalling, setIsCalling] = useState(false);
  const [emailSubject, setEmailSubject] = useState('');
  const [showEmailComposer, setShowEmailComposer] = useState(false);

  if (!lead) return null;

  const assignedAdmin = users.find(u => u.id === lead.assignedAdminId);
  const campaign = campaigns.find(c => c.id === lead.campaignId);

  const statusVariantMap: Record<LeadStatus, 'emerald' | 'blue' | 'purple' | 'amber' | 'rose'> = {
    new: 'emerald',
    contacted: 'blue',
    qualified: 'purple',
    closed: 'emerald',
    lost: 'rose',
  };

  const handleStatusChange = (status: LeadStatus) => {
    updateLeadStatus(lead.id, status);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    updateLeadStatus(lead.id, lead.status, newNote);
    setNewNote('');
  };

  const handleSimulateCall = () => {
    setIsCalling(true);
    setTimeout(() => {
      setIsCalling(false);
      updateLeadStatus(lead.id, 'contacted', `Outbound discovery call completed with ${lead.fullName} (${lead.phone}). Confirmed monthly ad spend and scheduling demo.`);
      addToast(`Call logged with ${lead.fullName}`, 'success', 'Call Completed');
    }, 1400);
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    updateLeadStatus(lead.id, 'contacted', `Custom media buying scope email dispatched to ${lead.email}`);
    setShowEmailComposer(false);
    addToast(`Email dispatched to ${lead.email}`, 'success', 'Email Sent');
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={lead.fullName}
      subtitle={`${lead.company} • ${lead.jobTitle || 'Executive'} • Ingested ${new Date(lead.dateCaptured).toLocaleString()}`}
      width="xl"
      icon={FiTarget}
    >
      <div className="space-y-5 text-xs">
        {/* Top Header Card */}
        <div className="p-3.5 rounded-lg bg-navy-850 border border-navy-750 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant={statusVariantMap[lead.status]} size="md" dot={lead.status === 'new'}>
                STATUS: {lead.status.toUpperCase()}
              </Badge>
              {lead.status === 'new' && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30 font-semibold">
                  SLA: 7m remaining
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 font-mono text-slate-300">
              <span className="text-slate-400">Score:</span>
              <span className={`font-bold px-2 py-0.5 rounded text-xs ${
                lead.score >= 80 ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/60' : 'bg-navy-800 text-slate-300'
              }`}>
                {lead.score}/100
              </span>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-navy-800">
            <button
              onClick={handleSimulateCall}
              disabled={isCalling}
              className="py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center justify-center gap-2 shadow-subtle transition-colors"
            >
              <FiPhone className="w-3.5 h-3.5" />
              <span>{isCalling ? 'Dialing Prospect...' : 'Start VoIP Call'}</span>
            </button>

            <button
              onClick={() => setShowEmailComposer(!showEmailComposer)}
              className="py-2 px-3 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-semibold flex items-center justify-center gap-2 shadow-subtle transition-colors"
            >
              <FiMail className="w-3.5 h-3.5" />
              <span>{showEmailComposer ? 'Close Composer' : 'Draft Email'}</span>
            </button>
          </div>

          {/* Email Composer Drawer Snippet */}
          {showEmailComposer && (
            <form onSubmit={handleSendEmail} className="p-3 rounded-lg bg-navy-900 border border-navy-800 space-y-2 mt-2">
              <span className="text-[10px] font-semibold uppercase text-slate-400 block">
                Quick Outreach Template
              </span>
              <input
                type="text"
                value={emailSubject || `Follow up regarding Meta Ads Scale - ${lead.company}`}
                onChange={e => setEmailSubject(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded bg-navy-800 border border-navy-700 text-slate-100 text-xs"
              />
              <textarea
                rows={3}
                defaultValue={`Hi ${lead.fullName.split(' ')[0]},\n\nThanks for submitting our Meta qualification form. I saw you're looking to scale pipeline with automated lead routing. Let's connect this week.`}
                className="w-full px-2.5 py-1.5 rounded bg-navy-800 border border-navy-700 text-slate-200 text-xs"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-3 py-1 rounded bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold"
                >
                  Send via Resend / SMTP
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Lead Pipeline & Follow-Up Workflow */}
        <div className="p-3.5 rounded-lg bg-navy-850 border border-navy-750 space-y-2.5">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider">
              Pipeline Column & Follow-Up
            </h4>
            <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${
              lead.pipelineCategory === 'active'
                ? 'bg-emerald-950 text-emerald-300 border-emerald-800/40'
                : 'bg-navy-800 text-slate-400 border-navy-700'
            }`}>
              {lead.pipelineCategory === 'active' ? '🟢 Active Column' : '📁 Non-Active Column'}
            </span>
          </div>

          <div className={`p-2.5 rounded border text-xs ${
            lead.followUpRequired
              ? 'bg-amber-950/30 border-amber-500/30 text-amber-200'
              : 'bg-navy-900 border-navy-800 text-slate-300'
          }`}>
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-[11px] uppercase font-mono flex items-center gap-1.5">
                {lead.followUpRequired ? (
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

              {lead.nextFollowUpDate && (
                <span className="text-[10px] font-mono text-slate-400">
                  {lead.nextFollowUpDate}
                </span>
              )}
            </div>

            <p className="text-[11px] text-slate-300 leading-relaxed">
              {lead.nextFollowUpAction || lead.notes}
            </p>
          </div>

          <div className="flex gap-2 pt-1">
            <button
              onClick={() => toggleLeadFollowUp(lead.id)}
              className={`flex-1 py-1.5 px-2 rounded text-xs font-semibold border transition-colors ${
                lead.followUpRequired
                  ? 'bg-amber-950 text-amber-300 border-amber-800/60 hover:bg-amber-900'
                  : 'bg-navy-800 text-slate-200 border-navy-700 hover:bg-navy-750'
              }`}
            >
              {lead.followUpRequired ? 'Clear Follow Flag' : 'Flag Follow-Up Needed'}
            </button>

            <button
              onClick={() => toggleLeadPipelineCategory(lead.id)}
              className="py-1.5 px-3 rounded text-xs font-semibold bg-navy-800 hover:bg-navy-750 text-slate-200 border border-navy-700"
            >
              Move to {lead.pipelineCategory === 'active' ? 'Non-Active' : 'Active'}
            </button>
          </div>
        </div>

        {/* Pipeline Stage Advance Bar */}
        <div className="p-3.5 rounded-lg bg-navy-850 border border-navy-750 space-y-2">
          <label className="block font-semibold text-slate-300 uppercase tracking-wider text-[10px]">
            Pipeline Stage Progression
          </label>
          <div className="grid grid-cols-5 gap-1">
            {(['new', 'contacted', 'qualified', 'closed', 'lost'] as LeadStatus[]).map(st => (
              <button
                key={st}
                onClick={() => handleStatusChange(st)}
                className={`py-1.5 rounded text-[11px] font-semibold uppercase transition-colors ${
                  lead.status === st
                    ? 'bg-brand-600 text-white shadow-subtle'
                    : 'bg-navy-800 text-slate-400 hover:text-slate-200 hover:bg-navy-750'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Contact & Deal Details */}
        <div className="p-3.5 rounded-lg bg-navy-850 border border-navy-750 space-y-2.5">
          <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider">
            Lead Dossier & Company Intel
          </h4>
          <div className="space-y-2 text-slate-300">
            <div className="flex items-center justify-between py-1 border-b border-navy-800">
              <span className="text-slate-400 flex items-center gap-1.5"><FiMail /> Email</span>
              <a href={`mailto:${lead.email}`} className="text-sky-400 hover:underline font-mono">
                {lead.email}
              </a>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-navy-800">
              <span className="text-slate-400 flex items-center gap-1.5"><FiPhone /> Phone</span>
              <span className="font-mono text-slate-200">{lead.phone}</span>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-navy-800">
              <span className="text-slate-400 flex items-center gap-1.5"><FiBriefcase /> Organization</span>
              <span className="font-semibold text-slate-100">{lead.company}</span>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="text-slate-400 flex items-center gap-1.5"><FiTrendingUp /> Target Contract Value</span>
              <span className="font-mono font-bold text-emerald-400">₹{lead.estimatedValue.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Meta Ads Form Attribution */}
        <div className="p-3.5 rounded-lg bg-navy-850 border border-navy-750 space-y-2.5">
          <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider flex items-center gap-2">
            <span>Meta Ad Ingestion Details</span>
            {lead.source.includes('Instagram') ? (
              <FaInstagram className="text-pink-400 w-3.5 h-3.5" />
            ) : (
              <FaFacebook className="text-blue-400 w-3.5 h-3.5" />
            )}
          </h4>

          <div className="space-y-2 text-slate-300">
            <div className="p-2.5 rounded bg-navy-900 border border-navy-800">
              <span className="text-[10px] uppercase font-semibold text-slate-400 block">Ad Campaign Attribution</span>
              <p className="font-semibold text-slate-100 mt-0.5">{lead.campaignName}</p>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5">Channel: {lead.source}</p>
            </div>

            {/* Form Responses */}
            {lead.formAnswers && lead.formAnswers.length > 0 && (
              <div className="p-2.5 rounded bg-navy-900 border border-navy-800 space-y-1.5">
                <span className="text-[10px] uppercase font-semibold text-sky-400 block">
                  Instant Form Questionnaire Answers
                </span>
                {lead.formAnswers.map((fa, idx) => (
                  <div key={idx} className="border-t border-navy-800 pt-1.5 first:border-0 first:pt-0">
                    <p className="text-[11px] text-slate-400">{fa.question}</p>
                    <p className="font-semibold text-slate-200 mt-0.5">{fa.answer}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Assigned Admin Selector */}
        <div className="p-3.5 rounded-lg bg-navy-850 border border-navy-750 space-y-2">
          <label className="block font-semibold text-slate-200 text-xs">
            Assigned Managing Admin
          </label>
          <select
            value={lead.assignedAdminId}
            onChange={e => assignLead(lead.id, e.target.value)}
            className="w-full px-3 py-1.5 rounded bg-navy-800 border border-navy-700 text-slate-200 text-xs focus:outline-none focus:border-brand-500"
          >
            {users.map(u => (
              <option key={u.id} value={u.id}>
                {u.name} ({u.role === 'super_admin' ? 'Master Admin' : 'Media Lead'})
              </option>
            ))}
          </select>
        </div>

        {/* Activity Timeline */}
        <div className="p-3.5 rounded-lg bg-navy-850 border border-navy-750 space-y-2.5">
          <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider">
            Interaction Log & Notes
          </h4>

          <form onSubmit={handleAddNote} className="flex gap-2">
            <input
              type="text"
              value={newNote}
              onChange={e => setNewNote(e.target.value)}
              placeholder="Add discovery call note or SLA update..."
              className="flex-1 px-3 py-1.5 rounded bg-navy-800 border border-navy-700 text-slate-200 text-xs focus:outline-none focus:border-brand-500"
            />
            <button
              type="submit"
              className="px-3 py-1.5 rounded bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs"
            >
              Post Note
            </button>
          </form>

          <div className="space-y-1.5 pt-1 max-h-48 overflow-y-auto">
            {lead.interactions.map(item => (
              <div key={item.id} className="p-2.5 rounded bg-navy-900 border border-navy-800 text-[11px]">
                <div className="flex justify-between items-center text-slate-400 mb-0.5">
                  <span className="font-semibold text-slate-300">{item.performedBy}</span>
                  <span className="font-mono">{new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <p className="text-slate-200 leading-relaxed">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Drawer>
  );
};
