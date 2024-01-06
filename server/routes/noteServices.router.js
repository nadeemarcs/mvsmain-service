const express = require('express');
const validate = require('express-validation');
// const activityLogger = require('../middlewares/activityLogger')
const controller = require('../controllers/noteServices.controller');
const router = express.Router();
const checkToken = require('../middlewares/secureRoutes');


router.route('/note').post(checkToken,controller.addNote);
router.route('/note').get(checkToken,controller.getNotes);
// router.route('/note/:id').get(checkToken,controller.getNote);
router.route('/note/:id').put(checkToken,controller.updateNote);
router.route('/note/:id').delete(checkToken,controller.deleteNote);

module.exports = router;