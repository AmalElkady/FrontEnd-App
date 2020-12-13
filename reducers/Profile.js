import {
  READ_PROFILE_L2_SUCCESS,
  READ_MY_PROFILE_SUCCESS,
  SHOW_MESSAGE
} from "../constants/ActionTypes";

const initialProfileState = {
  profileL2Data: null,
  myProfileData: null,
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
    case READ_MY_PROFILE_SUCCESS: {
      return {
        ...state,
        myProfileData: action.payload
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
