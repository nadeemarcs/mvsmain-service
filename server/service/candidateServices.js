const logger = require('../../config/logger');
const models = require('../../models');
const Op = models.Sequelize.Op;
const { sequelize, Sequelize } = require('../../models');
const db = require("../../models/index");
const {uniqueIdGenerator} = require('../helpers/getUniqueId');
const {resumeParser,pdfResumeParser,docResumeParser} = require('../helpers/resumeParser');

const getCandidates = (condition = {},page=1,limit=10) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside get Candidates service");
            let candidate = await models.candidate.findAndCountAll({
                where:condition,
                attributes: [
                    "id",
                    "firstName",
                    "lastName",
                    "email",
                    "candidateId",
                    "review",
                    "secondaryEmail",
                    "visaStatus",
                    "city",
                    "state",
                    "street",
                    "country",
                    "phoneNumber",
                    "noticePeriod",
                    "isCounterOffer",
                    "telNumber",
                    "reLocation",
                    "recruiter",
                    "zipCode",
                    "social",
                    "candidateType",
                    "education",
                    "experience",
                    "expectedSalary",
                    "currentSalary",
                    "desiredPay",
                    "hourlyRate",
                    "currentJobTitle",
                    "resume",
                    "source",
                    "skills",
                    "status",
                    "employerOrVendor",
                    "allowEmailNotification",
                    "createdAt",
                    "updatedAt",
                    [Sequelize.col('candidateCreatedBy.firstName'), 'createdByFirstName'],
                    [Sequelize.col('candidateCreatedBy.lastName'), 'createdByLastName'],
                    [Sequelize.col('candidateCreatedBy.email'), 'createdByEmail'],
                    [Sequelize.col('candidateUpdatedBy.firstName'), 'updatedByFirstName'],
                    [Sequelize.col('candidateUpdatedBy.lastName'), 'updatedByLastName'],
                    [Sequelize.col('candidateUpdatedBy.email'), 'updatedByEmail'],
                    [Sequelize.col('candidateOwnedBy.firstName'), 'ownedByFirstName'],
                    [Sequelize.col('candidateOwnedBy.lastName'), 'ownedByLastName'],
                    [Sequelize.col('candidateOwnedBy.email'), 'ownedByEmail'],
                ],
                include: [
                    {
                        model: models.users,
                        attributes: [],
                        as: "candidateCreatedBy"
                    },
                    {
                        model: models.users,
                        attributes: [],
                        as: "candidateUpdatedBy"
                    },
                    {
                        model: models.users,
                        attributes: [],
                        as: "candidateOwnedBy"
                    },
                    {
                        model: models.jobCandidateMappings,
                        attributes: ["status","updatedAt"],
                        include:[{
                            model: models.jobs,
                            attributes: ["id",'jobTitle']
                        }]
                    },

                ],
                order: [
                    ['id', 'DESC'],
                ],
                offset:((page-1)*limit),
                limit,
                subQuery:false
            });
            resolve(candidate);
        }
        catch (err) {
            logger.fatal(err);
            reject({ code: 401, message: err.message });
        }
    })
}

