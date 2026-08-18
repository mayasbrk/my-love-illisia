import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, ChevronRight, ChevronLeft, RefreshCw, Infinity as InfinityIcon } from 'lucide-react';
import { LOVE_REASONS } from '../data/memories';

export const ThingsILove: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentItem = LOVE_REASONS[currentIndex];

  const handleNext = () => {
    if (currentIndex < LOVE_REASONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    if (isCompleted) {
      setIsCompleted(false);
    } else if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setIsCompleted(false);
    setCurrentIndex(0);
  };

  return (
    <section id="things-i-love" className="relative py-24 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-[#FCF7F8] via-[#FFF3F6] to-[#FCF8F8]">
      <div className="max-w-3xl mx-auto text-center space-y-10 relative z-10">
        
        {/* Section Title */}
        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#9C4B61] font-editorial bg-white px-4 py-1.5 rounded-full border border-[#F5CDD6]"
          >
            <Heart className="w-3.5 h-3.5 fill-[#9C4B61]" />
            <span>THINGS I LOVE ABOUT YOU</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-amiri text-3xl sm:text-4xl md:text-5xl text-[#3A1824] font-normal leading-relaxed"
          >
            حاولت نحسب الحوايج اللي نحبهم فيكِ...
          </motion.h2>

          <p className="text-xs sm:text-sm text-[#7D4C5C]">
            اضغطي على البطاقة لاكتشاف التفاصيل التي تسحرني كل يوم ♡
          </p>
        </div>

        {/* Interactive Love Deck Card Container */}
        <div className="relative min-h-[320px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!isCompleted ? (
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-lg glass-panel-card p-8 sm:p-10 rounded-3xl border border-[#F3CDD6] shadow-[0_20px_45px_rgba(116,50,68,0.08)] flex flex-col justify-between space-y-6 text-center relative"
              >
                {/* Badge */}
                <div className="flex items-center justify-between border-b border-[#F7E1E5] pb-3 text-xs text-[#9B5C6F]">
                  <span className="font-editorial font-semibold">
                    REASON #{String(currentItem.id).padStart(2, '0')}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FFF0F4] text-[#862940] border border-[#F5CDD6] text-[11px]">
                    {currentItem.category || 'سر العشق'}
                  </span>
                </div>

                {/* Main reason text */}
                <div className="py-4">
                  <p className="font-amiri text-2xl sm:text-3xl text-[#4A1726] font-normal leading-relaxed">
                    "{currentItem.text}"
                  </p>
                </div>

                {/* Counter indicator */}
                <div className="flex items-center justify-between pt-3 border-t border-[#F7E1E5] text-xs text-[#A06C7B]">
                  <span>
                    {currentIndex + 1} من {LOVE_REASONS.length}
                  </span>
                  <div className="flex gap-1">
                    {LOVE_REASONS.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i === currentIndex
                            ? 'w-5 bg-[#8E2F48]'
                            : 'w-1.5 bg-[#F0CBD4]'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="infinite-end"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-lg bg-gradient-to-b from-[#FFF0F4] to-[#FFE7EC] p-8 sm:p-10 rounded-3xl border border-[#F3CDD6] shadow-[0_20px_50px_rgba(116,50,68,0.12)] space-y-6 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-white shadow-md mx-auto flex items-center justify-center text-[#8E2F48]">
                  <InfinityIcon className="w-8 h-8 stroke-[1.8]" />
                </div>

                <div className="space-y-4 font-amiri text-2xl sm:text-3xl text-[#4A1726] leading-relaxed">
                  <p className="opacity-90">
                    وبعد ما وصلت للقائمة...
                  </p>
                  <p className="text-[#842A42] font-semibold">
                    فهمت بلي ما نقدرش نكملها.
                  </p>
                  <p className="text-xl sm:text-2xl text-[#632233] pt-2">
                    لأن القائمة ما عندهاش نهاية. ♡
                  </p>
                </div>

                <p className="text-xs text-[#8F5566] font-editorial tracking-wider">
                  My love for you is infinite and endless.
                </p>

                <div className="pt-2">
                  <button
                    onClick={handleRestart}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-[#8E2F48] text-xs font-semibold shadow-xs hover:shadow-md border border-[#F4CCD5] transition-all cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>إعادة قراءة الأسباب</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Controls */}
        {!isCompleted && (
          <div className="flex items-center justify-center gap-4 pt-2">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`p-3 rounded-full border transition-all cursor-pointer ${
                currentIndex === 0
                  ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                  : 'bg-white border-[#F3CDD6] text-[#7A3649] hover:bg-[#FFF0F4]'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <button
              id="btn-next-love-reason"
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#8E2F48] text-white text-sm font-medium shadow-md hover:bg-[#772338] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>{currentIndex === LOVE_REASONS.length - 1 ? 'الخاتمة ♡' : 'السبب التالي'}</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
