import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
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
  requestPhotoRead
} from "../actions/Home";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}

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
  const countryRecentActiveUsers = useSelector(
    state => state.home.countryRecentActiveUsers
  );

  const countryCityRecentActiveUsers = useSelector(
    state => state.home.countryCityRecentActiveUsers
  );

  ////
  const searchState = useSelector(state => state.home.searchState);

  const photoReadSignedRequest = useSelector(
    state => state.home.photoReadSignedRequest
  );
  //const showMessage = useSelector(state => state.auth.showMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(allCountriesSelectedOnline());
    //dispatch(agerangeAllCountriesSelectedOnline("18-25"));
    //dispatch(countrySelectedOnline("EG"));
    //dispatch(countryCitySelectedOnline("EG", "3"));
    dispatch(countryCitiesAgerangeSelectedOnline("EG", "18-25"));
    // //dispatch(requestPhotoRead());
  }, []);
  // useEffect(() => {
  //   // console.log("88888888888888888* :", allCountriesSelectedOnlineUsers.length);
  //   // if (allCountriesSelectedOnlineUsers.length != 0) {
  //   //   console.log("88888888888888888");
  //   //   dispatch(requestPhotoRead());
  //   //   mapUserPhotoUrl(allCountriesSelectedOnlineUsers, photoReadSignedRequest);
  //   // }
  // }, [allCountriesSelectedOnlineUsers]);

  useEffect(() => {
    if (countryRecentActiveUsers != null) {
      console.log("countryRecentActiveUsers change", countryRecentActiveUsers);
      dispatch(requestPhotoRead());
    }
  }, [countryRecentActiveUsers]);

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
    console.log("photoReadSignedRequest changed : ", photoReadSignedRequest);
    if (photoReadSignedRequest != null) {
      if (searchState == "most recent") {
        if (countryRecentActiveUsers != null) {
          console.log(
            "countryRecentActiveUsers :on map ",
            countryRecentActiveUsers
          );
          // Users based on Country
          mapUserPhotoUrl(
            countryRecentActiveUsers.users,
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

  return (
    <>
      {/* {console.log(
        "countryRecentActiveUsers from render : ",
        countryRecentActiveUsers,
        "searchState",
        searchState
        // "signedRequest #### ",
        // photoReadSignedRequest?.signedRequest
      )} */}
      <div className={classes.displayF}>
        {/* {searchState == "active" &&
          allCountriesSelectedOnlineUsers?.map((option, index) =>
            index % 2 == 0 ? <UserCard user={option}></UserCard> : ""
          )} */}
        {searchState == "most recent" &&
          (countryRecentActiveUsers != null
            ? countryRecentActiveUsers.users.map((option, index) =>
                index % 2 == 0 ? (
                  <UserCard
                    key={option.i}
                    user={option}
                    country={countryRecentActiveUsers.country}
                    timeScore={countryRecentActiveUsers.users[index + 1]}
                  ></UserCard>
                ) : (
                  ""
                )
              )
            : countryCityRecentActiveUsers?.users.map((option, index) =>
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
              ))}
      </div>
    </>
  );
}
