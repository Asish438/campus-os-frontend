import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Lead, LeadStatus, LeadsSubTab, LeadSource } from '../../types';
import { Badge } from '../common/Badge';
import { LeadActionDrawer } from './LeadActionDrawer';
import { AddLeadModal } from './AddLeadModal';
import { 
  FiTarget, 
  FiSearch, 
  FiDownload, 
  FiPlus, 
  FiChevronRight,
  FiPhone,
  FiMail,
  FiClock
} from 'react-icons/fi';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

export const LeadsView: React.FC = () => {
  const { 
    filteredLeads, 
    leadsSubTab, 
    setLeadsSubTab, 
    users, 
    exportLeadsCSV 
  } = useApp();

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [adminFilter, setAdminFilter] = useState<string>('all');

  // SubTab counts
  const allCount = filteredLeads.length;
  const newCount = filteredLeads.filter(l => l.status === 'new').length;
  const oldCount = filteredLeads.filter(l => l.status !== 'new').length;

  // Filtered Leads
  const processedLeads = useMemo(() => {
    return filteredLeads.filter(lead => {
      // 1. SubTab filter
      if (leadsSubTab === 'new' && lead.status !== 'new') return false;
      if (leadsSubTab === 'old' && lead.status === 'new') return false;

      // 2. Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches = 
          lead.fullName.toLowerCase().includes(q) ||
          lead.company.toLowerCase().includes(q) ||
          lead.email.toLowerCase().includes(q) ||
          lead.campaignName.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // 3. Source filter
      if (sourceFilter !== 'all' && lead.source !== sourceFilter) return false;

      // 4. Status filter
      if (statusFilter !== 'all' && lead.status !== statusFilter) return false;

      // 5. Admin filter
      if (adminFilter !== 'all' && lead.assignedAdminId !== adminFilter) return false;

      return true;
    });
  }, [filteredLeads, leadsSubTab, searchQuery, sourceFilter, statusFilter, adminFilter]);

  const statusVariantMap: Record<LeadStatus, 'emerald' | 'blue' | 'purple' | 'amber' | 'rose'> = {
    new: 'emerald',
    contacted: 'blue',
    qualified: 'purple',
    closed: 'emerald',
    lost: 'rose',
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Top Header & Segmented Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-navy-900 border border-navy-750 p-3.5 rounded-xl shadow-panel">
        {/* Segmented Control Header: [ All Leads | New Leads | Old Leads ] */}
        <div className="flex items-center p-1 bg-navy-950 rounded-lg border border-navy-800 self-start sm:self-auto">
          <button
            onClick={() => setLeadsSubTab('all')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-2 transition-colors ${
              leadsSubTab === 'all'
                ? 'bg-navy-800 text-white font-semibold shadow-subtle border border-navy-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>All Leads</span>
            <span className="text-[10px] px-1.5 rounded font-mono bg-navy-900 text-slate-300">
              {allCount}
            </span>
          </button>

          <button
            onClick={() => setLeadsSubTab('new')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-2 transition-colors ${
              leadsSubTab === 'new'
                ? 'bg-emerald-950 text-emerald-300 font-semibold border border-emerald-800/60'
                : 'text-emerald-400/90 hover:text-emerald-300'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>New Leads (Active Inbound)</span>
            <span className="text-[10px] px-1.5 rounded font-mono bg-emerald-900/60 text-emerald-300 border border-emerald-700/50">
              {newCount}
            </span>
          </button>

          <button
            onClick={() => setLeadsSubTab('old')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-2 transition-colors ${
              leadsSubTab === 'old'
                ? 'bg-navy-800 text-slate-200 font-semibold border border-navy-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Old / Contacted Leads</span>
            <span className="text-[10px] px-1.5 rounded font-mono bg-navy-900 text-slate-400">
              {oldCount}
            </span>
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => exportLeadsCSV(processedLeads)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-800 hover:bg-navy-750 text-slate-200 text-xs font-semibold border border-navy-700 transition-colors"
            title="Export filtered leads to CSV"
          >
            <FiDownload className="w-3.5 h-3.5 text-sky-400" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setIsAddLeadOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-subtle transition-colors"
          >
            <FiPlus className="w-3.5 h-3.5" />
            <span>Capture Inbound Lead</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2.5 bg-navy-900 border border-navy-750 p-3 rounded-xl shadow-panel text-xs">
        {/* Search */}
        <div className="lg:col-span-4 relative">
          <FiSearch className="absolute left-3 top-2.5 text-slate-400 w-3.5 h-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search leads by name, organization, or campaign..."
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

        {/* Status Filter */}
        <div className="lg:col-span-2">
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="w-full px-2.5 py-1.5 rounded-lg bg-navy-800 border border-navy-700 text-slate-200 text-xs focus:outline-none focus:border-brand-500"
          >
            <option value="all">All Pipeline Stages</option>
            <option value="new">🟢 New</option>
            <option value="contacted">🔵 Contacted</option>
            <option value="qualified">🟣 Qualified</option>
            <option value="closed">🟢 Closed Deal</option>
            <option value="lost">🔴 Lost</option>
          </select>
        </div>

        {/* Admin Filter */}
        <div className="lg:col-span-3">
          <select
            value={adminFilter}
            onChange={e => setAdminFilter(e.target.value)}
            className="w-full px-2.5 py-1.5 rounded-lg bg-navy-800 border border-navy-700 text-slate-200 text-xs focus:outline-none focus:border-brand-500"
          >
            <option value="all">All Assigned Media Leads</option>
            {users.map(u => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-navy-900 border border-navy-750 rounded-xl overflow-hidden shadow-panel">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-navy-950 text-slate-400 uppercase font-mono text-[10px] border-b border-navy-750">
              <tr>
                <th className="py-3 px-4">Lead Name & Organization</th>
                <th className="py-3 px-4">Ad Source Attribution</th>
                <th className="py-3 px-4">Pipeline Status</th>
                <th className="py-3 px-4">Target Value</th>
                <th className="py-3 px-4">Assigned Admin</th>
                <th className="py-3 px-4">Ingestion Time</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-800">
              {processedLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-slate-400">
                    <FiTarget className="w-6 h-6 text-slate-600 mx-auto mb-1.5" />
                    <p className="font-semibold text-slate-300">No leads in this queue</p>
                  </td>
                </tr>
              ) : (
                processedLeads.map(lead => {
                  const assignedAdmin = users.find(u => u.id === lead.assignedAdminId);
                  const isInstagram = lead.source.includes('Instagram');

                  return (
                    <tr
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className="hover:bg-navy-800/50 transition-colors cursor-pointer group"
                    >
                      {/* Name & Company */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded bg-navy-800 border border-navy-700 flex items-center justify-center font-bold text-sky-400 text-xs shrink-0">
                            {lead.fullName.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-100 group-hover:text-sky-300 transition-colors">
                              {lead.fullName}
                            </p>
                            <p className="text-[11px] text-slate-400">
                              {lead.company}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Ad Source */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {isInstagram ? (
                            <FaInstagram className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                          ) : (
                            <FaFacebook className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                          )}
                          <div>
                            <span className="font-medium text-slate-200 block">{lead.source}</span>
                            <span className="text-[10px] text-slate-400 line-clamp-1 max-w-[180px]">
                              {lead.campaignName}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Status Badge */}
                      <td className="py-3 px-4">
                        <Badge variant={statusVariantMap[lead.status]} size="sm" dot={lead.status === 'new'}>
                          {lead.status.toUpperCase()}
                        </Badge>
                      </td>

                      {/* Value & Score */}
                      <td className="py-3 px-4 font-mono">
                        <span className="font-semibold text-emerald-400">
                          ₹{lead.estimatedValue.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] text-slate-400 block font-sans">
                          Score: {lead.score}/100
                        </span>
                      </td>

                      {/* Assigned Admin */}
                      <td className="py-3 px-4">
                        {assignedAdmin ? (
                          <div className="flex items-center gap-2">
                            <img
                              src={assignedAdmin.avatar}
                              alt={assignedAdmin.name}
                              className="w-4 h-4 rounded-full object-cover"
                            />
                            <span className="text-slate-300 text-[11px] truncate max-w-[100px]">
                              {assignedAdmin.name}
                            </span>
                          </div>
                        ) : (
                          <span className="text-slate-500">Unassigned</span>
                        )}
                      </td>

                      {/* Captured Time & SLA */}
                      <td className="py-3 px-4 text-slate-400 text-[11px] font-mono">
                        {new Date(lead.dateCaptured).toLocaleDateString()}
                        {lead.status === 'new' ? (
                          <span className="text-[10px] text-amber-400 font-semibold block">
                            SLA: 7m left
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-500 block">
                            {new Date(lead.dateCaptured).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        )}
                      </td>

                      {/* Action */}
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedLead(lead);
                          }}
                          className="px-2 py-1 rounded bg-navy-800 hover:bg-brand-600 hover:text-white text-slate-300 text-[11px] font-semibold border border-navy-700 transition-colors inline-flex items-center gap-1"
                        >
                          <span>Open Dossier</span>
                          <FiChevronRight className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Action Drawer */}
      <LeadActionDrawer
        isOpen={Boolean(selectedLead)}
        onClose={() => setSelectedLead(null)}
        lead={selectedLead}
      />

      {/* Add Lead Modal */}
      <AddLeadModal
        isOpen={isAddLeadOpen}
        onClose={() => setIsAddLeadOpen(false)}
      />
    </div>
  );
};
