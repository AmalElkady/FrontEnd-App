import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { showAuthMessage } from "../actions/Auth";
import { sendMessageSuccess } from "../actions/Messages";
import { SEND_MESSAGE } from "../constants/ActionTypes";
import { messages } from "../services/messages";

const sendMessage = async (profileid, country, city, varea, message) =>
  await messages
    .sendMessage(profileid, country, city, varea, message)
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

///////

export function* requestSendMessage() {
  yield takeEvery(SEND_MESSAGE, sendMessageRequest);
}

export default function* rootSaga() {
  yield all([fork(requestSendMessage)]);
}
