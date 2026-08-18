import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';

interface OpeningScreenProps {
  onEnter: () => void;
}

export const OpeningScreen: React.FC<OpeningScreenProps> = ({ onEnter }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-[#FCF8F8] overflow-hidden"
    >
      {/* Soft background glow circles */}
      <div className="absolute w-96 h-96 rounded-full bg-gradient-to-tr from-[#FAD2DA]/40 to-[#FCE7EB]/30 blur-3xl -top-20 -right-20 pointer-events-none animate-pulse-subtle" />
      <div className="absolute w-80 h-80 rounded-full bg-gradient-to-br from-[#F5CBD4]/30 to-[#FBE4E8]/20 blur-3xl -bottom-20 -left-20 pointer-events-none animate-pulse-subtle" />

      {/* Subtle floating tiny hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              y: 40,
              x: (i - 4) * 50 + Math.random() * 30,
            }}
            animate={{
              opacity: [0, 0.45, 0],
              y: -120,
              x: (i - 4) * 50 + Math.sin(i) * 25,
            }}
            transition={{
              duration: 5 + i * 0.8,
              repeat: Infinity,
              delay: i * 0.7,
              ease: 'easeInOut',
            }}
            className="absolute bottom-1/4"
            style={{ left: `${15 + i * 10}%` }}
          >
            <Heart className="w-4 h-4 text-[#E295A8] fill-[#E295A8]/30 stroke-[1.2]" />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative max-w-md w-full text-center space-y-8 glass-panel-card p-8 sm:p-10 rounded-3xl shadow-[0_20px_50px_rgba(116,50,68,0.08)] border border-[#F4D5DB]/70"
      >
        {/* Monogram emblem */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#FFF2F5] border border-[#F3CDD6] shadow-sm text-[#9E3D59]"
        >
          <Sparkles className="w-6 h-6 stroke-[1.5]" />
        </motion.div>

        {/* Date subtle tag */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="tracking-widest font-editorial text-xs sm:text-sm uppercase text-[#A05C6F] font-semibold"
        >
          18.01.2024 — FOREVER
        </motion.div>

        {/* Core welcoming phrase */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="space-y-4 font-editorial leading-relaxed"
        >
          <p className="text-sm sm:text-base tracking-widest uppercase font-semibold text-[#8B485B]">
            AQBELL ATKECHMET GH YOUR WEBSITE....
          </p>
          <p className="font-editorial text-xl sm:text-2xl text-[#842E47] font-bold tracking-wide">
            VGHIGH AKEMDESMEKTAY TOUJOUR S MY LOVE FOR YOU❤️❤️
          </p>
        </motion.div>

        {/* Enter Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="pt-2"
        >
          <button
            id="btn-enter-story"
            onClick={onEnter}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#99344F] to-[#7B243B] text-white font-medium text-base shadow-[0_10px_25px_rgba(153,52,79,0.3)] hover:shadow-[0_15px_30px_rgba(153,52,79,0.45)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer"
          >
            <span>ادخلي ♡</span>
            <Heart className="w-4 h-4 fill-white/80 group-hover:scale-110 transition-transform duration-300" />
          </button>
        </motion.div>
      </motion.div>

      {/* Footer subtle brand */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 text-xs text-[#9B6A78] font-editorial tracking-wider"
      >
        A Private Digital Love Story
      </motion.p>
    </motion.div>
  );
};
