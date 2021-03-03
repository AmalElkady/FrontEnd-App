import {
  SEND_MESSAGE_SUCCESS,
  GET_MESSAGES_TOTAL_UNREAD_COUNT_SUCCESS,
  READ_CONVERSATION_SUCCESS,
  READ_ALL_MESSAGES_COVERS_SUCCESS,
  SHOW_MESSAGE
} from "../constants/ActionTypes";

const initialProfileState = {
  messageSent: false,

  totalMessagesUnRCount: null,

  conversationMessages: "",
  seenFlag: null,

  allMessagesCoversProfiles: "",
  allMessagesCovers: "",
  allMessagesCoversDates: "",

  loader: false,
  alertMessage: "",
  showMessage: false
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
      return {
        ...state,
        conversationMessages: action.payload.conversation,
        seenFlag: action.payload.seen
      };
    }
    case READ_ALL_MESSAGES_COVERS_SUCCESS: {
      return {
        ...state,
        allMessagesCoversProfiles: action.payload.viewProfiles,
        allMessagesCovers: action.payload.messageCovers,
        allMessagesCoversDates: action.payload.list_convDate
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
