export { cotizarDolares, cotizarDolarCripto, obtenerPrecioOroUsd, obtenerTNA, obtenerPlazosFijos }

async function cotizarDolares() {
  const respuesta = await fetch('https://dolarapi.com/v1/dolares')
  if (!respuesta.ok) throw new Error('Error en el fetch Dolar api')
  return await respuesta.json()
}

async function cotizarDolarCripto() {
  const respuesta = await fetch('https://dolarapi.com/v1/dolares/cripto')
  if (!respuesta.ok) throw new Error('Error en el fetch Dolar cripto')
  return await respuesta.json()
}

const ALPHA_KEY = '53UOHMNXZ71ULWJF'

async function obtenerPrecioOroUsd() {
  const symbol = 'XAUUSD'
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${ALPHA_KEY}`

  const respuesta = await fetch(url)
  if (!respuesta.ok) throw new Error('Error en el fetch Alpha')

  const data = await respuesta.json()

  const series = data['Time Series (Daily)']
  const fechas = Object.keys(series)
  const ultimaFecha = fechas[0]
  const precioCierre = Number(series[ultimaFecha]['4. close'])

  return precioCierre
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
