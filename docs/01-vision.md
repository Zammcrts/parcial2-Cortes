# 01 · Visión y alcance

## El problema

Doña Lupe atiende unas 20 mesas en hora pico con tres meseros. Hoy las órdenes se apuntan en libreta y eso produce tres fallas que ella misma describió:

1. **Órdenes que no llegan.** El papelito se pierde entre el salón y la cocina.
2. **Órdenes mal entendidas.** "Sin cebolla" escrito con prisa se lee como otra cosa.
3. **Cuentas mal sumadas.** El total se calcula a mano al final, con la mesa esperando.

## Usuario de esta versión

**El mesero.** Necesita levantar la orden de una mesa rápido, ver el total y mandarla a cocina. La pantalla de cocina queda para una versión posterior.

## Objetivo de esta versión (MVP)

Que un mesero pueda **armar la orden de una mesa desde el menú, ver el total correcto y enviarla a cocina**, y que la orden quede guardada aunque se cierre el navegador.

## Fuera de esta versión

Vista de cocina, pagos, inicio de sesión, propinas, facturación, editar una orden ya enviada y reglas de seguridad de Firestore. El porqué de cada una está en `03-backlog.md`.

## Restricciones

- Stack del equipo: **React + Vite + Firebase (Firestore)**.
- Se usa en una tablet o laptop del restaurante, en el navegador.
- El menú lo mantiene Doña Lupe en un archivo `menu.json`; cambia poco.
