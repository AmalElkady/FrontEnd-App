import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import CircularProgress from "@material-ui/core/CircularProgress";
import InfiniteScroll from "react-infinite-scroll-component";
import UserCard from "../components/Cards/UserCard";

import { mapUserPhotoUrl } from "../helpers/mapUserPhotoUrl";

import {
  allCountriesSelectedOnline,
  allCountriesSelectedOnlineUsers,
  requestPhotoRead,
  resetEndRes
} from "../actions/Home";

const useStyles = makeStyles(theme => ({
  displayF: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  }
}));

export default function UsersOnline() {
  // online
  const AllCountriesSelectedOnline = useSelector(
    state => state.home.allCountriesSelectedOnline
  );

  const currentIndexAllCountriesSelectedOnline = useSelector(
    state => state.home.currentIndexAllCountriesSelectedOnline
  );
  const AllCountriesSelectedOnlineUsers = useSelector(
    state => state.home.allCountriesSelectedOnlineUsers
  );

  const AllCountriesSelectedOnlineUsersTimeScore = useSelector(
    state => state.home.allCountriesSelectedOnlineUsersTimeScore
  );

  const searchState = useSelector(state => state.home.searchState);
  const showMessage = useSelector(state => state.home.showMessage);
  const loader = useSelector(state => state.home.loader);
  const alertMessage = useSelector(state => state.home.alertMessage);

  const OffsetOnline = useSelector(state => state.home.OffsetOnline);
  const scoreLOnline = useSelector(state => state.home.scoreLOnline);
  const OffsetOnlineUsers = useSelector(state => state.home.OffsetOnlineUsers);
  const scoreLOnlineUsers = useSelector(state => state.home.scoreLOnlineUsers);
  const endOfResult = useSelector(state => state.home.endOfResult);
  const endOfResultUsers = useSelector(state => state.home.endOfResultUsers);
  const photoReadSignedRequest = useSelector(
    state => state.home.photoReadSignedRequest
  );
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (AllCountriesSelectedOnlineUsers.length != 0) {
      dispatch(requestPhotoRead());
    }
  }, [AllCountriesSelectedOnlineUsers]);

  useEffect(() => {
    if (photoReadSignedRequest != null) {
      if (searchState == "active") {
        if (AllCountriesSelectedOnlineUsers.length != 0) {
          //change usersPhotoUrl
          mapUserPhotoUrl(
            AllCountriesSelectedOnlineUsers,
            photoReadSignedRequest.signedRequest
          );
        }
      }
    }
  }, [photoReadSignedRequest]);

  useEffect(() => {
    if (
      endOfResultUsers &&
      currentIndexAllCountriesSelectedOnline !=
        AllCountriesSelectedOnline.length - 1
    ) {
      // get users of next option
      dispatch(
        allCountriesSelectedOnlineUsers(
          AllCountriesSelectedOnline[currentIndexAllCountriesSelectedOnline],
          scoreLOnlineUsers, //SH
          OffsetOnlineUsers //offset
        )
      );
      dispatch(resetEndRes());
    }
  }, [endOfResultUsers]);

  useEffect(() => {
    if (
      currentIndexAllCountriesSelectedOnline ===
      AllCountriesSelectedOnline.length - 1
    ) {
      // Get online users other options
      dispatch(allCountriesSelectedOnline(scoreLOnline, OffsetOnline));
    }
  }, [currentIndexAllCountriesSelectedOnline]);

  const handleScroll = () => {
    if (!endOfResultUsers) {
      dispatch(
        allCountriesSelectedOnlineUsers(
          AllCountriesSelectedOnline[currentIndexAllCountriesSelectedOnline],
          scoreLOnlineUsers, //SH
          OffsetOnlineUsers //offset
        )
      );
    }
  };
  return (
    <>
      {searchState == "active" && AllCountriesSelectedOnlineUsers.length != 0 && (
        <InfiniteScroll
          dataLength={AllCountriesSelectedOnlineUsers.length}
          height={300}
          next={handleScroll}
          hasMore={!endOfResult}
          loader={<CircularProgress />}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen all online Users </b>
            </p>
          }
        >
          <div className={classes.displayF}>
            {AllCountriesSelectedOnlineUsers.map((option, index) => (
              <UserCard
                key={option.i}
                user={option}
                timeScore={AllCountriesSelectedOnlineUsersTimeScore[index]}
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
