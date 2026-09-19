import { mask } from "@/lib/perlego/sx";
import type { Vals } from "@/lib/perlego/view";
import { PgButton } from "@/components/perlego/PgButton";

export function Unlocked({ v }: { v: Vals }) {
  return (
    <section className="pg-unlocked">
      <div className="pg-unlocked-mark">
        <span style={{ ...mask("check"), width: 30, height: 30, background: "var(--surface-01)" }} />
      </div>
      <span className="pg-kicker">Payment confirmed</span>
      <h1>Your reading is unlocked</h1>
      <p>Your seven-day free trial has started. Your saved books and every title in Perlego are ready to read.</p>
      <div className="pg-unlocked-summary">
        <span>{v.chosenSummary}</span>
        <strong>£0 today</strong>
      </div>
      <PgButton autoWidth large onClick={v.toReader}>Start reading</PgButton>
      <span className="pg-unlocked-fine">We’ll remind you two days before your first payment.</span>
    </section>
  );
}