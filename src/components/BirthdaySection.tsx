import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Cake, Sparkles, Gift, Heart, Calendar } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BIRTHDAY_DAY, BIRTHDAY_MONTH, SPECIAL_CONFESSION_BUS_PHOTO, FALLBACK_CONFESSION_BUS_PHOTO } from '../data/memories';

interface BirthdaySectionProps {
  birthdayImageUrl?: string;
  onOpenPhotoLightbox?: (photoUrl: string, title: string) => void;
}

export const BirthdaySection: React.FC<BirthdaySectionProps> = ({
  birthdayImageUrl = SPECIAL_CONFESSION_BUS_PHOTO,
  onOpenPhotoLightbox,
}) => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const triggerCelebration = () => {
    // Elegant luxury soft rose and gold confetti
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#E295A8', '#B55972', '#EED3D9', '#E5A93C', '#FFFFFF'],
      shapes: ['circle', 'square'],
      scalar: 0.9,
    });
  };

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      let targetYear = now.getFullYear();

      // Check if birthday has passed this year
      const birthdayThisYear = new Date(targetYear, BIRTHDAY_MONTH, BIRTHDAY_DAY, 0, 0, 0);

      if (now.getTime() > birthdayThisYear.getTime()) {
        targetYear += 1;
      }

      const nextBirthday = new Date(targetYear, BIRTHDAY_MONTH, BIRTHDAY_DAY, 0, 0, 0);
      const diff = Math.max(0, nextBirthday.getTime() - now.getTime());

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="birthday"
      className="relative py-24 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-[#FCF8F8] via-[#FFF1F4] to-[#FCF8F8]"
    >
      {/* Subtle celebratory ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#FBD2DC]/30 to-[#FFE4E9]/30 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#9C4B61] font-editorial bg-white px-4 py-1.5 rounded-full border border-[#F5CDD6] shadow-xs"
          >
            <Gift className="w-3.5 h-3.5" />
            <span>A SPECIAL GIFT FOR HER • 23.01</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="font-editorial text-6xl sm:text-7xl md:text-8xl font-bold text-[#862940] tracking-tight"
          >
            23.01 ♡
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-3 font-amiri text-2xl sm:text-3xl md:text-4xl text-[#3E1A26] leading-relaxed max-w-2xl mx-auto"
          >
            <p className="opacity-80">هذا الموقع هو هديتي الخاصة ليكِ يا روحي...</p>
            <p className="text-[#842A42] font-semibold">
              سواء كان اليوم عيد ميلادك أو أي يوم عادي، كل يوم معك هو عيد وفرحة لقلبي.
            </p>
          </motion.div>
        </div>

        {/* Birthday Editorial Portrait & Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-2xl mx-auto"
        >
          <div className="glass-panel-card p-4 sm:p-6 rounded-3xl border border-[#F3CDD6] shadow-[0_20px_50px_rgba(116,50,68,0.1)] space-y-6">
            
            <div
              onClick={() => onOpenPhotoLightbox?.(birthdayImageUrl, '23 جانفي — عيد ميلاد حبيبتي')}
              className="relative aspect-[16/11] rounded-2xl overflow-hidden cursor-pointer group bg-[#F8ECF0]"
            >
              <img
                src={birthdayImageUrl || SPECIAL_CONFESSION_BUS_PHOTO}
                alt="Birthday Special"
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full text-xs font-semibold text-[#862940] shadow-md flex items-center gap-1.5">
                <Cake className="w-4 h-4 text-[#862940]" />
                <span>عيد ميلاد سعيد يا ست البنات 🎂</span>
              </div>
            </div>

            {/* Interactive Confetti Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <p className="text-xs text-[#7A4B5B] font-amiri text-center sm:text-right">
                أمنيتي ليك في كل عام هي الصحة، راحة البال، وتفضلي ديما منورة أيامي.
              </p>

              <button
                id="btn-trigger-birthday-confetti"
                onClick={triggerCelebration}
                className="shrink-0 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#8E2F48] text-white text-xs font-semibold shadow-md hover:bg-[#762237] hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>احتفلي معي 🌸✨</span>
              </button>
            </div>

          </div>
        </motion.div>

        {/* Live Countdown to NEXT 23 January */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/80 max-w-xl mx-auto p-6 sm:p-8 rounded-3xl border border-[#F3CDD6] shadow-sm text-center space-y-5"
        >
          <div className="space-y-1">
            <h4 className="font-amiri text-xl sm:text-2xl text-[#441825] font-semibold">
              حتى نعاودوا نحتفلوا بيك...
            </h4>
            <p className="text-xs text-[#9B5C6F] font-editorial tracking-wider">
              Countdown to Next January 23rd
            </p>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {[
              { val: countdown.days, label: 'أيام', en: 'Days' },
              { val: countdown.hours, label: 'ساعات', en: 'Hours' },
              { val: countdown.minutes, label: 'دقائق', en: 'Mins' },
              { val: countdown.seconds, label: 'ثواني', en: 'Secs' },
            ].map((box, i) => (
              <div
                key={i}
                className="bg-[#FFF5F7] p-3 rounded-2xl border border-[#F5CDD6] flex flex-col items-center justify-center space-y-0.5"
              >
                <span className="font-editorial text-2xl sm:text-3xl font-bold text-[#862940]">
                  {String(box.val).padStart(2, '0')}
                </span>
                <span className="font-amiri text-xs text-[#522432]">
                  {box.label}
                </span>
                <span className="text-[9px] text-[#A67180] font-editorial uppercase">
                  {box.en}
                </span>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-[#8F5566] italic">
            كل ثانية تقربنا من يومك الخاص هي ثانية مليانة حب واشتياق.
          </p>
        </motion.div>

      </div>
    </section>
  );
};
