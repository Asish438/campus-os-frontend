import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import { useAuth } from '../../context/AuthContext';
import QRCodeCard from '../../components/qr/QRCodeCard';
import StatusBadge from '../../components/common/StatusBadge';
import {
  QrCode,
  Send,
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  AlertCircle,
  FileText,
  CheckCircle2,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const GatePassPage = () => {
  const { user } = useAuth();
  const { gatePasses, addGatePass, approveGatePass } = useCampus();

  const [purpose, setPurpose] = useState('Medical Consultation at Apollo Clinic & essential project components purchase');
  const [destination, setDestination] = useState('Bhubaneswar Central Market & Clinic');
  const [date, setDate] = useState('2026-10-01');
  const [outTime, setOutTime] = useState('04:30 PM');
  const [returnTime, setReturnTime] = useState('08:30 PM');
  const [submitting, setSubmitting] = useState(false);
  const [selectedPassId, setSelectedPassId] = useState(null);

  // Filter student passes
  const myPasses = gatePasses;
  
  // Find selected or first approved pass
  const activeApprovedPass = selectedPassId 
    ? myPasses.find(p => p.id === selectedPassId && (p.status === 'Approved' || p.status === 'APPROVED'))
    : myPasses.find(p => p.status === 'Approved' || p.status === 'APPROVED');

  const activeSelectedPass = selectedPassId
    ? myPasses.find(p => p.id === selectedPassId)
    : activeApprovedPass;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const newPass = await addGatePass({
        student: user?.fullName || 'Sai Krishna Mohanty',
        studentId: user?.studentId || 'BPUT2026001',
        hostel: user?.hostel || 'Aryabhatta Hall',
        room: user?.room || 'Room 304',
        phone: user?.phone || '+91 98765 43210',
        purpose,
        destination,
        date,
        outTime,
        returnTime
      });
      if (newPass?.id) {
        setSelectedPassId(newPass.id);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleQuickApprove = (e, passId) => {
    e.stopPropagation();
    approveGatePass(passId);
    setSelectedPassId(passId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Digital Campus Gate Pass
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Cryptographic QR Pass Verified at Main Security Boom Barrier & Pedestrian Turnstiles
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form (6 spans) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="campus-card">
            <div className="campus-card-header">
              <div>
                <h3 className="campus-card-title flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  Request Outpass Authorization
                </h3>
                <p className="campus-card-subtitle">
                  Requests submitted here are routed directly to your Hostel Warden
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="form-label">Purpose of Travel</label>
                <input
                  type="text"
                  required
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="e.g. Medical Consultation, Project purchase, Weekend visit"
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Destination</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="e.g. Master Canteen, Cuttack"
                    className="form-input pl-9"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label">Out Time</label>
                  <input
                    type="text"
                    required
                    value={outTime}
                    onChange={(e) => setOutTime(e.target.value)}
                    placeholder="04:30 PM"
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label">Expected Return</label>
                  <input
                    type="text"
                    required
                    value={returnTime}
                    onChange={(e) => setReturnTime(e.target.value)}
                    placeholder="08:30 PM"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 space-y-1">
                <p className="font-semibold text-slate-700 dark:text-slate-300">
                  Campus Curfew Notice:
                </p>
                <p>
                  Outpasses exceeding 09:30 PM require parental confirmation on record. Return verification is scanned at Gate 1.
                </p>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full btn btn-primary py-2.5 shadow-md shadow-blue-600/30"
              >
                <Send className="w-4 h-4" />
                {submitting ? 'Submitting & Dispatching...' : 'Submit Gate Pass Request'}
              </button>
            </form>
          </div>

          {/* Previous Gate Passes */}
          <div className="campus-card">
            <div className="campus-card-header">
              <h3 className="campus-card-title">My Gate Pass Records</h3>
              <span className="text-xs text-slate-400">Total: {myPasses.length}</span>
            </div>
            <div className="space-y-3">
              {myPasses.map((p) => {
                const isThisApproved = p.status === 'Approved' || p.status === 'APPROVED';
                const isSelected = selectedPassId === p.id || (!selectedPassId && isThisApproved);
                return (
                  <div
                    key={p.id}
                    onClick={() => setSelectedPassId(p.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'border-indigo-500/80 bg-indigo-50/40 dark:bg-indigo-950/30 shadow-sm'
                        : 'border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 hover:border-slate-300'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
                          {p.id}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">
                          {p.date} ({p.outTime} - {p.returnTime})
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                        {p.destination}
                      </p>
                      <p className="text-[11px] text-slate-400">{p.purpose}</p>
                    </div>

                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <StatusBadge status={p.status} size="sm" />
                      {!isThisApproved && (
                        <button
                          type="button"
                          onClick={(e) => handleQuickApprove(e, p.id)}
                          className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold text-[10px] hover:bg-emerald-200 flex items-center gap-1 border border-emerald-300/60"
                        >
                          <Sparkles className="w-2.5 h-2.5" /> Approve (Demo)
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Digital QR Code Card when Approved (6 spans) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Active Approved Digital QR Pass
            </h3>
            {activeApprovedPass && (
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-300 font-mono">
                {activeApprovedPass.id} • Verified
              </span>
            )}
          </div>

          {activeApprovedPass ? (
            <QRCodeCard gatePass={activeApprovedPass} />
          ) : activeSelectedPass ? (
            <div className="campus-card text-center py-12 text-slate-400 space-y-3">
              <QrCode className="w-12 h-12 mx-auto text-amber-500 mb-2" />
              <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200">
                Gate Pass {activeSelectedPass.id} is {activeSelectedPass.status}
              </h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                This pass is currently pending Warden review. Click below to approve it and instantly generate the cryptographic QR badge:
              </p>
              <button
                type="button"
                onClick={(e) => handleQuickApprove(e, activeSelectedPass.id)}
                className="btn btn-success btn-sm mt-2"
              >
                <CheckCircle2 className="w-4 h-4" /> Approve & Generate QR Pass
              </button>
            </div>
          ) : (
            <div className="campus-card text-center py-16 text-slate-400">
              <QrCode className="w-12 h-12 mx-auto text-slate-300 mb-3" />
              <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">No Approved QR Pass</h4>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                Once your request is approved by the Warden, your dynamic cryptographic QR badge will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GatePassPage;
