import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  GET_ALL_COUNTRIES_ONLINE,
  COUNTRY_CITIES_ONLINE,
  COUNTRY_AGERANGES_ONLONE,
  AGERANGE_COUNTRIES_ONLINE,
  COUNTRY_CITIES_AGERANGE_ONLINE,
  COUNTRY_CITY_AGERANGES_ONLINE,
  ALL_COUNTRIES_SELECTED_ONLINE,
  ALL_COUNTRIES_SELECTED_ONLINE_USERS,
  REQUEST_PHOTO_READ,
  ALL_COUNTRIES_OFFLINE,
  COUNTRY_CITIES_OFFLINE,
  COUNTRY_RECENT_ACTIVE_USERS,
  COUNTRY_CITY_RECENT_ACTIVE_USERS,
  AGERANGE_ALL_COUNTRIES_SELECTED_ONLINE,
  COUNTRY_SELECTED_ONLINE,
  COUNTRY_CITY_SELECTED_ONLINE,
  COUNTRY_CITIES_AGERANGE_SELECTED_ONLINE,
  COUNTRY_CITY_AGERANGE_SELECTED_ONLINE,
  ALL_COUNTRIES_OFFLINE_USERS,
  SELECTED_ONLINE_USERS
} from "../constants/ActionTypes";
import {
  fetchCountriesOnlineSuccess,
  fetchCountryCitiesOnlineSuccess,
  countryAgerangesOnlineSuccess,
  agerangeCountriesOnlineSuccess,
  fetchCountryCitiesAgerangeOnlineSuccess,
  fetchCountryCityAgerangesOnlineSuccess,
  fetchAllCountriesSelectedOnlineSuccess,
  fetchAllCountriesSelectedOnlineUsersSuccess,
  showHomeMessage,
  requestPhotoReadSuccess,
  allCountriesOfflineSuccess,
  fetchCountryCitiesOfflineSuccess,
  fetchCountryRecentActiveUsersSuccess,
  fetchCountryCityRecentActiveUsersSuccess,
  fetchAgerangeAllCountriesSelectedOnlineSuccess,
  fetchCountrySelectedOnlineSuccess,
  fetchCountryCitySelectedOnlineSuccess,
  fetchCountryCitiesAgerangeSelectedOnlineSuccess,
  fetchCountryCityAgerangeSelectedOnlineSuccess,
  allCountriesOfflineUsersSuccess,
  fetchSelectedOnlineUsersSuccess
} from "../actions/Home";
import { home } from "../okta/okta";

// Age-Range
const getCountryAgerangesOnline = async country =>
  await home
    .getCountryAgerangesOnline(country)
    .then(returnAgeranges => returnAgeranges)
    .catch(error => error);

const getCountryCityAgerangesOnline = async (country, city) =>
  await home
    .getCountryCityAgerangesOnline(country, city)
    .then(returnAgeranges => returnAgeranges)
    .catch(error => error);
//Countries
const getOnlineCountries = async () =>
  await home
    .getAllCountriesOnline()
    .then(returnCountries => returnCountries)
    .catch(error => error);

const getAgerangeCountriesOnline = async agerange =>
  await home
    .getAgerangeCountriesOnline(agerange)
    .then(returnCountries => returnCountries)
    .catch(error => error);

// Cities
const getCountryCitiesOnline = async country =>
  await home
    .getCountryCitiesOnline(country)
    .then(returnCities => returnCities)
    .catch(error => error);

const getCountryCitiesAgerangeOnline = async (country, agerange) =>
  await home
    .getCountryCitiesAgerangeOnline(country, agerange)
    .then(returnCities => returnCities)
    .catch(error => error);

// Users Profiles
const getAllCountriesSelectedOnline = async (SH, offset) =>
  await home
    .getAllCountriesSelectedOnline(SH, offset)
    .then(returnUsers => returnUsers)
    .catch(error => error);
