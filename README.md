# wasl-teaser

A premium, single-page **pre-GA teaser** for the WASL platform — deliberately separate from
`wasl-web` (the full marketing + docs site) so users hitting this domain see a polished "coming
soon" showcase and join the waitlist, rather than incomplete product pages before General
Availability (Summer 2026).

- **Dark cinematic** single page, positioned around the **AI-governance + MCP wedge**: the hero
  leads with the "one policy plane for every model and agent call" story, then AI Gateway → MCP
  Gateway → Governance, followed by the rest of the plane (API / Event / Worker / Studio), and a
  waitlist CTA.
- **Vanilla** HTML/CSS/JS — no framework, no build dependencies. Mirrors `wasl-web`'s deploy story.
- **On-brand**: WASL brand-sheet palette (Signal Blue → Flow Teal) and brand mark.

## Develop

```bash
npm run dev      # serves src/ at http://localhost:4321
npm run build    # copies src/ → dist/
npm start        # serves the built dist/
```

No `npm install` is required — the dev server and build use only Node built-ins (Node ≥ 18).

## Deploy

Static output in `dist/`. Configs are included for:

- **Netlify** — `netlify.toml` (`publish = "dist"`)
- **Vercel** — `vercel.json` (`outputDirectory: dist`)
- **Cloudflare Pages / any static host** — build command `npm run build`, output `dist`

Point the pre-GA domain (e.g. the apex / `www`) at this project; keep `wasl-web` on a staging
domain until GA, then swap.

## Configuration

`src/config.js` (safe to commit — no secrets):

- `waitlist.endpoint` — the shared waitlist Cloud Run endpoint; signups are tagged
  `source: "wasl-teaser"` so they're distinguishable from the main site.
- `links` — social links rendered in the footer.

## Content / dates

The GA window ("Summer 2026") lives in `src/index.html` (hero badge + final CTA). Update those two
spots when the date firms up.
