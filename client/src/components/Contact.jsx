import { useState } from "react";
import { CheckCircle2, Mail, Phone, MapPin, Loader2 } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const EMPTY = { name: "", email: "", business: "", teamSize: "", message: "" };

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = "Enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Enter a valid email, like name@shop.com.";
  if (v.business.trim().length < 2) e.business = "Enter your business name.";
  if (!v.teamSize) e.teamSize = "Choose your team size.";
  if (v.message.length > 500) e.message = "Keep the message under 500 characters.";
  return e;
}

export default function Contact() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle");
  const [serverError, setServerError] = useState("");

  const update = (field) => (e) => {
    const next = { ...values, [field]: e.target.value };
    setValues(next);
    if (touched[field]) setErrors(validate(next));
  };

  const blur = (field) => () => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate(values));
  };

  const submit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched({ name: true, email: true, business: true, teamSize: true, message: true });
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(first)?.focus();
      return;
    }

    setStatus("sending");
    setServerError("");
    try {
      if (API_URL) {
        const res = await fetch(`${API_URL}/api/demo-requests`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.message || "The server could not save your request.");
        }
      } else {
        await new Promise((r) => setTimeout(r, 700));
        const saved = JSON.parse(localStorage.getItem("shiftwise-demo-requests") || "[]");
        localStorage.setItem("shiftwise-demo-requests", JSON.stringify([...saved, { ...values, at: Date.now() }]));
      }
      setStatus("success");
    } catch (err) {
      setServerError(err.message || "Something went wrong. Try again in a moment.");
      setStatus("error");
    }
  };

  const reset = () => {
    setValues(EMPTY);
    setErrors({});
    setTouched({});
    setStatus("idle");
  };

  const field = (id) =>
    `mt-1.5 w-full rounded-xl border bg-white px-4 py-3 text-base outline-none transition-colors focus:border-signal focus:ring-4 focus:ring-signal/15 ${
      touched[id] && errors[id] ? "border-coral" : "border-line"
    }`;

  const Error = ({ id }) =>
    touched[id] && errors[id] ? (
      <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-[#d6402d]">
        {errors[id]}
      </p>
    ) : null;

  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <h2 className="text-4xl font-extrabold sm:text-5xl">See it on your own rota.</h2>
          <p className="mt-5 max-w-sm text-lg leading-relaxed text-ink-soft">
            Book a 15-minute demo. We will set up your team and a real week while you watch.
          </p>
          <ul className="mt-10 space-y-5">
            <li className="flex items-center gap-4">
              <Mail className="text-signal" size={20} aria-hidden="true" />
              <a href="mailto:hello@shiftwise.app" className="font-medium hover:text-signal">
                hello@shiftwise.app
              </a>
            </li>
            <li className="flex items-center gap-4">
              <Phone className="text-signal" size={20} aria-hidden="true" />
              <a href="tel:+911234567890" className="font-medium hover:text-signal">
                +91 12345 67890
              </a>
            </li>
            <li className="flex items-center gap-4">
              <MapPin className="text-signal" size={20} aria-hidden="true" />
              <span className="font-medium">Remote-first team, India</span>
            </li>
          </ul>
        </div>

        <div className="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-9">
          {status === "success" ? (
            <div className="py-10 text-center" role="status">
              <CheckCircle2 className="mx-auto text-mint" size={56} aria-hidden="true" />
              <h3 className="mt-5 text-3xl font-bold">Demo request sent</h3>
              <p className="mx-auto mt-3 max-w-sm text-ink-soft">
                Thanks, {values.name.trim().split(" ")[0]}. We will email {values.email.trim()} within one working day
                to pick a time.
              </p>
              <button
                type="button"
                onClick={reset}
                className="mt-8 rounded-full border border-line px-6 py-3 font-semibold transition-colors hover:border-ink"
              >
                Send another request
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="text-sm font-semibold">
                    Your name
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    value={values.name}
                    onChange={update("name")}
                    onBlur={blur("name")}
                    aria-invalid={!!(touched.name && errors.name)}
                    aria-describedby="name-error"
                    className={field("name")}
                  />
                  <Error id="name" />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-semibold">
                    Work email
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={update("email")}
                    onBlur={blur("email")}
                    aria-invalid={!!(touched.email && errors.email)}
                    aria-describedby="email-error"
                    className={field("email")}
                  />
                  <Error id="email" />
                </div>
                <div>
                  <label htmlFor="business" className="text-sm font-semibold">
                    Business name
                  </label>
                  <input
                    id="business"
                    type="text"
                    autoComplete="organization"
                    value={values.business}
                    onChange={update("business")}
                    onBlur={blur("business")}
                    aria-invalid={!!(touched.business && errors.business)}
                    aria-describedby="business-error"
                    className={field("business")}
                  />
                  <Error id="business" />
                </div>
                <div>
                  <label htmlFor="teamSize" className="text-sm font-semibold">
                    Team size
                  </label>
                  <select
                    id="teamSize"
                    value={values.teamSize}
                    onChange={update("teamSize")}
                    onBlur={blur("teamSize")}
                    aria-invalid={!!(touched.teamSize && errors.teamSize)}
                    aria-describedby="teamSize-error"
                    className={field("teamSize")}
                  >
                    <option value="">Choose one</option>
                    <option value="1-8">1 to 8 people</option>
                    <option value="9-30">9 to 30 people</option>
                    <option value="31+">More than 30</option>
                  </select>
                  <Error id="teamSize" />
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="message" className="text-sm font-semibold">
                  Anything we should know? <span className="font-normal text-ink-soft">(optional)</span>
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={values.message}
                  onChange={update("message")}
                  onBlur={blur("message")}
                  aria-invalid={!!(touched.message && errors.message)}
                  aria-describedby="message-error"
                  className={field("message")}
                />
                <Error id="message" />
              </div>

              {status === "error" && (
                <p role="alert" className="mt-5 rounded-xl bg-coral/10 px-4 py-3 text-sm font-medium text-[#d6402d]">
                  {serverError}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-signal px-7 py-4 font-semibold text-white transition-colors hover:bg-signal-dark disabled:opacity-70 sm:w-auto"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="animate-spin" size={18} aria-hidden="true" /> Sending
                  </>
                ) : (
                  "Request demo"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
