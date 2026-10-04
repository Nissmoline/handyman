import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { seoRoutes, schemaForPath, syncPageSchema } from '../utils/pageSeo.js'
import en from '../i18n/en.js'
import { createI18nInstance } from '../i18n/index.js'

test('Vue translations preserve complete SEO titles after hydration', () => {
  const { t } = createI18nInstance('el').global
  for (const route of seoRoutes) {
    assert.equal(t(`seo.${route.seoKey || 'home'}.title`), route.title, route.path)
  }
})

test('generated pages and hydrated pages expose the same complete graph', async () => {
  for (const route of seoRoutes) {
    const file = route.path === '/' ? 'dist/index.html' : `dist${route.path}/index.html`
    const html = await readFile(file, 'utf8')
    const graph = JSON.parse(html.match(/id="static-seo-jsonld"[^>]*>([\s\S]*?)<\/script>/)[1])
    assert.deepEqual(graph, schemaForPath(route.path), route.path)
    assert.equal(graph.filter((node) => Array.isArray(node['@type']) && node['@type'].includes('Electrician')).length, 1)
    assert.ok(graph.some((node) => node['@type'] === 'WebSite'))
    const breadcrumb = graph.find((node) => node['@type'] === 'BreadcrumbList')
    assert.equal(breadcrumb.itemListElement.at(-1).item, `https://www.handyman24.gr${route.path}`)
  }
})

test('navigation replaces the graph, clears unknown pages, and restores it', () => {
  let scripts = []
  const document = {
    querySelector: () => scripts[0],
    createElement: () => ({ remove() { scripts = scripts.filter((item) => item !== this) } }),
    head: { appendChild(script) { scripts.push(script) } },
  }
  for (const route of ['/', '/electrician', '/', '/electrician-faq', '/missing', '/plumber', '/']) {
    const expected = schemaForPath(route)
    syncPageSchema(document, expected)
    assert.equal(scripts.length, expected.length ? 1 : 0, route)
    if (expected.length) assert.deepEqual(JSON.parse(scripts[0].textContent), expected, route)
  }
})

test('English schema matches the translated content and excludes hidden Greek guides', () => {
  const graph = schemaForPath('/electrician', en, 'en')
  assert.equal(graph.find((node) => node['@type'] === 'WebSite').inLanguage, 'en')
  assert.equal(graph.find((node) => node['@type'] === 'Service').name, en.electricianPage.schema.serviceName)
  assert.ok(!graph.some((node) => ['FAQPage', 'ItemList'].includes(node['@type'])))
  assert.equal(schemaForPath('/electrician-faq', en, 'en').find((node) => node['@type'] === 'FAQPage').mainEntity.length, en.electricianFaq.faqs.length)
})
