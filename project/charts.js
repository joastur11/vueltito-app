import { obtenerDolarPasado, obtenerTNAsPasado } from "./api.js"
import { mostrarSpinner } from "./ui.js"

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

export async function mostrarGraficoDolar() {
  const $section = document.querySelector('.chart-card')
  const spinner = mostrarSpinner($section)

  try {
    const datos = await procesarDatosDolar()

    spinner.remove()

    const labels = datos.map(d => d.fecha)

    const blueData = datos.map(d => d.blue?.venta ?? null)
    const oficialData = datos.map(d => d.oficial?.venta ?? null)
    const criptoData = datos.map(d => d.cripto?.venta ?? null)

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
            beginAtZero: false,
            title: {
              display: true,
              text: 'Venta en pesos'
            }
          }
        }
      }
    })
  } catch (_error) {
    spinner.remove()
    $contenedor.innerHTML = `<p>Error cargando gráfico</p>`
  }
}

export async function mostrarGraficoTNAs() {
  const $section = document.querySelector('.chart-card')
  const spinner = mostrarSpinner($section)

  try {
    const datos = await obtenerTNAsPasado()

    spinner.remove()

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
            beginAtZero: false,
            title: {
              display: true,
              text: 'Porcentaje Anual'
            }
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

  } catch (_error) {
    spinner.remove()
    $contenedor.innerHTML = `<p>Error cargando gráfico</p>`
  }
}
