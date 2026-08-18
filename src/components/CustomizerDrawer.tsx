import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Upload, Camera, Save, RotateCcw, Plus, Image as ImageIcon, Key, Check } from 'lucide-react';
import { MemoryItem } from '../types';
import { SPECIAL_CONFESSION_BUS_PHOTO, FALLBACK_CONFESSION_BUS_PHOTO } from '../data/memories';

interface CustomizerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  memories: MemoryItem[];
  onUpdateMemories: (newMemories: MemoryItem[]) => void;
  heroImage: string;
  onUpdateHeroImage: (url: string) => void;
  birthdayImage: string;
  onUpdateBirthdayImage: (url: string) => void;
  secretPin: string;
  onUpdateSecretPin: (pin: string) => void;
  customSongUrl?: string;
  onUpdateCustomSongUrl?: (url: string) => void;
}

export const CustomizerDrawer: React.FC<CustomizerDrawerProps> = ({
  isOpen,
  onClose,
  memories,
  onUpdateMemories,
  heroImage,
  onUpdateHeroImage,
  birthdayImage,
  onUpdateBirthdayImage,
  secretPin,
  onUpdateSecretPin,
  customSongUrl = 'https://youtu.be/GTWqwSNQCcg?si=TVFJ7kASnzeYCSAl',
  onUpdateCustomSongUrl,
}) => {
  const [activeTab, setActiveTab] = useState<'photos' | 'add-memory' | 'settings'>('photos');
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newTag, setNewTag] = useState('لحظاتنا');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [pinInput, setPinInput] = useState(secretPin);
  const [songUrlInput, setSongUrlInput] = useState(customSongUrl);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        if (result) callback(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newImageUrl.trim()) return;

    const newMem: MemoryItem = {
      id: `custom-mem-${Date.now()}`,
      title: newTitle,
      date: newDate || '2024',
      description: newDesc,
      imageUrl: newImageUrl,
      tag: newTag,
      aspectRatio: 'square',
      rotation: Math.random() > 0.5 ? 2 : -2,
    };

    onUpdateMemories([newMem, ...memories]);
    setNewTitle('');
    setNewDate('');
    setNewDesc('');
    setNewImageUrl('');
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleSavePin = () => {
    if (pinInput.trim()) {
      onUpdateSecretPin(pinInput.trim());
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2000);
    }
  };

  const handleSaveSongUrl = () => {
    if (songUrlInput.trim() && onUpdateCustomSongUrl) {
      onUpdateCustomSongUrl(songUrlInput.trim());
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end"
      >
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto border-r border-[#F3CDD6]"
        >
          {/* Header */}
          <div className="p-5 border-b border-[#F5CDD6] flex items-center justify-between bg-[#FFF6F8]">
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-[#8E2F48]" />
              <h3 className="font-amiri text-xl font-bold text-[#3E1A26]">
                إدارة الصور والذكريات
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-[#FBE4E9] text-[#6E2A3C]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs inside Drawer */}
          <div className="flex border-b border-[#F7E1E5] text-xs font-medium text-center">
            <button
              onClick={() => setActiveTab('photos')}
              className={`flex-1 py-3 border-b-2 transition-colors ${
                activeTab === 'photos'
                  ? 'border-[#8E2F48] text-[#8E2F48] font-bold'
                  : 'border-transparent text-[#7F4B5B]'
              }`}
            >
              الصور الرئيسية
            </button>
            <button
              onClick={() => setActiveTab('add-memory')}
              className={`flex-1 py-3 border-b-2 transition-colors ${
                activeTab === 'add-memory'
                  ? 'border-[#8E2F48] text-[#8E2F48] font-bold'
                  : 'border-transparent text-[#7F4B5B]'
              }`}
            >
              إضافة ذكرى جديدة
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex-1 py-3 border-b-2 transition-colors ${
                activeTab === 'settings'
                  ? 'border-[#8E2F48] text-[#8E2F48] font-bold'
                  : 'border-transparent text-[#7F4B5B]'
              }`}
            >
              الرمز السري
            </button>
          </div>

          {/* Content Body */}
          <div className="p-5 flex-1 space-y-6 text-right">
            
            {savedSuccess && (
              <div className="p-3 bg-[#EAF8EE] border border-[#A7E2BA] rounded-xl text-xs text-[#1E723B] flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>تم الحفظ والتحديث بنجاح! ✨</span>
              </div>
            )}

            {activeTab === 'photos' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#4F1E2C] block">
                    صورة الغلاف الرئيسية (Hero 18.01.2024):
                  </label>
                  <div className="relative aspect-video rounded-xl overflow-hidden border border-[#F3CDD6] bg-[#FAF0F2]">
                    <img
                      src={heroImage || SPECIAL_CONFESSION_BUS_PHOTO}
                      alt="Hero preview"
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
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="رابط الصورة..."
                      value={heroImage}
                      onChange={(e) => onUpdateHeroImage(e.target.value)}
                      className="flex-1 p-2 text-xs border border-[#F5CCD6] rounded-lg text-left"
                    />
                    <label className="p-2 bg-[#FFF0F4] border border-[#F3CCD5] rounded-lg text-xs cursor-pointer text-[#8E2F48] flex items-center gap-1">
                      <Upload className="w-3.5 h-3.5" />
                      <span>رفع</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, onUpdateHeroImage)}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-[#F8E3E7]">
                  <label className="text-xs font-semibold text-[#4F1E2C] block">
                    صورة قسم عيد الميلاد (23 جانفي):
                  </label>
                  <div className="relative aspect-video rounded-xl overflow-hidden border border-[#F3CDD6] bg-[#FAF0F2]">
                    <img
                      src={birthdayImage || SPECIAL_CONFESSION_BUS_PHOTO}
                      alt="Birthday preview"
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
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="رابط الصورة..."
                      value={birthdayImage}
                      onChange={(e) => onUpdateBirthdayImage(e.target.value)}
                      className="flex-1 p-2 text-xs border border-[#F5CCD6] rounded-lg text-left"
                    />
                    <label className="p-2 bg-[#FFF0F4] border border-[#F3CCD5] rounded-lg text-xs cursor-pointer text-[#8E2F48] flex items-center gap-1">
                      <Upload className="w-3.5 h-3.5" />
                      <span>رفع</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, onUpdateBirthdayImage)}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <p className="text-[11px] text-[#9A6575] leading-relaxed">
                  💡 يمكنك رفع الصور الحقيقية من هاتفك أو جهازك مباشرة لتظهر مكان الصور النموذجية فوراً!
                </p>
              </div>
            )}

            {activeTab === 'add-memory' && (
              <form onSubmit={handleAddMemory} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#4F1E2C]">عنوان الذكرى:</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: نهار اللي شربنا فيه أحسن قهوة"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl border border-[#F4CDD6]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#4F1E2C]">التاريخ:</label>
                    <input
                      type="text"
                      placeholder="مثال: مارس 2024"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="w-full p-2.5 text-xs rounded-xl border border-[#F4CDD6]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#4F1E2C]">التصنيف:</label>
                    <input
                      type="text"
                      placeholder="مثال: ضحكاتنا"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      className="w-full p-2.5 text-xs rounded-xl border border-[#F4CDD6]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#4F1E2C]">وصف الذكرى أو الشعور:</label>
                  <textarea
                    rows={3}
                    placeholder="اكتب تفاصيل اللحظة وماذا تعني لك..."
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl border border-[#F4CDD6]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#4F1E2C]">صورة الذكرى:</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      placeholder="رابط الصورة أو ارفعها من الزر..."
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      className="flex-1 p-2 text-xs border border-[#F4CDD6] rounded-xl text-left"
                    />
                    <label className="p-2.5 bg-[#FFF0F4] border border-[#F3CCD5] rounded-xl text-xs cursor-pointer text-[#8E2F48] flex items-center gap-1">
                      <Upload className="w-4 h-4" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, setNewImageUrl)}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#8E2F48] text-white font-semibold text-xs shadow-md hover:bg-[#782337] transition-all cursor-pointer"
                >
                  إضافة الذكرى إلى جدار الذكريات ♡
                </button>
              </form>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#4F1E2C]">
                    رابط أغنيتنا المفضلة (YouTube URL):
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="https://youtu.be/..."
                      value={songUrlInput}
                      onChange={(e) => setSongUrlInput(e.target.value)}
                      className="flex-1 p-2.5 text-xs border border-[#F4CDD6] rounded-xl text-[#8E2F48] text-left"
                    />
                    <button
                      onClick={handleSaveSongUrl}
                      className="px-5 py-2.5 bg-[#8E2F48] text-white rounded-xl text-xs font-semibold hover:bg-[#782337] cursor-pointer"
                    >
                      حفظ
                    </button>
                  </div>
                  <p className="text-[11px] text-[#9A6575]">
                    الرابط الحالي: https://youtu.be/GTWqwSNQCcg
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-[#F8E3E7]">
                  <label className="text-xs font-semibold text-[#4F1E2C]">
                    رمز فتح الصندوق السري (Vault PIN):
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={pinInput}
                      onChange={(e) => setPinInput(e.target.value)}
                      className="flex-1 p-2.5 text-center font-bold tracking-widest text-base border border-[#F4CDD6] rounded-xl text-[#8E2F48]"
                    />
                    <button
                      onClick={handleSavePin}
                      className="px-5 py-2.5 bg-[#8E2F48] text-white rounded-xl text-xs font-semibold hover:bg-[#782337] cursor-pointer"
                    >
                      تحديث
                    </button>
                  </div>
                  <p className="text-[11px] text-[#9A6575]">
                    الرمز الحالي الافتراضي: 1801 (18 جانفي)
                  </p>
                </div>
              </div>
            )}

          </div>

          {/* Footer */}
          <div className="p-4 border-t border-[#F5CDD6] text-center bg-[#FFF8FA]">
            <p className="text-[11px] text-[#A67180] font-editorial">
              18.01.2024 — Our Story Memory Manager
            </p>
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
