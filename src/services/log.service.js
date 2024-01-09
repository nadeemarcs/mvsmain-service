import axios from 'axios';
import authHeader from './auth-header';

//const API_URL = 'https://localhost:4040/v1/log/';
const API_URL = 'https://mvsmain-serviceapp.azurewebsites.net/v1/log/'

class logService {
  getActivity() {
    return axios
      .get(API_URL + `activity`, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  getNotification() {
    return axios
      .get(API_URL + `notification`, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
}

export default new  logService();