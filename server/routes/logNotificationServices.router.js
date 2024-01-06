const express = require('express');
const validate = require('express-validation');
// const activityLogger = require('../middlewares/activityLogger')
const controller = require('../controllers/logNotificationServices.controller');
const router = express.Router();
const checkToken = require('../middlewares/secureRoutes');


router.route('/notification').get(checkToken,controller.getNotifications);
router.route('/activity').get(checkToken,controller.getActivities);

module.exports = router;