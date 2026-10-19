// Componente raíz. Ver docs/05-arquitectura.md: App es el ÚNICO componente con
// estado y el único que llama a src/data/. Menu, Orden y Confirmacion solo
// reciben props.
import { useEffect, useState } from 'react'
import Menu from './components/Menu'
import Orden from './components/Orden'
import Confirmacion from './components/Confirmacion'
import {
  MENSAJES,
  agregarPlatillo,
  asignarMesa,
  calcularTotal,
  cambiarCantidad,
  crearOrden,
  quitarPlatillo,
  validarOrden,
} from './logic/orden'
import { cargarMenu } from './data/menu'
import { guardarOrden } from './data/ordenes'

export default function App() {
  const [menu, setMenu] = useState([])
  const [orden, setOrden] = useState(crearOrden())
  const [cargando, setCargando] = useState(true)
  const [errorMenu, setErrorMenu] = useState(false)
  const [errores, setErrores] = useState([])
  const [folio, setFolio] = useState(null)
  const [enviando, setEnviando] = useState(false)

  // HU-01 se carga el menu una sola vez
  useEffect(() => {
    cargarMenu()
      .then((platillos) => setMenu(platillos))
      .catch((error) => {
        console.error(error)
        setErrorMenu(true)
      })
      .finally(() => setCargando(false))
  }, [])

  // HU-02: llamnada a las reglas.
  function handleAgregar(platillo) {
    setOrden((actual) => agregarPlatillo(actual, platillo))
    setErrores([])
    setFolio(null)
  }

  function handleQuitar(id) {
    setOrden((actual) => quitarPlatillo(actual, id))
  }

  // HU-05
  function handleCambiarCantidad(id, cantidad) {
    setOrden((actual) => cambiarCantidad(actual, id, cantidad))
  }

  function handleCambiarMesa(valor) {
    setOrden((actual) => asignarMesa(actual, valor))
    setErrores([])
  }

  // HU-04 RNF-02.
  async function handleConfirmar() {
    const { valida, errores: codigos } = validarOrden(orden)
    if (!valida) {
      setErrores(codigos.map((codigo) => MENSAJES[codigo]))
      return
    }

    setEnviando(true)
    try {
      const { id } = await guardarOrden(orden)
      setFolio(id)
      setOrden(crearOrden())
      setErrores([])
    } catch (error) {
      console.error(error)
      setErrores(['No se pudo enviar la orden. Intenta de nuevo.'])
    } finally {
      setEnviando(false)
    }
  }

  // HU-03: total que recibe orden.
  const total = calcularTotal(orden)

  let contenidoMenu
  if (cargando) {
    contenidoMenu = <p>Cargando menú…</p>
  } else if (errorMenu) {
    contenidoMenu = <p role="alert">No se pudo cargar el menú</p>
  } else {
    contenidoMenu = <Menu menu={menu} onAgregar={handleAgregar} />
  }

  return (
    <div className="app">
      <header className="encabezado">
        <h1>La Fonda de Doña Lupe</h1>
        <p>Toma de órdenes</p>
      </header>

      <main className="layout">
        {contenidoMenu}
        <Orden
          orden={orden}
          total={total}
          errores={errores}
          enviando={enviando}
          onCambiarMesa={handleCambiarMesa}
          onCambiarCantidad={handleCambiarCantidad}
          onQuitar={handleQuitar}
          onConfirmar={handleConfirmar}
        />
      </main>

      <Confirmacion folio={folio} />
    </div>
  )
}