const express = require('express');
const validate = require('express-validation');
// const activityLogger = require('../middlewares/activityLogger')
const controller = require('../controllers/candidateServices.controller');
const router = express.Router();
const checkToken = require('../middlewares/secureRoutes');
const upload = require('../helpers/fileUploads');


router.route('/candidate').post(checkToken,controller.addCandidate);
router.route('/candidateFilter').post(checkToken,controller.getCandidateByFilter);
router.route('/candidates').get(checkToken,controller.getCandidates);
router.route('/candidate').get(checkToken,controller.getCandidate);
router.route('/candidate/:id').put(checkToken,controller.updateCandidate);
router.route('/candidate/:id').delete(checkToken,controller.deleteCandidate);
router.route('/parseCandidate').post(checkToken,upload.array('files',100),controller.parseCandidate);

module.exports = router;