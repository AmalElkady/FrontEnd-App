import { getCookie } from "../util/session";
import base64url from "base64url";
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
  RESEND_VERIFICATION_TO_PHONE_SUCCESS,
  RESET_PHONE_CHANGE_FLAG,
  MAIN_PHOTO_SELECTED,
  SWITCH_FORM,
  SWITCH_FORM_2,
  CONFIRM_PASSWORD_CASE,
  ADD_CONNECTION_FLAG,
  DISCONNECT_CHANNEL,
  MP_UPLOAD_TOKEN0_SUCCESS,
  ADD_PAYING_CUSTOMER_SUCCESS,
  CREATE_CHECK_OUT_SESSION_SUCCESS,
  RESET_NOTE_FLAG
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
  mainPhotoSelected: null,
  phoneVerified: false,
  stepFlag: false,
  mpUploadFlag: false,
  checkMpFlag: true,
  subFlag: false,
  formSwitchFlag: false,
  formSwitchFlag2: false,
  confirmPasswordFlag: false,
  gender: "",
  phone: "",
  country: "",
  city: "",
  countryiso2: "",
  name: "",
  birth: "",
  martial: "",
  haveConnection: false,
  haveConnectionPusher: null,
  haveConnectionChannel: null,
  sub: null,
  jnt: null,
  resendVerToPhoneSuccess: false,
  logoutFlag: false,
  token0: false,
  customerIdPayment: null,
  checkoutSessionDataUrl: null,
  checkoutSessionId: null,
  selectedPack: null,
  noteFlag: false
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
        city: action.payload.city,
        name: action.payload.name,
        birth: action.payload.birth,
        martial: action.payload.martial,
        gender: action.payload.gender,
        sub: action.payload.sub
      };
    }

    case RESET_NOTE_FLAG: {
      return {
        ...state,
        noteFlag: action.payload
      };
    }

    case ADD_PROFILEL2_SUCCESS: {
      return {
        ...state,
        loader: false,
        stepFlag: true
      };
    }

    case MAIN_PHOTO_SELECTED: {
      return {
        ...state,
        mainPhotoSelected: action.payload
      };
    }

    case MP_UPLOAD_SUCCESS: {
      console.log("from reducer mp uploaded");
      return {
        ...state,
        loader: false,
        mpUploadFlag: action.payload
      };
    }
    case MP_UPLOAD_TOKEN0_SUCCESS: {
      console.log("from reducer mp uploaded token0");
      return {
        ...state,
        token0: action.payload
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
    case RESET_PHONE_CHANGE_FLAG: {
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
    case RESEND_VERIFICATION_TO_PHONE_SUCCESS: {
      return {
        ...state,
        resendVerToPhoneSuccess: !state.resendVerToPhoneSuccess,
        loader: false
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
      newPhone, phonecountrycode, countryiso2, newCity;
      return {
        ...state,
        loader: false,
        phoneChangedBefore: action.payload.returnData,
        phone: action.payload.newPhone,
        country: action.payload.phonecountrycode,
        city: action.payload.newCity,
        countryiso2: action.payload.countryiso2
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
      console.log("SIGNIN_USER_SUCCESS ***** ", action.payload);
      return {
        ...state,
        loader: false,
        authUser: action.payload.authUser,
        phone: action.payload.phone,
        country: action.payload.country,
        name: action.payload.name,
        birth: action.payload.birth,
        martial: action.payload.martial,
        gender: action.payload.gender,
        sub: action.payload.sub,
        jnt: action.payload.jnt,
        logoutFlag: false,
        noteFlag: true
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
        gender: "",
        sub: null,
        jnt: null,
        noteFlag: false,
        tokenSent: false,
        confirmPasswordFlag: false,
        haveConnection: false,
        haveConnectionPusher: null,
        haveConnectionChannel: null,
        logoutFlag: true
      };
    }
    case DISCONNECT_CHANNEL: {
      console.log("disconnect channel reducer ");
      // const tokenValue = getCookie("access_token", false);
      // const tokenUserData = JSON.parse(
      //   base64url.decode(`${tokenValue}`.split(".")[1])
      // );
      // state.haveConnectionPusher.unsubscribe(
      //   `private-${tokenUserData.co}_${tokenUserData.ci}_${tokenUserData.va}_${tokenUserData.id}_${tokenUserData.gd}_${tokenUserData.jnt}`
      // );
      if (state.haveConnectionPusher) {
        state.haveConnectionPusher.disconnect();
      }
      return {
        ...state
      };
    }
    case CONFIRM_PASSWORD_CASE: {
      return {
        ...state,
        confirmPasswordFlag: action.payload
      };
    }
    case ADD_PAYING_CUSTOMER_SUCCESS: {
      console.log("ADD_PAYING_CUSTOMER_SUCCESS from reducer ", action.payload);
      return {
        ...state,
        customerIdPayment: action.payload
      };
    }
    case CREATE_CHECK_OUT_SESSION_SUCCESS: {
      console.log(
        "CREATE_CHECK_OUT_SESSION_SUCCESS from reducer ",
        action.payload
      );
      return {
        ...state,
        checkoutSessionDataUrl: action.payload.data.url,
        checkoutSessionId: action.payload.data.id,
        selectedPack: action.payload.pack
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

    case ADD_CONNECTION_FLAG: {
      console.log(
        "reducer%%%% ",
        action.payload.flag,
        action.payload.connValue
      );
      if (action.payload.flag == "p") {
        //console.log("reducer%%%% 1");
        state.haveConnectionPusher = action.payload.connValue;
      } else if (action.payload.flag == "ch") {
        //console.log("reducer%%%%2");
        state.haveConnectionChannel = action.payload.connValue;
      }
      return {
        ...state
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
    case SWITCH_FORM: {
      return {
        ...state,
        formSwitchFlag: action.payload,
        formSwitchFlag2: false
      };
    }
    case SWITCH_FORM_2: {
      return {
        ...state,
        formSwitchFlag2: action.payload
      };
    }

    default:
      return state;
  }
};
