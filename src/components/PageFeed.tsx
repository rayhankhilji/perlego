import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { ArrowDown, Check, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Book } from "@/lib/books";
import { TRACK_LABELS } from "@/lib/books";
import type { Verdict } from "@/lib/deck";

type Props = {
  deck: Book[];
  onDone: (verdicts: Verdict[]) => void;
};

export function PageFeed({ deck, onDone }: Props) {
  const total = deck.length;
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [hasMoved, setHasMoved] = useState(false);
  const startY = useRef<number | null>(null);
  const lastMove = useRef(0);

  const likedCount = useMemo(() => deck.filter((b) => liked[b.id]).length, [deck, liked]);
  const book = deck[index];
  const atEnd = index >= total;

  const move = useCallback(
    (step: 1 | -1) => {
      const now = Date.now();
      if (now - lastMove.current < 380) return;
      setIndex((prev) => {
        const next = prev + step;
        if (next < 0 || next > total) return prev;
        lastMove.current = now;
        setDir(step);
        setHasMoved(true);
        return next;
      });
    },
    [total],
  );

  const toggle = useCallback((id: string) => {
    setLiked((prev) => {
      if (!prev[id] && "vibrate" in navigator) navigator.vibrate(14);
      return { ...prev, [id]: !prev[id] };
    });
  }, []);

  const finish = useCallback(() => {
    onDone(deck.map((b) => ({ id: b.id, liked: Boolean(liked[b.id]) })));
  }, [deck, liked, onDone]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown" || event.key === "PageDown") {
        event.preventDefault();
        move(1);
      }
      if (event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        move(-1);
      }
      if (event.key.toLowerCase() === "l" && book) toggle(book.id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [book, move, toggle]);

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 12) return;
      move(event.deltaY > 0 ? 1 : -1);
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [move]);

  if (total === 0) return null;

  const style: CSSProperties & Record<"--book-accent", string> = {
    "--book-accent": book?.accent ?? "var(--primary)",
  };

  return (
    <div
      className="relative flex h-[100dvh] w-full touch-none flex-col items-center justify-center gap-5 px-5 pb-16 pt-14"
      style={style}
      onPointerDown={(event) => {
        startY.current = event.clientY;
      }}
      onPointerUp={(event) => {
        if (startY.current === null) return;
        const delta = event.clientY - startY.current;
        startY.current = null;
        if (Math.abs(delta) > 60) move(delta < 0 ? 1 : -1);
      }}
      onPointerCancel={() => {
        startY.current = null;
      }}
    >
      <header className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 pt-5 text-xs uppercase tracking-[0.2em] text-muted-foreground sm:px-8">
        <span>One page each</span>
        <span>{Math.min(index + 1, total)} / {total}</span>
      </header>

      <div className="pointer-events-none absolute right-3 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-1.5 sm:flex">
        {deck.map((entry, i) => (
          <span
            key={entry.id}
            className={`h-4 w-[3px] rounded-full transition-colors ${
              i === index ? "bg-primary" : liked[entry.id] ? "bg-primary/40" : "bg-border"
            }`}
          />
        ))}
      </div>

      <div className="flex min-h-0 w-full flex-1 items-center justify-center">
        <article className="feed-page">
          {book ? (
          <div key={book.id} className={`feed-turn ${dir === 1 ? "feed-turn--down" : "feed-turn--up"}`}>
            <div className="book-kicker">
              <span>{TRACK_LABELS[book.track]}</span>
              <span>{book.year}</span>
            </div>

            <div className="mt-3">
              <div className="book-rule" />
              <h2 className="font-display mt-3 text-[clamp(1.45rem,3.4vw,2.2rem)] leading-[1.02]">
                {book.title}
              </h2>
              <p className="mt-1.5 text-xs text-card-foreground/60 sm:text-sm">{book.author}</p>
            </div>

            <p className="font-display book-copy mt-4 flex-1 overflow-hidden">{book.page}</p>

            <div className="mt-4 flex items-end justify-between gap-4">
              <p className="font-display max-w-[60%] text-sm italic leading-snug text-book-accent sm:text-base">
                {book.hook}
              </p>
              <span className="book-page-number static">{String(index + 17).padStart(2, "0")}</span>
            </div>
          </div>
        ) : (
          <div key="end" className="feed-turn feed-turn--down items-center justify-center text-center">
            <Sparkles className="mx-auto h-8 w-8 text-book-accent" />
            <h2 className="font-display mt-4 text-[clamp(1.7rem,4.4vw,2.5rem)] leading-[1.05]">
              {likedCount > 0
                ? `${likedCount} page${likedCount === 1 ? "" : "s"} kept`
                : "Nothing kept yet"}
            </h2>
            <p className="mt-3 max-w-sm text-sm text-card-foreground/70">
              {likedCount > 0
                ? "That's enough to read your taste. Let's build the shelf."
                : "Go back up and heart a page or two so the shelf has something to go on."}
            </p>
            <Button onClick={finish} size="lg" className="mt-6 rounded-full px-8">
              <Check className="mr-2 h-4 w-4" /> Build my shelf
            </Button>
          </div>
        )}
        </article>
      </div>

      {!atEnd && (
        <div className="feed-actions">
          <div className="flex flex-nowrap items-center justify-center gap-3 whitespace-nowrap">
            <button
              type="button"
              onClick={() => book && toggle(book.id)}
              aria-pressed={book ? Boolean(liked[book.id]) : false}
              aria-label={book && liked[book.id] ? `Remove ${book.title} from your shelf` : "Keep this page"}
              className={`feed-like ${book && liked[book.id] ? "feed-like--on" : ""}`}
            >
              <Heart className={`h-6 w-6 ${book && liked[book.id] ? "fill-current" : ""}`} />
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              aria-label="Next page"
              className="feed-like"
            >
              <ArrowDown className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}

      {!hasMoved && (
        <button type="button" onClick={() => move(1)} className="feed-hint">
          <ArrowDown className="h-3.5 w-3.5" /> Swipe up for the next page
        </button>
      )}

      <p className="sr-only" aria-live="polite">
        Page {Math.min(index + 1, total)} of {total}. {likedCount} kept.
      </p>
    </div>
  );
}
