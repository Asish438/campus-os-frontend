import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCampus } from '../../context/CampusContext';
import {
  School,
  User,
  Mail,
  Lock,
  Phone,
  GraduationCap,
  Sparkles,
  ArrowRight,
  AlertCircle,
  ChevronLeft
} from 'lucide-react';

export const StudentRegisterPage = () => {
  const navigate = useNavigate();
  const { registerStudent } = useAuth();
  const { addToast } = useCampus();

  const [formData, setFormData] = useState({
    fullName: '',
    studentId: '',
    email: '',
    phone: '',
    program: 'B.Tech',
    department: 'Computer Science & Engineering',
    year: '1st Year',
    semester: 'Semester 1',
    accommodation: 'Hosteller',
    hostel: 'Aryabhatta Hall of Residence',
    room: 'Room 205',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 1-Click quick fill for evaluators / demo users
  const handleAutoFill = () => {
    setFormData({
      fullName: 'Rahul Sharma',
      studentId: `BPUT2026${Math.floor(200 + Math.random() * 700)}`,
      email: 'rahul.sharma@campusos.com',
      phone: '+91 98765 88990',
      program: 'B.Tech',
      department: 'Computer Science & Engineering',
      year: '1st Year',
      semester: 'Semester 1',
      accommodation: 'Hosteller',
      hostel: 'Aryabhatta Hall of Residence',
      room: 'Room 205',
      password: 'student123',
      confirmPassword: 'student123'
    });
    setError('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please verify.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    setLoading(true);

    try {
      const response = await registerStudent(formData);
      addToast({ title: 'Registration Successful', message: response.message, type: 'success' });
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Registration failed. Please verify backend service.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7fc] dark:bg-[#070b14] text-slate-900 dark:text-slate-100 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8 selection:bg-blue-600 selection:text-white relative">
      {/* Background Soft Aura Orbs */}
      <div className="fixed top-10 left-1/4 w-96 h-96 bg-blue-400/15 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-10 right-1/4 w-96 h-96 bg-indigo-400/15 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl text-center mb-6">
        <Link to="/" className="inline-flex items-center gap-2.5 mb-3 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
            <School className="w-5 h-5" />
          </div>
          <div className="text-left">
            <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">CAMPUS OS</span>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Campus Life, Debugged.</p>
          </div>
        </Link>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Student Portal Registration 🎓
        </h1>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          Enroll student credentials to access real-time attendance tracking, AI study assistant, and digital gate passes.
        </p>

        {/* Live Axios Endpoint Connection Indicator */}
        <div className="inline-flex items-center gap-2 mt-3 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900 text-[11px] font-mono font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Axios Endpoint: <strong>POST http://localhost:8070/api/auth/register</strong></span>
        </div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="paper-plate p-6 sm:p-8 bg-white/90 dark:bg-slate-900/90 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          {/* Quick Auto-Fill Demo Button */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 mb-6">
            <div className="flex items-center gap-2 text-xs text-blue-800 dark:text-blue-300 font-semibold">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Evaluating prototype? Fill form in 1-click:</span>
            </div>
            <button
              type="button"
              onClick={handleAutoFill}
              className="px-3 py-1 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-sm"
            >
              ⚡ Auto-Fill Demo Student
            </button>
          </div>

          {error && (
            <div className="mb-5 p-3 rounded-xl bg-rose-950/50 border border-rose-800/60 flex items-center gap-2 text-rose-300 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Row 1: Full Name & Roll Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-950/60 border border-slate-700/80 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-white placeholder:text-slate-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  University Roll No / College ID
                </label>
                <div className="relative">
                  <GraduationCap className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="studentId"
                    required
                    value={formData.studentId}
                    onChange={handleChange}
                    placeholder="e.g. BPUT2026110"
                    className="w-full pl-10 pr-4 py-2.5 text-xs font-mono bg-slate-950/60 border border-slate-700/80 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-white placeholder:text-slate-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Student Institutional / Personal Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="student@campusos.com"
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-950/60 border border-slate-700/80 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-white placeholder:text-slate-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Mobile Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-950/60 border border-slate-700/80 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-white placeholder:text-slate-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Row 3: Password & Confirm Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Create Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-950/60 border border-slate-700/80 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-white placeholder:text-slate-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-950/60 border border-slate-700/80 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-white placeholder:text-slate-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] disabled:opacity-50"
              >
                {loading ? 'Registering...' : 'Register'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Footer Back to Login Link */}
          <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">Already registered as a student?</span>
            <Link
              to="/login"
              className="font-bold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentRegisterPage;
