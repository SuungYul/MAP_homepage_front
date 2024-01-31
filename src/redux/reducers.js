// reducers.js
import { LOG_IN, LOG_OUT } from "./actions";

const initialState = {
  isLoggedIn: !!localStorage.getItem("access_token"),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return { ...state, isLoggedIn: true };
    case LOG_OUT:
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
};

export default reducer;
