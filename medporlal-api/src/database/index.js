const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const Grupo = require('../models/Grupo');
const GrupoUser = require('../models/GrupoUser');

const connection = new Sequelize(dbConfig);

User.init(connection);
Grupo.init(connection);
GrupoUser.init(connection);

User.associate(connection.models);
Grupo.associate(connection.models);
GrupoUser.associate(connection.models);

module.exports = connection;