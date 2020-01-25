import {EDIT_CONTACT_FAILURE, EDIT_CONTACT_REQUEST, EDIT_CONTACT_SUCCESS} from "../actionTypes";
import axiosApi from "../../axiosApi";

export const editContactRequest = ()=> ({type: EDIT_CONTACT_REQUEST});
export const editContactSuccess = (data)=> ({type: EDIT_CONTACT_SUCCESS, data});
export const editContactFailure = (e) => ({type: EDIT_CONTACT_FAILURE, e});

export const fetchSingleContact = (contactID) => {
  return async dispatch => {
    try {
      dispatch (editContactRequest());
      const response = await axiosApi.get(`/contacts2.${contactID}json`);
      dispatch(editContactSuccess(response.data))
    }  catch (e) {
      dispatch(editContactFailure(e))
    }
  }
};

export const editContact = (contactID,newContact) => {
  return async dispatch => {
    try {
      dispatch(editContactRequest());
      await axiosApi.patch(`/contacts2.${contactID}json`, newContact);
      dispatch(fetchSingleContact())
    } catch (e) {
      dispatch(editContactFailure(e))
    }
  }
};