const logger = require('../../config/logger');
const models = require('../../models');
const Op = models.Sequelize.Op;
const { sequelize, Sequelize } = require('../../models');
const db = require("../../models/index");
// const { uniqueIdGenerator } = require('../helpers/getUniqueId');

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
                ],
                include: [
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
                distinct: true,
                nest:true,
            });
            resolve(jobs);
        }
        catch (err) {
            logger.fatal(err);
            reject({ code:401, message: err.message });
        }
    })
}

const getReports = (condition) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside get report by condition service",condition);
            let tmp = {
                [Op.and]:[{createdAt:{[Op.gte]:condition.startDate}},{createdAt:{[Op.lte]:condition.endDate}}]
            };
            if(condition.createdBy){
                tmp.createdBy=condition.createdBy
            }
            condition = tmp;
            let reports = await getJobs(condition);
            let resp = [];
            for await (let job of reports){
                job = JSON.parse(JSON.stringify(job))
                job.reports = {};
                job.reports.totalCandidate = job.jobCandidateMappings.length;
                if(job.reports.totalCandidate){
                    job.jobCandidateMappings.forEach(ele=>{
                        if(job.reports.hasOwnProperty(ele.status)){
                            job.reports[ele.status] +=1;
                        }
                        else{
                            job.reports[ele.status] =1;
                        }
                    })
                }
                resp.push(job);
            }

            resolve(resp);
        }
        catch (err) {
            logger.fatal(err);
            reject({ code: 401, message: err.message });
        }
    })
}


module.exports = {
    getReports
}