import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AdPlatform, AdObjective, CreativeFormat, MetaCampaign } from '../../types';
import { Modal } from '../common/Modal';
import { 
  FiLayers, 
  FiDollarSign, 
  FiTarget, 
  FiImage, 
  FiUserCheck, 
  FiCheck,
  FiVideo
} from 'react-icons/fi';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

interface CampaignCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CampaignCreateModal: React.FC<CampaignCreateModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { addCampaign, users, currentUser } = useApp();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form fields
  const [name, setName] = useState('');
  const [code, setCode] = useState(`FB-IG-CAMP-${Math.floor(1000 + Math.random() * 9000)}`);
  const [platform, setPlatform] = useState<AdPlatform>('both');
  const [objective, setObjective] = useState<AdObjective>('LEAD_GENERATION');
  const [dailyBudget, setDailyBudget] = useState<number>(25000);
  const [totalBudget, setTotalBudget] = useState<number>(750000);
  const [assignedAdminId, setAssignedAdminId] = useState<string>(
    users.find(u => u.role === 'admin')?.id || users[0]?.id || ''
  );
  
  // Creative fields
  const [headline, setHeadline] = useState('');
  const [primaryText, setPrimaryText] = useState('');
  const [callToAction, setCallToAction] = useState<MetaCampaign['creative']['callToAction']>('SIGN_UP');
  const [format, setFormat] = useState<CreativeFormat>('FEED_POST');
  const [mediaUrl, setMediaUrl] = useState('https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=80');
  const [formName, setFormName] = useState('Enterprise_LeadCapture_InstantForm');
  const [targetUrl, setTargetUrl] = useState('https://apexmeta.io/demo');
  
  // Audience
  const [ageRange, setAgeRange] = useState('25-54');
  const [locations, setLocations] = useState('United States, Canada, United Kingdom');
  const [interests, setInterests] = useState('Enterprise SaaS, Digital Marketing, B2B Growth');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addCampaign({
      name,
      code,
      platform,
      objective,
      status: 'ACTIVE',
      dailyBudget: Number(dailyBudget),
      totalBudget: Number(totalBudget),
      assignedAdminId: assignedAdminId || currentUser.id,
      creative: {
        headline: headline || `${name} - Official Promotion`,
        primaryText: primaryText || 'Unlock industry-leading marketing acceleration with our enterprise platform.',
        callToAction,
        mediaUrl: mediaUrl || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
        mediaType: format === 'REELS_VIDEO' ? 'video' : 'image',
        format,
        targetUrl,
        formName: objective === 'LEAD_GENERATION' ? formName : undefined
      },
      targetAudience: {
        ageRange,
        locations: locations.split(',').map(l => l.trim()),
        interests: interests.split(',').map(i => i.trim()),
      },
      startDate: new Date().toISOString().split('T')[0],
      pixelId: 'px_889201948'
    });

    onClose();
    // Reset
    setName('');
    setStep(1);
  };

  const adminOptions = users.filter(u => u.status === 'active');

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Meta Ad Campaign (FB & Instagram)"
      subtitle="Configure objective, assign managing Admin, and preview live ad creatives."
      maxWidth="3xl"
      icon={FiLayers}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step Indicator */}
        <div className="grid grid-cols-4 gap-2 pb-4 border-b border-navy-750 text-center text-xs">
          <button
            type="button"
            onClick={() => setStep(1)}
            className={`p-2 rounded-lg font-medium transition-all ${
              step === 1 ? 'bg-brand-600 text-white font-semibold' : 'bg-navy-800 text-slate-400'
            }`}
          >
            1. Objective & Platform
          </button>
          <button
            type="button"
            onClick={() => setStep(2)}
            className={`p-2 rounded-lg font-medium transition-all ${
              step === 2 ? 'bg-brand-600 text-white font-semibold' : 'bg-navy-800 text-slate-400'
            }`}
          >
            2. Budget & Admin
          </button>
          <button
            type="button"
            onClick={() => setStep(3)}
            className={`p-2 rounded-lg font-medium transition-all ${
              step === 3 ? 'bg-brand-600 text-white font-semibold' : 'bg-navy-800 text-slate-400'
            }`}
          >
            3. Creative Copy
          </button>
          <button
            type="button"
            onClick={() => setStep(4)}
            className={`p-2 rounded-lg font-medium transition-all ${
              step === 4 ? 'bg-brand-600 text-white font-semibold' : 'bg-navy-800 text-slate-400'
            }`}
          >
            4. Audience & Launch
          </button>
        </div>

        {/* STEP 1: Objective & Platform */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Campaign Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Q4 High-Ticket B2B Lead Engine"
                className="w-full px-3.5 py-2.5 rounded-lg bg-navy-800 border border-navy-700 text-slate-100 text-sm focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Meta Campaign Objective
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => {
                    setObjective('LEAD_GENERATION');
                    setFormat('FEED_POST');
                  }}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    objective === 'LEAD_GENERATION'
                      ? 'bg-brand-600/15 border-brand-500 text-white'
                      : 'bg-navy-800/80 border-navy-700 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <p className="font-semibold text-sm flex items-center justify-between">
                    🎯 Lead Generation Ads
                    {objective === 'LEAD_GENERATION' && <FiCheck className="text-brand-400" />}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Meta Instant Qualification Forms with real-time CRM webhook sync.
                  </p>
                </div>

                <div
                  onClick={() => {
                    setObjective('STORIES_REELS');
                    setFormat('REELS_VIDEO');
                  }}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    objective === 'STORIES_REELS'
                      ? 'bg-brand-600/15 border-brand-500 text-white'
                      : 'bg-navy-800/80 border-navy-700 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <p className="font-semibold text-sm flex items-center justify-between">
                    📱 Instagram Stories & Reels
                    {objective === 'STORIES_REELS' && <FiCheck className="text-brand-400" />}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Full-screen vertical video placements for viral reach and high engagement.
                  </p>
                </div>

                <div
                  onClick={() => setObjective('CONVERSIONS')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    objective === 'CONVERSIONS'
                      ? 'bg-brand-600/15 border-brand-500 text-white'
                      : 'bg-navy-800/80 border-navy-700 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <p className="font-semibold text-sm flex items-center justify-between">
                    ⚡ Conversion / Sales Ads
                    {objective === 'CONVERSIONS' && <FiCheck className="text-brand-400" />}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Optimize for CAPI purchase events, booking demos, and checkout value.
                  </p>
                </div>

                <div
                  onClick={() => setObjective('TRAFFIC')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    objective === 'TRAFFIC'
                      ? 'bg-brand-600/15 border-brand-500 text-white'
                      : 'bg-navy-800/80 border-navy-700 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <p className="font-semibold text-sm flex items-center justify-between">
                    🔗 Traffic & Click Ads
                    {objective === 'TRAFFIC' && <FiCheck className="text-brand-400" />}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Drive high volumes of targeted link clicks to custom sales landing pages.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Target Platform Placement
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPlatform('both')}
                  className={`p-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-2 ${
                    platform === 'both'
                      ? 'bg-brand-600 text-white border-brand-500'
                      : 'bg-navy-800 text-slate-300 border-navy-700'
                  }`}
                >
                  <FaFacebook className="w-4 h-4" /> + <FaInstagram className="w-4 h-4" />
                  <span>Meta Omnichannel</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPlatform('facebook')}
                  className={`p-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-2 ${
                    platform === 'facebook'
                      ? 'bg-blue-600 text-white border-blue-500'
                      : 'bg-navy-800 text-slate-300 border-navy-700'
                  }`}
                >
                  <FaFacebook className="w-4 h-4" />
                  <span>Facebook Only</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPlatform('instagram')}
                  className={`p-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-2 ${
                    platform === 'instagram'
                      ? 'bg-pink-600 text-white border-pink-500'
                      : 'bg-navy-800 text-slate-300 border-navy-700'
                  }`}
                >
                  <FaInstagram className="w-4 h-4" />
                  <span>Instagram Only</span>
                </button>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-md"
              >
                Next: Budget & Admin Assignment →
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Budget & Admin Assignment */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Daily Budget (₹ INR) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 text-sm">₹</span>
                  <input
                    type="number"
                    min="100"
                    required
                    value={dailyBudget}
                    onChange={e => setDailyBudget(Number(e.target.value))}
                    className="w-full pl-8 pr-3.5 py-2 rounded-lg bg-navy-800 border border-navy-700 text-slate-100 text-sm font-mono focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Total Campaign Budget (₹ INR) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 text-sm">₹</span>
                  <input
                    type="number"
                    min="1000"
                    required
                    value={totalBudget}
                    onChange={e => setTotalBudget(Number(e.target.value))}
                    className="w-full pl-8 pr-3.5 py-2 rounded-lg bg-navy-800 border border-navy-700 text-slate-100 text-sm font-mono focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>
            </div>

            {/* Admin Assignment (Super Admin chooses who manages this campaign) */}
            <div className="p-4 rounded-xl bg-navy-850 border border-navy-700">
              <label className="block text-xs font-semibold text-slate-200 mb-2">
                👑 Assign Managing Admin (Role Scoping)
              </label>
              <p className="text-[11px] text-slate-400 mb-3">
                When assigned, only this Admin (and SuperAdmin) can view, manage, and receive leads from this campaign.
              </p>

              <div className="space-y-2">
                {adminOptions.map(admin => (
                  <div
                    key={admin.id}
                    onClick={() => setAssignedAdminId(admin.id)}
                    className={`p-3 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
                      assignedAdminId === admin.id
                        ? 'bg-brand-600/20 border-brand-500 text-white'
                        : 'bg-navy-800/80 border-navy-750 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={admin.avatar}
                        alt={admin.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-xs text-slate-100">{admin.name}</p>
                        <p className="text-[10px] text-slate-400">{admin.title}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-navy-900 border border-navy-700 font-mono text-slate-300">
                        {admin.role === 'super_admin' ? 'Global SuperAdmin' : 'Admin'}
                      </span>
                      {assignedAdminId === admin.id && (
                        <FiCheck className="w-4 h-4 text-brand-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 rounded-lg bg-navy-800 hover:bg-navy-750 text-slate-300 text-xs font-medium"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-5 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-md"
              >
                Next: Creative Copy & Format →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Creative Copy & Format */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Ad Headline *
              </label>
              <input
                type="text"
                value={headline}
                onChange={e => setHeadline(e.target.value)}
                placeholder="e.g. Scale Pipeline by 3x with AI Lead Routing"
                className="w-full px-3.5 py-2 rounded-lg bg-navy-800 border border-navy-700 text-slate-100 text-sm focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Primary Ad Copy / Caption *
              </label>
              <textarea
                rows={3}
                value={primaryText}
                onChange={e => setPrimaryText(e.target.value)}
                placeholder="Describe value proposition, social proof, and reasons to take action..."
                className="w-full px-3.5 py-2 rounded-lg bg-navy-800 border border-navy-700 text-slate-100 text-xs focus:outline-none focus:border-brand-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Call-To-Action (CTA)
                </label>
                <select
                  value={callToAction}
                  onChange={e => setCallToAction(e.target.value as any)}
                  className="w-full px-3.5 py-2 rounded-lg bg-navy-800 border border-navy-700 text-slate-100 text-xs focus:outline-none focus:border-brand-500"
                >
                  <option value="SIGN_UP">Sign Up</option>
                  <option value="LEARN_MORE">Learn More</option>
                  <option value="APPLY_NOW">Apply Now</option>
                  <option value="GET_QUOTE">Get Quote</option>
                  <option value="BOOK_NOW">Book Now</option>
                  <option value="CONTACT_US">Contact Us</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Creative Format
                </label>
                <select
                  value={format}
                  onChange={e => setFormat(e.target.value as any)}
                  className="w-full px-3.5 py-2 rounded-lg bg-navy-800 border border-navy-700 text-slate-100 text-xs focus:outline-none focus:border-brand-500"
                >
                  <option value="FEED_POST">Single Image Feed Post</option>
                  <option value="REELS_VIDEO">Vertical 9:16 Reels Video</option>
                  <option value="STORY_CARD">Instagram Story Card</option>
                  <option value="CAROUSEL">Multi-Card Carousel</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Creative Asset URL (Unsplash or CDN)
              </label>
              <input
                type="url"
                value={mediaUrl}
                onChange={e => setMediaUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-3.5 py-2 rounded-lg bg-navy-800 border border-navy-700 text-slate-100 text-xs font-mono focus:outline-none focus:border-brand-500"
              />
            </div>

            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2 rounded-lg bg-navy-800 hover:bg-navy-750 text-slate-300 text-xs font-medium"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={() => setStep(4)}
                className="px-5 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-md"
              >
                Next: Audience & Launch →
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Audience & Launch */}
        {step === 4 && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-navy-850 border border-navy-700 space-y-3">
              <h4 className="font-semibold text-slate-200 text-sm">Audience Targeting Parameters</h4>
              
              <div>
                <label className="block text-xs text-slate-400 mb-1">Target Locations (Comma-separated)</label>
                <input
                  type="text"
                  value={locations}
                  onChange={e => setLocations(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-navy-800 border border-navy-700 text-slate-200 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Target Interests & Demographics</label>
                <input
                  type="text"
                  value={interests}
                  onChange={e => setInterests(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-navy-800 border border-navy-700 text-slate-200 text-xs"
                />
              </div>
            </div>

            {/* Pre-launch Summary */}
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-xs space-y-2">
              <p className="font-semibold text-emerald-300 flex items-center gap-2">
                <FiCheck className="w-4 h-4" /> Ready to publish to Meta Business Manager
              </p>
              <p className="text-slate-300 text-[11px]">
                Ad Campaign <strong className="text-white">{name || 'New Campaign'}</strong> will go live with a daily budget of <strong className="text-white">₹{dailyBudget.toLocaleString('en-IN')}/day</strong>. Assigned Admin will receive real-time webhook telemetry.
              </p>
            </div>

            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-4 py-2 rounded-lg bg-navy-800 hover:bg-navy-750 text-slate-300 text-xs font-medium"
              >
                ← Back
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 flex items-center gap-2"
              >
                <FiLayers className="w-4 h-4" />
                <span>Publish Campaign to Meta</span>
              </button>
            </div>
          </div>
        )}
      </form>
    </Modal>
  );
};
