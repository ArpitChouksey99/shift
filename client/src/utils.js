export function goToContact(e) {
  if (e) e.preventDefault();
  const section = document.getElementById("contact");
  if (!section) return;
  section.scrollIntoView({ behavior: "smooth" });
  window.history.replaceState(null, "", "#contact");
  setTimeout(() => document.getElementById("name")?.focus({ preventScroll: true }), 600);
}

export const formatINR = (n) => "₹" + Math.round(n).toLocaleString("en-IN");
