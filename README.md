# Taha Shalaby, personal portfolio

Full-Stack AI Engineer and Cambridge Mathematics & Computing Educator. One site, two careers, one story.

Built with Next.js 16, Tailwind v4, shadcn/ui, and `motion`, styled as light editorial print with a dual-accent identity system (cobalt = engineering, terracotta = teaching).

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

## Documentation

**[docs/WALKTHROUGH.md](docs/WALKTHROUGH.md)** is the complete guide: the design concept, editing content, adding your portrait, wiring up the contact form (Resend), deploying to Vercel, and extending the site.

The original build plan is in [docs/PLAN.md](docs/PLAN.md).

## The short version

- All content lives in [lib/data/resume.ts](lib/data/resume.ts)
- Your portrait goes in `public/images/portrait.jpg` (auto-detected)
- CV PDFs live in `public/cv/`
- Contact form works without config (mailto fallback); add `RESEND_API_KEY` in `.env.local` for real delivery
