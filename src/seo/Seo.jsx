// src/seo/Seo.jsx
// Métadonnées par route pour un SPA React Router servi par un rewrite Vercel.
//
// Pourquoi une mise à jour impérative plutôt que les métadonnées natives de
// React 19 : index.html conserve un <title> et des <meta> de repli pour les
// agents qui n'exécutent pas le JavaScript. React 19 hisse les balises rendues
// dans le <head> mais ne les fusionne pas avec celles déjà présentes. On se
// retrouverait avec deux <title>, et le navigateur comme Googlebot retiennent
// le premier du document, c'est à dire celui de l'accueil. L'approche par
// upsert garantit exactement une balise de chaque type, avec la bonne valeur.

import { useEffect } from 'react'
import {
  SITE_URL,
  SITE_NAME,
  SITE_LOCALE,
  DEFAULT_OG_IMAGE,
  canonicalUrl,
} from './siteMeta'

const MANAGED_ATTR = 'data-seo-managed'

function upsertMeta(selector, attrName, attrValue, content) {
  if (!content) return
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attrName, attrValue)
    el.setAttribute(MANAGED_ATTR, '')
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel, href) {
  if (!href) return
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    el.setAttribute(MANAGED_ATTR, '')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export default function Seo({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  noindex = false,
  jsonLd = null,
}) {
  useEffect(() => {
    const url = canonicalUrl(path)

    if (title) document.title = title

    upsertMeta('meta[name="description"]', 'name', 'description', description)

    // Canonique auto-référente. C'est la balise qui manquait par route et qui
    // faisait passer /audit pour un doublon de l'accueil.
    upsertLink('canonical', url)

    upsertMeta('meta[property="og:title"]', 'property', 'og:title', title)
    upsertMeta('meta[property="og:description"]', 'property', 'og:description', description)
    upsertMeta('meta[property="og:url"]', 'property', 'og:url', url)
    upsertMeta('meta[property="og:type"]', 'property', 'og:type', 'website')
    upsertMeta('meta[property="og:site_name"]', 'property', 'og:site_name', SITE_NAME)
    upsertMeta('meta[property="og:locale"]', 'property', 'og:locale', SITE_LOCALE)

    upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title)
    upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description)

    if (image) {
      const absolute = image.startsWith('http') ? image : `${SITE_URL}${image}`
      upsertMeta('meta[property="og:image"]', 'property', 'og:image', absolute)
      upsertMeta('meta[name="twitter:image"]', 'name', 'twitter:image', absolute)
      upsertMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image')
    }

    // noindex sert aux pages utilitaires (remerciement, erreur). Jamais sur une
    // page destinée à être trouvée.
    const robots = document.head.querySelector('meta[name="robots"]')
    if (noindex) {
      upsertMeta('meta[name="robots"]', 'name', 'robots', 'noindex, follow')
    } else if (robots && robots.hasAttribute(MANAGED_ATTR)) {
      robots.remove()
    }
  }, [title, description, path, image, noindex])

  useEffect(() => {
    if (!jsonLd) return
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute(MANAGED_ATTR, '')
    script.textContent = JSON.stringify(jsonLd)
    document.head.appendChild(script)
    return () => script.remove()
  }, [jsonLd])

  return null
}
