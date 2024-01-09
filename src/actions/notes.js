import {
    GETCANDIDATENOTES_SUCCESS,
    GETCANDIDATENOTES_FAIL,
    ADDCANDIDATENOTES_SUCCESS,
    ADDCANDIDATENOTES_FAIL,
    UPDATECANDIDATENOTES_SUCCESS,
    UPDATECANDIDATENOTES_FAIL,
    DELETECANDIDATENOTES_SUCCESS,
    DELETECANDIDATENOTES_FAIL,
    GETJOBNOTES_SUCCESS,
    GETJOBNOTES_FAIL,
    ADDJOBNOTES_SUCCESS,
    ADDJOBNOTES_FAIL,
    UPDATEJOBNOTES_SUCCESS,
    UPDATEJOBNOTES_FAIL,
    DELETEJOBNOTES_SUCCESS,
    DELETEJOBNOTES_FAIL,
    SET_MESSAGE,
} from "./types";
import notesService from "../services/notes.service";


export const getCandidateNotes= (id) => (dispatch) => {
    return notesService.getCandidateNotes(id).then(
        (data) => {
            if (data.success) {
                dispatch({
                    type: GETCANDIDATENOTES_SUCCESS,
                    payload: { notes: data.data },
                });
                
                return Promise.resolve();
            } else {
                dispatch({
                    type: GETCANDIDATENOTES_FAIL,
                });
    
                dispatch({
                    type: SET_MESSAGE,
                    payload: data.message,
                });
    
                return Promise.reject();
            }

        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type:GETCANDIDATENOTES_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const addCandidateNotes = (payload) => (dispatch) => {
    return notesService.addCandidateNotes(payload).then(
        (data) => {
            if (data.success) {
                dispatch({
                    type:ADDCANDIDATENOTES_SUCCESS,
                    payload: { addCandidateNotesStatus: data.success },
                });
                dispatch({
                    type: SET_MESSAGE,
                    payload: data.message,
                });
                return Promise.resolve();
            } else {
                dispatch({
                    type: ADDCANDIDATENOTES_FAIL,
                    payload: { addCandidateNotesStatus: false },
                });

                dispatch({
                    type: SET_MESSAGE,
                    payload: data.message,
                });

                return Promise.reject();
            }

        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: ADDCANDIDATENOTES_FAIL,
                payload: { addCandidateNotesStatus: false },
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const updateCandidateNotes = (id, payload) => (dispatch) => {
    return notesService.updateCandidateNotes(id, payload).then(
        (data) => {
            if (data.success) {
                dispatch({
                    type: UPDATECANDIDATENOTES_SUCCESS,
                    payload: { updateCandidateNotes: data.success },
                });
                dispatch({
                    type: SET_MESSAGE,
                    payload: data.message,
                });
                return Promise.resolve();
            } else {
                dispatch({
                    type: UPDATECANDIDATENOTES_FAIL,
                    payload: { updateCandidateNotes: false },
                });

                dispatch({
                    type: SET_MESSAGE,
                    payload: data.message,
                });

                return Promise.reject();
            }

        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: UPDATECANDIDATENOTES_FAIL,
                payload: { updateCandidateNotes: false },
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const deleteCandidateNotes = (id) => (dispatch) => {
    return notesService.deleteCandidateNotes(id).then(
        (data) => {
            if (data.success) {
                dispatch({
                    type: DELETECANDIDATENOTES_SUCCESS,
                    payload: { deleteCandidateNotes: data.success },
                });
                dispatch({
                    type: SET_MESSAGE,
                    payload: data.message,
                });
                return Promise.resolve();
            } else {
                dispatch({
                    type: DELETECANDIDATENOTES_FAIL,
                    payload: { deleteCandidateNotesStatus: false },
                });

                dispatch({
                    type: SET_MESSAGE,
                    payload: data.message,
                });

                return Promise.reject();
            }

        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type:  DELETECANDIDATENOTES_FAIL,
                payload: { deleteCandidateNotesStatus: false },
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const getJobNotes= (id) => (dispatch) => {
    return notesService.getJobNotes(id).then(
        (data) => {
            if (data.success) {
                dispatch({
                    type: GETJOBNOTES_SUCCESS,
                    payload: { notes: data.data },
                });
                
                return Promise.resolve();
            } else {
                dispatch({
                    type: GETJOBNOTES_FAIL,
                });
    
                dispatch({
                    type: SET_MESSAGE,
                    payload: data.message,
                });
    
                return Promise.reject();
            }

        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type:GETJOBNOTES_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const addJobNotes = (payload) => (dispatch) => {
    return notesService.addJobNotes(payload).then(
        (data) => {
            if (data.success) {
                dispatch({
                    type:ADDJOBNOTES_SUCCESS,
                    payload: { addJobNotesStatus: data.success },
                });
                dispatch({
                    type: SET_MESSAGE,
                    payload: data.message,
                });
                return Promise.resolve();
            } else {
                dispatch({
                    type: ADDJOBNOTES_FAIL,
                    payload: { addJobNotesStatus: false },
                });

                dispatch({
                    type: SET_MESSAGE,
                    payload: data.message,
                });

                return Promise.reject();
            }

        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: ADDJOBNOTES_FAIL,
                payload: { addJobNotesStatus: false },
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const updateJobNotes = (id, payload) => (dispatch) => {
    return notesService.updateJobNotes(id, payload).then(
        (data) => {
            if (data.success) {
                dispatch({
                    type: UPDATEJOBNOTES_SUCCESS,
                    payload: { updateJobNotes: data.success },
                });
                dispatch({
                    type: SET_MESSAGE,
                    payload: data.message,
                });
                return Promise.resolve();
            } else {
                dispatch({
                    type: UPDATEJOBNOTES_FAIL,
                    payload: { updateJobNotes: false },
                });

                dispatch({
                    type: SET_MESSAGE,
                    payload: data.message,
                });

                return Promise.reject();
            }

        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: UPDATEJOBNOTES_FAIL,
                payload: { updateJobNotes: false },
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const deleteJobNotes = (id) => (dispatch) => {
    return notesService.deleteJobNotes(id).then(
        (data) => {
            if (data.success) {
                dispatch({
                    type: DELETEJOBNOTES_SUCCESS,
                    payload: { deleteJobNotes: data.success },
                });
                dispatch({
                    type: SET_MESSAGE,
                    payload: data.message,
                });
                return Promise.resolve();
            } else {
                dispatch({
                    type: DELETEJOBNOTES_FAIL,
                    payload: {deleteJobNotesStatus: false },
                });

                dispatch({
                    type: SET_MESSAGE,
                    payload: data.message,
                });

                return Promise.reject();
            }

        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type:  DELETEJOBNOTES_FAIL,
                payload: { deleteJobNotesStatus: false },
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};





