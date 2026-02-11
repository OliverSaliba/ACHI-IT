// Frontend/scripts/generateSitemap.js
const fs = require("fs")
const path = require("path")
const { pickLastmodForRoute } = require("./sitemapLastmod")

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

function joinUrl(origin, p) {
  const cleanOrigin = String(origin || "").replace(/\/+$/, "")
  const cleanPath = String(p || "").startsWith("/") ? p : `/${p}`
  return `${cleanOrigin}${cleanPath}`
}

function formatDateISO(d) {
  const yyyy = d.getUTCFullYear()
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0")
  const dd = String(d.getUTCDate()).padStart(2, "0")
  return `${yyyy}-${mm}-${dd}`
}

function isValidISODate(s) {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(s || ""))
}

function safeLastmodForRoute(route) {
  try {
    const v = pickLastmodForRoute(route)
    if (isValidISODate(v)) return v
  } catch (e) {
    // ignore
  }
  return "2026-01-29"
}


function getMetaForRoute(route) {
  const r = String(route || "")

  if (r === "/") return { changefreq: "weekly", priority: "1.0" }

  if (r === "/blog") return { changefreq: "monthly", priority: "0.8" }
  if (/^\/blog-post-\d+$/i.test(r)) return { changefreq: "monthly", priority: "0.7" }

  if (r === "/services") return { changefreq: "monthly", priority: "0.9" }
  if (r.startsWith("/services/")) return { changefreq: "monthly", priority: "0.9" }

  if (r === "/projects") return { changefreq: "monthly", priority: "0.8" }
  if (r.startsWith("/project/")) return { changefreq: "monthly", priority: "0.8" }

  if (r === "/products") return { changefreq: "monthly", priority: "0.7" }

  return { changefreq: "monthly", priority: "0.7" }
}

// Tiny parser to extract routes WITHOUT importing ESM.
// We keep this robust by generating the routes here instead (safe + deterministic).
function getRoutesAndConfig() {
  const SITE_ORIGIN = "https://achiscaffolding.com"

  const STATIC_ROUTES = [
    "/",
    "/about",
    "/services",
    "/sectors",
    "/clients",
    "/projects",
    "/products",
    "/blog",
    "/careers",
    "/gallery",
    "/contact",
  ]

  const BLOG_ROUTES = ["/blog-post-1", "/blog-post-2", "/blog-post-3"]

  const PROJECT_ROUTES = [
    // "/project/aishti-mall",
  ]

  const langs = [
    { code: "en", prefix: "" },
    { code: "fr", prefix: "/fr" },
    { code: "ar-LB", prefix: "/lb" },
  ]

  // Read service slugs from SERVICE_KEY_TO_SLUG in src/utils/serviceSlugs.js
  const serviceSlugsPath = path.resolve(__dirname, "../src/utils/serviceSlugs.js")
  const serviceSlugsSrc = fs.readFileSync(serviceSlugsPath, "utf8")

  // Match object literal: SERVICE_KEY_TO_SLUG = { ... }
  const match = serviceSlugsSrc.match(/SERVICE_KEY_TO_SLUG\s*=\s*({[\s\S]*?})/)

  let SERVICE_SLUGS = []
  if (match && match[1]) {
    try {
      // Evaluate object literal safely-ish (expects plain object literal only)
      // eslint-disable-next-line no-new-func
      const obj = new Function(`return ${match[1]}`)()
      SERVICE_SLUGS = Object.values(obj).filter(Boolean)
    } catch (e) {
      SERVICE_SLUGS = []
    }
  }

  const serviceRoutes = (SERVICE_SLUGS || []).map((s) => `/services/${s}`)

  const all = [...STATIC_ROUTES, ...serviceRoutes, ...BLOG_ROUTES, ...PROJECT_ROUTES]
  const routes = Array.from(new Set(all.filter(Boolean)))

  return { siteOrigin: SITE_ORIGIN, langs, routes }
}

function toXml({ entries }) {
  const urlBlocks = entries
    .map((e) => {
      const links = (e.alternates || [])
        .map(
          (a) =>
            `    <xhtml:link rel="alternate" hreflang="${escapeXml(a.hreflang)}" href="${escapeXml(a.href)}" />`
        )
        .join("\n")

      const lastmodLine = e.lastmod ? `    <lastmod>${escapeXml(e.lastmod)}</lastmod>\n` : ""
      const changefreqLine = e.changefreq ? `    <changefreq>${escapeXml(e.changefreq)}</changefreq>\n` : ""
      const priorityLine = e.priority ? `    <priority>${escapeXml(e.priority)}</priority>\n` : ""

      return (
        `  <url>\n` +
        `    <loc>${escapeXml(e.loc)}</loc>\n` +
        lastmodLine +
        changefreqLine +
        priorityLine +
        (links ? `${links}\n` : "") +
        `  </url>`
      )
    })
    .join("\n")

  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset\n` +
    `  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n` +
    `  xmlns:xhtml="http://www.w3.org/1999/xhtml"\n` +
    `>\n` +
    `${urlBlocks}\n` +
    `</urlset>\n`
  )
}

function main() {
  const { siteOrigin, langs, routes } = getRoutesAndConfig()

  const entries = routes.map((route) => {
    const meta = getMetaForRoute(route)
    const loc = joinUrl(siteOrigin, route)
    const lastmod = safeLastmodForRoute(route)

    const alternates = langs.map((l) => ({
      hreflang: l.code,
      href: joinUrl(siteOrigin, `${l.prefix}${route}`),
    }))

    return { loc, lastmod, alternates, changefreq: meta.changefreq, priority: meta.priority }
  })

  const xml = toXml({ entries })

  const outPath = path.resolve(__dirname, "../public/sitemap.xml")
  fs.writeFileSync(outPath, xml, "utf8")

  console.log(`✅ sitemap.xml generated (${entries.length} urls) -> ${outPath}`)
}

main()
