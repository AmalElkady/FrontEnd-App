import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  readProfileL2Success,
  readMyProfileL1Success,
  readMyProfileL2Success,
  updateProfileL1Success,
  updateProfileL2Success,
  readMyPhotosSuccess,
  readMyPhotosPPSuccess,
  changeMyPasswordSuccess,
  changeUserLoginPhoneSuccess,
  verifyUserLoginPhoneChangeSuccess,
  readMyPhoneAndPwDataSuccess,
  readMyPaymentAndSubSuccess,
  ppUploadSuccess,
  ppRemoveSuccess,
  permissionPPReadRemoveSuccess,
  requestPhotoReadPPSuccess,
  requestPhotoReadPPFail,
  updateMainPSuccess,
  showProfileMessage,
  deleteMyAccountSuccess
} from "../actions/Profile";
import { showAuthMessage } from "../actions/Auth";
import {
  READ_PROFILE_L2,
  READ_MY_PROFILE,
  UPDATE_PROFILE_L1,
  UPDATE_PROFILE_L2,
  CHANGE_MY_PASSWORD,
  CHANGE_USER_LOGIN_PHONE,
  VERIFY_USER_LOGIN_PHONE_CHANGE,
  READ_MY_PHONE_AND_PW_DATA,
  READ_MY_PAYMENTS_AND_SUB,
  REQUEST_PHOTO_UPLOAD_PP,
  REQUEST_REMOVE_PHOTO_PP,
  READ_MY_PHOTOS,
  REQUEST_PERMISSION_PP_READ_REMOVE,
  REQUEST_PHOTO_READ_PP,
  UPDATE_MAIN_PHOTO,
  DELETE_MY_ACCOUNT
} from "../constants/ActionTypes";
import { profile } from "../services/profile";
const readProfileL2 = async (id, co, ci, va) =>
  await profile
    .readProfileL2(id, co, ci, va)
    .then(returnedData => returnedData)
    .catch(error => error);

const readMyProfile = async params =>
  await profile
    .readMyProfile(params)
    .then(returnedData => returnedData)
    .catch(error => error);

const readPhotosPP = async (id, co, ci, va) =>
  await profile
    .readPhotosPP(id, co, ci, va)
    .then(returnedData => returnedData)
    .catch(error => error);

const readMyPhotos = async (params, size) =>
  await profile
    .readMyPhotos(params, size)
    .then(returnedData => returnedData)
    .catch(error => error);

const updateL1Profile = async martial =>
  await profile
    .updateProfileL1(martial)
    .then(returnedData => returnedData)
    .catch(error => error);

const updateL2Profile = async (na, tpercent, title, workd, edu, bio) =>
  await profile
    .updateProfileL2(na, tpercent, title, workd, edu, bio)
    .then(returnedData => returnedData)
    .catch(error => error);

const changePassword = async (oldPassword, newPassword) =>
  await profile
    .changePassword(oldPassword, newPassword)
    .then(returnedData => returnedData)
    .catch(error => error);

const changeUserPhone = async (newPhone, password) =>
  await profile
    .changeUserLoginPhone(newPhone, password)
    .then(returnedData => returnedData)
    .catch(error => error);

const verifyUserPhoneChange = async verifyCode =>
  await profile
    .verifyUserLoginPhoneChange(verifyCode)
    .then(returnedData => returnedData)
    .catch(error => error);

const readPhoneAndPwData = async () =>
  await profile
    .readMyPhoneAndMyPwData()
    .then(returnedData => returnedData)
    .catch(error => error);

const photoUploadPP = async (file, photoNum) =>
  await profile
    .requestPhotouploadPP(file, photoNum)
    .then(returnedData => returnedData)
    .catch(error => error);

const photoRemovePP = async photoNum =>
  await profile
    .requestRemovePhotoPP(photoNum)
    .then(returnedData => returnedData)
    .catch(error => error);

const deleteMyAccount = async (password, score, key) =>
  await profile
    .deleteMyAccount(password, score, key)
    .then(returnedData => returnedData)
    .catch(error => error);

const readPaymentsAndSub = async (count, start, end) =>
  await profile
    .readMyPaymentsAndSub(count, start, end)
    .then(returnedData => returnedData)
    .catch(error => error);

const updateMainPhoto = async file =>
  await profile
    .updateMainPhoto(file)
    .then(returnedData => returnedData)
    .catch(error => error);

