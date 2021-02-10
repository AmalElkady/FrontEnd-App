import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import IntlMessages from "../../util/IntlMessages";
import InfiniteScroll from "react-infinite-scroll-component";
import Typography from "@material-ui/core/Typography";

import {
  getPhotoPPReadIncomingApprovedPendingRequests,
  getPhotoPPReadOutgoingRequestsApprovals
} from "../../actions/Interaction";

import { mapSmallUserPhotoUrl } from "../../helpers/mapSmallUserPhotoUrl";

import { requestPhotoRead } from "../../actions/Home";

import PrivateIcons from "./PrivateIcons";
import PPListItem from "./PPListItem";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: "70%",
    margin: "2rem auto"
  }
}));
export default function PrivatePhotos() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [finalUsersProfiles, setFinalUsersProfiles] = useState(null);

  const privateSelectedIcon = useSelector(
    state => state.interaction.privateSelectedIcon
  );

  const photoReadSignedRequest = useSelector(
    state => state.home.photoReadSignedRequest
  );

  //outgoing requests
  const outgoingPPRequestsProfiles = useSelector(
    state => state.interaction.outgoingPPRequestsProfiles
  );
  const OffsetOutgoingPPRequests = useSelector(
    state => state.interaction.OffsetOutgoingPPRequests
  );
  const scoreHOutgoingPPRequests = useSelector(
    state => state.interaction.scoreHOutgoingPPRequests
  );
  const endOfResultOutgoingPPRequests = useSelector(
    state => state.interaction.endOfResultOutgoingPPRequests
  );

  //Incoming requests approved
  const incomingPPApprovedRequestsProfiles = useSelector(
    state => state.interaction.incomingPPApprovedRequestsProfiles
  );
  const OffsetIncomingPPApprovedRequests = useSelector(
    state => state.interaction.OffsetIncomingPPApprovedRequests
  );
  const scoreHIncomingPPApprovedRequests = useSelector(
    state => state.interaction.scoreHIncomingPPApprovedRequests
  );

  const endOfResultIncomingPPApprovedRequests = useSelector(
    state => state.interaction.endOfResultIncomingPPApprovedRequests
  );

  //Incoming requests not approved
  const incomingPPNotApprovedRequestsProfiles = useSelector(
    state => state.interaction.incomingPPNotApprovedRequestsProfiles
  );
  const OffsetIncomingPPNotApprovedRequests = useSelector(
    state => state.interaction.OffsetIncomingPPNotApprovedRequests
  );
  const scoreHIncomingPPNotApprovedRequests = useSelector(
    state => state.interaction.scoreHIncomingPPNotApprovedRequests
  );
  const endOfResultIncomingPPNotApprovedRequests = useSelector(
    state => state.interaction.endOfResultIncomingPPNotApprovedRequests
  );

  useEffect(() => {
    if (
      privateSelectedIcon == "outgoing" &&
      outgoingPPRequestsProfiles.length != 0
    ) {
      dispatch(requestPhotoRead());
    }
  }, [outgoingPPRequestsProfiles]);

  useEffect(() => {
    if (
      privateSelectedIcon == "incomingApproved" &&
      incomingPPApprovedRequestsProfiles.length != 0
    ) {
      dispatch(requestPhotoRead());
    }
  }, [incomingPPApprovedRequestsProfiles]);

  useEffect(() => {
    if (
      privateSelectedIcon == "incomingNotApproved" &&
      incomingPPNotApprovedRequestsProfiles.length != 0
    ) {
      dispatch(requestPhotoRead());
    }
  }, [incomingPPNotApprovedRequestsProfiles]);

  useEffect(() => {
    if (photoReadSignedRequest != null) {
      setFinalUsersProfiles(null);
      let finalPPRequestsProfiles = [];
      if (privateSelectedIcon == "outgoing") {
        if (outgoingPPRequestsProfiles.length != 0) {
          finalPPRequestsProfiles = mapSmallUserPhotoUrl(
            outgoingPPRequestsProfiles,
            photoReadSignedRequest.signedRequest
          );
          setFinalUsersProfiles(finalPPRequestsProfiles);
        }
      } else if (privateSelectedIcon == "incomingApproved") {
        if (incomingPPApprovedRequestsProfiles.length != 0) {
          finalPPRequestsProfiles = mapSmallUserPhotoUrl(
            incomingPPApprovedRequestsProfiles,
            photoReadSignedRequest.signedRequest
          );
          setFinalUsersProfiles(finalPPRequestsProfiles);
        }
      } else if (privateSelectedIcon == "incomingNotApproved") {
        if (incomingPPNotApprovedRequestsProfiles.length != 0) {
          finalPPRequestsProfiles = mapSmallUserPhotoUrl(
            incomingPPNotApprovedRequestsProfiles,
            photoReadSignedRequest.signedRequest
          );
          setFinalUsersProfiles(finalPPRequestsProfiles);
        }
      }
    }
  }, [photoReadSignedRequest]);

  // handle scroll for list of outgoing requests
  const handleScrollOutgoingRequests = () => {
    if (!endOfResultOutgoingPPRequests) {
      // outgoing requests (next options)
      dispatch(
        getPhotoPPReadOutgoingRequestsApprovals(
          scoreHOutgoingPPRequests,
          OffsetOutgoingPPRequests
        )
      );
    }
  };

  // handle scroll for list of Incoming requests approved
  const handleScrollIncomingApprovedRequests = () => {
    if (!endOfResultIncomingPPApprovedRequests) {
      // Incoming Approved requests (next options)
      dispatch(
        getPhotoPPReadIncomingApprovedPendingRequests(
          1,
          scoreHIncomingPPApprovedRequests,
          OffsetIncomingPPApprovedRequests
        )
      );
    }
  };

  // handle scroll for list of Incoming requests not approved
  const handleScrollIncomingNotApprovedRequests = () => {
    if (!endOfResultIncomingPPNotApprovedRequests) {
      //  Incoming Not Approved requests (next options)
      dispatch(
        getPhotoPPReadIncomingApprovedPendingRequests(
          0,
          scoreHIncomingPPNotApprovedRequests,
          OffsetIncomingPPNotApprovedRequests
        )
      );
    }
  };

  return (
    <>
      <Grid container>
      <Grid item xs={12} className="page-title-container">
         <Typography variant="h6">
                {privateSelectedIcon == "outgoing" ? (
                  <>
                    <IntlMessages id="ppList.outgoingTitle" />
                  </>
                ) : privateSelectedIcon == "incomingApproved" ? (
                  <>
                    <IntlMessages id="ppList.incomingApprovedTitle" />
                  </>
                ) : privateSelectedIcon == "incomingNotApproved" ? (
                  <>
                    <IntlMessages id="ppList.incomingNotApprovedTitle" />
                  </>
                ) : (
                  ""
                )}
              </Typography>
       </Grid>
        <Grid item xs={12} className="grid-width-1 page-icons-container">
          <PrivateIcons />
        </Grid>
        {privateSelectedIcon == "outgoing" && finalUsersProfiles && (
          <InfiniteScroll
            className="scroll-m items-scroll"
            dataLength={outgoingPPRequestsProfiles.length}
            height={300}
            next={handleScrollOutgoingRequests}
            hasMore={!endOfResultOutgoingPPRequests}
            loader={<CircularProgress />}
            endMessage={
              <p style={{ textAlign: "center" }}>
                {outgoingPPRequestsProfiles.length != 0 && (
                  <b>Yay! You have seen outgoing PP requests </b>
                )}
                {outgoingPPRequestsProfiles.length === 0 && (
                  <b>Yay! You don't have outgoing PP requests </b>
                )}
              </p>
            }
          >
            {outgoingPPRequestsProfiles.length != 0 && (
              <Grid item xs={12} className="items-container">
                {outgoingPPRequestsProfiles.map((option, index) => (
                  <PPListItem key={option.i} user={option} />
                ))}
              </Grid>
            )}
          </InfiniteScroll>
        )}

        {privateSelectedIcon == "incomingApproved" && finalUsersProfiles && (
          <InfiniteScroll
            className="scroll-m items-scroll"
            height={300}
            dataLength={incomingPPApprovedRequestsProfiles.length}
            next={handleScrollIncomingApprovedRequests}
            hasMore={!endOfResultIncomingPPApprovedRequests}
            loader={<CircularProgress />}
            endMessage={
              <p style={{ textAlign: "center" }}>
                {incomingPPApprovedRequestsProfiles.length != 0 && (
                  <b>Yay! You have seen incoming approved requests </b>
                )}
                {incomingPPApprovedRequestsProfiles.length === 0 && (
                  <b>Yay! You don't have incoming approved requests </b>
                )}
              </p>
            }
          >
            {incomingPPApprovedRequestsProfiles.length != 0 && (
              <Grid item xs={12} className="items-container">
                {incomingPPApprovedRequestsProfiles.map((option, index) => (
                  <PPListItem key={option.i} user={option} />
                ))}
              </Grid>
            )}
          </InfiniteScroll>
        )}
        {privateSelectedIcon == "incomingNotApproved" && finalUsersProfiles && (
          <InfiniteScroll
            className="scroll-m items-scroll"
            dataLength={incomingPPNotApprovedRequestsProfiles.length}
            height={300}
            next={handleScrollIncomingNotApprovedRequests}
            hasMore={!endOfResultIncomingPPNotApprovedRequests}
            loader={<CircularProgress />}
            endMessage={
              <p style={{ textAlign: "center" }}>
                {incomingPPNotApprovedRequestsProfiles.length != 0 && (
                  <b>Yay! You have seen incoming pp not approved requests </b>
                )}
                {incomingPPNotApprovedRequestsProfiles.length === 0 && (
                  <b>Yay! You don't have incoming pp not approved requests </b>
                )}
              </p>
            }
          >
            {incomingPPNotApprovedRequestsProfiles.length != 0 && (
              <Grid item xs={12} className="items-container">
                {incomingPPNotApprovedRequestsProfiles.map((option, index) => (
                  <PPListItem key={option.i} user={option} />
                ))}
              </Grid>
            )}
          </InfiniteScroll>
        )}
      </Grid>
    </>
  );
}
