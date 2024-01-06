const logger = require('../../config/logger');
const NoteService = require('../service/noteServices');

const getNotes = (req,res,next)=>{
    logger.trace("inside get Notes controller");
    let fetchNotesObj = req.query;
    NoteService.getNotes(fetchNotesObj).then(data=>{
        res.status(200).json({"success":true, "data":data});
    }).catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
    });
}

const getNote = (req,res,next)=>{
    logger.trace("inside get Note controller");
    let id = parseInt(req.params.id);
    NoteService.getNote(id).then(data=>{
        res.status(200).json({"success":true, "data":data});
    }).catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
    });
}

const addNote = (req,res,next)=>{
    let noteDetails = req.body;
    noteDetails.userId = req.payLoad.id;
    logger.trace("inside add Note controller",noteDetails);
    NoteService.addNote(noteDetails).then(data=>{
        res.status(200).json({"success":true, "data":data});
    }).catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
    });
}

const updateNote = (req,res,next)=>{
    let noteDetailsObj = req.body;
    let id = parseInt(req.params.id);
    logger.trace("inside update Note controller",id,noteDetailsObj);
    NoteService.updateNote(id,noteDetailsObj).then(data=>{
        res.status(200).json({"success":true, "data":data});
    }).catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
    });
}

const deleteNote = (req,res,next)=>{
    let id = parseInt(req.params.id);
    let noteDetails = req.query;
    logger.trace("inside delete Note controller",id);
    NoteService.deleteNote(id,noteDetails).then(data=>{
        res.status(200).json({"success":true, "data":data});
    }).catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
    });
}

module.exports = {
    getNotes,
    getNote,
    addNote,
    updateNote,
    deleteNote
}