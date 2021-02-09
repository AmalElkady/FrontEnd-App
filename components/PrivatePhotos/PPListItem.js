import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import IntlMessages from "../../util/IntlMessages";

import {ppAccessApproveRemove,ppAccessApproveRemoveSuccess,clickedId} from "../../actions/Interaction"
import {permissionPPReadRemove}from "../../actions/Profile"


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
const PpAccessApproveRemove=useSelector(
    state => state.interaction.ppAccessApproveRemove
  );
const Clicked_id = useSelector(state => state.interaction.clicked_id);

const permissionReadPP=useSelector(
    state => state.profile.permissionReadPP
  );

   useEffect(() => {
    if (Clicked_id == user.i) {
       console.log("PpAccessApproveRemove ",PpAccessApproveRemove)
    if (PpAccessApproveRemove == true) {
      // NotificationManager.success(`You give ${user.n} access successfully`, "Success");
      NotificationManager.success("Your request successfully executed")
    } else if (!(PpAccessApproveRemove == true || PpAccessApproveRemove == false) ) {
      NotificationManager.error(PpAccessApproveRemove);
    }
    dispatch(clickedId(null));
    dispatch(ppAccessApproveRemoveSuccess(false));}
  }, [PpAccessApproveRemove]);

    useEffect(() => {
    if (Clicked_id == user.i) {
       console.log("permissionReadPP ",permissionReadPP)
    if (permissionReadPP == true) {
      // NotificationManager.success(`You give ${user.n} access successfully`, "Success");
      NotificationManager.success("Your request successfully executed")
    } else if (!(permissionReadPP == true || permissionReadPP == false) ) {
      NotificationManager.error(permissionReadPP);
    }
    dispatch(clickedId(null));
    dispatch(ppAccessApproveRemoveSuccess(false));}
  }, [permissionReadPP]);

  return (
    <>
      <Grid container className="item-container">
        <Grid item xs={12}>
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
        <Grid item xs={12}>
          <Grid container className="item-icons-container">
            {/* access approved */}
           {privateSelectedIcon == "incomingNotApproved"&&  <Grid item xs={3}>
          <IconButton
            // className="item-btn"
            onClick={() => {
              console.log("user ",user)
             dispatch(clickedId(user.i));
             dispatch(ppAccessApproveRemove(0,user.i,user.co,user.ci,user.va))
            }}
            aria-label="View Profile"
          >
            <img src="../../static/images/icons/PP_Access_Approved.svg" />
          </IconButton>
           </Grid>}
           

           {/* View profile */}
          <Grid item xs={4}>
           <IconButton
            // className="item-btn"
            onClick={() => {
              //  user.timeScore = timeScore;
              // Router.push({ pathname: `/home/profile`, query: user });
            }}
            aria-label="View Profile"
          >
            <img src="../../static/images/icons/Profile_icon_2.svg" />
          </IconButton>
          </Grid>
         {/* access removed */}
           {privateSelectedIcon == "incomingApproved"&&<Grid item xs={3}>
          <IconButton
            // className="item-btn"
            onClick={() => {
              console.log("user ",user)
             dispatch(clickedId(user.i));
             dispatch(ppAccessApproveRemove(1,user.i,user.co,user.ci,user.va))
            }}
            aria-label="View Profile"
          >
            <img src="../../static/images/icons/PP_Access_Remove.svg" />
          </IconButton>
           </Grid>}

            {/* permission pp removed */}
           {privateSelectedIcon == "incomingNotApproved"&&<Grid item xs={4}>
          <IconButton
            // className="item-btn"
            onClick={() => {
              console.log("user ",user)
             dispatch(clickedId(user.i));
             dispatch(permissionPPReadRemove(1,user.i,user.co,user.ci,user.va))
            }}
            aria-label="View Profile"
          >
            <img src="../../static/images/icons/PP_Permission_remove.svg" />
          </IconButton>
           </Grid>}
           </Grid>
        </Grid>
      </Grid>
    </>
  );
}
