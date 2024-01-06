const logger = require('../../config/logger');
const models = require('../../models');
const Op = models.Sequelize.Op;
const { sequelize, Sequelize } = require('../../models');
const db = require("../../models/index");
const {uniqueIdGenerator} = require('../helpers/getUniqueId');
const {getCandidates} = require('./candidateServices');

const getJobs = (condition = {}) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside get jobs service");
            let jobs = await models.jobs.findAll({
                where:condition,
                attributes: [
                    "id",
                    "jobType",
                    "jobTitle",
                    "clientId",
                    "industry",
                    "jobId",
                    "clientContactName",
                    "accountManager",
                    "openingDate",
                    "targetDate",
                    "state",
                    "leadRecruiter",
                    "assignedRecruiter",
                    "jobOpeningStatus",
                    "salary",
                    "duration",
                    "jobModel",
                    "workExp",
                    "jobLocation",
                    "visaType",
                    "expenses",
                    "taxType",
                    "benefits",
                    "zipCode",
                    "fileAttached",
                    "jobDescription",
                    "createdBy",
                    "updatedBy",
                    "closingDate" ,
                    "country" ,
                    "education" ,
                    "isHots",
                    "remoteJob",
                    "positions",
                    "hourlyRate",
                    "clientReqId",
                    "prefferedSkills",
                    "endClient",
                    "createdAt",
                    "updatedAt",
                    [Sequelize.col('createdByUser.firstName'), 'createdByFirstName'],
                    [Sequelize.col('createdByUser.lastName'), 'createdByLastName'],
                    [Sequelize.col('createdByUser.email'), 'createdByEmail'],
                    [Sequelize.col('updatedByUser.firstName'), 'updatedByFirstName'],
                    [Sequelize.col('updatedByUser.lastName'), 'updatedByLastName'],
                    [Sequelize.col('updatedByUser.email'), 'updatedByEmail'],
                    [Sequelize.col('client.name'), 'clientName'],
                    [Sequelize.col('client.phoneNumber'), 'clientContactNumber'],
                    [Sequelize.col('client.email'), 'clientEmail'],
                ],
                include: [
                    {
                        model: models.users,
                        attributes: [],
                        as:"createdByUser"
                    },
                    {
                        model: models.users,
                        attributes: [],
                        as:"updatedByUser"
                    },
                    {
                        model: models.clients,
                        attributes: [],
                    },
                    {
                        model: models.jobCandidateMappings,
                        attributes: ["status","updatedAt"],
                        include:[{
                            model: models.candidate,
                            // attributes: []
                        }]
                    },
                ],
                order: [
                    ['id', 'DESC'],
                ],
            });
            resolve(jobs);
        }
        catch (err) {
            logger.fatal(err);
            reject({ code:401, message: err.message });
        }
    })
}

const searchJobs = (query) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside get jobs service",{query});
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
                    jobType: Sequelize.literal(`jobs.jobType REGEXP "${query}"`)
                },
                {
                    jobTitle: Sequelize.literal(`jobs.jobTitle REGEXP "${query}"`)
                },
                {
                    jobLocation: Sequelize.literal(`jobs.jobLocation REGEXP "${query}"`)
                },
                {
                    country: Sequelize.literal(`jobs.country REGEXP "${query}"`)
                },
                {
                    jobOpeningStatus: Sequelize.literal(`jobs.jobOpeningStatus REGEXP "${query}"`)
                },
                {
                    state: Sequelize.literal(`jobs.state REGEXP "${query}"`)
                },
            ]
            let condition = {
                [Op.or]: searchKeys
            }
            let jobs = await models.jobs.findAll({
                where:condition,
                attributes: [
                    "id",
                    "jobType",
                    "jobTitle",
                    "clientId",
                    "industry",
                    "jobId",
                    "clientContactName",
                    "accountManager",
                    "openingDate",
                    "targetDate",
                    "state",
                    "leadRecruiter",
                    "assignedRecruiter",
                    "jobOpeningStatus",
                    "salary",
                    "duration",
                    "jobModel",
                    "workExp",
                    "jobLocation",
                    "visaType",
                    "expenses",
                    "taxType",
                    "benefits",
                    "zipCode",
                    "fileAttached",
                    "jobDescription",
                    "createdBy",
                    "updatedBy",
                    "closingDate" ,
                    "country" ,
                    "education" ,
                    "isHots",
                    "remoteJob",
                    "positions",
                    "hourlyRate",
                    "clientReqId",
                    "prefferedSkills",
                    "endClient",
                    "createdAt",
                    "updatedAt",
                    [Sequelize.col('createdByUser.firstName'), 'createdByFirstName'],
                    [Sequelize.col('createdByUser.lastName'), 'createdByLastName'],
                    [Sequelize.col('createdByUser.email'), 'createdByEmail'],
                    [Sequelize.col('updatedByUser.firstName'), 'updatedByFirstName'],
                    [Sequelize.col('updatedByUser.lastName'), 'updatedByLastName'],
                    [Sequelize.col('updatedByUser.email'), 'updatedByEmail'],
                    [Sequelize.col('client.name'), 'clientName'],
                    [Sequelize.col('client.phoneNumber'), 'clientContactNumber'],
                    [Sequelize.col('client.email'), 'clientEmail'],
                ],
                include: [
                    {
                        model: models.users,
                        attributes: [],
                        as:"createdByUser"
                    },
                    {
                        model: models.users,
                        attributes: [],
                        as:"updatedByUser"
                    },
                    {
                        model: models.clients,
                        attributes: [],
                    },
                    {
                        model: models.jobCandidateMappings,
                        attributes: ["status","updatedAt"],
                        include:[{
                            model: models.candidate,
                            // attributes: []
                        }]
                    },
                ],
                order: [
                    ['id', 'DESC'],
                ],
            });
            resolve(jobs);
        }
        catch (err) {
            logger.fatal(err);
            reject({ code:401, message: err.message });
        }
    })
}

