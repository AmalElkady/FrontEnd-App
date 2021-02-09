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
  SELECTED_LOVE_ICON,
  SELECTED_PRIVATE_ICON,
  CLICKED_ID
} from "../constants/ActionTypes";
import { calcValueOfSlAndOffset } from "../helpers/calcValueOfSlAndOffset";
import { map2ArrTo1Arr } from "../helpers/map2ArrTo1Arr";

const initialProfileState = {
  ppAccessApproveRemove: false,
  outgoingRequestsData: null,
  incomingRequestsData: null,

  sendLoveMatchRequest: false,

  endOfResultLoveSentRequests: false, // for Love Sent requests
  scoreHLoveSentRequests: "",
  OffsetLoveSentRequests: 0,
  loveSentRequestsDates: "",
  loveSentRequestsProfiles: "",

  endOfResultLoveMatchedRequests: false, // for Love Matched
  scoreHLoveMatchedRequests: "",
  OffsetLoveMatchedRequests: 0,
  loveMatchedRequestsDates: "",
  loveMatchedRequestsProfiles: "",

  endOfResultLoveReceivedRequests: false, // for Love Received
  scoreHLoveReceivedRequests: "",
  OffsetLoveReceivedRequests: 0,
  loveReceivedRequestsDates: "",
  loveReceivedRequestsProfiles: "",

  endOfResultOutgoingPPRequests: false, // for private photos outgoing requests
  scoreHOutgoingPPRequests: "",
  OffsetOutgoingPPRequests: 0,
  outgoingPPRequestsDates: "",
  outgoingPPRequestsProfiles: "",

  endOfResultIncomingPPApprovedRequests: false, // for private photos incoming approved requests
  scoreHIncomingPPApprovedRequests: "",
  OffsetIncomingPPApprovedRequests: 0,
  incomingPPApprovedRequestsDates: "",
  incomingPPApprovedRequestsProfiles: "",

  endOfResultIncomingPPNotApprovedRequests: false, // for private photos incoming Not approved requests
  scoreHIncomingPPNotApprovedRequests: "",
  OffsetIncomingPPNotApprovedRequests: 0,
  incomingPPNotApprovedRequestsDates: "",
  incomingPPNotApprovedRequestsProfiles: "",

  endOfResultUserViews: false, // for user views
  startUserViews: 0,
  endUserViews: 5,
  userViewsProfiles: "",
  userViewsDates: "",

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

  clicked_id: null,
  loveSelectedIcon: null,
  privateSelectedIcon: null,
  limitReturnedItems: 5
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
      const outgoingPPProfiles = map2ArrTo1Arr(
        action.payload.order,
        action.payload.view_profiles
      );
      if (action.payload.view_profiles.length != 0) {
        const { offset, SL } = calcValueOfSlAndOffset(
          action.payload.view_dates
        );
        state.OffsetOutgoingPPRequests = offset;
        state.scoreHOutgoingPPRequests = SL;
      }
      if (
        action.payload.view_profiles.length == 0 ||
        action.payload.view_profiles.length < state.limitReturnedItems
      ) {
        state.endOfResultOutgoingPPRequests = true;
      }
      return {
        ...state,
        outgoingPPRequestsDates: [
          ...state.outgoingPPRequestsDates,
          ...action.payload.view_dates
        ],
        outgoingPPRequestsProfiles: [
          ...state.outgoingPPRequestsProfiles,
          ...outgoingPPProfiles
        ]
      };
    }
    case GET_PHOTO_PP_READ_INCOMING_APPROVED_PENDING_REQUESTS_SUCCESS: {
      console.log("form reducer incoming ", action.payload);
      let incomingPPProfiles = [];
      if (state.privateSelectedIcon === "incomingApproved") {
        if (action.payload.order.length != 0) {
          incomingPPProfiles = map2ArrTo1Arr(
            action.payload.order,
            action.payload.approved
          );
          state.incomingPPApprovedRequestsDates = [
            ...state.incomingPPApprovedRequestsDates,
            ...action.payload.dates
          ];
          state.incomingPPApprovedRequestsProfiles = [
            ...state.incomingPPApprovedRequestsProfiles,
            ...incomingPPProfiles
          ];
          const { offset, SL } = calcValueOfSlAndOffset(action.payload.dates);
          state.OffsetIncomingPPApprovedRequests = offset;
          state.scoreHIncomingPPApprovedRequests = SL;
        }
        if (
          action.payload.order.length === 0 ||
          action.payload.order.length < state.limitReturnedItems
        ) {
          state.endOfResultIncomingPPApprovedRequests = true;
        }
      } else if (state.privateSelectedIcon === "incomingNotApproved") {
        if (action.payload.order.length != 0) {
          incomingPPProfiles = map2ArrTo1Arr(
            action.payload.order,
            action.payload.pending
          );
          state.incomingPPNotApprovedRequestsDates = [
            ...state.incomingPPNotApprovedRequestsDates,
            ...action.payload.dates
          ];
          state.incomingPPNotApprovedRequestsProfiles = [
            ...state.incomingPPNotApprovedRequestsProfiles,
            ...incomingPPProfiles
          ];
          const { offset, SL } = calcValueOfSlAndOffset(action.payload.dates);
          state.OffsetIncomingPPNotApprovedRequests = offset;
          state.scoreHIncomingPPNotApprovedRequests = SL;
        }
        if (
          action.payload.order.length === 0 ||
          action.payload.order.length < state.limitReturnedItems
        ) {
          state.endOfResultIncomingPPNotApprovedRequests = true;
        }
      }
      return {
        ...state
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
      const loveSentProfiles = map2ArrTo1Arr(
        action.payload.order,
        action.payload.profiles
      );
      if (action.payload.profiles.length != 0) {
        const { offset, SL } = calcValueOfSlAndOffset(action.payload.dates);
        state.OffsetLoveSentRequests = offset;
        state.scoreHLoveSentRequests = SL;
      } else if (action.payload.profiles.length == 0) {
        state.endOfResultLoveSentRequests = true;
      }
      return {
        ...state,
        loveSentRequestsDates: [
          ...state.loveSentRequestsDates,
          ...action.payload.dates
        ],
        loveSentRequestsProfiles: [
          ...state.loveSentRequestsProfiles,
          ...loveSentProfiles
        ]
      };
    }
    case GET_LOVE_MATCHED_AND_RECEIVED_REQUESTS_SUCCESS: {
      let loveProfiles = [];
      if (state.loveSelectedIcon === "match") {
        if (action.payload.dates.length != 0) {
          loveProfiles = map2ArrTo1Arr(
            action.payload.order,
            action.payload.matched
          );
          state.loveMatchedRequestsDates = [
            ...state.loveMatchedRequestsDates,
            ...action.payload.dates
          ];
          state.loveMatchedRequestsProfiles = [
            ...state.loveMatchedRequestsProfiles,
            ...loveProfiles
          ];
          const { offset, SL } = calcValueOfSlAndOffset(action.payload.dates);
          state.OffsetLoveMatchedRequests = offset;
          state.scoreHLoveMatchedRequests = SL;
        } else if (action.payload.dates.length === 0) {
          state.endOfResultLoveMatchedRequests = true;
        }
      } else if (state.loveSelectedIcon === "received") {
        loveProfiles = map2ArrTo1Arr(
          action.payload.order,
          action.payload.profiles
        );
        state.loveReceivedRequestsDates = [
          ...state.loveReceivedRequestsDates,
          ...action.payload.dates
        ];
        state.loveReceivedRequestsProfiles = [
          ...state.loveReceivedRequestsProfiles,
          ...loveProfiles
        ];
        const { offset, SL } = calcValueOfSlAndOffset(action.payload.dates);
        state.OffsetLoveReceivedRequests = offset;
        state.scoreHLoveReceivedRequests = SL;
        if (action.payload.profiles.length == 0) {
          state.endOfResultLoveReceivedRequests = true;
        }
      }
      return {
        ...state
      };
    }
    case GET_USER_VIEWS_SUCCESS: {
      console.log("from reducer User views ", action.payload);
      
      let viewsProfiles=[];
       if (action.payload.view_profiles.length != 0) {
        viewsProfiles = map2ArrTo1Arr(
        action.payload.order,
        action.payload.view_profiles
      );
        state.startUserViews += state.limitReturnedItems;
        state.endUserViews +=state.limitReturnedItems;
      } else if (action.payload.view_profiles.length == 0) {
        state.endOfResultUserViews = true;
      }
      return {
        ...state,
        userViewsProfiles: [
          ...state.userViewsProfiles,
          ...viewsProfiles
        ],
        userViewsDates:[
          ...state.userViewsDates,
          ...action.payload.view_dates
        ]
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
    case SELECTED_LOVE_ICON:
      return {
        ...state,
        loveSelectedIcon: action.payload
      };
    case SELECTED_PRIVATE_ICON:
      return {
        ...state,
        privateSelectedIcon: action.payload
      };
    default:
      return state;
  }
};

export default Interaction;
