export interface MemoryItem {
  id: string;
  title: string;
  date: string;
  location?: string;
  mapUrl?: string;
  description: string;
  quote?: string;
  imageUrl: string;
  tag: string;
  aspectRatio?: 'portrait' | 'landscape' | 'square';
  rotation?: number; // e.g. -2, 1, 3 for polaroid tilt
}

export interface TimelineMilestone {
  id: string;
  date: string;
  displayDate: string;
  title: string;
  subtitle: string;
  description: string;
  quote?: string;
  imageUrl?: string;
  badge?: string;
  mapUrl?: string;
}

export interface DictionaryEntry {
  id: string;
  phrase: string;
  tag: 'private language' | 'inside joke' | 'only we understand' | 'makes her laugh' | 'classified';
  dateAdded?: string;
  note?: string;
  interactivePoem?: {
    teaser: string;
    revealText: string;
    buttonLabel: string;
  };
}

export interface QuizQuestion {
  id: string;
  question: string;
  hint?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  cuteReaction: string;
}

export interface LoveReason {
  id: number;
  text: string;
  category?: string;
}

export interface RandomMemoryCard {
  id: string;
  type: 'quote' | 'memory' | 'joke' | 'message';
  content: string;
  authorNote?: string;
  subtext?: string;
}
