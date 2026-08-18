import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { OpeningScreen } from './components/OpeningScreen';
import { FloatingNav } from './components/FloatingNav';
import { HeroSection } from './components/HeroSection';
import { LiveCounter } from './components/LiveCounter';
import { StoryTimeline } from './components/StoryTimeline';
import { MemoriesGallery } from './components/MemoriesGallery';
import { SecretLanguage } from './components/SecretLanguage';
import { SecretDictionary } from './components/SecretDictionary';
import { ThingsILove } from './components/ThingsILove';
import { SecretLetter } from './components/SecretLetter';
import { BirthdaySection } from './components/BirthdaySection';
import { IfICouldGoBack } from './components/IfICouldGoBack';
import { OurSongPlayer } from './components/OurSongPlayer';
import { SecretVault } from './components/SecretVault';
import { RandomMemory } from './components/RandomMemory';
import { MemoryQuiz } from './components/MemoryQuiz';
import { EasterEggs } from './components/EasterEggs';
import { FinalSection } from './components/FinalSection';
import { PhotoLightbox } from './components/PhotoLightbox';
import { CustomizerDrawer } from './components/CustomizerDrawer';
import { INITIAL_MEMORIES, TIMELINE_MILESTONES, DEFAULT_SECRET_PIN, SPECIAL_CONFESSION_BUS_PHOTO } from './data/memories';
import { MemoryItem } from './types';

