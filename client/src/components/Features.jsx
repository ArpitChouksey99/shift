import { CalendarCheck, IndianRupee, Repeat, BellRing, PlaneTakeoff, FileDown } from "lucide-react";
import { FEATURES } from "../data.js";

const ICONS = { CalendarCheck, IndianRupee, Repeat, BellRing, PlaneTakeoff, FileDown };

export default function Features() {
  return (
    <section id="features" className="bg-white py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="text-4xl font-extrabold sm:text-5xl">Everything a rota needs, nothing it does not.</h2>
          <p className="mt-5 max-w-sm text-lg leading-relaxed text-ink-soft">
            Built with café owners who were tired of rebuilding the same spreadsheet every Sunday night.
          </p>
        </div>

        <ul className="divide-y divide-line border-y border-line">
          {FEATURES.map((f) => {
            const Icon = ICONS[f.icon];
            return (
              <li key={f.title} className="group flex gap-5 py-7">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-paper text-signal transition-colors group-hover:bg-signal group-hover:text-white">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-xl font-bold">{f.title}</h3>
                  <p className="mt-1.5 max-w-lg leading-relaxed text-ink-soft">{f.text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
