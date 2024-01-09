import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://mvsmain-serviceapp.azurewebsites.net/v1/candidateService/";
const API_URL_SEARCH = "https://mvsmain-serviceapp.azurewebsites.net/v1//userService/";
class CandidateService {
  async getCandidates(page, pageSize) {
    const response = await axios.get(
      API_URL + `candidates?limit=${pageSize}&page=${page}`,
      { headers: authHeader() }
    );
    return response.data;
  }

  async getCandidatesById(payload) {
    const response = await axios.get(API_URL + `candidate?ids=${payload}`, {
      headers: authHeader(),
    });
    return response.data;
  }

  async addCandidate(payload) {
    const response = await axios.post(
      API_URL + "candidate",
      { ...payload },
      { headers: authHeader() }
    );
    return response.data;
  }

  async updateCandidate(id, payload) {
    const response = await axios.put(
      API_URL + `candidate/${id}`,
      { ...payload },
      { headers: authHeader() }
    );
    return response.data;
  }

  async deleteCandidate(id) {
    const response = await axios.delete(API_URL + `candidate/${id}`, {
      headers: authHeader(),
    });
    return response.data;
  }
  //search
  async searchCandidate(payload) {
    const response = await axios.get(
      API_URL_SEARCH + `search?query=${payload}`,
      { headers: authHeader() }
    );
    return response.data;
  }

  async parseCandidate(payload) {
    let formData = new FormData();

    for (let i = 0; i < payload.length; i++) {
      formData.append(`files`, payload[i]);
    }

    const response = await axios.post(API_URL + "parseCandidate", formData, {
      headers: { ...authHeader(), "Content-Type": "multipart/form-data" },
    });
    return response.data;
  }
}

export default new CandidateService();
