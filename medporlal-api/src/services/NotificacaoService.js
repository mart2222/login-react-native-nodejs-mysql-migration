const https = require("https");
const User = require('../models/User');
const { Op } = require('sequelize');
const Grupo = require('../models/Grupo');

async function enviaMensageParaTodosDoGrupo(notificacao, grupoId) {
  if (!notificacao) return;

  const payload = {
    smallImage: notificacao.smallImage,
    bigImage: notificacao.bigImage,
    message: notificacao.message,
    title: notificacao.title,
    prioridade: notificacao.prioridade,
    openUrl: notificacao.openUrl,
    sound: notificacao.sound,
    vibrate: notificacao.vibrate
  };

  let tokens = [];
  try {
    // Paginado por conta da api do OneSignal
    const firstResult = await getUsuariosPorGrupoPaginado(0, grupoId);
    tokens = firstResult.map(m => m.onesignalId);
    await enviaMensage(tokens, payload);

    for (let index = 1; index < firstResult.pages; index++) {
      try {
        const result = await getUsuariosPorGrupoPaginado(index, grupoId);
        tokens = result.map(m => m.onesignalId);
        await enviaMensage(tokens, payload);
      } catch (error) {
        // return error;
      }
    }
  } catch (error) {
    // return error;
  }
}

async function enviaMensage(tokens, payload) {
  if (!tokens.length) return;

  const newMessage = {
    app_id: process.env.APP_ID_ONESIGNAL,
    contents: { en: payload.message },
    headings: { en: payload.title },
    url: payload.openUrl,
    small_icon: "iconnotification",
    large_icon: payload.smallImage,
    big_picture: payload.bigImage,
    android_sound: payload.sound ? null : 'nil',
    include_player_ids: tokens,
    priority: payload.prioridade > 0 ? 10 : null,
  };

  sendNotification(newMessage);
}

function sendNotification(data) {
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    Authorization: `Basic ${process.env.TOKEN_ONESIGNAL}`
  };

  const options = {
    host: "onesignal.com",
    port: 443,
    path: "/api/v1/notifications",
    method: "POST",
    headers: headers
  };

  const req = https.request(options, function (res) {
    res.on("data", function (data) {
      // console.log("SUCCESS ao enviar notificacao");
    });
  });

  req.on("error", function (e) {
    // console.log("ERROR ao enviar notificacao");
  });

  req.write(JSON.stringify(data));
  req.end();
}

async function getUsuariosPorGrupoPaginado(page = 0, grupoId) {
  try {
    const limit = 2000;
    const users = await User.findAll({
      include: { model: Grupo, as: 'grupos', where: { id: grupoId } },
      where: {
        onesignalId: { [Op.ne]: null }
      },
      limit,
      offset: limit * page,
    });
    console.log('------------------------ Enviado notificação ------------------------')
    console.log(`total = ${users.length}`)
    console.log('------------------------ Enviado notificação ------------------------')
    return users;
  } catch (error) {
    console.error(error);
  }
}

module.exports = { enviaMensageParaTodosDoGrupo };
