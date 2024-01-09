import {
    GETUSERPROFILE_SUCCESS,
    GETUSERPROFILE_FAIL,
    UPDATEUSERPROFILE_SUCCESS,
    UPDATEUSERPROFILE_FAIL,
    UPDATECANDIDATE_FAIL
}from '../actions/types';

const initialState = {
    profile: [],
}

export default function profile(state = initialState, action){
    const {type, payload} = action;
    switch (type){
        case GETUSERPROFILE_SUCCESS:{
            return {...state, profile: payload[0]}
        }
        case GETUSERPROFILE_FAIL:{
            return {...state, profile:[]}
        }
        case UPDATEUSERPROFILE_SUCCESS:{
            return {...state, status: payload}
        }
        case UPDATEUSERPROFILE_FAIL:{
            return {...state, status:""}
        }
        default:{
            return state;
        }
    }
}