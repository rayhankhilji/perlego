import type { CSSProperties } from "react";
import {
  ALL,
  BOOKS,
  CAPTIONS,
  CAT_TINT,
  LIST_NAMES,
  LIST_WHY,
  PLANS,
  SCRIPT,
  TOPICS,
  cover,
  type PBook,
} from "./data";
import { mask } from "./sx";

export const SCREEN_ORDER = [
  "welcome",
  "interests",
  "talk",
  "load1",
  "swipe",
  "signup",
  "load2",
  "library",
  "paywall",
] as const;

export type Screen = (typeof SCREEN_ORDER)[number];

export const SCREEN_LABELS: Record<Screen, string> = {
  welcome: "Welcome",
  interests: "Interests",
  talk: "Talk it through",
  load1: "Shaping",
  swipe: "Swipe",
  signup: "Sign up",
  load2: "Building",
  library: "Library",
  paywall: "Plan",
};

export type PerlegoState = {
  screen: Screen;
  sel: Record<string, boolean>;
  liked: string[];
  idx: number;
  cap: number;
  turn: number;
  said: string[];
  talkDone: boolean;
  build: number;
  plan: string;
};

export type PerlegoActions = {
  go: (screen: Screen) => void;
  toggleTopic: (key: string) => void;
  pickReply: (text: string) => void;
  choosePlan: (plan: string) => void;
  restart: () => void;
};

export const INITIAL_STATE: PerlegoState = {
  screen: "welcome",
  sel: { science: true, history: true },
  liked: [],
  idx: 0,
  cap: 0,
  turn: 0,
  said: [],
  talkDone: false,
  build: 0,
  plan: "yearly",
};

