import {
  GETCANDIDATES_SUCCESS,
  GETCANDIDATES_FAIL,
  ADDCANDIDATE_SUCCESS,
  ADDCANDIDATE_FAIL,
  UPDATECANDIDATE_SUCCESS,
  UPDATECANDIDATE_FAIL,
  CANDIDATE_SELECTED_ROW,
  DELETECANDIDATE_SUCCESS,
  DELETECANDIDATE_FAIL,
  GETCANDIDATESBYID_SUCCESS,
  GETCANDIDATESBYID_FAIL,
  PARSECANDIDATE_SUCCESS,
  PARSECANDIDATE_FAIL,
  PARSECANDIDATE_PENDING,
  GETPREFFEREDCANDIDATE_SUCCESS,
  GETPREFFEREDCANDIDATE_FAIL,
  SEARCHCANDIDATE_SUCCESS,
  SEARCHCANDIDATE_FAIL,
  SEARCHPRESSENTER,
} from "../actions/types";

const initialState = {
  loading: false,
  candidates: [],
  candidatesById: [],
  addCandidateStatus: [],
  candidateSelectedRow: {},
  updateCandidateStatus: false,
  deleteCandidateStatus: false,
  parsedData: [],
  page: 1,
  pressSearchEnter: false,
};

export default function candidate(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GETCANDIDATES_SUCCESS:
      return {
        ...state,
        candidates: payload.candidates,
        page: state.page + 1,
        loading: false,
        pressSearchEnter: false,
      };
    case GETCANDIDATES_FAIL:
      return {
        ...state,
        candidates: [],
      };
    case GETPREFFEREDCANDIDATE_SUCCESS:
      return {
        ...state,
        candidates: payload.candidates,
      };
    case GETPREFFEREDCANDIDATE_FAIL:
      return {
        ...state,
        candidates: [],
      };
    case GETCANDIDATESBYID_SUCCESS:
      return {
        ...state,
        candidatesById: payload.candidatesById,
      };
    case GETCANDIDATESBYID_FAIL:
      return {
        ...state,
        candidates: [],
      };
    case ADDCANDIDATE_SUCCESS:
      return {
        ...state,
        addCandidateStatus: payload.addCandidateStatus,
      };
    case ADDCANDIDATE_FAIL:
      return {
        ...state,
        addCandidateStatus: [],
      };
    case PARSECANDIDATE_SUCCESS:
      return {
        ...state,
        parsedData: payload.parsedData,
      };
    case PARSECANDIDATE_FAIL:
      return {
        ...state,
        parsedData: [],
      };
    case PARSECANDIDATE_PENDING:
      return {
        ...state,
        loader: payload.loader,
      };
    case UPDATECANDIDATE_SUCCESS:
      return {
        ...state,
        updateCandidateStatus: payload.updateCandidateStatus,
      };
    case UPDATECANDIDATE_FAIL:
      return {
        ...state,
        updateCandidateStatus: payload.updateCandidateStatus,
      };
    case CANDIDATE_SELECTED_ROW:
      return {
        ...state,
        candidateSelectedRow: payload.candidateSelectedRow,
      };
    case DELETECANDIDATE_SUCCESS:
      return {
        ...state,
        deleteCandidateStatus: payload.deleteCandidateStatus,
      };
    case DELETECANDIDATE_FAIL:
      return {
        ...state,
        deleteCandidateStatus: payload.deleteCandidateStatus,
      };
    case SEARCHCANDIDATE_SUCCESS:
      return {
        ...state,
        candidates: payload.candidates,
      };
    case SEARCHCANDIDATE_FAIL:
      return {
        ...state,
        candidates: [],
        pressSearchEnter: false,
      };
    case SEARCHPRESSENTER:
      return {
        ...state,
        pressSearchEnter: true,
      };
    default:
      return state;
  }
}
