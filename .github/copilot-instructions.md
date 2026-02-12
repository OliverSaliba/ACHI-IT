# Copilot / AI Agent Instructions

Purpose: Quickly onboard an AI coding assistant to be immediately productive in this repository.

Quick Start
- Frontend (React CRA):
  - Install & dev: `cd Frontend && npm install && npm start`
  - Build static site: `cd Frontend && npm run build` (postbuild runs `node scripts/copy-404.js`).
- Backend (.NET 8+ minimal API):
  - Run: `dotnet run --project Backend/Achi.Api` (or open solution `ACHI-.sln` in IDE).
  - Configure DB: update `Backend/Achi.Api/appsettings.json` or provide a connection string via environment variables.

Big Picture Architecture
- Frontend: a Create-React-App based SPA in `Frontend/` (scripts in `package.json`). Static output is `Frontend/build/` and `Frontend/public/`.
- Backend: ASP.NET minimal startup in `Backend/Achi.Api/Program.cs` with MVC controllers under `Controllers/`.
- Data & storage: backend uses `Microsoft.Data.SqlClient` + `Dapper` and expects stored procedures (e.g. `dbo.sp_ContactRequest_Create`) — DB schema and SPs are external to the repo.
- File uploads: saved to disk under the backend project path `uploads/contact` (see `ContactController.cs`). Ensure server process has write permissions there.

Key Integration Points (examples)
- Contact API: `POST /api/contact` — multipart/form-data handled by `Backend/Achi.Api/Controllers/ContactController.cs` and DTO `Backend/Achi.Api/Models/ContactRequestDto.cs`.
  - Allowed file types: `.pdf, .jpg, .jpeg, .png, .doc, .docx`; max 15 MB.
  - Persists metadata via stored procedure; returns `{ id }` on success.
- Frontend product 3D previews: `Frontend/src/pages/Products.js` loads `model-viewer` dynamically from unpkg and expects `.glb` files in `public/assets/products/` (see use of `process.env.PUBLIC_URL`).

Developer Workflows & Commands
- Frontend dev server: `cd Frontend && npm start` (hot-reloads on source changes).
- Build for production: `cd Frontend && npm run build` then serve `Frontend/build` with any static host or copy into backend `wwwroot` if desired.
- Backend dev: `dotnet run --project Backend/Achi.Api` (uses HTTPS redirection; Swagger enabled in Development).
- Test contact endpoint locally (example):
  - `curl -F "ContactName=John" -F "ContactSurname=Doe" -F "ContactCompany=Acme" -F "ContactEmail=j@e.com" -F "ContactPhone=123" -F "ServiceSlug=example" -F "ContactMessage=hi" http://localhost:5000/api/contact`

Project-Specific Conventions
- Use `process.env.PUBLIC_URL` in frontend to reference static assets; models and images live under `Frontend/public/assets/`.
- 3D previews are non-interactive inline previews using `model-viewer` with pointer-events disabled — see `applyPreviewBaseAttributes` and preview lifecycle in `Products.js`.
- Backend expects stored procedures for persistence; search for `sp_` usages to find integration points.
- CORS: configured in `Program.cs` under policy `Frontend` — includes localhost:3000 and the production domains.

Notes for an AI Agent
- Avoid changing DB contract assumptions (stored procedures / result shapes) unless accompanied by SQL changes and migration notes.
- When modifying uploads handling, preserve allowed extensions and size checks in `ContactController.cs`.
- For frontend changes that touch asset paths, update `process.env.PUBLIC_URL` usages and the `public/assets` layout.
- Use real file examples from `Frontend/public/assets/products/` when testing model-viewer behavior.

Where to look first
- `Frontend/src/pages/Products.js` — example of frontend patterns, 3D model handling, and runtime script injection.
- `Backend/Achi.Api/Controllers/ContactController.cs` and `Backend/Achi.Api/Models/ContactRequestDto.cs` — contact flow and upload handling.
- `Backend/Achi.Api/appsettings.json` — default connection string; must be updated for local/dev.

If anything is unclear or you want me to expand specific sections (tests, CI, or SQL schema), tell me which area to prioritize.
