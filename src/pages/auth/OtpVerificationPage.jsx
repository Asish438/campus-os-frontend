import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  School,
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const OtpVerificationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginWithOtp, verifyRegisterOtp } = useAuth();
  
  // If coming from login/register, email and flow type might be passed in state
  const passedEmail = location.state?.email || '';
  const flowType = location.state?.flow || 'LOGIN'; // 'LOGIN' or 'REGISTER'

  const [email] = useState(passedEmail);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(300); // 5 minutes
  const [loading, setLoading] = useState(false);
  const [infoMessage] = useState(passedEmail ? 'OTP sent to your email' : '');
  const [error, setError] = useState('');

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => setCountdown(c => c - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

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

    if (!email) {
      setError('Missing email address. Please restart the process.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      if (flowType === 'REGISTER') {
          await verifyRegisterOtp(email, fullOtp);
          navigate('/login'); // Force login after register
      } else {
          const loggedUser = await loginWithOtp(email, fullOtp);
          // Redirect based on role
          if (loggedUser.role === 'STUDENT') navigate('/student/dashboard');
          else if (loggedUser.role === 'FACULTY') navigate('/faculty/dashboard');
          else if (loggedUser.role === 'WARDEN') navigate('/warden/dashboard');
          else if (loggedUser.role === 'SECURITY') navigate('/security/dashboard');
          else if (loggedUser.role === 'ADMIN') navigate('/admin/dashboard');
          else navigate('/');
      }
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
            <p className="text-[10px] text-slate-400 font-medium">Secure Email OTP Portal</p>
          </div>
        </Link>
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Verify Two-Factor Authentication
        </h2>
        <p className="mt-1 text-xs text-slate-400">
           We sent a secure 6-digit code to {email || 'your email'}
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
                  `Code expires in ${Math.floor(countdown/60)}:${(countdown%60).toString().padStart(2, '0')}`
                ) : (
                  <span className="text-rose-400">Code expired</span>
                )}
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {loading ? 'Verifying Token...' : 'Verify OTP & Enter Campus OS'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-800 text-center">
            <Link
              to="/login"
              className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              ← Back to standard Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerificationPage;
