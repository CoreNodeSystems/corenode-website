// src/entry-server.jsx
/* eslint-disable react-refresh/only-export-components */
// Point d'entrée utilisé uniquement au build par scripts/prerender.mjs.
// Produit le HTML d'une route pour que Google lise le contenu sans exécuter
// le JavaScript.

import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App.jsx'

export { PAGES, LIVE_PAGE_KEYS, canonicalUrl, SITE_URL } from './seo/siteMeta.js'

export function render(url) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>
  )
}
