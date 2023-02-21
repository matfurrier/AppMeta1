// models/user.js
/*
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = function (sequelize) {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [6, 100],
      },
    },
  });

  // Função para criptografar a senha antes de salvar no banco
  User.addHook('beforeCreate', async (user) => {
    user.senha = await bcrypt.hash(user.senha, 10);
  });

  return User;
};
*/
// models/user.js

const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = function (sequelize) {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [6, 100],
      },
    },
  });

  User.addHook('beforeCreate', async (user) => {
    user.senha = await bcrypt.hash(user.senha, 10);
  });

  User.findOneByEmail = async function(email) {
    return await User.findOne({ where: { email: email } });
  };

  return User;
};
