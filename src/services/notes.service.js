import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://mvsmain-serviceapp.azurewebsites.net/v1/noteService/';

class noteService {
  getJobNotes(entityId) {
    return axios
      .get(API_URL + `note?noteType=jobNotes&entityId=${entityId}`, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  addJobNotes(payload) {
    return axios
      .post(API_URL + "note", { ...payload },  { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  updateJobNotes(id, payload) {
    return axios
      .put(API_URL + `note/${id}`, { ...payload },  { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  deleteJobNotes(id) {
    return axios
      .delete(API_URL + `note/${id}?noteType=jobNotes`,  { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
  getCandidateNotes(entityId) {
    return axios
      .get(API_URL + `note?noteType=candidateNotes&entityId=${entityId}`, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  addCandidateNotes(payload) {
    return axios
      .post(API_URL + "note", { ...payload },  { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  updateCandidateNotes(id, payload) {
    return axios
      .put(API_URL + `note/${id}`, { ...payload },  { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  deleteCandidateNotes(id) {
    return axios
      .delete(API_URL + `note/${id}?noteType=candidateNotes`,  { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

}

export default new  noteService();