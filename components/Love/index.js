import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import IntlMessages from "../../util/IntlMessages";

import LoveIcons from "./LoveIcons"


import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: "70%",
    margin: "2rem auto"
  }
}));
export default function Love() {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
  }, []);

  return (
    <>
      <Grid container>
           <Grid item xs={12} className="grid-width-1" >
                     <LoveIcons/>
			</Grid>
            <Grid item xs={12} className="grid-width-1" >
		   </Grid>
      </Grid>
    </>
  );
}
