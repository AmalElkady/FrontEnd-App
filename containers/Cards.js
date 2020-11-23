import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import InfiniteScroll from "react-infinite-scroll-component";
import Typography from "@material-ui/core/Typography";
import UserCard from "../components/Cards/UserCard";
import UsersOffline from "../components/UsersOffline";
import CircularProgress from "@material-ui/core/CircularProgress";
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
  requestPhotoRead,
  resetStates
} from "../actions/Home";

const useStyles = makeStyles(theme => ({
  displayF: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  }
}));

export default function Cards() {
  // Online
  const allCountriesSelectedOnlineUsers = useSelector(
    state => state.home.allCountriesSelectedOnlineUsers
  );

  // offline
  const CountryRecentActiveUsers = useSelector(
    state => state.home.countryRecentActiveUsers
  );

  const CountriesOptionsOffline = useSelector(
    state => state.home.allCountriesOffline
  );
  // Cities
  // const CountryCitiesOptionsOffline = useSelector(
  //   state => state.home.countryCitiesOffline
  // );

  const selectedCountryIndexForUsers = useSelector(
    state => state.home.selectedCountryIndexForUsers
  );

  const countryRecentActiveUsersTimescore = useSelector(
    state => state.home.countryRecentActiveUsersTimescore
  );

  const countryCityRecentActiveUsers = useSelector(
    state => state.home.countryCityRecentActiveUsers
  );

  ////
  const searchState = useSelector(state => state.home.searchState);

  const OffsetOfline = useSelector(state => state.home.OffsetOfline);
  const scoreLOffline = useSelector(state => state.home.scoreLOffline);
  const endOfResult = useSelector(state => state.home.endOfResult);

  const photoReadSignedRequest = useSelector(
    state => state.home.photoReadSignedRequest
  );
  //const showMessage = useSelector(state => state.auth.showMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("reset from component cards ");
    dispatch(resetStates());
    // dispatch(allCountriesSelectedOnline());
    //dispatch(agerangeAllCountriesSelectedOnline("18-25"));
    //dispatch(countrySelectedOnline("EG"));
    //dispatch(countryCitySelectedOnline("EG", "3"));
    //dispatch(countryCitiesAgerangeSelectedOnline("EG", "18-25"));
    //dispatch(countryCityAgerangeSelectedOnline("EG", "3", "18-25"));
  }, []);
  // useEffect(() => {
  //   // console.log("88888888888888888* :", allCountriesSelectedOnlineUsers.length);
  //   // if (allCountriesSelectedOnlineUsers.length != 0) {
  //   //   console.log("88888888888888888");
  //   //   dispatch(requestPhotoRead());
  //   //   mapUserPhotoUrl(allCountriesSelectedOnlineUsers, photoReadSignedRequest);
  //   // }
  // }, [allCountriesSelectedOnlineUsers]);

  // useEffect(() => {
  //   if (allCountriesOfflineUsers != null) {
  //     console.log("allCountriesOfflineUsers change", allCountriesOfflineUsers);
  //     // dispatch(requestPhotoRead());
  //   }
  // }, [allCountriesOfflineUsers]);

  useEffect(() => {
    if (CountryRecentActiveUsers != null) {
      console.log("countryRecentActiveUsers change", CountryRecentActiveUsers);
      dispatch(requestPhotoRead());
    }
  }, [CountryRecentActiveUsers]);

  useEffect(() => {
    if (countryCityRecentActiveUsers != null) {
      console.log(
        "countryCityRecentActiveUsers change",
        countryCityRecentActiveUsers
      );
      dispatch(requestPhotoRead());
    }
  }, [countryCityRecentActiveUsers]);

  useEffect(() => {
    // console.log("photoReadSignedRequest changed : ", photoReadSignedRequest);
    if (photoReadSignedRequest != null) {
      if (searchState == "most recent") {
        if (CountryRecentActiveUsers != null) {
          console.log(
            "countryRecentActiveUsers :on map ",
            CountryRecentActiveUsers
          );
          // Users based on Country
          mapUserPhotoUrl(
            CountryRecentActiveUsers,
            photoReadSignedRequest.signedRequest
          );
        } else if (countryCityRecentActiveUsers != null) {
          console.log(
            "countryCityRecentActiveUsers :on map ",
            countryCityRecentActiveUsers
          );
          // Users based on Country and city
          mapUserPhotoUrl(
            countryCityRecentActiveUsers.users,
            photoReadSignedRequest.signedRequest
          );
        }
      } else if (
        searchState == "active" &&
        allCountriesSelectedOnlineUsers != null
      ) {
        console.log(
          "allCountriesSelectedOnlineUsers :on map ",
          countryRecentActiveUsers
        );
        mapUserPhotoUrl(
          allCountriesSelectedOnlineUsers,
          photoReadSignedRequest.signedRequest
        );
      }
    }
  }, [photoReadSignedRequest]);

  const classes = useStyles();

  const onSearchScroll = () => {
    console.log(
      "endOfResult scoreLOffline OffsetOfline scroll onsearch",
      endOfResult,
      scoreLOffline,
      OffsetOfline
    );
    if (!endOfResult) {
      dispatch(
        countryRecentActiveUsers(
          CountriesOptionsOffline.list_of_results[selectedCountryIndexForUsers],
          scoreLOffline,
          "",
          OffsetOfline
        )
      );
    }
  };

  return (
    <>
      {/* {console.log(
        "countryRecentActiveUsers from render : ",
        CountryRecentActiveUsers
        // "countryCityRecentActiveUsers from render : ",
        // countryCityRecentActiveUsers,
        // "searchState",
        // searchState
        // "signedRequest #### ",
        // photoReadSignedRequest?.signedRequest
      )} */}
      {/* {searchState == "active" &&
          allCountriesSelectedOnlineUsers?.map((option, index) =>
            index % 2 == 0 ? <UserCard user={option}></UserCard> : ""
          )} */}

      {/* Display Most Recent Users */}
      {searchState == "most recent" &&
        (CountryRecentActiveUsers.length != 0 ? (
          <InfiniteScroll
            dataLength={CountryRecentActiveUsers.length}
            next={onSearchScroll}
            height={500}
            hasMore={!endOfResult}
            loader={<CircularProgress />}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <div className={classes.displayF}>
              {CountryRecentActiveUsers.map((option, index) => (
                <UserCard
                  key={option.i}
                  user={option}
                  timeScore={countryRecentActiveUsersTimescore[index]}
                ></UserCard>
              ))}
            </div>
          </InfiniteScroll>
        ) : countryCityRecentActiveUsers != null ? (
          countryCityRecentActiveUsers?.users.map((option, index) =>
            index % 2 == 0 ? (
              <UserCard
                key={option.i}
                user={option}
                country={countryCityRecentActiveUsers.country}
                timeScore={countryCityRecentActiveUsers.users[index + 1]}
              ></UserCard>
            ) : (
              ""
            )
          )
        ) : (
          <UsersOffline />
        ))}
    </>
  );
}
