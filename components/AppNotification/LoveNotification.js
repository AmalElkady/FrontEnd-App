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
import Link from "next/link";

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

  //love notifications
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

  // view profile notifications
  const notificationViewUnread = useSelector(
    state => state.interaction.notificationViewUnread
  );
  const notificationViewDates = useSelector(
    state => state.interaction.notificationViewDates
  );
  const OffsetNotificationView = useSelector(
    state => state.interaction.OffsetNotificationView
  );
  const scoreHNotificationView = useSelector(
    state => state.interaction.scoreHNotificationView
  );
  const endOfResultNotificationView = useSelector(
    state => state.interaction.endOfResultNotificationView
  );

  useEffect(() => {
    if (headerSelectedIcon&&finalUsersProfiles!=null) {
      setFinalUsersProfiles(null);
      dispatch(requestPhotoRead());
    }
  }, [headerSelectedIcon]);
  // 
  useEffect(() => {
    if (photoReadSignedRequest != null) {
      setFinalUsersProfiles(null);
      let finalProfiles = [];
      if (headerSelectedIcon == "love") {
        if (notificationLoveUnread.length != 0) {
          finalProfiles = mapSmallUserPhotoUrl(
            notificationLoveUnread,
            photoReadSignedRequest.signedRequest
          );
          setFinalUsersProfiles(finalProfiles);
        }
      } else if (headerSelectedIcon == "views") {
        if (notificationViewUnread.length != 0) {
          finalProfiles = mapSmallUserPhotoUrl(
            notificationViewUnread,
            photoReadSignedRequest.signedRequest
          );
          setFinalUsersProfiles(finalProfiles);
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

  // handle scroll for list of Love Notifications
  const handleScrollGetViewProfileNotifications = () => {
    // if (!endOfResultNotificationView) {
    //   // view profiles unread requests (next options)
    //   dispatch(
    //     getLoveSentRequests(scoreHNotificationView, OffsetNotificationView)
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
        {finalUsersProfiles && (
          <InfiniteScroll
            className="scroll-m items-scroll"
            dataLength={headerSelectedIcon == "love"?notificationLoveUnread.length:headerSelectedIcon == "views"?notificationViewUnread.length:""}
            height={300}
            next={headerSelectedIcon == "love"?handleScrollGetLoveNotifications:headerSelectedIcon == "views"?handleScrollGetViewProfileNotifications:""}
            hasMore={headerSelectedIcon == "love"?!endOfResultNotificationLove:headerSelectedIcon == "views"?!endOfResultNotificationView:""}
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
            {headerSelectedIcon == "love" && notificationLoveUnread.length != 0 && (
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
            {headerSelectedIcon == "views" && notificationViewUnread.length != 0 && (
              <Grid item xs={12} className="items-container">
                {notificationViewUnread.map((option, index) => (
                  <ListItem
                    key={notificationViewDates[index]}
                    user={option}
                    time={notificationViewDates[index]}
                  />
                ))}
              </Grid>
            )}
          </InfiniteScroll>
        )}
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <Link
            href={
              headerSelectedIcon == "love"
                ? "/home/love"
                : headerSelectedIcon == "views"
                ? "/home/views"
                : ""
            }
          >
            <Button
              className="linear-g"
              style={{ color: "white", fontWeight: "bold" }}
              variant="contained"
            >
              All Love Actions
            </Button>
          </Link>
        </Grid>
      </Grid>
    </>
  );
}
