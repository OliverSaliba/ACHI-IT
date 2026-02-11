// Frontend/src/seo/sitemapRoutes.js
import { SERVICE_KEY_TO_SLUG } from "../utils/serviceSlugs"

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
  // Add your real project detail URLs here when ready:
  // "/project/aishti-mall",
]

function uniq(arr) {
  return Array.from(new Set(arr.filter(Boolean)))
}

export function getSitemapRoutes() {
  const slugs = Object.values(SERVICE_KEY_TO_SLUG || {}).filter(Boolean)
  const serviceRoutes = slugs.map((s) => `/services/${s}`)
  return uniq([...STATIC_ROUTES, ...serviceRoutes, ...BLOG_ROUTES, ...PROJECT_ROUTES])
}

export function getSitemapConfig() {
  return {
    siteOrigin: SITE_ORIGIN,
    langs: [
      { code: "en", prefix: "" },
      { code: "fr", prefix: "/fr" },
      { code: "ar-LB", prefix: "/lb" },
    ],
  }
}
