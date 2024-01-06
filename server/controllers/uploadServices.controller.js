const logger = require('../../config/logger');

const uploads = (req,res,next)=>{
    logger.trace("inside upload file controller");
    logger.debug(req.file);
    res.status(200).json({"success":true, "data":{fileLink:req.file.path}});
}

const downloads = (req,res,next)=>{
    logger.trace("inside download file controller");
    // res.status(200).json({"success":true, "data":{fileLink:req.file.path}});
    res.download(req.query.fileLink);
}

module.exports = {
    uploads,
    downloads
}