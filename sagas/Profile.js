import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  readProfileL2Success,
  readMyProfileL1Success,
  readMyProfileL2Success,
  updateProfileL1Success,
  updateProfileL2Success,
  readMyPhotosSuccess,
  showProfileMessage
} from "../actions/Profile";
import {
  READ_PROFILE_L2,
  READ_MY_PROFILE,
  UPDATE_PROFILE_L1,
  UPDATE_PROFILE_L2,
  READ_MY_PHOTOS
} from "../constants/ActionTypes";
import { profile } from "../services/profile";
const readProfileL2 = async (id, co, ci, va) =>
  await profile
    .readProfileL2(id, co, ci, va)
    .then(returnData => returnData)
    .catch(error => error);

const readMyProfile = async params =>
  await profile
    .readMyProfile(params)
    .then(returnData => returnData)
    .catch(error => error);

const readMyPhotos = async params =>
  await profile
    .readMyPhotos(params)
    .then(returnData => returnData)
    .catch(error => error);

const updateL1Profile = async martial =>
  await profile
    .updateProfileL1(martial)
    .then(returnData => returnData)
    .catch(error => error);

const updateL2Profile = async (na, tpercent, title, workd, edu, bio) =>
  await profile
    .updateProfileL2(na, tpercent, title, workd, edu, bio)
    .then(returnData => returnData)
    .catch(error => error);
/////
function* readProfileL2Request({ payload }) {
  const { id, co, ci, va } = payload;
  try {
    const returnedData = yield call(readProfileL2, id, co, ci, va);
    yield put(readProfileL2Success(returnedData));
  } catch (error) {
    yield put(showProfileMessage(error));
  }
}
function* readMyProfileRequest({ payload }) {
  try {
    const returnedData = yield call(readMyProfile, payload);
    if (payload == "L1") {
      yield put(readMyProfileL1Success(returnedData));
    } else {
      yield put(readMyProfileL2Success(returnedData));
    }
  } catch (error) {
    yield put(showProfileMessage(error));
  }
}

function* updateProfileL1Request({ payload }) {
  try {
    const returnedData = yield call(updateL1Profile, payload);
    yield put(updateProfileL1Success(returnedData, payload));
  } catch (error) {
    yield put(showProfileMessage(error));
  }
}

function* updateProfileL2Request({ payload }) {
  const { na, tpercent, title, workd, edu, bio } = payload;
  try {
    const returnedData = yield call(
      updateL2Profile,
      na,
      tpercent,
      title,
      workd,
      edu,
      bio
    );
    yield put(updateProfileL2Success(returnedData));
  } catch (error) {
    yield put(showProfileMessage(error));
  }
}

function* readMyPhotosRequest({ payload }) {
  try {
    const returnedData = yield call(readMyPhotos, payload);
    yield put(readMyPhotosSuccess(returnedData));
  } catch (error) {
    yield put(showProfileMessage(error));
  }
}

///////
export function* readProfileL2Data() {
  yield takeEvery(READ_PROFILE_L2, readProfileL2Request);
}

export function* readMyProfileData() {
  yield takeEvery(READ_MY_PROFILE, readMyProfileRequest);
}
export function* updateProfileL1() {
  yield takeEvery(UPDATE_PROFILE_L1, updateProfileL1Request);
}
export function* updateProfileL2() {
  yield takeEvery(UPDATE_PROFILE_L2, updateProfileL2Request);
}
export function* readMyPhoto() {
  yield takeEvery(READ_MY_PHOTOS, readMyPhotosRequest);
}

export default function* rootSaga() {
  yield all([
    fork(readProfileL2Data),
    fork(readMyProfileData),
    fork(updateProfileL1),
    fork(updateProfileL2),
    fork(readMyPhoto)
  ]);
}
