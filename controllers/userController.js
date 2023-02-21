// controllers/userController.js

const { User } = require('../models');
const sequelize = require('../config/db');

const userController = {
  // Método para listar todos os usuários
  async index(req, res) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao buscar usuários.' });
    }
  },

  // Método para criar um novo usuário
  async create(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.create({ email, password });
      res.status(201).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao criar usuário.' });
    }
  },

  // Método para buscar um usuário por ID
  async show(req, res) {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'Usuário não encontrado.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao buscar usuário.' });
    }
  },

  // Método para atualizar um usuário por ID
  async update(req, res) {
    const { id } = req.params;
    const { email, password } = req.body;
    try {
      const user = await User.findByPk(id);
      if (user) {
        await user.update({ email, password });
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'Usuário não encontrado.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao atualizar usuário.' });
    }
  },

  // Método para excluir um usuário por ID
  async destroy(req, res) {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (user) {
        await user.destroy();
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Usuário não encontrado.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao excluir usuário.' });
    }
  }
};

module.exports = userController;