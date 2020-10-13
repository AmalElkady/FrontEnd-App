import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

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
    maxWidth: "20%"
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
  ///modal
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "px",
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

export default function UserCard() {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const imgURL = "../../../static/images/avatar.png";

  ////// modal
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //////

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Card className={classes.root}>
        {/* <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      /> */}
        <CardMedia className={classes.media} image={imgURL} title="userPhoto" />
        <CardContent>
          <Typography variant="h6" color="textSecondary" component="p">
            User Name
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Address
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Age
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="Love">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Send Message" onClick={handleOpen}>
            <ChatBubbleIcon />
          </IconButton>
          <IconButton aria-label="View Profile">
            <VisibilityIcon />
          </IconButton>

          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Details</Typography>
            <Typography paragraph>more informations</Typography>
          </CardContent>
        </Collapse>
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