export default function App() {
  // Opening gate state
  const [hasEntered, setHasEntered] = useState<boolean>(false);

  // Music state
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);

  // Lightbox state
  const [activeLightboxMemory, setActiveLightboxMemory] = useState<MemoryItem | null>(null);

  // Customizer drawer state
  const [isCustomizerOpen, setIsCustomizerOpen] = useState<boolean>(false);

  // Editable dynamic memories state (persisted to LocalStorage)
  const [memories, setMemories] = useState<MemoryItem[]>(() => {
    const saved = localStorage.getItem('app_memories');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (
          Array.isArray(parsed) &&
          (parsed.some((m: any) => m.imageUrl && m.imageUrl.includes('unsplash.com')) ||
            !parsed.some((m: any) => m.location && m.location.includes('Les Oliviers')))
        ) {
          return INITIAL_MEMORIES;
        }
        return parsed;
      } catch {
        return INITIAL_MEMORIES;
      }
    }
    return INITIAL_MEMORIES;
  });

  const [heroImage, setHeroImage] = useState<string>(() => {
    const saved = localStorage.getItem('app_hero_img');
    if (saved && !saved.includes('unsplash.com') && saved.startsWith('http') === false) return saved;
    return SPECIAL_CONFESSION_BUS_PHOTO;
  });

  const [birthdayImage, setBirthdayImage] = useState<string>(() => {
    const saved = localStorage.getItem('app_birthday_img');
    if (saved && !saved.includes('unsplash.com') && saved.startsWith('http') === false) return saved;
    return SPECIAL_CONFESSION_BUS_PHOTO;
  });

  const [secretPin, setSecretPin] = useState<string>(() => {
    const saved = localStorage.getItem('app_secret_pin');
    if (saved && saved !== '1801') return saved;
    return DEFAULT_SECRET_PIN;
  });

  const [customSongUrl, setCustomSongUrl] = useState<string>(() => {
    return (
      localStorage.getItem('app_custom_song_url') ||
      'https://youtu.be/GTWqwSNQCcg?si=TVFJ7kASnzeYCSAl'
    );
  });

  // Save changes to LocalStorage
  const handleUpdateMemories = (newMems: MemoryItem[]) => {
    setMemories(newMems);
    localStorage.setItem('app_memories', JSON.stringify(newMems));
  };

  const handleUpdateHeroImage = (url: string) => {
    setHeroImage(url);
    localStorage.setItem('app_hero_img', url);
  };

  const handleUpdateBirthdayImage = (url: string) => {
    setBirthdayImage(url);
    localStorage.setItem('app_birthday_img', url);
  };

  const handleUpdateSecretPin = (pin: string) => {
    setSecretPin(pin);
    localStorage.setItem('app_secret_pin', pin);
  };

  const handleUpdateCustomSongUrl = (url: string) => {
    setCustomSongUrl(url);
    localStorage.setItem('app_custom_song_url', url);
  };

  // Helper to open lightbox with any arbitrary photo
  const handleOpenPhoto = (imageUrl: string, title: string) => {
    setActiveLightboxMemory({
      id: 'quick-view',
      title,
      date: '18.01.2024',
      description: 'لحظة خاصة لا تُنسى من قصتنا الجميلة.',
      imageUrl,
      tag: 'ذكرى خاصة',
    });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FCF8F8] text-[#3D262E] relative font-modern antialiased selection:bg-[#F3CCD5] selection:text-[#521C2B]">
      
      {/* Cinematic Opening Gate */}
      <AnimatePresence>
        {!hasEntered && (
          <OpeningScreen
            onEnter={() => {
              setHasEntered(true);
            }}
          />
        )}
      </AnimatePresence>

      {/* Main Experience when entered */}
      {hasEntered && (
        <div className="animate-fadeIn">
          {/* Floating Navigation */}
          <FloatingNav
            isPlayingMusic={isPlayingMusic}
            onToggleMusic={() => setIsPlayingMusic(!isPlayingMusic)}
            onOpenVault={() => scrollToSection('vault')}
            onOpenCustomizer={() => setIsCustomizerOpen(true)}
          />

          {/* 1. Hero Section */}
          <HeroSection
            heroImageUrl={heroImage}
            onExploreClick={() => scrollToSection('counter')}
            onOpenPhotoLightbox={handleOpenPhoto}
          />

          {/* 2. Live Relationship Counter */}
          <LiveCounter />

          {/* 3. Story Timeline */}
          <StoryTimeline
            milestones={TIMELINE_MILESTONES}
            onOpenPhotoLightbox={handleOpenPhoto}
          />

          {/* 4. Memories Scrapbook Gallery */}
          <MemoriesGallery
            memories={memories}
            onSelectMemory={(mem) => setActiveLightboxMemory(mem)}
            onOpenAddMemory={() => setIsCustomizerOpen(true)}
          />

          {/* 5. Our Secret Language (Mosquito Poem + Untranslated Phrases) */}
          <SecretLanguage />

          {/* 6. Secret Dictionary Lexicon */}
          <SecretDictionary />

          {/* 7. Things I Love About You */}
          <ThingsILove />

          {/* 8. Secret Handwritten Letter */}
          <SecretLetter />

          {/* 9. Birthday Special Section (23.01) + Next Birthday Countdown */}
          <BirthdaySection
            birthdayImageUrl={birthdayImage}
            onOpenPhotoLightbox={handleOpenPhoto}
          />

          {/* 10. "If I Could Go Back" Cinematic Section */}
          <IfICouldGoBack
            photoUrl={heroImage}
            onOpenPhotoLightbox={handleOpenPhoto}
          />

          {/* 11. Our Song Interactive Player */}
          <OurSongPlayer
            isPlaying={isPlayingMusic}
            onTogglePlay={() => setIsPlayingMusic(!isPlayingMusic)}
            onSetPlaying={(playing) => setIsPlayingMusic(playing)}
            customSongUrl={customSongUrl}
          />

          {/* 12. Random Memory Generator ("فاجئيني ❤️") */}
          <RandomMemory />

          {/* 13. Memory Quiz ("تتذكري؟ 👀") */}
          <MemoryQuiz />

          {/* 14. Password Vault ("للعيون المعنية فقط 👀") */}
          <SecretVault
            secretPin={secretPin}
            onOpenPhotoLightbox={handleOpenPhoto}
          />

          {/* 15. Final Section (18.01.2024 → ∞) */}
          <FinalSection
            finalImageUrl={heroImage}
            onOpenPhotoLightbox={handleOpenPhoto}
          />

          {/* Hidden Interactive Easter Eggs (Clickable Heart) */}
          <EasterEggs />

          {/* Photo Lightbox Modal */}
          <PhotoLightbox
            memory={activeLightboxMemory}
            onClose={() => setActiveLightboxMemory(null)}
          />

          {/* Customizer Drawer */}
          <CustomizerDrawer
            isOpen={isCustomizerOpen}
            onClose={() => setIsCustomizerOpen(false)}
            memories={memories}
            onUpdateMemories={handleUpdateMemories}
            heroImage={heroImage}
            onUpdateHeroImage={handleUpdateHeroImage}
            birthdayImage={birthdayImage}
            onUpdateBirthdayImage={handleUpdateBirthdayImage}
            secretPin={secretPin}
            onUpdateSecretPin={handleUpdateSecretPin}
            customSongUrl={customSongUrl}
            onUpdateCustomSongUrl={handleUpdateCustomSongUrl}
          />
        </div>
      )}

    </div>
  );
}
