// Frontend/src/seo/RouteSeo.jsx
import { Helmet } from "react-helmet-async"
import { getRouteSEO, DEFAULT_SEO } from "./seoConfig"
import { stripLocalePrefix, stripPublicBase, getLogicalPathFromLocalizedPath, getPathForLocale } from "../utils/langRouting"
import { ITALY_ENABLED } from "../utils/featureFlags"

const SITE_ORIGIN = "https://achiscaffolding.com"

const getLocaleFromPath = (pathname) => {
  if (pathname === "/fr" || pathname.startsWith("/fr/")) return "fr"
  if (pathname === "/lb" || pathname.startsWith("/lb/")) return "ar"
  if (pathname === "/it" || pathname.startsWith("/it/")) return "it"
  return "en"
}

const withLocalePrefix = (locale, cleanPathname) => {
  if (locale === "fr") return cleanPathname === "/" ? "/fr" : `/fr${cleanPathname}`
  if (locale === "ar") return cleanPathname === "/" ? "/lb" : `/lb${cleanPathname}`
  if (locale === "it") return cleanPathname === "/" ? "/it" : `/it${cleanPathname}`
  return cleanPathname
}

const hrefLangForOg = (locale) => {
  if (locale === "ar") return "ar-LB"
  if (locale === "fr") return "fr"
  if (locale === "it") return "it"
  return "en"
}

const htmlLangFor = (locale) => {
  if (locale === "ar") return "ar-LB"
  if (locale === "fr") return "fr"
  if (locale === "it") return "it"
  return "en"
}

const normalizePath = (p) => {
  if (!p) return "/"
  const s = String(p)
  if (!s.startsWith("/")) return `/${s}`
  return s
}

const toAbsolute = (path) => `${SITE_ORIGIN}${normalizePath(path)}`

const stripHash = (url) => {
  const s = String(url || "")
  const i = s.indexOf("#")
  return i === -1 ? s : s.slice(0, i)
}

const normalizeToSiteOrigin = (maybeAbsoluteOrPath) => {
  const s = String(maybeAbsoluteOrPath || "").trim()
  if (!s) return ""
  if (s.startsWith("/")) return `${SITE_ORIGIN}${s}`
  if (s.startsWith("http://") || s.startsWith("https://")) {
    try {
      const u = new URL(s)
      return `${SITE_ORIGIN}${u.pathname}${u.search || ""}`
    } catch (e) {
      return ""
    }
  }
  return ""
}

const isServicePath = (cleanPathname) => {
  const p = String(cleanPathname || "/")
  return p.startsWith("/services/") && p.split("/").filter(Boolean).length === 2
}

const isBlogPostPath = (cleanPathname) => {
  const p = String(cleanPathname || "/")
  return p.startsWith("/blog-post-")
}

const buildSchemaGraph = ({
  locale,
  htmlLang,
  canonicalUrl,
  cleanPathname,
  finalTitle,
  finalDescription,
  finalOgImage,
}) => {
  const orgId = `${SITE_ORIGIN}/#organization`
  const lbId = `${SITE_ORIGIN}/#localbusiness`

  const graph = [
    {
      "@type": "Organization",
      "@id": orgId,
      url: `${SITE_ORIGIN}/`,
      name: "ACHI Scaffolding",
      logo: {
        "@type": "ImageObject",
        url: normalizeToSiteOrigin(finalOgImage) || finalOgImage,
      },
    },
    {
      "@type": "LocalBusiness",
      "@id": lbId,
      url: `${SITE_ORIGIN}/`,
      name: "ACHI Scaffolding",
      parentOrganization: { "@id": orgId },
      areaServed: [{ "@type": "Country", name: "Lebanon" }],
    },
    {
      "@type": "WebPage",
      "@id": `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: finalTitle,
      description: finalDescription,
      inLanguage: htmlLang,
      isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
      about: { "@id": orgId },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_ORIGIN}/#website`,
      url: `${SITE_ORIGIN}/`,
      name: DEFAULT_SEO.siteName || "ACHI Scaffolding",
      inLanguage: htmlLang,
      publisher: { "@id": orgId },
    },
  ]

  if (isServicePath(cleanPathname)) {
    graph.push({
      "@type": "Service",
      "@id": `${canonicalUrl}#service`,
      url: canonicalUrl,
      name: finalTitle,
      description: finalDescription,
      provider: { "@id": lbId },
      areaServed: [{ "@type": "Country", name: "Lebanon" }],
      inLanguage: htmlLang,
    })
  } else if (isBlogPostPath(cleanPathname)) {
    graph.push({
      "@type": "BlogPosting",
      "@id": `${canonicalUrl}#blogposting`,
      mainEntityOfPage: { "@id": `${canonicalUrl}#webpage` },
      url: canonicalUrl,
      headline: finalTitle,
      description: finalDescription,
      inLanguage: htmlLang,
      author: { "@id": orgId },
      publisher: { "@id": orgId },
      image: normalizeToSiteOrigin(finalOgImage) || finalOgImage,
    })
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  }
}

