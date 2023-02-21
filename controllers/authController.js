const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const authController = {
  // Método para exibir o formulário de login
  getLogin(req, res) {
    res.render('login');
  },

  // Método para autenticar o usuário
  async postLogin(req, res) {
    const { email, senha } = req.body;
    try {
      // Verificar se o usuário existe
      const user = await User.findOneByEmail(email);
      if (!user) {
        return res.status(401).json({ message: 'Email ou senha inválidos.' });
      }

      // Verificar se a senha está correta
      const passwordMatch = await bcrypt.compare(senha, user.senha);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Email ou senha inválidos.' });
      }

      // Gerar token de autenticação
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h'
      });

      // Retornar token e informações do usuário
      res.status(200).json({ token, user: { id: user.id, email: user.email } });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao autenticar usuário.' });
    }
  }
};

module.exports = authController;
