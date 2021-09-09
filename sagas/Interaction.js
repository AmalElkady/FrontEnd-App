import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  ppAccessApproveRemoveSuccess,
  getPhotoPPReadOutgoingRequestsApprovalsSuccess,
  getPhotoPPReadIncomingApprovedPendingRequestsSuccess,
  sendLoveMatchRequestSuccess,
  getLoveSentRequestsSuccess,
  getLoveMatchedAndReceivedRequestsSuccess,
  getUserViewsSuccess,
  blockUserSuccess,
  unblockUserSuccess,
  getBlockedUsersSuccess,
  getNotificationViewPPLoveSuccess,
  cleanNotificationViewPPLoveSuccess,
  errorJwt8Success,
  addUserOnlineOfflineSuccess,
  reportUserSuccess
} from "../actions/Interaction";
import {
  REQUEST_PP_ACCESS_APPROVE_REMOVE,
  GET_PHOTO_PP_READ_OUTGOING_REQUESTS_APPROVALES,
  GET_PHOTO_PP_READ_INCOMING_APPROVED_PENDING_REQUESTS,
  SEND_LOVE_MATCH_REQUEST,
  GET_LOVE_SENT_REQUESTS,
  GET_LOVE_MATCHED_AND_RECEIVED_REQUESTS,
  GET_USER_VIEWS,
  BLOCK_USER,
  UNBLOCK_USER,
  GET_BLOCKED_USERS,
  GET_NOTIFICATION_VIEW_PP_LOVE,
  CLEAN_NOTIFICATION_VIEW_PP_LOVE,
  ADD_USER_ONLINE_OFFLINE,
  REPORT_USER
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

const unblockUserRequest = async (profileid, country, city, varea) =>
  await interaction
    .unblockUser(profileid, country, city, varea)
    .then(returnData => returnData)
    .catch(error => error);

const getUsersBlocked = async (scoreH, offset) =>
  await interaction
    .getBlockedUsers(scoreH, offset)
    .then(returnData => returnData)
    .catch(error => error);

const getViewPPLoveNotification = async (
  unread,
  viewScoreHigh,
  ppScoreHigh,
  loveScoreHigh,
  offset
) =>
  await interaction
    .getNotificationViewPPLove(
      unread,
      viewScoreHigh,
      ppScoreHigh,
      loveScoreHigh,
      offset
    )
    .then(returnData => returnData)
    .catch(error => error);

const cleanViewPPLoveNotification = async (
  remove,
  viewScoreLow,
  viewScoreHigh,
  ppScoreLow,
  ppScoreHigh,
  loveScoreLow,
  loveScoreHigh
) =>
  await interaction
    .cleanNotificationViewPPLove(
      remove,
      viewScoreLow,
      viewScoreHigh,
      ppScoreLow,
      ppScoreHigh,
      loveScoreLow,
      loveScoreHigh
    )
    .then(returnData => returnData)
    .catch(error => error);

const addUserOnlineOffline = async action =>
  await interaction
    .addUserOnlineOffline(action)
    .then(returnData => returnData)
    .catch(error => error);

const reportUserRequest = async (
  reasonid,
  profileid,
  country,
  city,
  varea,
  comment
) =>
  await interaction
    .reportUser(reasonid, profileid, country, city, varea, comment)
    .then(returnData => returnData)
    .catch(error => error);

/////

function* addUserOnlineOfflineRequest({ payload }) {
  const { action } = payload;

  try {
    const returnedData = yield call(addUserOnlineOffline, action);
    if (returnedData.message) {
      // yield put(ppAccessApproveRemoveSuccess(returnedData.message));
      yield put(addUserOnlineOfflineSuccess(true));
    } else {
      yield put(addUserOnlineOfflineSuccess(true));
    }
  } catch (error) {
    yield put(showProfileMessage(error));
  }
}

function* ppAccessApproveRemoveRequest({ payload }) {
  const { action, profileid, country, city, varea } = payload;

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
      yield put(ppAccessApproveRemoveSuccess(returnedData.message));
    } else {
      yield put(ppAccessApproveRemoveSuccess(true));
    }
  } catch (error) {
    yield put(showProfileMessage(error));
  }
}

function* getPhotoPPReadOutgoingRequestsApprovalesRequest({ payload }) {
  const { scoreH, offset } = payload;

  try {
    const returnedData = yield call(
      getPhotoReadPPOutgoingRequestsApprovales,
      scoreH,
      offset
    );
    if (returnedData.message) {
      yield put(showProfileMessage(returnedData.message));
    } else {
      yield put(getPhotoPPReadOutgoingRequestsApprovalsSuccess(returnedData));
    }
  } catch (error) {
    yield put(showProfileMessage(error));
  }
}

