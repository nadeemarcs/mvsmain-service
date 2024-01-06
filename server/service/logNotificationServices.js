const logger = require('../../config/logger');
const models = require('../../mongo/models');
// const { uniqueIdGenerator } = require('../helpers/getUniqueId');

const getNotifications = () => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside get notifications service");
            let Notifications = await models.notification.find({}).sort({_id:-1})
            resolve(Notifications);
        }
        catch (err) {
            logger.fatal(err);
            reject({ code: 401, message: err.message });
        }
    })
}

const getActivities = () => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside get Activities service");
            let Activities = await models.activity.find({}).sort({_id:-1})
            resolve(Activities);
        }
        catch (err) {
            logger.fatal(err);
            reject({ code: 401, message: err.message });
        }
    })
}

module.exports = {
    getNotifications,
    getActivities,
}