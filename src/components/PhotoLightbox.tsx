import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, MapPin, Quote, Heart, ExternalLink } from 'lucide-react';
import { MemoryItem } from '../types';
import { FALLBACK_CONFESSION_BUS_PHOTO, SPECIAL_CONFESSION_BUS_PHOTO } from '../data/memories';

interface PhotoLightboxProps {
  memory: MemoryItem | null;
  onClose: () => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({ memory, onClose }) => {
  if (!memory) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#F3CDD6] my-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 z-20 w-9 h-9 rounded-full bg-white/80 backdrop-blur-xs text-[#522533] hover:bg-white flex items-center justify-center shadow-md transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image side */}
            <div className="relative aspect-square sm:aspect-auto sm:min-h-[380px] bg-[#FBF1F3] overflow-hidden">
              <img
                src={memory.imageUrl || SPECIAL_CONFESSION_BUS_PHOTO}
                alt={memory.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
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
              <div className="absolute top-4 right-4 bg-[#8E2F48] text-white text-xs px-3 py-1 rounded-full shadow-md">
                {memory.tag}
              </div>
            </div>

            {/* Content side */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6 text-right">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-[#9B5C6F] font-editorial border-b border-[#F8E3E7] pb-3">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <Calendar className="w-3.5 h-3.5 text-[#B8576E]" />
                    {memory.date}
                  </span>
                  {memory.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#B8576E]" />
                      {memory.location}
                    </span>
                  )}
                </div>

                <h3 className="font-amiri text-2xl sm:text-3xl text-[#3E1A26] font-semibold leading-snug">
                  {memory.title}
                </h3>

                <p className="text-sm text-[#5D303F] leading-relaxed font-light">
                  {memory.description}
                </p>

                {memory.quote && (
                  <div className="p-3.5 rounded-xl bg-[#FFF3F6] border border-[#F6D0DA] flex items-start gap-2.5 text-xs italic text-[#78283D] font-amiri">
                    <Quote className="w-4 h-4 text-[#C2647C] shrink-0 mt-0.5" />
                    <span>"{memory.quote}"</span>
                  </div>
                )}

                {memory.mapUrl && (
                  <div className="pt-2">
                    <a
                      href={memory.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#8E2F48] text-white text-xs font-semibold shadow-sm hover:bg-[#78243A] hover:scale-[1.01] active:scale-[0.99] transition-all"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>فتح موقع Les Oliviers (بجاية) في Google Maps 📍</span>
                      <ExternalLink className="w-3 h-3 opacity-80" />
                    </a>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-[#F8E3E7] flex items-center justify-between text-xs text-[#9A6273]">
                <div className="flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 fill-[#8E2F48] text-[#8E2F48]" />
                  <span>ذكرى محفورة في القلب</span>
                </div>
                <span className="font-editorial text-xs">18.01.2024</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
