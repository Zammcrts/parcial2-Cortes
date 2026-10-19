export const MAX_POR_PLATILLO = 10
export const MESA_MIN = 1
export const MESA_MAX = 20

// Códigos de error que regresa validarOrden, y el texto que se muestra en pantalla.
export const MENSAJES = {
  MESA_INVALIDA: 'Selecciona una mesa del 1 al 20',
  ORDEN_VACIA: 'Agrega al menos un platillo',
}

// ---------------------------------------------------------------------------
// YA HECHAS: úsalas como modelo para escribir las demás.
// ---------------------------------------------------------------------------

export function crearOrden() {
  return { mesa: null, items: [] }
}

// HU-02-E3. Regresa una orden nueva sin el platillo con ese id.
export function quitarPlatillo(orden, id) {
  return { ...orden, items: orden.items.filter((item) => item.id !== id) }
}

// ---------------------------------------------------------------------------
// MUST
// ---------------------------------------------------------------------------

// HU-02-E1, HU-02-E2, HU-05-E2, HU-06-E1
export function agregarPlatillo(orden, platillo) {
  // HU-06-E1: un platillo agotado no entra; la orden no cambia
  // La regla vive aquí aunque Menu.jsx ya deshabilite el botón
  if (platillo.disponible === false) return orden

  const yaEsta = orden.items.some((item) => item.id === platillo.id)

  // HU-02-E2
  // HU-05-E2
  if (yaEsta) {
    return {
      ...orden,
      items: orden.items.map((item) =>
        item.id === platillo.id
          ? { ...item, cantidad: Math.min(item.cantidad + 1, MAX_POR_PLATILLO) }
          : item
      ),
    }
  }

  // HU-02-E1:entra con cantidad 1 y  vacía
  const nuevo = {
    id: platillo.id,
    nombre: platillo.nombre,
    precio: platillo.precio,
    cantidad: 1,
    nota: '',
  }
  return { ...orden, items: [...orden.items, nuevo] }
}

// HU-03. caluco de precios
export function calcularTotal(orden) {
  return orden.items.reduce((suma, item) => suma + item.precio * item.cantidad, 0)
}

// HU-04-E2. Guarda la mesa como un int
export function asignarMesa(orden, valor) {
  const texto = String(valor ?? '').trim()
  const numero = Number(texto)
  const mesa = texto === '' || Number.isNaN(numero) ? null : numero
  return { ...orden, mesa }
}

// HU-04-E2, HU-04-E3
export function validarOrden(orden) {
  const errores = []

  const mesaValida =
    Number.isInteger(orden.mesa) && orden.mesa >= MESA_MIN && orden.mesa <= MESA_MAX
  if (!mesaValida) errores.push('MESA_INVALIDA')

  if (orden.items.length === 0) errores.push('ORDEN_VACIA')

  return { valida: errores.length === 0, errores }
}

// ---------------------------------------------------------------------------
// SHOULD
// ---------------------------------------------------------------------------

// HU-05
// HU-05-E1 cantidad <= 0 → quita el item 
// HU-05-E2 más de MAX_POR_PLATILLO
export function cambiarCantidad(orden, id, cantidad) {
  if (cantidad <= 0) return quitarPlatillo(orden, id)

  const nueva = Math.min(cantidad, MAX_POR_PLATILLO)
  return {
    ...orden,
    items: orden.items.map((item) =>
      item.id === id ? { ...item, cantidad: nueva } : item
    ),
  }
}

// ---------------------------------------------------------------------------
// COULD
// ---------------------------------------------------------------------------

// HU-08-E1 cambia la nota 
export function ponerNota(orden, id, nota) {
  return {
    ...orden,
    items: orden.items.map((item) =>
      item.id === id ? { ...item, nota } : item
    ),
  }
}