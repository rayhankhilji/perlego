import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { Heart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Book } from "@/lib/books";
import { TRACK_LABELS } from "@/lib/books";
import type { Verdict } from "@/lib/deck";

type Props = {
  deck: Book[];
  onDone: (verdicts: Verdict[]) => void;
};

export function SwipeDeck({ deck, onDone }: Props) {
  const [index, setIndex] = useState(0);
  const [drag, setDrag] = useState(0);
  const [exit, setExit] = useState<"left" | "right" | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const verdicts = useRef<Verdict[]>([]);
  const startX = useRef<number | null>(null);

  const book = deck[index];

  const commit = useCallback(
    (liked: boolean) => {
      const current = deck[index];
      if (!current || exit) return;
      setHasInteracted(true);
      verdicts.current = [...verdicts.current, { id: current.id, liked }];
      setExit(liked ? "right" : "left");
      if ("vibrate" in navigator) navigator.vibrate(18);
      window.setTimeout(() => {
        setExit(null);
        setDrag(0);
        if (index + 1 >= deck.length) onDone(verdicts.current);
        else setIndex(index + 1);
      }, 360);
    },
    [deck, index, exit, onDone],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") commit(true);
      if (event.key === "ArrowLeft") commit(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [commit]);

  if (!book) return null;

  const offset = drag;
  const dragProgress = Math.max(-1, Math.min(1, drag / 180));
  const turn = exit ? (exit === "right" ? 180 : -180) : dragProgress * 72;
  const turningRight = exit ? exit === "left" : drag <= 0;
  const decisionOffset = exit === "right" ? 180 : exit === "left" ? -180 : drag;
  const decisionOpacity = Math.max(0, Math.min(1, Math.abs(decisionOffset) / 120));
  const bookStyle: CSSProperties & Record<"--book-accent" | "--page-turn" | "--turn-opacity", string> = {
    "--book-accent": book.accent,
    "--page-turn": `${turn}deg`,
    "--turn-opacity": `${Math.min(1, Math.abs(turn) / 24)}`,
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-4 py-6 sm:px-8 sm:py-8">
      <header className="mb-5 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted-foreground">
        <span>One page each</span>
        <span>
          {index + 1} / {deck.length}
        </span>
      </header>

      <div className="mb-5 flex gap-1">
        {deck.map((entry, i) => (
          <div
            key={entry.id}
            className={`h-0.5 flex-1 rounded-full ${i <= index ? "bg-primary" : "bg-border"}`}
          />
        ))}
      </div>

      <div className="book-stage relative mx-auto w-full max-w-5xl">
        {deck[index + 1] && (
          <div className="book-shadow absolute inset-x-5 inset-y-3 rounded-sm" aria-hidden="true" />
        )}

        <article
          aria-label={`Sample page from ${book.title} by ${book.author}. Swipe right to keep or left to pass.`}
          onPointerDown={(event) => {
            startX.current = event.clientX;
            setHasInteracted(true);
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerMove={(event) => {
            if (startX.current === null) return;
            setDrag(event.clientX - startX.current);
          }}
          onPointerUp={() => {
            if (startX.current === null) return;
            const delta = drag;
            startX.current = null;
            if (Math.abs(delta) > 110) commit(delta > 0);
            else setDrag(0);
          }}
          onPointerCancel={() => {
            startX.current = null;
            setDrag(0);
          }}
          style={bookStyle}
          className="book absolute inset-0 touch-none cursor-grab select-none text-card-foreground active:cursor-grabbing"
        >
          <div className="book-pages" aria-hidden="true" />
          <div className="book-cover-edge" aria-hidden="true" />
          <div className="book-spread">
            <section className="book-verso">
              <div className="book-kicker">
                <span>{TRACK_LABELS[book.track]}</span>
                <span>{book.year}</span>
              </div>
              <div>
                <div className="book-rule" />
                <h2 className="font-display mt-4 text-[clamp(1.55rem,4vw,2.7rem)] leading-[0.98]">
                  {book.title}
                </h2>
                <p className="mt-3 text-xs text-card-foreground/60 sm:text-sm">{book.author}</p>
              </div>
              <p className="font-display text-base italic leading-snug text-book-accent sm:text-xl">
                {book.hook}
              </p>
            </section>

            <section className="book-recto">
              <span className="book-running-head">A page to try</span>
              <p className="font-display book-copy">{book.page}</p>
              <span className="book-page-number">{String(index + 17).padStart(2, "0")}</span>
            </section>

            <div
              className={`book-turning-page ${turningRight ? "turn-from-right" : "turn-from-left"} ${!hasInteracted && index === 0 ? "book-page-cue" : ""}`}
              aria-hidden="true"
            >
              <div className="book-turning-page-front">
                {turningRight ? (
                  <div className="book-leaf-content book-leaf-excerpt">
                    <span className="book-running-head">A page to try</span>
                    <p className="font-display book-copy">{book.page}</p>
                    <span className="book-page-number">{String(index + 17).padStart(2, "0")}</span>
                  </div>
                ) : (
                  <div className="book-leaf-content book-leaf-title">
                    <div className="book-kicker">
                      <span>{TRACK_LABELS[book.track]}</span>
                      <span>{book.year}</span>
                    </div>
                    <div>
                      <div className="book-rule" />
                      <p className="font-display mt-4 text-[clamp(1.55rem,4vw,2.7rem)] leading-[0.98]">{book.title}</p>
                      <p className="mt-3 text-xs opacity-60 sm:text-sm">{book.author}</p>
                    </div>
                    <p className="font-display text-base italic leading-snug text-book-accent sm:text-xl">{book.hook}</p>
                  </div>
                )}
              </div>
              <div className="book-turning-page-back" />
            </div>
            <div className="book-gutter" aria-hidden="true" />
          </div>

          <div
            className="decision-badge decision-keep"
            style={{ opacity: decisionOffset > 0 ? decisionOpacity : 0 }}
          >
            <Heart className="h-4 w-4" /> Keep
          </div>
          <div
            className="decision-badge decision-pass"
            style={{ opacity: decisionOffset < 0 ? decisionOpacity : 0 }}
          >
            <X className="h-4 w-4" /> Pass
          </div>
        </article>
      </div>

      <div className="mt-6 flex items-center justify-center gap-6">
        <Button
          onClick={() => commit(false)}
          aria-label="Not for me"
          variant="secondary"
          size="icon"
          className="h-14 w-14 rounded-full border border-border shadow-lg"
        >
          <X className="h-6 w-6" />
        </Button>
        <Button
          onClick={() => commit(true)}
          aria-label="Keep this one"
          size="icon"
          className="h-16 w-16 rounded-full shadow-xl"
        >
          <Heart className="h-7 w-7" />
        </Button>
      </div>
      <p className="sr-only" aria-live="polite">Book {index + 1} of {deck.length}</p>
    </div>
  );
}
