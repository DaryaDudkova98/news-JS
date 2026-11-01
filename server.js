require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/api/news', async (req, res) => {

  if (!process.env.API_KEY) {
    console.error('❌ ОШИБКА: Переменная API_KEY не найдена в файле .env!');
    return res.status(500).json({ error: 'API_KEY не настроен на сервере' });
  }

  try {
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        ...req.query,
        apiKey: process.env.API_KEY
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('--- ОШИБКА ОТ NEWSAPI ---');
    console.error('Статус:', error.response?.status);
    console.error('Данные:', error.response?.data);
    console.error('-------------------------');

    res.status(error.response?.status || 500).json({
      error: 'Ошибка при запросе к NewsAPI',
      details: error.response?.data || error.message
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ Прокси-сервер запущен на порту ${PORT}`));