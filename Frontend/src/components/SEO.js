// import { useEffect, useMemo } from "react"
// import { useLocation } from "react-router-dom"
// import { useTranslation } from "react-i18next"
// import { getSlugForServiceKey } from "../utils/serviceSlugs"

// const SITE_ORIGIN = "https://achiscaffolding.com"

// const SEO = ({
//   title,
//   description,
//   canonical,
//   robots,
//   ogTitle,
//   ogDescription,
//   ogImage,
//   ogUrl,
//   ogType = "website",
//   noindex = false,
//   jsonLd,
// }) => {
//   const location = useLocation()
//   const { t, i18n } = useTranslation()

//   const safeT = (key) => {
//     const v = t(key)
//     return v === key ? "" : String(v || "")
//   }

//   const defaults = useMemo(() => {
//     const siteName = safeT("seo.siteName")
//     const titleDefault = safeT("seo.defaults.title")
//     const descDefault = safeT("seo.defaults.description")
//     const ogImageDefault = safeT("seo.defaults.ogImage")
//     return {
//       siteName,
//       titleDefault,
//       descDefault,
//       ogImageDefault,
//     }
//   }, [i18n.resolvedLanguage, i18n.language])

//   const stripHash = (url) => {
//     const s = String(url || "")
//     const i = s.indexOf("#")
//     return i === -1 ? s : s.slice(0, i)
//   }

//   const stripTrailingSlashExceptRoot = (path) => {
//     if (!path) return "/"
//     if (path === "/") return "/"
//     return path.replace(/\/+$/, "")
//   }

//   const getPublicBase = () => (process.env.PUBLIC_URL || "").replace(/\/+$/, "")

//   const stripPublicBase = (pathname) => {
//     const publicBase = getPublicBase()
//     if (!publicBase) return pathname || "/"
//     const p = String(pathname || "/")
//     if (p.toLowerCase().startsWith(publicBase.toLowerCase())) {
//       const rest = p.slice(publicBase.length)
//       return rest ? (rest.startsWith("/") ? rest : `/${rest}`) : "/"
//     }
//     return p
//   }

//   const stripLocalePrefix = (pathname) => {
//     const p = String(pathname || "/")
//     const m = p.match(/^\/(fr|lb)(?=\/|$)/i)
//     if (!m) return { locale: "", path: stripTrailingSlashExceptRoot(p) }
//     const locale = `/${m[1].toLowerCase()}`
//     const rest = p.slice(locale.length) || "/"
//     return { locale, path: stripTrailingSlashExceptRoot(rest.startsWith("/") ? rest : `/${rest}`) }
//   }

//   const isBadCanonicalHost = (url) => {
//     const s = String(url || "").toLowerCase()
//     return (
//       s.startsWith("http://localhost") ||
//       s.startsWith("https://localhost") ||
//       s.startsWith("http://127.0.0.1") ||
//       s.startsWith("https://127.0.0.1") ||
//       s.includes("achi-scaffolding.github.io")
//     )
//   }

//   const normalizeToSiteOrigin = (maybeAbsoluteOrPath) => {
//     const s = String(maybeAbsoluteOrPath || "")
//     if (!s) return ""
//     if (s.startsWith("/")) return `${SITE_ORIGIN}${s}`
//     if (s.startsWith("http://") || s.startsWith("https://")) {
//       try {
//         const u = new URL(s)
//         return `${SITE_ORIGIN}${u.pathname}${u.search || ""}${u.hash || ""}`
//       } catch (e) {
//         return ""
//       }
//     }
//     return ""
//   }

//   const getRobotsContent = () => {
//     if (noindex) return "noindex,follow"
//     if (robots != null && robots !== "") return String(robots)
//     const r = safeT("seo.defaults.robots")
//     return r || "index,follow"
//   }

//   const getCanonicalUrl = () => {
//     if (canonical) {
//       const c = stripHash(canonical)
//       if (isBadCanonicalHost(c)) return stripHash(normalizeToSiteOrigin(c))
//       if (c.startsWith("/")) return stripHash(`${SITE_ORIGIN}${c}`)
//       return c
//     }

//     const rawPath = location.pathname || "/"
//     const rawSearch = location.search || ""

//     const pathNoBase = stripPublicBase(rawPath)
//     const { locale, path } = stripLocalePrefix(pathNoBase)

//     if (path === "/services/serviceItem") {
//       const params = new URLSearchParams(rawSearch)
//       const key = params.get("service")
//       const slug = getSlugForServiceKey(key)
//       if (slug) return `${SITE_ORIGIN}${locale}/services/${slug}`
//       return `${SITE_ORIGIN}${locale}${path}`
//     }

