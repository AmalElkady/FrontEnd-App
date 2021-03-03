import {
  SEND_MESSAGE,
  SEND_MESSAGE_SUCCESS,
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

export const showAuthMessage = message => {
  return {
    type: SHOW_MESSAGE,
    payload: message
  };
};
