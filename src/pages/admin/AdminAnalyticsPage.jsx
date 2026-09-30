import React from 'react';
import { BarChart3, TrendingUp, Cpu, PieChart as PieIcon } from 'lucide-react';
import KpiCard from '../../components/common/KpiCard';

export const AdminAnalyticsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Institutional Predictive Analytics Engine
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          AI-driven academic retention predictions and resource forecasting
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Predicted Graduation Rate"
          value="94.2%"
          subtext="+2.4% vs 2025 Cohort"
          icon={TrendingUp}
          variant="emerald"
        />
        <KpiCard
          title="Placement Readiness"
          value="88.7%"
          subtext="Eligible for Campus Drives"
          icon={BarChart3}
          variant="indigo"
        />
        <KpiCard
          title="Campus Energy Efficiency"
          value="342 kWh/Capita"
          subtext="Green Campus Star 4"
          icon={Cpu}
          variant="cyan"
        />
        <KpiCard
          title="SLA Compliance"
          value="97.4%"
          subtext="Maintenance & Inquiries"
          icon={PieIcon}
          variant="amber"
        />
      </div>

      <div className="campus-card">
        <div className="campus-card-header">
          <h3 className="campus-card-title">Early Warning Shortfall Analytics</h3>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          The Campus OS AI model correlates course attendance velocity with mid-term grades. 
          Currently, 48 students have been flagged with a 65%+ probability of falling below 70% threshold prior to November. 
          Counseling sessions have been scheduled through department proctorial cells.
        </p>
      </div>
    </div>
  );
};

export default AdminAnalyticsPage;
