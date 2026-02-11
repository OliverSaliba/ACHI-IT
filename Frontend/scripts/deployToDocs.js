/**
 * Copies Frontend/build to repo root docs/ for GitHub Pages (Deploy from branch -> /docs).
 * Creates .nojekyll and 404.html for SPA routing.
 * Run from Frontend/ after: npm run build
 */

const fs = require("fs");
const path = require("path");

const frontendDir = path.resolve(__dirname, "..");
const buildDir = path.join(frontendDir, "build");
const docsDir = path.resolve(frontendDir, "..", "docs");

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

console.log("Deploying build to repo /docs...");

if (fs.existsSync(docsDir)) {
  rimraf(docsDir);
}
fs.mkdirSync(docsDir, { recursive: true });

copyRecursive(buildDir, docsDir);

fs.writeFileSync(path.join(docsDir, ".nojekyll"), "", "utf8");

const notFoundHtml = path.join(buildDir, "404.html");
const indexHtml = path.join(buildDir, "index.html");
if (fs.existsSync(notFoundHtml)) {
  fs.copyFileSync(notFoundHtml, path.join(docsDir, "404.html"));
  console.log("Copied build/404.html to docs/404.html (SPA redirect).");
} else if (fs.existsSync(indexHtml)) {
  fs.copyFileSync(indexHtml, path.join(docsDir, "404.html"));
  console.log("Created docs/404.html from index.html for SPA fallback.");
}

console.log("Done. docs/ is ready. Commit and push, then set Pages -> Source: Deploy from branch -> main -> /docs");
