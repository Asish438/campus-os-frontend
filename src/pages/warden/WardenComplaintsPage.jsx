import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import StatusBadge from '../../components/common/StatusBadge';
import Modal from '../../components/modals/Modal';
import { AlertTriangle, Wrench, CheckCircle2, Clock, UserCheck, ShieldAlert } from 'lucide-react';

export const WardenComplaintsPage = () => {
  const { complaints, updateComplaintStatus } = useCampus();
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [technicianName, setTechnicianName] = useState('Manoj Rout (Plumbing Specialist)');
  const [assignModalOpen, setAssignModalOpen] = useState(false);

  const handleAction = (complaint, newStatus) => {
    updateComplaintStatus(complaint.id, newStatus, complaint.assignedTo);
  };

  const handleOpenAssignModal = (complaint) => {
    setSelectedComplaint(complaint);
    setTechnicianName(complaint.assignedTo || 'Manoj Rout (Plumbing Specialist)');
    setAssignModalOpen(true);
  };

  const handleConfirmAssign = () => {
    if (selectedComplaint) {
      updateComplaintStatus(selectedComplaint.id, 'ASSIGNED', technicianName);
      setAssignModalOpen(false);
      setSelectedComplaint(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Hostel Maintenance Grievance Queue
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            All updates sync directly with Student Dashboards in Real-Time
          </p>
        </div>
      </div>

      <div className="campus-card">
        <div className="campus-card-header">
          <div>
            <h3 className="campus-card-title">Live Resident Maintenance Tickets</h3>
            <p className="campus-card-subtitle">AI-classified tickets from Aryabhatta and Ramanujan Halls</p>
          </div>
          <span className="text-xs font-bold text-slate-400">Total: {complaints.length} tickets</span>
        </div>

        <div className="overflow-x-auto">
          <table className="campus-table">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Student</th>
                <th>Room</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Created</th>
                <th>Assigned To</th>
                <th>Warden Actions</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((c) => (
                <tr key={c.id}>
                  <td className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">{c.id}</td>
                  <td>
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white">{c.student}</span>
                      <p className="text-[11px] text-slate-500 font-mono">{c.studentId}</p>
                    </div>
                  </td>
                  <td className="font-semibold text-xs">{c.room}</td>
                  <td className="text-xs">
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                      {c.category}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        ['High', 'Urgent'].includes(c.priority)
                          ? 'bg-rose-50 text-rose-700 border border-rose-300'
                          : 'bg-amber-50 text-amber-700 border border-amber-300'
                      }`}
                    >
                      {c.priority}
                    </span>
                  </td>
                  <td>
                    <StatusBadge status={c.status} size="sm" />
                  </td>
                  <td className="text-xs text-slate-400 whitespace-nowrap">{c.createdAt}</td>
                  <td className="text-xs font-medium text-slate-600 dark:text-slate-300">
                    {c.assignedTo || 'Unassigned'}
                  </td>
                  <td>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <button
                        onClick={() => handleOpenAssignModal(c)}
                        className="btn btn-secondary btn-sm text-[11px]"
                      >
                        Assign
                      </button>
                      <button
                        onClick={() => handleAction(c, 'IN_PROGRESS')}
                        className="btn btn-outline btn-sm text-[11px]"
                      >
                        In Progress
                      </button>
                      <button
                        onClick={() => handleAction(c, 'RESOLVED')}
                        className="btn btn-success btn-sm text-[11px]"
                      >
                        Resolve
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assign Technician Modal */}
      {selectedComplaint && (
        <Modal
          isOpen={assignModalOpen}
          onClose={() => setAssignModalOpen(false)}
          title={`Assign Duty Technician: ${selectedComplaint.id}`}
          subtitle={`${selectedComplaint.category} • ${selectedComplaint.room}`}
        >
          <div className="space-y-4 text-xs">
            <div>
              <label className="form-label">Technician Name & Trade</label>
              <select
                value={technicianName}
                onChange={(e) => setTechnicianName(e.target.value)}
                className="form-select"
              >
                <option value="Manoj Rout (Plumbing Specialist)">Manoj Rout (Plumbing Specialist)</option>
                <option value="Bikash Das (Electrician)">Bikash Das (Electrician)</option>
                <option value="Campus IT Network Team">Campus IT Network Team</option>
                <option value="Prasant Jena (Carpentry & Civil)">Prasant Jena (Carpentry & Civil)</option>
                <option value="Estate Duty Supervisor">Estate Duty Supervisor</option>
              </select>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Issue Summary:</span>
              <p className="text-slate-500 italic">"{selectedComplaint.description}"</p>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3">
              <button
                onClick={() => setAssignModalOpen(false)}
                className="btn btn-secondary btn-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAssign}
                className="btn btn-primary btn-sm"
              >
                Confirm Dispatch
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default WardenComplaintsPage;
