import {
  COUNTRY_AGERANGES_ONLONE,
  COUNTRY_AGERANGES_ONLONE_SUCCESS,
  GET_ALL_COUNTRIES_ONLINE,
  FETCH_ALL_COUNTRIES_ONLINE_SUCCESS,
  AGERANGE_COUNTRIES_ONLINE,
  AGERANGE_COUNTRIES_ONLINE_SUCCESS,
  COUNTRY_CITIES_ONLINE,
  COUNTRY_CITIES_ONLINE_SUCCESS,
  COUNTRY_CITIES_AGERANGE_ONLINE,
  COUNTRY_CITIES_AGERANGE_ONLINE_SUCCESS,
  COUNTRY_CITY_AGERANGES_ONLINE,
  COUNTRY_CITY_AGERANGES_ONLINE_SUCCESS,
  ALL_COUNTRIES_SELECTED_ONLINE,
  ALL_COUNTRIES_SELECTED_ONLINE_SUCCESS,
  ALL_COUNTRIES_SELECTED_ONLINE_USERS,
  ALL_COUNTRIES_SELECTED_ONLINE_USERS_SUCCESS,
  REQUEST_PHOTO_READ,
  REQUEST_PHOTO_READ_SUCCESS,
  ALL_COUNTRIES_OFFLINE,
  ALL_COUNTRIES_OFFLINE_SUCCESS,
  ALL_COUNTRIES_OFFLINE_SCROLL,
  ALL_COUNTRIES_OFFLINE_SCROLL_SUCCESS,
  COUNTRY_CITIES_OFFLINE,
  COUNTRY_CITIES_OFFLINE_SUCCESS,
  COUNTRY_RECENT_ACTIVE_USERS,
  COUNTRY_RECENT_ACTIVE_USERS_SUCCESS,
  COUNTRY_CITY_RECENT_ACTIVE_USERS,
  COUNTRY_CITY_RECENT_ACTIVE_USERS_SUCCESS,
  AGERANGE_ALL_COUNTRIES_SELECTED_ONLINE,
  AGERANGE_ALL_COUNTRIES_SELECTED_ONLINE_SUCCESS,
  SELECTED_ONLINE_USERS,
  SELECTED_ONLINE_USERS_SUCCESS,
  COUNTRY_SELECTED_ONLINE,
  COUNTRY_SELECTED_ONLINE_SUCCESS,
  COUNTRY_CITY_SELECTED_ONLINE,
  COUNTRY_CITY_SELECTED_ONLINE_SUCCESS,
  COUNTRY_CITIES_AGERANGE_SELECTED_ONLINE,
  COUNTRY_CITIES_AGERANGE_SELECTED_ONLINE_SUCCESS,
  COUNTRY_CITY_AGERANGE_SELECTED_ONLINE,
  COUNTRY_CITY_AGERANGE_SELECTED_ONLINE_SUCCESS,
  ALL_COUNTRIES_OFFLINE_USERS,
  ALL_COUNTRIES_OFFLINE_USERS_SUCCESS,
  SHOW_MESSAGE,
  RESET_STATES,
  RESET_END_RES,
  RESET_END_RES_OF,
  RESET_END_RES_USERS,
  RESET_STATES_ONLINE,
  RESET_STATES_OFFLINE,
  SELECTED_AGERANGE_INDEX,
  SELECTED_COUNTRY_INDEX,
  SELECTED_CITY_INDEX,
  SET_AGE_SCORES,
  SET_SEARCH_STATE,
  RESET_STATES_LIST_COUNTRY_ONLINE,
  RESET_STATES_LIST_AGERANGE_ONLINE,
  RESET_STATES_LIST_CITY_ONLINE,
  SELECTED_HEADER_ICON,
  RESET_SEARCH_FLAG,
  NOTIFI_ACTION_DONE,
  NOTIFI_MSG_ACTION_DONE,
  PUSHER_ACTION_DONE,
  PROFILE_USER_CLICKED,
  RESET_END_RES_USERS_OF
} from "../constants/ActionTypes";

// Age Range
export const countryAgerangesOnline = (country, SL, offset) => {
  return {
    type: COUNTRY_AGERANGES_ONLONE,
    payload: { country, SL, offset }
  };
};

export const countryAgerangesOnlineSuccess = data => {
  return {
    type: COUNTRY_AGERANGES_ONLONE_SUCCESS,
    payload: data
  };
};

export const countryCityAgerangesOnline = (country, city, SL, offset) => {
  return {
    type: COUNTRY_CITY_AGERANGES_ONLINE,
    payload: { country, city, SL, offset }
  };
};

export const fetchCountryCityAgerangesOnlineSuccess = data => {
  return {
    type: COUNTRY_CITY_AGERANGES_ONLINE_SUCCESS,
    payload: data
  };
};

// Countries
export const allCountriesOnline = (SL, offset) => {
  return {
    type: GET_ALL_COUNTRIES_ONLINE,
    payload: { SL, offset }
  };
};

