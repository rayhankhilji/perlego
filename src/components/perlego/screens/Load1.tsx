import { sx } from "@/lib/perlego/sx";
import type { Vals } from "@/lib/perlego/view";

export function Load1({ v }: { v: Vals }) {
  return (
    <section
      style={sx(
        "flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:34px;padding:56px;background:linear-gradient(180deg,#ffffff 0%,#f9f8f6 100%)",
      )}
    >
      <div style={sx("display:flex;align-items:flex-end;gap:5px;height:150px")}>
        {v.spines.map((sp, i) => (
          <span key={i} style={sp.style} />
        ))}
      </div>
      <div style={sx("display:flex;flex-direction:column;align-items:center;gap:10px;text-align:center")}>
        <h2
          style={sx(
            "font-family:'Playfair Display',Georgia,serif;font-weight:700;font-size:30px;line-height:1.2;margin:0;color:#000",
          )}
        >
          {v.caption}
        </h2>
        <p style={sx("margin:0;font:400 14.5px/1.6 Inter,sans-serif;color:#666565;max-width:420px")}>
          Next you'll read one page from each of twelve books. Keep the ones whose writing you'd actually read.
        </p>
      </div>
      <div style={sx("width:220px;height:3px;border-radius:999px;background:#e9e7e3;overflow:hidden")}>
        <div style={sx("height:100%;background:#3327ec;animation:pgTrack 2.4s cubic-bezier(.4,0,.2,1) infinite")} />
      </div>
    </section>
  );
}
