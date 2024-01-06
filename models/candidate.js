'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class candidate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // d efine association here
      candidate.belongsTo(models.users, {
        foreignKey: 'createdBy',
        targetKey: 'id',
        as: 'candidateCreatedBy'
      });

      candidate.belongsTo(models.users, {
        foreignKey: 'updatedBy',
        targetKey: 'id',
        as: 'candidateUpdatedBy'
      });

      candidate.belongsTo(models.users, {
        foreignKey: 'owner',
        targetKey: 'id',
        as: 'candidateOwnedBy'
      });

      candidate.hasMany(models.jobCandidateMappings,{
        foreignKey:'candidateId'
      });
    }
  };
  candidate.init({
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    review:DataTypes.STRING,
    candidateId: {
      type:DataTypes.STRING,
      set(val) {
        console.log(this.id);
        this.setDataValue('candidateId',this.candidateId);
      },
    },
    secondaryEmail: DataTypes.STRING,
    visaStatus: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    street: DataTypes.STRING,
    country: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    telNumber: DataTypes.STRING,
    reLocation: DataTypes.STRING,
    recruiter: DataTypes.STRING,
    zipCode: DataTypes.INTEGER,
    social: DataTypes.JSON,
    candidateType: DataTypes.STRING,
    education: DataTypes.STRING,
    experience: DataTypes.INTEGER,
    expectedSalary: DataTypes.INTEGER,
    currentSalary: DataTypes.INTEGER,
    desiredPay: DataTypes.STRING,
    hourlyRate: DataTypes.INTEGER,
    currentJobTitle: DataTypes.STRING,
    resume: DataTypes.STRING,
    source: DataTypes.STRING,
    isCounterOffer:DataTypes.BOOLEAN,
    skills: {
      type: DataTypes.STRING,
      get() {
        return (this.getDataValue('skills')?this.getDataValue('skills').split(';'):null);
      },
      set(val) {
        this.setDataValue('skills',(val?val.join(';'):null));
      },
    },
    status: DataTypes.STRING,
    employerOrVendor: DataTypes.JSON,
    createdBy: DataTypes.INTEGER,
    modifiedBy: DataTypes.INTEGER,
    owner: DataTypes.INTEGER,
    noticePeriod: DataTypes.STRING,
    allowEmailNotification: DataTypes.BOOLEAN,
    resumeText:DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'candidate',
  });
  return candidate;
};