const permissionReadRemovePP = async (
  action,
  profileid,
  country,
  city,
  varea
) =>
  await profile
    .requestPermissionPPReadRemove(action, profileid, country, city, varea)
    .then(returnedData => returnedData)
    .catch(error => error);
/////
function* readProfileL2Request({ payload }) {
  const { id, co, ci, va } = payload;
  try {
    const returnedData = yield call(readProfileL2, id, co, ci, va);
    yield put(readProfileL2Success(returnedData));
  } catch (error) {
    yield put(showAuthMessage(error));
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
    if (returnedData.message) {
      yield put(updateProfileL1Success(false, payload));
    } else {
      yield put(updateProfileL1Success(true, payload));
    }
  } catch (error) {
    yield put(showProfileMessage(error));
  }
}

function* updateProfileL2Request({ payload }) {
  const { nationality, tpercent, title, workd, education, bio } = payload;
  try {
    const returnedData = yield call(
      updateL2Profile,
      nationality,
      tpercent,
      title,
      workd,
      education,
      bio
    );
    yield put(updateProfileL2Success(returnedData, payload));
  } catch (error) {
    yield put(showProfileMessage(error));
  }
}

function* readMyPhotosRequest({ payload }) {
  const { params, size } = payload;
  try {
    const returnedData = yield call(readMyPhotos, params, size);
    if (returnedData.message) {
      yield put(showProfileMessage(returnedData.message));
    } else {
      if (returnedData._PH) {
        yield put(readMyPhotosPPSuccess(returnedData));
      } else {
        yield put(readMyPhotosSuccess(returnedData));
      }
    }
  } catch (error) {
    yield put(showProfileMessage(error));
  }
}

function* readPhotosPPRequest({ payload }) {
  const { id, co, ci, va } = payload;

  try {
    const returnedData = yield call(readPhotosPP, id, co, ci, va);

    if (returnedData.message) {
      yield put(requestPhotoReadPPFail(true));
    } else {
      yield put(requestPhotoReadPPSuccess(returnedData));
    }
  } catch (error) {
    yield put(showProfileMessage(error));
  }
}

function* changeMyPasswordRequest({ payload }) {
  const { oldPassword, newPassword } = payload;

  try {
    const returnedData = yield call(changePassword, oldPassword, newPassword);
    if (returnedData.message) {
      yield put(changeMyPasswordSuccess(false));
    } else {
      yield put(changeMyPasswordSuccess(true));
    }
  } catch (error) {
    yield put(showProfileMessage(error));
  }
}

function* changeUserLoginPhoneRequest({ payload }) {
  const { newPhone, password } = payload;

  try {
    const returnedData = yield call(changeUserPhone, newPhone, password);
    if (returnedData.message) {
      yield put(changeUserLoginPhoneSuccess(false));
    } else {
      yield put(changeUserLoginPhoneSuccess(true));
    }
  } catch (error) {
    yield put(showProfileMessage(error));
  }
}

function* verifyUserLoginPhoneChangeRequest({ payload }) {
  try {
    const returnedData = yield call(verifyUserPhoneChange, payload);
    if (returnedData.message) {
      yield put(verifyUserLoginPhoneChangeSuccess(false));
    } else {
      yield put(verifyUserLoginPhoneChangeSuccess(true));
    }
  } catch (error) {
    yield put(showProfileMessage(error));
  }
}

function* readMyPhoneAndPwDataRequest() {
  try {
    const returnedData = yield call(readPhoneAndPwData);
    if (returnedData.message) {
      yield put(showProfileMessage(returnedData.message));
    } else {
      yield put(readMyPhoneAndPwDataSuccess(returnedData));
    }
  } catch (error) {
    yield put(showProfileMessage(error));
  }
}

function* readMyPaymentsAndSubRequest({ payload }) {
  const { count, start, end } = payload;

  try {
    const returnedData = yield call(readPaymentsAndSub, count, start, end);
    if (returnedData.message) {
      yield put(showProfileMessage(returnedData.message));
    } else {
      yield put(readMyPaymentAndSubSuccess(returnedData));
    }
  } catch (error) {
    yield put(showProfileMessage(error));
  }
}

