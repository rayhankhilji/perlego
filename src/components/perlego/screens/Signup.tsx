import { sx } from "@/lib/perlego/sx";
import type { Vals } from "@/lib/perlego/view";
import { PgButton } from "@/components/perlego/PgButton";

export function Signup({ v }: { v: Vals }) {
  return (
    <section
      style={sx(
        "flex:1;display:grid;grid-template-columns:minmax(0,1fr) minmax(300px,380px);gap:0;animation:pgIn .32s cubic-bezier(.4,0,.2,1) both",
      )}
    >
      <div style={sx("padding:52px 52px 40px;display:flex;flex-direction:column;gap:22px;max-width:620px")}>
        <div>
          <h1
            style={sx(
              "font-family:'Playfair Display',Georgia,serif;font-weight:700;font-size:36px;line-height:1.14;margin:0 0 10px;color:#000",
            )}
          >
            {v.signupTitle}
          </h1>
          <p style={sx("margin:0;font:400 15px/1.6 Inter,sans-serif;color:#666565")}>
            Create an account to keep it. Nothing is charged today.
          </p>
        </div>
        <div style={sx("display:flex;flex-direction:column;gap:11px")}>
          {v.signupPerks.map((p, i) => (
            <div key={i} style={sx("display:flex;gap:10px;align-items:flex-start")}>
              <span style={p.iconStyle} />
              <span style={sx("font:400 14.5px/1.55 Inter,sans-serif;color:#383838")}>{p.text}</span>
            </div>
          ))}
        </div>
        <div style={sx("display:flex;flex-direction:column;gap:11px;max-width:420px;margin-top:4px")}>
          <input
            placeholder="Email address"
            style={sx(
              "padding:14px 16px;border-radius:10px;border:1px solid #cdccc8;background:#fff;font:400 14.5px Inter,sans-serif;color:#2c2c2c;outline:none",
            )}
          />
          <input
            placeholder="Choose a password"
            type="password"
            style={sx(
              "padding:14px 16px;border-radius:10px;border:1px solid #cdccc8;background:#fff;font:400 14.5px Inter,sans-serif;color:#2c2c2c;outline:none",
            )}
          />
          <PgButton large onClick={v.toLoad2}>
            Create account and keep my shelf
          </PgButton>
          <span style={sx("font:400 12.5px/1.5 Inter,sans-serif;color:#777674")}>
            No card needed now. You'll choose a plan after you've seen your library.
          </span>
        </div>
      </div>
      <aside
        style={sx(
          "background:#f9f8f6;border-left:1px solid #e9e7e3;padding:52px 32px;display:flex;flex-direction:column;gap:16px",
        )}
      >
        <div style={sx("font:600 13px Manrope,sans-serif;color:#383838")}>
          Kept {v.likedCount} {v.likedCount === 1 ? "page" : "pages"}
        </div>
        <div style={sx("display:grid;grid-template-columns:repeat(3,1fr);gap:10px")}>
          {v.likedSlots.map((s, i) => (
            <div key={i} style={s.style} />
          ))}
        </div>
        <p style={sx("margin:0;font:400 13px/1.6 Inter,sans-serif;color:#666565")}>
          These stay on your shelf. We build the rest of your library around them.
        </p>
      </aside>
    </section>
  );
}
