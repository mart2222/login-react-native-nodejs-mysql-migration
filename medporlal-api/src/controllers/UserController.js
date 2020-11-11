const jwt = require('jsonwebtoken');
const User = require('../models/User');
const GrupoUser = require('../models/GrupoUser');
const Grupo = require('../models/Grupo');

module.exports = {
  async listar(req, res) {
    try {
      const users = await User.findAll();

      return res.json(users);
    } catch (err) {
      console.log(err)
      return res.status(500).end()
    }
  },

  async busca(req, res) {
    try {
      const user = await User.findByPk(req.userId);
      if (!user) {
        return res.status(404).send('Não achou usuário')
      }

      return res.json(user);
    } catch (err) {
      console.log(err)
      return res.status(500).end()
    }
  },

  async criar(req, res) {
    try {
      const { name, login, password } = req.body;

      const userv = await User.findOne({ where: { login } });

      if (userv) {
        return res.status(401).send('Já existe esse login')
      }

      const user = await User.create({ name, login, password });

      const token = jwt.sign({ id: user.id }, process.env.SECRET);

      return res.json(token);
    } catch (err) {
      console.log(err)
      return res.status(500).end()
    }
  },

  async vincularAoGrupo(req, res) {
    try {
      const { grupoId } = req.body;

      const grupo = await Grupo.findByPk(grupoId);
      if (!grupo) {
        return res.status(404).send('Não achou grupo de referência')
      }

      const user = await User.findByPk(req.userId);
      if (!user) {
        return res.status(404).send('Não achou usuário de referência')
      }

      const grupoUser = await GrupoUser.create({ userId: user.id, grupoId });

      return res.json(grupoUser);
    } catch (err) {
      console.log(err)
      return res.status(500).end()
    }
  },

  async desvincularAoGrupo(req, res) {
    try {
      const { grupoId } = req.body;

      const where = { grupoId, userId: req.userId }
      const grupo = await GrupoUser.findOne({ where });
      if (!grupo) {
        return res.status(404).send('Não achou grupo vinculado')
      }

      const user = await User.findByPk(req.userId);
      if (!user) {
        return res.status(404).send('Não achou usuário vinculado')
      }

      const grupoUser = await GrupoUser.destroy({ where });

      return res.json(grupoUser);
    } catch (err) {
      console.log(err)
      return res.status(500).end()
    }
  },

  async buscaVinculos(req, res) {
    try {
      const grupos = await GrupoUser.findAll({ where: { userId: req.userId } });
      return res.json(grupos);
    } catch (err) {
      console.log(err)
      return res.status(500).end()
    }
  },

  async salvarIdOnesignal(req, res) {
    try {
      const { onesignalId } = req.body;
console.log('================')
      const user = await User.findByPk(req.userId);
      if (!user) {
        return res.status(404).send('Não achou usuário para vincular a notificação')
      }

      user.update({ onesignalId })

      return res.json(true);
    } catch (err) {
      console.log(err)
      return res.status(500).end()
    }
  },
};