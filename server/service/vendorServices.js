const logger = require('../../config/logger');
const models = require('../../models');
const Op = models.Sequelize.Op;
const { sequelize, Sequelize } = require('../../models');
const db = require("../../models/index");
const { uniqueIdGenerator } = require('../helpers/getUniqueId');

const getVendors = () => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside get vendors service");
            let vendor = await models.vendors.findAll({
                attributes: [
                    "id",
                    "name",
                    "email",
                    "emailOpt",
                    "einNumber",
                    "vendorId",
                    "skills",
                    "address",
                    "phoneNumber",
                    "contact",
                    "owner",
                    "createdBy",
                    "updatedBy",
                    "website",
                    "status",
                    "createdAt",
                    "updatedAt",
                    [Sequelize.col('vendorCreatedBy.firstName'), 'createdByFirstName'],
                    [Sequelize.col('vendorCreatedBy.lastName'), 'createdByLastName'],
                    [Sequelize.col('vendorCreatedBy.email'), 'createdByEmail'],
                    [Sequelize.col('vendorUpdatedBy.firstName'), 'updatedByFirstName'],
                    [Sequelize.col('vendorUpdatedBy.lastName'), 'updatedByLastName'],
                    [Sequelize.col('vendorUpdatedBy.email'), 'updatedByEmail'],
                    [Sequelize.col('vendorOwnedBy.firstName'), 'ownedByFirstName'],
                    [Sequelize.col('vendorOwnedBy.lastName'), 'ownedByLastName'],
                    [Sequelize.col('vendorOwnedBy.email'), 'ownedByEmail'],
                ],
                include: [
                    {
                        model: models.users,
                        attributes: [],
                        as: "vendorCreatedBy"
                    },
                    {
                        model: models.users,
                        attributes: [],
                        as: "vendorUpdatedBy"
                    },
                    {
                        model: models.users,
                        attributes: [],
                        as: "vendorOwnedBy"
                    }
                ],
                order: [
                    ['id', 'DESC'],
                ]
            });
            resolve(vendor);
        }
        catch (err) {
            logger.fatal(err);
            reject({ code: 401, message: err.message });
        }
    })
}

const searchVendors = (query) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside get vendors service");
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
                    name: Sequelize.literal(`vendors.name REGEXP "${query}"`)
                },
                {
                    einNumber: Sequelize.literal(`vendors.einNumber REGEXP "${query}"`)
                },
                {
                    email: Sequelize.literal(`vendors.email REGEXP "${query}"`)
                },
                {
                    address: Sequelize.literal(`vendors.address REGEXP "${query}"`)
                },
                {
                    phoneNumber: Sequelize.literal(`vendors.phoneNumber REGEXP "${query}"`)
                },
                {
                    contact: Sequelize.literal(`vendors.contact REGEXP "${query}"`)
                },
            ]
            let condition = {
                [Op.or]: searchKeys
            }
            let vendor = await models.vendors.findAll({
                where: condition,
                attributes: [
                    "id",
                    "name",
                    "email",
                    "emailOpt",
                    "einNumber",
                    "vendorId",
                    "skills",
                    "address",
                    "phoneNumber",
                    "contact",
                    "owner",
                    "createdBy",
                    "updatedBy",
                    "website",
                    "status",
                    "createdAt",
                    "updatedAt",
                    [Sequelize.col('vendorCreatedBy.firstName'), 'createdByFirstName'],
                    [Sequelize.col('vendorCreatedBy.lastName'), 'createdByLastName'],
                    [Sequelize.col('vendorCreatedBy.email'), 'createdByEmail'],
                    [Sequelize.col('vendorUpdatedBy.firstName'), 'updatedByFirstName'],
                    [Sequelize.col('vendorUpdatedBy.lastName'), 'updatedByLastName'],
                    [Sequelize.col('vendorUpdatedBy.email'), 'updatedByEmail'],
                    [Sequelize.col('vendorOwnedBy.firstName'), 'ownedByFirstName'],
                    [Sequelize.col('vendorOwnedBy.lastName'), 'ownedByLastName'],
                    [Sequelize.col('vendorOwnedBy.email'), 'ownedByEmail'],
                ],
                include: [
                    {
                        model: models.users,
                        attributes: [],
                        as: "vendorCreatedBy"
                    },
                    {
                        model: models.users,
                        attributes: [],
                        as: "vendorUpdatedBy"
                    },
                    {
                        model: models.users,
                        attributes: [],
                        as: "vendorOwnedBy"
                    }
                ],
                order: [
                    ['id', 'DESC'],
                ]
            });
            resolve(vendor);
        }
        catch (err) {
            logger.fatal(err);
            reject({ code: 401, message: err.message });
        }
    })
}

const getVendor = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside get vendor by id service");
            let vendor = await models.vendors.findOne({ where: { id } });
            resolve(vendor);
        }
        catch (err) {
            logger.fatal(err);
            reject({ code: 401, message: err.message });
        }
    })
}

const addVendor = (details, userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside add vendor service", { details });
            details.vendorId = await uniqueIdGenerator({ dbName: "vendors", "keyName": "vendorId", "middleName": "vendor" });
            logger.debug(details.vendorId);
            var t = await db.sequelize.transaction();
            await models.vendors.create(details, { transaction: t });
            await t.commit();
            return resolve("vendor added successfully...");
        }
        catch (err) {
            logger.fatal(err);
            await t.rollback();
            reject({ code: 422, message: err.message });
        }
    })
}

const updateVendor = (id, updateObj) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside update vendor service");
            let vendor = await models.vendors.update(updateObj, { where: { id } });
            return resolve(vendor);
        }
        catch (err) {
            logger.fatal(err);
            reject({ code: 401, message: err.message });
        }
    })
}

const deleteVendor = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside disable vendor service");
            let vendor = await models.vendors.destroy({ where: { id } });
            logger.debug(vendor);
            return resolve("vendor deleted successfully...");
        }
        catch (err) {
            logger.fatal(err);
            reject({ code: 401, message: err.message });
        }
    })
}

module.exports = {
    getVendors,
    getVendor,
    addVendor,
    updateVendor,
    deleteVendor,
    searchVendors
}