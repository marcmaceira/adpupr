// VERCEL_PROJECT_PRODUCTION_URL is injected automatically by Vercel (no protocol).
// NEXT_PUBLIC_SITE_URL can be set manually in .env.local for local development.
// Canonicals use the production domain; Payload's own URLs must use the actual
// deployment origin so preview admin sessions never redirect into production.
export const serverUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://www.adpupr.com");

export const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.adpupr.com");
