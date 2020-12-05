import { ADD_PENDING_WORKERS } from "../constants";

const initialState = {
  pending: [],
};

function offlineReducer(state = initialState, action) {
  if (action.type === ADD_PENDING_WORKERS) {
    return {
      pending: [
        ...state.pending,
        {
          worker: action.payload.user.email,
        },
      ],
    };
  }

  return state;
}

export default offlineReducer;
