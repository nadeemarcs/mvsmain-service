const express = require('express');
const validate = require('express-validation');
// const activityLogger = require('../middlewares/activityLogger')
const controller = require('../controllers/jobServices.controller');
const router = express.Router();
const checkToken = require('../middlewares/secureRoutes');


router.route('/addJob').post(checkToken,controller.addJob);
router.route('/getJobs').get(checkToken,controller.getJobs);
router.route('/getJob/:id').get(checkToken,controller.getJob);
router.route('/updateJob/:id').put(checkToken,controller.updateJob);
router.route('/associate').post(checkToken,controller.associateJob);
router.route('/associate').put(checkToken,controller.updateAssociateJob);
router.route('/deleteJob/:id').delete(checkToken,controller.deleteJob);
router.route('/prefferedCandidate/:id').get(checkToken,controller.getPrefferedCandidate);

module.exports = router;