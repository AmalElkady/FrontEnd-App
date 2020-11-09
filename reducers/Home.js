import {
  FETCH_ALL_COUNTRIES_ONLINE_SUCCESS,
  COUNTRY_CITIES_ONLINE_SUCCESS,
  COUNTRY_AGERANGES_ONLONE_SUCCESS,
  AGERANGE_COUNTRIES_ONLINE_SUCCESS,
  COUNTRY_CITIES_AGERANGE_ONLINE_SUCCESS
} from "../constants/ActionTypes";

const initialHomeState = {
  allCountriesOnline: [],
  countryCitiesOnline: [],
  countryAgerangesOnline: [],
  agerangeCountriesOnline: [],
  countryCitiesAgerangeOnline: []
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
    default:
      return state;
  }
};

export default home;
