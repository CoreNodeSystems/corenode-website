// src/NotFoundPage.jsx
// Page d'erreur 404 : prérendue dans dist/404.html (noindex), servie par
// Vercel avec le code 404 pour toute adresse inconnue.

import { Link } from 'react-router-dom'
import Seo from './seo/Seo.jsx'
import { PAGES } from './seo/siteMeta.js'
import useLang from './useLang.js'
import SimpleLayout from './SimpleLayout.jsx'
import { BOOKING, PHONE, TEL } from './contact.js'

const content = {
  fr: {
    code: 'Erreur 404',
    title: 'Cette page n’existe pas.',
    text: 'L’adresse est peut-être mal tapée, ou la page a été déplacée. Voici où aller ensuite :',
    home: 'Retour à l’accueil',
    audit: 'Faire le diagnostic gratuit',
    call: 'Réserver un appel de 30 minutes',
    phone: 'Ou appelle William au',
  },
  en: {
    code: 'Error 404',
    title: 'This page does not exist.',
    text: 'The address may be mistyped, or the page has moved. Here is where to go next:',
    home: 'Back to the homepage',
    audit: 'Take the free diagnostic',
    call: 'Book a 30-minute call',
    phone: 'Or call William at',
  },
}

export default function NotFoundPage() {
  const [lang, setLang] = useLang()
  const t = content[lang]

  return (
    <SimpleLayout lang={lang} setLang={setLang}>
      <Seo {...PAGES.notFound} />
      <div className="max-w-2xl mx-auto pt-20 pb-28">
        <p className="text-[13px] font-medium text-[var(--teal)]">{t.code}</p>
        <h1 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tight text-white">{t.title}</h1>
        <p className="mt-6 text-[17px] text-white/70 leading-relaxed">{t.text}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-5 py-3 text-[14px] font-medium rounded-md text-black bg-white hover:bg-white/90 transition-colors"
          >
            {t.home}
          </Link>
          <Link
            to="/audit"
            className="inline-flex items-center justify-center px-5 py-3 text-[14px] font-medium rounded-md text-white border border-white/15 hover:bg-white/5 hover:border-white/30 transition-colors"
          >
            {t.audit}
          </Link>
          <a
            href={BOOKING}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-5 py-3 text-[14px] font-medium rounded-md text-white border border-white/15 hover:bg-white/5 hover:border-white/30 transition-colors"
          >
            {t.call}
          </a>
        </div>
        <p className="mt-8 text-[14px] text-white/60">
          {t.phone}{' '}
          <a href={TEL} className="text-white underline underline-offset-4 decoration-white/30 hover:decoration-white">{PHONE}</a>.
        </p>
      </div>
    </SimpleLayout>
  )
}
