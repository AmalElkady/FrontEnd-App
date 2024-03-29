import { all, call, fork, put, takeEvery } from "redux-saga/effects";
//import {
//    authfirebase,
//    facebookAuthProvider,
//    githubAuthProvider,
//    googleAuthProvider,
//    twitterAuthProvider
//} from "../firebaseConfig/index";

import { auth, tokenManagerOperations } from "../okta/okta";

import {
  SIGNIN_FACEBOOK_USER,
  SIGNIN_GITHUB_USER,
  SIGNIN_GOOGLE_USER,
  SIGNIN_TWITTER_USER,
  SIGNIN_USER,
  SIGNOUT_USER,
  SIGNUP_USER,
  MP_UPLOAD,
  ADD_PROFILEL2,
  SUBSCRIBE,
  SEND_RESET_TOKEN,
  SEND_VERIFICATION_CODE,
  RESEND_VERIFICATION_TO_PHONE,
  CHANGE_PASSWORD,
  CHECK_MP_UPLOAD,
  CHANGE_PHONE_BEFORE_VERIF,
  ADD_PAYING_CUSTOMER,
  CREATE_CHECK_OUT_SESSION,
  CREATE_CHECK_OUT_SESSION_SUCCESS
} from "../constants/ActionTypes";

import {
  showAuthMessage,
  userSignInSuccess,
  userSignOutSuccess,
  userSignUpSuccess,
  mpUploadSuccess,
  userProfileL2AddSuccess,
  userAddSubscribeSuccess,
  userSendResetTokenSuccess,
  userPasswordChangeSuccess,
  userSendVerificationCodeSuccess,
  clearPersistedAuthState,
  showTimer,
  checkMpUploadSuccess,
  changeUserPhoneBeforeVerifSuccess,
  resendVerificationToPhoneSuccess,
  userSignIn,
  mpUploadToken0Success,
  addPayingCustomerSuccess,
  createCheckOutSessionSuccess
} from "../actions/Auth";

import {
  userFacebookSignInSuccess,
  userGithubSignInSuccess,
  userGoogleSignInSuccess,
  userTwitterSignInSuccess
} from "../actions/Auth";

const createUserWithPhonePasswordRequest = async (
  phone,
  password,
  firstName,
  lastName,
  country,
  countryiso2,
  gender,
  year,
  month,
  day,
  city,
  martial,
  score,
  key
) =>
  await auth
    .createUserWithPhoneAndPassword(
      phone,
      password,
      firstName,
      lastName,
      country,
      countryiso2,
      gender,
      year,
      month,
      day,
      city,
      martial,
      score,
      key
    )
    .then(authUser => authUser)
    .catch(error => error);

const changePhoneUserBeforeVerif = async (
  newPhone,
  phonecountrycode,
  countryiso2,
  newCity
) =>
  await auth
    .changeUserPhoneBeforeVerif(
      newPhone,
      phonecountrycode,
      countryiso2,
      newCity
    )
    .then(uploadMessage => uploadMessage)
    .catch(error => error);

const uploadMainProfilePhotoRequest = async file =>
  await auth
    .uploadMainProfilePhoto(file)
    .then(uploadMessage => uploadMessage)
    .catch(error => error);

const checkMpUploadReq = async () =>
  await auth
    .checkMPUploadphoto()
    .then(uploadMessage => uploadMessage)
    .catch(error => error);

const addProfileLayer2Request = async (
  nationality,
  tpercent,
  workd,
  title,
  education,
  bio
) =>
  await auth
    .addUpdateProfileLayer2(
      "add",
      nationality,
      tpercent,
      workd,
      title,
      education,
      bio
    )
    .then(authUser => authUser)
    .catch(error => error);

const addSubRequest = async (subscribePack, sessionId) =>
  await auth
    .subscribe(subscribePack, sessionId)
    .then(authUser => authUser)
    .catch(error => error);

const signInUserWithPhonePasswordRequest = async (
  phone,
  password,
  country,
  key
) =>
  await auth
    .signInWithPhoneAndPassword(phone, password, country, key)
    .then(authUser => authUser)
    .catch(error => error);

const signOutRequest = async () =>
  await auth
    .signOut()
    .then(authUser => authUser)
    .catch(error => error);

const sendResetPasswordTokenForUserPhoneRequest = async (
  phone,
  country,
  countryiso2
) =>
  await auth
    .sendResetPasswordTokenForUserPhone(phone, country, countryiso2)
    .then(resetMessage => resetMessage)
    .catch(error => error);

