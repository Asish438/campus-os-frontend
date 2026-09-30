import React from 'react';
import { BookOpen, Users, Calendar, Clock, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const FacultyCoursesPage = () => {
  const navigate = useNavigate();

  const courses = [
    { code: 'CS501', name: 'Computer Networks', semester: '5th Sem', students: 68, hall: 'LH-201', time: 'Mon, Wed, Fri 09:00 AM' },
    { code: 'CS302', name: 'Data Structures & Algorithms', semester: '3rd Sem', students: 62, hall: 'LH-104', time: 'Tue, Thu 11:30 AM' },
    { code: 'CS701', name: 'Cloud Computing & Distributed Systems', semester: '7th Sem', students: 50, hall: 'LH-302', time: 'Mon, Thu 03:00 PM' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Assigned Teaching Courses
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Monsoon 2026 Academic Term • Department of Computer Science
          </p>
        </div>
        <button
          onClick={() => navigate('/faculty/modules')}
          className="btn btn-primary btn-sm"
        >
          <Sparkles className="w-4 h-4 text-cyan-300" /> Upload Course Module
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map((crs) => (
          <div key={crs.code} className="campus-card space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-900">
                {crs.code}
              </span>
              <span className="text-xs text-slate-400 font-semibold">{crs.semester}</span>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{crs.name}</h3>
              <p className="text-xs text-slate-500 mt-1">{crs.students} Students Enrolled</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Lecture Hall:</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">{crs.hall}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Weekly Schedule:</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">{crs.time}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => navigate('/faculty/attendance')}
                className="btn btn-outline btn-sm flex-1 text-xs"
              >
                Mark Attendance
              </button>
              <button
                onClick={() => navigate('/faculty/modules')}
                className="btn btn-secondary btn-sm flex-1 text-xs"
              >
                Modules
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacultyCoursesPage;
