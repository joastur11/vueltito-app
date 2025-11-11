export default async function handler(req, res) {
  const apiKey = process.env.GNEWS_KEY;
  const url = `https://gnews.io/api/v4/top-headlines?country=ar&topic=business&lang=es&max=5&apikey=${apiKey}`;

  try {
    const respuesta = await fetch(url);
    const data = await respuesta.json();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener noticias" });
  }
}
