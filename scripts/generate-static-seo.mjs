import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDir = path.join(rootDir, 'dist')
const indexPath = path.join(distDir, 'index.html')
const baseHtml = await readFile(indexPath, 'utf8')

const siteUrl = 'https://handyman24.gr'
const imageUrl = `${siteUrl}/metaimg.jpg`

const routes = [
  {
    path: '/electrician',
    title: 'Ηλεκτρολόγος Αθήνα 24/7 | Βλάβες, Πίνακες, Πρίζες & Εγκαταστάσεις',
    description: 'Ηλεκτρολόγος Αθήνα και Πειραιάς για επείγουσες βλάβες, πίνακες, πρίζες, φωτιστικά, θερμοσίφωνες, κουζίνες, φορτιστές EV και ηλεκτρολογικές ανακαινίσεις.',
    service: 'Ηλεκτρολόγος Αθήνα 24/7',
  },
  {
    path: '/plumber',
    title: 'Υδραυλικός Αθήνα | Διαρροές, Αποφράξεις & Εγκαταστάσεις',
    description: 'Υδραυλικός Αθήνα για διαρροές, αποφράξεις, θερμοσίφωνες, καζανάκια, μπαταρίες, είδη υγιεινής και υδραυλικές εγκαταστάσεις.',
    service: 'Υδραυλικός Αθήνα',
  },
  {
    path: '/tiling',
    title: 'Τοποθέτηση Πλακιδίων Αθήνα | Μπάνιο, Κουζίνα & Δάπεδα',
    description: 'Πλακάς στην Αθήνα για τοποθέτηση πλακιδίων, επισκευή σπασμένων πλακιδίων, αρμολόγηση, στεγανοποίηση αρμών και δάπεδα.',
    service: 'Τοποθέτηση πλακιδίων Αθήνα',
  },
  {
    path: '/painting',
    title: 'Βαψίματα Αθήνα | Εσωτερικοί & Εξωτερικοί Χρωματισμοί',
    description: 'Βαψίματα σπιτιών και επαγγελματικών χώρων στην Αθήνα με προετοιμασία τοίχων, στοκαρίσματα και καθαρό φινίρισμα.',
    service: 'Βαψίματα Αθήνα',
  },
  {
    path: '/carpentry',
    title: 'Ξυλουργός Αθήνα | Επισκευή Επίπλων & Ξυλουργικές Κατασκευές',
    description: 'Ξυλουργικές εργασίες στην Αθήνα για επισκευή επίπλων, ντουλάπια, ειδικές ξύλινες κατασκευές, πόρτες, κάσες και αποθηκευτικές λύσεις.',
    service: 'Ξυλουργικές εργασίες Αθήνα',
  },
  {
    path: '/renovations',
    title: 'Ανακαινίσεις Αθήνα | Μπάνιο, Κουζίνα, Σπίτι & Επαγγελματικοί Χώροι',
    description: 'Ανακαινίσεις στην Αθήνα με συντονισμό ηλεκτρολόγου, υδραυλικού, πλακά, βαψίματος, ξυλουργικών εργασιών και δαπέδων.',
    service: 'Ανακαινίσεις Αθήνα',
  },
  {
    path: '/maintenance',
    title: 'Συντηρήσεις Κτιρίων & Τεχνική Υποστήριξη Αθήνα | Handyman24',
    description: 'Τακτικές συντηρήσεις, μερεμέτια, μικροεπισκευές και τεχνική υποστήριξη για πολυκατοικίες, επιχειρήσεις και κατοικίες στην Αθήνα.',
    service: 'Συντήρηση κτιρίων Αθήνα',
  },
  {
    path: '/yacht-repair',
    title: 'Επισκευή Σκαφών Αθήνα & Πειραιάς | Ηλεκτρολογικά, Έπιπλα, Δάπεδα',
    description: 'Επισκευή σκαφών σε Αθήνα και Πειραιά: ηλεκτρολογικός έλεγχος, πρίζες, αντικατάσταση επίπλων και πλήρης αλλαγή ξύλινων ή άλλων δαπέδων.',
    service: 'Επισκευή σκαφών Αθήνα και Πειραιάς',
  },
  {
    path: '/offers',
    title: 'Προσφορές Ηλεκτρολόγου Αθήνα | Φούρνος, Εστίες & Απορροφητήρας',
    description: 'Προσφορές για σύνδεση εντοιχιζόμενου φούρνου, εστιών και απορροφητήρα από ηλεκτρολόγο στην Αθήνα και την Αττική.',
    service: 'Προσφορές ηλεκτρολόγου Αθήνα',
  },
  {
    path: '/electrician-faq',
    title: 'Συχνές Ερωτήσεις Ηλεκτρολόγου Αθήνα | Handyman24',
    description: 'Ερωτήσεις και απαντήσεις για ηλεκτρολόγο Αθήνα σχετικά με βλάβες, τιμές, εγκαταστάσεις και περιοχές εξυπηρέτησης.',
  },
  {
    path: '/electrician-reviews',
    title: 'Πρότυπα Εξυπηρέτησης Ηλεκτρολόγου Αθήνα | Handyman24',
    description: 'Πώς οργανώνεται η εξυπηρέτηση ηλεκτρολόγου στην Αθήνα: πρώτη επικοινωνία, διάγνωση, ενημέρωση κόστους και συντονισμός εργασιών.',
  },
  {
    path: '/privacy-policy',
    title: 'Πολιτική Απορρήτου & Cookies | Handyman24',
    description: 'Πώς η Handyman24 διαχειρίζεται προσωπικά δεδομένα, cookies και συγκατάθεση σύμφωνα με τον GDPR.',
  },
  {
    path: '/impressum',
    title: 'Impressum & Νομική Ενημέρωση | Handyman24',
    description: 'Στοιχεία επιχείρησης, επικοινωνία και νομική ενημέρωση της Handyman24 για Αθήνα, Πειραιά και Αττική.',
  },
]

