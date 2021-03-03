import {
  SEND_MESSAGE,
  SEND_MESSAGE_SUCCESS,
  GET_MESSAGES_TOTAL_UNREAD_COUNT,
  GET_MESSAGES_TOTAL_UNREAD_COUNT_SUCCESS,
  READ_CONVERSATION,
  READ_CONVERSATION_SUCCESS,
  READ_ALL_MESSAGES_COVERS,
  READ_ALL_MESSAGES_COVERS_SUCCESS,
  CLEAR_CONVERSATION,
  CLEAR_CONVERSATION_SUCCESS,
  SHOW_MESSAGE
} from "../constants/ActionTypes";

export const sendMessage = (profileid, country, city, varea, message) => {
  return {
    type: SEND_MESSAGE,
    payload: { profileid, country, city, varea, message }
  };
};

export const sendMessageSuccess = messageSent => {
  return {
    type: SEND_MESSAGE_SUCCESS,
    payload: messageSent
  };
};

export const getMessagesTotalUnRCount = () => {
  return {
    type: GET_MESSAGES_TOTAL_UNREAD_COUNT
  };
};

export const getMessagesTotalUnRCountSuccess = data => {
  return {
    type: GET_MESSAGES_TOTAL_UNREAD_COUNT_SUCCESS,
    payload: data
  };
};

export const readConversation = (
  profileid,
  country,
  city,
  varea,
  scoreL,
  offset,
  limit
) => {
  return {
    type: READ_CONVERSATION,
    payload: { profileid, country, city, varea, scoreL, offset, limit }
  };
};

export const readConversationSuccess = data => {
  return {
    type: READ_CONVERSATION_SUCCESS,
    payload: data
  };
};

export const readAllMessagesCovers = (scoreL, offset) => {
  return {
    type: READ_ALL_MESSAGES_COVERS,
    payload: { scoreL, offset }
  };
};

export const readAllMessagesCoversSuccess = data => {
  return {
    type: READ_ALL_MESSAGES_COVERS_SUCCESS,
    payload: data
  };
};

export const clearConversation = (profileid, country, city, varea) => {
  return {
    type: CLEAR_CONVERSATION,
    payload: { profileid, country, city, varea }
  };
};

export const clearConversationSuccess = data => {
  return {
    type: CLEAR_CONVERSATION_SUCCESS,
    payload: data
  };
};

export const showAuthMessage = message => {
  return {
    type: SHOW_MESSAGE,
    payload: message
  };
};
