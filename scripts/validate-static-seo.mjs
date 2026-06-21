import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDir = path.join(rootDir, 'dist')
const expectedHost = 'www.handyman24.gr'
const failures = []

const assert = (condition, message) => {
  if (!condition) failures.push(message)
}

const walk = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name)
    if (entry.isDirectory()) files.push(...await walk(entryPath))
    if (entry.isFile()) files.push(entryPath)
  }

  return files
}

const allFiles = await walk(distDir)
const pageFiles = allFiles.filter((file) => path.basename(file) === 'index.html')
const titles = new Map()
const canonicals = new Map()

for (const file of pageFiles) {
  const relative = path.relative(distDir, file) || 'index.html'
  const html = await readFile(file, 'utf8')
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() || ''
  const canonicalMatches = [...html.matchAll(/<link\s+rel="canonical"\s+href="([^"]+)"/gi)]
  const canonical = canonicalMatches[0]?.[1] || ''
  const description = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i)?.[1] || ''
  const robots = html.match(/<meta\s+name="robots"\s+content="([^"]+)"/i)?.[1] || ''
  const body = html.match(/<body[\s\S]*?<\/body>/i)?.[0] || ''
  const bodyText = body
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  const h1Count = (body.match(/<h1\b/gi) || []).length
  const jsonLdBlocks = [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)]

  assert(title.length >= 20 && title.length <= 75, `${relative}: title length is ${title.length}`)
  assert(description.length >= 70 && description.length <= 180, `${relative}: description length is ${description.length}`)
  assert(canonicalMatches.length === 1, `${relative}: expected one canonical, found ${canonicalMatches.length}`)
  assert(canonical.startsWith(`https://${expectedHost}/`), `${relative}: invalid canonical ${canonical}`)
  assert(robots.includes('index') && !robots.includes('noindex'), `${relative}: invalid robots ${robots}`)
  assert(h1Count === 1, `${relative}: expected one H1 in initial HTML, found ${h1Count}`)
  assert(bodyText.length >= 250, `${relative}: initial body content is too short (${bodyText.length})`)
  assert(!html.includes('/ilektrologos-'), `${relative}: disabled local URL remains in generated HTML`)
  assert(jsonLdBlocks.length === 1, `${relative}: expected one static JSON-LD block, found ${jsonLdBlocks.length}`)

  for (const [, json] of jsonLdBlocks) {
    try {
      JSON.parse(json)
    } catch {
      failures.push(`${relative}: invalid JSON-LD`)
    }
  }

  titles.set(title, [...(titles.get(title) || []), relative])
  canonicals.set(canonical, [...(canonicals.get(canonical) || []), relative])
}

for (const [title, files] of titles) {
  assert(files.length === 1, `Duplicate title "${title}" in ${files.join(', ')}`)
}

for (const [canonical, files] of canonicals) {
  assert(files.length === 1, `Duplicate canonical "${canonical}" in ${files.join(', ')}`)
}

const notFoundHtml = await readFile(path.join(distDir, '404.html'), 'utf8')
assert(/<meta\s+name="robots"\s+content="noindex, follow">/i.test(notFoundHtml), '404.html: missing noindex')
assert(!/<link\s+rel="canonical"/i.test(notFoundHtml), '404.html: canonical must be absent')

const sitemap = await readFile(path.join(distDir, 'sitemap.xml'), 'utf8')
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
assert(sitemapUrls.length === pageFiles.length, `Sitemap has ${sitemapUrls.length} URLs for ${pageFiles.length} pages`)
assert(sitemapUrls.every((url) => url.startsWith(`https://${expectedHost}/`)), 'Sitemap contains a non-canonical host')
assert(sitemapUrls.every((url) => !url.includes('/ilektrologos-')), 'Sitemap contains disabled local pages')

const robotsTxt = await readFile(path.join(distDir, 'robots.txt'), 'utf8')
assert(robotsTxt.includes(`Sitemap: https://${expectedHost}/sitemap.xml`), 'robots.txt points to the wrong sitemap host')

if (failures.length) {
  console.error(`SEO validation failed with ${failures.length} issue(s):`)
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exitCode = 1
} else {
  console.log(`SEO validation passed for ${pageFiles.length} prerendered pages plus 404.html.`)
}
