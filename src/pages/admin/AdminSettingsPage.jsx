import React from 'react';
import { Sliders, Save, Shield, Database, Bell } from 'lucide-react';
import { useCampus } from '../../context/CampusContext';

export const AdminSettingsPage = () => {
  const { addToast } = useCampus();

  const handleSave = (e) => {
    e.preventDefault();
    addToast({
      title: 'Configuration Saved',
      message: 'System parameters updated across all campus instances.',
      type: 'success'
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Campus OS Global Configuration
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Thresholds, AI Agent Parameters & Integration Endpoints
        </p>
      </div>

      <div className="campus-card max-w-2xl">
        <form onSubmit={handleSave} className="space-y-5 text-xs">
          <div>
            <label className="form-label">Mandatory Attendance Threshold (%)</label>
            <input type="number" defaultValue={75} className="form-input" />
            <p className="text-[11px] text-slate-400 mt-1">Students falling below this trigger parent SMS alerts</p>
          </div>

          <div>
            <label className="form-label">AI Study Assistant Default Model</label>
            <select className="form-select" defaultValue="GPT-4o Campus Tuned">
              <option>GPT-4o Campus Tuned</option>
              <option>Claude 3.5 Sonnet Academic</option>
              <option>Gemini 1.5 Pro University Edition</option>
            </select>
          </div>

          <div>
            <label className="form-label">Hostel Night Curfew Time</label>
            <input type="text" defaultValue="09:30 PM" className="form-input" />
          </div>

          <div>
            <label className="form-label">Spring Boot Backend API Gateway URL</label>
            <input type="text" defaultValue="http://localhost:8080/api" className="form-input font-mono" />
          </div>

          <div className="pt-2">
            <button type="submit" className="btn btn-primary py-2.5">
              <Save className="w-4 h-4" /> Save Global Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
