import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IntlMessages from "../util/IntlMessages";
import Box from "@material-ui/core/Box";
import Router from "next/router";

import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import {
  hideMessage,
  showAuthLoader,
  userAddSubscribe,
  subFlagClear,
  userSignOut
} from "../actions/Auth";

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
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "50%",
    height: "50%",
    margin: "auto"
  }
}));

export default function Subscribe() {
  const subFlag = useSelector(state => state.auth.subFlag);
  const showMessage = useSelector(state => state.auth.showMessage);
  // const timeflag = useSelector(state => state.auth.timeReturned);
  const dispatch = useDispatch();

  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      if (showMessage) {
        setTimeout(() => {
          hideMessage();
        }, 3000);
      }
      // if (subFlag) {
      //   setTimeout(() => {
      //     console.log("sub donnnnne");
      //     showAuthLoader();
      //     subFlagClear();
      //     Router.replace("/home/content");
      //     window.location.reload(false);
      //   }, 300);
      // }
    }
  });

  const onSubmit = () => {
    showAuthLoader();
    dispatch(userAddSubscribe(selectedValue));
    setTimeout(() => {
      showAuthLoader();
      subFlagClear();
      Router.replace("/home/content");
      window.location.reload(false);
    }, 300);
  };

  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(1);

  const [selectedValue, setSelectedValue] = useState("1");

  const handleChangeSub = event => {
    setSelectedValue(event.target.value);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={() => {
          showAuthLoader();
          userSignOut();
        }}
        color="primary"
      >
        <IntlMessages id="appModule.signOut" />
      </Button>

      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            {/*FREE  */}

            <Tab
              label={
                <FormControlLabel
                  value="0"
                  control={
                    <Radio
                      checked={selectedValue === "0"}
                      onChange={handleChangeSub}
                      color="primary"
                      value="0"
                      name="radio-button-demo"
                      inputProps={{ "aria-label": "Free" }}
                    />
                  }
                  label="Free"
                />
              }
              {...a11yProps(0)}
            />

            {/* 1 MONTH */}

            <Tab
              label={
                <FormControlLabel
                  value="1"
                  control={
                    <Radio
                      checked={selectedValue === "1"}
                      onChange={handleChangeSub}
                      color="primary"
                      value="1"
                      name="radio-button-demo"
                      inputProps={{ "aria-label": "1 Month" }}
                    />
                  }
                  label="1 Month"
                />
              }
              {...a11yProps(1)}
            />

            {/* 3 MONTH */}
            <Tab
              label={
                <FormControlLabel
                  value="2"
                  control={
                    <Radio
                      checked={selectedValue === "2"}
                      onChange={handleChangeSub}
                      color="primary"
                      value="2"
                      name="radio-button-demo"
                      inputProps={{ "aria-label": "3 Months" }}
                    />
                  }
                  label="3 Months"
                />
              }
              {...a11yProps(2)}
            />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            Free
            {/* <div className="mb-3 d-flex align-items-center justify-content-between"> */}
            <Button
              variant="contained"
              onClick={() => {
                onSubmit();
              }}
              color="primary"
            >
              <IntlMessages id="appModule.submit" />
            </Button>
            {/* </div> */}
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            1 Month
            <Button
              variant="contained"
              onClick={() => {
                onSubmit();
              }}
              color="primary"
            >
              <IntlMessages id="appModule.submit" />
            </Button>
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            3 Months
            <Button
              variant="contained"
              onClick={() => {
                onSubmit();
              }}
              color="primary"
            >
              <IntlMessages id="appModule.submit" />
            </Button>
          </TabPanel>
        </SwipeableViews>
      </div>
    </>
  );
}
