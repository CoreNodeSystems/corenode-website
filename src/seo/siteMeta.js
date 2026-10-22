// src/seo/siteMeta.js
// Source unique de vérité pour les métadonnées de page.
// Toute nouvelle route doit avoir une entrée ici. Sans entrée, la route hérite
// des balises de repli de index.html et Google la traite comme un doublon.

export const SITE_URL = 'https://corenodesystems.com'
export const SITE_NAME = 'CoreNode Systems'
export const SITE_LOCALE = 'fr_CA'
export const CONTACT_EMAIL = 'william@corenodesystems.com'

// Image de partage (Facebook, LinkedIn, messageries) : 1200 x 630 px dans
// public/og-image.jpg. Écrite dans le HTML de chaque page au build
// (scripts/prerender.mjs), car Facebook et LinkedIn n'exécutent pas le JavaScript.
export const DEFAULT_OG_IMAGE = '/og-image.jpg'
export const DEFAULT_OG_IMAGE_ALT =
  'William Fomete, CoreNode Systems : automatisation pour entrepreneurs en services terrain, de Québec à la Beauce'

// Règles de rédaction pour les entrées ci-dessous :
//   title       : 50 à 60 caractères. Requête cible en tête, marque en fin.
//   description : 140 à 155 caractères. Une promesse concrète, pas un slogan.
//   lastmod     : date de la dernière modification réelle du contenu de la
//                 page (AAAA-MM-JJ). À changer à la main quand le texte change,
//                 pas à chaque déploiement : Google ignore les dates qui
//                 bougent sans raison.
//   Aucun tiret cadratin, nulle part.

export const PAGES = {
  home: {
    path: '/',
    title: 'Automatisation PME Québec. CRM et outils connectés | CoreNode Systems',
    description:
      "Consultant en automatisation pour PME québécoises en services terrain. CRM, facturation et dispatch enfin connectés. Fini la ressaisie manuelle.",
    lastmod: '2026-10-22',
  },

  audit: {
    path: '/audit',
    title: 'Diagnostic gratuit. Vos 3 outils analysés en 2 minutes | CoreNode',
    description:
      "Nommez les 3 outils que votre entreprise utilise le plus. Recevez un verdict direct sur ce qui fuit dans votre opération. Pas d'appel, pas de pitch.",
    lastmod: '2026-10-22',
  },

  confidentialite: {
    path: '/confidentialite',
    title: 'Politique de confidentialité et Loi 25 | CoreNode Systems',
    description:
      'Ce que CoreNode Systems recueille, pourquoi, où les renseignements sont traités, combien de temps ils sont gardés et comment exercer tes droits.',
    lastmod: '2026-10-22',
  },

  // Page d'erreur : générée dans dist/404.html, jamais dans le sitemap.
  notFound: {
    path: '/404',
    title: 'Page introuvable | CoreNode Systems',
    description:
      "Cette page n'existe pas ou a été déplacée. Retourne à l'accueil ou fais le diagnostic gratuit de tes outils.",
    noindex: true,
  },
}

// Construit une URL canonique absolue, sans www, sans barre oblique finale
// sauf pour la racine. À utiliser partout plutôt que de concaténer à la main.
export function canonicalUrl(path) {
  if (!path || path === '/') return `${SITE_URL}/`
  const clean = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${clean.replace(/\/+$/, '')}`
}

// Routes réellement en ligne, dans le sitemap. N'ajouter une clé qu'une fois
// la page déployée.
export const LIVE_PAGE_KEYS = ['home', 'audit', 'confidentialite']
