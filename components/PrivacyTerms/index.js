import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import IntlMessages from "../../util/IntlMessages";
import Typography from "@material-ui/core/Typography";
import { useRouter } from "next/router";

export default function PrivacyTerms() {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {}, []);

  return (
    <>
      <Grid container>
        <Grid item xs={12} className="page-title-container">
          <Typography variant="h6">
            <IntlMessages id="privacy.policy" />
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {/* <Typography variant="h6">
                    <IntlMessages id="blockedList.blockedTitle" />
         </Typography> */}
        </Grid>

        <Grid item xs={12} className="page-title-container">
          <Typography variant="h6">
            <IntlMessages id="terms.conditions" />
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {/* <Typography variant="h6">
                    <IntlMessages id="blockedList.blockedTitle" />
         </Typography> */}
        </Grid>
      </Grid>
    </>
  );
}
