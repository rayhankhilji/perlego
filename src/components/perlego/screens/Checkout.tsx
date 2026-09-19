import { useState } from "react";
import { mask, sx } from "@/lib/perlego/sx";
import type { Vals } from "@/lib/perlego/view";
import { PgButton } from "@/components/perlego/PgButton";

export function Checkout({ v }: { v: Vals }) {
  const chosen = v.plans.find((plan) => plan.cta === "Selected") ?? v.plans[2]!;
  const [processing, setProcessing] = useState(false);

  const confirm = () => {
    if (processing) return;
    setProcessing(true);
    window.setTimeout(v.toUnlocked, 850);
  };

  return (
    <section className="pg-checkout">
      <div className="pg-checkout-copy">
        <button type="button" className="pg-back" onClick={v.toPaywall}>
          <span style={{ ...mask("arrow-left"), width: 16, height: 16, background: "currentColor" }} />
          Back to plans
        </button>
        <span className="pg-kicker">Secure checkout</span>
        <h1>Start reading today</h1>
        <p>Your seven-day trial starts now. You will not be charged today.</p>
        <div className="pg-order-line">
          <div>
            <strong>{chosen.name} plan</strong>
            <span>{chosen.total}</span>
          </div>
          <strong>{chosen.perMonth}<small>/month</small></strong>
        </div>
        <div className="pg-check-list">
          {[
            "Unlimited access to over 1 million titles",
            "Notes, highlights and citation tools",
            "Cancel any time before your trial ends",
          ].map((item) => (
            <span key={item}><i style={{ ...mask("check"), width: 15, height: 15, background: "var(--success-500)" }} />{item}</span>
          ))}
        </div>
      </div>

      <form className="pg-payment" onSubmit={(event) => { event.preventDefault(); confirm(); }}>
        <div className="pg-payment-head">
          <span>Payment details</span>
          <span className="pg-demo-badge">Demo</span>
        </div>
        <label>Email address<input type="email" defaultValue="reader@example.com" required /></label>
        <label>Card number<div className="pg-card-input"><input inputMode="numeric" defaultValue="4242 4242 4242 4242" required /><span>VISA</span></div></label>
        <div className="pg-field-row">
          <label>Expiry<input defaultValue="12 / 30" required /></label>
          <label>CVC<input inputMode="numeric" defaultValue="123" required /></label>
        </div>
        <label>Name on card<input defaultValue="Alex Reader" required /></label>
        <PgButton large disabled={processing}>{processing ? "Confirming…" : "Start my free week"}</PgButton>
        <p className="pg-payment-note">Prototype checkout — no payment will be taken.</p>
      </form>
    </section>
  );
}