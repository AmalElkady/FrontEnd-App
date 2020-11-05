import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  GET_ALL_COUNTRIES_ONLINE,
  COUNTRY_CITIES_ONLINE
} from "../constants/ActionTypes";
import {
  fetchCountriesOnlineSuccess,
  fetchCountryCitiesOnlineSuccess
} from "../actions/Home";
import { home } from "../okta/okta";

const getOnlineCountries = async () =>
  await home
    .getAllCountriesOnline()
    .then(returnCountries => returnCountries)
    .catch(error => error);

const getCountryCitiesOnline = async country =>
  await home
    .getCountryCitiesOnline(country)
    .then(returnCities => returnCities)
    .catch(error => error);

function* fetchAllCountriesOnlineRequest() {
  try {
    const fetchedCountriesOnline = yield call(getOnlineCountries);
    yield put(fetchCountriesOnlineSuccess(fetchedCountriesOnline));
  } catch (error) {
    yield put(showHomeMessage(error));
  }
}

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

export function* fetchAllCountriesOnline() {
  yield takeEvery(GET_ALL_COUNTRIES_ONLINE, fetchAllCountriesOnlineRequest);
}

export function* fetchCountryCitiesOnline() {
  yield takeEvery(COUNTRY_CITIES_ONLINE, countryCitiesOnlineRequest);
}

export default function* rootSaga() {
  yield all([fork(fetchAllCountriesOnline), fork(fetchCountryCitiesOnline)]);
}
