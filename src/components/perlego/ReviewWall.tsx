import { REVIEWS, REVIEW_VIDEOS } from "@/lib/perlego/data";
import { Stars } from "@/components/perlego/Stars";

type Card = { kind: "quote"; text: string; name: string; role: string } | { kind: "video"; src: string };

const CARDS: Card[] = [
  { kind: "video", src: REVIEW_VIDEOS[0]! },
  { kind: "quote", ...REVIEWS[0]! },
  { kind: "quote", ...REVIEWS[1]! },
  { kind: "video", src: REVIEW_VIDEOS[1]! },
  { kind: "quote", ...REVIEWS[2]! },
  { kind: "video", src: REVIEW_VIDEOS[2]! },
  { kind: "quote", ...REVIEWS[3]! },
  { kind: "quote", ...REVIEWS[4]! },
];

const COLUMNS: Card[][] = [
  [CARDS[0]!, CARDS[1]!, CARDS[6]!],
  [CARDS[2]!, CARDS[3]!, CARDS[7]!],
  [CARDS[4]!, CARDS[5]!, CARDS[1]!],
];

function QuoteCard({ c }: { c: Extract<Card, { kind: "quote" }> }) {
  return (
    <figure className="pgw-card">
      <Stars value={5} />
      <blockquote className="pgw-quote">{c.text}</blockquote>
      <figcaption className="pgw-cite">
        <span className="pgw-name">{c.name}</span>
        <span className="pgw-role">{c.role}</span>
      </figcaption>
    </figure>
  );
}

function VideoCard({ src }: { src: string }) {
  return (
    <div className="pgw-card pgw-card--video">
      <video src={src} muted autoPlay loop playsInline preload="metadata" className="pgw-video" />
    </div>
  );
}

/** Looping mosaic of student reviews — columns drift in opposite directions. */
export function ReviewWall() {
  return (
    <div className="pgw-wall" aria-label="Student reviews">
      {COLUMNS.map((col, ci) => (
        <div key={ci} className="pgw-col">
          <div className={"pgw-run " + (ci % 2 === 1 ? "pgw-run--down" : "pgw-run--up")} style={{ animationDuration: `${34 + ci * 7}s` }}>
            {[...col, ...col].map((c, i) =>
              c.kind === "video" ? <VideoCard key={i} src={c.src} /> : <QuoteCard key={i} c={c} />,
            )}
          </div>
        </div>
      ))}
      <div className="pgw-fade pgw-fade--top" />
      <div className="pgw-fade pgw-fade--bottom" />
    </div>
  );
}
