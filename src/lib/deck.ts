import { BOOKS, BOOKS_BY_ID, TRACK_LABELS, type Book, type Track } from "./books";

export function parseInterests(raw: string): string[] {
  return raw
    .toLowerCase()
    .split(/[,;/]|\band\b|\bor\b/g)
    .map((part) => part.trim())
    .filter((part) => part.length > 2)
    .slice(0, 8);
}

function scoreBook(book: Book, interests: string[]): number {
  const haystack = [book.track, ...book.tags, book.title, book.hook].join(" ").toLowerCase();
  let score = 0;
  for (const interest of interests) {
    if (!interest) continue;
    if (haystack.includes(interest)) score += 3;
    for (const word of interest.split(/\s+/)) {
      if (word.length > 3 && haystack.includes(word)) score += 1;
    }
  }
  return score;
}

/**
 * Builds the swipe deck: the strongest matches for what the reader said, plus
 * deliberate spread across other tracks so the swipes carry real signal.
 */
export function selectDeck(interests: string[], size = 12): Book[] {
  const ranked = [...BOOKS]
    .map((book) => ({ book, score: scoreBook(book, interests) }))
    .sort((a, b) => b.score - a.score);

  const picked: Book[] = [];
  const usedTracks = new Set<Track>();

  for (const { book, score } of ranked) {
    if (score <= 0) break;
    if (picked.length >= 5) break;
    picked.push(book);
    usedTracks.add(book.track);
  }

  // Spread: one from each track not yet represented.
  for (const track of Object.keys(TRACK_LABELS) as Track[]) {
    if (usedTracks.has(track)) continue;
    const candidate = ranked.find((entry) => entry.book.track === track && !picked.includes(entry.book));
    if (candidate) {
      picked.push(candidate.book);
      usedTracks.add(track);
    }
  }

  for (const { book } of ranked) {
    if (picked.length >= size) break;
    if (!picked.includes(book)) picked.push(book);
  }

  // Interleave so the top matches are not all at the front.
  const head = picked.slice(0, 3);
  const tail = picked.slice(3);
  const woven: Book[] = [];
  while (head.length || tail.length) {
    if (head.length) woven.push(head.shift()!);
    if (tail.length) woven.push(tail.shift()!);
    if (tail.length) woven.push(tail.shift()!);
  }
  return woven.slice(0, size);
}

export type Verdict = { id: string; liked: boolean };

export type Shelf = {
  shelfTitle: string;
  tasteSummary: string;
  picks: { id: string; why: string }[];
};

/** Deterministic curation used if the AI call is unavailable. */
export function fallbackShelf(verdicts: Verdict[], interests: string[]): Shelf {
  const liked: Book[] = verdicts
    .filter((v) => v.liked)
    .map((v) => BOOKS_BY_ID[v.id])
    .filter((b): b is Book => Boolean(b));
  const skippedIds = new Set(verdicts.filter((v) => !v.liked).map((v) => v.id));

  const weights = new Map<string, number>();
  for (const book of liked) {
    weights.set(book.track, (weights.get(book.track) ?? 0) + 3);
    for (const tag of book.tags) weights.set(tag, (weights.get(tag) ?? 0) + 2);
  }
  for (const interest of interests) weights.set(interest, (weights.get(interest) ?? 0) + 1);

  const scored = BOOKS.filter((book) => !skippedIds.has(book.id))
    .map((book) => {
      let score = weights.get(book.track) ?? 0;
      for (const tag of book.tags) score += weights.get(tag) ?? 0;
      if (liked.some((l) => l.id === book.id)) score += 5;
      return { book, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);

  const topTrack = liked[0]?.track;
  return {
    shelfTitle: topTrack ? `Your ${TRACK_LABELS[topTrack].toLowerCase()} shelf` : "Your first shelf",
    tasteSummary: liked.length
      ? `You lean towards ${liked
          .slice(0, 3)
          .map((b) => TRACK_LABELS[b.track].toLowerCase())
          .filter((v, i, arr) => arr.indexOf(v) === i)
          .join(" and ")} writing that argues from concrete detail.`
      : "A wide-open shelf to start with — swipe more to sharpen it.",
    picks: scored.map(({ book }) => ({
      id: book.id,
      why: `Follows on from the pages you kept: ${book.tags.slice(0, 2).join(", ")}.`,
    })),
  };
}
