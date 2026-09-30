import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import { useAuth } from '../../context/AuthContext';
import StatusBadge from '../../components/common/StatusBadge';
import {
  Users,
  Send,
  Calendar,
  Clock,
  Phone,
  UserCheck,
  ShieldCheck,
  Building
} from 'lucide-react';

export const VisitorsPage = () => {
  const { user } = useAuth();
  const { visitors, addVisitor } = useCampus();

  const [visitorName, setVisitorName] = useState('Ramesh Mohanty');
  const [relationship, setRelationship] = useState('Father');
  const [phone, setPhone] = useState('+91 98765 43219');
  const [visitDate, setVisitDate] = useState('2026-09-30');
  const [expectedArrival, setExpectedArrival] = useState('03:30 PM');
  const [purpose, setPurpose] = useState('Delivering semester care package and personal medicines');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      addVisitor({
        visitorName,
        relationship,
        phone,
        studentName: user?.fullName || 'Sai Krishna Mohanty',
        studentId: user?.studentId || 'BPUT2026001',
        visitDate,
        expectedArrival,
        purpose
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Visitor Access Registration
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Submit pre-authorized visitor requests for parents, guardians, and external mentors
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Registration Form */}
        <div className="lg:col-span-5 campus-card">
          <div className="campus-card-header">
            <div>
              <h3 className="campus-card-title flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                Register New Visitor
              </h3>
              <p className="campus-card-subtitle">
                Approved passes are sent to Gate 1 security terminal for verified entry
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="form-label">Visitor Full Name</label>
              <input
                type="text"
                required
                value={visitorName}
                onChange={(e) => setVisitorName(e.target.value)}
                placeholder="e.g. Ramesh Mohanty"
                className="form-input"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="form-label">Relationship</label>
                <select
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="form-select"
                >
                  <option value="Father">Father</option>
                  <option value="Mother">Mother</option>
                  <option value="Guardian">Guardian</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Industry Mentor">Industry Mentor</option>
                  <option value="Academic Guest">Academic Guest</option>
                </select>
              </div>

              <div>
                <label className="form-label">Contact Phone</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43219"
                  className="form-input"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="form-label">Visit Date</label>
                <input
                  type="date"
                  required
                  value={visitDate}
                  onChange={(e) => setVisitDate(e.target.value)}
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Expected Arrival</label>
                <input
                  type="text"
                  required
                  value={expectedArrival}
                  onChange={(e) => setExpectedArrival(e.target.value)}
                  placeholder="03:30 PM"
                  className="form-input"
                />
              </div>
            </div>

            <div>
              <label className="form-label">Purpose of Visit</label>
              <textarea
                rows={2}
                required
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="e.g. Delivering essential study supplies"
                className="form-textarea"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full btn btn-primary py-2.5 shadow-md shadow-indigo-600/30"
            >
              <Send className="w-4 h-4" />
              {submitting ? 'Submitting...' : 'Register Visitor Pass'}
            </button>
          </form>
        </div>

        {/* Visitor Requests History */}
        <div className="lg:col-span-7 campus-card">
          <div className="campus-card-header">
            <div>
              <h3 className="campus-card-title">Authorized Visitors Log</h3>
              <p className="campus-card-subtitle">
                Synced in real-time with Warden Desk and Security Gate 1
              </p>
            </div>
            <span className="text-xs font-bold text-slate-400">Total: {visitors.length}</span>
          </div>

          <div className="space-y-3">
            {visitors.map((v) => (
              <div
                key={v.id}
                className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">
                        {v.id}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        {v.visitorName}
                      </h4>
                      <span className="text-[10px] font-semibold px-2 py-0.2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {v.relationship}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 italic">
                      "{v.purpose}"
                    </p>
                  </div>
                  <StatusBadge status={v.status} size="sm" />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span>Visit Date: <strong className="text-slate-700 dark:text-slate-300">{v.visitDate} ({v.expectedArrival})</strong></span>
                  <span>Contact: {v.phone}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorsPage;
