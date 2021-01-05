import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import Router from "next/router";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import LanguageSwitcher from "../components/LanguageSwitcher/index";
import { switchLanguage } from "../actions/Setting";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import mainTheme from "../containers/themes/mainTheme";
import { makeStyles } from "@material-ui/core/styles";
import IntlMessages from "../util/IntlMessages";

import Page from "../hoc/defaultPage";

const useStyles = makeStyles(theme => ({
  gridSpace1: {
    margin: "2rem 0"
  },
  gridSpace2: {
    margin: "10rem 0"
  },
  btnShadw: {
    boxShadow: "3px 5px 9px rgba(221, 221, 221, 0.5)"
  },
  dropdownL:{
        right: "13rem !important",
    "@media only screen and (max-width: 575px)": {
      right: "0 !important"
    }
  },
  mainLogo:{
        marginLeft: "1rem",
"@media only screen and (max-width: 575px)": {
      margin: "2rem",
      maxWidth:"50%",
      flexBasis:"50%"
    }
  },
  posRight: {
    display: "flex",
    justifyContent: "end"
  },
  fontfam: {
    fontFamily: "Lobster, cursive"
  },
  fontcolor: {
    color: "white"
  },
  fontCenter: {
    fontFamily: "Chilanka, cursive",
    textAlign: "center"
  }
}));

export default Page(() => {
  const classes = useStyles();
  const locale = useSelector(state => state.settings.locale);
  const [langSwitcher, setLangSwitcher] = useState(false);

  const onLangSwitcherSelect = event => {
    setLangSwitcher(!langSwitcher);
  };
  const handleRequestClose = () => {
    setLangSwitcher(false);
  };
  return (
    <ThemeProvider theme={createMuiTheme(mainTheme)}>
      <div className="intro-bg">
        <div className="bg-layout">
          <Grid container spacing={12}>
            <Grid item xs={10}></Grid>
            {/* <Grid item xs={1}>
              <Button
                onClick={() => {
                  Router.replace("/signin");
                }}
                variant="contained"
                color="primary"
                className={classes.btnShadw}
              >
                <IntlMessages id="appModule.login" />
              </Button>
            </Grid> */}
            {/* <Grid item xs={1}>
              <Button
                onClick={() => {
                  Router.replace("/signup");
                }}
                variant="contained"
                color="primary"
                className={classes.btnShadw}
              >
                <IntlMessages id="appModule.regsiter" />
              </Button>
            </Grid> */}
            <Grid item xs={2}>
              <Dropdown
                className="quick-menu"
                isOpen={langSwitcher}
                toggle={() => onLangSwitcherSelect(event)}
              >
                <DropdownToggle
                  className="d-inline-block"
                  tag="span"
                  data-toggle="dropdown"
                >
                  <IconButton className={`icon-btn`}>
                    <i className={`flag flag-24 flag-${locale.icon}`} />
                  </IconButton>
                </DropdownToggle>

                <DropdownMenu className={`w-50 ${classes.dropdownL}`}>
                  <LanguageSwitcher
                    switchLanguage={switchLanguage}
                    handleRequestClose={handleRequestClose}
                  />
                </DropdownMenu>
              </Dropdown>
            </Grid>
          </Grid>
          <Grid container spacing={12}>
            <Grid item xs={5} className={classes.mainLogo}>
            {/* <div > */}
            {/* style={{width:"100%"}} */}
             <img src="../static/images/Gila_logo_front_page.svg"
                     alt="Gila" title="Gila"/> 
            {/* </div> */}
            </Grid>
          </Grid>
        </div>
      </div>
    </ThemeProvider>
  );
});
