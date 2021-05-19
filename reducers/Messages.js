import {
  SEND_MESSAGE_SUCCESS,
  GET_MESSAGES_TOTAL_UNREAD_COUNT_SUCCESS,
  READ_CONVERSATION_SUCCESS,
  READ_ALL_MESSAGES_COVERS_SUCCESS,
  CLEAR_CONVERSATION_SUCCESS,
  SHOW_MESSAGE,
  DELETE_CONVERSATION_SUCCESS,
  RESET_MESSAGES_COVERS,
  RESET_MESSAGES_COVERS_UNREAD_COUNT,
  REMOVE_ITEM_LIST,
  CLICKED_USER_CHAT,
  GET_PROFILES_SUCCESS,
  GET_PROFILES_ONLINE_STATUS_SUCCESS,
  SET_ACTIVE_CONVERSATION_SUCCESS,
  SET_CONVERSATION_TYPING_INDICATOR_SUCCESS,
  SET_MAP_TIMESTAMP,
  INCREASE_MESSAGES_UNREAD_COUNT
} from "../constants/ActionTypes";
import { calcValueOfSlAndOffset } from "../helpers/calcValueOfSlAndOffset";
import { mapArrayToObjectArr } from "../helpers/mapArrayToObjectArr";
import { map2ArrTo1Arr } from "../helpers/map2ArrTo1Arr";
import { removeUserFromList } from "../helpers/removeUserFromList";
import { addSeenToMgs } from "../helpers/addSeenToMgs";
const initialProfileState = {
  messageSent: false,

  totalMessagesUnRCount: null,

  conversationMessages: "",
  conversationDates: "",
  OffsetConversationMessages: "",
  scoreLConversationMessages: "",
  endOfConversationMessages: false,
  seenFlag: null,

  allMessagesCoversProfiles: "",
  allMessagesCovers: "",
  allMessagesCoversDates: "",
  OffsetMessagesCovers: "",
  scoreLMessagesCovers: "",
  endOfMessagesCovers: false,

  conversationCleared: false,

  conversationDeleted: false,

  clickedUserChat: null,
  clickedUserChatUnread: null,

  indexOfLastMsg: null,

  returnedProfiles: null, //GET_PROFILES
  returnedProfilesOnlineStatus: null,
  timestampMap: new Map(),

  respActiveConversation: null,
  respConversationTypingIndicator: null,

  loader: false,
  alertMessage: "",
  showMessage: false,
  limitReturnedItems: 5,
  limitReturnedMessages: 10
};

