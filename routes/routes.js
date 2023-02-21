// routes.js

const express = require('express');
const router = express.Router();

const userController = require('./controllers/userController');
const authController = require('./controllers/authController');

// Rota para buscar todos os usuários
router.get('/users', userController.getUsers);

// Rota para criar um novo usuário
router.post('/users', userController.createUser);

// Rota para o formulário de login
router.get('/login', authController.showLoginForm);

// Rota para autenticar o usuário
router.post('/login', authController.authenticateUser);

module.exports = router;

