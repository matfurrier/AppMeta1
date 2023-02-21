const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rota para buscar todos os usuários
router.get('/users', userController.index);

// Rota para criar um novo usuário
router.post('/users', userController.create);

module.exports = router;
