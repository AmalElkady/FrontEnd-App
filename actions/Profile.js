import {
  READ_PROFILE_L2,
  READ_PROFILE_L2_SUCCESS,
  READ_MY_PROFILE,
  READ_MY_PROFILE_L1_SUCCESS,
  READ_MY_PROFILE_L2_SUCCESS
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

export const readMyProfileL1Success = data => {
  return {
    type: READ_MY_PROFILE_L1_SUCCESS,
    payload: data
  };
};
export const readMyProfileL2Success = data => {
  return {
    type: READ_MY_PROFILE_L2_SUCCESS,
    payload: data
  };
};

export const showProfileMessage = message => {
  return {
    type: SHOW_MESSAGE,
    payload: message
  };
};
