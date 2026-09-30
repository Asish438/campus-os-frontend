import React from 'react';
import { Building2, BedDouble, Users, ShieldCheck, UtensilsCrossed } from 'lucide-react';
import KpiCard from '../../components/common/KpiCard';

export const WardenHostelPage = () => {
  const blocks = [
    { name: 'Block-A (Junior Wing)', rooms: 120, occupied: 116, available: 4, caretaker: 'Mr. N. K. Panda' },
    { name: 'Block-B (Senior Wing)', rooms: 140, occupied: 138, available: 2, caretaker: 'Mr. B. K. Jena' },
    { name: 'Block-C (Post-Graduate)', rooms: 90, occupied: 86, available: 4, caretaker: 'Mr. P. C. Mohanty' },
    { name: 'Ramanujan Hall (New Wing)', rooms: 150, occupied: 142, available: 8, caretaker: 'Mr. S. K. Sethi' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Hostel Infrastructure & Occupancy Matrix
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Room Inventory, Maintenance Logs & Caretaker Allocation
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total Capacity"
          value="500 Rooms"
          subtext="1,500 Student Beds"
          icon={BedDouble}
          variant="indigo"
        />
        <KpiCard
          title="Total Occupied"
          value="482 Rooms"
          subtext="96.4% Occupancy Rate"
          icon={Users}
          variant="emerald"
        />
        <KpiCard
          title="Vacant Beds"
          value="18 Beds"
          subtext="Available for Transfer"
          icon={Building2}
          variant="cyan"
        />
        <KpiCard
          title="Mess Hygiene Rating"
          value="Grade A+"
          subtext="FSSAI Verified"
          icon={UtensilsCrossed}
          variant="amber"
        />
      </div>

      <div className="campus-card">
        <div className="campus-card-header">
          <h3 className="campus-card-title">Hostel Blocks Inventory</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="campus-table">
            <thead>
              <tr>
                <th>Block Name</th>
                <th>Total Rooms</th>
                <th>Occupied</th>
                <th>Available</th>
                <th>Caretaker In-Charge</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {blocks.map((b) => (
                <tr key={b.name}>
                  <td className="font-bold text-slate-800 dark:text-slate-200">{b.name}</td>
                  <td className="font-mono text-xs">{b.rooms}</td>
                  <td className="font-mono text-xs text-emerald-600 font-bold">{b.occupied}</td>
                  <td className="font-mono text-xs text-indigo-600 font-bold">{b.available}</td>
                  <td className="text-xs text-slate-500">{b.caretaker}</td>
                  <td>
                    <button className="btn btn-outline btn-sm text-[11px]">
                      View Room Grid
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WardenHostelPage;
