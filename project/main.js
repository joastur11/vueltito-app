import { validacionNumeroNegativo } from "./validations.js";
import { mostrarHistorial } from "./storage.js";
import { mostrarGraficoDolar, mostrarGraficoTNAs } from "./charts.js";
import { mostrarDolares, mostrarDolarCripto, mostrarTazas, mostrarPlazosFijos, mostrarActualizacion, mostrarNoticias } from "./ui.js";
import "./events.js"

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
  mostrarNoticias()
}

document.addEventListener("DOMContentLoaded", init)
