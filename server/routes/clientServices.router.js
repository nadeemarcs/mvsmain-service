const express = require('express');
const validate = require('express-validation');
// const activityLogger = require('../middlewares/activityLogger')
const controller = require('../controllers/clientServices.controller');
const router = express.Router();
const checkToken = require('../middlewares/secureRoutes');


router.route('/client').post(checkToken,controller.addClient);
router.route('/client').get(checkToken,controller.getClients);
router.route('/client/:id').get(checkToken,controller.getClient);
router.route('/client/:id').put(checkToken,controller.updateClient);
router.route('/client/:id').delete(checkToken,controller.deleteClient);

module.exports = router;