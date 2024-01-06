const express = require('express');
const validate = require('express-validation');
// const activityLogger = require('../middlewares/activityLogger')
const controller = require('../controllers/reportServices.controller');
const router = express.Router();
const checkToken = require('../middlewares/secureRoutes');

router.route('/reports').get(checkToken,controller.getReports);

module.exports = router;