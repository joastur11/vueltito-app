import { $montoUsuario } from "./dom.js"

export function validacionNumeroNegativo() {
  $montoUsuario.addEventListener('input', () => {
    if ($montoUsuario.value < 0) $montoUsuario.value = 0
  })
}
