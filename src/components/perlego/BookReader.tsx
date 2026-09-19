import { useCallback, useEffect, useRef, useState } from "react";
import { mask, sx } from "@/lib/perlego/sx";
import { STYLES, type RBook } from "@/lib/perlego/library";
import { CAT_TINT } from "@/lib/perlego/data";
import { PgButton } from "@/components/perlego/PgButton";

type Props = {
  books: RBook[];
  liked: string[];
  onToggle: (gid: string) => void;
  onIndex: (i: number) => void;
  onDone: () => void;
};

const EASE = "cubic-bezier(.22,.78,.14,1)";

/** Shrinks the type a little until the whole page fits without clipping. */
function FitBox({ children }: { children: React.ReactNode }) {
  const box = useRef<HTMLDivElement | null>(null);
  const [fit, setFit] = useState(1);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    let scale = 1;
    const run = () => {
      scale = 1;
      el.style.fontSize = "100%";
      for (let i = 0; i < 14 && el.scrollHeight > el.clientHeight + 1; i += 1) {
        scale -= 0.035;
        el.style.fontSize = `${scale * 100}%`;
      }
      setFit(scale);
    };
    run();
    const ro = new ResizeObserver(run);
    ro.observe(el);
    return () => ro.disconnect();
  }, [children]);

  return (
    <div ref={box} style={{ flex: 1, minHeight: 0, overflow: "hidden", fontSize: `${fit * 100}%` }}>
      {children}
    </div>
  );
}
const DUR = 720;

