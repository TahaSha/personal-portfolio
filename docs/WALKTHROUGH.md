# Portfolio Walkthrough

A complete guide to how this site is built, how to change it, and how to ship it.

## 1. The concept

You have two parallel careers, so the site is built around a **split identity with a unified story**:

- The hero is an interactive split headline: "AI engineer. / Educator." Hovering (or tapping) either line shifts the emphasis, swaps the supporting copy, and underlines the line in that identity's color.
- Two accent colors thread through the entire page: **cobalt** for engineering, **terracotta** for teaching. You see them in section markers, list markers, the dual-track timeline nodes, the skills column underlines, and the CV download buttons.
- The signature section is the **dual timeline**: both careers rendered on one spine since 2014, engineering entries on the left, teaching on the right. It proves the "two tracks, one decade" story at a glance.

The visual language is **light editorial / premium print**: paper background, ink text, a display serif for headlines, hairline borders instead of cards, sharp corners everywhere (radius 0), and restrained scroll-reveal motion.

## 2. Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript, Turbopack) |
| Styling | Tailwind CSS v4 with CSS variable tokens |
| Components | shadcn/ui (button, input, textarea, label, dropdown-menu, badge) |
| Animation | `motion` (Framer Motion successor), imported from `motion/react` |
| Fonts | `next/font`: Cormorant Garamond (display), Geist (body), Geist Mono (metadata) |
| Email | Resend via a Next.js server action, with a mailto fallback |
| Design guidance | taste-skill (`.agents/skills/`), see section 7 |

## 3. Project structure

```
app/
  layout.tsx            Fonts, metadata, OpenGraph config
  page.tsx              Composes all sections, JSON-LD, portrait detection
  globals.css           Design tokens (palette, radius, fonts)
  actions/contact.ts    Contact form server action (Resend + mailto fallback)
  opengraph-image.tsx   Generated social share image
  icon.svg              Favicon (TS monogram)
  sitemap.ts, robots.ts SEO routes
components/
  sections/             nav, hero, stats, about, engineering, teaching,
                        timeline, skills, contact, footer
  reveal.tsx            Scroll-reveal wrapper (respects reduced motion)
  cv-menu.tsx           "Download CV" dropdown
  ui/                   shadcn components
lib/data/resume.ts      ALL site content, typed. Edit this to update the site.
public/cv/              Both CV PDFs
public/images/          Portrait goes here (see section 6)
```

## 4. Editing content

**Everything you read on the page lives in [lib/data/resume.ts](../lib/data/resume.ts).** Roles, projects, timeline entries, skills, stats, about paragraphs, links. The section components just render that data, so updating your experience never means touching layout code.

To update your CVs: replace the PDFs in `public/cv/` (keep the same filenames, or update `profile.cvs` in `resume.ts`).

Copy rules the site follows (from the taste-skill): no em-dashes anywhere, headlines under 8 words, sub-paragraphs under about 25 words, no filler verbs ("elevate", "seamless"), real numbers only.

## 5. Design system

Tokens are defined in [app/globals.css](../app/globals.css):

- `--paper` near-white background, `--ink` off-black text (deliberately not cream/espresso)
- `--eng` cobalt (engineer identity), `--teach` terracotta (educator identity), used via Tailwind classes `text-eng`, `bg-teach`, `border-eng/50`, etc.
- `--radius: 0rem` gives the print-like sharp corner system globally
- Display font utility: `font-display` (Cormorant Garamond)

Motion rules: entry animations use `motion/react` with `whileInView` and `once: true`; the timeline spine is scroll-linked via `useScroll`. Everything collapses to static under `prefers-reduced-motion`. Never animate anything but `transform` and `opacity`.

## 6. Add your portrait

Drop a photo at `public/images/portrait.jpg` (or `.jpeg` / `.png` / `.webp`). The hero detects it automatically and replaces the monogram placeholder. Use a portrait-orientation photo, roughly 4:5, at least 900px wide.

Also replace the teaching section placeholder: [components/sections/teaching.tsx](../components/sections/teaching.tsx) currently uses a `picsum.photos` placeholder image. Swap the `src` for a real photo of you teaching, your classroom, or the robotics club, placed in `public/images/`.

## 7. The taste-skill

Installed with `npx skills add Leonxlnx/taste-skill` into `.agents/skills/` (symlinked into `.claude/skills/` for Claude Code). It is an "anti-slop" design skill that AI coding agents read before touching the UI.

This project was built with its dials set to `DESIGN_VARIANCE: 7, MOTION_INTENSITY: 6, VISUAL_DENSITY: 3` and honors its hard rules: zero em-dashes, max one eyebrow label per three sections, no stat strip inside the hero, varied layout families per section, one label per CTA intent, WCAG AA contrast, `min-h-[100dvh]` instead of `h-screen`, no banned serif fonts (Cormorant Garamond is from its approved pool).

When asking an AI agent to restyle or extend the site, tell it to read `.agents/skills/design-taste-frontend/SKILL.md` first so new sections stay consistent.

## 8. Contact form setup (Resend)

The form works out of the box with **no configuration**: without an API key, submissions open the visitor's email app with a pre-filled draft (their message, topic, name, and reply address included).

To get real email delivery:

1. Create a free account at [resend.com](https://resend.com) (3,000 emails/month free).
2. Create an API key.
3. Copy `.env.example` to `.env.local` and set `RESEND_API_KEY`.
4. Optional: verify your own domain in Resend and set `CONTACT_FROM_EMAIL` to something like `Portfolio <hello@your-domain.com>`. Until then the default `onboarding@resend.dev` sender works for testing.

Spam protection: a hidden honeypot field silently drops bot submissions.

## 9. Run it locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build + type check
```

## 10. Deploy (Vercel)

1. Push the repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new). Zero config needed.
3. Add environment variables in the Vercel project settings: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, and `NEXT_PUBLIC_SITE_URL` (your live URL, used by OpenGraph and the sitemap).
4. Add a custom domain in Vercel when ready, then update `NEXT_PUBLIC_SITE_URL` and redeploy.

## 11. SEO already in place

- Full metadata + OpenGraph + Twitter card in `app/layout.tsx`
- Generated share image at `/opengraph-image` (paper and ink, in the site's serif)
- `Person` JSON-LD structured data on the home page
- `sitemap.xml`, `robots.txt`, and a TS monogram favicon

## 12. Extending with 21st.dev and ReactBits

Both are shadcn-compatible component registries, useful when you want a new section:

- **21st.dev**: browse [21st.dev](https://21st.dev), open a component, copy its install command (`npx shadcn@latest add "https://21st.dev/r/..."`). It lands in `components/ui/` where you restyle it with this project's tokens.
- **ReactBits**: browse [reactbits.dev](https://www.reactbits.dev), each component page shows install commands (shadcn registry URL or jsrepo). Prefer the TS + Tailwind variant.

House rule: anything installed gets adapted to the paper/ink/dual-accent tokens and radius-0 system before it ships. Never leave a component in its default look.

## 13. Verification checklist

Before shipping a change:

- `npm run build` passes (types + lint)
- Page renders at 375px, 768px, and 1280px with no horizontal overflow
- Both CV downloads work
- Contact form: submits with a topic chip selected, shows the sent/fallback state
- No `—` characters anywhere in visible copy
- Check both the page and `/opengraph-image` after content changes
