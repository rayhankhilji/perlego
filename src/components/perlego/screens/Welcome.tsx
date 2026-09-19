import { sx } from "@/lib/perlego/sx";
import type { Vals } from "@/lib/perlego/view";
import { PgButton } from "@/components/perlego/PgButton";

export function Welcome({ v }: { v: Vals }) {
  return (
    <section
      style={sx(
        "flex:1;display:grid;grid-template-columns:minmax(0,1fr) minmax(300px,440px);gap:48px;align-items:center;padding:56px 48px;background:linear-gradient(180deg,#e4e8fe 0%,#ffffff 72%)",
      )}
    >
      <div
        style={sx(
          "display:flex;flex-direction:column;gap:20px;max-width:560px;animation:pgIn .32s cubic-bezier(.4,0,.2,1) both",
        )}
      >
        <div style={sx("display:flex;align-items:center;gap:10px")}>
          <span style={sx("width:28px;height:3px;background:#ffd400;border-radius:2px")} />
          <span
            style={sx(
              "font:500 12px Manrope,sans-serif;letter-spacing:.6px;text-transform:uppercase;color:#777674",
            )}
          >
            Unlimited academic reading
          </span>
        </div>
        <h1
          style={sx(
            "font-family:'Playfair Display',Georgia,serif;font-weight:700;font-size:60px;line-height:1.02;margin:0;color:#000;letter-spacing:-1.5px",
          )}
        >
          Read freely.
        </h1>
        <p style={sx("margin:0;font:400 17px/1.6 Inter,sans-serif;color:#4e4e4e;max-width:470px")}>
          Over a million academic and non-fiction books, unlimited. Answer a few questions and we'll build you a shelf
          before you sign up to anything.
        </p>
        <div style={sx("display:flex;gap:12px;align-items:center;margin-top:6px;flex-wrap:wrap")}>
          <PgButton autoWidth large onClick={v.toInterests}>
            Build my shelf
          </PgButton>
          <span style={sx("font:400 13.5px Inter,sans-serif;color:#777674")}>Two minutes. No account, no card.</span>
        </div>
        <div
          style={sx(
            "display:flex;gap:26px;flex-wrap:wrap;margin-top:18px;padding-top:20px;border-top:1px solid #e9e7e3",
          )}
        >
          {[
            { n: "1m+", t: "titles, unlimited" },
            { n: "7,000", t: "publishers on the platform" },
            { n: "£8", t: "a month, cancel anytime" },
          ].map((stat) => (
            <div key={stat.n} style={sx("display:flex;flex-direction:column")}>
              <span style={sx("font:700 20px Manrope,sans-serif;color:#000")}>{stat.n}</span>
              <span style={sx("font:400 12.5px Inter,sans-serif;color:#666565")}>{stat.t}</span>
            </div>
          ))}
        </div>
      </div>
      <div
        style={sx(
          "position:relative;height:560px;overflow:hidden;animation:pgIn .4s cubic-bezier(.4,0,.2,1) .08s both;-webkit-mask-image:linear-gradient(180deg,transparent 0,#000 10%,#000 90%,transparent 100%);mask-image:linear-gradient(180deg,transparent 0,#000 10%,#000 90%,transparent 100%)",
        )}
      >
        <div style={sx("display:grid;grid-template-columns:repeat(3,1fr);gap:14px;height:100%;align-items:start")}>
          {v.mosaic.map((col, ci) => (
            <div key={ci} style={col.style}>
              {col.items.map((c) => (
                <div key={c.key} style={c.style} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
