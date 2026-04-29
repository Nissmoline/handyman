import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import el from '../i18n/el.js'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDir = path.join(rootDir, 'dist')
const indexPath = path.join(distDir, 'index.html')
const baseHtml = await readFile(indexPath, 'utf8')

const siteUrl = 'https://handyman24.gr'
const imageUrl = `${siteUrl}/metaimg.jpg`
const business = {
  name: 'Handyman24',
  telephone: '+30-694-9214461',
  email: 'handyman24gr@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Πλ. Ιπποδαμείας 8, Γραφείο Δ8',
    postalCode: '18531',
    addressLocality: 'Πειραιάς',
    addressRegion: 'Αττική',
    addressCountry: 'GR',
  },
}

const routes = [
  {
    path: '/electrician',
    seoKey: 'electrician',
    serviceKey: 'electricianPage.schema.serviceName',
    serviceTypeKey: 'electricianPage.schema.serviceType',
  },
  {
    path: '/ilektrologos-24-ores',
    seoKey: 'urgentElectrician',
    serviceKey: 'urgentElectricianPage.schema.serviceName',
    serviceTypeKey: 'urgentElectricianPage.schema.serviceType',
    faqKey: 'urgentElectricianPage.faq.items',
  },
  { path: '/plumber', seoKey: 'plumber', serviceKey: 'plumberPage.schema.serviceName', serviceTypeKey: 'plumberPage.schema.serviceType' },
  { path: '/tiling', seoKey: 'tiling', serviceKey: 'tilingPage.schema.serviceName', serviceTypeKey: 'tilingPage.schema.serviceType' },
  { path: '/painting', seoKey: 'painting', serviceKey: 'paintingPage.schema.serviceName', serviceTypeKey: 'paintingPage.schema.serviceType' },
  { path: '/carpentry', seoKey: 'carpentry', serviceKey: 'carpentryPage.schema.serviceName', serviceTypeKey: 'carpentryPage.schema.serviceType' },
  { path: '/renovations', seoKey: 'renovations', serviceKey: 'renovationsPage.schema.serviceName', serviceTypeKey: 'renovationsPage.schema.serviceType' },
  { path: '/maintenance', seoKey: 'maintenance', serviceKey: 'maintenancePage.schema.serviceName', serviceTypeKey: 'maintenancePage.schema.serviceType' },
  { path: '/yacht-repair', seoKey: 'yachtRepair', serviceKey: 'yachtRepairPage.schema.serviceName', serviceTypeKey: 'yachtRepairPage.schema.serviceType' },
  { path: '/offers', seoKey: 'offers', serviceName: 'Προσφορές ηλεκτρολόγου Αθήνα', serviceType: 'Προσφορές ηλεκτρολογικών εργασιών' },
  { path: '/electrician-faq', seoKey: 'electricianFaq', faqKey: 'electricianFaq.faqs' },
  { path: '/electrician-reviews', seoKey: 'electricianReviews' },
  { path: '/privacy-policy', seoKey: 'privacy' },
  { path: '/impressum', seoKey: 'impressum' },
]

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

const routeMeta = (route) => ({
  ...route,
  title: get(el, `seo.${route.seoKey}.title`, 'Handyman24'),
  description: get(el, `seo.${route.seoKey}.description`, get(el, 'seo.default.description')),
  serviceName: route.serviceName || get(el, route.serviceKey || '', ''),
  serviceType: route.serviceType || get(el, route.serviceTypeKey || '', ''),
  faqItems: route.faqKey ? get(el, route.faqKey, []) : [],
})

const routeSchema = (route) => {
  const canonical = `${siteUrl}${route.path}`
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Αρχική', item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: route.serviceName || route.title, item: canonical },
    ],
  }

  const graph = [breadcrumb]

  if (route.serviceName) {
    graph.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${canonical}#service`,
      name: route.serviceName,
      serviceType: route.serviceType || route.serviceName,
      description: route.description,
      url: canonical,
      areaServed: ['Αθήνα', 'Πειραιάς', 'Αττική'],
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

  return graph
}

const applyRouteMeta = (html, route) => {
  const canonical = `${siteUrl}${route.path}`
  let output = html

  output = replaceOrInsert(output, /<title>[\s\S]*?<\/title>/i, `<title>${escapeAttr(route.title)}</title>`)
  output = replaceOrInsert(output, /<meta name="description" content="[^"]*"\s*\/?>/i, `<meta name="description" content="${escapeAttr(route.description)}">`)
  output = replaceOrInsert(output, /<link rel="canonical" href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${canonical}">`)
  output = replaceOrInsert(output, /<link rel="alternate" hreflang="el" href="[^"]*"\s*\/?>/i, `<link rel="alternate" hreflang="el" href="${canonical}">`)
  output = replaceOrInsert(output, /<link rel="alternate" hreflang="x-default" href="[^"]*"\s*\/?>/i, `<link rel="alternate" hreflang="x-default" href="${canonical}">`)
  output = replaceOrInsert(output, /<meta property="og:title" content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${escapeAttr(route.title)}">`)
  output = replaceOrInsert(output, /<meta property="og:description" content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${escapeAttr(route.description)}">`)
  output = replaceOrInsert(output, /<meta property="og:url" content="[^"]*"\s*\/?>/i, `<meta property="og:url" content="${canonical}">`)
  output = replaceOrInsert(output, /<meta property="og:image" content="[^"]*"\s*\/?>/i, `<meta property="og:image" content="${imageUrl}">`)
  output = replaceOrInsert(output, /<meta name="twitter:title" content="[^"]*"\s*\/?>/i, `<meta name="twitter:title" content="${escapeAttr(route.title)}">`)
  output = replaceOrInsert(output, /<meta name="twitter:description" content="[^"]*"\s*\/?>/i, `<meta name="twitter:description" content="${escapeAttr(route.description)}">`)
  output = replaceOrInsert(output, /<meta name="twitter:image" content="[^"]*"\s*\/?>/i, `<meta name="twitter:image" content="${imageUrl}">`)

  output = output.replace('</head>', `<script type="application/ld+json">${JSON.stringify(routeSchema(route))}</script>\n</head>`)
  return output
}

for (const route of routes.map(routeMeta)) {
  const routeDir = path.join(distDir, route.path.slice(1))
  await mkdir(routeDir, { recursive: true })
  await writeFile(path.join(routeDir, 'index.html'), applyRouteMeta(baseHtml, route), 'utf8')
}

console.log(`Generated static SEO HTML for ${routes.length} routes.`)
