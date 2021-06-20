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
  CLICKED_ID,
  CLEAN_NOTIFICATION_VIEW_PP_LOVE_SUCCESS,
  // PUSH_IN_NOTIFICATION_VIEW_PP_LOVE,
  RESET_COUNT,
  UPDATE_LIST,
  INCREASE_COUNT,
  ERROR_JWT_8
} from "../constants/ActionTypes";
import { calcValueOfSlAndOffset } from "../helpers/calcValueOfSlAndOffset";
import { map2ArrTo1Arr } from "../helpers/map2ArrTo1Arr";
import { removeUserFromList } from "../helpers/removeUserFromList";

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
  // startUserViews: 0,
  // endUserViews: 5,
  scoreHViewsUsers: "",
  OffsetViewsUsers: 0,
  userViewsProfiles: "",
  userViewsDates: "",

  userBlocked: false,
  userUnblocked: false,

  endOfResultBlockedUsers: false, // for blocked Users
  scoreHBlockedUsers: "",
  OffsetBlockedUsers: 0,
  blockedUsersProfiles: "",
  blockedUsersDates: "",

  notificationViewUnread: "", //for view notifications
  notificationViewDates: "",
  notificationViewOrder: "",
  notificationViewCount: null,
  endOfResultNotificationView: false,
  scoreHNotificationView: "",
  scoreLCleanNotificationView: "",
  scoreHCleanNotificationView: "",
  OffsetNotificationView: 0,

  notificationPPUnread: "", // for pp notifications
  notificationPPDates: "",
  notificationPPOrder: "",
  notificationPPCount: null,
  endOfResultNotificationPP: false,
  scoreHNotificationPP: "",
  scoreLCleanNotificationPP: "",
  scoreHCleanNotificationPP: "",
  OffsetNotificationPP: 0,

  notificationLoveUnread: "", //for love notifications
  notificationLoveDates: "",
  notificationLoveOrder: "",
  notificationLoveCount: null,
  endOfResultNotificationLove: false,
  scoreHNotificationLove: "",
  scoreLCleanNotificationLove: "",
  scoreHCleanNotificationLove: "",
  OffsetNotificationLove: 0,

  cleanNotification: false,

  clicked_id: null,
  loveSelectedIcon: null,
  privateSelectedIcon: null,
  limitReturnedItems: 3,
  errorJwt8Flag: false
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
        action.payload.profiles
      );
      if (action.payload.profiles.length != 0) {
        const { offset, SL } = calcValueOfSlAndOffset(action.payload.dates);
        state.OffsetOutgoingPPRequests = offset;
        state.scoreHOutgoingPPRequests = SL;
      }
      if (
        action.payload.profiles.length == 0 ||
        action.payload.profiles.length < state.limitReturnedItems
      ) {
        state.endOfResultOutgoingPPRequests = true;
      }
      return {
        ...state,
        outgoingPPRequestsDates: [
          ...state.outgoingPPRequestsDates,
          ...action.payload.dates
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
        if (action.payload.profiles.length < state.limitReturnedItems) {
          state.endOfResultLoveSentRequests = true;
        }
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
          if (action.payload.dates.length < state.limitReturnedItems) {
            state.endOfResultLoveMatchedRequests = true;
          }
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
        if (action.payload.profiles.length < state.limitReturnedItems) {
          state.endOfResultLoveReceivedRequests = true;
        }
        if (action.payload.profiles.length == 0) {
          state.endOfResultLoveReceivedRequests = true;
        }
      }
      return {
        ...state
      };
    }
    case GET_USER_VIEWS_SUCCESS: {
      let viewsProfiles = [];
      if (action.payload.profiles.length != 0) {
        viewsProfiles = map2ArrTo1Arr(
          action.payload.order,
          action.payload.profiles
        );
        const { offset, SL } = calcValueOfSlAndOffset(action.payload.dates);
        state.scoreHViewsUsers = SL;
        state.OffsetViewsUsers = offset;
        if (action.payload.profiles.length < state.limitReturnedItems) {
          state.endOfResultUserViews = true;
        }
      } else if (
        action.payload.profiles.length == 0 ||
        action.payload.profiles === ""
      ) {
        state.endOfResultUserViews = true;
      }
      return {
        ...state,
        userViewsProfiles: [...state.userViewsProfiles, ...viewsProfiles],
        userViewsDates: [...state.userViewsDates, ...action.payload.dates]
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
      let blockedProfiles = [];
      if (action.payload.profiles.length != 0) {
        blockedProfiles = map2ArrTo1Arr(
          action.payload.order,
          action.payload.profiles
        );
        const { offset, SL } = calcValueOfSlAndOffset(action.payload.dates);
        state.OffsetBlockedUsers = offset;
        state.scoreHBlockedUsers = SL;
        if (action.payload.profiles.length < state.limitReturnedItems) {
          state.endOfResultBlockedUsers = true;
        }
      } else if (action.payload.profiles.length == 0) {
        state.endOfResultBlockedUsers = true;
      }

      return {
        ...state,
        blockedUsersProfiles: [
          ...state.blockedUsersProfiles,
          ...blockedProfiles
        ],
        blockedUsersDates: [...state.blockedUsersDates, ...action.payload.dates]
      };
    }
    case CLICKED_ID: {
      return {
        ...state,
        clicked_id: action.payload
      };
    }
    case GET_NOTIFICATION_VIEW_PP_LOVE_SUCCESS: {
      console.log("form notification from reducer ", action.payload);
      /// love
      let loveProfiles = [];
      if (action.payload.unread == "C" || action.payload.unread == "CL") {
        if (action.payload.data.unread.Love.length != 0) {
          loveProfiles = map2ArrTo1Arr(
            action.payload.data.order.Love,
            action.payload.data.unread.Love
          );
          const { offset, SL } = calcValueOfSlAndOffset(
            action.payload.data.dates.Love
          );
          state.OffsetNotificationLove = offset;
          state.scoreHNotificationLove = SL;
          state.scoreHCleanNotificationLove = action.payload.data.dates.Love[0];
          state.scoreLCleanNotificationLove =
            action.payload.data.dates.Love[
              action.payload.data.dates.Love.length - 1
            ];
          if (
            action.payload.data.unread.Love.length < state.limitReturnedItems
          ) {
            state.endOfResultNotificationLove = true;
          }
        } else if (action.payload.data.unread.Love.length == 0) {
          state.endOfResultNotificationLove = true;
        }
      }
      //pp
      let ppProfiles = [];
      if (action.payload.unread == "C" || action.payload.unread == "CP") {
        if (action.payload.data.unread.PP.length != 0) {
          ppProfiles = map2ArrTo1Arr(
            action.payload.data.order.PP,
            action.payload.data.unread.PP
          );
          const { offset, SL } = calcValueOfSlAndOffset(
            action.payload.data.dates.PP
          );
          state.OffsetNotificationPP = offset;
          state.scoreHNotificationPP = SL;
          state.scoreHCleanNotificationPP = action.payload.data.dates.PP[0];
          state.scoreLCleanNotificationPP =
            action.payload.data.dates.PP[
              action.payload.data.dates.PP.length - 1
            ];
          if (action.payload.data.unread.PP.length < state.limitReturnedItems) {
            state.endOfResultNotificationPP = true;
          }
        } else if (action.payload.data.unread.PP.length == 0) {
          state.endOfResultNotificationPP = true;
        }
      }
      //View
      let ViewProfiles = [];
      if (action.payload.unread == "C" || action.payload.unread == "CV") {
        if (action.payload.data.unread.Views.length != 0) {
          ViewProfiles = map2ArrTo1Arr(
            action.payload.data.order.Views,
            action.payload.data.unread.Views
          );
          const { offset, SL } = calcValueOfSlAndOffset(
            action.payload.data.dates.Views
          );
          state.OffsetNotificationView = offset;
          state.scoreHNotificationView = SL;
          state.scoreHCleanNotificationView =
            action.payload.data.dates.Views[0];
          state.scoreLCleanNotificationView =
            action.payload.data.dates.Views[
              action.payload.data.dates.Views.length - 1
            ];
          if (
            action.payload.data.unread.Views.length < state.limitReturnedItems
          ) {
            state.endOfResultNotificationView = true;
          }
        } else if (action.payload.data.unread.Views.length == 0) {
          state.endOfResultNotificationView = true;
        }
      }
      return {
        ...state,
        notificationViewUnread: [
          ...state.notificationViewUnread,
          ...ViewProfiles
        ],
        notificationViewDates: [
          ...state.notificationViewDates,
          ...action.payload.data.dates.Views
        ],
        notificationViewCount: action.payload.data.count.Views,

        notificationPPUnread: [...state.notificationPPUnread, ...ppProfiles],
        notificationPPDates: [
          ...state.notificationPPDates,
          ...action.payload.data.dates.PP
        ],
        notificationPPCount: action.payload.data.count.PP,

        notificationLoveUnread: [
          ...state.notificationLoveUnread,
          ...loveProfiles
        ],
        notificationLoveDates: [
          ...state.notificationLoveDates,
          ...action.payload.data.dates.Love
        ],
        notificationLoveCount: action.payload.data.count.Love
      };
    }
    case CLEAN_NOTIFICATION_VIEW_PP_LOVE_SUCCESS: {
      console.log("form reducer clean notification ", action.payload);
      return {
        ...state,
        cleanNotification: action.payload
      };
    }
    case UPDATE_LIST: {
      if (action.payload == "LNA") {
        const { list1, list2 } = removeUserFromList(
          state.clicked_id,
          state.incomingPPNotApprovedRequestsProfiles,
          state.incomingPPNotApprovedRequestsDates
        );
        state.incomingPPNotApprovedRequestsProfiles = [...list1];
        state.incomingPPNotApprovedRequestsDates = [...list2];
      } else if (action.payload == "LA") {
        const { list1, list2 } = removeUserFromList(
          state.clicked_id,
          state.incomingPPApprovedRequestsProfiles,
          state.incomingPPApprovedRequestsDates
        );
        state.incomingPPApprovedRequestsProfiles = [...list1];
        state.incomingPPApprovedRequestsDates = [...list2];
      } else if (action.payload == "LB") {
        const { list1, list2 } = removeUserFromList(
          state.clicked_id,
          state.blockedUsersProfiles,
          state.blockedUsersDates
        );
        state.blockedUsersProfiles = [...list1];
        state.blockedUsersDates = [...list2];
      }
      return {
        ...state
      };
    }
    // case PUSH_IN_NOTIFICATION_VIEW_PP_LOVE: {
    //   if (action.payload.t == "NL") {
    //     console.log("user love reducer", action.payload.user);
    //     state.notificationLoveUnread.unshift(action.payload.user);
    //   } else if (action.payload.t == "NV") {
    //     console.log("user view reducer ", action.payload.user);
    //     state.notificationViewUnread.unshift(action.payload.user);
    //   } else if (action.payload.t == "NP") {
    //     console.log("user pp reducer", action.payload.user);
    //     state.notificationPPUnread.unshift(action.payload.user);
    //   }
    //   return {
    //     ...state
    //   };
    // }
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
    case RESET_COUNT: {
      if (action.payload === "L") {
        state.notificationLoveCount = 0;
      } else if (action.payload === "P") {
        state.notificationPPCount = 0;
      } else if (action.payload === "V") {
        state.notificationViewCount = 0;
      }
      return {
        ...state
      };
    }
    case ERROR_JWT_8: {
      return {
        ...state,
        errorJwt8Flag: action.payload
      };
    }
    case INCREASE_COUNT: {
      if (action.payload === "L") {
        state.notificationLoveCount += 1;
      } else if (action.payload === "P") {
        state.notificationPPCount += 1;
      } else if (action.payload === "V") {
        state.notificationViewCount += 1;
      }
      return {
        ...state
      };
    }

    default:
      return state;
  }
};

export default Interaction;
