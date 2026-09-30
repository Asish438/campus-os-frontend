import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileCheck, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye, 
  Search, 
  Filter, 
  RotateCcw,
  ExternalLink,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { StatusBadge } from '../components/common/StatusBadge';
import { Modal } from '../components/common/Modal';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { EmptyState } from '../components/common/EmptyState';
import { Pagination } from '../components/common/Pagination';
import { memberService } from '../services/apiService';
import { Member, KYCStatus } from '../types';
import { useToast } from '../context/ToastContext';

interface FlattenedKycItem {
  id: string;
  memberId: string;
  memberName: string;
  memberMobile: string;
  documentType: string;
  documentName: string;
  documentNumber?: string;
  submittedDate: string;
  status: KYCStatus;
  reviewedBy: string;
  rejectionReason?: string;
}

export const KycPage: React.FC = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeStatusTab, setActiveStatusTab] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Selected item for preview modal
  const [selectedItem, setSelectedItem] = useState<FlattenedKycItem | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // Rejection modal
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [itemToReject, setItemToReject] = useState<FlattenedKycItem | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await memberService.getAll();
      setMembers(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Transform members into flattened KYC items
  const kycList: FlattenedKycItem[] = useMemo(() => {
    const list: FlattenedKycItem[] = [];
    members.forEach((m, mIdx) => {
      m.documents.forEach((doc, dIdx) => {
        list.push({
          id: `KYC-${1000 + mIdx * 3 + dIdx}`,
          memberId: m.id,
          memberName: m.fullName,
          memberMobile: m.mobile,
          documentType: doc.type,
          documentName: doc.name,
          documentNumber: doc.documentNumber,
          submittedDate: doc.uploadedDate,
          status: doc.status,
          reviewedBy: doc.status === 'Approved' ? 'Rasmita Mishra (KYC Officer)' : doc.status === 'Rejected' ? 'Bikash Rout (Compliance)' : 'Pending Review',
          rejectionReason: doc.rejectionReason
        });
      });
    });
    return list;
  }, [members]);

  // Filter list
  const filtered = useMemo(() => {
    return kycList.filter(item => {
      const matchesTab = activeStatusTab === 'All' || item.status === activeStatusTab;
      const matchesSearch = 
        item.memberName.toLowerCase().includes(search.toLowerCase()) ||
        item.memberId.toLowerCase().includes(search.toLowerCase()) ||
        item.id.toLowerCase().includes(search.toLowerCase()) ||
        item.documentType.toLowerCase().includes(search.toLowerCase());

      return matchesTab && matchesSearch;
    });
  }, [kycList, activeStatusTab, search]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleApprove = async (item: FlattenedKycItem) => {
    try {
      await memberService.updateKyc(item.memberId, 'Approved');
      addToast({
        type: 'success',
        title: 'KYC Document Approved',
        message: `${item.documentType} for ${item.memberName} approved.`
      });
      setShowPreviewModal(false);
      loadData();
    } catch {
      addToast({ type: 'error', message: 'Failed to approve KYC.' });
    }
  };

  const handleRejectConfirm = async (reason?: string) => {
    if (!itemToReject) return;
    try {
      await memberService.updateKyc(itemToReject.memberId, 'Rejected', reason);
      addToast({
        type: 'warning',
        title: 'KYC Rejected',
        message: `${itemToReject.documentType} for ${itemToReject.memberName} rejected.`
      });
      setShowRejectModal(false);
      setShowPreviewModal(false);
      loadData();
    } catch {
      addToast({ type: 'error', message: 'Failed to reject document.' });
    }
  };

  const handleReuploadRequest = async (item: FlattenedKycItem) => {
    try {
      await memberService.updateKyc(item.memberId, 'Pending', 'Clear copy requested');
      addToast({
        type: 'info',
        title: 'Re-upload Requested',
        message: `Notification sent to ${item.memberName} to re-upload ${item.documentType}.`
      });
      setShowPreviewModal(false);
      loadData();
    } catch {
      addToast({ type: 'error', message: 'Failed to send request.' });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="KYC Verification Management"
        subtitle="Review, authenticate and manage government identity proofs and address documents."
        breadcrumbs={[
          { label: 'Dashboard', url: '/dashboard' },
          { label: 'Members', url: '/members' },
          { label: 'KYC Verification' }
        ]}
      />

      {/* Tabs & Search Bar */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm p-4 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {['All', 'Pending', 'Under Review', 'Approved', 'Rejected'].map(status => {
              const active = activeStatusTab === status;
              const count = status === 'All' 
                ? kycList.length 
                : kycList.filter(k => k.status === status).length;

              return (
                <button
                  key={status}
                  onClick={() => {
                    setActiveStatusTab(status);
                    setCurrentPage(1);
                  }}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap ${
                    active
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  <span>{status}</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    active ? 'bg-blue-700 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={e => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search member, ID, or document..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* KYC Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <EmptyState
            title="No KYC records found"
            description="There are no documents matching the selected status filter or search parameters."
          />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-750 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-100 dark:border-slate-700/80">
                  <tr>
                    <th className="px-4 py-3">KYC ID</th>
                    <th className="px-4 py-3">Member</th>
                    <th className="px-4 py-3">Document Type</th>
                    <th className="px-4 py-3">Submitted Date</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Reviewed By</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                  {paginated.map(item => (
                    <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-750/50 transition-colors">
                      <td className="px-4 py-3.5 font-mono font-bold text-slate-700 dark:text-slate-300">
                        {item.id}
                      </td>
                      <td className="px-4 py-3.5">
                        <div 
                          onClick={() => navigate(`/members/${item.memberId}`)}
                          className="font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                        >
                          {item.memberName}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          ID: {item.memberId} • {item.memberMobile}
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="font-semibold text-slate-800 dark:text-slate-200">
                          {item.documentType}
                        </div>
                        {item.documentNumber && (
                          <div className="text-[10px] text-slate-400 font-mono">
                            {item.documentNumber}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-slate-500 dark:text-slate-400">
                        {item.submittedDate}
                      </td>
                      <td className="px-4 py-3.5">
                        <StatusBadge status={item.status} />
                      </td>
                      <td className="px-4 py-3.5 text-slate-500 dark:text-slate-400">
                        {item.reviewedBy}
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <button
                          onClick={() => {
                            setSelectedItem(item);
                            setShowPreviewModal(true);
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Review</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

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

      {/* KYC Review & Document Preview Modal */}
      {selectedItem && (
        <Modal
          isOpen={showPreviewModal}
          onClose={() => setShowPreviewModal(false)}
          title={`KYC Inspection: ${selectedItem.documentType}`}
          subtitle={`Applicant: ${selectedItem.memberName} (${selectedItem.memberId})`}
          size="lg"
          footer={
            <div className="flex items-center justify-between w-full">
              <button
                type="button"
                onClick={() => handleReuploadRequest(selectedItem)}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Request Re-upload</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setItemToReject(selectedItem);
                    setShowRejectModal(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-rose-600 hover:bg-rose-700 text-white"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Reject</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleApprove(selectedItem)}
                  className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Approve KYC</span>
                </button>
              </div>
            </div>
          }
        >
          <div className="space-y-5">
            {/* Meta row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs">
              <div>
                <span className="text-slate-400 block">KYC ID</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{selectedItem.id}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Submitted Date</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedItem.submittedDate}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Current Status</span>
                <StatusBadge status={selectedItem.status} />
              </div>
              <div>
                <span className="text-slate-400 block">Document Number</span>
                <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">{selectedItem.documentNumber || 'N/A'}</span>
              </div>
            </div>

            {/* Document Preview Box */}
            <div className="border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 p-8 text-center flex flex-col items-center justify-center min-h-[220px]">
              <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 shadow-md flex items-center justify-center text-blue-600 dark:text-blue-400 mb-3 border border-slate-200 dark:border-slate-700">
                <FileText className="w-8 h-8" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                {selectedItem.documentName}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Document Size: 1.4 MB • Verification Hash: SHA256-VALID
              </p>
              <button 
                onClick={() => addToast({ type: 'info', message: `Full view opened for ${selectedItem.documentName}` })}
                className="mt-4 px-4 py-1.5 text-xs font-semibold rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs hover:bg-slate-50 flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open Full Resolution Document</span>
              </button>
            </div>

            {/* Rejection notice if exists */}
            {selectedItem.rejectionReason && (
              <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-300">
                <strong>Rejection Remarks:</strong> {selectedItem.rejectionReason}
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Reject Confirmation Dialog with reason input */}
      <ConfirmDialog
        isOpen={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        onConfirm={handleRejectConfirm}
        title="Reject KYC Document"
        message={`Specify the verification issue or reason for rejecting ${itemToReject?.documentType} for ${itemToReject?.memberName}.`}
        confirmText="Confirm Rejection"
        variant="danger"
        requireReason={true}
        reasonPlaceholder="e.g. Document image is blurred, signature does not match, or expired validity..."
      />
    </div>
  );
};
