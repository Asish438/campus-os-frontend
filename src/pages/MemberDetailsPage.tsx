import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Briefcase, 
  ShieldCheck, 
  ShieldAlert, 
  FileText, 
  ArrowLeft,
  PiggyBank,
  Repeat,
  Landmark,
  Banknote,
  Receipt,
  CheckCircle,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Eye,
  ExternalLink
} from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { StatusBadge } from '../components/common/StatusBadge';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { EmptyState } from '../components/common/EmptyState';
import { memberService, savingsService, rdService, fdService, loanService } from '../services/apiService';
import { Member, SavingsAccount, RDAccount, FDAccount, Loan, Transaction, KYCStatus } from '../types';
import { INITIAL_TRANSACTIONS, formatINR } from '../mock/mockData';
import { useToast } from '../context/ToastContext';

export const MemberDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToast } = useToast();

  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>(searchParams.get('tab') || 'overview');

  // Related data
  const [savings, setSavings] = useState<SavingsAccount[]>([]);
  const [rds, setRds] = useState<RDAccount[]>([]);
  const [fds, setFds] = useState<FDAccount[]>([]);
  const [loans, setLoans] = useState<Loan[]>([]);
  const [txns, setTxns] = useState<Transaction[]>([]);

  // KYC modal states
  const [showApproveConfirm, setShowApproveConfirm] = useState(false);
  const [showRejectConfirm, setShowRejectConfirm] = useState(false);
  const [showReuploadConfirm, setShowReuploadConfirm] = useState(false);

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam) setActiveTab(tabParam);
  }, [searchParams]);

  const loadData = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const [m, allSavings, allRds, allFds, allLoans] = await Promise.all([
        memberService.getById(id),
        savingsService.getAll(),
        rdService.getAll(),
        fdService.getAll(),
        loanService.getAll(),
      ]);

      if (m) {
        setMember(m);
        setSavings(allSavings.filter(s => s.memberId === m.id));
        setRds(allRds.filter(r => r.memberId === m.id));
        setFds(allFds.filter(f => f.memberId === m.id));
        setLoans(allLoans.filter(l => l.memberId === m.id));
        setTxns(INITIAL_TRANSACTIONS.filter(t => t.memberId === m.id || t.memberName === m.fullName));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const handleKycApprove = async () => {
    if (!member) return;
    try {
      await memberService.updateKyc(member.id, 'Approved');
      addToast({
        type: 'success',
        title: 'KYC Approved',
        message: `KYC documents for ${member.fullName} verified & approved successfully.`
      });
      setShowApproveConfirm(false);
      loadData();
    } catch {
      addToast({ type: 'error', message: 'Failed to update KYC.' });
    }
  };

  const handleKycReject = async (reason?: string) => {
    if (!member) return;
    try {
      await memberService.updateKyc(member.id, 'Rejected', reason);
      addToast({
        type: 'warning',
        title: 'KYC Rejected',
        message: `KYC rejected for ${member.fullName}. Remarks saved.`
      });
      setShowRejectConfirm(false);
      loadData();
    } catch {
      addToast({ type: 'error', message: 'Failed to reject KYC.' });
    }
  };

  const handleKycReupload = async () => {
    if (!member) return;
    try {
      await memberService.updateKyc(member.id, 'Pending', 'Re-upload requested by compliance officer');
      addToast({
        type: 'info',
        title: 'Re-upload Requested',
        message: `Re-upload request dispatched to member ${member.fullName}.`
      });
      setShowReuploadConfirm(false);
      loadData();
    } catch {
      addToast({ type: 'error', message: 'Failed to request re-upload.' });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-slate-500">Loading member profile...</p>
        </div>
      </div>
    );
  }

  if (!member) {
    return (
      <EmptyState
        title="Member Not Found"
        description="The requested member account does not exist or has been removed."
        actionText="Back to Members"
        onAction={() => navigate('/members')}
      />
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <User className="w-4 h-4" /> },
    { id: 'kyc', label: 'KYC Documents', icon: <FileText className="w-4 h-4" />, badge: member.kycStatus },
    { id: 'savings', label: 'Savings', icon: <PiggyBank className="w-4 h-4" />, count: savings.length },
    { id: 'rd', label: 'RD Accounts', icon: <Repeat className="w-4 h-4" />, count: rds.length },
    { id: 'fd', label: 'FD Accounts', icon: <Landmark className="w-4 h-4" />, count: fds.length },
    { id: 'loans', label: 'Loans', icon: <Banknote className="w-4 h-4" />, count: loans.length },
    { id: 'transactions', label: 'Transactions', icon: <Receipt className="w-4 h-4" />, count: txns.length },
  ];

  return (
    <div className="space-y-6">
      {/* Top Breadcrumbs */}
      <PageHeader
        title={member.fullName}
        subtitle={`Member ID: ${member.id} • Registered under ${member.branch}`}
        breadcrumbs={[
          { label: 'Dashboard', url: '/dashboard' },
          { label: 'Members', url: '/members' },
          { label: member.fullName }
        ]}
        actions={
          <button
            onClick={() => navigate('/members')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs sm:text-sm font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Members</span>
          </button>
        }
      />

      {/* Member Profile Hero Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-extrabold text-xl sm:text-2xl flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
              {member.firstName[0]}{member.lastName[0]}
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  {member.fullName}
                </h2>
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                  {member.id}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1 font-mono">
                  <Phone className="w-3.5 h-3.5" />
                  {member.mobile}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" />
                  {member.email}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {member.city}, {member.state}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-row sm:flex-col items-start sm:items-end gap-2 shrink-0 border-t sm:border-t-0 pt-4 sm:pt-0 border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Account:</span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                member.accountStatus === 'Active'
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400'
              }`}>
                {member.accountStatus}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">KYC:</span>
              <StatusBadge status={member.kycStatus} />
            </div>
          </div>
        </div>

        {/* 7 Tabs Bar */}
        <div className="flex items-center gap-1 overflow-x-auto mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/80 scrollbar-none">
          {tabs.map(tab => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSearchParams({ tab: tab.id });
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  active
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-750'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    active ? 'bg-blue-700 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Info Box */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm p-5 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-700/60">
              Personal Information
            </h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block">Full Name</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{member.fullName}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Date of Birth</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{member.dob}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Gender</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{member.gender}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Occupation</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{member.occupation}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Branch</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{member.branch}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Membership Date</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{member.joiningDate}</span>
              </div>
            </div>
          </div>

          {/* Address & Nominee Box */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm p-5 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-700/60">
              Address & Nominee Details
            </h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="col-span-2">
                <span className="text-slate-400 block">Permanent Street Address</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{member.address}</span>
              </div>
              <div>
                <span className="text-slate-400 block">City & State</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{member.city}, {member.state}</span>
              </div>
              <div>
                <span className="text-slate-400 block">PIN Code</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{member.pinCode}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Nominee Name</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{member.nomineeName}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Relationship</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{member.nomineeRelation}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: KYC Documents */}
      {activeTab === 'kyc' && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-700/60">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                KYC Verification Documents
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Uploaded document repository and compliance verification actions
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {member.kycStatus !== 'Approved' && (
                <button
                  type="button"
                  onClick={() => setShowApproveConfirm(true)}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Approve KYC</span>
                </button>
              )}

              {member.kycStatus !== 'Rejected' && (
                <button
                  type="button"
                  onClick={() => setShowRejectConfirm(true)}
                  className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Reject KYC</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setShowReuploadConfirm(true)}
                className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Request Re-upload</span>
              </button>
            </div>
          </div>

          {/* Document list */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {member.documents.map((doc, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/40 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
                    <FileText className="w-5 h-5" />
                  </div>
                  <StatusBadge status={doc.status} />
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {doc.type}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                    {doc.name}
                  </p>
                  {doc.documentNumber && (
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1">
                      Doc No: <span className="font-semibold">{doc.documentNumber}</span>
                    </p>
                  )}
                  {doc.rejectionReason && (
                    <div className="mt-2 p-2 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/40 text-[11px] text-rose-600 dark:text-rose-400">
                      Reason: {doc.rejectionReason}
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-200/80 dark:border-slate-700 flex items-center justify-between text-xs text-slate-400">
                  <span>Uploaded: {doc.uploadedDate}</span>
                  <button 
                    onClick={() => addToast({ type: 'info', title: 'Preview', message: `Previewing ${doc.name}` })}
                    className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>View</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Savings */}
      {activeTab === 'savings' && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm p-5 space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Savings Accounts ({savings.length})
          </h3>
          {savings.length === 0 ? (
            <EmptyState title="No Savings Account" description="This member has not opened a savings account yet." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-750 text-slate-500 dark:text-slate-400 font-semibold">
                  <tr>
                    <th className="px-4 py-3">Account Number</th>
                    <th className="px-4 py-3">Opening Date</th>
                    <th className="px-4 py-3">Balance</th>
                    <th className="px-4 py-3">Interest Rate</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                  {savings.map(acc => (
                    <tr key={acc.accountNumber}>
                      <td className="px-4 py-3 font-mono font-bold text-blue-600 dark:text-blue-400">
                        {acc.accountNumber}
                      </td>
                      <td className="px-4 py-3">{acc.openingDate}</td>
                      <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">
                        {formatINR(acc.balance)}
                      </td>
                      <td className="px-4 py-3">{acc.interestRate}% p.a.</td>
                      <td className="px-4 py-3"><StatusBadge status={acc.status} /></td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => navigate(`/savings/${acc.accountNumber}`)}
                          className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                        >
                          View Statement
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Tab 4: RD */}
      {activeTab === 'rd' && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm p-5 space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Recurring Deposit Accounts ({rds.length})
          </h3>
          {rds.length === 0 ? (
            <EmptyState title="No Recurring Deposits" description="No active or matured RD found for this member." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-750 text-slate-500 dark:text-slate-400 font-semibold">
                  <tr>
                    <th className="px-4 py-3">RD Number</th>
                    <th className="px-4 py-3">Monthly Amount</th>
                    <th className="px-4 py-3">Tenure</th>
                    <th className="px-4 py-3">Paid / Total</th>
                    <th className="px-4 py-3">Maturity Date</th>
                    <th className="px-4 py-3">Maturity Amount</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                  {rds.map(r => (
                    <tr key={r.rdNumber}>
                      <td className="px-4 py-3 font-mono font-bold text-blue-600">{r.rdNumber}</td>
                      <td className="px-4 py-3 font-semibold">{formatINR(r.installmentAmount)}</td>
                      <td className="px-4 py-3">{r.tenureMonths} Months</td>
                      <td className="px-4 py-3">{r.paidInstallments} / {r.totalInstallments}</td>
                      <td className="px-4 py-3">{r.maturityDate}</td>
                      <td className="px-4 py-3 font-bold text-emerald-600">{formatINR(r.maturityAmount)}</td>
                      <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Tab 5: FD */}
      {activeTab === 'fd' && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm p-5 space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Fixed Deposit Accounts ({fds.length})
          </h3>
          {fds.length === 0 ? (
            <EmptyState title="No Fixed Deposits" description="No active FD investments found for this member." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-750 text-slate-500 dark:text-slate-400 font-semibold">
                  <tr>
                    <th className="px-4 py-3">FD Number</th>
                    <th className="px-4 py-3">Principal Amount</th>
                    <th className="px-4 py-3">Interest Rate</th>
                    <th className="px-4 py-3">Tenure</th>
                    <th className="px-4 py-3">Maturity Date</th>
                    <th className="px-4 py-3">Maturity Amount</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                  {fds.map(f => (
                    <tr key={f.fdNumber}>
                      <td className="px-4 py-3 font-mono font-bold text-blue-600">{f.fdNumber}</td>
                      <td className="px-4 py-3 font-bold">{formatINR(f.principalAmount)}</td>
                      <td className="px-4 py-3">{f.interestRate}% p.a.</td>
                      <td className="px-4 py-3">{f.tenureMonths} Months</td>
                      <td className="px-4 py-3">{f.maturityDate}</td>
                      <td className="px-4 py-3 font-bold text-emerald-600">{formatINR(f.maturityAmount)}</td>
                      <td className="px-4 py-3"><StatusBadge status={f.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Tab 6: Loans */}
      {activeTab === 'loans' && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm p-5 space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Member Loans ({loans.length})
          </h3>
          {loans.length === 0 ? (
            <EmptyState title="No Loans Found" description="This member has not applied for any loan products yet." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-750 text-slate-500 dark:text-slate-400 font-semibold">
                  <tr>
                    <th className="px-4 py-3">Loan ID</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Approved Amount</th>
                    <th className="px-4 py-3">EMI</th>
                    <th className="px-4 py-3">Outstanding</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                  {loans.map(l => (
                    <tr key={l.loanId}>
                      <td className="px-4 py-3 font-mono font-bold text-blue-600">{l.loanId}</td>
                      <td className="px-4 py-3 font-semibold">{l.loanType}</td>
                      <td className="px-4 py-3 font-bold">{formatINR(l.approvedAmount)}</td>
                      <td className="px-4 py-3 font-semibold">{formatINR(l.emi)}</td>
                      <td className="px-4 py-3 text-rose-600 font-bold">{formatINR(l.outstandingAmount)}</td>
                      <td className="px-4 py-3"><StatusBadge status={l.status} /></td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => navigate(`/loans/${l.loanId}`)}
                          className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                        >
                          View Schedule
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Tab 7: Transactions */}
      {activeTab === 'transactions' && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm p-5 space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Member Transaction History ({txns.length})
          </h3>
          {txns.length === 0 ? (
            <EmptyState title="No Transactions" description="No transactions recorded for this member yet." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-750 text-slate-500 dark:text-slate-400 font-semibold">
                  <tr>
                    <th className="px-4 py-3">TXN ID</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Mode</th>
                    <th className="px-4 py-3">Reference</th>
                    <th className="px-4 py-3 text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                  {txns.map(t => (
                    <tr key={t.id}>
                      <td className="px-4 py-3 font-mono font-bold text-slate-700 dark:text-slate-300">{t.id}</td>
                      <td className="px-4 py-3 font-semibold">{t.type}</td>
                      <td className="px-4 py-3 font-bold">{formatINR(t.amount)}</td>
                      <td className="px-4 py-3">{t.paymentMode}</td>
                      <td className="px-4 py-3 font-mono text-[11px] text-slate-400">{t.referenceNumber || 'N/A'}</td>
                      <td className="px-4 py-3 text-right text-slate-500">{t.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Modals for KYC Actions */}
      <ConfirmDialog
        isOpen={showApproveConfirm}
        onClose={() => setShowApproveConfirm(false)}
        onConfirm={handleKycApprove}
        title="Approve Member KYC"
        message={`Are you sure you want to approve all KYC documents for ${member.fullName} (${member.id})? This will mark the member as verified.`}
        confirmText="Approve KYC"
        variant="success"
      />

      <ConfirmDialog
        isOpen={showRejectConfirm}
        onClose={() => setShowRejectConfirm(false)}
        onConfirm={handleKycReject}
        title="Reject Member KYC"
        message={`Specify the reason for rejecting KYC documents for ${member.fullName}. The member will be notified to correct the documents.`}
        confirmText="Reject KYC"
        variant="danger"
        requireReason={true}
        reasonPlaceholder="e.g. Document photo is unclear or signature mismatch..."
      />

      <ConfirmDialog
        isOpen={showReuploadConfirm}
        onClose={() => setShowReuploadConfirm(false)}
        onConfirm={handleKycReupload}
        title="Request KYC Re-upload"
        message={`Send a request to ${member.fullName} to submit fresh and clearer copies of their verification documents?`}
        confirmText="Send Request"
        variant="warning"
      />
    </div>
  );
};
