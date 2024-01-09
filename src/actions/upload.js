import { toast } from 'react-toastify';
import { UPLOADFILE_FAIL, UPLOADFILE_SUCCESS, SET_MESSAGE, DOWNLOADFILE_SUCCESS, DOWNLOADFILE_FAIL } from "./types";

import uploadService from "../services/upload.service";


export const uploadFile = (file) => (dispatch) => {
    return uploadService.uploadFile(file).then(
        (data) => {
            if (data.success) {
                dispatch({
                    type: UPLOADFILE_SUCCESS,
                    payload: { fileLink: data.data?.fileLink },
                });
                toast.success("File uploaded successfully");
                return Promise.resolve();
            } else {
                dispatch({
                    type: UPLOADFILE_FAIL,
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
                type: UPLOADFILE_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const getFile = (path, preview) => (dispatch) => {
    return uploadService.getFile(path, preview)
        .then((response) => {
            if (typeof response === 'string') {
                return response;
            }
            const splitPathWithDot = path.split('.');
            const mimeType = splitPathWithDot[splitPathWithDot.length - 1]
            const fileName = path.split('-bezkoder-')[1]

            const url = URL.createObjectURL(new Blob([response], {type: `application/${mimeType}`}));
           
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName); //or any other extension
            document.body.appendChild(link);
            link.click();

            dispatch({
                type: DOWNLOADFILE_SUCCESS,
                payload: { downloadStatus: 'success' },
            });
            toast.success("File downloaded successfully");
            return Promise.resolve();
        })
        .catch(err => {
            dispatch({
                type: DOWNLOADFILE_FAIL
            });
            toast.error("An error occured while downloading the file");
        })
};


