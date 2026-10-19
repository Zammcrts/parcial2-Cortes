# Parcial 2 · Diseño de Software (LIIS1208)

**IBERO Puebla · Otoño 2026 · Lunes 19 de octubre de 2026 · 15:00–17:00 · Salón J141**
**Examen individual · Mtro. Rafael Pérez Aguirre**

---

## Datos del alumno

> **Lo primero que haces:** reemplaza `NOMBRE` y `MATRICULA` con tus datos, haz commit y push.
> Este bloque es la portada de tu examen.

- **Nombre:** NOMBRE
- **Matrícula:** MATRICULA

---

## El caso: La Fonda de Doña Lupe

La Fonda de Doña Lupe es una cocina económica cerca del campus. Hoy los meseros apuntan las órdenes en una libreta: se pierden papelitos, cocina no entiende la letra y la cuenta se suma a mano. Doña Lupe quiere una aplicación web sencilla para **levantar la orden de cada mesa y mandarla a cocina**.

El equipo ya hizo el análisis y el diseño, y está todo en `docs/`. También dejó hecha una parte del código: el menú ya se dibuja en pantalla. **Hoy te integras al equipo y tu trabajo es construir la orden siguiendo ese diseño.** No se evalúa si se te ocurre otra forma de hacerlo: se evalúa si construyes lo que el diseño dice, donde el diseño dice.

---

## Reglas del examen

- **Individual.** No se comparte código ni pantalla.
- **No se permite IA generativa**, incluido el autocompletado del editor (Copilot, Cursor, Codeium, etc.). Desactívalo antes de empezar. Al terminar, llenas la declaración en `ENTREGA.md`. **IA no declarada es falta de honestidad académica.**
- **Sí puedes consultar:** este repositorio, la documentación oficial de React, Vite y Firebase, tus apuntes y tus propios repositorios del curso (la Pokédex).
- **Trabaja en la rama `main`.**
- **Mínimo un commit por historia de usuario**, con su ID en el mensaje. El historial de commits es parte de la evidencia.
- **Último push: 16:59.** A las 17:00 se recogen los repositorios. **Lo que no esté en GitHub a esa hora no existe.**
- No modifiques `tests/`, `vite.config.js`, `package.json` ni los archivos de configuración de la raíz del proyecto.

---

## Arranque (primeros 10 minutos)

Necesitas **Node 20.19 o más reciente** (el mismo con el que corre tu Pokédex) y git.

1. En GitHub, en este repositorio: **Use this template → Create a new repository**.
   Dueño: tu cuenta · Nombre: `parcial2-tu-apellido` · **Private**.
2. En tu repositorio nuevo: **Settings → Collaborators → Add people → `mozta`**.
3. Clona tu repositorio e instala:
   ```bash
   git clone https://github.com/TU-USUARIO/parcial2-tu-apellido.git
   cd parcial2-tu-apellido
   npm install
   ```
4. Crea tu `.env` a partir de `.env.example`. **Puedes usar los mismos valores de tu proyecto de Firebase de la Pokédex**: la colección `ordenes` se crea sola la primera vez que guardes.
5. `npm run dev` y abre la liga que te da Vite. Ya debes ver el menú.
6. Escribe tu nombre arriba, y luego:
   ```bash
   git add README.md
   git commit -m "inicio: Tu Nombre"
   git push
   ```
7. En Moodle, en la actividad **Parcial 2**, pega la liga de tu repositorio.

---

## Qué leer

Lectura obligatoria, unos 10 minutos:

| Documento | Para qué |
| --- | --- |
| [`docs/02-requerimientos.md`](docs/02-requerimientos.md) | Las historias de usuario y sus escenarios, con ID |
| [`docs/05-arquitectura.md`](docs/05-arquitectura.md) | Qué va en cada archivo, qué ya está hecho y qué te toca |
| [`docs/08-contrato-ui.md`](docs/08-contrato-ui.md) | Los textos y etiquetas exactos de la pantalla |

Contexto, para consultar cuando lo necesites: [`01-vision`](docs/01-vision.md) · [`03-backlog`](docs/03-backlog.md) · [`04-modelo-datos`](docs/04-modelo-datos.md) · [`adr/`](docs/adr/) · [`07-wireframes`](docs/07-wireframes.md).

---

## Qué hay que construir

**Termina todos los Must antes de tocar un Should.**

| Prioridad | Historias |
| --- | --- |
| **Must** | HU-01 Ver el menú · HU-02 Armar la orden · HU-03 Ver el total · HU-04 Confirmar la orden |
| **Should** | HU-05 Ajustar cantidades · HU-06 Platillos agotados · HU-07 Si algo falla |
| **Could** | HU-08 Notas por platillo |

---

## Dónde va cada cosa

```
src/
|-- firebase.js             listo
|-- styles.css              listo
|-- data/
|   |-- menu.js             listo
|   `-- ordenes.js          TE TOCA: guardarOrden
|-- logic/
|   `-- orden.js            TE TOCA: 4 funciones Must (2 ya hechas como modelo)
|-- components/
|   |-- Menu.jsx            listo: es tu modelo para Orden.jsx
|   |-- Orden.jsx           TE TOCA
|   `-- Confirmacion.jsx    listo
`-- App.jsx                 TE TOCA: estado y manejadores
```

Cada `TODO` dice qué historia resuelve.

---

## Cómo saber si vas bien

```bash
npm test
```

Corre las pruebas de ejemplo de `src/logic/orden.js` y la **prueba de aceptación de QA** del contrato de interfaz. Al inicio fallan: a medida que avances, deben pasar.

---

## Cómo se califica

| Rubro | Peso | Qué se revisa |
| --- | --- | --- |
| **Funcionalidad** | 60% | Que cada escenario de `docs/02-requerimientos.md` se cumpla. Must vale mucho más que Should |
| **Apego al diseño** | 30% | Cada cosa en su capa según `docs/05-arquitectura.md`, el documento de Firestore con la forma de `docs/04-modelo-datos.md`, funciones que no modifican la orden que reciben |
| **Proceso** | 10% | Tu nombre en este README · `ENTREGA.md` con la declaración de IA · un commit por historia · `npm run build` sin errores |

Subir el `.env` con valores al repositorio: **−1.0**. El Could puede sumar hasta +0.5 sin pasar de 10.

---

## Antes de las 16:59

- [ ] `ENTREGA.md` lleno, **con la declaración de IA marcada**
- [ ] `npm run build` funciona
- [ ] `git push`, y verifica en GitHub que tu último commit aparece
