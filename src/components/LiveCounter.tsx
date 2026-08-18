import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, Clock, CalendarHeart, Sparkles } from 'lucide-react';
import { RELATIONSHIP_START_DATE } from '../data/memories';

export const LiveCounter: React.FC = () => {
  const [timeElapsed, setTimeElapsed] = useState({
    totalDays: 0,
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(RELATIONSHIP_START_DATE).getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, now - start);

      const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));

      // Calculate calendar breakdown
      const startDate = new Date(RELATIONSHIP_START_DATE);
      const currentDate = new Date();

      let years = currentDate.getFullYear() - startDate.getFullYear();
      let months = currentDate.getMonth() - startDate.getMonth();
      let days = currentDate.getDate() - startDate.getDate();

      if (days < 0) {
        months -= 1;
        // Days in previous month
        const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
        days += prevMonth.getDate();
      }

      if (months < 0) {
        years -= 1;
        months += 12;
      }

      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeElapsed({
        totalDays,
        years,
        months,
        days,
        hours,
        minutes,
        seconds,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="counter"
      className="relative py-20 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-[#FCF8F8] via-[#FFF3F5] to-[#FCF8F8]"
    >
      <div className="max-w-4xl mx-auto text-center space-y-10 relative z-10">
        
        {/* Intro sentence */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-3"
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#9C4B61] font-editorial bg-white/80 px-4 py-1.5 rounded-full border border-[#F5CDD6] shadow-xs">
            <CalendarHeart className="w-3.5 h-3.5" />
            <span>TIMELESS LOVE COUNTER</span>
          </div>

          <h3 className="font-amiri text-2xl sm:text-3xl md:text-4xl text-[#3E1A26] font-normal">
            منذ أن قلت لكِ أحبكِ...
          </h3>
          <p className="text-xs sm:text-sm text-[#7D4C5C] font-editorial tracking-wider">
            18 January 2024 — In real-time
          </p>
        </motion.div>

        {/* Big Highlighted Days Count */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="relative inline-block"
        >
          <div className="absolute -inset-3 bg-gradient-to-r from-[#F6CCD5]/50 via-[#FEDEE5]/70 to-[#F4BBC8]/50 rounded-3xl blur-xl" />
          
          <div className="relative glass-panel-card px-8 sm:px-14 py-8 rounded-3xl shadow-[0_20px_45px_rgba(116,50,68,0.1)] border border-[#F3CDD6]/80 flex flex-col items-center">
            <div className="flex items-baseline justify-center gap-3">
              <span className="font-editorial text-6xl sm:text-7xl md:text-8xl font-bold text-[#862940] tracking-tight">
                {timeElapsed.totalDays}
              </span>
              <span className="font-amiri text-2xl sm:text-3xl font-semibold text-[#5A1C2C]">
                يومًا
              </span>
              <Heart className="w-7 h-7 sm:w-9 sm:h-9 text-[#C23C62] fill-[#C23C62] animate-pulse" />
            </div>

            <p className="text-xs text-[#8A5263] mt-2 font-medium tracking-wide">
              {timeElapsed.totalDays * 24} ساعة من الحب والضحكات والمواقف الحلوة
            </p>
          </div>
        </motion.div>

        {/* Granular breakdown counters (Years, Months, Days, Hours, Minutes, Seconds) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4 max-w-3xl mx-auto"
        >
          {[
            { value: timeElapsed.years, label: 'سنة', en: 'Years' },
            { value: timeElapsed.months, label: 'أشهر', en: 'Months' },
            { value: timeElapsed.days, label: 'أيام', en: 'Days' },
            { value: timeElapsed.hours, label: 'ساعات', en: 'Hours' },
            { value: timeElapsed.minutes, label: 'دقائق', en: 'Minutes' },
            { value: timeElapsed.seconds, label: 'ثواني', en: 'Seconds' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white/85 p-3.5 sm:p-4 rounded-2xl border border-[#F3CDD6] shadow-[0_4px_15px_rgba(116,50,68,0.04)] flex flex-col items-center justify-center space-y-1 hover:border-[#E295A8] transition-colors"
            >
              <span className="font-editorial text-2xl sm:text-3xl font-semibold text-[#7E283F]">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="font-amiri text-xs sm:text-sm text-[#4E2432] font-medium">
                {item.label}
              </span>
              <span className="text-[10px] text-[#A66E7E] font-editorial uppercase tracking-wider">
                {item.en}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Emotional conclusion quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="pt-4 max-w-lg mx-auto"
        >
          <div className="relative py-4 px-6 rounded-2xl bg-[#FFF6F8] border border-[#F6D2DB] text-center">
            <Sparkles className="w-4 h-4 text-[#B55972] absolute -top-2 right-6" />
            <p className="font-amiri text-lg sm:text-xl text-[#6B283C] leading-relaxed">
              "وكل يوم منهم كان سبب إضافي باش نحبك أكثر."
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
