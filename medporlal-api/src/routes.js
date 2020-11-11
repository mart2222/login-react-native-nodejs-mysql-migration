const express = require('express');

const UserController = require('./controllers/UserController');
const GrupoController = require('./controllers/GrupoController');
const LoginController = require('./controllers/LoginController');
const VerifyAuthentication = require('./middlewares/VerifyAuthentication');
const NotificacaoController = require('./controllers/NotificacaoController');

const routes = express.Router();

routes.post('/login', LoginController.entrar);

routes.post('/users/vincular', VerifyAuthentication, UserController.vincularAoGrupo);
routes.post('/users/desvincular', VerifyAuthentication, UserController.desvincularAoGrupo);
routes.get('/user/vinculos', VerifyAuthentication, UserController.buscaVinculos);
routes.get('/user/logado', VerifyAuthentication, UserController.busca);
routes.get('/users', VerifyAuthentication, UserController.listar);
routes.post('/users/notificacao', VerifyAuthentication, UserController.salvarIdOnesignal);
routes.post('/user', UserController.criar);

routes.get('/grupos', VerifyAuthentication, GrupoController.listar);
routes.post('/grupo', VerifyAuthentication, GrupoController.criar);
routes.delete('/grupo/:id', VerifyAuthentication, GrupoController.deletar);

routes.post('/notificacao/:grupoId', NotificacaoController.enviarNotificacaoPorGrupo);

module.exports = routes;