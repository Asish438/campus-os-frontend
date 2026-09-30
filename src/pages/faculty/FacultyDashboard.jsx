import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import KpiCard from '../../components/common/KpiCard';
import StatusBadge from '../../components/common/StatusBadge';
import {
  BookOpen,
  Users,
  FileSpreadsheet,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  GraduationCap
} from 'lucide-react';

export const FacultyDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const courses = [
    { code: 'CS501', name: 'Computer Networks', semester: '5th Sem', students: 68, avgAttendance: '78%', nextClass: 'Today, 09:00 AM' },
    { code: 'CS302', name: 'Data Structures & Algorithms', semester: '3rd Sem', students: 62, avgAttendance: '82%', nextClass: 'Tomorrow, 11:30 AM' },
    { code: 'CS701', name: 'Cloud Computing & Distributed Systems', semester: '7th Sem', students: 50, avgAttendance: '86%', nextClass: 'Friday, 02:00 PM' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Welcome, {user?.name || 'Dr. Thorne'} 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {user?.designation || 'Associate Professor'} • {user?.department || 'Computer Science & Engineering'}
          </p>
          <p className="text-xs font-mono text-indigo-600 dark:text-indigo-400 font-bold mt-1">
            Faculty ID: {user?.facultyId || 'FAC2021045'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/faculty/modules')}
            className="btn btn-primary btn-sm shadow-md shadow-indigo-600/20"
          >
            <Sparkles className="w-4 h-4 text-cyan-300" />
            AI Lecture Module Generator
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Assigned Courses"
          value="3 Active"
          subtext="Undergraduate B.Tech"
          icon={BookOpen}
          variant="indigo"
          onClick={() => navigate('/faculty/courses')}
        />
        <KpiCard
          title="Total Students"
          value="180 Enrolled"
          subtext="Across 3 Sections"
          icon={Users}
          variant="emerald"
          onClick={() => navigate('/faculty/students')}
        />
        <KpiCard
          title="Pending Assignments"
          value="14 to Grade"
          subtext="CS501 Submissions"
          icon={FileSpreadsheet}
          variant="amber"
          onClick={() => navigate('/faculty/assignments')}
        />
        <KpiCard
          title="Attendance Alerts"
          value="8 Shortfalls"
          subtext="Below 75% Regulation"
          icon={AlertTriangle}
          variant="rose"
          onClick={() => navigate('/faculty/attendance')}
        />
      </div>

      {/* Active Courses Matrix */}
      <div className="campus-card">
        <div className="campus-card-header">
          <div>
            <h3 className="campus-card-title">My Teaching Modules</h3>
            <p className="campus-card-subtitle">Continuous assessment and lecture timings</p>
          </div>
          <button
            onClick={() => navigate('/faculty/courses')}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            All Courses <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {courses.map((crs) => (
            <div
              key={crs.code}
              className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    {crs.code}
                  </span>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    {crs.name}
                  </h4>
                  <span className="text-[10px] font-semibold px-2 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {crs.semester}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Next Lecture: <strong className="text-slate-700 dark:text-slate-300">{crs.nextClass}</strong> • {crs.students} students enrolled
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Avg Attendance</p>
                  <p className="text-sm font-bold font-mono text-emerald-600 dark:text-emerald-400">
                    {crs.avgAttendance}
                  </p>
                </div>
                <button
                  onClick={() => navigate('/faculty/attendance')}
                  className="btn btn-outline btn-sm text-xs"
                >
                  Mark Attendance
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
