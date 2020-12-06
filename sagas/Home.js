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
  ALL_COUNTRIES_OFFLINE_SCROLL,
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
  allCountriesOfflineScrollSuccess,
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
const getCountryAgerangesOnline = async (country, SL, offset) =>
  await home
    .getCountryAgerangesOnline(country, SL, offset)
    .then(returnAgeranges => returnAgeranges)
    .catch(error => error);

const getCountryCityAgerangesOnline = async (country, city, SL, offset) =>
  await home
    .getCountryCityAgerangesOnline(country, city, SL, offset)
    .then(returnAgeranges => returnAgeranges)
    .catch(error => error);
//Countries
const getOnlineCountries = async (SL, offset) =>
  await home
    .getAllCountriesOnline(SL, offset)
    .then(returnCountries => returnCountries)
    .catch(error => error);

const getAgerangeCountriesOnline = async (agerange, SL, offset) =>
  await home
    .getAgerangeCountriesOnline(agerange, SL, offset)
    .then(returnCountries => returnCountries)
    .catch(error => error);

// Cities
const getCountryCitiesOnline = async (country, SL, offset) =>
  await home
    .getCountryCitiesOnline(country, SL, offset)
    .then(returnCities => returnCities)
    .catch(error => error);

const getCountryCitiesAgerangeOnline = async (country, agerange, SL, offset) =>
  await home
    .getCountryCitiesAgerangeOnline(country, agerange, SL, offset)
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

const getCountryCitySelectedOnline = async (country, city, SH, offset) =>
  await home
    .getCountryCitySelectedOnline(country, city, SH, offset)
    .then(returnUsers => returnUsers)
    .catch(error => error);

const getCountryCitiesAgerangeSelectedOnline = async (
  country,
  agerange,
  SH,
  offset
) =>
  await home
    .getCountryCitiesAgerangeSelectedOnline(country, agerange, SH, offset)
    .then(returnUsers => returnUsers)
    .catch(error => error);

const getCountryCityAgerangeSelectedOnline = async (
  country,
  city,
  agerange,
  SH,
  offset
) =>
  await home
    .getCountryCityAgerangeSelectedOnline(country, city, agerange, SH, offset)
    .then(returnUsers => returnUsers)
    .catch(error => error);

const requestPhotoRead = async () =>
  await home
    .requestPhotoRead()
    .then(signedRequest => signedRequest)
    .catch(error => error);

/// Offline
const getOfflineCountries = async (SL, offset) =>
  await home
    .getAllCountriesOffline(SL, offset)
    .then(returnCountries => returnCountries)
    .catch(error => error);
const getOfflineCountriesScroll = async (SL, offset) =>
  await home
    .getAllCountriesOffline(SL, offset)
    .then(returnCountries => returnCountries)
    .catch(error => error);

const getOfflineCountriesAllUsers = async (country, SL, offset) =>
  await home
    .getAllCountriesOfflineUsers(country, SL, offset)
    .then(returnUsers => returnUsers)
    .catch(error => error);

const getCountryCitiesOffline = async (country, SL, offset) =>
  await home
    .getCountryCitiesOffline(country, SL, offset)
    .then(returnCities => returnCities)
    .catch(error => error);

const getCountryRecentActiveUsers = async (country, SL, SH, offset) =>
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
  const { country, SL, offset } = payload;
  try {
    const fetchedCountryAgerangesOnline = yield call(
      getCountryAgerangesOnline,
      country,
      SL,
      offset
    );
    yield put(countryAgerangesOnlineSuccess(fetchedCountryAgerangesOnline));
  } catch (error) {
    yield put(showHomeMessage(error));
  }
}

function* countryCityAgerangesOnlineRequest({ payload }) {
  const { country, city, SL, offset } = payload;

  try {
    const fetchedCountryCityAgerangesOnline = yield call(
      getCountryCityAgerangesOnline,
      country,
      city,
      SL,
      offset
    );

    yield put(
      fetchCountryCityAgerangesOnlineSuccess(fetchedCountryCityAgerangesOnline)
    );
  } catch (error) {
    yield put(showHomeMessage(error));
  }
}

//Countries
function* fetchAllCountriesOnlineRequest({ payload }) {
  const { SL, offset } = payload;
  try {
    const fetchedCountriesOnline = yield call(getOnlineCountries, SL, offset);
    yield put(fetchCountriesOnlineSuccess(fetchedCountriesOnline));
  } catch (error) {
    yield put(showHomeMessage(error));
  }
}

function* AgerangeCountriesOnlineRequest({ payload }) {
  const { agerange, SL, offset } = payload;
  try {
    const fetchedAgerangeCountriesOnline = yield call(
      getAgerangeCountriesOnline,
      agerange,
      SL,
      offset
    );

    yield put(agerangeCountriesOnlineSuccess(fetchedAgerangeCountriesOnline));
  } catch (error) {
    yield put(showHomeMessage(error));
  }
}

// Cities
function* countryCitiesOnlineRequest({ payload }) {
  const { country, SL, offset } = payload;
  try {
    const fetchedCountryCitiesOnline = yield call(
      getCountryCitiesOnline,
      country,
      SL,
      offset
    );

    yield put(fetchCountryCitiesOnlineSuccess(fetchedCountryCitiesOnline));
  } catch (error) {
    yield put(showHomeMessage(error));
  }
}

