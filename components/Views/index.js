import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import IntlMessages from "../../util/IntlMessages";
import InfiniteScroll from "react-infinite-scroll-component";
import Typography from "@material-ui/core/Typography";
import { useRouter } from "next/router";

import { getUserViews } from "../../actions/Interaction";

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
  const userViewsProfiles = useSelector(
    state => state.interaction.userViewsProfiles
  );
  const userViewsDates = useSelector(state => state.interaction.userViewsDates);
  const endUserViews = useSelector(state => state.interaction.OffsetViewsUsers);
  const startUserViews = useSelector(
    state => state.interaction.scoreHViewsUsers
  );

  const endOfResultUserViews = useSelector(
    state => state.interaction.endOfResultUserViews
  );

  useEffect(() => {
    dispatch(getUserViews(startUserViews, endUserViews));
  }, []);

  useEffect(() => {
    if (userViewsProfiles) {
      dispatch(requestPhotoRead());
    }
  }, [userViewsProfiles]);

  useEffect(() => {
    if (photoReadSignedRequest != null) {
      setFinalUsersProfiles(null);
      let finalUserViewsProfiles = [];
      if (router.pathname == "/home/views") {
        if (userViewsProfiles.length != 0) {
          finalUserViewsProfiles = mapSmallUserPhotoUrl(
            userViewsProfiles,
            photoReadSignedRequest.signedRequest
          );
          setFinalUsersProfiles(finalUserViewsProfiles);
        }
      }
    }
  }, [photoReadSignedRequest]);

  // handle scroll for list of profile views
  const handleScrollGetProfileViews = () => {
    if (!endOfResultUserViews) {
      // sent get profile views (next options)
      dispatch(getUserViews(startUserViews, endUserViews));
    }
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} className="page-title-container">
          <Typography variant="h6">
            <IntlMessages id="viewList.viewTitle" />
          </Typography>
        </Grid>
        {router.pathname == "/home/views" && finalUsersProfiles && (
          <InfiniteScroll
            className="scroll-m items-scroll-2"
            dataLength={userViewsProfiles.length}
            height={300}
            next={handleScrollGetProfileViews}
            hasMore={!endOfResultUserViews}
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
                {/* {userViewsProfiles.length != 0 && (
                  <b>Yay! You have seen All profile Views </b>
                )} */}
                {userViewsProfiles.length === 0 && (
                  <Typography variant="h6">
                    <IntlMessages id="view.dontHave" />
                  </Typography>
                )}
              </p>
            }
          >
            {userViewsProfiles.length != 0 && (
              <Grid item xs={12} className="items-container">
                {userViewsProfiles.map((option, index) => (
                  <ListItem
                    key={userViewsDates[index]}
                    user={option}
                    time={userViewsDates[index]}
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
