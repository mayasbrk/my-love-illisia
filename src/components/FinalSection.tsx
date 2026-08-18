import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Infinity as InfinityIcon, Download, FileCode } from 'lucide-react';
import { SPECIAL_CONFESSION_BUS_PHOTO, FALLBACK_CONFESSION_BUS_PHOTO } from '../data/memories';

interface FinalSectionProps {
  finalImageUrl?: string;
  onOpenPhotoLightbox?: (photoUrl: string, title: string) => void;
}

export const FinalSection: React.FC<FinalSectionProps> = ({
  finalImageUrl = SPECIAL_CONFESSION_BUS_PHOTO,
  onOpenPhotoLightbox,
}) => {
  return (
    <footer id="ending" className="relative py-28 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-[#FCF8F8] via-[#FFF1F4] to-[#FAF2F4]">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-t from-[#F9CAD6]/40 via-[#FDF0F3]/30 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center space-y-12 relative z-10">
        
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <p className="font-amiri text-xl sm:text-2xl text-[#8E495C]">
            وصلنا لنهاية الموقع...
          </p>

          <h2 className="font-amiri text-3xl sm:text-4xl md:text-5xl text-[#3A1725] font-normal leading-relaxed max-w-2xl mx-auto">
            لكن الحكاية اللي بدأت في <span className="font-editorial font-bold text-[#862940]">18.01.2024</span> ما عندهاش صفحة أخيرة.
          </h2>
        </motion.div>

        {/* Most Meaningful Photo Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-xl mx-auto"
        >
          <div
            onClick={() => onOpenPhotoLightbox?.(finalImageUrl, '18.01.2024 → ∞')}
            className="polaroid-card p-4 sm:p-5 rounded-2xl border border-[#F3CDD6] cursor-pointer group bg-white shadow-xl"
          >
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-[#FBF1F3]">
              <img
                src={finalImageUrl || SPECIAL_CONFESSION_BUS_PHOTO}
                alt="Our Forever Story"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

              <div className="absolute bottom-4 inset-x-0 text-center text-white">
                <span className="font-editorial text-sm tracking-widest uppercase">
                  To be continued...
                </span>
              </div>
            </div>

            <div className="pt-4 pb-1 text-center space-y-1 font-editorial">
              <div className="flex items-center justify-center gap-2 text-xl sm:text-2xl font-bold text-[#862940]">
                <span>18.01.2024</span>
                <span>→</span>
                <span className="text-2xl">∞</span>
              </div>
              <p className="text-[11px] text-[#9E6474] uppercase tracking-wider">
                Written in the stars ♡
              </p>
            </div>
          </div>
        </motion.div>

        {/* Dedication message */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="space-y-4 pt-4"
        >
          <div className="max-w-xl mx-auto p-4 rounded-2xl bg-white/80 border border-[#F3CCD5] shadow-xs space-y-2">
            <p className="font-amiri text-base sm:text-lg text-[#7E243A] font-semibold leading-relaxed">
              أهديكِ هذا الموقع في مثل هذا اليوم الذي اعترفت لكِ فيه بحبي (يوم 18) — بتاريخ <span className="font-editorial font-bold">18 / 08 / 2026</span> لكي يبقى ذكرى حب تجمعنا دائماً. ♡
            </p>
          </div>

          <p className="font-editorial text-xs text-[#9B6877] tracking-widest uppercase">
            Made with all my heart exclusively for you • 18.01.2024 → 18.08.2026 → ∞
          </p>

          <div className="pt-2 flex items-center justify-center">
            <a
              href="/standalone-website.html"
              download="index.html"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#F3CDD6] text-xs font-semibold text-[#8E2F48] shadow-xs hover:bg-[#FFF5F7] hover:border-[#8E2F48] transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>تنزيل الموقع كملف واحد مستقل (index.html)</span>
            </a>
          </div>
        </motion.div>

      </div>
    </footer>
  );
};
