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
  ALL_COUNTRIES_SELECTED_ONLINE_SECCUSS,
  REQUEST_PHOTO_READ,
  REQUEST_PHOTO_READ_SUCCESS,
  ALL_COUNTRIES_OFFLINE,
  ALL_COUNTRIES_OFFLINE_SUCCESS,
  COUNTRY_CITIES_OFFLINE,
  COUNTRY_CITIES_OFFLINE_SUCCESS
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
export const allCountriesSelectedOnline = () => {
  console.log("all_countries_selected_online from action ");
  return {
    type: ALL_COUNTRIES_SELECTED_ONLINE
  };
};
export const fetchAllCountriesSelectedOnlineSuccess = data => {
  console.log(
    "returned users all_countries_selected_online from action ",
    data
  );
  return {
    type: ALL_COUNTRIES_SELECTED_ONLINE_SECCUSS,
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

export const showHomeMessage = message => {
  return {
    type: SHOW_MESSAGE,
    payload: message
  };
};
