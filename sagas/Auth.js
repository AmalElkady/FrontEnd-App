import {all, call, fork, put, takeEvery} from "redux-saga/effects";
//import {
//    authfirebase,
//    facebookAuthProvider,
//    githubAuthProvider,
//    googleAuthProvider,
//    twitterAuthProvider
//} from "../firebaseConfig/index";

import {auth,tokenManagerOperations} from "../okta/okta";

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
	SEND_RESET_TOKEN,
	SEND_VERIFICATION_CODE,
	RESEND_VERIFICATION_TO_PHONE,
	CHANGE_PASSWORD
} from "../constants/ActionTypes";

import {showAuthMessage, 
		userSignInSuccess, 
		userSignOutSuccess, 
		userSignUpSuccess, 
		mpUploadSuccess,
		userProfileL2AddSuccess,
		userSendResetTokenSuccess, 
		userPasswordChangeSuccess, 
		userSendVerificationCodeSuccess,
		clearPersistedAuthState} from "../actions/Auth";//
		
import {
    userFacebookSignInSuccess,
    userGithubSignInSuccess,
    userGoogleSignInSuccess,
    userTwitterSignInSuccess
} from "../actions/Auth";

const createUserWithPhonePasswordRequest = async (phone, password, firstName, lastName, country, gender, year, month, day, city, martial) =>
    await  auth.createUserWithPhoneAndPassword(phone, password, firstName, lastName, country, gender, year, month, day, city, martial)
        .then(authUser => authUser)
        .catch(error => error);
		
const uploadMainProfilePhotoRequest = async (file) =>
    await  auth.uploadMainProfilePhoto(file)
        .then(uploadMessage => uploadMessage)
        .catch(error => error);
		
const addProfileLayer2Request = async (nationality,tpercent,workd,title,education,bio) =>
    await  auth.addUpdateProfileLayer2("add",nationality,tpercent,workd,title,education,bio)
        .then(authUser => authUser)
        .catch(error => error);

const signInUserWithPhonePasswordRequest = async (phone, password,country) =>
    await  auth.signInWithPhoneAndPassword(phone, password,country)
        .then(authUser => authUser)
        .catch(error => error);

const signOutRequest = async () =>
    await  auth.signOut()
        .then(authUser => authUser)
        .catch(error => error);


const sendResetPasswordTokenForUserPhoneRequest = async (phone,country) =>
    await auth.sendResetPasswordTokenForUserPhone(phone,country)
		.then(resetMessage => resetMessage)
		.catch(error => error);


const sendVerificationCodeForUserPhoneRequest = async (verificationCode) =>
    await auth.sendVerificationCodeForUserPhone(verificationCode)
		.then(verifyMessage => verifyMessage)
		.catch(error => error);
		
const resendVerificationToUserPhoneRequest = async () =>
    await auth.resendVerificationToUserPhone()
		.then(resendMessage => resendMessage)
		.catch(error => error);


const changePasswordWithTokenForUserPhoneRequest = async (token, newpassword, hw) =>
    await auth.changePasswordWithTokenForUserPhone(token, newpassword, hw)
		.then(changeMessage => changeMessage)
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

function* createUserWithPhonePassword({payload}) {
    const {phone, password, firstname, lastname, country, gender, year, month, day, city, martial} = payload;
	
    try {
        const signUpUser = yield call(createUserWithPhonePasswordRequest, phone, password, firstname, lastname, country, gender, year, month, day, city, martial);
		
        if (signUpUser.message) {
            yield put(showAuthMessage(signUpUser.message));
        } else {
			//localStorage.setItem('access_token','access_token')
			console.log("123456789");
			console.log(signUpUser);
			console.log("123456789");			
            yield put(userSignUpSuccess({authUser:'access_token', phone,country:`${country}`, name: signUpUser.n, birth: signUpUser.b, martial: signUpUser.m, gender: signUpUser.gender}));
        }
    } catch (error) {
        yield put(showAuthMessage(error));
    }
}


