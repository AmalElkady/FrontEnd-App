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
  const CountryRecentActiveUsers = useSelector(
    state => state.home.countryRecentActiveUsers
  );

  const CountriesOptionsOffline = useSelector(
    state => state.home.allCountriesOffline
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

  const OffsetOfline = useSelector(state => state.home.OffsetOfline);
  const scoreLOffline = useSelector(state => state.home.scoreLOffline);
  const endOfResult = useSelector(state => state.home.endOfResult);
  const endOfResultUsers = useSelector(state => state.home.endOfResultUsers);

  const photoReadSignedRequest = useSelector(
    state => state.home.photoReadSignedRequest
  );
  //const showMessage = useSelector(state => state.auth.showMessage);
  const dispatch = useDispatch();
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
      console.log(
        "agerangeAllCountriesSelectedOnline change ",
        AgerangeAllCountriesSelectedOnline
      );
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
      console.log("CountrySelectedOnline change ", CountrySelectedOnline);
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
      console.log(
        "countryCitySelectedOnline change ",
        CountryCitySelectedOnline
      );
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
      console.log(
        "CountryCitiesAgerangeSelectedOnline change ",
        CountryCitiesAgerangeSelectedOnline
      );
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
      console.log(
        "CountryCityAgerangeSelectedOnline change ",
        CountryCityAgerangeSelectedOnline
      );
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
      console.log("selectedOnlineUsers change ", SelectedOnlineUsers);
      dispatch(requestPhotoRead());
    }
  }, [SelectedOnlineUsers]);

  ///offline
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
    if (CountryCityRecentActiveUsers.length != 0) {
      console.log(
        "countryCityRecentActiveUsers change",
        CountryCityRecentActiveUsers
      );
      dispatch(requestPhotoRead());
    } else {
      // console.log("reset from component cards country city recent ");
      // dispatch(resetStates());
    }
  }, [CountryCityRecentActiveUsers]);

  ///

  useEffect(() => {
    // console.log("photoReadSignedRequest changed : ", photoReadSignedRequest);
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
            console.log("SelectedOnlineUsers :on map ", SelectedOnlineUsers);
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
      console.log("get next options");
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
      console.log("get next options 2");
      // Get online users other options
      dispatch(
        countrySelectedOnline(
          CountriesOptionsOnline.list_of_results[countrySelectedIndex],
          scoreLOnline,
          OffsetOnline
        )
      );
      dispatch(resetEndRes());
    } else if (
      currentIndexSelectedOnline ===
      CountryCitySelectedOnline.length - 1
    ) {
      console.log("get next options 3");
      // Get online users other options
      dispatch(
        countryCitySelectedOnline(
          CountriesOptionsOnline.list_of_results[countrySelectedIndex],
          CountryCitiesOptionsOnline.list_of_results[citySelectedIndex],
          scoreLOnline,
          OffsetOnline
        )
      );
      dispatch(resetEndRes());
    } else if (
      currentIndexSelectedOnline ===
      CountryCitiesAgerangeSelectedOnline.length - 1
    ) {
      console.log("get next options 4");
      // Get online users other options
      if (
        CountryAgerangesOptionsOnline.list_of_results &&
        !AgerangeCountriesOptionsOnline.list_of_results
      ) {
        console.log(
          "countryCitiesAgerangeSelectedOnline 1 on search ",
          CountriesOptionsOnline.list_of_results[countrySelectedIndex],
          CountryAgerangesOptionsOnline.list_of_results[selectedAgerangeIndex]
        );

        dispatch(
          countryCitiesAgerangeSelectedOnline(
            CountriesOptionsOnline.list_of_results[countrySelectedIndex],
            CountryAgerangesOptionsOnline.list_of_results[
              selectedAgerangeIndex
            ],
            scoreLOnline,
            OffsetOnline
          )
        );
      } else {
        console.log(
          "countryCitiesAgerangeSelectedOnline 2 on search ",
          AgerangeCountriesOptionsOnline.list_of_results[countrySelectedIndex],
          ARRAY_OF_AGE_RANGE[selectedAgerangeIndex].replace(/\s/g, "")
        );
        dispatch(
          countryCitiesAgerangeSelectedOnline(
            AgerangeCountriesOptionsOnline.list_of_results[
              countrySelectedIndex
            ],
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
      console.log("get next options 5");
      // Get online users other options
      if (
        CountryAgerangesOptionsOnline.list_of_results &&
        !AgerangeCountriesOptionsOnline.list_of_results
      ) {
        dispatch(
          countryCityAgerangeSelectedOnline(
            CountriesOptionsOnline.list_of_results[countrySelectedIndex],
            CountryCitiesOptionsOnline.list_of_results[citySelectedIndex],
            CountryAgerangesOptionsOnline.list_of_results[
              selectedAgerangeIndex
            ],
            scoreLOnline,
            OffsetOnline
          )
        );
      } else {
        dispatch(
          countryCityAgerangeSelectedOnline(
            AgerangeCountriesOptionsOnline.list_of_results[
              countrySelectedIndex
            ],
            CountryCitiesAgerangeOptionsOnline.list_of_results[
              citySelectedIndex
            ],
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
  ////
  //online
  const handleScrollAgerange = () => {
    console.log(
      " endOfResultUsers ,endOfResult handleScrollAgerange",
      endOfResultUsers,
      endOfResult,
      AgerangeAllCountriesSelectedOnline[currentIndexSelectedOnline],
      scoreLOnline,
      OffsetOnline
    );
    if (AgerangeAllCountriesSelectedOnline.length == 1) {
      console.log("==true");
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
    console.log(
      " endOfResultUsers ,endOfResult handleScrollCountry",
      endOfResultUsers,
      endOfResult,
      currentIndexSelectedOnline,
      CountrySelectedOnline[currentIndexSelectedOnline],
      scoreLOnline,
      OffsetOnline,
      scoreLOnlineUsers, //SH
      OffsetOnlineUsers //offset
    );
    if (CountrySelectedOnline.length == 1) {
      console.log("==true");
      dispatch(
        countrySelectedOnline(
          CountriesOptionsOnline.list_of_results[countrySelectedIndex],
          scoreLOnline,
          OffsetOnline
        )
      );
    } else if (!endOfResultUsers) {
      console.log("endOfResultUsers false");
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
    console.log(
      " endOfResultUsers ,endOfResult handleScrollCountryCity",
      endOfResultUsers,
      endOfResult,
      currentIndexSelectedOnline,
      CountryCitySelectedOnline[currentIndexSelectedOnline],
      scoreLOnline,
      OffsetOnline,
      scoreLOnlineUsers, //SH
      OffsetOnlineUsers //offset
    );
    if (CountryCitySelectedOnline.length == 1) {
      console.log("==true");
      dispatch(
        countryCitySelectedOnline(
          CountriesOptionsOnline.list_of_results[countrySelectedIndex],
          CountryCitiesOptionsOnline.list_of_results[citySelectedIndex],
          scoreLOnline,
          OffsetOnline
        )
      );
    } else if (!endOfResultUsers) {
      console.log("endOfResultUsers false");
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
    console.log(
      " endOfResultUsers ,endOfResult handleScrollCountryCity",
      endOfResultUsers,
      endOfResult,
      currentIndexSelectedOnline,
      CountryCitySelectedOnline[currentIndexSelectedOnline],
      scoreLOnline,
      OffsetOnline,
      scoreLOnlineUsers, //SH
      OffsetOnlineUsers //offset
    );
    if (CountryCitiesAgerangeSelectedOnline.length == 1) {
      if (
        CountryAgerangesOptionsOnline.list_of_results &&
        !AgerangeCountriesOptionsOnline.list_of_results
      ) {
        dispatch(
          countryCitiesAgerangeSelectedOnline(
            CountriesOptionsOnline.list_of_results[countrySelectedIndex],
            CountryAgerangesOptionsOnline.list_of_results[
              selectedAgerangeIndex
            ],
            scoreLOnline,
            OffsetOnline
          )
        );
      } else {
        dispatch(
          countryCitiesAgerangeSelectedOnline(
            AgerangeCountriesOptionsOnline.list_of_results[
              countrySelectedIndex
            ],
            ARRAY_OF_AGE_RANGE[selectedAgerangeIndex].replace(/\s/g, ""),
            scoreLOnline,
            OffsetOnline
          )
        );
      }
    } else if (!endOfResultUsers) {
      console.log("endOfResultUsers false");

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
    console.log(
      " endOfResultUsers ,endOfResult handleScrollCountryCityAgerange",
      endOfResultUsers,
      endOfResult,
      currentIndexSelectedOnline,
      CountryCitySelectedOnline[currentIndexSelectedOnline],
      scoreLOnline,
      OffsetOnline,
      scoreLOnlineUsers, //SH
      OffsetOnlineUsers //offset
    );
    if (CountryCityAgerangeSelectedOnline.length == 1) {
      if (
        CountryAgerangesOptionsOnline.list_of_results &&
        !AgerangeCountriesOptionsOnline.list_of_results
      ) {
        dispatch(
          countryCityAgerangeSelectedOnline(
            CountriesOptionsOnline.list_of_results[countrySelectedIndex],
            CountryCitiesOptionsOnline.list_of_results[citySelectedIndex],
            CountryAgerangesOptionsOnline.list_of_results[
              selectedAgerangeIndex
            ],
            scoreLOnline,
            OffsetOnline
          )
        );
      } else {
        dispatch(
          countryCityAgerangeSelectedOnline(
            AgerangeCountriesOptionsOnline.list_of_results[
              countrySelectedIndex
            ],
            CountryCitiesAgerangeOptionsOnline.list_of_results[
              citySelectedIndex
            ],
            ARRAY_OF_AGE_RANGE[selectedAgerangeIndex].replace(/\s/g, ""),
            scoreLOnline,
            OffsetOnline
          )
        );
      }
    } else if (!endOfResultUsers) {
      console.log("endOfResultUsers false");

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
      {console.log(
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
        endOfResult
      )}

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
