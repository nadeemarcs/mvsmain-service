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
  } from "../actions/types";
  
  const initialState = {
    candidateNotes: [],
    jobNotes: [],
  };
  
  export default function notes(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GETCANDIDATENOTES_SUCCESS:
        return {
          ...state,
          candidateNotes: payload.notes,
        };
      case  GETCANDIDATENOTES_FAIL:
        return {
          ...state,
          candidateNotes: [],
        };
      case ADDCANDIDATENOTES_SUCCESS:
        return {
          ...state,
          addCandidateNotesStatus: payload.addCandidateNotesStatus,
        };
      case ADDCANDIDATENOTES_FAIL:
        return {
          ...state,
          addCandidateNotesStatus: [],
        };
      case UPDATECANDIDATENOTES_SUCCESS:
        return {
          ...state,
          updateCandidateNotesStatus: payload.updateCandidateNotesStatus
        };
      case UPDATECANDIDATENOTES_FAIL:
        return {
          ...state,
          updateCandidateNotesStatus: payload.updateCandidateNotesStatus
        };
      case DELETECANDIDATENOTES_SUCCESS:
        return {
          ...state,
          deleteCandidateNotesStatus: payload.deleteCandidateNotesStatus
        };
      case DELETECANDIDATENOTES_FAIL:
        return {
          ...state,
          deleteCandidateNotesStatus: payload.deleteCandidateNotesStatus
        };
        case GETJOBNOTES_SUCCESS:
        return {
          ...state,
          jobNotes: payload.notes,
        };
      case  GETJOBNOTES_FAIL:
        return {
          ...state,
          jobNotes: [],
        };
      case ADDJOBNOTES_SUCCESS:
        return {
          ...state,
          addJobNotesStatus: payload.addJobNotesStatus,
        };
      case ADDJOBNOTES_FAIL:
        return {
          ...state,
          addJobNotesStatus: [],
        };
      case UPDATEJOBNOTES_SUCCESS:
        return {
          ...state,
          updateJobNotesStatus: payload.updateJobNotesStatus
        };
      case UPDATEJOBNOTES_FAIL:
        return {
          ...state,
          updateJobNotesStatus: payload.updateJobNotesStatus
        };
      case DELETEJOBNOTES_SUCCESS:
        return {
          ...state,
          deleteJobNotesStatus: payload.deleteJobNotesStatus
        };
      case DELETEJOBNOTES_FAIL:
        return {
          ...state,
          deleteJobNotesStatus: payload.deleteJobNotesStatus
        };
      
      
      default:
        return state;
    }
  }
  