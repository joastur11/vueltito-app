import { $montoUsuario, $botonCalcular } from "./dom.js"
import { comprarDolares, comprarDolarCripto, mostrarRendimientos, mostrarIntereses, mostrarSeparador } from "./ui.js"
import { guardarBusqueda, mostrarHistorial } from "./storage.js"

$montoUsuario.addEventListener('input', () => {
  $botonCalcular.disabled = $montoUsuario.value.trim() === ''
})

$botonCalcular.addEventListener('click', () => {
  comprarDolares()
  comprarDolarCripto()
  mostrarRendimientos()
  mostrarIntereses()
  guardarBusqueda($montoUsuario.value)
  mostrarHistorial()
  mostrarSeparador()
})

const $themeToggle = document.querySelector('#toggle')

$themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const newTheme = current === 'light' ? '' : 'light';

  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
})
