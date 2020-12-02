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
  ALL_COUNTRIES_OFFLINE_SCROLL_SUCCESS,
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
  RESET_END_RES_OF,
  RESET_END_RES_USERS,
  RESET_END_RES_USERS_OF,
  SELECTED_ONLINE_USERS_SUCCESS,
  RESET_STATES_ONLINE,
  RESET_STATES_OFFLINE,
  SELECTED_AGERANGE_INDEX,
  SELECTED_COUNTRY_INDEX,
  SELECTED_CITY_INDEX,
  SET_AGE_SCORES,
  RESET_STATES_LIST_COUNTRY_ONLINE,
  RESET_STATES_LIST_AGERANGE_ONLINE,
  RESET_STATES_LIST_CITY_ONLINE
} from "../constants/ActionTypes";
import { calcValueOfSlAndOffset } from "../helpers/calcValueOfSlAndOffset";

const initialHomeState = {
  //online dropdown
  allCountriesOnline: [],
  allCountriesOnlineCount: [],

  agerangeCountriesOnline: [],
  agerangeCountriesOnlineCount: [],

  countryCitiesOnline: [],
  countryCitiesOnlineCount: [],

  countryCitiesAgerangeOnline: [],
  countryCitiesAgerangeOnlineCount: [],

  countryAgerangesOnline: [],
  countryAgerangesOnlineCount: [],

  countryCityAgerangesOnline: [],

  endOfResultOnCo: false, // for country list
  scoreLOnlineCo: "",
  OffsetonlineCo: 0,
  endOfResultOnCi: false, // for city list
  scoreLOnlineCi: "",
  OffsetOnlineCi: 0,
  endOfResultOnAge: false, //for agerange list
  scoreLOnlineAge: "",
  OffsetOnlineAge: 0,

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

  endOfResult: false,
  endOfResultUsers: false,

  //offline
  allCountriesOffline: [],
  allCountriesOfflineCount: [],

  allCountriesOfflineUsers: [],
  allCountriesOfflineUsersTimeScore: [],

  countryCitiesOffline: [],
  countryCitiesOfflineCount: [],

  countryRecentActiveUsers: [],
  countryRecentActiveUsersTimescore: [],

  countryCityRecentActiveUsers: [],
  countryCityRecentActiveUsersTimescore: [],
  //////
  endOfResultCo: false, // for country list
  scoreLOfflineCo: 0,
  OffsetOfflineCo: 0,
  endOfResultCi: false, // for city list
  scoreLOfflineCi: "",
  OffsetOfflineCi: 0,

  /////
  // for all countries list of users
  scoreLOffline: "",
  OffsetOffline: 0,
  endOfResultOf: false,
  allCountriesOfflineScroll: [],
  allCountriesOfflineScrollcount: [],
  currentIndexAllCountriesOffline: 0,

  scoreLOfflineUsers: "", // for all offline users
  OffsetOflineUsers: 0,
  endOfResultUsersOf: false,

  scoreHOfflineUsersS: "", // for offline users search
  //scoreLOfflineUsersS: "",
  OffsetOflineUsersS: 0,
  endOfResultUsersOfS: false, //for search

  ageScoreL: 0,
  ageScoreH: 0,
  ////
  ageRangeSelectedIndex: -1,
  countrySelectedIndex: -1,
  citySelectedIndex: -1,

  photoReadSignedRequest: null,
  searchState: "active",
  limitCount: 5,
  showMessage: false,
  loader: false,
  alertMessage: ""
};

