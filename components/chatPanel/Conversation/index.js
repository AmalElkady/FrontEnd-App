import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";

import ReceivedMessageCell from "./ReceivedMessageCell/index";
import SentMessageCell from "./SentMessageCell/index";
import ConversationHeader from "./ConversationHeader";
import IntlMessages from "../../../util/IntlMessages";
import { getAgeRange } from "../../../helpers/getAgeRange";
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
  deleteConversation,
  getProfiles,
  getProfilesOnlineStatus,
  setTimestampMap,
  setActiveConversation,
  setConversationTypingIndicator
} from "../../../actions/Messages";
import { requestPhotoRead } from "../../../actions/Home";

const Conversation = ({ myPhoto }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [users, setUsers] = useState(null);

  const clickedUserChat = useSelector(state => state.messages.clickedUserChat);
  const returnedProfiles = useSelector(
    state => state.messages.returnedProfiles
  );

  const returnedProfilesOnlineStatus = useSelector(
    state => state.messages.returnedProfilesOnlineStatus
  );

  const timestampMap = useSelector(state => state.messages.timestampMap);

  const respActiveConversation = useSelector(
    state => state.messages.respActiveConversation
  );

  const respConversationTypingIndicator = useSelector(
    state => state.messages.respConversationTypingIndicator
  );

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
  const indexOfLastMsg = useSelector(state => state.messages.indexOfLastMsg);

  ////
  const conversationCleared = useSelector(
    state => state.messages.conversationCleared
  );

  const conversationDeleted = useSelector(
    state => state.messages.conversationDeleted
  );

  // useEffect(() => {
  //   if (clickedUserChat != null) {
  //     setInterval(() => {
  //       console.log("This will run after 3 minutes");
  //       if (timestampMap.has(clickedUserChat.i)) {
  //         console.log("map has clickedUserChat.i");
  //         // check if timestamp > 3M ----> call 2 APIs to get updated status
  //         let lastTime = timestampMap.get(clickedUserChat.i);
  //         console.log(
  //           "map has clickedUserChat.i last time ",
  //           lastTime,
  //           Date.now(),
  //           moment().diff(lastTime, "minutes")
  //         );
  //         if (moment().diff(lastTime, "minutes") > 3) {
  //           dispatch(
  //             getProfiles([
  //               `${clickedUserChat.co}_${clickedUserChat.ci}_${clickedUserChat.va}_${clickedUserChat.i}`
  //             ])
  //           );
  //         }
  //       }
  //       //}
  //       else {
  //         //add his id and timestamp to Map and call 2 APIs to get status
  //         console.log("map hasn't clickedUserChat.i");
  //         dispatch(setTimestampMap(clickedUserChat.i, Date.now()));
  //         dispatch(
  //           getProfiles([
  //             `${clickedUserChat.co}_${clickedUserChat.ci}_${clickedUserChat.va}_${clickedUserChat.i}`
  //           ])
  //         );
  //       }
  //     }, 1000);
  //   }
  //   // return () => clearTimeout(timer);
  // });

  useEffect(() => {
    if (clickedUserChat != null) {
      console.log(
        "clickedUserChat clickedUserChatUnread",
        clickedUserChat,
        clickedUserChatUnread
      );

      // check if have timestamp for clicked user
      //{

      // if (timestampMap.has(clickedUserChat.i)) {
      //   console.log("map has clickedUserChat.i");
      //   // check if timestamp > 3M ----> call 2 APIs to get updated status
      //   let lastTime = timestampMap.get(clickedUserChat.i);
      //   console.log(
      //     "map has clickedUserChat.i last time ",
      //     lastTime,
      //     Date.now(),
      //     moment().diff(lastTime, "minutes")
      //   );
      //   if (moment().diff(lastTime, "minutes") > 3) {
      //     dispatch(
      //       getProfiles([
      //         `${clickedUserChat.co}_${clickedUserChat.ci}_${clickedUserChat.va}_${clickedUserChat.i}`
      //       ])
      //     );
      //   }
      // }
      // //}
      // else {
      //   //add his id and timestamp to Map and call 2 APIs to get status
      //   console.log("map hasn't clickedUserChat.i");
      //   dispatch(setTimestampMap(clickedUserChat.i, Date.now()));
      //   dispatch(
      //     getProfiles([
      //       `${clickedUserChat.co}_${clickedUserChat.ci}_${clickedUserChat.va}_${clickedUserChat.i}`
      //     ])
      //   );
      // }

      ///////////

      setInterval(() => {
        console.log("This will run after 3 minutes ", timestampMap);
        if (timestampMap.has(clickedUserChat.i)) {
          console.log("map has clickedUserChat.i");
          // check if timestamp > 3M ----> call 2 APIs to get updated status
          let lastTime = timestampMap.get(clickedUserChat.i);
          console.log(
            "map has clickedUserChat.i last time ",
            lastTime,
            Date.now(),
            moment().diff(lastTime, "minutes")
          );
          if (moment().diff(lastTime, "minutes") > 3) {
            dispatch(
              getProfiles([
                `${clickedUserChat.co}_${clickedUserChat.ci}_${clickedUserChat.va}_${clickedUserChat.i}`
              ])
            );
          }
        }
        //}
        else {
          //add his id and timestamp to Map and call 2 APIs to get status
          console.log("map hasn't clickedUserChat.i");
          dispatch(setTimestampMap(clickedUserChat.i, Date.now()));
          dispatch(
            getProfiles([
              `${clickedUserChat.co}_${clickedUserChat.ci}_${clickedUserChat.va}_${clickedUserChat.i}`
            ])
          );
        }
      }, 60000);

      //call it each 20s if closed send activate:false
      // dispatch(
      //   setActiveConversation(
      //     clickedUserChat.i,
      //     clickedUserChat.co,
      //     clickedUserChat.ci,
      //     clickedUserChat.va,
      //     true
      //   )
      // );
      // check each 2s if I'm writing send activate: true else send activate: false
      // dispatch(
      //   setConversationTypingIndicator(
      //     clickedUserChat.i,
      //     clickedUserChat.co,
      //     clickedUserChat.ci,
      //     clickedUserChat.va,
      //     true
      //   )
      // );

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

  useEffect(() => {
    if (returnedProfiles != null) {
      let age_range = getAgeRange(moment().diff(clickedUserChat.b, "years"));
      console.log("returnedProfiles age", returnedProfiles, age_range);
      dispatch(
        getProfilesOnlineStatus(returnedProfiles, [
          `${clickedUserChat.co}_${clickedUserChat.ci}_${clickedUserChat.va}_${age_range}`
        ])
      );
    }
  }, [returnedProfiles]);

  useEffect(() => {
    if (returnedProfilesOnlineStatus != null) {
      console.log("returnedProfilesOnlineStatus", returnedProfilesOnlineStatus);
    }
  }, [returnedProfilesOnlineStatus]);

  useEffect(() => {
    if (respActiveConversation != null) {
      console.log("respActiveConversation", respActiveConversation);
    }
  }, [respActiveConversation]);

  useEffect(() => {
    if (respConversationTypingIndicator != null) {
      console.log(
        "respConversationTypingIndicator",
        respConversationTypingIndicator
      );
    }
  }, [respConversationTypingIndicator]);

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
                {console.log("indexOfLastMsg ", indexOfLastMsg)}
                {conversationMessages.map((conversation, index) =>
                  conversation.o === 1 ? (
                    <>
                      {indexOfLastMsg == index && (
                        <div style={{ textAlign: "center", color: "#b72051" }}>
                          <Typography
                            variant="overline"
                            display="block"
                            gutterBottom
                            style={{ fontWeight: "bold" }}
                          >
                            <IntlMessages id="mgs.seen" />
                          </Typography>
                        </div>
                      )}
                      <SentMessageCell
                        key={index}
                        conversation={conversation}
                        myPhoto={myPhoto}
                        seen={seenFlag == 0 ? false : true}
                      />
                    </>
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
