// src/components/ui/AudioControls.jsx
import React from 'react';
import { createPortal } from 'react-dom';
import { Volume2, VolumeX, RotateCcw } from 'lucide-react';

const AudioControls = ({ isMuted, setIsMuted, handleReloadAudio, showStartOverlay }) => {
  if (showStartOverlay) {
    return null;
  }

  return createPortal(
    <div
      className="fixed left-4 bottom-4 flex gap-2"
      style={{ zIndex: 999999 }}
    >
      {/* Mute/Unmute */}
      <button
        onClick={() => setIsMuted(prev => !prev)}
        className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center border-2 border-cyan-400 hover:border-cyan-300 hover:scale-110 transition-all shadow-lg hover:shadow-cyan-500/50 cursor-pointer active:scale-95"
        aria-label={isMuted ? "Riattiva audio" : "Disattiva audio"}
      >
        {isMuted ? (
          <VolumeX className="w-6 h-6 text-cyan-400" />
        ) : (
          <Volume2 className="w-6 h-6 text-cyan-400" />
        )}
      </button>

      {/* Audio Reload */}
      <button
        onClick={handleReloadAudio}
        className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center border-2 border-purple-400 hover:border-purple-300 hover:scale-110 transition-all shadow-lg hover:shadow-purple-500/50 cursor-pointer active:scale-95"
        aria-label="Riascolta la spiegazione per questa sezione"
      >
        <RotateCcw className="w-6 h-6 text-purple-400" />
      </button>
    </div>,
    document.body
  );
};

export default AudioControls;