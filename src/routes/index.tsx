import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useCallback, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { VoiceStage } from "@/components/VoiceStage";
import { PageFeed } from "@/components/PageFeed";
import { LibraryStage } from "@/components/LibraryStage";
import { Paywall } from "@/components/Paywall";
import type { Book } from "@/lib/books";
import { fallbackShelf, parseInterests, selectDeck, type Shelf, type Verdict } from "@/lib/deck";
import { curateShelf } from "@/lib/curate.functions";

const STORAGE_KEY = "perlego-onboarding-v1";

type Stage = "voice-intro" | "swipe" | "curating" | "voice-curated" | "library" | "paywall";

type Saved = {
  stage: Stage;
  interests: string[];
  verdicts: Verdict[];
  shelf: Shelf | null;
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Perlego — a shelf built from one conversation" },
      {
        name: "description",
        content:
          "Talk for two minutes, swipe through real book pages, and get an academic library curated around what you actually read.",
      },
      { property: "og:title", content: "Perlego — a shelf built from one conversation" },
      {
        property: "og:description",
        content:
          "Talk for two minutes, swipe through real book pages, and get an academic library curated around what you actually read.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Onboarding,
});

function Onboarding() {
  const curate = useServerFn(curateShelf);
  const [stage, setStage] = useState<Stage>("voice-intro");
  const [interests, setInterests] = useState<string[]>([]);
  const [deck, setDeck] = useState<Book[]>([]);
  const [verdicts, setVerdicts] = useState<Verdict[]>([]);
  const [shelf, setShelf] = useState<Shelf | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Saved;
        if (saved.shelf && (saved.stage === "library" || saved.stage === "paywall")) {
          setInterests(saved.interests ?? []);
          setVerdicts(saved.verdicts ?? []);
          setShelf(saved.shelf);
          setStage(saved.stage);
        }
      }
    } catch {
      // ignore unreadable state
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const payload: Saved = { stage, interests, verdicts, shelf };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // ignore quota errors
    }
  }, [hydrated, stage, interests, verdicts, shelf]);

  const handleInterests = useCallback((raw: string) => {
    const parsed = parseInterests(raw);
    setInterests(parsed);
    setDeck(selectDeck(parsed));
    setStage("swipe");
  }, []);

  const handleSwipesDone = useCallback(
    async (result: Verdict[]) => {
      setVerdicts(result);
      setStage("curating");
      try {
        const built = await curate({ data: { interests, verdicts: result } });
        setShelf(built);
      } catch (error) {
        console.error("Curation request failed", error);
        setShelf(fallbackShelf(result, interests));
      }
      setStage("voice-curated");
    },
    [curate, interests],
  );

  const restart = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY);
    setInterests([]);
    setVerdicts([]);
    setDeck([]);
    setShelf(null);
    setStage("voice-intro");
  }, []);

  return (
    <main className="grain relative min-h-screen bg-background text-foreground">
      {stage === "voice-intro" && <VoiceStage phase="intro" onInterests={handleInterests} />}

      {stage === "swipe" && deck.length > 0 && (
        <PageFeed deck={deck} onDone={(result) => void handleSwipesDone(result)} />
      )}

      {stage === "curating" && (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="font-display text-2xl">Pulling your shelf together…</p>
          <p className="text-sm text-muted-foreground">
            Reading the pages you kept and the ones you let go.
          </p>
        </div>
      )}

      {stage === "voice-curated" && shelf && (
        <VoiceStage
          phase="curated"
          tasteSummary={shelf.tasteSummary}
          shelfTitle={shelf.shelfTitle}
          onShowLibrary={() => setStage("library")}
        />
      )}

      {stage === "library" && shelf && (
        <LibraryStage shelf={shelf} onContinue={() => setStage("paywall")} />
      )}

      {stage === "paywall" && shelf && <Paywall shelf={shelf} onRestart={restart} />}
    </main>
  );
}
