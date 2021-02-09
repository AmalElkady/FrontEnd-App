import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import IntlMessages from "../../util/IntlMessages";
import InfiniteScroll from "react-infinite-scroll-component";
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

export default function Views() {
  const dispatch = useDispatch();
   const router = useRouter();
  const [finalUsersProfiles, setFinalUsersProfiles] = useState(null);

  const photoReadSignedRequest = useSelector(
    state => state.home.photoReadSignedRequest
  );

  //User Views
  const blockedUsersProfiles = useSelector(state => state.interaction.blockedUsersProfiles);
  const userViewsDates = useSelector(state => state.interaction.userViewsDates);
  const scoreHBlockedUsers = useSelector(state => state.interaction.scoreHBlockedUsers);
  const OffsetBlockedUsers = useSelector(state => state.interaction.OffsetBlockedUsers);
  const endOfResultBlockedUsers = useSelector(
    state => state.interaction.endOfResultBlockedUsers
  );

  useEffect(() => {
    dispatch(getBlockedUsers(scoreHBlockedUsers, OffsetBlockedUsers));
  }, []);

  useEffect(() => {
    if (blockedUsersProfiles.length!=0) {
      console.log("blockedUsersProfiles ", blockedUsersProfiles);
       //dispatch(requestPhotoRead());
    }
  }, [blockedUsersProfiles]);


    // useEffect(() => {
    //   if (photoReadSignedRequest != null) {
    //     setFinalUsersProfiles(null);
    //     let finalUserViewsProfiles = [];
    //     if (router.pathname == "/home/blockedUsers") {
    //       if (userViewsProfiles.length != 0) {
    //         finalUserViewsProfiles = mapSmallUserPhotoUrl(
    //           userViewsProfiles,
    //           photoReadSignedRequest.signedRequest
    //         );
    //         setFinalUsersProfiles(finalUserViewsProfiles);
    //       }
    //     }
    //   }
    // }, [photoReadSignedRequest]);

  // handle scroll for list of Blocked Users
  const handleScrollGetBlockedUsers = () => {
    // if (!endOfResultBlockedUsers) {
    //   // sent get Blocked users (next options)
    //   dispatch(getBlockedUsers(scoreHBlockedUsers, OffsetBlockedUsers));
    // }
  };

  return (
    <>
      <Grid container>
        {/* {router.pathname == "/home/blockedUsers" && finalUsersProfiles && (
          <InfiniteScroll
            className="scroll-m items-scroll-2"
            dataLength={userViewsProfiles.length}
            height={300}
            next={handleScrollGetBlockedUsers}
            hasMore={!endOfResultBlockedUsers}
            loader={<CircularProgress />}
            endMessage={
              <p style={{ textAlign: "center" }}>
                {userViewsProfiles.length != 0 && (
                  <b>Yay! You have seen All profile Views </b>
                )}
                {userViewsProfiles.length === 0 && (
                  <b>Yay! You don't have profile Views </b>
                )}
              </p>
            }
          >
            {userViewsProfiles.length != 0 && (
              <Grid item xs={12} className="items-container">
                {userViewsProfiles.map((option, index) => (
                  <ListItem key={userViewsDates[index]} user={option} time={userViewsDates[index]} />
                ))}
              </Grid>
            )}
          </InfiniteScroll>
        )} */}
      </Grid>
    </>
  );
}
