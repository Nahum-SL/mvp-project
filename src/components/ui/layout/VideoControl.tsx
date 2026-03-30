// src/components/ui/layout/VideoControl.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause } from "lucide-react";

interface VideoControlProps {
  isPlaying: boolean;
  togglePlay: () => void;
  isVisible: boolean;
}

export const VideoControl = ({
  isPlaying,
  togglePlay,
  isVisible,
}: VideoControlProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          whileHover={{
            scale: 1.1,
            backgroundColor: "rgba(255, 255, 255, 0.2)",
          }}
          whileTap={{ scale: 0.9 }}
          onClick={togglePlay}
          className="absolute bottom-27 right-6 z-50 p-4 rounded-2xl 
                     bg-white/10  backdrop-blur-xl border border-white/20 
                     text-white shadow-2xl transition-colors group
                     md:bottom-30 md:right-10 md:p-3 
                     touch-auto min-w-11 min-h-11
                     "
          aria-label={isPlaying ? "Pausar video" : "Reproducir video"}
        >
          {isPlaying ? (
            <Pause
              size={18}
            />
          ) : (
            <Play
              size={18}
            />
          )}
        </motion.button>
      )}
    </AnimatePresence>
  );
};
