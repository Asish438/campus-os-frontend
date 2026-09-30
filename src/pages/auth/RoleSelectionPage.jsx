import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  GraduationCap,
  UserCheck,
  Building2,
  ShieldCheck,
  DollarSign,
  Bus,
  Sparkles,
  School,
  ArrowRight
} from 'lucide-react';

export const RoleSelectionPage = () => {
  const navigate = useNavigate();
  const { switchRole } = useAuth();

  const roles = [
    {
      id: 'STUDENT',
      title: 'Student Portal',
      description: 'Academics, live attendance shortfalls, AI study tutor, gate passes, hostel & bus confirmation.',
      icon: GraduationCap,
      color: 'from-blue-600 to-indigo-600',
      badge: 'B.Tech / MCA / M.Tech',
      path: '/student/dashboard'
    },
    {
      id: 'FACULTY',
      title: 'Faculty Portal',
      description: 'Curriculum delivery, attendance roster, AI-driven lecture module generator, and assignment grading.',
      icon: UserCheck,
      color: 'from-emerald-600 to-teal-600',
      badge: 'Professors & Instructors',
      path: '/faculty/dashboard'
    },
    {
      id: 'WARDEN',
      title: 'Warden Portal',
      description: 'Hostel room allocations, maintenance complaints queue, gate pass authorisations, and mess checks.',
      icon: Building2,
      color: 'from-amber-600 to-orange-600',
      badge: 'Chief Hostel Wardens',
      path: '/warden/dashboard'
    },
    {
      id: 'SECURITY',
      title: 'Campus Security Desk',
      description: 'Dynamic QR scanner for gate passes, automated entry/exit logs, and verified visitor check-ins.',
      icon: ShieldCheck,
      color: 'from-rose-600 to-red-600',
      badge: 'Gate In-Charge Officers',
      path: '/security/dashboard'
    },
    {
      id: 'ACCOUNTS',
      title: 'Accounts & Bursar',
      description: 'Semester tuition fees, hostel dues reconciliation, penalty waivers, and automated instant receipts.',
      icon: DollarSign,
      color: 'from-cyan-600 to-blue-600',
      badge: 'Finance & Treasury',
      path: '/accounts/dashboard'
    },
    {
      id: 'TRANSPORT',
      title: 'Transport Fleet Control',
      description: 'Live bus passenger reservations, boarding tallies, route schedules, and broadcast departure pings.',
      icon: Bus,
      color: 'from-violet-600 to-purple-600',
      badge: 'Fleet Supervisors',
      path: '/transport/dashboard'
    },
    {
      id: 'ADMIN',
      title: 'Administration Command',
      description: 'Institutional metrics, accreditation audit trails, department workloads, and university broadcasts.',
      icon: Sparkles,
      color: 'from-fuchsia-600 to-pink-600',
      badge: 'Deans & Vice Chancellors',
      path: '/admin/dashboard'
    }
  ];

  const handleSelectRole = (r) => {
    switchRole(r.id);
    navigate(r.path);
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 py-12 px-4 sm:px-6 lg:px-8 selection:bg-indigo-600 selection:text-white flex flex-col justify-center">
      <div className="max-w-5xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 p-2 px-3 rounded-xl bg-slate-900 border border-slate-800 mb-4">
            <School className="w-5 h-5 text-indigo-400" />
            <span className="font-extrabold text-sm tracking-wider text-white">CAMPUS OS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
            Select Your Campus Persona
          </h1>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            Choose a role to experience unified real-time workflow coordination across student, faculty, and administrative departments.
          </p>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {roles.map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.id}
                onClick={() => handleSelectRole(r)}
                className="group relative p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${r.color} flex items-center justify-center text-white shadow-md`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {r.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors flex items-center justify-between">
                  {r.title}
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-indigo-400" />
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {r.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="text-center space-x-4">
          <button
            onClick={() => navigate('/login')}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors underline"
          >
            Or log in with College Credentials / Email Password
          </button>
          <span className="text-slate-600">•</span>
          <button
            onClick={() => navigate('/otp-verification')}
            className="text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            Login via Phone OTP (123456)
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionPage;
