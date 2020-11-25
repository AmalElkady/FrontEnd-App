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
  const CountryCitiesOptionsOffline = useSelector(
    state => state.home.countryCitiesOffline
  );

  const selectedCountryIndexForUsers = useSelector(
    state => state.home.selectedCountryIndexForUsers
  );

  const countryRecentActiveUsersTimescore = useSelector(
    state => state.home.countryRecentActiveUsersTimescore
  );

  const CountryCityRecentActiveUsers = useSelector(
    state => state.home.countryCityRecentActiveUsers
  );

  const countryCityRecentActiveUsersTimescore = useSelector(
    state => state.home.countryCityRecentActiveUsersTimescore
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
    //dispatch(resetStates());
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
    if (CountryRecentActiveUsers.length != 0) {
      console.log("countryRecentActiveUsers change", CountryRecentActiveUsers);
      dispatch(requestPhotoRead());
    } else {
      //console.log("reset from component cards country recent2 ");
      // dispatch(resetStates());
    }
  }, [CountryRecentActiveUsers]);

  useEffect(() => {
    if (countryCityRecentActiveUsers.length != 0) {
      console.log(
        "countryCityRecentActiveUsers change",
        countryCityRecentActiveUsers
      );
      dispatch(requestPhotoRead());
    } else {
      // console.log("reset from component cards country city recent ");
      // dispatch(resetStates());
    }
  }, [CountryCityRecentActiveUsers]);

  useEffect(() => {
    // console.log("photoReadSignedRequest changed : ", photoReadSignedRequest);
    if (photoReadSignedRequest != null) {
      console.log("faaaaalse ,", searchState);
      if (searchState == "most recent") {
        if (CountryRecentActiveUsers.length != 0) {
          console.log(
            "countryRecentActiveUsers :on map ",
            CountryRecentActiveUsers
          );
          // Users based on Country
          mapUserPhotoUrl(
            CountryRecentActiveUsers,
            photoReadSignedRequest.signedRequest
          );
        } else if (CountryCityRecentActiveUsers.length != 0) {
          console.log(
            "countryCityRecentActiveUsers :on map ",
            CountryCityRecentActiveUsers
          );
          // Users based on Country and city
          mapUserPhotoUrl(
            CountryCityRecentActiveUsers,
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

  const onScrollCountryRecentUsers = () => {
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

  const onScrollCountryCityRecentUsers = () => {
    console.log(
      "endOfResult scoreLOffline OffsetOfline onScrollCountryCityRecentUsers",
      endOfResult,
      scoreLOffline,
      OffsetOfline
    );
    if (!endOfResult) {
      dispatch(
        countryCityRecentActiveUsers(
          CountriesOptionsOffline.list_of_results[selectedCountryIndexForUsers],
          CountryCitiesOptionsOffline.list_of_results[0],
          scoreLOffline,
          "",
          OffsetOfline
        )
      );
    }
  };

  return (
    <>
      {console.log(
        "countryRecentActiveUsers from render : ",
        CountryRecentActiveUsers,
        "countryCityRecentActiveUsers from render : ",
        CountryCityRecentActiveUsers,
        "end ",
        endOfResult
        // "searchState",
        // searchState
        // "signedRequest #### ",
        // photoReadSignedRequest?.signedRequest
      )}
      {/* {searchState == "active" &&
          allCountriesSelectedOnlineUsers?.map((option, index) =>
            index % 2 == 0 ? <UserCard user={option}></UserCard> : ""
          )} */}

      {/* Display Most Recent Users */}
      {searchState == "most recent" &&
        (CountryRecentActiveUsers.length != 0 ? (
          <InfiniteScroll
            dataLength={CountryRecentActiveUsers.length}
            next={onScrollCountryRecentUsers}
            height={500}
            hasMore={!endOfResult}
            loader={<CircularProgress />}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all country users</b>
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
        ) : CountryCityRecentActiveUsers.length != 0 ? (
          <InfiniteScroll
            dataLength={CountryCityRecentActiveUsers.length}
            next={onScrollCountryCityRecentUsers}
            height={250}
            hasMore={!endOfResult}
            loader={<CircularProgress />}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all country and cities users</b>
              </p>
            }
          >
            <div className={classes.displayF}>
              {CountryCityRecentActiveUsers.map((option, index) => (
                <UserCard
                  key={option.i}
                  user={option}
                  timeScore={countryCityRecentActiveUsersTimescore[index]}
                ></UserCard>
              ))}
            </div>
          </InfiniteScroll>
        ) : (
          <UsersOffline />
        ))}
    </>
  );
}
