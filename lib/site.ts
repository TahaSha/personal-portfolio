// VERCEL_PROJECT_PRODUCTION_URL is set automatically on Vercel (domain only, no protocol),
// so sitemap/robots/OG URLs stay correct even before NEXT_PUBLIC_SITE_URL is configured.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
