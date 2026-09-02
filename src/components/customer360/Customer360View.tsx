import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { CustomerProfile } from '../../types';
import { StatCard } from '../common/StatCard';
import { Badge } from '../common/Badge';
import { CustomerDrawer } from './CustomerDrawer';
import { 
  FiUsers, 
  FiAward, 
  FiTrendingUp, 
  FiSearch, 
  FiChevronRight,
  FiFilter,
  FiLayers,
  FiShield,
  FiActivity
} from 'react-icons/fi';
import { FaInstagram, FaFacebook, FaRupeeSign } from 'react-icons/fa';

export const Customer360View: React.FC = () => {
  const { 
    filteredCustomers, 
    users,
    setActiveTab 
  } = useApp();

  const [selectedCustomer, setSelectedCustomer] = useState<CustomerProfile | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [adminFilter, setAdminFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Aggregates
  const totalLtv = useMemo(() => 
    filteredCustomers.reduce((acc, c) => acc + c.ltv, 0), [filteredCustomers]);

  const totalDeals = useMemo(() => 
    filteredCustomers.reduce((acc, c) => acc + c.dealsCount, 0), [filteredCustomers]);

  const averageLtv = useMemo(() => {
    if (filteredCustomers.length === 0) return 0;
    return Math.round(totalLtv / filteredCustomers.length);
  }, [filteredCustomers, totalLtv]);

  // Filtered Customer Dossiers
  const displayedCustomers = useMemo(() => {
    return filteredCustomers.filter(c => {
      if (adminFilter !== 'all' && c.assignedAdminId !== adminFilter) return false;
      if (statusFilter !== 'all' && c.status !== statusFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          c.fullName.toLowerCase().includes(q) ||
          c.company.toLowerCase().includes(q) ||
          c.industry.toLowerCase().includes(q) ||
          c.convertingCampaignName.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [filteredCustomers, adminFilter, statusFilter, searchQuery]);

  return (
    <div className="space-y-6 pb-16">
      {/* Top Header */}
      <div className="p-4 rounded-xl bg-navy-900 border border-navy-750 shadow-panel flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-100">Customer 360 & Multi-Touch Attribution Dossiers</h2>
            <Badge variant="emerald" size="sm">{filteredCustomers.length} Managed Accounts</Badge>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Full-spectrum customer profiles connecting Meta ad creatives and campaign touchpoints to realized lifetime value (LTV).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('leadPipeline')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-800 hover:bg-navy-750 text-sky-400 text-xs font-semibold border border-navy-700 transition-colors"
          >
            <FiActivity className="w-3.5 h-3.5" />
            <span>Open Lead Pipeline</span>
            <FiChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Top KPI Metrics Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <StatCard
          title="Attributed Customer LTV"
          value={`₹${totalLtv.toLocaleString('en-IN')}`}
          trend={{ value: '24.5%', isPositive: true }}
          subtitle="Closed client retainer ARR"
          icon={FaRupeeSign}
        />

        <StatCard
          title="Average Account Value"
          value={`₹${averageLtv.toLocaleString('en-IN')}`}
          trend={{ value: '16.2%', isPositive: true }}
          subtitle="Per retained organization"
          icon={FiTrendingUp}
        />

        <StatCard
          title="Retainer Contracts Closed"
          value={`${totalDeals} Contracts`}
          subtitle="Directly attributed to Meta Ads"
          icon={FiAward}
        />

        <StatCard
          title="Average Inbound SLA"
          value="< 8 mins"
          subtitle="Meta Instant Lead velocity"
          icon={FiShield}
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
            placeholder="Search accounts, companies, industries, or campaigns..."
            className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-navy-800 border border-navy-700 text-slate-100 text-xs placeholder-slate-500 focus:outline-none focus:border-brand-500"
          />
        </div>

        {/* Status Filter */}
        <div className="lg:col-span-3">
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="w-full px-2.5 py-1.5 rounded-lg bg-navy-800 border border-navy-700 text-slate-200 text-xs focus:outline-none focus:border-brand-500"
          >
            <option value="all">All Account Statuses</option>
            <option value="active">Active Retainers</option>
            <option value="vip">VIP Accounts</option>
            <option value="churned">Churned</option>
          </select>
        </div>

        {/* Admin Filter */}
        <div className="lg:col-span-4">
          <select
            value={adminFilter}
            onChange={e => setAdminFilter(e.target.value)}
            className="w-full px-2.5 py-1.5 rounded-lg bg-navy-800 border border-navy-700 text-slate-200 text-xs focus:outline-none focus:border-brand-500"
          >
            <option value="all">All Assigned Media Leads</option>
            {users.map(u => (
              <option key={u.id} value={u.id}>
                {u.name} ({u.role === 'super_admin' ? 'Super Admin' : 'Admin'})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Customer 360 Dossiers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
        {displayedCustomers.map(customer => {
          const assignedAdmin = users.find(u => u.id === customer.assignedAdminId);
          const initials = customer.fullName.split(' ').map(n => n[0]).join('').slice(0, 2);

          return (
            <div
              key={customer.id}
              onClick={() => setSelectedCustomer(customer)}
              className="bg-navy-900 rounded-xl border border-navy-750 p-4 shadow-panel hover:border-slate-600 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    {customer.avatar ? (
                      <img
                        src={customer.avatar}
                        alt={customer.fullName}
                        className="w-10 h-10 rounded-lg object-cover ring-1 ring-navy-700"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-navy-800 border border-navy-700 flex items-center justify-center font-bold text-sky-400 text-xs">
                        {initials}
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold text-xs text-slate-100 group-hover:text-sky-300 transition-colors">
                        {customer.fullName}
                      </h3>
                      <p className="text-[11px] text-slate-400">{customer.company}</p>
                      <span className="text-[10px] text-slate-500">{customer.industry}</span>
                    </div>
                  </div>

                  <Badge variant={customer.status === 'vip' ? 'amber' : 'emerald'} size="sm">
                    {customer.status.toUpperCase()}
                  </Badge>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-2 mb-3 font-mono">
                  <div className="p-2 rounded bg-navy-950 border border-navy-800">
                    <span className="text-[10px] text-slate-400 font-sans block">Contract Value</span>
                    <span className="font-bold text-emerald-400 text-xs">
                      ₹{customer.ltv.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="p-2 rounded bg-navy-950 border border-navy-800">
                    <span className="text-[10px] text-slate-400 font-sans block">Closed Deals</span>
                    <span className="font-bold text-sky-400 text-xs">
                      {customer.dealsCount} Retainers
                    </span>
                  </div>
                </div>

                {/* Ad Attribution */}
                <div className="p-2.5 rounded bg-navy-850 border border-navy-750 space-y-1 text-xs mb-3">
                  <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                    Meta Ad Source Attribution:
                  </span>
                  <div className="flex items-center gap-1.5 text-slate-200 text-[11px]">
                    <FaInstagram className="w-3 h-3 text-pink-400 shrink-0" />
                    <span className="truncate">{customer.convertingCampaignName}</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-2.5 border-t border-navy-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  {assignedAdmin && (
                    <span className="text-[11px] text-slate-400">
                      Lead: <strong className="text-slate-300">{assignedAdmin.name.split(' ')[0]}</strong>
                    </span>
                  )}
                </div>

                <span className="text-sky-400 font-medium text-[11px] flex items-center gap-1">
                  <span>View 360 Dossier</span>
                  <FiChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Multi-Touch Progression Visual Engine */}
      <div className="bg-navy-900 rounded-xl border border-navy-750 p-5 shadow-panel space-y-5">
        <div>
          <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
            <FiLayers className="text-brand-400" />
            <span>Multi-Touch Meta Attribution & Lifecycle Engine</span>
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Real-time multi-touch attribution mapping initial ad engagement to closed retainer contracts and lifetime revenue.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3.5">
          <div className="p-3.5 rounded-lg bg-navy-850 border border-navy-750">
            <div className="flex items-center justify-between mb-1.5">
              <span className="w-5 h-5 rounded-full bg-blue-600/20 text-blue-400 font-mono text-[10px] flex items-center justify-center font-bold border border-blue-500/30">
                1
              </span>
              <span className="text-[10px] font-mono text-slate-400">Awareness</span>
            </div>
            <h4 className="font-semibold text-xs text-slate-100">Meta Creative Exposure</h4>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              Prospect interacts with Instagram Reels Video or Facebook Feed Carousel.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-navy-850 border border-navy-750">
            <div className="flex items-center justify-between mb-1.5">
              <span className="w-5 h-5 rounded-full bg-emerald-600/20 text-emerald-400 font-mono text-[10px] flex items-center justify-center font-bold border border-emerald-500/30">
                2
              </span>
              <span className="text-[10px] font-mono text-slate-400">Instant Lead</span>
            </div>
            <h4 className="font-semibold text-xs text-slate-100">Webhook Ingestion</h4>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              Form submission triggers instantaneous CRM lead record creation with 15m response SLA.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-navy-850 border border-navy-750">
            <div className="flex items-center justify-between mb-1.5">
              <span className="w-5 h-5 rounded-full bg-amber-600/20 text-amber-400 font-mono text-[10px] flex items-center justify-center font-bold border border-amber-500/30">
                3
              </span>
              <span className="text-[10px] font-mono text-slate-400">Pipeline</span>
            </div>
            <h4 className="font-semibold text-xs text-slate-100">VoIP Discovery & Scope</h4>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              Media buyers conduct outreach, log follow-up actions, and advance pipeline stages.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-navy-850 border border-navy-750">
            <div className="flex items-center justify-between mb-1.5">
              <span className="w-5 h-5 rounded-full bg-purple-600/20 text-purple-400 font-mono text-[10px] flex items-center justify-center font-bold border border-purple-500/30">
                4
              </span>
              <span className="text-[10px] font-mono text-slate-400">Retainer</span>
            </div>
            <h4 className="font-semibold text-xs text-slate-100">360 Dossier & Invoicing</h4>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              Contract signed, retainer invoiced, and multi-touch LTV tracked continuously.
            </p>
          </div>
        </div>
      </div>

      {/* Customer 360 Drawer */}
      <CustomerDrawer
        isOpen={Boolean(selectedCustomer)}
        onClose={() => setSelectedCustomer(null)}
        customer={selectedCustomer}
      />
    </div>
  );
};
