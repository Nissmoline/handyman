# SEO changes and deployment checks — 2026-09-06

## Verified on the public site

- `/`, `/electrician`, and `/plumber` return 200 with rendered content, one H1 and a self-referencing canonical.
- `robots.txt` and `sitemap.xml` return 200. An unknown URL returns 404.
- These checks do not establish why Google rankings fell. Search Console access and historical query/page data are required for that diagnosis.

## Changes

- Keep the homepage first screen focused on electrical services instead of rotating to secondary services.
- Replace repeated Greek search phrases with descriptions of actual electrical work and how to arrange a visit.
- Add visible links to emergency repairs, installations, business services and electrical FAQs. Preserve existing service pages and navigation.
- Load route code separately; include each rendered page's CSS in its initial HTML using Vite's SSR manifest.
- Omit sitemap lastmod rather than claiming every page changed on every build.
- Validate sitemap correspondence and rendered stylesheet availability during production builds.

## After deployment

Deploy using the existing main-branch production workflow; this change does not itself publish the site.
Run `npm run build` before deployment. Then inspect `/` and `/electrician` in Search Console, compare live rendered HTML with the indexed version, and request indexing for the updated pages. Submit `https://www.handyman24.gr/sitemap.xml` if not already registered.

In Search Console, compare the last 28 days with the previous period and the equivalent prior-year period, filtering country Greece, mobile/desktop, query and landing page. Start with `ηλεκτρολόγος`, `ηλεκτρολόγος Αθήνα`, `ηλεκτρολόγος Πειραιάς`, and `ηλεκτρολόγος 24 ώρες`. Check indexing exclusions, Google-selected canonicals, manual actions, security issues and Core Web Vitals. Compare changes with deployment dates. Do not infer deindexing from a single search result.

Review Google Business Profile separately for accurate primary electrician category, phone, service areas and real customer reviews. Confirm actual staffed hours and credentials before adding new claims. Track calls and organic enquiries as well as position; code changes cannot guarantee rankings or an indexing deadline.

Reference: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics

## Follow-up audit — 2026-10-03

- The previously added homepage electrical-services section is now visible on the public site.
- Prepared a clearer electrician title and rewrote repetitive search-phrase paragraphs as practical information about arranging a visit. Existing service pages, phone number and local coverage remain available.
- Removed the global image preload. Generated HTML now preloads the homepage image only on `/` and the actual electrician hero only on `/electrician`. Output validation verifies that each preload matches an existing, rendered high-priority image.
- Initial Search Console access used the wrong browser profile. On 2026-10-04, the owner identified the authorized profile and the Handyman24 reports were inspected. Findings are recorded in `SEO-AUDIT.md`.
- Fixed the schema lifecycle: generated HTML and the browser now use `utils/pageSeo.js`. The complete graph updates with the route and language, is removed on unknown pages, and returns on navigation to an indexable page. Removed partial view graphs and the initial-route MutationObserver. Browser navigation and automated regression checks passed. This does not establish the cause of the ranking decline.

The follow-up source changes are local until deployed through the existing production workflow. No ranking improvement is measured or promised by these changes.
