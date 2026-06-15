import { useState, useEffect } from 'react'

const EMAIL = 'william@corenodesystems.com'
const MAILTO = 'mailto:' + EMAIL
const LINKEDIN = 'https://www.linkedin.com/in/william-fomete'
const BOOKING = 'https://cal.com/corenode-systems/meeting-de-30-min'
const WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL

const SECTEUR_OPTIONS = {
  fr: [
    { value: 'Services terrain (HVAC, plomberie, électricité)', label: 'Services terrain (HVAC, plomberie, électricité)' },
    { value: 'Construction / Pavage', label: 'Construction / Pavage' },
    { value: 'PME générale', label: 'PME générale' },
    { value: 'Cliniques / Santé', label: 'Cliniques / Santé' },
    { value: 'Ecommerce', label: 'Ecommerce' },
    { value: 'Autre', label: 'Autre' },
  ],
  en: [
    { value: 'Field services (HVAC, plumbing, electrical)', label: 'Field services (HVAC, plumbing, electrical)' },
    { value: 'Construction / Paving', label: 'Construction / Paving' },
    { value: 'General SMB', label: 'General SMB' },
    { value: 'Clinics / Healthcare', label: 'Clinics / Healthcare' },
    { value: 'Ecommerce', label: 'Ecommerce' },
    { value: 'Other', label: 'Other' },
  ],
}

const inputClass =
  'w-full bg-white/[0.02] border border-white/10 rounded-md px-4 py-2.5 text-[14px] text-white placeholder:text-white/30 transition-colors focus:outline-none focus:border-white/30 focus:bg-white/[0.04] disabled:opacity-50 disabled:cursor-not-allowed'
const labelClass = 'block text-[13px] font-medium text-white/70 mb-1.5'

