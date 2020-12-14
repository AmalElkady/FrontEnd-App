import {
  READ_PROFILE_L2_SUCCESS,
  READ_MY_PROFILE_L1_SUCCESS,
  READ_MY_PROFILE_L2_SUCCESS,
  SHOW_MESSAGE
} from "../constants/ActionTypes";

const initialProfileState = {
  profileL2Data: null,
  myProfileDataL1: null,
  myProfileDataL2: null,
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
        myProfileDataL1: action.payload
      };
    }
    case READ_MY_PROFILE_L2_SUCCESS: {
      return {
        ...state,
        myProfileDataL2: action.payload
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
