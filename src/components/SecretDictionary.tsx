import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookMarked, Search, Plus, Sparkles, Tag, Heart } from 'lucide-react';
import { DictionaryEntry } from '../types';
import { DICTIONARY_ENTRIES } from '../data/memories';

interface SecretDictionaryProps {
  entries?: DictionaryEntry[];
  onAddNewEntry?: () => void;
}

export const SecretDictionary: React.FC<SecretDictionaryProps> = ({
  entries = DICTIONARY_ENTRIES,
  onAddNewEntry,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filterOptions = [
    { key: 'all', label: 'كل المفردات' },
    { key: 'private language', label: 'لغة خاصة' },
    { key: 'inside joke', label: 'نكت داخلية' },
    { key: 'makes her laugh', label: 'تضحكها ديما' },
  ];

  const filteredEntries = entries.filter((entry) => {
    const matchesSearch =
      entry.phrase.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (entry.note && entry.note.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesFilter =
      activeFilter === 'all' ? true : entry.tag === activeFilter;

    return matchesSearch && matchesFilter;
  });

  return (
    <section className="relative py-20 px-4 sm:px-6 bg-[#FCF7F8]">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#9C4B61] font-editorial bg-white px-4 py-1.5 rounded-full border border-[#F5CDD6]">
            <BookMarked className="w-3.5 h-3.5" />
            <span>OUR PRIVATE LEXICON / 2024 — ∞</span>
          </div>

          <h3 className="font-amiri text-2xl sm:text-3xl md:text-4xl text-[#3A1824] font-normal">
            قاموسنا المشفر 📖✨
          </h3>

          <p className="text-xs sm:text-sm text-[#7D4C5C] max-w-md mx-auto">
            مجموعة كلمات وجمل ولدت من مواقفنا... كل كلمة وراها قصة وابتسامة.
          </p>
        </div>

        {/* Search and Filters Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/90 p-4 rounded-2xl border border-[#F3CDD6] shadow-sm">
          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="ابحث في القاموس..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-10 py-2 rounded-xl text-xs bg-[#FFF6F8] border border-[#F6D0DA] focus:outline-none focus:border-[#C2647C] text-[#4E1A29]"
            />
            <Search className="w-4 h-4 text-[#A86478] absolute right-3 top-1/2 -translate-y-1/2" />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {filterOptions.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`px-3 py-1 rounded-full text-xs transition-colors cursor-pointer ${
                  activeFilter === f.key
                    ? 'bg-[#8E2F48] text-white font-medium'
                    : 'bg-[#FFF2F5] text-[#78374A] hover:bg-[#FBE4E9]'
                }`}
              >
                {f.label}
              </button>
            ))}

            {onAddNewEntry && (
              <button
                onClick={onAddNewEntry}
                className="p-1.5 rounded-full bg-[#8E2F48] text-white hover:bg-[#722035] transition-colors"
                title="إضافة كلمة جديدة"
              >
                <Plus className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Dictionary Entries Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AnimatePresence>
            {filteredEntries.map((entry, idx) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="bg-white p-5 rounded-2xl border border-[#F3CDD6] shadow-xs space-y-3 hover:shadow-md hover:border-[#E599AC] transition-all text-right"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-editorial tracking-wider px-2.5 py-0.5 rounded-full bg-[#FFF0F4] text-[#862940] border border-[#F5CDD6]">
                    {entry.tag}
                  </span>
                  {entry.dateAdded && (
                    <span className="text-[10px] text-[#A67180] font-editorial">
                      {entry.dateAdded}
                    </span>
                  )}
                </div>

                <h4 className="font-editorial text-lg sm:text-xl font-bold text-[#4B1726] tracking-wide">
                  "{entry.phrase}"
                </h4>

                {entry.note && (
                  <p className="font-amiri text-xs sm:text-sm text-[#663544] leading-relaxed">
                    {entry.note}
                  </p>
                )}

                <div className="pt-2 border-t border-[#F8E3E7] flex items-center justify-between text-[10px] text-[#B07A8A]">
                  <span className="flex items-center gap-1">
                    <Heart className="w-2.5 h-2.5 fill-[#C2647C] text-[#C2647C]" />
                    <span>سري وغير قابل للنشر</span>
                  </span>
                  <span>#0{idx + 1}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
