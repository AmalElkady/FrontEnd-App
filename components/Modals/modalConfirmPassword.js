import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import Router from "next/router";
import {
  userSignOut,
  userSignIn,
  userAddProfileL2,
  confirmPasswordCase,
  showAuthLoader
} from "../../actions/Auth";
import { openModal } from "../../actions/Profile";
import {
  COUNTRY_CODE_TO_NAME_MAP,
  COUNTRY_CITY_MAP,
  COUNTRY_CITY_MAP_VALUE
} from "../../util/data";

///Modal
import PropTypes from "prop-types";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useSpring, animated } from "react-spring/web.cjs";
/////
import Grid from "@material-ui/core/Grid";
import IntlMessages from "../../util/IntlMessages";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import { styled } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Radio from "@material-ui/core/Radio";
import PhoneInput from "react-phone-input-2";
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
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "1rem",
    boxShadow: theme.shadows[5],
    // padding: "1rem",
    position: "relative"
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

export default function ModalConfirmPassword({
  phone,
  country,
  tpercent,
  nationality,
  workd,
  title,
  education,
  bio
}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  ////// modal
  const [open, setOpen] = useState(true);
  const [password, setPassword] = useState("");

  const OpenModal = useSelector(state => state.profile.openModal);
  //const phoneChangedBefore = useSelector(state => state.auth.phoneChangedBefore);

  useEffect(() => {
    console.log(
      "first dataaaaa phone ",
      phone,
      country,
      tpercent,
      nationality,
      workd,
      title,
      education,
      bio
    );
  }, []);
  useEffect(() => {
    if (OpenModal) {
      handleOpen();
    }
  }, [OpenModal]);

  //   useEffect(() => {
  //     if (phoneChangedBefore) {
  //         NotificationManager.success('Your phone changed successfully', 'Success');
  //        dispatch(resetPhonechangeFlag());
  //       handleClose();
  //     }
  //   }, [phoneChangedBefore]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(openModal(false));
  };
  const StyledFormControl = styled(FormControl)({
    formControl: {
      margin: 2,
      "& select": {
        paddingRight: "22px"
      }
    },
    selectEmpty: {
      marginTop: 0
    }
  });

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
          <div className={classes.paper}>
            <div className="logo-form">
              <img
                src="../../static/images/Gila_Final_Logo_form.svg"
                alt="App"
                title="App"
              />
            </div>
            {/* <div className="app-login-main-content"> */}
              <div className="app-login-content-2">
                <div className="app-login-header">
                  <h2>
                    <IntlMessages id="appModule.confirmPassword" />
                  </h2>
                  <h2> {`+${country} ${phone}`}</h2>
                </div>

                <div className="app-login-form">
                  <form method="post" className={classes.positionR}>
                    <Grid
                      container
                      spacing={12}
                      style={{ minWidth: "149px", paddingBottom: "9px" }}
                    >
                      <Grid
                        item
                        xs={12}
                        style={{ minWidth: "90px", paddingRight: "18px" }}
                      >
                        <TextField
                          type="password"
                          onChange={event => setPassword(event.target.value)}
                          label={<IntlMessages id="inputLabel.password" />}
                          fullWidth
                          defaultValue={password}
                          margin="normal"
                          className="mt-0 mb-3 to-right"
                        />
                      </Grid>
                    </Grid>

                    <div className="mb-3 d-flex align-items-center justify-content-between">
                      {/* <Button
                        variant="contained"
                        onClick={() => {
                          setOpenEdit(false);
                          handleClose();
                        }}
                        color="primary"
                        className="linear-g-r"
                      >
                        <IntlMessages id="appModule.cancel" />
                      </Button> */}
                      <Button
                        variant="contained"
                        onClick={() => {
                          console.log("confirm password");
                          console.log("phone ", phone);
                          console.log("country ", country);
                          console.log("password ", password);

                          dispatch(showAuthLoader());
                          dispatch(
                            userAddProfileL2({
                              tpercent,
                              nationality,
                              workd,
                              title,
                              education,
                              bio
                            })
                          );
                          //*logout
                          // dispatch(userSignOut());
                          //* login
                          // dispatch(
                          //   userSignIn({
                          //     phone,
                          //     password,
                          //     country
                          //   })
                          // );
                          dispatch(confirmPasswordCase(false));
                        }}
                        color="primary"
                        className="linear-g-r"
                      >
                        <IntlMessages id="appModule.confirm" />
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            {/* </div> */}
            {/* </div> */}

            {/* </form> */}
          </div>
        </Fade>
      </Modal>
      {/*  */}
    </>
  );
}
