const express = require('express');
const validate = require('express-validation');
// const activityLogger = require('../middlewares/activityLogger')
const controller = require('../controllers/uploadServices.controller');
const router = express.Router();
const checkToken = require('../middlewares/secureRoutes');
const upload = require('../helpers/fileUploads');

router.route('/').post(upload.single('file'),controller.uploads);
router.route('/').get(controller.downloads);


module.exports = router;