import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { showAuthMessage } from "../actions/Auth";
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
  setConversationTypingIndicatorSuccess
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
  SET_CONVERSATION_TYPING_INDICATOR
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
      yield put(showAuthMessage(returnedData.message));
    } else {
      yield put(sendMessageSuccess(true));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

function* getMessagesTotalUnCountRequest() {
  try {
    const returnedData = yield call(getMessagesTotalUnCount);
    if (returnedData.message) {
      yield put(showAuthMessage(returnedData.message));
    } else {
      yield put(getMessagesTotalUnRCountSuccess(returnedData));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
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
      yield put(showAuthMessage(returnedData.message));
    } else {
      yield put(readConversationSuccess(returnedData));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

function* readAllMessagesCoversRequest({ payload }) {
  const { scoreL, offset } = payload;
  try {
    const returnedData = yield call(readAllMessagesCovers, scoreL, offset);
    if (returnedData.message) {
      yield put(showAuthMessage(returnedData.message));
    } else {
      yield put(readAllMessagesCoversSuccess(returnedData));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

function* clearConversationRequest({ payload }) {
  const { profileid, country, city, varea } = payload;
  console.log("clear Conversation saga ", profileid, country, city, varea);
  try {
    const returnedData = yield call(
      clearConversation,
      profileid,
      country,
      city,
      varea
    );
    if (returnedData.message) {
      yield put(showAuthMessage(returnedData.message));
    } else {
      yield put(clearConversationSuccess(true));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

function* deleteConversationRequest({ payload }) {
  const { profileid, country, city, varea } = payload;
  console.log("delete Conversation saga ", profileid, country, city, varea);
  try {
    const returnedData = yield call(
      deleteConversation,
      profileid,
      country,
      city,
      varea
    );
    if (returnedData.message) {
      yield put(showAuthMessage(returnedData.message));
    } else {
      yield put(deleteConversationSuccess(returnedData));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

function* getProfilesRequest({ payload }) {
  console.log("get profiles saga ", payload);
  try {
    const returnedData = yield call(getProfiles, payload);
    if (returnedData.message) {
      yield put(showAuthMessage(returnedData.message));
    } else {
      yield put(getProfilesSuccess(returnedData));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

function* getProfilesOnlineStatusRequest({ payload }) {
  const { checkProfiles, listForEachProfile } = payload;
  console.log(
    "get profiles online status saga ",
    checkProfiles,
    listForEachProfile
  );
  try {
    const returnedData = yield call(
      getProfilesOnlineStatus,
      checkProfiles,
      listForEachProfile
    );
    if (returnedData.message) {
      yield put(showAuthMessage(returnedData.message));
    } else {
      yield put(getProfilesOnlineStatusSuccess(returnedData));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

function* setActiveConversationRequest({ payload }) {
  const { profileid, country, city, varea, activate } = payload;
  console.log(
    "set active Conversation saga ",
    profileid,
    country,
    city,
    varea,
    activate
  );
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
      yield put(showAuthMessage(returnedData.message));
    } else {
      yield put(setActiveConversationSuccess(returnedData));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

function* setConversationTypingIndicatorRequest({ payload }) {
  const { profileid, country, city, varea, jnt, activate } = payload;
  console.log(
    " Conversation typing indicator saga ",
    profileid,
    country,
    city,
    varea,
    jnt,
    activate
  );
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
      yield put(showAuthMessage(returnedData.message));
    } else {
      yield put(setConversationTypingIndicatorSuccess(returnedData));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
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
    fork(requestSetConversationTypingIndicator)
  ]);
}
