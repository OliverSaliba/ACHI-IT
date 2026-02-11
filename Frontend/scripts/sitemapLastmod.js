// Frontend/scripts/sitemapLastmod.js

const DEFAULT_LASTMOD = "2026-01-29"

const ROUTE_LASTMOD = {
  "/": "2026-01-29",
  "/services": "2026-01-29",
  "/projects": "2026-01-29",
  "/blog": "2026-01-29",

  "/about": "2026-01-29",
  "/contact": "2026-01-29",
  "/careers": "2026-01-29",
  "/gallery": "2026-01-29",
  "/clients": "2026-01-29",
  "/sectors": "2026-01-29",
  "/products": "2026-01-29",
}

const BLOG_LASTMOD = {
  "/blog-post-1": "2026-01-10",
  "/blog-post-2": "2026-01-18",
  "/blog-post-3": "2026-01-29",
}

const SERVICE_LASTMOD = {
  "facade-scaffolding": "2026-01-29",
  "suspended-scaffolding": "2026-01-29",
  "propping-shoring": "2026-01-29",
  "adjustable-props": "2026-01-29",
  "high-capacity-structures": "2026-01-29",
  "event-scaffolding": "2026-01-29",
}

function isValidISODate(s) {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(s || ""))
}

function pickLastmodForRoute(route) {
  const r = String(route || "")

  if (BLOG_LASTMOD[r] && isValidISODate(BLOG_LASTMOD[r])) return BLOG_LASTMOD[r]

  if (r.startsWith("/services/")) {
    const slug = r.replace("/services/", "")
    if (SERVICE_LASTMOD[slug] && isValidISODate(SERVICE_LASTMOD[slug])) return SERVICE_LASTMOD[slug]
  }

  if (ROUTE_LASTMOD[r] && isValidISODate(ROUTE_LASTMOD[r])) return ROUTE_LASTMOD[r]

  return DEFAULT_LASTMOD
}

module.exports = {
  DEFAULT_LASTMOD,
  ROUTE_LASTMOD,
  BLOG_LASTMOD,
  SERVICE_LASTMOD,
  pickLastmodForRoute,
}
