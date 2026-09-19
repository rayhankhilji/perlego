import { useCallback, useEffect, useRef, useState } from "react";
import { mask, sx } from "@/lib/perlego/sx";
import { CAT_TINT, cover, type PBook } from "@/lib/perlego/data";
import { PgButton } from "@/components/perlego/PgButton";

type Props = {
  books: PBook[];
  liked: string[];
  onToggle: (g: string) => void;
  onIndex: (i: number) => void;
  onDone: () => void;
};

/** The page feed we built, dressed in the prototype's design language. */
export function PerlegoPageFeed({ books, liked, onToggle, onIndex, onDone }: Props) {
  const total = books.length;
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [moved, setMoved] = useState(false);
  const startY = useRef<number | null>(null);
  const last = useRef(0);

  const book = books[index];
  const atEnd = index >= total;
  const isLiked = book ? liked.includes(book.g) : false;

  const move = useCallback(
    (step: 1 | -1) => {
      const now = Date.now();
      if (now - last.current < 380) return;
      setIndex((prev) => {
        const next = prev + step;
        if (next < 0 || next > total) return prev;
        last.current = now;
        setDir(step);
        setMoved(true);
        return next;
      });
    },
    [total],
  );

  useEffect(() => {
    onIndex(index);
  }, [index, onIndex]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        move(1);
      }
      if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        move(-1);
      }
      if (e.key.toLowerCase() === "l" && book) onToggle(book.g);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [book, move, onToggle]);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 12) return;
      move(e.deltaY > 0 ? 1 : -1);
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [move]);

  if (total === 0) return null;

  const turn = {
    animation: `${dir === 1 ? "feed-turn-down" : "feed-turn-up"} 480ms cubic-bezier(.22,.75,.2,1) both`,
    display: "flex",
    flexDirection: "column" as const,
    height: "100%",
    minHeight: 0,
  };

  return (
    <section
      style={sx(
        "flex:1;display:flex;flex-direction:column;align-items:center;gap:16px;padding:28px 24px 30px;background:linear-gradient(180deg,#f9f8f6 0%,#ffffff 100%);touch-action:none;overflow:hidden",
      )}
      onPointerDown={(e) => {
        startY.current = e.clientY;
      }}
      onPointerUp={(e) => {
        if (startY.current === null) return;
        const d = e.clientY - startY.current;
        startY.current = null;
        if (Math.abs(d) > 60) move(d < 0 ? 1 : -1);
      }}
      onPointerCancel={() => {
        startY.current = null;
      }}
    >
      <div style={sx("display:flex;align-items:center;justify-content:center;gap:12px;flex:none")}>
        <span style={sx("font:500 11.5px Manrope,sans-serif;letter-spacing:.6px;text-transform:uppercase;color:#777674")}>
          One page each
        </span>
        <span style={sx("font:500 11.5px Manrope,sans-serif;color:#b2b1ae")}>
          {Math.min(index + 1, total)} / {total}
        </span>
      </div>

      <div style={sx("flex:1;min-height:0;width:100%;display:flex;align-items:center;justify-content:center")}>
        <article
          style={{
            ...sx(
              "width:min(100%,23.5rem);height:100%;max-height:46rem;display:flex;flex-direction:column;padding:30px 28px 26px;border-radius:6px;background:#fff;border:1px solid #e9e7e3;box-shadow:0 1px 3px rgba(44,44,44,.1),0 12px 32px rgba(44,44,44,.08);overflow:hidden",
            ),
            userSelect: "none",
          }}
        >
          {book ? (
            <div key={book.g} style={turn}>
              <div style={sx("display:flex;align-items:center;justify-content:space-between;gap:10px;flex:none")}>
                <span
                  style={{
                    ...sx(
                      "padding:4px 9px;border-radius:4px;font:500 11px Manrope,sans-serif;letter-spacing:.3px;color:#383838",
                    ),
                    background: CAT_TINT[book.c] ?? "#e9e7e3",
                  }}
                >
                  {book.c}
                </span>
                <span style={sx("font:400 11.5px Inter,sans-serif;color:#b2b1ae")}>{book.y}</span>
              </div>

              <div style={sx("display:flex;gap:12px;align-items:flex-start;margin-top:16px;flex:none")}>
                <span
                  style={{
                    ...sx("width:46px;height:69px;border-radius:3px;flex:none;box-shadow:0 1px 3px rgba(44,44,44,.14)"),
                    backgroundImage: `url(${cover(book.g, 1)})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundColor: "#e9e7e3",
                  }}
                />
                <span style={sx("display:flex;flex-direction:column;gap:3px;min-width:0")}>
                  <span
                    style={sx(
                      "font-family:'Playfair Display',Georgia,serif;font-weight:700;font-size:23px;line-height:1.12;color:#000",
                    )}
                  >
                    {book.t}
                  </span>
                  <span style={sx("font:400 12.5px Inter,sans-serif;color:#777674")}>{book.a}</span>
                </span>
              </div>

              <div style={sx("height:1px;background:#e9e7e3;margin:18px 0 14px;flex:none")} />

              <div style={sx("flex:1;min-height:0;overflow:hidden;display:flex;flex-direction:column;gap:11px")}>
                {book.ex.map((para, i) => (
                  <p
                    key={i}
                    style={sx(
                      "margin:0;font-family:'Playfair Display',Georgia,serif;font-size:15px;line-height:1.62;color:#2c2c2c",
                    )}
                  >
                    {para}
                  </p>
                ))}
              </div>

              <div style={sx("display:flex;align-items:flex-end;justify-content:space-between;gap:12px;margin-top:14px;flex:none")}>
                <span style={sx("font:400 12px/1.5 Inter,sans-serif;color:#777674;max-width:70%")}>{book.r}</span>
                <span style={sx("font:500 11.5px Manrope,sans-serif;color:#b2b1ae")}>
                  {String(index + 17).padStart(2, "0")}
                </span>
              </div>
            </div>
          ) : (
            <div key="end" style={{ ...turn, alignItems: "center", justifyContent: "center", textAlign: "center", gap: 12 }}>
              <span style={{ ...mask("sparkles"), width: 26, height: 26, background: "#3327ec" }} />
              <h2
                style={sx(
                  "font-family:'Playfair Display',Georgia,serif;font-weight:700;font-size:28px;line-height:1.12;margin:0;color:#000",
                )}
              >
                {liked.length > 0 ? `${liked.length} page${liked.length === 1 ? "" : "s"} kept` : "Nothing kept yet"}
              </h2>
              <p style={sx("margin:0;font:400 14px/1.6 Inter,sans-serif;color:#666565;max-width:270px")}>
                {liked.length > 0
                  ? "That's enough to read your taste. Let's build the shelf."
                  : "Scroll back up and keep a page or two so the shelf has something to go on."}
              </p>
              <PgButton autoWidth onClick={onDone}>
                Build my shelf
              </PgButton>
            </div>
          )}
        </article>
      </div>

      {!atEnd && (
        <div style={sx("flex:none;display:flex;flex-wrap:nowrap;align-items:center;justify-content:center;gap:12px")}>
          <button
            type="button"
            onClick={() => book && onToggle(book.g)}
            aria-pressed={isLiked}
            aria-label={isLiked ? "Remove from your shelf" : "Keep this page"}
            style={{
              ...sx(
                "width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:transform 140ms,background 140ms,border-color 140ms",
              ),
              border: "1px solid " + (isLiked ? "#3327ec" : "#cdccc8"),
              background: isLiked ? "#3327ec" : "#fff",
            }}
          >
            <span style={{ ...mask("heart"), width: 21, height: 21, background: isLiked ? "#fff" : "#4e4e4e" }} />
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            aria-label="Next page"
            style={sx(
              "width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;border:1px solid #cdccc8;background:#fff;transition:transform 140ms",
            )}
          >
            <span style={{ ...mask("chevron-down"), width: 21, height: 21, background: "#4e4e4e" }} />
          </button>
        </div>
      )}

      {!moved && (
        <button
          type="button"
          onClick={() => move(1)}
          style={sx(
            "flex:none;display:flex;align-items:center;gap:6px;font:400 12.5px Inter,sans-serif;color:#777674;background:none;border:none;cursor:pointer",
          )}
        >
          <span style={{ ...mask("chevron-down"), width: 14, height: 14, background: "#777674" }} />
          Swipe up for the next page
        </button>
      )}

      <p className="sr-only" aria-live="polite">
        Page {Math.min(index + 1, total)} of {total}. {liked.length} kept.
      </p>
    </section>
  );
}
