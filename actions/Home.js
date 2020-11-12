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
  ALL_COUNTRIES_SELECTED_ONLINE_SECCUSS
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
  console.log("country and city selected from action ", country, city);
  return {
    type: COUNTRY_CITY_AGERANGES_ONLINE,
    payload: { country, city }
  };
};

export const fetchCountryCityAgerangesOnlineSuccess = data => {
  console.log("returned ageranges of country and city from action ", data);
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
  console.log("ageRange selected for countries from action ", agerange);
  return {
    type: AGERANGE_COUNTRIES_ONLINE,
    payload: agerange
  };
};

export const agerangeCountriesOnlineSuccess = data => {
  console.log("countries returned from agerange action again", data);
  return {
    type: AGERANGE_COUNTRIES_ONLINE_SUCCESS,
    payload: data
  };
};

/// Cities
export const countryCitiesOnline = country => {
  console.log("country selected from action ", country);
  return {
    type: COUNTRY_CITIES_ONLINE,
    payload: country
  };
};

export const fetchCountryCitiesOnlineSuccess = data => {
  console.log("returned cities from action ", data);
  return {
    type: COUNTRY_CITIES_ONLINE_SUCCESS,
    payload: data
  };
};
export const countryCitiesAgerangeOnline = (country, agerange) => {
  console.log("country and agerange selected from action ", country, agerange);
  return {
    type: COUNTRY_CITIES_AGERANGE_ONLINE,
    payload: { country, agerange }
  };
};

export const fetchCountryCitiesAgerangeOnlineSuccess = data => {
  console.log("returned cities of country and age from action ", data);
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

export const showHomeMessage = message => {
  return {
    type: SHOW_MESSAGE,
    payload: message
  };
};
