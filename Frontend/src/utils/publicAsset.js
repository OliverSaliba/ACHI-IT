/**
 * Returns an absolute path for public folder assets (required for GitHub Pages and CSS url()).
 * CSS resolves url() relative to the stylesheet, so we must use absolute paths.
 * @param {string} path - Path like "/assets/logo.png" or "assets/logo.png"
 * @returns {string} - e.g. "/ACHI-IT/assets/logo.png" in production, "/assets/logo.png" in dev
 */
export function publicAsset(path) {
  const base = process.env.PUBLIC_URL || "";
  const normalized = (path || "").trim();
  const withLeadingSlash = normalized.startsWith("/") ? normalized : `/${normalized || ""}`;
  return `${base}${withLeadingSlash}`;
}
