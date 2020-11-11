require("dotenv").config();
const jwt = require('jsonwebtoken');
const User = require('../models/User');


module.exports = {
  async entrar(req, res) {
    const { login, password } = req.body
    
    if (!login || !password) {
      return res.status(401).send('Senha ou login inválido')
    }
    const user = await User.findOne({ where: { login } });
    if (!user) {
      return res.status(401).send('Senha ou login inválido')
    }

    if (!await user.validPassword(password)) {
      return res.status(401).send('Senha ou login inválido')
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET);

    return res.json({ user: user.name, token });
  }
};