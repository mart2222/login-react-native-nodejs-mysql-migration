const { Model, DataTypes } = require('sequelize');

class GrupoUsers extends Model {
  static init(sequelize) {
    super.init({
      userId: DataTypes.INTEGER,
      grupoId: DataTypes.INTEGER,
    }, {
      sequelize
    })
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    this.belongsTo(models.Grupo, { foreignKey: 'grupoId', as: 'grupo' });
  }
}

module.exports = GrupoUsers;