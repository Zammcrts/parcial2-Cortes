// Aviso de orden enviada. YA ESTÁ HECHO.
// Props:
//   folio   id del documento creado en Firestore, o null si no hay nada que avisar
export default function Confirmacion({ folio }) {
  if (!folio) return null
  return (
    <div role="status">
      <strong>Orden enviada a cocina</strong>
      <p>Folio: {folio}</p>
    </div>
  )
}
