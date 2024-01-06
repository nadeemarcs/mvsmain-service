'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class jobCandidateMappings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      jobCandidateMappings.belongsTo(models.jobs,{
        foreignKey:'jobId'
      })
      jobCandidateMappings.belongsTo(models.candidate,{
        foreignKey:'candidateId'
      })
    }
  };
  jobCandidateMappings.init({
    jobId: DataTypes.INTEGER,
    candidateId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'jobCandidateMappings',
  });
  return jobCandidateMappings;
};