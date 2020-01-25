import {EDIT_CONTACT_FAILURE, EDIT_CONTACT_REQUEST, EDIT_CONTACT_SUCCESS} from "../actionTypes";

const initialState = {
  contact: {},
  loading: false,
  errors: null
};
const editContactReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_CONTACT_REQUEST:
      return {...state, loading: true};
    case EDIT_CONTACT_SUCCESS:
      return {...state, contact: action.data, loading: false, errors: null};
    case EDIT_CONTACT_FAILURE:
      return {...state, loading: false, errors: action.e};
    default:
      return state
  }
};
export default editContactReducer;