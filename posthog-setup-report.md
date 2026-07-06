# PostHog post-wizard report

The wizard has completed a full client-side PostHog integration for your Next.js App Router portfolio. PostHog is initialised via `instrumentation-client.ts` (the recommended approach for Next.js 15.3+), which means it loads on every page without any provider wrapping. A reverse proxy is configured in `next.config.ts` so analytics traffic routes through your own domain, bypassing ad-blockers. Nine interaction events are tracked across five components, covering the full visitor journey from hero landing to contact form submission.

| Event | Description | File |
|---|---|---|
| `hero_cta_clicked` | User clicked the "Get in touch" CTA button in the hero | `components/sections/hero.tsx` |
| `hero_identity_mode_activated` | User hovered or tapped an identity keyword (engineering / teaching) in the hero tagline | `components/sections/hero.tsx` |
| `cv_download_started` | User clicked to download a CV from the dropdown menu | `components/cv-menu.tsx` |
| `cv_download_started` | User clicked to download a CV from the contact section | `components/sections/contact.tsx` |
| `contact_form_submitted` | User submitted the contact form (fires on submit with the chosen topic) | `components/sections/contact.tsx` |
| `contact_message_sent` | Contact server action returned a success state (sent or fallback) | `components/sections/contact.tsx` |
| `contact_email_clicked` | User clicked the email address link in the contact section | `components/sections/contact.tsx` |
| `social_link_clicked` | User clicked a social profile link (GitHub or LinkedIn) | `components/sections/contact.tsx` |
| `nav_item_clicked` | User clicked a navigation item in the floating navbar | `components/ui/tubelight-navbar.tsx` |

## Next steps

We've built a dashboard and five insights to keep an eye on visitor behaviour:

- [Analytics basics (wizard) — Dashboard](https://us.posthog.com/project/499243/dashboard/1803289)
- [Contact form conversion funnel](https://us.posthog.com/project/499243/insights/SKwNpzNg)
- [CV downloads over time](https://us.posthog.com/project/499243/insights/WbDXUgpZ)
- [Hero CTA clicks](https://us.posthog.com/project/499243/insights/RcX5wrVJ)
- [Nav section clicks by section](https://us.posthog.com/project/499243/insights/vtLsACqG)
- [Outbound engagement (social + email links)](https://us.posthog.com/project/499243/insights/60qAdp20)

## Verify before merging

- [ ] Run a full production build (`npm run build`) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` to `.env.example` and any bootstrap scripts so collaborators know what to set.
- [ ] Wire source-map upload (`posthog-cli sourcemap` or your bundler's upload step) into CI so production stack traces de-minify.

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
