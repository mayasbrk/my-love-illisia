import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Unlock, KeyRound, Sparkles, Heart, AlertCircle, MapPin, ExternalLink, Star, Smile, Crown, Eye, EyeOff } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DEFAULT_SECRET_PIN, SPECIAL_CONFESSION_BUS_PHOTO, CONFESSION_MAPS_URL, FALLBACK_CONFESSION_BUS_PHOTO } from '../data/memories';

interface SecretVaultProps {
  isOpenModal?: boolean;
  onCloseModal?: () => void;
  secretPin?: string;
  onOpenPhotoLightbox?: (photoUrl: string, title: string) => void;
}

interface TraitItem {
  word: string;
  arabicNote: string;
  category: 'beauty' | 'personality' | 'love';
}

const HER_ENGLISH_TRAITS: TraitItem[] = [
  { word: 'PRETTY', arabicNote: 'بسيطة، ساحرة، وخاطفة للأنفاس في كل تفصيل', category: 'beauty' },
  { word: 'CUTE', arabicNote: 'ضحكتك وبرائتك وحركاتك العفوية اللي تذوّب قلبي', category: 'personality' },
  { word: 'GORGEOUS', arabicNote: 'جمالك الاستثنائي اللي ما كاينش مثله في الدنيا', category: 'beauty' },
  { word: 'ADORABLE', arabicNote: 'ألطف وأعذب كائن شفتو عيني، ما نقدرش نقاوم حنيتك', category: 'personality' },
  { word: 'SWEETEST SOUL', arabicNote: 'أطيب روح وأنقى قلب دخل حياتي وبدّلها للأجمل', category: 'personality' },
  { word: 'BEAUTIFUL', arabicNote: 'جمال روحك العميقة قبل ملامحك الفاتنة', category: 'beauty' },
  { word: 'IRRESISTIBLE', arabicNote: 'سحر وجاذبية خاصة تخليني ديما نغزر ليك ومستحيل نشبع منك', category: 'beauty' },
  { word: 'RADIANT', arabicNote: 'تنوري أي مكان تكوني فيه كالشمس بابتسامتك وطلتك', category: 'beauty' },
  { word: 'CHARMING', arabicNote: 'أسلوبك الراقي وطريقتك الحلوة في الهدرة اللي تسحر', category: 'personality' },
  { word: 'ELEGANT', arabicNote: 'أناقة وهدوء ورقي في كل خطوة وتصرف', category: 'beauty' },
  { word: 'MY SUNSHINE', arabicNote: 'الشمس اللي تدفّي أيامي وتنوّر طريقي وين ما نروح', category: 'love' },
  { word: 'MY WHOLE WORLD', arabicNote: 'دنيتي كاملة، البداية والنهاية وكل ما نملك', category: 'love' },
  { word: 'QUEEN OF MY HEART', arabicNote: 'ملكة قلبي المتربعة على عرشه للأبد', category: 'love' },
  { word: 'KIND-HEARTED', arabicNote: 'حنينة، طيبة، وتخافي عليا من كل حاجة', category: 'personality' },
  { word: 'PRECIOUS GEM', arabicNote: 'أثمن وأغلى هدية رزقني بيها ربي', category: 'love' },
  { word: 'MY SAFE HAVEN', arabicNote: 'ملجأي الوحيد، راحتي وسلامي بعد كل تعب', category: 'love' },
  { word: 'PERFECT IN MY EYES', arabicNote: 'كاملة ومثالية في عيني بكل تفاصيلك الصغيرة', category: 'beauty' },
  { word: 'LOVING & CARING', arabicNote: 'اهتمامك الصادق وحبك اللي ما يتعوضش بكنوز الدنيا', category: 'love' },
];

