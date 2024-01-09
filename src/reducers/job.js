import {
    GETJOBS_SUCCESS,
    GETJOBS_FAIL,
    ADDJOB_SUCCESS,
    ADDJOB_FAIL,
    UPDATEJOB_SUCCESS,
    UPDATEJOB_FAIL,
    JOB_SELECTED_ROW,
    DELETEJOB_SUCCESS,
    DELETEJOB_FAIL,
    ASSOCIATECANDIDATE_SUCCESS,
    ASSOCIATECANDIDATE_FAIL,
    DESELECT_JOBS_GRID,
    UPDATECANDIDATESTATUS_SUCCESS,
    UPDATECANDIDATESTATUS_FAIL
  } from "../actions/types";
  
  const initialState = {
      jobs: [],
      jobSelectedRow: [],
      addJobStatus: false,
      updateJobStatus: false,
      deleteJobStatus: false,
      associateCandidateStatus: false,
      updateCandidateStatus: false,
      deSelectJobsGrid: []
  };
  
  export default function job(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GETJOBS_SUCCESS:
        return {
          ...state,
          jobs: payload.jobs,
        };
      case GETJOBS_FAIL:
        return {
          ...state,
          jobs: [],
        };
    case ADDJOB_SUCCESS:
      return {
        ...state,
        addJobStatus: payload.addJobStatus
      };
    case ADDJOB_FAIL:
      return {
        ...state,
        addJobStatus: payload.addJobStatus
      };
    case UPDATEJOB_SUCCESS:
      return {
        ...state,
        updateJobStatus: payload.updateJobStatus
      };
    case UPDATEJOB_FAIL:
      return {
        ...state,
        updateJobStatus: payload.updateJobStatus
      };
    case DELETEJOB_SUCCESS:
      return {
        ...state,
        deleteJobStatus: payload.deleteJobStatus
      };
    case DELETEJOB_FAIL:
      return {
        ...state,
        deleteJobStatus: payload.deleteJobStatus
      };
    case ASSOCIATECANDIDATE_SUCCESS:
      return {
        ...state,
        associateCandidateStatus: payload.associateCandidateStatus
      };
    case ASSOCIATECANDIDATE_FAIL:
      return {
        ...state,
        associateCandidateStatus: payload.associateCandidateStatus
      };
    case UPDATECANDIDATESTATUS_SUCCESS:
      return {
        ...state,
        updateCandidateStatus: payload.updateCandidateStatus
      };
    case UPDATECANDIDATESTATUS_FAIL:
      return {
        ...state,
        updateCandidateStatus: payload.updateCandidateStatus
      };
    case JOB_SELECTED_ROW:
      return {
        ...state,
        jobSelectedRow: payload.jobSelectedRow
      };
    case DESELECT_JOBS_GRID:
      return {
        ...state,
        deSelectJobsGrid: payload.deSelectJobsGrid
      }
    default:
      return state;
    }
  }