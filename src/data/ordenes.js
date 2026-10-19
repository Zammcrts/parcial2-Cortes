// Acceso a Firestore para las órdenes. Ver docs/04-modelo-datos.md.
//
// REGLA DE DISEÑO: este es el ÚNICO archivo de la aplicación (junto con
// src/firebase.js) que puede importar 'firebase/firestore'.
import { db } from '../firebase'

// HU-04
// Recibe la orden actual { mesa, items } y la guarda como un documento nuevo
// en la colección `ordenes`, con la forma de docs/04-modelo-datos.md.
// Regresa { id } con el id del documento creado (es el folio).
export async function guardarOrden(orden) {
  // TODO
  throw new Error('guardarOrden no está implementada')
}
