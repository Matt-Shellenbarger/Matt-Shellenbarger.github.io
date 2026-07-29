---
name: GitHub SSH setup
description: SSH key and known_hosts configured for pushing to GitHub from this Replit workspace.
---

## Rule
Use SSH remote URLs (`git@github.com:...`) for all GitHub push operations — HTTPS is rejected by GitHub for git operations.

**Why:** GitHub dropped HTTPS password/token auth for git push. Replit's OAuth token also lacks push scope. SSH key at `~/.ssh/id_ed25519` was generated and added to the Matt-Shellenbarger GitHub account on 2026-07-29.

**How to apply:** Remote `origin` is already set to SSH. If it ever reverts to HTTPS, run:
`git remote set-url origin git@github.com:Matt-Shellenbarger/<repo>.git`
GitHub's host key is already in `~/.ssh/known_hosts`.
