import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://mvsmain-serviceapp.azurewebsites.net/v1/clientService/';

class ClientService {
  async getClients() {
    const response = await axios
      .get(API_URL + 'client', { headers: authHeader() });
    return response.data;
  }

  async addClient(payload) {
    const response = await axios
      .post(API_URL + 'client', { ...payload }, { headers: authHeader() });
    return response.data;

  }

  async updateClient(id, payload) {
    const response = await axios
      .put(API_URL + `client/${id}`, { ...payload }, { headers: authHeader() });
    return response.data;
  }

  async deleteClient(id) {
    const response = await axios
      .delete(API_URL + `client/${id}`, { headers: authHeader() });
    return response.data;
  }
}

export default new ClientService();