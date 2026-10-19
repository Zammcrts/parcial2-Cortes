// Componente raíz. Ver docs/05-arquitectura.md: App es el ÚNICO componente con
// estado y el único que llama a src/data/. Menu, Orden y Confirmacion solo
// reciben props.
import { useEffect, useState } from 'react'
import Menu from './components/Menu'
import Orden from './components/Orden'
import Confirmacion from './components/Confirmacion'
import { crearOrden } from './logic/orden'
import { cargarMenu } from './data/menu'
import { guardarOrden } from './data/ordenes'

export default function App() {
  const [menu, setMenu] = useState([])
  const [orden, setOrden] = useState(crearOrden())
  // TODO: los demás estados que necesites (cargando, mensajes de error, folio...)

  // TODO HU-01 · RNF-04: cargar el menú UNA sola vez al montar el componente.

  // TODO HU-02, HU-03: manejadores que llamen a las funciones de src/logic/orden.js.
  //       Aquí no se escriben reglas: solo se llaman.

  // TODO HU-04 · RNF-02: confirmar la orden.

  return (
    <div className="app">
      <header className="encabezado">
        <h1>La Fonda de Doña Lupe</h1>
        <p>Toma de órdenes</p>
      </header>

      <main className="layout">
        <Menu menu={menu} onAgregar={() => {}} />
        <Orden orden={orden} />
      </main>

      <Confirmacion folio={null} />
    </div>
  )
}
