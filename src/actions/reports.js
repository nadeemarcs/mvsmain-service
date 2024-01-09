import {
    GETREPORTS_SUCCESS,
    GETREPORTS_FAIL,
    SET_MESSAGE
}from './types';

import reportsService  from '../services/reports.service';


export const getReports = (details)=>(dispatch)=>{
    return reportsService.getReports(details).then((response)=>{
        if(response.success){
            dispatch({
                type:GETREPORTS_SUCCESS,
                payload: response.data
            })
            return Promise.resolve();
        }
        else{
            dispatch({
                type: GETREPORTS_FAIL, 
            })
            dispatch({
                type: SET_MESSAGE,
                payload: response.message
            })
            return Promise.reject();
        }
    })
}