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
  const scroller = useRef<HTMLDivElement | null>(null);
  const slides = useRef<Array<HTMLElement | null>>([]);
  const [active, setActive] = useState(0);
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  const total = deck.length;
  const likedCount = useMemo(
    () => deck.filter((book) => liked[book.id]).length,
    [deck, liked],
  );

  const toggle = useCallback((id: string) => {
    setLiked((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      if (!prev[id] && "vibrate" in navigator) navigator.vibrate(14);
      return next;
    });
  }, []);

  const goTo = useCallback((i: number) => {
    const target = slides.current[Math.max(0, Math.min(total, i))];
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [total]);

  const finish = useCallback(() => {
    onDone(deck.map((book) => ({ id: book.id, liked: Boolean(liked[book.id]) })));
  }, [deck, liked, onDone]);

  useEffect(() => {
    const root = scroller.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const i = Number((entry.target as HTMLElement).dataset["index"]);
            if (!Number.isNaN(i)) setActive(i);
          }
        }
      },
      { root, threshold: 0.6 },
    );
    for (const slide of slides.current) if (slide) observer.observe(slide);
    return () => observer.disconnect();
  }, [total]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown" || event.key === "PageDown") {
        event.preventDefault();
        goTo(active + 1);
      }
      if (event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        goTo(active - 1);
      }
      if (event.key.toLowerCase() === "l" && deck[active]) toggle(deck[active].id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, deck, goTo, toggle]);

  if (total === 0) return null;

  return (
    <div className="relative h-screen w-full">
      <header className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 pt-5 text-xs uppercase tracking-[0.2em] text-muted-foreground sm:px-8">
        <span>One page each</span>
        <span>
          {Math.min(active + 1, total)} / {total}
        </span>
      </header>

      <div className="pointer-events-none absolute right-3 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-1.5 sm:flex">
        {deck.map((book, i) => (
          <span
            key={book.id}
            className={`h-4 w-[3px] rounded-full transition-colors ${
              i === active ? "bg-primary" : liked[book.id] ? "bg-primary/40" : "bg-border"
            }`}
          />
        ))}
      </div>

      <div
        ref={scroller}
        className="feed-scroller h-full w-full overflow-y-scroll scroll-smooth"
        aria-label="Sample pages. Scroll down for the next page, tap the heart to keep one."
      >
        {deck.map((book, i) => {
          const isLiked = Boolean(liked[book.id]);
          const style: CSSProperties & Record<"--book-accent", string> = {
            "--book-accent": book.accent,
          };
          return (
            <section
              key={book.id}
              data-index={i}
              ref={(node) => {
                slides.current[i] = node;
              }}
              style={style}
              className="feed-slide"
            >
              <article className="feed-page">
                <div className="feed-page-edge" aria-hidden="true" />
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
                  <span className="book-page-number static">{String(i + 17).padStart(2, "0")}</span>
                </div>
              </article>

              <div className="feed-actions">
                <button
                  type="button"
                  onClick={() => toggle(book.id)}
                  aria-pressed={isLiked}
                  aria-label={isLiked ? `Remove ${book.title} from your shelf` : `Keep ${book.title}`}
                  className={`feed-like ${isLiked ? "feed-like--on" : ""}`}
                >
                  <Heart className={`h-6 w-6 ${isLiked ? "fill-current" : ""}`} />
                </button>
                <span className="text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
                  {isLiked ? "Kept" : "Keep"}
                </span>
              </div>

              {i === 0 && (
                <div className="feed-hint">
                  <ArrowDown className="h-3.5 w-3.5" /> Swipe up for the next page
                </div>
              )}
            </section>
          );
        })}

        <section
          data-index={total}
          ref={(node) => {
            slides.current[total] = node;
          }}
          className="feed-slide"
        >
          <div className="flex max-w-md flex-col items-center gap-4 text-center">
            <Sparkles className="h-8 w-8 text-primary" />
            <h2 className="font-display text-[clamp(1.8rem,5vw,2.8rem)] leading-[1.05]">
              {likedCount > 0 ? `${likedCount} page${likedCount === 1 ? "" : "s"} kept` : "Nothing kept yet"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {likedCount > 0
                ? "That's enough to read your taste. Let's build the shelf."
                : "Scroll back up and heart a page or two so the shelf has something to go on."}
            </p>
            <Button onClick={finish} size="lg" className="mt-2 rounded-full px-8">
              <Check className="mr-2 h-4 w-4" /> Build my shelf
            </Button>
          </div>
        </section>
      </div>

      <p className="sr-only" aria-live="polite">
        Page {Math.min(active + 1, total)} of {total}. {likedCount} kept.
      </p>
    </div>
  );
}
