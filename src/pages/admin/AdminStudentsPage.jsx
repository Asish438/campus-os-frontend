import React, { useState } from 'react';
import SearchBar from '../../components/common/SearchBar';
import StatusBadge from '../../components/common/StatusBadge';

export const AdminStudentsPage = () => {
  const [search, setSearch] = useState('');
  const students = [
    { id: 'BPUT2026001', name: 'Sai Krishna Mohanty', dept: 'CSE', year: '3rd Year', hostel: 'Block-B 304', att: '68%', feeStatus: 'Pending ₹22,000' },
    { id: 'BPUT2026002', name: 'Aarav Sharma', dept: 'CSE', year: '3rd Year', hostel: 'Block-A 108', att: '85%', feeStatus: 'Cleared' },
    { id: 'BPUT2026003', name: 'Ananya Panda', dept: 'ECE', year: '3rd Year', hostel: 'Ramanujan 204', att: '78%', feeStatus: 'Cleared' },
    { id: 'BPUT2026004', name: 'Deepak Dash', dept: 'MECH', year: '2nd Year', hostel: 'Block-B 112', att: '74%', feeStatus: 'Pending ₹15,000' },
    { id: 'BPUT2026005', name: 'Ishita Roy', dept: 'CIVIL', year: '4th Year', hostel: 'Day Scholar', att: '92%', feeStatus: 'Cleared' }
  ];

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.id.toLowerCase().includes(search.toLowerCase()) ||
    s.dept.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Campus Student Master Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Total 4,850 Active Enrolled Scholars across BPUT programs
          </p>
        </div>
        <div className="w-full sm:w-72">
          <SearchBar value={search} onChange={setSearch} placeholder="Search student or roll number..." />
        </div>
      </div>

      <div className="campus-card">
        <div className="overflow-x-auto">
          <table className="campus-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Full Name</th>
                <th>Department</th>
                <th>Academic Year</th>
                <th>Residence</th>
                <th>Attendance</th>
                <th>Fee Ledger</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id}>
                  <td className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">{s.id}</td>
                  <td className="font-bold text-slate-900 dark:text-white">{s.name}</td>
                  <td className="text-xs">{s.dept}</td>
                  <td className="text-xs text-slate-500">{s.year}</td>
                  <td className="text-xs">{s.hostel}</td>
                  <td className="font-mono font-bold text-xs">{s.att}</td>
                  <td className="text-xs font-semibold text-rose-600 dark:text-rose-400">{s.feeStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminStudentsPage;
