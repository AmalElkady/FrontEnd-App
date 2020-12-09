import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import Router from "next/router";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import { COUNTRY_CITY_MAP, ARRAY_OF_AGE_RANGE } from "../../../util/data";
import { red } from "@material-ui/core/colors";

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

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: "20%",
    cursor: "pointer",
    margin: "1.5rem",
    "@media only screen and (min-width: 1099px) ": {
      maxWidth: "20%"
    },
    "@media only screen and (max-width: 1099px) ": {
      maxWidth: "30%"
    },
    "@media (max-width:700px)": {
      maxWidth: "100%"
    }
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
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
  iconBtn: {
    width: "30%",
    padding: 0
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
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    backgroundColor: "#04a304",
    marginRight: ".5rem",
    display: "inline-block"
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
  const searchState = useSelector(state => state.home.searchState);

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

  return (
    <>
      <Card
        className={classes.root}
        onClick={() => {
          user.timeScore = timeScore;
          Router.push({ pathname: "/home/profile", query: user });
        }}
      >
        <CardMedia className={classes.media} image={user._} title="userPhoto" />
        <CardContent>
          <Typography variant="h6" color="textSecondary" component="p">
            {searchState == "active" && (
              <div className={classes.onlineFlag}></div>
            )}
            {user.n}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {user.b
              ? `${moment().diff(user.b, "years")} Years Old`
              : `${moment().diff(
                  timeScore.substring(0, 8),
                  "years"
                )} Years Old`}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {user.co}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {user.ci
              ? COUNTRY_CITY_MAP[user.co.toLowerCase()][user.ci - 1]
              : ""}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            className={classes.iconBtn}
            aria-label="Love"
            // onClick={handleClickLove}
          >
            {/* <FavoriteIcon /> */}
            <LoveIcon />
          </IconButton>
          <IconButton
            className={classes.iconBtn}
            aria-label="Send Message"
            onClick={handleOpen}
          >
            {/* <ChatBubbleIcon /> */}
            <ChatIcon />
          </IconButton>
          <IconButton className={classes.iconBtn} aria-label="View Profile">
            {/* <VisibilityIcon /> */}
            <ViewProIcon />
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
