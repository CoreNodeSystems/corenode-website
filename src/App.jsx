import { useState, useEffect } from 'react'

const EMAIL = 'william@corenodesystems.com'
const MAILTO = 'mailto:' + EMAIL
const LINKEDIN = 'https://www.linkedin.com/in/william-fomete'
const BOOKING = MAILTO

const content = {
  fr: {
    nav: { services: 'Services', method: 'Méthode', about: 'À propos', cta: 'Réserver un appel' },
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
          <a
            href={BOOKING}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[13px] font-medium text-black bg-white rounded-md hover:bg-white/90 transition-colors"
          >
            {t.nav.cta}
          </a>
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
          <a href={BOOKING} className="inline-flex items-center gap-2 px-5 py-3 text-[14px] font-medium text-black bg-white rounded-md hover:bg-white/90 transition-colors">
            {t.hero.cta}
            <ArrowIcon size={14} />
          </a>
          <a href="#method" className="inline-flex items-center gap-2 px-5 py-3 text-[14px] font-medium text-white border border-white/15 rounded-md hover:bg-white/5 hover:border-white/30 transition-colors">
            {t.hero.ctaSecondary}
          </a>
        </div>
        <p className="mt-4 text-[13px] text-white/40">{t.hero.reassurance}</p>
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

function FinalCTA({ t }) {
  return (
    <section className="py-32 px-6 lg:px-8 border-t border-white/10 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-violet-500/10 to-transparent" />
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-semibold leading-[1.1] tracking-tight text-white">
          {t.finalCta.title}
        </h2>
        <p className="mt-6 text-[17px] text-white/60">{t.finalCta.subtitle}</p>
        <a href={BOOKING} className="mt-10 inline-flex items-center gap-2 px-6 py-3.5 text-[14px] font-medium text-black bg-white rounded-md hover:bg-white/90 transition-colors">
          {t.finalCta.cta}
          <ArrowIcon size={14} />
        </a>
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
