// Acceso a Firestore para las órdenes. Ver docs/04-modelo-datos.md.
//
// REGLA DE DISEÑO: este es el ÚNICO archivo de la aplicación (junto con
// src/firebase.js) que puede importar 'firebase/firestore'.
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import { calcularTotal } from '../logic/orden'

export async function guardarOrden(orden) {
  const documento = {
    mesa: orden.mesa,
    items: orden.items.map((item) => ({
      id: item.id,
      nombre: item.nombre,
      precio: item.precio,
      cantidad: item.cantidad,
      nota: item.nota ?? '',
    })),
    total: calcularTotal(orden),
    estado: 'pendiente',
    creadaEn: serverTimestamp(),
  }

  const ref = await addDoc(collection(db, 'ordenes'), documento)
  return { id: ref.id }
}