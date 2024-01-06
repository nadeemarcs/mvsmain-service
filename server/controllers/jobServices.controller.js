const logger = require('../../config/logger');
const jobService = require('../service/jobServices');
const logPlugin = require('../../mongo/models');
const {getUserProfile} = require('../service/userServices');

const getJobs = (req,res,next)=>{
    logger.trace("inside get jobs controller");
    if(req.query.query){
        jobService.searchJobs(req.query.query.trim()).then(data=>{
            return res.status(200).json({"success":true, "data":data});
        }).catch(err=>{
            logger.fatal(err);
            return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
        });
    }
    jobService.getJobs().then(data=>{
        res.status(200).json({"success":true, "data":data});
    }).catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
    });
}

const getJob = (req,res,next)=>{
    logger.trace("inside get job controller");
    let id = parseInt(req.params.id);
    jobService.getJob(id).then(data=>{
        res.status(200).json({"success":true, "data":data});
    }).catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
    });
}

const addJob = (req,res,next)=>{
    let jobDetails = req.body;
    let createdBy = req.body.createdBy?parseInt(req.body.createdBy):req.payLoad.id;
    logger.trace("inside add job controller",jobDetails);
    jobDetails.createdBy = createdBy;
    jobService.addJob(jobDetails).then(async data=>{
        res.status(200).json({"success":true, "data":data});
        let userDetails = await getUserProfile({id:req.payLoad.id});
        logPlugin.notification.create({message:`A new job (${jobDetails.jobTitle}) has been created by (${userDetails[0].firstName+" "+userDetails[0].lastName}).`});
        logPlugin.activity.create({message:`A new job (${jobDetails.jobTitle}) has been created by (${userDetails[0].firstName+" "+userDetails[0].lastName}).`});
    }).catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
    });
}

const updateJob = (req,res,next)=>{
    let jobDetailsObj = req.body;
    let id = parseInt(req.params.id);
    let updatedBy = req.payLoad.id;
    jobDetailsObj.updatedBy = updatedBy;
    logger.trace("inside update job controller",{id,jobDetailsObj,updatedBy});
    jobService.updateJob(id,jobDetailsObj).then(data=>{
        res.status(200).json({"success":true, "data":data});
    }).catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
    });
}

const associateJob = (req,res,next)=>{
    let associateObj = req.body;
    logger.trace("inside associate job controller",{associateObj});
    // let tmp = [];
    // for(let jobId of associateObj.jobIds){
    //     for(let candidateId of associateObj.candidateIds){
    //         tmp.push({candidateId,jobId,status:associateObj.status||"associated"});
    //     }
    // }
    associateObj = [{candidateId:associateObj.candidateIds[0],jobId:associateObj.jobIds[0],status:associateObj.status}];
    jobService.associateJob(associateObj).then(data=>{
        res.status(200).json({"success":true, "data":data});
    }).catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
    });
}

const updateAssociateJob = (req,res,next)=>{
    let associateObj = req.body;
    logger.trace("inside associate job controller",{associateObj});
    jobService.updateAssociateJob(associateObj).then(data=>{
        res.status(200).json({"success":true, "data":data});
    }).catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
    });
}

const deleteJob = (req,res,next)=>{
    let id = parseInt(req.params.id);
    logger.trace("inside delete job controller",id);
    jobService.deleteJob(id).then(data=>{
        res.status(200).json({"success":true, "data":data});
    }).catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
    });
}

const getPrefferedCandidate = (req,res,next)=>{
    logger.trace("inside get preffered candidate controller");
    let jobId = req.params.id;
    jobService.getPrefferedCandidate(jobId).then(data=>{
        res.status(200).json({"success":true, "data":data});
    }).catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
    });
}

module.exports = {
    getJobs,
    getJob,
    addJob,
    updateJob,
    associateJob,
    deleteJob,
    updateAssociateJob,
    getPrefferedCandidate
}