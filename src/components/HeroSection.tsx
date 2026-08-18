import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Calendar, ArrowDown, Heart, MapPin, ExternalLink } from 'lucide-react';
import { SPECIAL_CONFESSION_BUS_PHOTO, CONFESSION_MAPS_URL, FALLBACK_CONFESSION_BUS_PHOTO } from '../data/memories';

interface HeroSectionProps {
  heroImageUrl?: string;
  onExploreClick: () => void;
  onOpenPhotoLightbox?: (photoUrl: string, title: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  heroImageUrl = SPECIAL_CONFESSION_BUS_PHOTO,
  onExploreClick,
  onOpenPhotoLightbox,
}) => {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex flex-col items-center justify-center pt-24 pb-16 px-4 sm:px-6 overflow-hidden"
    >
      {/* Background ambient light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-[#FCDDE3]/40 via-[#FDF0F3]/30 to-transparent blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl w-full mx-auto flex flex-col items-center text-center space-y-10">
        
        {/* Subtle romantic tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF2F5] border border-[#F4CCD5] text-[#8E2F48] shadow-sm text-xs sm:text-sm font-medium"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>حكايتنا الخاصة — Our Private Story</span>
          <Sparkles className="w-3.5 h-3.5" />
        </motion.div>

        {/* Central date & headline */}
        <div className="space-y-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative inline-block"
          >
            <h1 className="font-editorial text-5xl sm:text-7xl md:text-8xl tracking-tight text-[#4A1726] font-semibold">
              18.01.2024
            </h1>
            
            {/* Animated fine glowing underline */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.4, ease: 'easeInOut' }}
              className="h-0.5 bg-gradient-to-r from-transparent via-[#C6677F] to-transparent mt-2 mx-auto"
            />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-amiri text-2xl sm:text-3xl md:text-4xl text-[#3A1E27] font-normal leading-relaxed pt-2"
          >
            اليوم اللي بدأت فيه أجمل حكاية بالنسبة لي.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-editorial text-lg sm:text-xl italic text-[#8B4D60] tracking-wide"
          >
            "From one Thursday... to forever."
          </motion.p>

          {/* 18.08.2026 Dedication Note */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="pt-2"
          >
            <div className="inline-block max-w-xl mx-auto px-5 py-3 rounded-2xl bg-[#FFF5F7] border border-[#F5CAD4] shadow-xs text-center space-y-1">
              <p className="font-amiri text-sm sm:text-base text-[#78263C] font-semibold leading-relaxed">
                ✨ أهديكِ هذا الموقع في مثل اليوم الذي اعترفت لكِ فيه بحبي (يوم 18)، حيث اليوم هو <span className="font-editorial font-bold text-[#8E2F48]">18 / 08 / 2026</span> لكي يبقى ذكرى حب خالدة بيننا ♡
              </p>
            </div>
          </motion.div>
        </div>

        {/* Hero Photo Presentation Card (Editorial Frame) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="relative group max-w-2xl w-full"
        >
          {/* Decorative frame elements */}
          <div className="absolute -inset-2 bg-gradient-to-r from-[#F7CAD2]/40 via-[#FEE8ED]/60 to-[#F5BAC7]/40 rounded-3xl blur-md group-hover:blur-lg transition-all duration-500" />
          
          <div
            onClick={() => onOpenPhotoLightbox?.(heroImageUrl, '18.01.2024 — أول اعتراف')}
            className="relative bg-white p-3 sm:p-5 rounded-2xl shadow-[0_15px_40px_rgba(116,50,68,0.12)] border border-[#F3CDD6] cursor-pointer overflow-hidden transition-transform duration-500 hover:scale-[1.01]"
          >
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-xl overflow-hidden bg-[#FBF1F3]">
              <img
                src={heroImageUrl || SPECIAL_CONFESSION_BUS_PHOTO}
                alt="18.01.2024 - Hero Moment"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                loading="eager"
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

              {/* Tag inside photo */}
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-medium text-[#7E283F] shadow-md flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 fill-[#7E283F]" />
                <span>بداية الحكاية</span>
              </div>
            </div>

            {/* Editorial footer below photo */}
            <div className="pt-4 pb-1 px-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#7A4B5B] border-t border-[#F7E1E5] mt-3 font-editorial">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#A64B64]" />
                <span>Thursday, January 18, 2024</span>
              </span>

              <a
                href={CONFESSION_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF2F5] hover:bg-[#FCE6EB] border border-[#F4CDD6] text-[#8E2F48] font-semibold text-[11px] transition-all hover:scale-105"
                title="عرض مكان الاعتراف في بجاية على Google Maps"
              >
                <MapPin className="w-3 h-3 text-[#A83854]" />
                <span>Les Oliviers (Bejaia) 📍</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-70" />
              </a>

              <span className="italic tracking-wider font-semibold text-[#8E2F48]">
                Chapter 01: The Beginning
              </span>
            </div>
          </div>
        </motion.div>

        {/* Scroll CTA indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="pt-2"
        >
          <button
            id="hero-scroll-btn"
            onClick={onExploreClick}
            className="group flex flex-col items-center gap-2 text-xs text-[#8A5163] hover:text-[#5E1A2D] transition-colors cursor-pointer"
          >
            <span className="font-amiri text-sm">اكتشفي حكايتنا</span>
            <div className="w-8 h-8 rounded-full bg-[#FFF0F3] border border-[#F3CCD5] flex items-center justify-center group-hover:translate-y-1 transition-transform shadow-xs">
              <ArrowDown className="w-4 h-4 text-[#8E2F48]" />
            </div>
          </button>
        </motion.div>

      </div>
    </section>
  );
};
