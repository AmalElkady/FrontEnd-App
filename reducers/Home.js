import {
  FETCH_ALL_COUNTRIES_ONLINE_SUCCESS,
  COUNTRY_CITIES_ONLINE_SUCCESS,
  COUNTRY_AGERANGES_ONLONE_SUCCESS,
  AGERANGE_COUNTRIES_ONLINE_SUCCESS,
  COUNTRY_CITIES_AGERANGE_ONLINE_SUCCESS,
  COUNTRY_CITY_AGERANGES_ONLINE_SUCCESS,
  ALL_COUNTRIES_SELECTED_ONLINE_SECCUSS,
  AGERANGE_ALL_COUNTRIES_SELECTED_ONLINE_SUCCESS,
  REQUEST_PHOTO_READ_SUCCESS,
  ALL_COUNTRIES_OFFLINE_SUCCESS,
  COUNTRY_CITIES_OFFLINE_SUCCESS,
  COUNTRY_RECENT_ACTIVE_USERS_SUCCESS,
  COUNTRY_CITY_RECENT_ACTIVE_USERS_SUCCESS,
  COUNTRY_SELECTED_ONLINE_SUCCESS,
  COUNTRY_CITY_SELECTED_ONLINE_SUCCESS,
  COUNTRY_CITIES_AGERANGE_SELECTED_ONLINE_SUCCESS,
  COUNTRY_CITY_AGERANGE_SELECTED_ONLINE_SUCCESS,
  ALL_COUNTRIES_OFFLINE_USERS_SUCCESS,
  SHOW_MESSAGE
} from "../constants/ActionTypes";
import { calcValueOfSlAndOffset } from "../helpers/calcValueOfSlAndOffset";

const initialHomeState = {
  allCountriesOnline: [],
  countryCitiesOnline: [],
  countryAgerangesOnline: [],
  agerangeCountriesOnline: [],
  countryCitiesAgerangeOnline: [],
  countryCityAgerangesOnline: [],
  allCountriesSelectedOnlineUsers: null,
  AgerangeAllCountriesSelectedOnlineUsers: null,
  countrySelectedOnlineUsers: null,
  countryCitySelectedOnlineUsers: null,
  countryCitiesAgerangeSelectedOnlineUsers: null,
  countryCityAgerangeSelectedOnlineUsers: null,
  allCountriesOffline: null,
  allCountriesOfflineUsers: [],
  allCountriesOfflineUsersTimeScore: [],
  countryCitiesOffline: null,
  countryRecentActiveUsers: null,
  countryCityRecentActiveUsers: null,
  photoReadSignedRequest: null,
  searchState: "active",
  scoreHOffline: "",
  scoreLOffline: "",
  OffsetOfline: 0,
  endOfResult: false,
  selectedCountryIndexForUsers: 0,
  showMessage: false,
  loader: false,
  alertMessage: ""
};

const home = (state = initialHomeState, action) => {
  switch (action.type) {
    case FETCH_ALL_COUNTRIES_ONLINE_SUCCESS:
      return {
        ...state,
        allCountriesOnline: action.payload
      };
    case COUNTRY_CITIES_ONLINE_SUCCESS:
      return {
        ...state,
        countryCitiesOnline: action.payload
      };
    case COUNTRY_AGERANGES_ONLONE_SUCCESS:
      return {
        ...state,
        countryAgerangesOnline: action.payload
      };
    case AGERANGE_COUNTRIES_ONLINE_SUCCESS:
      return {
        ...state,
        agerangeCountriesOnline: action.payload
      };

    case COUNTRY_CITIES_AGERANGE_ONLINE_SUCCESS:
      return {
        ...state,
        countryCitiesAgerangeOnline: action.payload
      };
    case COUNTRY_CITY_AGERANGES_ONLINE_SUCCESS:
      return {
        ...state,
        countryCityAgerangesOnline: action.payload
      };
    case ALL_COUNTRIES_SELECTED_ONLINE_SECCUSS:
      return {
        ...state,
        allCountriesSelectedOnlineUsers: action.payload,
        searchState: "active"
      };

    case AGERANGE_ALL_COUNTRIES_SELECTED_ONLINE_SUCCESS:
      return {
        ...state,
        agerangeAllCountriesSelectedOnlineUsers: action.payload,
        searchState: "active"
      };

    case COUNTRY_SELECTED_ONLINE_SUCCESS:
      return {
        ...state,
        countrySelectedOnlineUsers: action.payload,
        searchState: "active"
      };
    case COUNTRY_CITY_SELECTED_ONLINE_SUCCESS:
      return {
        ...state,
        countryCitySelectedOnlineUsers: action.payload,
        searchState: "active"
      };
    case COUNTRY_CITIES_AGERANGE_SELECTED_ONLINE_SUCCESS:
      return {
        ...state,
        countryCitiesAgerangeSelectedOnlineUsers: action.payload,
        searchState: "active"
      };

    case COUNTRY_CITY_AGERANGE_SELECTED_ONLINE_SUCCESS:
      return {
        ...state,
        countryCityAgerangeSelectedOnlineUsers: action.payload,
        searchState: "active"
      };
    case REQUEST_PHOTO_READ_SUCCESS:
      return {
        ...state,
        photoReadSignedRequest: action.payload
      };
    case ALL_COUNTRIES_OFFLINE_SUCCESS:
      return {
        ...state,
        allCountriesOffline: action.payload
      };

    case ALL_COUNTRIES_OFFLINE_USERS_SUCCESS:
      console.log("action.payload from reducer []", action.payload);
      const { offset, SL } = calcValueOfSlAndOffset(
        action.payload.timeScoreArr
      );
      let end = false;
      if (action.payload.usersArr.length === 0) {
        end = true;
      }
      return {
        ...state,
        allCountriesOfflineUsers: [
          ...state.allCountriesOfflineUsers,
          ...action.payload.usersArr
        ],
        allCountriesOfflineUsersTimeScore: [
          ...state.allCountriesOfflineUsersTimeScore,
          ...action.payload.timeScoreArr
        ],
        OffsetOfline: offset,
        scoreLOffline: SL,
        endOfResult: end,
        searchState: "most recent"
      };
    case COUNTRY_CITIES_OFFLINE_SUCCESS:
      return {
        ...state,
        countryCitiesOffline: action.payload
      };
    case COUNTRY_RECENT_ACTIVE_USERS_SUCCESS:
      return {
        ...state,
        countryRecentActiveUsers: action.payload,
        searchState: "most recent"
      };
    case COUNTRY_CITY_RECENT_ACTIVE_USERS_SUCCESS:
      return {
        ...state,
        countryCityRecentActiveUsers: action.payload,
        searchState: "most recent"
      };
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
