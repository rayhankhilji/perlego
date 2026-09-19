import { useCallback, useEffect, useRef, useState } from "react";
import { Heart, X } from "lucide-react";
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
  const verdicts = useRef<Verdict[]>([]);
  const startX = useRef<number | null>(null);

  const book = deck[index];

  const commit = useCallback(
    (liked: boolean) => {
      const current = deck[index];
      if (!current || exit) return;
      verdicts.current = [...verdicts.current, { id: current.id, liked }];
      setExit(liked ? "right" : "left");
      window.setTimeout(() => {
        setExit(null);
        setDrag(0);
        if (index + 1 >= deck.length) onDone(verdicts.current);
        else setIndex(index + 1);
      }, 260);
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

  const offset = exit === "right" ? 600 : exit === "left" ? -600 : drag;
  const rotation = offset / 24;

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 py-8">
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

      <div className="relative flex-1">
        {deck[index + 1] && (
          <article className="absolute inset-0 scale-[0.97] rounded-3xl bg-card/40 shadow-xl" />
        )}

        <article
          onPointerDown={(event) => {
            startX.current = event.clientX;
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
          style={{
            transform: `translateX(${offset}px) rotate(${rotation}deg)`,
            transition: exit || drag === 0 ? "transform 260ms ease-out" : "none",
            borderTopColor: book.accent,
          }}
          className="absolute inset-0 flex touch-none cursor-grab flex-col overflow-hidden rounded-3xl border-t-4 bg-card px-7 py-8 text-card-foreground shadow-2xl active:cursor-grabbing"
        >
          <div className="flex items-baseline justify-between text-[0.65rem] uppercase tracking-[0.18em] text-card-foreground/50">
            <span>{TRACK_LABELS[book.track]}</span>
            <span>{book.year}</span>
          </div>

          <h2 className="font-display mt-3 text-3xl leading-tight">{book.title}</h2>
          <p className="mt-1 text-sm text-card-foreground/60">{book.author}</p>

          <p
            className="font-display mt-4 text-lg italic"
            style={{ color: book.accent }}
          >
            {book.hook}
          </p>

          <div className="mt-5 flex-1 overflow-hidden">
            <p className="font-display text-[1.05rem] leading-[1.7] text-card-foreground/90">
              {book.page}
            </p>
          </div>

          <div
            className="pointer-events-none absolute right-6 top-6 rounded-full border-2 px-3 py-1 text-xs font-bold uppercase tracking-widest transition-opacity"
            style={{ opacity: Math.max(0, Math.min(1, offset / 120)), borderColor: "#2f8a4a", color: "#2f8a4a" }}
          >
            Keep
          </div>
          <div
            className="pointer-events-none absolute left-6 top-6 rounded-full border-2 px-3 py-1 text-xs font-bold uppercase tracking-widest transition-opacity"
            style={{ opacity: Math.max(0, Math.min(1, -offset / 120)), borderColor: "#b0603f", color: "#b0603f" }}
          >
            Pass
          </div>
        </article>
      </div>

      <div className="mt-7 flex items-center justify-center gap-6">
        <button
          onClick={() => commit(false)}
          aria-label="Not for me"
          className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-secondary text-foreground transition hover:bg-secondary/70"
        >
          <X className="h-6 w-6" />
        </button>
        <button
          onClick={() => commit(true)}
          aria-label="Keep this one"
          className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition hover:brightness-110"
        >
          <Heart className="h-7 w-7" />
        </button>
      </div>
      <p className="mt-4 text-center text-xs text-muted-foreground">
        Swipe, or use the arrow keys.
      </p>
    </div>
  );
}
