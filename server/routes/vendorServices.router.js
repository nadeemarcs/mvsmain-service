const express = require('express');
const validate = require('express-validation');
// const activityLogger = require('../middlewares/activityLogger')
const controller = require('../controllers/vendorServices.controller');
const router = express.Router();
const checkToken = require('../middlewares/secureRoutes');


router.route('/vendor').post(checkToken,controller.addVendor);
router.route('/vendor').get(checkToken,controller.getVendors);
router.route('/vendor/:id').get(checkToken,controller.getVendor);
router.route('/vendor/:id').put(checkToken,controller.updateVendor);
router.route('/vendor/:id').delete(checkToken,controller.deleteVendor);
// router.route('/vendor/search').get(checkToken,controller.searchVendor);

module.exports = router;