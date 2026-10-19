// Conexión a Firebase. YA ESTÁ LISTO: no necesitas modificar este archivo.
// Solo crea tu .env a partir de .env.example y reinicia `npm run dev`.
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const app = initializeApp({
  apiKey: import.meta.env.VITE_FB_API_KEY,
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FB_PROJECT_ID,
  appId: import.meta.env.VITE_FB_APP_ID,
})

export const db = getFirestore(app)
