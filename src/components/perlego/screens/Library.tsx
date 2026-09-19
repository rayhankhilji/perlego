import { sx } from "@/lib/perlego/sx";
import type { Vals } from "@/lib/perlego/view";
import { PgButton } from "@/components/perlego/PgButton";

export function Library({ v }: { v: Vals }) {
  return (
    <section
      style={sx(
        "flex:1;display:flex;flex-direction:column;gap:0;overflow:auto;animation:pgIn .32s cubic-bezier(.4,0,.2,1) both",
      )}
    >
      <div style={sx("padding:48px 52px 32px;display:flex;flex-direction:column;gap:14px;background:linear-gradient(180deg,#e4e8fe 0%,#ffffff 100%)")}>
        <span
          style={sx(
            "font:500 12px Manrope,sans-serif;letter-spacing:.6px;text-transform:uppercase;color:#777674",
          )}
        >
          Your library
        </span>
        <h1
          style={sx(
            "font-family:'Playfair Display',Georgia,serif;font-weight:700;font-size:40px;line-height:1.1;margin:0;color:#000;letter-spacing:-.8px",
          )}
        >
          {v.libCount} books, ordered for you
        </h1>
        <p style={sx("margin:0;font:400 15px/1.65 Inter,sans-serif;color:#4e4e4e;max-width:620px")}>{v.libLead}</p>
        <div style={sx("display:flex;gap:26px;flex-wrap:wrap;margin-top:8px")}>
          {[
            { n: String(v.libCount), t: "books on your shelf" },
            { n: String(v.subjectCount), t: "subjects covered" },
            { n: v.pagesTotal, t: "pages you kept" },
          ].map((stat) => (
            <div key={stat.t} style={sx("display:flex;flex-direction:column")}>
              <span style={sx("font:700 19px Manrope,sans-serif;color:#000")}>{stat.n}</span>
              <span style={sx("font:400 12.5px Inter,sans-serif;color:#666565")}>{stat.t}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={sx("padding:8px 52px 0;display:flex;flex-direction:column;gap:18px")}>
        <div
          style={sx(
            "padding:18px 20px;border-radius:12px;border:1px solid #e9e7e3;background:#f9f8f6;font:400 14.5px/1.6 Inter,sans-serif;color:#383838;max-width:720px",
          )}
        >
          {v.insight}
        </div>
        <div style={sx("display:flex;flex-direction:column;gap:9px;max-width:460px")}>
          <span style={sx("font:600 13px Manrope,sans-serif;color:#383838")}>Your mix</span>
          {v.mix.map((m) => (
            <div key={m.name} style={sx("display:flex;align-items:center;gap:12px")}>
              <span style={sx("flex:none;width:150px;font:400 13px Inter,sans-serif;color:#4e4e4e")}>{m.name}</span>
              <span style={sx("flex:1;height:6px;border-radius:999px;background:#e9e7e3;overflow:hidden")}>
                <span style={m.barStyle} />
              </span>
              <span style={sx("flex:none;font:500 12.5px Inter,sans-serif;color:#777674;width:38px;text-align:right")}>
                {m.pct}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={sx("padding:32px 52px 0;display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:18px")}>
        {v.lists.map((l) => (
          <div
            key={l.name}
            style={sx(
              "display:flex;flex-direction:column;gap:12px;padding:22px;border-radius:14px;border:1px solid #e9e7e3;background:#fff;box-shadow:0 1px 3px rgba(44,44,44,.06)",
            )}
          >
            <div style={sx("display:flex;flex-direction:column;gap:3px")}>
              <span style={sx("font:600 16px Manrope,sans-serif;color:#000")}>{l.name}</span>
              <span style={sx("font:400 12.5px Inter,sans-serif;color:#777674")}>{l.meta}</span>
            </div>
            <div style={sx("display:flex;flex-direction:column;gap:10px")}>
              {l.books.map((b) => (
                <div key={b.title} style={sx("display:flex;align-items:center;gap:11px")}>
                  <span style={sx("font:500 12px Inter,sans-serif;color:#b2b1ae;width:12px")}>{b.n}</span>
                  <span style={b.coverStyle} />
                  <span style={sx("display:flex;flex-direction:column;gap:2px;min-width:0")}>
                    <span
                      style={sx(
                        "font:500 13.5px Inter,sans-serif;color:#2c2c2c;overflow:hidden;text-overflow:ellipsis;white-space:nowrap",
                      )}
                    >
                      {b.title}
                    </span>
                    <span style={sx("font:400 12px Inter,sans-serif;color:#777674")}>{b.author}</span>
                  </span>
                </div>
              ))}
            </div>
            <span style={sx("font:400 12.5px/1.55 Inter,sans-serif;color:#666565;padding-top:4px;border-top:1px solid #f0efec")}>
              {l.why}
            </span>
          </div>
        ))}
      </div>

      <div style={sx("padding:32px 52px 0;display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px")}>
        {v.valueCards.map((c) => (
          <div
            key={c.title}
            style={sx(
              "display:flex;flex-direction:column;gap:9px;padding:20px;border-radius:12px;background:#f9f8f6;border:1px solid #e9e7e3",
            )}
          >
            <span style={c.iconStyle} />
            <span style={sx("font:600 15px Manrope,sans-serif;color:#000")}>{c.title}</span>
            <span style={sx("font:400 13.5px/1.6 Inter,sans-serif;color:#666565")}>{c.text}</span>
          </div>
        ))}
      </div>

      {v.skipped.length > 0 && (
        <div style={sx("padding:32px 52px 0;display:flex;align-items:center;gap:14px;flex-wrap:wrap")}>
          <span style={sx("font:400 13px Inter,sans-serif;color:#777674")}>Left out, based on your passes</span>
          <span style={sx("display:flex;gap:7px")}>
            {v.skipped.map((s, i) => (
              <span key={i} style={s.coverStyle} />
            ))}
          </span>
        </div>
      )}

      <div
        style={sx(
          "margin-top:36px;padding:26px 52px 40px;display:flex;align-items:center;gap:16px;flex-wrap:wrap;border-top:1px solid #e9e7e3;background:#fff",
        )}
      >
        <PgButton autoWidth large onClick={v.toPaywall}>
          Start reading
        </PgButton>
        <span style={sx("font:400 13.5px Inter,sans-serif;color:#777674")}>
          7 days free, then choose a plan. Cancel anytime.
        </span>
      </div>
    </section>
  );
}
