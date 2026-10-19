# ADR-002 · El estado vive en `App` y las reglas en funciones puras

**Estado:** Aceptada · **Fecha:** octubre 2026

## Contexto

Hay una sola pantalla con tres componentes hermanos que comparten la orden. Las reglas (máximo 10, agotados, mesa válida, total) tienen que poder probarse sin abrir el navegador.

## Opciones consideradas

| Opción | A favor | En contra |
| --- | --- | --- |
| **A. `useState` en `App` + funciones puras en `logic/orden.js`** | Simple; las reglas se prueban solas; los componentes quedan presentacionales | `App` pasa varias props |
| B. Reglas dentro de los componentes | Menos archivos | Las reglas se repiten y no se pueden probar sin montar React |
| C. Context API o una librería de estado | Evita pasar props | Complejidad sin necesidad para una pantalla |

## Decisión

**Opción A.**

## Consecuencias

- **Ninguna función de `logic/` modifica la orden que recibe**: regresa una nueva. Es lo que React necesita para detectar el cambio en `setOrden`, y es lo que hace que las pruebas sean confiables.
- Si la aplicación crece, estas funciones ya tienen la forma de un *reducer*: migrar a `useReducer` sería mover código, no reescribirlo.
