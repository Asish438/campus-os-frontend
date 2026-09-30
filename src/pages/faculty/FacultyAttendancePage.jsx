import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import { CalendarCheck2, Users, Check, X, CheckCircle2 } from 'lucide-react';

export const FacultyAttendancePage = () => {
  const { addToast } = useCampus();

  const [students, setStudents] = useState([
    { id: 'BPUT2026001', name: 'Sai Krishna Mohanty', attended: false },
    { id: 'BPUT2026002', name: 'Aarav Sharma', attended: true },
    { id: 'BPUT2026003', name: 'Ananya Panda', attended: true },
    { id: 'BPUT2026004', name: 'Deepak Dash', attended: true },
    { id: 'BPUT2026005', name: 'Ishita Roy', attended: true },
    { id: 'BPUT2026006', name: 'Manish Sahu', attended: false }
  ]);

  const toggleStudent = (id) => {
    setStudents(prev =>
      prev.map(s => (s.id === id ? { ...s, attended: !s.attended } : s))
    );
  };

  const handleSaveAttendance = () => {
    const presentCount = students.filter(s => s.attended).length;
    addToast({
      title: 'Class Attendance Logged',
      message: `CS501 Lecture Attendance submitted: ${presentCount} Present, ${students.length - presentCount} Absent.`,
      type: 'success'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Class Attendance Marking
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Course: CS501 Computer Networks • Section A • Lecture #35
          </p>
        </div>

        <button
          onClick={handleSaveAttendance}
          className="btn btn-primary btn-sm shadow-sm"
        >
          <CheckCircle2 className="w-4 h-4" />
          Submit & Lock Attendance
        </button>
      </div>

      <div className="campus-card">
        <div className="campus-card-header">
          <h3 className="campus-card-title">Student Roll Roster</h3>
          <span className="text-xs text-slate-400 font-semibold">
            Present: {students.filter(s => s.attended).length} / {students.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="campus-table">
            <thead>
              <tr>
                <th>College ID</th>
                <th>Student Full Name</th>
                <th>Status</th>
                <th>Toggle Presence</th>
              </tr>
            </thead>
            <tbody>
              {students.map((stu) => (
                <tr key={stu.id}>
                  <td className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">{stu.id}</td>
                  <td className="font-semibold text-slate-800 dark:text-slate-200">{stu.name}</td>
                  <td>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        stu.attended
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                          : 'bg-rose-50 text-rose-700 border border-rose-300'
                      }`}
                    >
                      {stu.attended ? 'PRESENT' : 'ABSENT'}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => toggleStudent(stu.id)}
                      className={`btn btn-sm ${
                        stu.attended ? 'btn-danger' : 'btn-success'
                      }`}
                    >
                      {stu.attended ? 'Mark Absent' : 'Mark Present'}
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

export default FacultyAttendancePage;
