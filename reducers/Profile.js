import {
  READ_PROFILE_L2_SUCCESS,
  READ_MY_PROFILE_L1_SUCCESS,
  READ_MY_PROFILE_L2_SUCCESS,
  UPDATE_PROFILE_L1_SUCCESS,
  UPDATE_PROFILE_L2_SUCCESS,
  READ_MY_PHOTOS_SUCCESS,
  READ_MY_PHOTOS_PP_SUCCESS,
  CHANGE_MY_PASSWORD_SUCCESS,
  CHANGE_USER_LOGIN_PHONE_SUCCESS,
  VERIFY_USER_LOGIN_PHONE_CHANGE_SUCCESS,
  READ_MY_PHONE_AND_PW_DATA_SUCCESS,
  READ_MY_PAYMENTS_AND_SUB_SUCCESS,
  REQUEST_PHOTO_UPLOAD_PP_SUCCESS,
  REQUEST_REMOVE_PHOTO_PP_SUCCESS,
  REQUEST_PERMISSION_PP_READ_REMOVE_SUCCESS,
  REQUEST_PHOTO_READ_PP_SUCCESS,
  REQUEST_PHOTO_READ_PP_FAIL,
  SET_FINAL_PP,
  PP_PHOTO_SELECTED,
  UPDATE_MAIN_PHOTO_SUCCESS,
  DELETE_MY_ACCOUNT_SUCCESS,
  OPEN_MODAL,
  OPEN_MODAL_PP,
  OPEN_MODAL_SEND_PP,
  SHOW_MESSAGE,
  MODAL_PP_INFO
} from "../constants/ActionTypes";

const initialProfileState = {
  profileL2Data: null,
  userPhotos: null,
  userPhotoPPSigned: null,
  myProfileDataL1: null,
  myProfileDataL2: null,
  myPhotos: null,
  userMartial: null,
  myPhotoSigned: null,
  myPhotoPPSigned: null,
  userPhotoPPSignedMessage: false,
  finalPP: null,
  returnUpdateMessage: false,
  passwordChanged: false,
  loginPhoneChanged: false,
  photoUploadPP: false,
  photoRemovePP: false,
  permissionReadPP: false,
  verifyLoginPhoneChanged: false,

  myPhoneAndPwData: null,
  myPaymentsAndSub: [],
  myPaymentsAndSubCount: null,
  endOfResultPaymentsAndSub: false,
  paymentsStart: 0,
  paymentsEnd: 5,
  paymentLimit: 5,

  updateMPselected: null,
  ppPhotoSelected: null,

  myAccountDeleted: false,
  openModal: false,
  openModalPP: false,
  openModalSendPP: false,
  showMessage: false,
  loader: false,
  alertMessage: "",
  mainPhotoUpdated: false,
  userBlockedMessage: null,
  ppInfoModal: false
};

const Profile = (state = initialProfileState, action) => {
  switch (action.type) {
    case READ_PROFILE_L2_SUCCESS: {
      if (action.payload.message) {
        state.userBlockedMessage = action.payload.message;
      } else {
        state.userBlockedMessage = null;
      }
      return {
        ...state,
        profileL2Data: action.payload.profile,
        userPhotos: action.payload.photos
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
    case REQUEST_PHOTO_READ_PP_SUCCESS: {
      return {
        ...state,
        userPhotoPPSigned: action.payload.signedRequest
      };
    }
    case REQUEST_PHOTO_READ_PP_FAIL: {
      return {
        ...state,
        userPhotoPPSignedMessage: action.payload
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
      if (state.myProfileDataL1) {
        state.myProfileDataL1.profile.MP = action.payload.signedRequest;
      }
      return {
        ...state,
        myPhotoSigned: action.payload.signedRequest
      };
    }
    case SET_FINAL_PP: {
      return {
        ...state,
        finalPP: action.payload
      };
    }
    case READ_MY_PHOTOS_PP_SUCCESS: {
      return {
        ...state,
        myPhotoPPSigned: action.payload.signedRequest
      };
    }
    case UPDATE_MAIN_PHOTO_SUCCESS: {
      return {
        ...state,
        mainPhotoUpdated: action.payload
      };
    }
    case DELETE_MY_ACCOUNT_SUCCESS: {
      return {
        ...state,
        myAccountDeleted: action.payload
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
      let finalData = {};
      finalData.phoneChangeNum = action.payload.allValues[2];
      finalData.passwordChangeNum = action.payload.allValues[0];
      finalData.phonePassData = JSON.parse(action.payload.allValues[1]);
      return {
        ...state,
        myPhoneAndPwData: finalData
      };
    }
    case READ_MY_PAYMENTS_AND_SUB_SUCCESS: {
      if (action.payload.data.length != 0) {
        state.paymentsStart = state.paymentsEnd;
        state.paymentsEnd += state.paymentLimit;
        if (action.payload.data.length < state.paymentLimit) {
          state.endOfResultPaymentsAndSub = true;
        }
      } else if (action.payload.data.length == 0) {
        state.endOfResultPaymentsAndSub = true;
      }
      return {
        ...state,
        myPaymentsAndSubCount: action.payload.data.length,
        myPaymentsAndSub: action.payload.data
        //  [
        //   ...state.myPaymentsAndSub,
        //   ...action.payload.data
        // ]
      };
    }
    case CHANGE_MY_PASSWORD_SUCCESS: {
      let mgsReturned = true;
      if (!action.payload.data) {
        mgsReturned = "error";
      }
      return {
        ...state,
        passwordChanged: mgsReturned
      };
    }
    case PP_PHOTO_SELECTED: {
      return {
        ...state,
        ppPhotoSelected: action.payload
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
    case OPEN_MODAL_PP: {
      return {
        ...state,
        openModalPP: action.payload
      };
    }
    case OPEN_MODAL_SEND_PP: {
      return {
        ...state,
        openModalSendPP: action.payload
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
    case MODAL_PP_INFO: {
      return {
        ...state,
        ppInfoModal: action.payload
      };
    }
    default:
      return state;
  }
};

export default Profile;
