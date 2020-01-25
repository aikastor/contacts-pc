import {ADD_CONTACT_FAILURE, ADD_CONTACT_REQUEST, ADD_CONTACT_SUCCESS} from "../actionTypes";

const initalState = {
  loading: false,
  errors: null,
};

const addContactReducer = (state = initalState, action) => {
  switch (action.type) {
    case ADD_CONTACT_REQUEST:
      return {...state, loading: true};
    case ADD_CONTACT_SUCCESS :
      return {...state, loading: false};
    case ADD_CONTACT_FAILURE:
      return {...state, loading: false, errors: action.e}
    default:
      return state;

  }
};
export default addContactReducer;