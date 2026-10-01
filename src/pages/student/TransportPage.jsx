import React, { useState, useEffect } from 'react';
import { useCampus } from '../../context/CampusContext';
import { useAuth } from '../../context/AuthContext';
import StatusBadge from '../../components/common/StatusBadge';
import QRCodeCard from '../../components/qr/QRCodeCard';
import {
  Bus,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  AlertCircle,
  Phone,
  ArrowRight,
  BellRing,
  Volume2,
  Sparkles,
  Radio,
  Navigation,
  Compass,
  ShieldCheck,
  QrCode,
  X,
  Activity,
  Gauge,
  Zap,
  Layers,
  Check
} from 'lucide-react';

export const TransportPage = () => {
  const { user } = useAuth();
  const { buses, toggleBusConfirmation, playDepartureChime, addToast, gatePasses, startTrip } = useCampus();
  const [testRinging, setTestRinging] = useState(false);
  const [viewModel, setViewModel] = useState('radar'); // 'grid' | 'radar'
  const [selectedBusId, setSelectedBusId] = useState('BUS-03');
  const [showExitGatePassModal, setShowExitGatePassModal] = useState(false);
  const [departureAlertDismissed, setDepartureAlertDismissed] = useState(false);

  // Active in transit bus
  const inTransitBus = buses.find(b => b.status === 'In Transit');
  const activeBus = buses.find(b => b.id === selectedBusId) || buses[0];

  // Approved gate pass for quick exit turnstile access
  const approvedGatePass = gatePasses.find(p => p.status === 'Approved' || p.status === 'APPROVED') || gatePasses[0];

  const handleTestSound = () => {
    setTestRinging(true);
    playDepartureChime();
    addToast({
      title: '🔔 Departure Chime Triggered',
      message: 'This harmonic melodic chime rings automatically on student portals whenever a campus shuttle departs.',
      type: 'info'
    });
    setTimeout(() => setTestRinging(false), 1200);
  };

  const handleSimulateDeparture = (busId) => {
    startTrip(busId);
    setDepartureAlertDismissed(false);
    setSelectedBusId(busId);
    setViewModel('radar');
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
            Campus Shuttle & Transport Radar
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-mono font-bold border border-indigo-200 dark:border-indigo-800">
              Live Fleet Dispatch
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Real-time terminal bay departure tracking, student exit turnstile advisory, and departure chime alerts
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* View Model Toggle */}
          <div className="p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center text-xs font-semibold">
            <button
              onClick={() => setViewModel('radar')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                viewModel === 'radar'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span>Live Departure Radar</span>
            </button>
            <button
              onClick={() => setViewModel('grid')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                viewModel === 'grid'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Fleet Cards</span>
            </button>
          </div>

          {/* Sound test button */}
          <button
            type="button"
            onClick={handleTestSound}
            className={`btn btn-secondary btn-sm flex items-center gap-2 transition-all ${
              testRinging ? 'ring-2 ring-indigo-500 bg-indigo-50 text-indigo-700' : ''
            }`}
          >
            <Volume2 className={`w-4 h-4 text-indigo-600 ${testRinging ? 'animate-bounce' : ''}`} />
            <span>{testRinging ? 'Ringing Chime...' : 'Test Departure Ring'}</span>
          </button>
        </div>
      </div>

      {/* STUDENT CAMPUS EXIT & DEPARTURE ALERT BANNER */}
      {inTransitBus && !departureAlertDismissed && (
        <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-amber-500/15 via-indigo-500/10 to-transparent border-2 border-amber-400/50 text-slate-800 dark:text-slate-100 shadow-lg shadow-amber-500/5 animate-fade-in relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/30 shrink-0 animate-pulse">
                <BellRing className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500 text-white shadow-sm">
                    CAMPUS DEPARTURE BROADCAST
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 font-bold border border-amber-300">
                    Departing Gate 1
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  <strong>{inTransitBus.id}</strong> ({inTransitBus.route}) has departed campus Gate 1 {inTransitBus.departedAt ? `at ${inTransitBus.departedAt}` : 'now'}.
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Students departing campus: Please present your approved Gate Pass QR code at the Main Gate 1 turnstile.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
              <button
                onClick={() => setShowExitGatePassModal(true)}
                className="btn btn-primary btn-sm flex items-center gap-2 shadow-md shadow-indigo-600/30"
              >
                <QrCode className="w-4 h-4" />
                <span>Show My Gate Pass QR</span>
              </button>
              <button
                onClick={playDepartureChime}
                className="btn btn-secondary btn-sm flex items-center gap-1.5"
                title="Re-play audio chime"
              >
                <Volume2 className="w-3.5 h-3.5 text-amber-600" />
                <span className="hidden sm:inline">Chime</span>
              </button>
              <button
                onClick={() => setDepartureAlertDismissed(true)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                title="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODEL 1: LIVE DEPARTURE RADAR & INTERACTIVE BAY MODEL */}
      {viewModel === 'radar' && (
        <div className="space-y-6">
          {/* Fleet Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {buses.map((bus) => {
              const isSelected = bus.id === activeBus.id;
              const isInTransit = bus.status === 'In Transit';
              return (
                <button
                  key={bus.id}
                  onClick={() => setSelectedBusId(bus.id)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2.5 shrink-0 border ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20 ring-2 ring-indigo-500/20'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  <Bus className="w-4 h-4" />
                  <span>{bus.id}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : isInTransit
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                    }`}
                  >
                    {bus.status}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Interactive Radar & Waypoint Model */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Visual Bay Model & Route Milestones (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              <div className="campus-card relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white border-slate-800 shadow-2xl p-6 sm:p-7">
                {/* Radar Grid Texture Overlay */}
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px]" />

                {/* Top Telemetry Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 text-indigo-400 flex items-center justify-center font-black">
                      <Bus className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg font-black tracking-tight text-white">{activeBus.id}</h2>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                          {activeBus.busNumber}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                        {activeBus.route}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Scheduled Departure</p>
                      <p className="text-base font-mono font-black text-amber-400">{activeBus.departureTime}</p>
                    </div>
                    <StatusBadge status={activeBus.status} />
                  </div>
                </div>

                {/* Visual Campus Departure Model Layout */}
                <div className="my-6 p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-md relative z-10 space-y-6">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-indigo-400">
                      <Compass className="w-4 h-4 animate-spin text-indigo-400" />
                      Live Transit Corridor & Bay Waypoints
                    </span>
                    <span className="font-mono text-emerald-400 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                      {activeBus.status === 'In Transit' ? 'GPS Active • 38 km/h' : 'Stationary at Terminal'}
                    </span>
                  </div>

                  {/* Waypoint Line Model */}
                  <div className="relative py-4">
                    {/* Progress Track */}
                    <div className="absolute top-1/2 left-4 right-4 h-1.5 bg-slate-800 -translate-y-1/2 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-1000 ${
                          activeBus.status === 'In Transit'
                            ? 'w-3/5 bg-gradient-to-r from-emerald-500 via-indigo-500 to-amber-400'
                            : 'w-1/6 bg-indigo-600'
                        }`}
                      />
                    </div>

                    {/* Checkpoints */}
                    <div className="relative flex justify-between items-center text-center">
                      {/* Checkpoint 1: Gate 1 Terminal Bay */}
                      <div className="flex flex-col items-center space-y-2">
                        <div
                          className={`w-9 h-9 rounded-2xl flex items-center justify-center font-bold text-xs shadow-lg transition-all ${
                            activeBus.status === 'In Transit'
                              ? 'bg-emerald-500 text-white shadow-emerald-500/30'
                              : 'bg-indigo-600 text-white shadow-indigo-600/30 ring-4 ring-indigo-500/20'
                          }`}
                        >
                          <Check className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-white">Gate 1 Bay</p>
                          <p className="text-[9px] text-slate-400">Campus Origin</p>
                        </div>
                      </div>

                      {/* Checkpoint 2: Security Boom Barrier Turnstiles */}
                      <div className="flex flex-col items-center space-y-2">
                        <div
                          className={`w-9 h-9 rounded-2xl flex items-center justify-center font-bold text-xs shadow-lg transition-all ${
                            activeBus.status === 'In Transit'
                              ? 'bg-emerald-500 text-white shadow-emerald-500/30'
                              : 'bg-slate-800 text-slate-400 border border-slate-700'
                          }`}
                        >
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-slate-200">Security Gate</p>
                          <p className="text-[9px] text-slate-400">Gate Pass Scan</p>
                        </div>
                      </div>

                      {/* Checkpoint 3: Highway Junction / Infocity */}
                      <div className="flex flex-col items-center space-y-2">
                        <div
                          className={`w-9 h-9 rounded-2xl flex items-center justify-center font-bold text-xs shadow-lg transition-all ${
                            activeBus.status === 'In Transit'
                              ? 'bg-amber-500 text-slate-950 font-black shadow-amber-500/30 ring-4 ring-amber-400/20 animate-pulse'
                              : 'bg-slate-800 text-slate-400 border border-slate-700'
                          }`}
                        >
                          <Navigation className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-slate-200">Transit Corridor</p>
                          <p className="text-[9px] text-slate-400">
                            {activeBus.status === 'In Transit' ? 'Current Pos' : 'En Route'}
                          </p>
                        </div>
                      </div>

                      {/* Checkpoint 4: Destination Terminal */}
                      <div className="flex flex-col items-center space-y-2">
                        <div className="w-9 h-9 rounded-2xl bg-slate-800 text-slate-400 border border-slate-700 flex items-center justify-center font-bold text-xs">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-slate-200">Final Stoppage</p>
                          <p className="text-[9px] text-slate-400">City Hub</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Telemetry Stats Bar */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-800 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                      <span className="text-[10px] uppercase font-mono text-slate-400">Driver</span>
                      <p className="font-bold text-white mt-0.5">{activeBus.driverName}</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                      <span className="text-[10px] uppercase font-mono text-slate-400">Driver Contact</span>
                      <p className="font-mono text-indigo-400 mt-0.5">{activeBus.driverPhone}</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                      <span className="text-[10px] uppercase font-mono text-slate-400">Boarded / Cap</span>
                      <p className="font-bold text-emerald-400 mt-0.5">
                        {activeBus.boardedPassengers} / {activeBus.capacity}
                      </p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                      <span className="text-[10px] uppercase font-mono text-slate-400">Exit Turnstile</span>
                      <p className="font-bold text-amber-400 mt-0.5">Gate 1 Boom Barrier</p>
                    </div>
                  </div>
                </div>

                {/* Quick Simulation & Interaction Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-3 relative z-10">
                  <button
                    onClick={() => toggleBusConfirmation(activeBus.id)}
                    className={`w-full sm:w-auto flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md ${
                      activeBus.isCurrentUserConfirmed
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/30'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
                    }`}
                  >
                    {activeBus.isCurrentUserConfirmed ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                        Seat Reserved • I'm Leaving on this Shuttle
                      </>
                    ) : (
                      <>
                        <Bus className="w-4 h-4" />
                        Reserve My Seat on {activeBus.id}
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleSimulateDeparture(activeBus.id)}
                    className="w-full sm:w-auto py-3 px-4 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all flex items-center justify-center gap-2 shadow-md shadow-amber-500/20"
                  >
                    <BellRing className="w-4 h-4" />
                    Simulate Gate 1 Departure Ring
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Student Leaving Campus Exit Checklist & Gate Pass Link (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Campus Exit Turnstile Card */}
              <div className="campus-card space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                      Student Campus Exit Pass
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-300">
                    Gate 1 Ready
                  </span>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  When taking campus transport to leave campus, security officers verify your digital Gate Pass QR code at Gate 1 Turnstiles.
                </p>

                {/* Approved Pass Preview */}
                {approvedGatePass ? (
                  <div className="p-3.5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">
                        {approvedGatePass.id}
                      </span>
                      <StatusBadge status={approvedGatePass.status} size="sm" />
                    </div>
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      Destination: {approvedGatePass.destination}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Valid Outpass: {approvedGatePass.outTime} → {approvedGatePass.returnTime}
                    </p>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-xs text-amber-800 dark:text-amber-300">
                    No approved gate pass found for today.
                  </div>
                )}

                <button
                  onClick={() => setShowExitGatePassModal(true)}
                  className="w-full btn btn-primary py-2.5 flex items-center justify-center gap-2 text-xs font-bold shadow-md shadow-indigo-600/20"
                >
                  <QrCode className="w-4 h-4" />
                  Open My Digital QR Pass Badge
                </button>

                {/* 3-Step Student Exit Protocol */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2.5 text-[11px]">
                  <h4 className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">
                    Campus Exit Protocol:
                  </h4>
                  <div className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                    <span className="w-4 h-4 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </span>
                    <span>Confirm seat on scheduled bus before departure wave.</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                    <span className="w-4 h-4 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </span>
                    <span>Listen for Departure Ring chime on student portal.</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                    <span className="w-4 h-4 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      3
                    </span>
                    <span>Scan Digital Gate Pass QR at Gate 1 Turnstile & Board.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODEL 2: STANDARD FLEET GRID */}
      {viewModel === 'grid' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {buses.map((bus) => {
            const isConfirmed = bus.isCurrentUserConfirmed;
            const occupancyPct = Math.round((bus.confirmedPassengers / bus.capacity) * 100);

            return (
              <div
                key={bus.id}
                className={`campus-card relative overflow-hidden transition-all ${
                  isConfirmed ? 'border-indigo-500/80 shadow-md ring-2 ring-indigo-500/10' : ''
                }`}
              >
                {/* Top Banner */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                      <Bus className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                        {bus.id}
                      </h3>
                      <p className="text-[10px] font-mono text-slate-400">
                        Reg: {bus.busNumber}
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={bus.status} />
                </div>

                {/* Route & Times */}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
                    <MapPin className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span>{bus.route}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" /> Departure:
                    </span>
                    <span className="font-bold text-slate-900 dark:text-white text-sm font-mono">
                      {bus.departureTime}
                    </span>
                  </div>
                </div>

                {/* Live Passenger Metrics Grid */}
                <div className="grid grid-cols-3 gap-2 text-center mb-4">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800">
                    <p className="text-[9px] uppercase font-bold text-slate-400">Expected</p>
                    <p className="text-base font-extrabold text-slate-800 dark:text-slate-200 mt-0.5">
                      {bus.expectedPassengers}
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50">
                    <p className="text-[9px] uppercase font-bold text-indigo-600 dark:text-indigo-400">Confirmed</p>
                    <p className="text-base font-extrabold text-indigo-600 dark:text-indigo-400 mt-0.5">
                      {bus.confirmedPassengers}
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50">
                    <p className="text-[9px] uppercase font-bold text-emerald-600 dark:text-emerald-400">Boarded</p>
                    <p className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">
                      {bus.boardedPassengers}
                    </p>
                  </div>
                </div>

                {/* Capacity Progress Bar */}
                <div className="space-y-1 mb-5">
                  <div className="flex justify-between text-[11px] text-slate-400 font-semibold">
                    <span>Occupancy</span>
                    <span>{bus.confirmedPassengers} / {bus.capacity} seats ({occupancyPct}%)</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        occupancyPct > 90 ? 'bg-rose-500' : 'bg-indigo-600'
                      }`}
                      style={{ width: `${Math.min(100, occupancyPct)}%` }}
                    />
                  </div>
                </div>

                {/* Action Button: "I'm Taking This Bus" */}
                <button
                  onClick={() => toggleBusConfirmation(bus.id)}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm ${
                    isConfirmed
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20'
                  }`}
                >
                  {isConfirmed ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                      Confirmed • I'm Taking This Bus
                    </>
                  ) : (
                    <>
                      <Bus className="w-4 h-4" />
                      I'm Taking This Bus
                    </>
                  )}
                </button>

                {/* Driver info */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Driver: <strong className="text-slate-700 dark:text-slate-300">{bus.driverName}</strong></span>
                  <span className="flex items-center gap-1 font-mono text-indigo-600 dark:text-indigo-400">
                    <Phone className="w-3 h-3" /> {bus.driverPhone}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Route Stops Overview */}
      <div className="campus-card">
        <div className="campus-card-header">
          <h3 className="campus-card-title">Campus Shuttle Stoppages & Timings</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <h5 className="font-bold text-slate-900 dark:text-white mb-1">BUS-03 (Bhubaneswar Route)</h5>
            <p className="text-slate-500 dark:text-slate-400">Gate 1 Bay → Infocity Square → Patia → Jaydev Vihar → Master Canteen</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <h5 className="font-bold text-slate-900 dark:text-white mb-1">BUS-01 (Cuttack Route)</h5>
            <p className="text-slate-500 dark:text-slate-400">Gate 1 Bay → Trisulia Bridge → Madhupatna → Badambadi Bus Stand</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <h5 className="font-bold text-slate-900 dark:text-white mb-1">BUS-05 (AIIMS Route)</h5>
            <p className="text-slate-500 dark:text-slate-400">Gate 1 Bay → Baramunda Bus Terminal → Khandagiri → AIIMS Nagar</p>
          </div>
        </div>
      </div>

      {/* EXIT GATE PASS QR MODAL (For students leaving campus on departing bus) */}
      {showExitGatePassModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 relative space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Gate 1 Turnstile Outpass Badge
                </h3>
              </div>
              <button
                onClick={() => setShowExitGatePassModal(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {approvedGatePass ? (
              <div className="py-2">
                <QRCodeCard gatePass={approvedGatePass} />
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400">
                <QrCode className="w-12 h-12 mx-auto mb-2 text-slate-300" />
                <p>No approved Gate Pass on file. Please create or approve one in the Gate Pass module.</p>
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowExitGatePassModal(false)}
                className="btn btn-secondary btn-sm"
              >
                Close Turnstile Pass
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransportPage;
