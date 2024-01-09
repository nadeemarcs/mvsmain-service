import {
    GETVENDORS_SUCCESS,
    GETVENDORS_FAIL,
    SET_MESSAGE,
    ADDVENDORS_SUCCESS,
    ADDVENDORS_FAIL,
    UPDATEVENDORS_SUCCESS,
    UPDATEVENDORS_FAIL,
    VENDOR_SELECTED_ROW,
    DELETEVENDOR_SUCCESS,
    DELETEVENDOR_FAIL,
    GETVENDORSBYID_SUCCESS,
    GETVENDORSBYID_FAIL
} from "./types";

import vendorService from "../services/vendor.service";
import { toast } from 'react-toastify';

export const addVendor = (payload) => (dispatch) => {
    return vendorService.addVendor(payload).then(
        (data) => {
            if (data.success) {
                dispatch({
                    type: ADDVENDORS_SUCCESS,
                    payload: { addVendorStatus: data.success },
                });
                toast.success("Vendor created successfully!");
                dispatch({
                    type: SET_MESSAGE,
                    payload: data.data,
                });
                return Promise.resolve();
            } else {
                dispatch({
                    type: ADDVENDORS_FAIL,
                    payload: { addVendorStatus: false },
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
                type: ADDVENDORS_FAIL,
                payload: { addVendorStatus: false },
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const getVendors = () => (dispatch) => {
    return vendorService.getVendors().then(
        (data) => {
            if (data.success) {
                dispatch({
                    type: GETVENDORS_SUCCESS,
                    payload: { vendors: data.data },
                });
                
                return Promise.resolve();
            } else {
                dispatch({
                    type: GETVENDORS_FAIL,
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
                type: GETVENDORS_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const updateVendor = (id, payload) => (dispatch) => {
    return vendorService.updateVendor(id, payload).then(
        (data) => {
            if (data.success) {
                dispatch({
                    type: UPDATEVENDORS_SUCCESS,
                    payload: { updateVendorStatus: data.success },
                });
                dispatch({
                    type: SET_MESSAGE,
                    payload: data.message,
                });
                return Promise.resolve();
            } else {
                dispatch({
                    type: UPDATEVENDORS_FAIL,
                    payload: { updateVendorStatus: false },
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
                type: UPDATEVENDORS_FAIL,
                payload: { updateVendorStatus: false },
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const deleteVendor = (id) => (dispatch) => {
    return vendorService.deleteVendor(id).then(
        (data) => {
            if (data.success) {
                dispatch({
                    type: DELETEVENDOR_SUCCESS,
                    payload: { deleteVendorStatus: data.success },
                });
                dispatch({
                    type: SET_MESSAGE,
                    payload: data.data,
                });
                return Promise.resolve();
            } else {
                dispatch({
                    type: DELETEVENDOR_FAIL,
                    payload: { deleteVendorStatus: false },
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
                type: DELETEVENDOR_FAIL,
                payload: { deleteVendorStatus: false },
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};
export const getVendorsById = (payload) => (dispatch) => {
    return vendorService.getVendorsById(payload).then(
        (data) => {
            if (data.success) {
                dispatch({
                    type: GETVENDORSBYID_SUCCESS,
                    payload: { candidates: data.data },
                });
                
                return Promise.resolve();
            } else {
                dispatch({
                    type: GETVENDORSBYID_FAIL,
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
                type: GETVENDORSBYID_FAIL,
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
        type: VENDOR_SELECTED_ROW,
        payload: { vendorSelectedRow: payload },
    });
}