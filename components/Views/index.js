import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import IntlMessages from "../../util/IntlMessages";
import InfiniteScroll from "react-infinite-scroll-component";
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
  const userViewsProfiles = useSelector(state => state.interaction.userViewsProfiles);
  const userViewsDates = useSelector(state => state.interaction.userViewsDates);
  const endUserViews = useSelector(state => state.interaction.endUserViews);
  const startUserViews = useSelector(state => state.interaction.startUserViews);
  const endOfResultUserViews = useSelector(
    state => state.interaction.endOfResultUserViews
  );

  useEffect(() => {
    dispatch(getUserViews(startUserViews, endUserViews));
  }, []);

  useEffect(() => {
    if (userViewsProfiles) {
      console.log("userViewsProfiles ", userViewsProfiles);
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
        {router.pathname == "/home/views" && finalUsersProfiles && (
          <InfiniteScroll
            className="scroll-m items-scroll-2"
            dataLength={userViewsProfiles.length}
            height={300}
            next={handleScrollGetProfileViews}
            hasMore={!endOfResultUserViews}
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
        )}
      </Grid>
    </>
  );
}