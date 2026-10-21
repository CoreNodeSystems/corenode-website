// scripts/prerender.mjs
// Étape finale du build : génère un fichier HTML complet par page publique.
//
// Pourquoi : le site est une application React. Sans cette étape, Google reçoit
// pour /audit exactement le même HTML que pour l'accueil (même titre, même
// description, aucun texte) et doit exécuter le JavaScript pour voir la
// différence. Résultat observé dans Search Console : /audit « Détectée,
// actuellement non indexée » depuis août 2026.
//
// Pour chaque entrée de LIVE_PAGE_KEYS (src/seo/siteMeta.js), ce script :
//   - rend la page en HTML (texte, H1, liens) dans <div id="root">;
//   - écrit dans le <head> le titre, la description, la canonique et les
//     balises Open Graph propres à la page;
//   - génère public/sitemap.xml à jour dans dist/.
//
// Sortie : dist/index.html (accueil) et dist/<chemin>.html (ex. audit.html),
// servis sans extension grâce à "cleanUrls" dans vercel.json.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDir = path.join(root, 'dist')
const serverEntry = path.join(root, 'dist-ssr', 'entry-server.js')

const { render, PAGES, LIVE_PAGE_KEYS, canonicalUrl, SITE_URL } = await import(
  pathToFileURL(serverEntry).href
)

const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8')

const escapeAttr = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

const escapeText = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Remplace l'attribut content d'une balise <meta> existante. Échoue bruyamment
// si la balise a disparu de index.html, pour ne jamais publier une page muette.
function setMeta(html, key, keyValue, content) {
  const re = new RegExp(`(<meta\\s+${key}="${keyValue}"\\s+content=")[^"]*(")`, 's')
  if (!re.test(html)) throw new Error(`Balise manquante dans index.html : ${key}="${keyValue}"`)
  return html.replace(re, `$1${escapeAttr(content)}$2`)
}

function buildPage(page) {
  const url = canonicalUrl(page.path)
  const appHtml = render(page.path)
  if (!appHtml || appHtml.length < 500) {
    throw new Error(`Rendu vide ou suspect pour ${page.path}`)
  }

  let html = template

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeText(page.title)}</title>`)
  html = setMeta(html, 'name', 'description', page.description)
  html = setMeta(html, 'property', 'og:title', page.title)
  html = setMeta(html, 'property', 'og:description', page.description)
  html = setMeta(html, 'name', 'twitter:title', page.title)
  html = setMeta(html, 'name', 'twitter:description', page.description)

  // Canonique et og:url propres à chaque page, écrites dans le HTML servi.
  // Seo.jsx met à jour ces mêmes balises (il les retrouve, il n'en ajoute pas).
  const headTags = [
    `<link rel="canonical" href="${escapeAttr(url)}" />`,
    `<meta property="og:url" content="${escapeAttr(url)}" />`,
  ].join('\n    ')
  html = html.replace('</head>', `    ${headTags}\n  </head>`)

  if (!html.includes('<div id="root"></div>')) {
    throw new Error('Conteneur <div id="root"></div> introuvable dans index.html')
  }
  html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)

  const outFile =
    page.path === '/'
      ? path.join(distDir, 'index.html')
      : path.join(distDir, `${page.path.replace(/^\/+|\/+$/g, '')}.html`)

  fs.mkdirSync(path.dirname(outFile), { recursive: true })
  fs.writeFileSync(outFile, html)
  return { url, outFile }
}

const pages = LIVE_PAGE_KEYS.map((key) => {
  const page = PAGES[key]
  if (!page) throw new Error(`Clé "${key}" absente de PAGES dans siteMeta.js`)
  return page
})

// L'accueil en dernier : son fichier remplace le gabarit index.html.
const ordered = [...pages.filter((p) => p.path !== '/'), ...pages.filter((p) => p.path === '/')]
for (const page of ordered) {
  const { outFile } = buildPage(page)
  console.log(`prérendu : ${page.path} -> ${path.relative(root, outFile)}`)
}

// Sitemap régénéré à chaque build : lastmod = date du déploiement.
const today = new Date().toISOString().slice(0, 10)
const urls = pages
  .map(
    (page) => `  <url>
    <loc>${canonicalUrl(page.path)}</loc>
    <lastmod>${today}</lastmod>
  </url>`
  )
  .join('\n')
fs.writeFileSync(
  path.join(distDir, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
)
console.log(`sitemap : ${pages.length} URL, lastmod ${today} (${SITE_URL})`)
