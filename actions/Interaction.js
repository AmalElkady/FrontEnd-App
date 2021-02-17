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
  GET_LOVE_SENT_REQUESTS_SUCCESS,
  GET_LOVE_MATCHED_AND_RECEIVED_REQUESTS,
  GET_LOVE_MATCHED_AND_RECEIVED_REQUESTS_SUCCESS,
  GET_USER_VIEWS,
  GET_USER_VIEWS_SUCCESS,
  BLOCK_USER,
  BLOCK_USER_SUCCESS,
  UNBLOCK_USER,
  UNBLOCK_USER_SUCCESS,
  GET_BLOCKED_USERS,
  GET_BLOCKED_USERS_SUCCESS,
  GET_NOTIFICATION_VIEW_PP_LOVE,
  GET_NOTIFICATION_VIEW_PP_LOVE_SUCCESS,
  CLICKED_ID,
  SELECTED_LOVE_ICON,
  SELECTED_PRIVATE_ICON,
  UPDATE_BLOCKED_LIST
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

export const getPhotoPPReadOutgoingRequestsApprovals = (scoreH, offset) => {
  return {
    type: GET_PHOTO_PP_READ_OUTGOING_REQUESTS_APPROVALES,
    payload: { scoreH, offset }
  };
};

export const getPhotoPPReadOutgoingRequestsApprovalsSuccess = data => {
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
  return {
    type: GET_LOVE_SENT_REQUESTS_SUCCESS,
    payload: data
  };
};

export const getLoveMatchedAndReceivedRequests = (action, scoreH, offset) => {
  return {
    type: GET_LOVE_MATCHED_AND_RECEIVED_REQUESTS,
    payload: { action, scoreH, offset }
  };
};

export const getLoveMatchedAndReceivedRequestsSuccess = data => {
  return {
    type: GET_LOVE_MATCHED_AND_RECEIVED_REQUESTS_SUCCESS,
    payload: data
  };
};

export const getUserViews = (start, end) => {
  return {
    type: GET_USER_VIEWS,
    payload: { start, end }
  };
};

export const getUserViewsSuccess = data => {
  console.log("from success get user views ", data);
  return {
    type: GET_USER_VIEWS_SUCCESS,
    payload: data
  };
};

export const blockUser = (profileid, country, city, varea) => {
  return {
    type: BLOCK_USER,
    payload: { profileid, country, city, varea }
  };
};

export const blockUserSuccess = data => {
  console.log("from success block user ", data);
  return {
    type: BLOCK_USER_SUCCESS,
    payload: data
  };
};

export const unblockUser = (profileid, country, city, varea) => {
  return {
    type: UNBLOCK_USER,
    payload: { profileid, country, city, varea }
  };
};

export const unblockUserSuccess = data => {
  console.log("from success unblock user ", data);
  return {
    type: UNBLOCK_USER_SUCCESS,
    payload: data
  };
};

export const getBlockedUsers = (scoreH, offset) => {
  return {
    type: GET_BLOCKED_USERS,
    payload: { scoreH, offset }
  };
};

export const getBlockedUsersSuccess = data => {
  console.log("from success get getBlockedUsers ", data);
  return {
    type: GET_BLOCKED_USERS_SUCCESS,
    payload: data
  };
};

export const getNotificationViewPPLove = (
  unread,
  viewScoreHigh,
  ppScoreHigh,
  loveScoreHigh,
  offset
) => {
  return {
    type: GET_NOTIFICATION_VIEW_PP_LOVE,
    payload: { unread, viewScoreHigh, ppScoreHigh, loveScoreHigh, offset }
  };
};

export const getNotificationViewPPLoveSuccess = (unread,data)=> {
  console.log("from success getNotificationViewPPLoveS ",unread, data);
  return {
    type: GET_NOTIFICATION_VIEW_PP_LOVE_SUCCESS,
    payload: {data,unread}
  };
};

export const clickedId = id => {
  return {
    type: CLICKED_ID,
    payload: id
  };
};

export const selectedLoveIcon = data => {
  return {
    type: SELECTED_LOVE_ICON,
    payload: data
  };
};

export const selectedPrivateIcon = data => {
  return {
    type: SELECTED_PRIVATE_ICON,
    payload: data
  };
};

export const updateBlockedUsersList=()=>{
  console.log("from update block action")
  return {
    type: UPDATE_BLOCKED_LIST
  };
}