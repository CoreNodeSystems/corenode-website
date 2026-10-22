import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import useLang from './useLang.js'
import AuditPage from './AuditPage.jsx'
import PrivacyPage from './PrivacyPage.jsx'
import NotFoundPage from './NotFoundPage.jsx'
import Seo from './seo/Seo.jsx'
import { PAGES } from './seo/siteMeta.js'
import { Logo } from './SimpleLayout.jsx'
import { STACK } from './stack.js'
import portraitWebp from './assets/william-fomete.webp'
import portraitJpg from './assets/william-fomete.jpg'
import avatarImg from './assets/william-avatar.webp'
import {
  EMAIL,
  MAILTO,
  PHONE,
  TEL,
  LINKEDIN,
  BOOKING,
  GOOGLE_PROFILE,
  LEGAL_NAME,
  BRAND,
} from './contact.js'

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
  'w-full bg-white/[0.03] border border-white/10 rounded-md px-4 py-2.5 text-[14px] text-white placeholder:text-white/40 transition-colors focus:outline-none focus:border-white/30 focus:bg-white/[0.04] disabled:opacity-50 disabled:cursor-not-allowed'
const labelClass = 'block text-[13px] font-medium text-white/70 mb-1.5'

const content = {
  fr: {
    nav: { services: 'Services', method: 'Méthode', about: 'À propos', cta: 'Réserver un appel découverte', call: 'Appeler William' },
    hero: {
      location: 'Automatisation pour entrepreneurs en services terrain, de Québec à la Beauce',
      titleA: "Arrête d'être le pont humain",
      titleB: 'entre tes propres logiciels.',
      subtitle: "Je construis l'infrastructure qui connecte tes outils, automatise tes suivis et libère ton équipe du travail manuel répétitif. Des systèmes documentés que tu peux opérer sans moi.",
      cta: 'Réserver un appel découverte',
      ctaAudit: 'Diagnostic gratuit en 2 minutes',
      reassurance: 'Appel sans engagement, réponse sous 24 h.',
      direct: 'Tu parles directement à William.',
      callPrefix: 'Ou appelle au',
      proofHours: '40 h',
      proofHoursLabel: 'de travail manuel évitées chaque semaine pour mon dernier client',
      ratingValue: (r) => r.toFixed(1).replace('.', ','),
      ratingLabel: (n) => `sur Google, ${n} avis`,
      flow: {
        label: 'Exemples de flux automatisés',
        prev: 'Exemple précédent',
        next: 'Exemple suivant',
        examples: [
          {
            name: 'Services terrain',
            steps: [
              { title: 'Appel du client', text: 'Fiche client créée dans le CRM', tool: 'Zoho CRM' },
              { title: 'Bon de travail', text: "Généré avec l'adresse et le problème", tool: 'Zoho FSM' },
              { title: 'Dispatch', text: 'Technicien proposé selon la distance et l’horaire', tool: 'n8n + Google Maps' },
              { title: 'Facture', text: 'Envoyée dès que le travail est signé', tool: 'QuickBooks' },
            ],
            result: 'Information tapée une seule fois',
          },
          {
            name: 'Soumissions',
            steps: [
              { title: 'Demande sur ton site', text: 'Le prospect est ajouté au CRM avec ses besoins', tool: 'HubSpot' },
              { title: 'Soumission', text: 'Préparée à partir de ton gabarit, prête à envoyer', tool: 'PandaDoc' },
              { title: 'Relance', text: 'Rappel automatique si rien n’est signé après 3 jours', tool: 'n8n + Gmail' },
              { title: 'Signature', text: 'Le projet est créé et planifié pour ton équipe', tool: 'Airtable' },
            ],
            result: 'Aucune soumission oubliée',
          },
          {
            name: 'Demandes entrantes',
            steps: [
              { title: 'Courriel ou formulaire', text: 'Toutes les demandes arrivent au même endroit', tool: 'Microsoft 365' },
              { title: 'Tri par l’IA', text: 'Urgence et type de service identifiés', tool: 'Claude' },
              { title: 'Réponse', text: 'Brouillon rédigé, tu approuves en un clic', tool: 'Outlook' },
              { title: 'Suivi', text: 'Tâche assignée à la bonne personne', tool: 'Zoho CRM' },
            ],
            result: 'Aucune demande qui dort dans la boîte',
          },
        ],
      },
    },
    stack: {
      title: 'Les outils que je connecte au quotidien',
      sub: "Je travaille avec ce que tu as déjà. On ajoute un outil seulement s'il règle un vrai problème.",
    },
    pains: {
      title: 'Tu reconnais ça ?',
      subtitle: 'Quatre signes que tes opérations te coûtent plus que tu le réalises.',
      items: [
        { title: 'Bureau et terrain déconnectés', text: "Tes équipes terrain et ton bureau ne se parlent pas. Les bons de travail, les photos, les signatures se perdent entre les deux." },
        { title: 'Les mêmes tâches, chaque semaine', text: "Tu refais manuellement les mêmes suivis, les mêmes relances, les mêmes rapports. Personne ne devrait passer 6 heures par semaine à copier-coller." },
        { title: 'La croissance bloquée par les opérations', text: "Tu refuses des contrats. Pas par manque de clients, mais parce que tes processus internes s'effondreraient sous la charge supplémentaire." },
        { title: 'Des outils qui ne se parlent pas', text: "CRM, facturation, dispatch, comptabilité : chacun fait sa job, mais aucun ne communique avec l'autre. Tu deviens le pont humain entre tes propres logiciels." },
      ],
    },
    auditCta: {
      text: "Tu veux un diagnostic avant d'appeler ?",
      sub: 'Nomme tes 3 outils principaux et reçois un verdict direct. Gratuit, ça prend 2 minutes.',
      cta: 'Faire le test',
    },
    fit: {
      title: 'Pour qui je travaille',
      subtitle: "Le bon fit, c'est ce qui rend les mandats prévisibles.",
      yes: {
        title: "C'est pour toi si",
        items: [
          'Tu diriges une PME québécoise en services terrain, construction ou métiers spécialisés',
          'Tu as entre 10 et 50 employés et tes opérations sont devenues le goulot',
          'Tu utilises déjà des outils (CRM, dispatch, facturation) mais ils ne se parlent pas',
          'Tu veux un système documenté que ton équipe peut opérer sans dépendre du consultant',
        ],
      },
      no: {
        title: "C'est pas pour toi si",
        items: [
          'Tu cherches le prix le plus bas plutôt que la solution la plus durable',
          'Tu veux un agent IA gadget sans toucher à tes processus de fond',
          "Tu n'as personne dans ton équipe pour participer à la phase de découverte",
          'Tu veux du code livré sans documentation ni formation',
        ],
      },
    },
    method: {
      title: 'Comment ça fonctionne',
      subtitle: 'Une séquence claire, des livrables définis à chaque étape, aucune surprise sur la facture.',
      steps: [
        { duration: '30 min', title: 'Appel découverte', text: "Sans engagement. On cartographie ton opération complète et on identifie où le temps se perd." },
        { duration: '1 à 2 sem.', title: 'Audit et architecture', text: "Diagnostic complet de ta situation actuelle, plan d'architecture cible, estimation du ROI avant tout engagement." },
        { duration: '2 à 6 sem.', title: 'Implémentation', text: "On construit, on intègre tes outils existants, on documente chaque flux, on forme ton équipe sur le système livré." },
        { duration: 'Permanent', title: 'Autonomie garantie', text: "Tu repars avec un système que ton équipe comprend et peut opérer. Pas de verrou technique, pas de dépendance." },
      ],
    },
    services: {
      title: "Ce qu'on construit ensemble",
      subtitle: 'Quatre piliers, une architecture cohérente.',
      items: [
        { title: 'Automatisation des opérations', text: "Tes outils existants, enfin connectés. J'orchestre tes systèmes avec n8n pour éliminer les ressaisies et les pertes d'information entre tes plateformes." },
        { title: 'Infrastructure de gestion', text: "Une base de données structurée, un CRM connecté, des tableaux de bord en temps réel. Une seule source de vérité pour piloter ton entreprise." },
        { title: 'Systèmes de terrain', text: "Dispatch automatisé, suivi des techniciens, synchronisation bureau-terrain, rappels et confirmations automatiques. Le terrain et le bureau enfin alignés." },
        { title: 'IA intégrée à tes processus', text: "Tri des demandes, rédaction de réponses, lecture de factures et de bons de commande. L'IA fait le travail répétitif, une personne de ton équipe garde la décision." },
      ],
    },
    about: {
      title: "L'architecte derrière les systèmes",
      body: "Je ne vends pas des outils. Je construis l'infrastructure qui permet à ton entreprise de grandir sans que tu aies à être partout en même temps. Chaque mandat se termine avec une documentation complète et une équipe formée, parce qu'un système que tu ne comprends pas est une dette, pas un actif.",
      proof: "Dernier mandat en date : plus de 40 heures de saisie et de coordination manuelles évitées chaque semaine. L'équivalent d'un poste administratif à temps plein.",
      signature: 'William Fomete, architecte de solutions',
      photoAlt: 'William Fomete, fondateur de CoreNode Systems',
      location: 'Québec, Canada',
      linkedin: 'Profil LinkedIn',
    },
    finalCta: {
      title: 'Prêt à arrêter de perdre du temps sur ce qui devrait tourner seul ?',
      subtitle: 'Un appel de 30 minutes suffit pour savoir si on est faits pour travailler ensemble.',
      cta: 'Parler à William',
      phone: 'Ou appelle-moi directement au',
    },
    footer: {
      tagline: 'Architecte de solutions. Automatisation et infrastructure pour PME québécoises en services terrain.',
      rights: `© 2026 ${LEGAL_NAME} (${BRAND}). Québec, Canada.`,
      privacy: 'Politique de confidentialité',
      audit: 'Diagnostic gratuit',
      home: 'Accueil',
    },
    contact: {
      title: 'Parlons de ton projet',
      intro: 'Pas encore prêt à réserver un appel ? Décris-moi ton projet, je te réponds en 24 h.',
      reassuranceTitle: 'À quoi t\u2019attendre',
      reassurance: [
        { title: 'Réponse sous 24 h', text: 'Pas de file d\u2019attente, pas de robot. Je lis ta demande et je te reviens.' },
        { title: '100 % confidentiel', text: 'Tes informations servent à te répondre, point. Jamais vendues, jamais utilisées pour autre chose.' },
        { title: 'Sans engagement', text: 'Un premier échange pour voir si le fit est là. Rien à signer.' },
      ],
      directTitle: 'Tu préfères écrire ou appeler ?',
      phoneLabel: 'Téléphone',
      emailLabel: 'Courriel',
      linkedinLabel: 'LinkedIn',
      fields: {
        nom: 'Nom complet',
        email: 'Courriel',
        entreprise: 'Entreprise',
        entrepriseOptional: '(optionnel)',
        secteur: "Secteur d'activité",
        description: 'Description du projet',
        descriptionPlaceholder: 'Décris ton projet, ton secteur, et le plus gros défi opérationnel que tu cherches à régler.',
        secteurPlaceholder: 'Sélectionne ton secteur',
      },
      submit: 'Envoyer ma demande',
      submitting: 'Envoi en cours…',
      success: 'Merci ! Je te réponds sous 24 h.',
      error: "L'envoi n'a pas fonctionné. Réessaie, ou joins-moi directement :",
      retry: 'Réessayer',
      emailInvalid: 'Entre une adresse courriel valide.',
      required: 'Ce champ est requis.',
      privacyNote: 'Tes renseignements servent uniquement à répondre à ta demande. Ils sont traités par mes fournisseurs techniques, dont certains hébergent les données à l’extérieur du Québec. Détails dans la',
      privacyLink: 'politique de confidentialité',
    },
  },
  en: {
    nav: { services: 'Services', method: 'Method', about: 'About', cta: 'Book a call', call: 'Call William' },
    hero: {
      location: 'Automation for field service businesses, from Québec City to the Beauce',
      titleA: 'Stop being the human bridge',
      titleB: 'between your own software.',
      subtitle: "I build the infrastructure that connects your tools, automates your follow-ups and frees your team from repetitive manual work. Documented systems you can operate without me.",
      cta: 'Book a discovery call',
      ctaAudit: 'Free 2-minute diagnostic',
      reassurance: 'No-commitment call, reply within 24 h.',
      direct: 'You talk directly to William.',
      callPrefix: 'Or call',
      proofHours: '40 h',
      proofHoursLabel: 'of manual work avoided every week for my latest client',
      ratingValue: (r) => r.toFixed(1),
      ratingLabel: (n) => `on Google, ${n} review${n === 1 ? '' : 's'}`,
      flow: {
        label: 'Examples of automated flows',
        prev: 'Previous example',
        next: 'Next example',
        examples: [
          {
            name: 'Field service',
            steps: [
              { title: 'Customer call', text: 'Customer record created in the CRM', tool: 'Zoho CRM' },
              { title: 'Work order', text: 'Generated with the address and the problem', tool: 'Zoho FSM' },
              { title: 'Dispatch', text: 'Technician suggested by distance and schedule', tool: 'n8n + Google Maps' },
              { title: 'Invoice', text: 'Sent as soon as the job is signed off', tool: 'QuickBooks' },
            ],
            result: 'Information typed only once',
          },
          {
            name: 'Quotes',
            steps: [
              { title: 'Request on your site', text: 'The lead is added to the CRM with their needs', tool: 'HubSpot' },
              { title: 'Quote', text: 'Built from your template, ready to send', tool: 'PandaDoc' },
              { title: 'Follow-up', text: 'Automatic reminder if nothing is signed after 3 days', tool: 'n8n + Gmail' },
              { title: 'Signature', text: 'The project is created and scheduled for your team', tool: 'Airtable' },
            ],
            result: 'No quote forgotten',
          },
          {
            name: 'Incoming requests',
            steps: [
              { title: 'Email or form', text: 'Every request lands in one place', tool: 'Microsoft 365' },
              { title: 'AI triage', text: 'Urgency and type of service identified', tool: 'Claude' },
              { title: 'Reply', text: 'Draft written, you approve in one click', tool: 'Outlook' },
              { title: 'Follow-through', text: 'Task assigned to the right person', tool: 'Zoho CRM' },
            ],
            result: 'No request left sitting in the inbox',
          },
        ],
      },
    },
    stack: {
      title: 'The tools I connect every day',
      sub: 'I work with what you already have. A new tool only gets added if it solves a real problem.',
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
    auditCta: {
      text: 'Want a diagnosis before booking a call?',
      sub: 'Name your 3 main tools and get a straight verdict. Free, takes 2 minutes.',
      cta: 'Take the test',
    },
    fit: {
      title: 'Who I work with',
      subtitle: 'The right fit is what makes engagements predictable.',
      yes: {
        title: 'This is for you if',
        items: [
          'You run a Quebec SMB in field service, construction or skilled trades',
          'You have 10 to 50 employees and operations have become the bottleneck',
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
      subtitle: 'Four pillars, one coherent architecture.',
      items: [
        { title: 'Operations automation', text: "Your existing tools, finally connected. I orchestrate your systems with n8n to eliminate re-entry and information loss between your platforms." },
        { title: 'Management infrastructure', text: "A structured database, a connected CRM, real-time dashboards. A single source of truth to run your business." },
        { title: 'Field systems', text: "Automated dispatch, technician tracking, office-field sync, automatic reminders and confirmations. Field and office finally aligned." },
        { title: 'AI built into your processes', text: "Sorting requests, drafting replies, reading invoices and purchase orders. AI handles the repetitive work, someone on your team keeps the final say." },
      ],
    },
    about: {
      title: 'The architect behind the systems',
      body: "I don't sell tools. I build the infrastructure that lets your business grow without you having to be everywhere at once. Every engagement ends with full documentation and a trained team, because a system you don't understand is a liability, not an asset.",
      proof: 'Latest engagement: over 40 hours of manual data entry and coordination avoided every week. The equivalent of one full-time administrative role.',
      signature: 'William Fomete, Solutions Architect',
      photoAlt: 'William Fomete, founder of CoreNode Systems',
      location: 'Quebec, Canada',
      linkedin: 'LinkedIn profile',
    },
    finalCta: {
      title: 'Ready to stop losing time on what should run itself?',
      subtitle: 'A 30-minute call is enough to know if we should work together.',
      cta: 'Talk to William',
      phone: 'Or call me directly at',
    },
    footer: {
      tagline: 'Solutions architect. Automation and infrastructure for Quebec field service SMBs.',
      rights: `© 2026 ${LEGAL_NAME} (${BRAND}). Quebec, Canada.`,
      privacy: 'Privacy policy',
      audit: 'Free diagnostic',
      home: 'Home',
    },
    contact: {
      title: "Let's talk about your project",
      intro: 'Not ready to book a call yet? Describe your project and I will get back to you within 24 hours.',
      reassuranceTitle: 'What to expect',
      reassurance: [
        { title: 'Reply within 24 h', text: 'No queue, no bot. I read your message and get back to you myself.' },
        { title: '100% confidential', text: 'Your information is used to reply to you, nothing else. Never sold.' },
        { title: 'No commitment', text: 'A first conversation to see if there\u2019s a fit. Nothing to sign.' },
      ],
      directTitle: 'Prefer to write or call?',
      phoneLabel: 'Phone',
      emailLabel: 'Email',
      linkedinLabel: 'LinkedIn',
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
      error: 'Sending failed. Try again, or reach me directly:',
      retry: 'Try again',
      emailInvalid: 'Enter a valid email address.',
      required: 'This field is required.',
      privacyNote: 'Your information is only used to answer your request. It is processed by my technical providers, some of which host data outside Quebec. Details in the',
      privacyLink: 'privacy policy',
    },
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

function Button({ href, children, variant = 'primary', size = 'md', showArrow = false, className = '', disabled = false, type, ...props }) {
  const base = 'group inline-flex items-center justify-center transition-colors'
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

  const arrow = showArrow && (
    <span className="transition-transform duration-200 group-hover:translate-x-0.5">
      <ArrowIcon size={14} />
    </span>
  )

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
        {arrow}
      </a>
    )
  }

  return (
    <button type={type || 'button'} disabled={disabled} className={classes} {...props}>
      {children}
      {arrow}
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
        {optional && <span className="text-white/60 font-normal ml-1">{optional}</span>}
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

function ClockIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15.5 14" />
    </svg>
  )
}

function LockIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="11" width="16" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  )
}

function HandshakeIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12l4-4 4 3 3-3 4 4" />
      <path d="M11 11l2 2 3-3" />
      <path d="M3 12v4l4 3 3-2" />
    </svg>
  )
}

function PhoneIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
    </svg>
  )
}

const REASSURANCE_ICONS = [ClockIcon, LockIcon, HandshakeIcon]

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
          <a
            href={TEL}
            className="hidden lg:inline text-[13px] text-white/70 hover:text-white transition-colors tabular-nums"
          >
            {PHONE}
          </a>
          <a
            href={TEL}
            aria-label={t.nav.call}
            className="sm:hidden w-9 h-9 inline-flex items-center justify-center rounded-md border border-white/15 text-white/80 hover:text-white hover:border-white/40 transition-colors"
          >
            <PhoneIcon size={16} />
          </a>
          <button
            onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
            className="text-[11px] font-medium text-white/60 hover:text-white px-2.5 py-1.5 border border-white/15 rounded-md transition-colors hover:border-white/40"
            aria-label="Switch language"
          >
            {lang === 'fr' ? 'EN' : 'FR'}
          </button>
          <span className="hidden sm:block">
            <Button href={BOOKING} target="_blank" rel="noopener noreferrer" size="sm">
              {t.nav.cta}
            </Button>
          </span>
        </div>
      </div>
    </nav>
  )
}

// Valeurs de repli (HTML prérendu, ou si l'API est indisponible). La note réelle
// arrive de /api/google-rating, qui interroge Google et met le résultat en cache 1 h.
const RATING_FALLBACK = { rating: 5, count: 3 }

