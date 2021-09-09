import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import IntlMessages from "../../util/IntlMessages";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { makeStyles } from "@material-ui/core/styles";

import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import IconButton from "@material-ui/core/IconButton";

import LanguageSwitcher from "../LanguageSwitcher/index";
import { switchLanguage } from "../../actions/Setting";

const useStyles = makeStyles(theme => ({
  dropdownL: {
    right: "13rem !important",
    "@media only screen and (max-width: 575px)": {
      right: "0 !important"
    }
  }
}));

export default function PrivacyTerms({ componentFlag }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const locale = useSelector(state => state.settings.locale);
  const [langSwitcher, setLangSwitcher] = useState(false);
  const formSwitchFlag = useSelector(state => state.auth.formSwitchFlag);

  const onLangSwitcherSelect = event => {
    setLangSwitcher(!langSwitcher);
  };

  const handleRequestClose = () => {
    setLangSwitcher(false);
  };

  return (
    <>
      <Grid container>
        <Grid item xs={10} className="arrow-container">
          <Link href="/">
            <a className="prepend-icon">
              <ArrowBackIosIcon />
            </a>
          </Link>
        </Grid>

        <Grid item xs={2} className="lang-container lang-2">
          <Dropdown
            className="quick-menu menu-home"
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

        {componentFlag == "privacy" && (
          <>
            <Grid item xs={12} className="page-title-container">
              <Typography variant="h5" style={{ fontWeight: "bold" }}>
                <IntlMessages id="privacy.policy" />
              </Typography>
            </Grid>

            <div className="section-margin">
              <Grid item xs={12} className="title">
                <Typography variant="h6">
                  <IntlMessages id="privacy.generalTitle" />
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body1" className="text-style text-size">
                  <IntlMessages id="privacy.generalInfo" />
                </Typography>
              </Grid>
            </div>

            <div className="section-margin">
              <Grid item xs={12} className="title">
                <Typography variant="h6">
                  <IntlMessages id="privacy.diffTitle" />
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body1" className="text-style text-size">
                  <IntlMessages id="privacy.diffInfo" />
                </Typography>
              </Grid>
            </div>

            <div className="section-margin">
              <Grid item xs={12} className="title">
                <Typography variant="h6">
                  <IntlMessages id="privacy.personalTitle" />
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body1" className="text-style text-size">
                  <IntlMessages id="privacy.personalInfo" />
                </Typography>
              </Grid>
            </div>
            <div className="section-margin">
              <Grid item xs={12} className="title">
                <Typography variant="h6">
                  <IntlMessages id="privacy.question1Title" />
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body1" className="text-style text-size">
                  <IntlMessages id="privacy.questionSub1Title" />
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body1" className="text-style text-size">
                  <IntlMessages id="privacy.questionSub1Info" />
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body1" className="text-style text-size">
                  <IntlMessages id="privacy.questionSub2Title" />
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" className="text-style text-size">
                  <IntlMessages id="privacy.questionSub2Info" />
                </Typography>
              </Grid>
            </div>

            <div className="section-margin">
              <Grid item xs={12} className="title">
                <Typography variant="h6">
                  <IntlMessages id="privacy.cookiesTitle" />
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body1" className="text-style text-size">
                  <IntlMessages id="privacy.cookiesInfo" />
                </Typography>
              </Grid>
            </div>

            <div className="section-margin">
              <Grid item xs={12} className="title">
                <Typography variant="h6">
                  <IntlMessages id="privacy.question2Title" />
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body1" className="text-style text-size">
                  <IntlMessages id="privacy.question2Info" />
                </Typography>
              </Grid>
            </div>

            <div className="section-margin">
              <Grid item xs={12} className="title">
                <Typography variant="h6">
                  <IntlMessages id="privacy.question3Title" />
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body1" className="text-style text-size">
                  <IntlMessages id="privacy.question3Info" />
                </Typography>
              </Grid>
            </div>
            <div className="section-margin">
              <Grid item xs={12} className="title">
                <Typography variant="h6">
                  <IntlMessages id="privacy.question4Title" />
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body1" className="text-style text-size">
                  <IntlMessages id="privacy.question4Info" />
                </Typography>
              </Grid>
            </div>
          </>
        )}

        {componentFlag == "terms" && (
          <>
            <Grid item xs={12} className="page-title-container">
              <Typography variant="h5" style={{ fontWeight: "bold" }}>
                <IntlMessages id="terms.conditions" />
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" className="text-style">
                <IntlMessages id="terms.subTitle" />
              </Typography>
            </Grid>
            <div className="section-margin">
              <Grid item xs={12} className="title">
                <Typography variant="h6">
                  <IntlMessages id="terms.question1Title" />
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" className="text-style text-size">
                  <IntlMessages id="terms.question1Info1" />
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" className="text-style text-size">
                  <IntlMessages id="terms.question1Info2" />
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" className="text-style text-size">
                  <IntlMessages id="terms.question1Info3" />
                </Typography>
              </Grid>
            </div>

            <div className="section-margin">
              <Grid item xs={12} className="title">
                <Typography variant="h6">
                  <IntlMessages id="terms.question2Title" />
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" className="text-style text-size">
                  <IntlMessages id="terms.question2Info1" />
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" className="text-style text-size">
                  <IntlMessages id="terms.question2Info2" />
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" className="text-style text-size">
                  <IntlMessages id="terms.question2Info3" />
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" className="text-style text-size">
                  <IntlMessages id="terms.question2Info4" />
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" className="text-style text-size">
                  <IntlMessages id="terms.question2Info5" />
                </Typography>
              </Grid>
            </div>

            <div className="section-margin">
              <Grid item xs={12} className="title">
                <Typography variant="h6">
                  <IntlMessages id="terms.question3Title" />
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" className="text-style text-size">
                  <IntlMessages id="terms.question3Info1" />
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" className="text-style text-size">
                  <IntlMessages id="terms.question3Info2" />
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" className="text-style text-size">
                  <IntlMessages id="terms.question3Info3" />
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" className="text-style text-size">
                  <IntlMessages id="terms.question3Info4" />
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" className="text-style text-size">
                  <IntlMessages id="terms.question3Info5" />
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" className="text-style text-size">
                  <IntlMessages id="terms.question3Info6" />
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" className="text-style text-size">
                  <IntlMessages id="terms.question3Info7" />
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" className="text-style text-size">
                  <IntlMessages id="terms.question3Info8" />
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" className="text-style text-size">
                  <IntlMessages id="terms.question3Info9" />
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" className="text-style text-size">
                  <IntlMessages id="terms.question3Info10" />
                </Typography>
              </Grid>
            </div>
          </>
        )}
      </Grid>
    </>
  );
}
