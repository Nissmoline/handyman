import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import el from '../i18n/el.js'
import { createElectricianAreaFaq, electricianAreas } from '../data/electricianAreas.js'
import { electricianSeoContent } from '../data/electricianSeoContent.js'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDir = path.join(rootDir, 'dist')
const indexPath = path.join(distDir, 'index.html')
const rawBaseHtml = await readFile(indexPath, 'utf8')
const baseHtml = rawBaseHtml.replace(/\s*<script\s+type="application\/ld\+json">[\s\S]*?<\/script>\s*/gi, '\n')

const siteUrl = 'https://handyman24.gr'
const lastmod = '2026-05-20'
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
  images,
  priority = 0.8,
  changefreq = 'weekly',
  keywords = [],
}) => ({
  path: routePath,
  title: get(el, `seo.${seoKey}.title`, get(el, 'seo.default.title')),
  description: get(el, `seo.${seoKey}.description`, get(el, 'seo.default.description')),
  serviceName: serviceKey ? get(el, serviceKey, '') : '',
  serviceType: serviceTypeKey ? get(el, serviceTypeKey, '') : '',
  faqItems: faqItems || (faqKey ? get(el, faqKey, []) : []),
  reviewGuide,
  images,
  priority,
  changefreq,
  keywords,
})

const areaRoutes = electricianAreas.map((area) => ({
  path: area.path,
  title: area.metaTitle,
  description: area.metaDescription,
  serviceName: `${area.title} 24 ώρες`,
  serviceType: `Ηλεκτρολογικές υπηρεσίες σε ${area.name}`,
  faqItems: createElectricianAreaFaq(area),
  images: [`${siteUrl}/photos/Electrichandyman8.jpg`, imageUrl],
  priority: area.priority ?? 0.8,
  changefreq: area.slug === 'athina' ? 'daily' : 'weekly',
  keywords: area.searchTerms,
  areaServed: [area.name, area.region, 'Αττική'],
}))

const routes = [
  {
    path: '/',
    title: get(el, 'seo.home.title'),
    description: get(el, 'seo.home.description'),
    images: [imageUrl, `${siteUrl}/electrician.png`],
    priority: 1,
    changefreq: 'daily',
    keywords: ['ηλεκτρολόγος Αθήνα', 'ηλεκτρολόγος 24 ώρες', 'ηλεκτρολόγοι Αθήνα'],
  },
  translatedRoute({
    path: '/electrician',
    seoKey: 'electrician',
    serviceKey: 'electricianPage.schema.serviceName',
    serviceTypeKey: 'electricianPage.schema.serviceType',
    faqItems: electricianSeoContent.faq.items,
    reviewGuide: electricianSeoContent.reviewGuide,
    images: electricianImages,
    priority: 0.96,
    changefreq: 'daily',
    keywords: ['ηλεκτρολόγος Αθήνα', 'ηλεκτρολόγοι Αθήνα', 'ηλεκτρολόγος κοντά μου'],
  }),
  translatedRoute({
    path: '/ilektrologos-24-ores',
    seoKey: 'urgentElectrician',
    serviceKey: 'urgentElectricianPage.schema.serviceName',
    serviceTypeKey: 'urgentElectricianPage.schema.serviceType',
    faqKey: 'urgentElectricianPage.faq.items',
    images: electricianImages,
    priority: 0.95,
    changefreq: 'daily',
    keywords: ['ηλεκτρολόγος 24 ώρες', 'ηλεκτρολόγος άμεσα', 'επείγον ηλεκτρολόγος Αθήνα'],
  }),
  ...areaRoutes,
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

const sitemapOnlyRoutes = [
  { path: '/llms.txt', priority: 0.82, changefreq: 'weekly' },
  { path: '/llms-full.txt', priority: 0.82, changefreq: 'weekly' },
  { path: '/ai-profile.json', priority: 0.78, changefreq: 'weekly' },
  { path: '/sitemap_images.xml', priority: 0.5, changefreq: 'weekly' },
]

const sitemapEntries = [...routes, ...sitemapOnlyRoutes]

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
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Αρχική', item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: route.serviceName || route.title, item: canonical },
    ],
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

  return graph
}

const applyRouteMeta = (html, route) => {
  const canonical = canonicalFor(route.path)
  let output = html

  output = replaceOrInsert(output, /<title>[\s\S]*?<\/title>/i, `<title>${escapeAttr(route.title)}</title>`)
  output = replaceOrInsert(output, /<meta name="description" content="[^"]*"\s*\/?>/i, `<meta name="description" content="${escapeAttr(route.description)}">`)
  output = replaceOrInsert(output, /<meta name="keywords" content="[^"]*"\s*\/?>/i, `<meta name="keywords" content="${escapeAttr((route.keywords || []).join(', '))}">`)
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

  output = output.replace('</head>', `<script type="application/ld+json">${JSON.stringify(routeSchema(route))}</script>\n</head>`)
  return output
}

for (const route of routes) {
  const routeHtml = applyRouteMeta(baseHtml, route)

  if (route.path === '/') {
    await writeFile(indexPath, routeHtml, 'utf8')
    continue
  }

  const routeDir = path.join(distDir, route.path.slice(1))
  await mkdir(routeDir, { recursive: true })
  await writeFile(path.join(routeDir, 'index.html'), routeHtml, 'utf8')
}

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries
  .map(
    (route) => `  <url>
    <loc>${canonicalFor(route.path)}</loc>
    <lastmod>${lastmod}</lastmod>
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

console.log(`Generated static SEO HTML for ${routes.length} routes.`)
console.log(`Generated sitemap.xml with ${sitemapEntries.length} URLs and sitemap_images.xml.`)
