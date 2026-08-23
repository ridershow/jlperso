# AGENTS.md

## Cursor Cloud specific instructions

This repo is a static personal resume/portfolio site built with [Eleventy (11ty)](https://www.11ty.dev/). There is a single service (the static site).

Commands (see `package.json` scripts):
- Dev server: `npm start` (runs `eleventy --serve`). Serves at `http://localhost:8080` via Browsersync with live reload and watch. Run it in a background/tmux session since it stays running.
- Build: `npm run build` (runs `eleventy`). Output goes to `public/` (this is the Firebase Hosting `public` dir; do not commit it — it's gitignored).

Caveats / non-obvious notes:
- There is no test suite: `npm test` is a placeholder that intentionally exits with an error. Do not treat it as a real test command.
- No linter is configured.
- Eleventy input is `src/`, output is `public/`, includes are in `src/includes/`, and global data is in `src/global/`. Static assets (`css/`, `js/`, `images/`) are passthrough-copied into `public/assets/`.
- The `utilities/transforms/htmlminify.js` transform exists but is NOT registered in `.eleventy.js`, so `html-minifier` is not exercised by the default build.
- Deployment is via GitHub Actions to Firebase Hosting (`.github/workflows/`); this needs the `FIREBASE_SERVICE_ACCOUNT_JLPERSO_EAC6C` secret and is not runnable locally without Firebase credentials.
- Known content issue (not an environment problem): the "LEARN MORE" work links point to `/experiences/*.html` detail pages that are not generated, so they 404.
