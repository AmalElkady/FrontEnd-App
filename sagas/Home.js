import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  GET_ALL_COUNTRIES_ONLINE,
  COUNTRY_CITIES_ONLINE,
  COUNTRY_AGERANGES_ONLONE,
  AGERANGE_COUNTRIES_ONLINE,
  COUNTRY_CITIES_AGERANGE_ONLINE
} from "../constants/ActionTypes";
import {
  fetchCountriesOnlineSuccess,
  fetchCountryCitiesOnlineSuccess,
  countryAgerangesOnlineSuccess,
  agerangeCountriesOnlineSuccess,
  fetchCountryCitiesAgerangeOnlineSuccess
} from "../actions/Home";
import { home } from "../okta/okta";

// Age-Range
const getCountryAgerangesOnline = async country =>
  await home
    .getCountryAgerangesOnline(country)
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

// Age-Range
function* countryAgerangesOnlineRequest({ payload }) {
  //console.log("country for agerange from saga ", payload);
  try {
    const fetchedCountryAgerangesOnline = yield call(
      getCountryAgerangesOnline,
      payload
    );
    // console.log(
    //   "returned age ranges from saga ",
    //   fetchedCountryAgerangesOnline
    // );
    yield put(countryAgerangesOnlineSuccess(fetchedCountryAgerangesOnline));
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

// Age-Range
export function* fetchCountryAgerangesOnline() {
  yield takeEvery(COUNTRY_AGERANGES_ONLONE, countryAgerangesOnlineRequest);
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

export default function* rootSaga() {
  yield all([
    fork(fetchAllCountriesOnline),
    fork(fetchCountryCitiesOnline),
    fork(fetchCountryAgerangesOnline),
    fork(fetchAgerangeCountriesOnline),
    fork(fetchCountryCitiesAgerangeOnline)
  ]);
}
