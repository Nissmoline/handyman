import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import el from '../i18n/el.js'
import { electricianSeoContent } from '../data/electricianSeoContent.js'

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
const electricianImages = electricianSeoContent.photos.map((photo) => `${siteUrl}${photo.src}`)

const business = {
  name: 'Handyman24',
  telephone: '+30-694-9214461',
  email: 'handyman24gr@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Φυλής 153, Άγιος Παντελεήμονας',
    postalCode: '11251',
    addressLocality: 'Αθήνα',
    addressRegion: 'Αττική',
    addressCountry: 'GR',
  },
}

const get = (source, dottedPath, fallback = '') =>
  dottedPath
    .split('.')
    .reduce((value, key) => (value && Object.hasOwn(value, key) ? value[key] : undefined), source) ?? fallback

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

const translatedRoute = ({
  path: routePath,
  seoKey,
  serviceKey,
  serviceTypeKey,
  faqKey,
  faqItems,
  reviewGuide,
  problemGuides,
  costFactors,
  callChecklist,
  scenarioGuides,
  images,
  priority = 0.8,
  changefreq = 'weekly',
}) => ({
  path: routePath,
  title: get(el, `seo.${seoKey}.title`, get(el, 'seo.default.title')),
  description: get(el, `seo.${seoKey}.description`, get(el, 'seo.default.description')),
  serviceName: serviceKey ? get(el, serviceKey, '') : '',
  serviceType: serviceTypeKey ? get(el, serviceTypeKey, '') : '',
  faqItems: faqItems || (faqKey ? get(el, faqKey, []) : []),
  reviewGuide,
  problemGuides,
  costFactors,
  callChecklist,
  scenarioGuides,
  images,
  priority,
  changefreq,
})

const routes = [
  {
    path: '/',
    title: get(el, 'seo.home.title'),
    description: get(el, 'seo.home.description'),
    images: [imageUrl, `${siteUrl}/electrician.png`],
    priority: 1,
    changefreq: 'daily',
  },
  translatedRoute({
    path: '/electrician',
    seoKey: 'electrician',
    serviceKey: 'electricianPage.schema.serviceName',
    serviceTypeKey: 'electricianPage.schema.serviceType',
    faqItems: electricianSeoContent.faq.items,
    reviewGuide: electricianSeoContent.reviewGuide,
    problemGuides: electricianSeoContent.problemGuides,
    costFactors: electricianSeoContent.costFactors,
    callChecklist: electricianSeoContent.callChecklist,
    scenarioGuides: electricianSeoContent.scenarioGuides,
    images: electricianImages,
    priority: 0.96,
    changefreq: 'daily',
  }),
  translatedRoute({ path: '/offers', seoKey: 'offers', priority: 0.72, changefreq: 'weekly' }),
  translatedRoute({ path: '/electrician-faq', seoKey: 'electricianFaq', faqKey: 'electricianFaq.faqs', priority: 0.72, changefreq: 'weekly' }),
  translatedRoute({ path: '/electrician-reviews', seoKey: 'electricianReviews', priority: 0.62, changefreq: 'monthly' }),
  translatedRoute({ path: '/plumber', seoKey: 'plumber', serviceKey: 'plumberPage.schema.serviceName', serviceTypeKey: 'plumberPage.schema.serviceType' }),
  translatedRoute({ path: '/tiling', seoKey: 'tiling', serviceKey: 'tilingPage.schema.serviceName', serviceTypeKey: 'tilingPage.schema.serviceType' }),
  translatedRoute({ path: '/painting', seoKey: 'painting', serviceKey: 'paintingPage.schema.serviceName', serviceTypeKey: 'paintingPage.schema.serviceType' }),
  translatedRoute({ path: '/carpentry', seoKey: 'carpentry', serviceKey: 'carpentryPage.schema.serviceName', serviceTypeKey: 'carpentryPage.schema.serviceType' }),
  translatedRoute({ path: '/renovations', seoKey: 'renovations', serviceKey: 'renovationsPage.schema.serviceName', serviceTypeKey: 'renovationsPage.schema.serviceType' }),
  translatedRoute({ path: '/maintenance', seoKey: 'maintenance', serviceKey: 'maintenancePage.schema.serviceName', serviceTypeKey: 'maintenancePage.schema.serviceType' }),
  translatedRoute({ path: '/yacht-repair', seoKey: 'yachtRepair', serviceKey: 'yachtRepairPage.schema.serviceName', serviceTypeKey: 'yachtRepairPage.schema.serviceType' }),
  translatedRoute({ path: '/privacy-policy', seoKey: 'privacy', priority: 0.35, changefreq: 'yearly' }),
  translatedRoute({ path: '/impressum', seoKey: 'impressum', priority: 0.35, changefreq: 'yearly' }),
]

const sitemapEntries = routes

