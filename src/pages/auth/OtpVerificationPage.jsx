import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authApi } from '../../services/authApi';
import {
  School,
  Phone,
  KeyRound,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const OtpVerificationPage = () => {
  const navigate = useNavigate();
  const { loginWithOtp } = useAuth();

  const [step, setStep] = useState('REQUEST'); // 'REQUEST' | 'VERIFY'
  const [identifier, setIdentifier] = useState('+91 98765 43210');
  const [selectedRole, setSelectedRole] = useState('STUDENT');
  const [otp, setOtp] = useState(['1', '2', '3', '4', '5', '6']);
  const [countdown, setCountdown] = useState(45);
  const [loading, setLoading] = useState(false);
  const [infoMessage, setInfoMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let timer;
    if (step === 'VERIFY' && countdown > 0) {
      timer = setInterval(() => setCountdown(c => c - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await authApi.sendOtp(identifier);
      setInfoMessage(res.message || 'OTP sent successfully!');
      setStep('VERIFY');
      setCountdown(45);
    } catch (err) {
      setError(err.message || 'Failed to send OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const fullOtp = otp.join('');
    if (fullOtp.length !== 6) {
      setError('Please enter all 6 digits of the OTP.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const loggedUser = await loginWithOtp(identifier, fullOtp, selectedRole);
      // Redirect
      if (loggedUser.role === 'STUDENT') navigate('/student/dashboard');
      else if (loggedUser.role === 'FACULTY') navigate('/faculty/dashboard');
      else if (loggedUser.role === 'WARDEN') navigate('/warden/dashboard');
      else if (loggedUser.role === 'SECURITY') navigate('/security/dashboard');
      else if (loggedUser.role === 'ADMIN') navigate('/admin/dashboard');
      else navigate('/');
    } catch (err) {
      setError(err.message || 'Invalid OTP code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 selection:bg-indigo-600 selection:text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2.5 mb-4 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
            <School className="w-5 h-5" />
          </div>
          <div className="text-left">
            <span className="text-xl font-extrabold tracking-tight text-white">CAMPUS OS</span>
            <p className="text-[10px] text-slate-400 font-medium">OTP Authentication Portal</p>
          </div>
        </Link>
        <h2 className="text-2xl font-bold tracking-tight text-white">
          {step === 'REQUEST' ? 'Phone / Identity Verification' : 'Enter One-Time Password'}
        </h2>
        <p className="mt-1 text-xs text-slate-400">
          {step === 'REQUEST'
            ? 'We will transmit a 6-digit authentication token to your registered mobile'
            : `Enter code sent to ${identifier} (Demo OTP: 123456)`}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-rose-950/50 border border-rose-800/60 flex items-center gap-2 text-rose-300 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {infoMessage && (
            <div className="mb-5 p-3 rounded-xl bg-emerald-950/50 border border-emerald-800/60 flex items-center gap-2 text-emerald-300 text-xs">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{infoMessage}</span>
            </div>
          )}

          {step === 'REQUEST' ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Target Role
                </label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-950/60 border border-slate-700/80 rounded-xl text-white outline-none"
                >
                  <option value="STUDENT">Student (Sai - BPUT2026001)</option>
                  <option value="FACULTY">Faculty (Dr. Thorne)</option>
                  <option value="WARDEN">Warden (Col. Sharma)</option>
                  <option value="SECURITY">Security (Insp. Pradhan)</option>
                  <option value="ADMIN">Admin (Dean Patnaik)</option>
                  <option value="ACCOUNTS">Accounts (Priyanka Das)</option>
                  <option value="TRANSPORT">Transport (Ramesh Mohapatra)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Mobile Number or Institutional Email
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-950/60 border border-slate-700/80 rounded-xl text-white placeholder:text-slate-500 outline-none focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {loading ? 'Dispatching OTP...' : 'Send 6-Digit OTP'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              {/* 6-digit OTP Inputs */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 text-center mb-3">
                  Verification Code
                </label>
                <div className="flex justify-between gap-2">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-input-${idx}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      className="w-11 h-12 text-center text-lg font-bold font-mono bg-slate-950/80 border border-slate-700 rounded-xl text-indigo-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                    />
                  ))}
                </div>
              </div>

              {/* Countdown & Resend */}
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>
                  {countdown > 0 ? (
                    `Resend in ${countdown}s`
                  ) : (
                    <button
                      type="button"
                      onClick={() => setCountdown(45)}
                      className="text-indigo-400 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <RotateCcw className="w-3 h-3" /> Resend OTP
                    </button>
                  )}
                </span>
                <span className="font-mono text-cyan-400 font-semibold">Demo: 123456</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {loading ? 'Verifying Token...' : 'Verify OTP & Enter Campus OS'}
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setStep('REQUEST')}
                className="w-full text-center text-xs text-slate-400 hover:text-white transition-colors"
              >
                Change Mobile Number
              </button>
            </form>
          )}

          <div className="mt-6 pt-6 border-t border-slate-800 text-center">
            <Link
              to="/login"
              className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              ← Back to standard Password Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerificationPage;
