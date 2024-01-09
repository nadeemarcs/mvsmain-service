import {
    GETJOBS_SUCCESS,
    GETJOBS_FAIL,
    SET_MESSAGE,
    ADDJOB_SUCCESS,
    ADDJOB_FAIL,
    UPDATEJOB_SUCCESS,
    UPDATEJOB_FAIL,
    JOB_SELECTED_ROW,
    DELETEJOB_FAIL,
    DELETEJOB_SUCCESS,
    ASSOCIATECANDIDATE_SUCCESS,
    ASSOCIATECANDIDATE_FAIL,
    DESELECT_JOBS_GRID,
    UPDATECANDIDATESTATUS_SUCCESS,
    UPDATECANDIDATESTATUS_FAIL,
    GETPREFFEREDCANDIDATE_SUCCESS,
    GETPREFFEREDCANDIDATE_FAIL
} from "./types";
import { toast } from 'react-toastify';
import jobService from "../services/job.service";


export const getJobs = () => (dispatch) => {
    return jobService.getJobs().then(
        (data) => {
            if (data.success) {
                dispatch({
                    type: GETJOBS_SUCCESS,
                    payload: { jobs: data.data },
                });
                
                return Promise.resolve();
            } else {
                dispatch({
                    type: GETJOBS_FAIL,
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
                type: GETJOBS_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const addJob = (payload) => (dispatch) => {
    return jobService.addJob(payload).then(
        (data) => {
            if (data.success) {
                dispatch({
                    type: ADDJOB_SUCCESS,
                    payload: { addJobStatus: data.success },
                });
                dispatch({
                    type: SET_MESSAGE,
                    payload: data.message,
                });
                return Promise.resolve();
            } else {
                dispatch({
                    type: ADDJOB_FAIL,
                    payload: { addJobStatus: false },
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
                type: ADDJOB_FAIL,
                payload: { addJobStatus: false },
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const updateJob = (id, payload) => (dispatch) => {
    return jobService.updateJob(id, payload).then(
        (data) => {
            if (data.success) {
                dispatch({
                    type: UPDATEJOB_SUCCESS,
                    payload: { updateJobStatus: data.success },
                });
                toast.success("Job updated successfully")
                dispatch({
                    type: SET_MESSAGE,
                    payload: data.message,
                });
                return Promise.resolve();
            } else {
                dispatch({
                    type: UPDATEJOB_FAIL,
                    payload: { updateJobStatus: false },
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
                type: UPDATEJOB_FAIL,
                payload: { updateJobStatus: false },
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const deleteJob = (id) => (dispatch) => {
    return jobService.deleteJob(id).then(
        (data) => {
            if (data.success) {
                dispatch({
                    type: DELETEJOB_SUCCESS,
                    payload: { deleteJobStatus: data.success },
                });
                dispatch({
                    type: SET_MESSAGE,
                    payload: data.message,
                });
                return Promise.resolve();
            } else {
                dispatch({
                    type: DELETEJOB_FAIL,
                    payload: { deleteJobStatus: false },
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
                type: DELETEJOB_FAIL,
                payload: { deleteJobStatus: false },
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const associateCandidate = (payload) => (dispatch) => {
    return jobService.associateCandidate(payload).then(
        (data) => {
            if (data.success) {
                dispatch({
                    type: ASSOCIATECANDIDATE_SUCCESS,
                    payload: { associateCandidateStatus: data.success },
                });
                toast.success("Candidate(s) associated successfully!")
                dispatch({
                    type: SET_MESSAGE,
                    payload: data.message,
                });
                return Promise.resolve();
            } else {
                dispatch({
                    type: ASSOCIATECANDIDATE_FAIL,
                    payload: { associateCandidateStatus: false },
                });
                toast.error("Candidate already associated with job!");
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
                type: ASSOCIATECANDIDATE_FAIL,
                payload: { associateCandidateStatus: false },
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const updateCandidateStatus = (payload) => (dispatch) => {
    return jobService.updateCandidateStatus(payload).then(
        (data) => {
            if (data.success) {
                dispatch({
                    type: UPDATECANDIDATESTATUS_SUCCESS,
                    payload: { updateCandidateStatus: data.success },
                });
                toast.success("Status updated successfully!")
                dispatch({
                    type: SET_MESSAGE,
                    payload: data.message,
                });
                return Promise.resolve();
            } else {
                dispatch({
                    type: UPDATECANDIDATESTATUS_FAIL,
                    payload: { updateCandidateStatus: false },
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
                type: UPDATECANDIDATESTATUS_FAIL,
                payload: { updateCandidateStatus: false },
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const rowSelected = (payload) => (dispatch) => {
    dispatch({
        type: JOB_SELECTED_ROW,
        payload: { jobSelectedRow: payload },
    });
}

export const deSelectJobsGrid = (payload) => (dispatch) => {
    dispatch({
        type: DESELECT_JOBS_GRID,
        payload: { deSelectJobsGrid: payload },
    });
}

export const getPrefferedCandidate = (id) => (dispatch) => {
    return jobService.getPrefferedCandidate(id).then(
        (data) => {
            if (data.success) {
                dispatch({
                    type: GETPREFFEREDCANDIDATE_SUCCESS,
                    payload: { candidates: data.data },
                });
                
                return Promise.resolve();
            } else {
                dispatch({
                    type: GETPREFFEREDCANDIDATE_FAIL,
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
                type: GETPREFFEREDCANDIDATE_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};
