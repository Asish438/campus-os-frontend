import React from 'react';
import { MetaCampaign } from '../../types';
import { Modal } from '../common/Modal';
import { 
  FiHeart, 
  FiMessageCircle, 
  FiSend, 
  FiBookmark, 
  FiMoreHorizontal, 
  FiGlobe, 
  FiExternalLink,
  FiMusic,
  FiVolume2
} from 'react-icons/fi';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

interface CreativePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: MetaCampaign | null;
}

export const CreativePreviewModal: React.FC<CreativePreviewModalProps> = ({
  isOpen,
  onClose,
  campaign,
}) => {
  if (!campaign) return null;

  const { creative, platform, name, objective } = campaign;
  const isInstagram = platform === 'instagram' || creative.format === 'REELS_VIDEO' || creative.format === 'STORY_CARD';
  const isReels = creative.format === 'REELS_VIDEO';
  const isStory = creative.format === 'STORY_CARD';

  const ctaTextMap = {
    LEARN_MORE: 'Learn More',
    SIGN_UP: 'Sign Up',
    APPLY_NOW: 'Apply Now',
    GET_QUOTE: 'Get Quote',
    CONTACT_US: 'Contact Us',
    BOOK_NOW: 'Book Now',
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Meta Creative Visualizer & Asset Inspector"
      subtitle={`Placement: ${isReels ? 'Instagram Reels 9:16' : isStory ? 'Instagram Stories' : isInstagram ? 'Instagram Feed' : 'Facebook Mobile Feed'} • Ad Code: ${campaign.code}`}
      maxWidth="3xl"
      icon={isInstagram ? FaInstagram : FaFacebook}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Side: Mock Device / Ad Frame */}
        <div className="lg:col-span-7 flex justify-center">
          {isReels ? (
            /* Instagram Reels Phone Mockup */
            <div className="w-[280px] sm:w-[300px] rounded-[30px] bg-black border-[5px] border-slate-700/80 shadow-2xl overflow-hidden relative text-white flex flex-col justify-between h-[490px]">
              {/* Top status bar */}
              <div className="absolute top-2 left-0 right-0 z-20 px-4 flex justify-between items-center text-[10px] font-semibold text-white/80">
                <span>9:41</span>
                <span className="bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-semibold">
                  Sponsored
                </span>
                <span>5G</span>
              </div>

              {/* Background Media */}
              <img
                src={creative.mediaUrl}
                alt="Reels Media"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/90" />

              {/* Right Action Rail */}
              <div className="absolute right-3 bottom-20 flex flex-col items-center gap-3.5 z-20">
                <button className="flex flex-col items-center gap-0.5">
                  <div className="p-2 rounded-full bg-black/40 backdrop-blur-md">
                    <FiHeart className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-[10px] font-mono">14.8k</span>
                </button>
                <button className="flex flex-col items-center gap-0.5">
                  <div className="p-2 rounded-full bg-black/40 backdrop-blur-md">
                    <FiMessageCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-[10px] font-mono">382</span>
                </button>
                <button className="p-2 rounded-full bg-black/40 backdrop-blur-md">
                  <FiSend className="w-4 h-4 text-white" />
                </button>
                <button className="p-2 rounded-full bg-black/40 backdrop-blur-md">
                  <FiMoreHorizontal className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Bottom Details Overlay */}
              <div className="relative z-20 mt-auto p-3.5 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-[1.5px]">
                    <div className="w-full h-full bg-black rounded-full flex items-center justify-center text-[9px] font-bold">
                      MG
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-xs">meridiangrowth</span>
                      <span className="text-[9px] text-white/80 bg-white/20 px-1 rounded">Sponsored</span>
                    </div>
                    <p className="text-[10px] text-white/70 flex items-center gap-1">
                      <FiMusic className="w-2.5 h-2.5" /> Original Audio
                    </p>
                  </div>
                </div>

                <p className="text-[11px] text-white/90 line-clamp-2 leading-relaxed">
                  {creative.primaryText}
                </p>

                {/* Call to action pill */}
                <div className="pt-0.5">
                  <div className="w-full py-1.5 px-3 rounded-lg bg-white hover:bg-slate-100 text-navy-950 font-bold text-xs flex items-center justify-between shadow-lg cursor-pointer transition-colors">
                    <span>{ctaTextMap[creative.callToAction]}</span>
                    <FiExternalLink className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Facebook / Instagram Feed Post Mockup */
            <div className="w-full max-w-[340px] bg-navy-950 border border-navy-750 rounded-xl overflow-hidden shadow-2xl text-slate-100 text-xs">
              {/* Sponsor Header */}
              <div className="p-3 flex items-center justify-between border-b border-navy-850 bg-navy-900/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-brand-600 flex items-center justify-center font-bold text-xs text-white">
                    MG
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-slate-100">Meridian Growth</span>
                      {isInstagram ? (
                        <FaInstagram className="w-3 h-3 text-pink-400" />
                      ) : (
                        <FaFacebook className="w-3 h-3 text-blue-400" />
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400 flex items-center gap-1">
                      <span>Sponsored</span>
                      <span>•</span>
                      <FiGlobe className="w-2.5 h-2.5" />
                    </p>
                  </div>
                </div>
                <FiMoreHorizontal className="w-4 h-4 text-slate-400" />
              </div>

              {/* Primary Copy */}
              <div className="p-3 text-slate-200 text-[11px] leading-relaxed">
                {creative.primaryText}
              </div>

              {/* Media Image */}
              <div className="relative aspect-video w-full bg-slate-950 overflow-hidden">
                <img
                  src={creative.mediaUrl}
                  alt="Ad Creative"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Link CTA Banner */}
              <div className="p-3 bg-navy-900 border-t border-navy-850 flex items-center justify-between">
                <div className="flex-1 pr-2">
                  <span className="text-[9px] uppercase tracking-wider text-slate-400 font-mono">
                    meridiangrowth.io
                  </span>
                  <p className="font-semibold text-slate-100 text-xs truncate mt-0.5">
                    {creative.headline}
                  </p>
                </div>
                <button className="px-3 py-1.5 rounded bg-brand-600 hover:bg-brand-500 text-white text-[11px] font-semibold shrink-0">
                  {ctaTextMap[creative.callToAction]}
                </button>
              </div>

              {/* Reactions */}
              <div className="px-3 py-2 border-t border-navy-850 text-[10px] text-slate-400 flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <span>👍 1,420 Reactions</span>
                </span>
                <span>184 Comments • 92 Shares</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Specifications & Targeting Parameters */}
        <div className="lg:col-span-5 space-y-3 text-xs">
          <div className="p-3.5 rounded-lg bg-navy-850 border border-navy-750 space-y-2.5">
            <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider">
              Ad Set Specifications
            </h4>
            
            <div className="space-y-1.5 text-slate-300">
              <div className="flex justify-between py-1 border-b border-navy-800">
                <span className="text-slate-400">Objective</span>
                <span className="font-mono text-sky-400 font-semibold">{objective}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-navy-800">
                <span className="text-slate-400">Platform Placement</span>
                <span className="font-semibold capitalize text-slate-200">{platform}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-navy-800">
                <span className="text-slate-400">Call to Action</span>
                <span className="font-mono text-amber-400">{ctaTextMap[creative.callToAction]}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-navy-800">
                <span className="text-slate-400">Daily Pacing</span>
                <span className="font-mono font-bold text-slate-100">${campaign.dailyBudget}/day</span>
              </div>

              <div className="flex justify-between py-1">
                <span className="text-slate-400">Est. Acquisition CPL</span>
                <span className="font-mono font-bold text-emerald-400">${campaign.cpl.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-navy-850 border border-navy-750 space-y-2">
            <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider">
              Target Audience
            </h4>
            <div className="text-[11px] text-slate-400 space-y-1">
              <p><strong className="text-slate-300">Age:</strong> {campaign.targetAudience.ageRange}</p>
              <p><strong className="text-slate-300">Locations:</strong> {campaign.targetAudience.locations.join(', ')}</p>
              <div>
                <strong className="text-slate-300">Interests:</strong>
                <div className="flex flex-wrap gap-1 mt-1">
                  {campaign.targetAudience.interests.map((interest, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-navy-800 text-slate-300 text-[10px]">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-1">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg bg-navy-800 hover:bg-navy-750 text-slate-200 text-xs font-semibold border border-navy-700"
            >
              Close Inspector
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
