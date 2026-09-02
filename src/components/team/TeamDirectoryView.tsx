import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User } from '../../types';
import { Badge } from '../common/Badge';
import { AddAdminModal } from './AddAdminModal';
import { EditAdminModal } from './EditAdminModal';
import { RemoveAdminModal } from './RemoveAdminModal';
import { 
  FiUsers, 
  FiUserPlus, 
  FiShield, 
  FiEdit2, 
  FiTrash2, 
  FiLayers, 
  FiTarget, 
  FiMapPin, 
  FiMail, 
  FiPhone,
  FiZap
} from 'react-icons/fi';

export const TeamDirectoryView: React.FC = () => {
  const { users, currentUser, campaigns, leads, switchPersona } = useApp();

  const [isAddAdminOpen, setIsAddAdminOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<User | null>(null);
  const [deletingAdmin, setDeletingAdmin] = useState<User | null>(null);

  const isSuperAdmin = currentUser.role === 'super_admin';

  return (
    <div className="space-y-4 pb-12">
      {/* Top Header */}
      <div className="p-4 rounded-xl bg-navy-900 border border-navy-750 shadow-panel flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-100">Team Directory & Admin Lifecycle Governance</h2>
            <Badge variant="blue" size="sm">{users.length} Media Leads</Badge>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            {isSuperAdmin
              ? 'Super Admin Governance: Provision new admins, assign Meta ad campaigns, and configure role scopes.'
              : 'Directory view of operational media buyers and campaign leads.'}
          </p>
        </div>

        {isSuperAdmin && (
          <button
            onClick={() => setIsAddAdminOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-subtle transition-colors self-start sm:self-auto shrink-0"
          >
            <FiUserPlus className="w-3.5 h-3.5" />
            <span>Provision New Admin</span>
          </button>
        )}
      </div>

      {/* Admin Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
        {users.map(user => {
          const userCampaigns = campaigns.filter(c => c.assignedAdminId === user.id);
          const userLeads = leads.filter(l => l.assignedAdminId === user.id);
          const isCurrentUser = user.id === currentUser.id;

          return (
            <div
              key={user.id}
              className={`bg-navy-900 rounded-lg border p-4 shadow-panel flex flex-col justify-between transition-colors ${
                isCurrentUser
                  ? 'border-brand-500/50'
                  : 'border-navy-750 hover:border-slate-600'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-2.5 mb-3">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-lg object-cover ring-1 ring-navy-700"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-semibold text-xs text-slate-100">{user.name}</h3>
                        {isCurrentUser && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-brand-600 text-white">
                            You
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400">{user.title}</p>
                    </div>
                  </div>

                  <Badge
                    variant={user.role === 'super_admin' ? 'amber' : 'blue'}
                    size="sm"
                  >
                    {user.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                  </Badge>
                </div>

                {/* Metadata */}
                <div className="space-y-1 text-xs text-slate-400 mb-3 bg-navy-850 p-2.5 rounded border border-navy-800">
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <FiMail className="w-3 h-3 text-slate-500" />
                    <span className="text-slate-300 font-mono">{user.email}</span>
                  </div>
                  {user.phone && (
                    <div className="flex items-center gap-1.5 text-[11px]">
                      <FiPhone className="w-3 h-3 text-slate-500" />
                      <span className="text-slate-300 font-mono">{user.phone}</span>
                    </div>
                  )}
                  {user.location && (
                    <div className="flex items-center gap-1.5 text-[11px]">
                      <FiMapPin className="w-3 h-3 text-slate-500" />
                      <span className="text-slate-300">{user.location}</span>
                    </div>
                  )}
                </div>

                {/* Assigned Telemetry Stats */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="p-2 rounded bg-navy-950 border border-navy-800 text-xs font-mono">
                    <span className="text-[10px] text-slate-400 font-sans block flex items-center gap-1">
                      <FiLayers className="w-3 h-3 text-sky-400" /> Assigned Ads
                    </span>
                    <span className="font-semibold text-slate-100 text-xs">
                      {userCampaigns.length} Campaigns
                    </span>
                  </div>

                  <div className="p-2 rounded bg-navy-950 border border-navy-800 text-xs font-mono">
                    <span className="text-[10px] text-slate-400 font-sans block flex items-center gap-1">
                      <FiTarget className="w-3 h-3 text-emerald-400" /> Active Leads
                    </span>
                    <span className="font-semibold text-emerald-400 text-xs">
                      {userLeads.length} Leads
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2.5 border-t border-navy-800 flex items-center justify-between gap-2 text-xs">
                <button
                  onClick={() => switchPersona(user.id)}
                  disabled={isCurrentUser}
                  className={`px-2.5 py-1 rounded font-medium flex items-center gap-1 transition-colors ${
                    isCurrentUser
                      ? 'bg-navy-800 text-slate-500 cursor-default'
                      : 'bg-navy-800 hover:bg-navy-750 text-slate-300 hover:text-white border border-navy-700'
                  }`}
                  title="Switch to this persona"
                >
                  <FiZap className="w-3 h-3 text-sky-400" />
                  <span>{isCurrentUser ? 'Active Account' : 'Switch Persona'}</span>
                </button>

                {isSuperAdmin && (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setEditingAdmin(user)}
                      className="p-1 rounded bg-navy-800 hover:bg-navy-750 text-slate-300 hover:text-white border border-navy-700 transition-colors"
                      title="Edit Admin Permissions"
                    >
                      <FiEdit2 className="w-3 h-3" />
                    </button>

                    {user.role !== 'super_admin' && (
                      <button
                        onClick={() => setDeletingAdmin(user)}
                        className="p-1 rounded bg-navy-800 hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 border border-navy-700 transition-colors"
                        title="Remove Admin Account"
                      >
                        <FiTrash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modals */}
      <AddAdminModal
        isOpen={isAddAdminOpen}
        onClose={() => setIsAddAdminOpen(false)}
      />

      <EditAdminModal
        isOpen={Boolean(editingAdmin)}
        onClose={() => setEditingAdmin(null)}
        admin={editingAdmin}
      />

      <RemoveAdminModal
        isOpen={Boolean(deletingAdmin)}
        onClose={() => setDeletingAdmin(null)}
        admin={deletingAdmin}
      />
    </div>
  );
};
