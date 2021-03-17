import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { mapSmallUserPhotoUrl } from "../../../helpers/mapSmallUserPhotoUrl";
import { useRouter } from "next/router";

import { ChatItem } from "react-chat-elements";
import InfiniteScroll from "react-infinite-scroll-component";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import IntlMessages from "../../../util/IntlMessages";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import {
  readAllMessagesCovers,
  deleteConversation,
  clickedUserChat
} from "../../../actions/Messages";
import { requestPhotoRead } from "../../../actions/Home";

const ChatUserList = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [users, setUsers] = useState(null);
  const photoReadSignedRequest = useSelector(
    state => state.home.photoReadSignedRequest
  );
  /// Messages Covers
  const allMessagesCoversProfiles = useSelector(
    state => state.messages.allMessagesCoversProfiles
  );

  const allMessagesCovers = useSelector(
    state => state.messages.allMessagesCovers
  );

  const OffsetMessagesCovers = useSelector(
    state => state.messages.OffsetMessagesCovers
  );

  const scoreLMessagesCovers = useSelector(
    state => state.messages.scoreLMessagesCovers
  );
  const endOfMessagesCovers = useSelector(
    state => state.messages.endOfMessagesCovers
  );
  const allMessagesCoversDates = useSelector(
    state => state.messages.allMessagesCoversDates
  );

  useEffect(() => {
    dispatch(readAllMessagesCovers(scoreLMessagesCovers, OffsetMessagesCovers));
  }, []);

  useEffect(() => {
    if (allMessagesCoversProfiles) {
      dispatch(requestPhotoRead());
    }
  }, [allMessagesCoversProfiles]);

  useEffect(() => {
    if (photoReadSignedRequest != null) {
      setUsers(null);
      let finalUsersProfiles = [];
      if (router.pathname == "/home/messages") {
        if (allMessagesCoversProfiles.length != 0) {
          finalUsersProfiles = mapSmallUserPhotoUrl(
            allMessagesCoversProfiles,
            photoReadSignedRequest.signedRequest
          );
          setUsers(
            finalUsersProfiles.map((e, i) => {
              e = {
                avatar: e._,
                title: e.n,
                subtitle: `${JSON.parse(allMessagesCovers[i][1]).m}`,
                date: new Date(Number(allMessagesCoversDates[i])),
                unread: Number(allMessagesCovers[i][0])
              };
              return e;
            })
          );
        }
      }
    }
  }, [photoReadSignedRequest]);

  // handle scroll for list of messages covers
  const handleScrollMessagesCovers = () => {
    console.log("more scroll ", endOfMessagesCovers);
    if (!endOfMessagesCovers) {
      // sent get messages covers (next options)
      dispatch(
        readAllMessagesCovers(scoreLMessagesCovers, OffsetMessagesCovers)
      );
    }
  };

  return (
    <>
      <div className="users-main-content">
        <div className="cover-title">
          <Typography variant="h6">
            <IntlMessages id="chat.coverTitle" />
          </Typography>
        </div>
        {users != null && (
          <InfiniteScroll
            className="scroll-m"
            dataLength={allMessagesCoversProfiles.length}
            height={200}
            next={handleScrollMessagesCovers}
            hasMore={!endOfMessagesCovers}
            loader={<CircularProgress />}
            // endMessage={
            //   <p style={{ textAlign: "center" }}>
            //     {allMessagesCoversProfiles.length != 0 && (
            //       <b>Yay! You have seen All Messages Covers </b>
            //     )}
            //     {allMessagesCoversProfiles.length === 0 && (
            //       <b>Yay! You don't have Messages Covers </b>
            //     )}
            //   </p>
            // }
          >
            {allMessagesCoversProfiles.map((user, i) => (
              <>
                <div className="more-container">
                  <IconButton
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    <MoreHorizIcon />
                  </IconButton>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        dispatch(
                          deleteConversation(user.i, user.co, user.ci, user.va)
                        );
                      }}
                    >
                      <IntlMessages id="chat.delete" />
                    </MenuItem>
                  </Menu>
                </div>
                <ChatItem
                  key={user.id}
                  avatar={user._}
                  title={user.n}
                  subtitle={`${JSON.parse(allMessagesCovers[i][1]).m}`}
                  date={new Date(Number(allMessagesCoversDates[i]))}
                  unread={Number(allMessagesCovers[i][0])}
                  onClick={() => {
                    console.log("user on click ", user);
                    dispatch(
                      clickedUserChat(user, Number(allMessagesCovers[i][0]))
                    );
                  }}
                />
              </>
            ))}
          </InfiniteScroll>
        )}
      </div>
    </>
  );
};

export default ChatUserList;
