import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";

import ReceivedMessageCell from "./ReceivedMessageCell/index";
import SentMessageCell from "./SentMessageCell/index";
import ConversationHeader from "./ConversationHeader";
import IntlMessages from "../../../util/IntlMessages";
import SendMessage from "./SendMessage";
import Typography from "@material-ui/core/Typography";

import Grid from "@material-ui/core/Grid";
import { MessageList } from "react-chat-elements";

import InfiniteScroll from "react-infinite-scroll-component";
import CircularProgress from "@material-ui/core/CircularProgress";
import moment from "moment";

import { useRouter } from "next/router";

import { Input } from "react-chat-elements";

import {
  sendMessage,
  readConversation,
  readAllMessagesCovers,
  clearConversation,
  deleteConversation
} from "../../../actions/Messages";
import { requestPhotoRead } from "../../../actions/Home";

const Conversation = ({ myPhoto }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [users, setUsers] = useState(null);

  const clickedUserChat = useSelector(state => state.messages.clickedUserChat);
  const clickedUserChatUnread = useSelector(
    state => state.messages.clickedUserChatUnread
  );

  const limitReturnedMessages = useSelector(
    state => state.messages.limitReturnedMessages
  );

  const messageSent = useSelector(state => state.messages.messageSent);

  const conversationMessages = useSelector(
    state => state.messages.conversationMessages
  );

  const OffsetConversationMessages = useSelector(
    state => state.messages.OffsetConversationMessages
  );

  const scoreLConversationMessages = useSelector(
    state => state.messages.scoreLConversationMessages
  );

  const endOfConversationMessages = useSelector(
    state => state.messages.endOfConversationMessages
  );

  const seenFlag = useSelector(state => state.messages.seenFlag);

  ////
  const conversationCleared = useSelector(
    state => state.messages.conversationCleared
  );

  const conversationDeleted = useSelector(
    state => state.messages.conversationDeleted
  );

  useEffect(() => {
    if (clickedUserChat != null) {
      console.log(
        "clickedUserChat clickedUserChatUnread",
        clickedUserChat,
        clickedUserChatUnread
      );
      if (clickedUserChatUnread > limitReturnedMessages) {
        dispatch(
          readConversation(
            clickedUserChat.i,
            clickedUserChat.co,
            clickedUserChat.ci,
            clickedUserChat.va,
            scoreLConversationMessages,
            OffsetConversationMessages,
            clickedUserChatUnread
          )
        );
      } else {
        dispatch(
          readConversation(
            clickedUserChat.i,
            clickedUserChat.co,
            clickedUserChat.ci,
            clickedUserChat.va,
            scoreLConversationMessages,
            OffsetConversationMessages,
            ""
          )
        );
      }
    }
  }, [clickedUserChat]);

  // handle scroll for list of Conversation messages
  const handleScrollConversationMessages = () => {
    console.log("more scroll top ", endOfConversationMessages);
    if (!endOfConversationMessages) {
      // sent get Conversation messages (next options)
      dispatch(
        readConversation(
          clickedUserChat.i,
          clickedUserChat.co,
          clickedUserChat.ci,
          clickedUserChat.va,
          scoreLConversationMessages,
          OffsetConversationMessages,
          ""
        )
      );
    }
  };

  return (
    <>
      {clickedUserChat == null && (
        <div className="users-main-content users-main-content-2 default-container">
          <div className="default-div">
            <img
              src="../../../static/images/Gila_Final_Logo_form.svg"
              alt="Gila"
              title="Gila"
            />
          </div>
          <Typography variant="h5" gutterBottom>
            <IntlMessages id="chat.default" />
          </Typography>
        </div>
      )}
      {clickedUserChat && (
        <div className="users-main-content users-main-content-2">
          <ConversationHeader user={clickedUserChat} />
          {/* ///////////// */}
          {conversationMessages != "" && (
            <div
              id="scrollableDiv"
              style={{
                height: 300,
                overflow: "auto",
                display: "flex",
                flexDirection: "column-reverse"
              }}
            >
              <InfiniteScroll
                dataLength={conversationMessages.length}
                next={handleScrollConversationMessages}
                style={{ display: "flex", flexDirection: "column-reverse" }}
                inverse={true} //
                hasMore={!endOfConversationMessages}
                loader={<CircularProgress />}
                scrollableTarget="scrollableDiv"
                className="scroll-m"
              >
                {conversationMessages.map((conversation, index) =>
                  conversation.o === 1 ? (
                    <SentMessageCell
                      key={index}
                      conversation={conversation}
                      myPhoto={myPhoto}
                    />
                  ) : (
                    <ReceivedMessageCell
                      key={index}
                      conversation={conversation}
                      user={clickedUserChat}
                    />
                  )
                )}
              </InfiniteScroll>
            </div>
          )}

          {/* ////////////// */}
          <SendMessage myPhoto={myPhoto} />
        </div>
      )}
    </>
  );
};

export default Conversation;
