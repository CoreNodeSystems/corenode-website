/* global process */
// api/audit.js
// Fonction Vercel : reçoit le diagnostic gratuit de /audit, attend le verdict
// rédigé par n8n (Claude) et le renvoie à la page.
//
// Même principe que api/contact.js : l'adresse n8n reste privée, la CSP
// n'autorise que le site, les champs sont vérifiés avant de partir.
//
// Variable d'environnement requise (Vercel > Settings > Environment Variables) :
//   N8N_AUDIT_URL  URL de production du webhook n8n
//                  « Site web : diagnostic gratuit » (/webhook/..., pas /webhook-test/)
//
// Le verdict prend en général 3 à 6 secondes. Durée maximale de la fonction :
// 60 s (vercel.json > functions).
//
// GET /api/audit?health=1 : test de santé quotidien, sans IA ni écriture.

const DELAI_MS = 50000
const COURRIEL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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

function nettoyer(valeur, max) {
  const texte = Array.from(String(valeur ?? ''))
    .filter((c) => c >= ' ')
    .join('')
  return texte.replace(/\s+/g, ' ').trim().slice(0, max)
}

async function envoyerAN8n(url, corps, delai) {
  const controle = new AbortController()
  const minuterie = setTimeout(() => controle.abort(), delai)
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
  const url = process.env.N8N_AUDIT_URL

  if (req.method === 'GET' && req.query && 'health' in req.query) {
    if (!url) return res.status(503).json({ ok: false, error: 'not_configured' })
    try {
      const r = await envoyerAN8n(url, { ping: true }, 15000)
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
    console.error('audit : variable N8N_AUDIT_URL manquante')
    return res.status(503).json({ ok: false, error: 'not_configured' })
  }

  const b = req.body && typeof req.body === 'object' ? req.body : {}

  // Champ piège invisible : refusé sans appeler l'IA.
  if (nettoyer(b.site_web, 200)) return res.status(400).json({ ok: false, error: 'invalid' })

  const demande = {
    outil1: nettoyer(b.outil1, 60),
    outil2: nettoyer(b.outil2, 60),
    outil3: nettoyer(b.outil3, 60),
    email: nettoyer(b.email, 254).toLowerCase(),
    lang: b.lang === 'en' ? 'en' : 'fr',
  }
  if (!demande.outil1 || !demande.outil2 || !demande.outil3 || !COURRIEL.test(demande.email)) {
    return res.status(400).json({ ok: false, error: 'invalid' })
  }

  try {
    const r = await envoyerAN8n(url, demande, DELAI_MS)
    const d = r.donnees || {}
    if (r.ok && typeof d.verdict === 'string' && d.verdict.trim().length > 0) {
      const score = d.score == null || !Number.isFinite(Number(d.score)) ? null : Number(d.score)
      return res.status(200).json({ verdict: d.verdict, score })
    }
    console.error('audit : pas de verdict, n8n a répondu', r.statut)
    return res.status(502).json({ ok: false, error: 'no_verdict' })
  } catch (error) {
    console.error('audit :', error.name === 'AbortError' ? 'délai dépassé' : error.message)
    return res.status(504).json({ ok: false, error: 'timeout' })
  }
}
