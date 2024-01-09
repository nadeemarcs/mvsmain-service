import {
    GETUSERPROFILE_SUCCESS,
    GETUSERPROFILE_FAIL,
    SET_MESSAGE,
    UPDATEUSERPROFILE_SUCCESS,
    UPDATEUSERPROFILE_FAIL
}from './types';

import profileService from '../services/profile.service';

export const getUserProfile = (id)=>(dispatch)=>{
    return profileService.getUserProfile(id).then((response)=>{
        if(response.success){
            dispatch({
                type: GETUSERPROFILE_SUCCESS,
                payload: response.data
            })
            return Promise.resolve();
        }
        else{
            dispatch({
                type: GETUSERPROFILE_FAIL
            })
            dispatch({
                type: SET_MESSAGE,
                payload: response.message
            })
            return Promise.reject();
        }
    })
}

export const updateUserProfile = (id, body) =>(dispatch)=>{
    return profileService.updateUserProfile(id, body).then((response)=>{
        if(response.success){
            dispatch({
                type: UPDATEUSERPROFILE_SUCCESS,
                payload: response
            })
            return Promise.resolve();
        }
        else{
            dispatch({
                type: UPDATEUSERPROFILE_FAIL
            })
            dispatch({
                type: SET_MESSAGE,
                payload: response.message
            })
            return Promise.reject();
        }
    })
}