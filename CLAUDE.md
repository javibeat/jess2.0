# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the production website for **Jessica Morari** (jessicamorari.com), a life design and executive coach based in Dubai/UAE. It is a **static multi-page site** (one HTML per route) deployed to GitHub Pages — there is no build system or package.json in this repository.

A previous version was a React SPA with hash routing; that version is preserved on the `legacy-spa-backup` branch.

## No Build Process

There are no `npm install`, `npm run build`, or test commands. Edits are made directly to the deployed HTML/CSS/JS files:

- `index.html`, `about.html`, `work-with-me.html`, `life-design-method.html`, `corporate.html`, `contact.html`, `free-resources.html` — one HTML per route, each with its own SEO metadata, structured data, analytics, nav, and footer
- `css/style.css` — compiled Tailwind CSS (do not hand-edit)
- `js/app.js` — small site script (mobile menu, etc.)
- `images/` — WebP/PNG assets (mobile variants: `*_mobile.webp`)

To preview locally, use VS Code Live Server on port 5501 (configured in `.vscode/settings.json`), or `python3 -m http.server 5502`.

## Tech Stack

- Plain HTML pages with shared nav/footer copied across files
- Compiled Tailwind CSS (`css/style.css`)
- Google Analytics (G-19TXSNYL76) + Meta Pixel on every page
- Calendly inline widget on `contact.html`
- MailerLite embedded form on `free-resources.html`

## Pages / Routes

- `/` (`index.html`) — Homepage
- `/about.html` — About Jessica
- `/work-with-me.html` — Coaching programs (1-on-1, Momentum Sessions, The Lab)
- `/life-design-method.html` — The Life Design Method™ (4 pillars)
- `/corporate.html` — Corporate workshops
- `/contact.html` — Contact + Calendly booking
- `/free-resources.html` — Values Workbook (MailerLite) + podcast/video embeds. Linked from footer Quick Links on every page, plus CTA blocks on Home and Work With Me.

## Shared Markup Across Pages

Every page contains its own copy of:
- `<head>` analytics + Meta Pixel + JSON-LD structured data
- Top fixed `<nav>` (desktop + mobile menu) — when adding/removing menu items, update **all 7 pages**
- Footer with Quick Links — also duplicated across all 7 pages

The active page in the nav is marked with `text-primary border-b-2 border-primary` (desktop) and `text-primary` (mobile).

## SEO & Metadata

Each page has its own canonical URL, Open Graph tags, hreflang (`en-AE`, `en`, `x-default`), and structured data (JSON-LD). When updating business info, credentials, or services, update the JSON-LD on **every page** that references that data, and remember to update `sitemap.xml`.

## Deployment

Push to `main` branch → GitHub Pages auto-deploys. The `CNAME` file maps the domain to `jessicamorari.com`. The `googlebccda506f4623216.html` file is for Google Search Console verification.

## Roadmap (nextLevel.txt)

Planned features: video intro on homepage, testimonial expansion, Life Design Blog, interactive lead-capture quiz, Core Web Vitals monitoring, dark mode, and Arabic language support for Dubai/UAE audience.
