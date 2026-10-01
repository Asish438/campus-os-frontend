import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCampus } from '../../context/CampusContext';
import QRCodeCard from '../../components/qr/QRCodeCard';
import Modal from '../../components/modals/Modal';
import {
  CalendarCheck2,
  CreditCard,
  BookOpen,
  Building2,
  Bus,
  Bell,
  Sparkles,
  Camera,
  QrCode,
  ArrowRight,
  Clock,
  MapPin,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  Calculator,
  UtensilsCrossed,
  ShieldCheck,
  Send,
  HelpCircle,
  FileText,
  User,
  Coffee,
  Check,
  Flame,
  Bookmark,
  Compass
} from 'lucide-react';

export const StudentDashboard = () => {
  const { user } = useAuth();
  const {
    attendance,
    fees,
    assignments,
    complaints,
    buses,
    gatePasses,
    notifications
  } = useCampus();
  const navigate = useNavigate();

  const [showQrModal, setShowQrModal] = useState(false);
  const [bunkSimulated, setBunkSimulated] = useState(false);
  const [reservedBus, setReservedBus] = useState(false);

  // Student specific parameters
  const openComplaintsCount = complaints.filter(c => c.status !== 'RESOLVED').length;
  const pendingAssignmentsCount = assignments.filter(a => a.status === 'Pending').length;
  const nextBus = buses[0] || { id: 'BUS-03', departureTime: '5:00 PM', destination: 'City Center' };
  
  const activeGatePass = gatePasses[0] || {
    id: 'GP-2026-8842',
    reason: 'Weekend Home Visit',
    status: 'Approved',
    validUntil: 'Sunday, 08:00 PM',
    destination: 'Home / Cuttack'
  };

  // Humanized Daily Schedule
  const scheduleToday = [
    {
      id: 1,
      code: 'CS501',
      name: 'Computer Networks',
      room: 'LH-201 • Floor 2',
      faculty: 'Dr. Aris Thorne',
      time: '09:00 AM - 10:00 AM',
      topic: 'Sliding Window & ARP Protocols',
      status: 'Live Now',
      isLive: true,
      progressPct: 65
    },
    {
      id: 2,
      code: 'CS502',
      name: 'Operating Systems',
      room: 'LH-203 • Floor 2',
      faculty: 'Prof. Ananya Sen',
      time: '10:30 AM - 11:30 AM',
      topic: 'Banker\'s Algorithm & Deadlock Avoidance',
      status: 'Up Next',
      isLive: false
    },
    {
      id: 3,
      code: 'CS504L',
      name: 'Machine Learning Lab',
      room: 'Computing Lab 3B • Ground Floor',
      faculty: 'Dr. Sourav Mishra',
      time: '02:00 PM - 04:00 PM',
      topic: 'K-Means Clustering on Synthetic Datasets',
      status: 'Afternoon',
      isLive: false
    }
  ];

  // Quick Action Navigator Items
  const quickNav = [
    { label: 'Attendance Test', icon: CalendarCheck2, path: '/student/attendance', color: 'text-amber-600 bg-amber-500/10 dark:bg-amber-400/10' },
    { label: 'AI Study Buddy', icon: Sparkles,
  Camera, path: '/student/ai-study', color: 'text-blue-600 bg-blue-500/10 dark:bg-blue-400/10', glow: true },
    { label: 'Digital Gate Pass', icon: QrCode, path: '/student/gate-pass', color: 'text-purple-600 bg-purple-500/10 dark:bg-purple-400/10' },
    { label: 'Hostel & Mess', icon: UtensilsCrossed, path: '/student/hostel', color: 'text-emerald-600 bg-emerald-500/10 dark:bg-emerald-400/10' },
    { label: 'Clear Fees', icon: CreditCard, path: '/student/fees', color: 'text-rose-600 bg-rose-500/10 dark:bg-rose-400/10' },
    { label: 'Campus Bus', icon: Bus, path: '/student/transport', color: 'text-sky-600 bg-sky-500/10 dark:bg-sky-400/10' },
  ];

  // AI Instant Prompts
  const quickAiPrompts = [
    'Explain ARP in simple language with an analogy',
    'What is the difference between Go-Back-N and Selective Repeat?',
    'Give 4 probable exam questions for OS Deadlock avoidance',
    'Summarize B+ Tree index operations for DBMS'
  ];

  // Attendance dynamic math
  const currentAttended = 34;
  const currentConducted = 50;
  const currentPercentage = 68;
  const consecutiveNeeded = 8;
  
  // If user bunks today
  const simulatedAttended = currentAttended;
  const simulatedConducted = currentConducted + 1;
  const simulatedPercentage = ((simulatedAttended / simulatedConducted) * 100).toFixed(1);
  const simulatedConsecutiveNeeded = 11;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 pb-12 selection:bg-blue-600 selection:text-white">

      {/* 1. Tactile Paperplate Glass Student Hero Card */}
      <div className="paper-plate p-6 sm:p-8 relative overflow-hidden bg-gradient-to-br from-white/95 via-blue-50/50 to-white/90 dark:from-slate-900/90 dark:via-blue-950/30 dark:to-slate-900/90">
        {/* Soft Ambient Rim Light */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 left-1/3 w-64 h-64 bg-cyan-400/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4 sm:gap-5">
            {/* Student Avatar with Verified Aura */}
            <div 
              className="relative shrink-0 cursor-pointer group"
              onClick={() => setShowPhotoModal(true)}
              title="Click to take photo with camera or upload"
            >
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250'}
                alt={user?.name || 'Sai'}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl object-cover ring-4 ring-white/90 dark:ring-slate-800 shadow-md transition-transform group-hover:scale-105"
              />
              <span
                title="Active Enrolled Scholar"
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 text-white border-2 border-white dark:border-slate-900 flex items-center justify-center text-xs font-bold shadow-sm"
              >
                ✓
              </span>
              <div className="absolute inset-0 rounded-3xl bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <Camera className="w-5 h-5" />
              </div>
            </div>

            {/* Personalized Contextual Welcome */}
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  Hey {user?.name || 'Sai'} 👋
                </h1>
                <span className="glass-pill text-[11px] font-bold text-blue-700 dark:text-blue-300 bg-blue-50/80 dark:bg-blue-950/60 border-blue-200 dark:border-blue-900">
                  Semester 5
                </span>
                <span className="glass-pill text-[11px] font-bold text-amber-700 dark:text-amber-300 bg-amber-50/80 dark:bg-amber-950/60 border-amber-200 dark:border-amber-900">
                  Dean's Honor List
                </span>
              </div>

              {/* Humanized Class Prompt */}
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
                Next up: <strong className="text-blue-700 dark:text-blue-400 font-bold">Computer Networks</strong> at 09:00 AM (LH-201). Remember your lab manual!
              </p>

              {/* Quick Info Badges */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-mono font-semibold px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  Roll: {user?.studentId || 'BPUT2026001'}
                </span>
                <span>•</span>
                <span>Hostel: <strong className="text-slate-800 dark:text-slate-200 font-bold">Block B-402</strong></span>
                <span>•</span>
                <span>CGPA: <strong className="text-slate-800 dark:text-slate-200 font-bold">8.84 / 10</strong></span>
              </div>
            </div>
          </div>

          {/* Top Quick Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate('/student/ai-study')}
              className="glass-pill bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-blue-500/25 border-transparent px-4 py-2.5"
            >
              <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" />
              <span>Ask AI Study Buddy</span>
            </button>

            <button
              onClick={() => setShowQrModal(true)}
              className="glass-pill text-xs font-semibold px-4 py-2.5"
            >
              <QrCode className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Show Gate Pass QR</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Floating Tactile Paperplate Quick Dock */}
      <div className="paper-plate p-3.5 bg-white/75 dark:bg-slate-900/75 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-2.5 px-2">
          <div className="flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Campus Daily Dock
            </span>
          </div>
          <span className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold">1-Tap Shortcuts</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {quickNav.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-2.5 p-3 rounded-2xl border transition-all duration-200 text-left group ${
                  item.glow
                    ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900 hover:border-blue-400'
                    : 'bg-white/80 dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700/60 hover:border-blue-300 hover:bg-white dark:hover:bg-slate-800'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-xs transition-transform group-hover:scale-110 ${item.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate">
                    {item.label}
                  </p>
                  <p className="text-[10px] text-slate-400 truncate">Open Module</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Primary Dashboard Grid (Responsive & Tactile) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column (8 spans): Live Schedule, Gate Pass & Coursework */}
        <div className="lg:col-span-8 space-y-6">

          {/* Today's Schedule Card */}
          <div className="paper-plate p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800 gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Today's Classes & Labs
                  </h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Wednesday, 30 September 2026 • 3 lectures on your timetable
                </p>
              </div>

              <button
                onClick={() => navigate('/student/academics')}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 self-start sm:self-auto"
              >
                Full Semester Timetable <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3.5">
              {scheduleToday.map((cls) => (
                <div
                  key={cls.id}
                  className={`p-4 rounded-2xl border transition-all duration-200 ${
                    cls.isLive
                      ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-300 dark:border-blue-700 shadow-sm'
                      : 'bg-white/70 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-700/60'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3.5">
                      {/* Code Tag */}
                      <div className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center font-mono font-bold text-xs shrink-0 shadow-xs ${
                        cls.isLive
                          ? 'bg-blue-600 text-white shadow-blue-500/30'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                      }`}>
                        <span>{cls.code}</span>
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                            {cls.name}
                          </h4>
                          {cls.isLive && (
                            <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-600 text-white uppercase tracking-wider animate-pulse">
                              ● Ongoing
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-blue-700 dark:text-blue-300 font-medium mt-0.5">
                          Topic: {cls.topic}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1">
                          <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
                            <MapPin className="w-3.5 h-3.5 text-blue-600" /> {cls.room}
                          </span>
                          <span>•</span>
                          <span>{cls.faculty}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between pt-2 sm:pt-0 border-t sm:border-0 border-slate-100 dark:border-slate-800 gap-1.5">
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                        {cls.time}
                      </span>
                      {cls.isLive ? (
                        <button
                          onClick={() => navigate('/student/ai-study')}
                          className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                        >
                          <Sparkles className="w-3 h-3" /> Study Notes
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-400">Scheduled</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Digital Outpass (Tactile Boarding-Pass Style) */}
          <div className="paper-plate p-5 sm:p-6 bg-gradient-to-r from-blue-50/70 via-indigo-50/50 to-white dark:from-slate-900 dark:via-blue-950/30 dark:to-slate-900 border-blue-200/90 dark:border-blue-900/60 relative overflow-hidden">
            {/* Cutout notch visuals on side */}
            <div className="hidden sm:block absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#f4f7fc] dark:bg-[#070b14] border border-blue-200 dark:border-blue-900" />
            <div className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#f4f7fc] dark:bg-[#070b14] border border-blue-200 dark:border-blue-900" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/25">
                  <QrCode className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-blue-700 dark:text-blue-400">
                      {activeGatePass.id}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300">
                      APPROVED BY WARDEN
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                    {activeGatePass.reason} ({activeGatePass.destination})
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Valid window: <strong className="text-slate-700 dark:text-slate-200">Today 04:30 PM until Sunday, 08:00 PM</strong> • Verified with Parent SMS
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-center">
                <button
                  onClick={() => setShowQrModal(true)}
                  className="btn btn-primary btn-sm rounded-xl shadow-md shadow-blue-600/20"
                >
                  <QrCode className="w-4 h-4" />
                  Show QR at Gate 1
                </button>
                <button
                  onClick={() => navigate('/student/gate-pass')}
                  className="btn btn-secondary btn-sm rounded-xl"
                >
                  History
                </button>
              </div>
            </div>
          </div>

          {/* Pending Coursework & Deadlines */}
          <div className="paper-plate p-5 sm:p-6">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Active Coursework Submissions
                </h3>
              </div>
              <button
                onClick={() => navigate('/student/assignments')}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                All Assignments ({assignments.length}) <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {assignments.slice(0, 3).map((asn) => (
                <div key={asn.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                      {asn.title}
                    </h5>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Course: <strong className="text-blue-600 dark:text-blue-400">{asn.course}</strong> • Due: {asn.dueDate}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 self-start sm:self-center">
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200">
                      Pending
                    </span>
                    <button
                      onClick={() => navigate('/student/assignments')}
                      className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-blue-50 dark:bg-slate-800 hover:text-blue-600 transition-colors"
                    >
                      Submit File
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (4 spans): Attendance Health, Food Menu, Next Bus, AI Prompts */}
        <div className="lg:col-span-4 space-y-6">

          {/* 1. Humanized Attendance Health Card with 'Can I Bunk?' Simulator */}
          <div className="paper-plate p-5 sm:p-6 border-amber-200 dark:border-amber-900/60 bg-gradient-to-br from-white/95 to-amber-50/40 dark:from-slate-900 dark:to-amber-950/20">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-xl bg-amber-500 text-white shadow-xs">
                  <Calculator className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                  Attendance Health Check
                </h4>
              </div>
              <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300">
                BELOW 75% TARGET
              </span>
            </div>

            {/* Attendance Meter */}
            <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-amber-100 dark:border-slate-700/60 shadow-xs mb-3">
              <div className="flex items-baseline justify-between mb-2">
                <div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">Current Standing</span>
                  <p className="text-3xl font-black text-amber-600 dark:text-amber-400">
                    {bunkSimulated ? `${simulatedPercentage}%` : `${currentPercentage}%`}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">Classes Attended</span>
                  <p className="text-lg font-bold text-slate-800 dark:text-slate-200">
                    {bunkSimulated ? `${simulatedAttended} / ${simulatedConducted}` : `${currentAttended} / ${currentConducted}`}
                  </p>
                </div>
              </div>

              {/* Visual Progress Bar */}
              <div className="w-full bg-slate-100 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden mb-1">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    bunkSimulated ? 'bg-rose-500' : 'bg-amber-500'
                  }`}
                  style={{ width: `${bunkSimulated ? simulatedPercentage : currentPercentage}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>0%</span>
                <span className="font-bold text-blue-600">75% Clearance Bar</span>
                <span>100%</span>
              </div>
            </div>

            {/* Human Advice & Bunk Simulator Toggle */}
            <div className="space-y-3 text-xs">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Attend the next <strong className="text-blue-700 dark:text-blue-400 font-extrabold underline">{bunkSimulated ? simulatedConsecutiveNeeded : consecutiveNeeded} classes consecutively</strong> to clear eligibility for Mid-Terms without penalty.
              </p>

              {/* Bunk Simulator Toggle */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-slate-800 dark:text-slate-200 text-xs">
                    "Can I skip tomorrow's class?"
                  </span>
                  <button
                    onClick={() => setBunkSimulated(prev => !prev)}
                    className={`px-2.5 py-1 text-[11px] rounded-lg font-bold transition-all ${
                      bunkSimulated
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600'
                    }`}
                  >
                    {bunkSimulated ? 'Bunk Simulated ⚠️' : 'Test Skipping'}
                  </button>
                </div>

                {bunkSimulated ? (
                  <p className="text-[11px] text-rose-700 dark:text-rose-400 leading-snug">
                    🚨 <strong>Warning:</strong> Skipping tomorrow drops you to <strong>{simulatedPercentage}%</strong>. You'll need <strong>{simulatedConsecutiveNeeded} consecutive classes</strong>!
                  </p>
                ) : (
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Tap to see the mathematical impact on your final exam admit card.
                  </p>
                )}
              </div>

              <button
                onClick={() => navigate('/student/attendance')}
                className="w-full btn btn-primary btn-sm rounded-xl flex items-center justify-center gap-1.5 shadow-sm"
              >
                Detailed Subject Breakdown
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 2. Today's Mess Menu Card (Students LOVE This) */}
          <div className="paper-plate p-5 sm:p-6">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <UtensilsCrossed className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Today's Mess Menu (Wednesday)
                </h4>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200">
                Special Day
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  🍛 Lunch (12:30 PM - 02:30 PM)
                </span>
                <p className="text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Paneer Butter Masala, Jeera Rice, Tadka Yellow Dal, Green Salad, Gulab Jamun
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  🍲 Dinner (07:30 PM - 09:30 PM)
                </span>
                <p className="text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Butter Tawa Roti, Chicken Curry (Non-Veg) / Shahi Paneer (Veg), Steamed Rice, Kheer
                </p>
              </div>

              <button
                onClick={() => navigate('/student/hostel')}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline pt-1 block"
              >
                View Weekly Meal Schedule →
              </button>
            </div>
          </div>

          {/* 3. Campus Bus Live Tracker Card */}
          <div className="paper-plate p-5 sm:p-6 bg-gradient-to-br from-white to-sky-50/50 dark:from-slate-900 dark:to-sky-950/20">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Bus className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Next Campus Shuttle
                </h4>
              </div>
              <span className="text-[10px] font-bold text-sky-700 bg-sky-100 dark:bg-sky-950 dark:text-sky-300 px-2.5 py-0.5 rounded-full">
                18 Seats Open
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-baseline justify-between">
                <div>
                  <p className="text-xl font-black text-slate-900 dark:text-white">{nextBus.departureTime}</p>
                  <p className="text-slate-500 text-[11px]">{nextBus.id} • Main Gate Bay 2</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Destination</span>
                  <p className="font-bold text-slate-800 dark:text-slate-200">{nextBus.destination || 'City Center'}</p>
                </div>
              </div>

              <button
                onClick={() => setReservedBus(prev => !prev)}
                className={`w-full mt-2 py-2 px-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                  reservedBus
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-sky-600 hover:bg-sky-500 text-white shadow-sm'
                }`}
              >
                {reservedBus ? (
                  <>
                    <Check className="w-4 h-4" />
                    Seat Reserved for 5:00 PM!
                  </>
                ) : (
                  <>
                    <Bus className="w-4 h-4" />
                    Reserve Seat on 5:00 PM Bus
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 4. AI Instant Prompt Launcher */}
          <div className="paper-plate p-5 sm:p-6 bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white shadow-lg shadow-blue-950/20">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-300" />
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-200">
                  AI Study Buddy
                </span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-400 text-cyan-950">
                GPT-4o Campus
              </span>
            </div>

            <h4 className="text-sm font-bold text-white mb-1">
              Have questions on today's classes?
            </h4>
            <p className="text-xs text-blue-200 mb-3.5 leading-relaxed">
              Curated for Semester 5 B.Tech CSE modules:
            </p>

            <div className="space-y-1.5 mb-3">
              {quickAiPrompts.slice(0, 3).map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => navigate('/student/ai-study')}
                  className="w-full text-left p-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-blue-100 hover:text-white transition-all flex items-center justify-between group"
                >
                  <span className="truncate pr-2">"{prompt}"</span>
                  <ArrowRight className="w-3 h-3 text-cyan-300 opacity-60 group-hover:opacity-100 shrink-0" />
                </button>
              ))}
            </div>

            <button
              onClick={() => navigate('/student/ai-study')}
              className="w-full py-2 px-3 rounded-xl bg-white text-blue-900 hover:bg-blue-50 text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-98"
            >
              Open AI Study Hub
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            </button>
          </div>

        </div>
      </div>

      {/* Gate Pass QR Modal */}
      <Modal
        isOpen={showQrModal}
        onClose={() => setShowQrModal(false)}
        title="Gate Security Outpass Verification"
        size="md"
      >
        <div className="space-y-4">
          <QRCodeCard
            title={`Pass ID: ${activeGatePass.id}`}
            subtitle="Present this QR at Gate 1 Turnstile / Security Booth"
            data={`CAMPUSOS-OUTPASS:${activeGatePass.id}:STUDENT:${user?.studentId || 'BPUT2026001'}:VALID:2026-10-04`}
            size={180}
            showDownload={true}
          />

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Student Name:</span>
              <span className="font-bold text-slate-900 dark:text-white">{user?.name || 'Sai'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Roll Number:</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">{user?.studentId || 'BPUT2026001'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Reason / Destination:</span>
              <span className="font-bold text-slate-900 dark:text-white">{activeGatePass.reason} ({activeGatePass.destination})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Warden Clearance:</span>
              <span className="font-bold text-emerald-600 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Approved by Col. Rajesh Sharma
              </span>
            </div>
          </div>

          <button
            onClick={() => setShowQrModal(false)}
            className="w-full btn btn-primary btn-md rounded-xl"
          >
            Done
          </button>
        </div>
      </Modal>
    </motion.div>
  );
};

export default StudentDashboard;
