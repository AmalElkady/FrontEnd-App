import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import Router from "next/router";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import { calcOfflineTime } from "../../../helpers/calcOfflineTime";
import { OfflineTimeInArabic } from "../../../helpers/offlineTimeInArabic";
import {
  COUNTRY_CITY_MAP,
  ARRAY_OF_AGE_RANGE,
  COUNTRY_MAP
} from "../../../util/data";
import {
  sendLoveMatchRequest,
  sendLoveMatchRequestSuccess,
  clickedId
} from "../../../actions/Interaction";
import { clickedUserChat } from "../../../actions/Messages";
import { red } from "@material-ui/core/colors";
import { NotificationManager } from "react-notifications";

import FavoriteIcon from "@material-ui/icons/Favorite";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import ChatIcon from "../../Icons/ChatIcon";
import LoveIcon from "../../Icons/LoveIcon";
import ViewProIcon from "../../Icons/ViewProIcon";
///Modal
import PropTypes from "prop-types";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useSpring, animated } from "react-spring/web.cjs";
/////
import TextField from "@material-ui/core/TextField";
import IntlMessages from "../../../util/IntlMessages";
import Button from "@material-ui/core/Button";
import Flag from "react-world-flags";

const useStyles = makeStyles(theme => ({
  root: {
    width: "20%",
    cursor: "pointer",
    borderRadius: "3rem",
    border: "2.5px solid #d91f5b",
    margin: "1.5rem",
    // "@media only screen and (min-width: 1099px) ": {
    //   maxWidth: "20%"
    // },
    // "@media only screen and (max-width: 1099px) ": {
    //   maxWidth: "30%"
    // },
    "@media screen and (max-width: 575px) ": {
      width: "100%"
    }
  },
  media: {
    height: 0,
    paddingTop: "90%", // 16:9
    position: "relative"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  },
  cardContent: {
    position: "absolute",
    bottom: 0,
    backgroundImage: "linear-gradient(to top, white, transparent)",
    width: "100%",
    color: "#d61f5f",
    paddingBottom: "0 !important",
    height: "9rem",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    justifyContent: "flex-end"
  },
  iconsContainer: {
    //   backgroundColor: #d61f5f;
    justifyContent: "space-around",
    padding: "1rem 2rem"
  },
  iconBtn: {
    width: "25%",
    padding: 0
  },
  dFlex: {
    display: "flex",
    justifyContent: "space-between"
  },
  rowW: {
    width: "35%"
  },
  rowP: {
    padding: "0 .5rem .5rem 0"
  },
  fontW: {
    fontWeight: "600"
  },
  ///modal
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "3px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  displayB: {
    display: "block"
  },
  positionR: {
    position: "relative",
    padding: "1rem .5rem 2rem .5rem"
  },
  positionA: {
    position: "absolute",
    right: ".5rem",
    bottom: "-1rem"
  },
  onlineFlag: {
    width: "1rem",
    height: "1rem",
    borderRadius: "50%",
    backgroundColor: "#04a304",
    marginRight: ".5rem",
    display: "inline-block",
    boxShadow: "1px 0px 10px #046104"
  }
  ////
}));

////// modal
const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    }
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func
};

