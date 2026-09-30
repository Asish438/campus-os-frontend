import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import StatusBadge from '../../components/common/StatusBadge';
import Modal from '../../components/modals/Modal';
import { BookOpen, Upload, CheckCircle2, Clock, FileText } from 'lucide-react';

export const AssignmentsPage = () => {
  const { assignments, addToast } = useCampus();
  const [selectedAsn, setSelectedAsn] = useState(null);
  const [submissionUrl, setSubmissionUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSelectedAsn(null);
      addToast({
        title: 'Assignment Submitted',
        message: `Successfully turned in "${selectedAsn?.title}"`,
        type: 'success'
      });
    }, 500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Assignments & Continuous Assessment
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Submit lab problem sets and view faculty grading rubrics
          </p>
        </div>
      </div>

      <div className="campus-card">
        <div className="campus-card-header">
          <h3 className="campus-card-title">Semester Coursework Submissions</h3>
        </div>

        <div className="space-y-4">
          {assignments.map((asn) => (
            <div
              key={asn.id}
              className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    {asn.id}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {asn.title}
                  </h4>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {asn.course} • Instructor: {asn.faculty}
                </p>
                <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
                  <span>Due: <strong className="text-slate-700 dark:text-slate-300">{asn.dueDate}</strong></span>
                  <span>•</span>
                  <span>Total Marks: {asn.totalMarks}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <StatusBadge status={asn.status} />
                {asn.status === 'Pending' ? (
                  <button
                    onClick={() => {
                      setSelectedAsn(asn);
                      setSubmissionUrl('');
                    }}
                    className="btn btn-primary btn-sm"
                  >
                    Submit Assignment
                  </button>
                ) : (
                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    Score: {asn.score}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedAsn && (
        <Modal
          isOpen={Boolean(selectedAsn)}
          onClose={() => setSelectedAsn(null)}
          title={`Submit: ${selectedAsn.title}`}
          subtitle={selectedAsn.course}
        >
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="form-label">Submission Link (GitHub / Google Drive / Overleaf)</label>
              <input
                type="url"
                required
                value={submissionUrl}
                onChange={(e) => setSubmissionUrl(e.target.value)}
                placeholder="https://github.com/sai/os-deadlock-simulator"
                className="form-input"
              />
            </div>

            <div>
              <label className="form-label">Attach Accompanying Lab Report PDF</label>
              <div className="border border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-4 text-center text-slate-400 flex items-center justify-center gap-2 cursor-pointer">
                <Upload className="w-4 h-4 text-indigo-500" />
                <span>Choose file or drag here</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedAsn(null)}
                className="btn btn-secondary btn-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary btn-sm"
              >
                {submitting ? 'Turning in...' : 'Turn In Work'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default AssignmentsPage;
