import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input } from "react-chat-elements";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import SendIcon from "@material-ui/icons/Send";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import IntlMessages from "../../../../util/IntlMessages";

import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

import {
  sendMessage,
  readConversation,
  sendMessageSuccess,
  readAllMessagesCovers,
  clearConversationSuccess,
  resetMegsCovers
} from "../../../../actions/Messages";

const SendMessage = () => {
  const dispatch = useDispatch();
  const messageSent = useSelector(state => state.messages.messageSent);
  const clickedUserChat = useSelector(state => state.messages.clickedUserChat);

  const locale = useSelector(state => state.settings.locale);

  const conversationMessages = useSelector(
    state => state.messages.conversationMessages
  );

  const OffsetConversationMessages = useSelector(
    state => state.messages.OffsetConversationMessages
  );

  const scoreLConversationMessages = useSelector(
    state => state.messages.scoreLConversationMessages
  );

  const [messageText, setMessageText] = useState("");
  const [openEmoji, setOpenEmoji] = useState(false);
  const [emojiSelected, setEmojiSelected] = useState(null);

  ////
  useEffect(() => {
    if (messageSent) {
      if (conversationMessages == "") {
        console.log("first message");
        dispatch(resetMegsCovers());
        dispatch(readAllMessagesCovers("", ""));
      }
      dispatch(clearConversationSuccess(true));
      dispatch(
        readConversation(
          clickedUserChat.i,
          clickedUserChat.co,
          clickedUserChat.ci,
          clickedUserChat.va,
          "",
          "",
          ""
        )
      );
      dispatch(sendMessageSuccess(false));
    }
  }, [messageSent]);

  const handleChange = e => {
    console.log("e.target.value ", e.target.value);
    // if (emojiSelected != null) {
    //   console.log("1");
    //   setMessageText(`${messageText + e.target.value}`);
    // } else {
    //   console.log("2");
    setMessageText(e.target.value);
    // }
  };

  const addEmoji = e => {
    let emoji = e.native;
    //setEmojiSelected(emoji);
    // if (messageText === "") {
    //   console.log("3");
    //   setMessageText(emoji);
    // } else {
    //   console.log("4");
    //   setMessageText(`${messageText}${emoji}`);
    // }
    setMessageText(`${messageText + emoji}`);
  };

  const handleSubmit = e => {
    e.preventDefault();
    // postMessage(this.state); //send to backend
    setMessageText(""); //reset input field to empty
  };

  return (
    <>
      <div className="send-massage-container">
        {/* <Input
            defaultValue={messageText}
            value={messageText}
            onChange={handleChange}
            placeholder="Type here..."
            multiline={true}
            leftButtons={
              <div className="emoj">
                <IconButton
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={() => {
                    setOpenEmoji(!openEmoji);
                  }}
                >
                  <EmojiEmotionsIcon />
                </IconButton>
                {openEmoji && <Picker onSelect={addEmoji} />}
              </div>
            }
            rightButtons={
              <IconButton
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={() => {
                  setEmojiSelected(null);
                  console.log("send message ", messageText);
                }}
              >
                <SendIcon />
              </IconButton>
            }
          /> */}
        {/* <form onSubmit={handleSubmit}> */}
        <Grid container className="send-msg-container">
          <Grid item xs={1}>
            <div className="emoj">
              <IconButton
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={() => {
                  setOpenEmoji(!openEmoji);
                }}
              >
                <EmojiEmotionsIcon />
              </IconButton>
              {openEmoji && <Picker onSelect={addEmoji} />}
            </div>
          </Grid>
          <Grid item xs={9} className="send-msg-input-container">
            <input
              type="text"
              value={messageText}
              onChange={handleChange}
              // placeholder="Type here..."
              placeholder={
                locale.locale == "en" ? "Type a message" : "اكتب رسالة"
              }
              className="send-msg"
              rows="5"
              cols="20"
            />
          </Grid>
          <Grid item xs={1}>
            <IconButton
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={() => {
                console.log(
                  "send message conversationMessages ",
                  messageText,
                  conversationMessages
                );
                setMessageText("");

                dispatch(
                  sendMessage(
                    clickedUserChat.i,
                    clickedUserChat.co,
                    clickedUserChat.ci,
                    clickedUserChat.va,
                    messageText
                  )
                );
              }}
            >
              <SendIcon />
            </IconButton>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default SendMessage;
