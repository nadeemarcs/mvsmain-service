import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://mvsmain-serviceapp.azurewebsites.net/v1/vendorService/';

class VendorService {
  getVendors() {
    return axios
      .get(API_URL + 'vendor', { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  addVendor(payload) {
    return axios
      .post(API_URL + 'vendor', { ...payload }, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  updateVendor(id, payload) {
    return axios
      .put(API_URL + `vendor/${id}`, { ...payload },  { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  deleteVendor(id) {
    return axios
      .delete(API_URL + `vendor/${id}`,  { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
  getVendorsById(payload) {
    return axios
      .get(API_URL + `vendor?ids=${payload}`, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
}

export default new VendorService();