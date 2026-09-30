import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { ShieldCheck, Download, Clock, MapPin, Calendar, User } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

export const QRCodeCard = ({ gatePass }) => {
  if (!gatePass) return null;

  const qrData = gatePass.qrPayload || JSON.stringify({
    passId: gatePass.id,
    student: gatePass.student,
    studentId: gatePass.studentId,
    hostel: gatePass.hostel,
    room: gatePass.room,
    purpose: gatePass.purpose,
    date: gatePass.date,
    validOut: gatePass.outTime,
    validReturn: gatePass.returnTime,
    status: gatePass.status
  });

  return (
    <div className="max-w-md w-full mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xl">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white px-6 py-4 flex items-center justify-between">
        <div>
          <span className="text-[10px] tracking-widest font-extrabold uppercase opacity-80">
            University Security Systems
          </span>
          <h3 className="text-lg font-extrabold tracking-tight">CAMPUS OS DIGITAL PASS</h3>
        </div>
        <div className="p-2 bg-white/10 rounded-xl backdrop-blur-md">
          <ShieldCheck className="w-6 h-6 text-emerald-300" />
        </div>
      </div>

      <div className="p-6 flex flex-col items-center">
        {/* Pass ID */}
        <div className="flex items-center justify-between w-full mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400">Pass Reference</p>
            <p className="font-mono text-sm font-bold text-indigo-600 dark:text-indigo-400">
              {gatePass.id}
            </p>
          </div>
          <StatusBadge status={gatePass.status} />
        </div>

        {/* QR Code Container */}
        <div className="p-4 bg-white rounded-2xl border-2 border-indigo-100 dark:border-slate-800 shadow-md mb-5">
          <QRCodeSVG
            value={qrData}
            size={180}
            level="H"
            includeMargin={true}
          />
        </div>

        <p className="text-[11px] font-medium text-slate-400 mb-5 text-center">
          Scan with Campus OS Security Scanner terminal at Exit / Entry Gates
        </p>

        {/* Key Info Details Grid */}
        <div className="w-full bg-slate-50 dark:bg-slate-800/40 rounded-xl p-4 space-y-2.5 text-xs mb-4 border border-slate-100 dark:border-slate-800">
          <div className="flex justify-between items-center">
            <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-indigo-500" /> Student:
            </span>
            <span className="font-bold text-slate-800 dark:text-slate-200">
              {gatePass.student} ({gatePass.studentId})
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-indigo-500" /> Hostel & Room:
            </span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {gatePass.hostel}, {gatePass.room}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-indigo-500" /> Date:
            </span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {gatePass.date}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-500" /> Validity Window:
            </span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">
              {gatePass.outTime} → {gatePass.returnTime}
            </span>
          </div>

          <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-slate-600 dark:text-slate-300">
            <span className="font-bold text-slate-700 dark:text-slate-300">Destination & Purpose:</span>
            <p className="mt-0.5 text-slate-500 dark:text-slate-400 italic">
              "{gatePass.destination} — {gatePass.purpose}"
            </p>
          </div>
        </div>

        {gatePass.approvedBy && (
          <div className="w-full text-center py-2 px-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 rounded-lg text-emerald-700 dark:text-emerald-300 text-[11px] font-semibold">
            Digitally Authorized by {gatePass.approvedBy}
          </div>
        )}
      </div>
    </div>
  );
};

export default QRCodeCard;
