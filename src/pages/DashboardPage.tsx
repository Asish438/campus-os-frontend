import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Users, 
  UserCheck, 
  FileCheck, 
  PiggyBank, 
  Repeat, 
  Landmark, 
  Banknote, 
  Receipt,
  Calendar,
  Eye,
  ArrowUpRight,
  TrendingUp,
  Download,
  Filter
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { StatCard } from '../components/common/StatCard';
import { ChartCard } from '../components/common/ChartCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { 
  MEMBER_GROWTH_DATA, 
  COLLECTION_OVERVIEW_DATA, 
  LOAN_STATUS_DATA,
  formatINR
} from '../mock/mockData';
import { memberService, savingsService, collectionService } from '../services/apiService';
import { Member, Transaction } from '../types';
import { INITIAL_TRANSACTIONS } from '../mock/mockData';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [memberYear, setMemberYear] = useState<'thisYear' | 'lastYear'>('thisYear');
  const [recentMembers, setRecentMembers] = useState<Member[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const members = await memberService.getAll();
        setRecentMembers(members.slice(0, 6));
        setRecentTransactions(INITIAL_TRANSACTIONS.slice(0, 6));
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Format today's date
  const todayFormatted = new Intl.DateTimeFormat('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date());

  const totalLoansCount = LOAN_STATUS_DATA.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="space-y-6">
      {/* Top Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Welcome back, Admin!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Here's what's happening in your institution today.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-750 border border-slate-200/80 dark:border-slate-700/80 text-xs font-semibold text-slate-600 dark:text-slate-300">
          <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>{todayFormatted}</span>
        </div>
      </div>

      {/* 8 Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <StatCard
          title="Total Members"
          value="1,248"
          icon={<Users className="w-6 h-6" />}
          trend={{ value: "12%", isPositive: true, period: "from last month" }}
          color="blue"
          onClick={() => navigate('/members')}
        />

        {/* Card 2 */}
        <StatCard
          title="Active Members"
          value="1,132"
          icon={<UserCheck className="w-6 h-6" />}
          trend={{ value: "8%", isPositive: true, period: "from last month" }}
          color="emerald"
          onClick={() => navigate('/members')}
        />

        {/* Card 3 */}
        <StatCard
          title="Pending KYC"
          value="86"
          icon={<FileCheck className="w-6 h-6" />}
          trend={{ value: "3%", isPositive: false, period: "from last week" }}
          color="amber"
          onClick={() => navigate('/kyc')}
        />

        {/* Card 4 */}
        <StatCard
          title="Savings Accounts"
          value="920"
          icon={<PiggyBank className="w-6 h-6" />}
          trend={{ value: "15%", isPositive: true, period: "from last month" }}
          color="indigo"
          onClick={() => navigate('/savings')}
        />

        {/* Card 5 */}
        <StatCard
          title="RD Accounts"
          value="210"
          icon={<Repeat className="w-6 h-6" />}
          trend={{ value: "5%", isPositive: true, period: "from last month" }}
          color="purple"
          onClick={() => navigate('/rd')}
        />

        {/* Card 6 */}
        <StatCard
          title="FD Accounts"
          value="156"
          icon={<Landmark className="w-6 h-6" />}
          trend={{ value: "10%", isPositive: true, period: "from last month" }}
          color="blue"
          onClick={() => navigate('/fd')}
        />

        {/* Card 7 */}
        <StatCard
          title="Active Loans"
          value="98"
          icon={<Banknote className="w-6 h-6" />}
          trend={{ value: "4%", isPositive: true, period: "from last month" }}
          color="amber"
          onClick={() => navigate('/loans')}
        />

        {/* Card 8 */}
        <StatCard
          title="Today's Collection"
          value="₹4,85,230"
          icon={<Receipt className="w-6 h-6" />}
          trend={{ value: "18%", isPositive: true, period: "from yesterday" }}
          color="emerald"
          onClick={() => navigate('/collections')}
        />
      </div>

      {/* 3 Dashboard Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart A: Member Growth */}
        <ChartCard
          title="Member Growth"
          subtitle="Monthly active & total member registration"
          className="lg:col-span-2"
          actionSlot={
            <select
              value={memberYear}
              onChange={e => setMemberYear(e.target.value as 'thisYear' | 'lastYear')}
              className="text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-750 px-2.5 py-1.5 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="thisYear">This Year (2026)</option>
              <option value="lastYear">Last Year (2025)</option>
            </select>
          }
        >
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={MEMBER_GROWTH_DATA[memberYear]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.2} />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  border: 'none',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
              <Line 
                type="monotone" 
                dataKey="members" 
                name="Total Members"
                stroke="#2563eb" 
                strokeWidth={3} 
                dot={{ r: 3, fill: '#2563eb' }}
                activeDot={{ r: 6 }} 
              />
              <Line 
                type="monotone" 
                dataKey="active" 
                name="Active Accounts"
                stroke="#10b981" 
                strokeWidth={2} 
                strokeDasharray="4 4"
                dot={{ r: 3, fill: '#10b981' }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Chart C: Loan Status Donut */}
        <ChartCard
          title="Loan Status Distribution"
          subtitle={`Total Portfolio: ${totalLoansCount} loans`}
        >
          <div className="relative w-full h-[260px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={LOAN_STATUS_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {LOAN_STATUS_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: number) => [`${val} Loans`, 'Count']}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: 'none',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Total Loans Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {totalLoansCount}
              </span>
              <span className="text-[10px] font-semibold tracking-wider uppercase text-slate-400">
                Total Loans
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-2 pt-2 border-t border-slate-100 dark:border-slate-700/60 text-[11px]">
            {LOAN_STATUS_DATA.map(item => (
              <div key={item.name} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-slate-600 dark:text-slate-300 truncate">{item.name}:</span>
                <strong className="text-slate-900 dark:text-white">{item.value}</strong>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* Chart B: Collection Overview */}
        <ChartCard
          title="Collection Overview"
          subtitle="Monthly inflow comparison across payment modes"
          className="lg:col-span-3"
        >
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={COLLECTION_OVERVIEW_DATA} barGap={6}>
              <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.2} />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis 
                stroke="#94a3b8" 
                fontSize={11} 
                tickLine={false} 
                axisLine={false}
                tickFormatter={val => `₹${val / 1000}k`}
              />
              <Tooltip
                formatter={(val: number) => [formatINR(val), '']}
                contentStyle={{
                  backgroundColor: '#0f172a',
                  border: 'none',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
              <Bar dataKey="cash" name="Cash Counter" fill="#16a34a" radius={[6, 6, 0, 0]} />
              <Bar dataKey="upi" name="UPI QR / Mobile" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              <Bar dataKey="bankTransfer" name="Bank Transfer / NEFT" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Tables Section: Recent Members & Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Members */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm p-5 flex flex-col">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-700/60">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Recent Members
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Latest member applications & registrations
              </p>
            </div>
            <Link
              to="/members"
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-750 text-slate-500 dark:text-slate-400 font-semibold">
                <tr>
                  <th className="px-3 py-2 rounded-l-lg">Member ID</th>
                  <th className="px-3 py-2">Name</th>
                  <th className="px-3 py-2">Mobile</th>
                  <th className="px-3 py-2">KYC Status</th>
                  <th className="px-3 py-2">Joining Date</th>
                  <th className="px-3 py-2 text-right rounded-r-lg">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                {recentMembers.map(member => (
                  <tr key={member.id} className="hover:bg-slate-50 dark:hover:bg-slate-750/50 transition-colors">
                    <td className="px-3 py-3 font-mono font-bold text-blue-600 dark:text-blue-400">
                      {member.id}
                    </td>
                    <td className="px-3 py-3 font-medium text-slate-900 dark:text-white">
                      {member.fullName}
                    </td>
                    <td className="px-3 py-3 text-slate-500 dark:text-slate-400">
                      {member.mobile}
                    </td>
                    <td className="px-3 py-3">
                      <StatusBadge status={member.kycStatus} />
                    </td>
                    <td className="px-3 py-3 text-slate-500 dark:text-slate-400">
                      {member.joiningDate}
                    </td>
                    <td className="px-3 py-3 text-right">
                      <button
                        onClick={() => navigate(`/members/${member.id}`)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 dark:hover:text-blue-400 transition-colors"
                        title="View Profile"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm p-5 flex flex-col">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-700/60">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Recent Transactions
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Live ledger postings across counters & transfers
              </p>
            </div>
            <Link
              to="/accounting"
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-750 text-slate-500 dark:text-slate-400 font-semibold">
                <tr>
                  <th className="px-3 py-2 rounded-l-lg">TXN ID</th>
                  <th className="px-3 py-2">Member</th>
                  <th className="px-3 py-2">Type</th>
                  <th className="px-3 py-2">Amount</th>
                  <th className="px-3 py-2">Mode</th>
                  <th className="px-3 py-2 text-right rounded-r-lg">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                {recentTransactions.map(txn => (
                  <tr key={txn.id} className="hover:bg-slate-50 dark:hover:bg-slate-750/50 transition-colors">
                    <td className="px-3 py-3 font-mono font-semibold text-slate-700 dark:text-slate-300">
                      {txn.id}
                    </td>
                    <td className="px-3 py-3 font-medium text-slate-900 dark:text-white">
                      {txn.memberName}
                    </td>
                    <td className="px-3 py-3">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        {txn.type}
                      </span>
                    </td>
                    <td className="px-3 py-3 font-bold text-slate-900 dark:text-white">
                      {formatINR(txn.amount)}
                    </td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        txn.paymentMode === 'UPI' ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300' :
                        txn.paymentMode === 'Cash' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300' :
                        'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300'
                      }`}>
                        {txn.paymentMode}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-right text-slate-500 dark:text-slate-400 text-[11px]">
                      {txn.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
