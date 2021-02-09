import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import IntlMessages from "../../util/IntlMessages";
import { useRouter } from "next/router";
import moment from "moment";

export default function ListItem({ user,time }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const loveSelectedIcon = useSelector(
    state => state.interaction.loveSelectedIcon
  );

  useEffect(() => {}, []);

  return (
    <>
      <Grid container className="item-container">
        <Grid item xs={10}>
          <Grid container>
            <Grid item xs={3}>
              <div className="item-image">
                {/* <img src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80" /> */}
                <div>
                  <img src={user._} />
                </div>
              </div>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={8} className="item-text">
              <Typography variant="body1" component="p">
                {router.pathname == "/home/love" && (
                  <>
                    {loveSelectedIcon == "match" ? (
                      <>
                        <IntlMessages id="loveList.match" />
                        {user.n}
                      </>
                    ) : loveSelectedIcon == "sent" ? (
                      <>
                        <IntlMessages id="loveList.sent" />
                        {user.n}
                      </>
                    ) : loveSelectedIcon == "received" ? (
                      <>
                        {user.n}
                        <IntlMessages id="loveList.received" />
                      </>
                    ) : (
                      ""
                    )}
                  </>
                )}
                {router.pathname == "/home/views" && (
                  <>
                    {user.n}
                    <IntlMessages id="viewList.view" />
                    {console.log("time",time)}
                    {time && moment(Number(time)).format("YYYY-MM-DD hh:mm A")}
                  </>
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
