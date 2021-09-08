import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { resetCheckMpUpload } from "../../actions/Auth";

///Modal
import PropTypes from "prop-types";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useSpring, animated } from "react-spring/web.cjs";
/////
import Typography from "@material-ui/core/Typography";
import IntlMessages from "../../util/IntlMessages";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  ///modal
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "1rem",
    boxShadow: theme.shadows[5],
    // padding: "1rem",
    position: "relative"
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

export default function ModalUpload() {
  const classes = useStyles();
  const dispatch = useDispatch();

  ////// modal
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
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
            <div className="logo-form">
              <img
                src="../../static/images/Gila_Final_Logo_form.svg"
                alt="App"
                title="App"
              />
            </div>
            <form className={classes.positionR} noValidate autoComplete="off">
              <Typography variant="h6" gutterBottom>
                <IntlMessages id="appModule.uploadNewPhotoMessage" />
              </Typography>
              <Button
                className={classes.positionA}
                onClick={() => {
                  dispatch(resetCheckMpUpload());
                }}
                variant="contained"
                color="primary"
              >
                <IntlMessages id="appModule.uploadNewPhoto" />
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
      {/*  */}
    </>
  );
}
