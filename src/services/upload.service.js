import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://mvsmain-serviceapp.azurewebsites.net/v1/upload';

class UploadService {
  uploadFile(file) {
    let formData = new FormData();
    formData.append("file", file);

    return axios
      .post(API_URL, formData, { headers: {...authHeader(), "Content-Type": "multipart/form-data"} })
      .then((response) => {
        return response.data;
      });
  }

  async getFile(fileLink, preview) {
    if (preview) {
      return `${API_URL}?fileLink=${fileLink}`;
    }
    return axios
    .get(API_URL + `?fileLink=${fileLink}`, { responseType: 'arraybuffer', headers: {...authHeader(), "Content-Type": "multipart/form-data"} })
    .then((response) => {
      return response.data;
    })
    .catch(err => {
        return err.response;
    } );
  }

}

export default new UploadService();