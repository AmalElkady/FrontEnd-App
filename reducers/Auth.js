import {
  HIDE_MESSAGE,
  INIT_URL,
  ON_HIDE_LOADER,
  ON_SHOW_LOADER,
  SHOW_MESSAGE,
  HIDE_TIMER,
  SHOW_TIMER,
  //  SIGNIN_FACEBOOK_USER_SUCCESS,
  //  SIGNIN_GITHUB_USER_SUCCESS,
  //  SIGNIN_GOOGLE_USER_SUCCESS,
  //  SIGNIN_TWITTER_USER_SUCCESS,
  CREATE_USER_CLEAR,
  STEP_FLAG_CLEAR,
  SUB_CLEAR,
  MP_UPLOAD_SUCCESS,
  MP_UPLOAD_CLEAR,
  SIGNIN_USER_SUCCESS,
  SIGNOUT_USER_SUCCESS,
  SIGNUP_USER_SUCCESS,
  ADD_PROFILEL2_SUCCESS,
  SUBSCRIBE_SUCCESS,
  RESET_TOKEN_SUCCESS,
  VERIFICATION_CODE_SUCCESS,
  PASSWORD_CHANGE_SUCCESS,
  CLEAR_AUTH_STATE,
  CHECK_MP_UPLOAD_SUCCESS,
  RESET_CHECK_MP_UPLOAD_FLAG,
  CHANGE_PHONE_BEFORE_VERIF_SUCCESS,
  RESET_PHONE_CHANGE_FLAG
} from "../constants/ActionTypes";

const INIT_STATE = {
  loader: false,
  alertMessage: "",
  showMessage: false,
  timeReturned: false,
  timeReturnedVal: 0,
  tokenSent: false,
  passwordChanged: false,
  phoneChangedBefore: false,
  initURL: "",
  authUser: null,
  authStateCleared: false,
  phoneVerified: false,
  stepFlag: false,
  mpUploadFlag: false,
  checkMpFlag: true,
  subFlag: false,
  gender: "",
  phone: "",
  country: "",
  city:"",
  countryiso2: "",
  name: "",
  birth: "",
  martial: ""
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SIGNUP_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        authUser: action.payload.authUser,
        phone: action.payload.phone,
        country: action.payload.country,
        countryiso2: action.payload.countryiso2,
        city:action.payload.city,
        name: action.payload.name,
        birth: action.payload.birth,
        martial: action.payload.martial,
        gender: action.payload.gender
      };
    }

    case ADD_PROFILEL2_SUCCESS: {
      return {
        ...state,
        loader: false,
        stepFlag: true
      };
    }

    case MP_UPLOAD_SUCCESS: {
      return {
        ...state,
        loader: false,
        mpUploadFlag: true
      };
    }

    case CHECK_MP_UPLOAD_SUCCESS: {
      return {
        ...state,
        loader: false,
        checkMpFlag: action.payload
      };
    }
    case RESET_CHECK_MP_UPLOAD_FLAG: {
      return {
        ...state,
        checkMpFlag: true
      };
    }

    case SUBSCRIBE_SUCCESS: {
      return {
        ...state,
        loader: false,
        subFlag: true
      };
    }

    case CREATE_USER_CLEAR: {
      return {
        ...state,
        loader: false,
        authUser: null
      };
    }
  case RESET_PHONE_CHANGE_FLAG:{
     return {
        ...state,
        phoneChangedBefore: false
      };
  }

    case STEP_FLAG_CLEAR: {
      return {
        ...state,
        loader: false,
        stepFlag: false
      };
    }
    case SUB_CLEAR: {
      return {
        ...state,
        loader: false,
        subFlag: false
      };
    }

    case MP_UPLOAD_CLEAR: {
      return {
        ...state,
        loader: false,
        mpUploadFlag: false
      };
    }

    case RESET_TOKEN_SUCCESS: {
      return {
        ...state,
        loader: false,
        tokenSent: action.payload
      };
    }

    case VERIFICATION_CODE_SUCCESS: {
      return {
        ...state,
        loader: false,
        phoneVerified: action.payload
      };
    }
    case CHANGE_PHONE_BEFORE_VERIF_SUCCESS: {
      newPhone, phonecountrycode, countryiso2, newCity
      return {
        ...state,
        loader: false,
        phoneChangedBefore: action.payload.returnData,
        phone:  action.payload.newPhone,
       country:action.payload.phonecountrycode ,
      city:action.payload.newCity,
      countryiso2: action.payload.countryiso2,
      };
    }

    case PASSWORD_CHANGE_SUCCESS: {
      return {
        ...state,
        loader: false,
        passwordChanged: action.payload
      };
    }
    case CLEAR_AUTH_STATE: {
      return {
        ...state,
        loader: false,
        passwordChanged: false,
        tokenSent: false,
        authStateCleared: true
      };
    }
    case SIGNIN_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        authUser: action.payload.authUser,
        phone: action.payload.phone,
        country: action.payload.country,
        name: action.payload.name,
        birth: action.payload.birth,
        martial: action.payload.martial,
        gender: action.payload.gender
      };
    }
    case INIT_URL: {
      return {
        ...state,
        initURL: action.payload
      };
    }
    case SIGNOUT_USER_SUCCESS: {
      return {
        ...state,
        authUser: null,
        initURL: "",
        loader: false,
        phone: "",
        country: "",
        name: "",
        birth: "",
        martial: "",
        gender: ""
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
    case HIDE_MESSAGE: {
      return {
        ...state,
        alertMessage: "",
        showMessage: false,
        loader: false
      };
    }

    //    case SIGNIN_GOOGLE_USER_SUCCESS: {
    //      return {
    //        ...state,
    //        loader: false,
    //        authUser: action.payload
    //      };
    //    }
    //    case SIGNIN_FACEBOOK_USER_SUCCESS: {
    //      return {
    //        ...state,
    //        loader: false,
    //        authUser: action.payload
    //      };
    //    }
    //    case SIGNIN_TWITTER_USER_SUCCESS: {
    //      return {
    //        ...state,
    //        loader: false,
    //        authUser: action.payload
    //      };
    //    }
    //    case SIGNIN_GITHUB_USER_SUCCESS: {
    //      return {
    //        ...state,
    //        loader: false,
    //        authUser: action.payload
    //      };
    //    }
    case ON_SHOW_LOADER: {
      return {
        ...state,
        loader: true
      };
    }
    case ON_HIDE_LOADER: {
      return {
        ...state,
        loader: false
      };
    }
    case SHOW_TIMER: {
      return {
        ...state,
        timeReturnedVal: action.payload,
        timeReturned: true,
        loader: false
      };
    }
    case HIDE_TIMER: {
      return {
        ...state,
        timeReturnedVal: 0,
        timeReturned: false,
        loader: false
      };
    }

    default:
      return state;
  }
};