const getJob = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside get job by id service");
            let job = await models.jobs.findOne({where:{id}});
            resolve(job);
        }
        catch (err) {
            logger.fatal(err);
            reject({ code:401, message: err.message });
        }
    })
}

const addJob = (jobDetails) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside add job service",{jobDetails});
            jobDetails.jobId = await uniqueIdGenerator({dbName:"jobs","keyName":"jobId","middleName":"JOB"});
            var t = await db.sequelize.transaction();
            await models.jobs.create(jobDetails,{ transaction:t });
            await t.commit();
            return resolve("job added successfully...");
        }
        catch (err) {
            logger.fatal(err);
            await t.rollback();
            reject({ code:422, message: err.message });
        }
    })
}

const updateJob = (id,updateJobObj) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside update job service");
            let job = await models.jobs.update(updateJobObj,{where:{id}});
            return resolve(job);
        }
        catch (err) {
            logger.fatal(err);
            reject({ code:401, message: err.message });
        }
    })
}

const associateJob = (associateObj) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside associate job service",associateObj);
            if(await models.jobCandidateMappings.findOne({where:{candidateId:associateObj[0].candidateId,jobId:associateObj[0].jobId},raw:true})){
                return reject({ code:401, message: "already associated with job!!!" });
            }
            await models.jobCandidateMappings.bulkCreate(associateObj);
            return resolve("associated successfully...");
        }
        catch (err) {
            logger.fatal(err);
            reject({ code:401, message: err.message });
        }
    })
}

const updateAssociateJob = (updateAssociateObj) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside update associate job service",updateAssociateObj);
            let job = await models.jobCandidateMappings.update(updateAssociateObj,{where:{jobId:updateAssociateObj.jobId,candidateId:updateAssociateObj.candidateId}});
            return resolve("associate updated successfully...");
        }
        catch (err) {
            logger.fatal(err);
            reject({ code:401, message: err.message });
        }
    })
}
const deleteJob = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside disable job service");
            let job = await models.jobs.destroy({where:{id}});     
            await models.jobCandidateMappings.destroy({where:{jobId:id}});     
            logger.debug(job);     
            return resolve("Job deleted successfully...");
        }
        catch (err) {
            logger.fatal(err);
            reject({ code:401, message: err.message });
        }
    })
}

const getPrefferedCandidate = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside get preffered candidate service");
            let job = await models.jobs.findOne({where:{id},raw:true});
            let skills = job.prefferedSkills?job.prefferedSkills.split(";"):[];
            let condition = await skills.map(skill=>{
                return {
                    skills:job.prefferedSkills?{[Sequelize.Op.substring]: skill}:{}
                }
            })
            logger.debug(condition);
            let candidates = await getCandidates({
                [Op.and]: condition
            });

            logger.debug(job,skills);     
            return resolve(candidates);
        }
        catch (err) {
            logger.fatal(err);
            reject({ code:401, message: err.message });
        }
    })
}

module.exports = {
    getJobs,
    getJob,
    addJob,
    updateJob,
    deleteJob,
    associateJob,
    updateAssociateJob,
    getPrefferedCandidate,
    searchJobs
}