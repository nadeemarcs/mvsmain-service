const logger = require('../../config/logger');
const ReportService = require('../service/reportServices');

const getReports = (req, res, next) => {
    logger.trace("inside get reports controller", req.query);
    let createdBy = req.query.createdBy;
    let condition = {};
    if (createdBy) {
        condition = { createdBy };
    }
    let createdAt = new Date(new Date(req.query.startDate?req.query.startDate:'07/25/2021').setUTCHours(0, 0, 0, 0));
    condition['startDate'] = createdAt
    createdAt = new Date(new Date(req.query.endDate || Date.now()).setUTCHours(23, 59, 59, 59));
    condition['endDate'] = createdAt
    ReportService.getReports(condition).then(data => {
        res.status(200).json({ "success": true, "data": data });
    }).catch(err => {
        logger.fatal(err);
        return res.status(err.code ? err.code : 404).json({ "success": false, "message": err.message });
    });
}

module.exports = {
    getReports
}