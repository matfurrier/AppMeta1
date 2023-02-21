const express = require('express');
const app = express();
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./config/db');
const User = require('./models/user')(db);

// Sincroniza as tabelas no banco de dados, caso elas ainda não existam
db.sync();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('login');
});

app.use(function(req, res, next) {
  res.setHeader("Content-Security-Policy", "font-src 'self' https://fonts.gstatic.com");
  return next();
});

// Definindo as rotas
app.use('/', usersRouter);
app.use('/', authRouter);

// Iniciando o servidor
app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
