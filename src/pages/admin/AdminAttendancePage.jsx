import React from 'react';
import { CalendarCheck2, AlertTriangle, Send } from 'lucide-react';
import { useCampus } from '../../context/CampusContext';

export const AdminAttendancePage = () => {
  const { addToast } = useCampus();

  const handleBroadcastShortfall = () => {
    addToast({
      title: 'Automated SMS Dispatched',
      message: '312 Parent SMS alerts sent for students with attendance below 75%.',
      type: 'warning'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Campus-Wide Attendance Regulatory Governance
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Monitoring BPUT 75% Regulatory Compliance Across All Sections
          </p>
        </div>

        <button
          onClick={handleBroadcastShortfall}
          className="btn btn-danger btn-sm"
        >
          <Send className="w-4 h-4" />
          Dispatch Parent Shortfall Warning SMS
        </button>
      </div>

      <div className="campus-card">
        <div className="campus-card-header">
          <h3 className="campus-card-title">Critical Shortfall Clusters (Below 75%)</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="campus-table">
            <thead>
              <tr>
                <th>Department</th>
                <th>Semester</th>
                <th>Course Name</th>
                <th>Faculty In-Charge</th>
                <th>Defaulters (Below 75%)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-bold">CSE</td>
                <td>Semester 5</td>
                <td>Database Management Systems (CS503)</td>
                <td>Dr. R. K. Behera</td>
                <td className="font-mono text-rose-600 font-bold">18 Students</td>
                <td><button className="btn btn-outline btn-sm text-[11px]">View Roster</button></td>
              </tr>
              <tr>
                <td className="font-bold">CSE</td>
                <td>Semester 5</td>
                <td>Computer Networks (CS501)</td>
                <td>Dr. Aris Thorne</td>
                <td className="font-mono text-rose-600 font-bold">14 Students</td>
                <td><button className="btn btn-outline btn-sm text-[11px]">View Roster</button></td>
              </tr>
              <tr>
                <td className="font-bold">ECE</td>
                <td>Semester 3</td>
                <td>Signals & Systems (EC301)</td>
                <td>Prof. S. R. Jena</td>
                <td className="font-mono text-rose-600 font-bold">22 Students</td>
                <td><button className="btn btn-outline btn-sm text-[11px]">View Roster</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAttendancePage;