const getAllCountriesSelectedOnlineUsers = async (option, SH, offset) =>
  await home
    .getselectedsearchprofiles(option, SH, offset)
    .then(returnUsers => returnUsers)
    .catch(error => error);

const getSelectedOnlineUsers = async (option, SH, offset) =>
  await home
    .getselectedsearchprofiles(option, SH, offset)
    .then(returnUsers => returnUsers)
    .catch(error => error);

const getAgerangeAllCountriesSelectedOnline = async (agerange, SH, offset) =>
  await home
    .getAgerangeAllCountriesSelectedOnline(agerange, SH, offset)
    .then(returnUsers => returnUsers)
    .catch(error => error);

const getCountrySelectedOnline = async (country, SH, offset) =>
  await home
    .getCountrySelectedOnline(country, SH, offset)
    .then(returnUsers => returnUsers)
    .catch(error => error);

const getCountryCitySelectedOnline = async (country, city) =>
  await home
    .getCountryCitySelectedOnline(country, city)
    .then(returnUsers => returnUsers)
    .catch(error => error);

const getCountryCitiesAgerangeSelectedOnline = async (country, agerange) =>
  await home
    .getCountryCitiesAgerangeSelectedOnline(country, agerange)
    .then(returnUsers => returnUsers)
    .catch(error => error);

const getCountryCityAgerangeSelectedOnline = async (country, city, agerange) =>
  await home
    .getCountryCityAgerangeSelectedOnline(country, city, agerange)
    .then(returnUsers => returnUsers)
    .catch(error => error);

const requestPhotoRead = async () =>
  await home
    .requestPhotoRead()
    .then(signedRequest => signedRequest)
    .catch(error => error);

/// Offline
const getOfflineCountries = async () =>
  await home
    .getAllCountriesOffline()
    .then(returnCountries => returnCountries)
    .catch(error => error);

const getOfflineCountriesAllUsers = async (country, SL, offset) =>
  await home
    .getAllCountriesOfflineUsers(country, SL, offset)
    .then(returnUsers => returnUsers)
    .catch(error => error);

const getCountryCitiesOffline = async country =>
  await home
    .getCountryCitiesOffline(country)
    .then(returnCities => returnCities)
    .catch(error => error);

const getCountryRecentActiveUsers = async (country, SH, SL, offset) =>
  await home
    .getCountryRecentActiveUsers(country, SL, SH, offset)
    .then(returnUsers => returnUsers)
    .catch(error => error);

const getCountryCityRecentActiveUsers = async (country, city, SH, SL, offset) =>
  await home
    .getCountryCityRecentActiveUsers(country, city, SH, SL, offset)
    .then(returnUsers => returnUsers)
    .catch(error => error);

// Age-Range
function* countryAgerangesOnlineRequest({ payload }) {
  try {
    const fetchedCountryAgerangesOnline = yield call(
      getCountryAgerangesOnline,
      payload
    );
    yield put(countryAgerangesOnlineSuccess(fetchedCountryAgerangesOnline));
  } catch (error) {
    yield put(showHomeMessage(error));
  }
}

function* countryCityAgerangesOnlineRequest({ payload }) {
  const { country, city } = payload;
  console.log("country and city from saga ", country, city);
  try {
    const fetchedCountryCityAgerangesOnline = yield call(
      getCountryCityAgerangesOnline,
      country,
      city
    );
    console.log(
      "returned ageranges from saga based on country and city",
      fetchedCountryCityAgerangesOnline
    );
    yield put(
      fetchCountryCityAgerangesOnlineSuccess(fetchedCountryCityAgerangesOnline)
    );
  } catch (error) {
    yield put(showHomeMessage(error));
  }
}

//Countries
function* fetchAllCountriesOnlineRequest() {
  try {
    const fetchedCountriesOnline = yield call(getOnlineCountries);
    yield put(fetchCountriesOnlineSuccess(fetchedCountriesOnline));
  } catch (error) {
    yield put(showHomeMessage(error));
  }
}

