# Shiftwise: SaaS landing page

A responsive landing page for **Shiftwise**, an invented rota-scheduling SaaS for cafés and small shops. Built for the Sankar Group front-end internship assignment.

The hero is a working rota: pick a team member, tap shifts to assign them, and watch the weekly labour cost and budget meter update. Auto-fill assigns the gaps.

## Tech stack

- **Frontend:** React 19, Vite, Tailwind CSS v4, lucide-react icons
- **Backend (optional):** Node.js, Express, MongoDB (Mongoose). It only stores demo requests from the contact form.

## Sections

Navbar, Hero (interactive rota), Features, How it works, Pricing (monthly/yearly toggle), FAQ, Contact / demo request form, Footer.

## Run locally

Requires Node 18+.

### Frontend only (enough for the assignment)

```bash
cd client
npm install
npm run dev        # http://localhost:5173
```

With no backend configured, the demo form validates, shows a success message and saves the request in the browser's localStorage.

### With the backend (MERN)

```bash
# 1. API
cd server
npm install
cp .env.example .env     # set MONGODB_URI (local MongoDB or Atlas)
npm run dev              # http://localhost:5000

# 2. Client (second terminal)
cd client
npm install
npm run dev
```

In development, Vite proxies `/api` to `localhost:5000`. To make the client talk to a deployed API, set `VITE_API_URL` in `client/.env` (see `.env.example`).

## Build and deploy

```bash
cd client && npm run build   # output in client/dist
```

- **Frontend:** deploy the `client` folder on Vercel or Netlify (build command `npm run build`, output `dist`).
- **API (optional):** deploy `server` on Render or Railway. Set `MONGODB_URI` and `CLIENT_ORIGIN`, then set `VITE_API_URL` on the frontend host.

## API

`POST /api/demo-requests` with JSON `{ name, email, business, teamSize, message? }` returns `201` on success or `400` with a `message` on invalid input. `GET /api/health` reports server and database status.

## Project structure

```
client/src/
  components/   Navbar, Hero, RotaDemo, Features, HowItWorks, Pricing, FAQ, Contact, Footer
  data.js       Copy and plan data
  utils.js      Scroll-to-form helper, currency formatter
server/
  index.js      Express app and routes
  models/       Mongoose schema
screenshots/    Desktop and mobile captures
```

## Design notes (for the submission)

1. I chose a rota tool for cafés so the hero could be a working demo instead of a stock illustration. Visitors understand the product by using it.
2. The palette is cool paper, deep ink and one signal blue, with mint, sun and coral reserved for staff colours so the colour carries meaning.
3. Bricolage Grotesque for headlines and Instrument Sans for body text give the page a distinct voice while staying readable.
4. Layout stays left-aligned with generous spacing. The features section uses a list instead of identical cards, and numbers appear only on the three-step process, where order matters.
5. The form validates on blur and on submit, moves focus to the first error, and shows a success state. Fields use labels and `aria-invalid`.
6. Challenge solved: keeping a 7-column rota grid tappable at 390px wide. It scales with `aspect-square` cells and shorter row labels, and the page has no horizontal scroll.
7. The form works without a backend (localStorage fallback) so the site can be deployed as a static page, while the Express + MongoDB API is ready when needed.