export const fetchCountriesOnlineSuccess = data => {
  return {
    type: FETCH_ALL_COUNTRIES_ONLINE_SUCCESS,
    payload: data
  };
};
export const agerangeCountriesOnline = (agerange, SL, offset) => {
  return {
    type: AGERANGE_COUNTRIES_ONLINE,
    payload: { agerange, SL, offset }
  };
};

export const agerangeCountriesOnlineSuccess = data => {
  return {
    type: AGERANGE_COUNTRIES_ONLINE_SUCCESS,
    payload: data
  };
};

/// Cities
export const countryCitiesOnline = (country, SL, offset) => {
  return {
    type: COUNTRY_CITIES_ONLINE,
    payload: { country, SL, offset }
  };
};

export const fetchCountryCitiesOnlineSuccess = data => {
  return {
    type: COUNTRY_CITIES_ONLINE_SUCCESS,
    payload: data
  };
};
export const countryCitiesAgerangeOnline = (country, agerange, SL, offset) => {
  return {
    type: COUNTRY_CITIES_AGERANGE_ONLINE,
    payload: { country, agerange, SL, offset }
  };
};

export const fetchCountryCitiesAgerangeOnlineSuccess = data => {
  return {
    type: COUNTRY_CITIES_AGERANGE_ONLINE_SUCCESS,
    payload: data
  };
};

// Users Profiles
export const allCountriesSelectedOnline = (SH, offset) => {
  return {
    type: ALL_COUNTRIES_SELECTED_ONLINE,
    payload: { SH, offset }
  };
};
export const fetchAllCountriesSelectedOnlineSuccess = data => {
  return {
    type: ALL_COUNTRIES_SELECTED_ONLINE_SUCCESS,
    payload: data
  };
};

export const allCountriesSelectedOnlineUsers = (option, SH, offset) => {
  return {
    type: ALL_COUNTRIES_SELECTED_ONLINE_USERS,
    payload: { option, SH, offset }
  };
};
export const fetchAllCountriesSelectedOnlineUsersSuccess = data => {
  return {
    type: ALL_COUNTRIES_SELECTED_ONLINE_USERS_SUCCESS,
    payload: data
  };
};

export const agerangeAllCountriesSelectedOnline = (agerange, SH, offset) => {
  return {
    type: AGERANGE_ALL_COUNTRIES_SELECTED_ONLINE,
    payload: { agerange, SH, offset }
  };
};
export const fetchAgerangeAllCountriesSelectedOnlineSuccess = data => {
  return {
    type: AGERANGE_ALL_COUNTRIES_SELECTED_ONLINE_SUCCESS,
    payload: data
  };
};

///// users
export const selectedOnlineUsers = (option, SH, offset) => {
  return {
    type: SELECTED_ONLINE_USERS,
    payload: { option, SH, offset }
  };
};
export const fetchSelectedOnlineUsersSuccess = data => {
  return {
    type: SELECTED_ONLINE_USERS_SUCCESS,
    payload: data
  };
};
////

export const countrySelectedOnline = (country, SH, offset) => {
  return {
    type: COUNTRY_SELECTED_ONLINE,
    payload: { country, SH, offset }
  };
};
export const fetchCountrySelectedOnlineSuccess = data => {
  return {
    type: COUNTRY_SELECTED_ONLINE_SUCCESS,
    payload: data
  };
};

export const countryCitySelectedOnline = (country, city, SH, offset) => {
  return {
    type: COUNTRY_CITY_SELECTED_ONLINE,
    payload: { country, city, SH, offset }
  };
};
export const fetchCountryCitySelectedOnlineSuccess = data => {
  return {
    type: COUNTRY_CITY_SELECTED_ONLINE_SUCCESS,
    payload: data
  };
};

export const countryCitiesAgerangeSelectedOnline = (
  country,
  agerange,
  SH,
  offset
) => {
  return {
    type: COUNTRY_CITIES_AGERANGE_SELECTED_ONLINE,
    payload: { country, agerange, SH, offset }
  };
};
export const fetchCountryCitiesAgerangeSelectedOnlineSuccess = data => {
  return {
    type: COUNTRY_CITIES_AGERANGE_SELECTED_ONLINE_SUCCESS,
    payload: data
  };
};

export const countryCityAgerangeSelectedOnline = (
  country,
  city,
  agerange,
  SH,
  offset
) => {
  return {
    type: COUNTRY_CITY_AGERANGE_SELECTED_ONLINE,
    payload: { country, city, agerange, SH, offset }
  };
};
export const fetchCountryCityAgerangeSelectedOnlineSuccess = data => {
  return {
    type: COUNTRY_CITY_AGERANGE_SELECTED_ONLINE_SUCCESS,
    payload: data
  };
};

export const requestPhotoRead = () => {
  return {
    type: REQUEST_PHOTO_READ
  };
};