const routeSchema = (route) => {
  const canonical = canonicalFor(route.path)
  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'Electrician', 'HomeAndConstructionBusiness', 'ProfessionalService'],
    '@id': `${siteUrl}/#localbusiness`,
    name: 'Handyman24 - Ηλεκτρολόγος Αθήνα',
    url: `${siteUrl}/`,
    image: [imageUrl, ...electricianImages],
    logo: `${siteUrl}/icons/android-chrome-192x192.png`,
    telephone: business.telephone,
    email: business.email,
    priceRange: '€€',
    address: business.address,
    areaServed: ['Αθήνα', 'Πειραιάς', 'Γλυφάδα', 'Χαλάνδρι', 'Περιστέρι', 'Κηφισιά', 'Αττική'],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    sameAs: [
      'https://www.facebook.com/share/1FyUjq1AGd/',
      'https://instagram.com/handyman24.gr',
      'https://wa.me/306949214461',
    ],
  }
  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    name: 'Handyman24 - Ηλεκτρολόγος Αθήνα',
    url: `${siteUrl}/`,
    inLanguage: 'el',
  }
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: 'Handyman24',
    url: `${siteUrl}/`,
    logo: `${siteUrl}/icons/android-chrome-192x192.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: business.telephone,
      contactType: 'customer service',
      areaServed: 'GR',
      availableLanguage: ['el', 'en'],
    },
  }
  const breadcrumbItems = [
    { '@type': 'ListItem', position: 1, name: 'Αρχική', item: `${siteUrl}/` },
  ]

  if (route.path !== '/') {
    breadcrumbItems.push({ '@type': 'ListItem', position: 2, name: route.serviceName || route.title, item: canonical })
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems,
  }

  const graph = [localBusiness, website, organization, breadcrumb]

  if (route.serviceName) {
    graph.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${canonical}#service`,
      name: route.serviceName,
      serviceType: route.serviceType || route.serviceName,
      description: route.description,
      image: route.images?.length ? route.images : imageUrl,
      url: canonical,
      areaServed: route.areaServed || ['Αθήνα', 'Πειραιάς', 'Αττική'],
      provider: {
        '@type': 'HomeAndConstructionBusiness',
        '@id': `${siteUrl}/#localbusiness`,
        ...business,
      },
    })
  }

  if (Array.isArray(route.faqItems) && route.faqItems.length) {
    graph.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${canonical}#faq`,
      mainEntity: route.faqItems.map((item) => ({
        '@type': 'Question',
        name: stripTags(item.question),
        acceptedAnswer: {
          '@type': 'Answer',
          text: stripTags(item.answer),
        },
      })),
    })
  }

  if (Array.isArray(route.reviewGuide?.items) && route.reviewGuide.items.length) {
    graph.push({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      '@id': `${canonical}#review-guide`,
      name: stripTags(route.reviewGuide.title),
      description: stripTags(route.reviewGuide.note),
      itemListElement: route.reviewGuide.items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: stripTags(`${item.area} - ${item.service}`),
        description: stripTags(`${item.heading}. ${item.text}`),
      })),
    })
  }

  if (Array.isArray(route.problemGuides?.items) && route.problemGuides.items.length) {
    graph.push({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      '@id': `${canonical}#common-electrical-problems`,
      name: stripTags(route.problemGuides.title),
      description: stripTags((route.problemGuides.intro || []).join(' ')),
      itemListElement: route.problemGuides.items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: stripTags(item.title),
        description: stripTags((item.paragraphs || []).join(' ')),
      })),
    })
  }

  if (Array.isArray(route.costFactors?.items) && route.costFactors.items.length) {
    graph.push({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      '@id': `${canonical}#electrician-cost-factors`,
      name: stripTags(route.costFactors.title),
      description: stripTags((route.costFactors.intro || []).join(' ')),
      itemListElement: route.costFactors.items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: stripTags(item.title),
        description: stripTags(item.text),
      })),
    })
  }

  if (Array.isArray(route.callChecklist?.items) && route.callChecklist.items.length) {
    graph.push({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      '@id': `${canonical}#electrician-call-checklist`,
      name: stripTags(route.callChecklist.title),
      description: stripTags((route.callChecklist.intro || []).join(' ')),
      itemListElement: route.callChecklist.items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: stripTags(item.title),
        description: stripTags(item.text),
      })),
    })
  }

  if (Array.isArray(route.scenarioGuides?.items) && route.scenarioGuides.items.length) {
    graph.push({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      '@id': `${canonical}#area-electrical-services`,
      name: stripTags(route.scenarioGuides.title),
      description: stripTags((route.scenarioGuides.intro || []).join(' ')),
      itemListElement: route.scenarioGuides.items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: stripTags(`${item.area} - ${item.issue}`),
        description: stripTags(item.text),
      })),
    })
  }

  return graph
}

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

  output = output.replace('</head>', `<script id="static-seo-jsonld" type="application/ld+json">${JSON.stringify(routeSchema(route))}</script>\n</head>`)
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
