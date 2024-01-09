import {
    GETVENDORS_SUCCESS,
    GETVENDORS_FAIL,
    ADDVENDORS_SUCCESS,
    ADDVENDORS_FAIL,
    UPDATEVENDORS_SUCCESS,
    UPDATEVENDORS_FAIL,
    VENDOR_SELECTED_ROW,
    DELETEVENDOR_SUCCESS,
    DELETEVENDOR_FAIL,

  } from "../actions/types";
  
  const initialState = {
    vendors: [],
  };
  
  export default function vendor(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GETVENDORS_SUCCESS:
        return {
          ...state,
          vendors: payload.vendors,
        };
      case GETVENDORS_FAIL:
        return {
          ...state,
          vendors: [],
        };
      case ADDVENDORS_SUCCESS:
        return {
          ...state,
          addVendorStatus: payload.addVendorStatus,
        };
      case ADDVENDORS_FAIL:
        return {
          ...state,
          addVendorStatus: [],
        };
      case UPDATEVENDORS_SUCCESS:
        return {
          ...state,
          updateVendorStatus: payload.updateVendorStatus
        };
      case UPDATEVENDORS_FAIL:
        return {
          ...state,
          updateVendorStatus: payload.updateVendorStatus
        };
      case DELETEVENDOR_SUCCESS:
        return {
          ...state,
          deleteVendorStatus: payload.deleteVendorStatus
        };
      case DELETEVENDOR_FAIL:
        return {
          ...state,
          deleteVendorStatus: payload.deleteVendorStatus
        };
      case VENDOR_SELECTED_ROW:
        return {
          ...state,
          vendorSelectedRow: payload.vendorSelectedRow
        };
      default:
        return state;
    }
  }
  