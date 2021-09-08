import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";

import Grid from "@material-ui/core/Grid";
import { useRouter } from "next/router";

import "react-chat-elements/dist/main.css";

import ChatUserList from "./ChatUserList";
import Conversation from "./Conversation";
import { readMyPhotos } from "../../actions/Profile";
import { hideMessageChat } from "../../actions/Messages";
import ModalSettings from "../Modals/modalSettings";

import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";

const ChatPanel = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const alertMessageChat = useSelector(
    state => state.messages.alertMessageChat
  );
  const showMessageChat = useSelector(state => state.messages.showMessageChat);

  const ClickedUserChat = useSelector(state => state.messages.clickedUserChat);

  const conversationMessages = useSelector(
    state => state.messages.conversationMessages
  );
  const [users, setUsers] = useState(null);
  const [photoSrc, setPhotoSrc] = useState(null);
  const MyPhotoSigned = useSelector(state => state.profile.myPhotoSigned);

  const OpenModal = useSelector(state => state.profile.openModal);

  useEffect(() => {
    dispatch(readMyPhotos(0, "small"));
  }, []);

  useEffect(() => {
    if (MyPhotoSigned != null && MyPhotoSigned.includes("_49x49_mp")) {
      setPhotoSrc(MyPhotoSigned);
    }
  }, [MyPhotoSigned]);

  useEffect(() => {
    console.log("showMessageChat ", showMessageChat);
    if (showMessageChat) {
      NotificationManager.error(alertMessageChat);
      dispatch(hideMessageChat());
    }
  }, [showMessageChat]);

  return (
    <>
      <Grid container>
        <Grid item xs={4} className="grid-width-1">
          <ChatUserList />
        </Grid>
        <Grid item xs={1} className="grid-width-1"></Grid>
        <Grid item xs={6} className="grid-width-1">
          {photoSrc && <Conversation myPhoto={photoSrc} />}
        </Grid>
      </Grid>

      {OpenModal && <ModalSettings reportConv={true} user={ClickedUserChat} />}
    </>
  );
};

export default ChatPanel;
