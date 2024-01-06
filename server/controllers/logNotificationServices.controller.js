const logger = require('../../config/logger');
const logNotificationService = require('../service/logNotificationServices');

const getNotifications = (req,res,next)=>{
    logger.trace("inside get notification controller");
    logNotificationService.getNotifications().then(data=>{
        res.status(200).json({"success":true, "data":data});
    }).catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
    });
}

const getActivities = (req,res,next)=>{
    logger.trace("inside get activity controller");
    logNotificationService.getActivities().then(data=>{
        res.status(200).json({"success":true, "data":data});
    }).catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
    });
}

module.exports = {
    getNotifications,
    getActivities
}