import el from '../i18n/el.js'
import { electricianSeoContent } from '../data/electricianSeoContent.js'

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
  preloadImage,
  priority = 0.8,
  changefreq = 'weekly',
}) => ({
  path: routePath,
  seoKey,
  serviceKey,
  serviceTypeKey,
  faqKey,
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
  preloadImage,
  priority,
  changefreq,
})

export const seoRoutes = [
  {
    path: '/',
    title: get(el, 'seo.home.title'),
    description: get(el, 'seo.home.description'),
    images: [imageUrl, `${siteUrl}/electrician.png`],
    preloadImage: '/electrician.png',
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
    preloadImage: '/photos/Electrichandyman8.jpg',
    priority: 0.96,
    changefreq: 'daily',
  }),
  translatedRoute({ path: '/offers', seoKey: 'offers', serviceKey: 'offersPage.title', priority: 0.72, changefreq: 'weekly' }),
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

export const createPageSchema = (route) => {
  const canonical = canonicalFor(route.path)
  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'Electrician', 'HomeAndConstructionBusiness', 'ProfessionalService'],
    '@id': `${siteUrl}/#localbusiness`,
    name: 'Handyman24',
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
    name: 'Handyman24',
    url: `${siteUrl}/`,
    inLanguage: route.language || 'el',
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
    { '@type': 'ListItem', position: 1, name: route.language === 'en' ? 'Home' : 'Αρχική', item: `${siteUrl}/` },
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
    const serviceNames = route.services || []
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
      ...(serviceNames.length ? {
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: route.serviceName,
          itemListElement: serviceNames.map((name) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: stripTags(name) },
          })),
        },
      } : {}),
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

// The browser and generated HTML use one source of structured data.
export const schemaForPath = (routePath, messages = el, language = 'el') => {
  const source = seoRoutes.find((route) => route.path === routePath)
  if (!source) return []
  const route = {
    ...source,
    language,
    title: get(messages, `seo.${source.seoKey || 'home'}.title`, source.title),
    description: get(messages, `seo.${source.seoKey || 'home'}.description`, source.description),
    serviceName: source.serviceKey ? get(messages, source.serviceKey, source.serviceName) : '',
    serviceType: source.serviceTypeKey ? get(messages, source.serviceTypeKey, source.serviceType) : '',
    faqItems: source.faqKey ? get(messages, source.faqKey, []) : source.faqItems,
  }
  const pageKey = source.serviceKey?.split('.')[0]
  route.services = get(messages, `${pageKey}.services.tasks`, get(messages, `${pageKey}.services.list`, []))
  if (routePath === '/offers') {
    route.services = [
      'kitchenHood.cards.kitchenConnection', 'kitchenHood.cards.hoodConnection',
      'kitchenHood.cards.comboSet', 'hoodVentilation.cards.hoodInstallation',
      'hoodVentilation.cards.hoodReplacement',
    ].map((key) => get(messages, `offersPage.sections.${key}.title`)).filter(Boolean)
  }
  if (routePath === '/yacht-repair') {
    route.services = ['electrical', 'furniture', 'flooring'].flatMap((key) => get(messages, `yachtRepairPage.${key}.tasks`, []))
  }
  // These long-form sections are only displayed in Greek.
  if (routePath === '/electrician' && language !== 'el') {
    for (const key of ['faqItems', 'reviewGuide', 'problemGuides', 'costFactors', 'callChecklist', 'scenarioGuides']) {
      delete route[key]
    }
  }
  return createPageSchema(route)
}

export const syncPageSchema = (document, graph) => {
  let script = document.querySelector('#static-seo-jsonld')
  if (!graph.length) {
    script?.remove()
    return
  }
  if (!script) {
    script = document.createElement('script')
    script.id = 'static-seo-jsonld'
    script.type = 'application/ld+json'
    document.head.appendChild(script)
  }
  script.textContent = JSON.stringify(graph).replace(/</g, '\\u003c')
}

