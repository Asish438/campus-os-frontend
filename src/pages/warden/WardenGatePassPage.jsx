import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import StatusBadge from '../../components/common/StatusBadge';
import QRCodeCard from '../../components/qr/QRCodeCard';
import Modal from '../../components/modals/Modal';
import { QrCode, CheckCircle2, XCircle, Clock, MapPin, Phone } from 'lucide-react';

export const WardenGatePassPage = () => {
  const { gatePasses, approveGatePass, rejectGatePass } = useCampus();
  const [viewingQrPass, setViewingQrPass] = useState(null);

  const handleApprove = (passId) => {
    approveGatePass(passId);
  };

  const handleReject = (passId) => {
    rejectGatePass(passId);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Digital Gate Pass Authorizations
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Warden Desk • Review student outpasses and generate cryptographic QR credentials
          </p>
        </div>
      </div>

      <div className="campus-card">
        <div className="campus-card-header">
          <h3 className="campus-card-title">Student Outpass Requests</h3>
          <span className="text-xs text-slate-400">Total: {gatePasses.length}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="campus-table">
            <thead>
              <tr>
                <th>Pass ID</th>
                <th>Student</th>
                <th>Hostel & Room</th>
                <th>Destination</th>
                <th>Purpose</th>
                <th>Date</th>
                <th>Validity Window</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {gatePasses.map((p) => (
                <tr key={p.id}>
                  <td className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">{p.id}</td>
                  <td>
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white">{p.student}</span>
                      <p className="text-[11px] text-slate-400 font-mono">{p.studentId}</p>
                    </div>
                  </td>
                  <td className="text-xs">{p.hostel}, {p.room}</td>
                  <td className="font-semibold text-xs text-slate-800 dark:text-slate-200">{p.destination}</td>
                  <td className="text-xs text-slate-500 max-w-xs truncate">{p.purpose}</td>
                  <td className="text-xs text-slate-500 whitespace-nowrap">{p.date}</td>
                  <td className="text-xs font-mono font-semibold whitespace-nowrap">
                    {p.outTime} → {p.returnTime}
                  </td>
                  <td>
                    <StatusBadge status={p.status} size="sm" />
                  </td>
                  <td>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {p.status === 'Pending' ? (
                        <>
                          <button
                            onClick={() => handleApprove(p.id)}
                            className="btn btn-success btn-sm text-[11px]"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                          </button>
                          <button
                            onClick={() => handleReject(p.id)}
                            className="btn btn-danger btn-sm text-[11px]"
                          >
                            <XCircle className="w-3.5 h-3.5" /> Reject
                          </button>
                        </>
                      ) : p.status === 'Approved' ? (
                        <button
                          onClick={() => setViewingQrPass(p)}
                          className="btn btn-outline btn-sm text-[11px] flex items-center gap-1"
                        >
                          <QrCode className="w-3.5 h-3.5 text-indigo-500" /> View QR
                        </button>
                      ) : (
                        <span className="text-xs text-slate-400">Archived</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal to view approved pass QR */}
      {viewingQrPass && (
        <Modal
          isOpen={Boolean(viewingQrPass)}
          onClose={() => setViewingQrPass(null)}
          title="Generated Security QR Pass"
          subtitle={`Pass ID: ${viewingQrPass.id}`}
        >
          <div className="py-2">
            <QRCodeCard gatePass={viewingQrPass} />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default WardenGatePassPage;
