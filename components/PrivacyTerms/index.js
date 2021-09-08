import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import IntlMessages from "../../util/IntlMessages";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

export default function PrivacyTerms({ componentFlag }) {
  useEffect(() => {
    //  if (componentFlag) console.log("componentFlag ", componentFlag);
  }, []);

  return (
    <>
      <Grid container>
        <Link href="/">
          <a className="prepend-icon">
            <ArrowBackIosIcon />
          </a>
        </Link>
        {componentFlag == "privacy" && (
          <>
            <Grid item xs={12} className="page-title-container">
              <Typography variant="h5">
                <IntlMessages id="privacy.policy" />
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">
                <IntlMessages id="privacy.generalTitle" />
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1">
                <IntlMessages id="privacy.generalInfo" />
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">
                <IntlMessages id="privacy.diffTitle" />
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1">
                <IntlMessages id="privacy.diffInfo" />
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">
                <IntlMessages id="privacy.personalTitle" />
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1">
                <IntlMessages id="privacy.personalInfo" />
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">
                <IntlMessages id="privacy.question1Title" />
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1">
                <IntlMessages id="privacy.questionSub1Title" />
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1">
                <IntlMessages id="privacy.questionSub1Info" />
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1">
                <IntlMessages id="privacy.questionSub2Title" />
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                <IntlMessages id="privacy.questionSub2Info" />
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">
                <IntlMessages id="privacy.cookiesTitle" />
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1">
                <IntlMessages id="privacy.cookiesInfo" />
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">
                <IntlMessages id="privacy.question2Title" />
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1">
                <IntlMessages id="privacy.question2Info" />
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">
                <IntlMessages id="privacy.question3Title" />
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1">
                <IntlMessages id="privacy.question3Info" />
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">
                <IntlMessages id="privacy.question4Title" />
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1">
                <IntlMessages id="privacy.question4Info" />
              </Typography>
            </Grid>
          </>
        )}
        {/* <Grid item xs={12}>
          <Typography variant="h6">
                    <IntlMessages id="blockedList.blockedTitle" />
         </Typography>
        </Grid> */}

        {componentFlag == "terms" && (
          <Grid item xs={12} className="page-title-container">
            <Typography variant="h6">
              <IntlMessages id="terms.conditions" />
            </Typography>
          </Grid>
        )}
        {/* <Grid item xs={12}>
           <Typography variant="h6">
                    <IntlMessages id="blockedList.blockedTitle" />
         </Typography>
        </Grid> */}
      </Grid>
    </>
  );
}
