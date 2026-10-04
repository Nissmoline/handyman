import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { seoRoutes as routes, schemaForPath } from '../utils/pageSeo.js'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDir = path.join(rootDir, 'dist')
const indexPath = path.join(distDir, 'index.html')
const serverEntryPath = path.join(rootDir, 'dist-ssr', 'entry-server.js')
const { render } = await import(pathToFileURL(serverEntryPath).href)
const assetManifest = JSON.parse(await readFile(path.join(distDir, '.vite', 'ssr-manifest.json'), 'utf8'))
const renderPage = async (routePath) => {
  const { html, modules } = await render(routePath)
  // Lazy route CSS must be present before JavaScript runs, including for crawlers.
  const styles = new Set(modules.flatMap((module) => assetManifest[module] || []).filter((asset) => asset.endsWith('.css')))
  return { html, styles: [...styles].map((href) => `<link rel="stylesheet" href="${href}">`).join('\n') }
}
const rawBaseHtml = await readFile(indexPath, 'utf8')
const baseHtml = rawBaseHtml.replace(/\s*<script\s+type="application\/ld\+json">[\s\S]*?<\/script>\s*/gi, '\n')

const siteUrl = 'https://www.handyman24.gr'
const imageUrl = `${siteUrl}/metaimg.jpg`
const stripTags = (value = '') => value.toString().replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()

const escapeAttr = (value = '') =>
  stripTags(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const replaceOrInsert = (html, pattern, replacement) => {
  if (pattern.test(html)) {
    return html.replace(pattern, replacement)
  }
  return html.replace('</head>', `${replacement}\n</head>`)
}

const canonicalFor = (routePath) => (routePath === '/' ? `${siteUrl}/` : `${siteUrl}${routePath}`)
const sitemapEntries = routes

const applyRouteMeta = (html, route) => {
  const canonical = canonicalFor(route.path)
  let output = html

  output = replaceOrInsert(output, /<title>[\s\S]*?<\/title>/i, `<title>${escapeAttr(route.title)}</title>`)
  output = replaceOrInsert(output, /<meta name="description" content="[^"]*"\s*\/?>/i, `<meta name="description" content="${escapeAttr(route.description)}">`)
  output = output.replace(/\s*<meta name="keywords" content="[^"]*"\s*\/?>/i, '')
  output = replaceOrInsert(output, /<meta name="robots" content="[^"]*"\s*\/?>/i, '<meta name="robots" content="index, follow, max-image-preview:large">')
  output = replaceOrInsert(output, /<link rel="canonical" href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${canonical}">`)
  output = replaceOrInsert(output, /<link rel="alternate" hreflang="el" href="[^"]*"\s*\/?>/i, `<link rel="alternate" hreflang="el" href="${canonical}">`)
  output = replaceOrInsert(output, /<link rel="alternate" hreflang="x-default" href="[^"]*"\s*\/?>/i, `<link rel="alternate" hreflang="x-default" href="${canonical}">`)
  output = replaceOrInsert(output, /<meta property="og:title" content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${escapeAttr(route.title)}">`)
  output = replaceOrInsert(output, /<meta property="og:description" content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${escapeAttr(route.description)}">`)
  output = replaceOrInsert(output, /<meta property="og:url" content="[^"]*"\s*\/?>/i, `<meta property="og:url" content="${canonical}">`)
  output = replaceOrInsert(output, /<meta property="og:image" content="[^"]*"\s*\/?>/i, `<meta property="og:image" content="${route.images?.[0] || imageUrl}">`)
  output = replaceOrInsert(output, /<meta name="twitter:title" content="[^"]*"\s*\/?>/i, `<meta name="twitter:title" content="${escapeAttr(route.title)}">`)
  output = replaceOrInsert(output, /<meta name="twitter:description" content="[^"]*"\s*\/?>/i, `<meta name="twitter:description" content="${escapeAttr(route.description)}">`)
  output = replaceOrInsert(output, /<meta name="twitter:image" content="[^"]*"\s*\/?>/i, `<meta name="twitter:image" content="${route.images?.[0] || imageUrl}">`)

  if (route.preloadImage) {
    output = output.replace('</head>', `<link rel="preload" as="image" href="${escapeAttr(route.preloadImage)}" fetchpriority="high">\n</head>`)
  }

  output = output.replace('</head>', `<script id="static-seo-jsonld" type="application/ld+json">${JSON.stringify(schemaForPath(route.path)).replace(/</g, '\\u003c')}</script>\n</head>`)
  return output
}

for (const route of routes) {
  const page = await renderPage(route.path)
  const routeHtml = applyRouteMeta(baseHtml, route)
    .replace('</head>', `${page.styles}\n</head>`)
    .replace('<div id="app"></div>', `<div id="app">${page.html}</div>`)

  if (route.path === '/') {
    await writeFile(indexPath, routeHtml, 'utf8')
    continue
  }

  const routeDir = path.join(distDir, route.path.slice(1))
  await mkdir(routeDir, { recursive: true })
  await writeFile(path.join(routeDir, 'index.html'), routeHtml, 'utf8')
}

const notFoundRoute = {
  path: '/__not-found__',
  title: '404 | Handyman24',
  description: 'Η σελίδα που ζητήσατε δεν βρέθηκε.',
}
const notFoundPage = await renderPage(notFoundRoute.path)
let notFoundHtml = applyRouteMeta(baseHtml, notFoundRoute)
  .replace('</head>', `${notFoundPage.styles}\n</head>`)
  .replace('<div id="app"></div>', `<div id="app">${notFoundPage.html}</div>`)
  .replace(/\s*<link rel="canonical"[^>]*>/i, '')
  .replace(/\s*<link rel="alternate" hreflang="(?:el|x-default)"[^>]*>/gi, '')
  .replace(/<meta name="robots" content="[^"]*"\s*\/?>/i, '<meta name="robots" content="noindex, follow">')
  .replace(/\s*<script id="static-seo-jsonld"[\s\S]*?<\/script>/i, '')
await writeFile(path.join(distDir, '404.html'), notFoundHtml, 'utf8')

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries
  .map(
    (route) => `  <url>
    <loc>${canonicalFor(route.path)}</loc>
    <changefreq>${route.changefreq || 'weekly'}</changefreq>
    <priority>${Number(route.priority ?? 0.8).toFixed(2)}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`

const imagePages = routes
  .filter((route) => route.images?.length)
  .map((route) => ({
    loc: canonicalFor(route.path),
    images: route.images,
  }))

const imageSitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${imagePages
  .map(
    (page) => `  <url>
    <loc>${page.loc}</loc>
${page.images
  .map((image) => `    <image:image>
      <image:loc>${image}</image:loc>
    </image:image>`)
  .join('\n')}
  </url>`
  )
  .join('\n')}
</urlset>
`

await writeFile(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf8')
await writeFile(path.join(distDir, 'sitemap_images.xml'), imageSitemapXml, 'utf8')

console.log(`Generated prerendered SEO HTML for ${routes.length} routes plus 404.html.`)
console.log(`Generated sitemap.xml with ${sitemapEntries.length} canonical URLs and sitemap_images.xml.`)
