import { cotizarDolares, obtenerTNA, obtenerPlazosFijos, obtenerDolarPasado, obtenerTNAsPasado } from "./api.js";

// dolares

async function mostrarDolares() {
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
    <strong> Con tus <span class='res'>$${platita}</span> pesos, podes comprar: </strong>
    <ul>
      <li><strong>Dolar Oficial:</strong> <span class='res'>$${compraOficial}</span></li>
      <li><strong>Dolar Blue:</strong> <span class='res'>$${compraBlue}</span></li>
    </ul>
  `
}

// dolar cripto

async function mostrarDolarCripto() {
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

async function calcularDolarCripto() {
  const platita = $montoUsuario.value
  const cotizacion = await cotizarDolares()

  const compraCripto = (platita / cotizacion[5].compra).toFixed(2)

  return { platita, compraCripto }
}

async function comprarDolarCripto() {
  const { platita, compraCripto } = await calcularDolarCripto()

  const $divCompraDolarCripto = document.querySelector('#compra-dolar-cripto')

  $divCompraDolarCripto.innerHTML = `
    <strong> Con tus <span class='res'>$${platita}</span> pesos, podes comprar: </strong>
    <ul>
      <li><strong>Dolar Cripto:</strong> <span class='res'>$${compraCripto}</span></li>
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
      ${tnas.map(r => `<li><strong>${r.nombre}:</strong> <span class='res'>${r.tna}%</span> <small>anual</small> </li>`).join('')}
    </ul>
  `
}

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
    <strong>Con tus <span class='res'>$${$montoUsuario.value}</span> pesos, al mes ganarías:</strong>
    <ul>
      ${rendimientos.map(r => `<li><strong>${r.nombre}:</strong> <span class='res'>$${r.rendimiento}</span></li>`).join('')}
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
      ${plazos.map(r => `<li><strong>${r.nombre}:</strong> <span class='res'>${r.tna}%</span> <small>anual</small> </li>`).join('')}
    </ul>
  `
}

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
    <strong>Con tus <span class='res'>$${$montoUsuario.value}</span> pesos, al mes ganarías:</strong>
    <ul>
      ${intereses.map(r => `<li><strong>${r.nombre}:</strong> <span class='res'>$${r.rendimiento}</span></li>`).join('')}
    </ul>
  `
}

// actualizacion

function mostrarActualizacion() {
  const $actualizacion = document.querySelector('#act-dolar')
  const hoy = new Date()

  const formattedDate = hoy.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  })

  $actualizacion.innerHTML = formattedDate
}

// validacion 

function validacionNumeroNegativo() {
  $montoUsuario.addEventListener('input', () => {
    if ($montoUsuario.value < 0) $montoUsuario.value = 0
  })
}

// evento

async function init() {
  await mostrarDolares()
  await mostrarDolarCripto()
  await mostrarTazas()
  await mostrarPlazosFijos()
  mostrarActualizacion()
  validacionNumeroNegativo()
  mostrarHistorial()
  mostrarGraficoDolar()
  mostrarGraficoTNAs()
}

document.addEventListener("DOMContentLoaded", init)

$montoUsuario.addEventListener('input', () => {
  $botonCalcular.disabled = $montoUsuario.value.trim() === ''
})

const $botonCalcular = document.querySelector('#boton-calcular')

$botonCalcular.addEventListener('click', () => {
  comprarDolares()
  comprarDolarCripto()
  mostrarRendimientos()
  mostrarIntereses()
  guardarBusqueda($montoUsuario.value)
  mostrarHistorial()
})

// historial

function guardarBusqueda(valor) {
  let historial = JSON.parse(localStorage.getItem('historialBusquedas')) || []

  historial = historial.filter(v => v !== valor)

  historial.unshift(valor)

  if (historial.length > 3) historial.pop()

  localStorage.setItem('historialBusquedas', JSON.stringify(historial))

  return historial
}

function mostrarHistorial() {
  const historial = JSON.parse(localStorage.getItem('historialBusquedas')) || []
  const lista = document.getElementById('historial')

  lista.innerHTML = historial.map(v => `<li><button class="historial-item" type="button">${v}</button></li>`).join('')

  document.querySelectorAll('.historial-item').forEach(btn => {
    btn.addEventListener('click', () => {
      $montoUsuario.value = btn.textContent
      mostrarHistorial()
      $botonCalcular.click()
    })
  })
}

// charts

async function procesarDatosDolar() {
  const data = await obtenerDolarPasado()

  const datosAgrupados = data.reduce((acumulador, d) => {
    if (!acumulador[d.fecha]) {
      acumulador[d.fecha] = { fecha: d.fecha }
    }
    acumulador[d.fecha][d.casa] = { compra: d.compra, venta: d.venta }
    return acumulador
  }, {})

  const resultado = Object.values(datosAgrupados).sort(
    (a, b) => new Date(a.fecha) - new Date(b.fecha)
  )

  return resultado
}

async function mostrarGraficoDolar() {
  const datos = await procesarDatosDolar()

  const labels = datos.map(d => d.fecha)

  const blueData = datos.map(d => d.blue?.compra ?? null)
  const oficialData = datos.map(d => d.oficial?.compra ?? null)
  const criptoData = datos.map(d => d.cripto?.compra ?? null)

  const ctx = document.getElementById('chart-dolar').getContext('2d')

  new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Dólar Blue',
          data: blueData,
          borderColor: '#4B9CD3',
          tension: 0.3,
        },
        {
          label: 'Dólar Oficial',
          data: oficialData,
          borderColor: '#4BC0C0',
          tension: 0.3,
        },
        {
          label: 'Dólar Cripto',
          data: criptoData,
          borderColor: '#9966FF',
          tension: 0.3,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top'
        }
      },
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  })
}

async function mostrarGraficoTNAs() {
  const datos = await obtenerTNAsPasado()

  const labels = datos.map(d => d.fecha)
  const nombresBancos = Object.keys(datos[0].bancos)
  const nombresBilleteras = Object.keys(datos[0].billeteras)

  const datasetsBancos = nombresBancos.map(nombre => ({
    label: nombre,
    data: datos.map(d => d.bancos[nombre]),
    borderWidth: 2,
    tension: 0.3
  }))

  const datasetsBilleteras = nombresBilleteras.map(nombre => ({
    label: nombre,
    data: datos.map(d => d.billeteras[nombre]),
    borderWidth: 2,
    tension: 0.3
  }))

  const ctx = document.getElementById('chart-tna').getContext('2d')

  const chartTNA = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets:
        datasetsBancos
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top'
        }
      },
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  })

  const select = document.getElementById('tipo-tna')
  select.addEventListener('change', (e) => {
    const tipo = e.target.value
    chartTNA.data.datasets = tipo === 'bancos' ? datasetsBancos : datasetsBilleteras
    chartTNA.update()
  })
}
