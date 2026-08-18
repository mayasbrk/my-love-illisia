import { DictionaryEntry, LoveReason, MemoryItem, QuizQuestion, RandomMemoryCard, TimelineMilestone } from '../types';
import { EMBEDDED_CONFESSION_PHOTO } from './photoBase64';

export const RELATIONSHIP_START_DATE = '2024-01-18T00:00:00';
export const BIRTHDAY_MONTH = 0; // January (0-indexed in JS)
export const BIRTHDAY_DAY = 23;
export const DEFAULT_SECRET_PIN = '18/01/2024'; // Default password based on 18/01/2024 date

// The real photo embedded in Base64 for 100% offline standalone single-file index.html support
export const SPECIAL_CONFESSION_BUS_PHOTO = EMBEDDED_CONFESSION_PHOTO;
export const FALLBACK_CONFESSION_BUS_PHOTO = 'https://i.ibb.co/zV1jFwMG/IMG-2066.jpg';

// Google Maps link for the exact location of the confession (Les Oliviers in Bejaia)
export const CONFESSION_MAPS_URL = 'https://maps.app.goo.gl/pKDcrjHLb5a1ectZ8';

// Editable photo wall memories - Only using our real photo
export const INITIAL_MEMORIES: MemoryItem[] = [
  {
    id: 'mem-1',
    title: 'أول صورة جمعتنا في الحافلة ♡',
    date: '18 جانفي 2024 — الخميس',
    location: 'Les Oliviers (بجاية)',
    mapUrl: CONFESSION_MAPS_URL,
    description: 'التقطنا هذه الصورة معاً في الحافلة وأنتِ جالسة بجانبي وحنا مروحين، بعد ذلك اليوم الذي لا يُنسى في Les Oliviers في بجاية عندما اعترفت لكِ بحبي لأول مرة.',
    quote: 'من أول نظرة، كنت عارف بلي أنتِ هي الحكاية كلها.',
    imageUrl: SPECIAL_CONFESSION_BUS_PHOTO,
    tag: 'أول صورة واعتراف',
    aspectRatio: 'portrait',
    rotation: -1,
  }
];

// Timeline milestones - only real photo on the first confession milestone, stock photos removed
export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    id: 't-1',
    date: '18.01.2024',
    displayDate: '18 جانفي 2024 — الخميس',
    title: 'أول اعتراف بحبي لكِ في Les Oliviers (بجاية) ♡',
    subtitle: 'اليوم اللي بدأت فيه أجمل حكاية والتقطنا أول صورة في الحافلة وحنا مروحين',
    description: 'اليوم الذي تشجعت فيه وقلت لكِ الكلمة التي كانت في قلبي "أحبك" في مكاننا المميز Les Oliviers في بجاية، والتقطنا هذه الصورة مع بعضنا في الحافلة وأنتِ جالسة بجانبي عند عودتنا للمنزل.',
    quote: 'From one Thursday... to forever.',
    imageUrl: SPECIAL_CONFESSION_BUS_PHOTO,
    badge: 'اليوم الأقدس في تاريخنا',
    mapUrl: CONFESSION_MAPS_URL
  },
  {
    id: 't-2',
    date: '23.01.2024',
    displayDate: '23 جانفي 2024',
    title: 'أول عيد ميلاد ليك وأنتِ في قلبي',
    subtitle: 'فرحة أول احتفال مع بعض',
    description: 'أول مرة نحتفل بعيد ميلادك وحنا مع بعض رسمياً. شعور مختلف وفرحة كبيرة لا توصف.',
    quote: 'أجمل هدية في عيد ميلادك كانت وجودك في حياتي.',
    badge: 'عيد ميلادها'
  },
  {
    id: 't-3',
    date: '14.02.2024',
    displayDate: 'فيفري 2024',
    title: 'أول ضحكة من الأعماق',
    subtitle: 'لما بانت شخصيتنا الحقيقية وبدا المزاح',
    description: 'اللحظة اللي كسرنا فيها كل الحواجز وبدينا نضحكوا على أبسط الحاجات ونخترعوا نكتنا الخاصة.',
    quote: 'كي نكون معاك، الضحك يخرج تلقائي وبلا حساب.',
    badge: 'أول ذكرى'
  },
  {
    id: 't-4',
    date: '18.07.2024',
    displayDate: '18 جويلية 2024',
    title: '6 أشهر على بدايتنا',
    subtitle: 'نصف عام من الحب والاهتمام',
    description: 'مرت ستة أشهر وكأنها يوم واحد. كل شهر فات كان يثبتلي أكثر أنك أحسن اختيار.',
    quote: 'نصف عام وكل يوم نكتشف سبب جديد باش نتمسك بيك أكثر.',
    badge: 'نصف عام'
  },
  {
    id: 't-5',
    date: '18.01.2025',
    displayDate: '18 جانفي 2025',
    title: 'عام كامل من حكايتنا 💍',
    subtitle: '365 يوم من الحكاية الجميلة',
    description: 'سنة كاملة من المواقف الحلوة، الدعم المتبادل، والذكريات اللي ما تموتش. كبر حبنا وعاد أقوى.',
    quote: 'سنة أولى في كتاب حبنا اللي صفحاته ما تخلصش.',
    badge: 'الذكرى السنوية'
  },
  {
    id: 't-6',
    date: 'اليوم وإلى الأبد',
    displayDate: 'اليوم... وإلى الأبد',
    title: 'حكايتنا مستمرة...',
    subtitle: 'صفحات ما زالت تتكتب بحب',
    description: 'كل يوم جديد هو فرصة جديدة باش نعيشو ذكريات أجمل، ونضحكو أكثر، ونبنيو مستقبلنا مع بعض خطوة بخطوة.',
    quote: '18.01.2024 → ∞',
    badge: 'المستقبل'
  }
];

