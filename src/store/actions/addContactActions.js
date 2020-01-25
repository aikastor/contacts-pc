import {ADD_CONTACT_FAILURE, ADD_CONTACT_REQUEST, ADD_CONTACT_SUCCESS} from "../actionTypes";
import axiosApi from "../../axiosApi";

export const addContactRequest = () => ({type: ADD_CONTACT_REQUEST});
export const addContactSuccess = ()=> ({type: ADD_CONTACT_SUCCESS});
export const addContactFailure = (e)=> ({type: ADD_CONTACT_FAILURE, e});

export const addContact = (contactData) => {
  return async dispatch => {
    try {
      dispatch(addContactRequest());
      await axiosApi.post('/contacts2.json', contactData);
      dispatch(addContactSuccess());
    } catch (e) {
      dispatch(addContactFailure(e))
    }

  }
} ;