import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  ppAccessApproveRemoveSuccess,
  getPhotoPPReadOutgoingRequestsApprovalesSuccess,
  getPhotoPPReadIncomingApprovedPendingRequestsSuccess,
  sendLoveMatchRequestSuccess,
  getLoveSentRequestsSuccess,
  getLoveMatchedAndReceivedRequestsSuccess,
  getUserViewsSuccess,
  blockUserSuccess
} from "../actions/Interaction";
import {
  REQUEST_PP_ACCESS_APPROVE_REMOVE,
  GET_PHOTO_PP_READ_OUTGOING_REQUESTS_APPROVALES,
  GET_PHOTO_PP_READ_INCOMING_APPROVED_PENDING_REQUESTS,
  SEND_LOVE_MATCH_REQUEST,
  GET_LOVE_SENT_REQUESTS,
  GET_LOVE_MATCHED_AND_RECEIVED_REQUESTS,
  GET_USER_VIEWS,
  BLOCK_USER
} from "../constants/ActionTypes";
import { showProfileMessage } from "../actions/Profile";
import { interaction } from "../services/interaction";

const ppAccessApproveRemove = async (action, profileid, country, city, varea) =>
  await interaction
    .requestPPAccessApproveRemove(action, profileid, country, city, varea)
    .then(returnData => returnData)
    .catch(error => error);

const getPhotoReadPPOutgoingRequestsApprovales = async (scoreH, offset) =>
  await interaction
    .requestGetPhotoPPReadOutgoingRequestsApprovales(scoreH, offset)
    .then(returnData => returnData)
    .catch(error => error);

const getPhotoReadPPIncomingApprovePendingRequests = async (
  action,
  scoreH,
  offset
) =>
  await interaction
    .requestGetPhotoReadPPIncomingApprovePendingRequests(action, scoreH, offset)
    .then(returnData => returnData)
    .catch(error => error);

const loveMatchSendRequest = async (profileid, country, city, varea) =>
  await interaction
    .sendLoveMatchRequest(profileid, country, city, varea)
    .then(returnData => returnData)
    .catch(error => error);

const loveSentRequests = async (scoreH, offset) =>
  await interaction
    .getLoveSentRequests(scoreH, offset)
    .then(returnData => returnData)
    .catch(error => error);

const loveMatchedAndReceivedRequests = async (action, scoreH, offset) =>
  await interaction
    .getLoveMatchedAndReceivedRequests(action, scoreH, offset)
    .then(returnData => returnData)
    .catch(error => error);

const userViewsRequest = async (start, end) =>
  await interaction
    .getUserViews(start, end)
    .then(returnData => returnData)
    .catch(error => error);

const blockUserRequest = async (profileid, country, city, varea) =>
  await interaction
    .blockUser(profileid, country, city, varea)
    .then(returnData => returnData)
    .catch(error => error);
/////
function* ppAccessApproveRemoveRequest({ payload }) {
  const { action, profileid, country, city, varea } = payload;
  console.log("access pp read saga ", action, profileid, country, city, varea);
  try {
    const returnedData = yield call(
      ppAccessApproveRemove,
      action,
      profileid,
      country,
      city,
      varea
    );
    if (returnedData.message) {
      yield put(showProfileMessage(returnedData.message));
    } else {
      yield put(ppAccessApproveRemoveSuccess(returnedData));
    }
  } catch (error) {
    yield put(showProfileMessage(error));
  }
}

function* getPhotoPPReadOutgoingRequestsApprovalesRequest({ payload }) {
  const { scoreH, offset } = payload;
  console.log("Outgoing pp read saga ", scoreH, offset);
  try {
    const returnedData = yield call(
      getPhotoReadPPOutgoingRequestsApprovales,
      scoreH,
      offset
    );
    if (returnedData.message) {
      yield put(showProfileMessage(returnedData.message));
    } else {
      yield put(getPhotoPPReadOutgoingRequestsApprovalesSuccess(returnedData));
    }
  } catch (error) {
    yield put(showProfileMessage(error));
  }
}

function* getPhotoPPReadIncomingApprovePendingRequest({ payload }) {
  const { action, scoreH, offset } = payload;
  console.log("incoming pp read saga ", action, scoreH, offset);
  try {
    const returnedData = yield call(
      getPhotoReadPPIncomingApprovePendingRequests,
      action,
      scoreH,
      offset
    );
    if (returnedData.message) {
      yield put(showProfileMessage(returnedData.message));
    } else {
      yield put(
        getPhotoPPReadIncomingApprovedPendingRequestsSuccess(returnedData)
      );
    }
  } catch (error) {
    yield put(showProfileMessage(error));
  }
}

