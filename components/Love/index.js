import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import IntlMessages from "../../util/IntlMessages";
import InfiniteScroll from "react-infinite-scroll-component";

import {
  getLoveMatchedAndReceivedRequests,
  getLoveSentRequests
} from "../../actions/Interaction";

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

  const LoveMatchedAndReceivedRequests = useSelector(
    state => state.interaction.loveMatchedAndReceivedRequests
  );

  useEffect(() => {
    if (LoveMatchedAndReceivedRequests != null) {
      console.log(
        "LoveMatchedAndReceivedRequests ",
        LoveMatchedAndReceivedRequests
      );
    }
  }, [LoveMatchedAndReceivedRequests]);

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
    // if (!endOfResultLoveSentRequests) {
    //   // matched love requests (next options)
    //    // dispatch(getLoveSentRequests(scoreHLoveSentRequests,OffsetLoveSentRequests))
    //   }
  };

  // handle scroll for list of received love requests
  const handleScrollReceivedLoveRequests = () => {
    // if (!endOfResultLoveSentRequests) {
    //   //  received love requests (next options)
    //    // dispatch(getLoveSentRequests(scoreHLoveSentRequests,OffsetLoveSentRequests))
    //   }
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} className="grid-width-1">
          <LoveIcons />
        </Grid>
        {console.log(
          "LoveSentRequestsProfiles from render ",
          LoveSentRequestsProfiles
        )}
        {LoveSentRequestsProfiles && (
          <InfiniteScroll
            className="scroll-m"
            dataLength={LoveSentRequestsProfiles.length}
            height={300}
            next={handleScrollSentLoveRequests}
            hasMore={!endOfResultLoveSentRequests}
            loader={<CircularProgress />}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen sent love requests </b>
              </p>
            }
          >
            {LoveSentRequestsProfiles.map((option, index) => (
              <ListItem key={option.i} />
            ))}
          </InfiniteScroll>
        )}
      </Grid>
    </>
  );
}
