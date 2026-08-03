// src/seo/siteMeta.js
// Source unique de vérité pour les métadonnées de page.
// Toute nouvelle route doit avoir une entrée ici. Sans entrée, la route hérite
// des balises de repli de index.html et Google la traite comme un doublon.

export const SITE_URL = 'https://corenodesystems.com'
export const SITE_NAME = 'CoreNode Systems'
export const SITE_LOCALE = 'fr_CA'
export const CONTACT_EMAIL = 'william@corenodesystems.com'

// Image de partage Open Graph. À créer en 1200 x 630 px et déposer dans
// public/og-image.jpg. Tant qu'elle n'existe pas, laisser DEFAULT_OG_IMAGE à
// null et twitter:card sur "summary" dans index.html.
export const DEFAULT_OG_IMAGE = null

// Règles de rédaction pour les entrées ci-dessous :
//   title       : 50 à 60 caractères. Requête cible en tête, marque en fin.
//   description : 140 à 155 caractères. Une promesse concrète, pas un slogan.
//   Aucun tiret cadratin, nulle part.

export const PAGES = {
  home: {
    path: '/',
    title: 'Automatisation PME Québec. CRM et outils connectés | CoreNode Systems',
    description:
      "Consultant en automatisation pour PME québécoises en services terrain. CRM, facturation et dispatch enfin connectés. Fini la ressaisie manuelle.",
  },

  audit: {
    path: '/audit',
    title: 'Diagnostic gratuit. Vos 3 outils analysés en 2 minutes | CoreNode',
    description:
      "Nommez les 3 outils que votre entreprise utilise le plus. Recevez un verdict direct sur ce qui fuit dans votre opération. Pas d'appel, pas de pitch.",
  },
}

// Construit une URL canonique absolue, sans www, sans barre oblique finale
// sauf pour la racine. À utiliser partout plutôt que de concaténer à la main.
export function canonicalUrl(path) {
  if (!path || path === '/') return `${SITE_URL}/`
  const clean = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${clean.replace(/\/+$/, '')}`
}

// Routes réellement en ligne. Sert de référence pour public/sitemap.xml.
// N'ajouter une clé qu'une fois la page déployée.
export const LIVE_PAGE_KEYS = ['home', 'audit']
