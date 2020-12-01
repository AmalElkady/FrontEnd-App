import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import CircularProgress from "@material-ui/core/CircularProgress";
import InfiniteScroll from "react-infinite-scroll-component";
import Typography from "@material-ui/core/Typography";
import UserCard from "../components/Cards/UserCard";
import Box from "@material-ui/core/Box";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import IntlMessages from "../util/IntlMessages";
import Router from "next/router";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { mapUserPhotoUrl } from "../helpers/mapUserPhotoUrl";

import {
  allCountriesOffline,
  countryCitiesOffline,
  resetEndRes,
  resetEndResUsers,
  countryRecentActiveUsers,
  countryCityRecentActiveUsers,
  allCountriesOfflineUsers,
  requestPhotoRead
} from "../actions/Home";

const useStyles = makeStyles(theme => ({
  displayF: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  }
}));

export default function UsersOffline() {
  // offline
  const CountriesOptionsOffline = useSelector(
    state => state.home.allCountriesOffline
  );
  const AllCountriesOfflineUsers = useSelector(
    state => state.home.allCountriesOfflineUsers
  );

  const AllCountriesOfflineUsersTimeScore = useSelector(
    state => state.home.allCountriesOfflineUsersTimeScore
  );

  const currentIndexAllCountriesOffline = useSelector(
    state => state.home.currentIndexAllCountriesOffline
  );

  const searchState = useSelector(state => state.home.searchState);
  const showMessage = useSelector(state => state.home.showMessage);
  const loader = useSelector(state => state.home.loader);
  const alertMessage = useSelector(state => state.home.alertMessage);

  const OffsetOfline = useSelector(state => state.home.OffsetOfline);
  const scoreLOffline = useSelector(state => state.home.scoreLOffline);
  const OffsetOflineUsers = useSelector(state => state.home.OffsetOflineUsers);
  const scoreLOfflineUsers = useSelector(
    state => state.home.scoreLOfflineUsers
  );
  const endOfResult = useSelector(state => state.home.endOfResult);
  const endOfResultUsers = useSelector(state => state.home.endOfResultUsers);
  const photoReadSignedRequest = useSelector(
    state => state.home.photoReadSignedRequest
  );

  const dispatch = useDispatch();

  //   useEffect(() => {
  //     console.log(
  //       "CountriesOptionsOffline from UsersOfline Component : ",
  //       CountriesOptionsOffline
  //     );
  //     if (CountriesOptionsOffline != null) {
  //       //   CountriesOptionsOffline.list_of_results.forEach((el, i) => {
  //       //     if (i % 2 == 0) {
  //       //     }
  //       //   });

  //       // Get users of first call
  //       dispatch(
  //         allCountriesOfflineUsers(CountriesOptionsOffline.list_of_results[0], 0)
  //       );
  //     }
  //   }, [CountriesOptionsOffline]);

  const classes = useStyles();
  useEffect(() => {
    if (AllCountriesOfflineUsers.length != 0) {
      console.log(
        "allCountriesOfflineUsers change from users-offline component",
        AllCountriesOfflineUsers
      );
      dispatch(requestPhotoRead());
    }
  }, [AllCountriesOfflineUsers]);

  useEffect(() => {
    if (
      endOfResultUsers &&
      CountriesOptionsOffline.length != 0 &&
      currentIndexAllCountriesOffline <= CountriesOptionsOffline.length - 1
    ) {
      // get users of next option
      console.log("next option countries offline");
      dispatch(
        allCountriesOfflineUsers(
          CountriesOptionsOffline[currentIndexAllCountriesOffline],
          scoreLOfflineUsers,
          OffsetOflineUsers
        )
      );
      dispatch(resetEndResUsers());
    }
  }, [endOfResultUsers]);

  useEffect(() => {
    if (
      CountriesOptionsOffline.length > 1 &&
      currentIndexAllCountriesOffline === CountriesOptionsOffline.length - 1
    ) {
      // Get online users other options
      console.log("currentIndexAllCountriesOffline change");
      dispatch(allCountriesOffline(scoreLOffline, OffsetOfline));
      dispatch(resetEndRes());
    }
  }, [currentIndexAllCountriesOffline]);

  useEffect(() => {
    console.log(
      "photoReadSignedRequest changed from AllCountriesOfflineUsers component : ",
      photoReadSignedRequest
    );
    if (photoReadSignedRequest != null) {
      if (searchState == "most recent") {
        if (AllCountriesOfflineUsers.length != 0) {
          console.log(
            "AllCountriesOfflineUsers :on map ",
            AllCountriesOfflineUsers
          );
          //change usersPhotoUrl
          mapUserPhotoUrl(
            AllCountriesOfflineUsers,
            photoReadSignedRequest.signedRequest
          );
        }
      }
    }
  }, [photoReadSignedRequest]);

  const handleScroll = () => {
    console.log(
      "endOfResult scoreLOfflineUsers OffsetOflineUsers users-offline component ",
      endOfResult,
      currentIndexAllCountriesOffline,
      scoreLOfflineUsers,
      OffsetOflineUsers
    );
    // if (CountriesOptionsOffline.length == 1) {
    //   dispatch(allCountriesOffline(scoreLOffline, OffsetOfline));
    // }
    if (!endOfResultUsers) {
      dispatch(
        allCountriesOfflineUsers(
          CountriesOptionsOffline[currentIndexAllCountriesOffline],
          scoreLOfflineUsers,
          OffsetOflineUsers
        )
      );
    } else if (CountriesOptionsOffline.length == 1) {
      console.log("close end###########");
      dispatch(allCountriesOffline(scoreLOffline, OffsetOfline));
      dispatch(resetEndRes());
    }
  };
  return (
    <>
      {console.log(
        // "allCountriesOfflineUsers from render : ",
        // AllCountriesOfflineUsers,
        // AllCountriesOfflineUsersTimeScore
        // "endOfResult ",
        // endOfResult
        // "searchState",
        // searchState
        // "signedRequest #### ",
        // photoReadSignedRequest?.signedRequest
        "endOfResultUsers ",
        endOfResultUsers
      )}
      {searchState == "most recent" && AllCountriesOfflineUsers.length != 0 && (
        <InfiniteScroll
          dataLength={AllCountriesOfflineUsers.length}
          height={300}
          next={handleScroll}
          hasMore={!endOfResult}
          loader={<CircularProgress />}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen all Users most recent </b>
            </p>
          }
        >
          <div className={classes.displayF}>
            {AllCountriesOfflineUsers.map((option, index) => (
              <UserCard
                key={option.i}
                user={option}
                timeScore={AllCountriesOfflineUsersTimeScore[index]}
              ></UserCard>
            ))}
          </div>
        </InfiniteScroll>
      )}
      {loader && (
        <div className="loader-view">
          <CircularProgress />
        </div>
      )}
      {showMessage && NotificationManager.error(alertMessage)}
      <NotificationContainer />
    </>
  );
}
