// Ported verbatim from the Perlego onboarding prototype.
export type PBook = {
  g: string; t: string; ex: string[]; p: number; a: string; y: string; c: string; b: string; r: string;
};
export type PTopic = { k: string; label: string; icon: string; ac: string };
export type PScriptTurn = { q: string; replies: string[] };

import { LIBRARY } from "./library";

const CAT_REASON: Record<string, string> = {
  'History & Politics': 'Because you chose history',
  Psychology: 'Because you chose psychology',
  'Science & Environment': 'Because you chose science',
  'Technology & Society': 'Because you chose technology',
  'Philosophy & Humanities': 'Because you chose philosophy',
  'Business & Economics': 'Because you chose business',
};

export const BOOKS: PBook[] = LIBRARY.map((b) => ({
  g: b.gid,
  t: b.title,
  ex: b.paras.slice(0, 3),
  p: b.pages,
  a: b.author,
  y: b.year,
  c: b.category,
  b: b.description,
  r: CAT_REASON[b.category] ?? 'Close to what you picked',
}));

export const TOPICS: PTopic[] = [
    {k:'science',label:'Science',icon:'atom',ac:'#1ad3b0'},{k:'fiction',label:'Fiction',icon:'book-open',ac:'#ed6fff'},
    {k:'nonfiction',label:'Non-fiction',icon:'library',ac:'#714cf9'},{k:'business',label:'Business',icon:'trending-up',ac:'#ff5400'},
    {k:'history',label:'History',icon:'landmark',ac:'#ffd400'},{k:'philosophy',label:'Philosophy',icon:'scroll',ac:'#714cf9'},
    {k:'psychology',label:'Psychology',icon:'brain',ac:'#ed6fff'},{k:'economics',label:'Economics',icon:'line-chart',ac:'#ff5400'},
    {k:'politics',label:'Politics',icon:'gavel',ac:'#3327ec'},{k:'technology',label:'Technology',icon:'cpu',ac:'#affc40'},
    {k:'art',label:'Art & design',icon:'palette',ac:'#ffd400'},{k:'environment',label:'Environment',icon:'leaf',ac:'#1ad3b0'}
  ];

export const ALL: string[] = ['KAjBXwAACAAJ','FrOMEAAAQBAJ','BBMlzgEACAAJ','BfTQr6tpn0wC','R42aBAAAQBAJ','vo5REQAAQBAJ','heCtnQEACAAJ','DOyJDQAAQBAJ','1fbingEACAAJ','prDZAQAACAAJ','_2ZRzQEACAAJ','y1ONEAAAQBAJ','GraMEAAAQBAJ','3gOOEAAAQBAJ','KGCNEAAAQBAJ','tKr0QwAACAAJ','zfuOEAAAQBAJ','ivmMEAAAQBAJ','_mRHrgEACAAJ','OwVrSMQPPowC','PMLnbx06vOEC','RaWMEAAAQBAJ','PT22DwAAQBAJ','vi-loAEACAAJ','6aMfnwEACAAJ','1vcF0QEACAAJ','Phj2jZwYDKcC','H6EIBufi6hwC','BL2OEAAAQBAJ','2Jd5DwAAQBAJ'];

export const CAPTIONS: string[] = ['Reading across 1,204 science titles','Weighing recent publications higher','Matching to your reading level','Pulling twelve to show you'];

export const SCRIPT: PScriptTurn[] = [
    {q:'What are you reading for at the moment?',replies:['I\u2019m studying for a course','Work, mostly','Curiosity \u2014 no plan']},
    {q:'Good. Is there a question you keep circling back to?',replies:['Why societies change','How people actually decide','How the climate system works']},
    {q:'And how do you like it written \u2014 close to the research, or a story you can follow?',replies:['Keep it close to the research','Tell it as a story','A bit of both']}
  ];

