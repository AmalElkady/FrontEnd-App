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
  RESET_END_RES_USERS,
  RESET_STATES_ONLINE,
  SELECTED_AGERANGE_INDEX,
  SELECTED_COUNTRY_INDEX,
  SELECTED_CITY_INDEX
} from "../constants/ActionTypes";

// Age Range
export const countryAgerangesOnline = country => {
  return {
    type: COUNTRY_AGERANGES_ONLONE,
    payload: country
  };
};

export const countryAgerangesOnlineSuccess = data => {
  return {
    type: COUNTRY_AGERANGES_ONLONE_SUCCESS,
    payload: data
  };
};

export const countryCityAgerangesOnline = (country, city) => {
  return {
    type: COUNTRY_CITY_AGERANGES_ONLINE,
    payload: { country, city }
  };
};

export const fetchCountryCityAgerangesOnlineSuccess = data => {
  return {
    type: COUNTRY_CITY_AGERANGES_ONLINE_SUCCESS,
    payload: data
  };
};

// Countries
export const allCountriesOnline = () => {
  return {
    type: GET_ALL_COUNTRIES_ONLINE
  };
};

export const fetchCountriesOnlineSuccess = data => {
  return {
    type: FETCH_ALL_COUNTRIES_ONLINE_SUCCESS,
    payload: data
  };
};
export const agerangeCountriesOnline = agerange => {
  return {
    type: AGERANGE_COUNTRIES_ONLINE,
    payload: agerange
  };
};

export const agerangeCountriesOnlineSuccess = data => {
  return {
    type: AGERANGE_COUNTRIES_ONLINE_SUCCESS,
    payload: data
  };
};

/// Cities
export const countryCitiesOnline = country => {
  return {
    type: COUNTRY_CITIES_ONLINE,
    payload: country
  };
};

export const fetchCountryCitiesOnlineSuccess = data => {
  return {
    type: COUNTRY_CITIES_ONLINE_SUCCESS,
    payload: data
  };
};
export const countryCitiesAgerangeOnline = (country, agerange) => {
  return {
    type: COUNTRY_CITIES_AGERANGE_ONLINE,
    payload: { country, agerange }
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
  console.log(
    "agerangeAllCountriesSelectedOnline from action",
    agerange,
    SH,
    offset
  );
  return {
    type: AGERANGE_ALL_COUNTRIES_SELECTED_ONLINE,
    payload: { agerange, SH, offset }
  };
};
export const fetchAgerangeAllCountriesSelectedOnlineSuccess = data => {
  console.log(
    "returned users AgerangeAllCountriesSelectedOnline from action ",
    data
  );
  return {
    type: AGERANGE_ALL_COUNTRIES_SELECTED_ONLINE_SUCCESS,
    payload: data
  };
};

///// users
export const selectedOnlineUsers = (option, SH, offset) => {
  console.log("option from action ", option, SH, offset);
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
  console.log("countrySelectedOnline from action", country, SH, offset);
  return {
    type: COUNTRY_SELECTED_ONLINE,
    payload: { country, SH, offset }
  };
};
export const fetchCountrySelectedOnlineSuccess = data => {
  console.log("returned users COUNTRY_SELECTED_ONLINE from action ", data);
  return {
    type: COUNTRY_SELECTED_ONLINE_SUCCESS,
    payload: data
  };
};

export const countryCitySelectedOnline = (country, city, SH, offset) => {
  console.log(
    "countryCitySelectedOnline from action",
    country,
    city,
    SH,
    offset
  );
  return {
    type: COUNTRY_CITY_SELECTED_ONLINE,
    payload: { country, city, SH, offset }
  };
};
export const fetchCountryCitySelectedOnlineSuccess = data => {
  console.log("returned users COUNTRY_City_SELECTED_ONLINE from action ", data);
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
  console.log(
    "COUNTRY_CITIES_AGERANGE_SELECTED_ONLINE from action",
    country,
    agerange,
    SH,
    offset
  );
  return {
    type: COUNTRY_CITIES_AGERANGE_SELECTED_ONLINE,
    payload: { country, agerange, SH, offset }
  };
};
export const fetchCountryCitiesAgerangeSelectedOnlineSuccess = data => {
  console.log(
    "returned users COUNTRY_CITIES_AGERANGE_SELECTED_ONLINE from action ",
    data
  );
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
  console.log(
    "COUNTRY_CITY_AGERANGE_SELECTED_ONLINE from action",
    country,
    city,
    agerange,
    SH,
    offset
  );
  return {
    type: COUNTRY_CITY_AGERANGE_SELECTED_ONLINE,
    payload: { country, city, agerange, SH, offset }
  };
};
export const fetchCountryCityAgerangeSelectedOnlineSuccess = data => {
  console.log(
    "returned users COUNTRY_CITIES_AGERANGE_SELECTED_ONLINE from action ",
    data
  );
  return {
    type: COUNTRY_CITY_AGERANGE_SELECTED_ONLINE_SUCCESS,
    payload: data
  };
};

export const requestPhotoRead = () => {
  console.log("REQUEST_PHOTO_READ from action ");
  return {
    type: REQUEST_PHOTO_READ
  };
};

export const requestPhotoReadSuccess = data => {
  console.log("REQUEST_PHOTO_READ_SUCCESS from action ");
  return {
    type: REQUEST_PHOTO_READ_SUCCESS,
    payload: data
  };
};

/// most recent

export const allCountriesOffline = () => {
  console.log("ALL_COUNTRIES_OFFLINE from action ");
  return {
    type: ALL_COUNTRIES_OFFLINE
  };
};

export const allCountriesOfflineSuccess = data => {
  console.log("ALL_COUNTRIES_OFFLINE_SUCCESS from action ");
  return {
    type: ALL_COUNTRIES_OFFLINE_SUCCESS,
    payload: data
  };
};

export const allCountriesOfflineUsers = (country, SL, offset) => {
  console.log("ALL_COUNTRIES_OFFLINEUsers from action ", country, SL, offset);
  return {
    type: ALL_COUNTRIES_OFFLINE_USERS,
    payload: { country, SL, offset }
  };
};

export const allCountriesOfflineUsersSuccess = data => {
  console.log("ALL_COUNTRIES_OFFLINE_USERS_SUCCESS from action ", data);
  return {
    type: ALL_COUNTRIES_OFFLINE_USERS_SUCCESS,
    payload: data
  };
};

export const countryCitiesOffline = country => {
  console.log("COUNTRY_CITIES_OFFLINE from action ");
  return {
    type: COUNTRY_CITIES_OFFLINE,
    payload: country
  };
};

export const fetchCountryCitiesOfflineSuccess = data => {
  console.log("COUNTRY_CITIES_OFFLINE_SUCCESS from action ");
  return {
    type: COUNTRY_CITIES_OFFLINE_SUCCESS,
    payload: data
  };
};

export const countryRecentActiveUsers = (country, SL, SH, offset) => {
  console.log(
    "country_recent_active_users from action :",
    country,
    SL,
    SH,
    offset
  );
  return {
    type: COUNTRY_RECENT_ACTIVE_USERS,
    payload: { country, SL, SH, offset }
  };
};

export const fetchCountryRecentActiveUsersSuccess = data => {
  console.log("COUNTRY_RECENT_ACTIVE_USERS_SUCCESS from action :", data);
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

export const resetEndRes = () => {
  return {
    type: RESET_END_RES
  };
};

export const resetEndResUsers = () => {
  return {
    type: RESET_END_RES_USERS
  };
};
