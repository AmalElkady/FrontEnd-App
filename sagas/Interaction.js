import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { ppAccessApproveRemoveSuccess } from "../actions/Interaction";
import { REQUEST_PP_ACCESS_APPROVE_REMOVE } from "../constants/ActionTypes";
import { interaction } from "../services/interaction";

const ppAccessApproveRemove = async (action, profileid, country, city, varea) =>
  await interaction
    .requestPPAccessApproveRemove(action, profileid, country, city, varea)
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
    if (returnData.message) {
      yield put(showProfileMessage(returnData.message));
    } else {
      yield put(ppAccessApproveRemoveSuccess(returnedData));
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

export default function* rootSaga() {
  yield all([fork(requestPPAccessApproveRemove)]);
}
