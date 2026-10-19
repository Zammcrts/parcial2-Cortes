// Prueba de aceptación de QA: verifica el contrato de interfaz (docs/08-contrato-ui.md).
// Es la misma revisión que haría un lector de pantalla: si esta prueba pasa,
// tu pantalla es accesible y cumple lo que el equipo acordó.
import { describe, it, expect, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

vi.mock('../src/firebase', () => ({ db: {} }))
vi.mock('../src/data/menu', () => ({
  cargarMenu: vi.fn(async () => [
    { id: 'x1', nombre: 'Tacos', precio: 50, categoria: 'Antojitos', disponible: true },
  ]),
}))
vi.mock('../src/data/ordenes', () => ({ guardarOrden: vi.fn(async () => ({ id: 'F1' })) }))

import App from '../src/App'

describe('Contrato de interfaz (QA)', () => {
  it('[CONTRATO] la orden muestra el platillo, su cantidad, Quitar, el total, la mesa y Confirmar', async () => {
    const user = userEvent.setup()
    render(<App />)
    const menu = await screen.findByRole('region', { name: 'Menú' })
    const tacos = await within(menu).findByRole('article', { name: 'Tacos' })
    await user.click(within(tacos).getByRole('button', { name: 'Agregar' }))

    const orden = screen.getByRole('region', { name: 'Orden' })
    const item = within(orden).getByRole('listitem', { name: 'Tacos' })
    expect(within(item).getByTestId('cantidad')).toHaveTextContent('1')
    expect(within(item).getByRole('button', { name: 'Quitar' })).toBeInTheDocument()
    expect(screen.getByTestId('total')).toHaveTextContent('50')
    expect(within(orden).getByLabelText('Mesa')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Confirmar orden' })).toBeInTheDocument()
  })
})
