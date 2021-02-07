import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import IntlMessages from "../../util/IntlMessages";

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
export default function ListItem({ user }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const privateSelectedIcon = useSelector(
    state => state.interaction.privateSelectedIcon
  );

  useEffect(() => {}, []);

  return (
    <>
      <Grid container className="item-container">
        <Grid item xs={10}>
          <Grid container>
            <Grid item xs={3}>
              <div className="item-image">
                <div>
                  <img src={user._} />
                </div>
              </div>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={8} className="item-text">
              <Typography variant="body1" component="p">
                {privateSelectedIcon == "outgoing" ? (
                  <>
                    <IntlMessages id="ppList.outgoing" />
                    {user.n}
                  </>
                ) : privateSelectedIcon == "incomingApproved" ? (
                  <>
                    <IntlMessages id="ppList.incomingApproved" />
                    {user.n}
                  </>
                ) : privateSelectedIcon == "incomingNotApproved" ? (
                  <>
                    <IntlMessages id="ppList.incomingNotApproved" />
                    {user.n}
                  </>
                ) : (
                  ""
                )}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <IconButton
            className="item-btn"
            onClick={() => {
              //  user.timeScore = timeScore;
              // Router.push({ pathname: `/home/profile`, query: user });
            }}
            aria-label="View Profile"
          >
            <img src="../../static/images/icons/Profile_icon_2.svg" />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
}
