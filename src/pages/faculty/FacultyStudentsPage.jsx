import React from 'react';
import { Users, Mail, Phone, AlertCircle } from 'lucide-react';
import StatusBadge from '../../components/common/StatusBadge';

export const FacultyStudentsPage = () => {
  const students = [
    { id: 'BPUT2026001', name: 'Sai Krishna Mohanty', branch: 'CSE 5th Sem', att: '68%', cgpa: '8.84', status: 'Attendance Warning' },
    { id: 'BPUT2026002', name: 'Aarav Sharma', branch: 'CSE 5th Sem', att: '85%', cgpa: '9.10', status: 'Good Standing' },
    { id: 'BPUT2026003', name: 'Ananya Panda', branch: 'CSE 5th Sem', att: '78%', cgpa: '8.60', status: 'Good Standing' },
    { id: 'BPUT2026004', name: 'Deepak Dash', branch: 'CSE 5th Sem', att: '74%', cgpa: '7.90', status: 'Attendance Warning' },
    { id: 'BPUT2026005', name: 'Ishita Roy', branch: 'CSE 5th Sem', att: '92%', cgpa: '9.45', status: 'Good Standing' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Enrolled Student Directory
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          CS501 Computer Networks Class Roster
        </p>
      </div>

      <div className="campus-card">
        <div className="campus-card-header">
          <h3 className="campus-card-title">Student Academic Roster</h3>
          <span className="text-xs text-slate-400">Total: {students.length} students</span>
        </div>

        <div className="overflow-x-auto">
          <table className="campus-table">
            <thead>
              <tr>
                <th>Roll Number</th>
                <th>Name</th>
                <th>Program</th>
                <th>Course Attendance</th>
                <th>CGPA</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((stu) => (
                <tr key={stu.id}>
                  <td className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">{stu.id}</td>
                  <td className="font-bold text-slate-800 dark:text-slate-200">{stu.name}</td>
                  <td className="text-xs text-slate-500">{stu.branch}</td>
                  <td className="font-mono font-bold text-xs">
                    <span className={stu.att < '75%' ? 'text-amber-600' : 'text-emerald-600'}>
                      {stu.att}
                    </span>
                  </td>
                  <td className="font-mono text-xs font-bold">{stu.cgpa}</td>
                  <td>
                    <StatusBadge status={stu.status} size="sm" />
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

export default FacultyStudentsPage;
