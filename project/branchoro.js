/* api 
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
*/

/* js
// Oro
async function mostrarOro() {
  const $divOro = document.querySelector('#cotizacion-oro')

  const cotizacion = await obtenerPrecioOroUsd()

  $divOro.innerHTML = `
    <strong> Oro: 1oz </strong>
    <ul>
      <li> $${cotizacion} Dolares </li>
    </ul>
  `
}
mostrarOro()

async function calcularOro() {
  const { platita, compraOficial } = await calcularDolares()
  const cotizacionOro = await obtenerPrecioOroUsd()

  const compraOro = compraOficial / cotizacionOro
  const enGramos = compraOro * 31.1035

  return { platita, compraOro, enGramos }
}

async function comprarOro() {
  const { platita, compraOro, enGramos } = await calcularOro()

  const $divCompraOro = document.querySelector('#compra-oro')

  $divCompraOro.innerHTML = `
    <p> Con tus $${platita} pesos, podes comprar: </p>
    <ul>
      <li>Onzas de Oro: ${compraOro.toFixed(4)} - Unos ${enGramos.toFixed(2)} gramos. </li>
    </ul>
  `
}
*/