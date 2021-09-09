import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import {
  sendMessageSuccess,
  getMessagesTotalUnRCountSuccess,
  readConversationSuccess,
  readAllMessagesCoversSuccess,
  clearConversationSuccess,
  deleteConversationSuccess,
  getProfilesSuccess,
  getProfilesOnlineStatusSuccess,
  setActiveConversationSuccess,
  setConversationTypingIndicatorSuccess,
  reportUserConversationSuccess,
  showMessageChat
} from "../actions/Messages";
import {
  SEND_MESSAGE,
  GET_MESSAGES_TOTAL_UNREAD_COUNT,
  READ_CONVERSATION,
  READ_ALL_MESSAGES_COVERS,
  CLEAR_CONVERSATION,
  DELETE_CONVERSATION,
  GET_PROFILES,
  GET_PROFILES_ONLINE_STATUS,
  SET_ACTIVE_CONVERSATION,
  SET_CONVERSATION_TYPING_INDICATOR,
  REPORT_USER_CONVERSATION
} from "../constants/ActionTypes";
import { messages } from "../services/messages";

const sendMessage = async (profileid, country, city, varea, message) =>
  await messages
    .sendMessage(profileid, country, city, varea, message)
    .then(returnedData => returnedData)
    .catch(error => error);

const getMessagesTotalUnCount = async () =>
  await messages
    .getMessagesTotalUrCount()
    .then(returnedData => returnedData)
    .catch(error => error);

const readConversation = async (
  profileid,
  country,
  city,
  varea,
  scoreL,
  offset,
  limit
) =>
  await messages
    .readConversation(profileid, country, city, varea, scoreL, offset, limit)
    .then(returnedData => returnedData)
    .catch(error => error);

const readAllMessagesCovers = async (scoreL, offset) =>
  await messages
    .readAllMessagesCovers(scoreL, offset)
    .then(returnedData => returnedData)
    .catch(error => error);

const clearConversation = async (profileid, country, city, varea) =>
  await messages
    .clearConversation(profileid, country, city, varea)
    .then(returnedData => returnedData)
    .catch(error => error);

const deleteConversation = async (profileid, country, city, varea) =>
  await messages
    .deleteConversation(profileid, country, city, varea)
    .then(returnedData => returnedData)
    .catch(error => error);

const getProfiles = async profileKeys =>
  await messages
    .getProfiles(profileKeys)
    .then(returnedData => returnedData)
    .catch(error => error);

const getProfilesOnlineStatus = async (checkProfiles, listForEachProfile) =>
  await messages
    .getProfilesOnlineStatus(checkProfiles, listForEachProfile)
    .then(returnedData => returnedData)
    .catch(error => error);

const setActiveConversation = async (
  profileid,
  country,
  city,
  varea,
  activate
) =>
  await messages
    .setActiveConversation(profileid, country, city, varea, activate)
    .then(returnedData => returnedData)
    .catch(error => error);

const setConversationTypingIndicator = async (
  profileid,
  country,
  city,
  varea,
  jnt,
  activate
) =>
  await messages
    .setConversationTypingIndicator(
      profileid,
      country,
      city,
      varea,
      jnt,
      activate
    )
    .then(returnedData => returnedData)
    .catch(error => error);

const reportUserConversationRequest = async (
  reasonid,
  profileid,
  country,
  city,
  varea,
  comment
) =>
  await messages
    .reportUserConversation(reasonid, profileid, country, city, varea, comment)
    .then(returnData => returnData)
    .catch(error => error);

/////

function* sendMessageRequest({ payload }) {
  const { profileid, country, city, varea, message } = payload;
  try {
    const returnedData = yield call(
      sendMessage,
      profileid,
      country,
      city,
      varea,
      message
    );
    if (returnedData.message) {
      yield put(showMessageChat(returnedData.message));
    } else {
      yield put(sendMessageSuccess(true));
    }
  } catch (error) {
    yield put(showMessageChat(error));
  }
}

function* getMessagesTotalUnCountRequest() {
  try {
    const returnedData = yield call(getMessagesTotalUnCount);
    if (returnedData.message) {
      yield put(showMessageChat(returnedData.message));
    } else {
      yield put(getMessagesTotalUnRCountSuccess(returnedData));
    }
  } catch (error) {
    yield put(showMessageChat(error));
  }
}

function* readConversationRequest({ payload }) {
  const { profileid, country, city, varea, scoreL, offset, limit } = payload;
  try {
    const returnedData = yield call(
      readConversation,
      profileid,
      country,
      city,
      varea,
      scoreL,
      offset,
      limit
    );
    if (returnedData.message) {
      yield put(showMessageChat(returnedData.message));
    } else {
      yield put(readConversationSuccess(returnedData));
    }
  } catch (error) {
    yield put(showMessageChat(error));
  }
}

function* readAllMessagesCoversRequest({ payload }) {
  const { scoreL, offset } = payload;
  try {
    const returnedData = yield call(readAllMessagesCovers, scoreL, offset);
    if (returnedData.message) {
      yield put(showMessageChat(returnedData.message));
    } else {
      yield put(readAllMessagesCoversSuccess(returnedData));
    }
  } catch (error) {
    yield put(showMessageChat(error));
  }
}