const escapeAttr = (value) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const replaceOrInsert = (html, pattern, replacement) => {
  if (pattern.test(html)) {
    return html.replace(pattern, replacement)
  }
  return html.replace('</head>', `${replacement}\n</head>`)
}

const routeSchema = (route) => {
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Αρχική', item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: route.service || route.title, item: `${siteUrl}${route.path}` },
    ],
  }

  if (!route.service) {
    return [breadcrumb]
  }

  return [
    breadcrumb,
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: route.service,
      description: route.description,
      url: `${siteUrl}${route.path}`,
      areaServed: ['Αθήνα', 'Πειραιάς', 'Αττική'],
      provider: {
        '@type': 'HomeAndConstructionBusiness',
        name: 'Handyman24',
        telephone: '+30-694-9214461',
        email: 'handyman24gr@gmail.com',
      },
    },
  ]
}

const applyRouteMeta = (html, route) => {
  const canonical = `${siteUrl}${route.path}`
  let output = html
  output = replaceOrInsert(output, /<title>[\s\S]*?<\/title>/i, `<title>${escapeAttr(route.title)}</title>`)
  output = replaceOrInsert(output, /<meta name="description" content="[^"]*"\s*\/?>/i, `<meta name="description" content="${escapeAttr(route.description)}">`)
  output = replaceOrInsert(output, /<link rel="canonical" href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${canonical}">`)
  output = replaceOrInsert(output, /<meta property="og:title" content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${escapeAttr(route.title)}">`)
  output = replaceOrInsert(output, /<meta property="og:description" content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${escapeAttr(route.description)}">`)
  output = replaceOrInsert(output, /<meta property="og:url" content="[^"]*"\s*\/?>/i, `<meta property="og:url" content="${canonical}">`)
  output = replaceOrInsert(output, /<meta property="og:image" content="[^"]*"\s*\/?>/i, `<meta property="og:image" content="${imageUrl}">`)
  output = replaceOrInsert(output, /<meta name="twitter:title" content="[^"]*"\s*\/?>/i, `<meta name="twitter:title" content="${escapeAttr(route.title)}">`)
  output = replaceOrInsert(output, /<meta name="twitter:description" content="[^"]*"\s*\/?>/i, `<meta name="twitter:description" content="${escapeAttr(route.description)}">`)
  output = replaceOrInsert(output, /<meta name="twitter:image" content="[^"]*"\s*\/?>/i, `<meta name="twitter:image" content="${imageUrl}">`)

  const jsonLd = JSON.stringify(routeSchema(route))
  output = output.replace('</head>', `<script type="application/ld+json">${jsonLd}</script>\n</head>`)
  return output
}

for (const route of routes) {
  const routeDir = path.join(distDir, route.path.slice(1))
  await mkdir(routeDir, { recursive: true })
  await writeFile(path.join(routeDir, 'index.html'), applyRouteMeta(baseHtml, route), 'utf8')
}

console.log(`Generated static SEO HTML for ${routes.length} routes.`)
