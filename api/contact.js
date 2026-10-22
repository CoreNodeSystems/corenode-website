/* global process */
// api/contact.js
// Fonction Vercel : reçoit le formulaire de contact du site et le transmet à n8n.
//
// Pourquoi passer par ici plutôt que d'appeler n8n depuis la page :
//   - l'adresse du webhook n8n reste privée (variable côté serveur, jamais
//     dans le JavaScript public);
//   - la politique de sécurité du site (CSP) n'autorise que le site lui-même;
//   - les champs sont vérifiés et tronqués avant de partir.
//
// Variable d'environnement requise (Vercel > Settings > Environment Variables) :
//   N8N_CONTACT_URL  URL de production du webhook n8n
//                    « Site web : formulaire de contact » (/webhook/..., pas /webhook-test/)
//
// GET /api/contact?health=1 : test de santé appelé chaque matin par le workflow
// n8n « Site web : surveillance des formulaires ». Envoie { ping: true } à n8n,
// qui répond sans rien enregistrer ni envoyer.

const DELAI_MS = 15000
const COURRIEL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Le formulaire n'est accepté que depuis le site (production, aperçus Vercel, poste local).
function origineAutorisee(req) {
  const source = req.headers.origin || req.headers.referer
  if (!source) return false
  try {
    const { protocol, hostname } = new URL(source)
    if (hostname === 'localhost' || hostname === '127.0.0.1') return true
    if (protocol !== 'https:') return false
    return (
      hostname === 'corenodesystems.com' ||
      hostname === 'www.corenodesystems.com' ||
      /^corenode-website[a-z0-9-]*\.vercel\.app$/.test(hostname)
    )
  } catch {
    return false
  }
}

// Retire les caractères de contrôle, garde les retours de ligne si demandé, tronque.
function nettoyer(valeur, max, multiligne = false) {
  const texte = Array.from(String(valeur ?? ''))
    .filter((c) => c >= ' ' || (multiligne && c === '\n'))
    .join('')
  return (multiligne ? texte : texte.replace(/\s+/g, ' ')).trim().slice(0, max)
}

async function envoyerAN8n(url, corps) {
  const controle = new AbortController()
  const minuterie = setTimeout(() => controle.abort(), DELAI_MS)
  try {
    const reponse = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(corps),
      signal: controle.signal,
    })
    let donnees = null
    try {
      donnees = await reponse.json()
    } catch {
      donnees = null
    }
    return { ok: reponse.ok, statut: reponse.status, donnees }
  } finally {
    clearTimeout(minuterie)
  }
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  const url = process.env.N8N_CONTACT_URL

  if (req.method === 'GET' && req.query && 'health' in req.query) {
    if (!url) return res.status(503).json({ ok: false, error: 'not_configured' })
    try {
      const r = await envoyerAN8n(url, { ping: true })
      if (r.ok && r.donnees && r.donnees.health === true) return res.status(200).json({ ok: true })
      return res.status(503).json({ ok: false, error: 'upstream', status: r.statut })
    } catch (error) {
      return res.status(503).json({ ok: false, error: error.name === 'AbortError' ? 'timeout' : 'unreachable' })
    }
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST')
    return res.status(405).json({ ok: false, error: 'method_not_allowed' })
  }
  if (!origineAutorisee(req)) return res.status(403).json({ ok: false, error: 'forbidden' })
  if (!url) {
    console.error('contact : variable N8N_CONTACT_URL manquante')
    return res.status(503).json({ ok: false, error: 'not_configured' })
  }

  const b = req.body && typeof req.body === 'object' ? req.body : {}

  // Champ piège invisible : un humain ne le remplit jamais. On répond « reçu »
  // sans rien transmettre, pour ne pas apprendre au robot qu'il a été repéré.
  if (nettoyer(b.company_website, 200)) return res.status(200).json({ ok: true })

  const demande = {
    nom: nettoyer(b.nom, 120),
    email: nettoyer(b.email, 254).toLowerCase(),
    entreprise: nettoyer(b.entreprise, 160),
    secteur: nettoyer(b.secteur, 120),
    description: nettoyer(b.description, 4000, true),
    lang: b.lang === 'en' ? 'en' : 'fr',
  }
  if (!demande.nom || !COURRIEL.test(demande.email) || !demande.description) {
    return res.status(400).json({ ok: false, error: 'invalid' })
  }

  try {
    const r = await envoyerAN8n(url, demande)
    if (r.ok && r.donnees && r.donnees.ok === true) return res.status(200).json({ ok: true })
    console.error('contact : n8n a répondu', r.statut)
    return res.status(502).json({ ok: false, error: 'upstream' })
  } catch (error) {
    console.error('contact :', error.name === 'AbortError' ? 'délai dépassé' : error.message)
    return res.status(504).json({ ok: false, error: 'timeout' })
  }
}