function* getPhotoPPReadIncomingApprovePendingRequest({ payload }) {
  const { action, scoreH, offset } = payload;

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

  try {
    const returnedData = yield call(
      loveMatchSendRequest,
      profileid,
      country,
      city,
      varea
    );
    if (returnedData.message) {
      yield put(sendLoveMatchRequestSuccess("error"));
    } else {
      yield put(sendLoveMatchRequestSuccess(true));
    }
  } catch (error) {
    yield put(showProfileMessage(error));
  }
}

function* getLoveSentRequestsRequest({ payload }) {
  const { scoreH, offset } = payload;
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

function* userBlockRequest({ payload }) {
  const { profileid, country, city, varea } = payload;
  try {
    const returnedData = yield call(
      blockUserRequest,
      profileid,
      country,
      city,
      varea
    );
    if (returnedData.message) {
      yield put(blockUserSuccess("error"));
    } else {
      yield put(blockUserSuccess(true));
    }
  } catch (error) {
    yield put(showProfileMessage(error));
  }
}
function* userUnblockRequest({ payload }) {
  const { profileid, country, city, varea } = payload;

  try {
    const returnedData = yield call(
      unblockUserRequest,
      profileid,
      country,
      city,
      varea
    );
    if (returnedData.message) {
      yield put(unblockUserSuccess("error"));
    } else {
      yield put(unblockUserSuccess(true));
    }
  } catch (error) {
    yield put(showProfileMessage(error));
  }
}

function* getBlockedUsersRequest({ payload }) {
  const { scoreH, offset } = payload;

  try {
    const returnedData = yield call(getUsersBlocked, scoreH, offset);
    if (returnedData.message) {
      yield put(showProfileMessage(returnedData.message));
    } else {
      yield put(getBlockedUsersSuccess(returnedData));
    }
  } catch (error) {
    yield put(showProfileMessage(error));
  }
}

function* getNotificationViewPPLoveRequest({ payload }) {
  const { unread, viewScoreHigh, ppScoreHigh, loveScoreHigh, offset } = payload;

  try {
    const returnedData = yield call(
      getViewPPLoveNotification,
      unread,
      viewScoreHigh,
      ppScoreHigh,
      loveScoreHigh,
      offset
    );
    if (returnedData.message) {
      yield put(showProfileMessage(returnedData.message));
    } else if (returnedData.error_jwt8) {
      yield put(errorJwt8Success(true));
    } else {
      yield put(getNotificationViewPPLoveSuccess(unread, returnedData));
    }
  } catch (error) {
    yield put(showProfileMessage(error));
  }
}

function* cleanNotificationViewPPLoveRequest({ payload }) {
  const {
    remove,
    viewScoreLow,
    viewScoreHigh,
    ppScoreLow,
    ppScoreHigh,
    loveScoreLow,
    loveScoreHigh
  } = payload;

  try {
    const returnedData = yield call(
      cleanViewPPLoveNotification,
      remove,
      viewScoreLow,
      viewScoreHigh,
      ppScoreLow,
      ppScoreHigh,
      loveScoreLow,
      loveScoreHigh
    );
    if (returnedData.message) {
      yield put(cleanNotificationViewPPLoveSuccess(false));
    } else {
      yield put(cleanNotificationViewPPLoveSuccess(true));
    }
  } catch (error) {
    yield put(showProfileMessage(error));
  }
}

function* userReportRequest({ payload }) {
  const { reasonid, profileid, country, city, varea, comment } = payload;

  try {
    const returnedData = yield call(
      reportUserRequest,
      reasonid,
      profileid,
      country,
      city,
      varea,
      comment
    );
    if (returnedData.message) {
      yield put(showProfileMessage(returnedData.message));
    } else {
      yield put(reportUserSuccess(true));
    }
  } catch (error) {
    yield put(showProfileMessage(error));
  }
}

///////

export function* requestAddUserOnlineOfflineRequest() {
  yield takeEvery(ADD_USER_ONLINE_OFFLINE, addUserOnlineOfflineRequest);
}

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
  yield takeEvery(BLOCK_USER, userBlockRequest);
}

export function* requestUnblockUser() {
  yield takeEvery(UNBLOCK_USER, userUnblockRequest);
}

export function* requestBlockedUsers() {
  yield takeEvery(GET_BLOCKED_USERS, getBlockedUsersRequest);
}

export function* requestGetNotificationViewPPLove() {
  yield takeEvery(
    GET_NOTIFICATION_VIEW_PP_LOVE,
    getNotificationViewPPLoveRequest
  );
}

export function* requestCleanNotificationViewPPLove() {
  yield takeEvery(
    CLEAN_NOTIFICATION_VIEW_PP_LOVE,
    cleanNotificationViewPPLoveRequest
  );
}

export function* requestReportUser() {
  yield takeEvery(REPORT_USER, userReportRequest);
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
    fork(requestBlockUser),
    fork(requestUnblockUser),
    fork(requestBlockedUsers),
    fork(requestGetNotificationViewPPLove),
    fork(requestCleanNotificationViewPPLove),
    fork(requestAddUserOnlineOfflineRequest),
    fork(requestReportUser)
  ]);
}
