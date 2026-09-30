import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Users, 
  UserCheck, 
  FileCheck, 
  Clock, 
  XCircle, 
  UserPlus, 
  Search, 
  Filter, 
  Eye, 
  Edit3, 
  ShieldAlert, 
  Power,
  RefreshCw
} from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { StatCard } from '../components/common/StatCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { Pagination } from '../components/common/Pagination';
import { EmptyState } from '../components/common/EmptyState';
import { TableSkeleton } from '../components/common/LoadingSkeleton';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { memberService } from '../services/apiService';
import { Member, KYCStatus } from '../types';
import { useToast } from '../context/ToastContext';

export const MembersPage: React.FC = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [kycFilter, setKycFilter] = useState('All');
  const [branchFilter, setBranchFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Confirmation dialog state
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [showStatusConfirm, setShowStatusConfirm] = useState(false);

  const loadMembers = async () => {
    setLoading(true);
    try {
      const data = await memberService.getAll();
      setMembers(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  // Stats calculation
  const totalCount = members.length;
  const activeCount = members.filter(m => m.accountStatus === 'Active').length;
  const pendingKycCount = members.filter(m => m.kycStatus === 'Pending' || m.kycStatus === 'Under Review').length;
  const approvedKycCount = members.filter(m => m.kycStatus === 'Approved').length;
  const rejectedKycCount = members.filter(m => m.kycStatus === 'Rejected').length;

  // Filtered members
  const filtered = useMemo(() => {
    return members.filter(m => {
      const matchesSearch = 
        m.fullName.toLowerCase().includes(search.toLowerCase()) ||
        m.id.toLowerCase().includes(search.toLowerCase()) ||
        m.mobile.includes(search) ||
        m.email.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = statusFilter === 'All' || m.accountStatus === statusFilter;
      const matchesKyc = kycFilter === 'All' || m.kycStatus === kycFilter;
      const matchesBranch = branchFilter === 'All' || m.branch === branchFilter;

      return matchesSearch && matchesStatus && matchesKyc && matchesBranch;
    });
  }, [members, search, statusFilter, kycFilter, branchFilter]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleToggleStatus = async () => {
    if (!selectedMember) return;
    try {
      await memberService.toggleAccountStatus(selectedMember.id);
      addToast({
        type: 'success',
        title: 'Status Updated',
        message: `Member ${selectedMember.fullName} is now ${
          selectedMember.accountStatus === 'Active' ? 'Inactive' : 'Active'
        }.`
      });
      setShowStatusConfirm(false);
      loadMembers();
    } catch {
      addToast({
        type: 'error',
        message: 'Failed to update member status.'
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title="Members & KYC"
        subtitle="Manage members, profiles and KYC verification."
        breadcrumbs={[{ label: 'Dashboard', url: '/dashboard' }, { label: 'Members & KYC' }]}
        actions={
          <div className="flex items-center gap-3">
            <button
              onClick={loadMembers}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <Link
              to="/members/add"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold shadow-sm shadow-blue-500/20 transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              <span>+ Add Member</span>
            </Link>
          </div>
        }
      />

      {/* 5 Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        <StatCard
          title="Total Members"
          value={totalCount}
          icon={<Users className="w-5 h-5" />}
          color="blue"
        />
        <StatCard
          title="Active Members"
          value={activeCount}
          icon={<UserCheck className="w-5 h-5" />}
          color="emerald"
        />
        <StatCard
          title="Pending KYC"
          value={pendingKycCount}
          icon={<Clock className="w-5 h-5" />}
          color="amber"
          onClick={() => setKycFilter('Pending')}
        />
        <StatCard
          title="KYC Approved"
          value={approvedKycCount}
          icon={<FileCheck className="w-5 h-5" />}
          color="indigo"
          onClick={() => setKycFilter('Approved')}
        />
        <StatCard
          title="KYC Rejected"
          value={rejectedKycCount}
          icon={<XCircle className="w-5 h-5" />}
          color="red"
          onClick={() => setKycFilter('Rejected')}
        />
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm space-y-3">
        <div className="flex flex-col lg:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={e => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by name, member ID or mobile..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            {/* Account Status Filter */}
            <select
              value={statusFilter}
              onChange={e => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="All">Status: All</option>
              <option value="Active">Status: Active</option>
              <option value="Inactive">Status: Inactive</option>
            </select>

            {/* KYC Status Filter */}
            <select
              value={kycFilter}
              onChange={e => {
                setKycFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="All">KYC: All</option>
              <option value="Approved">KYC: Approved</option>
              <option value="Pending">KYC: Pending</option>
              <option value="Under Review">KYC: Under Review</option>
              <option value="Rejected">KYC: Rejected</option>
            </select>

            {/* Branch Filter */}
            <select
              value={branchFilter}
              onChange={e => {
                setBranchFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="All">Branch: All Branches</option>
              <option value="Bhubaneswar Main Branch">Bhubaneswar Main</option>
              <option value="Cuttack Link Road Branch">Cuttack Link Rd</option>
              <option value="Puri Grand Road Branch">Puri Grand Rd</option>
              <option value="Rourkela Civil Township Branch">Rourkela Civil</option>
              <option value="Sambalpur VSS Marg Branch">Sambalpur VSS</option>
            </select>
          </div>
        </div>
      </div>

      {/* Member Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm overflow-hidden">
        {loading ? (
          <TableSkeleton rows={8} />
        ) : filtered.length === 0 ? (
          <EmptyState
            title="No members found"
            description="No member profiles match your current search query or filter selection."
            actionText="Clear Filters"
            onAction={() => {
              setSearch('');
              setStatusFilter('All');
              setKycFilter('All');
              setBranchFilter('All');
            }}
          />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-750 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-100 dark:border-slate-700/80">
                  <tr>
                    <th className="px-4 py-3">Member ID</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Mobile</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">KYC Status</th>
                    <th className="px-4 py-3">Account Status</th>
                    <th className="px-4 py-3">Joining Date</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                  {paginated.map(member => (
                    <tr key={member.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-750/50 transition-colors">
                      <td className="px-4 py-3.5 font-mono font-bold text-blue-600 dark:text-blue-400">
                        {member.id}
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="font-semibold text-slate-900 dark:text-white">
                          {member.fullName}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {member.branch}
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-slate-600 dark:text-slate-300 font-mono">
                        {member.mobile}
                      </td>
                      <td className="px-4 py-3.5 text-slate-500 dark:text-slate-400 max-w-[180px] truncate">
                        {member.email}
                      </td>
                      <td className="px-4 py-3.5">
                        <StatusBadge status={member.kycStatus} />
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          member.accountStatus === 'Active'
                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                            : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400'
                        }`}>
                          {member.accountStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-slate-500 dark:text-slate-400">
                        {member.joiningDate}
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {/* View Button */}
                          <button
                            onClick={() => navigate(`/members/${member.id}`)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 dark:hover:text-blue-400 transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* KYC Shortcut */}
                          <button
                            onClick={() => navigate(`/members/${member.id}?tab=kyc`)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/40 dark:hover:text-amber-400 transition-colors"
                            title="Verify KYC"
                          >
                            <ShieldAlert className="w-4 h-4" />
                          </button>

                          {/* Toggle Active / Deactivate */}
                          <button
                            onClick={() => {
                              setSelectedMember(member);
                              setShowStatusConfirm(true);
                            }}
                            className={`p-1.5 rounded-lg transition-colors ${
                              member.accountStatus === 'Active'
                                ? 'text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40'
                                : 'text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
                            }`}
                            title={member.accountStatus === 'Active' ? 'Deactivate Member' : 'Activate Member'}
                          >
                            <Power className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              totalItems={filtered.length}
              pageSize={pageSize}
            />
          </>
        )}
      </div>

      {/* Confirmation Dialog for Status Toggle */}
      <ConfirmDialog
        isOpen={showStatusConfirm}
        onClose={() => setShowStatusConfirm(false)}
        onConfirm={handleToggleStatus}
        title={selectedMember?.accountStatus === 'Active' ? 'Deactivate Member' : 'Activate Member'}
        message={`Are you sure you want to ${
          selectedMember?.accountStatus === 'Active' ? 'deactivate' : 'activate'
        } ${selectedMember?.fullName} (${selectedMember?.id})?`}
        confirmText={selectedMember?.accountStatus === 'Active' ? 'Deactivate' : 'Activate'}
        variant={selectedMember?.accountStatus === 'Active' ? 'danger' : 'success'}
      />
    </div>
  );
};
