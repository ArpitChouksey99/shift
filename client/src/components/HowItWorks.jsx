import { STEPS } from "../data.js";
import { goToContact } from "../utils.js";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-ink py-20 text-white sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="max-w-2xl text-4xl font-extrabold sm:text-5xl">From a blank week to a published rota in three steps.</h2>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">
          Shiftwise is a web app. You plan the week, and your team sees it on their phones.
        </p>

        <ol className="mt-14 grid gap-5 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.title} className="rounded-3xl bg-white/[0.06] p-7 ring-1 ring-white/10">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-sun font-display text-lg font-extrabold text-ink">
                {i + 1}
              </span>
              <h3 className="mt-6 text-2xl font-bold">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-white/70">{s.text}</p>
            </li>
          ))}
        </ol>

        <a
          href="#contact"
          onClick={goToContact}
          className="mt-12 inline-block rounded-full bg-white px-7 py-3.5 font-semibold text-ink transition-colors hover:bg-sun"
        >
          Watch a 15-minute walkthrough
        </a>
      </div>
    </section>
  );
}
