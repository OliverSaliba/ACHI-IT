/**
 * Post-build script to verify 404.html for GitHub Pages SPA routing
 * 
 * GitHub Pages serves 404.html for any missing route. Create React App
 * automatically copies public/404.html to build/404.html during build.
 * 
 * This script verifies that:
 * 1. The static 404.html exists in build/ (copied from public/)
 * 2. It contains the redirect script for SPA routing
 * 
 * When a user/bot accesses /about directly:
 * - GitHub Pages serves 404.html
 * - The redirect script immediately redirects to /?p=/about
 * - index.html's route restoration script reads ?p= and restores the route
 * - React Router receives the correct route and renders the page
 */

const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '..', 'build');
const notFoundHtmlPath = path.join(buildDir, '404.html');

try {
  // Check if build directory exists
  if (!fs.existsSync(buildDir)) {
    console.error('Build directory does not exist. Run "npm run build" first.');
    process.exit(1);
  }

  // Check if 404.html exists (should be copied from public/ during build)
  if (!fs.existsSync(notFoundHtmlPath)) {
    console.error('404.html not found in build directory. Ensure public/404.html exists.');
    process.exit(1);
  }

  // Read the 404.html to verify it has the redirect script
  const notFoundHtml = fs.readFileSync(notFoundHtmlPath, 'utf8');
  
  // Verify it contains the redirect logic
  if (!notFoundHtml.includes('window.location.replace') || !notFoundHtml.includes('?p=')) {
    console.warn('⚠ Warning: 404.html may not contain the redirect script. Check public/404.html');
  } else {
    console.log('✓ Verified 404.html contains redirect script for SPA routing');
  }
} catch (error) {
  console.error('Error verifying 404.html:', error);
  process.exit(1);
}

