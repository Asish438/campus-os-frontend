import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import { useAuth } from '../../context/AuthContext';
import { aiApi } from '../../services/aiApi';
import StatusBadge from '../../components/common/StatusBadge';
import Timeline from '../../components/common/Timeline';
import Modal from '../../components/modals/Modal';
import {
  AlertTriangle,
  Sparkles,
  Send,
  Wrench,
  Clock,
  CheckCircle2,
  Upload,
  Info,
  ChevronRight,
  FileText,
  X,
  Paperclip,
  Image as ImageIcon
} from 'lucide-react';

export const ComplaintsPage = () => {
  const { user } = useAuth();
  const { complaints, addComplaint } = useCampus();

  // Form State
  const [description, setDescription] = useState('The tap in my bathroom has been leaking for four days.');
  const [category, setCategory] = useState('Plumbing');
  const [hostel, setHostel] = useState(user?.hostel || 'Aryabhatta Hall of Residence');
  const [block, setBlock] = useState(user?.block || 'Block-B');
  const [room, setRoom] = useState(user?.room || 'Room 304');
  const [priority, setPriority] = useState('High');

  // Attachment State
  const [attachedFile, setAttachedFile] = useState(null);
  const fileInputRef = React.useRef(null);

  // AI Classification state
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Selected complaint for timeline modal
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const sizeStr = file.size > 1024 * 1024
        ? (file.size / (1024 * 1024)).toFixed(1) + ' MB'
        : (file.size / 1024).toFixed(0) + ' KB';
      
      setAttachedFile({
        file,
        name: file.name,
        size: sizeStr,
        type: file.type || 'application/pdf',
        isPdf: file.name.toLowerCase().endsWith('.pdf') || file.type.includes('pdf'),
        isImage: file.type.startsWith('image/')
      });
    }
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setAttachedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Auto-run AI classification on blur or button click
  const handleAiClassify = async () => {
    if (!description.trim()) return;
    setAiAnalyzing(true);
    try {
      const res = await aiApi.classifyComplaint(description);
      setAiResult(res);
      setCategory(res.category);
      setPriority(res.priority);
    } catch (e) {
      console.error(e);
    } finally {
      setAiAnalyzing(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) return;
    setSubmitting(true);

    try {
      // If AI hasn't classified yet, classify first
      let cat = category;
      let pri = priority;
      let dept = 'Maintenance';

      if (!aiResult) {
        const res = await aiApi.classifyComplaint(description);
        cat = res.category;
        pri = res.priority;
        dept = res.department;
        setAiResult(res);
      } else {
        dept = aiResult.department;
      }

      const created = addComplaint({
        student: user?.fullName || 'Sai Krishna Mohanty',
        studentId: user?.studentId || 'BPUT2026001',
        hostel,
        block,
        room,
        description,
        category: cat,
        priority: pri,
        department: dept,
        photoPath: attachedFile?.name || null,
        assignedTo: aiResult?.recommendedAssignee || 'Maintenance Duty Team'
      });

      // Clear description and file attachment
      setDescription('');
      setAttachedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
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
            Hostel Maintenance & Grievances
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Powered by Campus OS AI Ticket Triage Engine • Instant Warden Dispatch
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Complaint Submission Form (5 spans) */}
        <div className="lg:col-span-5 campus-card space-y-4">
          <div className="campus-card-header">
            <div>
              <h3 className="campus-card-title flex items-center gap-2">
                <Wrench className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Log Maintenance Issue
              </h3>
              <p className="campus-card-subtitle">
                Enter details below. Campus OS will automatically triage category & priority.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="form-label mb-0">Describe the Issue</label>
                <button
                  type="button"
                  onClick={handleAiClassify}
                  disabled={aiAnalyzing || !description.trim()}
                  className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-cyan-500" />
                  {aiAnalyzing ? 'AI Triage Running...' : 'Trigger AI Auto-Classify'}
                </button>
              </div>
              <textarea
                rows={3}
                required
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setAiResult(null); // Reset when user modifies text
                }}
                onBlur={handleAiClassify}
                placeholder="e.g. The tap in my bathroom has been leaking for four days."
                className="form-textarea"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Demo Example: <em>"The tap in my bathroom has been leaking for four days."</em>
              </p>
            </div>

            {/* AI Classification Preview Card */}
            {(aiResult || aiAnalyzing) && (
              <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 animate-fade-in space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-blue-500" />
                    AI Triage Result
                  </span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-bold">
                    94% Confidence
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center pt-1">
                  <div className="p-2 rounded-lg bg-white/90 dark:bg-slate-900/80 border border-blue-100 dark:border-slate-800">
                    <p className="text-[9px] uppercase text-slate-400 font-bold">Category</p>
                    <p className="text-xs font-bold text-blue-600 dark:text-blue-400">
                      {aiResult ? aiResult.category : 'Detecting...'}
                    </p>
                  </div>
                  <div className="p-2 rounded-lg bg-white/90 dark:bg-slate-900/80 border border-blue-100 dark:border-slate-800">
                    <p className="text-[9px] uppercase text-slate-400 font-bold">Priority</p>
                    <p className="text-xs font-bold text-rose-600 dark:text-rose-400">
                      {aiResult ? aiResult.priority : 'Detecting...'}
                    </p>
                  </div>
                  <div className="p-2 rounded-lg bg-white/90 dark:bg-slate-900/80 border border-blue-100 dark:border-slate-800">
                    <p className="text-[9px] uppercase text-slate-400 font-bold">Department</p>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {aiResult ? aiResult.department : 'Estate Ops'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="form-label">Hostel</label>
                <input
                  type="text"
                  value={hostel}
                  onChange={(e) => setHostel(e.target.value)}
                  className="form-input"
                />
              </div>
              <div>
                <label className="form-label">Block & Room</label>
                <input
                  type="text"
                  value={`${block} • ${room}`}
                  onChange={(e) => setRoom(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="form-label">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="form-select"
                >
                  <option value="Plumbing">Plumbing</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Network / Wi-Fi">Network / Wi-Fi</option>
                  <option value="Carpentry & Furniture">Carpentry & Furniture</option>
                  <option value="Mess & Dining">Mess & Dining</option>
                  <option value="General Maintenance">General Maintenance</option>
                </select>
              </div>

              <div>
                <label className="form-label">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="form-select"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>
            </div>

            {/* Real File / Photo / PDF Attachment */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="form-label mb-0">Attachment (Photo / PDF Document)</label>
                {attachedFile && (
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="text-[11px] font-semibold text-rose-500 hover:underline flex items-center gap-0.5"
                  >
                    <X className="w-3 h-3" /> Remove
                  </button>
                )}
              </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*,.pdf,.doc,.docx"
                className="hidden"
              />

              {!attachedFile ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border border-dashed border-slate-300 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400 rounded-xl p-3.5 text-center text-slate-500 dark:text-slate-400 hover:bg-slate-50/60 dark:hover:bg-slate-800/40 cursor-pointer transition-all flex flex-col items-center justify-center gap-1.5"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                    <Upload className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">Click to upload</span> or drag and drop
                  </div>
                  <p className="text-[10px] text-slate-400">PDF, PNG, JPG, or DOC up to 10MB</p>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                      {attachedFile.isPdf ? (
                        <FileText className="w-4 h-4 text-rose-200" />
                      ) : (
                        <ImageIcon className="w-4 h-4 text-cyan-200" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                        {attachedFile.name}
                      </p>
                      <p className="text-[10px] text-slate-500 font-mono">
                        {attachedFile.size} • {attachedFile.isPdf ? 'PDF Document' : 'Image Attachment'}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full btn btn-primary py-2.5 shadow-md shadow-indigo-600/30"
            >
              <Send className="w-4 h-4" />
              {submitting ? 'Submitting & Dispatching...' : 'Submit Maintenance Ticket'}
            </button>
          </form>
        </div>

        {/* Right Column: Active & Past Complaints List (7 spans) */}
        <div className="lg:col-span-7 campus-card space-y-4">
          <div className="campus-card-header">
            <div>
              <h3 className="campus-card-title">Live Complaints Ledger</h3>
              <p className="campus-card-subtitle">
                Changes made by Warden in the Warden Portal update here automatically
              </p>
            </div>
            <span className="text-xs font-bold text-slate-400">
              Total: {complaints.length}
            </span>
          </div>

          <div className="space-y-3">
            {complaints.map((c) => (
              <div
                key={c.id}
                onClick={() => setSelectedComplaint(c)}
                className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-indigo-400/50 hover:shadow-sm cursor-pointer transition-all space-y-2.5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">
                        {c.id}
                      </span>
                      <span className="text-xs font-semibold px-2 py-0.2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {c.category}
                      </span>
                      <span className="text-[10px] font-bold text-rose-600 uppercase">
                        {c.priority} Priority
                      </span>
                      {c.photoPath && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900 flex items-center gap-1">
                          <Paperclip className="w-2.5 h-2.5" />
                          File
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                      {c.description}
                    </p>
                  </div>
                  <StatusBadge status={c.status} size="sm" />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                  <span>Room: {c.room} ({c.hostel})</span>
                  <span>Assigned: <strong className="text-slate-700 dark:text-slate-300">{c.assignedTo || 'AI Queued'}</strong></span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-0.5">
                    View Progress <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ticket Detail & Audit Timeline Modal */}
      {selectedComplaint && (
        <Modal
          isOpen={Boolean(selectedComplaint)}
          onClose={() => setSelectedComplaint(null)}
          title={`Ticket Audit History: ${selectedComplaint.id}`}
          subtitle={`${selectedComplaint.category} • ${selectedComplaint.room}`}
        >
          <div className="space-y-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-400">Status:</span>
                <StatusBadge status={selectedComplaint.status} />
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Department:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedComplaint.department}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Assigned Technician:</span>
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">{selectedComplaint.assignedTo}</span>
              </div>
              <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                <span className="text-slate-400">Description:</span>
                <p className="font-medium text-slate-800 dark:text-slate-200 mt-0.5 italic">
                  "{selectedComplaint.description}"
                </p>
              </div>

              {selectedComplaint.photoPath && (
                <div className="p-2.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300 font-semibold text-xs">
                    <Paperclip className="w-4 h-4 text-indigo-500" />
                    <span>Attached Document: <strong>{selectedComplaint.photoPath}</strong></span>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300">
                    Uploaded File
                  </span>
                </div>
              )}
            </div>

            <div>
              <h5 className="font-bold text-slate-800 dark:text-slate-200 mb-2 uppercase tracking-wider text-[10px]">
                Event Lifecycle Timeline
              </h5>
              <Timeline events={selectedComplaint.timeline || []} />
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedComplaint(null)}
                className="btn btn-secondary btn-sm"
              >
                Close Audit Record
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ComplaintsPage;
