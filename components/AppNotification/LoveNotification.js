import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import IntlMessages from "../../util/IntlMessages";
import InfiniteScroll from "react-infinite-scroll-component";
import Typography from "@material-ui/core/Typography";
import { useRouter } from "next/router";
import Button from "@material-ui/core/Button";

import {
  getLoveMatchedAndReceivedRequests,
  getLoveSentRequests
} from "../../actions/Interaction";

import { mapSmallUserPhotoUrl } from "../../helpers/mapSmallUserPhotoUrl";

import { requestPhotoRead } from "../../actions/Home";
import ListItem from "../Love/ListItem";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";

// const useStyles = makeStyles(theme => ({
//   root: {
//     maxWidth: "70%",
//     margin: "2rem auto"
//   }
// }));
export default function LoveNotifications() {
  //const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const [finalUsersProfiles, setFinalUsersProfiles] = useState(null);

  const photoReadSignedRequest = useSelector(
    state => state.home.photoReadSignedRequest
  );

  const headerSelectedIcon = useSelector(
    state => state.home.headerSelectedIcon
  );

  //sent love
  const notificationLoveUnread = useSelector(
    state => state.interaction.notificationLoveUnread
  );
  const notificationLoveDates = useSelector(
    state => state.interaction.notificationLoveDates
  );
  const OffsetNotificationLove = useSelector(
    state => state.interaction.OffsetNotificationLove
  );
  const scoreHNotificationLove = useSelector(
    state => state.interaction.scoreHNotificationLove
  );
  const endOfResultNotificationLove = useSelector(
    state => state.interaction.endOfResultNotificationLove
  );

  useEffect(() => {
    if (notificationLoveUnread) {
      dispatch(requestPhotoRead());
      console.log(
        "from useEffect notificationLoveUnread ",
        notificationLoveUnread
      );
    }
  }, [notificationLoveUnread]);

  useEffect(() => {
    if (photoReadSignedRequest != null) {
      setFinalUsersProfiles(null);
      let finalLoveProfiles = [];
      if (headerSelectedIcon == "love") {
        if (notificationLoveUnread.length != 0) {
          finalLoveProfiles = mapSmallUserPhotoUrl(
            notificationLoveUnread,
            photoReadSignedRequest.signedRequest
          );
          setFinalUsersProfiles(finalLoveProfiles);
        }
      }
    }
  }, [photoReadSignedRequest]);

  // handle scroll for list of Love Notifications
  const handleScrollGetLoveNotifications = () => {
    // if (!endOfResultNotificationLove) {
    //   // sent love requests (next options)
    //   dispatch(
    //     getLoveSentRequests(scoreHLoveSentRequests, OffsetLoveSentRequests)
    //   );
    // }
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} className="page-title-container">
          <Typography variant="h6">
            {headerSelectedIcon == "love" && (
              <IntlMessages id="loveList.receivedTitle" />
            )}
          </Typography>
        </Grid>
        {console.log("headerSelectedIcon ", headerSelectedIcon)}
        {headerSelectedIcon == "love" && finalUsersProfiles && (
          <InfiniteScroll
            className="scroll-m items-scroll"
            dataLength={notificationLoveUnread.length}
            height={300}
            next={handleScrollGetLoveNotifications}
            hasMore={!endOfResultNotificationLove}
            loader={<CircularProgress />}
            endMessage={
              <p style={{ textAlign: "center" }}>
                {notificationLoveUnread.length != 0 && (
                  <b>Yay! You have seen all love notifications </b>
                )}
                {notificationLoveUnread.length === 0 && (
                  <b>Yay! You don't have love notifications </b>
                )}
              </p>
            }
          >
            {notificationLoveUnread.length != 0 && (
              <Grid item xs={12} className="items-container">
                {notificationLoveUnread.map((option, index) => (
                  <ListItem
                    key={notificationLoveDates[index]}
                    user={option}
                    time={notificationLoveDates[index]}
                  />
                ))}
              </Grid>
            )}
          </InfiniteScroll>
        )}
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <Button
            className="linear-g"
            style={{ color: "white", fontWeight: "bold" }}
            variant="contained"
          >
            All Love Actions
          </Button>
        </Grid>
      </Grid>
    </>
    
  );
}
