import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCampus } from '../../context/CampusContext';
import {
  Camera,
  Upload,
  Image as ImageIcon,
  Sparkles,
  X,
  Check,
  RefreshCw,
  Trash2,
  Sliders,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

export const ProfilePhotoModal = ({ isOpen, onClose }) => {
  const { user, updateUserProfile } = useAuth();
  const { addToast } = useCampus();

  const [activeTab, setActiveTab] = useState('camera'); // 'camera' | 'upload'
  const [streamActive, setStreamActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || null);
  const [isCapturingFlash, setIsCapturingFlash] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const streamRef = useRef(null);

  // Stop camera stream helper
  const stopCameraStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setStreamActive(false);
  };

  // Start live webcam stream
  const startCameraStream = async () => {
    setCameraError(null);
    setCapturedImage(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera access is not supported on this browser/environment.');
      }
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 640 }, facingMode: 'user' },
        audio: false
      });
      streamRef.current = mediaStream;
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }
      setStreamActive(true);
    } catch (err) {
      console.warn('[Camera] Stream error:', err);
      setCameraError(err.message || 'Could not access webcam. Please check permissions or upload your photo file.');
      setStreamActive(false);
    }
  };

  useEffect(() => {
    if (isOpen && activeTab === 'camera') {
      startCameraStream();
    } else {
      stopCameraStream();
    }
    return () => {
      stopCameraStream();
    };
  }, [isOpen, activeTab]);

  if (!isOpen) return null;

  // Take snapshot from video element
  const handleCapturePhoto = () => {
    if (!videoRef.current) return;
    setIsCapturingFlash(true);

    const video = videoRef.current;
    const canvas = canvasRef.current || document.createElement('canvas');
    canvas.width = video.videoWidth || 480;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext('2d');
    // Mirror image for natural selfie feel
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    setCapturedImage(dataUrl);
    setSelectedAvatar(dataUrl);
    stopCameraStream();

    setTimeout(() => {
      setIsCapturingFlash(false);
    }, 250);
  };

  // Handle local file upload
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      addToast({
        title: 'Invalid File Type',
        message: 'Please select a valid image file (PNG, JPG, JPEG, WEBP).',
        type: 'warning'
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (result) {
        setSelectedAvatar(result);
        setCapturedImage(result);
        addToast({
          title: 'Photo Selected',
          message: 'Your photo is loaded. Click Save to set as your profile picture.',
          type: 'info'
        });
      }
    };
    reader.readAsDataURL(file);
  };

  // Save changes
  const handleSaveProfilePhoto = () => {
    if (updateUserProfile) {
      updateUserProfile({ avatar: selectedAvatar });
    }
    addToast({
      title: 'Profile Photo Set Successfully',
      message: 'Your personal photo is now live on your student profile & dashboard.',
      type: 'success'
    });
    stopCameraStream();
    onClose();
  };

  // Clear / remove photo
  const handleRemovePhoto = () => {
    setSelectedAvatar(null);
    setCapturedImage(null);
    if (updateUserProfile) {
      updateUserProfile({ avatar: null });
    }
    addToast({
      title: 'Profile Photo Reset',
      message: 'Reverted to empty camera interface.',
      type: 'info'
    });
    stopCameraStream();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 relative space-y-5 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Add Your Profile Photo
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Capture live with your Camera or upload your own picture
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              stopCameraStream();
              onClose();
            }}
            className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex rounded-2xl bg-slate-100 dark:bg-slate-800 p-1 text-xs font-bold text-slate-600 dark:text-slate-300">
          <button
            onClick={() => setActiveTab('camera')}
            className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'camera'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Take Photo (Camera)</span>
          </button>

          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'upload'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Upload From Device</span>
          </button>
        </div>

        {/* TAB 1: LIVE WEBCAM CAMERA */}
        {activeTab === 'camera' && (
          <div className="space-y-4">
            <div className="relative w-64 h-64 mx-auto rounded-3xl overflow-hidden bg-slate-950 border-4 border-indigo-500/30 shadow-xl flex items-center justify-center">
              {/* Shutter flash effect */}
              {isCapturingFlash && (
                <div className="absolute inset-0 bg-white z-30 animate-ping opacity-90" />
              )}

              {capturedImage ? (
                <img
                  src={capturedImage}
                  alt="Captured"
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover transform -scale-x-100"
                />
              )}

              {/* Viewfinder Circular Outline */}
              <div className="absolute inset-4 rounded-full border-2 border-dashed border-white/40 pointer-events-none" />

              {/* Camera Error / No permission state */}
              {cameraError && (
                <div className="absolute inset-0 p-4 bg-slate-950/90 flex flex-col items-center justify-center text-center text-xs text-rose-400 space-y-2">
                  <Camera className="w-8 h-8 opacity-60" />
                  <p className="font-semibold">{cameraError}</p>
                  <button
                    onClick={startCameraStream}
                    className="btn btn-secondary btn-xs mt-2"
                  >
                    Retry Camera
                  </button>
                </div>
              )}
            </div>

            {/* Hidden canvas for snapshot rendering */}
            <canvas ref={canvasRef} className="hidden" />

            {/* Camera Controls */}
            <div className="flex items-center justify-center gap-3">
              {capturedImage ? (
                <button
                  type="button"
                  onClick={() => {
                    setCapturedImage(null);
                    startCameraStream();
                  }}
                  className="btn btn-secondary btn-sm flex items-center gap-1.5"
                >
                  <RefreshCw className="w-4 h-4" /> Retake Snapshot
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleCapturePhoto}
                  disabled={!streamActive}
                  className="btn btn-primary py-2.5 px-6 shadow-lg shadow-indigo-600/30 flex items-center gap-2 font-bold"
                >
                  <Camera className="w-5 h-5" /> Capture My Photo
                </button>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: UPLOAD LOCAL FILE */}
        {activeTab === 'upload' && (
          <div className="space-y-4">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-indigo-500 rounded-3xl p-8 text-center cursor-pointer transition-all bg-slate-50/50 dark:bg-slate-800/30 group"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform mb-3">
                <Upload className="w-8 h-8" />
              </div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Click to Browse or Drag Your Photo Here
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Supports JPG, PNG, WEBP from your local computer
              </p>
            </div>

            {selectedAvatar && (
              <div className="flex items-center justify-center gap-3">
                <span className="text-xs text-slate-400 font-medium">Loaded Photo:</span>
                <img
                  src={selectedAvatar}
                  alt="Preview"
                  className="w-12 h-12 rounded-2xl object-cover ring-2 ring-indigo-500 shadow-md"
                />
              </div>
            )}
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            {user?.avatar && (
              <button
                type="button"
                onClick={handleRemovePhoto}
                className="text-xs text-rose-500 hover:text-rose-600 font-semibold flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" /> Remove Photo
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                stopCameraStream();
                onClose();
              }}
              className="btn btn-secondary btn-sm"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!selectedAvatar}
              onClick={handleSaveProfilePhoto}
              className="btn btn-primary btn-sm flex items-center gap-1.5 shadow-md shadow-indigo-600/30 font-bold disabled:opacity-50"
            >
              <Check className="w-4 h-4" /> Set as Profile Photo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePhotoModal;
