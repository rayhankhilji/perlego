import { BOOKS_BY_ID, TRACK_LABELS } from "@/lib/books";
import type { Shelf } from "@/lib/deck";

type Props = {
  shelf: Shelf;
  onContinue: () => void;
};

export function LibraryStage({ shelf, onContinue }: Props) {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16">
      <p className="text-xs uppercase tracking-[0.25em] text-primary">Built for you</p>
      <h1 className="font-display mt-3 text-4xl leading-tight sm:text-5xl">{shelf.shelfTitle}</h1>
      <p className="mt-4 max-w-xl text-base text-muted-foreground">{shelf.tasteSummary}</p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {shelf.picks.map((pick) => {
          const book = BOOKS_BY_ID[pick.id];
          if (!book) return null;
          return (
            <article
              key={pick.id}
              className="rounded-2xl border-l-4 bg-card px-5 py-5 text-card-foreground shadow-lg"
              style={{ borderLeftColor: book.accent }}
            >
              <p className="text-[0.65rem] uppercase tracking-[0.18em] text-card-foreground/50">
                {TRACK_LABELS[book.track]}
              </p>
              <h2 className="font-display mt-1.5 text-xl leading-snug">{book.title}</h2>
              <p className="text-xs text-card-foreground/60">
                {book.author} · {book.year}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-card-foreground/80">{pick.why}</p>
            </article>
          );
        })}
      </div>

      <div className="mt-12 rounded-3xl border border-border bg-secondary/60 px-6 py-8 text-center">
        <p className="font-display text-2xl">Your shelf is saved.</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Keep reading all 1.4 million titles, with your shelf waiting where you left it.
        </p>
        <button
          onClick={onContinue}
          className="mt-6 rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground transition hover:brightness-110"
        >
          Open full library
        </button>
      </div>
    </div>
  );
}
