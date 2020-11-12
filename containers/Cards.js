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

import { allCountriesSelectedOnline } from "../actions/Home";

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
  const allCountriesSelectedOnlineUsers = useSelector(
    state => state.home.allCountriesSelectedOnlineUsers
  );
  //const showMessage = useSelector(state => state.auth.showMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allCountriesSelectedOnline());
  }, []);

  const onSubmit = () => {
    showAuthLoader();
    dispatch(userAddSubscribe(selectedValue));
  };

  const classes = useStyles();

  return (
    <>
      {console.log("countries$$$$$$$ ", allCountriesSelectedOnlineUsers)}
      <div className={classes.displayF}>
        {allCountriesSelectedOnlineUsers?.map((option, index) =>
          index % 2 == 0 ? <UserCard user={JSON.parse(option)}></UserCard> : ""
        )}
      </div>
    </>
  );
}
