'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class jobs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      jobs.belongsTo(models.clients, {
        foreignKey: 'clientId',
        targetKey: 'id',
        // as: 'clients'
      });

      jobs.belongsTo(models.users, {
        foreignKey: 'createdBy',
        targetKey: 'id',
        as: 'createdByUser'
      });

      jobs.belongsTo(models.users, {
        foreignKey: 'updatedBy',
        targetKey: 'id',
        as: 'updatedByUser'
      });

      jobs.hasMany(models.jobCandidateMappings,{
        foreignKey:'jobId'
      });
    }
  };
  jobs.init({
    jobType: DataTypes.STRING,
    jobTitle: DataTypes.STRING,
    clientId: DataTypes.INTEGER,
    industry: DataTypes.STRING,
    jobId: DataTypes.STRING,
    clientContactName: DataTypes.JSON,
    clientContactPersonId: DataTypes.INTEGER,
    accountManager: DataTypes.STRING,
    openingDate: DataTypes.STRING,
    targetDate: DataTypes.STRING,
    state: DataTypes.STRING,
    leadRecruiter: DataTypes.STRING,
    assignedRecruiter: DataTypes.STRING,
    jobOpeningStatus: DataTypes.STRING,
    salary: DataTypes.INTEGER,
    duration: DataTypes.INTEGER,
    jobModel: DataTypes.STRING,
    workExp: DataTypes.JSON,
    jobLocation: DataTypes.STRING,
    visaType: DataTypes.STRING,
    expenses: DataTypes.STRING,
    taxType: DataTypes.STRING,
    benefits: DataTypes.STRING,
    zipCode: DataTypes.INTEGER,
    fileAttached: DataTypes.STRING,
    jobDescription: DataTypes.TEXT,
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER,
    closingDate:DataTypes.STRING ,
    country:DataTypes.STRING ,
    education:DataTypes.JSON ,
    isHots:DataTypes.BOOLEAN,
    remoteJob:DataTypes.BOOLEAN,
    positions:DataTypes.INTEGER,
    hourlyRate:DataTypes.INTEGER,
    endClient: DataTypes.STRING,
    clientReqId:DataTypes.STRING,
    prefferedSkills:{
      type: DataTypes.STRING,
      get() {
        return (this.getDataValue('prefferedSkills')?this.getDataValue('prefferedSkills').split(';'):null);
      },
      set(val) {
        this.setDataValue('prefferedSkills',(val?val.join(';'):null));
      },
  }
  },{
    sequelize,
    modelName: 'jobs',
  });
  return jobs;
};