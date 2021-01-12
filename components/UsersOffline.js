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
  allCountriesOfflineScroll,
  countryCitiesOffline,
  resetEndRes,
  resetEndResUsers,
  resetEndResUsersOf,
  resetEndResOf,
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
  const CountriesOptionsOfflineScroll = useSelector(
    state => state.home.allCountriesOffline
  );
  const AllCountriesOfflineUsers = useSelector(
    state => state.home.allCountriesOfflineUsers
  );

  const [newUsers, setNewUsers] = useState([]);

  const AllCountriesOfflineUsersTimeScore = useSelector(
    state => state.home.allCountriesOfflineUsersTimeScore
  );

  const currentIndexAllCountriesOffline = useSelector(
    state => state.home.currentIndexAllCountriesOffline
  );

  const scoreLOffline = useSelector(state => state.home.scoreLOffline);
  const OffsetOffline = useSelector(state => state.home.OffsetOffline);

  const OffsetOflineUsers = useSelector(state => state.home.OffsetOflineUsers);
  const scoreLOfflineUsers = useSelector(
    state => state.home.scoreLOfflineUsers
  );
  const endOfResultOf = useSelector(state => state.home.endOfResultOf);
  const endOfResultUsersOf = useSelector(
    state => state.home.endOfResultUsersOf
  );
  const photoReadSignedRequest = useSelector(
    state => state.home.photoReadSignedRequest
  );
  const searchState = useSelector(state => state.home.searchState);
  const showMessage = useSelector(state => state.home.showMessage);
  const loader = useSelector(state => state.home.loader);
  const alertMessage = useSelector(state => state.home.alertMessage);
  const dispatch = useDispatch();

  const classes = useStyles();

  useEffect(() => {
    if (AllCountriesOfflineUsers.length != 0) {
      dispatch(requestPhotoRead());
    }
  }, [AllCountriesOfflineUsers]);

  useEffect(() => {
    if (
      endOfResultUsersOf &&
      CountriesOptionsOfflineScroll.length != 0 &&
      currentIndexAllCountriesOffline <=
        CountriesOptionsOfflineScroll.length - 1
    ) {
      // get users of next option

      dispatch(
        allCountriesOfflineUsers(
          CountriesOptionsOfflineScroll[currentIndexAllCountriesOffline],
          scoreLOfflineUsers,
          OffsetOflineUsers
        )
      );
      dispatch(resetEndResUsersOf());
    }
  }, [endOfResultUsersOf]);

  useEffect(() => {
    if (
      CountriesOptionsOfflineScroll.length > 1 &&
      currentIndexAllCountriesOffline ===
        CountriesOptionsOfflineScroll.length - 1
    ) {
      // Get offline users other options

      dispatch(allCountriesOfflineScroll(scoreLOffline, OffsetOffline));
      dispatch(resetEndResOf());
    }
  }, [currentIndexAllCountriesOffline]);

  useEffect(() => {
    if (photoReadSignedRequest != null) {
      if (searchState == "most recent") {
        if (AllCountriesOfflineUsers.length != 0) {
          //change usersPhotoUrl
          const AllCountriesOfflineUsersNew = mapUserPhotoUrl(
            AllCountriesOfflineUsers,
            photoReadSignedRequest.signedRequest
          );
          setNewUsers(AllCountriesOfflineUsersNew);
        }
      }
    }
  }, [photoReadSignedRequest]);

  const handleScroll = () => {
    if (CountriesOptionsOfflineScroll.length == 1) {
      dispatch(allCountriesOfflineScroll(scoreLOffline, OffsetOffline));
    }
    if (!endOfResultUsersOf) {
      dispatch(
        allCountriesOfflineUsers(
          CountriesOptionsOfflineScroll[currentIndexAllCountriesOffline],
          scoreLOfflineUsers,
          OffsetOflineUsers
        )
      );
    }
  };
  return (
    <>
      {searchState == "most recent" && newUsers.length != 0 && (
        <InfiniteScroll
        className="scroll-m"
          dataLength={newUsers.length}
          height={300}
          next={handleScroll}
          hasMore={!endOfResultOf}
          loader={<CircularProgress />}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen all most recent Users </b>
            </p>
          }
        >
          <div className={classes.displayF}>
            {newUsers.map((option, index) => (
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
