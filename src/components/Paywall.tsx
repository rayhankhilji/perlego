import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import type { Shelf } from "@/lib/deck";
import { BOOKS_BY_ID } from "@/lib/books";

type Plan = "monthly" | "annual";

const PLANS: Record<Plan, { label: string; price: string; note: string }> = {
  monthly: { label: "Monthly", price: "£12", note: "per month, cancel anytime" },
  annual: { label: "Annual", price: "£8", note: "per month, billed yearly" },
};

export function Paywall({ shelf, onRestart }: { shelf: Shelf; onRestart: () => void }) {
  const [plan, setPlan] = useState<Plan>("annual");
  const [state, setState] = useState<"choose" | "processing" | "done">("choose");

  if (state === "done") {
    const first = shelf.picks[0] ? BOOKS_BY_ID[shelf.picks[0].id] : undefined;
    return (
      <div className="mx-auto flex min-h-screen w-full max-w-lg flex-col items-center justify-center px-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="h-8 w-8" />
        </div>
        <h1 className="font-display mt-6 text-4xl leading-tight">You're in.</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {shelf.shelfTitle} is on your shelf, and the rest of the library is open.
        </p>
        {first && (
          <div className="mt-8 w-full rounded-2xl bg-card px-6 py-6 text-left text-card-foreground shadow-xl">
            <p className="text-[0.65rem] uppercase tracking-[0.18em] text-card-foreground/50">
              Pick up where you stopped
            </p>
            <h2 className="font-display mt-2 text-2xl leading-snug">{first.title}</h2>
            <p className="font-display mt-3 text-base leading-relaxed text-card-foreground/85">
              {first.page.slice(0, 180)}…
            </p>
          </div>
        )}
        <button
          onClick={onRestart}
          className="mt-8 text-xs text-muted-foreground underline underline-offset-4"
        >
          Start over
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-lg px-6 py-16">
      <p className="text-xs uppercase tracking-[0.25em] text-primary">Last step</p>
      <h1 className="font-display mt-3 text-4xl leading-tight">Keep your shelf.</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        {shelf.picks.length} books curated for you, plus 1.4 million more. Cancel whenever.
      </p>

      <div className="mt-8 space-y-3">
        {(Object.keys(PLANS) as Plan[]).map((key) => {
          const option = PLANS[key];
          const active = plan === key;
          return (
            <button
              key={key}
              onClick={() => setPlan(key)}
              className={`flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left transition ${
                active ? "border-primary bg-primary/10" : "border-border bg-secondary/40"
              }`}
            >
              <span>
                <span className="block text-sm font-medium">{option.label}</span>
                <span className="block text-xs text-muted-foreground">{option.note}</span>
              </span>
              <span className="font-display text-2xl">{option.price}</span>
            </button>
          );
        })}
      </div>

      <button
        onClick={() => {
          setState("processing");
          window.setTimeout(() => setState("done"), 1400);
        }}
        disabled={state === "processing"}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-medium text-primary-foreground transition hover:brightness-110 disabled:opacity-70"
      >
        {state === "processing" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Setting up your shelf…
          </>
        ) : (
          `Start reading — ${PLANS[plan].price}/mo`
        )}
      </button>
      <p className="mt-3 text-center text-[0.7rem] text-muted-foreground">
        Demo checkout — no card needed, nothing is charged.
      </p>
    </div>
  );
}
