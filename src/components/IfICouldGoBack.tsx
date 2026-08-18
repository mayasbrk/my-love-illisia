import React from 'react';
import { motion } from 'motion/react';
import { RotateCcw, Heart, Sparkles } from 'lucide-react';
import { SPECIAL_CONFESSION_BUS_PHOTO, FALLBACK_CONFESSION_BUS_PHOTO } from '../data/memories';

interface IfICouldGoBackProps {
  photoUrl?: string;
  onOpenPhotoLightbox?: (photoUrl: string, title: string) => void;
}

export const IfICouldGoBack: React.FC<IfICouldGoBackProps> = ({
  photoUrl = SPECIAL_CONFESSION_BUS_PHOTO,
  onOpenPhotoLightbox,
}) => {
  const lines = [
    { text: 'كنت راح نختار نفس اليوم.', delay: 0.2 },
    { text: 'نفس الخميس.', delay: 0.4 },
    { text: 'نفس اللحظة.', delay: 0.6 },
    { text: 'ونفسكِ.', delay: 0.8, highlight: true },
    { text: 'كل مرة. ♡', delay: 1.0, final: true },
  ];

  return (
    <section className="relative py-28 px-4 sm:px-6 overflow-hidden bg-[#24131A] text-[#FDF0F3]">
      {/* Background ambient dark-rose glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-[#8E2F48]/20 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Photo Column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-sm mx-auto md:max-w-none w-full"
        >
          <div
            onClick={() => onOpenPhotoLightbox?.(photoUrl, 'لو رجع بيا الوقت...')}
            className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.5)] border border-[#522938] cursor-pointer group bg-[#351A25]"
          >
            <img
              src={photoUrl || SPECIAL_CONFESSION_BUS_PHOTO}
              alt="Timeless Moment"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-85 group-hover:opacity-100"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.dataset.triedFallback) {
                  target.dataset.triedFallback = 'true';
                  target.src = target.src.includes('confession-bus-photo.jpg')
                    ? FALLBACK_CONFESSION_BUS_PHOTO
                    : SPECIAL_CONFESSION_BUS_PHOTO;
                }
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1D0C14] via-transparent to-transparent opacity-80" />

            <div className="absolute bottom-6 right-6 left-6 text-right">
              <span className="font-editorial text-xs text-[#E599AC] tracking-widest uppercase">
                18.01.2024 — THURSDAY
              </span>
              <p className="font-amiri text-lg text-white font-medium">
                قرار العمر الوحيد
              </p>
            </div>
          </div>
        </motion.div>

        {/* Text Reveal Column */}
        <div className="space-y-8 text-right">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#E599AC] font-editorial bg-[#381B26] px-4 py-1.5 rounded-full border border-[#5A2D3E]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>TIMELESS CERTAINTY</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-amiri text-3xl sm:text-4xl text-[#FFEBF0] font-normal"
          >
            لو رجع بيا الوقت...
          </motion.h2>

          {/* Sequential line reveals */}
          <div className="space-y-4">
            {lines.map((line, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: line.delay }}
                className={`font-amiri text-2xl sm:text-3xl leading-relaxed ${
                  line.final
                    ? 'text-[#F3A4B8] font-bold text-3xl sm:text-4xl pt-2'
                    : line.highlight
                    ? 'text-[#FFD3DE] font-semibold'
                    : 'text-[#D9B1BD]'
                }`}
              >
                {line.text}
              </motion.p>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2 }}
            className="text-xs text-[#B27D8D] font-editorial tracking-wider pt-2 border-t border-[#452230]"
          >
            "I would find you in every lifetime, in every universe."
          </motion.p>
        </div>

      </div>
    </section>
  );
};
