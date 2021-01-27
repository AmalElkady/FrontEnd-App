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
  READ_MY_PHOTOS_PP_SUCCESS,
  SET_FINAL_PP,
  CHANGE_MY_PASSWORD,
  CHANGE_MY_PASSWORD_SUCCESS,
  CHANGE_USER_LOGIN_PHONE,
  CHANGE_USER_LOGIN_PHONE_SUCCESS,
  VERIFY_USER_LOGIN_PHONE_CHANGE,
  VERIFY_USER_LOGIN_PHONE_CHANGE_SUCCESS,
  READ_MY_PHONE_AND_PW_DATA,
  READ_MY_PHONE_AND_PW_DATA_SUCCESS,
  READ_MY_PAYMENTS_AND_SUB,
  READ_MY_PAYMENTS_AND_SUB_SUCCESS,
  REQUEST_PHOTO_UPLOAD_PP,
  REQUEST_PHOTO_UPLOAD_PP_SUCCESS,
  REQUEST_REMOVE_PHOTO_PP,
  REQUEST_REMOVE_PHOTO_PP_SUCCESS,
  REQUEST_PERMISSION_PP_READ_REMOVE,
  REQUEST_PERMISSION_PP_READ_REMOVE_SUCCESS,
  PP_PHOTO_SELECTED,
  OPEN_MODAL,
  OPEN_MODAL_PP,
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

export const changeMyPassword = (oldPassword, newPassword) => {
  console.log("oldPassword,newPassword action ", oldPassword, newPassword);
  return {
    type: CHANGE_MY_PASSWORD,
    payload: { oldPassword, newPassword }
  };
};

export const changeMyPasswordSuccess = data => {
  return {
    type: CHANGE_MY_PASSWORD_SUCCESS,
    payload: data
  };
};

export const changeUserLoginPhone = (newPhone, password) => {
  console.log("newPhone,password action ", newPhone, password);
  return {
    type: CHANGE_USER_LOGIN_PHONE,
    payload: { newPhone, password }
  };
};

export const changeUserLoginPhoneSuccess = data => {
  return {
    type: CHANGE_USER_LOGIN_PHONE_SUCCESS,
    payload: data
  };
};

export const verifyUserLoginPhoneChange = verifyCode => {
  console.log("newPhone,password action ", verifyCode);
  return {
    type: VERIFY_USER_LOGIN_PHONE_CHANGE,
    payload: verifyCode
  };
};

export const verifyUserLoginPhoneChangeSuccess = data => {
  return {
    type: VERIFY_USER_LOGIN_PHONE_CHANGE_SUCCESS,
    payload: data
  };
};

export const readMyPhoneAndPwData = () => {
  return {
    type: READ_MY_PHONE_AND_PW_DATA
  };
};

export const readMyPhoneAndPwDataSuccess = data => {
  return {
    type: READ_MY_PHONE_AND_PW_DATA_SUCCESS,
    payload: data
  };
};

export const readMyPaymentAndSub = (count, start, end) => {
  return {
    type: READ_MY_PAYMENTS_AND_SUB,
    payload: { count, start, end }
  };
};

export const readMyPaymentAndSubSuccess = data => {
  return {
    type: READ_MY_PAYMENTS_AND_SUB_SUCCESS,
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

export const ppUpload = (file, photoNum) => {
  return {
    type: REQUEST_PHOTO_UPLOAD_PP,
    payload: { file, photoNum }
  };
};

export const ppUploadSuccess = data => {
  return {
    type: REQUEST_PHOTO_UPLOAD_PP_SUCCESS,
    payload: data
  };
};

export const ppRemove = photoNum => {
  return {
    type: REQUEST_REMOVE_PHOTO_PP,
    payload: photoNum
  };
};

export const ppRemoveSuccess = data => {
  return {
    type: REQUEST_REMOVE_PHOTO_PP_SUCCESS,
    payload: data
  };
};

export const readMyPhotos = params => {
  return {
    type: READ_MY_PHOTOS,
    payload: params
  };
};
export const setFinalPP = finalPhotos => {
  return {
    type: SET_FINAL_PP,
    payload: finalPhotos
  };
};

export const readMyPhotosSuccess = data => {
  return {
    type: READ_MY_PHOTOS_SUCCESS,
    payload: data
  };
};

export const readMyPhotosPPSuccess = data => {
  return {
    type: READ_MY_PHOTOS_PP_SUCCESS,
    payload: data
  };
};

export const permissionPPReadRemove = (
  action,
  profileid,
  country,
  city,
  varea
) => {
  return {
    type: REQUEST_PERMISSION_PP_READ_REMOVE,
    payload: { action, profileid, country, city, varea }
  };
};

export const permissionPPReadRemoveSuccess = data => {
  return {
    type: REQUEST_PERMISSION_PP_READ_REMOVE_SUCCESS,
    payload: data
  };
};

export const ppPhotoSelected = photo => {
  return {
    type: PP_PHOTO_SELECTED,
    payload: photo
  };
};

export const openModal = flag => {
  return {
    type: OPEN_MODAL,
    payload: flag
  };
};

export const openModalPP = flag => {
  return {
    type: OPEN_MODAL_PP,
    payload: flag
  };
};

export const showProfileMessage = message => {
  return {
    type: SHOW_MESSAGE,
    payload: message
  };
};
