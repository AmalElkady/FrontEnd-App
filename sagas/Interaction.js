import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  ppAccessApproveRemoveSuccess,
  getPhotoPPReadOutgoingRequestsApprovalesSuccess,
  getPhotoPPReadIncomingApprovedPendingRequestsSuccess
} from "../actions/Interaction";
import {
  REQUEST_PP_ACCESS_APPROVE_REMOVE,
  GET_PHOTO_PP_READ_OUTGOING_REQUESTS_APPROVALES,
  GET_PHOTO_PP_READ_INCOMING_APPROVED_PENDING_REQUESTS
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
      yield put(showProfileMessage(returnData.message));
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
      yield put(showProfileMessage(returnData.message));
    } else {
      yield put(
        getPhotoPPReadIncomingApprovedPendingRequestsSuccess(returnedData)
      );
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

export default function* rootSaga() {
  yield all([
    fork(requestPPAccessApproveRemove),
    fork(requestGetPhotoPPReadOutgoingRequestsApprovales),
    fork(requestGetPhotoPPReadIncomingApprovePending)
  ]);
}
