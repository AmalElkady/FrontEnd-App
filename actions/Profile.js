import {
  READ_PROFILE_L2,
  READ_PROFILE_L2_SUCCESS,
  READ_MY_PROFILE,
  READ_MY_PROFILE_L1_SUCCESS,
  READ_MY_PROFILE_L2_SUCCESS,
  UPDATE_PROFILE_L1,
  UPDATE_PROFILE_L1_SUCCESS,
  UPDATE_PROFILE_L2,
  UPDATE_PROFILE_L2_SUCCESS,
  READ_MY_PHOTOS,
  READ_MY_PHOTOS_SUCCESS,
  CHANGE_MY_PASSWORD,
  CHANGE_MY_PASSWORD_SUCCESS,
  OPEN_MODAL,
  SHOW_MESSAGE
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

export const updateProfileL1 = martial => {
  return {
    type: UPDATE_PROFILE_L1,
    payload: martial
  };
};

export const updateProfileL1Success = (data, martial) => {
  return {
    type: UPDATE_PROFILE_L1_SUCCESS,
    payload: { data, martial }
  };
};

export const changeMyPassword = (oldPassword,newPassword) => {
  console.log("oldPassword,newPassword action ",oldPassword,newPassword)
  return {
    type: CHANGE_MY_PASSWORD,
    payload: {oldPassword,newPassword}
  };
};

export const changeMyPasswordSuccess = data => {
  return {
    type: CHANGE_MY_PASSWORD_SUCCESS,
    payload: data
  };
};



export const updateProfileL2 = (
  nationality,
  tpercent,
  title,
  workd,
  education,
  bio
) => {
  return {
    type: UPDATE_PROFILE_L2,
    payload: { nationality, tpercent, title, workd, education, bio }
  };
};

export const updateProfileL2Success = (data, L2Data) => {
  return {
    type: UPDATE_PROFILE_L2_SUCCESS,
    payload: { data, L2Data }
  };
};

export const readMyPhotos = params => {
  return {
    type: READ_MY_PHOTOS,
    payload: params
  };
};

export const readMyPhotosSuccess = data => {
  return {
    type: READ_MY_PHOTOS_SUCCESS,
    payload: data
  };
};

export const openModal = flag => {
  return {
    type: OPEN_MODAL,
    payload: flag
  };
};

export const showProfileMessage = message => {
  return {
    type: SHOW_MESSAGE,
    payload: message
  };
};
