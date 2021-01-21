import {
  REQUEST_PP_ACCESS_APPROVE_REMOVE_SUCCESS,
  GET_PHOTO_PP_READ_OUTGOING_REQUESTS_APPROVALES_SUCCESS,
  GET_PHOTO_PP_READ_INCOMING_APPROVED_PENDING_REQUESTS_SUCCESS,
  SEND_LOVE_MATCH_REQUEST_SUCCESS,
  GET_LOVE_SENT_REQUESTS_SUCCESS,
  GET_LOVE_MATCHED_AND_RECEIVED_REQUESTS_SUCCESS,
  GET_USER_VIEWS_SUCCESS,
  BLOCK_USER_SUCCESS,
  UNBLOCK_USER_SUCCESS,
  GET_BLOCKED_USERS_SUCCESS,
  GET_NOTIFICATION_VIEW_PP_LOVE_SUCCESS,
  CLICKED_ID
} from "../constants/ActionTypes";

const initialProfileState = {
  ppAccessApproveRemove: false,
  outgoingRequestsData: null,
  incomingRequestsData: null,

  sendLoveMatchRequest: false,
  loveSentRequests: null,
  loveMatchedAndReceivedRequests: null,

  userViews: null,

  userBlocked: false,
  userUnblocked: false,
  blockedUsers: null,

  notificationViewUnread: null,
  notificationViewDates: null,
  notificationViewOrder: null,
  notificationViewCount: null,

  notificationPPUnread: null,
  notificationPPDates: null,
  notificationPPOrder: null,
  notificationPPCount: null,

  notificationLoveUnread: null,
  notificationLoveDates: null,
  notificationLoveOrder: null,
  notificationLoveCount: null,

  clicked_id: null
};

const Interaction = (state = initialProfileState, action) => {
  switch (action.type) {
    case REQUEST_PP_ACCESS_APPROVE_REMOVE_SUCCESS: {
      return {
        ...state,
        ppAccessApproveRemove: action.payload
      };
    }
    case GET_PHOTO_PP_READ_OUTGOING_REQUESTS_APPROVALES_SUCCESS: {
      console.log("form reducer outgoing ", action.payload);
      return {
        ...state,
        outgoingRequestsData: action.payload
      };
    }
    case GET_PHOTO_PP_READ_INCOMING_APPROVED_PENDING_REQUESTS_SUCCESS: {
      console.log("form reducer incoming ", action.payload);
      return {
        ...state,
        incomingRequestsData: action.payload
      };
    }
    case SEND_LOVE_MATCH_REQUEST_SUCCESS: {
      console.log("form reducer love match request ", action.payload);
      return {
        ...state,
        sendLoveMatchRequest: action.payload
      };
    }
    case GET_LOVE_SENT_REQUESTS_SUCCESS: {
      console.log("form reducer love sent requests ", action.payload);
      return {
        ...state,
        loveSentRequests: action.payload
      };
    }
    case GET_LOVE_MATCHED_AND_RECEIVED_REQUESTS_SUCCESS: {
      console.log("form reducer love matched requests ", action.payload);
      return {
        ...state,
        loveMatchedAndReceivedRequests: action.payload
      };
    }
    case GET_USER_VIEWS_SUCCESS: {
      console.log("form reducer User views ", action.payload);
      return {
        ...state,
        userViews: action.payload
      };
    }
    case BLOCK_USER_SUCCESS: {
      console.log("form reducer User block ", action.payload);
      return {
        ...state,
        userBlocked: action.payload
      };
    }
    case UNBLOCK_USER_SUCCESS: {
      console.log("form reducer User unblock ", action.payload);
      return {
        ...state,
        userUnblocked: action.payload
      };
    }
    case GET_BLOCKED_USERS_SUCCESS: {
      console.log("form reducer blocked users", action.payload);
      return {
        ...state,
        blockedUsers: action.payload
      };
    }
    case CLICKED_ID: {
      return {
        ...state,
        clicked_id: action.payload
      };
    }
    case GET_NOTIFICATION_VIEW_PP_LOVE_SUCCESS: {
      console.log("form notification ", action.payload);
      return {
        ...state,
        notificationViewUnread: action.payload.unread.Views,
        notificationViewDates: action.payload.dates.Views,
        notificationViewOrder: action.payload.order.Views,
        notificationViewCount: action.payload.count.Views,

        notificationPPUnread: action.payload.unread.PP,
        notificationPPDates: action.payload.dates.PP,
        notificationPPOrder: action.payload.order.PP,
        notificationPPCount: action.payload.count.PP,

        notificationLoveUnread: action.payload.unread.Love,
        notificationLoveDates: action.payload.dates.Love,
        notificationLoveOrder: action.payload.order.Love,
        notificationLoveCount: action.payload.count.Love
      };
    }
    default:
      return state;
  }
};

export default Interaction;
