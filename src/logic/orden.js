// Reglas de negocio de la orden.
// Ver docs/05-arquitectura.md (contrato de cada función) y docs/02-requerimientos.md.
//
// Todas las funciones de este archivo son funciones normales de JavaScript:
//   - No usan React ni Firebase.
//   - Reciben la orden y regresan una orden NUEVA, sin modificar la que recibieron.
//     Es lo mismo que hiciste en la Pokédex con [...equipo, p] y equipo.filter(...).
//
// Forma de una orden:
//   { mesa: number | null, items: [ { id, nombre, precio, cantidad, nota } ] }

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
  // TODO
  return orden
}

// HU-03
export function calcularTotal(orden) {
  // TODO
  return 0
}

// HU-04-E2
export function asignarMesa(orden, valor) {
  // TODO
  return orden
}

// HU-04-E2, HU-04-E3
export function validarOrden(orden) {
  // TODO
  return { valida: false, errores: [] }
}

// ---------------------------------------------------------------------------
// SHOULD
// ---------------------------------------------------------------------------

// HU-05
export function cambiarCantidad(orden, id, cantidad) {
  // TODO
  return orden
}

// ---------------------------------------------------------------------------
// COULD
// ---------------------------------------------------------------------------

// HU-08
export function ponerNota(orden, id, nota) {
  // TODO
  return orden
}
