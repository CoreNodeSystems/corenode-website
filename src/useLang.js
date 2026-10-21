// src/useLang.js
// Langue d'affichage (fr/en), mémorisée dans le navigateur.
//
// Le premier rendu est toujours en français : c'est la version prérendue au
// build et lue par Google. La préférence enregistrée est appliquée après
// l'hydratation, sinon le HTML du serveur et celui du client divergent.

import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'corenode-lang'

export default function useLang() {
  const [lang, setLangState] = useState('fr')

  useEffect(() => {
    try {
      // Voulu : appliquer la préférence après l'hydratation, pas au premier rendu.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (localStorage.getItem(STORAGE_KEY) === 'en') setLangState('en')
    } catch {
      // Stockage bloqué (navigation privée) : on reste en français.
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((next) => {
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Ignoré : la préférence ne sera simplement pas retenue.
    }
  }, [])

  return [lang, setLang]
}