const searchCandidates = (query,OR=true,page=1,limit=10000000) => {
    return new Promise(async (resolve, reject) => {
        logger.debug(typeof OR,OR);
        try {
            logger.trace("inside get Candidates service",{query,page,limit});
            if(query.includes(' and ')){
                query = query.split(" and ");
                query = query.join("|");
                OR=false;
            }
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
                    firstName: Sequelize.literal(`candidate.firstName REGEXP "${query}"`)
                },
                {
                    lastName: Sequelize.literal(`candidate.lastName REGEXP "${query}"`)
                },
                {
                    email: Sequelize.literal(`candidate.email REGEXP "${query}"`)
                },
                {
                    street:  Sequelize.literal(`candidate.street REGEXP "${query}"`)
                },
                {
                    city: Sequelize.literal(`candidate.city REGEXP "${query}"`)
                },
                {
                    state: Sequelize.literal(`candidate.state REGEXP "${query}"`)
                },
                {
                    phoneNumber: Sequelize.literal(`candidate.phoneNumber REGEXP "${query}"`)
                },
                {
                    resumeText: Sequelize.literal(`candidate.resumeText REGEXP "${query}"`)
                },
            ]
            let condition = {
                [Op.or]: searchKeys
            }
            if(OR === "false"){
                let tempQry = "";
                query = query.split("|");
                searchKeys = [];
                await query.forEach(ele=>{
                    searchKeys.push({resumeText:Sequelize.literal(`candidate.resumeText REGEXP "${ele}"`)})
                })
                // searchKeys = [{
                //     resumeText: Sequelize.literal(`candidate.resumeText REGEXP "${tempQry}"`)
                // }]
                condition = {
                    [Op.and]:searchKeys
                };
            }
            let candidate = await models.candidate.findAndCountAll({
                where:condition,
                attributes: [
                    "id",
                    "firstName",
                    "lastName",
                    "email",
                    "candidateId",
                    "review",
                    "secondaryEmail",
                    "visaStatus",
                    "city",
                    "state",
                    "street",
                    "country",
                    "phoneNumber",
                    "telNumber",
                    "isCounterOffer",
                    "reLocation",
                    "recruiter",
                    "zipCode",
                    "social",
                    "candidateType",
                    "noticePeriod",
                    "education",
                    "experience",
                    "expectedSalary",
                    "currentSalary",
                    "desiredPay",
                    "hourlyRate",
                    "currentJobTitle",
                    "resume",
                    "source",
                    "skills",
                    "status",
                    "employerOrVendor",
                    "allowEmailNotification",
                    "createdAt",
                    "updatedAt",
                    [Sequelize.col('candidateCreatedBy.firstName'), 'createdByFirstName'],
                    [Sequelize.col('candidateCreatedBy.lastName'), 'createdByLastName'],
                    [Sequelize.col('candidateCreatedBy.email'), 'createdByEmail'],
                    [Sequelize.col('candidateUpdatedBy.firstName'), 'updatedByFirstName'],
                    [Sequelize.col('candidateUpdatedBy.lastName'), 'updatedByLastName'],
                    [Sequelize.col('candidateUpdatedBy.email'), 'updatedByEmail'],
                    [Sequelize.col('candidateOwnedBy.firstName'), 'ownedByFirstName'],
                    [Sequelize.col('candidateOwnedBy.lastName'), 'ownedByLastName'],
                    [Sequelize.col('candidateOwnedBy.email'), 'ownedByEmail'],
                ],
                include: [
                    {
                        model: models.users,
                        attributes: [],
                        as: "candidateCreatedBy"
                    },
                    {
                        model: models.users,
                        attributes: [],
                        as: "candidateUpdatedBy"
                    },
                    {
                        model: models.users,
                        attributes: [],
                        as: "candidateOwnedBy"
                    },
                    {
                        model: models.jobCandidateMappings,
                        attributes: ["status","updatedAt"],
                        include:[{
                            model: models.jobs,
                            attributes: ["id",'jobTitle']
                        }]
                    },

                ],
                order: [
                    ['id', 'DESC'],
                ],
                offset:((page-1)*limit),
                limit,
                subQuery:false
            });
            resolve(candidate);
        }
        catch (err) {
            logger.fatal(err);
            reject({ code: 401, message: err.message });
        }
    })
}

