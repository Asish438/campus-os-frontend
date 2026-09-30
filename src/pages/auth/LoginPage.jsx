import React, { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { DEMO_USERS } from '../../data/demoData';
import {
  School,
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
  AlertCircle,
  GraduationCap,
  Users,
  Shield,
  Bus,
  DollarSign,
  UserCheck,
  Building2,
  CheckCircle2
} from 'lucide-react';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, switchRole } = useAuth();

  // Tab: 'student' or 'admin' (default to student, or read from query param if available)
  const defaultTab = searchParams.get('tab') === 'admin' ? 'admin' : 'student';
  const [activeTab, setActiveTab] = useState(defaultTab);

  // Form State
  const [email, setEmail] = useState('student@campusos.com');
  const [password, setPassword] = useState('student123');
  const [selectedStaffRole, setSelectedStaffRole] = useState('admin');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle Tab Switch
  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setError('');
    if (tab === 'student') {
      setEmail('student@campusos.com');
      setPassword('student123');
    } else {
      const staffUser = DEMO_USERS[selectedStaffRole] || DEMO_USERS.admin;
      setEmail(staffUser.email);
      setPassword(staffUser.password);
    }
  };

  // Handle Staff Sub-role Selection
  const handleSelectStaffRole = (roleKey) => {
    setSelectedStaffRole(roleKey);
    const staffUser = DEMO_USERS[roleKey];
    if (staffUser) {
      setEmail(staffUser.email);
      setPassword(staffUser.password);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const loggedUser = await login(email, password);
      redirectUser(loggedUser.role);
    } catch (err) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoLogin = (roleKey) => {
    const targetUser = DEMO_USERS[roleKey];
    if (targetUser) {
      setEmail(targetUser.email);
      setPassword(targetUser.password);
      switchRole(targetUser.role);
      redirectUser(targetUser.role);
    }
  };

  const redirectUser = (role) => {
    switch (role) {
      case 'STUDENT':
        navigate('/student/dashboard');
        break;
      case 'FACULTY':
        navigate('/faculty/dashboard');
        break;
      case 'WARDEN':
        navigate('/warden/dashboard');
        break;
      case 'SECURITY':
        navigate('/security/dashboard');
        break;
      case 'ACCOUNTS':
        navigate('/accounts/dashboard');
        break;
      case 'TRANSPORT':
        navigate('/transport/dashboard');
        break;
      case 'ADMIN':
        navigate('/admin/dashboard');
        break;
      default:
        navigate('/');
    }
  };

  const staffRoles = [
    { key: 'admin', label: 'Admin Command', user: 'Dr. S. K. Patnaik', icon: Sparkles, color: 'text-fuchsia-400 bg-fuchsia-950/40 border-fuchsia-800/60' },
    { key: 'faculty', label: 'Faculty', user: 'Dr. Aris Thorne', icon: UserCheck, color: 'text-emerald-400 bg-emerald-950/40 border-emerald-800/60' },
    { key: 'warden', label: 'Hostel Warden', user: 'Col. Rajesh Sharma', icon: Building2, color: 'text-amber-400 bg-amber-950/40 border-amber-800/60' },
    { key: 'security', label: 'Security Gate', user: 'Insp. M. Pradhan', icon: Shield, color: 'text-rose-400 bg-rose-950/40 border-rose-800/60' },
    { key: 'accounts', label: 'Accounts & Dues', user: 'Priyanka Das', icon: DollarSign, color: 'text-cyan-400 bg-cyan-950/40 border-cyan-800/60' },
    { key: 'transport', label: 'Fleet Transport', user: 'Ramesh Mohapatra', icon: Bus, color: 'text-purple-400 bg-purple-950/40 border-purple-800/60' }
  ];

  return (
    <div className="min-h-screen bg-[#f4f7fc] dark:bg-[#070b14] text-slate-900 dark:text-slate-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 selection:bg-blue-600 selection:text-white relative">
      {/* Background Soft Aura Orbs */}
      <div className="fixed top-10 left-1/4 w-96 h-96 bg-blue-400/15 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-10 right-1/4 w-96 h-96 bg-indigo-400/15 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2.5 mb-4 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
            <School className="w-5 h-5" />
          </div>
          <div className="text-left">
            <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">CAMPUS OS</span>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Campus Life, Debugged.</p>
          </div>
        </Link>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Sign In to Your Portal
        </h2>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Select whether you are accessing as a Student or University Administrator / Staff
        </p>

        {/* Live Axios Endpoint Connection Indicator */}
        <div className="inline-flex items-center gap-2 mt-3 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900 text-[11px] font-mono font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Axios Endpoint: <strong>POST http://localhost:8080/api/auth/login</strong></span>
        </div>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        {/* Dual Mode Tab Selector: STUDENT vs ADMIN */}
        <div className="grid grid-cols-2 p-1.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 mb-5 shadow-xs">
          <button
            type="button"
            onClick={() => handleTabSwitch('student')}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'student'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Student Portal</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabSwitch('admin')}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'admin'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/25'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Admin & Staff</span>
          </button>
        </div>

        {/* Login Card */}
        <div className="paper-plate p-6 sm:p-8 bg-white/90 dark:bg-slate-900/90 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/60 flex items-center gap-2 text-rose-700 dark:text-rose-300 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{error}</span>
            </div>
          )}

          {/* ACTIVE TAB: STUDENT PORTAL */}
          {activeTab === 'student' ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                    Student Authentication
                  </span>
                </div>
                <span className="text-[10px] font-mono text-blue-700 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-900">
                  Roll ID or Email
                </span>
              </div>

              {/* 1-Click Fast Student Demo Login */}
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('student')}
                className="w-full py-2.5 px-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-bold text-xs flex items-center justify-center gap-2 transition-all group"
              >
                <Sparkles className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
                <span>⚡ Instant Login as Sai (B.Tech CSE - BPUT2026001)</span>
              </button>

              <form onSubmit={handleLogin} className="space-y-4 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    College ID / Institutional Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. BPUT2026001 or student@campusos.com"
                      className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white placeholder:text-slate-400 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Password
                    </label>
                    <Link
                      to="/otp-verification"
                      className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline transition-colors"
                    >
                      Login via Mobile OTP?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white placeholder:text-slate-400 outline-none transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] disabled:opacity-50"
                >
                  {loading ? 'Authenticating via Axios...' : 'Sign In as Student'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Student Registration Callout */}
              <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-800 text-center space-y-2">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  New scholar joining Campus OS?
                </p>
                <Link
                  to="/register-student"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 border border-emerald-300 dark:border-emerald-600 text-emerald-800 dark:text-emerald-300 font-bold text-xs transition-all shadow-xs"
                >
                  <GraduationCap className="w-4 h-4 text-emerald-600" />
                  Register as a New Student (Sign Up)
                </Link>
              </div>
            </div>
          ) : (
            /* ACTIVE TAB: ADMIN & STAFF PORTAL */
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                  <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                    Staff & Executive Terminal
                  </span>
                </div>
                <span className="text-[10px] font-mono text-purple-400 font-bold bg-purple-950/40 px-2 py-0.5 rounded border border-purple-900">
                  Role Selector
                </span>
              </div>

              {/* Staff Persona Chips */}
              <div>
                <p className="text-[11px] font-semibold text-slate-400 mb-2">
                  Select department staff profile:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {staffRoles.map((r) => {
                    const Icon = r.icon;
                    const isSelected = selectedStaffRole === r.key;
                    return (
                      <button
                        key={r.key}
                        type="button"
                        onClick={() => handleSelectStaffRole(r.key)}
                        className={`p-2 rounded-xl border text-left text-xs transition-all ${
                          isSelected
                            ? 'bg-purple-950/80 border-purple-500 text-white ring-2 ring-purple-500/20'
                            : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 font-bold">
                          <Icon className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                          <span className="truncate">{r.label}</span>
                        </div>
                        <p className="text-[10px] text-slate-500 truncate mt-0.5">{r.user}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Instant 1-Click Staff Login */}
              <button
                type="button"
                onClick={() => handleQuickDemoLogin(selectedStaffRole)}
                className="w-full py-2.5 px-3 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-purple-300 font-bold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <Sparkles className="w-4 h-4 text-pink-400" />
                <span>
                  ⚡ Launch as {staffRoles.find(s => s.key === selectedStaffRole)?.label} ({staffRoles.find(s => s.key === selectedStaffRole)?.user})
                </span>
              </button>

              <form onSubmit={handleLogin} className="space-y-4 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Official Staff Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@campusos.com"
                      className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-slate-900 dark:text-white placeholder:text-slate-400 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-slate-900 dark:text-white placeholder:text-slate-400 outline-none transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] disabled:opacity-50"
                >
                  {loading ? 'Authenticating Staff...' : `Access ${selectedStaffRole.toUpperCase()} Console`}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* Quick Phone OTP Login footer */}
          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
            <Link
              to="/otp-verification"
              className="text-xs text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-white transition-colors"
            >
              Sign In with Phone OTP (Demo OTP: <strong className="text-blue-600 dark:text-cyan-400 font-mono">123456</strong>)
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
