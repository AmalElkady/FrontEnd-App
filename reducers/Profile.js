import {
  READ_PROFILE_L2_SUCCESS,
  READ_MY_PROFILE_L1_SUCCESS,
  READ_MY_PROFILE_L2_SUCCESS,
  UPDATE_PROFILE_L1_SUCCESS,
  UPDATE_PROFILE_L2_SUCCESS,
  SHOW_MESSAGE
} from "../constants/ActionTypes";

const initialProfileState = {
  profileL2Data: null,
  myProfileDataL1: null,
  myProfileDataL2: null,
  userMartial: null,
  returnUpdateMessage: null,
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
        myProfileDataL2: action.payload
      };
    }
    case UPDATE_PROFILE_L1_SUCCESS: {
      console.log("from reducer ", action.payload);
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
        returnUpdateMessage: action.payload
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
