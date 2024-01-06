'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class vendors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      vendors.belongsTo(models.users, {
        foreignKey: 'createdBy',
        targetKey: 'id',
        as: 'vendorCreatedBy'
      });

      vendors.belongsTo(models.users, {
        foreignKey: 'updatedBy',
        targetKey: 'id',
        as: 'vendorUpdatedBy'
      });

      vendors.belongsTo(models.users, {
        foreignKey: 'owner',
        targetKey: 'id',
        as: 'vendorOwnedBy'
      })
    }
  };
  vendors.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    vendorId: DataTypes.STRING,
    emailOpt: DataTypes.STRING,
    einNumber: DataTypes.STRING,
    skills: DataTypes.JSON,
    address: DataTypes.JSON,
    phoneNumber: DataTypes.STRING,
    contact: DataTypes.STRING,
    owner: DataTypes.INTEGER,
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER,
    website: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'vendors',
  });
  return vendors;
};