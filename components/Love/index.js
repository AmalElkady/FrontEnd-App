import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import IntlMessages from "../../util/IntlMessages";
import InfiniteScroll from "react-infinite-scroll-component";
import Typography from "@material-ui/core/Typography";

import {
  getLoveMatchedAndReceivedRequests,
  getLoveSentRequests
} from "../../actions/Interaction";

import { mapSmallUserPhotoUrl } from "../../helpers/mapSmallUserPhotoUrl";

import { requestPhotoRead } from "../../actions/Home";

import LoveIcons from "./LoveIcons";
import ListItem from "./ListItem";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: "70%",
    margin: "2rem auto"
  }
}));
export default function Love() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [finalUsersProfiles, setFinalUsersProfiles] = useState(null);

  const loveSelectedIcon = useSelector(
    state => state.interaction.loveSelectedIcon
  );

  const photoReadSignedRequest = useSelector(
    state => state.home.photoReadSignedRequest
  );

  //sent love
  const LoveSentRequestsProfiles = useSelector(
    state => state.interaction.loveSentRequestsProfiles
  );
  const OffsetLoveSentRequests = useSelector(
    state => state.interaction.OffsetLoveSentRequests
  );
  const scoreHLoveSentRequests = useSelector(
    state => state.interaction.scoreHLoveSentRequests
  );
  const endOfResultLoveSentRequests = useSelector(
    state => state.interaction.endOfResultLoveSentRequests
  );

  //matched love
  const LoveMatchedRequestsProfiles = useSelector(
    state => state.interaction.loveMatchedRequestsProfiles
  );
  const OffsetLoveMatchedRequests = useSelector(
    state => state.interaction.OffsetLoveMatchedRequests
  );
  const scoreHLoveMatchedRequests = useSelector(
    state => state.interaction.scoreHLoveMatchedRequests
  );
  const endOfResultLoveMatchedRequests = useSelector(
    state => state.interaction.endOfResultLoveMatchedRequests
  );
  //received love
  const LoveReceivedRequestsProfiles = useSelector(
    state => state.interaction.loveReceivedRequestsProfiles
  );
  const OffsetLoveReceivedRequests = useSelector(
    state => state.interaction.OffsetLoveReceivedRequests
  );
  const scoreHLoveReceivedRequests = useSelector(
    state => state.interaction.scoreHLoveReceivedRequests
  );
  const endOfResultLoveReceivedRequests = useSelector(
    state => state.interaction.endOfResultLoveReceivedRequests
  );

  useEffect(() => {
    if (loveSelectedIcon == "sent" && LoveSentRequestsProfiles.length != 0) {
      dispatch(requestPhotoRead());
    }
  }, [LoveSentRequestsProfiles]);

  useEffect(() => {
    if (
      loveSelectedIcon == "match" &&
      LoveMatchedRequestsProfiles.length != 0
    ) {
      dispatch(requestPhotoRead());
    }
  }, [LoveMatchedRequestsProfiles]);

  useEffect(() => {
    if (
      loveSelectedIcon == "received" &&
      LoveReceivedRequestsProfiles.length != 0
    ) {
      dispatch(requestPhotoRead());
    }
  }, [LoveReceivedRequestsProfiles]);

  useEffect(() => {
    if (photoReadSignedRequest != null) {
      setFinalUsersProfiles(null);
      let finalLoveSentRequestsProfiles = [];
      if (loveSelectedIcon == "sent") {
        if (LoveSentRequestsProfiles.length != 0) {
          finalLoveSentRequestsProfiles = mapSmallUserPhotoUrl(
            LoveSentRequestsProfiles,
            photoReadSignedRequest.signedRequest
          );
          setFinalUsersProfiles(finalLoveSentRequestsProfiles);
        }
      } else if (loveSelectedIcon == "match") {
        if (LoveMatchedRequestsProfiles.length != 0) {
          finalLoveSentRequestsProfiles = mapSmallUserPhotoUrl(
            LoveMatchedRequestsProfiles,
            photoReadSignedRequest.signedRequest
          );
          setFinalUsersProfiles(finalLoveSentRequestsProfiles);
        }
      } else if (loveSelectedIcon == "received") {
        if (LoveReceivedRequestsProfiles.length != 0) {
          finalLoveSentRequestsProfiles = mapSmallUserPhotoUrl(
            LoveReceivedRequestsProfiles,
            photoReadSignedRequest.signedRequest
          );
          setFinalUsersProfiles(finalLoveSentRequestsProfiles);
        }
      }
    }
  }, [photoReadSignedRequest]);

  // handle scroll for list of sent love requests
  const handleScrollSentLoveRequests = () => {
    if (!endOfResultLoveSentRequests) {
      // sent love requests (next options)
      dispatch(
        getLoveSentRequests(scoreHLoveSentRequests, OffsetLoveSentRequests)
      );
    }
  };

  // handle scroll for list of matched love requests
  const handleScrollMatchedLoveRequests = () => {
    if (!endOfResultLoveMatchedRequests) {
      // matched love requests (next options)
      dispatch(
        getLoveMatchedAndReceivedRequests(
          1,
          scoreHLoveMatchedRequests,
          OffsetLoveMatchedRequests
        )
      );
    }
  };

  // handle scroll for list of received love requests
  const handleScrollReceivedLoveRequests = () => {
    if (!endOfResultLoveReceivedRequests) {
      //  received love requests (next options)
      dispatch(
        getLoveMatchedAndReceivedRequests(
          0,
          scoreHLoveReceivedRequests,
          OffsetLoveReceivedRequests
        )
      );
    }
  };

  return (
    <>
      <Grid container>
        <Grid
          item
          xs={12}
          className="page-title-container page-title-container-2"
        >
          <Typography variant="h6">
            {loveSelectedIcon == "match" ? (
              <>
                <IntlMessages id="loveList.matchTitle" />
              </>
            ) : loveSelectedIcon == "sent" ? (
              <>
                <IntlMessages id="loveList.sentTitle" />
              </>
            ) : loveSelectedIcon == "received" ? (
              <>
                <IntlMessages id="loveList.receivedTitle" />
              </>
            ) : (
              ""
            )}
          </Typography>
        </Grid>
        <Grid item xs={12} className="grid-width-1 page-icons-container">
          <LoveIcons />
        </Grid>
        {loveSelectedIcon == "sent" && finalUsersProfiles && (
          <InfiniteScroll
            className="scroll-m items-scroll"
            dataLength={LoveSentRequestsProfiles.length}
            height={300}
            next={handleScrollSentLoveRequests}
            hasMore={!endOfResultLoveSentRequests}
            loader={<CircularProgress />}
            endMessage={
              <p style={{ textAlign: "center" }}>
                {/* {LoveSentRequestsProfiles.length != 0 && (
                  <b>Yay! You have seen sent love requests </b>
                )} */}
                {LoveSentRequestsProfiles.length === 0 && (
                  <b>Yay! You don't have sent love requests </b>
                )}
              </p>
            }
          >
            {LoveSentRequestsProfiles.length != 0 && (
              <Grid item xs={12} className="items-container">
                {LoveSentRequestsProfiles.map((option, index) => (
                  <ListItem key={option.i} user={option} />
                ))}
              </Grid>
            )}
          </InfiniteScroll>
        )}
        {loveSelectedIcon == "match" && finalUsersProfiles && (
          <InfiniteScroll
            className="scroll-m items-scroll"
            height={300}
            dataLength={LoveMatchedRequestsProfiles.length}
            next={handleScrollMatchedLoveRequests}
            hasMore={!endOfResultLoveMatchedRequests}
            loader={<CircularProgress />}
            endMessage={
              <p style={{ textAlign: "center" }}>
                {/* {LoveMatchedRequestsProfiles.length != 0 && (
                  <b>Yay! You have seen Matched love requests </b>
                )} */}
                {LoveMatchedRequestsProfiles.length === 0 && (
                  <b>Yay! You don't have Matched love requests </b>
                )}
              </p>
            }
          >
            {LoveMatchedRequestsProfiles.length != 0 && (
              <Grid item xs={12} className="items-container">
                {LoveMatchedRequestsProfiles.map((option, index) => (
                  <ListItem key={option.i} user={option} />
                ))}
              </Grid>
            )}
          </InfiniteScroll>
        )}
        {loveSelectedIcon == "received" && finalUsersProfiles && (
          <InfiniteScroll
            className="scroll-m items-scroll"
            dataLength={LoveReceivedRequestsProfiles.length}
            height={300}
            next={handleScrollReceivedLoveRequests}
            hasMore={!endOfResultLoveReceivedRequests}
            loader={<CircularProgress />}
            endMessage={
              <p style={{ textAlign: "center" }}>
                {/* {LoveReceivedRequestsProfiles.length != 0 && (
                  <b>Yay! You have seen received love requests </b>
                )} */}
                {LoveReceivedRequestsProfiles.length === 0 && (
                  <b>Yay! You don't have received love requests </b>
                )}
              </p>
            }
          >
            {LoveReceivedRequestsProfiles.length != 0 && (
              <Grid item xs={12} className="items-container">
                {LoveReceivedRequestsProfiles.map((option, index) => (
                  <ListItem key={option.i} user={option} />
                ))}
              </Grid>
            )}
          </InfiniteScroll>
        )}
      </Grid>
    </>
  );
}