//     const m = path.match(/^\/services\/([^/?#]+)\/?$/)
//     if (m && m[1]) return `${SITE_ORIGIN}${locale}/services/${m[1]}`

//     return `${SITE_ORIGIN}${locale}${path}`
//   }

//   const getAbsoluteUrlForCurrentPage = (canonicalUrl) => {
//     if (ogUrl) {
//       const u = stripHash(ogUrl)
//       if (isBadCanonicalHost(u)) return stripHash(normalizeToSiteOrigin(u))
//       if (u.startsWith("/")) return stripHash(`${SITE_ORIGIN}${u}`)
//       return u
//     }
//     return canonicalUrl
//   }

//   const normalizeJsonLd = (v) => {
//     if (!v) return []
//     if (Array.isArray(v)) return v.filter(Boolean)
//     if (typeof v === "object") return [v]
//     return []
//   }

//   useEffect(() => {
//     const finalTitle = (title != null && title !== "" ? String(title) : defaults.titleDefault) || ""
//     const finalDescription =
//       (description != null && description !== "" ? String(description) : defaults.descDefault) || ""
//     const finalOgTitle = (ogTitle != null && ogTitle !== "" ? String(ogTitle) : finalTitle) || ""
//     const finalOgDescription =
//       (ogDescription != null && ogDescription !== "" ? String(ogDescription) : finalDescription) || ""
//     const finalOgImage =
//       (ogImage != null && ogImage !== "" ? String(ogImage) : defaults.ogImageDefault) || ""
//     const robotsContent = getRobotsContent()
//     const canonicalUrl = getCanonicalUrl()
//     const finalOgUrl = getAbsoluteUrlForCurrentPage(canonicalUrl)
//     const siteName = defaults.siteName || ""

//     if (finalTitle) document.title = finalTitle

//     const updateMetaTag = (name, content, attribute = "name") => {
//       if (content == null || content === "") return
//       let element = document.querySelector(`meta[${attribute}="${name}"]`)
//       if (!element) {
//         element = document.createElement("meta")
//         element.setAttribute(attribute, name)
//         document.head.appendChild(element)
//       }
//       element.setAttribute("content", String(content))
//     }

//     if (finalDescription) updateMetaTag("description", finalDescription)
//     updateMetaTag("robots", robotsContent)

//     let canonicalLink = document.querySelector('link[rel="canonical"]')
//     if (!canonicalLink) {
//       canonicalLink = document.createElement("link")
//       canonicalLink.setAttribute("rel", "canonical")
//       document.head.appendChild(canonicalLink)
//     }
//     canonicalLink.setAttribute("href", canonicalUrl)

//     if (finalOgTitle) updateMetaTag("og:title", finalOgTitle, "property")
//     if (finalOgDescription) updateMetaTag("og:description", finalOgDescription, "property")
//     updateMetaTag("og:url", finalOgUrl, "property")
//     if (finalOgImage) updateMetaTag("og:image", finalOgImage, "property")
//     updateMetaTag("og:type", ogType, "property")
//     if (siteName) updateMetaTag("og:site_name", siteName, "property")

//     updateMetaTag("twitter:card", "summary_large_image")
//     if (finalOgTitle) updateMetaTag("twitter:title", finalOgTitle)
//     if (finalOgDescription) updateMetaTag("twitter:description", finalOgDescription)
//     if (finalOgImage) updateMetaTag("twitter:image", finalOgImage)

//     const schemas = normalizeJsonLd(jsonLd)
//     const existing = Array.from(document.querySelectorAll('script[data-seo-jsonld="true"]'))
//     existing.forEach((n) => n.remove())

//     schemas.forEach((schema, idx) => {
//       try {
//         const s = document.createElement("script")
//         s.type = "application/ld+json"
//         s.setAttribute("data-seo-jsonld", "true")
//         s.setAttribute("data-seo-jsonld-idx", String(idx))
//         s.text = JSON.stringify(schema)
//         document.head.appendChild(s)
//       } catch (e) {}
//     })
//   }, [
//     location.pathname,
//     location.search,
//     i18n.resolvedLanguage,
//     i18n.language,
//     title,
//     description,
//     canonical,
//     robots,
//     ogTitle,
//     ogDescription,
//     ogImage,
//     ogUrl,
//     ogType,
//     noindex,
//     jsonLd,
//     defaults.siteName,
//     defaults.titleDefault,
//     defaults.descDefault,
//     defaults.ogImageDefault,
//   ])

//   return null
// }

// export default SEO

// Frontend/src/components/SEO.js
import RouteSeo from "../seo/RouteSeo"

const SEO = (props) => {
  return <RouteSeo {...props} />
}

export default SEO
