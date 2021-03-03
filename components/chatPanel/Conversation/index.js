import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";

import ReceivedMessageCell from "./ReceivedMessageCell/index";
import SentMessageCell from "./SentMessageCell/index";
import Button from "@material-ui/core/Button";

import {
  sendMessage,
  readConversation,
  readAllMessagesCovers
} from "../../../actions/Messages";

const Conversation = ({ conversationData, selectedUser }) => {
  const dispatch = useDispatch();

  const messageSent = useSelector(state => state.messages.messageSent);
  const conversationMessages = useSelector(
    state => state.messages.conversationMessages
  );

  const allMessagesCoversProfiles = useSelector(
    state => state.messages.allMessagesCoversProfiles
  );

  const seenFlag = useSelector(state => state.messages.seenFlag);

  return (
    <div className="chat-main-content">
      {console.log("allMessagesCoversProfiles ", allMessagesCoversProfiles)}
      <SentMessageCell />
      <ReceivedMessageCell />
      <Button
        className="linear-g"
        style={{ color: "white", fontWeight: "bold" }}
        variant="contained"
        onClick={() => {
          // dispatch(
          //   sendMessage(
          //     "452dc28a-4991-4557-a1a1-3a641728e5f0",
          //     "EG",
          //     "6",
          //     "1",
          //     "how are u?"
          //   )
          // );
          // dispatch(
          //   readConversation(
          //     "452dc28a-4991-4557-a1a1-3a641728e5f0",
          //     "EG",
          //     "6",
          //     "1",
          //     "",
          //     "",
          //     ""
          //   )
          // );

          dispatch(readAllMessagesCovers("", ""));
        }}
      >
        Messages
      </Button>

      {/* {conversationData.map((conversation, index) =>
        conversation.type === "sent" ? (
          <SentMessageCell key={index} conversation={conversation} />
        ) : (
          <ReceivedMessageCell
            key={index}
            conversation={conversation}
            user={selectedUser}
          />
        )
      )} */}
    </div>
  );
};

export default Conversation;
