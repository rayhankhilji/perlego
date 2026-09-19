import { sx } from "@/lib/perlego/sx";
import type { Vals } from "@/lib/perlego/view";
import { PgButton } from "@/components/perlego/PgButton";
import { FEATURES } from "@/lib/perlego/data";

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

      <div style={sx("padding:40px 52px 0;display:flex;flex-direction:column;gap:16px")}>
        <div style={sx("display:flex;flex-direction:column;gap:4px")}>
          <h2
            style={sx(
              "font-family:'Playfair Display',Georgia,serif;font-weight:700;font-size:26px;margin:0;color:#000;letter-spacing:-.4px",
            )}
          >
            What you can do with these books
          </h2>
          <span style={sx("font:400 13.5px Inter,sans-serif;color:#777674")}>
            Every title opens in the reader, with study guides and the research assistant alongside.
          </span>
        </div>
        <div style={sx("display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:18px")}>
          {FEATURES.map((f) => (
            <div
              key={f.title}
              style={sx(
                "display:flex;flex-direction:column;border-radius:12px;border:1px solid #e9e7e3;background:#fff;overflow:hidden;box-shadow:0 1px 3px rgba(44,44,44,.06)",
              )}
            >
              <video
                src={f.src}
                muted
                autoPlay
                loop
                playsInline
                preload="metadata"
                style={sx("display:block;width:100%;height:210px;object-fit:cover;background:#f0efec")}
              />
              <div style={sx("display:flex;flex-direction:column;gap:7px;padding:18px 20px 22px")}>
                <span style={sx("font:600 16px Manrope,sans-serif;color:#000")}>{f.title}</span>
                <span style={sx("font:400 13.5px/1.6 Inter,sans-serif;color:#666565")}>{f.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

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
