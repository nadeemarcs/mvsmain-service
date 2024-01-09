import {
  GETCLIENTS_SUCCESS,
  GETCLIENTS_FAIL,
  ADDCLIENTS_SUCCESS,
  ADDCLIENTS_FAIL,
  UPDATECLIENTS_SUCCESS,
  UPDATECLIENTS_FAIL,
  CLIENT_SELECTED_ROW,
  DELETECLIENT_SUCCESS,
  DELETECLIENT_FAIL,
} from "../actions/types";

const initialState = {
  clients: [],
};

export default function client(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GETCLIENTS_SUCCESS:
      return {
        ...state,
        clients: payload.clients,
      };
    case GETCLIENTS_FAIL:
      return {
        ...state,
        clients: [],
      };
    case ADDCLIENTS_SUCCESS:
      return {
        ...state,
        addClientStatus: payload.addClientStatus,
      };
    case ADDCLIENTS_FAIL:
      return {
        ...state,
        addClientStatus: [],
      };
    case UPDATECLIENTS_SUCCESS:
      return {
        ...state,
        updateClientStatus: payload.updateClientStatus
      };
    case UPDATECLIENTS_FAIL:
      return {
        ...state,
        updateClientStatus: payload.updateClientStatus
      };
    case DELETECLIENT_SUCCESS:
      return {
        ...state,
        deleteClientStatus: payload.deleteClientStatus
      };
    case DELETECLIENT_FAIL:
      return {
        ...state,
        deleteClientStatus: payload.deleteClientStatus
      };
    case CLIENT_SELECTED_ROW:
      return {
        ...state,
        clientSelectedRow: payload.clientSelectedRow
      };
    default:
      return state;
  }
}
