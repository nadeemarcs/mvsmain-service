import {
  GETCANDIDATES_SUCCESS,
  GETCANDIDATES_FAIL,
  SET_MESSAGE,
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
  SEARCHCANDIDATE_SUCCESS,
  SEARCHCANDIDATE_FAIL,
  SEARCHPRESSENTER,
} from "./types";

import candidateService from "../services/candidate.service";
import { toast } from "react-toastify";

export const getCandidates = (page, pageSize) => (dispatch) => {
  return candidateService.getCandidates(page, pageSize).then(
    (data) => {
      if (data.success) {
        dispatch({
          type: GETCANDIDATES_SUCCESS,
          payload: { candidates: data.data },
        });

        return Promise.resolve(data.data);
      } else {
        dispatch({
          type: GETCANDIDATES_FAIL,
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
        type: GETCANDIDATES_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getCandidatesById = (payload) => (dispatch) => {
  return candidateService.getCandidatesById(payload).then(
    (data) => {
      if (data.success) {
        dispatch({
          type: GETCANDIDATESBYID_SUCCESS,
          payload: { candidatesById: data.data },
        });

        return Promise.resolve();
      } else {
        dispatch({
          type: GETCANDIDATESBYID_FAIL,
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
        type: GETCANDIDATESBYID_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const addCandidate = (payload) => (dispatch) => {
  return candidateService.addCandidate(payload).then(
    (data) => {
      if (data.success) {
        dispatch({
          type: ADDCANDIDATE_SUCCESS,
          payload: { addCandidateStatus: data.success },
        });
        dispatch({
          type: SET_MESSAGE,
          payload: data.data,
        });
        return Promise.resolve();
      } else {
        dispatch({
          type: ADDCANDIDATE_FAIL,
          payload: { addCandidateStatus: false },
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
        type: ADDCANDIDATE_FAIL,
        payload: { addCandidateStatus: false },
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const updateCandidate = (id, payload) => (dispatch) => {
  return candidateService.updateCandidate(id, payload).then(
    (data) => {
      if (data.success) {
        dispatch({
          type: UPDATECANDIDATE_SUCCESS,
          payload: { updateCandidateStatus: data.success },
        });
        toast.success("Candidate updated successfully");
        dispatch({
          type: SET_MESSAGE,
          payload: data.message,
        });
        return Promise.resolve();
      } else {
        dispatch({
          type: UPDATECANDIDATE_FAIL,
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
        type: UPDATECANDIDATE_FAIL,
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

export const deleteCandidate = (id) => (dispatch) => {
  return candidateService.deleteCandidate(id).then(
    (data) => {
      if (data.success) {
        dispatch({
          type: DELETECANDIDATE_SUCCESS,
          payload: { deleteCandidateStatus: data.success },
        });
        dispatch({
          type: SET_MESSAGE,
          payload: data.message,
        });
        return Promise.resolve();
      } else {
        dispatch({
          type: DELETECANDIDATE_FAIL,
          payload: { deleteCandidateStatus: false },
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
        type: DELETECANDIDATE_FAIL,
        payload: { deleteCandidateStatus: false },
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
    type: CANDIDATE_SELECTED_ROW,
    payload: { candidateSelectedRow: payload },
  });
};

export const parseCandidate = (file) => (dispatch) => {
  dispatch({
    type: PARSECANDIDATE_PENDING,
    payload: { loader: true },
  });
  return candidateService.parseCandidate(file).then(
    (data) => {
      if (data.success) {
        dispatch({
          type: PARSECANDIDATE_SUCCESS,
          payload: { parsedData: data.data },
        });
        dispatch({
          type: PARSECANDIDATE_PENDING,
          payload: { loader: false },
        });
        toast.success("Files parsed successfully");
        return Promise.resolve();
      } else {
        dispatch({
          type: PARSECANDIDATE_FAIL,
        });

        dispatch({
          type: PARSECANDIDATE_PENDING,
          payload: { loader: false },
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
        type: PARSECANDIDATE_FAIL,
      });
      dispatch({
        type: PARSECANDIDATE_PENDING,
        payload: { loader: false },
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
export const searchCandidate = (payload) => (dispatch) => {
  return candidateService.searchCandidate(payload).then(
    (data) => {
      if (data.success) {
        dispatch({
          type: SEARCHCANDIDATE_SUCCESS,
          payload: { candidates: data.data.candidates },
        });

        return Promise.resolve();
      } else {
        dispatch({
          type: SEARCHCANDIDATE_FAIL,
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
        type: SEARCHCANDIDATE_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const autoSearchCandidate = (payload, cb) => async (dispatch) => {
  let res = await candidateService.searchCandidate(payload);

  cb(res.data);
};

export const setSearchResponse = () => {
  return {
    type: SEARCHPRESSENTER,
  };
};
