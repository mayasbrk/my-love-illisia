import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Disc, Heart, Sparkles, ExternalLink, Video, Music2 } from 'lucide-react';

interface OurSongPlayerProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onSetPlaying?: (playing: boolean) => void;
  customSongUrl?: string;
  songTitle?: string;
  songArtist?: string;
  songNote?: string;
}

export function extractYouTubeId(url: string): string {
  if (!url) return 'GTWqwSNQCcg';
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : 'GTWqwSNQCcg';
}

export const OurSongPlayer: React.FC<OurSongPlayerProps> = ({
  isPlaying,
  onTogglePlay,
  onSetPlaying,
  customSongUrl = 'https://youtu.be/GTWqwSNQCcg?si=TVFJ7kASnzeYCSAl',
  songTitle = 'أغنيتنا المفضلة ♡',
  songArtist = 'Our Special Soundtrack',
  songNote = 'الموسيقى اللي ترجع كل الذكريات الجميلة بمجرد ما نسمعوها... نهار اللي سمعناها أول مرة وكل مرة.',
}) => {
  const [activeTab, setActiveTab] = useState<'vinyl' | 'video'>('vinyl');
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const videoId = extractYouTubeId(customSongUrl);

  // Send play/pause commands to YouTube IFrame API via postMessage
  useEffect(() => {
    if (!iframeRef.current || !iframeRef.current.contentWindow) return;
    try {
      const command = isPlaying ? 'playVideo' : 'pauseVideo';
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: command, args: '' }),
        '*'
      );
    } catch (e) {
      console.warn('YouTube postMessage error:', e);
    }
  }, [isPlaying]);

  // Listen to messages from YouTube player to synchronize play/pause state
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        if (data && data.event === 'onStateChange') {
          // YT.PlayerState: 1 = PLAYING, 2 = PAUSED, 0 = ENDED
          if (data.info === 1 && !isPlaying) {
            onSetPlaying?.(true);
          } else if ((data.info === 2 || data.info === 0) && isPlaying) {
            onSetPlaying?.(false);
          }
        }
      } catch {
        // Non-JSON message from other sources
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [isPlaying, onSetPlaying]);

  return (
    <section id="our-song" className="relative py-24 px-4 sm:px-6 bg-[#FAF3F5] overflow-hidden">
      {/* Soft romantic background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-[#E599AC]/15 blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10 space-y-6">
        
        {/* Card Header & View Switcher */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-right sm:text-right w-full sm:w-auto">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#9C4B61] font-editorial bg-white px-4 py-1.5 rounded-full border border-[#F5CDD6]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>OUR SPECIAL SOUNDTRACK</span>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-white/80 backdrop-blur-md rounded-2xl border border-[#F4CCD5] shadow-xs">
            <button
              onClick={() => setActiveTab('vinyl')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'vinyl'
                  ? 'bg-[#8E2F48] text-white shadow-xs'
                  : 'text-[#7D4C5C] hover:bg-[#FFF0F4]'
              }`}
            >
              <Music2 className="w-3.5 h-3.5" />
              <span>الأسطوانة الكلاسيكية</span>
            </button>
            <button
              onClick={() => setActiveTab('video')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'video'
                  ? 'bg-[#8E2F48] text-white shadow-xs'
                  : 'text-[#7D4C5C] hover:bg-[#FFF0F4]'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>مشاهدة الكليب</span>
            </button>
          </div>
        </div>

        {/* Main Player Box */}
        <div className="glass-panel-card p-6 sm:p-10 rounded-3xl border border-[#F3CDD6] shadow-[0_15px_40px_rgba(116,50,68,0.08)] text-right">
          
          <AnimatePresence mode="wait">
            {activeTab === 'vinyl' ? (
              /* Vinyl View */
              <motion.div
                key="vinyl-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col md:flex-row items-center gap-8"
              >
                {/* Vinyl Disc */}
                <div className="relative shrink-0">
                  <motion.div
                    animate={{ rotate: isPlaying ? 360 : 0 }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-[#200F17] p-2.5 shadow-2xl border-4 border-[#3D202C] flex items-center justify-center relative cursor-pointer"
                    onClick={onTogglePlay}
                  >
                    {/* Vinyl grooves */}
                    <div className="w-full h-full rounded-full border border-dashed border-[#5F3042]/70 flex items-center justify-center">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#9B3953] to-[#7B243B] flex items-center justify-center text-white border-2 border-[#FFE8ED] shadow-inner">
                        <Disc className={`w-8 h-8 opacity-90 ${isPlaying ? 'animate-pulse' : ''}`} />
                      </div>
                    </div>
                  </motion.div>

                  {/* Sound Wave Animation */}
                  {isPlaying && (
                    <div className="absolute -bottom-3 inset-x-0 flex justify-center gap-1.5">
                      {[12, 24, 18, 28, 14, 22].map((height, i) => (
                        <motion.span
                          key={i}
                          animate={{ height: ['4px', `${height}px`, '4px'] }}
                          transition={{
                            duration: 0.55 + i * 0.1,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                          className="w-1 bg-[#8E2F48] rounded-full shadow-xs"
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Song Info & Controls */}
                <div className="flex-1 space-y-4 w-full">
                  <div className="flex items-center justify-between border-b border-[#F7E1E5] pb-2">
                    <span className="font-editorial text-xs text-[#9C586B] tracking-wider uppercase font-semibold">
                      YOUTUBE SOUNDTRACK
                    </span>
                    <a
                      href={customSongUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#8E2F48] hover:text-[#701E34] flex items-center gap-1 font-amiri hover:underline"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>فتح على YouTube</span>
                    </a>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-amiri text-2xl sm:text-3xl text-[#3D1825] font-semibold">
                      {songTitle}
                    </h3>
                    <p className="font-editorial text-xs text-[#8F5566] tracking-wider">
                      {songArtist}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-[#6C3C4C] font-light leading-relaxed">
                    {songNote}
                  </p>

                  {/* Controls & Progress */}
                  <div className="pt-2 space-y-3">
                    <div className="flex items-center gap-4">
                      <button
                        id="btn-play-our-song"
                        onClick={onTogglePlay}
                        className="w-14 h-14 rounded-full bg-[#8E2F48] text-white flex items-center justify-center shadow-lg hover:bg-[#782337] hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
                      >
                        {isPlaying ? (
                          <Pause className="w-6 h-6 fill-white" />
                        ) : (
                          <Play className="w-6 h-6 fill-white mr-0.5" />
                        )}
                      </button>

                      <div className="flex-1 space-y-1.5">
                        <div className="h-2.5 w-full bg-[#F5D3DC] rounded-full overflow-hidden">
                          <motion.div
                            animate={{ width: isPlaying ? '100%' : '40%' }}
                            transition={{ duration: isPlaying ? 180 : 0.3 }}
                            className="h-full bg-gradient-to-r from-[#C4617A] to-[#8E2F48] rounded-full"
                          />
                        </div>
                        <div className="flex justify-between text-[11px] text-[#9A6273] font-editorial">
                          <span>{isPlaying ? 'Playing Our Song...' : 'Paused'}</span>
                          <span>18.01.2024 ♡</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            ) : (
              /* Video Clip View */
              <motion.div
                key="video-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-lg border border-[#F3CCD5] bg-black">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${videoId}?enablejsapi=1&origin=${typeof window !== 'undefined' ? window.location.origin : ''}&rel=0&modestbranding=1`}
                    title="Our Song YouTube Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-[#8A5263]">
                  <span>مشاهدة مباشرة لأغنيتنا المفضلة ❤️</span>
                  <a
                    href={customSongUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8E2F48] hover:underline flex items-center gap-1"
                  >
                    <span>فتح في تطبيق YouTube</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hidden YouTube background audio iframe for Vinyl mode */}
          <div className="hidden">
            <iframe
              ref={iframeRef}
              src={`https://www.youtube-nocookie.com/embed/${videoId}?enablejsapi=1&origin=${typeof window !== 'undefined' ? window.location.origin : ''}&rel=0&modestbranding=1`}
              title="YouTube Audio Stream"
              allow="autoplay"
            />
          </div>

        </div>

      </div>
    </section>
  );
};

