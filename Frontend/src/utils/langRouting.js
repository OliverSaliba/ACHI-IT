// Frontend/src/utils/langRouting.js
import { ITALY_ENABLED } from "./featureFlags"

export const SUPPORTED_PREFIXES = ITALY_ENABLED ? ["fr", "lb", "it"] : ["fr", "lb"]

const trimSlashes = (s) => (s || "").replace(/^\/+|\/+$/g, "")

// Italian path slugs (match Italian nav text). Used when lang is "it" so URLs are /it/chi-siamo not /it/about.
const ITALIAN_PATH_BY_LOGICAL = {
  about: "chi-siamo",
  services: "servizi",
  sectors: "settori",
  products: "prodotti",
  projects: "i-nostri-lavori",
  blog: "blog",
  careers: "lavora-con-noi",
  gallery: "galleria",
}
const LOGICAL_PATH_BY_ITALIAN = Object.entries(ITALIAN_PATH_BY_LOGICAL).reduce((acc, [log, it]) => {
  acc[it] = log
  return acc
}, {})

const normalizeLang = (lang) => {
  if (!lang) return "en"
  const v = String(lang).toLowerCase()
  if (v === "lb") return "ar"
  if (v === "ar-lb") return "ar"
  if (v === "fr") return "fr"
  if (v === "ar") return "ar"
  if (v === "it") return "it"
  return "en"
}

const getPublicBasePath = () => {
  const raw = process.env.PUBLIC_URL || ""
  if (!raw) return ""
  try {
    if (/^https?:\/\//i.test(raw)) {
      const u = new URL(raw)
      return "/" + trimSlashes(u.pathname)
    }
  } catch (e) {}
  return "/" + trimSlashes(raw)
}

export const stripPublicBase = (pathname) => {
  const p = pathname || "/"
  const base = getPublicBasePath()

  if (!base || base === "/") return p
  if (p === base) return "/"
  if (p.startsWith(base + "/")) return p.slice(base.length) || "/"
  return p
}

export const getCountryPrefix = (country) => {
  if (country === "France") return "fr"
  if (country === "Lebanon") return "lb"
  if (country === "Italy" && ITALY_ENABLED) return "it"
  return ""
}

export const getLangPrefix = (lang) => {
  const l = normalizeLang(lang)
  if (l === "fr") return "fr"
  if (l === "ar") return "lb"
  if (l === "it" && ITALY_ENABLED) return "it"
  return ""
}

export const getLocalePrefix = ({ country, language }) => {
  const langPrefix = language ? getLangPrefix(language) : ""
  const countryPrefix = country ? getCountryPrefix(country) : ""

  const l = normalizeLang(language)

  if (l === "en") return ""

  if (countryPrefix && langPrefix && countryPrefix === langPrefix) return countryPrefix
  if (langPrefix) return langPrefix
  if (countryPrefix) return countryPrefix

  return ""
}

export const getLangFromPath = (pathname) => {
  const clean = stripPublicBase(pathname)
  const segments = clean.split("/").filter(Boolean)
  const firstSegment = segments[0]?.toLowerCase()

  if (firstSegment === "fr") return "fr"
  if (firstSegment === "lb") return "ar"
  if (firstSegment === "it" && ITALY_ENABLED) return "it"
  return "en"
}

export const stripLocalePrefix = (pathname, supportedPrefixes = SUPPORTED_PREFIXES) => {
  const clean = stripPublicBase(pathname)
  const segments = clean.split("/").filter(Boolean)
  const firstSegment = segments[0]?.toLowerCase()

  if (supportedPrefixes.includes(firstSegment)) {
    const rest = "/" + segments.slice(1).join("/")
    return rest === "/" ? "/" : rest
  }

  return clean || "/"
}

export const stripLangPrefix = stripLocalePrefix

export const buildLocalizedPath = (prefix, pathnameWithoutPrefix) => {
  const normalizedPath = pathnameWithoutPrefix.startsWith("/")
    ? pathnameWithoutPrefix
    : `/${pathnameWithoutPrefix}`

  if (!prefix) return normalizedPath
  return `/${prefix}${normalizedPath}`
}

/** For Italian locale, returns path with Italian slugs (e.g. /chi-siamo). Otherwise returns logicalPath unchanged. */
export const getPathForLocale = (lang, logicalPath) => {
  if (!ITALY_ENABLED || normalizeLang(lang) !== "it") return logicalPath
  const path = logicalPath.startsWith("/") ? logicalPath : `/${logicalPath}`
  const trailing = path.endsWith("/") && path !== "/" ? "/" : ""
  const segments = path.replace(/\/+$/, "").split("/").filter(Boolean)
  const first = segments[0]?.toLowerCase()
  const replacement = first ? (ITALIAN_PATH_BY_LOGICAL[first] ?? first) : ""
  if (!replacement) return logicalPath
  const rest = segments.slice(1).join("/")
  const out = "/" + replacement + (rest ? `/${rest}` : "") + trailing
  return out
}

/** For Italian locale, converts Italian path back to logical (e.g. /chi-siamo → /about) so Routes match. */
export const getLogicalPathFromLocalizedPath = (path, lang) => {
  if (!ITALY_ENABLED || normalizeLang(lang) !== "it") return path
  const p = path || "/"
  const trailing = p.endsWith("/") && p !== "/" ? "/" : ""
  const segments = p.replace(/\/+$/, "").split("/").filter(Boolean)
  const first = segments[0]?.toLowerCase()
  const logicalFirst = first ? (LOGICAL_PATH_BY_ITALIAN[first] ?? first) : ""
  if (!logicalFirst) return path
  const rest = segments.slice(1).join("/")
  return "/" + logicalFirst + (rest ? `/${rest}` : "") + trailing
}

export const buildPathWithLang = (lang, cleanPath) => {
  const pathForLocale = getPathForLocale(lang, cleanPath)
  const prefix = getLangPrefix(lang)
  return buildLocalizedPath(prefix, pathForLocale)
}

export const prefixToLang = (prefix) => {
  if (prefix === "fr") return "fr"
  if (prefix === "lb") return "ar"
  if (prefix === "it" && ITALY_ENABLED) return "it"
  return "en"
}

export const applyLocalePrefix = ({
  currentPathname,
  country,
  language,
  navigate,
  onLanguageChange,
  onCountryChange,
}) => {
  const cleanPath = stripLocalePrefix(currentPathname)
  const newPrefix = getLocalePrefix({ country, language })
  const newPath = buildLocalizedPath(newPrefix, cleanPath)

  const currentClean = stripPublicBase(currentPathname) || "/"

  if (navigate && newPath !== currentClean) {
    navigate(newPath)
  }

  if (language && onLanguageChange) {
    onLanguageChange(normalizeLang(language))
  }

  if (country && onCountryChange) {
    onCountryChange(country)
  }

  return newPath
}

export const withLangHash = (pathname, sectionHash) => {
  const currentLang = getLangFromPath(pathname)
  const prefix = getLangPrefix(currentLang)
  const hash = sectionHash.startsWith("#") ? sectionHash : `#${sectionHash}`
  const base = prefix ? `/${prefix}/` : "/"
  return `${base}${hash}`
}
