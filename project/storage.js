import { $montoUsuario, $botonCalcular } from "./dom.js"

export function guardarBusqueda(valor) {
  let historial = JSON.parse(localStorage.getItem('historialBusquedas')) || []

  historial = historial.filter(v => v !== valor)

  historial.unshift(valor)

  if (historial.length > 3) historial.pop()

  localStorage.setItem('historialBusquedas', JSON.stringify(historial))

  return historial
}

export function mostrarHistorial() {
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
