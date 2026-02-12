/**
 * Returns the full URL for a public folder asset (works on GitHub Pages subpath).
 * @param {string} path - Path like "/assets/logo.png" or "assets/logo.png"
 * @returns {string} - e.g. "/ACHI-IT/frontend/assets/logo.png" in production, "/assets/logo.png" in dev
 */
export function publicAsset(path) {
  const base = process.env.PUBLIC_URL || "";
  const normalized = path && path.startsWith("/") ? path : `/${path || ""}`;
  return `${base}${normalized}`;
}
