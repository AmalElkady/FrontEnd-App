import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { GET_ALL_COUNTRIES_ONLINE } from "../constants/ActionTypes";
import { fetchCountriesOnlineSuccess } from "../actions/Home";
import { home } from "../okta/okta";

const getOnlineCountries = async () =>
  await home
    .getAllCountriesOnline()
    .then(returnCountries => returnCountries)
    .catch(error => error);

function* fetchAllCountriesOnlineRequest() {
  try {
    const fetchedCountriesOnline = yield call(getOnlineCountries);
    yield put(fetchCountriesOnlineSuccess(fetchedCountriesOnline));
  } catch (error) {
    yield put(showHomeMessage(error));
  }
}

export function* fetchAllCountriesOnline() {
  yield takeEvery(GET_ALL_COUNTRIES_ONLINE, fetchAllCountriesOnlineRequest);
}

export default function* rootSaga() {
  yield all([fork(fetchAllCountriesOnline)]);
}
