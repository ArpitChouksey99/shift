import { ArrowDown } from "lucide-react";
import RotaDemo from "./RotaDemo.jsx";
import { goToContact } from "../utils.js";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pb-24">
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-signal/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div>
          <p className="inline-block rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-ink-soft ring-1 ring-line">
            Rotas for cafés and small shops
          </p>
          <h1 className="mt-6 text-5xl font-extrabold leading-[1.02] sm:text-6xl lg:text-[4.4rem]">
            Your weekly rota, done before the coffee cools.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
            Shiftwise plans the week for you and shows what it will cost as you go. No spreadsheets, no group-chat
            haggling.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              onClick={goToContact}
              className="rounded-full bg-signal px-7 py-3.5 font-semibold text-white shadow-lg shadow-signal/25 transition-colors hover:bg-signal-dark"
            >
              Book a free demo
            </a>
            <a
              href="#features"
              className="inline-flex items-center gap-2 rounded-full px-5 py-3.5 font-semibold transition-colors hover:bg-white"
            >
              See what it does <ArrowDown size={16} aria-hidden="true" />
            </a>
          </div>
          <p className="mt-6 text-sm text-ink-soft">Free for teams up to 8. No card needed.</p>
        </div>

        <RotaDemo />
      </div>
    </section>
  );
}
