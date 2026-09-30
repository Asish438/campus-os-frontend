import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import { calculateAttendanceImpact } from '../../data/demoData';
import KpiCard from '../../components/common/KpiCard';
import StatusBadge from '../../components/common/StatusBadge';
import {
  CalendarCheck2,
  AlertTriangle,
  CheckCircle2,
  Calculator,
  Info,
  BookOpen,
  ArrowRight,
  TrendingDown
} from 'lucide-react';

export const AttendancePage = () => {
  const { attendance } = useCampus();

  // Selected subject for interactive calculation tool
  const [selectedSubjectId, setSelectedSubjectId] = useState('sub_cn');
  const [targetPercentage, setTargetPercentage] = useState(75);

  const selectedSubject = attendance.subjects.find(s => s.id === selectedSubjectId) || attendance.subjects[0];

  // Dynamic JS calculation
  const projection = calculateAttendanceImpact(
    selectedSubject.conducted,
    selectedSubject.attended,
    targetPercentage
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Attendance Analytics & Projection Engine
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Official BPUT University Minimum Eligibility Threshold: 75%
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1 rounded-full font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" />
            Overall Shortfall Detected
          </span>
        </div>
      </div>

      {/* Top Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Overall Attendance"
          value={`${attendance.overallPercentage}%`}
          subtext="136 of 200 total classes"
          icon={CalendarCheck2}
          variant="amber"
          badge="Below 75%"
        />
        <KpiCard
          title="Regulatory Target"
          value={`${attendance.requiredPercentage}%`}
          subtext="Mandatory for End-Sem Exam"
          icon={BookOpen}
          variant="blue"
        />
        <KpiCard
          title="Total Attended"
          value="136 Classes"
          subtext="Across 4 Active Courses"
          icon={CheckCircle2}
          variant="emerald"
        />
        <KpiCard
          title="Total Missed"
          value="64 Classes"
          subtext="Leaves & Sick Absences"
          icon={TrendingDown}
          variant="rose"
        />
      </div>

      {/* Subject-Wise Attendance Breakdown */}
      <div className="campus-card">
        <div className="campus-card-header">
          <div>
            <h3 className="campus-card-title">Subject-Wise Breakdown</h3>
            <p className="campus-card-subtitle">Detailed breakdown of conducted, attended, and missed lectures</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="campus-table">
            <thead>
              <tr>
                <th>Subject Name</th>
                <th>Instructor</th>
                <th>Conducted</th>
                <th>Attended</th>
                <th>Missed</th>
                <th>Percentage</th>
                <th>Eligibility</th>
              </tr>
            </thead>
            <tbody>
              {attendance.subjects.map((sub) => {
                const isSelected = sub.id === selectedSubjectId;
                return (
                  <tr
                    key={sub.id}
                    onClick={() => setSelectedSubjectId(sub.id)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? 'bg-blue-50/70 dark:bg-blue-950/40 font-semibold' : ''
                    }`}
                  >
                    <td>
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white">{sub.name}</span>
                        <span className="ml-2 font-mono text-[10px] text-slate-400">({sub.code})</span>
                      </div>
                    </td>
                    <td className="text-slate-500 dark:text-slate-400 text-xs">{sub.faculty}</td>
                    <td className="font-mono text-xs">{sub.conducted}</td>
                    <td className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                      {sub.attended}
                    </td>
                    <td className="font-mono text-xs text-rose-500 font-bold">{sub.missed}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              sub.percentage >= 75 ? 'bg-emerald-500' : 'bg-amber-500'
                            }`}
                            style={{ width: `${Math.min(100, sub.percentage)}%` }}
                          />
                        </div>
                        <span className="font-bold text-xs">{sub.percentage}%</span>
                      </div>
                    </td>
                    <td>
                      <StatusBadge
                        status={sub.percentage >= 75 ? 'Eligible' : 'Shortfall'}
                        size="sm"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Attendance Calculation & Projection Tool */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 spans: Interactive Simulator */}
        <div className="lg:col-span-2 campus-card">
          <div className="campus-card-header">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="campus-card-title">Live Attendance Impact Calculator</h3>
                <p className="campus-card-subtitle">Real-time simulator: "Can I miss the next class?"</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs text-slate-500">Target:</label>
              <select
                value={targetPercentage}
                onChange={(e) => setTargetPercentage(Number(e.target.value))}
                className="px-2 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 font-bold text-blue-600"
              >
                <option value={75}>75% (Standard University)</option>
                <option value={80}>80% (Distinction Bar)</option>
                <option value={85}>85% (Scholarship Bar)</option>
              </select>
            </div>
          </div>

          <div className="space-y-6">
            {/* Subject Selector Buttons */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Selected Course for Projection:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {attendance.subjects.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSubjectId(s.id)}
                    className={`p-3 rounded-xl border text-left text-xs transition-all ${
                      s.id === selectedSubjectId
                        ? 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/40 text-indigo-900 dark:text-white font-bold ring-2 ring-indigo-500/20'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <p className="truncate font-semibold">{s.name}</p>
                    <p className="text-[11px] font-mono text-slate-500 mt-1">
                      {s.attended}/{s.conducted} ({s.percentage}%)
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated Questions Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Question 1: How many consecutive to attend */}
              <div className="p-4 rounded-xl border border-indigo-100 dark:border-indigo-900/50 bg-indigo-50/40 dark:bg-indigo-950/20">
                <p className="text-xs font-bold text-indigo-900 dark:text-indigo-300 uppercase tracking-wider mb-1">
                  Consecutive Requirement
                </p>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
                    {projection.classesNeeded}
                  </span>
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                    consecutive classes
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedSubject.name}: Currently at <strong className="font-bold">{projection.currentPct}%</strong>.
                  You must attend the next <strong className="font-bold underline">{projection.classesNeeded} consecutive classes</strong> to reach {targetPercentage}%.
                </p>
              </div>

              {/* Question 2: Can I miss the next class */}
              <div
                className={`p-4 rounded-xl border ${
                  projection.canMissNext
                    ? 'border-emerald-200 bg-emerald-50/40 dark:bg-emerald-950/20'
                    : 'border-rose-200 bg-rose-50/40 dark:bg-rose-950/20'
                }`}
              >
                <p
                  className={`text-xs font-bold uppercase tracking-wider mb-1 ${
                    projection.canMissNext ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300'
                  }`}
                >
                  "Can I miss the next class?"
                </p>
                <div className="flex items-baseline gap-2 mb-2">
                  <span
                    className={`text-2xl font-extrabold ${
                      projection.canMissNext ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                    }`}
                  >
                    {projection.canMissNext ? 'YES, SAFELY' : 'NO, WARNING!'}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Missing the upcoming session drops attendance to{' '}
                  <strong className="font-bold">{projection.pctIfMissNext}%</strong>.
                  {projection.canMissNext
                    ? ` You have a buffer of ${projection.safeMissCount} class(es).`
                    : ` Any additional absence severely impacts exam registration.`}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 span: University Policy Reference */}
        <div className="campus-card space-y-4">
          <div className="campus-card-header">
            <h3 className="campus-card-title">BPUT Regulations</h3>
          </div>
          <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
              <h5 className="font-bold text-slate-800 dark:text-slate-200 mb-1">
                Rule 4.2: 75% Requirement
              </h5>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                Candidates must achieve at least 75% attendance in theory and lab coursework individually to be permitted into semester examinations.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
              <h5 className="font-bold text-slate-800 dark:text-slate-200 mb-1">
                Rule 4.3: Medical Condonation
              </h5>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                Shortfall up to 10% (between 65% and 75%) may be condoned by the Dean on valid medical grounds with hospital discharge summary.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
              <h5 className="font-bold text-slate-800 dark:text-slate-200 mb-1">
                Connected SMS / ERP Sync
              </h5>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                Weekly attendance warnings are automatically dispatched to student and parent mobile numbers when falling below 70%.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
