import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from './seo/Seo.jsx'
import useLang from './useLang.js'
import { PAGES } from './seo/siteMeta.js'
import { Logo } from './SimpleLayout.jsx'
import { BOOKING as CAL_LINK, EMAIL, MAILTO, PHONE, TEL, LEGAL_NAME, BRAND } from './contact.js'

const TEAL = '#2A9D8F'
const HEADING_FONT = { fontFamily: "'Space Grotesk', Inter, sans-serif" }

// Anti-spam : délai minimum entre deux envois et plafond par session
const COOLDOWN_MS = 20000
const MAX_ATTEMPTS = 5
const MAX_TOOL_LENGTH = 60
const MAX_EMAIL_LENGTH = 254

const inputClass =
  'w-full bg-white/[0.03] border border-white/10 rounded-md px-4 py-2.5 text-[14px] text-white placeholder:text-white/40 transition-colors focus:outline-none focus:border-white/30 focus:bg-white/[0.05] disabled:opacity-50 disabled:cursor-not-allowed'

const content = {
  fr: {
    back: '← Retour au site',
    badge: 'Diagnostic gratuit en 2 minutes',
    titleA: 'Tes outils se parlent entre eux,',
    titleB: 'ou c’est toi le pont ?',
    subtitle:
      "Nomme les 3 outils que ton entreprise utilise le plus. Tu reçois un verdict direct sur ce qui fuit dans ton opération. Pas d'appel, pas de pitch.",
    tools: [
      { id: 'outil1', label: 'Outil 1', placeholder: 'Ex. : QuickBooks' },
      { id: 'outil2', label: 'Outil 2', placeholder: 'Ex. : Excel (dispatch, soumissions…)' },
      { id: 'outil3', label: 'Outil 3', placeholder: 'Ex. : Jobber, ServiceTitan, courriels…' },
    ],
    emailLabel: 'Ton courriel',
    emailPlaceholder: 'toi@tonentreprise.com',
    submit: 'Obtenir mon verdict',
    submitting: 'Analyse en cours…',
    privacyNote: "Ton courriel sert à t'envoyer le diagnostic, rien d'autre. Les noms d'outils sont analysés par un modèle d'IA, sans ton courriel. Tes renseignements sont traités par mes fournisseurs techniques, dont certains hébergent les données à l'extérieur du Québec. Détails dans la",
    privacyLink: 'politique de confidentialité',
    required: 'Ce champ est requis.',
    emailInvalid: 'Entre une adresse courriel valide.',
    error: "Le diagnostic n'a pas pu être généré. Réessaie dans un instant, ou joins-moi directement :",
    retry: 'Réessayer',
    cooldown: 'Attends quelques secondes avant de renvoyer.',
    maxAttempts: "Limite d'essais atteinte pour cette session. Écris-moi directement si tu veux aller plus loin.",
    verdictLabel: 'Ton verdict',
    scoreLabel: 'Compatibilité avec ce que je règle habituellement',
    scoreAria: 'Score : {n} sur 5',
    ctaText: 'Tu veux savoir comment régler ça concrètement ? 30 minutes, sans engagement.',
    ctaButton: 'Réserver mon appel',
    ctaReassurance: 'Appel sans engagement. Réponse sous 24 h.',
    rights: `© 2026 ${LEGAL_NAME} (${BRAND}). Québec, Canada.`,
    privacy: 'Confidentialité',
    sampleTitle: 'Exemple de verdict',
    sampleIntro: 'Voici un vrai verdict généré pour ces 3 outils : QuickBooks, Excel (dispatch) et Jobber.',
    sample: [
      "Ce qui fuit probablement entre ces trois outils, c'est la ressaisie. Un appel arrive, tu notes ça dans Jobber ou sur papier, la soumission part, le bon de travail est recopié dans Excel pour la répartition, puis la facture repart dans QuickBooks. Chaque copie à la main, c'est une chance d'erreur sur le montant, l'adresse ou le client, et des factures qui partent en retard parce que quelqu'un a oublié de fermer la job.",
      "Sur ce que tu as déjà, Jobber gère la plupart des étapes terrain : clients, soumissions, travaux, facturation. Il existe aussi une synchronisation avec QuickBooks, mais son niveau exact dépend de ta version ; il faut le vérifier avec ton fournisseur. Le plus simple est souvent de faire de Jobber ta source unique et de sortir Excel de la boucle.",
      "Priorité numéro 1 : cette semaine, fais la liste des trois étapes où tu recopies de l'information (soumission vers bon de travail, bon de travail vers facture, facture vers comptabilité) et vérifie laquelle de ces copies la synchronisation entre Jobber et QuickBooks peut remplacer.",
    ],
    sampleScore: 4,
    lookTitle: 'Ce que le diagnostic regarde',
    look: [
      { title: 'La ressaisie', text: "Les endroits où la même information (client, adresse, heures, montant) est tapée plus d'une fois d'un outil à l'autre." },
      { title: 'Les trous entre les étapes', text: "Ce qui se perd entre l'appel du client, le bon de travail, le dispatch et la facture." },
      { title: 'Ce qui peut déjà se connecter', text: "Ce que tes outils savent faire ensemble sans rien acheter de plus, et ce qui demande vraiment une intégration." },
    ],
    howTitle: 'Comment ça marche',
    how: [
      'Tu nommes les 3 outils que ton équipe ouvre tous les jours.',
      "Le diagnostic regarde comment ces outils se parlent, ou pas, et où l'information se perd entre eux.",
      "Ton verdict s'affiche directement sur cette page. Si tu veux aller plus loin, tu réserves 30 minutes. Sinon, ça s'arrête là.",
    ],
    faqTitle: 'Questions fréquentes',
    faq: [
      { q: "C'est vraiment gratuit?", a: "Oui. Pas de carte, pas d'appel obligatoire. Tu reçois ton verdict et tu décides ensuite si tu veux en parler." },
      { q: "Pour quel genre d'entreprise?", a: "Surtout les PME québécoises de 10 à 50 employés en services terrain : plomberie, électricité, entretien, construction. Le diagnostic fonctionne pour d'autres secteurs, mais c'est là qu'il est le plus précis." },
      { q: 'Est-ce que je vais devoir changer de logiciels?', a: "Non. Le but est de faire circuler l'information entre les outils que tu as déjà. On remplace un outil seulement s'il bloque vraiment." },
      { q: 'Qui est derrière CoreNode Systems?', a: "William Fomete, consultant en automatisation et en intégration d'outils, basé au Québec. C'est lui que tu rencontres si tu réserves un appel, et lui qui fait la mise en place." },
    ],
  },
  en: {
    back: '← Back to the site',
    badge: 'Free 2-minute diagnosis',
    titleA: 'Do your tools talk to each other,',
    titleB: 'or are you the bridge?',
    subtitle:
      'Name the 3 tools your business uses the most. You get a straight verdict on where your operation is leaking. No call, no pitch.',
    tools: [
      { id: 'outil1', label: 'Tool #1', placeholder: 'E.g.: QuickBooks' },
      { id: 'outil2', label: 'Tool #2', placeholder: 'E.g.: Excel (dispatch, quotes…)' },
      { id: 'outil3', label: 'Tool #3', placeholder: 'E.g.: Jobber, ServiceTitan, emails…' },
    ],
    emailLabel: 'Your email',
    emailPlaceholder: 'you@yourcompany.com',
    submit: 'Get my verdict',
    submitting: 'Analyzing…',
    privacyNote: 'Your email is used to send you the diagnosis, nothing else. The tool names are analyzed by an AI model, without your email. Your information is processed by my technical providers, some of which host data outside Quebec. Details in the',
    privacyLink: 'privacy policy',
    required: 'This field is required.',
    emailInvalid: 'Enter a valid email address.',
    error: 'The diagnosis could not be generated. Try again in a moment, or reach me directly:',
    retry: 'Try again',
    cooldown: 'Wait a few seconds before sending again.',
    maxAttempts: 'Attempt limit reached for this session. Email me directly if you want to go further.',
    verdictLabel: 'Your verdict',
    scoreLabel: 'Fit with the problems I usually solve',
    scoreAria: 'Score: {n} out of 5',
    ctaText: 'Want to know how to actually fix it? 30 minutes, no commitment.',
    ctaButton: 'Book my call',
    ctaReassurance: 'No-commitment call. Reply within 24 h.',
    rights: `© 2026 ${LEGAL_NAME} (${BRAND}). Quebec, Canada.`,
    privacy: 'Privacy',
    sampleTitle: 'Sample verdict',
    sampleIntro: 'Here is a real verdict generated for these 3 tools: QuickBooks, Excel (dispatch) and Jobber.',
    sample: [
      'What is probably leaking between these three tools is re-entry. A call comes in, you note it in Jobber or on paper, the quote goes out, the work order gets copied into Excel for dispatch, then the invoice goes back into QuickBooks. Every manual copy is a chance for a mistake on the amount, the address or the customer, and for invoices going out late because someone forgot to close the job.',
      'With what you already have, Jobber handles most field steps: customers, quotes, jobs, invoicing. There is also a QuickBooks sync, but how far it goes depends on your plan; check it with your provider. The simplest move is often to make Jobber your single source of truth and take Excel out of the loop.',
      'Priority #1: this week, list the three steps where you re-type information (quote to work order, work order to invoice, invoice to accounting) and check which of those copies the Jobber and QuickBooks sync can replace.',
    ],
    sampleScore: 4,
    lookTitle: 'What the diagnosis looks at',
    look: [
      { title: 'Double entry', text: 'Where the same information (customer, address, hours, amount) gets typed more than once from one tool to the next.' },
      { title: 'Gaps between steps', text: 'What gets lost between the customer call, the work order, dispatch and the invoice.' },
      { title: 'What can already connect', text: 'What your tools can do together without buying anything new, and what really needs an integration.' },
    ],
    howTitle: 'How it works',
    how: [
      'You name the 3 tools your team opens every day.',
      'The diagnosis looks at how those tools talk to each other, or don’t, and where information falls through the cracks.',
      'Your verdict shows up right on this page. If you want to go further, you book 30 minutes. If not, that’s it.',
    ],
    faqTitle: 'Frequently asked questions',
    faq: [
      { q: 'Is it really free?', a: 'Yes. No card, no mandatory call. You get your verdict and then decide whether you want to talk.' },
      { q: 'What kind of business is it for?', a: 'Mostly Quebec SMBs with 10 to 50 employees in field services: plumbing, electrical, maintenance, construction. It works for other sectors too, but that is where it is most precise.' },
      { q: 'Will I have to switch software?', a: 'No. The goal is to get information flowing between the tools you already have. A tool only gets replaced if it is truly in the way.' },
      { q: 'Who is behind CoreNode Systems?', a: 'William Fomete, an automation and integration consultant based in Quebec. He is the one you meet if you book a call, and the one who does the setup.' },
    ],
  },
}

