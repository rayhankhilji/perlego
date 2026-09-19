import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import "@/perlego.css";
import { CAPTIONS, SCRIPT } from "@/lib/perlego/data";
import { LIBRARY } from "@/lib/perlego/library";
import { COVER_BOOKS } from "@/lib/perlego/coverBooks";
import { buildVals, INITIAL_STATE, type PerlegoState, type Screen } from "@/lib/perlego/view";
import { PerlegoShell } from "@/components/perlego/PerlegoShell";
import { BookReader } from "@/components/perlego/BookReader";
import { Welcome } from "@/components/perlego/screens/Welcome";
import { Interests } from "@/components/perlego/screens/Interests";
import { VoiceTalk } from "@/components/perlego/VoiceTalk";
import { Load1 } from "@/components/perlego/screens/Load1";
import { Load2 } from "@/components/perlego/screens/Load2";
import { Signup } from "@/components/perlego/screens/Signup";
import { Paywall } from "@/components/perlego/screens/Paywall";
import { Checkout } from "@/components/perlego/screens/Checkout";
import { Unlocked } from "@/components/perlego/screens/Unlocked";

const STORAGE_KEY = "perlego-onboarding-v1";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Perlego — read freely, from one conversation" },
      {
        name: "description",
        content:
          "Tell Perlego what you're into, read one page from twelve books, and get an academic library ordered around what you actually keep.",
      },
      { property: "og:title", content: "Perlego — read freely, from one conversation" },
      {
        property: "og:description",
        content:
          "Tell Perlego what you're into, read one page from twelve books, and get an academic library ordered around what you actually keep.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Onboarding,
});

const FEED = [...COVER_BOOKS, ...LIBRARY];

const TOPIC_TERMS: Record<string, string[]> = {
  science: ["science", "evolution", "cosmology", "biology", "research"],
  fiction: ["fiction", "literature", "story"],
  nonfiction: ["history", "psychology", "science", "business", "philosophy"],
  business: ["business", "startup", "entrepreneurship", "strategy", "work", "wealth"],
  history: ["history", "civilization", "societies", "war", "humanity"],
  philosophy: ["philosophy", "ethics", "meaning", "stoicism", "morality"],
  psychology: ["psychology", "behavior", "behaviour", "cognition", "habits", "dreams"],
  economics: ["economics", "money", "wealth", "markets", "investing"],
  politics: ["politics", "power", "society", "institutions", "strategy"],
  technology: ["technology", "systems", "innovation", "startups"],
  art: ["art", "design", "creative", "culture"],
  environment: ["environment", "ecology", "nature", "climate", "systems"],
};

function relevance(book: (typeof FEED)[number], selected: string[]): number {
  const haystack = [book.category, ...book.subtopics, ...book.tags].join(" ").toLowerCase();
  return selected.reduce(
    (score, topic) => score + (TOPIC_TERMS[topic]?.filter((term) => haystack.includes(term)).length ?? 0),
    0,
  );
}

function Onboarding() {
  const [s, setS] = useState<PerlegoState>(INITIAL_STATE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<PerlegoState>;
        setS((prev) => ({ ...prev, ...saved }));
      }
    } catch {
      // ignore unreadable state
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    } catch {
      // ignore quota errors
    }
  }, [hydrated, s]);

  // load1: cycle the captions, then into the page feed.
  useEffect(() => {
    if (s.screen !== "load1") return;
    setS((p) => ({ ...p, cap: 0 }));
    const timers: ReturnType<typeof setTimeout>[] = [];
    CAPTIONS.forEach((_, i) => {
      if (i === 0) return;
      timers.push(setTimeout(() => setS((p) => (p.screen === "load1" ? { ...p, cap: i } : p)), i * 900));
    });
    timers.push(
      setTimeout(
        () => setS((p) => (p.screen === "load1" ? { ...p, screen: "swipe", idx: 0 } : p)),
        CAPTIONS.length * 900 + 500,
      ),
    );
    return () => timers.forEach(clearTimeout);
  }, [s.screen]);

  // load2: tick the preparation steps, then show the plan.
  useEffect(() => {
    if (s.screen !== "load2") return;
    setS((p) => ({ ...p, build: 0 }));
    const timers: ReturnType<typeof setTimeout>[] = [];
    [1, 2, 3].forEach((i) => {
      timers.push(setTimeout(() => setS((p) => (p.screen === "load2" ? { ...p, build: i } : p)), i * 850));
    });
    timers.push(setTimeout(() => setS((p) => (p.screen === "load2" ? { ...p, screen: "paywall" } : p)), 4000));
    return () => timers.forEach(clearTimeout);
  }, [s.screen]);

  const actions = useMemo(
    () => ({
      go: (screen: Screen) => setS((p) => ({ ...p, screen })),
      toggleTopic: (key: string) => setS((p) => ({ ...p, sel: { ...p.sel, [key]: !p.sel[key] } })),
      pickReply: (text: string) =>
        setS((p) => {
          const said = p.said.slice();
          said[p.turn] = text;
          const next = p.turn + 1;
          return { ...p, said, turn: Math.min(next, SCRIPT.length - 1), talkDone: next >= SCRIPT.length };
        }),
      choosePlan: (plan: string) => setS((p) => ({ ...p, plan })),
      setVoiceInterests: (keys: string[]) =>
        setS((p) => {
          if (!keys.length) return p;
          const sel: Record<string, boolean> = {};
          keys.forEach((k) => {
            sel[k] = true;
          });
          return { ...p, sel, talkDone: true };
        }),
      restart: () => {
        try {
          window.localStorage.removeItem(STORAGE_KEY);
        } catch {
          // ignore
        }
        setS(INITIAL_STATE);
      },
    }),
    [],
  );

  const v = buildVals(s, actions);
  const selectedTopics = Object.keys(s.sel).filter((key) => s.sel[key]);
  const personalisedFeed = useMemo(
    () =>
      FEED.map((book, order) => ({ book, order, score: relevance(book, selectedTopics) }))
        .sort((a, b) => b.score - a.score || a.order - b.order)
        .map(({ book }) => book),
    [selectedTopics.join("|")],
  );

  const setIdx = useCallback((i: number) => {
    setS((p) => (p.idx === i ? p : { ...p, idx: i }));
  }, []);

  const toggleBook = useCallback((g: string) => {
    setS((p) => ({
      ...p,
      liked: p.liked.includes(g) ? p.liked.filter((x) => x !== g) : p.liked.concat(g),
    }));
  }, []);

  return (
    <PerlegoShell v={v}>
      {v.isWelcome && <Welcome v={v} />}
      {v.isInterests && <Interests v={v} />}
      {v.isTalk && (
        <VoiceTalk
          onInterests={(keys) => actions.setVoiceInterests(keys)}
          onContinue={() => setS((p) => ({ ...p, screen: "load1" }))}
        />
      )}
      {v.isLoad1 && <Load1 v={v} />}
      {v.isSwipe && (
        <BookReader
          books={personalisedFeed}
          liked={s.liked}
          onToggle={toggleBook}
          onIndex={setIdx}
          onDone={() => setS((p) => ({ ...p, screen: "signup" }))}
        />
      )}
      {v.isSignup && <Signup v={v} />}
      {v.isLoad2 && <Load2 v={v} />}
      {v.isPaywall && <Paywall v={v} />}
      {v.isCheckout && <Checkout v={v} />}
      {v.isUnlocked && <Unlocked v={v} />}
    </PerlegoShell>
  );
}
