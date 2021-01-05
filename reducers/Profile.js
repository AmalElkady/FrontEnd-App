import {
  READ_PROFILE_L2_SUCCESS,
  READ_MY_PROFILE_L1_SUCCESS,
  READ_MY_PROFILE_L2_SUCCESS,
  UPDATE_PROFILE_L1_SUCCESS,
  UPDATE_PROFILE_L2_SUCCESS,
  READ_MY_PHOTOS_SUCCESS,
  CHANGE_MY_PASSWORD_SUCCESS,
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
  passwordChanged:false,
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
    case CHANGE_MY_PASSWORD_SUCCESS:{
       return {
        ...state,
        passwordChanged: action.payload
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
