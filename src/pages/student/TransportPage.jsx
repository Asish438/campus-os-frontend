import React from 'react';
import { useCampus } from '../../context/CampusContext';
import { useAuth } from '../../context/AuthContext';
import StatusBadge from '../../components/common/StatusBadge';
import {
  Bus,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  AlertCircle,
  Phone,
  ArrowRight
} from 'lucide-react';

export const TransportPage = () => {
  const { user } = useAuth();
  const { buses, toggleBusConfirmation } = useCampus();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Campus Shuttle & Transport Fleet
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Real-Time Bus Seat Reservation & Automated Departure Broadcasts
          </p>
        </div>
      </div>

      {/* Main Bus Cards */}
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

      {/* Route Stops Overview */}
      <div className="campus-card">
        <div className="campus-card-header">
          <h3 className="campus-card-title">Campus Shuttle Stoppages & Timings</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <h5 className="font-bold text-slate-900 dark:text-white mb-1">BUS-03 (Bhubaneswar Route)</h5>
            <p className="text-slate-500 dark:text-slate-400">Gate 1 → Infocity Square → Patia → Jaydev Vihar → Master Canteen</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <h5 className="font-bold text-slate-900 dark:text-white mb-1">BUS-01 (Cuttack Route)</h5>
            <p className="text-slate-500 dark:text-slate-400">Gate 1 → Trisulia Bridge → Madhupatna → Badambadi Bus Stand</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <h5 className="font-bold text-slate-900 dark:text-white mb-1">BUS-05 (AIIMS Route)</h5>
            <p className="text-slate-500 dark:text-slate-400">Gate 1 → Baramunda Bus Terminal → Khandagiri → AIIMS Nagar</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportPage;