const sendVerificationCodeForUserPhoneRequest = async verificationCode =>
  await auth
    .sendVerificationCodeForUserPhone(verificationCode)
    .then(verifyMessage => verifyMessage)
    .catch(error => error);

const resendVerificationToUserPhoneRequest = async () =>
  await auth
    .resendVerificationToUserPhone()
    .then(resendMessage => resendMessage)
    .catch(error => error);

const changePasswordWithTokenForUserPhoneRequest = async (
  token,
  newpassword,
  hw
) =>
  await auth
    .changePasswordWithTokenForUserPhone(token, newpassword, hw)
    .then(changeMessage => changeMessage)
    .catch(error => error);

const addPayingCustomerRequest = async () =>
  await auth
    .addPayingCustomer()
    .then(returedData => returedData)
    .catch(error => error);

const createCheckOutSessionRequest = async pack =>
  await auth
    .createCheckOutSession(pack)
    .then(returedData => returedData)
    .catch(error => error);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//const signInUserWithGoogleRequest = async () =>
//    await  authfirebase.signInWithPopup(googleAuthProvider)
//        .then(authUser => authUser)
//        .catch(error => error);
//
//const signInUserWithFacebookRequest = async () =>
//    await  authfirebase.signInWithPopup(facebookAuthProvider)
//        .then(authUser => authUser)
//        .catch(error => error);
//
//const signInUserWithGithubRequest = async () =>
//    await  authfirebase.signInWithPopup(githubAuthProvider)
//        .then(authUser => authUser)
//        .catch(error => error);
//
//const signInUserWithTwitterRequest = async () =>
//    await  authfirebase.signInWithPopup(twitterAuthProvider)
//        .then(authUser => authUser)
//        .catch(error => error);

