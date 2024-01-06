const logger = require('../../config/logger');
const candidateService = require('../service/candidateServices');
const {getUserProfile} = require('../service/userServices');
const logPlugin = require('../../mongo/models');

const getCandidates = (req,res,next)=>{
    logger.trace("inside get candidates controller");
    if(req.query.query){
        candidateService.searchCandidates(req.query.query.trim(),(req.query.or||"false"),parseInt(req.query.page),parseInt(req.query.limit)).then(data=>{
            res.status(200).json({"success":true, "data":data});
        }).catch(err=>{
            logger.fatal(err);
            return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
        });
    }
    else if(req.query.filter){
        candidateService.searchCandidatesWithFilter(req.query.filter,(req.query.or||"false"),parseInt(req.query.page),parseInt(req.query.limit)).then(data=>{
            res.status(200).json({"success":true, "data":data});
        }).catch(err=>{
            logger.fatal(err);
            return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
        });
    }
    else{
        candidateService.getCandidates({},parseInt(req.query.page),parseInt(req.query.limit)).then(data=>{
            res.status(200).json({"success":true, "data":data});
        }).catch(err=>{
            logger.fatal(err);
            return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
        });
    }
}

const getCandidateByFilter = (req,res,next)=>{
    logger.trace("inside get candidates controller by filter");
    candidateService.searchCandidatesWithFilter(req.body,parseInt(req.query.page),parseInt(req.query.limit)).then(data=>{
        res.status(200).json({"success":true, "data":data});
    }).catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
    });
}

const getCandidate = (req,res,next)=>{
    logger.trace("inside get candidate controller",req.query);
    let id = req.query.ids.split(",");
    candidateService.getCandidate(id).then(data=>{
        res.status(200).json({"success":true, "data":data});
    }).catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
    });
}

const addCandidate = (req,res,next)=>{
    let candidateDetails = req.body;
    let userId = req.payLoad.id;
    let createdBy = req.body.createdBy?parseInt(req.body.createdBy):req.payLoad.id;
    candidateDetails.createdBy = createdBy;
    logger.trace("inside add candidate controller",candidateDetails);
    candidateService.addCandidate(candidateDetails,userId).then(async data=>{
        res.status(200).json({"success":true, "data":data});
        let userDetails = await getUserProfile({id:req.payLoad.id});
        logPlugin.notification.create({ message: `A new candidate (${candidateDetails.firstName+" "+candidateDetails.lastName}) has been created by (${userDetails[0].firstName+" "+userDetails[0].lastName}).` });
        logPlugin.activity.create({ message: `A new candidate (${candidateDetails.firstName+" "+candidateDetails.lastName}) has been created by (${userDetails[0].firstName+" "+userDetails[0].lastName}).` });
    }).catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
    });
}

const updateCandidate = (req,res,next)=>{
    let detailsObj = req.body;
    let id = parseInt(req.params.id);
    let updatedBy = req.payLoad.id;
    detailsObj.updatedBy = updatedBy;
    logger.trace("inside update candidate controller",id,detailsObj);
    candidateService.updateCandidate(id,detailsObj).then(data=>{
        res.status(200).json({"success":true, "data":data});
    }).catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
    });
}

const deleteCandidate = (req,res,next)=>{
    let id = parseInt(req.params.id);
    logger.trace("inside delete candidate controller",id);
    candidateService.deleteCandidate(id).then(data=>{
        res.status(200).json({"success":true, "data":data});
    }).catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
    });
}

const parseCandidate = (req,res,next)=>{
    logger.trace("inside parse candidate controller");
    candidateService.parseCandidate(req.files,req.payLoad.id).then(data=>{
        res.status(200).json({"success":true, "data":data});
    }).catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
    });
}

module.exports = {
    getCandidates,
    getCandidate,
    addCandidate,
    updateCandidate,
    deleteCandidate,
    parseCandidate,
    getCandidateByFilter
}