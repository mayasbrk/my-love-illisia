import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Heart, Sparkles, Feather, Edit3, Check } from 'lucide-react';
import { INITIAL_SECRET_LETTER } from '../data/memories';

interface SecretLetterProps {
  letterData?: typeof INITIAL_SECRET_LETTER;
  onUpdateLetter?: (newLetter: typeof INITIAL_SECRET_LETTER) => void;
}

export const SecretLetter: React.FC<SecretLetterProps> = ({
  letterData = INITIAL_SECRET_LETTER,
  onUpdateLetter,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedLetter, setEditedLetter] = useState(letterData);

  const handleSave = () => {
    setIsEditing(false);
    onUpdateLetter?.(editedLetter);
  };

  return (
    <section id="letter" className="relative py-24 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-3xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#9C4B61] font-editorial bg-[#FFF0F4] px-4 py-1.5 rounded-full border border-[#F5CDD6]"
          >
            <Feather className="w-3.5 h-3.5" />
            <span>PRIVATE HANDWRITTEN LETTER</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-amiri text-3xl sm:text-4xl md:text-5xl text-[#3A1824] font-normal leading-relaxed"
          >
            {letterData.title}
          </motion.h2>

          <p className="text-xs sm:text-sm text-[#7D4C5C]">
            كلمات كُتبت بصدق من القلب لتصل إلى قلبكِ.
          </p>
        </div>

        {/* Envelope or Unfolded Letter Card */}
        <div className="relative">
          {!isOpen ? (
            /* Closed Envelope with Wax Seal */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onClick={() => setIsOpen(true)}
              className="group relative max-w-lg mx-auto bg-gradient-to-br from-[#FFF5F7] to-[#FCE7EC] p-8 sm:p-12 rounded-3xl border-2 border-dashed border-[#F3CDD6] shadow-[0_20px_50px_rgba(116,50,68,0.1)] text-center space-y-6 cursor-pointer hover:shadow-xl hover:border-[#E89EAE] transition-all duration-300"
            >
              {/* Wax Seal Circle */}
              <div className="w-16 h-16 rounded-full bg-[#8E2F48] border-4 border-[#FFF] shadow-lg mx-auto flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                <Heart className="w-7 h-7 fill-white" />
              </div>

              <div className="space-y-2">
                <p className="font-editorial text-sm font-semibold tracking-widest text-[#8E2F48] uppercase">
                  CONFIDENTIAL & PRIVATE
                </p>
                <p className="font-amiri text-xl sm:text-2xl text-[#4A1726]">
                  انقري لفتح الرسالة السرية ♡
                </p>
                <p className="text-xs text-[#8A5263]">
                  ختم الشمع مخصص لعينيكِ فقط
                </p>
              </div>

              <div className="pt-2">
                <span className="inline-block px-5 py-2 rounded-full bg-white text-[#8E2F48] text-xs font-semibold shadow-xs border border-[#F4CCD5]">
                  افتحي الرسالة ✨
                </span>
              </div>
            </motion.div>
          ) : (
            /* Unfolded Parchment Paper Letter */
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative parchment-bg p-8 sm:p-12 rounded-3xl shadow-[0_25px_60px_rgba(116,50,68,0.12)] border border-[#E8C5CC] space-y-8 text-right"
            >
              {/* Top Letter Header */}
              <div className="flex items-center justify-between border-b border-[#E8C5CC] pb-4">
                <div className="flex items-center gap-2">
                  <Feather className="w-4 h-4 text-[#8E2F48]" />
                  <span className="font-editorial text-xs text-[#8E2F48] font-bold tracking-widest">
                    A LETTER FOR HER
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="p-1.5 rounded-lg text-xs bg-white/70 hover:bg-white text-[#782D40] border border-[#E8C5CC] flex items-center gap-1 cursor-pointer"
                    title="تعديل نص الرسالة"
                  >
                    {isEditing ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span onClick={handleSave}>حفظ</span>
                      </>
                    ) : (
                      <>
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>تعديل</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-xs text-[#8E2F48] hover:underline cursor-pointer"
                  >
                    طي الرسالة
                  </button>
                </div>
              </div>

              {/* Salutation */}
              <div className="space-y-1">
                <h3 className="font-editorial text-xl sm:text-2xl text-[#8E2F48] font-bold tracking-wide">
                  {letterData.recipient}
                </h3>
              </div>

              {/* Body Paragraphs */}
              <div className="space-y-5 font-editorial text-base sm:text-lg md:text-xl text-[#3A1420] leading-relaxed font-medium">
                {isEditing ? (
                  <textarea
                    rows={8}
                    value={editedLetter.paragraphs.join('\n\n')}
                    onChange={(e) =>
                      setEditedLetter({
                        ...editedLetter,
                        paragraphs: e.target.value.split('\n\n'),
                      })
                    }
                    className="w-full p-4 rounded-xl bg-white/80 border border-[#E8C5CC] font-editorial text-base leading-relaxed text-[#3E1723] focus:outline-none"
                  />
                ) : (
                  letterData.paragraphs.map((p, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-[#FFF4F7]/50 p-4 sm:p-6 rounded-2xl border border-[#F4CDD6]/50 italic"
                    >
                      "{p}"
                    </motion.p>
                  ))
                )}
              </div>

              {/* Signoff and Date */}
              <div className="pt-8 border-t border-[#E8C5CC] flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                <div className="space-y-1 text-right">
                  <p className="font-amiri text-lg text-[#6E2638]">
                    {letterData.signoff}
                  </p>
                  <p className="font-editorial text-xs text-[#8E495C] italic font-semibold">
                    Always & Forever
                  </p>
                </div>

                <div className="text-left sm:text-left">
                  <span className="font-editorial text-sm font-bold text-[#8E2F48] tracking-widest px-3 py-1 rounded-full bg-white/60 border border-[#E8C5CC]">
                    {letterData.dateString}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

      </div>
    </section>
  );
};
