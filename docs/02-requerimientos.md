# 02 · Requerimientos

Cada escenario tiene un **ID**. Úsalo en tus mensajes de commit: `HU-02: armar la orden`.

**Qué ya está hecho y qué te toca** está en `05-arquitectura.md`. En corto: el menú ya se dibuja (`Menu.jsx`), la carga del menú ya existe (`cargarMenu`) y el aviso de confirmación ya existe (`Confirmacion.jsx`). Tú conectas todo y construyes la orden.

---

## HU-01 · Ver el menú — **Must**

> **Como** mesero **quiero** ver el menú al abrir la aplicación **para** levantar la orden sin preguntar en cocina.

**HU-01-E1 · El menú aparece**
- **Cuando** abro la aplicación
- **Entonces** veo el menú con sus categorías, platillos, precios y botones **Agregar** *(lo dibuja `Menu.jsx`; tú lo cargas y se lo pasas)*

**HU-01-E2 · Mientras carga**
- **Dado** que el menú todavía no llega
- **Entonces** veo el texto **"Cargando menú…"**

---

## HU-02 · Armar la orden — **Must**

> **Como** mesero **quiero** agregar y quitar platillos de la orden **para** reflejar exactamente lo que pidió la mesa.

**HU-02-E1 · Agregar un platillo nuevo**
- **Dado** un platillo que no está en la orden
- **Cuando** presiono **Agregar**
- **Entonces** aparece en la orden con cantidad **1**

**HU-02-E2 · Agregar un platillo que ya está**
- **Dado** un platillo que ya está en la orden
- **Cuando** presiono **Agregar** otra vez
- **Entonces** su cantidad sube en 1 y **no aparece duplicado**

**HU-02-E3 · Quitar**
- **Cuando** presiono **Quitar** en un platillo de la orden
- **Entonces** sale de la orden *(la función `quitarPlatillo` ya está hecha)*

---

## HU-03 · Ver el total — **Must**

> **Como** mesero **quiero** ver el total de la orden en todo momento **para** decirle a la mesa cuánto es sin sumar a mano.

**HU-03-E1 · El total se calcula solo**
- **Entonces** el total es la suma de **precio × cantidad** de cada platillo, y se actualiza con cada cambio
- Los precios del menú **ya incluyen IVA**: no se suma nada más

**HU-03-E2 · Orden vacía**
- **Dado** que la orden no tiene platillos
- **Entonces** el total es **$0.00**

---

## HU-04 · Confirmar la orden — **Must**

> **Como** mesero **quiero** enviar la orden a cocina con el número de mesa **para** que se prepare y quede registrada.

**HU-04-E1 · Confirmar una orden válida**
- **Dado** una orden con al menos un platillo y una mesa entre 1 y 20
- **Cuando** presiono **Confirmar orden**
- **Entonces** la orden se guarda en Firestore, aparece **"Orden enviada a cocina"** con el **folio** (el id del documento) y la orden en pantalla queda vacía

**HU-04-E2 · Mesa inválida**
- **Dado** que no escribí mesa, o escribí un número fuera de 1–20
- **Cuando** presiono **Confirmar orden**
- **Entonces** veo **"Selecciona una mesa del 1 al 20"** y **no se guarda nada**

**HU-04-E3 · Orden vacía**
- **Dado** que la orden no tiene platillos
- **Cuando** presiono **Confirmar orden**
- **Entonces** veo **"Agrega al menos un platillo"** y **no se guarda nada**

---

## HU-05 · Ajustar cantidades — **Should**

> **Como** mesero **quiero** subir o bajar la cantidad de un platillo **para** corregir la orden sin quitarlo y volverlo a agregar.

**HU-05-E1 · Más y Menos**
- Cada platillo de la orden tiene botones **Más** y **Menos**
- **Menos** con cantidad 1 quita el platillo

**HU-05-E2 · Máximo 10 por platillo**
- Ni **Agregar** ni **Más** suben la cantidad arriba de **10**

---

## HU-06 · Platillos agotados — **Should**

> **Como** mesero **quiero** que un platillo agotado no entre a la orden **para** no prometer algo que cocina no puede hacer.

**HU-06-E1 · No entra a la orden**
- **Dado** un platillo con `disponible: false`
- **Cuando** se intenta agregar
- **Entonces** la orden no cambia

`Menu.jsx` ya deshabilita su botón, pero **la regla tiene que vivir en `src/logic/orden.js`**: un botón deshabilitado es comodidad para el usuario, no una regla.

---

## HU-07 · Si algo falla — **Should**

> **Como** mesero **quiero** saber cuando algo no funcionó **para** no creer que la orden se envió.

**HU-07-E1 · Si guardar falla**
- **Dado** que Firestore no respondió o rechazó la escritura
- **Entonces** veo **"No se pudo enviar la orden. Intenta de nuevo."** y **la orden se conserva** para reintentar

**HU-07-E2 · Si el menú no carga**
- **Dado** que pedir el menú falló
- **Entonces** veo **"No se pudo cargar el menú"**

---

## HU-08 · Notas por platillo — **Could**

> **Como** mesero **quiero** escribir una nota en un platillo ("sin cebolla") **para** que cocina lo prepare como lo pidieron.

**HU-08-E1 · La nota viaja con la orden**
- Cada platillo de la orden tiene un campo **Nota**; lo escrito se guarda con ese platillo, y solo con ese

*Solo si terminaste todo lo Must y lo Should.*

---

## Requerimientos no funcionales

| ID | Requerimiento |
| --- | --- |
| **RNF-01** Accesibilidad | Todo botón y campo tiene nombre accesible; el campo de mesa tiene `<label>`; los errores se anuncian con `role="alert"` y la confirmación con `role="status"`. WCAG 2.2: criterios 4.1.2 *Name, Role, Value*, 3.3.1 *Error Identification* y 4.1.3 *Status Messages*. El detalle está en `08-contrato-ui.md` |
| **RNF-02** Integridad | La pantalla **no** dice "Orden enviada" hasta que Firestore confirma la escritura |
| **RNF-03** Mantenibilidad | Cada cosa en su capa: reglas en `src/logic`, Firestore solo en `src/data`, componentes sin reglas |
| **RNF-04** Eficiencia | El menú se pide **una sola vez** al abrir la aplicación, no en cada render. *(En `npm run dev`, StrictMode monta el componente dos veces y verás dos peticiones en Network: es normal.)* |
| **RNF-05** Seguridad | El `.env` no se sube al repositorio |