const searchCandidatesWithFilter = (filters,page=1,limit=10000000) => {
    return new Promise(async (resolve, reject) => {
        // logger.debug(typeof OR,OR);
        try {
            logger.trace("inside get Candidates service",{filters,page,limit});
            searchKeys = [];
            for(let filter in filters){
                let obj = {};
                obj[filter] = Sequelize.literal(`candidate.${filter} REGEXP "${filters[filter]}"`);
                searchKeys.push(obj);
            }
            let condition = {
                [Op.and]: searchKeys
            }
            
            let candidate = await models.candidate.findAndCountAll({
                where:condition,
                attributes: [
                    "id",
                    "firstName",
                    "lastName",
                    "email",
                    "candidateId",
                    "review",
                    "secondaryEmail",
                    "visaStatus",
                    "city",
                    "state",
                    "street",
                    "country",
                    "phoneNumber",
                    "telNumber",
                    "isCounterOffer",
                    "reLocation",
                    "recruiter",
                    "zipCode",
                    "social",
                    "candidateType",
                    "noticePeriod",
                    "education",
                    "experience",
                    "expectedSalary",
                    "currentSalary",
                    "desiredPay",
                    "hourlyRate",
                    "currentJobTitle",
                    "resume",
                    "source",
                    "skills",
                    "status",
                    "employerOrVendor",
                    "allowEmailNotification",
                    "createdAt",
                    "updatedAt",
                    [Sequelize.col('candidateCreatedBy.firstName'), 'createdByFirstName'],
                    [Sequelize.col('candidateCreatedBy.lastName'), 'createdByLastName'],
                    [Sequelize.col('candidateCreatedBy.email'), 'createdByEmail'],
                    [Sequelize.col('candidateUpdatedBy.firstName'), 'updatedByFirstName'],
                    [Sequelize.col('candidateUpdatedBy.lastName'), 'updatedByLastName'],
                    [Sequelize.col('candidateUpdatedBy.email'), 'updatedByEmail'],
                    [Sequelize.col('candidateOwnedBy.firstName'), 'ownedByFirstName'],
                    [Sequelize.col('candidateOwnedBy.lastName'), 'ownedByLastName'],
                    [Sequelize.col('candidateOwnedBy.email'), 'ownedByEmail'],
                ],
                include: [
                    {
                        model: models.users,
                        attributes: [],
                        as: "candidateCreatedBy"
                    },
                    {
                        model: models.users,
                        attributes: [],
                        as: "candidateUpdatedBy"
                    },
                    {
                        model: models.users,
                        attributes: [],
                        as: "candidateOwnedBy"
                    },
                    {
                        model: models.jobCandidateMappings,
                        attributes: ["status","updatedAt"],
                        include:[{
                            model: models.jobs,
                            attributes: ["id",'jobTitle']
                        }]
                    },

                ],
                order: [
                    ['id', 'DESC'],
                ],
                offset:((page-1)*limit),
                limit,
                subQuery:false
            });
            resolve(candidate);
        }
        catch (err) {
            logger.fatal(err);
            reject({ code: 401, message: err.message });
        }
    })
}
const getCandidate = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside get Candidate by id service",id);
            let candidate = await models.candidate.findAll({
                attributes: [
                    "id",
                    "firstName",
                    "lastName",
                    "email",
                    "candidateId",
                    "review",
                    "secondaryEmail",
                    "visaStatus",
                    "city",
                    "state",
                    "street",
                    "country",
                    "phoneNumber",
                    "telNumber",
                    "reLocation",
                    "recruiter",
                    "zipCode",
                    "social",
                    "candidateType",
                    "education",
                    "experience",
                    "expectedSalary",
                    "isCounterOffer",
                    "currentSalary",
                    "desiredPay",
                    "hourlyRate",
                    "currentJobTitle",
                    "resume",
                    "source",
                    "skills",
                    "status",
                    "employerOrVendor",
                    "allowEmailNotification",
                    "createdAt",
                    "updatedAt",
                    [Sequelize.col('candidateCreatedBy.firstName'), 'createdByFirstName'],
                    [Sequelize.col('candidateCreatedBy.lastName'), 'createdByLastName'],
                    [Sequelize.col('candidateCreatedBy.email'), 'createdByEmail'],
                    [Sequelize.col('candidateUpdatedBy.firstName'), 'updatedByFirstName'],
                    [Sequelize.col('candidateUpdatedBy.lastName'), 'updatedByLastName'],
                    [Sequelize.col('candidateUpdatedBy.email'), 'updatedByEmail'],
                    [Sequelize.col('candidateOwnedBy.firstName'), 'ownedByFirstName'],
                    [Sequelize.col('candidateOwnedBy.lastName'), 'ownedByLastName'],
                    [Sequelize.col('candidateOwnedBy.email'), 'ownedByEmail'],
                ],
                where: { id:{[Sequelize.Op.in]: id} },
                include: [
                    {
                        model: models.users,
                        attributes: [],
                        as: "candidateCreatedBy"
                    },
                    {
                        model: models.users,
                        attributes: [],
                        as: "candidateUpdatedBy"
                    },
                    {
                        model: models.users,
                        attributes: [],
                        as: "candidateOwnedBy"
                    },
                    {
                        model: models.jobCandidateMappings,
                        attributes: ["status","updatedAt"],
                        include:[{
                            model: models.jobs,
                            attributes: ["id",'jobTitle']
                        }]
                    },

                ],
                order: [
                    ['id', 'DESC'],
                ]
            });
            resolve(candidate);
        }
        catch (err) {
            logger.fatal(err);
            reject({ code: 401, message: err.message });
        }
    })
}

