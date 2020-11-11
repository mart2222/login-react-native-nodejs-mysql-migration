const Grupo = require('../models/Grupo');

module.exports = {
  async listar(req, res) {
    const grupos = await Grupo.findAll();

    return res.json(grupos);
  },

  async criar(req, res) {
    const { descricao } = req.body;

    if (!descricao) {
      return res.status(401).send('Descrição do grupo é obrigatório')
    }

    const grupov = await Grupo.findOne({ where: { descricao } });

    if (grupov) {
      return res.status(401).send('Já existe esse grupo')
    }

    const grupo = await Grupo.create({ descricao });

    return res.json(grupo);
  },

  async deletar(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(401).send('Grupo é obrigatório')
    }

    const grupo = await Grupo.destroy({ where: { id } });

    return res.json(grupo);
  }
};