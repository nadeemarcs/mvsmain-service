'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class candidateNotes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      candidateNotes.belongsTo(models.users, {
        foreignKey: 'createdBy',
        targetKey: 'id',
        as: 'candidateNoteCreatedByUser'
      });
    }
  };
  candidateNotes.init({
    entityId: DataTypes.INTEGER,
    createdBy: DataTypes.INTEGER,
    note: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'candidateNotes',
  });
  return candidateNotes;
};