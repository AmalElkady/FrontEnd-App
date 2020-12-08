import {
  READ_PROFILE_L2,
  READ_PROFILE_L2_SUCCESS
} from "../constants/ActionTypes";

export const readProfileL2 = (id, co, ci, va) => {
  return {
    type: READ_PROFILE_L2,
    payload: { id, co, ci, va }
  };
};

export const readProfileL2Success = data => {
  return {
    type: READ_PROFILE_L2_SUCCESS,
    payload: data
  };
};

export const showProfileMessage = message => {
  return {
    type: SHOW_MESSAGE,
    payload: message
  };
};
