import { cotizarDolares, obtenerTNA, cotizarDolarCripto, obtenerPlazosFijos } from "./api.js";

// dolares
async function mostrarDolares() {
  const $divDolares = document.querySelector('#cotizacion-dolares')

  const cotizacion = await cotizarDolares()

  $divDolares.innerHTML = `
    <h3> Dolar </h3>
    <ul>
      <li>${cotizacion[0].nombre}:
        <ul> 
          <li>Compra: $${cotizacion[0].compra}</li>
          <li>Venta: $${cotizacion[0].venta}</li>
        </ul>
      </li>
      <li>${cotizacion[1].nombre}:
        <ul> 
          <li>Compra: $${cotizacion[1].compra}</li>
          <li>Venta: $${cotizacion[1].venta}</li>
        </ul>
      </li>
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
    <strong> Con tus $${platita} pesos, podes comprar: </strong>
    <ul>
      <li>Dolar Oficial: $${compraOficial} </li>
      <li>Dolar Blue: $${compraBlue} </li>
    </ul>
  `
}

// dolar cripto
async function mostrarDolarCripto() {
  const $divDolares = document.querySelector('#cotizacion-dolar-cripto')

  const cotizacion = await cotizarDolarCripto()

  $divDolares.innerHTML = `
    <h3> Dolar Cripto </h3>
    <ul>
      <li>Compra: $${cotizacion.compra} </li>
      <li>Venta: $${cotizacion.venta} </li>
    </ul>    
  `
}
mostrarDolarCripto()

async function calcularDolarCripto() {
  const platita = $montoUsuario.value
  const cotizacion = await cotizarDolarCripto()

  const compraCripto = (platita / cotizacion.compra).toFixed(2)

  return { platita, compraCripto }
}

async function comprarDolarCripto() {
  const { platita, compraCripto } = await calcularDolarCripto()

  const $divCompraDolarCripto = document.querySelector('#compra-dolar-cripto')

  $divCompraDolarCripto.innerHTML = `
    <strong> Con tus $${platita} pesos, podes comprar: </strong>
    <ul>
      <li>Dolar Cripto: $${compraCripto} </li>
    </ul>
  `
}

// billeteras

async function mostrarTazas() {
  const tnas = await obtenerTNA()
  const $tnas = document.querySelector('#tnas')

  $tnas.innerHTML = `
    <h3> Rendimientos en Billeteras </h3>
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
    <strong>Con tus $${$montoUsuario.value} pesos, al mes ganarías:</strong>
    <ul>
      ${rendimientos.map(r => `<li>${r.nombre}: $${r.rendimiento}</li>`).join('')}
    </ul>
  `
}

// plazos fijos 

async function mostrarPlazosFijos() {
  const plazos = await obtenerPlazosFijos()
  const $plazos = document.querySelector('#tazas')

  $plazos.innerHTML = `
    <h3> Plazo fijo a 30 días </h3>
    <ul>
      ${plazos.map(r => `<li> ${r.nombre}: ${r.tna}% anual </li>`).join('')}
    </ul>
  `
}
mostrarPlazosFijos()

async function calcularPlazosFijos() {
  const plazos = await obtenerPlazosFijos()
  const platita = Number($montoUsuario.value)

  return plazos.map(inversion => {
    const tasaMensual = inversion.tna / 12 / 100
    const rendimiento = platita * tasaMensual

    return {
      nombre: inversion.nombre,
      rendimiento: rendimiento.toFixed(2)
    }
  })
}

async function mostrarIntereses() {
  const $divIntereses = document.querySelector('#intereses-ganados')
  const intereses = await calcularPlazosFijos()

  $divIntereses.innerHTML = `
    <strong>Con tus $${$montoUsuario.value} pesos, al mes ganarías:</strong>
    <ul>
      ${intereses.map(r => `<li>${r.nombre}: $${r.rendimiento}</li>`).join('')}
    </ul>
  `
}

// evento

const $botonCalcular = document.querySelector('#boton-calcular')

$botonCalcular.addEventListener('click', () => {
  comprarDolares()
  comprarDolarCripto()
  mostrarRendimientos()
  mostrarIntereses()
})
