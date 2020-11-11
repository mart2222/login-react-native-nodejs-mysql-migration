const bcrypt = require('bcrypt');
const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      login: DataTypes.STRING,
      password: DataTypes.STRING,
      onesignalId: DataTypes.STRING,
    }, {
      sequelize,
      hooks: {
        beforeCreate: (user) => {
          const salt = bcrypt.genSaltSync();
          user.password = bcrypt.hashSync(user.password, salt);
        }
      },
    })
  }

  static associate(models) {
    this.belongsToMany(models.Grupo, { foreignKey: 'userId', through: 'grupousers', as: 'grupos' });
  }
}

User.prototype.validPassword = function(password) {
  return bcrypt.compare(password, this.password)
}

module.exports = User;