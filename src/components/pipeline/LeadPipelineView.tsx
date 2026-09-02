import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Lead } from '../../types';
import { StatCard } from '../common/StatCard';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';
import { LeadActionDrawer } from '../leads/LeadActionDrawer';
import { 
  FiDollarSign, 
  FiAward, 
  FiTrendingUp, 
  FiSearch, 
  FiClock, 
  FiCheckCircle, 
  FiPhone, 
  FiMail, 
  FiActivity, 
  FiArrowRight, 
  FiArrowLeft, 
  FiCheck, 
  FiCalendar, 
  FiEdit3, 
  FiFilter, 
  FiPlus, 
  FiLayers,
  FiZap,
  FiShield
} from 'react-icons/fi';
import { FaInstagram, FaFacebook, FaRupeeSign } from 'react-icons/fa';

export const LeadPipelineView: React.FC = () => {
  const { 
    filteredLeads, 
    filteredCustomers,
    users, 
    toggleLeadFollowUp, 
    toggleLeadPipelineCategory, 
    updateLeadFollowUpAction,
    updateLeadStatus,
    addToast 
  } = useApp();

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [adminFilter, setAdminFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');

  // Follow-up scheduling modal state
  const [schedulingLead, setSchedulingLead] = useState<Lead | null>(null);
  const [scheduleActionText, setScheduleActionText] = useState('');
  const [scheduleDateText, setScheduleDateText] = useState('');

  // Base filter helper
  const filterLeadBase = (lead: Lead) => {
    if (adminFilter !== 'all' && lead.assignedAdminId !== adminFilter) return false;
    if (sourceFilter !== 'all' && lead.source !== sourceFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        lead.fullName.toLowerCase().includes(q) ||
        lead.company.toLowerCase().includes(q) ||
        lead.email.toLowerCase().includes(q) ||
        lead.campaignName.toLowerCase().includes(q)
      );
    }
    return true;
  };

  // 1. Column 1: Active Leads
  const activeLeads = useMemo(() => {
    return filteredLeads.filter(l => l.pipelineCategory !== 'non_active' && filterLeadBase(l));
  }, [filteredLeads, adminFilter, sourceFilter, searchQuery]);

  // 2. Column 2: Non-Active Leads
  const nonActiveLeads = useMemo(() => {
    return filteredLeads.filter(l => l.pipelineCategory === 'non_active' && filterLeadBase(l));
  }, [filteredLeads, adminFilter, sourceFilter, searchQuery]);

  // 3. Column 3: Follows (Follow-Up Required)
  const followsLeads = useMemo(() => {
    return filteredLeads.filter(l => l.followUpRequired && filterLeadBase(l));
  }, [filteredLeads, adminFilter, sourceFilter, searchQuery]);

  // 4. Column 4: Not Follows (No Action Required / On Track)
  const notFollowsLeads = useMemo(() => {
    return filteredLeads.filter(l => !l.followUpRequired && filterLeadBase(l));
  }, [filteredLeads, adminFilter, sourceFilter, searchQuery]);

  // Aggregate Metrics
  const activeTotalValue = useMemo(() => 
    activeLeads.reduce((acc, l) => acc + l.estimatedValue, 0), [activeLeads]);

  const nonActiveTotalValue = useMemo(() => 
    nonActiveLeads.reduce((acc, l) => acc + l.estimatedValue, 0), [nonActiveLeads]);

  const followsTotalValue = useMemo(() => 
    followsLeads.reduce((acc, l) => acc + l.estimatedValue, 0), [followsLeads]);

  const totalLtv = useMemo(() => 
    filteredCustomers.reduce((acc, c) => acc + c.ltv, 0), [filteredCustomers]);

  // Open Scheduler Modal
  const openScheduleModal = (lead: Lead) => {
    setSchedulingLead(lead);
    setScheduleActionText(lead.nextFollowUpAction || 'Schedule discovery & pricing consultation');
    setScheduleDateText(lead.nextFollowUpDate || 'Tomorrow, 2:00 PM');
  };

  const handleSaveSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!schedulingLead || !scheduleActionText.trim()) return;
    updateLeadFollowUpAction(schedulingLead.id, scheduleActionText, scheduleDateText);
    setSchedulingLead(null);
  };

  // Quick VoIP Call simulation
  const handleQuickCall = (lead: Lead) => {
    updateLeadStatus(lead.id, 'contacted', `VoIP Discovery Call completed with ${lead.fullName} (${lead.phone}). Discussed ad performance goals.`);
    addToast(`Dialing ${lead.fullName} (${lead.phone})... Call logged.`, 'success', 'VoIP Call Connected');
  };

  // Quick Email simulation
  const handleQuickEmail = (lead: Lead) => {
    updateLeadStatus(lead.id, 'contacted', `Follow-up proposal email dispatched to ${lead.email}`);
    addToast(`Introductory proposal dispatched to ${lead.email}`, 'info', 'Email Sent');
  };

  return (
    <div className="space-y-4 pb-16">
      {/* Top Header */}
      <div className="p-4 rounded-xl bg-navy-900 border border-navy-750 shadow-panel flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-100">Lead Pipeline (4 Columns)</h2>
            <Badge variant="emerald" size="sm">
              {filteredLeads.length} Inbound Records
            </Badge>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Real-time 4-column matrix: <strong>1. Active</strong>, <strong>2. Non-Active</strong>, <strong>3. Follows (Action Needed)</strong>, and <strong>4. Not Follows (On Track)</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
          <span className="text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-lg border border-emerald-800/40">
            Active: ₹{activeTotalValue.toLocaleString('en-IN')}
          </span>
          <span className="text-amber-400 bg-amber-950 px-2.5 py-1 rounded-lg border border-amber-800/40">
            Follows: ₹{followsTotalValue.toLocaleString('en-IN')}
          </span>
          <span className="text-slate-400 bg-navy-950 px-2.5 py-1 rounded-lg border border-navy-800">
            Non-Active: ₹{nonActiveTotalValue.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <StatCard
          title="Active Pipeline Value"
          value={`₹${activeTotalValue.toLocaleString('en-IN')}`}
          trend={{ value: '18.4%', isPositive: true }}
          subtitle={`${activeLeads.length} warm active opportunities`}
          icon={FaRupeeSign}
        />

        <StatCard
          title="Pending Follows Queue"
          value={followsLeads.length}
          trend={{ value: `₹${followsTotalValue.toLocaleString('en-IN')}`, isPositive: true }}
          subtitle="Action required on schedule"
          icon={FiClock}
        />

        <StatCard
          title="Not Follows / On Track"
          value={notFollowsLeads.length}
          subtitle="Prospects progressing normally"
          icon={FiCheckCircle}
        />

        <StatCard
          title="Non-Active / Nurture"
          value={nonActiveLeads.length}
          subtitle={`₹${nonActiveTotalValue.toLocaleString('en-IN')} potential value`}
          icon={FiAward}
        />
      </div>

      {/* Search & Filter Toolbar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2.5 bg-navy-900 border border-navy-750 p-3 rounded-xl shadow-panel text-xs">
        {/* Search */}
        <div className="lg:col-span-5 relative">
          <FiSearch className="absolute left-3 top-2.5 text-slate-400 w-3.5 h-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search leads by name, company, email, or campaign..."
            className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-navy-800 border border-navy-700 text-slate-100 text-xs placeholder-slate-500 focus:outline-none focus:border-brand-500"
          />
        </div>

        {/* Source Filter */}
        <div className="lg:col-span-3">
          <select
            value={sourceFilter}
            onChange={e => setSourceFilter(e.target.value)}
            className="w-full px-2.5 py-1.5 rounded-lg bg-navy-800 border border-navy-700 text-slate-200 text-xs focus:outline-none focus:border-brand-500"
          >
            <option value="all">All Ad Sources</option>
            <option value="Instagram Lead Form">Instagram Lead Form</option>
            <option value="Facebook Ads">Facebook Ads</option>
            <option value="Instagram Reels Promo">Instagram Reels Promo</option>
            <option value="Direct Ad Click">Direct Ad Click</option>
          </select>
        </div>

        {/* Media Lead Filter */}
        <div className="lg:col-span-4">
          <select
            value={adminFilter}
            onChange={e => setAdminFilter(e.target.value)}
            className="w-full px-2.5 py-1.5 rounded-lg bg-navy-800 border border-navy-700 text-slate-200 text-xs focus:outline-none focus:border-brand-500"
          >
            <option value="all">All Media Leads & Admins</option>
            {users.map(u => (
              <option key={u.id} value={u.id}>
                {u.name} ({u.role === 'super_admin' ? 'Super Admin' : 'Admin'})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4 VERTICAL COLUMNS: ACTIVE, NON-ACTIVE, FOLLOWS, NOT FOLLOWS */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3.5 items-start">
        
        {/* ───────────────────────────────────────────────────────────── */}
        {/* COLUMN 1: 🟢 ACTIVE PIPELINE */}
        {/* ───────────────────────────────────────────────────────────── */}
        <div className="bg-navy-900 rounded-xl border border-navy-750 p-3.5 shadow-panel space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-navy-750 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
                1. Active
              </h3>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/50">
              {activeLeads.length} Deals
            </span>
          </div>

          {/* Column 1 Cards */}
          <div className="space-y-2.5 max-h-[820px] overflow-y-auto pr-0.5 pipeline-column-scroll">
            {activeLeads.length === 0 ? (
              <div className="p-6 text-center bg-navy-850 rounded-lg border border-navy-800 text-slate-400 text-xs">
                <FiCheckCircle className="w-5 h-5 text-slate-600 mx-auto mb-1" />
                <p className="font-medium text-slate-300">No active leads</p>
              </div>
            ) : (
              activeLeads.map(lead => {
                const assignedAdmin = users.find(u => u.id === lead.assignedAdminId);
                const isInstagram = lead.source.includes('Instagram');
                const initials = lead.fullName.split(' ').map(n => n[0]).join('').slice(0, 2);

                return (
                  <div
                    key={lead.id}
                    className={`bg-navy-850 rounded-lg border p-3 transition-all hover:border-slate-500 group ${
                      lead.followUpRequired ? 'border-amber-500/40 bg-gradient-to-r from-navy-850 to-amber-950/10' : 'border-navy-750'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-1.5 mb-1.5">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-7 h-7 rounded bg-navy-900 border border-navy-700 flex items-center justify-center font-bold text-sky-400 text-xs shrink-0">
                          {initials}
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-semibold text-xs text-slate-100 truncate group-hover:text-sky-300 transition-colors">
                            {lead.fullName}
                          </h4>
                          <p className="text-[10px] text-slate-400 truncate">{lead.company}</p>
                        </div>
                      </div>

                      <Badge variant={lead.status === 'new' ? 'emerald' : 'blue'} size="sm">
                        {lead.status.toUpperCase()}
                      </Badge>
                    </div>

                    {/* Value & Score */}
                    <div className="flex justify-between items-center text-[11px] font-mono py-1 px-1.5 rounded bg-navy-900 border border-navy-800 mb-2 text-slate-300">
                      <span className="font-bold text-emerald-400">₹{lead.estimatedValue.toLocaleString('en-IN')}</span>
                      <span className="text-slate-400 text-[10px]">{lead.score}pts</span>
                    </div>

                    {/* Source */}
                    <div className="flex items-center gap-1 text-[10px] text-slate-400 mb-2 truncate">
                      {isInstagram ? <FaInstagram className="text-pink-400 shrink-0 w-3 h-3" /> : <FaFacebook className="text-blue-400 shrink-0 w-3 h-3" />}
                      <span className="truncate">{lead.campaignName}</span>
                    </div>

                    {/* Follow Status Indicator */}
                    <div className="mb-2">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-mono px-1.5 py-0.2 rounded border ${
                        lead.followUpRequired
                          ? 'bg-amber-950/60 text-amber-300 border-amber-800/40'
                          : 'bg-navy-900 text-slate-400 border-navy-800'
                      }`}>
                        {lead.followUpRequired ? '🔔 Follows' : '⏸️ Not Follows'}
                      </span>
                    </div>

                    {/* Action Controls */}
                    <div className="pt-2 border-t border-navy-800 flex items-center justify-between text-xs">
                      <span className="text-[10px] text-slate-400 truncate max-w-[65px]">
                        {assignedAdmin ? assignedAdmin.name.split(' ')[0] : 'Admin'}
                      </span>

                      <div className="flex items-center gap-1">
                        {/* 1-Click Move to Non-Active */}
                        <button
                          onClick={() => toggleLeadPipelineCategory(lead.id)}
                          className="p-1 rounded bg-navy-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-navy-700 transition-colors"
                          title="Move to Non-Active Column"
                        >
                          <FiArrowRight className="w-3 h-3" />
                        </button>

                        {/* Toggle Follow */}
                        <button
                          onClick={() => toggleLeadFollowUp(lead.id)}
                          className="p-1 rounded bg-navy-800 hover:bg-amber-950 text-slate-400 hover:text-amber-300 border border-navy-700 transition-colors"
                          title="Toggle Follow-Up Required"
                        >
                          <FiClock className="w-3 h-3" />
                        </button>

                        {/* Open Drawer */}
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="px-2 py-0.5 rounded bg-brand-600 hover:bg-brand-500 text-white text-[11px] font-semibold transition-colors"
                        >
                          Open
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ───────────────────────────────────────────────────────────── */}
        {/* COLUMN 2: ⚪ NON-ACTIVE PIPELINE */}
        {/* ───────────────────────────────────────────────────────────── */}
        <div className="bg-navy-900 rounded-xl border border-navy-750 p-3.5 shadow-panel space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-navy-750 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-500" />
              <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
                2. Non-Active
              </h3>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-navy-800 text-slate-300 border border-navy-700">
              {nonActiveLeads.length} Records
            </span>
          </div>

          {/* Column 2 Cards */}
          <div className="space-y-2.5 max-h-[820px] overflow-y-auto pr-0.5 pipeline-column-scroll">
            {nonActiveLeads.length === 0 ? (
              <div className="p-6 text-center bg-navy-850 rounded-lg border border-navy-800 text-slate-400 text-xs">
                <FiCheckCircle className="w-5 h-5 text-slate-600 mx-auto mb-1" />
                <p className="font-medium text-slate-300">No non-active leads</p>
              </div>
            ) : (
              nonActiveLeads.map(lead => {
                const assignedAdmin = users.find(u => u.id === lead.assignedAdminId);
                const initials = lead.fullName.split(' ').map(n => n[0]).join('').slice(0, 2);

                return (
                  <div
                    key={lead.id}
                    className="bg-navy-850 rounded-lg border border-navy-750 p-3 transition-all hover:border-slate-500 group"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-1.5 mb-1.5">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-7 h-7 rounded bg-navy-900 border border-navy-700 flex items-center justify-center font-bold text-slate-400 text-xs shrink-0">
                          {initials}
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-semibold text-xs text-slate-100 truncate group-hover:text-sky-300 transition-colors">
                            {lead.fullName}
                          </h4>
                          <p className="text-[10px] text-slate-400 truncate">{lead.company}</p>
                        </div>
                      </div>

                      <Badge variant={lead.status === 'closed' ? 'emerald' : 'slate'} size="sm">
                        {lead.status === 'closed' ? 'CLOSED' : 'ARCHIVED'}
                      </Badge>
                    </div>

                    {/* Value */}
                    <div className="flex justify-between items-center text-[11px] font-mono py-1 px-1.5 rounded bg-navy-900 border border-navy-800 mb-2 text-slate-300">
                      <span>₹{lead.estimatedValue.toLocaleString('en-IN')}</span>
                      <span className="text-slate-500 text-[10px]">{new Date(lead.dateCaptured).toLocaleDateString()}</span>
                    </div>

                    {/* Follow Status Indicator */}
                    <div className="mb-2">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-mono px-1.5 py-0.2 rounded border ${
                        lead.followUpRequired
                          ? 'bg-amber-950/60 text-amber-300 border-amber-800/40'
                          : 'bg-navy-900 text-slate-400 border-navy-800'
                      }`}>
                        {lead.followUpRequired ? '🔔 Follows: Nurture' : '⏸️ Not Follows: Cold'}
                      </span>
                    </div>

                    {/* Action Controls */}
                    <div className="pt-2 border-t border-navy-800 flex items-center justify-between text-xs">
                      <span className="text-[10px] text-slate-400 truncate max-w-[65px]">
                        {assignedAdmin ? assignedAdmin.name.split(' ')[0] : 'Admin'}
                      </span>

                      <div className="flex items-center gap-1">
                        {/* 1-Click Reactivate */}
                        <button
                          onClick={() => toggleLeadPipelineCategory(lead.id)}
                          className="px-2 py-0.5 rounded bg-emerald-950 hover:bg-emerald-900 text-emerald-300 text-[10px] font-semibold border border-emerald-800/60 flex items-center gap-1 transition-colors"
                          title="Reactivate into Active Column"
                        >
                          <FiArrowLeft className="w-3 h-3" />
                          <span>Reactivate</span>
                        </button>

                        {/* Open Drawer */}
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="px-2 py-0.5 rounded bg-navy-800 hover:bg-navy-750 text-slate-200 text-[11px] font-semibold border border-navy-700 transition-colors"
                        >
                          Open
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ───────────────────────────────────────────────────────────── */}
        {/* COLUMN 3: 🔔 FOLLOWS (Action Needed) */}
        {/* ───────────────────────────────────────────────────────────── */}
        <div className="bg-navy-900 rounded-xl border border-navy-750 p-3.5 shadow-panel space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-navy-750 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                3. Follows
              </h3>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800/50">
              {followsLeads.length} Urgent
            </span>
          </div>

          {/* Column 3 Cards */}
          <div className="space-y-2.5 max-h-[820px] overflow-y-auto pr-0.5 pipeline-column-scroll">
            {followsLeads.length === 0 ? (
              <div className="p-6 text-center bg-navy-850 rounded-lg border border-navy-800 text-slate-400 text-xs">
                <FiCheckCircle className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                <p className="font-medium text-slate-200">All follow-ups complete!</p>
              </div>
            ) : (
              followsLeads.map(lead => {
                const assignedAdmin = users.find(u => u.id === lead.assignedAdminId);
                const initials = lead.fullName.split(' ').map(n => n[0]).join('').slice(0, 2);

                return (
                  <div
                    key={lead.id}
                    className="bg-navy-850 rounded-lg border border-amber-500/40 bg-gradient-to-r from-navy-850 to-amber-950/20 p-3 transition-all hover:border-amber-400 group"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-1.5 mb-1.5">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-7 h-7 rounded bg-navy-900 border border-amber-500/30 flex items-center justify-center font-bold text-amber-300 text-xs shrink-0">
                          {initials}
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-semibold text-xs text-slate-100 truncate group-hover:text-amber-300 transition-colors">
                            {lead.fullName}
                          </h4>
                          <p className="text-[10px] text-slate-400 truncate">{lead.company}</p>
                        </div>
                      </div>

                      <Badge variant="amber" size="sm">
                        FOLLOW
                      </Badge>
                    </div>

                    {/* Follow-up Directive Box */}
                    <div className="p-2 rounded bg-amber-950/30 border border-amber-500/30 text-[11px] mb-2 text-amber-200">
                      <div className="flex justify-between items-center mb-0.5 text-[10px] font-mono text-amber-300 font-semibold">
                        <span>🔔 Next Action:</span>
                        <span>{lead.nextFollowUpDate || 'Today'}</span>
                      </div>
                      <p className="text-[10px] text-slate-300 line-clamp-2 leading-relaxed">
                        {lead.nextFollowUpAction || lead.notes}
                      </p>
                    </div>

                    {/* Action Controls */}
                    <div className="pt-2 border-t border-navy-800 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleQuickCall(lead)}
                          className="p-1 rounded bg-navy-800 hover:bg-emerald-900 text-slate-400 hover:text-emerald-300 border border-navy-700 transition-colors"
                          title="VoIP Call"
                        >
                          <FiPhone className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => openScheduleModal(lead)}
                          className="p-1 rounded bg-navy-800 hover:bg-amber-950 text-slate-400 hover:text-amber-300 border border-navy-700 transition-colors"
                          title="Edit Follow-up Date/Action"
                        >
                          <FiEdit3 className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="flex items-center gap-1">
                        {/* Toggle Follow */}
                        <button
                          onClick={() => toggleLeadFollowUp(lead.id)}
                          className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-950 text-amber-300 border border-amber-800/60 hover:bg-amber-900 transition-colors"
                          title="Mark Follow-up Complete"
                        >
                          Clear
                        </button>

                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="px-2 py-0.5 rounded bg-brand-600 hover:bg-brand-500 text-white text-[11px] font-semibold transition-colors"
                        >
                          Open
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ───────────────────────────────────────────────────────────── */}
        {/* COLUMN 4: ⏸️ NOT FOLLOWS (On Track / Cold) */}
        {/* ───────────────────────────────────────────────────────────── */}
        <div className="bg-navy-900 rounded-xl border border-navy-750 p-3.5 shadow-panel space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-navy-750 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-500" />
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                4. Not Follows
              </h3>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-navy-800 text-slate-400 border border-navy-700">
              {notFollowsLeads.length} On Track
            </span>
          </div>

          {/* Column 4 Cards */}
          <div className="space-y-2.5 max-h-[820px] overflow-y-auto pr-0.5 pipeline-column-scroll">
            {notFollowsLeads.length === 0 ? (
              <div className="p-6 text-center bg-navy-850 rounded-lg border border-navy-800 text-slate-400 text-xs">
                <FiCheckCircle className="w-5 h-5 text-slate-600 mx-auto mb-1" />
                <p className="font-medium text-slate-300">No records in this column</p>
              </div>
            ) : (
              notFollowsLeads.map(lead => {
                const assignedAdmin = users.find(u => u.id === lead.assignedAdminId);
                const initials = lead.fullName.split(' ').map(n => n[0]).join('').slice(0, 2);

                return (
                  <div
                    key={lead.id}
                    className="bg-navy-850 rounded-lg border border-navy-750 p-3 transition-all hover:border-slate-500 group"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-1.5 mb-1.5">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-7 h-7 rounded bg-navy-900 border border-navy-700 flex items-center justify-center font-bold text-slate-400 text-xs shrink-0">
                          {initials}
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-semibold text-xs text-slate-100 truncate group-hover:text-sky-300 transition-colors">
                            {lead.fullName}
                          </h4>
                          <p className="text-[10px] text-slate-400 truncate">{lead.company}</p>
                        </div>
                      </div>

                      <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 rounded bg-navy-800 text-slate-400 border border-navy-700">
                        ON TRACK
                      </span>
                    </div>

                    {/* Value & Score */}
                    <div className="flex justify-between items-center text-[11px] font-mono py-1 px-1.5 rounded bg-navy-900 border border-navy-800 mb-2 text-slate-300">
                      <span className="font-semibold text-slate-200">₹{lead.estimatedValue.toLocaleString('en-IN')}</span>
                      <span className="text-slate-400 text-[10px]">{lead.score}pts</span>
                    </div>

                    {/* Status note */}
                    <p className="text-[10px] text-slate-400 mb-2 line-clamp-1">
                      {lead.notes || 'Routine qualification on schedule.'}
                    </p>

                    {/* Action Controls */}
                    <div className="pt-2 border-t border-navy-800 flex items-center justify-between text-xs">
                      <span className="text-[10px] text-slate-400 truncate max-w-[65px]">
                        {assignedAdmin ? assignedAdmin.name.split(' ')[0] : 'Admin'}
                      </span>

                      <div className="flex items-center gap-1">
                        {/* Flag Follow-up needed */}
                        <button
                          onClick={() => toggleLeadFollowUp(lead.id)}
                          className="px-2 py-0.5 rounded text-[10px] font-semibold bg-navy-800 hover:bg-amber-950 text-slate-300 hover:text-amber-300 border border-navy-700 transition-colors"
                          title="Flag Follow-Up Needed"
                        >
                          Set Follow
                        </button>

                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="px-2 py-0.5 rounded bg-navy-800 hover:bg-navy-750 text-slate-200 text-[11px] font-semibold border border-navy-700 transition-colors"
                        >
                          Open
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* QUICK FOLLOW-UP SCHEDULER MODAL */}
      {/* ========================================================================= */}
      {schedulingLead && (
        <Modal
          isOpen={Boolean(schedulingLead)}
          onClose={() => setSchedulingLead(null)}
          title={`Schedule Follow-Up Task for ${schedulingLead.fullName}`}
          subtitle={`${schedulingLead.company} • Est. Value: ₹${schedulingLead.estimatedValue.toLocaleString('en-IN')}`}
          maxWidth="md"
          icon={FiCalendar}
        >
          <form onSubmit={handleSaveSchedule} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Next Action Directive *</label>
              <textarea
                rows={3}
                required
                value={scheduleActionText}
                onChange={e => setScheduleActionText(e.target.value)}
                placeholder="e.g. Conduct 30-min Meta Advantage+ setup demo and review Q4 budget"
                className="w-full px-3 py-2 rounded-lg bg-navy-800 border border-navy-700 text-slate-100 text-xs focus:outline-none focus:border-brand-500 leading-relaxed"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Target Follow-Up Date & Time *</label>
              <input
                type="text"
                required
                value={scheduleDateText}
                onChange={e => setScheduleDateText(e.target.value)}
                placeholder="e.g. Tomorrow, 2:00 PM EST"
                className="w-full px-3 py-2 rounded-lg bg-navy-800 border border-navy-700 text-slate-100 text-xs focus:outline-none focus:border-brand-500 font-mono"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-navy-750">
              <button
                type="button"
                onClick={() => setSchedulingLead(null)}
                className="px-3.5 py-1.5 rounded-lg bg-navy-800 hover:bg-navy-750 text-slate-300 font-semibold text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-subtle flex items-center gap-1.5"
              >
                <FiCheck className="w-3.5 h-3.5" />
                <span>Save Follow-Up</span>
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Lead Action Drawer */}
      <LeadActionDrawer
        isOpen={Boolean(selectedLead)}
        onClose={() => setSelectedLead(null)}
        lead={selectedLead}
      />
    </div>
  );
};
