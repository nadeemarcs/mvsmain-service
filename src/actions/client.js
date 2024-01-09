import {
    GETCLIENTS_SUCCESS,
    GETCLIENTS_FAIL,
    SET_MESSAGE,
    ADDCLIENTS_SUCCESS,
    ADDCLIENTS_FAIL,
    UPDATECLIENTS_SUCCESS,
    UPDATECLIENTS_FAIL,
    CLIENT_SELECTED_ROW,
    DELETECLIENT_SUCCESS,
    DELETECLIENT_FAIL
} from "./types";
import { toast } from 'react-toastify';
import clientService from "../services/client.service";

export const addClient = (payload) => (dispatch) => {
    return clientService.addClient(payload).then(
        (data) => {
            if (data.success) {
                dispatch({
                    type:ADDCLIENTS_SUCCESS,
                    payload: { addClientStatus: data.success },
                });
                dispatch({
                    type: SET_MESSAGE,
                    payload: data.data,
                });
                toast.success('Client added Successfully.')
                return Promise.resolve();
            } else {
                dispatch({
                    type: ADDCLIENTS_FAIL,
                    payload: { addClientStatus: false },
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
                type: ADDCLIENTS_FAIL,
                payload: { addClientStatus: false },
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const getClients = () => (dispatch) => {
    return clientService.getClients().then(
        (data) => {
            if (data.success) {
                dispatch({
                    type: GETCLIENTS_SUCCESS,
                    payload: { clients: data.data },
                });
                
                return Promise.resolve();
            } else {
                dispatch({
                    type: GETCLIENTS_FAIL,
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
                type: GETCLIENTS_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const updateClient = (id, payload) => (dispatch) => {
    return clientService.updateClient(id, payload).then(
        (data) => {
            if (data.success) {
                dispatch({
                    type: UPDATECLIENTS_SUCCESS,
                    payload: { updateClientStatus: data.success },
                });
                dispatch({
                    type: SET_MESSAGE,
                    payload: data.message,
                });
                return Promise.resolve();
            } else {
                dispatch({
                    type: UPDATECLIENTS_FAIL,
                    payload: { updateClientStatus: false },
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
                type: UPDATECLIENTS_FAIL,
                payload: { updateClientStatus: false },
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const deleteClient = (id) => (dispatch) => {
    return clientService.deleteClient(id).then(
        (data) => {
            if (data.success) {
                dispatch({
                    type: DELETECLIENT_SUCCESS,
                    payload: { deleteClientStatus: data.success },
                });
                dispatch({
                    type: SET_MESSAGE,
                    payload: data.data,
                });
                return Promise.resolve();
            } else {
                dispatch({
                    type: DELETECLIENT_FAIL,
                    payload: { deleteClientStatus: false },
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
                type: DELETECLIENT_FAIL,
                payload: { deleteClientStatus: false },
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const rowSelected = (payload) => (dispatch) => {
    dispatch({
        type: CLIENT_SELECTED_ROW,
        payload: { clientSelectedRow: payload },
    });
}