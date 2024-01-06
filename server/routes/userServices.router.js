const express = require('express');
const validate = require('express-validation');
// const activityLogger = require('../middlewares/activityLogger')
const controller = require('../controllers/userServices.controller');
const {login,addUser} = require('../validations/userServices.validation');
const router = express.Router();
const checkToken = require('../middlewares/secureRoutes')


router.route('/login').post(controller.userLogin);
router.route('/addUser').post(controller.addUser);
router.route('/updateUser/:id').put(controller.updateUser);
router.route('/getUserList').get(checkToken,controller.getUserList);
router.route('/getUserProfile/:id').get(checkToken,controller.getUserProfile);
router.route('/search').get(checkToken,controller.searchAll);
router.route('/delete/:id').delete(checkToken,controller.deleteUser);

module.exports = router;