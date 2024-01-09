import {
    GETREPORTS_SUCCESS,
    GETREPORTS_FAIL,
    SET_MESSAGE
}from '../actions/types';

const initialState = {
    reports: [],
}

export default function report(state= initialState, action){
    const {type, payload} = action;
    switch (type){
        case GETREPORTS_SUCCESS:{
            return {...state, reports:payload}
        }
        case GETREPORTS_FAIL:{
            return {...state, reports:[]}
        }
        default: {
            return state
        }
    }
} 

