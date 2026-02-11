const BASE_URL = "https://achiscaffolding.com"

export const normalizePathname = (pathname) => {
  if (!pathname || pathname === "/") return "/"

  let normalized = pathname

  normalized = normalized.replace(/\/+/g, "/")

  if (!normalized.startsWith("/")) normalized = "/" + normalized

  if (normalized.length > 1 && normalized.endsWith("/")) {
    normalized = normalized.slice(0, -1)
  }

  return normalized
}

export const stripQueryAndHash = (url) => {
  if (!url) return ""
  try {
    const u = new URL(url, BASE_URL)
    return u.pathname
  } catch {
    return url.split("?")[0].split("#")[0]
  }
}

export const buildInternalHref = (path) => {
  if (!path) return "/"
  if (path.startsWith("http://") || path.startsWith("https://")) return path
  if (path.startsWith("#")) return path
  if (path.startsWith("mailto:") || path.startsWith("tel:")) return path
  return normalizePathname(path)
}

export const getCanonicalUrl = (pathname, search = "") => {
  const rawPath = stripQueryAndHash(pathname || "/")
  const normalized = normalizePathname(rawPath)

  const qs = (search || "").trim()
  const finalSearch = qs && qs.startsWith("?") ? qs : qs ? `?${qs}` : ""

  return `${BASE_URL}${normalized}${finalSearch}`
}

export const isCanonicalSelfReferencing = (canonicalUrl, currentPathname) => {
  if (!canonicalUrl || !currentPathname) return false

  try {
    const canonical = new URL(canonicalUrl)
    const current = new URL(currentPathname, canonical.origin)

    const canonicalPath = canonical.pathname
    const currentPath = current.pathname

    const normalizedCanonical = normalizePathname(canonicalPath)
    const normalizedCurrent = normalizePathname(currentPath)

    return normalizedCanonical === normalizedCurrent
  } catch {
    return false
  }
}

export const canonicalUrl = getCanonicalUrl

export const hasFilterParams = (url) => {
  if (!url) return false

  const searchParams = url.includes("?") ? url.split("?")[1].split("#")[0] : ""
  if (!searchParams) return false

  const filterParams = ["sort", "filter", "search", "q", "page", "offset", "limit", "category", "tag"]

  return filterParams.some((param) => searchParams.includes(`${param}=`))
}

export const getBasePath = () => {
  return ""
}

export { BASE_URL }
