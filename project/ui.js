import { cotizarDolares, obtenerTNA, obtenerPlazosFijos, obtenerNoticias } from "./api.js"
import { calcularDolares, calcularDolarCripto, calcularTNA, calcularPlazosFijos } from "./calculations.js"

export function mostrarSpinner(contenedor) {
  const spinner = document.createElement('div')
  spinner.className = 'spinner'
  contenedor.appendChild(spinner)
  return spinner
}

export function mostrarSeparador() {
  const $hr = document.querySelectorAll('.hr-grid')
  $hr.forEach(hr => {
    hr.classList.remove('hr-hidden')
  })
}

export async function mostrarDolares() {
  const $divDolares = document.querySelector('#cotizacion-dolares')

  const cotizacion = await cotizarDolares()

  $divDolares.innerHTML = `
    <h3> Dólar </h3>
    <ul>
      <li><strong>${cotizacion[0].nombre}:</strong>
        <ul> 
          <li>Compra: <span class='res'>$${cotizacion[0].compra}</span></li>
          <li>Venta: <span class='res'>$${cotizacion[0].venta}</span></li>
        </ul>
      </li>
      <li><strong>${cotizacion[1].nombre}:</strong>      
        <ul> 
          <li>Compra: <span class='res'>$${cotizacion[1].compra}</span></li>
          <li>Venta: <span class='res'>$${cotizacion[1].venta}</span></li>
        </ul>
      </li>
    </ul>
  `
}

export async function comprarDolares() {
  const { platita, compraOficial, compraBlue } = await calcularDolares()

  const $divCompraDolares = document.querySelector('#compra-dolares')

  $divCompraDolares.innerHTML = `
    <strong> Con tus <span class='res'>$${platita}</span> pesos, podes comprar: </strong>
    <ul>
      <li><strong>Dolar Oficial:</strong> <span class='res'>$${compraOficial}</span></li>
      <li><strong>Dolar Blue:</strong> <span class='res'>$${compraBlue}</span></li>
    </ul>
  `
}

export async function mostrarDolarCripto() {
  const $divDolares = document.querySelector('#cotizacion-dolar-cripto')

  const cotizacion = await cotizarDolares()

  $divDolares.innerHTML = `
    <div class="titulo-tooltip">
      <h3>Dólar Cripto</h3>
      <span class="tooltip">?
        <span class="text-tooltip">Precio del dólar en mercados de criptoactivos, opera 24/7, libre y sin cepo.</span>
      </span>
    </div>
    <ul>
      <li>Compra: <span class='res'>$${cotizacion[5].compra}</span></li>
      <li>Venta: <span class='res'>$${cotizacion[5].venta}</span></li>
    </ul>    
  `
}

export async function comprarDolarCripto() {
  const { platita, compraCripto } = await calcularDolarCripto()

  const $divCompraDolarCripto = document.querySelector('#compra-dolar-cripto')

  $divCompraDolarCripto.innerHTML = `
    <strong> Con tus <span class='res'>$${platita}</span> pesos, podes comprar: </strong>
    <ul>
      <li><strong>Dolar Cripto:</strong> <span class='res'>$${compraCripto}</span></li>
    </ul>
  `
}

export async function mostrarTazas() {
  const tnas = await obtenerTNA()
  const $tnas = document.querySelector('#tnas')

  $tnas.innerHTML = `
    <h3> Rendimientos en Billeteras </h3>
    <ul>
      ${tnas.map(r => `<li><strong>${r.nombre}:</strong> <span class='res'>${r.tna}%</span> <small>anual</small> </li>`).join('')}
    </ul>
  `
}

export async function mostrarRendimientos() {
  const $divRendimientos = document.querySelector('#rendimientos-ganados')
  const rendimientos = await calcularTNA()

  $divRendimientos.innerHTML = `
    <strong>Con tus <span class='res'>$${$montoUsuario.value}</span> pesos, al mes ganarías:</strong>
    <ul>
      ${rendimientos.map(r => `<li><strong>${r.nombre}:</strong> <span class='res'>$${r.rendimiento}</span></li>`).join('')}
    </ul>
  `
}

export async function mostrarPlazosFijos() {
  const plazos = await obtenerPlazosFijos()
  const $plazos = document.querySelector('#tazas')

  $plazos.innerHTML = `
    <h3> Plazo fijo a 30 días </h3>
    <ul>
      ${plazos.map(r => `<li><strong>${r.nombre}:</strong> <span class='res'>${r.tna}%</span> <small>anual</small> </li>`).join('')}
    </ul>
  `
}

export async function mostrarIntereses() {
  const $divIntereses = document.querySelector('#intereses-ganados')
  const intereses = await calcularPlazosFijos()

  $divIntereses.innerHTML = `
    <strong>Con tus <span class='res'>$${$montoUsuario.value}</span> pesos, al mes ganarías:</strong>
    <ul>
      ${intereses.map(r => `<li><strong>${r.nombre}:</strong> <span class='res'>$${r.rendimiento}</span></li>`).join('')}
    </ul>
  `
}

export function mostrarActualizacion() {
  const $actualizacion = document.querySelector('#act-dolar')
  const hoy = new Date()

  const formattedDate = hoy.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  })

  $actualizacion.innerHTML = formattedDate
}

export async function mostrarNoticias() {
  const $section = document.querySelector('#seccion-noticias')
  const spinner = mostrarSpinner($section)

  try {
    const data = await obtenerNoticias()

    spinner.remove()

    $section.innerHTML = data.map(d => `
       <div class="noticia">
         <a href="${d.url}" target="_blank">
           <img src="${d.image}" alt="">
           <strong>${d.title}</strong>
           <p>${d.description || ''}</p>
         </a>
       </div>
     `).join('')
  } catch (_error) {
    spinner.remove()
    $section.innerHTML = `<p>Error cargando noticias 😔</p>,`
  }
}