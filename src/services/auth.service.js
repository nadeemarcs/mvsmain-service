import axios from "axios";
import authHeader from './auth-header';

const API_URL = "https://mvsmain-serviceapp.azurewebsites.net/v1/userService/";


class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + "login", { email: username, password })
            .then((response) => {
                if (response.data?.data?.token) {
                    localStorage.setItem("user", JSON.stringify(response.data?.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(firstName, lastName, email, password) {
        return axios.post(API_URL + "addUser", {
            firstName,
            lastName,
            email,
            password,
        });
    }

    getUsers() {
        return axios
            .get(API_URL + "getUserList", { headers: authHeader() })
            .then((response) => {
                return response.data;
            });
    }
    deleteUser(id) {
        return axios
                .delete(API_URL + `delete/${id}`, { headers: authHeader()})
                .then((response) => {
                    return response.data;
                });
    }
}

export default new AuthService();