import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
    CLEAR_MESSAGE,
    GETUSERS_SUCCESS,
    GETUSERS_FAIL,
    DELETEUSER_SUCCESS,
    DELETEUSER_FAIL
} from "./types";

import AuthService from "../services/auth.service";
import { toast } from "react-toastify";

export const register = (firstName, lastName, email, password) => (dispatch) => {
    return AuthService.register(firstName, lastName, email, password).then(
        (response) => {
            dispatch({
                type: REGISTER_SUCCESS,
            });
            toast.success("User added successfully");
            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: REGISTER_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const login = (username, password) => (dispatch) => {
    return AuthService.login(username, password).then(
        (data) => {
            if (data.success) {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: { user: data.data },
                });
                dispatch({
                    type: CLEAR_MESSAGE
                });
                return Promise.resolve();
            } else {
                dispatch({
                    type: LOGIN_FAIL,
                });

                dispatch({
                    type: SET_MESSAGE,
                    payload: data.message,
                });

                return Promise.reject();
            }

        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: LOGIN_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const getUsers = () => (dispatch) => {
    return AuthService.getUsers().then(
        (data) => {
            if (data.success) {
                const userList = [...data.data];
                const updatedUserList = userList.map(user => {
                    const o = Object.assign({}, user);
                    o.fullName = o.firstName + " " + o.lastName;
                    return o;
                })
                dispatch({
                    type: GETUSERS_SUCCESS,
                    payload: { 
                        usersList: updatedUserList 
                    },
                });
                dispatch({
                    type: CLEAR_MESSAGE
                });
                return Promise.resolve();
            } else {
                dispatch({
                    type: GETUSERS_FAIL,
                });

                dispatch({
                    type: SET_MESSAGE,
                    payload: data.message,
                });

                return Promise.reject();
            }

        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: GETUSERS_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};
export const deleteUser = (id) => (dispatch) =>{
    return AuthService.deleteUser(id).then(
        (data) =>{
            if(data.success){
                dispatch({
                    type: DELETEUSER_SUCCESS.at,
                    payload: {deletedUser: data.data}
                })
                return data;
            }else {
                dispatch({
                    type: DELETEUSER_FAIL,
                    payload: data.message
                });
                dispatch({
                    type: SET_MESSAGE,
                    payload: data.message,
                })
                return data;
            }
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: DELETEUSER_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    ).catch(e=>{
        console.log(e);
    });
}

export const logout = () => (dispatch) => {
    AuthService.logout();

    dispatch({
        type: LOGOUT,
    });
};