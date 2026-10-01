import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCampus } from '../../context/CampusContext';
import KpiCard from '../../components/common/KpiCard';
import ChartCard from '../../components/charts/ChartCard';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';
import {
  Users,
  AlertTriangle,
  CreditCard,
  QrCode,
  Bus,
  CalendarCheck2,
  Sliders,
  Filter,
  Layers,
  Sparkles,
  School
} from 'lucide-react';

export const AdminDashboard = () => {
  const { complaints, gatePasses, visitors, buses } = useCampus();

  // Filters state
  const [selectedProgram, setSelectedProgram] = useState('All Programs');
  const [selectedDept, setSelectedDept] = useState('Computer Science & Engg.');
  const [selectedYear, setSelectedYear] = useState('3rd Year');
  const [selectedSemester, setSelectedSemester] = useState('Semester 5');
  const [selectedBatch, setSelectedBatch] = useState('2024-2028');

  // Chart Data
  const attendanceDistData = [
    { range: '< 65%', count: 142, fill: '#f43f5e' },
    { range: '65% - 74%', count: 170, fill: '#f59e0b' },
    { range: '75% - 85%', count: 2150, fill: '#6366f1' },
    { range: '> 85%', count: 2388, fill: '#10b981' }
  ];

  const feeCollectionData = [
    { month: 'Jun', billed: 40, collected: 32 },
    { month: 'Jul', billed: 95, collected: 84 },
    { month: 'Aug', billed: 180, collected: 155 },
    { month: 'Sep', billed: 220, collected: 198 },
    { month: 'Oct (Proj)', billed: 240, collected: 210 }
  ];

  const complaintAgeingData = [
    { bracket: '< 24 Hours', count: 12 },
    { bracket: '24-48 Hours', count: 5 },
    { bracket: '3-5 Days', count: 3 },
    { bracket: '> 5 Days (Overdue)', count: 2 }
  ];

  const hostelComplaintsCategory = [
    { name: 'Plumbing', value: 38, color: '#06b6d4' },
    { name: 'Electrical', value: 28, color: '#f59e0b' },
    { name: 'Network/Wi-Fi', value: 18, color: '#6366f1' },
    { name: 'Carpentry', value: 10, color: '#10b981' },
    { name: 'Mess & Food', value: 6, color: '#f43f5e' }
  ];

  const transportUsageData = [
    { bus: 'BUS-01 (Cuttack)', capacity: 50, booked: 40 },
    { bus: 'BUS-03 (Bhubaneswar)', capacity: 45, booked: 34 },
    { bus: 'BUS-05 (AIIMS)', capacity: 35, booked: 22 },
    { bus: 'BUS-08 (Patia Express)', capacity: 40, booked: 38 }
  ];

  const departmentWorkloadData = [
    { dept: 'CSE', students: 1240, faculty: 48, ratio: '25:1' },
    { dept: 'ECE', students: 980, faculty: 38, ratio: '26:1' },
    { dept: 'MECH', students: 780, faculty: 32, ratio: '24:1' },
    { dept: 'CIVIL', students: 620, faculty: 26, ratio: '24:1' },
    { dept: 'MBA', students: 1230, faculty: 45, ratio: '27:1' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-6">
      {/* Executive Command Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Institutional Command Center 🏛️
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900 font-mono">
              Live Campus OS Engine
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Unified University Real-Time Operations • 4,850 Active Enrolled Scholars
          </p>
        </div>
      </div>

      {/* Enterprise Filter Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
          <Filter className="w-3.5 h-3.5 text-indigo-500" />
          Multi-Dimensional Cohort Filters
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 text-xs">
          <select
            value={selectedProgram}
            onChange={(e) => setSelectedProgram(e.target.value)}
            className="form-select text-xs py-1.5"
          >
            <option>All Programs</option>
            <option>B.Tech</option>
            <option>M.Tech</option>
            <option>MCA</option>
            <option>MBA</option>
          </select>

          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="form-select text-xs py-1.5"
          >
            <option>Computer Science & Engg.</option>
            <option>Electronics & Comm.</option>
            <option>Mechanical Engg.</option>
            <option>Civil Engg.</option>
          </select>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="form-select text-xs py-1.5"
          >
            <option>1st Year</option>
            <option>2nd Year</option>
            <option>3rd Year</option>
            <option>4th Year</option>
          </select>

          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="form-select text-xs py-1.5"
          >
            <option>Semester 1</option>
            <option>Semester 3</option>
            <option>Semester 5</option>
            <option>Semester 7</option>
          </select>

          <select
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
            className="form-select text-xs py-1.5"
          >
            <option>Batch 2024-2028</option>
            <option>Batch 2023-2027</option>
            <option>Batch 2022-2026</option>
          </select>
        </div>
      </div>

      {/* 9 Specified Admin KPIs Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-9 gap-3">
        <KpiCard
          title="Total Students"
          value="4,850"
          subtext="Undergrad & PG"
          icon={Users}
          variant="indigo"
        />
        <KpiCard
          title="Pending Requests"
          value="42"
          subtext="Gate & Leave"
          icon={Layers}
          variant="cyan"
        />
        <KpiCard
          title="Open Complaints"
          value={complaints.filter(c => c.status !== 'RESOLVED').length.toString()}
          subtext="Active Maintenance"
          icon={AlertTriangle}
          variant="amber"
        />
        <KpiCard
          title="Overdue Tickets"
          value="3"
          subtext="> 48 hrs pending"
          icon={AlertTriangle}
          variant="rose"
        />
        <KpiCard
          title="Below 75% Att."
          value="312"
          subtext="Notice dispatched"
          icon={CalendarCheck2}
          variant="rose"
        />
        <KpiCard
          title="Pending Fees"
          value="₹48.6L"
          subtext="Monsoon Dues"
          icon={CreditCard}
          variant="rose"
        />
        <KpiCard
          title="Active Gate Pass"
          value={gatePasses.filter(p => p.status === 'Approved').length.toString()}
          subtext="QR Verified"
          icon={QrCode}
          variant="emerald"
        />
        <KpiCard
          title="Visitors Today"
          value={visitors.length.toString()}
          subtext="At Gate 1 Desk"
          icon={Users}
          variant="default"
        />
        <KpiCard
          title="Active Buses"
          value={buses.length.toString()}
          subtext="Evening Dispatch"
          icon={Bus}
          variant="indigo"
        />
      </div>

      {/* Charts Grid - 6 Comprehensive Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Attendance Distribution */}
        <ChartCard
          title="Student Attendance Distribution"
          subtitle="Regulatory compliance clustering across all batches"
        >
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={attendanceDistData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
              <XAxis dataKey="range" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '11px' }}
              />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {attendanceDistData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 2. Fee Collection Trend */}
        <ChartCard
          title="Institutional Fee Collection Run-Rate (₹ Lakhs)"
          subtitle="Cumulative semester recovery comparison"
        >
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={feeCollectionData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCollected" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '11px' }}
              />
              <Area type="monotone" dataKey="billed" stroke="#94a3b8" fill="#e2e8f0" fillOpacity={0.2} name="Billed" />
              <Area type="monotone" dataKey="collected" stroke="#4f46e5" fillOpacity={1} fill="url(#colorCollected)" name="Collected" />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 3. Hostel Complaints by Category */}
        <ChartCard
          title="Hostel Complaints Breakdown"
          subtitle="AI-classified incident distribution across residential blocks"
        >
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={hostelComplaintsCategory}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={4}
                dataKey="value"
                nameKey="name"
              >
                {hostelComplaintsCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '11px' }}
              />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 4. Complaint Ageing SLA */}
        <ChartCard
          title="Maintenance SLA & Ageing Analysis"
          subtitle="Resolution time-to-close metrics"
        >
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={complaintAgeingData} layout="vertical" margin={{ top: 10, right: 20, left: 30, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} opacity={0.2} />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="bracket" type="category" tick={{ fontSize: 11 }} width={120} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '11px' }}
              />
              <Bar dataKey="count" fill="#6366f1" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 5. Transport Fleet Usage */}
        <ChartCard
          title="Campus Shuttle Passenger Utilization"
          subtitle="Seat reservations vs coach vehicle capacity"
        >
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={transportUsageData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
              <XAxis dataKey="bus" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '11px' }}
              />
              <Bar dataKey="capacity" fill="#cbd5e1" name="Capacity" radius={[4, 4, 0, 0]} />
              <Bar dataKey="booked" fill="#06b6d4" name="Confirmed Commuters" radius={[4, 4, 0, 0]} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 6. Department Workload Ratio */}
        <ChartCard
          title="Department Student-to-Faculty Ratios"
          subtitle="Faculty academic workload optimization"
        >
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={departmentWorkloadData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
              <XAxis dataKey="dept" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '11px' }}
              />
              <Bar dataKey="students" fill="#4f46e5" name="Students" radius={[4, 4, 0, 0]} />
              <Bar dataKey="faculty" fill="#10b981" name="Faculty" radius={[4, 4, 0, 0]} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