const Messages = (state = initialProfileState, action) => {
  switch (action.type) {
    case SEND_MESSAGE_SUCCESS: {
      return {
        ...state,
        messageSent: action.payload
      };
    }
    case GET_MESSAGES_TOTAL_UNREAD_COUNT_SUCCESS: {
      return {
        ...state,
        totalMessagesUnRCount: Number(action.payload)
      };
    }
    case READ_CONVERSATION_SUCCESS: {
      let usersList = [],
        scoreList = [],
        IndexOfMsg = null;
      if (action.payload.conversation.length != 0) {
        const { usersArr, scoreArr } = mapArrayToObjectArr(
          action.payload.conversation
        );

        const { mgsList, indexOfMsg } = addSeenToMgs(
          usersArr,
          action.payload.seen
        );
        usersList = mgsList;
        IndexOfMsg = indexOfMsg;
        scoreList = scoreArr;

        const { offset, SL } = calcValueOfSlAndOffset(scoreArr);
        state.OffsetConversationMessages = offset;
        state.scoreLConversationMessages = SL;

        if (usersList.length < state.limitReturnedMessages) {
          state.endOfConversationMessages = true;
        }
      } else if (action.payload.conversation === "") {
        state.endOfConversationMessages = true;
      }
      return {
        ...state,
        conversationMessages: [...state.conversationMessages, ...usersList],
        conversationDates: [...state.conversationDates, ...scoreList],
        seenFlag: action.payload.seen,
        indexOfLastMsg: IndexOfMsg
      };
    }
    case READ_ALL_MESSAGES_COVERS_SUCCESS: {
      let finalProfiles = [];
      if (action.payload.viewProfiles.length != 0) {
        finalProfiles = map2ArrTo1Arr(
          action.payload.arrayofOrder,
          action.payload.viewProfiles
        );
        const { offset, SL } = calcValueOfSlAndOffset(
          action.payload.list_convDate
        );
        state.OffsetMessagesCovers = offset;
        state.scoreLMessagesCovers = SL;
        if (action.payload.viewProfiles.length < state.limitReturnedItems) {
          state.endOfMessagesCovers = true;
        }
      } else if (action.payload.viewProfiles === "") {
        state.endOfMessagesCovers = true;
      }
      return {
        ...state,
        allMessagesCoversProfiles: [
          ...state.allMessagesCoversProfiles,
          ...finalProfiles
        ],
        allMessagesCovers: [
          ...state.allMessagesCovers,
          ...action.payload.messageCovers
        ],
        allMessagesCoversDates: [
          ...state.allMessagesCoversDates,
          ...action.payload.list_convDate
        ]
      };
    }
    case CLEAR_CONVERSATION_SUCCESS: {
      return {
        ...state,
        conversationCleared: action.payload,
        conversationMessages: "",
        conversationDates: "",
        OffsetConversationMessages: "",
        scoreLConversationMessages: "",
        endOfConversationMessages: false,
        seenFlag: null
      };
    }
    case DELETE_CONVERSATION_SUCCESS: {
      return {
        ...state,
        conversationDeleted: action.payload
      };
    }
    case CLICKED_USER_CHAT: {
      return {
        ...state,
        clickedUserChat: action.payload.user,
        clickedUserChatUnread: action.payload.unread,
        endOfConversationMessages: false,
        conversationMessages: "",
        conversationDates: "",
        OffsetConversationMessages: "",
        scoreLConversationMessages: ""
      };
    }
    case RESET_MESSAGES_COVERS: {
      return {
        ...state,
        allMessagesCoversProfiles: "",
        allMessagesCovers: "",
        allMessagesCoversDates: "",
        OffsetMessagesCovers: "",
        scoreLMessagesCovers: "",
        endOfMessagesCovers: false
      };
    }
    case RESET_MESSAGES_COVERS_UNREAD_COUNT: {
      if (state.totalMessagesUnRCount != null)
        state.totalMessagesUnRCount -=
          state.allMessagesCovers[action.payload][0];
      state.allMessagesCovers[action.payload][0] = 0;
      return {
        ...state
      };
    }
    case REMOVE_ITEM_LIST: {
      const { list1, list2, list3 } = removeUserFromList(
        action.payload.i,
        state.allMessagesCoversProfiles,
        state.allMessagesCoversDates,
        state.allMessagesCovers
      );
      state.allMessagesCoversProfiles = [...list1];
      state.allMessagesCoversDates = [...list2];
      state.allMessagesCoversDates = [...list3];
      return {
        ...state
      };
    }
    case INCREASE_MESSAGES_UNREAD_COUNT: {
      state.totalMessagesUnRCount += 1;
      return {
        ...state
      };
    }
    case GET_PROFILES_SUCCESS: {
      if (action.payload.viewProfiles.length != 0) {
        for (let i = 0; i < action.payload.viewProfiles.length; i++) {
          action.payload.viewProfiles[i] = JSON.parse(
            action.payload.viewProfiles[i]
          );
        }
      }
      return {
        ...state,
        returnedProfiles: action.payload.viewProfiles
      };
    }
    case GET_PROFILES_ONLINE_STATUS_SUCCESS: {
      return {
        ...state,
        returnedProfilesOnlineStatus: action.payload.list_of_results
      };
    }
    case SET_MAP_TIMESTAMP: {
      //state.timestampMap.set(action.payload.key, action.payload.val);
      let newMap = state.timestampMap;
      newMap.set(action.payload.key, action.payload.val);
      console.log("newMap ", newMap);
      return {
        ...state,
        timestampMap: newMap
      };
    }
    case SET_ACTIVE_CONVERSATION_SUCCESS: {
      return {
        ...state,
        respActiveConversation: action.payload
      };
    }
    case SET_CONVERSATION_TYPING_INDICATOR_SUCCESS: {
      return {
        ...state,
        respConversationTypingIndicator: action.payload
      };
    }
    case SHOW_MESSAGE: {
      return {
        ...state,
        alertMessage: action.payload,
        showMessage: true,
        loader: false
      };
    }
    default:
      return state;
  }
};

export default Messages;
