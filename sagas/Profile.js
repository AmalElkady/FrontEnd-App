import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { readProfileL2Success, showProfileMessage } from "../actions/Profile";
import { READ_PROFILE_L2 } from "../constants/ActionTypes";
import { profile } from "../services/profile";

const readProfileL2 = async (id, co, ci, va) =>
  await profile
    .readProfileL2(id, co, ci, va)
    .then(returnData => returnData)
    .catch(error => error);

function* readProfileL2Request({ payload }) {
  const { id, co, ci, va } = payload;
  try {
    const returnedData = yield call(readProfileL2, id, co, ci, va);
    yield put(readProfileL2Success(returnedData));
  } catch (error) {
    yield put(showProfileMessage(error));
  }
}
export function* readProfileL2Data() {
  yield takeEvery(READ_PROFILE_L2, readProfileL2Request);
}

export default function* rootSaga() {
  yield all([fork(readProfileL2Data)]);
}