function* createUserWithPhonePassword({ payload }) {
  const { user, score, key } = payload;
  const {
    phone,
    password,
    firstname,
    lastname,
    country,
    countryiso2,
    gender,
    year,
    month,
    day,
    city,
    martial
  } = user;

  try {
    const signUpUser = yield call(
      createUserWithPhonePasswordRequest,
      phone,
      password,
      firstname,
      lastname,
      country,
      countryiso2,
      gender,
      year,
      month,
      day,
      city,
      martial,
      score,
      key
    );

    if (signUpUser.message) {
      yield put(showAuthMessage(signUpUser.message));
    } else {
      yield put(
        // userSignUpSuccess({
        //   authUser: "access_token",
        //   phone,
        //   country: `${country}`,
        //   countryiso2,
        //   city,
        //   name: signUpUser.n,
        //   birth: signUpUser.b,
        //   martial: signUpUser.m,
        //   gender: signUpUser.gender,
        //   sub: signUpUser.sub
        // })

        userSignIn({
          phone: phone,
          password,
          country: country
        })
      );
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

function* uploadMainProfilePhoto({ payload }) {
  try {
    const photoUploadS3 = yield call(uploadMainProfilePhotoRequest, payload);

    if (photoUploadS3.message) {
      yield put(showAuthMessage(photoUploadS3.message));
    } else if (photoUploadS3.token0) {
      yield put(mpUploadToken0Success(true));
    } else {
      yield put(mpUploadSuccess(true));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

function* checkMpUploadRequest() {
  try {
    const checkResponse = yield call(checkMpUploadReq);
    yield put(checkMpUploadSuccess(checkResponse));
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

function* addProfileLayer2({ payload }) {
  const { nationality, tpercent, workd, title, education, bio } = payload;

  try {
    const profileL2Added = yield call(
      addProfileLayer2Request,
      nationality,
      tpercent,
      workd,
      title,
      education,
      bio
    );
    if (profileL2Added.message) {
      yield put(showAuthMessage(profileL2Added.message));
    } else {
      yield put(userProfileL2AddSuccess());
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

function* addSubscribe({ payload }) {
  const { pack, sessionId } = payload;
  try {
    const subAdded = yield call(addSubRequest, pack, sessionId);
    if (subAdded.message) {
      yield put(showAuthMessage(subAdded.message));
    } else {
      yield put(userAddSubscribeSuccess());
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

function* sendResetPasswordTokenForUserPhone({ payload }) {
  const { phone, country, countryiso2 } = payload;
  try {
    const resetUser = yield call(
      sendResetPasswordTokenForUserPhoneRequest,
      phone,
      country,
      countryiso2
    );
    if (resetUser.message && resetUser.time) {
      yield put(showTimer(resetUser.time));
      yield put(showAuthMessage(resetUser.message));
    } else {
      yield put(userSendResetTokenSuccess(true));
      localStorage.setItem("hw", JSON.stringify(resetUser.hw));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

function* sendVerificationCodeForUserPhone({ payload }) {
  const { verificationCode } = payload;
  try {
    const verifyUser = yield call(
      sendVerificationCodeForUserPhoneRequest,
      verificationCode
    );
    if (verifyUser.message) {
      // yield put(showTimer(resetUser.time));
      yield put(showAuthMessage(verifyUser.message));
    } else {
      yield put(userSendVerificationCodeSuccess(true));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

function* resendVerificationToUserPhone() {
  try {
    const resendVerification = yield call(resendVerificationToUserPhoneRequest);
    if (resendVerification.message) {
      yield put(showAuthMessage(resendVerification.message));
    } else {
      yield put(resendVerificationToPhoneSuccess());
      //  yield put(showAuthMessage("Message Successfuly Sent"));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

function* changePasswordWithTokenForUserPhone({ payload }) {
  const { token, newpassword } = payload;
  let hw = JSON.parse(localStorage.getItem("hw"));
  try {
    const resetPassword = yield call(
      changePasswordWithTokenForUserPhoneRequest,
      token,
      newpassword,
      hw
    );
    if (resetPassword.message) {
      yield put(showAuthMessage(resetPassword.message));
    } else {
      localStorage.removeItem("hw");
      yield put(userPasswordChangeSuccess(true));
      yield put(clearPersistedAuthState());
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

function* changeUserPhoneBeforeVerifRequest({ payload }) {
  const { newPhone, phonecountrycode, countryiso2, newCity } = payload;
  try {
    const returnData = yield call(
      changePhoneUserBeforeVerif,
      newPhone,
      phonecountrycode,
      countryiso2,
      newCity
    );
    if (returnData.message) {
      yield put(showAuthMessage(returnData.message));
    } else {
      yield put(
        changeUserPhoneBeforeVerifSuccess(
          true,
          newPhone,
          phonecountrycode,
          countryiso2,
          newCity
        )
      );
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

function* customerAddPayingRequest() {
  try {
    const returnData = yield call(addPayingCustomerRequest);

    if (returnData.message) {
      yield put(showAuthMessage(returnData.message));
    } else {
      yield put(addPayingCustomerSuccess(returnData));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

function* requestCreateCheckOutSession({ payload }) {
  try {
    const returnData = yield call(createCheckOutSessionRequest, payload);

    if (returnData.message) {
      yield put(showAuthMessage(returnData.message));
    } else {
      yield put(createCheckOutSessionSuccess(returnData, payload));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//function* signInUserWithGoogle() {
//    try {
//        const signUpUser = yield call(signInUserWithGoogleRequest);
//        if (signUpUser.message) {
//            yield put(showAuthMessage(signUpUser.message));
//        } else {
//            localStorage.setItem('user_id', signUpUser.user.uid);
//            yield put(userGoogleSignInSuccess(signUpUser.user.uid));
//        }
//    } catch (error) {
//        yield put(showAuthMessage(error));
//    }
//}

//function* signInUserWithFacebook() {
//    try {
//        const signUpUser = yield call(signInUserWithFacebookRequest);
//        if (signUpUser.message) {
//            yield put(showAuthMessage(signUpUser.message));
//        } else {
//            localStorage.setItem('user_id', signUpUser.user.uid);
//            yield put(userFacebookSignInSuccess(signUpUser.user.uid));
//        }
//    } catch (error) {
//        yield put(showAuthMessage(error));
//    }
//}

//function* signInUserWithGithub() {
//    try {
//        const signUpUser = yield call(signInUserWithGithubRequest);
//        if (signUpUser.message) {
//            yield put(showAuthMessage(signUpUser.message));
//        } else {
//            localStorage.setItem('user_id', signUpUser.user.uid);
//            yield put(userGithubSignInSuccess(signUpUser.user.uid));
//        }
//    } catch (error) {
//        yield put(showAuthMessage(error));
//    }
//}

//function* signInUserWithTwitter() {
//    try {
//        const signUpUser = yield call(signInUserWithTwitterRequest);
//        if (signUpUser.message) {
//            if (signUpUser.message.length > 100) {
//                yield put(showAuthMessage('Your request has been canceled.'));
//            } else {
//                yield put(showAuthMessage(signUpUser.message));
//            }
//        } else {
//            localStorage.setItem('user_id', signUpUser.user.uid);
//            yield put(userTwitterSignInSuccess(signUpUser.user.uid));
//        }
//    } catch (error) {
//        yield put(showAuthMessage(error));
//    }
//}

function* signInUserWithPhonePassword({ payload }) {
  const { user, key } = payload;
  const { phone, password, country } = user;
  try {
    const signInUser = yield call(
      signInUserWithPhonePasswordRequest,
      phone,
      password,
      country,
      key
    );
    if (signInUser.message) {
      yield put(showAuthMessage(signInUser.message));
    } else if (signInUser.loginAgain) {
      yield put(
        userSignIn({
          phone: phone,
          password,
          country: country
        })
      );
    } else {
      //localStorage.setItem('access_token','access_token')
      //tokenManagerOperations.setTokenAndValidate('access_token','token')
      yield put(
        userSignInSuccess({
          authUser: "access_token",
          phone,
          country: `${country}`,
          name: signInUser.n,
          birth: signInUser.b,
          martial: signInUser.m,
          gender: signInUser.gender,
          sub: signInUser.sub,
          jnt: signInUser.jnt
        })
      );
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

function* signOut() {
  try {
    const signOutUser = yield call(signOutRequest);
    if (signOutUser === undefined) {
      //localStorage.removeItem('access_token');
      //	tokenManagerOperations.clearAllTokens('access_token');
      yield put(userSignOutSuccess(signOutUser));
    } else {
      yield put(showAuthMessage(signOutUser.message));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

export function* createUserAccount() {
  yield takeEvery(SIGNUP_USER, createUserWithPhonePassword);
}

export function* uploadMPPhoto() {
  yield takeEvery(MP_UPLOAD, uploadMainProfilePhoto);
}

export function* checkMpUpload() {
  yield takeEvery(CHECK_MP_UPLOAD, checkMpUploadRequest);
}

export function* addUserProfileL2() {
  yield takeEvery(ADD_PROFILEL2, addProfileLayer2);
}

export function* addUserSubscribe() {
  yield takeEvery(SUBSCRIBE, addSubscribe);
}

export function* sendUserResetToken() {
  yield takeEvery(SEND_RESET_TOKEN, sendResetPasswordTokenForUserPhone);
}

export function* sendVerificationCode() {
  yield takeEvery(SEND_VERIFICATION_CODE, sendVerificationCodeForUserPhone);
}

export function* resendVerificationToPhone() {
  yield takeEvery(RESEND_VERIFICATION_TO_PHONE, resendVerificationToUserPhone);
}

export function* changeUserPasswordWithToken() {
  yield takeEvery(CHANGE_PASSWORD, changePasswordWithTokenForUserPhone);
}

export function* changeUserPhoneBeforeVerif() {
  yield takeEvery(CHANGE_PHONE_BEFORE_VERIF, changeUserPhoneBeforeVerifRequest);
}

//export function* signInWithGoogle() {
//    yield takeEvery(SIGNIN_GOOGLE_USER, signInUserWithGoogle);
//}
//
//export function* signInWithFacebook() {
//    yield takeEvery(SIGNIN_FACEBOOK_USER, signInUserWithFacebook);
//}

//export function* signInWithTwitter() {
//    yield takeEvery(SIGNIN_TWITTER_USER, signInUserWithTwitter);
//}

//export function* signInWithGithub() {
//    yield takeEvery(SIGNIN_GITHUB_USER, signInUserWithGithub);
//}

export function* signInUser() {
  yield takeEvery(SIGNIN_USER, signInUserWithPhonePassword);
}

export function* signOutUser() {
  yield takeEvery(SIGNOUT_USER, signOut);
}

export function* requestAddPayingCustomer() {
  yield takeEvery(ADD_PAYING_CUSTOMER, customerAddPayingRequest);
}
export function* createCheckOutSession() {
  yield takeEvery(CREATE_CHECK_OUT_SESSION, requestCreateCheckOutSession);
}
export default function* rootSaga() {
  yield all([
    fork(signInUser),
    fork(createUserAccount),
    fork(uploadMPPhoto),
    fork(addUserProfileL2),
    fork(addUserSubscribe),
    fork(sendUserResetToken),
    fork(sendVerificationCode),
    fork(resendVerificationToPhone),
    fork(changeUserPasswordWithToken),
    //       fork(signInWithGoogle),
    //        fork(signInWithFacebook),
    //        fork(signInWithTwitter),
    //        fork(signInWithGithub),
    fork(signOutUser),
    fork(checkMpUpload),
    fork(changeUserPhoneBeforeVerif),
    fork(requestAddPayingCustomer),
    fork(createCheckOutSession)
  ]);
}
