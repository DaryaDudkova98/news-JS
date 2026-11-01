require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/api/news', async (req, res) => {
  try {
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        ...req.query,
        apiKey: process.env.NEWS_API_KEY
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Ошибка при запросе к NewsAPI' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Прокси-сервер запущен на порту ${PORT}`));