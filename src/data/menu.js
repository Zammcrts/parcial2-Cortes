// Acceso al menú. YA ESTÁ HECHO. Ver docs/05-arquitectura.md.
export async function cargarMenu() {
  const r = await fetch('/menu.json')
  if (!r.ok) throw new Error(`Error ${r.status} al cargar el menú`)
  return r.json()
}
