# 03 · Backlog priorizado (MoSCoW)

| Prioridad | Historia | Por qué esta prioridad |
| --- | --- | --- |
| **Must** | HU-01 Ver el menú | Sin menú no hay orden |
| **Must** | HU-02 Armar la orden | Es el trabajo del mesero |
| **Must** | HU-03 Ver el total | Es la tercera falla que Doña Lupe nombró |
| **Must** | HU-04 Confirmar la orden | Sin esto la orden sigue siendo un papelito |
| **Should** | HU-05 Ajustar cantidades | Ahorra tiempo, pero se puede quitar y volver a agregar |
| **Should** | HU-06 Platillos agotados | Evita un problema real, pero se puede avisar de palabra |
| **Should** | HU-07 Si algo falla | Importante, pero la red del restaurante casi no falla |
| **Could** | HU-08 Notas por platillo | Resuelve la segunda falla, pero la orden funciona sin notas |

## Won't have (esta versión) — y por qué

| No se hace | Por qué se deja fuera |
| --- | --- |
| **Vista de cocina** | Mientras tanto, cocina ve las órdenes en la consola de Firebase. Es lo primero de la siguiente versión |
| **Pagos** | Doña Lupe cobra en efectivo y con terminal física; no resuelve ninguna de las tres fallas |
| **Inicio de sesión** | Tres meseros en una sola tablet |
| **Propinas y facturación** | Se manejan aparte; la facturación requiere datos fiscales y un proveedor |
| **Editar una orden ya enviada** | Para cambiar algo se envía una orden nueva |
| **Reglas de seguridad de Firestore** | Esta versión corre en modo de prueba en una sola tablet |

## Orden de trabajo sugerido

1. Las funciones Must de `src/logic/orden.js`. Puedes probarlas con `npm test` sin abrir el navegador.
2. En `App.jsx`: cargar el menú y agregar a la orden (HU-01, HU-02).
3. `Orden.jsx`: la lista, el total, la mesa y el botón (HU-02, HU-03).
4. `guardarOrden` en `src/data/ordenes.js` y confirmar (HU-04).
5. Los Should, en orden. El Could solo si sobra tiempo.

**Un commit por historia como mínimo**, con el ID en el mensaje.
