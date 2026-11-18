# Intercept for Windows

Public landing page and Windows installer distribution for Intercept.

- [Landing page](https://tanzir71.github.io/intercept-releases/)
- [Download for Windows](https://tanzir71.github.io/intercept-releases/download.html)
- [Release notes](https://tanzir71.github.io/intercept-releases/releases.html)
- [Security brief](https://tanzir71.github.io/intercept-releases/security.html)
- [Preview availability and limitations](https://tanzir71.github.io/intercept-releases/docs.html)

This is a prerelease for Windows 11 x64. Product screens on the landing page show sample data and the approved V5 design; some designed features remain in development. The installer does not establish passing physical or real-agent calibration.

The public repository contains the website source, self-hosted assets, release notes and installer checksums. The desktop implementation repository is currently private. Publishing this distribution repository does not publish that private history or its QA profiles.

## Build the page

Use Node 24, run `npm ci`, then `npm run build` and `npm run check`. Commit all generated root `*.html` files and `site.css` after a website change. GitHub Pages serves `main` from `/`. CI rebuilds and checks every generated page.

The landing keeps its original design import. The thirteen Handover 7 subpages use shared build-time JSX components and semantic content blocks in `src/content/`, with ordinary CSS in `src/site.css`. No React, Tailwind, analytics, external font service or API requests run in the delivered pages. `site.js` adds copy controls and section highlighting; navigation, install guidance and the download redirect work without JavaScript.

`src/` follows the owner-approved Figma design, including the centered November 18 hero. The product previews are labelled sample data. `scripts/localize-assets.py` records the initial asset import; all needed assets are already committed and rebuilding does not require Figma access.

The eight subpage product panels are lossless 2× WebP exports. Their node IDs, dimensions and checksums are in `assets/subpages/manifest.json`. `design/landing-subpages-layout.json` records the supplied 1440 px structural bounds and 2 px tolerance. Release entries grow with the actual release notes.

For optional browser verification, use Electron 44.4.5 to run `scripts/verify.cjs .build/verification` (for example, `npx --yes --package=electron@44.4.5 electron scripts/verify.cjs .build/verification`). It checks desktop/mobile rendering, links, layout bounds, copy controls, section highlighting, the no-JavaScript download and the landing hero. It uses an isolated browser profile and mocks clipboard writes.

## Release policy

Publish Windows installers here, with an exact SHA-256 and `binary-provenance.json`. Keep their version and limitations explicit. Tags in this repository identify the public distribution commit; the provenance file separately identifies the desktop binary's source commit. Never package the private repository, local user history, profiles, tokens, native calibration records or internal QA artifacts as public release assets.

`release-config.json` is the website's canonical release record: version, release date and installer name, byte count and SHA-256. Add the matching `releases/<version>.md`, update `latest`, and rebuild. The landing, download page, documentation, verification commands and release history consume that record. `npm run check` refuses a latest installer that differs from `binary-provenance.json`.

The original 24-hour completion target elapsed with full V5 unfinished. Usable previews and repository updates continue; extensive regression and physical matrices are optional, with skipped checks identified as not run.
