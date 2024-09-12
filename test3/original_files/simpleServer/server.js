const express = require('express');
const cors = require('cors');

const initialData = require('./initialData.json');

const app = express();

// CORS
const corsOptions = { origin: '*', credentials: true, secure: false };
app.use(cors(corsOptions));

app.get('/', (req, res) => {res.send(initialData)});

app.listen(3000, () => {console.log('Сервер запущен!')});