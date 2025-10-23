export { cotizarDolares, obtenerTNA, obtenerPlazosFijos }

async function cotizarDolares() {
  const respuesta = await fetch('https://dolarapi.com/v1/dolares')
  if (!respuesta.ok) throw new Error('Error en el fetch Dolar api')
  return await respuesta.json()
}

async function obtenerTNA() {
  const respuesta = await fetch('./tna.json')
  if (!respuesta.ok) throw new Error('Error cargando TNA')
  return await respuesta.json()
}

async function obtenerPlazosFijos() {
  const respuesta = await fetch('./plazos.json')
  if (!respuesta.ok) throw new Error('Error cargando plazos fijos')
  return await respuesta.json()
}

async function obtenerDolarPasado() {
  const respuesta = await fetch('https://api.argentinadatos.com/v1/cotizaciones/dolares')
  if (!respuesta.ok) throw new Error('Error cargando plazos fijos')
  const data = await respuesta.json()

  let fechaLimite = new Date()
  fechaLimite.setMonth(fechaLimite.getMonth() - 1)

  const casasInteresadas = ['oficial', 'blue', 'cripto']

  const datosFiltrados = data.filter(d =>
    casasInteresadas.includes(d.casa) && new Date(d.fecha) >= fechaLimite)

  return datosFiltrados
}
