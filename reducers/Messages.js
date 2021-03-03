import { SEND_MESSAGE_SUCCESS, SHOW_MESSAGE } from "../constants/ActionTypes";

const initialProfileState = {
  messageSent: false,
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
