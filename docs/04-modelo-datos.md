# 04 · Modelo de datos

## 1. El platillo (viene de `public/menu.json`)

```js
{ id: 'a1', nombre: 'Tacos al pastor (3)', precio: 60, categoria: 'Antojitos', disponible: true }
```

| Campo | Tipo | Nota |
| --- | --- | --- |
| `id` | string | Único en el menú |
| `precio` | number | Pesos, **IVA incluido** |
| `disponible` | boolean | `false` = agotado (HU-05) |

## 2. La orden en memoria (estado de `App`)

```js
{
  mesa: 5,              // number entero 1–20, o null si no se ha escrito
  items: [
    { id: 'a1', nombre: 'Tacos al pastor (3)', precio: 60, cantidad: 2, nota: 'sin cebolla' }
  ]
}
```

- Un platillo aparece **una sola vez** en `items`; repetirlo sube `cantidad`.
- `cantidad` va de 1 a 10. Un item con cantidad 0 no existe: se quita.
- `nota` empieza como `''`.
- **`mesa` es número, no texto.** El input entrega texto: `asignarMesa` lo convierte.

## 3. El documento en Firestore

Colección **`ordenes`**, un documento por orden, **id automático** (`addDoc`). Ese id es el **folio**.

```js
// ordenes/{idAutomatico}
{
  mesa: 5,
  items: [
    { id: 'a1', nombre: 'Tacos al pastor (3)', precio: 60, cantidad: 2, nota: 'sin cebolla' }
  ],
  total: 120,
  estado: 'pendiente',          // 'pendiente' | 'lista'
  creadaEn: serverTimestamp()
}
```

`guardarOrden(orden)` recibe la orden en memoria `{ mesa, items }` y **arma este documento**: calcula `total` con `calcularTotal`, pone `estado: 'pendiente'` y `creadaEn: serverTimestamp()`. Regresa `{ id }`.

## 4. Decisiones del modelo

| Decisión | Por qué |
| --- | --- |
| **Los items van dentro de la orden** (embebidos), no en otra colección | La orden se lee y se escribe completa, siempre junta. Es un agregado. Ver ADR-001 |
| **Se copia `nombre` y `precio`** en cada item, aunque ya estén en el menú | Si mañana sube el precio de los tacos, **la orden de hoy debe conservar el precio de hoy**. Es un registro histórico, no una referencia |
| **Se guarda `total`**, aunque se pueda recalcular | Cocina y caja lo leen sin volver a sumar; y queda como evidencia de lo que se cobró |
| **`creadaEn` con `serverTimestamp()`**, no `new Date()` | La hora la pone el servidor. El reloj de la tablet puede estar mal |
| **id automático** en vez de, por ejemplo, el número de mesa | Una mesa hace varias órdenes en una comida. El id de la mesa chocaría |
