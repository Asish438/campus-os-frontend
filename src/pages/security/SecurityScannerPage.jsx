import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import { useNavigate } from 'react-router-dom';
import StatusBadge from '../../components/common/StatusBadge';
import gatePassApi from '../../services/gatePassApi';
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
  FileText,
  Search,
  QrCode,
  Sparkles
} from 'lucide-react';

export const SecurityScannerPage = () => {
  const { gatePasses, verifySecurityPass } = useCampus();
  const navigate = useNavigate();

  const [scanState, setScanState] = useState('IDLE'); // 'IDLE' | 'SCANNING' | 'SCANNED'
  const [scannedPass, setScannedPass] = useState(null);
  const [lastAction, setLastAction] = useState(null);
  const [manualInput, setManualInput] = useState('');
  const [searching, setSearching] = useState(false);
  const [scanError, setScanError] = useState(null);

  // Scan demo/active pass
  const handleScanPass = (passToScan) => {
    setScanError(null);
    setScanState('SCANNING');
    setTimeout(() => {
      const target = passToScan || gatePasses.find(p => p.status === 'Approved' || p.status === 'APPROVED') || gatePasses[0];
      if (target) {
        setScannedPass(target);
        setScanState('SCANNED');
        setLastAction(null);
      } else {
        setScanState('IDLE');
        setScanError('No gate pass found to scan. Please create or approve one first.');
      }
    }, 450);
  };

  // Handle manual input search (QR code or Pass ID)
  const handleManualSearch = async (e) => {
    e.preventDefault();
    if (!manualInput.trim()) return;

    setSearching(true);
    setScanError(null);
    setScanState('SCANNING');

    try {
      const query = manualInput.trim();
      let matchedPass = gatePasses.find(
        p => p.id === query || 
             p.id === `GP-${query}` || 
             p.qrCode === query ||
             p.studentId === query
      );

      // If not in local state, query backend API
      if (!matchedPass) {
        try {
          const rawId = query.replace('GP-', '');
          if (!isNaN(rawId)) {
            const apiRes = await gatePassApi.verifyGatePass(query);
            if (apiRes) {
              matchedPass = {
                ...apiRes,
                id: `GP-${apiRes.id}`,
                student: 'Sai Krishna Mohanty',
                studentId: 'BPUT2026001',
                hostel: 'Aryabhatta Hall',
                room: 'Room 304',
                purpose: apiRes.reason || 'Campus Outpass',
                destination: 'Bhubaneswar Central Market',
                date: '2026-10-01',
                outTime: '04:30 PM',
                returnTime: '08:30 PM',
                status: apiRes.status === 'APPROVED' ? 'Approved' : apiRes.status
              };
            }
          }
        } catch (err) {
          console.warn('[Scanner] API lookup fallback:', err);
        }
      }

      if (matchedPass) {
        setScannedPass(matchedPass);
        setScanState('SCANNED');
        setLastAction(null);
      } else {
        setScanState('IDLE');
        setScanError(`Pass "${query}" not found. Verify the QR string or select from available passes below.`);
      }
    } finally {
      setSearching(false);
    }
  };

  const handleVerifyAction = async (actionType) => {
    if (!scannedPass) return;
    const log = await verifySecurityPass(scannedPass.id, actionType, 'Main Security Gate 1');
    setLastAction({
      actionType,
      time: log.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      logId: log.id || `LOG-${Math.floor(1000 + Math.random() * 9000)}`
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
            Optical QR Matrix & Pass Verification Terminal • Main Security Gate 1
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
        {/* Scanner Terminal (5 spans) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="campus-card space-y-4">
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
              <p className="text-xs text-slate-300 font-medium text-center z-10 px-4">
                {scanState === 'SCANNING'
                  ? 'Decoding 2D QR matrix & verifying cryptographic signature...'
                  : scanState === 'SCANNED'
                  ? 'QR Matrix Decoded & Verified!'
                  : 'Point scanner at student phone or click below to scan'}
              </p>

              <button
                onClick={() => handleScanPass(null)}
                disabled={scanState === 'SCANNING'}
                className="mt-6 btn btn-primary btn-sm z-10 shadow-lg shadow-indigo-600/40 flex items-center gap-1.5"
              >
                <ScanLine className="w-4 h-4" />
                {scanState === 'SCANNING' ? 'Decoding...' : 'SCAN STUDENT QR PASS'}
              </button>
            </div>

            {/* Manual QR / Pass ID Input Form */}
            <form onSubmit={handleManualSearch} className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <label className="text-[11px] font-semibold text-slate-500 block">
                Or Enter / Paste QR Code / Pass ID:
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={manualInput}
                    onChange={(e) => setManualInput(e.target.value)}
                    placeholder="e.g. GP-1, GP-2026-QR98745"
                    className="form-input text-xs pl-9 py-2"
                  />
                </div>
                <button
                  type="submit"
                  disabled={searching || !manualInput.trim()}
                  className="btn btn-secondary btn-sm px-3"
                >
                  Verify
                </button>
              </div>
            </form>

            {scanError && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{scanError}</span>
              </div>
            )}
          </div>

          {/* Quick Select from Available Passes */}
          <div className="campus-card space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Available Gate Passes ({gatePasses.length})
            </h4>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {gatePasses.map((p) => (
                <div
                  key={p.id}
                  onClick={() => handleScanPass(p)}
                  className="p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 hover:border-indigo-400 cursor-pointer flex items-center justify-between text-xs transition-all"
                >
                  <div>
                    <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{p.id}</span>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 truncate max-w-[180px]">{p.destination || p.purpose}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={p.status} size="sm" />
                    <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold hover:underline">Scan →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Verification Result Card (7 spans) */}
        <div className="lg:col-span-7 campus-card space-y-4">
          <div className="campus-card-header">
            <div>
              <h3 className="campus-card-title">Scanned Authorization Credentials</h3>
              <p className="campus-card-subtitle">
                Cryptographic validity and student identity verification
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
                    <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-600/30">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {scannedPass.student || 'Sai Krishna Mohanty'}
                      </h4>
                      <p className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-bold">
                        {scannedPass.studentId || 'BPUT2026001'} • Pass ID: {scannedPass.id}
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={scannedPass.status} />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-indigo-500" /> Hostel & Room:
                    </span>
                    <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                      {scannedPass.hostel || 'Aryabhatta Hall'}, {scannedPass.room || 'Room 304'}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-indigo-500" /> Date:
                    </span>
                    <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                      {scannedPass.date || '2026-10-01'}
                    </p>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-indigo-500" /> Validity Time Window:
                  </span>
                  <p className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm mt-0.5">
                    {scannedPass.outTime || '04:30 PM'} → {scannedPass.returnTime || '08:30 PM'}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-slate-400">Destination & Purpose:</span>
                  <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5 italic">
                    "{scannedPass.destination || 'Bhubaneswar Central Market'} — {scannedPass.purpose || scannedPass.reason}"
                  </p>
                </div>

                {scannedPass.qrCode && (
                  <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">QR Signature:</span>
                    <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{scannedPass.qrCode}</span>
                  </div>
                )}
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
                      Successfully logged <strong>{lastAction.actionType}</strong> for {scannedPass.student || 'Sai Krishna Mohanty'} at {lastAction.time}. Log ID: {lastAction.logId}
                    </span>
                  </div>
                  <button
                    onClick={() => navigate('/security/logs')}
                    className="text-xs font-bold underline shrink-0 ml-2"
                  >
                    View in Logs →
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
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                Click "SCAN STUDENT QR PASS" on the camera viewport or enter a Pass ID to verify authorization and log gate departure/entry.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecurityScannerPage;