function Spinner({ size = 16 }) {
  return (
    <svg className="animate-spin" width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  )
}


function ScoreBars({ score, ariaTemplate }) {
  const clamped = Math.max(0, Math.min(5, Number(score) || 0))
  return (
    <div className="flex items-end gap-1.5" aria-label={ariaTemplate.replace('{n}', String(clamped))}>
      {[1, 2, 3, 4, 5].map((n) => (
        <div
          key={n}
          className="w-8 rounded-sm transition-all"
          style={{
            height: `${10 + n * 6}px`,
            backgroundColor: n <= clamped ? TEAL : 'rgba(255,255,255,0.08)',
          }}
        />
      ))}
      <span className="ml-3 text-[14px] font-medium text-white tabular-nums">{clamped}/5</span>
    </div>
  )
}

function extractResult(data) {
  // Tolère plusieurs formes de réponse (n8n renvoie parfois un tableau ou un wrapper "output")
  let d = data
  if (Array.isArray(d)) d = d[0] || {}
  if (d && typeof d.output === 'object' && d.output !== null) d = d.output
  if (d && typeof d.json === 'object' && d.json !== null) d = d.json
  const verdict = d?.verdict ?? d?.diagnostic ?? d?.message ?? (typeof d === 'string' ? d : null)
  const score = d?.score ?? d?.icp_score ?? d?.icp ?? d?.note ?? null
  return { verdict, score }
}

