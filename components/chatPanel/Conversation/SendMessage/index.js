import React, { useState, useEffect, useRef } from "react";
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
  resetMegsCovers,
  setConversationTypingIndicator
} from "../../../../actions/Messages";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const SendMessage = () => {
  const dispatch = useDispatch();

  const [preString, setPreString] = useState("");
  const [currentString, setCurrentString] = useState("");
  const [userTyping, setUserTyping] = useState(0);

  const [userWrite, setUserWrite] = useState(null);

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
  ///call each 2s
  useInterval(() => {
    if (preString == currentString && userTyping == 1) {
      dispatch(
        setConversationTypingIndicator(
          clickedUserChat.i,
          clickedUserChat.co,
          clickedUserChat.ci,
          clickedUserChat.va,
          clickedUserChat.jnt,
          false
        )
      );
      setPreString("");
      setCurrentString("");
      setUserTyping(0);
    }
  }, 2000);

  ///call each 1s
  useInterval(() => {
    setPreString(currentString);
  }, 1000);

  // useInterval(() => {
  //   //  console.log("This will run after 2s For  Typing indicator ", userWrite);
  //   if (userWrite) {
  //     console.log("user typing");
  //     dispatch(
  //       setConversationTypingIndicator(
  //         clickedUserChat.i,
  //         clickedUserChat.co,
  //         clickedUserChat.ci,
  //         clickedUserChat.va,
  //         true
  //       )
  //     );
  //     setUserWrite(false);
  //   } else if (userWrite == false && userWrite != null) {
  //     console.log("stoped typing");
  //     dispatch(
  //       setConversationTypingIndicator(
  //         clickedUserChat.i,
  //         clickedUserChat.co,
  //         clickedUserChat.ci,
  //         clickedUserChat.va,
  //         false
  //       )
  //     );
  //     setUserWrite(null);
  //   } else {
  //     // console.log("null typing");
  //     // clearInterval(interval);
  //   }
  // }, 2000);

  // useEffect(() => {
  //   if (currentString.length != 0) {
  //     console.log("currentString ", currentString);
  //   }
  // }, [currentString]);

  useEffect(() => {
    if (messageSent) {
      if (conversationMessages == "") {
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
    setMessageText(e.target.value);
  };

  const addEmoji = e => {
    let emoji = e.native;
    setMessageText(`${messageText + emoji}`);
  };

  const handleSubmit = e => {
    e.preventDefault();
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
              onKeyDown={e => {
                setCurrentString(`${currentString}${e.key}`);
              }}
              onKeyUp={e => {
                if (currentString.length > 5) {
                  dispatch(
                    setConversationTypingIndicator(
                      clickedUserChat.i,
                      clickedUserChat.co,
                      clickedUserChat.ci,
                      clickedUserChat.va,
                      clickedUserChat.jnt,
                      true
                    )
                  );
                  setUserTyping(1);
                }
              }}
              placeholder="Type here..."
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