function* sendLoveMatchRequest({ payload }) {
  const { profileid, country, city, varea } = payload;
  console.log("love match saga ", profileid, country, city, varea);
  try {
    const returnedData = yield call(
      loveMatchSendRequest,
      profileid,
      country,
      city,
      varea
    );
    if (returnedData.message) {
      yield put(showProfileMessage(returnedData.message));
    } else {
      yield put(sendLoveMatchRequestSuccess(returnedData));
    }
  } catch (error) {
    yield put(showProfileMessage(error));
  }
}

function* getLoveSentRequestsRequest({ payload }) {
  const { scoreH, offset } = payload;
  console.log("love sent requests saga ", scoreH, offset);
  try {
    const returnedData = yield call(loveSentRequests, scoreH, offset);
    if (returnedData.message) {
      yield put(showProfileMessage(returnedData.message));
    } else {
      yield put(getLoveSentRequestsSuccess(returnedData));
    }
  } catch (error) {
    yield put(showProfileMessage(error));
  }
}
function* getLoveMatchedAndReceivedRequestsRequest({ payload }) {
  const { action, scoreH, offset } = payload;
  console.log("love sent requests saga ", action, scoreH, offset);
  try {
    const returnedData = yield call(
      loveMatchedAndReceivedRequests,
      action,
      scoreH,
      offset
    );
    if (returnedData.message) {
      yield put(showProfileMessage(returnedData.message));
    } else {
      yield put(getLoveMatchedAndReceivedRequestsSuccess(returnedData));
    }
  } catch (error) {
    yield put(showProfileMessage(error));
  }
}

function* getUserViewsRequest({ payload }) {
  const { start, end } = payload;
  console.log("user Views saga ", start, end);
  try {
    const returnedData = yield call(userViewsRequest, start, end);
    if (returnedData.message) {
      yield put(showProfileMessage(returnedData.message));
    } else {
      yield put(getUserViewsSuccess(returnedData));
    }
  } catch (error) {
    yield put(showProfileMessage(error));
  }
}

function* userblockRequest({ payload }) {
  const { profileid, country, city, varea } = payload;
  console.log("user block saga ", profileid, country, city, varea);
  try {
    const returnedData = yield call(
      blockUserRequest,
      profileid,
      country,
      city,
      varea
    );
    if (returnedData.message) {
      yield put(showProfileMessage(returnedData.message));
    } else {
      yield put(blockUserSuccess(returnedData));
    }
  } catch (error) {
    yield put(showProfileMessage(error));
  }
}

///////
export function* requestPPAccessApproveRemove() {
  yield takeEvery(
    REQUEST_PP_ACCESS_APPROVE_REMOVE,
    ppAccessApproveRemoveRequest
  );
}

export function* requestGetPhotoPPReadOutgoingRequestsApprovales() {
  yield takeEvery(
    GET_PHOTO_PP_READ_OUTGOING_REQUESTS_APPROVALES,
    getPhotoPPReadOutgoingRequestsApprovalesRequest
  );
}

export function* requestGetPhotoPPReadIncomingApprovePending() {
  yield takeEvery(
    GET_PHOTO_PP_READ_INCOMING_APPROVED_PENDING_REQUESTS,
    getPhotoPPReadIncomingApprovePendingRequest
  );
}

export function* requestSendLoveMatch() {
  yield takeEvery(SEND_LOVE_MATCH_REQUEST, sendLoveMatchRequest);
}
export function* requestGetLoveSentRequests() {
  yield takeEvery(GET_LOVE_SENT_REQUESTS, getLoveSentRequestsRequest);
}

export function* requestGetLoveMatchedAndReceivedRequests() {
  yield takeEvery(
    GET_LOVE_MATCHED_AND_RECEIVED_REQUESTS,
    getLoveMatchedAndReceivedRequestsRequest
  );
}

export function* requestGetUserViews() {
  yield takeEvery(GET_USER_VIEWS, getUserViewsRequest);
}

export function* requestBlockUser() {
  yield takeEvery(BLOCK_USER, userblockRequest);
}

export default function* rootSaga() {
  yield all([
    fork(requestPPAccessApproveRemove),
    fork(requestGetPhotoPPReadOutgoingRequestsApprovales),
    fork(requestGetPhotoPPReadIncomingApprovePending),
    fork(requestSendLoveMatch),
    fork(requestGetLoveSentRequests),
    fork(requestGetLoveMatchedAndReceivedRequests),
    fork(requestGetUserViews),
    fork(requestBlockUser)
  ]);
}
