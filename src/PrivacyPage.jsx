// src/PrivacyPage.jsx
// Politique de confidentialité, en page publique (/confidentialite) plutôt
// qu'en fenêtre : la Loi 25 demande une politique publiée sur le site (art. 8.2)
// avec le titre et les coordonnées du responsable (art. 3.1), les règles de
// conservation et de destruction et le traitement des plaintes (art. 3.2), et
// la possibilité que les renseignements soient communiqués hors du Québec (art. 8).
//
// À relire et mettre à jour (date comprise) à chaque changement de fournisseur.

import Seo from './seo/Seo.jsx'
import { PAGES } from './seo/siteMeta.js'
import useLang from './useLang.js'
import SimpleLayout from './SimpleLayout.jsx'
import { EMAIL, MAILTO, PHONE, TEL, LEGAL_NAME, BRAND } from './contact.js'

const content = {
  fr: {
    title: 'Politique de confidentialité',
    updated: 'Dernière mise à jour : 22 octobre 2026',
    intro: `Cette politique explique quels renseignements personnels ${LEGAL_NAME} (${BRAND}) recueille sur ce site, pourquoi, où ils sont traités et comment exercer tes droits, conformément à la Loi sur la protection des renseignements personnels dans le secteur privé du Québec (Loi 25).`,
    sections: [
      {
        heading: 'Responsable de la protection des renseignements personnels',
        paragraphs: [
          `William Fomete, propriétaire de ${LEGAL_NAME} (${BRAND}), entreprise individuelle enregistrée au Québec.`,
        ],
        contact: true,
      },
      {
        heading: 'Ce que je recueille',
        list: [
          'Formulaire de contact : ton nom, ton courriel, ton entreprise (optionnel), ton secteur d’activité et la description de ton projet.',
          'Diagnostic gratuit : les noms des 3 outils que tu inscris et ton courriel.',
          'Prise de rendez-vous : si tu réserves un appel, Cal.com recueille ton nom, ton courriel et le moment choisi.',
          'Mesure d’audience : pages vues, site de provenance, pays, type d’appareil et navigateur, en statistiques globales, sans témoin (cookie) et sans profil individuel (Vercel Web Analytics et Speed Insights).',
          'Préférence de langue : enregistrée dans ton navigateur seulement.',
        ],
        after: ['Aucun témoin publicitaire, aucun pixel de suivi.'],
      },
      {
        heading: 'Pourquoi',
        paragraphs: [
          'Pour répondre à ta demande, t’envoyer le diagnostic que tu as demandé, voir si un mandat a du sens et améliorer le site. Tes renseignements ne servent à rien d’autre, ne sont jamais vendus et ne servent pas à t’envoyer de publicité. Le diagnostic t’est envoyé une fois par courriel ; aucun autre envoi n’est prévu.',
        ],
      },
      {
        heading: 'Qui y a accès et où tes renseignements sont traités',
        paragraphs: [
          'Moi seulement. Pour faire fonctionner le site et traiter ta demande, j’utilise des fournisseurs techniques. Certains hébergent les données à l’extérieur du Québec, surtout aux États-Unis :',
        ],
        list: [
          'Vercel : hébergement du site et des formulaires (États-Unis).',
          'n8n, installé sur Microsoft Azure : l’automatisation qui achemine les formulaires (États-Unis).',
          'Airtable : la base de données où ta demande est enregistrée (États-Unis).',
          'Zoho Mail : le courriel professionnel (centre de données au Canada).',
          'Anthropic (Claude) : le modèle d’IA qui rédige le verdict du diagnostic. Il reçoit seulement les noms des 3 outils et la langue choisie, jamais ton courriel (États-Unis).',
          'Cal.com : la prise de rendez-vous (à l’extérieur du Québec).',
        ],
        after: [
          'Je ne transmets à chacun que ce qui est nécessaire au service rendu. Chacun est lié par ses conditions de service et ses engagements de protection des données.',
        ],
      },
      {
        heading: 'Conservation et destruction',
        paragraphs: [
          'Je garde tes renseignements le temps nécessaire au suivi de ta demande, au plus 24 mois après notre dernier échange. Si un mandat suit, les documents du mandat sont gardés aussi longtemps que l’exigent les règles comptables et fiscales. Ensuite, ils sont supprimés ou rendus anonymes. Tu peux demander leur suppression en tout temps.',
        ],
      },
      {
        heading: 'Tes droits',
        paragraphs: [
          'Tu peux demander d’accéder à tes renseignements, de les faire corriger, d’en recevoir une copie dans un format courant, de retirer ton consentement ou de les faire supprimer. Écris-moi : je réponds dans les 30 jours suivant ta demande.',
        ],
      },
      {
        heading: 'Plaintes',
        paragraphs: [
          'Si tu as une préoccupation sur la façon dont tes renseignements sont traités, écris-moi d’abord : je te réponds dans les 30 jours. Si la réponse ne te satisfait pas, tu peux t’adresser à la Commission d’accès à l’information du Québec (cai.gouv.qc.ca).',
        ],
      },
      {
        heading: 'Sécurité',
        paragraphs: [
          'Les formulaires passent par une connexion chiffrée (HTTPS) et par des fonctions serveur qui vérifient les données avant de les transmettre. L’accès aux outils est protégé et réservé à moi. Si un incident de confidentialité présentait un risque de préjudice sérieux, je t’en aviserais, ainsi que la Commission d’accès à l’information, comme la loi le prévoit.',
        ],
      },
      {
        heading: 'Modifications',
        paragraphs: [
          'Je mets cette politique à jour quand mes pratiques ou mes fournisseurs changent. La date en haut de la page indique la version en vigueur.',
        ],
      },
    ],
    contactLabels: { email: 'Courriel', phone: 'Téléphone' },
  },
  en: {
    title: 'Privacy policy',
    updated: 'Last updated: October 22, 2026',
    intro: `This policy explains what personal information ${LEGAL_NAME} (${BRAND}) collects on this site, why, where it is processed and how to exercise your rights, under Quebec's Act respecting the protection of personal information in the private sector (Law 25).`,
    sections: [
      {
        heading: 'Person in charge of the protection of personal information',
        paragraphs: [
          `William Fomete, owner of ${LEGAL_NAME} (${BRAND}), a sole proprietorship registered in Quebec.`,
        ],
        contact: true,
      },
      {
        heading: 'What I collect',
        list: [
          'Contact form: your name, email, company (optional), industry and project description.',
          'Free diagnostic: the names of the 3 tools you enter and your email.',
          'Booking: if you book a call, Cal.com collects your name, email and the time you choose.',
          'Audience measurement: pages viewed, referring site, country, device type and browser, as aggregate statistics, with no cookie and no individual profile (Vercel Web Analytics and Speed Insights).',
          'Language preference: stored in your browser only.',
        ],
        after: ['No advertising cookies, no tracking pixels.'],
      },
      {
        heading: 'Why',
        paragraphs: [
          'To answer your request, send you the diagnostic you asked for, see whether an engagement makes sense and improve the site. Your information is used for nothing else, never sold and never used to send you advertising. The diagnostic is emailed to you once; no other email is planned.',
        ],
      },
      {
        heading: 'Who has access and where your information is processed',
        paragraphs: [
          'Only me. To run the site and process your request, I use technical providers. Some host data outside Quebec, mainly in the United States:',
        ],
        list: [
          'Vercel: hosting of the site and forms (United States).',
          'n8n, installed on Microsoft Azure: the automation that routes the forms (United States).',
          'Airtable: the database where your request is stored (United States).',
          'Zoho Mail: business email (data centre in Canada).',
          'Anthropic (Claude): the AI model that writes the diagnostic verdict. It only receives the names of the 3 tools and the chosen language, never your email (United States).',
          'Cal.com: booking (outside Quebec).',
        ],
        after: [
          'Each provider only receives what the service requires and is bound by its terms of service and data protection commitments.',
        ],
      },
      {
        heading: 'Retention and destruction',
        paragraphs: [
          'I keep your information as long as needed to follow up on your request, at most 24 months after our last exchange. If an engagement follows, its records are kept as long as accounting and tax rules require. After that, the information is deleted or anonymized. You can ask for its deletion at any time.',
        ],
      },
      {
        heading: 'Your rights',
        paragraphs: [
          'You can ask to access your information, have it corrected, receive a copy in a common format, withdraw your consent or have it deleted. Write to me: I answer within 30 days of your request.',
        ],
      },
      {
        heading: 'Complaints',
        paragraphs: [
          'If you have a concern about how your information is handled, write to me first: I will answer within 30 days. If the answer does not satisfy you, you can contact the Commission d’accès à l’information du Québec (cai.gouv.qc.ca).',
        ],
      },
      {
        heading: 'Security',
        paragraphs: [
          'Forms travel over an encrypted connection (HTTPS) and through server functions that check the data before passing it on. Access to the tools is protected and limited to me. If a confidentiality incident created a risk of serious injury, I would notify you and the Commission d’accès à l’information, as the law requires.',
        ],
      },
      {
        heading: 'Changes',
        paragraphs: [
          'I update this policy when my practices or providers change. The date at the top of the page shows the version in force.',
        ],
      },
    ],
    contactLabels: { email: 'Email', phone: 'Phone' },
  },
}

