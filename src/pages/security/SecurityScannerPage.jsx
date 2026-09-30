import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import { useNavigate } from 'react-router-dom';
import StatusBadge from '../../components/common/StatusBadge';
import {
  ScanLine,
  CheckCircle2,
  LogIn,
  LogOut,
  ShieldCheck,
  User,
  Calendar,
  Clock,
  MapPin,
  AlertCircle,
  FileText
} from 'lucide-react';

export const SecurityScannerPage = () => {
  const { gatePasses, verifySecurityPass } = useCampus();
  const navigate = useNavigate();

  const [scanState, setScanState] = useState('IDLE'); // 'IDLE' | 'SCANNING' | 'SCANNED'
  const [scannedPass, setScannedPass] = useState(null);
  const [lastAction, setLastAction] = useState(null);

  const handleScanDemoPass = () => {
    setScanState('SCANNING');
    setTimeout(() => {
      // Find Sai's approved pass or the first gate pass
      const pass = gatePasses.find(p => p.status === 'Approved') || gatePasses[0];
      setScannedPass(pass);
      setScanState('SCANNED');
      setLastAction(null);
    }, 600);
  };

  const handleVerifyAction = (actionType) => {
    if (!scannedPass) return;
    const log = verifySecurityPass(scannedPass.id, actionType, 'Main Security Gate 1');
    setLastAction({
      actionType,
      time: log.timestamp,
      logId: log.id
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <ScanLine className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            Terminal QR Gate Scanner
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Hardware Barcode / Optical QR Emulation • Main Security Gate 1
          </p>
        </div>

        <button
          onClick={() => navigate('/security/logs')}
          className="btn btn-secondary btn-sm"
        >
          <FileText className="w-4 h-4" />
          View Security Audit Logs
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Scanner Terminal Simulation (5 spans) */}
        <div className="lg:col-span-5 campus-card space-y-4">
          <div className="campus-card-header">
            <h3 className="campus-card-title">Optical Reader Viewport</h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-300">
              Camera Live
            </span>
          </div>

          <div className="relative aspect-square max-w-sm mx-auto rounded-2xl bg-slate-950 border-2 border-indigo-500/40 p-6 flex flex-col items-center justify-center overflow-hidden">
            {/* Crosshair Scanner Frame */}
            <div className="absolute inset-8 border border-indigo-400/40 rounded-xl pointer-events-none flex items-center justify-center">
              <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />
            </div>

            <ScanLine className="w-16 h-16 text-indigo-400 mb-3 animate-pulse" />
            <p className="text-xs text-slate-300 font-medium text-center z-10">
              {scanState === 'SCANNING'
                ? 'Reading 2D QR Matrix & verifying cryptographic signature...'
                : scanState === 'SCANNED'
                ? 'QR Code Verified!'
                : 'Point camera at student phone pass or click below'}
            </p>

            <button
              onClick={handleScanDemoPass}
              disabled={scanState === 'SCANNING'}
              className="mt-6 btn btn-primary btn-sm z-10 shadow-lg shadow-indigo-600/40"
            >
              <ScanLine className="w-4 h-4" />
              {scanState === 'SCANNING' ? 'Decoding...' : 'SCAN DEMO PASS'}
            </button>
          </div>
        </div>

        {/* Verification Result Card (7 spans) */}
        <div className="lg:col-span-7 campus-card space-y-4">
          <div className="campus-card-header">
            <div>
              <h3 className="campus-card-title">Scanned Authorization Credentials</h3>
              <p className="campus-card-subtitle">
                Cryptographic validity and student identity match
              </p>
            </div>
            {scanState === 'SCANNED' && (
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-300 flex items-center gap-1 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" /> VALID PASS
              </span>
            )}
          </div>

          {scannedPass && scanState === 'SCANNED' ? (
            <div className="space-y-4 text-xs animate-fade-in">
              {/* Student Identification Details */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-slate-700/60">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {scannedPass.student}
                      </h4>
                      <p className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-bold">
                        {scannedPass.studentId}
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={scannedPass.status} />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> Hostel & Room:
                    </span>
                    <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                      {scannedPass.hostel}, {scannedPass.room}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> Date:
                    </span>
                    <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                      {scannedPass.date}
                    </p>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Validity Time Window:
                  </span>
                  <p className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm mt-0.5">
                    {scannedPass.outTime} → {scannedPass.returnTime}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-slate-400">Destination & Purpose:</span>
                  <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5 italic">
                    "{scannedPass.destination} — {scannedPass.purpose}"
                  </p>
                </div>
              </div>

              {/* Action Buttons: VERIFY ENTRY and VERIFY EXIT */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <button
                  onClick={() => handleVerifyAction('EXIT')}
                  className="py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md shadow-amber-600/20 flex items-center justify-center gap-2 transition-all hover:scale-102"
                >
                  <LogOut className="w-4 h-4" />
                  VERIFY EXIT (Student Leaving Campus)
                </button>

                <button
                  onClick={() => handleVerifyAction('ENTRY')}
                  className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all hover:scale-102"
                >
                  <LogIn className="w-4 h-4" />
                  VERIFY ENTRY (Student Returning)
                </button>
              </div>

              {/* Confirmation Flash */}
              {lastAction && (
                <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 flex items-center justify-between animate-fade-in">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>
                      Successfully logged <strong>{lastAction.actionType}</strong> for {scannedPass.student} ({scannedPass.studentId}) at {lastAction.time}. Log ID: {lastAction.logId}
                    </span>
                  </div>
                  <button
                    onClick={() => navigate('/security/logs')}
                    className="text-xs font-bold underline"
                  >
                    View in Audit Logs →
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="py-20 text-center text-slate-400">
              <ShieldCheck className="w-12 h-12 mx-auto text-slate-300 mb-3" />
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Ready for Scan
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Click "SCAN DEMO PASS" on the camera viewport to emulate student QR badge scan.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecurityScannerPage;
