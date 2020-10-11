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

//import Page from '../hoc/defaultPage';
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

const FrontPage = () => {
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
          <Grid container className={classes.gridSpace1}>
            <Grid item xs={8}></Grid>
            <Grid item xs={1} className={classes.posRight}>
              <Button
                onClick={() => {
                  Router.replace("/signin");
                }}
                variant="contained"
                color="primary"
                className={classes.btnShadw}
              >
                LOGIN
                {/* <IntlMessages id="appModule.signIn" /> */}
              </Button>
            </Grid>
            <Grid item xs={1} className={classes.posRight}>
              <Button
                onClick={() => {
                  Router.replace("/signup");
                }}
                variant="contained"
                color="primary"
                className={classes.btnShadw}
              >
                Register
                {/* <IntlMessages id="appModule.signIn" /> */}
              </Button>
            </Grid>
            <Grid item xs={1} className={classes.posRight}>
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

                <DropdownMenu right className="w-50">
                  <LanguageSwitcher
                    switchLanguage={switchLanguage}
                    handleRequestClose={handleRequestClose}
                  />
                </DropdownMenu>
              </Dropdown>
            </Grid>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid container className={classes.gridSpace2}>
            <Grid item xs={1}></Grid>
            <Grid item xs={2}>
              <img src="../static/images/gila 6-1.png" />
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={8}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography
                    variant="h1"
                    className={`${classes.fontcolor} ${classes.fontfam}`}
                    component="h2"
                    gutterBottom
                  >
                    WELCOME
                  </Typography>
                </Grid>
                <Grid item xs="7">
                  <Typography
                    className={`${classes.fontcolor} ${classes.fontCenter}`}
                    variant="h5"
                    gutterBottom
                  >
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Quos blanditiis tenetur Lorem ipsum dolor sit amet,
                    consectetur adipisicing elit. Quos blanditiis tenetur Quos
                    blanditiis tenetur Lorem ipsum dolor sit amet
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default FrontPage;