export default function PrivacyPage() {
  const [lang, setLang] = useLang()
  const t = content[lang]

  return (
    <SimpleLayout lang={lang} setLang={setLang}>
      <Seo {...PAGES.confidentialite} />
      <article className="max-w-2xl mx-auto pt-16 pb-24">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white">{t.title}</h1>
        <p className="mt-3 text-[13px] text-white/60">{t.updated}</p>
        <p className="mt-8 text-[16px] text-white/75 leading-relaxed">{t.intro}</p>

        {t.sections.map((s) => (
          <section key={s.heading} className="mt-12">
            <h2 className="text-xl font-semibold text-white">{s.heading}</h2>
            {s.paragraphs &&
              s.paragraphs.map((p) => (
                <p key={p} className="mt-4 text-[15px] text-white/75 leading-relaxed">{p}</p>
              ))}
            {s.list && (
              <ul className="mt-4 space-y-2.5 list-disc pl-5 marker:text-[var(--teal)]">
                {s.list.map((item) => (
                  <li key={item} className="text-[15px] text-white/75 leading-relaxed">{item}</li>
                ))}
              </ul>
            )}
            {s.after &&
              s.after.map((p) => (
                <p key={p} className="mt-4 text-[15px] text-white/75 leading-relaxed">{p}</p>
              ))}
            {s.contact && (
              <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-[15px]">
                <dt className="text-white/60">{t.contactLabels.email}</dt>
                <dd>
                  <a href={MAILTO} className="text-white underline underline-offset-4 decoration-white/30 hover:decoration-white">{EMAIL}</a>
                </dd>
                <dt className="text-white/60">{t.contactLabels.phone}</dt>
                <dd>
                  <a href={TEL} className="text-white underline underline-offset-4 decoration-white/30 hover:decoration-white">{PHONE}</a>
                </dd>
              </dl>
            )}
          </section>
        ))}
      </article>
    </SimpleLayout>
  )
}
