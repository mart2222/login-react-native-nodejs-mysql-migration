const Grupo = require('../models/Grupo');
const NotificacaoService = require('../services/NotificacaoService');

module.exports = {

  async enviarNotificacaoPorGrupo(req, res) {
    try {
      const { title, message } = req.body;

      if (!title || !message) {
        return res.status(401).send('Faltou parâmetros')
      }
      const { grupoId } = req.params
      const grupo = await Grupo.findByPk(grupoId);
      if (!grupo) {
        return res.status(401).send('Não encontrou o grupo')
      }

      await NotificacaoService.enviaMensageParaTodosDoGrupo({ title, message }, grupoId)

      return res.json({ enviado: true });
    } catch (err) {
      // console.log(err)
      return res.json({ enviado: false });
    }
  },
};