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
  COUNTRY_CITY_SELECTED_ONLINE_SUCCESS
} from "../constants/ActionTypes";

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
