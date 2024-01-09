import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    GETUSERS_SUCCESS,
    GETUSERS_FAIL,
    DELETEUSER_SUCCESS,
    DELETEUSER_FAIL
  } from "../actions/types";
  
  const user = JSON.parse(localStorage.getItem("user"));
  
  const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };
  
  export default function auth(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case REGISTER_SUCCESS:
        return {
          ...state,
          isLoggedIn: false,
        };
      case REGISTER_FAIL:
        return {
          ...state,
          isLoggedIn: false,
        };
      case GETUSERS_SUCCESS:
        return {
          ...state,
          usersList: payload.usersList
        }
      case GETUSERS_FAIL:
        return {
          ...state,
          usersList: []
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          isLoggedIn: true,
          user: payload.user,
        };
      case LOGIN_FAIL:
        return {
          ...state,
          isLoggedIn: false,
          user: null,
        };
      case LOGOUT:
        return {
          ...state,
          isLoggedIn: false,
          user: null,
        };
      case DELETEUSER_SUCCESS:
        return {
          ...state,
          isUserDeleted: true,
          status: payload
        }
      case DELETEUSER_FAIL:{
        return {
          ...state,
          status: payload
        }
      }
      default:
        return state;
    }
  }