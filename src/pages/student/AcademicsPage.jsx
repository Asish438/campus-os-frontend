import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { GraduationCap, Award, BookOpen, Clock, FileCheck } from 'lucide-react';
import KpiCard from '../../components/common/KpiCard';

export const AcademicsPage = () => {
  const { user } = useAuth();

  const courses = [
    { code: 'CS501', title: 'Computer Networks', credits: 4, type: 'Theory + Lab', faculty: 'Dr. Aris Thorne', room: 'LH-201', syllabusCompletion: '64%' },
    { code: 'CS502', title: 'Operating Systems', credits: 4, type: 'Theory + Lab', faculty: 'Prof. Ananya Sen', room: 'LH-203', syllabusCompletion: '72%' },
    { code: 'CS503', title: 'Database Management Systems', credits: 4, type: 'Theory + Lab', faculty: 'Dr. R. K. Behera', room: 'LH-105', syllabusCompletion: '68%' },
    { code: 'CS504', title: 'Machine Learning Fundamentals', credits: 3, type: 'Elective', faculty: 'Dr. Sourav Mishra', room: 'Lab-3', syllabusCompletion: '55%' },
    { code: 'HS501', title: 'Engineering Economics & Ethics', credits: 3, type: 'Humanities', faculty: 'Dr. S. Mohanty', room: 'LH-004', syllabusCompletion: '80%' },
    { code: 'CS591', title: 'Minor Project - Phase 1', credits: 2, type: 'Capstone', faculty: 'Department Committee', room: 'Project Lab', syllabusCompletion: '50%' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Academic Performance & Curriculum
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {user?.program || 'B.Tech'} Computer Science & Engineering • Monsoon 2026
          </p>
        </div>
      </div>

      {/* Academic Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Cumulative CGPA"
          value={user?.cgpa || '8.84'}
          subtext="Scale of 10.0 • Top 5%"
          icon={Award}
          variant="indigo"
        />
        <KpiCard
          title="Active Semester"
          value="Semester 5"
          subtext="20 Total Credits Registered"
          icon={GraduationCap}
          variant="emerald"
        />
        <KpiCard
          title="Total Courses"
          value="6 Subjects"
          subtext="4 Core • 1 Elective • 1 Lab"
          icon={BookOpen}
          variant="cyan"
        />
        <KpiCard
          title="Mid-Term Exams"
          value="Starts Oct 24"
          subtext="Hall Ticket Available Online"
          icon={Clock}
          variant="amber"
        />
      </div>

      {/* Courses Table */}
      <div className="campus-card">
        <div className="campus-card-header">
          <div>
            <h3 className="campus-card-title">Registered Semester 5 Courses</h3>
            <p className="campus-card-subtitle">Official university curriculum with progress tracker</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="campus-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Course Name</th>
                <th>Credits</th>
                <th>Type</th>
                <th>Instructor</th>
                <th>Hall</th>
                <th>Syllabus Track</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((c) => (
                <tr key={c.code}>
                  <td className="font-mono font-bold text-indigo-600 dark:text-indigo-400 text-xs">{c.code}</td>
                  <td className="font-bold text-slate-800 dark:text-slate-200">{c.title}</td>
                  <td className="font-mono text-xs">{c.credits}</td>
                  <td className="text-xs text-slate-500">{c.type}</td>
                  <td className="text-xs font-semibold">{c.faculty}</td>
                  <td className="text-xs font-mono text-slate-500">{c.room}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-600 rounded-full"
                          style={{ width: c.syllabusCompletion }}
                        />
                      </div>
                      <span className="text-xs font-bold font-mono">{c.syllabusCompletion}</span>
                    </div>
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

export default AcademicsPage;
