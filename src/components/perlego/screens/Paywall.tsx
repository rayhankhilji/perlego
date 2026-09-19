import { sx } from "@/lib/perlego/sx";
import type { Vals } from "@/lib/perlego/view";
import { PgButton } from "@/components/perlego/PgButton";

export function Paywall({ v }: { v: Vals }) {
  return (
    <section
      style={sx(
        "flex:1;display:flex;flex-direction:column;overflow:auto;animation:pgIn .32s cubic-bezier(.4,0,.2,1) both",
      )}
    >
      <div
        style={sx(
          "padding:48px 52px 30px;display:flex;flex-direction:column;gap:14px;background:linear-gradient(180deg,#e4e8fe 0%,#ffffff 100%)",
        )}
      >
        <span style={sx("font:500 12px Manrope,sans-serif;letter-spacing:.6px;text-transform:uppercase;color:#777674")}>
          Start your 7 days free
        </span>
        <h1
          style={sx(
            "font-family:'Playfair Display',Georgia,serif;font-weight:700;font-size:38px;line-height:1.1;margin:0;color:#000;letter-spacing:-.8px",
          )}
        >
          Keep reading from {v.chosenPrice}
        </h1>
        <p style={sx("margin:0;font:400 15px/1.65 Inter,sans-serif;color:#4e4e4e;max-width:620px")}>{v.payLead}</p>
        <div style={sx("display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-top:4px")}>
          <span style={sx("display:flex;gap:3px")}>
            {v.stars.map((s, i) => (
              <span key={i} style={s.style} />
            ))}
          </span>
          <span style={sx("font:400 13px Inter,sans-serif;color:#666565")}>Rated 4.5 on Trustpilot</span>
          <span style={sx("display:flex;gap:7px;margin-left:8px")}>
            {v.miniCovers.map((c) => (
              <span key={c.key} style={c.style} />
            ))}
          </span>
        </div>
      </div>

      <div style={sx("padding:10px 52px 0;display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px")}>
        {v.plans.map((p) => (
          <div key={p.k} style={p.cardStyle}>
            <span style={p.badgeStyle}>{p.badge}</span>
            <span style={sx("font:600 17px Manrope,sans-serif;color:#000;margin-top:8px")}>{p.name}</span>
            <span
              style={sx(
                "font-family:'Playfair Display',Georgia,serif;font-weight:700;font-size:34px;color:#000;margin:6px 0 2px",
              )}
            >
              {p.perDay}
              <span style={sx("font:400 13px Inter,sans-serif;color:#777674;margin-left:6px")}>a day</span>
            </span>
            <span style={sx("font:400 13px Inter,sans-serif;color:#777674")}>{p.billed}</span>
            <span style={sx("font:400 13.5px/1.6 Inter,sans-serif;color:#4e4e4e;margin:12px 0 18px")}>{p.note}</span>
            <button type="button" onClick={p.choose} style={p.btnStyle}>
              {p.cta}
            </button>
          </div>
        ))}
      </div>

      <div style={sx("padding:30px 52px 0;display:grid;grid-template-columns:minmax(0,1fr) minmax(260px,340px);gap:28px")}>
        <div style={sx("display:flex;flex-direction:column;gap:12px")}>
          <span style={sx("font:600 13px Manrope,sans-serif;color:#383838")}>How the trial works</span>
          {v.timeline.map((t, i) => (
            <div key={i} style={sx("display:flex;gap:12px")}>
              <span style={sx("display:flex;flex-direction:column;align-items:center;flex:none")}>
                <span style={t.dotStyle} />
                <span style={t.lineStyle} />
              </span>
              <span style={sx("display:flex;flex-direction:column;gap:2px;padding-bottom:14px")}>
                <span style={sx("font:600 13.5px Inter,sans-serif;color:#2c2c2c")}>{t.when}</span>
                <span style={sx("font:400 13.5px/1.6 Inter,sans-serif;color:#666565")}>{t.what}</span>
              </span>
            </div>
          ))}
        </div>
        <div
          style={sx(
            "display:flex;flex-direction:column;gap:11px;padding:22px;border-radius:14px;background:#f9f8f6;border:1px solid #e9e7e3;height:fit-content",
          )}
        >
          <span style={sx("font:600 13px Manrope,sans-serif;color:#383838")}>Included on every plan</span>
          {v.perks.map((p, i) => (
            <span key={i} style={sx("font:400 13.5px/1.6 Inter,sans-serif;color:#4e4e4e")}>
              {p.text}
            </span>
          ))}
          <span style={sx("font:400 12.5px/1.55 Inter,sans-serif;color:#777674;padding-top:8px;border-top:1px solid #e9e7e3")}>
            In print, the books you kept would cost about {v.printCost}.
          </span>
        </div>
      </div>

      <div style={sx("padding:32px 52px 0;display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px")}>
        {v.quotes.map((q) => (
          <div
            key={q.name}
            style={sx(
              "display:flex;flex-direction:column;gap:10px;padding:20px;border-radius:12px;background:#fff;border:1px solid #e9e7e3",
            )}
          >
            <span style={sx("font:400 13.5px/1.65 Inter,sans-serif;color:#383838")}>{q.text}</span>
            <span style={sx("display:flex;flex-direction:column;gap:1px;padding-top:6px;border-top:1px solid #f0efec")}>
              <span style={sx("font:600 13px Inter,sans-serif;color:#2c2c2c")}>{q.name}</span>
              <span style={sx("font:400 12px Inter,sans-serif;color:#777674")}>{q.role}</span>
            </span>
          </div>
        ))}
      </div>

      <div style={sx("padding:26px 52px 0;display:flex;gap:22px;flex-wrap:wrap;align-items:center")}>
        {v.partners.map((p) => (
          <span key={p.name} style={sx("font:500 12.5px Inter,sans-serif;color:#b2b1ae")}>
            {p.name}
          </span>
        ))}
      </div>

      <div
        style={sx(
          "margin-top:32px;padding:24px 52px 40px;display:flex;align-items:center;gap:16px;flex-wrap:wrap;border-top:1px solid #e9e7e3;background:#fff",
        )}
      >
        <PgButton autoWidth large onClick={v.restart}>
          Start my free week
        </PgButton>
        <span style={sx("font:400 13.5px Inter,sans-serif;color:#777674")}>{v.chosenSummary} · cancel anytime</span>
      </div>
    </section>
  );
}