function useGoogleRating() {
  const [data, setData] = useState(RATING_FALLBACK)
  useEffect(() => {
    let cancelled = false
    fetch('/api/google-rating')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!cancelled && d && typeof d.rating === 'number' && typeof d.count === 'number') {
          setData({ rating: d.rating, count: d.count })
        }
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])
  return data
}

function Hero({ t }) {
  const google = useGoogleRating()
  return (
    <section id="top" className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 px-6 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-14 lg:gap-16 items-center">
        <div>
          <p className="inline-flex items-center gap-2 text-[13px] text-white/60 mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--teal)]" aria-hidden="true"></span>
            {t.hero.location}
          </p>
          <h1 className="text-[42px] leading-[1.05] sm:text-6xl lg:text-[64px] font-semibold text-white">
            {t.hero.titleA} {t.hero.titleB}
          </h1>
          <p className="mt-7 text-lg text-white/65 max-w-xl leading-relaxed">
            {t.hero.subtitle}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button href={BOOKING} target="_blank" rel="noopener noreferrer">
              {t.hero.cta}
            </Button>
            {/* Vrai lien <a href="/audit"> : Googlebot doit pouvoir suivre la route. */}
            <Link
              to="/audit"
              className="inline-flex items-center justify-center px-5 py-3 text-[14px] font-medium rounded-md text-white border border-white/15 hover:bg-white/5 hover:border-white/30 transition-colors"
            >
              {t.hero.ctaAudit}
            </Link>
          </div>
          <div className="mt-6 flex items-center gap-3">
            <img
              src={avatarImg}
              alt=""
              width="44"
              height="44"
              className="w-11 h-11 shrink-0 rounded-full object-cover"
            />
            <p className="text-[13px] text-white/60 leading-snug">
              <span className="text-white/85">{t.hero.direct}</span> {t.hero.reassurance}
              <br />
              {t.hero.callPrefix}{' '}
              <a
                href={TEL}
                className="text-white underline underline-offset-4 decoration-white/30 hover:decoration-white transition-colors tabular-nums"
              >
                {PHONE}
              </a>
            </p>
          </div>

          <dl className="mt-12 pt-8 border-t border-white/10 grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto_1fr] gap-x-4 gap-y-5 items-center max-w-xl">
            <dt className="font-display text-3xl font-semibold text-white">{t.hero.proofHours}</dt>
            <dd className="text-[13px] text-white/55 leading-snug">{t.hero.proofHoursLabel}</dd>
            <dt className="font-display text-3xl font-semibold text-white">{t.hero.ratingValue(google.rating)}</dt>
            <dd className="text-[13px] leading-snug">
              <a
                href={GOOGLE_PROFILE}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/55 hover:text-white underline underline-offset-4 decoration-white/20 hover:decoration-white/60 transition-colors"
              >
                {t.hero.ratingLabel(google.count)}
              </a>
            </dd>
          </dl>
        </div>

        <HeroFlow flow={t.hero.flow} />
      </div>
    </section>
  )
}

