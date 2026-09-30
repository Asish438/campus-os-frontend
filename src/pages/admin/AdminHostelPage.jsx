import React from 'react';
import { Building2, BedDouble, Users } from 'lucide-react';

export const AdminHostelPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Hostel Infrastructure Governance
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Residential capacity allocation across Aryabhatta & Ramanujan Halls
        </p>
      </div>

      <div className="campus-card">
        <div className="campus-card-header">
          <h3 className="campus-card-title">Residential Halls Occupancy</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="campus-table">
            <thead>
              <tr>
                <th>Hall Name</th>
                <th>Total Rooms</th>
                <th>Capacity (Beds)</th>
                <th>Occupied</th>
                <th>Occupancy %</th>
                <th>Chief Warden</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-bold">Aryabhatta Hall of Residence</td>
                <td className="font-mono">350</td>
                <td className="font-mono">1,050</td>
                <td className="font-mono text-emerald-600 font-bold">1,012</td>
                <td className="font-bold">96.3%</td>
                <td className="text-xs">Col. Rajesh Sharma</td>
              </tr>
              <tr>
                <td className="font-bold">Ramanujan Hall of Residence</td>
                <td className="font-mono">150</td>
                <td className="font-mono">450</td>
                <td className="font-mono text-emerald-600 font-bold">434</td>
                <td className="font-bold">96.4%</td>
                <td className="text-xs">Col. Rajesh Sharma</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHostelPage;
