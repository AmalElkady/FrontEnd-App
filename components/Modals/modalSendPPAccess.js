import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";

import {
  openModalSendPP,
  permissionPPReadRemove,
  permissionPPReadRemoveSuccess
} from "../../actions/Profile";

///Modal
import PropTypes from "prop-types";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useSpring, animated } from "react-spring/web.cjs";
/////
import Grid from "@material-ui/core/Grid";
import IntlMessages from "../../util/IntlMessages";
import Button from "@material-ui/core/Button";
import "react-phone-input-2/lib/style.css";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
const useStyles = makeStyles(theme => ({
  ///modal
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  positionR: {
    position: "relative",
    padding: "1rem .5rem 2rem .5rem"
  },
  positionA: {
    position: "absolute",
    right: ".5rem",
    bottom: "0"
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

export default function ModalSendPPAccess({ id, co, ci, va }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  ////// modal
  const [open, setOpen] = useState(false);

  const OpenModalSendPP = useSelector(state => state.profile.openModalSendPP);
  const permissionReadPP = useSelector(state => state.profile.permissionReadPP);

  useEffect(() => {
    if (OpenModalSendPP) {
      handleOpen();
    }
  }, [OpenModalSendPP]);

  useEffect(() => {
    if (permissionReadPP==true) {
      NotificationManager.success("Your Request Sent Successfully", "Success");
       handleClose();
    } else if (permissionReadPP == "error") {
      NotificationManager.error("Request already sent");
       handleClose();
    }
    dispatch(permissionPPReadRemoveSuccess(false));
  }, [permissionReadPP]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    dispatch(openModalSendPP(false));
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
          {/* <div className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3"> */}
          <div className="app-login-main-content">
            <div className="app-login-content-2">
              <div className="app-login-header">
                <h2>
                  <IntlMessages id="profile.notAuthorized" />
                </h2>
              </div>

              <div className="app-login-form">
                <form method="post" className={classes.positionR}>
                  <div className="mb-3 d-flex align-items-center justify-content-between">
                    <Button
                      variant="contained"
                      onClick={() => {
                        handleClose();
                      }}
                      color="primary"
                      className="linear-g-r"
                    >
                      <IntlMessages id="appModule.cancel" />
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        dispatch(permissionPPReadRemove(0, id, co, ci, va));
                      }}
                      color="primary"
                      className="linear-g-r"
                    >
                      <IntlMessages id="profile.sendPP" />
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* </div> */}

          {/* </form> */}
        </Fade>
      </Modal>
      {/*  */}
    </>
  );
}
