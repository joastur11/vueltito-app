export { CotizarDolares }

async function CotizarDolares() {
  const respuesta = await fetch('https://dolarapi.com/v1/dolares')
  if (!respuesta.ok) throw new Error('Error en el fetch')
  return await respuesta.json()
}

