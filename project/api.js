export { cotizarDolares, obtenerTNA, obtenerPlazosFijos, obtenerDolarPasado, obtenerTNAsPasado, obtenerNoticias }

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

async function fetchYStorage() {
  const respuesta = await fetch('https://api.argentinadatos.com/v1/cotizaciones/dolares')
  if (!respuesta.ok) throw new Error('Error cargando argentinadatos.com')
  const data = await respuesta.json()

  const fechaLimite = new Date()
  fechaLimite.setDate(fechaLimite.getDate() - 15)
  const casasInteresadas = ['oficial', 'blue', 'cripto']

  const datosFiltrados = data.filter(d =>
    casasInteresadas.includes(d.casa) && new Date(d.fecha) >= fechaLimite
  )

  localStorage.setItem('dolarDatos', JSON.stringify(datosFiltrados))
  localStorage.setItem('ultimaActualizacion', new Date().toISOString())

  return datosFiltrados
}

async function obtenerDolarPasado() {
  const ultimaActualizacion = localStorage.getItem('ultimaActualizacion')

  if (!ultimaActualizacion) {
    return await fetchYStorage()
  } else {
    const fechaActual = new Date()
    const fechaGuardada = new Date(ultimaActualizacion)
    const diferenciaDias = (fechaActual - fechaGuardada) / (1000 * 60 * 60 * 24)

    if (diferenciaDias > 1) {
      return await fetchYStorage()
    }
    else {
      return JSON.parse(localStorage.getItem('dolarDatos'))
    }
  }
}

async function obtenerTNAsPasado() {
  const respuesta = await fetch('./tazashistoricas.json')
  if (!respuesta.ok) throw new Error('Error cargando TNAs')
  return await respuesta.json()
}

async function obtenerNoticias() {
  const API_KEY = '39201c558f75a6af4bfcff0db216d101'
  const url = `https://gnews.io/api/v4/top-headlines?country=ar&topic=business&lang=es&max=5&apikey=${API_KEY}`;

  try {
    const respuesta = await fetch(url)
    if (!respuesta.ok) throw new Error('Error al cargar noticias')
    const data = await respuesta.json()
    return data.articles
  } catch (error) {
    console.error(error)
  }
}
