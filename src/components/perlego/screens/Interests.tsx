import { mask, sx } from "@/lib/perlego/sx";
import type { Vals } from "@/lib/perlego/view";
import { PgButton } from "@/components/perlego/PgButton";

export function Interests({ v }: { v: Vals }) {
  return (
    <section
      style={sx(
        "flex:1;display:grid;grid-template-columns:minmax(0,1fr) 340px;gap:0;animation:pgIn .32s cubic-bezier(.4,0,.2,1) both",
      )}
    >
      <div style={sx("padding:56px 56px 40px;display:flex;flex-direction:column;gap:22px;max-width:760px")}>
        <div>
          <h1
            style={sx(
              "font-family:'Playfair Display',Georgia,serif;font-weight:700;font-size:38px;line-height:1.15;margin:0 0 8px;color:#000",
            )}
          >
            What are you interested in?
          </h1>
          <p style={sx("margin:0;font:400 15px/1.6 Inter,sans-serif;color:#666565")}>
            Choose as many as you like. We'll use them to shape your shelf — you can change this later.
          </p>
        </div>
        <div style={sx("display:flex;flex-wrap:wrap;gap:10px")}>
          {v.topics.map((t) => (
            <button key={t.key} type="button" onClick={t.toggle} style={t.style}>
              <span style={t.iconStyle} />
              {t.label}
            </button>
          ))}
        </div>
        <div style={sx("height:1px;background:#e9e7e3;margin:6px 0")} />
        <button
          type="button"
          className="pg-hover-lift"
          onClick={v.toTalk}
          style={sx(
            "display:flex;align-items:center;gap:14px;text-align:left;padding:16px 18px;border-radius:12px;border:1px solid #c6cdff;background:#f6f7ff",
          )}
        >
          <span
            style={sx(
              "width:40px;height:40px;border-radius:50%;background:radial-gradient(circle at 30% 30%,#3327ec 0%,#714cf9 55%,#ed6fff 100%);flex:none;display:flex;align-items:center;justify-content:center",
            )}
          >
            <span style={{ ...mask("audio-lines"), width: 20, height: 20, background: "#fff" }} />
          </span>
          <span style={sx("display:flex;flex-direction:column;gap:2px")}>
            <span style={sx("font:600 15px Manrope,sans-serif;color:#151da2")}>I'm not sure — talk it through</span>
            <span style={sx("font:400 13px/1.5 Inter,sans-serif;color:#666565")}>
              Have a short conversation instead. Tell us what you're working on and we'll pick the subjects for you.
            </span>
          </span>
        </button>
        <div
          style={sx(
            "margin-top:auto;display:flex;align-items:center;justify-content:space-between;padding-top:20px",
          )}
        >
          <span style={sx("font:400 13px Inter,sans-serif;color:#777674")}>{v.selCount}</span>
          <PgButton autoWidth onClick={v.toLoad1} disabled={v.notEnough}>
            Continue
          </PgButton>
        </div>
      </div>
      <aside
        style={sx(
          "background:#f9f8f6;border-left:1px solid #e9e7e3;padding:56px 32px;display:flex;flex-direction:column;gap:16px",
        )}
      >
        <div style={sx("font:600 13px Manrope,sans-serif;letter-spacing:.2px;color:#383838")}>Your shelf so far</div>
        <div style={sx("display:grid;grid-template-columns:repeat(3,1fr);gap:10px")}>
          {v.previewCovers.map((c) => (
            <div key={c.key} style={c.style} />
          ))}
        </div>
        <p style={sx("margin:0;font:400 13px/1.6 Inter,sans-serif;color:#666565")}>{v.shelfHint}</p>
      </aside>
    </section>
  );
}