function* AgerangeCountriesOnlineRequest({ payload }) {
  console.log("agerange for countries from saga ", payload);
  try {
    const fetchedAgerangeCountriesOnline = yield call(
      getAgerangeCountriesOnline,
      payload
    );
    console.log(
      "returned countries of age from saga ",
      fetchedAgerangeCountriesOnline
    );
    yield put(agerangeCountriesOnlineSuccess(fetchedAgerangeCountriesOnline));
  } catch (error) {
    yield put(showHomeMessage(error));
  }
}

// Cities
function* countryCitiesOnlineRequest({ payload }) {
  console.log("country from saga ", payload);
  try {
    const fetchedCountryCitiesOnline = yield call(
      getCountryCitiesOnline,
      payload
    );
    console.log("returned cities from saga ", fetchedCountryCitiesOnline);
    yield put(fetchCountryCitiesOnlineSuccess(fetchedCountryCitiesOnline));
  } catch (error) {
    yield put(showHomeMessage(error));
  }
}

function* countryCitiesAgerangeOnlineRequest({ payload }) {
  const { country, agerange } = payload;
  console.log("country and agerange from saga ", country, agerange);
  try {
    const fetchedCountryCitiesAgerangeOnline = yield call(
      getCountryCitiesAgerangeOnline,
      country,
      agerange
    );
    console.log(
      "returned cities from saga based on country and agerang",
      fetchedCountryCitiesAgerangeOnline
    );
    yield put(
      fetchCountryCitiesAgerangeOnlineSuccess(
        fetchedCountryCitiesAgerangeOnline
      )
    );
  } catch (error) {
    yield put(showHomeMessage(error));
  }
}

// Users Profiles

function* allCountriesSelectedOnlineRequest({ payload }) {
  const { SH, offset } = payload;
  console.log("allCountriesSelectedOnline from saga ");
  try {
    const fetchedAllCountriesSelestedOnline = yield call(
      getAllCountriesSelectedOnline,
      SH,
      offset
    );
    console.log(
      "returned allCountriesSelectedOnline from saga",
      fetchedAllCountriesSelestedOnline
    );
    yield put(
      fetchAllCountriesSelectedOnlineSuccess(fetchedAllCountriesSelestedOnline)
    );
  } catch (error) {
    yield put(showHomeMessage(error));
  }
}

function* allCountriesSelectedOnlineUsersRequest({ payload }) {
  const { option, SH, offset } = payload;
  console.log(
    "allCountriesSelectedUsersOnline from saga: ",
    option,
    SH,
    offset
  );
  try {
    const fetchedAllCountriesSelestedOnlineUsers = yield call(
      getAllCountriesSelectedOnlineUsers,
      option,
      SH,
      offset
    );
    console.log(
      "returned fetchedAllCountriesSelestedOnlineUsers from saga",
      fetchedAllCountriesSelestedOnlineUsers
    );
    yield put(
      fetchAllCountriesSelectedOnlineUsersSuccess(
        fetchedAllCountriesSelestedOnlineUsers
      )
    );
  } catch (error) {
    yield put(showHomeMessage(error));
  }
}

//usesr
function* selectedOnlineUsersRequest({ payload }) {
  const { option, SH, offset } = payload;
  console.log("SelectedUsersOnline from saga: ", option, SH, offset);
  try {
    const fetchedSelestedOnlineUsers = yield call(
      getSelectedOnlineUsers,
      option,
      SH,
      offset
    );
    console.log(
      "returned fetchedSelestedOnlineUsers from saga",
      fetchedSelestedOnlineUsers
    );
    yield put(fetchSelectedOnlineUsersSuccess(fetchedSelestedOnlineUsers));
  } catch (error) {
    yield put(showHomeMessage(error));
  }
}

//

