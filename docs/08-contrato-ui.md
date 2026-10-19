# 08 · Contrato de interfaz

Este es el acuerdo del equipo con **QA** y con **accesibilidad** (RNF-01). Define cómo se llama cada elemento para un lector de pantalla: su **rol**, su **nombre accesible** y sus **textos**. QA verifica la aplicación usando exactamente estos nombres, así que se respetan al pie de la letra.

`npm test` incluye una prueba de aceptación de QA con lo básico de este contrato.

## Menú — `Menu.jsx` *(ya está hecho: úsalo como ejemplo)*

| Elemento | Cómo está |
| --- | --- |
| Contenedor | `<section aria-label="Menú">` |
| Cada categoría | `<h3>` con el nombre de la categoría |
| Cada platillo | `<article aria-label={platillo.nombre}>` con nombre y precio |
| Botón | **Agregar**, o **Agotado** deshabilitado |

## Orden — `Orden.jsx` *(te toca)*

| Elemento | Cómo debe estar | Prioridad |
| --- | --- | --- |
| Contenedor | `<section aria-label="Orden">` *(ya está en la plantilla)* | Must |
| Mesa | `<label>Mesa <input type="number" /></label>` | Must |
| Cada platillo de la orden | `<li aria-label={item.nombre}>` dentro de un `<ul>` | Must |
| Cantidad | Dentro del `<li>`: un elemento con `data-testid="cantidad"` que contiene solo el número | Must |
| Quitar | Dentro del `<li>`: `<button>` con el texto **Quitar** | Must |
| Total | Un elemento con `data-testid="total"`, por ejemplo `<span data-testid="total">$120.00</span>` | Must |
| Errores | Cada mensaje en un elemento con `role="alert"` | Must |
| Confirmar | `<button>` con el texto **Confirmar orden** | Must |
| Más y Menos | Dentro del `<li>`: `<button>` con los textos **Más** y **Menos** | Should |
| Nota | Dentro del `<li>`: `<input aria-label="Nota" />` | Could |

## Mensajes (textos exactos)

| Situación | Texto | Dónde |
| --- | --- | --- |
| Cargando el menú | Cargando menú… | En `App.jsx`, mientras carga |
| Mesa inválida | Selecciona una mesa del 1 al 20 | `role="alert"` · ya está en `MENSAJES` |
| Orden vacía | Agrega al menos un platillo | `role="alert"` · ya está en `MENSAJES` |
| Orden enviada | Orden enviada a cocina · Folio: {id} | `Confirmacion.jsx` *(hecho)*: solo pásale el `folio` |
| Falló guardar *(Should)* | No se pudo enviar la orden. Intenta de nuevo. | `role="alert"` |
| Falló el menú *(Should)* | No se pudo cargar el menú | En `App.jsx` |

## Ejemplo: un platillo de la orden

```jsx
<li aria-label={item.nombre}>
  <strong>{item.nombre}</strong> × <span data-testid="cantidad">{item.cantidad}</span>
  <button onClick={() => onQuitar(item.id)}>Quitar</button>
</li>
```
