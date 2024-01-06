const logger = require('../../config/logger');
const vendorService = require('../service/vendorServices');
const logPlugin = require('../../mongo/models');
const {getUserProfile} = require('../service/userServices');

const getVendors = (req,res,next)=>{
    logger.trace("inside get vendors controller");
    if(req.query.query){
        vendorService.searchVendors(req.query.query.trim()).then(data=>{
            return res.status(200).json({"success":true, "data":data});
        }).catch(err=>{
            logger.fatal(err);
            return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
        });
    }
    vendorService.getVendors().then(data=>{
        res.status(200).json({"success":true, "data":data});
    }).catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
    });
}

const getVendor = (req,res,next)=>{
    logger.trace("inside get vendor controller");
    let id = parseInt(req.params.id);
    vendorService.getVendor(id).then(data=>{
        res.status(200).json({"success":true, "data":data});
    }).catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
    });
}

const addVendor = (req,res,next)=>{
    let vendorDetails = req.body;
    let userId = req.payLoad.id;
    let createdBy = req.body.createdBy?parseInt(req.body.createdBy):req.payLoad.id;
    vendorDetails.createdBy = createdBy;
    logger.trace("inside add vendor controller",vendorDetails);
    vendorService.addVendor(vendorDetails,userId).then(async data=>{
        res.status(200).json({"success":true, "data":data});
        let userDetails = await getUserProfile({id:req.payLoad.id});
        logPlugin.notification.create({ message: `A new vendor (${vendorDetails.name}) has been created by (${userDetails[0].firstName+" "+userDetails[0].lastName}).` });
        logPlugin.activity.create({ message: `A new vendor (${vendorDetails.name}) has been created by (${userDetails[0].firstName+" "+userDetails[0].lastName}).` });
    }).catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
    });
}

const updateVendor = (req,res,next)=>{
    let detailsObj = req.body;
    let id = parseInt(req.params.id);
    let updatedBy = req.payLoad.id;
    detailsObj.updatedBy = updatedBy;
    logger.trace("inside update vendor controller",id,detailsObj);
    vendorService.updateVendor(id,detailsObj).then(data=>{
        res.status(200).json({"success":true, "data":data});
    }).catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
    });
}

const deleteVendor = (req,res,next)=>{
    let id = parseInt(req.params.id);
    logger.trace("inside delete vendor controller",id);
    vendorService.deleteVendor(id).then(data=>{
        res.status(200).json({"success":true, "data":data});
    }).catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
    });
}

module.exports = {
    getVendors,
    getVendor,
    addVendor,
    updateVendor,
    deleteVendor
}