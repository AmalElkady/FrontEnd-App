import {
  FETCH_ALL_COUNTRIES_ONLINE_SUCCESS,
  COUNTRY_CITIES_ONLINE_SUCCESS,
  COUNTRY_AGERANGES_ONLONE_SUCCESS,
  AGERANGE_COUNTRIES_ONLINE_SUCCESS,
  COUNTRY_CITIES_AGERANGE_ONLINE_SUCCESS,
  COUNTRY_CITY_AGERANGES_ONLINE_SUCCESS,
  ALL_COUNTRIES_SELECTED_ONLINE_SUCCESS,
  ALL_COUNTRIES_SELECTED_ONLINE_USERS_SUCCESS,
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
  SHOW_MESSAGE,
  RESET_STATES,
  RESET_END_RES,
  RESET_END_RES_USERS,
  SELECTED_ONLINE_USERS_SUCCESS,
  RESET_STATES_ONLINE,
  SELECTED_AGERANGE_INDEX,
  SELECTED_COUNTRY_INDEX,
  SELECTED_CITY_INDEX
} from "../constants/ActionTypes";
import { calcValueOfSlAndOffset } from "../helpers/calcValueOfSlAndOffset";
import { convertListToTwoArrays } from "../helpers/convertListToTwoArrays";

const initialHomeState = {
  //online dropdown
  allCountriesOnline: [],
  countryCitiesOnline: [],
  countryAgerangesOnline: [],
  agerangeCountriesOnline: [],
  countryCitiesAgerangeOnline: [],
  countryCityAgerangesOnline: [],

  // online selected
  allCountriesSelectedOnline: [],
  allCountriesSelectedOnlineCount: [],
  currentIndexAllCountriesSelectedOnline: 0,

  allCountriesSelectedOnlineUsers: [],
  allCountriesSelectedOnlineUsersTimeScore: [],
  OffsetOnline: 0,
  scoreLOnline: 0,
  OffsetOnlineUsers: 0,
  scoreLOnlineUsers: "",
  //users
  selectedOnlineUsers: [],
  selectedOnlineUsersTimeScore: [],
  currentIndexSelectedOnline: 0,
  //
  agerangeAllCountriesSelectedOnline: [],
  agerangeAllCountriesSelectedOnlineCount: [],

  countrySelectedOnline: [],
  countrySelectedOnlineCount: [],

  countryCitySelectedOnline: [],
  countryCitySelectedOnlineCount: [],

  countryCitiesAgerangeSelectedOnline: [],
  countryCitiesAgerangeSelectedOnlineCount: [],

  countryCityAgerangeSelectedOnline: [],
  countryCityAgerangeSelectedOnlineCount: [],
  //offline
  allCountriesOffline: null,
  allCountriesOfflineUsers: [],
  allCountriesOfflineUsersTimeScore: [],
  countryCitiesOffline: null,
  countryRecentActiveUsers: [],
  countryRecentActiveUsersTimescore: [],
  countryCityRecentActiveUsers: [],
  countryCityRecentActiveUsersTimescore: [],
  scoreHOffline: "",
  scoreLOffline: "",
  OffsetOfline: 0,
  //
  ageRangeSelectedIndex: 0,
  countrySelectedIndex: 0,
  citySelectedIndex: 0,
  photoReadSignedRequest: null,
  searchState: "active",
  endOfResult: false,
  endOfResultUsers: false,
  limitCount: 5,
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
    case ALL_COUNTRIES_SELECTED_ONLINE_SUCCESS: {
      if (action.payload.scoreArr.length >= state.limitCount) {
        const { offset, SL } = calcValueOfSlAndOffset(action.payload.scoreArr);
        state.OffsetOnline = offset;
        state.scoreLOnline = SL;
      } else {
        state.OffsetOnline = "0";
        state.scoreLOnline = "0";
      }

      if (action.payload.usersArr.length == 0) {
        state.endOfResult = true;
      }
      return {
        ...state,
        allCountriesSelectedOnline: [
          ...state.allCountriesSelectedOnline,
          ...action.payload.usersArr
        ],
        allCountriesSelectedOnlineCount: [
          ...state.allCountriesSelectedOnlineCount,
          ...action.payload.scoreArr
        ],
        searchState: "active"
      };
    }
    case ALL_COUNTRIES_SELECTED_ONLINE_USERS_SUCCESS: {
      const { offset, SL } = calcValueOfSlAndOffset(action.payload.scoreArr);

      if (
        action.payload.usersArr.length == 0 &&
        state.allCountriesSelectedOnline.length > 1
      ) {
        state.endOfResultUsers = true;
        state.currentIndexAllCountriesSelectedOnline++;
      }
      return {
        ...state,
        allCountriesSelectedOnlineUsers: [
          ...state.allCountriesSelectedOnlineUsers,
          ...action.payload.usersArr
        ],
        allCountriesSelectedOnlineUsersTimeScore: [
          ...state.allCountriesSelectedOnlineUsersTimeScore,
          ...action.payload.scoreArr
        ],
        searchState: "active",
        OffsetOnlineUsers: offset,
        scoreLOnlineUsers: SL
      };
    }
    case AGERANGE_ALL_COUNTRIES_SELECTED_ONLINE_SUCCESS: {
      const { offset, SL } = calcValueOfSlAndOffset(action.payload.scoreArr);
      if (action.payload.usersArr.length == 0) {
        state.endOfResult = true;
      }
      return {
        ...state,
        agerangeAllCountriesSelectedOnline: [
          ...state.agerangeAllCountriesSelectedOnline,
          ...action.payload.usersArr
        ],
        agerangeAllCountriesSelectedOnlineCount: [
          ...state.agerangeAllCountriesSelectedOnlineCount,
          ...action.payload.scoreArr
        ],
        searchState: "active",
        OffsetOnline: offset,
        scoreLOnline: SL
      };
    }
    case SELECTED_ONLINE_USERS_SUCCESS: {
      const { offset, SL } = calcValueOfSlAndOffset(action.payload.scoreArr);
      if (action.payload.usersArr.length == 0) {
        if (
          state.agerangeAllCountriesSelectedOnline.length > 1 ||
          state.countrySelectedOnline.length > 1 ||
          state.countryCitySelectedOnline.length > 1 ||
          state.countryCitiesAgerangeSelectedOnline.length > 1 ||
          state.countryCityAgerangeSelectedOnline.length > 1
        ) {
          state.endOfResultUsers = true;
          state.currentIndexSelectedOnline++;
        }
      }
      return {
        ...state,
        selectedOnlineUsers: [
          ...state.selectedOnlineUsers,
          ...action.payload.usersArr
        ],
        selectedOnlineUsersTimeScore: [
          ...state.selectedOnlineUsersTimeScore,
          ...action.payload.scoreArr
        ],
        searchState: "active",
        OffsetOnlineUsers: offset,
        scoreLOnlineUsers: SL
      };
    }

    case COUNTRY_SELECTED_ONLINE_SUCCESS: {
      if (action.payload.scoreArr.length >= state.limitCount) {
        const { offset, SL } = calcValueOfSlAndOffset(action.payload.scoreArr);
        state.OffsetOnline = offset;
        state.scoreLOnline = SL;
      } else {
        state.OffsetOnline = "0";
        state.scoreLOnline = "0";
      }
      if (action.payload.usersArr.length == 0) {
        state.endOfResult = true;
      }
      return {
        ...state,
        countrySelectedOnline: [
          ...state.countrySelectedOnline,
          ...action.payload.usersArr
        ],
        countrySelectedOnlineCount: [
          ...state.countrySelectedOnlineCount,
          ...action.payload.scoreArr
        ],
        searchState: "active"
      };
    }
    case COUNTRY_CITY_SELECTED_ONLINE_SUCCESS: {
      const { offset, SL } = calcValueOfSlAndOffset(action.payload.scoreArr);
      if (action.payload.usersArr.length == 0) {
        state.endOfResult = true;
      }
      return {
        ...state,
        countryCitySelectedOnline: [
          ...state.countryCitySelectedOnline,
          ...action.payload.usersArr
        ],
        countryCitySelectedOnlineCount: [
          ...state.countryCitySelectedOnlineCount,
          ...action.payload.usersArr
        ],
        searchState: "active",
        OffsetOnline: offset,
        scoreLOnline: SL
      };
    }

    case COUNTRY_CITIES_AGERANGE_SELECTED_ONLINE_SUCCESS: {
      const { offset, SL } = calcValueOfSlAndOffset(action.payload.scoreArr);
      if (action.payload.usersArr.length == 0) {
        state.endOfResult = true;
      }
      return {
        ...state,
        countryCitiesAgerangeSelectedOnline: [
          ...state.countryCitiesAgerangeSelectedOnline,
          ...action.payload.usersArr
        ],
        countryCitiesAgerangeSelectedOnlineCount: [
          ...state.countryCitiesAgerangeSelectedOnlineCount,
          ...action.payload.usersArr
        ],
        searchState: "active",
        OffsetOnline: offset,
        scoreLOnline: SL
      };
    }
    case COUNTRY_CITY_AGERANGE_SELECTED_ONLINE_SUCCESS: {
      const { offset, SL } = calcValueOfSlAndOffset(action.payload.scoreArr);
      if (action.payload.usersArr.length == 0) {
        state.endOfResult = true;
      }
      return {
        ...state,
        countryCityAgerangeSelectedOnline: [
          ...state.countryCityAgerangeSelectedOnline,
          ...action.payload.usersArr
        ],
        countryCityAgerangeSelectedOnlineCount: [
          ...state.countryCityAgerangeSelectedOnlineCount,
          ...action.payload.usersArr
        ],
        searchState: "active",
        OffsetOnline: offset,
        scoreLOnline: SL
      };
    }
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

    case ALL_COUNTRIES_OFFLINE_USERS_SUCCESS: {
      let { offset, SL } = calcValueOfSlAndOffset(action.payload.scoreArr);
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
          ...action.payload.scoreArr
        ],
        OffsetOfline: offset,
        scoreLOffline: SL,
        endOfResult: end,
        searchState: "most recent"
      };
    }
    case COUNTRY_CITIES_OFFLINE_SUCCESS:
      return {
        ...state,
        countryCitiesOffline: action.payload
      };
    case COUNTRY_RECENT_ACTIVE_USERS_SUCCESS: {
      const mapedList = convertListToTwoArrays(action.payload);
      console.log("usersArr, timeScoreArr from reducer", mapedList);
      const { offset, SL } = calcValueOfSlAndOffset(mapedList.scoreArr);
      let end = false;
      if (mapedList.usersArr.length === 0) {
        end = true;
      }
      return {
        ...state,
        countryRecentActiveUsers: [
          ...state.countryRecentActiveUsers,
          ...mapedList.usersArr
        ],
        countryRecentActiveUsersTimescore: [
          ...state.countryRecentActiveUsersTimescore,
          ...mapedList.scoreArr
        ],
        OffsetOfline: offset,
        scoreLOffline: SL,
        endOfResult: end,
        searchState: "most recent"
      };
    }
    case COUNTRY_CITY_RECENT_ACTIVE_USERS_SUCCESS:
      const mapedList = convertListToTwoArrays(action.payload);
      console.log(
        "usersArr, timeScoreArr COUNTRY_CITY from reducer",
        mapedList
      );
      const { offset, SL } = calcValueOfSlAndOffset(mapedList.scoreArr);
      let end = false;
      if (mapedList.usersArr.length === 0) {
        end = true;
      }
      return {
        ...state,
        countryCityRecentActiveUsers: [
          ...state.countryCityRecentActiveUsers,
          ...mapedList.usersArr
        ],
        countryCityRecentActiveUsersTimescore: [
          ...state.countryCityRecentActiveUsersTimescore,
          ...mapedList.scoreArr
        ],
        countryRecentActiveUsers: [],
        countryRecentActiveUsersTimescore: [],
        OffsetOfline: offset,
        scoreLOffline: SL,
        endOfResult: end,
        searchState: "most recent"
      };
    case SELECTED_AGERANGE_INDEX:
      return {
        ...state,
        ageRangeSelectedIndex: action.payload
      };
    case SELECTED_COUNTRY_INDEX:
      return {
        ...state,
        ageRangeSelectedIndex: action.payload
      };

    case SELECTED_CITY_INDEX:
      return {
        ...state,
        citySelectedIndex: action.payload
      };
    case RESET_STATES:
      return {
        ...state,
        scoreLOffline: "",
        OffsetOfline: 0,
        endOfResult: false,
        searchState: "active"
        // allCountriesOfflineUsers: [],
        // allCountriesOfflineUsersTimeScore: []
      };
    case RESET_STATES_ONLINE:
      console.log("rest state online");
      return {
        ...state,
        selectedOnlineUsers: [],
        selectedOnlineUsersTimeScore: [],
        currentIndexSelectedOnline: 0,
        agerangeAllCountriesSelectedOnline: [],
        agerangeAllCountriesSelectedOnlineCount: [],
        countrySelectedOnline: [],
        countrySelectedOnlineCount: [],
        countryCitySelectedOnline: [],
        countryCitySelectedOnlineCount: [],
        countryCitiesAgerangeSelectedOnline: [],
        countryCitiesAgerangeSelectedOnlineCount: [],
        countryCityAgerangeSelectedOnline: [],
        countryCityAgerangeSelectedOnlineCount: []
      };
    case RESET_END_RES_USERS:
      console.log("rest end users");
      return {
        ...state,
        endOfResultUsers: false
      };

    case RESET_END_RES:
      console.log("rest end");
      return {
        ...state,
        endOfResult: false
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
