export const SITE_URL = 'https://handyman24.gr'

export const BUSINESS = {
  name: 'HandyMan 24',
  legalName: 'HandyMan 24 - Κολπαξίδης Κωνσταντίνος',
  telephone: '+30-694-9214461',
  telephoneDisplay: '+30 694 921 4461',
  email: 'handyman24gr@gmail.com',
  logo: `${SITE_URL}/icons/android-chrome-192x192.png`,
  image: `${SITE_URL}/metaimg.jpg`,
  priceRange: '€€',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Πλ. Ιπποδαμείας 8, Γραφείο Δ8',
    postalCode: '18531',
    addressLocality: 'Πειραιάς',
    addressRegion: 'Αττική',
    addressCountry: 'GR',
  },
  sameAs: [
    'https://www.facebook.com/share/1FyUjq1AGd/',
    'https://instagram.com/handyman24.gr',
    'https://wa.me/306949214461',
  ],
}

export const SERVICE_AREAS = [
  'Αθήνα',
  'Πειραιάς',
  'Νίκαια',
  'Γλυφάδα',
  'Χαλάνδρι',
  'Κηφισιά',
  'Περιστέρι',
  'Μαρούσι',
  'Ζωγράφου',
  'Καλλιθέα',
  'Αττική',
]

export const stripTags = (value = '') =>
  value.toString().replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()

export const canonicalUrl = (path = '/') => `${SITE_URL}${path === '/' ? '' : path}`

export const createOpeningHours = () => [
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '00:00',
    closes: '23:59',
  },
]

export const createLocalBusinessSchema = (overrides = {}) => ({
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'Electrician', 'HomeAndConstructionBusiness', 'ProfessionalService'],
  '@id': `${SITE_URL}/#localbusiness`,
  name: BUSINESS.name,
  legalName: BUSINESS.legalName,
  url: SITE_URL,
  image: BUSINESS.image,
  logo: BUSINESS.logo,
  telephone: BUSINESS.telephone,
  email: BUSINESS.email,
  priceRange: BUSINESS.priceRange,
  address: BUSINESS.address,
  areaServed: SERVICE_AREAS,
  openingHoursSpecification: createOpeningHours(),
  sameAs: BUSINESS.sameAs,
  ...overrides,
})

export const createServiceSchema = ({
  name,
  serviceType,
  description,
  path,
  services = [],
  providerType = 'HomeAndConstructionBusiness',
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${canonicalUrl(path)}#service`,
  name,
  serviceType,
  description: stripTags(description),
  url: canonicalUrl(path),
  areaServed: SERVICE_AREAS,
  provider: {
    '@type': providerType,
    '@id': `${SITE_URL}/#localbusiness`,
    name: BUSINESS.name,
    telephone: BUSINESS.telephone,
    email: BUSINESS.email,
    address: BUSINESS.address,
  },
  offers: {
    '@type': 'Offer',
    url: canonicalUrl(path),
    availability: 'https://schema.org/InStock',
    priceCurrency: 'EUR',
  },
  hasOfferCatalog: services.length
    ? {
        '@type': 'OfferCatalog',
        name,
        itemListElement: services.map((service, index) => ({
          '@type': 'Offer',
          position: index + 1,
          itemOffered: {
            '@type': 'Service',
            name: stripTags(service),
          },
        })),
      }
    : undefined,
})

export const createBreadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: canonicalUrl(item.path),
  })),
})
