import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";

import NotificationItem from "./NotificationItem";
import { notifications } from "./data";
import CustomScrollbars from "../../util/CustomScrollbars";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "next/link";

import LoveNotifications from "./LoveNotification";
import { getNotificationViewPPLove } from "../../actions/Interaction";
const ITEM_HEIGHT = 48;
import { useRouter } from "next/router";

const AppNotification = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [finalUsersProfiles, setFinalUsersProfiles] = useState(null);

  const headerSelectedIcon = useSelector(
    state => state.interaction.headerSelectedIcon
  );

  const notificationViewCount = useSelector(
    state => state.interaction.notificationViewCount
  );

  const notificationPPCount = useSelector(
    state => state.interaction.notificationPPCount
  );

  const notificationLoveCount = useSelector(
    state => state.interaction.notificationLoveCount
  );

  const scoreHNotificationLove = useSelector(
    state => state.interaction.scoreHNotificationLove
  );

  const scoreHNotificationPP = useSelector(
    state => state.interaction.scoreHNotificationLove
  );
  const scoreHNotificationView = useSelector(
    state => state.interaction.scoreHNotificationView
  );

  useEffect(() => {
    // dispatch(
    //   getNotificationViewPPLove(
    //     "CVPL",
    //     scoreHNotificationView,
    //     scoreHNotificationPP,
    //     scoreHNotificationLove,
    //     ""
    //   )
    // );
  }, []);

  useEffect(() => {
    console.log(
      "notificationViewCount ",
      notificationViewCount,
      notificationPPCount,
      notificationLoveCount
    );
  }, [notificationViewCount]);

  return (
    <>
      {headerSelectedIcon == "love" && <LoveNotifications />}

      {/* <MenuList>
        {notificationLoveCount && (
          <Link href="/home/notifications-love">
            <MenuItem className="notific-list-item" onClick={() => {}}>
              <Grid container>
                <Grid item xs={1} className="">
                  <img
                    src="../../static/images/icons/Love_Icon_notification.svg"
                    alt="Love Icon"
                    title="Love Icon"
                  />
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={8}>
                  <Typography variant="button" gutterBottom>
                    Love{" "}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <div className="">
                    <img
                      src="../../static/images/icons/Notifications_Icon_bg.svg"
                      alt="View Icon"
                      title="View Icon"
                    />
                    <Typography
                      variant="button"
                      // className="list-item-count"
                      gutterBottom
                    >
                      {notificationLoveCount}
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </MenuItem>
          </Link>
        )}
        {notificationPPCount && (
          <MenuItem className="notific-list-item" onClick={() => {}}>
            <Grid container>
              <Grid item xs={1} className="">
                <img
                  src="../../static/images/icons/PP_notification.svg"
                  alt="PP Icon"
                  title="PP Icon"
                />
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={8}>
                <Typography variant="button" gutterBottom>
                  Private Photos
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <div className="">
                  <img
                    src="../../static/images/icons/Notifications_bg.svg"
                    alt="View Icon"
                    title="View Icon"
                  />
                  <Typography
                    variant="button"
                    // className="list-item-count"
                    gutterBottom
                  >
                    {notificationPPCount}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </MenuItem>
        )}
        {notificationViewCount && (
          <MenuItem className="notific-list-item" onClick={() => {}}>
            <Grid container>
              <Grid item xs={1} className="">
                <img
                  src="../../static/images/icons/Profile_Notification.svg"
                  alt="View Icon"
                  title="View Icon"
                />
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={8}>
                <Typography variant="button" gutterBottom>
                  Profile Views
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <div className="list-item-count">
                  <Typography
                    variant="button"
                    // className="list-item-count"
                    gutterBottom
                  >
                    {" "}
                    {notificationViewCount}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </MenuItem>
        )}
      </MenuList> */}
    </>
    //   <CustomScrollbars
    //     className="messages-list scrollbar"
    //     style={{ height: 280 }}
    //   >
    //      <ul className="list-unstyled">
    //       {notifications.map((notification, index) => (
    //         <NotificationItem key={index} notification={notification} />
    //       ))}
    //     </ul>
    //  </CustomScrollbars>
  );
};

export default AppNotification;
