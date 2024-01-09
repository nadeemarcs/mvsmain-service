import axios from "axios";
import authHeader from "./auth-header";
const API_URL = 'https://mvsmain-serviceapp.azurewebsites.net/v1/reportService/';
class Reports {
    async getReports(details) {
      let params;
      if(details.createdBy){
        params = {
          createdBy: details.createdBy
        }
      }
      if(details.startDate){
        params = {
          ...params,
          startDate: details.startDate
        }
      }
      if(details.endDate){
        params = {
          ...params,
          endDate: details.endDate,
        }
      }
      const response = await axios
      .get(API_URL + `reports/`, { headers: authHeader(), params:params });
      return response.data;
    }
}
 export default new Reports;