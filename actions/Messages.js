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
  DELETE_CONVERSATION,
  DELETE_CONVERSATION_SUCCESS,
  CLICKED_USER_CHAT,
  RESET_MESSAGES_COVERS,
  RESET_MESSAGES_COVERS_UNREAD_COUNT,
  REMOVE_ITEM_LIST,
  GET_PROFILES,
  GET_PROFILES_SUCCESS,
  GET_PROFILES_ONLINE_STATUS,
  GET_PROFILES_ONLINE_STATUS_SUCCESS,
  SET_ACTIVE_CONVERSATION,
  SET_ACTIVE_CONVERSATION_SUCCESS,
  SET_CONVERSATION_TYPING_INDICATOR,
  SET_CONVERSATION_TYPING_INDICATOR_SUCCESS,
  SET_MAP_TIMESTAMP,
  SET_TYPING_MARK,
  SET_TYPING_TIMER,
  SHOW_MESSAGE,
  INCREASE_MESSAGES_UNREAD_COUNT,
  RESET_PROFILES_ONLINE_STATUS,
  REPORT_USER_CONVERSATION,
  REPORT_USER_CONVERSATION_SUCCESS,
  SHOW_MESSAGE_CHAT,
  HIDE_MESSAGE_CHAT
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

export const deleteConversation = (profileid, country, city, varea) => {
  return {
    type: DELETE_CONVERSATION,
    payload: { profileid, country, city, varea }
  };
};

export const deleteConversationSuccess = data => {
  return {
    type: DELETE_CONVERSATION_SUCCESS,
    payload: data
  };
};

export const clickedUserChat = (user, unread) => {
  return {
    type: CLICKED_USER_CHAT,
    payload: { user, unread }
  };
};
export const resetMegsCovers = () => {
  return {
    type: RESET_MESSAGES_COVERS
  };
};

export const removeListItem = item => {
  return {
    type: REMOVE_ITEM_LIST,
    payload: item
  };
};

export const resetMegsCoversUnreadCount = index => {
  return {
    type: RESET_MESSAGES_COVERS_UNREAD_COUNT,
    payload: index
  };
};

export const getProfiles = profileKeys => {
  return {
    type: GET_PROFILES,
    payload: profileKeys
  };
};

export const getProfilesSuccess = data => {
  return {
    type: GET_PROFILES_SUCCESS,
    payload: data
  };
};

export const getProfilesOnlineStatus = (checkProfiles, listForEachProfile) => {
  return {
    type: GET_PROFILES_ONLINE_STATUS,
    payload: { checkProfiles, listForEachProfile }
  };
};

export const getProfilesOnlineStatusSuccess = data => {
  return {
    type: GET_PROFILES_ONLINE_STATUS_SUCCESS,
    payload: data
  };
};

export const setTimestampMap = (key, val) => {
  return {
    type: SET_MAP_TIMESTAMP,
    payload: { key, val }
  };
};

export const setActiveConversation = (
  profileid,
  country,
  city,
  varea,
  activate
) => {
  return {
    type: SET_ACTIVE_CONVERSATION,
    payload: { profileid, country, city, varea, activate }
  };
};

export const setActiveConversationSuccess = data => {
  return {
    type: SET_ACTIVE_CONVERSATION_SUCCESS,
    payload: data
  };
};

export const setConversationTypingIndicator = (
  profileid,
  country,
  city,
  varea,
  jnt,
  activate
) => {
  return {
    type: SET_CONVERSATION_TYPING_INDICATOR,
    payload: { profileid, country, city, varea, jnt, activate }
  };
};

export const setConversationTypingIndicatorSuccess = data => {
  return {
    type: SET_CONVERSATION_TYPING_INDICATOR_SUCCESS,
    payload: data
  };
};

export const reportUserConversation = (
  reasonid,
  profileid,
  country,
  city,
  varea,
  comment
) => {
  return {
    type: REPORT_USER_CONVERSATION,
    payload: {
      reasonid,
      profileid,
      country,
      city,
      varea,
      comment
    }
  };
};

export const reportUserConversationSuccess = data => {
  return {
    type: REPORT_USER_CONVERSATION_SUCCESS,
    payload: data
  };
};

export const setTypingMark = flag => {
  return {
    type: SET_TYPING_MARK,
    payload: flag
  };
};

export const setTypingTimer = date => {
  return {
    type: SET_TYPING_TIMER,
    payload: date
  };
};

export const increaseMgsUnRCount = () => {
  return {
    type: INCREASE_MESSAGES_UNREAD_COUNT
    // payload:
  };
};

export const resetProfilesOnlineStatus = () => {
  return {
    type: RESET_PROFILES_ONLINE_STATUS
  };
};

export const showMessageChat = message => {
  return {
    type: SHOW_MESSAGE_CHAT,
    payload: message
  };
};

export const hideMessageChat = () => {
  return {
    type: HIDE_MESSAGE_CHAT
  };
};
