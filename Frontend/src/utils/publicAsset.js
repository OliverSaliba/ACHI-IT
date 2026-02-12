/**
 * Returns a relative path for public folder assets (works with <base href> on GitHub Pages).
 * Use ./ so paths resolve relative to the app root (set by <base> in index.html).
 * @param {string} path - Path like "/assets/logo.png" or "assets/logo.png"
 * @returns {string} - e.g. "./assets/logo.png" (resolved against base = PUBLIC_URL)
 */
export function publicAsset(path) {
  const p = (path || "").trim();
  const withoutLeadingSlash = p.startsWith("/") ? p.slice(1) : p;
  return withoutLeadingSlash ? `./${withoutLeadingSlash}` : ".";
}