const RouteSeo = ({ title, description, ogImage, indexable, canonical: canonicalOverride }) => {
  const rawPathname = typeof window !== "undefined" ? window.location.pathname : "/"
  const rawSearch = typeof window !== "undefined" ? window.location.search : ""

  const pathname = stripPublicBase(rawPathname)

  const locale = getLocaleFromPath(pathname)
  const cleanPathname = stripLocalePrefix(pathname)
  const logicalPath = getLogicalPathFromLocalizedPath(cleanPathname, locale)
  const search = rawSearch

  const routeSEO = getRouteSEO(logicalPath, locale, search)
  const shouldIndex = indexable !== undefined ? indexable : routeSEO.indexable

  const fallbackDefaults = DEFAULT_SEO[locale] || DEFAULT_SEO.en

  const finalTitle = title || routeSEO.title || fallbackDefaults.title
  const finalDescription = description || routeSEO.description || fallbackDefaults.description
  const finalOgImage = ogImage || routeSEO.ogImage || DEFAULT_SEO.ogImage

  const displayPath = getPathForLocale(locale, logicalPath)
  const localizedPath = withLocalePrefix(locale, displayPath)

  const canonicalFromConfig = canonicalOverride || routeSEO.canonical || localizedPath
  const canonicalUrlValue = stripHash(normalizeToSiteOrigin(canonicalFromConfig) || toAbsolute(localizedPath))

  const robotsContent = shouldIndex ? "index,follow" : "noindex,follow"
  const ogUrl = canonicalUrlValue

  const enUrl = toAbsolute(withLocalePrefix("en", getPathForLocale("en", logicalPath)))
  const frUrl = toAbsolute(withLocalePrefix("fr", getPathForLocale("fr", logicalPath)))
  const arUrl = toAbsolute(withLocalePrefix("ar", getPathForLocale("ar", logicalPath)))
  const itUrl = toAbsolute(withLocalePrefix("it", getPathForLocale("it", logicalPath)))

  const htmlLang = htmlLangFor(locale)
  const htmlDir = locale === "ar" ? "rtl" : "ltr"

  const schemaGraph = buildSchemaGraph({
    locale,
    htmlLang,
    canonicalUrl: canonicalUrlValue,
    cleanPathname: logicalPath,
    finalTitle,
    finalDescription,
    finalOgImage,
  })

  return (
    <Helmet>
      <html lang={htmlLang} dir={htmlDir} />

      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="robots" content={robotsContent} />
      <link rel="canonical" href={canonicalUrlValue} />

      <link rel="alternate" hrefLang="en" href={enUrl} />
      <link rel="alternate" hrefLang="fr" href={frUrl} />
      <link rel="alternate" hrefLang="ar-LB" href={arUrl} />
      {ITALY_ENABLED && <link rel="alternate" hrefLang="it" href={itUrl} />}
      <link rel="alternate" hrefLang="x-default" href={enUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:site_name" content={DEFAULT_SEO.siteName} />

      <meta property="og:locale" content={hrefLangForOg(locale).replace("-", "_")} />
      <meta property="og:locale:alternate" content="en" />
      <meta property="og:locale:alternate" content="fr" />
      <meta property="og:locale:alternate" content="ar_LB" />
      {ITALY_ENABLED && <meta property="og:locale:alternate" content="it" />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalOgImage} />

      <script type="application/ld+json">{JSON.stringify(schemaGraph)}</script>
    </Helmet>
  )
}

export default RouteSeo
