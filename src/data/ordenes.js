import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import { calcularTotal } from '../logic/orden'

//modelado de los datos para la base de datos de firebase
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