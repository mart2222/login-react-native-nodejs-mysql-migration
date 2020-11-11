const { Model, DataTypes } = require('sequelize');

class Grupo extends Model {
  static init(sequelize) {
    super.init({
      descricao: DataTypes.STRING,
    }, {
      sequelize
    })
  }

  static associate(models) {
    this.belongsToMany(models.User, { foreignKey: 'grupoId', through: 'grupousers', as: 'users' });
  }
}

module.exports = Grupo;