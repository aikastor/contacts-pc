import {CONTACTS_FAILURE, CONTACTS_REQUEST, CONTACTS_SUCCESS} from "../actionTypes";
import axiosApi from "../../axiosApi";

export const contactsRequest = ()=> ({type: CONTACTS_REQUEST});
export const contactsSuccess = () => ({type: CONTACTS_SUCCESS});
export const contactsFailure = (error) => ({type: CONTACTS_FAILURE, error});

export const fetchContacts = ()=> {
  return async dispatch  => {
    try {
      dispatch(contactsRequest());
      const response = axiosApi.get('/contacts.json');
      dispatch(contactsSuccess(response.data));
    } catch (e) {
      dispatch(contactsFailure(e))
    }
  }
};