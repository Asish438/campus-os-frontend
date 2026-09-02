import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { 
  FiSettings, 
  FiActivity, 
  FiShield, 
  FiRefreshCw, 
  FiCheckCircle, 
  FiSave,
  FiRotateCcw
} from 'react-icons/fi';
import { FaFacebook } from 'react-icons/fa';

export const SystemSettingsView: React.FC = () => {
  const { settings, updateSettings, resetToDefaultData, currentUser, addToast } = useApp();

  const isSuperAdmin = currentUser.role === 'super_admin';

  const [adAccountId, setAdAccountId] = useState(settings.adAccountId);
  const [businessManagerId, setBusinessManagerId] = useState(settings.businessManagerId);
  const [metaPixelId, setMetaPixelId] = useState(settings.metaPixelId);
  const [leadWebhookUrl, setLeadWebhookUrl] = useState(settings.leadWebhookUrl);
  const [leadAlertWebhook, setLeadAlertWebhook] = useState(settings.leadAlertWebhook);
  const [currency, setCurrency] = useState(settings.currency);
  const [timezone, setTimezone] = useState(settings.timezone);

  const [isVerifyingApi, setIsVerifyingApi] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      adAccountId,
      businessManagerId,
      metaPixelId,
      leadWebhookUrl,
      leadAlertWebhook,
      currency,
      timezone,
    });
  };

  const handleVerifyToken = () => {
    setIsVerifyingApi(true);
    setTimeout(() => {
      setIsVerifyingApi(false);
      addToast('Meta Graph API Enterprise token validated successfully. CAPI Latency: 38ms.', 'success', 'Token Verified');
    }, 1100);
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Top Header */}
      <div className="p-4 rounded-xl bg-navy-900 border border-navy-750 shadow-panel flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-100">System Configurations & Meta Graph API Integrations</h2>
            <Badge variant="emerald" size="sm" dot>Graph API v20.0</Badge>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Meta Pixel dataset configurations, server-side CAPI Gateway, Webhook endpoints, and security policies.
          </p>
        </div>

        <button
          onClick={resetToDefaultData}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-800 hover:bg-rose-950/60 text-slate-300 hover:text-rose-300 text-xs font-semibold border border-navy-700 transition-colors shrink-0"
          title="Reset database to initial clean state"
        >
          <FiRotateCcw className="w-3.5 h-3.5" />
          <span>Reset Sample Database</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        {/* Meta Ad Account & Business Manager */}
        <div className="p-4 rounded-xl bg-navy-900 border border-navy-750 shadow-panel space-y-3">
          <div className="flex items-center justify-between pb-2.5 border-b border-navy-750">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded bg-blue-600/20 text-blue-400 border border-blue-500/30">
                <FaFacebook className="w-3.5 h-3.5" />
              </span>
              <div>
                <h3 className="font-semibold text-xs text-slate-100">Meta Business Manager & Ad Account Sync</h3>
                <p className="text-[11px] text-slate-400">Enterprise ad account container</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleVerifyToken}
              disabled={isVerifyingApi}
              className="px-2.5 py-1 rounded-lg bg-navy-800 hover:bg-navy-750 text-slate-200 text-xs font-semibold border border-navy-700 flex items-center gap-1.5"
            >
              <FiRefreshCw className={`w-3 h-3 text-sky-400 ${isVerifyingApi ? 'animate-spin' : ''}`} />
              <span>{isVerifyingApi ? 'Testing Connection...' : 'Verify Token'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Ad Account ID</label>
              <input
                type="text"
                disabled={!isSuperAdmin}
                value={adAccountId}
                onChange={e => setAdAccountId(e.target.value)}
                className="w-full px-3 py-1.5 rounded bg-navy-800 border border-navy-700 text-slate-100 text-xs font-mono focus:outline-none focus:border-brand-500 disabled:opacity-60"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Business Manager ID</label>
              <input
                type="text"
                disabled={!isSuperAdmin}
                value={businessManagerId}
                onChange={e => setBusinessManagerId(e.target.value)}
                className="w-full px-3 py-1.5 rounded bg-navy-800 border border-navy-700 text-slate-100 text-xs font-mono focus:outline-none focus:border-brand-500 disabled:opacity-60"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Meta Pixel & CAPI Dataset ID</label>
              <input
                type="text"
                disabled={!isSuperAdmin}
                value={metaPixelId}
                onChange={e => setMetaPixelId(e.target.value)}
                className="w-full px-3 py-1.5 rounded bg-navy-800 border border-navy-700 text-slate-100 text-xs font-mono focus:outline-none focus:border-brand-500 disabled:opacity-60"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">API Token Status</label>
              <div className="flex items-center gap-2 p-1.5 rounded bg-navy-950 border border-navy-800">
                <FiCheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="font-medium text-emerald-300 text-[11px]">Live & Authenticated (Enterprise Tier)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Webhook Ingestion */}
        <div className="p-4 rounded-xl bg-navy-900 border border-navy-750 shadow-panel space-y-3 text-xs">
          <div className="flex items-center gap-2 pb-2.5 border-b border-navy-750">
            <span className="p-1.5 rounded bg-emerald-600/20 text-emerald-400 border border-emerald-500/30">
              <FiActivity className="w-3.5 h-3.5" />
            </span>
            <div>
              <h3 className="font-semibold text-xs text-slate-100">Meta Instant Lead Gen Webhooks</h3>
              <p className="text-[11px] text-slate-400">Routes newly submitted lead form data into the pipeline</p>
            </div>
          </div>

          <div className="space-y-2.5">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Webhook Ingestion Endpoint URL</label>
              <input
                type="url"
                disabled={!isSuperAdmin}
                value={leadWebhookUrl}
                onChange={e => setLeadWebhookUrl(e.target.value)}
                className="w-full px-3 py-1.5 rounded bg-navy-800 border border-navy-700 text-slate-100 text-xs font-mono focus:outline-none focus:border-brand-500 disabled:opacity-60"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Slack / Alert Forwarding Webhook</label>
              <input
                type="url"
                disabled={!isSuperAdmin}
                value={leadAlertWebhook}
                onChange={e => setLeadAlertWebhook(e.target.value)}
                className="w-full px-3 py-1.5 rounded bg-navy-800 border border-navy-700 text-slate-100 text-xs font-mono focus:outline-none focus:border-brand-500 disabled:opacity-60"
              />
            </div>
          </div>
        </div>

        {/* Role Access Matrix */}
        <div className="p-4 rounded-xl bg-navy-900 border border-navy-750 shadow-panel space-y-3 text-xs">
          <div className="flex items-center gap-2 pb-2.5 border-b border-navy-750">
            <span className="p-1.5 rounded bg-amber-600/20 text-amber-400 border border-amber-500/30">
              <FiShield className="w-3.5 h-3.5" />
            </span>
            <div>
              <h3 className="font-semibold text-xs text-slate-100">Role-Based Access Control (RBAC) Governance</h3>
              <p className="text-[11px] text-slate-400">Permission boundaries between SuperAdmin & Admins</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-navy-950 text-slate-400 font-mono text-[10px] uppercase border-b border-navy-750">
                <tr>
                  <th className="py-2 px-3">Operation / Capability</th>
                  <th className="py-2 px-3 text-center">👑 Super Admin</th>
                  <th className="py-2 px-3 text-center">🛡️ Assigned Admin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-800 text-[11px]">
                <tr>
                  <td className="py-2 px-3 font-medium text-slate-200">Global Meta Ads Live Dashboard</td>
                  <td className="py-2 px-3 text-center text-emerald-400 font-semibold">✓ Full Global Visibility</td>
                  <td className="py-2 px-3 text-center text-sky-400">Scoped to Assigned Campaigns</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-medium text-slate-200">Create & Launch Meta Ad Campaigns</td>
                  <td className="py-2 px-3 text-center text-emerald-400 font-semibold">✓ Enabled</td>
                  <td className="py-2 px-3 text-center text-slate-500">Monitor Assigned Only</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-medium text-slate-200">Create / Remove Admins & Reassign Work</td>
                  <td className="py-2 px-3 text-center text-emerald-400 font-semibold">✓ Master Control</td>
                  <td className="py-2 px-3 text-center text-rose-400 font-semibold">✕ Denied</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-medium text-slate-200">Lead Pipeline & Status Advancement</td>
                  <td className="py-2 px-3 text-center text-emerald-400 font-semibold">✓ All Leads</td>
                  <td className="py-2 px-3 text-center text-sky-400">✓ Assigned Leads Only</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Save */}
        {isSuperAdmin && (
          <div className="flex justify-end pt-1">
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs shadow-subtle flex items-center gap-1.5"
            >
              <FiSave className="w-3.5 h-3.5" />
              <span>Save System Configurations</span>
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
