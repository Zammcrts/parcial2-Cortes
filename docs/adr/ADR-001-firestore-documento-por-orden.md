# ADR-001 · Firestore, con un documento por orden

**Estado:** Aceptada · **Fecha:** octubre 2026

## Contexto

Las órdenes tienen que sobrevivir a que se cierre el navegador y poder leerse desde otra pantalla (cocina). El equipo ya trabaja con Firebase. Una orden se crea completa, se lee completa y casi nunca se modifica (solo su `estado`).

## Opciones consideradas

| Opción | A favor | En contra |
| --- | --- | --- |
| **A. Firestore, un documento por orden con los items adentro** | Una escritura por orden; se lee completa; `onSnapshot` resuelve la vista de cocina; el equipo ya lo conoce | No se puede consultar fácilmente "cuántos tacos se vendieron en el mes" |
| B. Firestore con colección `items` aparte | Consultas por platillo | Varias escrituras por orden; hay que juntar al leer; puede quedar una orden a medias |
| C. Supabase (Postgres) con tablas `ordenes` e `items` | Consultas y reportes potentes | Más diseño previo para un MVP; el equipo tendría que cambiar de herramienta |
| D. `localStorage` | Cero configuración | Vive en un solo navegador: cocina no lo ve |

## Decisión

**Opción A.** La orden es un **agregado**: lo que se lee junto se guarda junto.

## Consecuencias

- `nombre` y `precio` se **copian** dentro de cada item (ver `04-modelo-datos.md`).
- Los reportes por platillo, si algún día se piden, requieren otra solución (exportar o migrar). Se acepta conscientemente.
- Firestore no impone esquema: **la forma del documento la garantiza `data/ordenes.js`**, y por eso es el único archivo que escribe.
