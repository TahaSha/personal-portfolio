# Taha Shalaby — Personal Portfolio Website (Next.js + shadcn + taste-skill)

## Context

Taha runs two careers in parallel — **Full-Stack AI Engineer** (Snappers AI cybersecurity, ex-Tech Lead at Singularity Finance, co-founder/CTO of laccuna) and **Mathematics & Computing Educator** (7+ years Cambridge curriculum, currently Wycombe Abbey Cairo East). The goal is a standout portfolio that presents both identities so compellingly that visitors want to contact him or download his CV.

**Decisions confirmed with Taha:**

- **Concept:** Split hero, unified story — one cohesive site, an interactive "Engineer / Educator" split identity in the hero, two accent colors threading through a single scrolling narrative.
- **Vibe:** Light editorial / premium print — magazine-quality typography, warm and human. Deliberately stands apart from typical dark dev portfolios.
- **Contact:** Real contact form + prominent email ([tahashalaby93@gmail.com](mailto:tahashalaby93@gmail.com)), GitHub (TahaSha), LinkedIn (tahashalaby). Both CVs downloadable. No public phone number.
- **Photo:** Yes — Taha will provide a headshot (build with a styled placeholder slot until then).
- **Deliverable also includes** a complete walkthrough MD file documenting the build.

Working directory is empty: `/Users/tahashalaby/Documents/personal-projects/personal-portfolio` (not yet a git repo).

## Tech Stack

| Layer             | Choice                                                                                                                                                                                               |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework         | Next.js latest (App Router, TypeScript, Tailwind v4) via `npx create-next-app@latest .`                                                                                                              |
| UI kit            | shadcn/ui latest via `npx shadcn@latest init`                                                                                                                                                        |
| Design guidance   | **taste-skill**: `npx skills add Leonxlnx/taste-skill` — installed into the project, then actively followed (its dials: design variance, motion intensity, visual density) for every visual decision |
| Animation         | `motion` (framer-motion) + ReactBits components (installable via shadcn registry URLs, e.g. SplitText/BlurText/ScrollReveal text animations)                                                         |
| Component sources | 21st.dev (shadcn-compatible registry — `npx shadcn add <url>`) and reactbits.dev; adapt anything pulled to our tokens rather than pasting verbatim                                                   |
| Fonts             | next/font — serif display (e.g. Fraunces) + grotesk body (e.g. Geist/Inter) + mono accents for the engineering identity                                                                              |
| Contact form      | Next.js server action + Resend (free tier). Env-gated: without `RESEND_API_KEY` the form gracefully falls back to a mailto flow, so the site works day one                                           |

## Design Direction (taste-skill applied)

- **Paper & ink:** warm off-white background, near-black ink text, generous whitespace, visible grid — premium print feel.
- **Dual accent system:** one accent for the engineer identity (e.g. deep electric blue/ink), one for the educator (e.g. warm terracotta/amber). Used in section markers, timeline nodes, tags, link underlines — the two threads visually weave through one story.
- **Typography as the hero:** oversized serif headlines, editorial pull-quotes, small-caps labels, mono for tech metadata (stack tags, dates).
- **Motion:** restrained and high-craft — split-text hero reveal, scroll-triggered fades/parallax, magnetic CTA buttons. `prefers-reduced-motion` respected.
- **Fully responsive:** designed mobile-first; verified at 375 / 768 / 1280+.

## Site Structure (single page + assets)

