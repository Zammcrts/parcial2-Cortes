// Pruebas de ejemplo de src/logic/orden.js. Corren con `npm test`.
// Escribe las tuyas con la misma forma si te ayudan a avanzar.
import { describe, it, expect } from 'vitest'
import { crearOrden, agregarPlatillo, calcularTotal, quitarPlatillo } from '../src/logic/orden'

const tacos = { id: 'a1', nombre: 'Tacos al pastor (3)', precio: 60, categoria: 'Antojitos', disponible: true }

describe('Ejemplos', () => {
  it('[HU-02-E3] quitar un platillo lo saca de la orden (función ya hecha)', () => {
    const orden = { mesa: null, items: [{ id: 'a1', nombre: 'Tacos al pastor (3)', precio: 60, cantidad: 1, nota: '' }] }
    expect(quitarPlatillo(orden, 'a1').items).toHaveLength(0)
    expect(orden.items).toHaveLength(1) // la orden original no cambió
  })

  it('[HU-02-E1] agregar un platillo nuevo lo deja con cantidad 1', () => {
    const orden = agregarPlatillo(crearOrden(), tacos)
    expect(orden.items).toHaveLength(1)
    expect(orden.items[0]).toMatchObject({ id: 'a1', cantidad: 1 })
  })

  it('[HU-03-E1] el total es precio por cantidad', () => {
    const orden = agregarPlatillo(agregarPlatillo(crearOrden(), tacos), tacos)
    expect(calcularTotal(orden)).toBe(120)
  })
})
