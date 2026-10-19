
function formatoPesos(cantidad) {
  return `$${cantidad.toFixed(2)}`
}

export default function Orden({
  orden,
  total,
  errores = [],
  enviando = false,
  onCambiarMesa,
  onQuitar,
  onConfirmar,
}) {
  return (
    <section aria-label="Orden">
      <h2>Orden</h2>

      {/* HU-04 mesa */}
      <label>
        Mesa{' '}
        <input
          type="number"
          min="1"
          max="20"
          value={orden.mesa ?? ''}
          onChange={(e) => onCambiarMesa(e.target.value)}
        />
      </label>

        {/* HU-02 y HU-05 */}
      {orden.items.length === 0 ? (
        <p>Sin platillos todavía.</p>
      ) : (
        <ul>
          {orden.items.map((item) => (
            <li key={item.id} aria-label={item.nombre}>
              <strong>{item.nombre}</strong> ×{' '}
              <span data-testid="cantidad">{item.cantidad}</span>{' '}
              <span>{formatoPesos(item.precio * item.cantidad)}</span>{' '}
              <button
                type="button"
                onClick={() => onCambiarCantidad(item.id, item.cantidad - 1)}
              >
                Menos
              </button>
              <button
                type="button"
                onClick={() => onCambiarCantidad(item.id, item.cantidad + 1)}
              >
                Más
              </button>
              <button type="button" onClick={() => onQuitar(item.id)}>
                Quitar
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* HU-03: total */}
      <p>
        Total: <span data-testid="total">{formatoPesos(total)}</span>
      </p>

      {/* HU-04: error handlers */}
      {errores.map((mensaje) => (
        <p key={mensaje} role="alert">
          {mensaje}
        </p>
      ))}

      <button type="button" onClick={onConfirmar} disabled={enviando}>
        Confirmar orden
      </button>
    </section>
  )
}