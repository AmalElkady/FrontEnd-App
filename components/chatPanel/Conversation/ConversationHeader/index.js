import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IntlMessages from "../../../../util/IntlMessages";
import moment from "moment";
import { OfflineTimeInArabic } from "../../../../helpers/offlineTimeInArabic";

import {
  clearConversation,
  deleteConversation,
  getProfiles,
  getProfilesOnlineStatus,
  setTimestampMap
} from "../../../../actions/Messages";

import { openModal } from "../../../../actions/Profile";

const ConversationHeader = ({ user }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const clickedUserChat = useSelector(state => state.messages.clickedUserChat);
  const returnedProfiles = useSelector(
    state => state.messages.returnedProfiles
  );

  const locale = useSelector(state => state.settings.locale);

  const returnedProfilesOnlineStatus = useSelector(
    state => state.messages.returnedProfilesOnlineStatus
  );

  const timestampMap = useSelector(state => state.messages.timestampMap);

  useEffect(() => {
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
    ///////////////
    // setInterval(() => {
    //   console.log("This will run after 3 minutes");
    //   if (timestampMap.has(clickedUserChat.i)) {
    //     console.log("map has clickedUserChat.i");
    //     // check if timestamp > 3M ----> call 2 APIs to get updated status
    //     let lastTime = timestampMap.get(clickedUserChat.i);
    //     console.log(
    //       "map has clickedUserChat.i last time ",
    //       lastTime,
    //       Date.now(),
    //       moment().diff(lastTime, "minutes")
    //     );
    //     if (moment().diff(lastTime, "minutes") > 3) {
    //       dispatch(
    //         getProfiles([
    //           `${clickedUserChat.co}_${clickedUserChat.ci}_${clickedUserChat.va}_${clickedUserChat.i}`
    //         ])
    //       );
    //     }
    //   }
    //   //}
    //   else {
    //     //add his id and timestamp to Map and call 2 APIs to get status
    //     console.log("map hasn't clickedUserChat.i");
    //     dispatch(setTimestampMap(clickedUserChat.i, Date.now()));
    //     dispatch(
    //       getProfiles([
    //         `${clickedUserChat.co}_${clickedUserChat.ci}_${clickedUserChat.va}_${clickedUserChat.i}`
    //       ])
    //     );
    //   }
    // }, 60000);
    // return () => clearTimeout(timer);
  }, []);

  // useEffect(() => {
  //   if (returnedProfiles != null) {
  //     console.log("returnedProfiles", returnedProfiles);
  //     dispatch(
  //       getProfilesOnlineStatus(returnedProfiles, [
  //         `${clickedUserChat.co}_${clickedUserChat.ci}_${clickedUserChat.va}_26-33`
  //       ])
  //     );
  //   }
  // }, [returnedProfiles]);

  // useEffect(() => {
  //   if (returnedProfilesOnlineStatus != null) {
  //     console.log("returnedProfilesOnlineStatus", returnedProfilesOnlineStatus);
  //   }
  // }, [returnedProfilesOnlineStatus]);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="conv-header-container">
      <Grid container>
        <Grid item xs={1}>
          <img
            className="rounded-circle avatar size-40 align-self-end"
            src={user._ ? user._ : "https://via.placeholder.com/150x150"}
            alt={user.n}
          />
        </Grid>
        <Grid item xs={8} className="conv-head-name">
          <Typography variant="subtitle1" gutterBottom>
            {user.n ? user.n : <IntlMessages id="chat.user" />}
          </Typography>
          {returnedProfilesOnlineStatus && (
            <Typography variant="overline" display="block" gutterBottom>
              {/* {locale.locale == "ar" &&
                OfflineTimeInArabic(
                  moment(Number(returnedProfilesOnlineStatus[0])).fromNow()
                )}
              {locale.locale != "ar" &&
                (returnedProfilesOnlineStatus[0] == null
                  ? "Offline"
                  : `online from ${
                      // moment().diff(
                      //   Number(returnedProfilesOnlineStatus[0]),
                      //   "days"
                      // )
                      moment(Number(returnedProfilesOnlineStatus[0])).fromNow()
                    }`)} */}
              {Number(returnedProfilesOnlineStatus[0]) == 1 ? (
                <IntlMessages id="Profile.online" />
              ) : (
                ""
              )}
            </Typography>
          )}
        </Grid>
        <Grid item xs={1} style={{ margin: "auto" }}>
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
                dispatch(clearConversation(user.i, user.co, user.ci, user.va));
              }}
            >
              <IntlMessages id="chat.clear" />
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                dispatch(openModal(true));
              }}
            >
              <IntlMessages id="chat.report" />
            </MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </div>
  );
};

export default ConversationHeader;