function ChevronIcon({ dir = 'right', size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {dir === 'left' ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
    </svg>
  )
}

// Exemples de flux : un dossier traverse les outils étape par étape. Changer
// d'exemple remonte la liste (key), ce qui rejoue l'animation CSS.
function HeroFlow({ flow }) {
  const [index, setIndex] = useState(0)
  const total = flow.examples.length
  const example = flow.examples[index]
  const go = (delta) => setIndex((i) => (i + delta + total) % total)

  return (
    <figure className="relative min-w-0 rounded-2xl border border-white/10 bg-[var(--panel)] p-6 sm:p-8" aria-label={flow.label}>
      <div
        className="-mx-2 mb-7 flex gap-1.5 overflow-x-auto px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label={flow.label}
      >
        {flow.examples.map((ex, i) => (
          <button
            key={ex.name}
            type="button"
            role="tab"
            aria-selected={i === index}
            onClick={() => setIndex(i)}
            className={`shrink-0 whitespace-nowrap px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors ${
              i === index ? 'bg-[var(--teal-soft)] text-white' : 'text-white/50 hover:text-white'
            }`}
          >
            {ex.name}
          </button>
        ))}
      </div>

      <div key={index} aria-live="polite">
        <ol className="relative space-y-7">
          <span className="absolute left-[5px] top-2 bottom-2 w-px bg-white/10" aria-hidden="true">
            <span className="flow-rail-fill absolute inset-0 bg-[var(--teal)]"></span>
          </span>
          {example.steps.map((step, i) => (
            <li key={step.title} className="flow-step relative pl-8" style={{ '--i': i }}>
              <span className="flow-dot absolute left-0 top-1.5 w-[11px] h-[11px] rounded-full" aria-hidden="true"></span>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <p className="text-[15px] font-medium text-white">{step.title}</p>
                <p className="text-[12px] text-[var(--teal)]">{step.tool}</p>
              </div>
              <p className="mt-1 text-[14px] text-white/55 leading-relaxed">{step.text}</p>
            </li>
          ))}
        </ol>
        <p className="flow-result mt-8 rounded-lg bg-[var(--teal-soft)] px-4 py-3 text-[14px] font-medium text-white">
          {example.result}
        </p>
      </div>
      <figcaption className="mt-5 flex items-center justify-between">
        <span className="text-[12px] text-white/60 tabular-nums">{index + 1} / {total}</span>
        <span className="flex gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label={flow.prev}
            className="w-9 h-9 inline-flex items-center justify-center rounded-full border border-white/15 text-white/70 hover:text-white hover:border-white/40 transition-colors"
          >
            <ChevronIcon dir="left" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label={flow.next}
            className="w-9 h-9 inline-flex items-center justify-center rounded-full border border-white/15 text-white/70 hover:text-white hover:border-white/40 transition-colors"
          >
            <ChevronIcon dir="right" />
          </button>
        </span>
      </figcaption>
    </figure>
  )
}

function StackLogo({ item }) {
  return (
    <li className="flex items-center gap-2.5 px-7 text-white/55 hover:text-white transition-colors">
      {item.path && (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
          <path d={item.path} />
        </svg>
      )}
      <span className="text-[15px] font-medium whitespace-nowrap">{item.name}</span>
    </li>
  )
}

function Stack({ t }) {
  return (
    <section aria-labelledby="stack-title" className="py-14 border-y border-white/10">
      <div className="px-6 lg:px-8 mb-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
          <h2 id="stack-title" className="text-xl font-semibold text-white">{t.stack.title}</h2>
          <p className="text-[14px] text-white/50 max-w-md">{t.stack.sub}</p>
        </div>
      </div>
      {/* La liste est dupliquée pour un défilement sans couture ; la copie est
          masquée aux lecteurs d'écran et retirée si le mouvement est réduit. */}
      <div className="marquee overflow-hidden">
        <div className="marquee-track">
          <ul className="flex shrink-0 items-center gap-y-6">
            {STACK.map((item) => <StackLogo key={item.name} item={item} />)}
          </ul>
          <ul className="flex shrink-0 items-center" aria-hidden="true" data-clone>
            {STACK.map((item) => <StackLogo key={item.name} item={item} />)}
          </ul>
        </div>
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
    <section className="py-24 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title={t.pains.title} subtitle={t.pains.subtitle} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {t.pains.items.map((pain, i) => (
            <div key={i} className="border-l-2 border-[var(--teal)] pl-6">
              <h3 className="text-[17px] font-medium text-white mb-2">
                {pain.title}
              </h3>
              <p className="text-[14px] text-white/60 leading-relaxed">{pain.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function AuditCTA({ t }) {
  return (
    <section className="px-6 lg:px-8 pb-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 bg-white/[0.03] border border-white/10 rounded-xl px-7 py-6">
          <div>
            <p className="text-[15px] font-medium text-white">{t.auditCta.text}</p>
            <p className="text-[13px] text-white/50 mt-1">{t.auditCta.sub}</p>
          </div>
          <Link
            to="/audit"
            className="inline-flex items-center px-4 py-2 text-[13px] font-medium text-white border border-white/15 rounded-md hover:bg-white/5 hover:border-white/30 transition-colors flex-shrink-0"
          >
            {t.auditCta.cta}
          </Link>
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
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-8">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-7 h-7 bg-[var(--teal-soft)] text-[var(--teal)] rounded-full flex items-center justify-center">
                <CheckIcon size={14} />
              </div>
              <h3 className="text-[15px] font-medium text-white">{t.fit.yes.title}</h3>
            </div>
            <ul className="space-y-3.5">
              {t.fit.yes.items.map((item, i) => (
                <li key={i} className="flex gap-3 text-[14px] text-white/75 leading-relaxed">
                  <span className="text-[var(--teal)] mt-1 flex-shrink-0">
                    <CheckIcon size={14} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-8">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-7 h-7 bg-white/5 text-white/60 rounded-full flex items-center justify-center">
                <XIcon size={14} />
              </div>
              <h3 className="text-[15px] font-medium text-white">{t.fit.no.title}</h3>
            </div>
            <ul className="space-y-3.5">
              {t.fit.no.items.map((item, i) => (
                <li key={i} className="flex gap-3 text-[14px] text-white/60 leading-relaxed">
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
              <div className="text-[13px] font-medium text-[var(--teal)] mb-3">
                {step.duration}
              </div>
              <div className="font-display text-[40px] font-semibold text-white/80 leading-none mb-4 tabular-nums">
                {'0' + (i + 1)}
              </div>
              <div className="w-8 h-px bg-white/15 mb-4"></div>
              <h3 className="text-[15px] font-medium text-white mb-2">{step.title}</h3>
              <p className="text-[14px] text-white/60 leading-relaxed">{step.text}</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {t.services.items.map((service, i) => (
            <div key={i} className="bg-white/[0.03] border border-white/10 rounded-xl p-7">
              <h3 className="text-[16px] font-medium text-white mb-3">{service.title}</h3>
              <p className="text-[14px] text-white/60 leading-relaxed">{service.text}</p>
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
      <div className="max-w-5xl mx-auto grid md:grid-cols-[260px_minmax(0,1fr)] lg:grid-cols-[300px_minmax(0,1fr)] gap-10 lg:gap-16 items-center">
        <picture className="block w-48 sm:w-60 md:w-full">
          <source srcSet={portraitWebp} type="image/webp" />
          <img
            src={portraitJpg}
            alt={t.about.photoAlt}
            width="720"
            height="900"
            loading="lazy"
            decoding="async"
            className="w-full h-auto rounded-2xl"
          />
        </picture>
        <div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-8">
            {t.about.title}
          </h2>
          <p className="text-[17px] text-white/70 leading-relaxed mb-8 max-w-xl">
            {t.about.body}
          </p>
          {t.about.proof && (
            <p className="text-[15px] text-white/60 leading-relaxed mb-10 pl-4 border-l-2 border-[var(--teal)] max-w-xl">
              {t.about.proof}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-6 pt-8 border-t border-white/10 max-w-xl">
            <div>
              <div className="text-[14px] font-medium text-white">{t.about.signature}</div>
              <div className="text-[13px] text-white/50 mt-1">{t.about.location}</div>
            </div>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 text-[13px] font-medium text-white border border-white/15 rounded-md hover:bg-white/5 hover:border-white/30 transition-colors ml-auto">
              {t.about.linkedin}
            </a>
          </div>
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

    setStatus('loading')

    try {
      // Fonction serveur du site (api/contact.js), qui transmet à n8n.
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom: form.nom.trim(),
          email: form.email.trim(),
          entreprise: form.entreprise.trim(),
          secteur: form.secteur,
          description: form.description.trim(),
          lang,
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
      <div className="bg-white/[0.03] border border-white/10 rounded-xl p-8 text-center">
        <div className="w-10 h-10 mx-auto mb-4 bg-[var(--teal-soft)] text-[var(--teal)] rounded-full flex items-center justify-center">
          <CheckIcon size={18} />
        </div>
        <p className="text-[16px] font-medium text-white">{t.contact.success}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="relative bg-white/[0.03] border border-white/10 rounded-xl p-6 sm:p-8 space-y-5">
      {status === 'error' && (
        <div className="rounded-md border border-red-400/30 bg-red-400/10 px-4 py-3 text-[13px] text-red-300">
          <p>
            {t.contact.error}{' '}
            <a href={MAILTO} className="text-white underline underline-offset-2">{EMAIL}</a>
            {' · '}
            <a href={TEL} className="text-white underline underline-offset-2 tabular-nums">{PHONE}</a>
          </p>
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
          <option value="" disabled className="bg-[#141416] text-white/50">
            {t.contact.fields.secteurPlaceholder}
          </option>
          {SECTEUR_OPTIONS[lang].map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-[#141416]">
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
          id="cn_ref_code"
          name="cn_ref_code"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.company_website}
          onChange={update('company_website')}
        />
      </div>

      <div className="space-y-4">
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

        <p className="text-[12px] text-white/60 leading-relaxed">
          {t.contact.privacyNote}{' '}
          <Link
            to="/confidentialite"
            className="text-white/80 hover:text-white underline underline-offset-2 transition-colors"
          >
            {t.contact.privacyLink}
          </Link>
          .
        </p>
      </div>
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

          <div className="mt-10 space-y-5">
            {t.contact.reassurance.map((item, i) => {
              const Icon = REASSURANCE_ICONS[i] || CheckIcon
              return (
                <div key={i} className="flex gap-4">
                  <div className="w-9 h-9 flex-shrink-0 bg-white/[0.03] border border-white/10 text-white/70 rounded-lg flex items-center justify-center">
                    <Icon size={16} />
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-white">{item.title}</div>
                    <div className="text-[13px] text-white/50 leading-relaxed mt-0.5">{item.text}</div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-10 pt-8 border-t border-white/10">
            <div className="text-[13px] font-medium text-white/70 mb-4">{t.contact.directTitle}</div>
            <div className="flex flex-wrap gap-3">
              <a
                href={TEL}
                className="inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-white border border-white/15 rounded-md hover:bg-white/5 hover:border-white/30 transition-colors"
              >
                <PhoneIcon size={14} />
                <span className="tabular-nums">{PHONE}</span>
              </a>
              <a
                href={MAILTO}
                className="inline-flex items-center px-4 py-2 text-[13px] font-medium text-white border border-white/15 rounded-md hover:bg-white/5 hover:border-white/30 transition-colors"
              >
                {t.contact.emailLabel}
              </a>
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 text-[13px] font-medium text-white border border-white/15 rounded-md hover:bg-white/5 hover:border-white/30 transition-colors"
              >
                {t.contact.linkedinLabel}
              </a>
            </div>
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
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[var(--teal-soft)] to-transparent" />
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
          className="mt-10"
        >
          {t.finalCta.cta}
        </Button>
        <p className="mt-6 text-[14px] text-white/60">
          {t.finalCta.phone}{' '}
          <a
            href={TEL}
            className="text-white underline underline-offset-4 decoration-white/30 hover:decoration-white transition-colors tabular-nums"
          >
            {PHONE}
          </a>
        </p>
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
          <p className="text-[13px] text-white/60 mt-3 max-w-md">{t.footer.tagline}</p>
          {/* Maillage interne. GSC rapportait zéro lien interne sur le domaine. */}
          <nav className="flex flex-wrap gap-x-5 gap-y-2 mt-4 text-[13px]">
            <Link to="/" className="text-white/60 hover:text-white transition-colors">
              {t.footer.home}
            </Link>
            <Link to="/audit" className="text-white/60 hover:text-white transition-colors">
              {t.footer.audit}
            </Link>
            <Link to="/confidentialite" className="text-white/60 hover:text-white transition-colors">
              {t.footer.privacy}
            </Link>
          </nav>
        </div>
        <div className="text-[13px] text-white/60 sm:text-right">
          <a href={TEL} className="text-white/80 hover:text-white block mb-1 transition-colors tabular-nums">
            {PHONE}
          </a>
          <a href={MAILTO} className="text-white/80 hover:text-white block mb-1 transition-colors">
            {EMAIL}
          </a>
          <p>{t.footer.rights}</p>
        </div>
      </div>
    </footer>
  )
}

function HomePage() {
  const [lang, setLang] = useLang()
  const t = content[lang]

  return (
    <div className="min-h-screen bg-[#141416] text-white antialiased">
      <Seo {...PAGES.home} />
      <Navbar lang={lang} setLang={setLang} t={t} />
      <main>
        <Hero t={t} />
        <Stack t={t} />
        <Pains t={t} />
        <AuditCTA t={t} />
        <Fit t={t} />
        <Method t={t} />
        <Services t={t} />
        <About t={t} />
        <Contact t={t} lang={lang} />
        <FinalCTA t={t} />
      </main>
      <Footer t={t} />
    </div>
  )
}

// Le routeur est fourni par l'appelant : BrowserRouter dans le navigateur
// (main.jsx), StaticRouter au prérendu (entry-server.jsx).
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/audit" element={<AuditPage />} />
      <Route path="/confidentialite" element={<PrivacyPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
