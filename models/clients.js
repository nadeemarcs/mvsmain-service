'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class clients extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      clients.hasMany(models.jobs, {
        foreignKey: 'clientId',
        sourceKey: 'id'
      });

      clients.belongsTo(models.users, {
        foreignKey: 'updatedBy',
        targetKey: 'id',
        as:'clientUpdatedByUser'
      });

      clients.belongsTo(models.users, {
        foreignKey: 'createdBy',
        targetKey: 'id',
        as: 'clientCreatedByUser'
      });

      clients.belongsTo(models.users, {
        foreignKey: 'accountManager',
        targetKey: 'id',
        as: 'clientManager'
      });
    }
  };
  clients.init({
    name: DataTypes.STRING,
    clientId: DataTypes.STRING,
    email: DataTypes.STRING,
    PhoneNumber: DataTypes.STRING,
    fax:DataTypes.STRING,
    accountManager: DataTypes.INTEGER,
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    country: DataTypes.STRING,
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER,
    type: DataTypes.STRING,
    website: DataTypes.STRING,
    status: DataTypes.STRING,
    industry: DataTypes.STRING,
    zipCode: DataTypes.INTEGER,
    source: DataTypes.STRING,
    about: DataTypes.STRING,
    parentId: DataTypes.INTEGER,
    address: DataTypes.JSON,
    endClient: DataTypes.JSON,
    attachment:DataTypes.JSON,
    contactPersons: DataTypes.JSON,
  }, {
    sequelize,
    modelName: 'clients',
  });
  return clients;
};