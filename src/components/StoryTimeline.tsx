import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Calendar, Heart, Quote, Clock, MapPin, ExternalLink } from 'lucide-react';
import { TimelineMilestone } from '../types';
import { FALLBACK_CONFESSION_BUS_PHOTO, SPECIAL_CONFESSION_BUS_PHOTO } from '../data/memories';

interface StoryTimelineProps {
  milestones: TimelineMilestone[];
  onOpenPhotoLightbox?: (photoUrl: string, title: string) => void;
}

export const StoryTimeline: React.FC<StoryTimelineProps> = ({
  milestones,
  onOpenPhotoLightbox,
}) => {
  return (
    <section id="story" className="relative py-24 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#9C4B61] font-editorial bg-[#FFF0F4] px-4 py-1.5 rounded-full border border-[#F5CDD6]"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>OUR JOURNEY MILESTONES</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-amiri text-3xl sm:text-4xl md:text-5xl text-[#3A1824] font-normal"
          >
            كل شيء بدأ هنا.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xs sm:text-sm text-[#7D4C5C] max-w-md mx-auto leading-relaxed"
          >
            محطات صغيرة صنعت أعظم قصة حب... من أول اعتراف إلى كل اللحظات اللي عايشينها اليوم.
          </motion.p>
        </div>

        {/* Vertical Timeline Track */}
        <div className="relative">
          {/* Subtle connecting line */}
          <div className="absolute top-6 bottom-6 right-4 sm:right-1/2 sm:-translate-x-1/2 w-0.5 bg-gradient-to-b from-[#F2BBC7] via-[#E693A7] to-[#F2BBC7]" />

          <div className="space-y-12 sm:space-y-16">
            {milestones.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  className={`relative flex flex-col sm:flex-row items-start sm:items-center ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Center Node */}
                  <div className="absolute right-2 sm:right-1/2 sm:-translate-x-1/2 z-20 flex items-center justify-center w-7 h-7 rounded-full bg-[#8E2F48] text-white shadow-md border-4 border-[#FFF5F7]">
                    <Heart className="w-3 h-3 fill-white" />
                  </div>

                  {/* Content Card */}
                  <div
                    className={`w-full pr-12 sm:pr-0 sm:w-[calc(50%-2rem)] ${
                      isEven ? 'sm:text-right sm:pr-0' : 'sm:text-left sm:pl-0'
                    }`}
                  >
                    <div className="glass-panel-card p-5 sm:p-6 rounded-2xl shadow-[0_10px_30px_rgba(116,50,68,0.06)] border border-[#F3CDD6] space-y-4 hover:border-[#E599AC] transition-all group">
                      
                      {/* Top Header of Card */}
                      <div className="flex items-center justify-between gap-2 border-b border-[#F7E1E5] pb-3">
                        <span className="font-editorial text-xs font-semibold text-[#9E3953] tracking-wide">
                          {item.displayDate}
                        </span>
                        {item.badge && (
                          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#FFF0F3] text-[#862940] border border-[#F3CCD5] font-medium">
                            {item.badge}
                          </span>
                        )}
                      </div>

                      {/* Photo if present */}
                      {item.imageUrl && (
                        <div
                          onClick={() => onOpenPhotoLightbox?.(item.imageUrl!, item.title)}
                          className="relative aspect-[16/10] rounded-xl overflow-hidden cursor-pointer bg-[#F8ECF0] group-hover:shadow-md transition-all"
                        >
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
                        </div>
                      )}

                      {/* Titles & Description */}
                      <div className="space-y-1.5 text-right">
                        <h4 className="font-amiri text-xl sm:text-2xl text-[#441825] font-semibold">
                          {item.title}
                        </h4>
                        <p className="text-xs font-medium text-[#8F485B]">
                          {item.subtitle}
                        </p>
                        <p className="text-xs sm:text-sm text-[#5C2E3C] leading-relaxed pt-1">
                          {item.description}
                        </p>
                      </div>

                      {/* Emotional Quote */}
                      {item.quote && (
                        <div className="pt-2 border-t border-[#F8E3E7] flex items-start gap-2 text-right text-xs italic text-[#7C3649] font-amiri bg-[#FFF8FA] p-2.5 rounded-lg">
                          <Quote className="w-3.5 h-3.5 text-[#C4677E] shrink-0 mt-0.5" />
                          <span>"{item.quote}"</span>
                        </div>
                      )}

                      {/* Google Maps Exact Location Link */}
                      {item.mapUrl && (
                        <div className="pt-2">
                          <a
                            href={item.mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-between w-full px-3.5 py-2 rounded-xl bg-[#FFF2F5] hover:bg-[#FCE6EB] border border-[#F4CDD6] text-xs font-semibold text-[#8E2F48] transition-all duration-200 shadow-xs hover:shadow-sm group/map"
                          >
                            <span className="flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-[#A83854] group-hover/map:scale-110 transition-transform" />
                              <span>موقع اعترافنا: Les Oliviers (بجاية) 📍</span>
                            </span>
                            <span className="flex items-center gap-1 text-[11px] text-[#A6546A]">
                              <span>عرض على الخريطة</span>
                              <ExternalLink className="w-3 h-3 text-[#A6546A]" />
                            </span>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Empty Spacer on opposite side for desktop layout */}
                  <div className="hidden sm:block sm:w-[calc(50%-2rem)]" />
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
