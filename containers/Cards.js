import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import InfiniteScroll from "react-infinite-scroll-component";
import Typography from "@material-ui/core/Typography";
import UserCard from "../components/Cards/UserCard";
import UsersOffline from "../components/UsersOffline";
import UsersOnline from "../components/UsersOnline";
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
  allCountriesSelectedOnlineUsers,
  selectedOnlineUsers,
  agerangeAllCountriesSelectedOnline,
  countrySelectedOnline,
  countryCitySelectedOnline,
  countryCitiesAgerangeSelectedOnline,
  countryCityAgerangeSelectedOnline,
  allCountriesOfflineScroll,
  allCountriesOfflineUsers,
  countryRecentActiveUsers,
  countryCityRecentActiveUsers,
  requestPhotoRead,
  resetEndResUsers,
  resetEndRes,
  resetStates
} from "../actions/Home";
import { ARRAY_OF_AGE_RANGE } from "../util/data";

const useStyles = makeStyles(theme => ({
  displayF: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  }
}));

export default function Cards() {
  // Online
  // countries
  const CountriesOptionsOnline = useSelector(
    state => state.home.allCountriesOnline
  );

  const AgerangeCountriesOptionsOnline = useSelector(
    state => state.home.agerangeCountriesOnline
  );

  //cities
  const CountryCitiesOptionsOnline = useSelector(
    state => state.home.countryCitiesOnline
  );
  const CountryCitiesAgerangeOptionsOnline = useSelector(
    state => state.home.countryCitiesAgerangeOnline
  );
  //agerange
  const CountryAgerangesOptionsOnline = useSelector(
    state => state.home.countryAgerangesOnline
  );

  const CountryCityAgerangesOptionsOnline = useSelector(
    state => state.home.countryCityAgerangesOnline
  );

  ///users
  const AllCountriesSelectedOnline = useSelector(
    state => state.home.allCountriesSelectedOnline
  );

  const currentIndexAllCountriesSelectedOnline = useSelector(
    state => state.home.currentIndexAllCountriesSelectedOnline
  );
  const SelectedOnlineUsers = useSelector(
    state => state.home.selectedOnlineUsers
  );
  const selectedOnlineUsersTimeScore = useSelector(
    state => state.home.selectedOnlineUsersTimeScore
  );
  const currentIndexSelectedOnline = useSelector(
    state => state.home.currentIndexSelectedOnline
  );

  const AgerangeAllCountriesSelectedOnline = useSelector(
    state => state.home.agerangeAllCountriesSelectedOnline
  );

  const CountrySelectedOnline = useSelector(
    state => state.home.countrySelectedOnline
  );

  const CountryCitySelectedOnline = useSelector(
    state => state.home.countryCitySelectedOnline
  );

  const CountryCitiesAgerangeSelectedOnline = useSelector(
    state => state.home.countryCitiesAgerangeSelectedOnline
  );

  const CountryCityAgerangeSelectedOnline = useSelector(
    state => state.home.countryCityAgerangeSelectedOnline
  );

  // offline

  //all
  const CountriesOptionsOffline = useSelector(
    state => state.home.allCountriesOffline
  );
  // const AllCountriesOfflineUsers = useSelector(
  //   state => state.home.allCountriesOfflineUsers
  // );

  // const currentIndexAllCountriesOffline = useSelector(
  //   state => state.home.currentIndexAllCountriesOffline
  // );

  // search-country
  const CountryRecentActiveUsers = useSelector(
    state => state.home.countryRecentActiveUsers
  );

  const countryRecentActiveUsersTimescore = useSelector(
    state => state.home.countryRecentActiveUsersTimescore
  );

  // search-country-city
  const CountryCityRecentActiveUsers = useSelector(
    state => state.home.countryCityRecentActiveUsers
  );

  const countryCityRecentActiveUsersTimescore = useSelector(
    state => state.home.countryCityRecentActiveUsersTimescore
  );
  // Cities
  const CountryCitiesOptionsOffline = useSelector(
    state => state.home.countryCitiesOffline
  );

  ////
  const searchState = useSelector(state => state.home.searchState);
  const OffsetOnline = useSelector(state => state.home.OffsetOnline);
  const scoreLOnline = useSelector(state => state.home.scoreLOnline);
  const OffsetOnlineUsers = useSelector(state => state.home.OffsetOnlineUsers);
  const scoreLOnlineUsers = useSelector(state => state.home.scoreLOnlineUsers);
  const selectedAgerangeIndex = useSelector(
    state => state.home.ageRangeSelectedIndex
  );
  const countrySelectedIndex = useSelector(
    state => state.home.countrySelectedIndex
  );
  const citySelectedIndex = useSelector(state => state.home.citySelectedIndex);

  //All offline
  const OffsetOfline = useSelector(state => state.home.OffsetOfline);
  const scoreLOffline = useSelector(state => state.home.scoreLOffline);
  const endOfResult = useSelector(state => state.home.endOfResult);
  const endOfResultUsers = useSelector(state => state.home.endOfResultUsers);
  // search offline
  const OffsetOflineUsersS = useSelector(
    state => state.home.OffsetOflineUsersS
  );
  const scoreHOfflineUsersS = useSelector(
    state => state.home.scoreHOfflineUsersS
  );
  const endOfResultUsersOfS = useSelector(
    state => state.home.endOfResultUsersOfS
  );

  const ageScoreL = useSelector(state => state.home.ageScoreL);

  const photoReadSignedRequest = useSelector(
    state => state.home.photoReadSignedRequest
  );
  //const showMessage = useSelector(state => state.auth.showMessage);
  const dispatch = useDispatch();

  // online
  useEffect(() => {
    if (AllCountriesSelectedOnline.length != 0) {
      // Get users of AllCountriesSelectedOnline (first time)
      dispatch(
        allCountriesSelectedOnlineUsers(
          AllCountriesSelectedOnline[currentIndexAllCountriesSelectedOnline],
          scoreLOnlineUsers, //SH
          OffsetOnlineUsers //offset
        )
      );
    }
  }, [AllCountriesSelectedOnline]);

  useEffect(() => {
    if (
      AgerangeAllCountriesSelectedOnline.length != 0 &&
      SelectedOnlineUsers.length == 0
    ) {
      // Get users of agerangeAllCountriesSelectedOnlineUsers (first time)
      dispatch(
        selectedOnlineUsers(
          AgerangeAllCountriesSelectedOnline[currentIndexSelectedOnline],
          "", //SH
          0 //offset
        )
      );
    }
  }, [AgerangeAllCountriesSelectedOnline]);

  useEffect(() => {
    if (CountrySelectedOnline.length != 0 && SelectedOnlineUsers.length == 0) {
      // Get users of agerangeAllCountriesSelectedOnlineUsers (first time)

      dispatch(
        selectedOnlineUsers(
          CountrySelectedOnline[currentIndexSelectedOnline],
          "", //SH
          0 //offset
        )
      );
    }
  }, [CountrySelectedOnline]);

  useEffect(() => {
    if (
      CountryCitySelectedOnline.length != 0 &&
      SelectedOnlineUsers.length == 0
    ) {
      // Get users of agerangeAllCountriesSelectedOnlineUsers (first time)

      dispatch(
        selectedOnlineUsers(
          CountryCitySelectedOnline[currentIndexSelectedOnline],
          "", //SH
          0 //offset
        )
      );
    }
  }, [CountryCitySelectedOnline]);

  useEffect(() => {
    if (
      CountryCitiesAgerangeSelectedOnline.length != 0 &&
      SelectedOnlineUsers.length == 0
    ) {
      // Get users of CountryCitiesAgerangeSelectedOnline (first time)

      dispatch(
        selectedOnlineUsers(
          CountryCitiesAgerangeSelectedOnline[currentIndexSelectedOnline],
          "", //SH
          0 //offset
        )
      );
    }
  }, [CountryCitiesAgerangeSelectedOnline]);

  useEffect(() => {
    if (
      CountryCityAgerangeSelectedOnline.length != 0 &&
      SelectedOnlineUsers.length == 0
    ) {
      // Get users of CountryCityAgerangeSelectedOnline (first time)

      dispatch(
        selectedOnlineUsers(
          CountryCityAgerangeSelectedOnline[currentIndexSelectedOnline],
          "", //SH
          0 //offset
        )
      );
    }
  }, [CountryCityAgerangeSelectedOnline]);

  useEffect(() => {
    if (SelectedOnlineUsers.length != 0) {
      dispatch(requestPhotoRead());
    }
  }, [SelectedOnlineUsers]);

  ///offline
  useEffect(() => {
    if (CountryRecentActiveUsers.length != 0) {
      dispatch(requestPhotoRead());
    }
  }, [CountryRecentActiveUsers]);

  useEffect(() => {
    if (CountryCityRecentActiveUsers.length != 0) {
      dispatch(requestPhotoRead());
    }
  }, [CountryCityRecentActiveUsers]);

  ///

  useEffect(() => {
    if (photoReadSignedRequest != null) {
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
      } else if (searchState == "active") {
        if (SelectedOnlineUsers.length != 0) {
          if (
            AgerangeAllCountriesSelectedOnline.length != 0 ||
            CountrySelectedOnline.length != 0 ||
            CountryCitySelectedOnline.length != 0 ||
            CountryCitiesAgerangeSelectedOnline.length != 0 ||
            CountryCityAgerangeSelectedOnline.length != 0
          )
            mapUserPhotoUrl(
              SelectedOnlineUsers,
              photoReadSignedRequest.signedRequest
            );
        }
      }
    }
  }, [photoReadSignedRequest]);

  const classes = useStyles();

  useEffect(() => {
    if (endOfResultUsers && currentIndexSelectedOnline != 0) {
      if (
        AgerangeAllCountriesSelectedOnline.length != 0 &&
        currentIndexSelectedOnline <=
          AgerangeAllCountriesSelectedOnline.length - 1
      ) {
        // get users of next option
        dispatch(
          selectedOnlineUsers(
            AgerangeAllCountriesSelectedOnline[currentIndexSelectedOnline],
            scoreLOnlineUsers, //SH
            OffsetOnlineUsers //offset
          )
        );
      } else if (
        CountrySelectedOnline.length != 0 &&
        currentIndexSelectedOnline <= CountrySelectedOnline.length - 1
      ) {
        dispatch(
          selectedOnlineUsers(
            CountrySelectedOnline[currentIndexSelectedOnline],
            scoreLOnlineUsers, //SH
            OffsetOnlineUsers //offset
          )
        );
      } else if (
        CountryCitySelectedOnline.length != 0 &&
        currentIndexSelectedOnline <= CountryCitySelectedOnline.length - 1
      ) {
        dispatch(
          selectedOnlineUsers(
            CountryCitySelectedOnline[currentIndexSelectedOnline],
            scoreLOnlineUsers, //SH
            OffsetOnlineUsers //offset
          )
        );
      } else if (
        CountryCitiesAgerangeSelectedOnline.length != 0 &&
        currentIndexSelectedOnline <=
          CountryCitiesAgerangeSelectedOnline.length - 1
      ) {
        dispatch(
          selectedOnlineUsers(
            CountryCitiesAgerangeSelectedOnline[currentIndexSelectedOnline],
            scoreLOnlineUsers, //SH
            OffsetOnlineUsers //offset
          )
        );
      } else if (
        CountryCityAgerangeSelectedOnline.length != 0 &&
        currentIndexSelectedOnline <=
          CountryCityAgerangeSelectedOnline.length - 1
      ) {
        dispatch(
          selectedOnlineUsers(
            CountryCityAgerangeSelectedOnline[currentIndexSelectedOnline],
            scoreLOnlineUsers, //SH
            OffsetOnlineUsers //offset
          )
        );
      }
      dispatch(resetEndResUsers());
    }
  }, [endOfResultUsers]);

  useEffect(() => {
    if (
      currentIndexSelectedOnline ===
      AgerangeAllCountriesSelectedOnline.length - 1
    ) {
      // Get online users other options
      dispatch(
        agerangeAllCountriesSelectedOnline(
          ARRAY_OF_AGE_RANGE[selectedAgerangeIndex].replace(/\s/g, ""),
          scoreLOnline,
          OffsetOnline
        )
      );
      dispatch(resetEndRes());
    } else if (
      currentIndexSelectedOnline ===
      CountrySelectedOnline.length - 1
    ) {
      // Get online users other options

      dispatch(
        countrySelectedOnline(
          CountriesOptionsOnline[countrySelectedIndex],
          scoreLOnline,
          OffsetOnline
        )
      );
      dispatch(resetEndRes());
    } else if (
      currentIndexSelectedOnline ===
      CountryCitySelectedOnline.length - 1
    ) {
      // Get online users other options
      dispatch(
        countryCitySelectedOnline(
          CountriesOptionsOnline[countrySelectedIndex],
          CountryCitiesOptionsOnline[citySelectedIndex],
          scoreLOnline,
          OffsetOnline
        )
      );
      dispatch(resetEndRes());
    } else if (
      currentIndexSelectedOnline ===
      CountryCitiesAgerangeSelectedOnline.length - 1
    ) {
      // Get online users other options
      if (
        CountryAgerangesOptionsOnline.length != 0 &&
        AgerangeCountriesOptionsOnline.length == 0
      ) {
        dispatch(
          countryCitiesAgerangeSelectedOnline(
            CountriesOptionsOnline[countrySelectedIndex],
            CountryAgerangesOptionsOnline[selectedAgerangeIndex],
            scoreLOnline,
            OffsetOnline
          )
        );
      } else {
        dispatch(
          countryCitiesAgerangeSelectedOnline(
            AgerangeCountriesOptionsOnline[countrySelectedIndex],
            ARRAY_OF_AGE_RANGE[selectedAgerangeIndex].replace(/\s/g, ""),
            scoreLOnline,
            OffsetOnline
          )
        );
      }

      dispatch(resetEndRes());
    } else if (
      currentIndexSelectedOnline ===
      CountryCityAgerangeSelectedOnline.length - 1
    ) {
      // Get online users other options
      if (
        CountryAgerangesOptionsOnline.length != 0 &&
        AgerangeCountriesOptionsOnline.length == 0
      ) {
        dispatch(
          countryCityAgerangeSelectedOnline(
            CountriesOptionsOnline[countrySelectedIndex],
            CountryCitiesOptionsOnline[citySelectedIndex],
            CountryAgerangesOptionsOnline[selectedAgerangeIndex],
            scoreLOnline,
            OffsetOnline
          )
        );
      } else {
        dispatch(
          countryCityAgerangeSelectedOnline(
            AgerangeCountriesOptionsOnline[countrySelectedIndex],
            CountryCitiesAgerangeOptionsOnline[citySelectedIndex],
            ARRAY_OF_AGE_RANGE[selectedAgerangeIndex].replace(/\s/g, ""),
            scoreLOnline,
            OffsetOnline
          )
        );
      }

      dispatch(resetEndRes());
    }
  }, [currentIndexSelectedOnline]);

  // offline
  const onScrollCountryRecentUsers = () => {
    console.log(
      "endOfResultUsersOfS OffsetOfline scroll onsearch",
      endOfResultUsersOfS,
      scoreHOfflineUsersS,
      OffsetOflineUsersS,
      countrySelectedIndex,
      ageScoreL,
      CountriesOptionsOffline[countrySelectedIndex]
    );
    if (!endOfResultUsersOfS) {
      dispatch(
        countryRecentActiveUsers(
          CountriesOptionsOffline[countrySelectedIndex],
          ageScoreL,
          scoreHOfflineUsersS,
          OffsetOflineUsersS
        )
      );
    }
  };

  const onScrollCountryCityRecentUsers = () => {
    console.log(
      "endOfResultUsersOfS OffsetOfline scroll onsearch",
      endOfResultUsersOfS,
      scoreHOfflineUsersS,
      OffsetOflineUsersS
    );
    if (!endOfResultUsersOfS) {
      dispatch(
        countryCityRecentActiveUsers(
          CountriesOptionsOffline[countrySelectedIndex],
          CountryCitiesOptionsOffline[citySelectedIndex],
          scoreHOfflineUsersS,
          ageScoreL,
          OffsetOflineUsersS
        )
      );
    }
  };
  ////
  //online
  const handleScrollAgerange = () => {
    if (AgerangeAllCountriesSelectedOnline.length == 1) {
      dispatch(
        agerangeAllCountriesSelectedOnline(
          ARRAY_OF_AGE_RANGE[selectedAgerangeIndex].replace(/\s/g, ""),
          scoreLOnline,
          OffsetOnline
        )
      );
    } else if (!endOfResultUsers) {
      dispatch(
        selectedOnlineUsers(
          AgerangeAllCountriesSelectedOnline[currentIndexSelectedOnline],
          scoreLOnlineUsers, //SH
          OffsetOnlineUsers //offset
        )
      );
    }
  };

  const handleScrollCountry = () => {
    if (CountrySelectedOnline.length == 1) {
      dispatch(
        countrySelectedOnline(
          CountriesOptionsOnline[countrySelectedIndex],
          scoreLOnline,
          OffsetOnline
        )
      );
    } else if (!endOfResultUsers) {
      dispatch(
        selectedOnlineUsers(
          CountrySelectedOnline[currentIndexSelectedOnline],
          scoreLOnlineUsers, //SH
          OffsetOnlineUsers //offset
        )
      );
    }
  };

  const handleScrollCountryCity = () => {
    if (CountryCitySelectedOnline.length == 1) {
      dispatch(
        countryCitySelectedOnline(
          CountriesOptionsOnline[countrySelectedIndex],
          CountryCitiesOptionsOnline[citySelectedIndex],
          scoreLOnline,
          OffsetOnline
        )
      );
    } else if (!endOfResultUsers) {
      dispatch(
        selectedOnlineUsers(
          CountryCitySelectedOnline[currentIndexSelectedOnline],
          scoreLOnlineUsers, //SH
          OffsetOnlineUsers //offset
        )
      );
    }
  };

  const handleScrollCountryAgerange = () => {
    if (CountryCitiesAgerangeSelectedOnline.length == 1) {
      if (
        CountryAgerangesOptionsOnline.length != 0 &&
        AgerangeCountriesOptionsOnline.length == 0
      ) {
        dispatch(
          countryCitiesAgerangeSelectedOnline(
            CountriesOptionsOnline[countrySelectedIndex],
            CountryAgerangesOptionsOnline[selectedAgerangeIndex],
            scoreLOnline,
            OffsetOnline
          )
        );
      } else {
        dispatch(
          countryCitiesAgerangeSelectedOnline(
            AgerangeCountriesOptionsOnline[countrySelectedIndex],
            ARRAY_OF_AGE_RANGE[selectedAgerangeIndex].replace(/\s/g, ""),
            scoreLOnline,
            OffsetOnline
          )
        );
      }
    } else if (!endOfResultUsers) {
      dispatch(
        selectedOnlineUsers(
          CountryCitiesAgerangeSelectedOnline[currentIndexSelectedOnline],
          scoreLOnlineUsers, //SH
          OffsetOnlineUsers //offset
        )
      );
    }
  };

  const handleScrollCountryCityAgerange = () => {
    if (CountryCityAgerangeSelectedOnline.length == 1) {
      if (
        CountryAgerangesOptionsOnline.length != 0 &&
        AgerangeCountriesOptionsOnline.length == 0
      ) {
        dispatch(
          countryCityAgerangeSelectedOnline(
            CountriesOptionsOnline[countrySelectedIndex],
            CountryCitiesOptionsOnline[citySelectedIndex],
            CountryAgerangesOptionsOnline[selectedAgerangeIndex],
            scoreLOnline,
            OffsetOnline
          )
        );
      } else {
        dispatch(
          countryCityAgerangeSelectedOnline(
            AgerangeCountriesOptionsOnline[countrySelectedIndex],
            CountryCitiesAgerangeOptionsOnline[citySelectedIndex],
            ARRAY_OF_AGE_RANGE[selectedAgerangeIndex].replace(/\s/g, ""),
            scoreLOnline,
            OffsetOnline
          )
        );
      }
    } else if (!endOfResultUsers) {
      dispatch(
        selectedOnlineUsers(
          CountryCityAgerangeSelectedOnline[currentIndexSelectedOnline],
          scoreLOnlineUsers, //SH
          OffsetOnlineUsers //offset
        )
      );
    }
  };

  return (
    <>
      {/* {console.log(
        // "countryRecentActiveUsers from render : ",
        // CountryRecentActiveUsers,
        // "countryCityRecentActiveUsers from render : ",
        // CountryCityRecentActiveUsers,
        // "end ",
        // endOfResult
        // "searchState",
        // searchState
        // "signedRequest #### ",
        // photoReadSignedRequest?.signedRequest
        // "AllCountriesSelectedOnline :",
        // AllCountriesSelectedOnline
        "endOfResult from render ",
        endOfResult,
        scoreLOnline,
        OffsetOnline,
        currentIndexSelectedOnline,
        CountrySelectedOnline
      )} */}

      {/* Display Online Users */}
      {searchState == "active" &&
      // Display online users searched by agerange
      AgerangeAllCountriesSelectedOnline.length != 0 ? (
        SelectedOnlineUsers.length != 0 ? (
          <InfiniteScroll
            dataLength={SelectedOnlineUsers.length}
            next={handleScrollAgerange}
            height={250}
            hasMore={!endOfResult}
            loader={<CircularProgress />}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it agerange all countries users</b>
              </p>
            }
          >
            <div className={classes.displayF}>
              {SelectedOnlineUsers.map((option, index) => (
                <UserCard
                  key={option.i}
                  user={option}
                  timeScore={selectedOnlineUsersTimeScore[index]}
                ></UserCard>
              ))}
            </div>
          </InfiniteScroll>
        ) : (
          ""
        )
      ) : // Display online users searched by country
      CountrySelectedOnline.length != 0 ? (
        SelectedOnlineUsers.length != 0 ? (
          <InfiniteScroll
            dataLength={SelectedOnlineUsers.length}
            next={handleScrollCountry}
            height={250}
            hasMore={!endOfResult}
            loader={<CircularProgress />}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen country selected users</b>
              </p>
            }
          >
            <div className={classes.displayF}>
              {SelectedOnlineUsers.map((option, index) => (
                <UserCard
                  key={option.i}
                  user={option}
                  timeScore={selectedOnlineUsersTimeScore[index]}
                ></UserCard>
              ))}
            </div>
          </InfiniteScroll>
        ) : (
          ""
        )
      ) : // Display online users searched by country and city
      CountryCitySelectedOnline.length != 0 ? (
        SelectedOnlineUsers.length != 0 ? (
          <InfiniteScroll
            dataLength={SelectedOnlineUsers.length}
            next={handleScrollCountryCity}
            height={250}
            hasMore={!endOfResult}
            loader={<CircularProgress />}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen country city selected users</b>
              </p>
            }
          >
            <div className={classes.displayF}>
              {SelectedOnlineUsers.map((option, index) => (
                <UserCard
                  key={option.i}
                  user={option}
                  timeScore={selectedOnlineUsersTimeScore[index]}
                ></UserCard>
              ))}
            </div>
          </InfiniteScroll>
        ) : (
          ""
        )
      ) : // Display online users searched by country and agerange only
      CountryCitiesAgerangeSelectedOnline.length != 0 ? (
        SelectedOnlineUsers.length != 0 ? (
          <InfiniteScroll
            dataLength={SelectedOnlineUsers.length}
            next={handleScrollCountryAgerange}
            height={250}
            hasMore={!endOfResult}
            loader={<CircularProgress />}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen country cities agerange selected users</b>
              </p>
            }
          >
            <div className={classes.displayF}>
              {SelectedOnlineUsers.map((option, index) => (
                <UserCard
                  key={option.i}
                  user={option}
                  timeScore={selectedOnlineUsersTimeScore[index]}
                ></UserCard>
              ))}
            </div>
          </InfiniteScroll>
        ) : (
          ""
        )
      ) : // Display online users searched by country and city and agerange
      CountryCityAgerangeSelectedOnline.length != 0 ? (
        SelectedOnlineUsers.length != 0 ? (
          <InfiniteScroll
            dataLength={SelectedOnlineUsers.length}
            next={handleScrollCountryCityAgerange}
            height={250}
            hasMore={!endOfResult}
            loader={<CircularProgress />}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen country city agerange selected users</b>
              </p>
            }
          >
            <div className={classes.displayF}>
              {SelectedOnlineUsers.map((option, index) => (
                <UserCard
                  key={option.i}
                  user={option}
                  timeScore={selectedOnlineUsersTimeScore[index]}
                ></UserCard>
              ))}
            </div>
          </InfiniteScroll>
        ) : (
          ""
        )
      ) : AllCountriesSelectedOnline.length != 0 ? (
        <UsersOnline />
      ) : (
        ""
      )}
      {/* Display Most Recent Users */}
      {searchState == "most recent" &&
        (CountryRecentActiveUsers.length != 0 ? (
          <InfiniteScroll
            dataLength={CountryRecentActiveUsers.length}
            next={onScrollCountryRecentUsers}
            height={500}
            hasMore={!endOfResultUsersOfS}
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
            hasMore={!endOfResultUsersOfS}
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