function* clearConversationRequest({ payload }) {
  const { profileid, country, city, varea } = payload;
  try {
    const returnedData = yield call(
      clearConversation,
      profileid,
      country,
      city,
      varea
    );
    if (returnedData.message) {
      yield put(showMessageChat(returnedData.message));
    } else {
      yield put(clearConversationSuccess(true));
    }
  } catch (error) {
    yield put(showMessageChat(error));
  }
}

function* deleteConversationRequest({ payload }) {
  const { profileid, country, city, varea } = payload;

  try {
    const returnedData = yield call(
      deleteConversation,
      profileid,
      country,
      city,
      varea
    );
    if (returnedData.message) {
      yield put(showMessageChat(returnedData.message));
    } else {
      yield put(deleteConversationSuccess(returnedData));
    }
  } catch (error) {
    yield put(showMessageChat(error));
  }
}

function* getProfilesRequest({ payload }) {
  try {
    const returnedData = yield call(getProfiles, payload);
    if (returnedData.message) {
      yield put(showMessageChat(returnedData.message));
    } else {
      yield put(getProfilesSuccess(returnedData));
    }
  } catch (error) {
    yield put(showMessageChat(error));
  }
}

function* getProfilesOnlineStatusRequest({ payload }) {
  const { checkProfiles, listForEachProfile } = payload;

  try {
    const returnedData = yield call(
      getProfilesOnlineStatus,
      checkProfiles,
      listForEachProfile
    );
    if (returnedData.message) {
      yield put(showMessageChat(returnedData.message));
    } else {
      yield put(getProfilesOnlineStatusSuccess(returnedData));
    }
  } catch (error) {
    yield put(showMessageChat(error));
  }
}

function* setActiveConversationRequest({ payload }) {
  const { profileid, country, city, varea, activate } = payload;

  try {
    const returnedData = yield call(
      setActiveConversation,
      profileid,
      country,
      city,
      varea,
      activate
    );
    if (returnedData.message) {
      yield put(showMessageChat(returnedData.message));
    } else {
      yield put(setActiveConversationSuccess(returnedData));
    }
  } catch (error) {
    yield put(showMessageChat(error));
  }
}

function* setConversationTypingIndicatorRequest({ payload }) {
  const { profileid, country, city, varea, jnt, activate } = payload;

  try {
    const returnedData = yield call(
      setConversationTypingIndicator,
      profileid,
      country,
      city,
      varea,
      jnt,
      activate
    );
    if (returnedData.message) {
      yield put(showMessageChat(returnedData.message));
    } else {
      yield put(setConversationTypingIndicatorSuccess(returnedData));
    }
  } catch (error) {
    yield put(showMessageChat(error));
  }
}

function* userReportConversationRequest({ payload }) {
  const { reasonid, profileid, country, city, varea, comment } = payload;

  try {
    const returnedData = yield call(
      reportUserConversationRequest,
      reasonid,
      profileid,
      country,
      city,
      varea,
      comment
    );
    if (returnedData.message) {
      yield put(showMessageChat(returnedData.message));
    } else {
      yield put(reportUserConversationSuccess(true));
    }
  } catch (error) {
    yield put(showMessageChat(error));
  }
}

///////

export function* requestSendMessage() {
  yield takeEvery(SEND_MESSAGE, sendMessageRequest);
}

export function* requestGetMessagesTotalUnCount() {
  yield takeEvery(
    GET_MESSAGES_TOTAL_UNREAD_COUNT,
    getMessagesTotalUnCountRequest
  );
}

export function* requestReadConversation() {
  yield takeEvery(READ_CONVERSATION, readConversationRequest);
}

export function* requestAllMessagesCovers() {
  yield takeEvery(READ_ALL_MESSAGES_COVERS, readAllMessagesCoversRequest);
}

export function* requestClearConversation() {
  yield takeEvery(CLEAR_CONVERSATION, clearConversationRequest);
}

export function* requestDeleteConversation() {
  yield takeEvery(DELETE_CONVERSATION, deleteConversationRequest);
}

export function* requestGetProfiles() {
  yield takeEvery(GET_PROFILES, getProfilesRequest);
}

export function* requestGetProfilesOnlineStatus() {
  yield takeEvery(GET_PROFILES_ONLINE_STATUS, getProfilesOnlineStatusRequest);
}

export function* requestSetActiveConversation() {
  yield takeEvery(SET_ACTIVE_CONVERSATION, setActiveConversationRequest);
}

export function* requestSetConversationTypingIndicator() {
  yield takeEvery(
    SET_CONVERSATION_TYPING_INDICATOR,
    setConversationTypingIndicatorRequest
  );
}

export function* requestReportUserConversation() {
  yield takeEvery(REPORT_USER_CONVERSATION, userReportConversationRequest);
}

export default function* rootSaga() {
  yield all([
    fork(requestSendMessage),
    fork(requestGetMessagesTotalUnCount),
    fork(requestReadConversation),
    fork(requestAllMessagesCovers),
    fork(requestClearConversation),
    fork(requestDeleteConversation),
    fork(requestGetProfiles),
    fork(requestGetProfilesOnlineStatus),
    fork(requestSetActiveConversation),
    fork(requestSetConversationTypingIndicator),
    fork(requestReportUserConversation)
  ]);
}
