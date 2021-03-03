import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { showAuthMessage } from "../actions/Auth";
import {
  sendMessageSuccess,
  getMessagesTotalUnRCountSuccess,
  readConversationSuccess
} from "../actions/Messages";
import {
  SEND_MESSAGE,
  GET_MESSAGES_TOTAL_UNREAD_COUNT,
  READ_CONVERSATION
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
/////

function* sendMessageRequest({ payload }) {
  const { profileid, country, city, varea, message } = payload;
  console.log("send message saga ", profileid, country, city, varea, message);
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
  console.log("total count saga ");
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
  console.log(
    "read Conversation saga ",
    profileid,
    country,
    city,
    varea,
    scoreL,
    offset,
    limit
  );
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

export default function* rootSaga() {
  yield all([
    fork(requestSendMessage),
    fork(requestGetMessagesTotalUnCount),
    fork(requestReadConversation)
  ]);
}