function* countryCitiesAgerangeOnlineRequest({ payload }) {
  const { country, agerange, SL, offset } = payload;
  try {
    const fetchedCountryCitiesAgerangeOnline = yield call(
      getCountryCitiesAgerangeOnline,
      country,
      agerange,
      SL,
      offset
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

  try {
    const fetchedAllCountriesSelestedOnline = yield call(
      getAllCountriesSelectedOnline,
      SH,
      offset
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

  try {
    const fetchedAllCountriesSelestedOnlineUsers = yield call(
      getAllCountriesSelectedOnlineUsers,
      option,
      SH,
      offset
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

  try {
    const fetchedSelestedOnlineUsers = yield call(
      getSelectedOnlineUsers,
      option,
      SH,
      offset
    );

    yield put(fetchSelectedOnlineUsersSuccess(fetchedSelestedOnlineUsers));
  } catch (error) {
    yield put(showHomeMessage(error));
  }
}

//

function* agerangeAllCountriesSelectedOnlineRequest({ payload }) {
  const { agerange, SH, offset } = payload;

  try {
    const fetchedAgerangeAllCountriesSelestedOnline = yield call(
      getAgerangeAllCountriesSelectedOnline,
      agerange,
      SH,
      offset
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

  try {
    const fetchedCountrySelestedOnline = yield call(
      getCountrySelectedOnline,
      country,
      SH,
      offset
    );

    yield put(fetchCountrySelectedOnlineSuccess(fetchedCountrySelestedOnline));
  } catch (error) {
    yield put(showHomeMessage(error));
  }
}

function* countryCitySelectedOnlineRequest({ payload }) {
  const { country, city, SH, offset } = payload;

  try {
    const fetchedCountryCitySelestedOnline = yield call(
      getCountryCitySelectedOnline,
      country,
      city,
      SH,
      offset
    );

    yield put(
      fetchCountryCitySelectedOnlineSuccess(fetchedCountryCitySelestedOnline)
    );
  } catch (error) {
    yield put(showHomeMessage(error));
  }
}

function* countryCitiesAgerangeSelectedOnlineRequest({ payload }) {
  const { country, agerange, SH, offset } = payload;

  try {
    const fetchedCountryCitiesAgerangeSelestedOnline = yield call(
      getCountryCitiesAgerangeSelectedOnline,
      country,
      agerange,
      SH,
      offset
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
  const { country, city, agerange, SH, offset } = payload;

  try {
    const fetchedCountryCityAgerangeSelestedOnline = yield call(
      getCountryCityAgerangeSelectedOnline,
      country,
      city,
      agerange,
      SH,
      offset
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
  try {
    const fetchedPhotoReadsignedRequest = yield call(requestPhotoRead);

    yield put(requestPhotoReadSuccess(fetchedPhotoReadsignedRequest));
  } catch (error) {
    yield put(showHomeMessage(error));
  }
}

//Offline
function* fetchAllCountriesOfflineRequest({ payload }) {
  const { SL, offset } = payload;
  try {
    const fetchedCountriesOffline = yield call(getOfflineCountries, SL, offset);
    yield put(allCountriesOfflineSuccess(fetchedCountriesOffline));
  } catch (error) {
    yield put(showHomeMessage(error));
  }
}

function* fetchAllCountriesOfflineScrollRequest({ payload }) {
  const { SL, offset } = payload;
  try {
    const fetchedCountriesOffline = yield call(
      getOfflineCountriesScroll,
      SL,
      offset
    );
    yield put(allCountriesOfflineScrollSuccess(fetchedCountriesOffline));
  } catch (error) {
    yield put(showHomeMessage(error));
  }
}

function* fetchAllCountriesOfflineUsersRequest({ payload }) {
  const { country, SL, offset } = payload;
  try {
    const fetchedCountriesOfflineUsers = yield call(
      getOfflineCountriesAllUsers,
      country,
      SL,
      offset
    );
    yield put(allCountriesOfflineUsersSuccess(fetchedCountriesOfflineUsers));
  } catch (error) {
    yield put(showHomeMessage(error));
  }
}

function* countryCitiesOfflineRequest({ payload }) {
  const { country, SL, offset } = payload;
  try {
    const fetchedCountryCitiesOffline = yield call(
      getCountryCitiesOffline,
      country,
      SL,
      offset
    );
    yield put(fetchCountryCitiesOfflineSuccess(fetchedCountryCitiesOffline));
  } catch (error) {
    yield put(showHomeMessage(error));
  }
}

function* countryRecentActiveUsersRequest({ payload }) {
  const { country, SL, SH, offset } = payload;
  try {
    const fetchedCountryRecentActiveUsers = yield call(
      getCountryRecentActiveUsers,
      country,
      SL,
      SH,
      offset
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
  try {
    const fetchedCountryCityRecentActiveUsers = yield call(
      getCountryCityRecentActiveUsers,
      country,
      city,
      SL,
      SH,
      offset
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

export function* fetchAllCountriesOfflineScroll() {
  yield takeEvery(
    ALL_COUNTRIES_OFFLINE_SCROLL,
    fetchAllCountriesOfflineScrollRequest
  );
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
    fork(fetchAllCountriesOfflineScroll),
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
