const express = require('express')

const PORT = process.env.PORT ?? 1234

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
