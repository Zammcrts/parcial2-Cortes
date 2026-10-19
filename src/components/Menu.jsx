// Menú agrupado por categoría. YA ESTÁ HECHO.
// Úsalo como modelo para escribir Orden.jsx: es un componente presentacional
// (recibe datos y funciones por props, no tiene estado ni reglas) y cumple el
// contrato de docs/08-contrato-ui.md.
//
// Props:
//   menu       arreglo de platillos { id, nombre, precio, categoria, disponible }
//   onAgregar  función que recibe el platillo completo
export default function Menu({ menu, onAgregar }) {
  const categorias = [...new Set(menu.map((p) => p.categoria))]
  return (
    <section aria-label="Menú">
      <h2>Menú</h2>
      {categorias.map((categoria) => (
        <div key={categoria}>
          <h3>{categoria}</h3>
          {menu
            .filter((p) => p.categoria === categoria)
            .map((p) => {
              const agotado = p.disponible === false
              return (
                <article key={p.id} aria-label={p.nombre}>
                  <strong>{p.nombre}</strong> <span>${p.precio}</span>{' '}
                  <button disabled={agotado} onClick={() => onAgregar(p)}>
                    {agotado ? 'Agotado' : 'Agregar'}
                  </button>
                </article>
              )
            })}
        </div>
      ))}
    </section>
  )
}
