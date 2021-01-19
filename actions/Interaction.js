import {
  REQUEST_PP_ACCESS_APPROVE_REMOVE,
  REQUEST_PP_ACCESS_APPROVE_REMOVE_SUCCESS,
  GET_PHOTO_PP_READ_OUTGOING_REQUESTS_APPROVALES,
  GET_PHOTO_PP_READ_OUTGOING_REQUESTS_APPROVALES_SUCCESS,
  GET_PHOTO_PP_READ_INCOMING_APPROVED_PENDING_REQUESTS,
  GET_PHOTO_PP_READ_INCOMING_APPROVED_PENDING_REQUESTS_SUCCESS,
  SEND_LOVE_MATCH_REQUEST,
  SEND_LOVE_MATCH_REQUEST_SUCCESS,
  GET_LOVE_SENT_REQUESTS,
  GET_LOVE_SENT_REQUESTS_SUCCESS
} from "../constants/ActionTypes";

export const ppAccessApproveRemove = (
  action,
  profileid,
  country,
  city,
  varea
) => {
  return {
    type: REQUEST_PP_ACCESS_APPROVE_REMOVE,
    payload: { action, profileid, country, city, varea }
  };
};

export const ppAccessApproveRemoveSuccess = data => {
  return {
    type: REQUEST_PP_ACCESS_APPROVE_REMOVE_SUCCESS,
    payload: data
  };
};

export const getPhotoPPReadOutgoingRequestsApprovales = (scoreH, offset) => {
  return {
    type: GET_PHOTO_PP_READ_OUTGOING_REQUESTS_APPROVALES,
    payload: { scoreH, offset }
  };
};

export const getPhotoPPReadOutgoingRequestsApprovalesSuccess = data => {
  console.log("from success outgoing ", data);
  return {
    type: GET_PHOTO_PP_READ_OUTGOING_REQUESTS_APPROVALES_SUCCESS,
    payload: data
  };
};

export const getPhotoPPReadIncomingApprovedPendingRequests = (
  action,
  scoreH,
  offset
) => {
  return {
    type: GET_PHOTO_PP_READ_INCOMING_APPROVED_PENDING_REQUESTS,
    payload: { action, scoreH, offset }
  };
};

export const getPhotoPPReadIncomingApprovedPendingRequestsSuccess = data => {
  console.log("from success incoming ", data);
  return {
    type: GET_PHOTO_PP_READ_INCOMING_APPROVED_PENDING_REQUESTS_SUCCESS,
    payload: data
  };
};

export const sendLoveMatchRequest = (profileid, country, city, varea) => {
  return {
    type: SEND_LOVE_MATCH_REQUEST,
    payload: { profileid, country, city, varea }
  };
};

export const sendLoveMatchRequestSuccess = data => {
  console.log("from success love match request ", data);
  return {
    type: SEND_LOVE_MATCH_REQUEST_SUCCESS,
    payload: data
  };
};

export const getLoveSentRequests = (scoreH, offset) => {
  return {
    type: GET_LOVE_SENT_REQUESTS,
    payload: { scoreH, offset }
  };
};

export const getLoveSentRequestsSuccess = data => {
  console.log("from success get love requests ", data);
  return {
    type: GET_LOVE_SENT_REQUESTS_SUCCESS,
    payload: data
  };
};
