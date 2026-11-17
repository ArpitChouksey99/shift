import { useState } from "react";
import { Check } from "lucide-react";
import { PLANS } from "../data.js";
import { formatINR, goToContact } from "../utils.js";

export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  const price = (p) => (yearly ? Math.round(p.monthly * 0.8) : p.monthly);

  return (
    <section id="pricing" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl font-extrabold sm:text-5xl">Simple pricing. Pay per location.</h2>
            <p className="mt-4 max-w-md text-lg text-ink-soft">Start free. Upgrade when your team grows.</p>
          </div>

          <div className="inline-flex rounded-full bg-white p-1 ring-1 ring-line" role="group" aria-label="Billing period">
            {[
              { label: "Monthly", value: false },
              { label: "Yearly (save 20%)", value: true },
            ].map((o) => (
              <button
                key={o.label}
                type="button"
                aria-pressed={yearly === o.value}
                onClick={() => setYearly(o.value)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  yearly === o.value ? "bg-ink text-white" : "text-ink-soft hover:text-ink"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3 lg:items-stretch">
          {PLANS.map((p) => (
            <article
              key={p.name}
              className={`flex flex-col rounded-3xl p-8 ${
                p.featured ? "bg-signal text-white shadow-2xl shadow-signal/30 lg:-my-3" : "bg-white ring-1 ring-line"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">{p.name}</h3>
                {p.featured && (
                  <span className="rounded-full bg-sun px-3 py-1 text-xs font-bold text-ink">Most chosen</span>
                )}
              </div>
              <p className={`mt-2 ${p.featured ? "text-white/80" : "text-ink-soft"}`}>{p.blurb}</p>

              <p className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-5xl font-extrabold">{p.monthly === 0 ? "Free" : formatINR(price(p))}</span>
                {p.monthly > 0 && <span className={p.featured ? "text-white/80" : "text-ink-soft"}>/ month</span>}
              </p>
              <p className={`mt-1 h-5 text-sm ${p.featured ? "text-white/80" : "text-ink-soft"}`}>
                {p.monthly > 0 && yearly ? "Billed yearly" : ""}
              </p>

              <ul className="mt-6 flex-1 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check
                      size={18}
                      className={`mt-0.5 shrink-0 ${p.featured ? "text-sun" : "text-mint"}`}
                      aria-hidden="true"
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                onClick={goToContact}
                className={`mt-8 block rounded-full px-6 py-3.5 text-center font-semibold transition-colors ${
                  p.featured ? "bg-white text-signal hover:bg-sun hover:text-ink" : "bg-ink text-white hover:bg-signal"
                }`}
              >
                {p.cta}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
