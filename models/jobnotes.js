'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class jobNotes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      jobNotes.belongsTo(models.users, {
        foreignKey: 'createdBy',
        targetKey: 'id',
        as: 'jobNoteCreatedByUser'
      });
    }
  };
  jobNotes.init({
    entityId: DataTypes.INTEGER,
    createdBy: DataTypes.INTEGER,
    note: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'jobNotes',
  });
  return jobNotes;
};