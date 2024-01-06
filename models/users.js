'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      users.hasMany(models.jobs, {
        foreignKey: 'createdBy',
        sourceKey: 'id',
        as:"createdBy"
      });

      users.hasMany(models.candidate, {
        foreignKey: 'updatedBy',
        sourceKey: 'id',
        as:"candidateUpdatedBy"
      });

      users.hasMany(models.candidate, {
        foreignKey: 'createdBy',
        sourceKey: 'id',
        as:"candidateCreatedBy"
      });

      users.hasMany(models.candidate, {
        foreignKey: 'owner',
        sourceKey: 'id',
        as:"candidateOwnedBy"
      });

      users.hasMany(models.clients, {
        foreignKey: 'createdBy',
        sourceKey: 'id',
        as:"clientCreatedByUser"
      });

      users.hasMany(models.clients, {
        foreignKey: 'updatedBy',
        sourceKey: 'id',
        as:"clientUpdatedByUser"
      });

      users.hasMany(models.clients, {
        foreignKey: 'accountManager',
        sourceKey: 'id',
        as:"clientManager"
      });

      users.hasMany(models.vendors, {
        foreignKey: 'updatedBy',
        sourceKey: 'id',
        as:"vendorUpdatedBy"
      });

      users.hasMany(models.vendors, {
        foreignKey: 'createdBy',
        sourceKey: 'id',
        as:"vendorCreatedBy"
      });

      users.hasMany(models.vendors, {
        foreignKey: 'owner',
        sourceKey: 'id',
        as:"vendorOwnedBy"
      });

      users.hasMany(models.jobNotes, {
        foreignKey: 'createdBy',
        sourceKey: 'id',
        as:"jobNoteCreatedByUser"
      });

      users.hasMany(models.candidateNotes, {
        foreignKey: 'createdBy',
        sourceKey: 'id',
        as:"candidateNoteCreatedByUser"
      });
    }
  };
  users.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{ msg:"first name is required!!!"}
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "last name is required!!!" },
      },
    },
    profilePicture: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   isEmail:{args:true,msg: "invalid email"},
      //   notNull: {msg: "email is required!!!"}
      // },
      unique: { name: 'email',msg: "email already exists!!!",fields: ['email']},
      
    },
    DOB: DataTypes.STRING,
    sessionKey: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "password is required!!!" },
      },
    },
    phoneNumber: DataTypes.STRING,
    address: DataTypes.JSON,
    companyName: DataTypes.STRING,
    userType:DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    language: DataTypes.STRING,
    title: DataTypes.STRING,
    department: DataTypes.STRING,
    timeZone: DataTypes.STRING,
    timeFormat: DataTypes.STRING,
    workingHours: DataTypes.STRING,
    userId:DataTypes.STRING,
    status:{
      default:"ACTIVE",
      type:DataTypes.STRING
    },
    eid:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};