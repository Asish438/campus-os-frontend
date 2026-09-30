import React from 'react';
import { useCampus } from '../../context/CampusContext';
import KpiCard from '../../components/common/KpiCard';
import StatusBadge from '../../components/common/StatusBadge';
import {
  Bus,
  Clock,
  MapPin,
  Users,
  Play,
  UserCheck,
  CheckCircle2,
  BellRing
} from 'lucide-react';

export const TransportDashboard = () => {
  const { buses, boardPassenger, startTrip } = useCampus();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Campus Fleet Dispatch Terminal 🚌
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Transport Supervisor Desk • Real-time Passenger Manifest & Trip Dispatch
          </p>
        </div>
      </div>

      {/* Transport Fleet KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Active Buses"
          value={`${buses.length} Fleet Units`}
          subtext="Ready at Gate 1 Bay"
          icon={Bus}
          variant="indigo"
        />
        <KpiCard
          title="Total Expected"
          value="105 Commuters"
          subtext="Evening Return Trips"
          icon={Users}
          variant="cyan"
        />
        <KpiCard
          title="Confirmed Seats"
          value="96 Students"
          subtext="Via Student Portal App"
          icon={UserCheck}
          variant="emerald"
        />
        <KpiCard
          title="Departure Schedule"
          value="5:00 PM Wave"
          subtext="Primary Route: Master Canteen"
          icon={Clock}
          variant="amber"
        />
      </div>

      {/* Fleet Command Dispatch Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {buses.map((bus) => {
          const occupancy = Math.round((bus.confirmedPassengers / bus.capacity) * 100);

          return (
            <div
              key={bus.id}
              className="campus-card space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                    <Bus className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                      {bus.id}
                    </h3>
                    <p className="text-[10px] font-mono text-slate-400">
                      {bus.busNumber}
                    </p>
                  </div>
                </div>
                <StatusBadge status={bus.status} />
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1 text-xs">
                <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
                  <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                  <span>{bus.route}</span>
                </div>
                <div className="flex justify-between text-slate-500 pt-1">
                  <span>Scheduled Departure:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">
                    {bus.departureTime}
                  </span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Assigned Driver:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {bus.driverName} ({bus.driverPhone})
                  </span>
                </div>
              </div>

              {/* Passenger Tally Cards */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] uppercase text-slate-400 font-bold">Expected</span>
                  <p className="font-mono font-bold text-base mt-0.5">{bus.expectedPassengers}</p>
                </div>
                <div className="p-2 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900">
                  <span className="text-[10px] uppercase text-indigo-600 dark:text-indigo-400 font-bold">Confirmed</span>
                  <p className="font-mono font-bold text-base text-indigo-600 dark:text-indigo-400 mt-0.5">
                    {bus.confirmedPassengers}
                  </p>
                </div>
                <div className="p-2 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900">
                  <span className="text-[10px] uppercase text-emerald-600 dark:text-emerald-400 font-bold">Boarded</span>
                  <p className="font-mono font-bold text-base text-emerald-600 dark:text-emerald-400 mt-0.5">
                    {bus.boardedPassengers}
                  </p>
                </div>
              </div>

              {/* Dispatch Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => boardPassenger(bus.id)}
                  disabled={bus.status === 'In Transit'}
                  className="w-full btn btn-outline btn-sm flex items-center justify-center gap-2"
                >
                  <UserCheck className="w-4 h-4 text-emerald-600" />
                  Board Passenger ({bus.boardedPassengers} / {bus.capacity})
                </button>

                <button
                  onClick={() => startTrip(bus.id)}
                  disabled={bus.status === 'In Transit'}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm ${
                    bus.status === 'In Transit'
                      ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
                  }`}
                >
                  <Play className="w-4 h-4" />
                  {bus.status === 'In Transit' ? 'Trip in Transit' : 'Start Trip & Broadcast Departure'}
                </button>
              </div>

              {bus.status === 'In Transit' && bus.departedAt && (
                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-[11px] text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                  <BellRing className="w-4 h-4 text-emerald-600" />
                  <span>Departed campus at {bus.departedAt}. Notification broadcast sent.</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TransportDashboard;
