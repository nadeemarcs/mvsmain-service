import { DOWNLOADFILE_FAIL, DOWNLOADFILE_SUCCESS, UPLOADFILE_FAIL, UPLOADFILE_SUCCESS } from "../actions/types";

const initialState = {
    fileLink: '',
    downloadedFile: ''
};

export default function upload(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case UPLOADFILE_SUCCESS:
            return {
                ...state,
                fileLink: payload.fileLink,
            };
        case UPLOADFILE_FAIL:
            return {
                ...state,
                fileLink: [],
            };
        case DOWNLOADFILE_SUCCESS:
            return {
                ...state,
                downloadedFile: payload,
            };
        case DOWNLOADFILE_FAIL:
            return {
                ...state,
                downloadedFile: [],
            };
        default:
            return state;
    }
}