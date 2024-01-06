const logger = require('../../config/logger');
const clientService = require('../service/clientServices');
const logPlugin = require('../../mongo/models');
const {getUserProfile} = require('../service/userServices');

const getClients = (req, res, next) => {
    logger.trace("inside get clients controller");
    if (req.query.query) {
        clientService.searchClients(req.query.query.trim()).then(data => {
            return res.status(200).json({ "success": true, "data": data });
        }).catch(err => {
            logger.fatal(err);
            return res.status(err.code ? err.code : 404).json({ "success": false, "message": err.message });
        });
    }
    clientService.getClients().then(data => {
        return res.status(200).json({ "success": true, "data": data });
    }).catch(err => {
        logger.fatal(err);
        return res.status(err.code ? err.code : 404).json({ "success": false, "message": err.message });
    });
}

const getClient = (req, res, next) => {
    logger.trace("inside get client controller");
    let id = parseInt(req.params.id);
    clientService.getClient(id).then(data => {
        res.status(200).json({ "success": true, "data": data });
    }).catch(err => {
        logger.fatal(err);
        return res.status(err.code ? err.code : 404).json({ "success": false, "message": err.message });
    });
}

const addClient = (req, res, next) => {
    let clientDetails = req.body;
    let userId = req.payLoad.id;
    logger.trace("inside add client controller", clientDetails);
    clientService.addClient(clientDetails, userId).then(async data => {
        res.status(200).json({ "success": true, "data": data });
        let userDetails = await getUserProfile({id:req.payLoad.id});
        logPlugin.notification.create({ message: `A new client (${clientDetails.name}) has been created by (${userDetails[0].firstName+" "+userDetails[0].lastName}).` });
        logPlugin.activity.create({ message: `A new client (${clientDetails.name}) has been created by (${userDetails[0].firstName+" "+userDetails[0].lastName}).` });
    }).catch(err => {
        logger.fatal(err);
        return res.status(err.code ? err.code : 404).json({ "success": false, "message": err.message });
    });
}

const updateClient = (req, res, next) => {
    let clientDetailsObj = req.body;
    let id = parseInt(req.params.id);
    logger.trace("inside update client controller", id, clientDetailsObj);
    clientService.updateClient(id, clientDetailsObj).then(data => {
        res.status(200).json({ "success": true, "data": data });
    }).catch(err => {
        logger.fatal(err);
        return res.status(err.code ? err.code : 404).json({ "success": false, "message": err.message });
    });
}

const deleteClient = (req, res, next) => {
    let id = parseInt(req.params.id);
    logger.trace("inside delete client controller", id);
    clientService.deleteClient(id).then(data => {
        res.status(200).json({ "success": true, "data": data });
    }).catch(err => {
        logger.fatal(err);
        return res.status(err.code ? err.code : 404).json({ "success": false, "message": err.message });
    });
}

module.exports = {
    getClients,
    getClient,
    addClient,
    updateClient,
    deleteClient
}