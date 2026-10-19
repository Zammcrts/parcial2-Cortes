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

// HU-02-E1, HU-02-E2 (y HU-05, HU-06 cuando llegues a los Should)
export function agregarPlatillo(orden, platillo) {
  const yaEsta = orden.items.some((item) => item.id === platillo.id)

  // HU-02-E2: ya está → su cantidad sube en 1, sin duplicarlo
  // HU-05-E2: nunca pasa de MAX_POR_PLATILLO
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

  // HU-02-E1: no está → entra con cantidad 1 y nota vacía
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
// HU-05-E1: cantidad <= 0 → quita el item (Menos con cantidad 1).
// HU-05-E2: más de MAX_POR_PLATILLO → se queda en el máximo.
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

// HU-08
export function ponerNota(orden, id, nota) {
  // TODO
  return orden
}