import Router from "next/router";
import {
  HIDE_MESSAGE,
  INIT_URL,
  ON_HIDE_LOADER,
  ON_SHOW_LOADER,
  SHOW_MESSAGE,
  SHOW_TIMER,
  HIDE_TIMER,
  SIGNIN_USER,
  SIGNIN_USER_SUCCESS,
  SIGNOUT_USER,
  CREATE_USER_CLEAR,
  MP_UPLOAD_CLEAR,
  STEP_FLAG_CLEAR,
  SIGNOUT_USER_SUCCESS,
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  MP_UPLOAD_SUCCESS,
  MP_UPLOAD,
  ADD_PROFILEL2,
  ADD_PROFILEL2_SUCCESS,
  RESET_TOKEN_SUCCESS,
  VERIFICATION_CODE_SUCCESS,
  PASSWORD_CHANGE_SUCCESS,
  SEND_RESET_TOKEN,
  SEND_VERIFICATION_CODE,
  RESEND_VERIFICATION_TO_PHONE,
  CLEAR_AUTH_STATE,
  CHANGE_PASSWORD
} from "../constants/ActionTypes";

export const userSendResetTokenSuccess = resetMessage => {
  return {
    type: RESET_TOKEN_SUCCESS,
    payload: resetMessage
  };
};

export const userSendVerificationCodeSuccess = verificationMessage => {
  return {
    type: VERIFICATION_CODE_SUCCESS,
    payload: verificationMessage
  };
};

export const userPasswordChangeSuccess = changeMessage => {
  return {
    type: PASSWORD_CHANGE_SUCCESS,
    payload: changeMessage
  };
};

export const sendResetToken = resetTokenSend => {
  return {
    type: SEND_RESET_TOKEN,
    payload: resetTokenSend
  };
};

export const sendVerificationCode = verificationCodeSend => {
  return {
    type: SEND_VERIFICATION_CODE,
    payload: verificationCodeSend
  };
};

export const resendVerificationToPhone = () => {
  return {
    type: RESEND_VERIFICATION_TO_PHONE
  };
};

export const clearPersistedAuthState = () => {
  return {
    type: CLEAR_AUTH_STATE
  };
};

export const changePassword = resetTokenData => {
  return {
    type: CHANGE_PASSWORD,
    payload: resetTokenData
  };
};

export const userSignUp = user => {
  return {
    type: SIGNUP_USER,
    payload: user
  };
};

export const mpUpload = imageToUpload => {
  return {
    type: MP_UPLOAD,
    payload: imageToUpload
  };
};

export const userAddProfileL2 = data => {
  return {
    type: ADD_PROFILEL2,
    payload: data
  };
};

export const userSignIn = user => {
  return {
    type: SIGNIN_USER,
    payload: user
  };
};
export const userSignOut = () => {
  return {
    type: SIGNOUT_USER
  };
};

export const userCreateClear = () => {
  return {
    type: CREATE_USER_CLEAR
  };
};

export const stepFlagClear = () => {
  return {
    type: STEP_FLAG_CLEAR
  };
};

export const mpUploadClear = () => {
  return {
    type: MP_UPLOAD_CLEAR
  };
};

export const userSignUpSuccess = authUser => {
  return {
    type: SIGNUP_USER_SUCCESS,
    payload: authUser
  };
};

export const mpUploadSuccess = () => {
  return {
    type: MP_UPLOAD_SUCCESS
  };
};

export const userProfileL2AddSuccess = () => {
  return {
    type: ADD_PROFILEL2_SUCCESS
  };
};

export const userSignInSuccess = authUser => {
  return {
    type: SIGNIN_USER_SUCCESS,
    payload: authUser
  };
};
export const userSignOutSuccess = () => {
  Router.replace("/");
  return {
    type: SIGNOUT_USER_SUCCESS
  };
};

export const showAuthMessage = message => {
  return {
    type: SHOW_MESSAGE,
    payload: message
  };
};

export const showTimer = time => {
  return {
    type: SHOW_TIMER,
    payload: time
  };
};
export const hideTimer = () => {
  return {
    type: HIDE_TIMER
  };
};
export const setInitUrl = url => {
  return {
    type: INIT_URL,
    payload: url
  };
};
export const showAuthLoader = () => {
  return {
    type: ON_SHOW_LOADER
  };
};

export const hideMessage = () => {
  return {
    type: HIDE_MESSAGE
  };
};
export const hideAuthLoader = () => {
  return {
    type: ON_HIDE_LOADER
  };
};
