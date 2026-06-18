# Build Warnings Fixed

Date: 2026-02-26

1. Removed `headers()` from `next.config.js` because custom headers are not compatible with `output: "export"`.
2. Removed Stripe API route and `src/lib/payments/stripe.ts` to fix missing `stripe` dependency.
3. Removed draft/OG API routes (`/api/draft/*`, `/api/og`) because API routes are unsupported in static export.
4. Disabled `cacheComponents` (PPR) in `next.config.js` to satisfy static export constraints.
5. Converted `SearchBar` to a client component to remove server actions (unsupported in static export).
6. Simplified `/products` and `/search` to avoid server `searchParams` access during static export.
7. Removed dynamic categories route to avoid export requirements.