function* agerangeAllCountriesSelectedOnlineRequest({ payload }) {
  const { agerange, SH, offset } = payload;
  console.log(
    "agerangeAllCountriesSelectedOnline from saga ",
    agerange,
    SH,
    offset
  );
  try {
    const fetchedAgerangeAllCountriesSelestedOnline = yield call(
      getAgerangeAllCountriesSelectedOnline,
      agerange,
      SH,
      offset
    );
    console.log(
      "returned fetchedAgerangeAllCountriesSelestedOnline from saga",
      fetchedAgerangeAllCountriesSelestedOnline
    );
    yield put(
      fetchAgerangeAllCountriesSelectedOnlineSuccess(
        fetchedAgerangeAllCountriesSelestedOnline
      )
    );
  } catch (error) {
    yield put(showHomeMessage(error));
  }
}

function* countrySelectedOnlineRequest({ payload }) {
  const { country, SH, offset } = payload;
  console.log("countrySelectedOnline from saga ", country, SH, offset);
  try {
    const fetchedCountrySelestedOnline = yield call(
      getCountrySelectedOnline,
      country,
      SH,
      offset
    );
    console.log(
      "returned fetchedCountrySelestedOnline from saga",
      fetchedCountrySelestedOnline
    );
    yield put(fetchCountrySelectedOnlineSuccess(fetchedCountrySelestedOnline));
  } catch (error) {
    yield put(showHomeMessage(error));
  }
}

function* countryCitySelectedOnlineRequest({ payload }) {
  const { country, city } = payload;
  console.log("countryCitySelectedOnline from saga ", country, city);
  try {
    const fetchedCountryCitySelestedOnline = yield call(
      getCountryCitySelectedOnline,
      country,
      city
    );
    console.log(
      "returned fetchedCountryCitySelestedOnline from saga",
      fetchedCountryCitySelestedOnline
    );
    yield put(
      fetchCountryCitySelectedOnlineSuccess(fetchedCountryCitySelestedOnline)
    );
  } catch (error) {
    yield put(showHomeMessage(error));
  }
}

function* countryCitiesAgerangeSelectedOnlineRequest({ payload }) {
  const { country, agerange } = payload;
  console.log(
    "countryCitiesAgerangeSelectedOnline from saga ",
    country,
    agerange
  );
  try {
    const fetchedCountryCitiesAgerangeSelestedOnline = yield call(
      getCountryCitiesAgerangeSelectedOnline,
      country,
      agerange
    );
    console.log(
      "returned fetchedCountryCitiesAgerangeSelestedOnline from saga",
      fetchedCountryCitiesAgerangeSelestedOnline
    );
    yield put(
      fetchCountryCitiesAgerangeSelectedOnlineSuccess(
        fetchedCountryCitiesAgerangeSelestedOnline
      )
    );
  } catch (error) {
    yield put(showHomeMessage(error));
  }
}

function* countryCityAgerangeSelectedOnlineRequest({ payload }) {
  const { country, city, agerange } = payload;
  console.log(
    "countryCityAgerangeSelectedOnline from saga ",
    country,
    city,
    agerange
  );
  try {
    const fetchedCountryCityAgerangeSelestedOnline = yield call(
      getCountryCityAgerangeSelectedOnline,
      country,
      city,
      agerange
    );
    console.log(
      "returned fetchedCountryCityAgerangeSelestedOnline from saga",
      fetchedCountryCityAgerangeSelestedOnline
    );
    yield put(
      fetchCountryCityAgerangeSelectedOnlineSuccess(
        fetchedCountryCityAgerangeSelestedOnline
      )
    );
  } catch (error) {
    yield put(showHomeMessage(error));
  }
}

function* photoReadRequest() {
  console.log("photoReadRequest from saga ");
  try {
    const fetchedPhotoReadsignedRequest = yield call(requestPhotoRead);
    console.log(
      "returned fetchedPhotoReadsignedRequest from saga",
      fetchedPhotoReadsignedRequest
    );
    yield put(requestPhotoReadSuccess(fetchedPhotoReadsignedRequest));
  } catch (error) {
    yield put(showHomeMessage(error));
  }
}

