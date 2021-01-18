import {
  READ_PROFILE_L2_SUCCESS,
  READ_MY_PROFILE_L1_SUCCESS,
  READ_MY_PROFILE_L2_SUCCESS,
  UPDATE_PROFILE_L1_SUCCESS,
  UPDATE_PROFILE_L2_SUCCESS,
  READ_MY_PHOTOS_SUCCESS,
  CHANGE_MY_PASSWORD_SUCCESS,
  CHANGE_USER_LOGIN_PHONE_SUCCESS,
  VERIFY_USER_LOGIN_PHONE_CHANGE_SUCCESS,
  READ_MY_PHONE_AND_PW_DATA_SUCCESS,
  READ_MY_PAYMENTS_AND_SUB_SUCCESS,
  REQUEST_PHOTO_UPLOAD_PP_SUCCESS,
  REQUEST_REMOVE_PHOTO_PP_SUCCESS,
  REQUEST_PERMISSION_PP_READ_REMOVE_SUCCESS,
  OPEN_MODAL,
  SHOW_MESSAGE
} from "../constants/ActionTypes";

const initialProfileState = {
  profileL2Data: null,
  myProfileDataL1: null,
  myProfileDataL2: null,
  myPhotos: null,
  userMartial: null,
  myPhotoSigned: null,
  returnUpdateMessage: null,
  passwordChanged: false,
  loginPhoneChanged: false,
  photoUploadPP: false,
  photoRemovePP: false,
  permissionReadPP: false,
  verifyLoginPhoneChanged: false,
  myPhoneAndPwData: null,
  myPaymentsAndSub: null,
  openModal: false,
  showMessage: false,
  loader: false,
  alertMessage: ""
};

const home = (state = initialProfileState, action) => {
  switch (action.type) {
    case READ_PROFILE_L2_SUCCESS: {
      return {
        ...state,
        profileL2Data: action.payload
      };
    }
    case READ_MY_PROFILE_L1_SUCCESS: {
      return {
        ...state,
        myProfileDataL1: action.payload,
        userMartial: action.payload.profile.L1.martial
      };
    }
    case READ_MY_PROFILE_L2_SUCCESS: {
      return {
        ...state,
        myProfileDataL2: JSON.parse(action.payload.profile),
        myPhotos: action.payload.photos
      };
    }
    case UPDATE_PROFILE_L1_SUCCESS: {
      return {
        ...state,
        returnUpdateMessage: action.payload.data,
        userMartial: action.payload.martial,
        showMessage: true
      };
    }
    case UPDATE_PROFILE_L2_SUCCESS: {
      return {
        ...state,
        myProfileDataL2: action.payload.L2Data,
        returnUpdateMessage: action.payload.data
      };
    }
    case READ_MY_PHOTOS_SUCCESS: {
      state.myProfileDataL1.profile.MP = action.payload.signedRequest;
      return {
        ...state,
        myPhotoSigned: action.payload.signedRequest
      };
    }
    case REQUEST_PHOTO_UPLOAD_PP_SUCCESS: {
      return {
        ...state,
        photoUploadPP: action.payload
      };
    }
    case REQUEST_REMOVE_PHOTO_PP_SUCCESS: {
      return {
        ...state,
        photoRemovePP: action.payload
      };
    }
    case REQUEST_PERMISSION_PP_READ_REMOVE_SUCCESS: {
      return {
        ...state,
        permissionReadPP: action.payload
      };
    }
    case READ_MY_PHONE_AND_PW_DATA_SUCCESS: {
      return {
        ...state,
        myPhoneAndPwData: action.payload
      };
    }
    case READ_MY_PAYMENTS_AND_SUB_SUCCESS: {
      return {
        ...state,
        myPaymentsAndSub: action.payload
      };
    }
    case CHANGE_MY_PASSWORD_SUCCESS: {
      return {
        ...state,
        passwordChanged: action.payload
      };
    }
    case CHANGE_USER_LOGIN_PHONE_SUCCESS: {
      return {
        ...state,
        loginPhoneChanged: action.payload
      };
    }
    case VERIFY_USER_LOGIN_PHONE_CHANGE_SUCCESS: {
      return {
        ...state,
        verifyLoginPhoneChanged: action.payload
      };
    }
    case OPEN_MODAL: {
      return {
        ...state,
        openModal: action.payload
      };
    }
    case SHOW_MESSAGE: {
      return {
        ...state,
        alertMessage: action.payload,
        showMessage: true,
        loader: false
      };
    }
    default:
      return state;
  }
};

export default home;
