  import { USER_ACTION_TYPES } from "./user.types";

  const INITIAL_STATE = {
    currentUser: null
  }
  
  export const userReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case USER_ACTION_TYPES.SET_CURRENT_USER:
        return {
          /* spread unchanged state + add updated value */
          ...state,
          currentUser: payload
        }
      /* If not match any type throw Error */
      default:
        return state
    }
  }