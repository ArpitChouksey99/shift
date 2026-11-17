import { useEffect, useMemo, useState } from "react";
import { Wand2, Eraser } from "lucide-react";
import { formatINR } from "../utils.js";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const SHIFTS = [
  { name: "Open", time: "7–1" },
  { name: "Mid", time: "11–5" },
  { name: "Close", time: "3–9" },
];
const SHIFT_HOURS = 6;
const BUDGET = 20000;
const MAX_SHIFTS_PER_PERSON = 5;

const STAFF = [
  { id: "A", name: "Asha", rate: 180, cell: "bg-signal text-white", dot: "bg-signal" },
  { id: "R", name: "Ravi", rate: 160, cell: "bg-mint text-ink", dot: "bg-mint" },
  { id: "M", name: "Meera", rate: 210, cell: "bg-sun text-ink", dot: "bg-sun" },
  { id: "D", name: "Dev", rate: 150, cell: "bg-coral text-white", dot: "bg-coral" },
];
const byId = Object.fromEntries(STAFF.map((s) => [s.id, s]));

const INITIAL = [
  ["A", "A", "R", "A", "A", "D", null],
  ["R", "M", "M", "R", null, "M", "R"],
  ["D", "D", null, "M", "D", "A", "M"],
];

export default function RotaDemo() {
  const [grid, setGrid] = useState(INITIAL);
  const [selected, setSelected] = useState("A");
  const [intro, setIntro] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIntro(false), 1600);
    return () => clearTimeout(t);
  }, []);

  const stats = useMemo(() => {
    const counts = Object.fromEntries(STAFF.map((s) => [s.id, 0]));
    let cost = 0;
    let empty = 0;
    grid.forEach((row) =>
      row.forEach((id) => {
        if (!id) empty += 1;
        else {
          counts[id] += 1;
          cost += byId[id].rate * SHIFT_HOURS;
        }
      })
    );
    return { counts, cost, empty };
  }, [grid]);

  const over = stats.cost - BUDGET;
  const pct = Math.min(100, (stats.cost / BUDGET) * 100);

  const toggle = (r, c) => {
    setIntro(false);
    setGrid((g) =>
      g.map((row, ri) =>
        ri !== r ? row : row.map((v, ci) => (ci !== c ? v : v === selected ? null : selected))
      )
    );
  };

  const autoFill = () => {
    setIntro(false);
    setGrid((g) => {
      const next = g.map((row) => [...row]);
      const counts = Object.fromEntries(STAFF.map((s) => [s.id, 0]));
      next.forEach((row) => row.forEach((id) => id && (counts[id] += 1)));
      for (let c = 0; c < 7; c++) {
        for (let r = 0; r < 3; r++) {
          if (next[r][c]) continue;
          const workingToday = new Set(next.map((row) => row[c]).filter(Boolean));
          const pick = STAFF.filter(
            (s) => !workingToday.has(s.id) && counts[s.id] < MAX_SHIFTS_PER_PERSON
          ).sort((a, b) => counts[a.id] - counts[b.id] || a.rate - b.rate)[0];
          if (pick) {
            next[r][c] = pick.id;
            counts[pick.id] += 1;
          }
        }
      }
      return next;
    });
  };

  const clear = () => {
    setIntro(false);
    setGrid(INITIAL.map((row) => row.map(() => null)));
  };

  return (
    <div className="rounded-3xl border border-line bg-white p-4 shadow-[0_30px_60px_-30px_rgba(15,22,41,0.25)] sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-display text-lg font-bold">Week of 17 Nov</p>
          <p className="text-sm text-ink-soft">Choose a person, then tap shifts to assign them.</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={autoFill}
            className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-signal"
          >
            <Wand2 size={15} aria-hidden="true" /> Auto-fill
          </button>
          <button
            type="button"
            onClick={clear}
            className="inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-2 text-sm font-semibold transition-colors hover:border-ink"
          >
            <Eraser size={15} aria-hidden="true" /> Clear
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Choose a team member">
        {STAFF.map((s) => (
          <button
            key={s.id}
            type="button"
            aria-pressed={selected === s.id}
            onClick={() => setSelected(s.id)}
            className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-all ${
              selected === s.id ? "border-ink bg-ink text-white" : "border-line bg-white hover:border-ink"
            }`}
          >
            <span className={`h-2.5 w-2.5 rounded-full ${s.dot}`} aria-hidden="true" />
            {s.name}
            <span className={`text-xs ${selected === s.id ? "text-white/70" : "text-ink-soft"}`}>
              {stats.counts[s.id]} shifts
            </span>
          </button>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-[2.6rem_repeat(7,minmax(0,1fr))] gap-1.5 sm:grid-cols-[4.2rem_repeat(7,minmax(0,1fr))] sm:gap-2">
        <span />
        {DAYS.map((d) => (
          <span key={d} className="pb-1 text-center text-[11px] font-semibold text-ink-soft sm:text-xs">
            {d}
          </span>
        ))}
        {SHIFTS.map((shift, r) => (
          <FragmentRow key={shift.name}>
            <span className="flex flex-col justify-center text-[11px] font-semibold leading-tight sm:text-xs">
              {shift.name}
              <span className="hidden font-normal text-ink-soft sm:block">{shift.time}</span>
            </span>
            {DAYS.map((day, c) => {
              const id = grid[r][c];
              const person = id ? byId[id] : null;
              return (
                <button
                  key={`${r}-${c}-${id ?? "empty"}`}
                  type="button"
                  onClick={() => toggle(r, c)}
                  aria-label={`${day} ${shift.name} shift: ${person ? person.name : "unassigned"}`}
                  style={intro ? { animationDelay: `${(c * 3 + r) * 28}ms` } : undefined}
                  className={`aspect-square rounded-lg text-sm font-bold transition-transform hover:scale-105 sm:rounded-xl ${
                    intro ? "cell-in" : "pop"
                  } ${person ? person.cell : "border-2 border-dashed border-line text-transparent hover:border-signal"}`}
                >
                  {person ? person.id : "+"}
                </button>
              );
            })}
          </FragmentRow>
        ))}
      </div>

      <div className="mt-6 rounded-2xl bg-paper p-4" aria-live="polite">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-medium text-ink-soft">Labour cost this week</p>
            <p className="font-display text-3xl font-extrabold">{formatINR(stats.cost)}</p>
          </div>
          <div className="text-right text-sm">
            <p className={`font-semibold ${over > 0 ? "text-coral" : "text-[#0b8a70]"}`}>
              {over > 0 ? `${formatINR(over)} over budget` : `${formatINR(-over)} under budget`}
            </p>
            <p className="text-ink-soft">Budget {formatINR(BUDGET)}</p>
          </div>
        </div>
        <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-line">
          <div
            className={`h-full rounded-full transition-all duration-500 ${over > 0 ? "bg-coral" : "bg-signal"}`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="mt-3 text-sm text-ink-soft">
          {stats.empty === 0
            ? "Every shift is covered."
            : `${stats.empty} ${stats.empty === 1 ? "shift needs" : "shifts need"} cover.`}
        </p>
      </div>
    </div>
  );
}

function FragmentRow({ children }) {
  return <>{children}</>;
}
