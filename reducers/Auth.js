import {
  HIDE_MESSAGE,
  INIT_URL,
  ON_HIDE_LOADER,
  ON_SHOW_LOADER,
  SHOW_MESSAGE,
//  SIGNIN_FACEBOOK_USER_SUCCESS,
//  SIGNIN_GITHUB_USER_SUCCESS,
//  SIGNIN_GOOGLE_USER_SUCCESS,
//  SIGNIN_TWITTER_USER_SUCCESS,
  CREATE_USER_CLEAR,
  STEP_FLAG_CLEAR,
  MP_UPLOAD_SUCCESS,
  MP_UPLOAD_CLEAR,
  SIGNIN_USER_SUCCESS,
  SIGNOUT_USER_SUCCESS,
  SIGNUP_USER_SUCCESS,
  ADD_PROFILEL2_SUCCESS,
  RESET_TOKEN_SUCCESS,
  VERIFICATION_CODE_SUCCESS,
  PASSWORD_CHANGE_SUCCESS,
  CLEAR_AUTH_STATE
} from "../constants/ActionTypes";

const INIT_STATE = {
    loader: false,
    alertMessage: '',
    showMessage: false,
	tokenSent: false,
	passwordChanged: false,
    initURL: '',
    authUser: null,
	authStateCleared : false,
	phoneVerified: false,
	stepFlag: false,
	mpUploadFlag: false,
	gender: '',
	phone: '',
	country: '',
  countryiso2:'',
	name: '',
	birth: '',
	martial: ''
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
    countryiso2:action.payload.countryiso2,
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
	
	case CREATE_USER_CLEAR: {
      return {
        ...state,
        loader: false,
        authUser: null
      };
    }
	
	case STEP_FLAG_CLEAR: {
      return {
        ...state,
        loader: false,
        stepFlag: false
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
        }
    }	
	
    case VERIFICATION_CODE_SUCCESS: {
        return {
            ...state,
            loader: false,
            phoneVerified: action.payload
        }
    }	
	
	
    case PASSWORD_CHANGE_SUCCESS: {
        return {
            ...state,
            loader: false,
            passwordChanged: action.payload
        }
    }	
    case CLEAR_AUTH_STATE: {
        return {
            ...state,
            loader: false,
            passwordChanged: false,
			tokenSent: false,
			authStateCleared: true
        }
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
        initURL: "/app/dashboard/crypto",
        loader: false,
		phone: '',
		country: '',
		name: '',
		birth: '',
		martial: '',
		gender: ''
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
    default:
      return state;
  }
};
