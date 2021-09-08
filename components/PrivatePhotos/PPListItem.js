import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import IntlMessages from "../../util/IntlMessages";
import { useRouter } from "next/router";

import {
  ppAccessApproveRemove,
  ppAccessApproveRemoveSuccess,
  clickedId,
  updateList
} from "../../actions/Interaction";
import { permissionPPReadRemove } from "../../actions/Profile";

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
  const router = useRouter();

  const headerSelectedIcon = useSelector(
    state => state.home.headerSelectedIcon
  );

  const privateSelectedIcon = useSelector(
    state => state.interaction.privateSelectedIcon
  );
  const PpAccessApproveRemove = useSelector(
    state => state.interaction.ppAccessApproveRemove
  );
  const Clicked_id = useSelector(state => state.interaction.clicked_id);

  const permissionReadPP = useSelector(state => state.profile.permissionReadPP);

  useEffect(() => {
    if (Clicked_id == user.i) {
      console.log("PpAccessApproveRemove ", PpAccessApproveRemove);
      if (PpAccessApproveRemove == true) {
        // NotificationManager.success(`You give ${user.n} access successfully`, "Success");
        NotificationManager.success("Your request successfully executed");
      } else if (
        !(PpAccessApproveRemove == true || PpAccessApproveRemove == false)
      ) {
        NotificationManager.error(PpAccessApproveRemove);
      }
      dispatch(clickedId(null));
      dispatch(ppAccessApproveRemoveSuccess(false));
    }
  }, [PpAccessApproveRemove]);

  useEffect(() => {
    if (Clicked_id == user.i) {
      console.log("permissionReadPP ", permissionReadPP);
      if (permissionReadPP == true) {
        // NotificationManager.success(`You give ${user.n} access successfully`, "Success");
        NotificationManager.success("Your request successfully executed");
      } else if (!(permissionReadPP == true || permissionReadPP == false)) {
        NotificationManager.error(permissionReadPP);
      }
      dispatch(clickedId(null));
      dispatch(ppAccessApproveRemoveSuccess(false));
    }
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
                {privateSelectedIcon == "outgoing" || user.t == "A" ? (
                  <>
                    <IntlMessages id="ppList.outgoing" />
                    {user.n ? user.n : <IntlMessages id="chat.user" />}
                  </>
                ) : privateSelectedIcon == "incomingApproved" ? (
                  <>
                    <IntlMessages id="ppList.incomingApproved" />
                    {user.n ? user.n : <IntlMessages id="chat.user" />}
                  </>
                ) : privateSelectedIcon == "incomingNotApproved" ||
                  user.t == "R" ? (
                  <>
                    <IntlMessages id="ppList.incomingNotApproved" />
                    {user.n ? user.n : <IntlMessages id="chat.user" />}
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
            {(privateSelectedIcon == "incomingNotApproved" ||
              user.t == "R") && (
              <Grid item xs={2} className="icon-container">
                <IconButton
                  // className="item-btn"
                  onClick={() => {
                    console.log("user ", user);
                    dispatch(clickedId(user.i));
                    dispatch(updateList("LNA"));
                    dispatch(
                      ppAccessApproveRemove(
                        0,
                        user.i,
                        user.co,
                        user.ci,
                        user.va
                      )
                    );
                  }}
                  aria-label="View Profile"
                >
                  <img src="../../static/images/icons/PP_Access_Approved.svg" />
                </IconButton>
                <Typography variant="body1" component="p">
                  <IntlMessages id="ppList.iconTitleApprove" />
                </Typography>
              </Grid>
            )}

            {/* View profile */}
            {user.n && (
              <Grid item xs={2} className="icon-container">
                <IconButton
                  // className="item-btn"
                  onClick={() => {
                    //  user.timeScore = timeScore;
                    user.flag = "read";
                    router.push({ pathname: `/home/profile`, query: user });
                  }}
                  aria-label="View Profile"
                >
                  <img src="../../static/images/icons/Profile_icon_2.svg" />
                </IconButton>
                <Typography variant="body1" component="p">
                  <IntlMessages id="ppList.iconTitleView" />
                </Typography>
              </Grid>
            )}
            {privateSelectedIcon == "incomingApproved" && (
              <Grid item xs={6}></Grid>
            )}
            {/* access removed */}
            {privateSelectedIcon == "incomingApproved" && (
              <Grid item xs={2} className="icon-container">
                <IconButton
                  // className="item-btn"
                  onClick={() => {
                    console.log("user ", user);
                    dispatch(clickedId(user.i));
                    dispatch(updateList("LA"));
                    dispatch(
                      ppAccessApproveRemove(
                        1,
                        user.i,
                        user.co,
                        user.ci,
                        user.va
                      )
                    );
                  }}
                  aria-label="View Profile"
                >
                  <img src="../../static/images/icons/PP_Access_Remove.svg" />
                </IconButton>
                <Typography variant="body1" component="p">
                  <IntlMessages id="ppList.iconTitleRemove" />
                </Typography>
              </Grid>
            )}

            {/* permission pp removed */}
            {(privateSelectedIcon == "incomingNotApproved" ||
              user.t == "R") && (
              <Grid item xs={2} className="icon-container">
                <IconButton
                  // className="item-btn"
                  onClick={() => {
                    console.log("user ", user);
                    dispatch(clickedId(user.i));
                    dispatch(updateList("LNA"));
                    dispatch(
                      permissionPPReadRemove(
                        1,
                        user.i,
                        user.co,
                        user.ci,
                        user.va
                      )
                    );
                  }}
                  aria-label="View Profile"
                >
                  <img src="../../static/images/icons/PP_Permission_remove.svg" />
                </IconButton>
                <Typography variant="body1" component="p">
                  <IntlMessages id="ppList.iconTitleDelete" />
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
