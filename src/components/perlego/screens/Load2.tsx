import { sx } from "@/lib/perlego/sx";
import type { Vals } from "@/lib/perlego/view";

export function Load2({ v }: { v: Vals }) {
  return (
    <section
      style={sx(
        "flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:36px;padding:56px;background:linear-gradient(180deg,#ffffff 0%,#f9f8f6 100%)",
      )}
    >
      <div style={sx("position:relative;width:420px;height:150px;display:flex;align-items:flex-end;justify-content:center")}>
        {v.fan.map((f, i) => (
          <span key={i} style={f.style} />
        ))}
      </div>
      <div style={sx("display:flex;flex-direction:column;gap:12px;min-width:280px")}>
        {v.buildSteps.map((st, i) => (
          <div key={i} style={st.style}>
            <span style={st.dotStyle} />
            {st.label}
          </div>
        ))}
      </div>
    </section>
  );
}