function* uploadMainProfilePhoto({payload}) {
    const {file} = payload;
	
    try {
        const photoUploadS3 = yield call(uploadMainProfilePhotoRequest, file);
		
        if (photoUploadS3.message) {
            yield put(showAuthMessage(photoUploadS3.message));
        } else {
			//localStorage.setItem('access_token','access_token')
			console.log("*******MPUPLOAD********");
			console.log(photoUploadS3);
			console.log("*******MPUPLOAD********");
			
            yield put(mpUploadSuccess());
        }
    } catch (error) {
        yield put(showAuthMessage(error));
    }
}

function* addProfileLayer2({payload}) {
    const {nationality,tpercent,workd,title,education,bio} = payload;
	
    try {
        const profileL2Added = yield call(addProfileLayer2Request,nationality,tpercent,workd,title,education,bio);
		
        if (profileL2Added.message) {
            yield put(showAuthMessage(profileL2Added.message));
        } else {			
            yield put(userProfileL2AddSuccess());
        }
    } catch (error) {
        yield put(showAuthMessage(error));
    }
}


function* sendResetPasswordTokenForUserPhone({payload}) {
    const { phone, country } = payload;
    try {
        const resetUser = yield call(sendResetPasswordTokenForUserPhoneRequest, phone, country);
        if (resetUser.message) {
            yield put(showAuthMessage(resetUser.message));
        } else {
			
            yield put(userSendResetTokenSuccess(true));
			console.log(resetUser.hw);
			localStorage.setItem('hw', JSON.stringify(resetUser.hw));
        }
    } catch (error) {
        yield put(showAuthMessage(error));
    }
}


function* sendVerificationCodeForUserPhone({payload}) {
    const { verificationCode } = payload;
    try {
        const verifyUser = yield call(sendVerificationCodeForUserPhoneRequest, verificationCode);
        if (verifyUser.message) {
            yield put(showAuthMessage(verifyUser.message));
        } else {
			
            yield put(userSendVerificationCodeSuccess(true));
			console.log(verifyUser);
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
			
            yield put(showAuthMessage("Message Successfuly Sent"));
			console.log(resendVerification);
        }
    } catch (error) {
        yield put(showAuthMessage(error));
    }
}



function* changePasswordWithTokenForUserPhone({payload}) {
    const { token, newpassword } = payload;
	let hw = JSON.parse(localStorage.getItem('hw'));
    try {
        const resetPassword = yield call(changePasswordWithTokenForUserPhoneRequest, token, newpassword, hw);
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

function* signInUserWithPhonePassword({payload}) {
    const {phone, password, country} = payload;
    try {
        const signInUser = yield call(signInUserWithPhonePasswordRequest, phone, password, country);
        if (signInUser.message) {
            yield put(showAuthMessage(signInUser.message));
        } else {
			//localStorage.setItem('access_token','access_token')
			//tokenManagerOperations.setTokenAndValidate('access_token','token')
			console.log("123456789");
			console.log(signInUser);
			console.log("123456789");
            yield put(userSignInSuccess({authUser:'access_token', phone,country:`${country}`, name: signInUser.n, birth: signInUser.b, martial: signInUser.m, gender: signInUser.gender}));
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

export function* addUserProfileL2() {
    yield takeEvery(ADD_PROFILEL2, addProfileLayer2);
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



export default function* rootSaga() {
    yield all([fork(signInUser),
        fork(createUserAccount),
        fork(uploadMPPhoto),
        fork(addUserProfileL2),
		fork(sendUserResetToken),
		fork(sendVerificationCode),
		fork(resendVerificationToPhone),
		fork(changeUserPasswordWithToken),
//       fork(signInWithGoogle),
//        fork(signInWithFacebook),
//        fork(signInWithTwitter),
//        fork(signInWithGithub),
        fork(signOutUser)]);
}