export const requestPhotoReadSuccess = data => {
  return {
    type: REQUEST_PHOTO_READ_SUCCESS,
    payload: data
  };
};

/// most recent

export const allCountriesOffline = (SL, offset) => {
  return {
    type: ALL_COUNTRIES_OFFLINE,
    payload: { SL, offset }
  };
};

export const allCountriesOfflineSuccess = data => {
  return {
    type: ALL_COUNTRIES_OFFLINE_SUCCESS,
    payload: data
  };
};

export const allCountriesOfflineScroll = (SL, offset) => {
  return {
    type: ALL_COUNTRIES_OFFLINE_SCROLL,
    payload: { SL, offset }
  };
};

export const allCountriesOfflineScrollSuccess = data => {
  return {
    type: ALL_COUNTRIES_OFFLINE_SCROLL_SUCCESS,
    payload: data
  };
};

export const allCountriesOfflineUsers = (country, SL, offset) => {
  return {
    type: ALL_COUNTRIES_OFFLINE_USERS,
    payload: { country, SL, offset }
  };
};

export const allCountriesOfflineUsersSuccess = data => {
  return {
    type: ALL_COUNTRIES_OFFLINE_USERS_SUCCESS,
    payload: data
  };
};

export const countryCitiesOffline = (country, SL, offset) => {
  return {
    type: COUNTRY_CITIES_OFFLINE,
    payload: { country, SL, offset }
  };
};

export const fetchCountryCitiesOfflineSuccess = data => {
  return {
    type: COUNTRY_CITIES_OFFLINE_SUCCESS,
    payload: data
  };
};

export const countryRecentActiveUsers = (country, SL, SH, offset) => {
  return {
    type: COUNTRY_RECENT_ACTIVE_USERS,
    payload: { country, SL, SH, offset }
  };
};

export const fetchCountryRecentActiveUsersSuccess = data => {
  return {
    type: COUNTRY_RECENT_ACTIVE_USERS_SUCCESS,
    payload: data
  };
};

export const countryCityRecentActiveUsers = (country, city, SL, SH, offset) => {
  return {
    type: COUNTRY_CITY_RECENT_ACTIVE_USERS,
    payload: { country, city, SL, SH, offset }
  };
};

export const fetchCountryCityRecentActiveUsersSuccess = data => {
  return {
    type: COUNTRY_CITY_RECENT_ACTIVE_USERS_SUCCESS,
    payload: data
  };
};

export const showHomeMessage = message => {
  return {
    type: SHOW_MESSAGE,
    payload: message
  };
};

export const selectedAgerangeIndex = index => {
  return {
    type: SELECTED_AGERANGE_INDEX,
    payload: index
  };
};

export const selectedCountryIndex = index => {
  return {
    type: SELECTED_COUNTRY_INDEX,
    payload: index
  };
};

export const selectedCityIndex = index => {
  return {
    type: SELECTED_CITY_INDEX,
    payload: index
  };
};

export const setAgeScores = (SL, SH) => {
  return {
    type: SET_AGE_SCORES,
    payload: { SL, SH }
  };
};
export const setSearchState = searchState => {
  return {
    type: SET_SEARCH_STATE,
    payload: searchState
  };
};

export const resetStates = () => {
  return {
    type: RESET_STATES
  };
};

export const resetStatesOnline = () => {
  return {
    type: RESET_STATES_ONLINE
  };
};

export const resetStatesOffline = () => {
  return {
    type: RESET_STATES_OFFLINE
  };
};

export const resetStatesListCountryOnline = () => {
  return {
    type: RESET_STATES_LIST_COUNTRY_ONLINE
  };
};

export const resetStatesListCityOnline = () => {
  return {
    type: RESET_STATES_LIST_CITY_ONLINE
  };
};

export const resetStatesListAgerangeOnline = () => {
  return {
    type: RESET_STATES_LIST_AGERANGE_ONLINE
  };
};

export const resetEndRes = () => {
  return {
    type: RESET_END_RES
  };
};

export const resetEndResOf = () => {
  return {
    type: RESET_END_RES_OF
  };
};

export const resetEndResUsers = () => {
  return {
    type: RESET_END_RES_USERS
  };
};

export const resetEndResUsersOf = () => {
  return {
    type: RESET_END_RES_USERS_OF
  };
};

export const selectedHeaderIcon = data => {
  return {
    type: SELECTED_HEADER_ICON,
    payload: data
  };
};
export const resetSearchFlag = () => {
  return {
    type: RESET_SEARCH_FLAG
  };
};

export const notifiActionDone = () => {
  return {
    type: NOTIFI_ACTION_DONE
  };
};

export const notifiMsgActionDone = () => {
  return {
    type: NOTIFI_MSG_ACTION_DONE
  };
};

export const pusherActionDone = () => {
  return {
    type: PUSHER_ACTION_DONE
  };
};

export const profileUserClicked = user => {
  return {
    type: PROFILE_USER_CLICKED,
    payload: user
  };
};