const bg = (g: string, z?: number): CSSProperties => ({
  backgroundImage: `url(${cover(g, z)})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundColor: "#e9e7e3",
});

export function bookById(g: string): PBook | undefined {
  return BOOKS.find((b) => b.g === g);
}

/** Port of the prototype's renderVals(): every derived value the screens read. */
export function buildVals(state: PerlegoState, actions: PerlegoActions) {
  const s = state;
  const S = s.screen;
  const likedBooks = s.liked.map(bookById).filter((b): b is PBook => Boolean(b));
  const L = likedBooks.length ? likedBooks : BOOKS.slice(0, 7);

  const pct = Math.round(((SCREEN_ORDER.indexOf(S) + 1) / SCREEN_ORDER.length) * 100);
  const selKeys = Object.keys(s.sel).filter((k) => s.sel[k]);

  const counts: Record<string, number> = {};
  L.forEach((b) => {
    counts[b.c] = (counts[b.c] ?? 0) + 1;
  });
  const hues = ["#3327ec", "#714cf9", "#1ad3b0", "#ff5400", "#ed6fff"];
  const mix = Object.keys(counts)
    .sort((a, b) => (counts[b] ?? 0) - (counts[a] ?? 0))
    .slice(0, 4)
    .map((k, i) => ({
      name: k,
      pct: Math.round(((counts[k] ?? 0) / L.length) * 100) + "%",
      barStyle: {
        width: Math.round(((counts[k] ?? 0) / L.length) * 100) + "%",
        height: "100%",
        background: hues[i % hues.length]!,
        borderRadius: 999,
        transition: "width 300ms cubic-bezier(.4,0,.2,1)",
      } as CSSProperties,
    }));
  const topCat = mix.length ? mix[0]!.name : "Science & Environment";

  const likedSlots = Array.from({ length: 9 }, (_, i) => {
    const b = likedBooks[i];
    return {
      style: (b
        ? {
            width: "100%",
            aspectRatio: "2/3",
            borderRadius: 4,
            backgroundImage: `url(${cover(b.g, 1)})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            boxShadow: "0 1px 3px rgba(44,44,44,.14)",
            animation: "pgIn .28s cubic-bezier(.4,0,.2,1) both",
          }
        : {
            width: "100%",
            aspectRatio: "2/3",
            borderRadius: 4,
            border: "1px dashed #cdccc8",
          }) as CSSProperties,
    };
  });

  const spineCols = ["#3327ec", "#2c2c2c", "#ffd400", "#714cf9", "#e9e7e3", "#ff5400", "#2c2c2c", "#1ad3b0", "#3327ec"];
  const spines = spineCols.map((c, i) => ({
    style: {
      width: i % 3 === 0 ? 16 : 11,
      height: 70 + ((i * 37) % 70) + "px",
      background: c,
      borderRadius: "2px 2px 1px 1px",
      transformOrigin: "bottom",
      animation: `pgSpine .7s cubic-bezier(.4,0,.2,1) ${i * 0.09}s both, pgSpineIdle 2.4s ease-in-out ${1 + i * 0.09}s infinite`,
    } as CSSProperties,
  }));

  const fanSrc = L.concat(BOOKS.filter((b) => L.indexOf(b) < 0)).slice(0, 5);
  const fan = fanSrc.map((b, i) => ({
    style: {
      position: "absolute",
      bottom: 0,
      width: "88px",
      height: "132px",
      borderRadius: "4px",
      boxShadow: "0 4px 10px rgba(44,44,44,.14)",
      transform: `rotate(${(i - 2) * 11}deg) translateX(${(i - 2) * 46}px) translateY(${Math.abs(i - 2) * 7}px)`,
      transformOrigin: "bottom center",
      animation: `pgFan .6s cubic-bezier(.4,0,.2,1) ${i * 0.13}s both`,
      ...bg(b.g, 1),
    } as CSSProperties,
  }));

  const buildLabels = [
    `Matching ${L.length} books to the catalogue`,
    "Ordering three reading lists",
    "Setting your starting level",
    "Your library is ready",
  ];
  const buildSteps = buildLabels.map((label, i) => ({
    label,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      font: `${i <= s.build ? "500" : "400"} 13.5px Inter,sans-serif`,
      color: i <= s.build ? "#2c2c2c" : "#b2b1ae",
      animation: i <= s.build ? "pgTick .3s cubic-bezier(.4,0,.2,1) both" : "none",
    } as CSSProperties,
    dotStyle: {
      width: 16,
      height: 16,
      borderRadius: "50%",
      flex: "none",
      border: "1px solid " + (i <= s.build ? "#3327ec" : "#cdccc8"),
      background: i <= s.build ? "#3327ec" : "#fff",
    } as CSSProperties,
  }));

  const turn = SCRIPT[Math.min(s.turn, SCRIPT.length - 1)]!;
  const transcript: { text: string; rowStyle: CSSProperties; style: CSSProperties }[] = [];
  for (let i = 0; i <= Math.min(s.turn, SCRIPT.length - 1); i++) {
    transcript.push({
      text: SCRIPT[i]!.q,
      rowStyle: {
        display: "flex",
        justifyContent: "flex-start",
        animation: "pgIn .3s cubic-bezier(.4,0,.2,1) both",
      },
      style: {
        maxWidth: "82%",
        padding: "14px 18px",
        borderRadius: "14px 14px 14px 4px",
        background: "#fff",
        border: "1px solid #e9e7e3",
        fontFamily: "'Playfair Display',Georgia,serif",
        fontWeight: 700,
        fontSize: "19px",
        lineHeight: 1.35,
        color: "#000",
      },
    });
    if (s.said[i]) {
      transcript.push({
        text: s.said[i]!,
        rowStyle: {
          display: "flex",
          justifyContent: "flex-end",
          animation: "pgIn .3s cubic-bezier(.4,0,.2,1) both",
        },
        style: {
          maxWidth: "70%",
          padding: "11px 16px",
          borderRadius: "14px 14px 4px 14px",
          background: "#3327ec",
          color: "#fff",
          font: "400 14.5px/1.5 Inter,sans-serif",
        },
      });
    }
  }
  const replies = s.talkDone
    ? []
    : turn.replies.map((text) => ({ text, pick: () => actions.pickReply(text) }));
  const derivedTopics = ["History & politics", "Behavioural science", "Systems thinking"].map((label) => ({ label }));

  const topicStyle = (on: boolean): CSSProperties => ({
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "9px 16px 9px 13px",
    borderRadius: 999,
    cursor: "pointer",
    border: "1px solid " + (on ? "#3327ec" : "#cdccc8"),
    background: on ? "#e4e8fe" : "#fff",
    color: on ? "#151da2" : "#4e4e4e",
    font: "500 14px Inter,sans-serif",
    transition: "background 140ms cubic-bezier(.4,0,.2,1),border-color 140ms",
  });

  const pagesTotal = L.reduce((n, b) => n + (b.p || 300), 0);
  const lists = Object.keys(counts)
    .sort((a, b) => (counts[b] ?? 0) - (counts[a] ?? 0))
    .slice(0, 3)
    .map((cat) => {
      const picks = L.filter((b) => b.c === cat)
        .concat(BOOKS.filter((b) => b.c === cat && L.indexOf(b) < 0))
        .slice(0, 3);
      return {
        name: LIST_NAMES[cat] || cat,
        meta: `${picks.length} books · ${picks.reduce((n, b) => n + (b.p || 300), 0).toLocaleString("en-GB")} pages`,
        why: LIST_WHY[cat] || "Ordered so each book sets up the next.",
        books: picks.map((b, i) => ({
          n: String(i + 1),
          title: b.t,
          author: b.a,
          coverStyle: { width: "34px", height: "50px", borderRadius: 3, flex: "none", ...bg(b.g, 1) } as CSSProperties,
        })),
      };
    });

  const skippedSrc = (
    s.idx > 0 ? BOOKS.slice(0, s.idx).filter((b) => s.liked.indexOf(b.g) < 0) : BOOKS.filter((b) => L.indexOf(b) < 0)
  ).slice(0, 5);
  const skipped = skippedSrc.map((b) => ({
    coverStyle: {
      width: "32px",
      height: "48px",
      borderRadius: 3,
      filter: "grayscale(1)",
      opacity: 0.55,
      ...bg(b.g, 1),
    } as CSSProperties,
  }));

  const valueCards = [
    { icon: "book-open", title: "Read the full text", text: "Every book on your shelf, complete, in the browser — no sample chapters." },
    {
      icon: "sparkles",
      title: "Ask, and get a citation",
      text: "The research assistant answers from the book in front of you and names the chapter and page.",
    },
    {
      icon: "highlighter",
      title: "Notes that come with you",
      text: "Highlight, annotate and export citations in the style your course asks for.",
    },
  ].map((v) => ({
    title: v.title,
    text: v.text,
    iconStyle: { ...mask(v.icon), width: 20, height: 20, background: "#3327ec" } as CSSProperties,
  }));

  const chosen = PLANS.filter((p) => p.k === s.plan)[0] ?? PLANS[2]!;
  const plans = PLANS.map((p) => {
    const on = p.k === s.plan;
    return {
      ...p,
      choose: () => actions.choosePlan(p.k),
      cta: on ? "Selected" : "Choose " + p.name.toLowerCase(),
      cardStyle: {
        display: "flex",
        flexDirection: "column",
        padding: 24,
        borderRadius: "var(--radius-m)",
        background: "#fff",
        border: "1px solid " + (on ? "var(--primary-500)" : "var(--border-decorative)"),
        boxShadow: on ? "var(--shadow-8)" : "var(--shadow-1)",
        transition: "border-color 140ms,box-shadow 140ms",
      } as CSSProperties,
      badgeStyle: {
        display: p.badge ? "inline-flex" : "none",
        alignItems: "center",
        padding: "4px 10px",
        borderRadius: "var(--radius-xs)",
        background: "var(--primary-50)",
        color: "var(--primary-600)",
        fontFamily: "var(--font-heading)",
        fontSize: 12,
        fontWeight: 600,
      } as CSSProperties,
      btnStyle: {
        marginTop: "auto",
        width: "100%",
        padding: "14px 20px",
        borderRadius: "var(--radius-m)",
        cursor: "pointer",
        border: on ? "1px solid var(--primary-500)" : "1px solid var(--border-decorative)",
        background: on ? "var(--primary-500)" : "#fff",
        color: on ? "#fff" : "var(--text-primary)",
        fontFamily: "var(--font-heading)",
        fontSize: 15,
        fontWeight: 700,
        transition: "background 140ms",
      } as CSSProperties,
    };
  });

  const stars = [0, 1, 2, 3, 4].map(() => ({
    style: { ...mask("star"), width: 16, height: 16, background: "var(--accent-yellow)" } as CSSProperties,
  }));

  return {
    screen: S,
    isWelcome: S === "welcome",
    isInterests: S === "interests",
    isTalk: S === "talk",
    isLoad1: S === "load1",
    isSwipe: S === "swipe",
    isSignup: S === "signup",
    isLoad2: S === "load2",
    isLibrary: S === "library",
    isPaywall: S === "paywall",

    stepLabel: SCREEN_LABELS[S],
    stepCount: `${SCREEN_ORDER.indexOf(S) + 1} / ${SCREEN_ORDER.length}`,
    progressStyle: {
      width: pct + "%",
      height: "100%",
      background: "#3327ec",
      borderRadius: 999,
      transition: "width 300ms cubic-bezier(.4,0,.2,1)",
    } as CSSProperties,
    jumper: SCREEN_ORDER.map((k) => ({
      label: SCREEN_LABELS[k],
      go: () => actions.go(k),
      style: {
        padding: "5px 11px",
        borderRadius: 6,
        border: "1px solid " + (S === k ? "#3327ec" : "#e9e7e3"),
        background: S === k ? "#3327ec" : "#fff",
        color: S === k ? "#fff" : "#666565",
        font: "500 12px Inter,sans-serif",
      } as CSSProperties,
    })),

    toInterests: () => actions.go("interests"),
    toTalk: () => actions.go("talk"),
    toLoad1: () => actions.go("load1"),
    toSignup: () => actions.go("signup"),
    toLoad2: () => actions.go("load2"),
    toPaywall: () => actions.go("paywall"),
    restart: actions.restart,

    mosaic: [0, 1, 2].map((ci) => {
      const set = ALL.filter((_, i) => i % 3 === ci);
      return {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: 14,
          willChange: "transform",
          animation: `${ci === 1 ? "pgScrollDown " : "pgScrollUp "}${52 + ci * 9}s linear infinite`,
        } as CSSProperties,
        items: set.concat(set).map((g, i) => ({
          key: `${g}-${i}`,
          style: {
            width: "100%",
            aspectRatio: "2/3",
            borderRadius: 6,
            flex: "none",
            boxShadow: "0 2px 6px rgba(44,44,44,.1),0 4px 12px rgba(144,48,7,.05)",
            ...bg(g),
          } as CSSProperties,
        })),
      };
    }),

    topics: TOPICS.map((t) => ({
      key: t.k,
      label: t.label,
      style: topicStyle(Boolean(s.sel[t.k])),
      iconStyle: { ...mask(t.icon), width: 17, height: 17, background: s.sel[t.k] ? "#3327ec" : t.ac } as CSSProperties,
      toggle: () => actions.toggleTopic(t.k),
    })),
    notEnough: selKeys.length < 3,
    selCount: `${selKeys.length} selected${selKeys.length < 3 ? " — choose at least 3" : ""}`,
    previewCovers: BOOKS.slice(0, 6).map((b, i) => ({
      key: b.g,
      style: {
        width: "100%",
        aspectRatio: "2/3",
        borderRadius: 6,
        backgroundImage: `url(${cover(b.g, 1)})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: i < selKeys.length ? 1 : 0.28,
        filter: i < selKeys.length ? "none" : "grayscale(1)",
        transition: "opacity 300ms,filter 300ms",
        boxShadow: "0 1px 3px rgba(44,44,44,.12)",
      } as CSSProperties,
    })),
    shelfHint: selKeys.length
      ? "Sharpening as you choose. You’ll see twelve of these next, one at a time."
      : "Pick a subject to see your shelf take shape.",

    transcript,
    replies,
    talkDone: s.talkDone,
    derivedTopics,

    caption: CAPTIONS[s.cap] ?? CAPTIONS[0]!,
    spines,
    fan,
    buildSteps,

    likedCount: likedBooks.length,
    likedSlots,

    signupTitle:
      likedBooks.length === 1
        ? "One book in — your shelf is taking shape"
        : `Your shelf is ready — ${L.length} books, three reading lists`,
    signupPerks: [
      {
        text: `Keep the ${L.length === 1 ? "book" : `${L.length} books`} you added, plus ${L.length * 3 + 6} more chosen around them`,
      },
      { text: "Read any of them in full in the browser — not samples" },
      { text: "Ask the research assistant anything inside a book; it cites chapter and page" },
    ].map((p) => ({
      text: p.text,
      iconStyle: { ...mask("check"), width: 18, height: 18, background: "#3327ec", marginTop: "2px" } as CSSProperties,
    })),

    lists,
    valueCards,
    skipped,
    mix,
    subjectCount: Object.keys(counts).length,
    pagesTotal: pagesTotal.toLocaleString("en-GB"),
    insight:
      "You lean towards recent writing that explains systems — how societies, minds or ecologies hold together. We’ll lead with that and keep one shorter read in rotation.",
    libCount: L.length * 3 + 6,
    libLead: `We’ve ordered ${L.length * 3 + 6} books around ${topCat.toLowerCase()}, starting from the ${L.length === 1 ? "book" : `${L.length} books`} you added. Read any of them in full, in the browser, with the research assistant alongside.`,

    payLead:
      "Your shelf and your three reading lists are saved. Choose the plan that fits how long you’re studying — every one starts with 7 days free.",
    plans,
    stars,
    chosenPrice: chosen.perDay + " a day",
    chosenSummary: `${chosen.name} · ${chosen.billed.replace("Billed ", "")}`,
    videos: [
      "https://img.perlego.com/landing/testimonials/students-01.mp4",
      "https://img.perlego.com/landing/testimonials/students-02.mp4",
      "https://img.perlego.com/landing/testimonials/students-03.mp4",
    ].map((src) => ({ src })),
    quotes: [
      {
        text: "“On my law course, I spent over £200 on textbooks in the first year...With Perlego I can read as many books as I want and it has proven invaluable during lockdown as I begin my dissertation research. This app has saved my academic career, no joke.”",
        name: "Janet Ho",
        role: "Student at Hult University",
      },
      {
        text: "“The range of books on my subject was excellent and also the fact that the latest edition was available was invaluable.”",
        name: "Sarienne Kersh",
        role: "Student, South Africa",
      },
      {
        text: "“...when you are on the go, - you can continue to read your books and use them for reference. The ability to cite directly into an essay from Perlego is so helpful. I cannot recommend it enough.”",
        name: "Ian",
        role: "Student, UK",
      },
    ],
    partners: [
      "University of Liverpool",
      "LUISS",
      "London School of Business & Finance",
      "Condé Nast College of Fashion & Design",
      "Australian College of Theology",
    ].map((name) => ({ name })),
    printCost: "£" + L.length * 14,
    timeline: [
      { when: "Today", what: "Full access to your library and everything else in the catalogue." },
      { when: "Day 5", what: "We email you a reminder, two days before anything is charged." },
      {
        when: "Day 8",
        what: `Your ${chosen.name.toLowerCase()} plan starts — ${chosen.billed.replace("Billed ", "")}. Cancel before then and you pay nothing.`,
      },
    ].map((t, i, arr) => ({
      ...t,
      dotStyle: {
        width: 11,
        height: 11,
        borderRadius: "50%",
        background: i === 0 ? "#3327ec" : "#fff",
        border: "1px solid " + (i === 0 ? "#3327ec" : "#cdccc8"),
        flex: "none",
        marginTop: "4px",
      } as CSSProperties,
      lineStyle: {
        width: 1,
        flex: 1,
        background: i === arr.length - 1 ? "transparent" : "#e9e7e3",
      } as CSSProperties,
    })),
    perks: [
      { text: "Unlimited access to over 1 million academic and non-fiction titles" },
      { text: "Full web reader with notes, highlights and citation export" },
      { text: "AI research assistant, grounded in the book you’re reading" },
      { text: "Your shelf and reading lists saved across devices" },
    ],
    miniCovers: L.slice(0, 6).map((b) => ({
      key: b.g,
      style: {
        width: "44px",
        height: "66px",
        borderRadius: 4,
        flex: "none",
        boxShadow: "0 1px 3px rgba(44,44,44,.12)",
        ...bg(b.g, 1),
      } as CSSProperties,
    })),
  };
}

export type Vals = ReturnType<typeof buildVals>;
export { CAT_TINT };
