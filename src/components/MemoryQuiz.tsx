import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, CheckCircle2, XCircle, Sparkles, Heart, Trophy, ArrowLeft, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS } from '../data/memories';

export const MemoryQuiz: React.FC = () => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentQIndex];

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = index === currentQ.correctIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      confetti({
        particleCount: 45,
        spread: 55,
        origin: { y: 0.7 },
        colors: ['#E295A8', '#8E2F48', '#FFD3DE'],
      });
    }
  };

  const handleNextQuestion = () => {
    if (currentQIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-[#FCF8F9] via-[#FFF1F4] to-[#FCF8F8]">
      <div className="max-w-2xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#9C4B61] font-editorial bg-white px-4 py-1.5 rounded-full border border-[#F5CDD6]"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>INTERACTIVE LOVE QUIZ</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-amiri text-3xl sm:text-4xl md:text-5xl text-[#3A1824] font-normal"
          >
            تتذكري؟ 👀
          </motion.h2>

          <p className="text-xs sm:text-sm text-[#7D4C5C]">
            اختبار صغير ولطيف نشوفوا بيه شكون عندو أقوى ذاكرة في حكايتنا!
          </p>
        </div>

        {/* Quiz Body */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {!quizFinished ? (
              <motion.div
                key={currentQIndex}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4 }}
                className="glass-panel-card p-6 sm:p-8 rounded-3xl border border-[#F3CDD6] shadow-[0_15px_40px_rgba(116,50,68,0.08)] space-y-6 text-right"
              >
                {/* Progress bar */}
                <div className="flex items-center justify-between text-xs text-[#9B5C6F] border-b border-[#F7E1E5] pb-3">
                  <span className="font-editorial font-semibold">
                    QUESTION {currentQIndex + 1} OF {QUIZ_QUESTIONS.length}
                  </span>
                  <span className="text-[#8E2F48] font-medium font-amiri">
                    النقاط: {score}
                  </span>
                </div>

                {/* Question */}
                <div className="space-y-1">
                  <h3 className="font-amiri text-xl sm:text-2xl text-[#3E1A26] font-semibold leading-snug">
                    {currentQ.question}
                  </h3>
                  {currentQ.hint && (
                    <p className="text-xs text-[#8A5263] italic">
                      💡 {currentQ.hint}
                    </p>
                  )}
                </div>

                {/* Options */}
                <div className="space-y-2.5 pt-2">
                  {currentQ.options.map((option, idx) => {
                    const isSelected = selectedOption === idx;
                    const isCorrect = idx === currentQ.correctIndex;

                    let btnStyle = 'bg-white/80 border-[#F3CDD6] text-[#4E1A29] hover:bg-[#FFF2F5]';
                    if (isAnswered) {
                      if (isCorrect) {
                        btnStyle = 'bg-[#EBF7EE] border-[#48BB78] text-[#1E723B] font-semibold shadow-xs';
                      } else if (isSelected) {
                        btnStyle = 'bg-[#FDF0F0] border-[#E53E3E] text-[#9B2C2C]';
                      } else {
                        btnStyle = 'bg-white/40 border-gray-200 text-gray-400 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={isAnswered}
                        onClick={() => handleSelectOption(indexToNumber(idx))}
                        className={`w-full p-4 rounded-2xl border text-right transition-all flex items-center justify-between text-sm sm:text-base font-amiri cursor-pointer ${btnStyle}`}
                      >
                        <span>{option}</span>
                        {isAnswered && isCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-[#38A169] shrink-0" />
                        )}
                        {isAnswered && isSelected && !isCorrect && (
                          <XCircle className="w-5 h-5 text-[#E53E3E] shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback note when answered */}
                {isAnswered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-2xl bg-[#FFF5F7] border border-[#F5CDD6] space-y-2"
                  >
                    <p className="font-amiri text-sm font-semibold text-[#8E2F48]">
                      {selectedOption === currentQ.correctIndex
                        ? currentQ.cuteReaction
                        : 'معليش... المهم الحكاية كلها في قلوبنا ❤️'}
                    </p>
                    <p className="text-xs text-[#6B3A4A] leading-relaxed">
                      {currentQ.explanation}
                    </p>

                    <div className="pt-2 text-left">
                      <button
                        onClick={handleNextQuestion}
                        className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#8E2F48] text-white text-xs font-semibold hover:bg-[#772237] transition-all cursor-pointer"
                      >
                        <span>
                          {currentQIndex === QUIZ_QUESTIONS.length - 1
                            ? 'النتيجة النهائية'
                            : 'السؤال التالي'}
                        </span>
                        <ArrowLeft className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              /* Quiz Summary Screen */
              <motion.div
                key="summary"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-panel-card p-8 sm:p-10 rounded-3xl border border-[#F3CDD6] shadow-[0_20px_50px_rgba(116,50,68,0.1)] text-center space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-[#FFF0F4] border border-[#F5CDD6] mx-auto flex items-center justify-center text-[#8E2F48] shadow-sm">
                  <Trophy className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-amiri text-3xl text-[#3E1A26] font-semibold">
                    كنت عارف بلي ما تنسايش ❤️
                  </h3>
                  <p className="text-sm text-[#8E2F48] font-bold font-editorial">
                    SCORE: {score} / {QUIZ_QUESTIONS.length}
                  </p>
                  <p className="font-amiri text-base sm:text-lg text-[#552736] max-w-md mx-auto leading-relaxed">
                    ذاكرتك مليانة حب وتفاصيل... وأنا ممتن لكل ثانية قضيناها وراح نقضيوها مع بعض.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleRestartQuiz}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white border border-[#F4CCD5] text-[#8E2F48] text-xs font-semibold shadow-xs hover:bg-[#FFF0F3] transition-all cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>إعادة الاختبار</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

function indexToNumber(idx: number): number {
  return idx;
}
