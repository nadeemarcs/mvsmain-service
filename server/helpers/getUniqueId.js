const logger = require('../../config/logger');
const models = require('../../models');
const Op = models.Sequelize.Op;
const bcrypt = require('bcryptjs');
const { sequelize, Sequelize } = require('../../models');

let uniqueId = "RZ_JOB_100"

const uniqueIdGenerator = async (obj) =>{
    let dbName = obj.dbName;
    let lastEntry = await models[dbName].findOne({order:[["createdAt","DESC"]],raw:true});
    logger.debug(lastEntry);
    let lastValue = "100";
    if(lastEntry){
        lastValue = lastEntry[obj.keyName]?(lastEntry[obj.keyName].split("_")[2]):"100";
    }
    return `RZ_${obj.middleName}_${parseInt(lastValue)+1}`;
}

module.exports = {
    uniqueIdGenerator
}