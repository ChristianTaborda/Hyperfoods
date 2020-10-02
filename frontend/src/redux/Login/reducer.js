import { SET_CREDENTIALS } from "../constants";

const initialState = {
  credentials: {},
};

function loginReducer(state = initialState, action) {
  if (action.type === SET_CREDENTIALS) {
    return Object.assign({}, state, {
      credentials: action.payload,
    });
  }
  return state;
}

export default loginReducer;
