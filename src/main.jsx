import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { inject as injectAnalytics } from '@vercel/analytics'
import { injectSpeedInsights } from '@vercel/speed-insights'
// Polices auto-hébergées, alphabet latin seulement et graisses réellement
// utilisées. Plus rapide que Google Fonts et aucune adresse IP envoyée à Google.
import '@fontsource/inter/latin-400.css'
import '@fontsource/inter/latin-500.css'
import '@fontsource/inter/latin-600.css'
import '@fontsource/inter/latin-700.css'
import '@fontsource/space-grotesk/latin-500.css'
import '@fontsource/space-grotesk/latin-600.css'
import '@fontsource/space-grotesk/latin-700.css'
import './index.css'
import App from './App.jsx'

const container = document.getElementById('root')
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// En production, chaque page arrive déjà rendue en HTML (scripts/prerender.mjs).
// React s'y rattache au lieu de tout redessiner. En dev (vite), #root est vide.
if (container.hasChildNodes()) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}

// Mesure d'audience Vercel (sans témoins, statistiques agrégées) et mesure de
// vitesse réelle. À activer une fois dans Vercel > corenode-website > Analytics
// et Speed Insights ; sans activation, les scripts ne collectent rien.
injectAnalytics()
injectSpeedInsights()
