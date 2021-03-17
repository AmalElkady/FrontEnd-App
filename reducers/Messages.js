import {
  SEND_MESSAGE_SUCCESS,
  GET_MESSAGES_TOTAL_UNREAD_COUNT_SUCCESS,
  READ_CONVERSATION_SUCCESS,
  READ_ALL_MESSAGES_COVERS_SUCCESS,
  CLEAR_CONVERSATION_SUCCESS,
  SHOW_MESSAGE,
  DELETE_CONVERSATION_SUCCESS,
  CLICKED_USER_CHAT
} from "../constants/ActionTypes";
import { calcValueOfSlAndOffset } from "../helpers/calcValueOfSlAndOffset";
import { convertListToTwoArrays } from "../helpers/convertListToTwoArrays";
import { mapArrayToObjectArr } from "../helpers/mapArrayToObjectArr";
import { map2ArrTo1Arr } from "../helpers/map2ArrTo1Arr";

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
        totalMessagesUnRCount: action.payload
      };
    }
    case READ_CONVERSATION_SUCCESS: {
      let usersList = [],
        scoreList = [];
      if (action.payload.conversation.length != 0) {
        const { usersArr, scoreArr } = mapArrayToObjectArr(
          action.payload.conversation
        );
        usersList = usersArr;
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
        seenFlag: action.payload.seen
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
        conversationCleared: action.payload
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