const addCandidate = (details, userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside add candidate service", { details });
            details.candidateId = await uniqueIdGenerator({dbName:"candidate","keyName":"candidateId","middleName":"CANDIDATE"});
            logger.debug(details.candidateId);
            var t = await db.sequelize.transaction();
            if(details.resume && !details.resumeText){
                let resumeText = "";
                let doc = true;
                let name = details.resume.split(".");
                doc = (["docx","doc"].includes(name[name.length - 1]));
                if(doc){
                    resumeText = await docResumeParser(details.resume);
                }
                else{
                    resumeText = await pdfResumeParser(details.resume);
                }
                details.resumeText = resumeText; 
            }
            await models.candidate.create(details, { transaction: t });
            await t.commit();
            return resolve("Candidate added successfully...");
        }
        catch (err) {
            logger.fatal(err);
            await t.rollback();
            reject({ code: 422, message: err.message });
        }
    })
}

const updateCandidate = (id, updateObj) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside update Candidate service");
            if(updateObj.resume && !updateObj.resumeText){
                let resumeText = "";
                let doc = true;
                let name = updateObj.resume.split(".");
                doc = (["docx","doc"].includes(name[name.length - 1]));
                if(doc){
                    resumeText = await docResumeParser(updateObj.resume);
                }
                else{
                    resumeText = await pdfResumeParser(updateObj.resume);
                }
                updateObj.resumeText = resumeText; 
            }
            let candidate = await models.candidate.update(updateObj, { where: { id } });
            return resolve(candidate);
        }
        catch (err) {
            logger.fatal(err);
            reject({ code: 401, message: err.message });
        }
    })
}

const deleteCandidate = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside disable candidate service");
            let candidate = await models.candidate.destroy({ where: { id } });
            await models.jobCandidateMappings.destroy({ where: { candidateId:id } });
            logger.debug(candidate);
            return resolve("candidate deleted successfully...");
        }
        catch (err) {
            logger.fatal(err);
            reject({ code: 401, message: err.message });
        }
    })
}

const parseCandidate = (files,userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside parse candidate service",files);
            let candidates = [];
            let resumeText="";
            let finalCandidates = [];
            for await(file of files){
                let candidate = await resumeParser(file.path);
                let doc = true;
                let name = file.originalname.split(".");
                doc = (["docx","doc"].includes(name[name.length - 1]));
                if(doc){
                    resumeText = await docResumeParser(file.path);
                    logger.debug({resumeText});
                    resumeText = resumeText;
                }
                else{
                    resumeText = await pdfResumeParser(file.path);
                }
                candidates.push(candidate);
            }
            // return resolve(candidates);
            for await (let candidate of candidates){
                logger.debug(candidate);
                candidate = candidate.parts;
                let firstName = "undefined";
                let lastName = "undefined";
                if(candidate.name){
                    let temp = candidate.name.split(" ");
                    firstName = temp[0] || "undefined";
                    lastName = temp[1] ||"undefined";
                }
                finalCandidates.push({
                    firstName:firstName,
                    lastName:lastName,
                    email:candidate.email||"undefined",
                    phoneNumber:candidate.phone||"undefined",
                    createdBy:userId,
                    owner:userId,
                    resume:candidate.filePath,
                    resumeText
                })

                await addCandidate({
                    firstName:firstName,
                    lastName:lastName,
                    email:candidate.email||"undefined",
                    phoneNumber:candidate.phone||"undefined",
                    createdBy:userId,
                    owner:userId,
                    resume:candidate.filePath,
                    resumeText
                },userId);
            }
            return resolve(finalCandidates);
        }
        catch (err) {
            logger.fatal(err);
            reject({ code: 401, message: err.message });
        }
    });
}

module.exports = {
    getCandidates,
    getCandidate,
    addCandidate,
    updateCandidate,
    deleteCandidate,
    parseCandidate,
    searchCandidates,
    searchCandidatesWithFilter
}