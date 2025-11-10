import { cotizarDolares, obtenerTNA, obtenerPlazosFijos } from "./api.js"
import { $montoUsuario } from "./dom.js"

export async function calcularDolares() {
  const platita = $montoUsuario.value
  const cotizacion = await cotizarDolares()

  const compraOficial = (platita / cotizacion[0].venta).toFixed(2)
  const compraBlue = (platita / cotizacion[1].venta).toFixed(2)

  return { platita, compraOficial, compraBlue }
}

export async function calcularDolarCripto() {
  const platita = $montoUsuario.value
  const cotizacion = await cotizarDolares()

  const compraCripto = (platita / cotizacion[5].compra).toFixed(2)

  return { platita, compraCripto }
}

export async function calcularTNA() {
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

export async function calcularPlazosFijos() {
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
