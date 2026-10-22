// src/SimpleLayout.jsx
// Gabarit des pages secondaires (confidentialité, page introuvable) : barre de
// navigation sobre, contenu, pied de page avec coordonnées et nom légal.

import { Link } from 'react-router-dom'
import logoImg from './assets/logo.svg'
import { EMAIL, MAILTO, PHONE, TEL, LEGAL_NAME, BRAND } from './contact.js'

const labels = {
  fr: {
    back: 'Retour au site',
    home: 'Accueil',
    audit: 'Diagnostic gratuit',
    privacy: 'Confidentialité',
    rights: `© 2026 ${LEGAL_NAME} (${BRAND}). Québec, Canada.`,
  },
  en: {
    back: 'Back to the site',
    home: 'Home',
    audit: 'Free diagnostic',
    privacy: 'Privacy',
    rights: `© 2026 ${LEGAL_NAME} (${BRAND}). Quebec, Canada.`,
  },
}

export function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <img src={logoImg} alt="CoreNode Systems" width="26" height="24" className="block" />
      <span className="text-[15px] font-semibold tracking-tight text-white">CoreNode</span>
    </div>
  )
}

export default function SimpleLayout({ lang, setLang, children }) {
  const l = labels[lang]
  return (
    <div className="min-h-screen flex flex-col bg-[#141416] text-white antialiased">
      <nav className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
              className="text-[11px] font-medium text-white/60 hover:text-white px-2.5 py-1.5 border border-white/15 rounded-md transition-colors hover:border-white/40"
              aria-label="Switch language"
            >
              {lang === 'fr' ? 'EN' : 'FR'}
            </button>
            <Link to="/" className="text-[13px] text-white/60 hover:text-white transition-colors">
              {l.back}
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 px-6 lg:px-8">{children}</main>

      <footer className="border-t border-white/10 py-8 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[13px] text-white/60">
          <div>
            <p>{l.rights}</p>
            <nav className="flex flex-wrap gap-x-5 gap-y-2 mt-2">
              <Link to="/" className="hover:text-white transition-colors">{l.home}</Link>
              <Link to="/audit" className="hover:text-white transition-colors">{l.audit}</Link>
              <Link to="/confidentialite" className="hover:text-white transition-colors">{l.privacy}</Link>
            </nav>
          </div>
          <div className="sm:text-right">
            <a href={TEL} className="block text-white/80 hover:text-white transition-colors">{PHONE}</a>
            <a href={MAILTO} className="block mt-1 text-white/80 hover:text-white transition-colors">{EMAIL}</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
