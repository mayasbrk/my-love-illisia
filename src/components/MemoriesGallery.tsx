import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, MapPin, Heart, Image as ImageIcon, Plus } from 'lucide-react';
import { MemoryItem } from '../types';
import { FALLBACK_CONFESSION_BUS_PHOTO, SPECIAL_CONFESSION_BUS_PHOTO } from '../data/memories';

interface MemoriesGalleryProps {
  memories: MemoryItem[];
  onSelectMemory: (memory: MemoryItem) => void;
  onOpenAddMemory?: () => void;
}

export const MemoriesGallery: React.FC<MemoriesGalleryProps> = ({
  memories,
  onSelectMemory,
  onOpenAddMemory,
}) => {
  const [selectedTag, setSelectedTag] = useState<string>('الكل');

  const tags = ['الكل', ...Array.from(new Set(memories.map((m) => m.tag)))];

  const filteredMemories =
    selectedTag === 'الكل'
      ? memories
      : memories.filter((m) => m.tag === selectedTag);

  return (
    <section id="memories" className="relative py-24 px-4 sm:px-6 bg-[#FAF4F5] overflow-hidden">
      {/* Background paper grid subtle effect */}
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#9C4B61] font-editorial bg-white px-4 py-1.5 rounded-full border border-[#F5CDD6] shadow-xs"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>OUR VISUAL SCRAPBOOK</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-amiri text-3xl sm:text-4xl md:text-5xl text-[#3A1824] font-normal"
          >
            جدار ذكرياتنا المصورة ♡
          </motion.h2>

          <p className="text-xs sm:text-sm text-[#7D4C5C] max-w-md mx-auto">
            كل صورة فيها حكاية، وكل لحظة فيها إحساس حقيقي ما يتنساش.
          </p>
        </div>

        {/* Tag Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-1.5 rounded-full text-xs transition-all cursor-pointer ${
                selectedTag === tag
                  ? 'bg-[#8E2F48] text-white shadow-sm font-medium'
                  : 'bg-white/80 text-[#673E4D] hover:bg-white border border-[#F3CCD5]'
              }`}
            >
              {tag}
            </button>
          ))}

          {onOpenAddMemory && (
            <button
              onClick={onOpenAddMemory}
              className="flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs bg-[#FFF2F5] text-[#8E2F48] border border-[#F4CCD5] hover:bg-[#FCE6EB] transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>إضافة ذكرى جديدة</span>
            </button>
          )}
        </div>

        {/* Polaroid Memory Wall Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 pt-4">
          <AnimatePresence>
            {filteredMemories.map((memory, index) => {
              const rotationDeg = memory.rotation || (index % 2 === 0 ? -2 : 2);

              return (
                <motion.div
                  layout
                  key={memory.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  style={{
                    transform: `rotate(${rotationDeg}deg)`,
                  }}
                  whileHover={{
                    rotate: 0,
                    scale: 1.02,
                    zIndex: 10,
                  }}
                  className="cursor-pointer"
                  onClick={() => onSelectMemory(memory)}
                >
                  {/* Polaroid Card */}
                  <div className="polaroid-card p-3 sm:p-4 rounded-xl border border-[#EED7DC] bg-white group flex flex-col space-y-3">
                    
                    {/* Top tape or pin decorative dot */}
                    <div className="mx-auto w-3 h-3 rounded-full bg-[#E4A2B2]/60 border border-[#FFF] shadow-xs -mt-1.5" />

                    {/* Image Box */}
                    <div className="relative aspect-[4/5] sm:aspect-square w-full rounded-lg overflow-hidden bg-[#FBF1F3]">
                      <img
                        src={memory.imageUrl || SPECIAL_CONFESSION_BUS_PHOTO}
                        alt={memory.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
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
                      
                      {/* Tag pill */}
                      <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-[10px] font-medium text-[#7D293E] shadow-xs">
                        {memory.tag}
                      </span>
                    </div>

                    {/* Handwritten style caption area */}
                    <div className="space-y-1.5 px-1 text-right">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-[#9A5C6F] font-editorial flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-[#B8576E]" />
                          {memory.date}
                        </span>
                        {memory.location && (
                          memory.mapUrl ? (
                            <a
                              href={memory.mapUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-[10px] text-[#8E2F48] font-medium hover:underline flex items-center gap-0.5 bg-[#FFF2F5] px-2 py-0.5 rounded-full border border-[#F5CAD4]"
                            >
                              <MapPin className="w-2.5 h-2.5 text-[#B8576E]" />
                              <span>{memory.location} 📍</span>
                            </a>
                          ) : (
                            <span className="text-[10px] text-[#A77685] flex items-center gap-0.5">
                              <MapPin className="w-2.5 h-2.5" />
                              {memory.location}
                            </span>
                          )
                        )}
                      </div>

                      <h4 className="font-amiri text-lg text-[#3F1B27] font-semibold group-hover:text-[#8E2F48] transition-colors line-clamp-1">
                        {memory.title}
                      </h4>

                      <p className="text-xs text-[#6B3E4E] line-clamp-2 leading-relaxed font-light">
                        {memory.description}
                      </p>
                    </div>

                    {/* Footer prompt */}
                    <div className="pt-2 border-t border-[#F8E5E9] text-center">
                      <span className="text-[10px] text-[#9A5C6F] font-editorial tracking-wider group-hover:text-[#8E2F48] transition-colors">
                        Click to view full memory ♡
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};