const content = {
  fr: {
    nav: { services: 'Services', method: 'Méthode', about: 'À propos', cta: 'Réserver un appel découverte' },
    hero: {
      location: 'Québec, Canada',
      titleA: "Arrêtez d'être le pont humain",
      titleB: 'entre vos propres logiciels.',
      subtitle: "Je construis l'infrastructure qui connecte vos outils, automatise vos suivis et libère votre équipe du travail manuel répétitif. Des systèmes documentés que vous pouvez opérer sans moi.",
      cta: 'Réserver un appel découverte',
      ctaSecondary: 'Voir la méthode',
      reassurance: 'Appel sans engagement. Réponse sous 24 h.',
    },
    pains: {
      title: 'Vous reconnaissez ça ?',
      subtitle: 'Quatre signes que vos opérations vous coûtent plus que vous ne le réalisez.',
      items: [
        { title: 'Bureau et terrain déconnectés', text: "Vos équipes terrain et votre bureau ne se parlent pas. Les bons de travail, les photos, les signatures se perdent entre les deux." },
        { title: 'Les mêmes tâches, chaque semaine', text: "Vous refaites manuellement les mêmes suivis, les mêmes relances, les mêmes rapports. Personne ne devrait passer 6 heures par semaine à copier-coller." },
        { title: 'La croissance bloquée par les opérations', text: "Vous refusez des contrats. Pas par manque de clients, mais parce que vos processus internes s'effondreraient sous la charge supplémentaire." },
        { title: 'Des outils qui ne se parlent pas', text: "CRM, facturation, dispatch, comptabilité : chacun fait sa job, mais aucun ne communique avec l'autre. Vous devenez le pont humain entre vos propres logiciels." },
      ],
    },
    fit: {
      title: 'Pour qui je travaille',
      subtitle: "Le bon fit, c'est ce qui rend les mandats prévisibles.",
      yes: {
        title: "C'est pour vous si",
        items: [
          'Vous dirigez une PME québécoise en services terrain, construction ou métiers spécialisés',
          'Vous avez entre 5 et 50 employés et vos opérations sont devenues le goulot',
          'Vous utilisez déjà des outils (CRM, dispatch, facturation) mais ils ne se parlent pas',
          'Vous voulez un système documenté que votre équipe peut opérer sans dépendre du consultant',
        ],
      },
      no: {
        title: "C'est pas pour vous si",
        items: [
          'Vous cherchez le prix le plus bas plutôt que la solution la plus durable',
          'Vous voulez un agent IA gadget sans toucher à vos processus de fond',
          "Vous n'avez personne dans votre équipe pour participer à la phase de découverte",
          'Vous voulez du code livré sans documentation ni formation',
        ],
      },
    },
    method: {
      title: 'Comment ça fonctionne',
      subtitle: 'Une séquence claire, des livrables définis à chaque étape, aucune surprise sur la facture.',
      steps: [
        { duration: '30 min', title: 'Appel découverte', text: "Sans engagement. On cartographie votre opération complète et on identifie où le temps se perd." },
        { duration: '1 à 2 sem.', title: 'Audit et architecture', text: "Diagnostic complet de votre situation actuelle, plan d'architecture cible, estimation du ROI avant tout engagement." },
        { duration: '2 à 6 sem.', title: 'Implémentation', text: "On construit, on intègre vos outils existants, on documente chaque flux, on forme votre équipe sur le système livré." },
        { duration: 'Permanent', title: 'Autonomie garantie', text: "Vous repartez avec un système que votre équipe comprend et peut opérer. Pas de verrou technique, pas de dépendance." },
      ],
    },
    services: {
      title: "Ce qu'on construit ensemble",
      subtitle: 'Trois piliers, une architecture cohérente.',
      items: [
        { title: 'Automatisation des opérations', text: "Vos outils existants, enfin connectés. J'orchestre vos systèmes avec n8n pour éliminer les ressaisies et les pertes d'information entre vos plateformes." },
        { title: 'Infrastructure de gestion', text: "Une base de données structurée, un CRM connecté, des tableaux de bord en temps réel. Une seule source de vérité pour piloter votre entreprise." },
        { title: 'Systèmes de terrain', text: "Dispatch automatisé, suivi des techniciens, synchronisation bureau-terrain, rappels et confirmations automatiques. Le terrain et le bureau enfin alignés." },
      ],
    },
    about: {
      title: "L'architecte derrière les systèmes",
      body: "Je ne vends pas des outils. Je construis l'infrastructure qui permet à votre entreprise de grandir sans que vous ayez à être partout en même temps. Chaque mandat se termine avec une documentation complète et une équipe formée, parce qu'un système que vous ne comprenez pas est une dette, pas un actif.",
      signature: 'William Fomete, Solutions Architect',
      location: 'Québec, Canada',
      linkedin: 'Profil LinkedIn',
    },
    finalCta: {
      title: 'Prêt à arrêter de perdre du temps sur ce qui devrait tourner seul ?',
      subtitle: 'Un appel de 30 minutes suffit pour savoir si on est faits pour travailler ensemble.',
      cta: 'Parler à William',
    },
    footer: {
      tagline: 'Solutions Architect. Automatisation et infrastructure pour PME québécoises.',
      rights: '© 2026 CoreNode Systems. Québec, Canada.',
    },
    contact: {
      title: 'Parlons de votre projet',
      intro: 'Pas encore prêt à réserver un appel ? Décris-moi ton projet, je te réponds en 24h.',
      fields: {
        nom: 'Nom complet',
        email: 'Email',
        entreprise: 'Entreprise',
        entrepriseOptional: '(optionnel)',
        secteur: "Secteur d'activité",
        description: 'Description du projet',
        descriptionPlaceholder: 'Décris ton projet, ton secteur, et le plus gros défi opérationnel que tu cherches à régler.',
        secteurPlaceholder: 'Sélectionne ton secteur',
      },
      submit: 'Envoyer ma demande',
      submitting: 'Envoi en cours…',
      success: 'Merci ! Je te réponds sous 24h.',
      error: "Une erreur s'est produite. Réessaie ou écris-moi directement.",
      retry: 'Réessayer',
      emailInvalid: 'Entre une adresse courriel valide.',
      required: 'Ce champ est requis.',
    },
  },
  en: {
    nav: { services: 'Services', method: 'Method', about: 'About', cta: 'Book a call' },
    hero: {
      location: 'Quebec, Canada',
      titleA: 'Stop being the human bridge',
      titleB: 'between your own software.',
      subtitle: "I build the infrastructure that connects your tools, automates your follow-ups and frees your team from repetitive manual work. Documented systems you can operate without me.",
      cta: 'Book a discovery call',
      ctaSecondary: 'See the method',
      reassurance: 'No-commitment call. Reply within 24 h.',
    },
    pains: {
      title: 'Sound familiar?',
      subtitle: 'Four signs your operations are costing you more than you realize.',
      items: [
        { title: 'Office and field disconnected', text: "Your field crew and office staff can't talk to each other. Work orders, photos and signatures get lost between the two." },
        { title: 'The same tasks, every week', text: "You redo the same manual follow-ups, the same reminders, the same reports. Nobody should spend 6 hours a week copy-pasting." },
        { title: 'Growth blocked by operations', text: "You turn down contracts. Not because you lack clients, but because your internal processes would collapse under the extra load." },
        { title: "Tools that don't talk", text: "CRM, billing, dispatch, accounting: each does its job, but none communicates with the others. You become the human bridge between your own software." },
      ],
    },
    fit: {
      title: 'Who I work with',
      subtitle: 'The right fit is what makes engagements predictable.',
      yes: {
        title: 'This is for you if',
        items: [
          'You run a Quebec SMB in field service, construction or skilled trades',
          'You have 5 to 50 employees and operations have become the bottleneck',
          "You already use tools (CRM, dispatch, billing) but they don't talk to each other",
          'You want a documented system your team can operate without depending on the consultant',
        ],
      },
      no: {
        title: "This isn't for you if",
        items: [
          "You're looking for the lowest price rather than the most durable solution",
          'You want a gimmicky AI agent without touching your underlying processes',
          'You have nobody on your team available for the discovery phase',
          'You want code delivered without documentation or training',
        ],
      },
    },
    method: {
      title: 'How it works',
      subtitle: 'A clear sequence, defined deliverables at every stage, no surprises on the invoice.',
      steps: [
        { duration: '30 min', title: 'Discovery call', text: "No commitment. We map your full operation and identify where time is leaking." },
        { duration: '1 to 2 wks', title: 'Audit and architecture', text: "Full audit of your current situation, target architecture plan, ROI estimate before any commitment." },
        { duration: '2 to 6 wks', title: 'Implementation', text: "We build, integrate your existing tools, document every flow, train your team on the system delivered." },
        { duration: 'Forever', title: 'Guaranteed autonomy', text: "You leave with a system your team understands and can operate. No technical lock-in, no dependency." },
      ],
    },
    services: {
      title: 'What we build together',
      subtitle: 'Three pillars, one coherent architecture.',
      items: [
        { title: 'Operations automation', text: "Your existing tools, finally connected. I orchestrate your systems with n8n to eliminate re-entry and information loss between your platforms." },
        { title: 'Management infrastructure', text: "A structured database, a connected CRM, real-time dashboards. A single source of truth to run your business." },
        { title: 'Field systems', text: "Automated dispatch, technician tracking, office-field sync, automatic reminders and confirmations. Field and office finally aligned." },
      ],
    },
    about: {
      title: 'The architect behind the systems',
      body: "I don't sell tools. I build the infrastructure that lets your business grow without you having to be everywhere at once. Every engagement ends with full documentation and a trained team, because a system you don't understand is a liability, not an asset.",
      signature: 'William Fomete, Solutions Architect',
      location: 'Quebec, Canada',
      linkedin: 'LinkedIn profile',
    },
    finalCta: {
      title: 'Ready to stop losing time on what should run itself?',
      subtitle: 'A 30-minute call is enough to know if we should work together.',
      cta: 'Talk to William',
    },
    footer: {
      tagline: 'Solutions Architect. Automation and infrastructure for Quebec SMBs.',
      rights: '© 2026 CoreNode Systems. Quebec, Canada.',
    },
    contact: {
      title: "Let's talk about your project",
      intro: 'Not ready to book a call yet? Describe your project and I will get back to you within 24 hours.',
      fields: {
        nom: 'Full name',
        email: 'Email',
        entreprise: 'Company',
        entrepriseOptional: '(optional)',
        secteur: 'Industry',
        description: 'Project description',
        descriptionPlaceholder: 'Describe your project, your industry, and the biggest operational challenge you want to solve.',
        secteurPlaceholder: 'Select your industry',
      },
      submit: 'Send my request',
      submitting: 'Sending…',
      success: 'Thank you! I will reply within 24 hours.',
      error: 'Something went wrong. Please try again or email me directly.',
      retry: 'Try again',
      emailInvalid: 'Enter a valid email address.',
      required: 'This field is required.',
    },
  },
}

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="9" height="9" rx="1.5" fill="#fff" />
        <rect x="13" y="2" width="9" height="9" rx="1.5" stroke="#fff" strokeWidth="1.5" />
        <rect x="2" y="13" width="9" height="9" rx="1.5" stroke="#fff" strokeWidth="1.5" />
        <rect x="13" y="13" width="9" height="9" rx="1.5" fill="#fff" />
      </svg>
      <span className="text-[15px] font-semibold tracking-tight text-white">CoreNode</span>
    </div>
  )
}

function ArrowIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

function Button({ href, children, variant = 'primary', size = 'md', showArrow = false, className = '', disabled = false, type, ...props }) {
  const base = 'inline-flex items-center justify-center transition-colors'
  const sizes = {
    sm: 'gap-1.5 px-3.5 py-1.5 text-[13px] font-medium rounded-md',
    md: 'gap-2 px-5 py-3 text-[14px] font-medium rounded-md',
    lg: 'gap-2 px-6 py-3.5 text-[14px] font-medium rounded-md',
  }
  const variants = {
    primary: 'text-black bg-white hover:bg-white/90',
    secondary: 'text-white border border-white/15 hover:bg-white/5 hover:border-white/30',
  }
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${disabled ? 'opacity-60 cursor-not-allowed pointer-events-none' : ''} ${className}`

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
        {showArrow && <ArrowIcon size={14} />}
      </a>
    )
  }

  return (
    <button type={type || 'button'} disabled={disabled} className={classes} {...props}>
      {children}
      {showArrow && <ArrowIcon size={14} />}
    </button>
  )
}

function Spinner({ size = 16 }) {
  return (
    <svg
      className="animate-spin"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  )
}

function Field({ label, optional, error, htmlFor, children }) {
  return (
    <div>
      <label htmlFor={htmlFor} className={labelClass}>
        {label}
        {optional && <span className="text-white/40 font-normal ml-1">{optional}</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 text-[12px] text-red-400">{error}</p>}
    </div>
  )
}

function Input({ error, ...props }) {
  return (
    <input
      className={`${inputClass}${error ? ' border-red-400/50' : ''}`}
      {...props}
    />
  )
}

function Textarea({ error, ...props }) {
  return (
    <textarea
      className={`${inputClass} min-h-[120px] resize-y${error ? ' border-red-400/50' : ''}`}
      {...props}
    />
  )
}

function Select({ error, children, ...props }) {
  return (
    <select
      className={`${inputClass} appearance-none cursor-pointer${error ? ' border-red-400/50' : ''}`}
      {...props}
    >
      {children}
    </select>
  )
}

function CheckIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function XIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function Navbar({ lang, setLang, t }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navClass = scrolled
    ? 'fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-black/70 backdrop-blur-xl border-b border-white/10'
    : 'fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent'

  return (
    <nav className={navClass}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center">
          <Logo />
        </a>
        <div className="hidden md:flex items-center gap-7 text-[13px] text-white/60">
          <a href="#services" className="hover:text-white transition-colors">{t.nav.services}</a>
          <a href="#method" className="hover:text-white transition-colors">{t.nav.method}</a>
          <a href="#about" className="hover:text-white transition-colors">{t.nav.about}</a>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
            className="text-[11px] font-medium text-white/60 hover:text-white px-2.5 py-1.5 border border-white/15 rounded-md transition-colors hover:border-white/40"
            aria-label="Switch language"
          >
            {lang === 'fr' ? 'EN' : 'FR'}
          </button>
          <Button
            href={BOOKING}
            target="_blank"
            rel="noopener noreferrer"
            size="sm"
            className="hidden sm:inline-flex"
          >
            {t.nav.cta}
          </Button>
        </div>
      </div>
    </nav>
  )
}

function Hero({ t }) {
  return (
    <section id="top" className="relative pt-40 pb-32 px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/10 via-transparent to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(ellipse at top, black 30%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at top, black 30%, transparent 70%)',
          }}
        />
      </div>
      <div className="max-w-5xl mx-auto relative">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[12px] font-medium text-white/70 mb-8">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
          {t.hero.location}
        </div>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold leading-[1.04] tracking-tight text-white">
          {t.hero.titleA}
          <br />
          <span className="text-white/40">{t.hero.titleB}</span>
        </h1>
        <p className="mt-8 text-lg sm:text-xl text-white/60 max-w-2xl leading-relaxed">
          {t.hero.subtitle}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Button
            href={BOOKING}
            target="_blank"
            rel="noopener noreferrer"
            showArrow
          >
            {t.hero.cta}
          </Button>
          <Button href="#method" variant="secondary">
            {t.hero.ctaSecondary}
          </Button>
        </div>
        <p className="mt-4 text-[13px] text-white/40">
          {t.hero.reassurance}{' '}
          <a href="#contact" className="text-white/60 hover:text-white underline underline-offset-2 transition-colors">
            {t.contact.title} →
          </a>
        </p>
      </div>
    </section>
  )
}

function SectionHeader({ title, subtitle }) {
  return (
    <div className="max-w-2xl mb-14">
      <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
        {title}
      </h2>
      {subtitle && <p className="mt-3 text-[17px] text-white/60 leading-relaxed">{subtitle}</p>}
    </div>
  )
}

function Pains({ t }) {
  return (
    <section className="py-24 px-6 lg:px-8 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title={t.pains.title} subtitle={t.pains.subtitle} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {t.pains.items.map((pain, i) => (
            <div key={i} className="group relative bg-white/[0.02] border border-white/10 rounded-xl p-7 hover:bg-white/[0.04] hover:border-white/20 transition-all">
              <div className="text-[12px] font-medium text-white/30 tabular-nums mb-4">
                {'0' + (i + 1)}
              </div>
              <h3 className="text-[17px] font-medium text-white mb-2">
                {pain.title}
              </h3>
              <p className="text-[14px] text-white/55 leading-relaxed">{pain.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Fit({ t }) {
  return (
    <section className="py-24 px-6 lg:px-8 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title={t.fit.title} subtitle={t.fit.subtitle} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/[0.02] border border-white/10 rounded-xl p-8">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-7 h-7 bg-emerald-400/10 text-emerald-400 rounded-full flex items-center justify-center">
                <CheckIcon size={14} />
              </div>
              <h3 className="text-[15px] font-medium text-white">{t.fit.yes.title}</h3>
            </div>
            <ul className="space-y-3.5">
              {t.fit.yes.items.map((item, i) => (
                <li key={i} className="flex gap-3 text-[14px] text-white/75 leading-relaxed">
                  <span className="text-emerald-400 mt-1 flex-shrink-0">
                    <CheckIcon size={14} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white/[0.02] border border-white/10 rounded-xl p-8">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-7 h-7 bg-white/5 text-white/40 rounded-full flex items-center justify-center">
                <XIcon size={14} />
              </div>
              <h3 className="text-[15px] font-medium text-white">{t.fit.no.title}</h3>
            </div>
            <ul className="space-y-3.5">
              {t.fit.no.items.map((item, i) => (
                <li key={i} className="flex gap-3 text-[14px] text-white/45 leading-relaxed">
                  <span className="text-white/30 mt-1 flex-shrink-0">
                    <XIcon size={14} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function Method({ t }) {
  return (
    <section id="method" className="py-24 px-6 lg:px-8 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title={t.method.title} subtitle={t.method.subtitle} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.method.steps.map((step, i) => (
            <div key={i} className="relative">
              <div className="text-[11px] font-medium text-violet-300/80 uppercase tracking-[0.12em] mb-3">
                {step.duration}
              </div>
              <div className="text-[40px] font-semibold text-white/80 leading-none mb-4 tabular-nums">
                {'0' + (i + 1)}
              </div>
              <div className="w-8 h-px bg-white/15 mb-4"></div>
              <h3 className="text-[15px] font-medium text-white mb-2">{step.title}</h3>
              <p className="text-[14px] text-white/55 leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Services({ t }) {
  return (
    <section id="services" className="py-24 px-6 lg:px-8 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title={t.services.title} subtitle={t.services.subtitle} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {t.services.items.map((service, i) => (
            <div key={i} className="bg-white/[0.02] border border-white/10 rounded-xl p-7 hover:bg-white/[0.04] hover:border-white/20 transition-all">
              <div className="text-[12px] font-medium text-white/30 tabular-nums mb-4">
                {'0' + (i + 1)}
              </div>
              <h3 className="text-[16px] font-medium text-white mb-3">{service.title}</h3>
              <p className="text-[14px] text-white/55 leading-relaxed">{service.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function About({ t }) {
  return (
    <section id="about" className="py-24 px-6 lg:px-8 border-t border-white/10">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-8">
          {t.about.title}
        </h2>
        <p className="text-[17px] text-white/70 leading-relaxed mb-10">
          {t.about.body}
        </p>
        <div className="flex flex-wrap items-center gap-6 pt-8 border-t border-white/10">
          <div>
            <div className="text-[14px] font-medium text-white">{t.about.signature}</div>
            <div className="text-[13px] text-white/50 mt-1">{t.about.location}</div>
          </div>
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-white border border-white/15 rounded-md hover:bg-white/5 hover:border-white/30 transition-colors ml-auto">
            {t.about.linkedin}
            <ArrowIcon size={12} />
          </a>
        </div>
      </div>
    </section>
  )
}

function ContactForm({ t, lang }) {
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    nom: '',
    email: '',
    entreprise: '',
    secteur: '',
    description: '',
    company_website: '',
  })

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const update = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const validate = () => {
    const next = {}
    if (!form.nom.trim()) next.nom = t.contact.required
    if (!form.email.trim()) {
      next.email = t.contact.required
    } else if (!emailRegex.test(form.email.trim())) {
      next.email = t.contact.emailInvalid
    }
    if (!form.secteur) next.secteur = t.contact.required
    if (!form.description.trim()) next.description = t.contact.required
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    if (form.company_website) {
      setStatus('success')
      return
    }

    if (!WEBHOOK_URL) {
      setStatus('error')
      return
    }

    setStatus('loading')

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom: form.nom.trim(),
          email: form.email.trim(),
          entreprise: form.entreprise.trim(),
          secteur: form.secteur,
          description: form.description.trim(),
          company_website: form.company_website,
        }),
      })

      if (!res.ok) throw new Error('Request failed')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const handleRetry = () => {
    setStatus('idle')
    setErrors({})
  }

  if (status === 'success') {
    return (
      <div className="bg-white/[0.02] border border-white/10 rounded-xl p-8 text-center">
        <div className="w-10 h-10 mx-auto mb-4 bg-emerald-400/10 text-emerald-400 rounded-full flex items-center justify-center">
          <CheckIcon size={18} />
        </div>
        <p className="text-[16px] font-medium text-white">{t.contact.success}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="relative bg-white/[0.02] border border-white/10 rounded-xl p-6 sm:p-8 space-y-5">
      {status === 'error' && (
        <div className="rounded-md border border-red-400/30 bg-red-400/10 px-4 py-3 text-[13px] text-red-300">
          <p>{t.contact.error}</p>
          <button
            type="button"
            onClick={handleRetry}
            className="mt-2 text-[13px] font-medium text-white underline underline-offset-2 hover:text-white/80 transition-colors"
          >
            {t.contact.retry}
          </button>
        </div>
      )}

      <Field label={t.contact.fields.nom} htmlFor="nom" error={errors.nom}>
        <Input
          id="nom"
          name="nom"
          type="text"
          required
          value={form.nom}
          onChange={update('nom')}
          disabled={status === 'loading'}
          error={errors.nom}
        />
      </Field>

      <Field label={t.contact.fields.email} htmlFor="email" error={errors.email}>
        <Input
          id="email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={update('email')}
          disabled={status === 'loading'}
          error={errors.email}
        />
      </Field>

      <Field
        label={t.contact.fields.entreprise}
        optional={t.contact.fields.entrepriseOptional}
        htmlFor="entreprise"
      >
        <Input
          id="entreprise"
          name="entreprise"
          type="text"
          value={form.entreprise}
          onChange={update('entreprise')}
          disabled={status === 'loading'}
        />
      </Field>

      <Field label={t.contact.fields.secteur} htmlFor="secteur" error={errors.secteur}>
        <Select
          id="secteur"
          name="secteur"
          required
          value={form.secteur}
          onChange={update('secteur')}
          disabled={status === 'loading'}
          error={errors.secteur}
        >
          <option value="" disabled className="bg-[#0A0A0B] text-white/50">
            {t.contact.fields.secteurPlaceholder}
          </option>
          {SECTEUR_OPTIONS[lang].map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-[#0A0A0B]">
              {opt.label}
            </option>
          ))}
        </Select>
      </Field>

      <Field label={t.contact.fields.description} htmlFor="description" error={errors.description}>
        <Textarea
          id="description"
          name="description"
          required
          rows={5}
          placeholder={t.contact.fields.descriptionPlaceholder}
          value={form.description}
          onChange={update('description')}
          disabled={status === 'loading'}
          error={errors.description}
        />
      </Field>

      <div
        className="absolute -left-[9999px] w-px h-px overflow-hidden"
        aria-hidden="true"
      >
        <input
          id="company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.company_website}
          onChange={update('company_website')}
        />
      </div>

      <Button type="submit" disabled={status === 'loading'} className="w-full sm:w-auto">
        {status === 'loading' ? (
          <>
            <Spinner size={16} />
            {t.contact.submitting}
          </>
        ) : (
          t.contact.submit
        )}
      </Button>
    </form>
  )
}

function Contact({ t, lang }) {
  return (
    <section id="contact" className="py-24 px-6 lg:px-8 border-t border-white/10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
            {t.contact.title}
          </h2>
          <p className="mt-4 text-[17px] text-white/60 leading-relaxed">
            {t.contact.intro}
          </p>
          <div className="mt-8">
            <Button
              href={BOOKING}
              target="_blank"
              rel="noopener noreferrer"
              showArrow
            >
              {t.hero.cta}
            </Button>
          </div>
        </div>
        <ContactForm t={t} lang={lang} />
      </div>
    </section>
  )
}

function FinalCTA({ t }) {
  return (
    <section className="py-32 px-6 lg:px-8 border-t border-white/10 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-violet-500/10 to-transparent" />
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-semibold leading-[1.1] tracking-tight text-white">
          {t.finalCta.title}
        </h2>
        <p className="mt-6 text-[17px] text-white/60">{t.finalCta.subtitle}</p>
        <Button
          href={BOOKING}
          target="_blank"
          rel="noopener noreferrer"
          size="lg"
          showArrow
          className="mt-10"
        >
          {t.finalCta.cta}
        </Button>
      </div>
    </section>
  )
}

function Footer({ t }) {
  return (
    <footer className="border-t border-white/10 py-12 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <Logo />
          <p className="text-[13px] text-white/45 mt-3 max-w-md">{t.footer.tagline}</p>
        </div>
        <div className="text-[13px] text-white/45 sm:text-right">
          <a href={MAILTO} className="text-white/80 hover:text-white block mb-1 transition-colors">
            {EMAIL}
          </a>
          <p>{t.footer.rights}</p>
        </div>
      </div>
    </footer>
  )
}

function App() {
  const [lang, setLang] = useState('fr')

  useEffect(() => {
    const stored = localStorage.getItem('corenode-lang')
    if (stored === 'fr' || stored === 'en') setLang(stored)
  }, [])

  useEffect(() => {
    localStorage.setItem('corenode-lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  const t = content[lang]

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white antialiased">
      <Navbar lang={lang} setLang={setLang} t={t} />
      <main>
        <Hero t={t} />
        <Contact t={t} lang={lang} />
        <Pains t={t} />
        <Fit t={t} />
        <Method t={t} />
        <Services t={t} />
        <About t={t} />
        <FinalCTA t={t} />
      </main>
      <Footer t={t} />
    </div>
  )
}

export default App
