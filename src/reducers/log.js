import {
    GETACTIVITY_FAIL,
    GETACTIVITY_SUCCESS,
    GETNOTIFICATION_SUCCESS,
    GETNOTIFICATION_FAIL,
  } from "../actions/types";
  
  const initialState = {
    activity: [],
    notification: [],
  };
  
  export default function log(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GETACTIVITY_SUCCESS:
        return {
          ...state,
          activity: payload.activity,
        };
      case  GETACTIVITY_FAIL:
        return {
          ...state,
          activity: [],
        };
      case GETNOTIFICATION_SUCCESS:
        return {
          ...state,
          notification: payload.notification,
        };
      case GETNOTIFICATION_FAIL:
        return {
          ...state,
          notification: [],
        };
      default:
        return state;
    }
  }
  