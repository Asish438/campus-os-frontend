import React from 'react';
import { Bus, MapPin, Users } from 'lucide-react';
import { useCampus } from '../../context/CampusContext';
import StatusBadge from '../../components/common/StatusBadge';

export const AdminTransportPage = () => {
  const { buses } = useCampus();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Campus Fleet Logistics & Bus Routes
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Supervise transit coaches, fuel logs, and student commuter loads
        </p>
      </div>

      <div className="campus-card">
        <div className="overflow-x-auto">
          <table className="campus-table">
            <thead>
              <tr>
                <th>Bus ID</th>
                <th>Registration</th>
                <th>Route</th>
                <th>Scheduled Departure</th>
                <th>Capacity</th>
                <th>Confirmed Passengers</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {buses.map(b => (
                <tr key={b.id}>
                  <td className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">{b.id}</td>
                  <td className="font-mono text-xs text-slate-500">{b.busNumber}</td>
                  <td className="font-bold text-slate-800 dark:text-slate-200">{b.route}</td>
                  <td className="font-mono text-xs">{b.departureTime}</td>
                  <td className="font-mono text-xs">{b.capacity} Seats</td>
                  <td className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    {b.confirmedPassengers}
                  </td>
                  <td><StatusBadge status={b.status} size="sm" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminTransportPage;
