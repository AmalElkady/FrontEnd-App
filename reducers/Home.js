import {
  FETCH_ALL_COUNTRIES_ONLINE_SUCCESS,
  COUNTRY_CITIES_ONLINE_SUCCESS,
  COUNTRY_AGERANGES_ONLONE_SUCCESS,
  AGERANGE_COUNTRIES_ONLINE_SUCCESS,
  COUNTRY_CITIES_AGERANGE_ONLINE_SUCCESS,
  COUNTRY_CITY_AGERANGES_ONLINE_SUCCESS,
  ALL_COUNTRIES_SELECTED_ONLINE_SECCUSS,
  REQUEST_PHOTO_READ_SUCCESS,
  ALL_COUNTRIES_OFFLINE_SUCCESS,
  COUNTRY_CITIES_OFFLINE_SUCCESS,
  COUNTRY_RECENT_ACTIVE_USERS_SUCCESS,
  COUNTRY_CITY_RECENT_ACTIVE_USERS_SUCCESS
} from "../constants/ActionTypes";

const initialHomeState = {
  allCountriesOnline: [],
  countryCitiesOnline: [],
  countryAgerangesOnline: [],
  agerangeCountriesOnline: [],
  countryCitiesAgerangeOnline: [],
  countryCityAgerangesOnline: [],
  allCountriesSelectedOnlineUsers: null,
  allCountriesOffline: null,
  countryCitiesOffline: null,
  countryRecentActiveUsers: null,
  countryCityRecentActiveUsers: null,
  photoReadSignedRequest: null,
  searchState: "active"
  // countrySelected: false
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
      console.log(
        "COUNTRY_CITY_RECENT_ACTIVE_USERS_SUCCESS from reducer :",
        action.payload
      );
      return {
        ...state,
        countryCityRecentActiveUsers: action.payload,
        searchState: "most recent"
      };
    default:
      return state;
  }
};

export default home;
