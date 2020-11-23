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
  allCountriesSelectedOnline,
  agerangeAllCountriesSelectedOnline,
  countrySelectedOnline,
  countryCitySelectedOnline,
  countryCitiesAgerangeSelectedOnline,
  countryCityAgerangeSelectedOnline,
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

  const searchState = useSelector(state => state.home.searchState);
  const showMessage = useSelector(state => state.home.showMessage);
  const loader = useSelector(state => state.home.loader);
  const alertMessage = useSelector(state => state.home.alertMessage);

  const OffsetOfline = useSelector(state => state.home.OffsetOfline);
  const scoreLOffline = useSelector(state => state.home.scoreLOffline);
  const endOfResult = useSelector(state => state.home.endOfResult);
  const photoReadSignedRequest = useSelector(
    state => state.home.photoReadSignedRequest
  );
  const selectedCountryIndexForUsers = useSelector(
    state => state.home.selectedCountryIndexForUsers
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
    if (AllCountriesOfflineUsers != []) {
      console.log(
        "allCountriesOfflineUsers change from users-offline component",
        AllCountriesOfflineUsers
      );
      dispatch(requestPhotoRead());
    }
  }, [AllCountriesOfflineUsers]);

  useEffect(() => {
    console.log(
      "photoReadSignedRequest changed from AllCountriesOfflineUsers component : ",
      photoReadSignedRequest
    );
    if (photoReadSignedRequest != null) {
      if (searchState == "most recent") {
        if (AllCountriesOfflineUsers != []) {
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
      "endOfResult selectedCountryIndexForUsers scoreLOffline OffsetOfline users-offline component ",
      endOfResult,
      selectedCountryIndexForUsers,
      scoreLOffline,
      OffsetOfline
    );
    if (!endOfResult) {
      dispatch(
        allCountriesOfflineUsers(
          CountriesOptionsOffline.list_of_results[selectedCountryIndexForUsers],
          scoreLOffline,
          OffsetOfline
        )
      );
    }
  };
  return (
    <>
      {/* {console.log(
        "allCountriesOfflineUsers from render : ",
        AllCountriesOfflineUsers,
        AllCountriesOfflineUsersTimeScore
        // "searchState",
        // searchState
        // "signedRequest #### ",
        // photoReadSignedRequest?.signedRequest
      )} */}
      {searchState == "most recent" && AllCountriesOfflineUsers != [] && (
        <InfiniteScroll
          dataLength={AllCountriesOfflineUsers.length}
          height={500}
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
