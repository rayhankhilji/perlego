import { mask, sx } from "@/lib/perlego/sx";
import type { Vals } from "@/lib/perlego/view";
import { PgButton } from "@/components/perlego/PgButton";

export function Talk({ v }: { v: Vals }) {
  return (
    <section
      style={sx(
        "flex:1;display:grid;grid-template-columns:minmax(0,1fr) 320px;animation:pgIn .32s cubic-bezier(.4,0,.2,1) both",
      )}
    >
      <div style={sx("display:flex;flex-direction:column;padding:40px 48px 32px;gap:20px;max-width:780px")}>
        <div style={sx("display:flex;align-items:center;gap:12px")}>
          <span
            style={sx(
              "width:34px;height:34px;border-radius:50%;background:radial-gradient(circle at 30% 30%,#3327ec 0%,#714cf9 55%,#ed6fff 100%);display:flex;align-items:center;justify-content:center;flex:none",
            )}
          >
            <span style={{ ...mask("audio-lines"), width: 17, height: 17, background: "#fff" }} />
          </span>
          <div style={sx("display:flex;flex-direction:column")}>
            <span style={sx("font:600 14.5px Manrope,sans-serif;color:#000")}>Perlego</span>
            <span style={sx("font:400 12.5px Inter,sans-serif;color:#777674")}>
              {v.talkDone ? "That's everything we need" : "Listening — answer however you like"}
            </span>
          </div>
        </div>
        <div style={sx("flex:1;display:flex;flex-direction:column;gap:14px;overflow:auto;padding-right:6px")}>
          {v.transcript.map((row, i) => (
            <div key={i} style={row.rowStyle}>
              <div style={row.style}>{row.text}</div>
            </div>
          ))}
        </div>
        {v.replies.length > 0 && (
          <div style={sx("display:flex;flex-wrap:wrap;gap:9px")}>
            {v.replies.map((r) => (
              <button
                key={r.text}
                type="button"
                onClick={r.pick}
                className="pg-hover-lift"
                style={sx(
                  "padding:10px 15px;border-radius:999px;border:1px solid #cdccc8;background:#fff;color:#383838;font:400 13.5px Inter,sans-serif;cursor:pointer;text-align:left",
                )}
              >
                {r.text}
              </button>
            ))}
          </div>
        )}
        <div style={sx("display:flex;align-items:center;gap:12px;padding-top:6px")}>
          <span style={sx("display:flex;align-items:center;gap:7px;font:400 12.5px Inter,sans-serif;color:#777674")}>
            <span style={{ ...mask("keyboard"), width: 15, height: 15, background: "#777674" }} />
            You can type instead
          </span>
          <span style={sx("flex:1")} />
          {v.talkDone && (
            <PgButton autoWidth onClick={v.toLoad1}>
              See my shelf
            </PgButton>
          )}
        </div>
      </div>
      <aside
        style={sx(
          "background:#f9f8f6;border-left:1px solid #e9e7e3;padding:40px 28px;display:flex;flex-direction:column;gap:14px",
        )}
      >
        <div style={sx("font:600 13px Manrope,sans-serif;color:#383838")}>Picking up on</div>
        {v.derivedTopics.map((t) => (
          <div
            key={t.label}
            style={sx(
              "display:flex;align-items:center;gap:8px;padding:9px 13px;border-radius:999px;border:1px solid #c6cdff;background:#e4e8fe;color:#151da2;font:500 13px Inter,sans-serif;animation:pgIn .3s cubic-bezier(.4,0,.2,1) both",
            )}
          >
            <span style={{ ...mask("check"), width: 14, height: 14, background: "#3327ec" }} />
            {t.label}
          </div>
        ))}
        <p style={sx("margin:0;font:400 13px/1.6 Inter,sans-serif;color:#666565")}>
          These shape the twelve pages you'll read next — one page per book, so you can judge the writing itself.
        </p>
      </aside>
    </section>
  );
}
