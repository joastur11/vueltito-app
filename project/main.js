import { cotizarDolares, obtenerPrecioOroUsd } from "./api.js";

async function mostrarDolares() {
  const $divDolares = document.querySelector('#cotizacion-dolares')

  const cotizacion = await cotizarDolares()

  $divDolares.innerHTML = `
    <div>
      <p> Dolar </p>
      <ul>
        <li> ${cotizacion[0].nombre} - Compra: ${cotizacion[0].compra} - Venta: ${cotizacion[0].venta} </li>
        <li> ${cotizacion[1].nombre} - Compra: ${cotizacion[1].compra} - Venta: ${cotizacion[1].venta} </li>
      </ul>
    </div>

  `
}
mostrarDolares()

const $montoUsuario = document.querySelector('#monto-usuario')

async function calcularDolares() {
  const platita = $montoUsuario.value
  const cotizacion = await cotizarDolares()

  const compraOficial = (platita / cotizacion[0].compra).toFixed(2)
  const compraBlue = (platita / cotizacion[1].compra).toFixed(2)

  return { platita, compraOficial, compraBlue }
}

async function comprarDolares() {
  const { platita, compraOficial, compraBlue } = await calcularDolares()

  const $divCompraDolares = document.querySelector('#compra-dolares')

  $divCompraDolares.innerHTML = `
    <div>
      <p> Con tus ${platita} pesos, podes comprar: </p>
      <ul>
        <li>Dolar Oficial: ${compraOficial} </li>
        <li>Dolar Blue: ${compraBlue} </li>
      </ul>
    </div
  `
}

async function mostrarOro() {
  const $divOro = document.querySelector('#cotizacion-oro')

  const cotizacion = await obtenerPrecioOroUsd()

  $divOro.innerHTML = `
    <div>
      <p> Oro: 1oz </p>
      <ul>
        <li> ${cotizacion} Dolares </li>
      </ul>
    </div>

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
    <div>
      <p> Con tus ${platita} pesos, podes comprar: </p>
      <ul>
        <li>Onzas de Oro: ${compraOro.toFixed(4)} - Unos ${enGramos.toFixed(2)} gramos. </li>
      </ul>
    </div
  `
}

const $botonCalcular = document.querySelector('#boton-calcular')

$botonCalcular.addEventListener('click', () => {
  comprarDolares()
  comprarOro()
})