const home = (state = initialHomeState, action) => {
  switch (action.type) {
    case FETCH_ALL_COUNTRIES_ONLINE_SUCCESS: {
      if (action.payload.scoreArr.length >= state.limitCount) {
        const { offset, SL } = calcValueOfSlAndOffset(action.payload.scoreArr);
        state.OffsetOnlineCo = offset;
        state.scoreLOnlineCo = SL;
      } else {
        state.OffsetOnlineCo = "0";
        state.scoreLOnlineCo = "0";
      }
      if (action.payload.usersArr.length == 0) {
        state.endOfResultOnCo = true;
      }
      return {
        ...state,
        allCountriesOnline: [
          ...state.allCountriesOnline,
          ...action.payload.usersArr
        ],
        allCountriesOnlineCount: [
          ...state.allCountriesOnlineCount,
          ...action.payload.scoreArr
        ]
      };
    }
    case COUNTRY_CITIES_ONLINE_SUCCESS: {
      if (action.payload.scoreArr.length >= state.limitCount) {
        const { offset, SL } = calcValueOfSlAndOffset(action.payload.scoreArr);
        state.OffsetOnlineCi = offset;
        state.scoreLOnlineCi = SL;
      } else {
        state.OffsetOnlineCi = "0";
        state.scoreLOnlineCi = "0";
      }
      if (action.payload.usersArr.length == 0) {
        state.endOfResultOnCi = true;
      }
      return {
        ...state,
        countryCitiesOnline: [
          ...state.countryCitiesOnline,
          ...action.payload.usersArr
        ],
        countryCitiesOnlineCount: [
          ...state.countryCitiesOnlineCount,
          ...action.payload.scoreArr
        ]
      };
    }
    case COUNTRY_AGERANGES_ONLONE_SUCCESS: {
      if (action.payload.scoreArr.length >= state.limitCount) {
        const { offset, SL } = calcValueOfSlAndOffset(action.payload.scoreArr);
        state.OffsetOnlineAge = offset;
        state.scoreLOnlineAge = SL;
      } else {
        state.OffsetOnlineAge = "0";
        state.scoreLOnlineAge = "0";
      }
      if (action.payload.usersArr.length == 0) {
        state.endOfResultOnAge = true;
      }
      return {
        ...state,
        countryAgerangesOnline: [
          ...state.countryAgerangesOnline,
          ...action.payload.usersArr
        ],
        countryAgerangesOnlineCount: [
          ...state.countryAgerangesOnlineCount,
          ...action.payload.scoreArr
        ]
      };
    }
    case AGERANGE_COUNTRIES_ONLINE_SUCCESS: {
      if (action.payload.scoreArr.length >= state.limitCount) {
        const { offset, SL } = calcValueOfSlAndOffset(action.payload.scoreArr);
        state.OffsetOnlineCo = offset;
        state.scoreLOnlineCo = SL;
      } else {
        state.OffsetOnlineCo = "0";
        state.scoreLOnlineCo = "0";
      }
      if (action.payload.usersArr.length == 0) {
        state.endOfResultOnCo = true;
      }
      return {
        ...state,
        agerangeCountriesOnline: [
          ...state.agerangeCountriesOnline,
          ...action.payload.usersArr
        ],
        agerangeCountriesOnlineCount: [
          ...state.agerangeCountriesOnlineCount,
          ...action.payload.scoreArr
        ]
      };
    }
    case COUNTRY_CITIES_AGERANGE_ONLINE_SUCCESS: {
      if (action.payload.scoreArr.length >= state.limitCount) {
        const { offset, SL } = calcValueOfSlAndOffset(action.payload.scoreArr);
        state.OffsetOnlineCi = offset;
        state.scoreLOnlineCi = SL;
      } else {
        state.OffsetOnlineCi = "0";
        state.scoreLOnlineCi = "0";
      }
      if (action.payload.usersArr.length == 0) {
        state.endOfResultOnCi = true;
      }
      return {
        ...state,
        countryCitiesAgerangeOnline: [
          ...state.countryCitiesAgerangeOnline,
          ...action.payload.usersArr
        ],
        countryCitiesAgerangeOnlineCount: [
          ...state.countryCitiesAgerangeOnlineCount,
          ...action.payload.scoreArr
        ]
      };
    }
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
          ...action.payload.scoreArr
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
          ...action.payload.scoreArr
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
          ...action.payload.scoreArr
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
    case ALL_COUNTRIES_OFFLINE_SUCCESS: {
      if (action.payload.scoreArr.length >= state.limitCount) {
        const { offset, SL } = calcValueOfSlAndOffset(action.payload.scoreArr);
        state.OffsetOfflineCo = offset;
        state.scoreLOfflineCo = SL;
      } else {
        state.OffsetOfflineCo = "0";
        state.scoreLOfflineCo = "0";
      }
      if (action.payload.usersArr.length == 0) {
        state.endOfResultCo = true;
      }
      if (state.allCountriesOffline.length == 0) {
        state.allCountriesOfflineScroll = action.payload.usersArr;
        state.allCountriesOfflineScrollCount = action.payload.scoreArr;
        state.OffsetOffline = state.OffsetOfflineCo;
        state.scoreLOffline = state.scoreLOfflineCo;
      }
      return {
        ...state,
        allCountriesOffline: [
          ...state.allCountriesOffline,
          ...action.payload.usersArr
        ],
        allCountriesOfflineCount: [
          ...state.allCountriesOfflineCount,
          ...action.payload.scoreArr
        ],
        searchState: "most recent"
      };
    }
    case ALL_COUNTRIES_OFFLINE_SCROLL_SUCCESS: {
      if (action.payload.scoreArr.length >= state.limitCount) {
        const { offset, SL } = calcValueOfSlAndOffset(action.payload.scoreArr);
        state.OffsetOffline = offset;
        state.scoreLOffline = SL;
      } else {
        state.OffsetOffline = "0";
        state.scoreLOffline = "0";
      }
      if (action.payload.usersArr.length == 0) {
        state.endOfResultOf = true;
      }
      return {
        ...state,
        allCountriesOfflineScroll: [
          ...state.allCountriesOfflineScroll,
          ...action.payload.usersArr
        ],
        allCountriesOfflineScrollCount: [
          ...state.allCountriesOfflineScrollCount,
          ...action.payload.scoreArr
        ],
        searchState: "most recent"
      };
    }
    case ALL_COUNTRIES_OFFLINE_USERS_SUCCESS: {
      const { offset, SL } = calcValueOfSlAndOffset(action.payload.scoreArr);

      if (
        action.payload.usersArr.length === 0
        // &&
        // state.allCountriesOffline.length > 1
      ) {
        console.log("end true");
        state.endOfResultUsersOf = true;
        state.currentIndexAllCountriesOffline++;
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
        OffsetOflineUsers: offset,
        scoreLOfflineUsers: SL,
        searchState: "most recent"
      };
    }
    case COUNTRY_CITIES_OFFLINE_SUCCESS: {
      if (action.payload.scoreArr.length >= state.limitCount) {
        const { offset, SL } = calcValueOfSlAndOffset(action.payload.scoreArr);
        state.OffsetOfflineCi = offset;
        state.scoreLOfflineCi = SL;
      } else {
        state.OffsetOfflineCi = "0";
        state.scoreLOfflineCi = "0";
      }
      if (action.payload.usersArr.length == 0) {
        state.endOfResultCi = true;
      }
      return {
        ...state,
        countryCitiesOffline: [
          ...state.countryCitiesOffline,
          ...action.payload.usersArr
        ],
        countryCitiesOfflineCount: [
          ...state.countryCitiesOfflineCount,
          ...action.payload.scoreArr
        ],
        searchState: "most recent"
      };
    }
    case COUNTRY_RECENT_ACTIVE_USERS_SUCCESS: {
      const { offset, SL } = calcValueOfSlAndOffset(action.payload.scoreArr);

      if (action.payload.usersArr.length === 0) {
        state.endOfResultUsersOfS = true;
      }
      return {
        ...state,
        countryRecentActiveUsers: [
          ...state.countryRecentActiveUsers,
          ...action.payload.usersArr
        ],
        countryRecentActiveUsersTimescore: [
          ...state.countryRecentActiveUsersTimescore,
          ...action.payload.scoreArr
        ],
        OffsetOflineUsersS: offset,
        scoreHOfflineUsersS: SL,
        searchState: "most recent"
      };
    }
    case COUNTRY_CITY_RECENT_ACTIVE_USERS_SUCCESS: {
      const { offset, SL } = calcValueOfSlAndOffset(action.payload.scoreArr);

      if (action.payload.usersArr.length === 0) {
        state.endOfResultUsersOfS = true;
      }
      return {
        ...state,
        countryCityRecentActiveUsers: [
          ...state.countryCityRecentActiveUsers,
          ...action.payload.usersArr
        ],
        countryCityRecentActiveUsersTimescore: [
          ...state.countryCityRecentActiveUsersTimescore,
          ...action.payload.scoreArr
        ],
        OffsetOflineUsersS: offset,
        scoreHOfflineUsersS: SL,
        searchState: "most recent"
      };
    }
    case SELECTED_AGERANGE_INDEX:
      return {
        ...state,
        ageRangeSelectedIndex: action.payload
      };
    case SELECTED_COUNTRY_INDEX:
      return {
        ...state,
        countrySelectedIndex: action.payload
      };

    case SELECTED_CITY_INDEX:
      return {
        ...state,
        citySelectedIndex: action.payload
      };

    case SET_AGE_SCORES:
      return {
        ...state,
        ageScoreL: action.payload.SL,
        ageScoreH: action.payload.SH
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
    case RESET_STATES_OFFLINE:
      console.log("rest state Offline");
      return {
        ...state,
        scoreHOfflineUsersS: "", // for offline users search
        OffsetOflineUsersS: 0,
        ageScoreL: 0,
        ageScoreH: 0,
        endOfResultUsersOfS: false, //for search
        countryRecentActiveUsers: [],
        countryRecentActiveUsersTimescore: [],
        countryCityRecentActiveUsers: [],
        countryCityRecentActiveUsersTimescore: []
      };
    case RESET_END_RES_USERS:
      console.log("rest end users");
      return {
        ...state,
        endOfResultUsers: false
      };
    case RESET_END_RES_USERS_OF:
      console.log("rest end users of");
      return {
        ...state,
        endOfResultUsersOf: false
      };

    case RESET_END_RES:
      console.log("rest end");
      return {
        ...state,
        endOfResult: false
      };

    case RESET_END_RES_OF:
      console.log("rest end Of");
      return {
        ...state,
        endOfResultOf: false
      };
    case RESET_STATES_LIST_COUNTRY_ONLINE:
      console.log("rest states list country online");
      return {
        ...state,
        endOfResultOnCo: false, // for country list
        scoreLOnlineCo: "",
        OffsetonlineCo: 0
      };
    case RESET_STATES_LIST_AGERANGE_ONLINE:
      console.log("rest states list agerange online");
      return {
        ...state,
        endOfResultOnAge: false, // for age list
        scoreLOnlineAge: "",
        OffsetOnlineAge: 0
      };

    case RESET_STATES_LIST_CITY_ONLINE:
      console.log("rest states list city online");
      return {
        ...state,
        endOfResultOnCi: false, // for city list
        scoreLOnlineCi: "",
        OffsetOnlineCi: 0
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
