import { all } from "redux-saga/effects";
import mailSagas from "./Mail";
import contactSagas from "./Contact";
import chatSagas from "./Chat";
import authSagas from "./Auth";

export default function* rootSaga(getState) {
  yield all([mailSagas(), contactSagas(), chatSagas(), authSagas()]);
}
