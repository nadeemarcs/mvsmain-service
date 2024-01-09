import axios from "axios";
import authHeader from "./auth-header";
const API_URL = 'https://mvsmain-serviceapp.azurewebsites.net/v1/userService/';

class Profile {
    async getUserProfile(id){
        const response = await axios
        .get(API_URL+`getUserProfile/${id}`, {headers: authHeader()});
        return response.data;
    }
    async updateUserProfile(id, body){
        console.log(body);
        console.log(API_URL+`updateUser/${body.id}`)
        const response = await axios
        .put(API_URL+`updateUser/${id}`,{...body},{headers: authHeader()});
        return response.data;
    }
}

export default new Profile;