/** One full page per book, with a side panel of book details. */
export function BookReader({ books, liked, onToggle, onIndex, onDone }: Props) {
  const total = books.length;
  const slides = total + 1; // + closing card
  const [index, setIndex] = useState(0);
  const [drag, setDrag] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [panel, setPanel] = useState(false);
  const idxRef = useRef(0);
  const lockRef = useRef(0);
  const startY = useRef<number | null>(null);
  const stage = useRef<HTMLDivElement | null>(null);
  const [h, setH] = useState(0);

  const book = books[index];
  const isLiked = book ? liked.includes(book.gid) : false;

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setH(el.clientHeight));
    ro.observe(el);
    setH(el.clientHeight);
    return () => ro.disconnect();
  }, []);

  const move = useCallback(
    (step: 1 | -1) => {
      const now = Date.now();
      if (now < lockRef.current) return;
      const next = idxRef.current + step;
      if (next < 0 || next > slides - 1) return;
      lockRef.current = now + DUR * 0.62;
      idxRef.current = next;
      setAnimating(true);
      setDrag(0);
      setIndex(next);
      window.setTimeout(() => setAnimating(false), DUR);
    },
    [slides],
  );

  useEffect(() => {
    onIndex(index);
  }, [index, onIndex]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        move(1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        move(-1);
      } else if (e.key.toLowerCase() === "l" && book) {
        onToggle(book.gid);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [book, move, onToggle]);

  useEffect(() => {
    let acc = 0;
    let decay = 0;
    const onWheel = (e: WheelEvent) => {
      window.clearTimeout(decay);
      acc += e.deltaY;
      // weighted: needs a deliberate push, not a flick
      if (Math.abs(acc) > 90) {
        move(acc > 0 ? 1 : -1);
        acc = 0;
      }
      decay = window.setTimeout(() => {
        acc = 0;
      }, 220);
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.clearTimeout(decay);
    };
  }, [move]);

  const offset = -index * h + drag;

  const fs = (px: number) => `clamp(12.5px, 2.05vh, ${px}px)`;

  return (
    <section className="pgr-wrap">
      <aside className={"pgr-panel" + (panel ? " is-open" : "")}>
        {book ? (
          <>
            <img
              key={book.gid}
              src={book.cover}
              alt={`Cover of ${book.title}`}
              onError={(e) => {
                const img = e.currentTarget;
                if (img.dataset['fallback']) {
                  img.style.display = "none";
                  return;
                }
                img.dataset['fallback'] = "1";
                img.src = book.thumb;
              }}
              style={sx(
                "width:118px;height:auto;border-radius:3px;background:#e9e7e3;box-shadow:0 2px 10px rgba(44,44,44,.18)",
              )}
            />
            <div>
              <span
                style={{
                  ...sx("padding:4px 9px;border-radius:4px;font:500 11px Manrope,sans-serif;color:#383838"),
                  background: CAT_TINT[book.category] ?? "#e9e7e3",
                }}
              >
                {book.category}
              </span>
            </div>
            <h2
              style={sx(
                "margin:2px 0 0;font-family:'Playfair Display',Georgia,serif;font-weight:700;font-size:22px;line-height:1.15;color:#000",
              )}
            >
              {book.title}
            </h2>
            <p style={sx("margin:0;font:400 13px Inter,sans-serif;color:#4e4e4e")}>{book.author}</p>
            <p style={sx("margin:0;font:400 13.5px/1.62 Inter,sans-serif;color:#565451")}>{book.description}</p>
            <div style={sx("display:flex;flex-wrap:wrap;gap:6px")}>
              {book.subtopics.map((t) => (
                <span key={t} className="pgr-chip">
                  {t}
                </span>
              ))}
            </div>
            <dl style={sx("margin:4px 0 0;display:grid;grid-template-columns:auto 1fr;gap:6px 14px;font:400 12.5px Inter,sans-serif;color:#565451")}>
              <dt style={sx("color:#8d887e")}>Published</dt>
              <dd style={sx("margin:0")}>{book.year}</dd>
              <dt style={sx("color:#8d887e")}>Pages</dt>
              <dd style={sx("margin:0")}>{book.pages}</dd>
              <dt style={sx("color:#8d887e")}>Language</dt>
              <dd style={sx("margin:0")}>{book.language}</dd>
              <dt style={sx("color:#8d887e")}>Reference</dt>
              <dd style={sx("margin:0")}>{book.id}</dd>
            </dl>
            <a
              href={book.link}
              target="_blank"
              rel="noreferrer"
              style={sx(
                "font:500 12.5px Inter,sans-serif;color:#3327ec;text-decoration:none;border-bottom:1px solid #c9c5f8;align-self:flex-start",
              )}
            >
              Book record ↗
            </a>
            <p style={sx("margin:auto 0 0;font:400 11.5px/1.5 Inter,sans-serif;color:#8d887e")}>
              {liked.length} kept · scroll for the next book
            </p>
          </>
        ) : (
          <p style={sx("margin:0;font:400 13.5px/1.6 Inter,sans-serif;color:#565451")}>
            That's the end of the reading round.
          </p>
        )}
        {panel && (
          <PgButton variant="outline" autoWidth onClick={() => setPanel(false)}>
            Back to the page
          </PgButton>
        )}
      </aside>

      <div
        className="pgr-stage"
        ref={stage}
        onPointerDown={(e) => {
          if (e.pointerType === "mouse" && e.button !== 0) return;
          startY.current = e.clientY;
        }}
        onPointerMove={(e) => {
          if (startY.current === null) return;
          const d = e.clientY - startY.current;
          setDrag(d * 0.32); // weighted follow
        }}
        onPointerUp={(e) => {
          if (startY.current === null) return;
          const d = e.clientY - startY.current;
          startY.current = null;
          setDrag(0);
          if (Math.abs(d) > 56) move(d < 0 ? 1 : -1);
        }}
        onPointerCancel={() => {
          startY.current = null;
          setDrag(0);
        }}
      >
        <span className="pgr-count">
          {Math.min(index + 1, total)} / {total}
        </span>

        <div
          className="pgr-track"
          style={{
            transform: `translate3d(0,${offset}px,0)`,
            transition: animating || drag === 0 ? `transform ${DUR}ms ${EASE}` : "none",
          }}
        >
          {books.map((b, i) => {
            const st = STYLES[b.style % STYLES.length]!;
            return (
              <article
                key={b.gid}
                className="pgr-slide"
                style={{ top: i * h, height: h || undefined }}
                aria-hidden={i !== index}
              >
                <div className="pgr-page" style={{ background: st.bg, color: st.ink, fontFamily: st.font }}>
                  {b.label && (
                    <p
                      style={{
                        ...sx("margin:0 0 1.1em;text-align:center;letter-spacing:.22em;text-transform:uppercase"),
                        color: st.accent,
                        fontSize: fs(11.5),
                        fontFamily: st.font,
                      }}
                    >
                      {b.label}
                    </p>
                  )}
                  <FitBox>
                    {b.paras.map((para, pi) => (
                      <p
                        key={pi}
                        className={"pgr-para" + (pi === 0 && st.caps ? " pgr-cap" : "")}
                        style={{
                          fontSize: fs(st.size),
                          lineHeight: st.leading,
                          textAlign: st.align,
                          hyphens: "auto",
                        }}
                      >
                        {para}
                      </p>
                    ))}
                  </FitBox>
                  <span
                    style={{
                      ...sx("position:absolute;left:0;right:0;bottom:26px;text-align:center"),
                      fontSize: fs(11),
                      color: st.accent,
                      opacity: 0.55,
                    }}
                  >
                    {b.folio + i}
                  </span>
                </div>
              </article>
            );
          })}

          <article className="pgr-slide" style={{ top: total * h, height: h || undefined }}>
            <div
              className="pgr-page"
              style={{
                background: "#faf7ef",
                color: "#1f1d1a",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                gap: 14,
              }}
            >
              <span style={{ ...mask("sparkles"), width: 26, height: 26, background: "#3327ec" }} />
              <h2
                style={sx(
                  "margin:0;font-family:'Playfair Display',Georgia,serif;font-weight:700;font-size:28px;line-height:1.12",
                )}
              >
                {liked.length > 0 ? `${liked.length} kept` : "Nothing kept yet"}
              </h2>
              <p style={sx("margin:0;font:400 14px/1.6 Inter,sans-serif;color:#666565;max-width:300px")}>
                {liked.length > 0
                  ? "That's enough to read your taste. Let's build the shelf."
                  : "Scroll back up and keep a page or two so the shelf has something to go on."}
              </p>
              <PgButton autoWidth onClick={onDone}>
                Build my shelf
              </PgButton>
            </div>
          </article>
        </div>

        {book && (
          <div className="pgr-bar">
            <button
              type="button"
              onClick={() => onToggle(book.gid)}
              aria-pressed={isLiked}
              aria-label={isLiked ? "Remove from your shelf" : "Keep this book"}
              style={{
                ...sx(
                  "width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;border:1px solid rgba(0,0,0,.09);backdrop-filter:blur(6px)",
                ),
                background: isLiked ? "#3327ec" : "rgba(255,255,255,.72)",
              }}
            >
              <span style={{ ...mask("bookmark"), width: 18, height: 18, background: isLiked ? "#fff" : "#2c2c2c" }} />
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              style={sx(
                "height:42px;padding:0 26px;border-radius:999px;border:none;cursor:pointer;background:#111;color:#fff;font:600 13.5px Manrope,sans-serif;box-shadow:0 6px 18px rgba(0,0,0,.22)",
              )}
            >
              Next book
            </button>
            <button
              type="button"
              className="pgr-info-toggle"
              onClick={() => setPanel(true)}
              aria-label="Book details"
              style={sx(
                "width:42px;height:42px;border-radius:50%;align-items:center;justify-content:center;cursor:pointer;border:1px solid rgba(0,0,0,.09);background:rgba(255,255,255,.72)",
              )}
            >
              <span style={{ ...mask("info"), width: 18, height: 18, background: "#2c2c2c" }} />
            </button>
          </div>
        )}
      </div>

      <p className="sr-only" aria-live="polite">
        {book ? `${book.title} by ${book.author}. Page ${index + 1} of ${total}.` : "End of the reading round."}{" "}
        {liked.length} kept.
      </p>
    </section>
  );
}
