import {
  REQUEST_PP_ACCESS_APPROVE_REMOVE,
  REQUEST_PP_ACCESS_APPROVE_REMOVE_SUCCESS,
  GET_PHOTO_PP_READ_OUTGOING_REQUESTS_APPROVALES,
  GET_PHOTO_PP_READ_OUTGOING_REQUESTS_APPROVALES_SUCCESS
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
  console.log("from success outgoing ", DataTransferItem);
  return {
    type: GET_PHOTO_PP_READ_OUTGOING_REQUESTS_APPROVALES_SUCCESS,
    payload: data
  };
};
