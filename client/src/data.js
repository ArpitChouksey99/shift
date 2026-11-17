export const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export const FEATURES = [
  {
    icon: "CalendarCheck",
    title: "Fill a week in one pass",
    text: "Pick a person, tap the shifts they cover. Auto-fill assigns the gaps by availability and keeps everyone under their weekly hours.",
  },
  {
    icon: "IndianRupee",
    title: "See labour cost as you plan",
    text: "Every change updates the week's wage bill against your budget, so you spot an overspend before the rota goes out.",
  },
  {
    icon: "Repeat",
    title: "Swaps without the group chat",
    text: "Staff request a swap in the app. You approve it with one tap, and the rota updates for everyone.",
  },
  {
    icon: "BellRing",
    title: "Reminders that get read",
    text: "Each person gets a message the evening before a shift and a nudge if they have not confirmed.",
  },
  {
    icon: "PlaneTakeoff",
    title: "Leave and availability in one place",
    text: "Staff mark days they cannot work. Shiftwise stops you from scheduling them on those days.",
  },
  {
    icon: "FileDown",
    title: "Payroll-ready hours",
    text: "Export worked hours per person as a spreadsheet when the month ends. No retyping from a notebook.",
  },
];

export const STEPS = [
  {
    title: "Add your team",
    text: "Enter names, hourly rates and the days each person can work. It takes about five minutes for a team of ten.",
  },
  {
    title: "Plan the week",
    text: "Assign shifts by hand or let auto-fill suggest a rota. Cost and uncovered shifts update as you go.",
  },
  {
    title: "Publish and relax",
    text: "Your team sees their shifts on their phone and gets reminders. Swap requests come to you for approval.",
  },
];

export const PLANS = [
  {
    name: "Starter",
    monthly: 0,
    blurb: "For a single counter with a small crew.",
    features: ["1 location", "Up to 8 staff", "Weekly rota builder", "Labour cost meter"],
    cta: "Start free",
  },
  {
    name: "Team",
    monthly: 799,
    blurb: "For busy shops that change the rota every week.",
    features: [
      "1 location",
      "Up to 30 staff",
      "Auto-fill and swap requests",
      "Shift reminders",
      "Payroll hours export",
    ],
    cta: "Book a demo",
    featured: true,
  },
  {
    name: "Multi-site",
    monthly: 2499,
    blurb: "For owners running several outlets.",
    features: [
      "Up to 5 locations",
      "Unlimited staff",
      "Everything in Team",
      "Cross-location cover",
      "Priority support",
    ],
    cta: "Talk to us",
  },
];

export const FAQS = [
  {
    q: "Do my staff need to install anything?",
    a: "No. They open a link on their phone to see shifts, request swaps and mark days off. Nothing to download.",
  },
  {
    q: "Can I try it before paying?",
    a: "Yes. The Starter plan is free for up to 8 people, and you can upgrade whenever you outgrow it.",
  },
  {
    q: "How does auto-fill decide who works?",
    a: "It respects each person's availability and weekly hour limit, spreads shifts evenly, then shows you the result so you can change anything.",
  },
  {
    q: "Is there a contract?",
    a: "No. Plans renew monthly or yearly and you can cancel from your account page at any time.",
  },
];
