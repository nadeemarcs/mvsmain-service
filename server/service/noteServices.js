const logger = require('../../config/logger');
const models = require('../../models');
const Op = models.Sequelize.Op;
const { sequelize, Sequelize } = require('../../models');
const db = require("../../models/index");
// const { uniqueIdGenerator } = require('../helpers/getUniqueId');

const getNotes = (fetchNotesObj) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside get notes service");
            let as = (fetchNotesObj.noteType === "jobNotes")?"jobNoteCreatedByUser":"candidateNoteCreatedByUser";
            
            let notes = await models[`${fetchNotesObj.noteType}`].findAll({
                where:{entityId:fetchNotesObj.entityId},
                attributes: [
                    "id",
                    "note",
                    "createdBy",
                    "entityId",
                    "createdAt",
                    "updatedAt",
                    [Sequelize.col(as+'.firstName'), 'createdByFirstName'],
                    [Sequelize.col(as+'.lastName'), 'createdByLastName'],
                    [Sequelize.col(as+'.email'), 'createdByEmail'],
                ],
                include: [
                    {
                        model: models.users,
                        attributes: [],
                        as
                    },
                ],
                order: [
                    ['id', 'DESC'],
                ]
            });
            resolve(notes);
        }
        catch (err) {
            logger.fatal(err);
            reject({ code: 401, message: err.message });
        }
    })
}

const getNote = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside get Note by id service");
            let Note = await models.Notes.findOne({ where: { id } });
            resolve(Note);
        }
        catch (err) {
            logger.fatal(err);
            reject({ code: 401, message: err.message });
        }
    })
}

const addNote = (noteDetails) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside add Note service", { noteDetails });
            var t = await db.sequelize.transaction();
            await models[`${noteDetails.noteType}`].create(noteDetails, { transaction: t });
            await t.commit();
            return resolve("Note added successfully...");
        }
        catch (err) {
            logger.fatal(err);
            await t.rollback();
            reject({ code: 422, message: "unable to create notes!!!" });
        }
    })
}

const updateNote = (id, updateNoteObj) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside update Note service");
            let note = await models[`${updateNoteObj.noteType}`].update({note:updateNoteObj.note}, { where: { id } });
            return resolve(note);
        }
        catch (err) {
            logger.fatal(err);
            reject({ code: 401, message: "unable to update notes!!!" });
        }
    })
}

const deleteNote = (id,noteDetails) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside disable note service",noteDetails);
            let note = await models[`${noteDetails.noteType}`].destroy({ where: { id } });
            logger.debug(note);
            return resolve("note deleted successfully...");
        }
        catch (err) {
            logger.fatal(err);
            reject({ code: 401, message: "unable to delete notes!!!" });
        }
    })
}

module.exports = {
    getNotes,
    getNote,
    addNote,
    updateNote,
    deleteNote
}