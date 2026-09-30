import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  GraduationCap,
  Sparkles,
  ShieldCheck,
  CalendarCheck2,
  Building2,
  Bus,
  CreditCard,
  QrCode,
  Users,
  Send,
  Sliders,
  ArrowRight,
  CheckCircle2,
  School,
  ChevronRight,
  TrendingUp,
  Cpu,
  Layers,
  Lock,
  UserPlus,
  Play,
  Zap,
  Clock,
  MapPin,
  Bot,
  UtensilsCrossed,
  Check,
  MessageSquare,
  Award
} from 'lucide-react';

export const LandingPage = () => {
  const navigate = useNavigate();
  const { switchRole } = useAuth();
  const [activePreviewTab, setActivePreviewTab] = useState('student');

  const handleExploreDemo = (role = 'STUDENT') => {
    switchRole(role);
    if (role === 'STUDENT') navigate('/student/dashboard');
    else if (role === 'FACULTY') navigate('/faculty/dashboard');
    else if (role === 'WARDEN') navigate('/warden/dashboard');
    else if (role === 'SECURITY') navigate('/security/dashboard');
    else if (role === 'ADMIN') navigate('/admin/dashboard');
    else if (role === 'TRANSPORT') navigate('/transport/dashboard');
    else if (role === 'ACCOUNTS') navigate('/accounts/dashboard');
  };

  const previewTabs = [
    { id: 'student', label: 'Student Cockpit', icon: GraduationCap },
    { id: 'attendance', label: 'Attendance Simulator', icon: CalendarCheck2 },
    { id: 'aistudy', label: 'AI Study Assistant', icon: Sparkles },
    { id: 'gatepass', label: 'Digital Gate Pass QR', icon: QrCode },
    { id: 'hostel', label: 'Hostel & Mess Life', icon: Building2 },
    { id: 'transport', label: 'Campus Shuttle', icon: Bus }
  ];

  const features = [
    {
      icon: CalendarCheck2,
      title: 'Predictive Attendance Engine',
      description: 'Humanized shortfall calculator that answers "Can I miss tomorrow\'s class?" with zero guesswork and official 75% BPUT compliance.',
      tag: 'Academic Health'
    },
    {
      icon: Sparkles,
      title: 'AI Study Buddy & Notes',
      description: 'Tuned directly to university syllabi. Generates instant exam notes, viva flashcards, and concept explanations in plain English.',
      tag: 'GPT-4o RAG'
    },
    {
      icon: QrCode,
      title: 'Cryptographic Digital Gate Pass',
      description: 'Paperless outing requests verified by hostel wardens and parent SMS, verified at security turnstiles in under 3 seconds.',
      tag: 'Zero Queues'
    },
    {
      icon: Building2,
      title: 'Hostel & Mess Connected Ops',
      description: 'View daily breakfast, lunch, and dinner menus in real-time, plus 1-tap AI triage for room plumbing and electrical maintenance.',
      tag: 'Residence Life'
    },
    {
      icon: CreditCard,
      title: 'Instant Fee Clearance',
      description: 'Granular breakdown of tuition, mess, and exam dues with instant downloadable official university receipts.',
      tag: 'Bursar Ledger'
    },
    {
      icon: Bus,
      title: 'Campus Transit Fleet',
      description: 'Live shuttle schedules, seat capacity monitoring, and automated departure alerts straight to your phone.',
      tag: 'Live Shuttle'
    }
  ];

  return (
    <div className="min-h-screen bg-[#f4f7fc] dark:bg-[#070b14] text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-600 selection:text-white relative overflow-hidden">
      
      {/* Background Soft Aura Orbs */}
      <div className="fixed top-0 left-1/3 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/20 via-indigo-300/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-10 right-10 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-400/15 to-blue-500/15 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* 1. Frosted Paperplate Glass Top Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/75 dark:bg-slate-900/80 border-b border-white/80 dark:border-slate-800/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
              <School className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  CAMPUS <span className="text-blue-600 dark:text-blue-400">OS</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900 font-bold uppercase tracking-wider">
                  v3.0 Live
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Campus Life, Debugged.</p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <a href="#preview" className="hover:text-blue-600 transition-colors">Live Preview</a>
            <a href="#features" className="hover:text-blue-600 transition-colors">Modules</a>
            <a href="#stats" className="hover:text-blue-600 transition-colors">Campus Stats</a>
            <a href="#voices" className="hover:text-blue-600 transition-colors">Student Voices</a>
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2.5">
            <Link
              to="/login?tab=admin"
              className="hidden sm:inline-flex text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-blue-600 px-3 py-2 rounded-xl transition-colors"
            >
              Admin & Staff
            </Link>

            <Link
              to="/register-student"
              className="glass-pill text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50/80 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-900"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New Student</span> Sign Up
            </Link>

            <Link
              to="/login?tab=student"
              className="btn btn-primary btn-sm rounded-xl shadow-md shadow-blue-500/25 px-4"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Student Login</span>
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Soft floating pill tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-white/90 dark:border-slate-800 shadow-sm text-xs font-bold text-blue-700 dark:text-blue-300 mb-6 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-spin" style={{ animationDuration: '4s' }} />
          <span>The Modern University Operating System • 14,800+ Campus Scholars</span>
          <ChevronRight className="w-3.5 h-3.5 opacity-60" />
        </div>

        {/* Luminous, Humanized Hero Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white max-w-5xl mx-auto leading-tight sm:leading-none">
          Campus Life,{' '}
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
            Debugged.
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
          One fluid paperplate glass dashboard connecting students, faculty, hostel wardens, and campus transit. Predict attendance, clear digital gate passes, generate AI exam notes, and never miss the 5:00 PM bus.
        </p>

        {/* Hero Call to Action Buttons */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
          <button
            onClick={() => handleExploreDemo('STUDENT')}
            className="btn btn-primary py-3.5 px-7 rounded-2xl text-sm font-bold shadow-xl shadow-blue-600/30 flex items-center gap-2 hover:-translate-y-0.5 transition-all"
          >
            <GraduationCap className="w-5 h-5" />
            <span>Launch Student Cockpit (Demo)</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>

          <Link
            to="/register-student"
            className="glass-pill py-3 px-6 rounded-2xl text-sm font-bold shadow-sm"
          >
            <UserPlus className="w-4 h-4 text-emerald-600" />
            <span>Register as a New Student</span>
          </Link>

          <button
            onClick={() => handleExploreDemo('ADMIN')}
            className="glass-pill py-3 px-6 rounded-2xl text-sm font-semibold"
          >
            <Sliders className="w-4 h-4 text-indigo-600" />
            <span>Administrator View</span>
          </button>
        </div>

        {/* Quick Instant Role Selector Chips */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-slate-400 font-medium mr-1">⚡ Jump to perspective:</span>
          {[
            { role: 'STUDENT', label: 'Student' },
            { role: 'FACULTY', label: 'Faculty' },
            { role: 'WARDEN', label: 'Warden' },
            { role: 'SECURITY', label: 'Security' },
            { role: 'ACCOUNTS', label: 'Accounts' },
            { role: 'TRANSPORT', label: 'Transport' },
            { role: 'ADMIN', label: 'Admin' }
          ].map((r) => (
            <button
              key={r.role}
              onClick={() => handleExploreDemo(r.role)}
              className="px-3 py-1 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 hover:border-blue-500 hover:text-blue-600 text-slate-700 dark:text-slate-300 font-semibold shadow-2xs transition-all"
            >
              {r.label}
            </button>
          ))}
        </div>
      </section>

      {/* 3. Interactive Paperplate Glass Dashboard Live Showcase */}
      <section id="preview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="paper-plate p-4 sm:p-7 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl">
          
          {/* Showcase Tabs */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
            {previewTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activePreviewTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActivePreviewTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                      : 'bg-white/60 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Interactive Preview Deck Content */}
          <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-gradient-to-br from-white/95 to-slate-50/80 dark:from-slate-950 dark:to-slate-900 p-6 sm:p-8 shadow-inner">
            
            {/* TAB: Student Cockpit */}
            {activePreviewTab === 'student' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-3.5">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
                      alt="Sai"
                      className="w-12 h-12 rounded-2xl object-cover ring-2 ring-blue-500/30 shadow-sm"
                    />
                    <div>
                      <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                        Sai Krishna Mohanty • B.Tech CSE (Sem 5)
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Roll: BPUT2026001 • Hostel: Block B-402 • CGPA: 8.84
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="glass-pill text-[11px] font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-950 border-emerald-300">
                      ✓ End-Sem Clearance: Active
                    </span>
                    <button
                      onClick={() => handleExploreDemo('STUDENT')}
                      className="btn btn-primary btn-sm rounded-xl"
                    >
                      Open Full Cockpit →
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60">
                    <div className="flex items-center justify-between font-bold text-amber-800 dark:text-amber-300 mb-1">
                      <span>Attendance Standing</span>
                      <span>68% (Below 75%)</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">
                      You need <strong>8 consecutive lectures</strong> to sit for mid-terms. Tap calculator to simulate bunks.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60">
                    <div className="flex items-center justify-between font-bold text-blue-800 dark:text-blue-300 mb-1">
                      <span>Next Lecture (09:00 AM)</span>
                      <span>LH-201</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">
                      Computer Networks with Dr. Aris Thorne. Sliding Window Protocols.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60">
                    <div className="flex items-center justify-between font-bold text-emerald-800 dark:text-emerald-300 mb-1">
                      <span>Today's Lunch Menu</span>
                      <span>Mess 2</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">
                      Paneer Butter Masala, Jeera Rice, Tadka Dal, Gulab Jamun.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: Attendance Simulator */}
            {activePreviewTab === 'attendance' && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      Live Bunk & Attendance Clearance Simulator
                    </h4>
                    <p className="text-xs text-slate-500">Calculates immediate exam eligibility risk</p>
                  </div>
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-xl bg-amber-100 text-amber-900">
                    Current: 34 / 50 (68%)
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      "What happens if I miss tomorrow's 9:00 AM class?"
                    </span>
                    <span className="font-bold text-rose-600 bg-rose-50 dark:bg-rose-950/60 px-2.5 py-0.5 rounded-lg border border-rose-200">
                      Attendance drops to 66.7%
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    By missing 1 class, your shortfall penalty jumps from <strong>8 classes to 11 consecutive classes</strong> required to reach the mandatory 75% end-sem threshold.
                  </p>
                  <button
                    onClick={() => handleExploreDemo('STUDENT')}
                    className="btn btn-primary btn-sm rounded-xl"
                  >
                    Open Live Simulator in Dashboard →
                  </button>
                </div>
              </div>
            )}

            {/* TAB: AI Study Assistant */}
            {activePreviewTab === 'aistudy' && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      Syllabus-Tuned AI Study Engine
                    </h4>
                    <p className="text-xs text-slate-500">Grounded in BPUT 5th Sem CSE Syllabus & Past 5-Year Papers</p>
                  </div>
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-xl bg-blue-100 text-blue-900">
                    GPT-4o Campus RAG
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 border border-blue-200 dark:border-blue-900">
                    <strong>Student Query:</strong> "Explain ARP in simple language with an analogy."
                  </div>
                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 leading-relaxed">
                    <strong>AI Study Buddy:</strong> "Think of IP address as a student's roll number, and MAC address as their actual physical face. When your laptop knows the roll number (IP) but doesn't know who to hand the notes to, it shouts across the room: <em>'Who has roll 42?'</em> That broadcast shout is an ARP Request! The target replies with their MAC address."
                  </div>
                </div>
              </div>
            )}

            {/* TAB: Digital Gate Pass */}
            {activePreviewTab === 'gatepass' && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      Cryptographic Outing QR Pass
                    </h4>
                    <p className="text-xs text-slate-500">Warden approved with instant Parent SMS dispatch</p>
                  </div>
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-xl bg-emerald-100 text-emerald-900">
                    Pass ID: GP-2026-8842
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <div className="w-32 h-32 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center p-2 border border-slate-200">
                    <QrCode className="w-24 h-24 text-slate-800 dark:text-white" />
                  </div>
                  <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    <p><strong>Student:</strong> Sai Krishna Mohanty (Block B, Room 402)</p>
                    <p><strong>Destination:</strong> Weekend Home Visit (Cuttack)</p>
                    <p><strong>Validity:</strong> Friday 04:30 PM - Sunday 08:00 PM</p>
                    <p className="text-emerald-600 font-bold flex items-center gap-1">
                      <Check className="w-4 h-4" /> Approved by Chief Warden Col. Rajesh Sharma
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: Hostel & Mess */}
            {activePreviewTab === 'hostel' && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      Hostel Life & Automated Maintenance Triage
                    </h4>
                    <p className="text-xs text-slate-500">Room 304 • Aryabhatta Hall of Residence</p>
                  </div>
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-xl bg-purple-100 text-purple-900">
                    Mess & Grievance Sync
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="font-bold text-slate-800 dark:text-slate-200">AI Ticket Triage:</span>
                    <p className="mt-1 text-slate-500">"The tap in bathroom is leaking for 4 days."</p>
                    <div className="mt-2 flex gap-2 font-mono text-[10px]">
                      <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800">Plumbing</span>
                      <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800">Priority: High</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="font-bold text-slate-800 dark:text-slate-200">Curfew Roll Call:</span>
                    <p className="mt-1 text-slate-500">Night Curfew: 09:30 PM</p>
                    <p className="mt-1 text-emerald-600 font-bold">Biometric Attendance: Marked (09:12 PM)</p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: Transport */}
            {activePreviewTab === 'transport' && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      Campus Transit & City Express Fleet
                    </h4>
                    <p className="text-xs text-slate-500">Next shuttle departure in 35 minutes</p>
                  </div>
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-xl bg-sky-100 text-sky-900">
                    Bus 03 • 18 Seats Open
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                      Route 3: Campus Main Gate → Master Canteen
                    </h5>
                    <p className="text-slate-500 mt-0.5">Departs 5:00 PM • Driver: Ramesh Mohapatra (+91 98610 22334)</p>
                  </div>
                  <button
                    onClick={() => handleExploreDemo('STUDENT')}
                    className="btn btn-primary btn-sm rounded-xl shrink-0"
                  >
                    Reserve Seat on Bus 03 →
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* 4. University Core Metrics Banner */}
      <section id="stats" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="paper-plate p-5 text-center">
            <h3 className="text-3xl sm:text-4xl font-black text-blue-600 dark:text-blue-400">14,800+</h3>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1">Active Scholars</p>
          </div>
          <div className="paper-plate p-5 text-center">
            <h3 className="text-3xl sm:text-4xl font-black text-indigo-600 dark:text-indigo-400">99.98%</h3>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1">System Uptime</p>
          </div>
          <div className="paper-plate p-5 text-center">
            <h3 className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400">3 Seconds</h3>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1">Gate Pass Scan</p>
          </div>
          <div className="paper-plate p-5 text-center">
            <h3 className="text-3xl sm:text-4xl font-black text-purple-600 dark:text-purple-400">100%</h3>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1">Paperless Operations</p>
          </div>
        </div>
      </section>

      {/* 5. Modern Tactile Feature Grid */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
            Built for Modern Universities.
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
            Every module works together seamlessly in real-time. No silos, no paper files, no lost grievances.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="paper-plate p-6 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {feat.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-blue-600 dark:text-blue-400 font-bold">
                  <span>Explore Module</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. Humanized Campus Testimonials */}
      <section id="voices" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Loved by Students & Faculty Alike.
          </h2>
          <p className="text-xs text-slate-500 mt-1">Real feedback from campus trial cohorts</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="paper-plate p-5 space-y-3">
            <p className="text-xs text-slate-600 dark:text-slate-300 italic leading-relaxed">
              "The attendance bunk calculator saved my exam admit card twice. You know exactly how many classes you must attend without doing pen-and-paper math."
            </p>
            <div className="flex items-center gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                SK
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Sai Krishna Mohanty</p>
                <p className="text-[10px] text-slate-400">3rd Year B.Tech CSE</p>
              </div>
            </div>
          </div>

          <div className="paper-plate p-5 space-y-3">
            <p className="text-xs text-slate-600 dark:text-slate-300 italic leading-relaxed">
              "Taking class attendance takes 20 seconds now. When students ask for extra question sets, the AI syllabus generator creates exam mock papers instantly."
            </p>
            <div className="flex items-center gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">
                AT
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Dr. Aris Thorne</p>
                <p className="text-[10px] text-slate-400">Associate Professor & HOD</p>
              </div>
            </div>
          </div>

          <div className="paper-plate p-5 space-y-3">
            <p className="text-xs text-slate-600 dark:text-slate-300 italic leading-relaxed">
              "Paper outpass slips are completely gone. We approve weekend passes digitally with 1 tap, parents get automated SMS confirmations, and security scans the QR."
            </p>
            <div className="flex items-center gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="w-8 h-8 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center text-xs">
                RS
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Col. Rajesh Sharma</p>
                <p className="text-[10px] text-slate-400">Chief Hostel Warden</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="border-t border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
              <School className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white">CAMPUS OS</p>
              <p className="text-[10px]">Campus Life, Debugged.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-5 font-semibold">
            <Link to="/login?tab=student" className="hover:text-blue-600">Student Portal</Link>
            <Link to="/register-student" className="hover:text-blue-600">New Registration</Link>
            <Link to="/login?tab=admin" className="hover:text-blue-600">Admin & Staff</Link>
            <Link to="/otp-verification" className="hover:text-blue-600">OTP Demo</Link>
          </div>

          <p className="text-[11px] text-slate-400">
            © 2026 Campus OS. Next-Generation University Operating System.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
