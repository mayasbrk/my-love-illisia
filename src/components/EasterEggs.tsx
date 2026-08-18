import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, X, Stars } from 'lucide-react';
import confetti from 'canvas-confetti';

export const EasterEggs: React.FC = () => {
  const [heartClicks, setHeartClicks] = useState(0);
  const [showSecretModal, setShowSecretModal] = useState(false);

  const handleHeartClick = () => {
    const nextCount = heartClicks + 1;
    setHeartClicks(nextCount);

    if (nextCount >= 5) {
      setShowSecretModal(true);
      setHeartClicks(0);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.8 },
        colors: ['#FF6B8B', '#FF8E53', '#FFA07A', '#FFFFFF', '#8E2F48'],
      });
    }
  };

  return (
    <>
      {/* Floating Interactive Micro-Heart at bottom left */}
      <div className="fixed bottom-6 left-6 z-40">
        <motion.button
          id="btn-easter-egg-heart"
          onClick={handleHeartClick}
          whileHover={{ scale: 1.15, rotate: 10 }}
          whileTap={{ scale: 0.85 }}
          className="relative group p-3 rounded-full bg-white/90 backdrop-blur-md shadow-[0_8px_25px_rgba(116,50,68,0.15)] border border-[#F4CCD5] text-[#8E2F48] cursor-pointer flex items-center justify-center"
          title="انقري عليّ... 👀"
        >
          <Heart className="w-5 h-5 fill-[#8E2F48] group-hover:fill-[#C23C62] transition-colors" />

          {heartClicks > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#8E2F48] text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
              {heartClicks}
            </span>
          )}
        </motion.button>
      </div>

      {/* Secret Love Note Modal */}
      <AnimatePresence>
        {showSecretModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSecretModal(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full glass-panel-card p-8 rounded-3xl border border-[#F3CDD6] shadow-2xl text-center space-y-6"
            >
              <button
                onClick={() => setShowSecretModal(false)}
                className="absolute top-4 left-4 p-1.5 rounded-full bg-white/80 hover:bg-white text-[#632938]"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-14 h-14 rounded-full bg-[#FFF0F4] border border-[#F5CDD6] mx-auto flex items-center justify-center text-[#8E2F48]">
                <Stars className="w-7 h-7" />
              </div>

              <div className="space-y-2">
                <span className="font-editorial text-xs text-[#9B5C6F] tracking-widest uppercase font-semibold">
                  EASTER EGG UNLOCKED ✨
                </span>
                <h4 className="font-amiri text-2xl text-[#3E1A26] font-semibold">
                  لقيتي السر المخفي! ♡
                </h4>
                <p className="font-amiri text-base text-[#5A2837] leading-relaxed">
                  "كل نبضة في قلبي من 18 جانفي 2024 راهي تقول اسمك... أنتِ أجمل صدفة تحولت لأغلى قدر في حياتي."
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setShowSecretModal(false)}
                  className="px-6 py-2.5 rounded-full bg-[#8E2F48] text-white text-xs font-semibold shadow-md hover:bg-[#772237]"
                >
                  أحبكِ أكثر ♡
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
