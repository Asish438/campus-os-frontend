import React from 'react';
import { FileSpreadsheet, Download } from 'lucide-react';
import { useCampus } from '../../context/CampusContext';

export const AdminReportsPage = () => {
  const { addToast } = useCampus();

  const reports = [
    { title: 'NAAC / NBA Accreditation Faculty-Student Matrix', format: 'XLSX / PDF', period: 'Academic Year 2025-26', size: '3.4 MB' },
    { title: 'BPUT End-Semester Attendance Regulatory Eligibility Report', format: 'Official PDF', period: 'Monsoon 2026', size: '1.8 MB' },
    { title: 'Campus Estate Maintenance SLA & Vendor Compliance Report', format: 'CSV Export', period: 'Q3 2026', size: '890 KB' },
    { title: 'Treasury Fee Recovery & Defaulter Breakdown', format: 'Encrypted XLSX', period: 'Current Term', size: '2.1 MB' }
  ];

  const handleDownload = (name) => {
    addToast({
      title: 'Generating Report Export',
      message: `${name} is being exported and downloaded.`,
      type: 'info'
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Institutional Regulatory Reports
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Statutory Compliance & NIRF / NAAC Accreditation Documentation
        </p>
      </div>

      <div className="campus-card">
        <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {reports.map((r, idx) => (
            <div key={idx} className="py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold shrink-0">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{r.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{r.period} • {r.format} • {r.size}</p>
                </div>
              </div>

              <button
                onClick={() => handleDownload(r.title)}
                className="btn btn-secondary btn-sm"
              >
                <Download className="w-3.5 h-3.5" /> Export
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminReportsPage;