export const PLANS = [
  { k: 'monthly', name: 'Monthly', perDay: '\u00a30.39', perMonth: '\u00a312', billed: 'Billed \u00a312 per month', total: '\u00a312 billed monthly', save: '', note: 'Full access, month to month. Stop whenever you like.', badge: '' },
  { k: 'termly', name: 'Termly', perDay: '\u00a30.33', perMonth: '\u00a310', billed: 'Billed \u00a340 every 4 months', total: '\u00a340 billed every 4 months', save: 'Save 17%', note: 'Covers one term of reading in a single payment.', badge: '' },
  { k: 'yearly', name: 'Yearly', perDay: '\u00a30.26', perMonth: '\u00a38', billed: 'Billed \u00a396 every year', total: '\u00a396 billed yearly', save: 'Save 33%', note: 'The lowest monthly price \u2014 a third less than monthly.', badge: 'Best value' },
];

export const REVIEW_VIDEOS: string[] = [
  'https://img.perlego.com/landing/testimonials/students-01.mp4',
  'https://img.perlego.com/landing/testimonials/students-02.mp4',
  'https://img.perlego.com/landing/testimonials/students-03.mp4',
];

export type PReview = { text: string; name: string; role: string };

export const REVIEWS: PReview[] = [
  { text: '\u201cThe range of books on my subject was excellent and also the fact that the latest edition was available was invaluable.\u201d', name: 'Sarienne Kersh', role: 'Student, South Africa' },
  { text: '\u201cOn my law course, I spent over \u00a3200 on textbooks in the first year\u2026With Perlego I can read as many books as I want and it has proven invaluable during lockdown as I begin my dissertation research. This app has saved my academic career, no joke.\u201d', name: 'Janet Ho', role: 'Student at Hult University' },
  { text: '\u201cI love Perlego! ... I\u2019m a full time worker and a mum who does her degree course online \u2014 it\u2019s so handy for me to have access to books on and offline at my fingertips. It saves me so much time.\u201d', name: 'Laura', role: 'Student, UK' },
  { text: '\u201cKeep up the great work, you are providing a service that helps less well-off students stay on equal footing in their studies.\u201d', name: 'Laura', role: 'Student' },
  { text: '\u201c...when you are on the go, you can continue to read your books and use them for reference. The ability to cite directly into an essay from Perlego is so helpful. I cannot recommend it enough.\u201d', name: 'Ian', role: 'Student, UK' },
];

export const TRUST_METRICS = [
  { n: '4.5/5', t: 'rated on Trustpilog', hide: true },
];

export const FEATURES = [
  { title: 'Study guides that map the reading', text: 'Guided paths break a subject into ordered steps, so you always know which chapter comes next.', src: 'https://img.perlego.com/landing/features/paths.mp4', kind: 'video' as const },
  { title: 'Ask the research assistant', text: 'Ask a question and get an answer grounded in the book you\u2019re reading, with the chapter and page cited.', src: 'https://img.perlego.com/landing/landing-ai-researcher.webm', kind: 'video' as const },
];

export const CAT_TINT: Record<string, string> = { 'History & Politics': '#fff2b8', Psychology: '#fbdcff', 'Science & Environment': '#c7f5ea', 'Technology & Society': '#e6ffc9', 'Philosophy & Humanities': '#e4e8fe', 'Business & Economics': '#ffddcc' };

export const LIST_NAMES: Record<string, string> = { 'History & Politics': 'How societies change', Psychology: 'How people decide', 'Science & Environment': 'Systems and the living world', 'Technology & Society': 'Technology and its consequences', 'Philosophy & Humanities': 'Thinking clearly', 'Business & Economics': 'How markets behave' };

export const LIST_WHY: Record<string, string> = { 'History & Politics': 'Runs from the long view to a single turning point, so each book sets up the next.', Psychology: 'Starts with the research everyone cites, then the applications built on it.', 'Science & Environment': 'Begins with the way systems fail, then the field reporting that shows it happening.', 'Technology & Society': 'Design first, then what happens when those systems scale.', 'Philosophy & Humanities': 'Short reads on judgment, best taken between the heavier books.', 'Business & Economics': 'Institutions first, then the strategy that operates inside them.' };

export function cover(g: string, z?: number) {
  return 'https://books.google.com/books/content?id=' + g + '&printsec=frontcover&img=1&zoom=' + (z || 2) + '&source=gbs_api';
}
