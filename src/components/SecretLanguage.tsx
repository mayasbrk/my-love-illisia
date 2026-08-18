import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Sparkles, MessageSquareHeart, Smile, BookOpen } from 'lucide-react';
import { DICTIONARY_ENTRIES } from '../data/memories';

export const SecretLanguage: React.FC = () => {
  const [poemRevealed, setPoemRevealed] = useState(false);

  const mosquitoPoem = DICTIONARY_ENTRIES[0];
  const phrase1 = DICTIONARY_ENTRIES[1];
  const phrase2 = DICTIONARY_ENTRIES[2];

  return (
    <section id="secret-language" className="relative py-24 px-4 sm:px-6 overflow-hidden">
      {/* Soft light accents */}
      <div className="absolute top-1/3 right-10 w-72 h-72 rounded-full bg-[#FCE8ED]/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-[#FADCE3]/30 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#9C4B61] font-editorial bg-[#FFF0F4] px-4 py-1.5 rounded-full border border-[#F5CDD6]"
          >
            <MessageSquareHeart className="w-3.5 h-3.5" />
            <span>OUR PRIVATE DIALECT</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-amiri text-3xl sm:text-4xl md:text-5xl text-[#3A1824] font-normal"
          >
            كلام ما يفهموش غير زوج ناس.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-amiri text-base sm:text-lg text-[#78374A] max-w-xl mx-auto leading-relaxed"
          >
            لغة اخترعناها وحدنا... وما عندهاش ترجمة عند حتى واحد.
          </motion.p>
        </div>

        {/* Feature 1: Interactive Mosquito Poem Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative glass-panel-card p-6 sm:p-8 rounded-3xl border border-[#F3CDD6] shadow-[0_15px_35px_rgba(116,50,68,0.07)] text-center space-y-6"
        >
          <div className="flex items-center justify-between border-b border-[#F7E1E5] pb-3">
            <span className="font-editorial text-xs text-[#9B5C6F] uppercase tracking-wider font-semibold">
              ENTRY #01 — NAMOUSA CHRONICLES
            </span>
            <span className="px-3 py-1 rounded-full text-xs bg-[#FFF0F4] text-[#862940] border border-[#F4CCD5] font-medium flex items-center gap-1">
              <Smile className="w-3.5 h-3.5" />
              <span>makes her laugh</span>
            </span>
          </div>

          <div className="py-2">
            <h3 className="font-amiri text-xl sm:text-2xl text-[#3F1B27] font-semibold mb-4">
              قصيدة النموسة الشهيرة 🦟❤️
            </h3>

            {!poemRevealed ? (
              <div className="space-y-4">
                <p className="font-amiri text-2xl sm:text-3xl text-[#6F263A] italic">
                  "لا يلتني كنت نموسة..."
                </p>
                <button
                  id="btn-reveal-mosquito-poem"
                  onClick={() => setPoemRevealed(true)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#8E2F48] text-white text-sm font-medium shadow-md hover:bg-[#78243A] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <span>كمليها 😂</span>
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, type: 'spring' }}
                  className="space-y-4 bg-[#FFF5F7] p-6 rounded-2xl border border-[#F5CDD6]"
                >
                  <p className="font-amiri text-xl sm:text-2xl text-[#521C2B] leading-loose whitespace-pre-line font-medium">
                    {mosquitoPoem.interactivePoem?.revealText}
                  </p>

                  <div className="pt-3 border-t border-[#F8E3E7] flex items-center justify-center gap-2 text-xs text-[#9A5C6F]">
                    <span>😂 النموسة الأكثر حظاً في التاريخ</span>
                    <button
                      onClick={() => setPoemRevealed(false)}
                      className="text-[#8E2F48] underline hover:text-[#521C2B] text-xs mr-2 cursor-pointer"
                    >
                      إخفاء
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </motion.div>

        {/* Feature 2 & 3: Untranslated Secret Entries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Phrase 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-panel p-6 sm:p-7 rounded-2xl border border-[#F3CDD6] space-y-4 shadow-sm hover:border-[#E89EAE] transition-all"
          >
            <div className="flex items-center justify-between border-b border-[#F7E1E5] pb-3">
              <span className="font-editorial text-xs text-[#9B5C6F] font-semibold tracking-wider">
                ENTRY #02
              </span>
              <span className="px-3 py-0.5 rounded-full text-[11px] bg-[#FFF2F5] text-[#862940] border border-[#F4CCD5] font-medium">
                private language
              </span>
            </div>

            <div className="space-y-3 py-2 text-center">
              <p className="font-editorial text-lg sm:text-xl font-bold text-[#4E1A29] tracking-wider uppercase leading-relaxed">
                "{phrase1.phrase}"
              </p>
              <p className="text-xs text-[#7F4B5B] font-amiri leading-relaxed">
                {phrase1.note}
              </p>
            </div>

            <div className="pt-2 border-t border-[#F8E3E7] flex items-center justify-between text-[11px] text-[#A66E7E] font-editorial">
              <span>Classified Meaning</span>
              <span>Only We Understand ♡</span>
            </div>
          </motion.div>

          {/* Phrase 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-panel p-6 sm:p-7 rounded-2xl border border-[#F3CDD6] space-y-4 shadow-sm hover:border-[#E89EAE] transition-all"
          >
            <div className="flex items-center justify-between border-b border-[#F7E1E5] pb-3">
              <span className="font-editorial text-xs text-[#9B5C6F] font-semibold tracking-wider">
                ENTRY #03
              </span>
              <span className="px-3 py-0.5 rounded-full text-[11px] bg-[#FFF2F5] text-[#862940] border border-[#F4CCD5] font-medium">
                inside joke
              </span>
            </div>

            <div className="space-y-3 py-2 text-center">
              <p className="font-editorial text-lg sm:text-xl font-bold text-[#4E1A29] tracking-wider uppercase leading-relaxed">
                "{phrase2.phrase}"
              </p>
              <p className="text-xs text-[#7F4B5B] font-amiri leading-relaxed">
                {phrase2.note}
              </p>
            </div>

            <div className="pt-2 border-t border-[#F8E3E7] flex items-center justify-between text-[11px] text-[#A66E7E] font-editorial">
              <span>Makes Us Laugh Every Time</span>
              <span>Exclusive Access ♡</span>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
