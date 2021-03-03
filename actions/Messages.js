import {
  SEND_MESSAGE,
  SEND_MESSAGE_SUCCESS,
  GET_MESSAGES_TOTAL_UNREAD_COUNT,
  GET_MESSAGES_TOTAL_UNREAD_COUNT_SUCCESS,
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

export const showAuthMessage = message => {
  return {
    type: SHOW_MESSAGE,
    payload: message
  };
};
