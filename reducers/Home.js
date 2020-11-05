import { FETCH_ALL_COUNTRIES_ONLINE_SUCCESS } from "../constants/ActionTypes";

const initialHomeState = {
  allCountriesOnline: []
};

const home = (state = initialHomeState, action) => {
  switch (action.type) {
    case FETCH_ALL_COUNTRIES_ONLINE_SUCCESS:
      return {
        ...state,
        allCountriesOnline: action.payload
      };
    default:
      return state;
  }
};

export default home;