// Secret Dictionary & Private Phrases
export const DICTIONARY_ENTRIES: DictionaryEntry[] = [
  {
    id: 'dict-1',
    phrase: 'NAMOUSA',
    tag: 'makes her laugh',
    dateAdded: '2024',
    note: 'قصيدة النموسة الشهيرة والمفضلة لدينا 😂',
    interactivePoem: {
      teaser: 'لا يلتني كنت نموسة...',
      revealText: `لا يلتني كنت نموسة
وفي غرفتك محبوسة
ونعطي لخدك بوسة
وتضربيني...
ونموت في حضنك مفقوصة 😂❤️`,
      buttonLabel: 'كمليها 😂'
    }
  },
  {
    id: 'dict-2',
    phrase: 'AD ALIGH FEDMARNIK WA ADUGH GHER ZATH',
    tag: 'private language',
    dateAdded: '2024',
    note: 'كلام خاص بيناتنا ما عندوش ترجمة عند حتى واحد في الدنيا.'
  },
  {
    id: 'dict-3',
    phrase: '3EBASS LABASS ITHABI FATIMA',
    tag: 'inside joke',
    dateAdded: '2024',
    note: 'نكتة خاصة بينا تخلينا نضحكوا ديما كل ما نتفكروها.'
  },
  {
    id: 'dict-4',
    phrase: 'خميس 18 جانفي',
    tag: 'classified',
    dateAdded: '18.01.2024',
    note: 'اليوم اللي تبدلت فيه حياتي كاملة... أحسن قرار في التاريخ.'
  },
  {
    id: 'dict-5',
    phrase: 'عيونك كي يبتسمو',
    tag: 'only we understand',
    dateAdded: '2024',
    note: 'النظرة الخاصة اللي نفهم منها كل شيء بلا ما تقولي حتى حرف.'
  }
];

// Things I love about you
export const LOVE_REASONS: LoveReason[] = [
  { id: 1, text: 'ضحكتك العفوية اللي تضوي نهاري مهما كان متعب.', category: 'الروح' },
  { id: 2, text: 'طريقة كلامك ونبرة صوتك لما تكوني تحكي بحماس.', category: 'التفاصيل' },
  { id: 3, text: 'تفاصيلك الصغيرة والبريئة اللي تميزك عن كل الناس.', category: 'الجمال' },
  { id: 4, text: 'الطريقة اللي تخليني نبتسم بها بلا ما نحس وبلا حتى سبب.', category: 'السحر' },
  { id: 5, text: 'الأشياء اللي حتى أنتِ ما تعرفيش بلي نحبها ونلاحظها فيكِ.', category: 'السر' },
  { id: 6, text: 'حنانك وقلبك الطيب اللي ما فيهش ذرة أنانية.', category: 'القلب' },
  { id: 7, text: 'عينيك لما يلمعو بالفرحة وتضحك ملامحك كاملة.', category: 'العيون' },
  { id: 8, text: 'طريقتك في الاهتمام بيا حتى في أبسط الحاجات.', category: 'الدفء' },
  { id: 9, text: 'خفة دمك والضحكات اللي نشاركوها وحدنا.', category: 'المرح' },
  { id: 10, text: 'أنكِ الأمان والراحة والملجأ اللي نحس فيه بالسلام.', category: 'الأمان' },
  { id: 11, text: 'صبرك وتفهمك ووجودك اللي ديما يقويني.', category: 'القوة' },
  { id: 12, text: 'ببساطة... لأنك أنتِ، بكل ما فيكِ.', category: 'الأصل' }
];

