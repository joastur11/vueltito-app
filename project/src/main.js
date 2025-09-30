import { CotizarDolares } from "./api.js";

const $divDolares = document.querySelector('#dolares')

async function mostrarDolares() {
  const cotizacion = await CotizarDolares()

  $divDolares.innerHTML = `
  <ul>
    <li> ${cotizacion[0].nombre} ${cotizacion[0].compra} ${cotizacion[0].venta} </li>
    <li> ${cotizacion[1].nombre} ${cotizacion[1].compra} ${cotizacion[1].venta} </li>
  </ul>
  `
}

mostrarDolares()
