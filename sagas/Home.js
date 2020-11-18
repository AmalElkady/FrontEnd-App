import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  GET_ALL_COUNTRIES_ONLINE,
  COUNTRY_CITIES_ONLINE,
  COUNTRY_AGERANGES_ONLONE,
  AGERANGE_COUNTRIES_ONLINE,
  COUNTRY_CITIES_AGERANGE_ONLINE,
  COUNTRY_CITY_AGERANGES_ONLINE,
  ALL_COUNTRIES_SELECTED_ONLINE,
  REQUEST_PHOTO_READ,
  ALL_COUNTRIES_OFFLINE,
  COUNTRY_CITIES_OFFLINE,
  COUNTRY_RECENT_ACTIVE_USERS,
  COUNTRY_CITY_RECENT_ACTIVE_USERS,
  AGERANGE_ALL_COUNTRIES_SELECTED_ONLINE,
  COUNTRY_SELECTED_ONLINE
} from "../constants/ActionTypes";
import {
  fetchCountriesOnlineSuccess,
  fetchCountryCitiesOnlineSuccess,
  countryAgerangesOnlineSuccess,
  agerangeCountriesOnlineSuccess,
  fetchCountryCitiesAgerangeOnlineSuccess,
  fetchCountryCityAgerangesOnlineSuccess,
  fetchAllCountriesSelectedOnlineSuccess,
  showHomeMessage,
  requestPhotoReadSuccess,
  allCountriesOfflineSuccess,
  fetchCountryCitiesOfflineSuccess,
  fetchCountryRecentActiveUsersSuccess,
  fetchCountryCityRecentActiveUsersSuccess,
  fetchAgerangeAllCountriesSelectedOnlineSuccess
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
const getAllCountriesSelectedOnline = async () =>
  await home
    .getAllCountriesSelectedOnline()
    .then(returnUsers => returnUsers)
    .catch(error => error);

const getAgerangeAllCountriesSelectedOnline = async agerange =>
  await home
    .getAgerangeAllCountriesSelectedOnline(agerange)
    .then(returnUsers => returnUsers)
    .catch(error => error);

const getCountrySelectedOnline = async country =>
  await home
    .getCountrySelectedOnline(country)
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

const getCountryCitiesOffline = async country =>
  await home
    .getCountryCitiesOffline(country)
    .then(returnCities => returnCities)
    .catch(error => error);

const getCountryRecentActiveUsers = async country =>
  await home
    .getCountryRecentActiveUsers(country)
    .then(returnUsers => returnUsers)
    .catch(error => error);

const getCountryCityRecentActiveUsers = async (country, city) =>
  await home
    .getCountryCityRecentActiveUsers(country, city)
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

function* allCountriesSelectedOnlineRequest() {
  console.log("allCountriesSelectedOnline from saga ");
  try {
    const fetchedAllCountriesSelestedOnline = yield call(
      getAllCountriesSelectedOnline
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

function* agerangeAllCountriesSelectedOnlineRequest({ payload }) {
  console.log("agerangeAllCountriesSelectedOnline from saga ", payload);
  try {
    const fetchedAgerangeAllCountriesSelestedOnline = yield call(
      getAgerangeAllCountriesSelectedOnline,
      payload
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
  console.log("countrySelectedOnline from saga ", payload);
  try {
    const fetchedCountrySelestedOnline = yield call(
      getCountrySelectedOnline,
      payload
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
  console.log("country recent user from saga ", payload);
  try {
    const fetchedCountryRecentActiveUsers = yield call(
      getCountryRecentActiveUsers,
      payload
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
  const { country, city } = payload;
  console.log("country city recent user from saga ", payload);
  try {
    const fetchedCountryCityRecentActiveUsers = yield call(
      getCountryCityRecentActiveUsers,
      country,
      city
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

export function* fetchAgerangeAllCountriesSelectedOnline() {
  yield takeEvery(
    AGERANGE_ALL_COUNTRIES_SELECTED_ONLINE,
    agerangeAllCountriesSelectedOnlineRequest
  );
}

export function* fetchCountrySelectedOnline() {
  yield takeEvery(COUNTRY_SELECTED_ONLINE, countrySelectedOnlineRequest);
}

export function* fetchPhotoReadRequest() {
  yield takeEvery(REQUEST_PHOTO_READ, photoReadRequest);
}

//Offline
export function* fetchAllCountriesOffline() {
  yield takeEvery(ALL_COUNTRIES_OFFLINE, fetchAllCountriesOfflineRequest);
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
    fork(fetchPhotoReadRequest),
    fork(fetchAllCountriesOffline),
    fork(fetchCountryCitiesOffline),
    fork(fetchCountryRecentActiveUsers),
    fork(fetchCountryCityRecentActiveUsers),
    fork(fetchAgerangeAllCountriesSelectedOnline),
    fork(fetchCountrySelectedOnline)
  ]);
}
