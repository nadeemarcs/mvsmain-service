const logger = require('../../config/logger');
const models = require('../../models');
const Op = models.Sequelize.Op;
const { sequelize, Sequelize } = require('../../models');
const db = require("../../models/index");
const { uniqueIdGenerator } = require('../helpers/getUniqueId');

const getClients = () => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside get clients service");
            let clients = await models.clients.findAll({
                attributes: [
                    "id",
                    "name",
                    "clientId",
                    "email",
                    "PhoneNumber",
                    "fax",
                    "accountManager",
                    "state",
                    "city",
                    "country",
                    "createdBy",
                    "updatedBy",
                    "type",
                    "website",
                    "status",
                    "industry",
                    "zipCode",
                    "source",
                    "about",
                    "parentId",
                    "address",
                    "endClient",
                    "attachment",
                    "contactPersons",
                    "createdAt",
                    "updatedAt",
                    [Sequelize.col('clientCreatedByUser.firstName'), 'createdByFirstName'],
                    [Sequelize.col('clientCreatedByUser.lastName'), 'createdByLastName'],
                    [Sequelize.col('clientCreatedByUser.email'), 'createdByEmail'],
                    [Sequelize.col('clientUpdatedByUser.firstName'), 'updatedByFirstName'],
                    [Sequelize.col('clientUpdatedByUser.lastName'), 'updatedByLastName'],
                    [Sequelize.col('clientUpdatedByUser.email'), 'updatedByEmail'],
                    [Sequelize.col('clientManager.firstName'), 'managerFirstName'],
                    [Sequelize.col('clientManager.lastName'), 'managerLastName'],
                    [Sequelize.col('clientManager.email'), 'managerEmail'],
                    // [Sequelize.col('candidateOwnedBy.firstName'), 'ownedByFirstName'],
                    // [Sequelize.col('candidateOwnedBy.lastName'), 'ownedByLastName'],
                    // [Sequelize.col('candidateOwnedBy.email'), 'ownedByEmail'],
                ],
                include: [
                    {
                        model: models.users,
                        attributes: [],
                        as: "clientCreatedByUser"
                    },
                    {
                        model: models.users,
                        attributes: [],
                        as: "clientUpdatedByUser"
                    },
                    {
                        model: models.users,
                        attributes: [],
                        as: "clientManager"
                    },
                ],
                order: [
                    ['id', 'DESC'],
                ]
            });
            resolve(clients);
        }
        catch (err) {
            logger.fatal(err);
            reject({ code: 401, message: err.message });
        }
    })
}

const searchClients = (query) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside get clients service");
            if(query.includes(',')){
                query = query.split(",");
                query = query.join("|");
            }
            if(query.includes(', ')){
                query = query.split(", ");
                query = query.join("|");
            }
            if(query.includes(' or ')){
                query = query.split(" or ");
                query = query.join("|");
            }
            let searchKeys = [
                {
                    name : Sequelize.literal(`clients.name REGEXP "${query}"`)
                },
                {
                    state: Sequelize.literal(`clients.state REGEXP "${query}"`)
                },
                {
                    city: Sequelize.literal(`clients.city REGEXP "${query}"`)
                },
                {
                    country: Sequelize.literal(`clients.country REGEXP "${query}"`)
                },
                {
                    email: Sequelize.literal(`clients.email REGEXP "${query}"`)
                },
                {
                    phoneNumber: Sequelize.literal(`clients.phoneNumber REGEXP "${query}"`)
                },
            ]
            let condition = {
                [Op.or]: searchKeys
            }
            let clients = await models.clients.findAll({
                where: condition,
                attributes: [
                    "id",
                    "name",
                    "clientId",
                    "email",
                    "PhoneNumber",
                    "fax",
                    "accountManager",
                    "state",
                    "city",
                    "country",
                    "createdBy",
                    "updatedBy",
                    "type",
                    "website",
                    "status",
                    "industry",
                    "zipCode",
                    "source",
                    "about",
                    "parentId",
                    "address",
                    "endClient",
                    "attachment",
                    "contactPersons",
                    "createdAt",
                    "updatedAt",
                    [Sequelize.col('clientCreatedByUser.firstName'), 'createdByFirstName'],
                    [Sequelize.col('clientCreatedByUser.lastName'), 'createdByLastName'],
                    [Sequelize.col('clientCreatedByUser.email'), 'createdByEmail'],
                    [Sequelize.col('clientUpdatedByUser.firstName'), 'updatedByFirstName'],
                    [Sequelize.col('clientUpdatedByUser.lastName'), 'updatedByLastName'],
                    [Sequelize.col('clientUpdatedByUser.email'), 'updatedByEmail'],
                    [Sequelize.col('clientManager.firstName'), 'managerFirstName'],
                    [Sequelize.col('clientManager.lastName'), 'managerLastName'],
                    [Sequelize.col('clientManager.email'), 'managerEmail'],
                    // [Sequelize.col('candidateOwnedBy.firstName'), 'ownedByFirstName'],
                    // [Sequelize.col('candidateOwnedBy.lastName'), 'ownedByLastName'],
                    // [Sequelize.col('candidateOwnedBy.email'), 'ownedByEmail'],
                ],
                include: [
                    {
                        model: models.users,
                        attributes: [],
                        as: "clientCreatedByUser"
                    },
                    {
                        model: models.users,
                        attributes: [],
                        as: "clientUpdatedByUser"
                    },
                    {
                        model: models.users,
                        attributes: [],
                        as: "clientManager"
                    },
                ],
                order: [
                    ['id', 'DESC'],
                ]
            });
            resolve(clients);
        }
        catch (err) {
            logger.fatal(err);
            reject({ code: 401, message: err.message });
        }
    })
}

const getClient = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside get client by id service");
            let client = await models.clients.findOne({ where: { id } });
            resolve(client);
        }
        catch (err) {
            logger.fatal(err);
            reject({ code: 401, message: err.message });
        }
    })
}

const addClient = (clientDetails, userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside add client service", { clientDetails });
            clientDetails.clientId = await uniqueIdGenerator({ dbName: "clients", keyName: "clientId", middleName: "CLIENT" });
            logger.debug(clientDetails.clientId);
            var t = await db.sequelize.transaction();
            await models.clients.create(clientDetails, { transaction: t });
            await t.commit();
            return resolve("client added successfully...");
        }
        catch (err) {
            logger.fatal(err);
            await t.rollback();
            reject({ code: 422, message: err.message });
        }
    })
}

const updateClient = (id, updateClientObj) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside update client service");
            let client = await models.clients.update(updateClientObj, { where: { id } });
            return resolve(client);
        }
        catch (err) {
            logger.fatal(err);
            reject({ code: 401, message: err.message });
        }
    })
}

const deleteClient = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside disable client service");
            let client = await models.clients.destroy({ where: { id } });
            logger.debug(client);
            return resolve("client deleted successfully...");
        }
        catch (err) {
            logger.fatal(err);
            reject({ code: 401, message: err.message });
        }
    })
}

module.exports = {
    getClients,
    getClient,
    addClient,
    updateClient,
    deleteClient,
    searchClients
}