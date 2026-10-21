/* global process */
// api/google-rating.js
// Fonction Vercel : note et nombre d'avis de la fiche Google Business, en direct.
//
// Appelle Google Places API (New) côté serveur pour que la clé ne soit jamais
// exposée dans le navigateur. La réponse est mise en cache 1 h sur le CDN de
// Vercel : au plus ~24 appels à Google par jour, peu importe le trafic.
//
// Variable d'environnement requise (Vercel > Settings > Environment Variables) :
//   GOOGLE_PLACES_API_KEY  clé Google Cloud avec « Places API (New) » activée,
//                          restreinte à cette API.
// Sans clé ou en cas d'erreur, la fonction répond 503 et la page garde les
// valeurs de repli écrites dans le HTML.

const PLACE_ID = 'ChIJSWV3DMhRHCsR5zmth468YCA'

export default async function handler(req, res) {
  const key = process.env.GOOGLE_PLACES_API_KEY
  if (!key) {
    res.setHeader('Cache-Control', 'no-store')
    return res.status(503).json({ error: 'GOOGLE_PLACES_API_KEY manquante' })
  }

  try {
    const response = await fetch(`https://places.googleapis.com/v1/places/${PLACE_ID}`, {
      headers: {
        'X-Goog-Api-Key': key,
        'X-Goog-FieldMask': 'rating,userRatingCount',
      },
    })
    if (!response.ok) throw new Error(`Places API ${response.status}`)

    const data = await response.json()
    if (typeof data.rating !== 'number' || typeof data.userRatingCount !== 'number') {
      throw new Error('Réponse sans note ni nombre d’avis')
    }

    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
    return res.status(200).json({ rating: data.rating, count: data.userRatingCount })
  } catch (error) {
    console.error('google-rating', error.message)
    res.setHeader('Cache-Control', 'public, s-maxage=300')
    return res.status(503).json({ error: 'Note Google indisponible' })
  }
}
