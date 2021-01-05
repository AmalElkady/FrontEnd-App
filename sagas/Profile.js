import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  readProfileL2Success,
  readMyProfileL1Success,
  readMyProfileL2Success,
  updateProfileL1Success,
  updateProfileL2Success,
  readMyPhotosSuccess,
  changeMyPasswordSuccess,
  changeUserLoginPhoneSuccess,
  verifyUserLoginPhoneChangeSuccess,
  readMyPhoneAndPwDataSuccess,
  showProfileMessage
} from "../actions/Profile";
import {
  READ_PROFILE_L2,
  READ_MY_PROFILE,
  UPDATE_PROFILE_L1,
  UPDATE_PROFILE_L2,
  CHANGE_MY_PASSWORD,
  CHANGE_USER_LOGIN_PHONE,
  VERIFY_USER_LOGIN_PHONE_CHANGE,
  READ_MY_PHONE_AND_PW_DATA,
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

const changePassword = async (oldPassword,newPassword) =>
  await profile
    .changePassword(oldPassword,newPassword)
    .then(returnData => returnData)
    .catch(error => error);  
 
const changeUserPhone = async (newPhone,password) =>
  await profile
    .changeUserLoginPhone(newPhone,password)
    .then(returnData => returnData)
    .catch(error => error);  

const verifyUserPhoneChange = async (verifyCode) =>
  await profile
    .verifyUserLoginPhoneChange(verifyCode)
    .then(returnData => returnData)
    .catch(error => error);  

const readPhoneAndPwData = async () =>
  await profile
    .readMyPhoneAndMyPwData()
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
  try {
    const returnedData = yield call(readMyPhotos, payload);
    yield put(readMyPhotosSuccess(returnedData));
  } catch (error) {
    yield put(showProfileMessage(error));
  }
}

function* changeMyPasswordRequest({ payload }) {
  const {oldPassword,newPassword}=payload;
  console.log("oldPassword,newPassword saga ",oldPassword,newPassword)
  try {
    const returnedData = yield call(changePassword, oldPassword,newPassword);
    if(returnData.message){
    yield put(changeMyPasswordSuccess(false));
    }else{
      yield put(changeMyPasswordSuccess(true));
    }
  } catch (error) {
    yield put(showProfileMessage(error));
  }
}

function* changeUserLoginPhoneRequest({ payload }) {
  const {newPhone,password}=payload;
  console.log("oldPassword,newPassword saga ",newPhone,password)
  try {
    const returnedData = yield call(changeUserPhone, newPhone,password);
    if(returnData.message){
    yield put(changeUserLoginPhoneSuccess(false));
    }else{
      yield put(changeUserLoginPhoneSuccess(true));
    }
  } catch (error) {
    yield put(showProfileMessage(error));
  }
}

function* verifyUserLoginPhoneChangeRequest({ payload }) {
  console.log("verify from saga ",payload)
  try {
    const returnedData = yield call(verifyUserPhoneChange, payload);
    if(returnData.message){
    yield put(verifyUserLoginPhoneChangeSuccess(false));
    }else{
      yield put(verifyUserLoginPhoneChangeSuccess(true));
    }
  } catch (error) {
    yield put(showProfileMessage(error));
  }
}


function* readMyPhoneAndPwDataRequest() {
  try {
    const returnedData = yield call(readPhoneAndPwData);
    if(returnData.message){
    yield put(showProfileMessage(returnData.message));
    }else{
      yield put(readMyPhoneAndPwDataSuccess(returnedData));
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
  yield takeEvery(VERIFY_USER_LOGIN_PHONE_CHANGE, verifyUserLoginPhoneChangeRequest);
}

export function* readMyPhoneAndPwData() {
  yield takeEvery(READ_MY_PHONE_AND_PW_DATA, readMyPhoneAndPwDataRequest);
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
    fork(readMyPhoneAndPwData)
  ]);
}
