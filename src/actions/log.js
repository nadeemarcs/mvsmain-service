import {
    SET_MESSAGE,
    GETACTIVITY_SUCCESS,
    GETACTIVITY_FAIL,
    GETNOTIFICATION_SUCCESS,
    GETNOTIFICATION_FAIL,
} from "./types";
import logService from "../services/log.service";


export const getActivity = () => (dispatch) => {
    return logService.getActivity().then(
        (data) => {
            if (data.success) {
                dispatch({
                    type: GETACTIVITY_SUCCESS,
                    payload: { activity: data.data },
                });
                
                return Promise.resolve();
            } else {
                dispatch({
                    type: GETACTIVITY_FAIL,
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
                type:GETACTIVITY_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const getNotification = () => (dispatch) => {
    return logService.getNotification().then(
        (data) => {
            if (data.success) {
                dispatch({
                    type: GETNOTIFICATION_SUCCESS,
                    payload: { notification: data.data },
                });
                
                return Promise.resolve();
            } else {
                dispatch({
                    type: GETNOTIFICATION_FAIL,
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
                type:GETNOTIFICATION_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};







