import {
  READ_PROFILE_L2,
  READ_PROFILE_L2_SUCCESS,
  READ_MY_PROFILE,
  READ_MY_PROFILE_SUCCESS
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

export const readMyProfile = params => {
  return {
    type: READ_MY_PROFILE,
    payload: params
  };
};

export const readMyProfileSuccess = data => {
  return {
    type: READ_MY_PROFILE_SUCCESS,
    payload: data
  };
};

export const showProfileMessage = message => {
  return {
    type: SHOW_MESSAGE,
    payload: message
  };
};
