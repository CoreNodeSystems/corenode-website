const EMAIL = 'william@corenodesystems.com'
const MAILTO = `mailto:${EMAIL}`

const pains = [
  {
    icon: '📡',
    text: 'Ton équipe terrain et ton bureau ne se parlent pas — les infos se perdent en chemin.',
  },
  {
    icon: '🔁',
    text: 'Tu refais les mêmes suivis manuels chaque semaine parce qu\'aucun système ne le fait pour toi.',
  },
  {
    icon: '📈',
    text: 'Tu ne peux pas accepter plus de contrats — pas parce que tu manques de clients, mais parce que tes opérations s\'effondreraient.',
  },
  {
    icon: '🔌',
    text: 'Tu as des outils (CRM, facturation, dispatch) mais ils ne se parlent pas entre eux.',
  },
]

const steps = [
  {
    number: 1,
    title: 'Appel découverte (30 min)',
    description: 'Sans engagement. On cartographie ton opération complète.',
  },
  {
    number: 2,
    title: 'Audit & Architecture (1-2 semaines)',
    description: 'Diagnostic complet + feuille de route avec ROI estimé.',
  },
  {
    number: 3,
    title: 'Implémentation (2-6 semaines)',
    description: 'On construit, on documente, on forme ton équipe.',
  },
  {
    number: 4,
    title: 'Autonomie garantie',
    description: 'Tu pars avec un système que tu comprends et peux opérer sans moi.',
  },
]

const services = [
  {
    icon: '⚙️',
    title: 'Automatisation des opérations',
    description: 'Intégrations n8n, Zoho FSM, synchronisation API inter-systèmes',
  },
  {
    icon: '📊',
    title: 'Infrastructure de gestion',
    description: 'Airtable, CRM, tableaux de bord en temps réel',
  },
  {
    icon: '🛠️',
    title: 'Systèmes de terrain',
    description: 'Dispatch, suivi techniciens, sync bureau-terrain, workflows SMS',
  },
]

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <span className="text-xl font-bold text-gray-900 tracking-tight">
          CoreNode
        </span>
        <a
          href={MAILTO}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-accent rounded-lg hover:bg-accent/90 transition-colors shadow-sm"
        >
          Réserver un appel
        </a>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="bg-dark text-white pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
          Vos opérations fonctionnent. Vous, vous pouvez scaler.
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          J'aide les PME québécoises en services terrain à remplacer leurs
          processus manuels répétitifs par des systèmes documentés qui tournent
          seuls — et que vos équipes peuvent opérer sans moi.
        </p>
        <a
          href={MAILTO}
          className="mt-10 inline-flex items-center px-8 py-4 text-base font-semibold text-white bg-accent rounded-xl hover:bg-accent/90 transition-colors shadow-lg"
        >
          Réserver un appel découverte
        </a>
      </div>
    </section>
  )
}

function SectionTitle({ children }) {
  return (
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
      {children}
    </h2>
  )
}

function Pains() {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionTitle>Tu reconnais ça ?</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {pains.map((pain) => (
            <div
              key={pain.text}
              className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <span className="text-3xl mb-4 block" role="img" aria-hidden="true">
                {pain.icon}
              </span>
              <p className="text-gray-700 leading-relaxed">{pain.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Methodology() {
  return (
    <section className="bg-light py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionTitle>Comment ça fonctionne</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-accent text-white text-lg font-bold">
                {step.number}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionTitle>Ce qu'on construit ensemble</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <span className="text-3xl mb-4 block" role="img" aria-hidden="true">
                {service.icon}
              </span>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="bg-light py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <SectionTitle>L'architecte derrière les systèmes</SectionTitle>
        <p className="text-gray-700 text-lg leading-relaxed mb-8">
          <strong className="text-gray-900">William Fomete</strong> — Architecte
          de Solutions, Québec City. Je ne vends pas des outils. Je construis
          l'infrastructure qui permet à ton entreprise de grandir sans que tu
          doives être partout en même temps. Chaque mandat se termine avec une
          documentation complète et une équipe formée — parce qu'un système que
          tu ne comprends pas est une dette, pas un actif.
        </p>
        <a
          href="https://www.linkedin.com/in/william-fomete"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 text-sm font-medium text-accent border-2 border-accent rounded-lg hover:bg-accent hover:text-white transition-colors"
        >
          Voir mon LinkedIn
        </a>
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="bg-dark text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
          Prêt à arrêter de perdre du temps sur ce qui devrait tourner seul ?
        </h2>
        <a
          href={MAILTO}
          className="mt-8 inline-flex items-center px-8 py-4 text-base font-semibold text-white bg-accent rounded-xl hover:bg-accent/90 transition-colors shadow-lg"
        >
          Parler à William
        </a>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <p>© 2026 CoreNode Systems — Québec, Canada</p>
        <a
          href={MAILTO}
          className="text-accent hover:text-accent/80 transition-colors"
        >
          {EMAIL}
        </a>
      </div>
    </footer>
  )
}

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Pains />
        <Methodology />
        <Services />
        <About />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}

export default App
