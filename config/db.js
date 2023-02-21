const { Sequelize } = require('sequelize');
const config = require('../config/config.json')['production'];
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Conexão bem-sucedida com o banco de dados.');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });

const User = require('../models/user')(sequelize);

// Cria as tabelas no banco de dados, caso elas ainda não existam
sequelize.sync();

module.exports = sequelize;
