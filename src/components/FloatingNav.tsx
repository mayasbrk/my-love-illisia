import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Music, Sparkles, Lock, Menu, X, Camera } from 'lucide-react';

interface FloatingNavProps {
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
  onOpenVault: () => void;
  onOpenCustomizer: () => void;
}

export const FloatingNav: React.FC<FloatingNavProps> = ({
  isPlayingMusic,
  onToggleMusic,
  onOpenVault,
  onOpenCustomizer,
}) => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const navItems = [
    { id: 'hero', label: 'البداية' },
    { id: 'counter', label: 'عداد حبنا' },
    { id: 'story', label: 'حكايتنا' },
    { id: 'memories', label: 'ذكرياتنا' },
    { id: 'secret-language', label: 'لغتنا' },
    { id: 'things-i-love', label: 'أحب فيكِ' },
    { id: 'letter', label: 'رسالتي' },
    { id: 'birthday', label: 'عيد ميلادك' },
    { id: 'ending', label: '∞' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 150);

      const sectionElements = navItems.map((item) => ({
        id: item.id,
        el: document.getElementById(item.id),
      }));

      const scrollPosition = window.scrollY + 250;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const item = sectionElements[i];
        if (item.el && item.el.offsetTop <= scrollPosition) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop Floating Bar */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed top-4 inset-x-0 z-40 mx-auto max-w-fit px-3 hidden md:flex items-center gap-1.5 py-2 rounded-full glass-panel shadow-[0_10px_30px_rgba(116,50,68,0.09)] border border-[#F4D5DB]/80 transition-all duration-300"
      >
        <button
          id="nav-brand-btn"
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#8B2D46] hover:bg-[#FCECEF]/80 transition-colors font-editorial tracking-wider ml-1"
        >
          <Heart className="w-3.5 h-3.5 fill-[#8B2D46] text-[#8B2D46]" />
          <span>18.01.2024</span>
        </button>

        <div className="h-4 w-px bg-[#F1CCD5] mx-1" />

        {navItems.map((item) => (
          <button
            key={item.id}
            id={`nav-link-${item.id}`}
            onClick={() => scrollToSection(item.id)}
            className={`px-3 py-1 rounded-full text-xs transition-all duration-200 cursor-pointer ${
              activeSection === item.id
                ? 'bg-[#8B2D46] text-white font-medium shadow-sm'
                : 'text-[#6C4251] hover:text-[#8B2D46] hover:bg-[#FBE9ED]/60'
            }`}
          >
            {item.label}
          </button>
        ))}

        <div className="h-4 w-px bg-[#F1CCD5] mx-1" />

        {/* Music button */}
        <button
          id="nav-music-toggle"
          onClick={onToggleMusic}
          title={isPlayingMusic ? 'إيقاف الموسيقى' : 'تشغيل موسيقانا'}
          className={`p-1.5 rounded-full transition-all cursor-pointer ${
            isPlayingMusic
              ? 'bg-[#EBC7D1] text-[#78243A] animate-pulse'
              : 'text-[#8C5868] hover:bg-[#FBE9ED]'
          }`}
        >
          <Music className="w-4 h-4" />
        </button>

        {/* Vault button */}
        <button
          id="nav-vault-toggle"
          onClick={onOpenVault}
          title="المنطقة السرية"
          className="p-1.5 rounded-full text-[#8C5868] hover:bg-[#FBE9ED] hover:text-[#8B2D46] transition-colors cursor-pointer"
        >
          <Lock className="w-4 h-4" />
        </button>

        {/* Customizer button */}
        <button
          id="nav-customizer-toggle"
          onClick={onOpenCustomizer}
          title="تعديل الصور والذكريات"
          className="p-1.5 rounded-full text-[#8C5868] hover:bg-[#FBE9ED] hover:text-[#8B2D46] transition-colors cursor-pointer"
        >
          <Camera className="w-4 h-4" />
        </button>
      </motion.nav>

      {/* Mobile Top Floating Bar */}
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-3 inset-x-3 z-40 flex md:hidden items-center justify-between px-4 py-2.5 rounded-full glass-panel shadow-[0_8px_25px_rgba(116,50,68,0.1)] border border-[#F4D5DB]/80"
      >
        <button
          id="mobile-nav-brand"
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#8B2D46] font-editorial"
        >
          <Heart className="w-3.5 h-3.5 fill-[#8B2D46] text-[#8B2D46]" />
          <span>18.01.2024</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            id="mobile-music-toggle"
            onClick={onToggleMusic}
            className={`p-1.5 rounded-full ${
              isPlayingMusic
                ? 'bg-[#EBC7D1] text-[#78243A]'
                : 'text-[#8C5868]'
            }`}
          >
            <Music className="w-4 h-4" />
          </button>

          <button
            id="mobile-vault-toggle"
            onClick={onOpenVault}
            className="p-1.5 rounded-full text-[#8C5868]"
          >
            <Lock className="w-4 h-4" />
          </button>

          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-full bg-[#FCE8ED] text-[#8B2D46]"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 inset-x-3 z-40 p-4 rounded-3xl glass-panel-card shadow-2xl border border-[#F3CDD6] md:hidden space-y-2"
          >
            <div className="grid grid-cols-2 gap-2 text-right">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-2.5 rounded-xl text-xs text-right transition-colors ${
                    activeSection === item.id
                      ? 'bg-[#8B2D46] text-white font-medium'
                      : 'bg-white/60 text-[#5D3240] hover:bg-[#FBE4E9]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-[#F1CCD5] flex items-center justify-between text-xs text-[#8B2D46]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCustomizer();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FFF0F3]"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>إضافة/تعديل الصور</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenVault();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FFF0F3]"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>المنطقة السرية</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
