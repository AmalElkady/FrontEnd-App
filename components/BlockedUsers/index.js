import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import IntlMessages from "../../util/IntlMessages";
import InfiniteScroll from "react-infinite-scroll-component";
import Typography from "@material-ui/core/Typography";
import { useRouter } from "next/router";

import { getBlockedUsers } from "../../actions/Interaction";

import { mapSmallUserPhotoUrl } from "../../helpers/mapSmallUserPhotoUrl";

import { requestPhotoRead } from "../../actions/Home";

//import LoveIcons from "./LoveIcons";
import ListItem from "../Love/ListItem";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";

export default function BlockedUsers() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [finalUsersProfiles, setFinalUsersProfiles] = useState(null);

  const photoReadSignedRequest = useSelector(
    state => state.home.photoReadSignedRequest
  );

  //Users Blocked
  const blockedUsersProfiles = useSelector(
    state => state.interaction.blockedUsersProfiles
  );
  const blockedUsersDates = useSelector(
    state => state.interaction.blockedUsersDates
  );
  const scoreHBlockedUsers = useSelector(
    state => state.interaction.scoreHBlockedUsers
  );
  const OffsetBlockedUsers = useSelector(
    state => state.interaction.OffsetBlockedUsers
  );
  const endOfResultBlockedUsers = useSelector(
    state => state.interaction.endOfResultBlockedUsers
  );

  useEffect(() => {
    dispatch(getBlockedUsers(scoreHBlockedUsers, OffsetBlockedUsers));
  }, []);

  useEffect(() => {
    if (blockedUsersProfiles.length != 0) {
      dispatch(requestPhotoRead());
    }
  }, [blockedUsersProfiles]);

  useEffect(() => {
    if (photoReadSignedRequest != null) {
      setFinalUsersProfiles(null);
      let finalUserBlocked = [];
      if (router.pathname == "/home/blockedUsers") {
        //   if (user.length != 0) {
        finalUserBlocked = mapSmallUserPhotoUrl(
          blockedUsersProfiles,
          photoReadSignedRequest.signedRequest
        );
        setFinalUsersProfiles(finalUserBlocked);
        //   }
      }
    }
  }, [photoReadSignedRequest]);

  // handle scroll for list of Blocked Users
  const handleScrollGetBlockedUsers = () => {
    if (!endOfResultBlockedUsers) {
      // sent get Blocked users (next options)
      dispatch(getBlockedUsers(scoreHBlockedUsers, OffsetBlockedUsers));
    }
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} className="page-title-container">
          <Typography variant="h6">
            <IntlMessages id="blockedList.blockedTitle" />
          </Typography>
        </Grid>
        {router.pathname == "/home/blockedUsers" && finalUsersProfiles && (
          <InfiniteScroll
            className="scroll-m items-scroll-2 "
            dataLength={blockedUsersProfiles.length}
            height={300}
            next={handleScrollGetBlockedUsers}
            hasMore={!endOfResultBlockedUsers}
            loader={
              <div className="loading-border loading--full-height">
                <img
                  src="../../static/images/Gila_Final_Logo_form.svg"
                  alt="App"
                  title="App"
                  className="rotate-image loader-img"
                />
              </div>
            }
            endMessage={
              <p style={{ textAlign: "center" }}>
                {/* {blockedUsersProfiles.length != 0 && (
                  <b>Yay! You have seen All blocked Users </b>
                )} */}
                {blockedUsersProfiles.length === 0 && (
                  <Typography variant="h6">
                    <IntlMessages id="blocked.dontHave" />
                  </Typography>
                )}
              </p>
            }
          >
            {blockedUsersProfiles.length != 0 && (
              <Grid item xs={12} className="items-container ">
                {blockedUsersProfiles.map((option, index) => (
                  <ListItem
                    key={blockedUsersDates[index]}
                    user={option}
                    time={blockedUsersDates[index]}
                  />
                ))}
              </Grid>
            )}
          </InfiniteScroll>
        )}
      </Grid>
    </>
  );
}