//Offline
function* fetchAllCountriesOfflineRequest() {
  console.log("offline from saga");
  try {
    const fetchedCountriesOffline = yield call(getOfflineCountries);
    yield put(allCountriesOfflineSuccess(fetchedCountriesOffline));
  } catch (error) {
    yield put(showHomeMessage(error));
  }
}

function* fetchAllCountriesOfflineUsersRequest({ payload }) {
  const { country, SL, offset } = payload;
  console.log("offline all users from saga ", country, SL, offset);
  try {
    const fetchedCountriesOfflineUsers = yield call(
      getOfflineCountriesAllUsers,
      country,
      SL,
      offset
    );
    console.log(
      "fetchedALLCountriesOfflineUsers : ",
      fetchedCountriesOfflineUsers
    );
    yield put(allCountriesOfflineUsersSuccess(fetchedCountriesOfflineUsers));
  } catch (error) {
    yield put(showHomeMessage(error));
  }
}

function* countryCitiesOfflineRequest({ payload }) {
  console.log("country Offline from saga ", payload);
  try {
    const fetchedCountryCitiesOffline = yield call(
      getCountryCitiesOffline,
      payload
    );
    console.log(
      "returned cities offline from saga ",
      fetchedCountryCitiesOffline
    );
    yield put(fetchCountryCitiesOfflineSuccess(fetchedCountryCitiesOffline));
  } catch (error) {
    yield put(showHomeMessage(error));
  }
}

function* countryRecentActiveUsersRequest({ payload }) {
  const { country, SL, SH, offset } = payload;
  console.log("country recent user from saga ", payload);
  try {
    const fetchedCountryRecentActiveUsers = yield call(
      getCountryRecentActiveUsers,
      country,
      SL,
      SH,
      offset
    );
    console.log(
      "return recent user from saga ",
      fetchedCountryRecentActiveUsers
    );
    yield put(
      fetchCountryRecentActiveUsersSuccess(fetchedCountryRecentActiveUsers)
    );
  } catch (error) {
    yield put(showHomeMessage(error));
  }
}

function* countryCityRecentActiveUsersRequest({ payload }) {
  const { country, city, SL, SH, offset } = payload;
  console.log("country city recent user from saga ", payload);
  try {
    const fetchedCountryCityRecentActiveUsers = yield call(
      getCountryCityRecentActiveUsers,
      country,
      city,
      SL,
      SH,
      offset
    );
    console.log(
      "return recent user from saga ",
      fetchedCountryCityRecentActiveUsers
    );
    yield put(
      fetchCountryCityRecentActiveUsersSuccess(
        fetchedCountryCityRecentActiveUsers
      )
    );
  } catch (error) {
    yield put(showHomeMessage(error));
  }
}

// Age-Range
export function* fetchCountryAgerangesOnline() {
  yield takeEvery(COUNTRY_AGERANGES_ONLONE, countryAgerangesOnlineRequest);
}

export function* fetchCountryCityAgerangesOnline() {
  yield takeEvery(
    COUNTRY_CITY_AGERANGES_ONLINE,
    countryCityAgerangesOnlineRequest
  );
}

//Countries
export function* fetchAllCountriesOnline() {
  yield takeEvery(GET_ALL_COUNTRIES_ONLINE, fetchAllCountriesOnlineRequest);
}
export function* fetchAgerangeCountriesOnline() {
  yield takeEvery(AGERANGE_COUNTRIES_ONLINE, AgerangeCountriesOnlineRequest);
}

// Cities
export function* fetchCountryCitiesOnline() {
  yield takeEvery(COUNTRY_CITIES_ONLINE, countryCitiesOnlineRequest);
}

export function* fetchCountryCitiesAgerangeOnline() {
  yield takeEvery(
    COUNTRY_CITIES_AGERANGE_ONLINE,
    countryCitiesAgerangeOnlineRequest
  );
}

