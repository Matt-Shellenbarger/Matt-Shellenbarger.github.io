---
name: GitHub Pages deployment
description: How the portfolio deploys to GitHub Pages via GitHub Actions.
---

## Rule
`BASE_PATH` in `.github/workflows/deploy.yml` must be `"/"` because the repo is a GitHub user site (`Matt-Shellenbarger.github.io`), served at the root domain.

**Why:** GitHub user sites (repo named `<username>.github.io`) are served at `https://<username>.github.io/` with no path prefix. Subproject sites need a path like `/repo-name/`.

**How to apply:** If the repo is ever moved or a new deploy workflow is created, keep `BASE_PATH: "/"`. The Vite config reads this at build time via `process.env.BASE_PATH`.

Repo: `git@github.com:Matt-Shellenbarger/Matt-Shellenbarger.github.io.git`
Live URL: https://matt-shellenbarger.github.io/
Pages source: GitHub Actions (must be set in repo Settings → Pages after any rename).
