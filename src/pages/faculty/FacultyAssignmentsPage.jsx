import React from 'react';
import { FileSpreadsheet, CheckCircle2, Clock } from 'lucide-react';
import StatusBadge from '../../components/common/StatusBadge';

export const FacultyAssignmentsPage = () => {
  const submissions = [
    { id: 'SUB-101', student: 'Sai Krishna Mohanty', roll: 'BPUT2026001', course: 'Computer Networks', task: 'BGP Routing Protocol Analysis', submittedOn: '28 Sep 2026', status: 'Graded', score: '28 / 30' },
    { id: 'SUB-102', student: 'Aarav Sharma', roll: 'BPUT2026002', course: 'Computer Networks', task: 'BGP Routing Protocol Analysis', submittedOn: '29 Sep 2026', status: 'Pending Review', score: '-' },
    { id: 'SUB-103', student: 'Ananya Panda', roll: 'BPUT2026003', course: 'Computer Networks', task: 'BGP Routing Protocol Analysis', submittedOn: '29 Sep 2026', status: 'Pending Review', score: '-' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Assignment Evaluation & Grading
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Review student code repositories, lab reports, and assign internal marks
        </p>
      </div>

      <div className="campus-card">
        <div className="campus-card-header">
          <h3 className="campus-card-title">Student Submissions Queue</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="campus-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Roll ID</th>
                <th>Assignment</th>
                <th>Submitted On</th>
                <th>Status</th>
                <th>Marks</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((s) => (
                <tr key={s.id}>
                  <td className="font-bold text-slate-900 dark:text-white">{s.student}</td>
                  <td className="font-mono text-xs">{s.roll}</td>
                  <td className="text-xs">{s.task}</td>
                  <td className="text-xs text-slate-500">{s.submittedOn}</td>
                  <td>
                    <StatusBadge status={s.status} size="sm" />
                  </td>
                  <td className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{s.score}</td>
                  <td>
                    <button className="btn btn-primary btn-sm text-[11px]">
                      Grade Submission
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FacultyAssignmentsPage;
