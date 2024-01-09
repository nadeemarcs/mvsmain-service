import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://mvsmain-serviceapp.azurewebsites.net/v1/jobService/';

class JobService {
  getJobs() {
    return axios
      .get(API_URL + 'getJobs', { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  addJob(payload) {
    return axios
      .post(API_URL + "addJob", { ...payload },  { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  updateJob(id, payload) {
    return axios
      .put(API_URL + `updateJob/${id}`, { ...payload },  { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  deleteJob(id) {
    return axios
      .delete(API_URL + `deleteJob/${id}`,  { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  associateCandidate(payload) {
    return axios
      .post(API_URL + `associate`, { ...payload },  { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  updateCandidateStatus(payload) {
    return axios
      .put(API_URL + `associate`, { ...payload },  { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  getPrefferedCandidate(id) {
    return axios
      .get(API_URL + `prefferedCandidate/${id}`, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
}

export default new JobService();