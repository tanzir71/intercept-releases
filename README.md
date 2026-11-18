# Intercept for Windows

Public landing page and Windows installer distribution for Intercept.

- [Landing page](https://tanzir71.github.io/intercept-releases/)
- [Download Preview 10](https://github.com/tanzir71/intercept-releases/releases/tag/v0.3.0-preview.10)
- [Security brief](https://tanzir71.github.io/intercept-releases/security.html)
- [Preview availability and limitations](https://tanzir71.github.io/intercept-releases/docs.html)

This is a prerelease for Windows 11 x64. Product screens on the landing page show sample data and the approved V5 design; some designed features remain in development. The installer does not establish passing physical or real-agent calibration.

The public repository contains the website source, self-hosted assets, release notes and installer checksums. The desktop implementation repository is currently private. Publishing this distribution repository does not publish that private history or its QA profiles.

## Build the page

Use Node 24, run `npm install`, then `npm run build`. The build translates the supplied design styles into ordinary CSS and renders static HTML. No React, Tailwind, analytics, external font service or API requests run in the delivered page. Commit `index.html`, `site.css` and the local assets after a website change. GitHub Pages serves `main` from `/`.

`src/` follows the owner-approved Figma design, including the centered November 18 hero. The product previews are labelled sample data. `scripts/localize-assets.py` records the initial asset import; all needed assets are already committed and rebuilding does not require Figma access.

## Release policy

Publish Windows installers here, with an exact SHA-256 and `binary-provenance.json`. Keep their version and limitations explicit. Tags in this repository identify the public distribution commit; the provenance file separately identifies the desktop binary's source commit. Never package the private repository, local user history, profiles, tokens, native calibration records or internal QA artifacts as public release assets.

The original 24-hour completion target elapsed with full V5 unfinished. Usable previews and repository updates continue; extensive regression and physical matrices are optional, with skipped checks identified as not run.
