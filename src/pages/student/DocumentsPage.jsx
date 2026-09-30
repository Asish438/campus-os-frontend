import React from 'react';
import { FileText, Download, ShieldCheck, CheckCircle } from 'lucide-react';
import { useCampus } from '../../context/CampusContext';

export const DocumentsPage = () => {
  const { addToast } = useCampus();

  const documents = [
    { id: 'DOC-101', name: 'Monsoon 2026 Grade Card (Sem 4)', type: 'Official Transcript', date: '2026-07-15', size: '1.2 MB' },
    { id: 'DOC-102', name: 'Institutional Identity Card & Library Pass', type: 'Digital Smart Card', date: '2024-08-01', size: '420 KB' },
    { id: 'DOC-103', name: 'Hostel Room Allotment Order - Room 304', type: 'Warden Order', date: '2024-08-10', size: '850 KB' },
    { id: 'DOC-104', name: 'Anti-Ragging Compliance Affidavit', type: 'Signed Legal PDF', date: '2024-08-05', size: '610 KB' },
    { id: 'DOC-105', name: 'Fee Clearance Certificate (No Dues Sem 4)', type: 'Accounts Section', date: '2026-07-20', size: '380 KB' }
  ];

  const handleDownload = (docName) => {
    addToast({
      title: 'Downloading Certificate',
      message: `${docName} securely decrypted and saved to downloads.`,
      type: 'success'
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Digital Document Locker
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Cryptographically Signed University Certificates & Transcripts
        </p>
      </div>

      <div className="campus-card">
        <div className="campus-card-header">
          <h3 className="campus-card-title">Verified Documents</h3>
          <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-4 h-4" /> DigiLocker Connected
          </span>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {documents.map((doc) => (
            <div key={doc.id} className="py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {doc.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {doc.type} • Issued: {doc.date} • {doc.size}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleDownload(doc.name)}
                className="btn btn-secondary btn-sm"
              >
                <Download className="w-3.5 h-3.5" />
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocumentsPage;
