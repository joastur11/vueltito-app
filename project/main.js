import { cotizarDolares, obtenerPrecioOroUsd, obtenerTNA } from "./api.js";


async function mostrarDolares() {
  const $divDolares = document.querySelector('#cotizacion-dolares')

  const cotizacion = await cotizarDolares()

  $divDolares.innerHTML = `
    <p> Dolar </p>
    <ul>
      <li> ${cotizacion[0].nombre} - Compra: ${cotizacion[0].compra} - Venta: ${cotizacion[0].venta} </li>
      <li> ${cotizacion[1].nombre} - Compra: ${cotizacion[1].compra} - Venta: ${cotizacion[1].venta} </li>
    </ul>    
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
    <p> Con tus ${platita} pesos, podes comprar: </p>
    <ul>
      <li>Dolar Oficial: ${compraOficial} </li>
      <li>Dolar Blue: ${compraBlue} </li>
    </ul>
  `
}

async function mostrarOro() {
  const $divOro = document.querySelector('#cotizacion-oro')

  const cotizacion = await obtenerPrecioOroUsd()

  $divOro.innerHTML = `
    <p> Oro: 1oz </p>
    <ul>
      <li> ${cotizacion} Dolares </li>
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
    <p> Con tus ${platita} pesos, podes comprar: </p>
    <ul>
      <li>Onzas de Oro: ${compraOro.toFixed(4)} - Unos ${enGramos.toFixed(2)} gramos. </li>
    </ul>
  `
}

// inversiones

async function mostrarTazas() {
  const tnas = await obtenerTNA()
  const $tnas = document.querySelector('#tnas')

  $tnas.innerHTML = `
    <p> Rendimientos en Billeteras </p>
    <ul>
      ${tnas.map(r => `<li> ${r.nombre}: ${r.tna}% anual </li>`).join('')}
    </ul>
  `
}
mostrarTazas()

async function calcularTNA() {
  const tnas = await obtenerTNA()
  const platita = Number($montoUsuario.value)

  return tnas.map(inversion => {
    const tasaMensual = inversion.tna / 12 / 100
    const rendimiento = platita * tasaMensual

    return {
      nombre: inversion.nombre,
      rendimiento: rendimiento.toFixed(2)
    }
  })
}

async function mostrarRendimientos() {
  const $divRendimientos = document.querySelector('#rendimientos-ganados')
  const rendimientos = await calcularTNA()

  $divRendimientos.innerHTML = `
    <p>Con tus ${$montoUsuario.value} pesos, al mes ganarías:</p>
    <ul>
      ${rendimientos.map(r => `<li>${r.nombre}: $${r.rendimiento}</li>`).join('')}
    </ul>
  `
}

const $botonCalcular = document.querySelector('#boton-calcular')

$botonCalcular.addEventListener('click', () => {
  comprarDolares()
  comprarOro()
  mostrarRendimientos()
})