function* requestPhotoUploadPPRequest({ payload }) {
  const { file, photoNum } = payload;

  try {
    const returnedData = yield call(photoUploadPP, file, photoNum);
    if (returnedData.message) {
      yield put(showProfileMessage(returnedData.message));
    } else {
      yield put(ppUploadSuccess(true));
    }
  } catch (error) {
    yield put(showProfileMessage(error));
  }
}

function* requestRemovePhotoPPRequest({ payload }) {
  try {
    const returnedData = yield call(photoRemovePP, payload);
    if (returnedData.message) {
      yield put(showProfileMessage(returnedData.message));
    } else {
      yield put(ppRemoveSuccess(true));
    }
  } catch (error) {
    yield put(showProfileMessage(error));
  }
}

function* permissionPPReadRemoveRequest({ payload }) {
  const { action, profileid, country, city, varea } = payload;

  try {
    const returnedData = yield call(
      permissionReadRemovePP,
      action,
      profileid,
      country,
      city,
      varea
    );
    if (returnedData.message) {
      yield put(permissionPPReadRemoveSuccess("error"));
    } else {
      yield put(permissionPPReadRemoveSuccess(true));
    }
  } catch (error) {
    yield put(showProfileMessage(error));
  }
}

function* updateMainPhotoRequest({ payload }) {
  try {
    const returnedData = yield call(updateMainPhoto, payload);
    if (returnedData.message) {
      yield put(permissionPPReadRemoveSuccess("error"));
    } else {
      yield put(updateMainPSuccess(returnedData));
    }
  } catch (error) {
    yield put(showProfileMessage(error));
  }
}

function* deleteMyAccountRequest({ payload }) {
  console.log("from saga");
  const { password, score, key } = payload;
  try {
    const returnedData = yield call(deleteMyAccount, password, score, key);
    console.log("from saga returnedData", returnedData);
    if (returnedData.message) {
      yield put(deleteMyAccountSuccess("error"));
    } else {
      yield put(deleteMyAccountSuccess(true));
    }
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
export function* changeMyPassword() {
  yield takeEvery(CHANGE_MY_PASSWORD, changeMyPasswordRequest);
}

export function* changeUserLoginPhone() {
  yield takeEvery(CHANGE_USER_LOGIN_PHONE, changeUserLoginPhoneRequest);
}

export function* verifyUserLoginPhoneChange() {
  yield takeEvery(
    VERIFY_USER_LOGIN_PHONE_CHANGE,
    verifyUserLoginPhoneChangeRequest
  );
}

export function* readMyPhoneAndPwData() {
  yield takeEvery(READ_MY_PHONE_AND_PW_DATA, readMyPhoneAndPwDataRequest);
}

export function* readMyPaymentsAndSub() {
  yield takeEvery(READ_MY_PAYMENTS_AND_SUB, readMyPaymentsAndSubRequest);
}
export function* requestPhotoUploadPP() {
  yield takeEvery(REQUEST_PHOTO_UPLOAD_PP, requestPhotoUploadPPRequest);
}

export function* requestRemovePhotoPP() {
  yield takeEvery(REQUEST_REMOVE_PHOTO_PP, requestRemovePhotoPPRequest);
}

export function* requestPermissionPPReadRemove() {
  yield takeEvery(
    REQUEST_PERMISSION_PP_READ_REMOVE,
    permissionPPReadRemoveRequest
  );
}

export function* requestReadPhotosPP() {
  yield takeEvery(REQUEST_PHOTO_READ_PP, readPhotosPPRequest);
}

export function* requestUpdateMainPhoto() {
  yield takeEvery(UPDATE_MAIN_PHOTO, updateMainPhotoRequest);
}

export function* requestDeleteMyAccount() {
  yield takeEvery(DELETE_MY_ACCOUNT, deleteMyAccountRequest);
}

export default function* rootSaga() {
  yield all([
    fork(readProfileL2Data),
    fork(readMyProfileData),
    fork(updateProfileL1),
    fork(updateProfileL2),
    fork(readMyPhoto),
    fork(changeMyPassword),
    fork(changeUserLoginPhone),
    fork(verifyUserLoginPhoneChange),
    fork(readMyPhoneAndPwData),
    fork(readMyPaymentsAndSub),
    fork(requestPhotoUploadPP),
    fork(requestRemovePhotoPP),
    fork(requestPermissionPPReadRemove),
    fork(requestReadPhotosPP),
    fork(requestUpdateMainPhoto),
    fork(requestDeleteMyAccount)
  ]);
}
