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

import csc from "country-state-city";
import { Country, State, City } from "country-state-city";

import { mapUserPhotoUrl } from "../helpers/mapUserPhotoUrl";

import {
  allCountriesSelectedOnline,
  allCountriesSelectedOnlineUsers,
  requestPhotoRead,
  resetEndRes,
  resetEndResUsers
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

  const [newUsers, setNewUsers] = useState([]);
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
    // let isocon = "SN";
    // console.log("test get country states  ", State.getStatesOfCountry(isocon));
    // for (
    //   let index = 0;
    //   index < State.getStatesOfCountry(isocon).length;
    //   index++
    // ) {
    //   console.log(
    //     `"${isocon}.${index + 1}":"${
    //       State.getStatesOfCountry(isocon)[index].name
    //     }",`
    //   );
    // }
    // console.log("test get country cities  ", City.getCitiesOfCountry(isocon));
    // for (
    //   let index = 0;
    //   index < City.getCitiesOfCountry(isocon).length;
    //   index++
    // ) {
    //   console.log(
    //     `"${isocon}.${index + 1}":"${
    //       City.getCitiesOfCountry(isocon)[index].name
    //     }",`
    //   );
    // }
  }, []);

  useEffect(() => {
    if (
      AllCountriesSelectedOnlineUsers &&
      AllCountriesSelectedOnlineUsers.length != 0
    ) {
      console.log(
        "allCountriesSelectedOnlineUsers from online users first call ",
        scoreLOnline,
        OffsetOnline,
        AllCountriesSelectedOnlineUsers
      );
      dispatch(requestPhotoRead());
    }
  }, [AllCountriesSelectedOnlineUsers]);

  useEffect(() => {
    if (photoReadSignedRequest != null) {
      if (searchState == "active") {
        if (
          AllCountriesSelectedOnlineUsers &&
          AllCountriesSelectedOnlineUsers.length != 0
        ) {
          const AllCountriesOnlineUsersNew = mapUserPhotoUrl(
            AllCountriesSelectedOnlineUsers,
            photoReadSignedRequest.signedRequest
          );
          setNewUsers([]);
          setNewUsers(AllCountriesOnlineUsersNew);
        }
      }
    }
  }, [photoReadSignedRequest]);

  useEffect(() => {
    // console.log(
    //   "get users of next option from online users ",
    //   endOfResultUsers,
    //   AllCountriesSelectedOnline,
    //   currentIndexAllCountriesSelectedOnline,
    //   scoreLOnlineUsers,
    //   OffsetOnlineUsers
    // );
    if (
      endOfResultUsers &&
      AllCountriesSelectedOnline &&
      AllCountriesSelectedOnline.length != 0 &&
      (currentIndexAllCountriesSelectedOnline <=
        AllCountriesSelectedOnline.length - 1 ||
        currentIndexAllCountriesSelectedOnline <=
          AllCountriesSelectedOnline.length)
    ) {
      // get users of next option

      console.log(
        "get users of next option from online users first call ",
        endOfResultUsers,
        AllCountriesSelectedOnline,
        currentIndexAllCountriesSelectedOnline
      );

      dispatch(
        allCountriesSelectedOnlineUsers(
          AllCountriesSelectedOnline[currentIndexAllCountriesSelectedOnline],
          scoreLOnlineUsers, //SH
          OffsetOnlineUsers //offset
        )
      );
      dispatch(resetEndResUsers());
    }
  }, [endOfResultUsers]);

  useEffect(() => {
    if (
      AllCountriesSelectedOnline &&
      AllCountriesSelectedOnline.length > 1 &&
      currentIndexAllCountriesSelectedOnline ===
        AllCountriesSelectedOnline.length - 1
    ) {
      // Get online users other options
      console.log(
        "allCountriesSelectedOnline &&&&&&&&&",
        currentIndexAllCountriesSelectedOnline,
        scoreLOnline,
        OffsetOnline
      );
      dispatch(allCountriesSelectedOnline(scoreLOnline, OffsetOnline));
      dispatch(resetEndRes());
    }
  }, [currentIndexAllCountriesSelectedOnline]);

  const handleScroll = () => {
    if (AllCountriesSelectedOnline && AllCountriesSelectedOnline.length == 1) {
      dispatch(allCountriesSelectedOnline(scoreLOnline, OffsetOnline));
    } else if (!endOfResultUsers) {
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
      {searchState == "active" && newUsers && newUsers.length != 0 && (
        <InfiniteScroll
          className="scroll-m"
          dataLength={newUsers.length}
          height={350}
          next={handleScroll}
          hasMore={!endOfResult}
          loader={
            <div className="loading-border loading--full-height">
              <img
                src="../static/images/Gila_Final_Logo_form.svg"
                alt="App"
                title="App"
                className="rotate-image loader-img"
              />
            </div>
          }
          // endMessage={
          //   <p style={{ textAlign: "center" }}>
          //     <b>Yay! You have seen all online Users </b>
          //   </p>
          // }
        >
          <div className={classes.displayF}>
            {newUsers.map((option, index) => (
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
        // <div className="loader-view">
        //   <CircularProgress />
        // </div>
        <div className="loading-border loading--full-height">
          <img
            src="../static/images/Gila_Final_Logo_form.svg"
            alt="App"
            title="App"
            className="rotate-image loader-img"
          />
        </div>
      )}
      {/* {showMessage && NotificationManager.error(alertMessage)}
      <NotificationContainer /> */}
    </>
  );
}