export const SecretVault: React.FC<SecretVaultProps> = ({
  isOpenModal = false,
  onCloseModal,
  secretPin = DEFAULT_SECRET_PIN,
  onOpenPhotoLightbox,
}) => {
  const [passwordInput, setPasswordInput] = useState('');
  const [showPasswordText, setShowPasswordText] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [selectedTrait, setSelectedTrait] = useState<TraitItem | null>(HER_ENGLISH_TRAITS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = passwordInput.trim().replace(/\s+/g, '');
    const cleanNoSlash = cleanInput.replace(/[/.-]/g, '');

    if (
      cleanInput === secretPin ||
      cleanInput === '18/01/2024' ||
      cleanInput === '18.01.2024' ||
      cleanInput === '18-01-2024' ||
      cleanNoSlash === '18012024' ||
      cleanNoSlash === '1801' ||
      cleanInput === '18/01' ||
      cleanInput === '2301' ||
      cleanInput === '23/01/2024'
    ) {
      setIsUnlocked(true);
      setErrorMsg('');
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8E2F48', '#FFCCD7', '#E295A8', '#FFD166'],
      });
    } else {
      setErrorMsg('كلمة السر غير صحيحة... تذكري تاريخ أول اعتراف بحبنا في بجاية 👀');
    }
  };

  const secretGallery = [
    {
      title: 'صورتنا في الحافلة — 18.01.2024 ♡',
      date: '18.01.2024 — الخميس',
      url: SPECIAL_CONFESSION_BUS_PHOTO,
      note: 'صورتنا معاً في الحافلة وأنتِ جالسة بجانبي وحنا مروحين، بعد ذلك اليوم المميز في Les Oliviers في بجاية عندما اعترفت لكِ بحبي ❤️',
    },
  ];

  return (
    <section id="vault" className="relative py-24 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-[#FCF8F8] via-[#FFF3F6] to-[#FCF8F8]">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#9C4B61] font-editorial bg-[#FFF0F4] px-4 py-1.5 rounded-full border border-[#F5CDD6]"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>CLASSIFIED VAULT • FOR HER EYES ONLY</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-amiri text-3xl sm:text-4xl md:text-5xl text-[#3A1824] font-normal"
          >
            للعيون المعنية فقط 👀
          </motion.h2>

          <p className="text-xs sm:text-sm text-[#7D4C5C] max-w-md mx-auto font-amiri">
            مساحة مشفرة خاصة تجمع صفاتكِ الساحرة، ورسائل وذكريات تتطلب رمز الدخول السري.
          </p>
        </div>

        {/* Vault Lock Box or Unlocked Content */}
        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {!isUnlocked ? (
              /* Password Gate Box */
              <motion.div
                key="locked"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-panel-card p-8 sm:p-10 rounded-3xl border border-[#F3CDD6] shadow-[0_20px_50px_rgba(116,50,68,0.09)] text-center space-y-6 max-w-xl mx-auto"
              >
                <div className="w-16 h-16 rounded-full bg-[#FFF0F4] border border-[#F5CDD6] mx-auto flex items-center justify-center text-[#8E2F48] shadow-sm">
                  <KeyRound className="w-7 h-7" />
                </div>

                <div className="space-y-1">
                  <h3 className="font-amiri text-2xl text-[#3E1A26] font-semibold">
                    أدخلي الرمز السري للفتح
                  </h3>
                  <p className="text-xs text-[#8A5263] font-amiri">
                    تلميح: تاريخ يوم اعترافنا الأول في بجاية ♡
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 max-w-xs mx-auto">
                  <div className="relative flex items-center">
                    <input
                      id="vault-pin-input"
                      type={showPasswordText ? 'text' : 'password'}
                      maxLength={14}
                      placeholder="••••••••••"
                      value={passwordInput}
                      onChange={(e) => {
                        setPasswordInput(e.target.value);
                        setErrorMsg('');
                      }}
                      className="w-full text-center tracking-widest text-xl py-3 px-10 rounded-2xl bg-white border border-[#F5CCD6] focus:outline-none focus:border-[#8E2F48] text-[#4E1A29] font-editorial placeholder:text-[#D1A4B0]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswordText(!showPasswordText)}
                      className="absolute left-3 text-[#A66E7E] hover:text-[#8E2F48] transition-colors p-1 cursor-pointer"
                      title={showPasswordText ? 'إخفاء' : 'إظهار'}
                    >
                      {showPasswordText ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {errorMsg && (
                    <p className="text-xs text-[#B8324F] font-medium flex items-center justify-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errorMsg}</span>
                    </p>
                  )}

                  <button
                    id="btn-unlock-vault"
                    type="submit"
                    className="w-full py-3 px-6 rounded-2xl bg-[#8E2F48] text-white text-sm font-semibold shadow-md hover:bg-[#772237] hover:scale-102 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Unlock className="w-4 h-4" />
                    <span>فتح الصندوق السري ♡</span>
                  </button>
                </form>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setShowHint(!showHint)}
                    className="text-[11px] text-[#A66E7E] hover:text-[#8E2F48] underline cursor-pointer"
                  >
                    {showHint
                      ? 'تلميح إضافي: اليوم الذي بدأ فيه كل شيء في Les Oliviers — (اليوم/الشهر/السنة)'
                      : 'هل تحتاجين تلميحاً إضافياً؟'}
                  </button>
                </div>
              </motion.div>
            ) : (
              /* Unlocked Content */
              <motion.div
                key="unlocked"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="glass-panel-card p-6 sm:p-10 rounded-3xl border border-[#F3CDD6] shadow-[0_20px_50px_rgba(116,50,68,0.12)] space-y-8 text-right"
              >
                {/* Greeting banner */}
                <div className="text-center space-y-2 border-b border-[#F7E1E5] pb-6">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAF7EE] text-[#1E723B] border border-[#C6ECD3] text-xs font-semibold">
                    <Unlock className="w-3.5 h-3.5" />
                    <span>تم فتح القفل بنجاح • Vault Unlocked</span>
                  </div>

                  <h3 className="font-amiri text-3xl sm:text-4xl text-[#8E2F48] font-bold">
                    عرفتكِ يا ست البنات ❤️
                  </h3>

                  <p className="font-amiri text-lg text-[#552534]">
                    ما كانش عندي شك بلي أنتِ هي اللي راح تفتحي هذا الصندوق وتكتشفي كل كلمة مخبأة ليكِ.
                  </p>
                </div>

                {/* SPECIAL SECTION: ENGLISH TRAITS & COMPLIMENTS CLOUD */}
                <div className="space-y-4 rounded-3xl bg-gradient-to-br from-[#FFF5F7] to-[#FEEDF1] p-6 sm:p-8 border border-[#F5CAD4] shadow-xs">
                  <div className="text-center space-y-1">
                    <div className="inline-flex items-center gap-1.5 text-xs font-editorial font-bold text-[#9E3650] uppercase tracking-widest bg-white/80 px-3 py-1 rounded-full border border-[#F3CDD6]">
                      <Crown className="w-3.5 h-3.5 text-[#E5A93C]" />
                      <span>EVERYTHING YOU ARE TO ME • صفاتكِ الساحرة</span>
                    </div>
                    <h4 className="font-editorial text-xl sm:text-2xl font-bold text-[#862940] tracking-tight">
                      PRETTY, CUTE, & BEYOND COMPARE ♡
                    </h4>
                    <p className="text-xs text-[#7A4958] font-amiri max-w-lg mx-auto">
                      انقري على أي صفة لتشاهدي ما يقوله قلبي عنها:
                    </p>
                  </div>

                  {/* Badges / Chips Grid */}
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                    {HER_ENGLISH_TRAITS.map((item, idx) => {
                      const isSelected = selectedTrait?.word === item.word;
                      return (
                        <motion.button
                          key={idx}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setSelectedTrait(item);
                            confetti({
                              particleCount: 20,
                              spread: 45,
                              origin: { y: 0.7 },
                              colors: ['#8E2F48', '#FFCCD7', '#E295A8'],
                              scalar: 0.8,
                            });
                          }}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-editorial font-bold tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 shadow-xs ${
                            isSelected
                              ? 'bg-[#8E2F48] text-white ring-2 ring-[#8E2F48]/30 shadow-md scale-105'
                              : 'bg-white/90 hover:bg-white text-[#8E2F48] border border-[#F3CBD5] hover:border-[#8E2F48]'
                          }`}
                        >
                          <Sparkles className={`w-3 h-3 ${isSelected ? 'text-[#FFD166]' : 'text-[#C97287]'}`} />
                          <span>{item.word}</span>
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Active Trait Highlight Card */}
                  {selectedTrait && (
                    <motion.div
                      key={selectedTrait.word}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-4 p-5 rounded-2xl bg-white/95 border border-[#F4CCD5] shadow-xs text-center space-y-2"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Heart className="w-4 h-4 fill-[#8E2F48] text-[#8E2F48]" />
                        <span className="font-editorial text-2xl font-bold tracking-wider text-[#8E2F48]">
                          {selectedTrait.word}
                        </span>
                        <Heart className="w-4 h-4 fill-[#8E2F48] text-[#8E2F48]" />
                      </div>
                      <p className="font-amiri text-base sm:text-lg text-[#441825] font-medium leading-relaxed">
                        "{selectedTrait.arabicNote}"
                      </p>
                    </motion.div>
                  )}
                </div>

                {/* Secret message */}
                <div className="p-6 rounded-2xl bg-[#FFF6F8] border border-[#F6D0DA] space-y-4 text-right">
                  <p className="font-semibold text-[#8E2F48] font-amiri text-lg flex items-center justify-end gap-1.5">
                    <span>رسالة سرية لا يراها أحد غيركِ:</span>
                    <Heart className="w-4 h-4 text-[#8E2F48] fill-[#8E2F48]" />
                  </p>
                  <p className="font-editorial text-base sm:text-lg text-[#4E1E2D] leading-relaxed italic bg-white/70 p-4 rounded-xl border border-[#F6D0DA]/60">
                    "heleghkem kulass forver atachev7abtiw ulach hed ihemlegh kterim 3ezizet  greev fuliw atapopiltiw i love u so much tmenigh ankemel dunitnegh elwa7i selm7iba et s le mement n 3ali toujour i will be with you nchlh kemmi my only one❤️"
                  </p>
                  <p className="text-xs font-light text-[#7C4857] font-amiri">
                    وعد مني أن أظل معكِ وأحبكِ بنفس الشغف والصدق إلى ما لا نهاية.
                  </p>
                </div>

                {/* Secret photo pair */}
                <div className="grid grid-cols-1 gap-4">
                  {secretGallery.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => onOpenPhotoLightbox?.(item.url, item.title)}
                      className="group relative rounded-2xl overflow-hidden border border-[#F5CDD6] cursor-pointer bg-white shadow-xs max-w-xl mx-auto w-full"
                    >
                      <div className="aspect-[16/10] w-full overflow-hidden bg-[#FBF1F3]">
                        <img
                          src={item.url || SPECIAL_CONFESSION_BUS_PHOTO}
                          alt={item.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
                      <div className="p-4 text-right space-y-2">
                        <p className="font-amiri text-base font-semibold text-[#441926]">
                          {item.title}
                        </p>
                        <p className="text-xs text-[#8A5263] font-amiri leading-relaxed">
                          {item.note}
                        </p>
                        <div className="pt-1">
                          <a
                            href={CONFESSION_MAPS_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 text-xs text-[#8E2F48] font-semibold hover:underline bg-[#FFF2F5] px-3 py-1.5 rounded-full border border-[#F4CCD5]"
                          >
                            <MapPin className="w-3.5 h-3.5 text-[#A83854]" />
                            <span>موقع اعترافنا في بجاية: Les Oliviers (Google Maps) 📍</span>
                            <ExternalLink className="w-3 h-3 opacity-75" />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center pt-2">
                  <button
                    onClick={() => setIsUnlocked(false)}
                    className="text-xs text-[#8E2F48] hover:underline cursor-pointer font-medium"
                  >
                    قفل الصندوق مرة أخرى
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

