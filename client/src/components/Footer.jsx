import Logo from "./Logo.jsx";
import { NAV_LINKS } from "../data.js";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 md:flex-row md:items-start md:justify-between">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs text-sm text-ink-soft">Staff rotas for cafés and small shops.</p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-sm font-medium text-ink-soft hover:text-ink">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-line py-5 text-center text-sm text-ink-soft">
        © {new Date().getFullYear()} Shiftwise. A demo product built for a front-end assignment.
      </div>
    </footer>
  );
}
