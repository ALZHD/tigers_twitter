const express = require('express');
require('dotenv').config(); // для того, чтобы работало обращение к process.env
const path = require('path');
const indexRouter = require('./routes/index.router');

const app = express();

const PORT = process.env.PORT || 3001;

app.set('view engine', 'hbs'); // задаём движок отображения

app.use(express.static(path.join(process.env.PWD, 'public'))); // раздача статики
app.use(express.urlencoded({ extended: true })); // чтобы парсить body
app.use(express.json()); // чтобы парсить json
app.use('/', indexRouter);

app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`));
