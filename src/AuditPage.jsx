import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from './seo/Seo.jsx'
import { PAGES } from './seo/siteMeta.js'
import logoImg from './assets/logo.png'


const CAL_LINK = 'https://cal.com/corenode-systems/meeting-de-30-min'
const WEBHOOK_URL = import.meta.env.VITE_AUDIT_WEBHOOK_URL

const TEAL = '#2A9D8F'
const HEADING_FONT = { fontFamily: "'Space Grotesk', Inter, sans-serif" }

// Anti-spam : délai minimum entre deux envois et plafond par session
const COOLDOWN_MS = 20000
const MAX_ATTEMPTS = 5
const MAX_TOOL_LENGTH = 60
const MAX_EMAIL_LENGTH = 254

const inputClass =
  'w-full bg-white/[0.03] border border-white/10 rounded-md px-4 py-2.5 text-[14px] text-white placeholder:text-white/30 transition-colors focus:outline-none focus:border-white/30 focus:bg-white/[0.05] disabled:opacity-50 disabled:cursor-not-allowed'

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
    privacyNote: "Ton courriel sert à t'envoyer le diagnostic, rien d'autre. Jamais partagé, jamais revendu.",
    required: 'Ce champ est requis.',
    emailInvalid: 'Entre une adresse courriel valide.',
    error: "Une erreur s'est produite. Réessaie ou écris-moi directement.",
    retry: 'Réessayer',
    cooldown: 'Attends quelques secondes avant de renvoyer.',
    maxAttempts: "Limite d'essais atteinte pour cette session. Écris-moi directement si tu veux aller plus loin.",
    verdictLabel: 'Ton verdict',
    scoreLabel: 'Compatibilité avec ce que je règle habituellement',
    scoreAria: 'Score : {n} sur 5',
    ctaText: 'Tu veux savoir comment régler ça concrètement ? 30 minutes, sans engagement.',
    ctaButton: 'Réserver mon appel',
    ctaReassurance: 'Appel sans engagement. Réponse sous 24 h.',
    rights: '© 2026 CoreNode Systems. Québec, Canada.',
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
    privacyNote: 'Your email is used to send you the diagnosis, nothing else. Never shared, never sold.',
    required: 'This field is required.',
    emailInvalid: 'Enter a valid email address.',
    error: 'Something went wrong. Try again or email me directly.',
    retry: 'Try again',
    cooldown: 'Wait a few seconds before sending again.',
    maxAttempts: 'Attempt limit reached for this session. Email me directly if you want to go further.',
    verdictLabel: 'Your verdict',
    scoreLabel: 'Fit with the problems I usually solve',
    scoreAria: 'Score: {n} out of 5',
    ctaText: 'Want to know how to actually fix it? 30 minutes, no commitment.',
    ctaButton: 'Book my call',
    ctaReassurance: 'No-commitment call. Reply within 24 h.',
    rights: '© 2026 CoreNode Systems. Quebec, Canada.',
  },
}
function ArrowIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

function Spinner({ size = 16 }) {
  return (
    <svg className="animate-spin" width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  )
}

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <img src={logoImg} alt="CoreNode Systems" width="26" height="26" className="block" />
      <span className="text-[15px] font-semibold tracking-tight text-white">CoreNode</span>
    </div>
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
  const [lang, setLang] = useState(() => {
    const stored = localStorage.getItem('corenode-lang')
    return stored === 'fr' || stored === 'en' ? stored : 'fr'
  })
  const [status, setStatus] = useState('idle') // idle | loading | done | error
  const [result, setResult] = useState(null)
  const [errors, setErrors] = useState({})
  const [notice, setNotice] = useState(null)
  const [form, setForm] = useState({ outil1: '', outil2: '', outil3: '', email: '', site_web: '' })
  const lastAttempt = useRef(0)
  const attempts = useRef(0)

  useEffect(() => {
    localStorage.setItem('corenode-lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  // Préremplissage depuis un lien partagé en commentaire (?outil1=...&outil2=...&outil3=...)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const outil1 = params.get('outil1')
    const outil2 = params.get('outil2')
    const outil3 = params.get('outil3')
    if (outil1 || outil2 || outil3) {
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
    if (!WEBHOOK_URL) {
      setStatus('error')
      return
    }

    lastAttempt.current = now
    attempts.current += 1
    setStatus('loading')

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          outil1: form.outil1.trim().slice(0, MAX_TOOL_LENGTH),
          outil2: form.outil2.trim().slice(0, MAX_TOOL_LENGTH),
          outil3: form.outil3.trim().slice(0, MAX_TOOL_LENGTH),
          email: form.email.trim().slice(0, MAX_EMAIL_LENGTH),
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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[12px] font-medium text-white/70 mb-8">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: TEAL }}></span>
            {t.badge}
          </div>

          <h1 className="text-4xl sm:text-5xl font-semibold leading-[1.08] tracking-tight text-white" style={HEADING_FONT}>
            {t.titleA}
            <br />
            <span className="text-white/40">{t.titleB}</span>
          </h1>
          <p className="mt-6 text-[17px] text-white/60 leading-relaxed max-w-xl">
            {t.subtitle}
          </p>

          {status !== 'done' && (
            <form onSubmit={handleSubmit} noValidate className="relative mt-12 bg-white/[0.03] border border-white/10 rounded-xl p-6 sm:p-8 space-y-5">
              {status === 'error' && (
                <div className="rounded-md border border-red-400/30 bg-red-400/10 px-4 py-3 text-[13px] text-red-300">
                  <p>{t.error}</p>
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
                  <>
                    {t.submit}
                    <ArrowIcon size={14} />
                  </>
                )}
              </button>

              <p className="text-[12px] text-white/40 leading-relaxed">{t.privacyNote}</p>
            </form>
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
                  <ArrowIcon size={14} />
                </a>
                <p className="mt-4 text-[13px] text-white/40">{t.ctaReassurance}</p>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-white/10 py-8 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-[13px] text-white/45">
          <span>{t.rights}</span>
          <Link to="/" className="hover:text-white transition-colors">corenodesystems.com</Link>
        </div>
      </footer>
    </div>
  )
}
