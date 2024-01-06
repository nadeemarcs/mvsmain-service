const express = require('express');

const userServicesRoutes = require('./server/routes/userServices.router');
const uploadServicesRoutes = require('./server/routes/uploadServices.router');
const jobServicesRoutes = require('./server/routes/jobServices.router');
const clientServicesRoutes = require('./server/routes/clientServices.router');
const candidateServicesRoutes = require('./server/routes/candidateServices.router');
const vendorServicesRoutes = require('./server/routes/vendorServices.router');
const noteServicesRoutes = require('./server/routes/noteServices.router');
const reportServicesRoutes = require('./server/routes/reportServices.router');
const logNotificationServicesRoutes = require('./server/routes/logNotificationServices.router');
const router = express.Router(); // eslint-disable-line new-cap
// let expressWs = require('express-ws')(router);


/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => res.send('OK'));

router.use('/userService', userServicesRoutes);
router.use('/upload', uploadServicesRoutes);
router.use('/jobService', jobServicesRoutes);
router.use('/clientService', clientServicesRoutes);
router.use('/candidateService', candidateServicesRoutes);
router.use('/vendorService', vendorServicesRoutes);
router.use('/noteService', noteServicesRoutes);
router.use('/reportService', reportServicesRoutes);
router.use('/log', logNotificationServicesRoutes);


module.exports = router;
