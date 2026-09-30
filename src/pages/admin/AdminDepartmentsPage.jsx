import React from 'react';
import { Building, Users, BookOpen } from 'lucide-react';

export const AdminDepartmentsPage = () => {
  const departments = [
    { name: 'Computer Science & Engineering', hod: 'Dr. S. K. Patnaik', facultyCount: 48, students: 1240, labs: 8, avgAtt: '81%' },
    { name: 'Electronics & Communication', hod: 'Dr. P. R. Tripathy', facultyCount: 38, students: 980, labs: 6, avgAtt: '76%' },
    { name: 'Mechanical Engineering', hod: 'Dr. B. C. Panda', facultyCount: 32, students: 780, labs: 7, avgAtt: '74%' },
    { name: 'Civil Engineering', hod: 'Dr. A. K. Nayak', facultyCount: 26, students: 620, labs: 5, avgAtt: '73%' },
    { name: 'Management Studies (MBA)', hod: 'Dr. Madhumita Das', facultyCount: 45, students: 1230, labs: 3, avgAtt: '84%' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Academic Departments & Faculty Roster
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Faculty Allocations & Laboratory Infrastructure Management
        </p>
      </div>

      <div className="campus-card">
        <div className="overflow-x-auto">
          <table className="campus-table">
            <thead>
              <tr>
                <th>Department</th>
                <th>Head of Department</th>
                <th>Faculty Strength</th>
                <th>Students Enrolled</th>
                <th>Research Labs</th>
                <th>Avg Attendance</th>
              </tr>
            </thead>
            <tbody>
              {departments.map(d => (
                <tr key={d.name}>
                  <td className="font-bold text-slate-900 dark:text-white">{d.name}</td>
                  <td className="text-xs">{d.hod}</td>
                  <td className="font-mono text-xs">{d.facultyCount}</td>
                  <td className="font-mono text-xs font-semibold">{d.students}</td>
                  <td className="text-xs">{d.labs} Labs</td>
                  <td className="font-mono font-bold text-xs text-emerald-600 dark:text-emerald-400">{d.avgAtt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDepartmentsPage;
