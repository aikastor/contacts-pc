import {CONTACTS_FAILURE, CONTACTS_REQUEST, CONTACTS_SUCCESS} from "../actionTypes";
import axiosApi from "../../axiosApi";

export const contactsRequest = ()=> ({type: CONTACTS_REQUEST});
export const contactsSuccess = (data) => ({type: CONTACTS_SUCCESS, data});
export const contactsFailure = (error) => ({type: CONTACTS_FAILURE, error});

export const fetchContacts = ()=> {
  return async dispatch  => {
    try {
      dispatch(contactsRequest());
      const response = await axiosApi.get('/contacts2.json');
      dispatch(contactsSuccess(response.data));
    } catch (e) {
      dispatch(contactsFailure(e))
    }
  }
};
export const deleteContact = (contactID) =>{
  return async dispatch  => {
    dispatch(contactsRequest());
    await axiosApi.delete(`/contacts2/${contactID}.json`);
    dispatch(fetchContacts());
  }
};