1. **Nav** — sticky minimal bar: monogram, section links, "Get CV" (dropdown: AI Engineer CV / Teaching CV), Contact CTA.
2. **Hero** — the signature piece. Huge serif name, headshot, interactive split headline "AI Engineer ⁄ Educator" (hover/tap shifts emphasis between the two identities with color + copy swap). Stat strip: 6+ yrs shipping AI · 7+ yrs teaching · 12+ Fortune-500 ML projects · 2M+ predictions/mo.
3. **About** — short editorial narrative connecting the careers ("I ship production AI by day and teach the next generation how it works").
4. **Engineering** — experience (Snappers SOC/agentic-LLM work, Singularity Finance FTSO oracle infra, laccuna CTO) + Select Projects grid: AI-Powered SOC Dashboard, BERT relevance classifier (82% F1, 100→15 analysts), distributed forecasting (Ray), churn model (−15% churn), K8s MLOps workflow engine. Mono tech tags.
5. **Teaching** — Wycombe Abbey Cairo East (current), Kompass, New Capital English School, Futures British School; Cambridge Checkpoint/IGCSE + IPC Level 1 credentials; robotics club founding; the automated gradebook systems (a bridge story between careers).
6. **Dual timeline** — interleaved 2014→present chronology showing both careers running in parallel; each node colored by its accent. The concept-proof section.
7. **Skills** — grouped: AI/ML, Full-Stack, Cloud/DevOps, Curriculum & Pedagogy, EdTech.
8. **Contact** — form (name/email/message, "I'm reaching out about: [Engineering role / Teaching role / Other]" selector), email, GitHub, LinkedIn, both CV download buttons.
9. **Footer** — monogram, socials, "Built with Next.js" nod.

## File Plan

- `lib/data/resume.ts` — ALL CV content as typed data (single source of truth; sections render from it)
- `app/layout.tsx` — fonts, full SEO metadata, OG tags; `app/page.tsx` — composes sections
- `components/sections/` — `nav.tsx`, `hero.tsx`, `about.tsx`, `engineering.tsx`, `teaching.tsx`, `timeline.tsx`, `skills.tsx`, `contact.tsx`, `footer.tsx`
- `components/ui/` — shadcn + adapted ReactBits/21st.dev components
- `app/actions/contact.ts` — server action (Resend, env-gated)
- `public/cv/` — both PDFs copied from `~/Downloads`
- `public/images/` — headshot slot (styled placeholder until provided)
- `docs/WALKTHROUGH.md` — **the complete walkthrough MD** Taha asked for: stack, setup commands, design system rationale, component sources used, how to add content, deploy steps
- `.env.example` — `RESEND_API_KEY`, `CONTACT_TO_EMAIL`

## Implementation Steps

1. **Scaffold:** `create-next-app` in current dir (TS, Tailwind, App Router — auto `git init`), `shadcn init`, install `motion`, install taste-skill via `npx skills add Leonxlnx/taste-skill`. Commit baseline.
2. **Content layer:** transcribe both CVs into `lib/data/resume.ts`; copy PDFs into `public/cv/`.
3. **Design tokens:** fonts via next/font, dual-accent palette, spacing/type scale in Tailwind theme — per taste-skill guidance.
4. **Build sections top-down** (nav → hero → … → footer), pulling/adapting ReactBits + 21st.dev pieces where they beat hand-rolling (hero text animation, timeline, marquee, form styling).
5. **Contact form:** server action + Resend with mailto fallback; honeypot spam field.
6. **Polish pass:** responsive at 375/768/1280+, motion timing, `prefers-reduced-motion`, a11y (landmarks, contrast, focus states, alt text).
7. **SEO:** metadata, OpenGraph image, favicon monogram, sitemap/robots.
8. **Write `docs/WALKTHROUGH.md`** documenting everything.
9. **Verify** (below), final commit.

## Verification

- `npm run build` passes clean (types + lint).
- Run dev server via the preview tools; check every section renders with real CV data.
- `preview_resize` at mobile (375), tablet (768), desktop (1280): no overflow, nav/hero/timeline usable at all sizes.
- Console clean of errors; contact form: with no API key shows mailto fallback, with key sends via Resend (submission smoke-test).
- Both CV download links serve the PDFs.
- Reduced-motion emulation still leaves content readable.

## Needs from Taha (non-blocking, site ships without them)

- Headshot photo → drop into `public/images/`
- Resend API key → `.env.local` (form works as mailto until then)
- Later: domain + Vercel deploy (walkthrough will include the steps)
