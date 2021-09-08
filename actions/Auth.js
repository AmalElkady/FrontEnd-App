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
  SUB_CLEAR,
  SIGNOUT_USER_SUCCESS,
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  MP_UPLOAD_SUCCESS,
  MP_UPLOAD,
  CHECK_MP_UPLOAD,
  CHECK_MP_UPLOAD_SUCCESS,
  ADD_PROFILEL2,
  ADD_PROFILEL2_SUCCESS,
  SUBSCRIBE,
  SUBSCRIBE_SUCCESS,
  RESET_TOKEN_SUCCESS,
  VERIFICATION_CODE_SUCCESS,
  PASSWORD_CHANGE_SUCCESS,
  SEND_RESET_TOKEN,
  SEND_VERIFICATION_CODE,
  RESEND_VERIFICATION_TO_PHONE,
  RESEND_VERIFICATION_TO_PHONE_SUCCESS,
  CLEAR_AUTH_STATE,
  CHANGE_PASSWORD,
  RESET_CHECK_MP_UPLOAD_FLAG,
  CHANGE_PHONE_BEFORE_VERIF,
  CHANGE_PHONE_BEFORE_VERIF_SUCCESS,
  RESET_PHONE_CHANGE_FLAG,
  MAIN_PHOTO_SELECTED,
  SWITCH_FORM,
  SWITCH_FORM_2,
  CONFIRM_PASSWORD_CASE,
  ADD_CONNECTION_FLAG,
  DISCONNECT_CHANNEL,
  MP_UPLOAD_TOKEN0_SUCCESS,
  ADD_PAYING_CUSTOMER,
  ADD_PAYING_CUSTOMER_SUCCESS,
  CREATE_CHECK_OUT_SESSION,
  CREATE_CHECK_OUT_SESSION_SUCCESS,
  RESET_NOTE_FLAG
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

export const changeUserPhoneBeforeVerif = (
  newPhone,
  phonecountrycode,
  countryiso2,
  newCity
) => {
  console.log("from action");
  return {
    type: CHANGE_PHONE_BEFORE_VERIF,
    payload: { newPhone, phonecountrycode, countryiso2, newCity }
  };
};

export const changeUserPhoneBeforeVerifSuccess = (
  returnData,
  newPhone,
  phonecountrycode,
  countryiso2,
  newCity
) => {
  return {
    type: CHANGE_PHONE_BEFORE_VERIF_SUCCESS,
    payload: { returnData, newPhone, phonecountrycode, countryiso2, newCity }
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

export const resendVerificationToPhoneSuccess = () => {
  return {
    type: RESEND_VERIFICATION_TO_PHONE_SUCCESS
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

export const userSignUp = (user, score, key) => {
  return {
    type: SIGNUP_USER,
    payload: { user, score, key }
  };
};

export const mainPhotoSelected = photo => {
  return {
    type: MAIN_PHOTO_SELECTED,
    payload: photo
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
export const userAddSubscribe = (pack, sessionId) => {
  console.log("from action ", pack, sessionId);
  return {
    type: SUBSCRIBE,
    payload: { pack, sessionId }
  };
};

export const userSignIn = user => {
  return {
    type: SIGNIN_USER,
    payload: user
  };
};
export const userSignOut = () => {
  console.log("logout from action");
  return {
    type: SIGNOUT_USER
  };
};

export const userCreateClear = () => {
  return {
    type: CREATE_USER_CLEAR
  };
};

export const resetPhonechangeFlag = () => {
  return {
    type: RESET_PHONE_CHANGE_FLAG
  };
};

export const stepFlagClear = () => {
  return {
    type: STEP_FLAG_CLEAR
  };
};

export const subFlagClear = () => {
  return {
    type: SUB_CLEAR
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

export const mpUploadSuccess = data => {
  return {
    type: MP_UPLOAD_SUCCESS,
    payload: data
  };
};

export const userProfileL2AddSuccess = () => {
  return {
    type: ADD_PROFILEL2_SUCCESS
  };
};

export const userAddSubscribeSuccess = () => {
  return {
    type: SUBSCRIBE_SUCCESS
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

export const mpUploadToken0Success = data => {
  return {
    type: MP_UPLOAD_TOKEN0_SUCCESS,
    payload: data
  };
};

export const checkMpUpload = () => {
  return {
    type: CHECK_MP_UPLOAD
  };
};

export const checkMpUploadSuccess = data => {
  return {
    type: CHECK_MP_UPLOAD_SUCCESS,
    payload: data
  };
};

export const resetCheckMpUpload = () => {
  return {
    type: RESET_CHECK_MP_UPLOAD_FLAG
  };
};

export const formSwitch = value => {
  return {
    type: SWITCH_FORM,
    payload: value
  };
};

export const formSwitch2 = value => {
  return {
    type: SWITCH_FORM_2,
    payload: value
  };
};

export const confirmPasswordCase = value => {
  return {
    type: CONFIRM_PASSWORD_CASE,
    payload: value
  };
};

export const addConnectionFlag = (flag, connValue) => {
  console.log("flag, connvalue ", flag, connValue);
  return {
    type: ADD_CONNECTION_FLAG,
    payload: { flag, connValue }
  };
};

export const disConnectChannel = () => {
  return {
    type: DISCONNECT_CHANNEL
  };
};

////////

export const addPayingCustomer = () => {
  return {
    type: ADD_PAYING_CUSTOMER
  };
};

export const addPayingCustomerSuccess = data => {
  return {
    type: ADD_PAYING_CUSTOMER_SUCCESS,
    payload: data
  };
};

export const createCheckOutSession = pack => {
  return {
    type: CREATE_CHECK_OUT_SESSION,
    payload: pack
  };
};

export const createCheckOutSessionSuccess = (data, pack) => {
  return {
    type: CREATE_CHECK_OUT_SESSION_SUCCESS,
    payload: { data, pack }
  };
};

export const resetNoteFlag = flag => {
  return {
    type: RESET_NOTE_FLAG,
    payload: flag
  };
};
