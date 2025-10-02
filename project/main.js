import { CotizarDolares } from "./api.js";

async function mostrarDolares() {
  const $divDolares = document.querySelector('#cotizacion-dolares')

  const cotizacion = await CotizarDolares()

  $divDolares.innerHTML = `
    <div>
      <p> Dolar </p>
      <ul>
        <li> ${cotizacion[0].nombre} ${cotizacion[0].compra} ${cotizacion[0].venta} </li>
        <li> ${cotizacion[1].nombre} ${cotizacion[1].compra} ${cotizacion[1].venta} </li>
      </ul>
    </div>

  `
}

const $montoUsuario = document.querySelector('#monto-usuario')

async function calcularDolares() {
  const $divDolares = document.querySelector('#compra-dolares')

  const platita = $montoUsuario.value
  const cotizacion = await CotizarDolares()

  const compraOficial = (platita / cotizacion[0].compra).toFixed(2)
  const compraBlue = (platita / cotizacion[1].compra).toFixed(2)

  $divDolares.innerHTML = `
    <div>
      <p> Con tus ${platita} pesos, podes: </p>
      <ul>
        <li>Dolar Oficial: ${compraOficial} </li>
        <li>Dolar Blue: ${compraBlue} </li>
      </ul>
    </div
  `
}

const $botonCalcular = document.querySelector('#boton-calcular')

$botonCalcular.addEventListener('click', () => {
  mostrarDolares()
  calcularDolares()
})