// Users Profiles
export function* fetchAllCountriesSelectedOnline() {
  yield takeEvery(
    ALL_COUNTRIES_SELECTED_ONLINE,
    allCountriesSelectedOnlineRequest
  );
}

export function* fetchAllCountriesSelectedOnlineUsers() {
  yield takeEvery(
    ALL_COUNTRIES_SELECTED_ONLINE_USERS,
    allCountriesSelectedOnlineUsersRequest
  );
}
export function* fetchSelectedOnlineUsers() {
  yield takeEvery(SELECTED_ONLINE_USERS, selectedOnlineUsersRequest);
}

export function* fetchAgerangeAllCountriesSelectedOnline() {
  yield takeEvery(
    AGERANGE_ALL_COUNTRIES_SELECTED_ONLINE,
    agerangeAllCountriesSelectedOnlineRequest
  );
}

export function* fetchCountrySelectedOnline() {
  yield takeEvery(COUNTRY_SELECTED_ONLINE, countrySelectedOnlineRequest);
}

export function* fetchCountryCitySelectedOnline() {
  yield takeEvery(
    COUNTRY_CITY_SELECTED_ONLINE,
    countryCitySelectedOnlineRequest
  );
}

export function* fetchCountryCitiesAgerangeSelectedOnline() {
  yield takeEvery(
    COUNTRY_CITIES_AGERANGE_SELECTED_ONLINE,
    countryCitiesAgerangeSelectedOnlineRequest
  );
}

export function* fetchCountryCityAgerangeSelectedOnline() {
  yield takeEvery(
    COUNTRY_CITY_AGERANGE_SELECTED_ONLINE,
    countryCityAgerangeSelectedOnlineRequest
  );
}

export function* fetchPhotoReadRequest() {
  yield takeEvery(REQUEST_PHOTO_READ, photoReadRequest);
}

//Offline
export function* fetchAllCountriesOffline() {
  yield takeEvery(ALL_COUNTRIES_OFFLINE, fetchAllCountriesOfflineRequest);
}

export function* fetchAllCountriesOfflineUsers() {
  yield takeEvery(
    ALL_COUNTRIES_OFFLINE_USERS,
    fetchAllCountriesOfflineUsersRequest
  );
}
export function* fetchCountryCitiesOffline() {
  yield takeEvery(COUNTRY_CITIES_OFFLINE, countryCitiesOfflineRequest);
}

export function* fetchCountryRecentActiveUsers() {
  yield takeEvery(COUNTRY_RECENT_ACTIVE_USERS, countryRecentActiveUsersRequest);
}

export function* fetchCountryCityRecentActiveUsers() {
  yield takeEvery(
    COUNTRY_CITY_RECENT_ACTIVE_USERS,
    countryCityRecentActiveUsersRequest
  );
}

export default function* rootSaga() {
  yield all([
    fork(fetchAllCountriesOnline),
    fork(fetchCountryCitiesOnline),
    fork(fetchCountryAgerangesOnline),
    fork(fetchAgerangeCountriesOnline),
    fork(fetchCountryCitiesAgerangeOnline),
    fork(fetchCountryCityAgerangesOnline),
    fork(fetchAllCountriesSelectedOnline),
    fork(fetchAllCountriesSelectedOnlineUsers),
    fork(fetchPhotoReadRequest),
    fork(fetchAllCountriesOffline),
    fork(fetchAllCountriesOfflineUsers),
    fork(fetchCountryCitiesOffline),
    fork(fetchCountryRecentActiveUsers),
    fork(fetchCountryCityRecentActiveUsers),
    fork(fetchAgerangeAllCountriesSelectedOnline),
    fork(fetchCountrySelectedOnline),
    fork(fetchCountryCitySelectedOnline),
    fork(fetchCountryCitiesAgerangeSelectedOnline),
    fork(fetchCountryCityAgerangeSelectedOnline),
    fork(fetchSelectedOnlineUsers)
  ]);
}
