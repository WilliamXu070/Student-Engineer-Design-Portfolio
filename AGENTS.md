# Repository Guidelines

## Project Structure & Module Organization
This repository is a Next.js 15 portfolio app using the App Router. Primary source code lives in `app/`, with route files such as `app/page.tsx` and dynamic routes under `app/projects/[slug]/` and `app/ctmfs/[slug]/`. Reusable UI is grouped under `app/components/`, shared data under `app/constants/`, state stores under `app/stores/`, and shared types under `app/types/`. Static files, fonts, icons, PDFs, and 3D models belong in `public/`.

Ignore generated output such as `.next/`, `.next_backup_*`, `test-results/`, and local editor files.

## Local Skill And Plugin Scope
Local frontend-design guidance lives in `my-frontend-design/`.

- Plugin entry: `my-frontend-design/.codex-plugin/plugin.json`
- Skill entry: `my-frontend-design/skills/frontend-design/SKILL.md`

For frontend UI work, read `my-frontend-design/skills/frontend-design/SKILL.md` before coding and apply it directly. The active scope is:
- choose a clear, bold visual direction before implementation
- build production-ready code, not mockups
- use distinctive typography, color, motion, spacing, and backgrounds
- avoid generic AI patterns, especially default-safe fonts, purple-on-white gradients, and cookie-cutter layouts
- match implementation complexity to the intended aesthetic

Use the plugin only as the loader for the skill. `plugin.json` points to `./skills/`; the operational instructions come from `SKILL.md`.

## Content Integration Workflow
For project-page or portfolio content implementation work, do not treat the provided writing as standalone copy.

- First inspect the target route/component and the relevant local context materials in `Context/`, `public/`, and any already-extracted evidence assets.
- Look for images, figures, charts, screenshots, CAD, or other media that directly support the claims being made in the supplied text.
- Prefer integrating the user's wording closely and restructuring the page around the argument and evidence, rather than paraphrasing it into generic summary cards.
- When stronger visuals exist only inside local PDFs, slides, or docs, extract or derive reusable figure assets when feasible and use them to strengthen the page.
- Treat media as evidence, not decoration: each chosen image should improve comprehension of a claim, decision, comparison, or reflection on the page.

## Build, Test, and Development Commands
- `npm install`: install dependencies.
- `npm run dev`: start the local Next.js dev server.
- `npm run build`: create a production build.
- `npm run start`: serve the production build locally.
- `npm run lint`: run the repository linter.

Husky runs `npx lint-staged` on commit and `npm run lint` on push, so contributors should run lint before opening a PR.

## Coding Style & Naming Conventions
Follow `.editorconfig`: tabs for indentation, LF line endings, UTF-8, and a final newline. Use TypeScript throughout the app. Name React components in PascalCase, stores and utilities in camelCase, and keep route file names aligned with Next.js conventions (`page.tsx`, `layout.tsx`).

Use ESLint for consistency. `lint-staged` auto-fixes staged `*.js`, `*.jsx`, `*.ts`, and `*.tsx` files with `eslint --fix`.

## Testing Guidelines
After every code change, run:
- `npm run lint`
- `npm run build`

For UI changes, manually test the affected routes in `npm run dev` and capture screenshots for visual regressions when useful.

## Commit & Pull Request Guidelines
Git history is minimal, so use short imperative commit messages such as `Add project carousel keyboard support` or `Fix timeline overlay scroll lock`. Keep each commit focused.

PRs should include a clear summary, the routes or components touched, linked issues if applicable, and screenshots or short recordings for visible UI changes. Mention any config, asset, or deployment impact explicitly.

## Configuration Notes
Deployment workflow files live in `.github/workflows/`. Keep secrets out of the repo, use local `.env*` files for environment-specific values, and do not commit large generated assets or caches.
