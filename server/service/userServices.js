const logger = require('../../config/logger');
const models = require('../../models');
const Op = models.Sequelize.Op;
const bcrypt = require('bcryptjs');
const { sequelize, Sequelize } = require('../../models');
const { uniqueIdGenerator } = require('../helpers/getUniqueId');
const db = require("../../models/index");

const findUserByID = (condition) => {
  logger.debug("inside find user by id", condition);
  return new Promise((resolve, reject) => {
    models.users.findOne({ where: condition }, { raw: true })
      .then((data) => {
        if (data) {
          logger.debug(data)
          resolve(data);
        }
        else {
          reject("user Not Found")
        }
      })
      .catch(err => reject("db error"));
  });
}

const isUserExist = (data) => {
  logger.debug("inside is user exist");
  return new Promise(async (resolve, reject) => {
    let condition = {
      email: data.email,
    }
    let userData = await models.users.findOne({ attributes: ['email'], where: condition });
    if (userData) {
      resolve(true);
    }
    else {
      resolve(false);
    }
  });
}

const userLogin = (userCreds) => {
  logger.debug("inside user login", { userCreds });
  return new Promise(async (resolve, reject) => {
    let condition = {
      email: userCreds.email,
    }
    let userData = await models.users.findOne({
      where: condition,
      attributes: ['id', 'firstName', 'lastName', 'email', 'password','status'],
      raw: true
    })

    if (userData) {
      if(userData.status === "DELETED"){
        return reject("THIS USER HAS NO LONGER ACCESS TO LOGIN");
      }
      if (userData && bcrypt.compareSync(userCreds.password, userData.password)) {
        delete userData.password;
        resolve(userData);
      }
      else {
        reject("Invalid Password");
      }
    }
    else {
      reject("Invalid Email ID");
    }
  });
};


const addUser = async (userData) => {
  logger.debug("inside add user service", { userData });
  try {
    userData.userId = await uniqueIdGenerator({ dbName: "users", "keyName": "userId", "middleName": "USER" });
    logger.debug(userData.userId);
    var t = await db.sequelize.transaction();
    await models.users.create(userData, { transaction: t });
    await t.commit();
    return ("data inserted successfully");
  }
  catch (err) {
    logger.fatal(err);
    await t.rollback();
    if (err.name === 'SequelizeValidationError') {
      err = await err.errors.map(e => e.message);
      throw new Error(err);
    }
    throw new Error(err.message);
  }
}

const userForgotPassword = (userData) => {
  console.log("inside user userpassword forget");
  return new Promise((resolve, reject) => {
    isUserExist(userData)
      .then(() => {
        console.log("data found updating ....");
        models.users.update({ password: userData.newPassword }, { where: { email: userData.email } })
          .then(resolve("password reset"))
          .catch(err => reject(err))
      })
      .catch(err => reject(err));
  });
};


const getUserList = (condition) => {
  logger.debug("inside get user list", condition);
  condition.status = {[Op.notIn]:["DELETED","DEACTIVATE"]}
  logger.debug(condition);
  return new Promise((resolve, reject) => {
    models.users.findAll({
      where: condition  ,
      order: [['id', 'DESC']],
      raw: true
    })
      .then(async data => { 
        if (data) {
          resolve(data);
        }
        else {
          reject("no User exist");
        }
      })
      .catch(err => {
        reject(err.message)
      });
  });
};

const searchUser = (query) => {
  logger.trace("inside search user", { query });
  query = query.split(", ");
  query = query.join("|");
  let searchKeys = [
    {
      firstName: Sequelize.literal(`users.firstName REGEXP "${query}"`)
    },
    {
      lastName: Sequelize.literal(`users.lastName REGEXP "${query}"`)
    },
    {
      email: Sequelize.literal(`users.email REGEXP "${query}"`)
    },
    {
      phoneNumber: Sequelize.literal(`users.phoneNumber REGEXP "${query}"`)
    },
  ]
  let condition = {
    [Op.or]: searchKeys
  }
  return new Promise((resolve, reject) => {
    models.users.findAll({
      where: condition,
      order: [['id', 'DESC']],
      raw: true
    })
      .then(async data => {
        if (data) {
          resolve(data);
        }
        else {
          reject("no User exist");
        }
      })
      .catch(err => {
        reject(err.message)
      });
  })
}

const getUserProfile = (condition) => {
  logger.debug("inside get user list", condition);
  return new Promise((resolve, reject) => {
    models.users.findAll({
      where: condition,
      order: [['id', 'DESC']],
      raw: true
    })
      .then(async data => {
        if (data) {
          resolve(data);
        }
        else {
          reject("no User exist");
        }
      })
      .catch(err => {
        reject(err.message)
      });
  });
};

const deleteUser = (condition) => {
  console.log("inside delete User data");
  return new Promise((resolve, reject) => {
    models.users.update({status:"DELETED"},{ where: condition })
      .then(resolve("user details deleted"))
      .catch(err => reject(err))
  })
};


const updateUser = (userData, id) => {
  console.log("inside updatedevice data");
  return new Promise((resolve, reject) => {
    let condition = {
      id: id
    }
    let dataSet = userData;
    logger.debug(dataSet, condition);
    findUserByID(condition)
      .then((data) => {
        if (dataSet.password && data.password && bcrypt.compareSync(dataSet.newPassword, data.password)) {
          return reject("please enter new password");
        }
        models.users.update(dataSet, { where: condition })
          .then(resolve("user details updated"))
          .catch(err => reject(err))
      })
      .catch(err => reject(err));
  });
};

module.exports = {
  userLogin,
  addUser,
  userForgotPassword,
  getUserList,
  deleteUser,
  updateUser,
  getUserProfile,
  searchUser
};
