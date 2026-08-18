import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Dices, Sparkles, Heart, RefreshCw, Quote, Smile } from 'lucide-react';
import { RANDOM_CARDS } from '../data/memories';
import { RandomMemoryCard } from '../types';

export const RandomMemory: React.FC = () => {
  const [currentCard, setCurrentCard] = useState<RandomMemoryCard>(RANDOM_CARDS[0]);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleShuffle = () => {
    setIsSpinning(true);
    setTimeout(() => {
      const remaining = RANDOM_CARDS.filter((c) => c.id !== currentCard.id);
      const nextCard = remaining[Math.floor(Math.random() * remaining.length)];
      setCurrentCard(nextCard);
      setIsSpinning(false);
    }, 300);
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 bg-[#FCF8F9]">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        
        {/* Section Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#9C4B61] font-editorial bg-white px-4 py-1.5 rounded-full border border-[#F5CDD6]">
            <Dices className="w-3.5 h-3.5" />
            <span>SERENDIPITY GENERATOR</span>
          </div>

          <h3 className="font-amiri text-3xl sm:text-4xl text-[#3E1A26] font-normal">
            فاجئيني بذكرى عشوائية 🎲✨
          </h3>

          <p className="text-xs sm:text-sm text-[#7D4C5C]">
            انقري على الزر لسحب رسالة، نكتة، أو ذكرى عفوية من أرشيف حكايتنا.
          </p>
        </div>

        {/* Shuffled Card Display */}
        <div className="relative min-h-[220px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCard.id}
              initial={{ opacity: 0, scale: 0.92, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.92, rotateY: -90 }}
              transition={{ duration: 0.4 }}
              className="w-full glass-panel-card p-6 sm:p-8 rounded-3xl border border-[#F3CDD6] shadow-[0_15px_35px_rgba(116,50,68,0.07)] text-center space-y-4"
            >
              <div className="flex items-center justify-between text-xs text-[#9B5C6F] border-b border-[#F7E1E5] pb-2">
                <span className="font-editorial font-semibold uppercase">
                  {currentCard.subtext || 'RANDOM SURPRISE'}
                </span>
                <span className="flex items-center gap-1 font-amiri text-[#8E2F48]">
                  <Sparkles className="w-3 h-3" />
                  <span>{currentCard.authorNote}</span>
                </span>
              </div>

              <div className="py-3">
                <p className="font-amiri text-xl sm:text-2xl text-[#4A1726] leading-relaxed">
                  "{currentCard.content}"
                </p>
              </div>

              <div className="pt-2 border-t border-[#F7E1E5] flex items-center justify-center gap-1 text-[11px] text-[#A66E7E]">
                <Heart className="w-3 h-3 fill-[#C2647C] text-[#C2647C]" />
                <span>ذكرى مميزة بيناتنا</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Action Button */}
        <div>
          <button
            id="btn-random-memory"
            onClick={handleShuffle}
            disabled={isSpinning}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#99344F] to-[#7B243B] text-white text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
            <span>فاجئيني ❤️</span>
          </button>
        </div>

      </div>
    </section>
  );
};