export default function UserCard({ user, timeScore }) {
  const classes = useStyles();
  const [clickLove, setClickLove] = useState(false);
  const locale = useSelector(state => state.settings.locale);
  const searchState = useSelector(state => state.home.searchState);
  const LoveMatchRequestSend = useSelector(
    state => state.interaction.sendLoveMatchRequest
  );
  const Clicked_id = useSelector(state => state.interaction.clicked_id);
  const dispatch = useDispatch();

  ////// modal
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickLove = () => {
    setlickLove(!clickLove);
  };

  useEffect(() => {
    if (user) {
      user.flag = "read";
    }
  }, []);
  useEffect(() => {
    if (Clicked_id == user.i) {
      if (LoveMatchRequestSend == true) {
        NotificationManager.success("Love Sent successfully");
      } else if (LoveMatchRequestSend == "error") {
        NotificationManager.error("love already sent ");
      }

      dispatch(clickedId(null));
      dispatch(sendLoveMatchRequestSuccess(false));
    }
  }, [LoveMatchRequestSend]);

  return (
    <>
      <Card className={`${classes.root} linear-g-r`}>
        <CardMedia className={classes.media} image={user._} title="userPhoto">
          <CardContent className={classes.cardContent}>
            {searchState == "most recent" && (
              <Typography
                variant="body1"
                component="p"
                className={classes.fontW}
              >
                {locale.locale == "ar" &&
                  OfflineTimeInArabic(calcOfflineTime(timeScore))}
                {locale.locale != "ar" && calcOfflineTime(timeScore)}
              </Typography>
            )}
            <div className={classes.dFlex}>
              <Typography
                variant="body1"
                component="p"
                className={classes.fontW}
              >
                {searchState == "active" && (
                  <div className={classes.onlineFlag}></div>
                )}
                {user.n}
              </Typography>

              <div className={`${classes.rowW} d-flex`}>
                <div className="profile-icon-flag-2">
                  <Flag code={user.co} />
                </div>
                <Typography
                  variant="body1"
                  gutterBottom
                  className={classes.fontW}
                >
                  {COUNTRY_MAP[user.co]}
                </Typography>
              </div>
            </div>
            <div className={classes.dFlex}>
              <Typography
                variant="body1"
                component="p"
                className={classes.rowP + " " + classes.fontW}
              >
                {user.b ? (
                  <>
                    {moment().diff(user.b, "years")}{" "}
                    <IntlMessages id="appModule.age" />
                  </>
                ) : (
                  <>
                    {moment().diff(timeScore.substring(0, 8), "years")}{" "}
                    <IntlMessages id="appModule.age" />
                  </>
                )}
              </Typography>
              <Typography
                variant="body1"
                className={`${classes.rowW} ${classes.rowP} ${classes.fontW} d-flex`}
                component="p"
              >
                <div className="profile-icon-flag-2" style={{ width: "12%" }}>
                  <img src="../../../static/images/icons/Location_Icon_2.svg" />
                </div>
                {user.ci
                  ? COUNTRY_CITY_MAP[user.co.toLowerCase()][user.ci - 1]
                  : ""}
              </Typography>
            </div>
          </CardContent>
        </CardMedia>

        <CardActions
          disableSpacing
          className={`${classes.iconsContainer} linear-g-r`}
        >
          <IconButton
            className={classes.iconBtn}
            id={user.i}
            aria-label="Love"
            onClick={event => {
              dispatch(clickedId(user.i));
              dispatch(sendLoveMatchRequest(user.i, user.co, user.ci, user.va));
            }}
          >
            {/* <FavoriteIcon /> */}
            {/* <LoveIcon /> */}
            {/* <i className="zmdi zmdi-notifications-none icon-alert animated infinite wobble" /> */}
            <img
              src="../../../static/images/icons/standard/Love_Icon_Standard.svg"
              alt="Love Icon"
            />
          </IconButton>
          <IconButton
            className={classes.iconBtn}
            onClick={() => {
              user.timeScore = timeScore;
              Router.push({ pathname: `/home/profile`, query: user });
            }}
            aria-label="View Profile"
          >
            {/* <VisibilityIcon /> */}
            {/* <ViewProIcon /> */}
            <img
              src="../../../static/images/icons/Profile_Icon.svg"
              alt="Notifications"
            />
          </IconButton>

          <IconButton
            className={classes.iconBtn}
            aria-label="Send Message"
            // onClick={handleOpen}
            onClick={() => {
              dispatch(clickedUserChat(user));
              Router.push({ pathname: `/home/messages` });
            }}
          >
            {/* <ChatBubbleIcon /> */}
            {/* <ChatIcon /> */}
            <img
              src="../../../static/images/icons/standard/Messages_Icon_Standard.svg"
              alt="Notifications"
            />
          </IconButton>
        </CardActions>
      </Card>

      {/*  */}
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <form className={classes.positionR} noValidate autoComplete="off">
              <TextField
                id="outlined-basic"
                label={<IntlMessages id="appModule.yourMessage" />}
                variant="outlined"
                className={classes.displayB}
              />
              <Button
                className={classes.positionA}
                onClick={() => {}}
                variant="contained"
                color="primary"
              >
                <IntlMessages id="appModule.sendMessage" />
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
      {/*  */}
    </>
  );
}
