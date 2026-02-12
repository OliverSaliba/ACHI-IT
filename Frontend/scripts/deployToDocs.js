/**
 * Copies Frontend/build to repo docs/frontend/ for GitHub Pages (Deploy from branch -> /docs).
 * Assets are then at /ACHI-IT/frontend/assets/ so GitHub serves from repo root correctly.
 * Creates .nojekyll, root redirect, and 404 for SPA routing.
 * Run from Frontend/ after: npm run build
 */

const fs = require("fs");
const path = require("path");

const frontendDir = path.resolve(__dirname, "..");
const buildDir = path.join(frontendDir, "build");
const docsDir = path.resolve(frontendDir, "..", "docs");
const frontendDestDir = path.join(docsDir, "frontend");

function rimraf(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) rimraf(full);
    else fs.unlinkSync(full);
  }
  fs.rmdirSync(dir);
}

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    for (const name of fs.readdirSync(src)) {
      copyRecursive(path.join(src, name), path.join(dest, name));
    }
  } else {
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

if (!fs.existsSync(buildDir)) {
  console.error("Build folder not found. Run 'npm run build' first.");
  process.exit(1);
}

console.log("Deploying build to repo docs/frontend...");

fs.mkdirSync(docsDir, { recursive: true });
if (fs.existsSync(frontendDestDir)) {
  rimraf(frontendDestDir);
}
fs.mkdirSync(frontendDestDir, { recursive: true });

copyRecursive(buildDir, frontendDestDir);

fs.writeFileSync(path.join(docsDir, ".nojekyll"), "", "utf8");

// Root redirect: visiting /ACHI-IT/ goes to the app at /ACHI-IT/frontend/
const rootIndex = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=/ACHI-IT/frontend/"><script>location.replace("/ACHI-IT/frontend/" + (location.search || "") + (location.hash || ""));</script></head><body><p>Redirecting to <a href="/ACHI-IT/frontend/">app</a>...</p></body></html>
`;
fs.writeFileSync(path.join(docsDir, "index.html"), rootIndex, "utf8");
console.log("Created docs/index.html redirect to /ACHI-IT/frontend/");

const notFoundHtml = path.join(buildDir, "404.html");
if (fs.existsSync(notFoundHtml)) {
  fs.copyFileSync(notFoundHtml, path.join(frontendDestDir, "404.html"));
  console.log("Copied build/404.html to docs/frontend/404.html (SPA redirect).");
}

console.log("Done. docs/ and docs/frontend/ are ready. Commit and push, then set Pages -> Source: Deploy from branch -> main -> /docs");