export default function AuditPage() {
  const [lang, setLang] = useLang()
  const [status, setStatus] = useState('idle') // idle | loading | done | error
  const [result, setResult] = useState(null)
  const [errors, setErrors] = useState({})
  const [notice, setNotice] = useState(null)
  const [form, setForm] = useState({ outil1: '', outil2: '', outil3: '', email: '', site_web: '' })
  const lastAttempt = useRef(0)
  const attempts = useRef(0)

  // Préremplissage depuis un lien partagé en commentaire (?outil1=...&outil2=...&outil3=...)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const outil1 = params.get('outil1')
    const outil2 = params.get('outil2')
    const outil3 = params.get('outil3')
    if (outil1 || outil2 || outil3) {
      // Voulu : préremplir après l'hydratation, à partir de l'adresse de la page.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm((prev) => ({
        ...prev,
        outil1: outil1 || prev.outil1,
        outil2: outil2 || prev.outil2,
        outil3: outil3 || prev.outil3,
      }))
    }
  }, [])

  const t = content[lang]
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const update = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (!form.outil1.trim()) next.outil1 = t.required
    if (!form.outil2.trim()) next.outil2 = t.required
    if (!form.outil3.trim()) next.outil3 = t.required
    if (!form.email.trim()) {
      next.email = t.required
    } else if (!emailRegex.test(form.email.trim())) {
      next.email = t.emailInvalid
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setNotice(null)

    // Honeypot : un humain ne voit jamais ce champ
    if (form.site_web) return

    if (!validate()) return

    const now = Date.now()
    if (now - lastAttempt.current < COOLDOWN_MS) {
      setNotice(t.cooldown)
      return
    }
    if (attempts.current >= MAX_ATTEMPTS) {
      setNotice(t.maxAttempts)
      return
    }
    lastAttempt.current = now
    attempts.current += 1
    setStatus('loading')

    try {
      // Fonction serveur du site (api/audit.js), qui attend le verdict de n8n.
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          outil1: form.outil1.trim().slice(0, MAX_TOOL_LENGTH),
          outil2: form.outil2.trim().slice(0, MAX_TOOL_LENGTH),
          outil3: form.outil3.trim().slice(0, MAX_TOOL_LENGTH),
          email: form.email.trim().slice(0, MAX_EMAIL_LENGTH),
          lang,
        }),
      })
      if (!res.ok) throw new Error('Request failed')
      const data = await res.json()
      const parsed = extractResult(data)
      if (!parsed.verdict) throw new Error('Empty verdict')
      setResult(parsed)
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-[#141416] text-white antialiased">
      <Seo {...PAGES.audit} />
      <nav className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
              className="text-[11px] font-medium text-white/60 hover:text-white px-2.5 py-1.5 border border-white/15 rounded-md transition-colors hover:border-white/40"
              aria-label="Switch language"
            >
              {lang === 'fr' ? 'EN' : 'FR'}
            </button>
            <Link to="/" className="text-[13px] text-white/60 hover:text-white transition-colors">
              {t.back}
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative px-6 lg:px-8 pt-20 pb-28 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(to bottom, ${TEAL}14, transparent 40%)` }}
          />
        </div>

        <div className="max-w-2xl mx-auto">
          <p className="inline-flex items-center gap-2 text-[13px] text-white/60 mb-7">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: TEAL }} aria-hidden="true"></span>
            {t.badge}
          </p>

          <h1 className="text-4xl sm:text-5xl font-semibold leading-[1.08] tracking-tight text-white" style={HEADING_FONT}>
            {t.titleA}
            <br />
            <span className="text-white/60">{t.titleB}</span>
          </h1>
          <p className="mt-6 text-[17px] text-white/60 leading-relaxed max-w-xl">
            {t.subtitle}
          </p>

          {status !== 'done' && (
            <form onSubmit={handleSubmit} noValidate className="relative mt-12 bg-white/[0.03] border border-white/10 rounded-xl p-6 sm:p-8 space-y-5">
              {status === 'error' && (
                <div className="rounded-md border border-red-400/30 bg-red-400/10 px-4 py-3 text-[13px] text-red-300">
                  <p>
                    {t.error}{' '}
                    <a href={MAILTO} className="text-white underline underline-offset-2">{EMAIL}</a>
                    {' · '}
                    <a href={TEL} className="text-white underline underline-offset-2 tabular-nums">{PHONE}</a>
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="mt-2 text-[13px] font-medium text-white underline underline-offset-2 hover:text-white/80 transition-colors"
                  >
                    {t.retry}
                  </button>
                </div>
              )}

              {notice && (
                <div className="rounded-md border border-white/15 bg-white/5 px-4 py-3 text-[13px] text-white/70">
                  {notice}
                </div>
              )}

              {t.tools.map((f) => (
                <div key={f.id}>
                  <label htmlFor={f.id} className="block text-[13px] font-medium text-white/70 mb-1.5">
                    {f.label}
                  </label>
                  <input
                    id={f.id}
                    name={f.id}
                    type="text"
                    required
                    maxLength={MAX_TOOL_LENGTH}
                    placeholder={f.placeholder}
                    value={form[f.id]}
                    onChange={update(f.id)}
                    disabled={status === 'loading'}
                    className={`${inputClass}${errors[f.id] ? ' border-red-400/50' : ''}`}
                  />
                  {errors[f.id] && <p className="mt-1.5 text-[12px] text-red-400">{errors[f.id]}</p>}
                </div>
              ))}

              <div>
                <label htmlFor="email" className="block text-[13px] font-medium text-white/70 mb-1.5">
                  {t.emailLabel}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  maxLength={MAX_EMAIL_LENGTH}
                  placeholder={t.emailPlaceholder}
                  value={form.email}
                  onChange={update('email')}
                  disabled={status === 'loading'}
                  className={`${inputClass}${errors.email ? ' border-red-400/50' : ''}`}
                />
                {errors.email && <p className="mt-1.5 text-[12px] text-red-400">{errors.email}</p>}
              </div>

              <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
                <input
                  id="site_web"
                  name="site_web"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.site_web}
                  onChange={update('site_web')}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-[14px] font-medium rounded-md text-black bg-white hover:bg-white/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <>
                    <Spinner size={16} />
                    {t.submitting}
                  </>
                ) : (
                  t.submit
                )}
              </button>

              <p className="text-[12px] text-white/60 leading-relaxed">
                {t.privacyNote}{' '}
                <Link to="/confidentialite" className="text-white/80 hover:text-white underline underline-offset-2 transition-colors">
                  {t.privacyLink}
                </Link>
                .
              </p>
            </form>
          )}

          {status !== 'done' && (
            <section className="mt-10 rounded-xl border border-white/10 p-6 sm:p-8" aria-labelledby="exemple-verdict">
              <h2 id="exemple-verdict" className="text-[11px] font-medium uppercase tracking-[0.12em]" style={{ color: TEAL }}>
                {t.sampleTitle}
              </h2>
              <p className="mt-3 text-[13px] text-white/60">{t.sampleIntro}</p>
              <div className="mt-5 space-y-3">
                {t.sample.map((para) => (
                  <p key={para} className="text-[14px] text-white/75 leading-relaxed">{para}</p>
                ))}
              </div>
              <div className="mt-6 pt-5 border-t border-white/10">
                <div className="text-[13px] font-medium text-white/70 mb-3">{t.scoreLabel}</div>
                <ScoreBars score={t.sampleScore} ariaTemplate={t.scoreAria} />
              </div>
            </section>
          )}

          {status === 'done' && result && (
            <div className="mt-12">
              <div
                className="rounded-xl p-6 sm:p-8 bg-white/[0.03]"
                style={{ border: `1px solid ${TEAL}66` }}
              >
                <div className="text-[11px] font-medium uppercase tracking-[0.12em] mb-5" style={{ color: TEAL }}>
                  {t.verdictLabel}
                </div>
                <p className="text-[15px] text-white/85 leading-relaxed whitespace-pre-line">
                  {result.verdict}
                </p>

                {result.score != null && (
                  <div className="mt-8 pt-6 border-t border-white/10">
                    <div className="text-[13px] font-medium text-white/70 mb-3">{t.scoreLabel}</div>
                    <ScoreBars score={result.score} ariaTemplate={t.scoreAria} />
                  </div>
                )}
              </div>

              <div className="mt-8 text-center">
                <p className="text-[15px] text-white/60 mb-5">{t.ctaText}</p>
                <a
                  href={CAL_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[14px] font-medium rounded-md text-black transition-opacity hover:opacity-90"
                  style={{ backgroundColor: TEAL }}
                >
                  {t.ctaButton}
                </a>
                <p className="mt-4 text-[13px] text-white/60">{t.ctaReassurance}</p>
              </div>
            </div>
          )}

          <section className="mt-20 pt-12 border-t border-white/10">
            <h2 className="text-2xl font-semibold tracking-tight text-white" style={HEADING_FONT}>
              {t.lookTitle}
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {t.look.map((item) => (
                <div key={item.title} className="rounded-lg border border-white/10 bg-white/[0.02] p-5">
                  <h3 className="text-[15px] font-medium text-white">{item.title}</h3>
                  <p className="mt-2 text-[14px] text-white/60 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-14">
            <h2 className="text-2xl font-semibold tracking-tight text-white" style={HEADING_FONT}>
              {t.howTitle}
            </h2>
            <ol className="mt-6 space-y-4">
              {t.how.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span
                    className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[13px] font-medium text-black"
                    style={{ backgroundColor: TEAL }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-[15px] text-white/70 leading-relaxed pt-0.5">{step}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-14">
            <h2 className="text-2xl font-semibold tracking-tight text-white" style={HEADING_FONT}>
              {t.faqTitle}
            </h2>
            <dl className="mt-6 divide-y divide-white/10 border-y border-white/10">
              {t.faq.map((item) => (
                <div key={item.q} className="py-5">
                  <dt className="text-[15px] font-medium text-white">{item.q}</dt>
                  <dd className="mt-2 text-[14px] text-white/60 leading-relaxed">{item.a}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </main>

      <footer className="border-t border-white/10 py-8 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[13px] text-white/60">
          <div>
            <p>{t.rights}</p>
            <nav className="flex flex-wrap gap-x-5 gap-y-2 mt-2">
              <Link to="/" className="hover:text-white transition-colors">corenodesystems.com</Link>
              <Link to="/confidentialite" className="hover:text-white transition-colors">{t.privacy}</Link>
            </nav>
          </div>
          <div className="sm:text-right">
            <a href={TEL} className="block text-white/80 hover:text-white transition-colors tabular-nums">{PHONE}</a>
            <a href={MAILTO} className="block mt-1 text-white/80 hover:text-white transition-colors">{EMAIL}</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
