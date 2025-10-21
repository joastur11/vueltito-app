const express = require('express')
const path = require('path')
const fs = require('fs')

const PORT = process.env.PORT ?? 1234

const app = express()
app.use(express.static(path.join(__dirname, '..')))

const dataPath = path.join(process.cwd(), 'data', 'dolar.json')

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