// Random Memory / Love Note Cards for "فاجئيني"
export const RANDOM_CARDS: RandomMemoryCard[] = [
  {
    id: 'rc-1',
    type: 'quote',
    content: 'منذ 18 جانفي 2024، وأنا كل يوم نتأكد بلي ربي عطاني أحسن رزق في الدنيا.',
    authorNote: 'همسة من قلبي',
    subtext: '18.01.2024'
  },
  {
    id: 'rc-2',
    type: 'joke',
    content: 'لا يلتني كنت نموسة... وتضربيني ونموت في حضنك مفقوصة 😂❤️',
    authorNote: 'نكتتنا الخاصة',
    subtext: 'نموسة هارت'
  },
  {
    id: 'rc-3',
    type: 'memory',
    content: 'تفكرتي أول مرة شفتك فيها كيفاش كان قلبي يخبط بسرعة؟ مزال يخبط بنفس الطريقة كل ما نشوفك.',
    authorNote: 'ذكرى لا تُنسى',
    subtext: 'أول لقاء'
  },
  {
    id: 'rc-4',
    type: 'message',
    content: 'لو كان يرجع بيا الوقت ألف مرة، نختار نفس الخميس، ونفس الدقيقة، ونفس الإنسانة الرائعة.',
    authorNote: 'يقين مطلق',
    subtext: 'إلى الأبد'
  },
  {
    id: 'rc-5',
    type: 'quote',
    content: 'AD ALIGH FEDMARNIK WA ADUGH GHER ZATH ❤️',
    authorNote: 'كلامنا السري',
    subtext: 'لغة خاصة'
  },
  {
    id: 'rc-6',
    type: 'message',
    content: 'عيد ميلادك هو عيد للفرحة اللي دخلتيها في حياتي. كل عام وأنتِ سري وسعادتي وحبي الأول والأخير.',
    authorNote: '23 جانفي',
    subtext: 'Birthday Wish'
  }
];

// Memory Quiz Questions
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q-1',
    question: 'في أي يوم رسمي بدأت أجمل حكاية حب في حياتنا؟',
    hint: 'يوم خميس مميز جداً...',
    options: [
      '23 جانفي 2024',
      '18 جانفي 2024',
      '14 فيفري 2024',
      '01 جانفي 2024'
    ],
    correctIndex: 1,
    explanation: '18.01.2024 — اليوم اللي اعترفتلك فيه بحبي وبدأت رحلتنا مع بعض.',
    cuteReaction: 'كنت عارف بلي ما تنسايش اليوم الأقدس في تاريخنا! ❤️'
  },
  {
    id: 'q-2',
    question: 'ما هو اليوم الخاص اللي نحتفلوا فيه بعيد ميلاد أجمل إنسانة؟',
    hint: 'بعد 5 أيام فقط من تاريخ اعترافنا...',
    options: [
      '18 جانفي',
      '20 جانفي',
      '23 جانفي',
      '25 جانفي'
    ],
    correctIndex: 2,
    explanation: '23 جانفي — اليوم اللي العالم جاب فيه الشخص اللي خلاني أسعد إنسان.',
    cuteReaction: 'أحلى عيد ميلاد لأغلى إنسانة في الدنيا! 🎂✨'
  },
  {
    id: 'q-3',
    question: 'ما هي أمنية النموسة في قصيدتنا الشهيرة؟ 😂',
    hint: 'وفي غرفتك محبوسة...',
    options: [
      'طير في السماء بعيد',
      'تموت في حضنك مفقوصة',
      'تاكل كيكة الشوكولاتة',
      'ترقد 12 ساعة'
    ],
    correctIndex: 1,
    explanation: '"ونعطي لخدك بوسة وتضربيني... ونموت في حضنك مفقوصة 😂❤️"',
    cuteReaction: 'هههههه نموسة محترفة! شاطرة برافو 😂❤️'
  },
  {
    id: 'q-4',
    question: 'لو كان يرجع بيا الوقت للوراء، واش كنت راح ندير؟',
    hint: 'اقرأي بقلبك...',
    options: [
      'نغير بعض التفاصيل',
      'نختار نفس اليوم ونفسك كل مرة',
      'نفكر أكثر',
      'نسافر لكوكب آخر'
    ],
    correctIndex: 1,
    explanation: 'كنت راح نختار نفس اليوم، نفس الخميس، نفس اللحظة... ونفسك، كل مرة بلا تردد.',
    cuteReaction: 'أنتِ اختياري الوحيد اليوم وغدوا وإلى الأبد. ❤️♾️'
  }
];

export const INITIAL_SECRET_LETTER = {
  title: 'رسالتي السرية ليك... ♡',
  recipient: 'Atachev7abtiw & My Only One,',
  paragraphs: [
    'heleghkem kulass forver atachev7abtiw ulach hed ihemlegh kterim 3ezizet  greev fuliw atapopiltiw i love u so much tmenigh ankemel dunitnegh elwa7i selm7iba et s le mement n 3ali toujour i will be with you nchlh kemmi my only one❤️'
  ],
  signoff: 'Toujour with you nchlh ♡,',
  dateString: '18.01.2024 → ∞'
};
