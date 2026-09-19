import { useLayoutEffect, useRef, useState } from "react";
import { sx } from "@/lib/perlego/sx";
import type { Vals } from "@/lib/perlego/view";
import { PgButton } from "@/components/perlego/PgButton";
import { Stars } from "@/components/perlego/Stars";
import { ReviewWall } from "@/components/perlego/ReviewWall";
import { TRUST_METRICS } from "@/lib/perlego/data";

function PlanPill({ v }: { v: Vals }) {
  const wrap = useRef<HTMLDivElement | null>(null);
  const [thumb, setThumb] = useState({ left: 4, width: 0 });

  useLayoutEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const place = () => {
      const active = el.querySelector('[aria-checked="true"]') as HTMLElement | null;
      if (active) setThumb({ left: active.offsetLeft, width: active.offsetWidth });
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(el);
    return () => ro.disconnect();
  }, [v.screen, v.plans.map((p) => p.cta).join()]);

  return (
    <div className="pgp-pill" ref={wrap} role="radiogroup" aria-label="Billing period">
      <span className="pgp-thumb" style={{ left: thumb.left, width: thumb.width }} />
      {v.plans.map((p) => {
        const on = p.cta === "Selected";
        return (
          <button key={p.k} type="button" role="radio" aria-checked={on} className="pgp-seg" onClick={p.choose}>
            {p.name}
            {p.save ? <span className="pgp-off">{p.save}</span> : null}
          </button>
        );
      })}
    </div>
  );
}

export function Paywall({ v }: { v: Vals }) {
  const chosen = v.plans.filter((p) => p.cta === "Selected")[0] ?? v.plans[2]!;

  return (
    <section className="pg-plan">
      <div className="pg-plan-main">
      <div className="pg-plan-copy">
        <span style={sx("font:500 12px Manrope,sans-serif;letter-spacing:.6px;text-transform:uppercase;color:#777674")}>
          Your personalised access
        </span>
        <h1
          style={sx(
            "font-family:'Playfair Display',Georgia,serif;font-weight:700;font-size:38px;line-height:1.1;margin:0;color:#000;letter-spacing:-.8px",
          )}
        >
          Read freely from {chosen.perMonth} a month
        </h1>
        <p style={sx("margin:0;font:400 15px/1.65 Inter,sans-serif;color:#4e4e4e;max-width:620px")}>{v.payLead}</p>

        <PlanPill v={v} />

        <div className="pg-plan-price">
          <span
            style={sx(
              "font-family:'Playfair Display',Georgia,serif;font-weight:700;font-size:46px;line-height:1;color:#000",
            )}
          >
            {chosen.perMonth}
          </span>
          <span style={sx("font:400 14px Inter,sans-serif;color:#4e4e4e;padding-bottom:6px")}>
            a month · {chosen.total}
          </span>
          {chosen.save ? (
            <span
              style={sx(
                "padding:5px 10px;border-radius:999px;background:#eafbef;color:#007824;font:600 12px Manrope,sans-serif;margin-bottom:6px",
              )}
            >
              {chosen.save} vs monthly
            </span>
          ) : null}
        </div>

        <div className="pg-plan-action">
          <PgButton autoWidth large onClick={v.toCheckout}>Continue to payment</PgButton>
          <span>{chosen.name} · {chosen.total}<br />Cancel anytime</span>
        </div>

        <div style={sx("display:flex;align-items:center;gap:10px;flex-wrap:wrap")}>
          <Stars value={4.5} />
          <span style={sx("font:400 13px Inter,sans-serif;color:#666565")}>Rated 4.5 on Trustpilot</span>
          <span style={sx("display:flex;gap:7px;margin-left:8px")}>
            {v.miniCovers.map((c) => (
              <span key={c.key} style={c.style} />
            ))}
          </span>
        </div>
      </div>
      <div className="pg-plan-trust">
        {TRUST_METRICS.map((m) => (
          <div key={m.t} style={sx("display:flex;flex-direction:column")}>
            <span style={sx("font:700 19px Manrope,sans-serif;color:#000")}>{m.n}</span>
            <span style={sx("font:400 12.5px Inter,sans-serif;color:#666565")}>{m.t}</span>
          </div>
        ))}
      </div>
      <div className="pg-plan-partners">
        {v.partners.slice(0, 3).map((p) => <span key={p.name}>{p.name}</span>)}
      </div>
      </div>

      <aside className="pg-plan-reviews">
        <div style={sx("display:flex;flex-direction:column;gap:4px")}>
          <h2
            style={sx(
              "font-family:'Playfair Display',Georgia,serif;font-weight:700;font-size:26px;margin:0;color:#000;letter-spacing:-.4px",
            )}
          >
            Students on Perlego
          </h2>
          <span style={sx("font:400 13.5px Inter,sans-serif;color:#777674")}>
            Real stories from curious readers.
          </span>
        </div>
        <ReviewWall />
      </aside>
    </section>
  );
}
