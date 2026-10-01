import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import ProfilePhotoModal from '../../components/profile/ProfilePhotoModal';
import { User, Mail, Phone, MapPin, Building2, Award, HeartPulse, GraduationCap, Camera } from 'lucide-react';

export const ProfilePage = () => {
  const { user } = useAuth();
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Student Institutional Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Official University Registrar Identity & Biometric Record
          </p>
        </div>

        <button
          onClick={() => setShowPhotoModal(true)}
          className="btn btn-secondary btn-sm flex items-center gap-2"
        >
          <Camera className="w-4 h-4 text-indigo-600" />
          <span>Change Photo (Camera / Upload)</span>
        </button>
      </div>

      <div className="campus-card">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="relative group cursor-pointer" onClick={() => setShowPhotoModal(true)}>
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250'}
              alt={user?.name}
              className="w-24 h-24 rounded-2xl object-cover ring-4 ring-indigo-500/20 shadow-md group-hover:scale-105 transition-transform"
            />
            <div className="absolute inset-0 rounded-2xl bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
              <Camera className="w-6 h-6" />
            </div>
          </div>

          <div className="space-y-1 text-center sm:text-left flex-1">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {user?.fullName || 'Sai Krishna Mohanty'}
            </h2>
            <p className="text-xs text-indigo-600 dark:text-indigo-400 font-mono font-bold">
              ID: {user?.studentId || 'BPUT2026001'}
            </p>
            <p className="text-xs text-slate-500">
              {user?.program} • {user?.department} ({user?.year}, {user?.semester})
            </p>
            <div className="pt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300">
                Regular Student
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-300">
                Hosteller (Block-B 304)
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6 text-xs">
          <div className="space-y-1">
            <p className="text-slate-400 flex items-center gap-1.5 font-semibold">
              <Mail className="w-3.5 h-3.5 text-indigo-500" /> University Email
            </p>
            <p className="font-bold text-slate-800 dark:text-slate-200">{user?.email}</p>
          </div>

          <div className="space-y-1">
            <p className="text-slate-400 flex items-center gap-1.5 font-semibold">
              <Phone className="w-3.5 h-3.5 text-indigo-500" /> Registered Mobile
            </p>
            <p className="font-bold text-slate-800 dark:text-slate-200">{user?.phone || '+91 98765 43210'}</p>
          </div>

          <div className="space-y-1">
            <p className="text-slate-400 flex items-center gap-1.5 font-semibold">
              <HeartPulse className="w-3.5 h-3.5 text-rose-500" /> Blood Group
            </p>
            <p className="font-bold text-slate-800 dark:text-slate-200">{user?.bloodGroup || 'O+'}</p>
          </div>

          <div className="space-y-1">
            <p className="text-slate-400 flex items-center gap-1.5 font-semibold">
              <Phone className="w-3.5 h-3.5 text-amber-500" /> Emergency Contact (Father)
            </p>
            <p className="font-bold text-slate-800 dark:text-slate-200">{user?.emergencyContact || '+91 98765 43219'}</p>
          </div>

          <div className="space-y-1">
            <p className="text-slate-400 flex items-center gap-1.5 font-semibold">
              <Building2 className="w-3.5 h-3.5 text-indigo-500" /> Hostel Allotment
            </p>
            <p className="font-bold text-slate-800 dark:text-slate-200">
              {user?.hostel}, {user?.room}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-slate-400 flex items-center gap-1.5 font-semibold">
              <Award className="w-3.5 h-3.5 text-cyan-500" /> Cumulative GPA
            </p>
            <p className="font-bold text-slate-800 dark:text-slate-200">{user?.cgpa || '8.84'} / 10.0</p>
          </div>
        </div>
      </div>

      <ProfilePhotoModal
        isOpen={showPhotoModal}
        onClose={() => setShowPhotoModal(false)}
      />
    </div>
  );
};

export default ProfilePage;
