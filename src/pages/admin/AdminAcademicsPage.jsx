import React from 'react';
import { School, Award, Calendar } from 'lucide-react';

export const AdminAcademicsPage = () => {
  const programs = [
    { code: 'BTECH-CSE', title: 'Bachelor of Technology (CSE)', duration: '4 Years', intake: 240, status: 'NBA Accredited Tier-1' },
    { code: 'BTECH-ECE', title: 'Bachelor of Technology (ECE)', duration: '4 Years', intake: 180, status: 'NBA Accredited Tier-1' },
    { code: 'BTECH-MECH', title: 'Bachelor of Technology (Mechanical)', duration: '4 Years', intake: 120, status: 'Accredited' },
    { code: 'MCA', title: 'Master of Computer Applications', duration: '2 Years', intake: 60, status: 'Approved' },
    { code: 'MBA', title: 'Master of Business Administration', duration: '2 Years', intake: 120, status: 'Approved' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Academic Programs & Accreditation
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Curriculum Standards & Regulatory Approvals
        </p>
      </div>

      <div className="campus-card">
        <div className="overflow-x-auto">
          <table className="campus-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Program Title</th>
                <th>Duration</th>
                <th>Sanctioned Intake</th>
                <th>Accreditation Status</th>
              </tr>
            </thead>
            <tbody>
              {programs.map(p => (
                <tr key={p.code}>
                  <td className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">{p.code}</td>
                  <td className="font-bold text-slate-900 dark:text-white">{p.title}</td>
                  <td className="text-xs text-slate-500">{p.duration}</td>
                  <td className="font-mono text-xs font-semibold">{p.intake}</td>
                  <td className="text-xs text-emerald-600 font-bold">{p.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAcademicsPage;
