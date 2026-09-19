import type { ReactNode } from "react";
import { mask, sx } from "@/lib/perlego/sx";
import type { Vals } from "@/lib/perlego/view";

export function PerlegoShell({ v, children }: { v: Vals; children: ReactNode }) {
  return (
    <div
      style={sx(
        "min-height:100dvh;display:flex;flex-direction:column;background:#fff;color:#2c2c2c;font-family:Inter,sans-serif",
      )}
    >
      <header
        style={sx(
          "flex:none;display:flex;align-items:center;gap:16px;padding:14px 24px;border-bottom:1px solid #e9e7e3;background:#fff",
        )}
      >
        <span style={sx("display:flex;align-items:center;gap:8px")}>
          <span style={{ ...mask("book-open"), width: 19, height: 19, background: "#3327ec" }} />
          <span style={sx("font:700 16px Manrope,sans-serif;letter-spacing:-.2px;color:#000")}>Perlego</span>
        </span>
        <span style={sx("flex:1")} />
        <span style={sx("font:500 12px Manrope,sans-serif;color:#777674")}>{v.stepLabel}</span>
        <span style={sx("font:500 12px Manrope,sans-serif;color:#b2b1ae")}>{v.stepCount}</span>
      </header>
      <div style={sx("flex:none;height:3px;background:#f0efec")}>
        <div style={v.progressStyle} />
      </div>

      {children}

      <footer
        style={sx(
          "flex:none;display:flex;align-items:center;gap:7px;flex-wrap:wrap;padding:10px 24px;border-top:1px solid #e9e7e3;background:#f9f8f6",
        )}
      >
        <span style={sx("font:500 11px Manrope,sans-serif;letter-spacing:.5px;text-transform:uppercase;color:#b2b1ae")}>
          Jump to
        </span>
        {v.jumper.map((j) => (
          <button key={j.label} type="button" onClick={j.go} style={j.style}>
            {j.label}
          </button>
        ))}
      </footer>
    </div>
  );
}
