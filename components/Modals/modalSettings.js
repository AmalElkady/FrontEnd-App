import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";

import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";

import { resetPhonechangeFlag } from "../../actions/Auth";
import {
  openModal,
  changeUserLoginPhone,
  changeUserLoginPhoneSuccess,
  changeMyPassword,
  changeMyPasswordSuccess,
  verifyUserLoginPhoneChange,
  verifyUserLoginPhoneChangeSuccess,
  deleteMyAccount
} from "../../actions/Profile";
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
import { ARRAYS_OF_REASONS } from "../../util/data";
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
import Subscribe from "../../containers/Subscribe";
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

export default function ModalSettings({
  phone,
  password,
  sub,
  deleteAcc,
  report
}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  ////// modal
  const [open, setOpen] = useState(false);
  const [Phone, setPhone] = useState("");

  const [comment, setComment] = useState("");
  const [reason, setReason] = useState({
    0: false,
    1: false,
    2: false
  });

  const [oldPass, setOldPass] = useState(null);
  const [newPass, setNewPass] = useState(null);
  const [verifyPhone, setVerifyPhone] = useState(null);
  const [verificationCode, seteVrificationCode] = useState(null);
  const [agreeVal, setAgreeVal] = useState(null);
  const [passForDel, setPassForDel] = useState(null);
  const [openDelPass, setOpenDelPass] = useState(false);

  const OpenModal = useSelector(state => state.profile.openModal);
  const countryiso2 = useSelector(state => state.auth.countryiso2);
  const loginPhoneChanged = useSelector(
    state => state.profile.loginPhoneChanged
  );
  const passwordChanged = useSelector(state => state.profile.passwordChanged);
  const verifyLoginPhoneChanged = useSelector(
    state => state.profile.verifyLoginPhoneChanged
  );

  useEffect(() => {
    if (phone) {
      setPhone(phone);
    }
  }, []);
  useEffect(() => {
    if (OpenModal) {
      handleOpen();
    }
  }, [OpenModal]);

  useEffect(() => {
    if (loginPhoneChanged) {
      NotificationManager.success(<IntlMessages id="setting.verifCode" />);
      setVerifyPhone(true);
      dispatch(changeUserLoginPhoneSuccess(false));
      // handleClose();
    }
  }, [loginPhoneChanged]);

  useEffect(() => {
    if (verifyLoginPhoneChanged) {
      NotificationManager.success(<IntlMessages id="setting.phoneChange" />);
      dispatch(verifyUserLoginPhoneChangeSuccess(false));
      handleClose();
    }
  }, [verifyLoginPhoneChanged]);

  useEffect(() => {
    if (passwordChanged && passwordChanged != "error") {
      NotificationManager.success(<IntlMessages id="setting.passChange" />);
      dispatch(changeMyPasswordSuccess(false));
      setNewPass(null);
      handleClose();
    } else if (passwordChanged == "error" && newPass != null) {
      NotificationManager.error(<IntlMessages id="setting.oldPass" />);
      dispatch(changeMyPasswordSuccess(false));
      setNewPass(null);
      handleClose();
    }
  }, [passwordChanged]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(openModal(false));
  };

  const handleChangePhone = value => {
    setPhone(value);
  };

  const handleChangeReason = event => {
    console.log(
      "clicked reason ",
      event.target.name,
      event.target.checked,
      reason
    );
    setReason({ ...reason, [event.target.name]: event.target.checked });
  };

  const checkReasonValues = () => {
    for (var i in reason) {
      if (reason[i] === true) {
        return true;
      }
    }
    return false;
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
          <div
            className={
              deleteAcc && openDelPass == false
                ? "app-login-main-content confirm-del"
                : "app-login-main-content"
            }
          >
            <div
              className="app-login-content-2"
              style={sub ? { height: "42rem", overflow: "scroll" } : {}}
            >
              <div className="app-login-header">
                <h2>
                  {phone && verifyPhone == null && (
                    <IntlMessages id="appModule.changeYourPhone" />
                  )}
                  {password && <IntlMessages id="settings.changePass" />}
                  {verifyPhone && <IntlMessages id="appModule.verifyPhone" />}
                  {sub && <IntlMessages id="settings.renewSub" />}
                  {deleteAcc && openDelPass == false && (
                    <IntlMessages id="settings.preDelete" />
                  )}
                  {report && openDelPass == false && (
                    <IntlMessages id="settings.report" />
                  )}
                </h2>
                <h2>
                  {" "}
                  {phone && (
                    <>
                      {Phone}
                      {/* <IconButton
                        aria-label="Edit"
                        onClick={handleOpenEdit}
                        className="edit-icon-2 linear-g-r"
                      >
                        <EditIcon fontSize="small"></EditIcon>
                      </IconButton> */}
                    </>
                  )}
                </h2>
              </div>
              {sub && (
                <>
                  <Subscribe renew={true} />
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
                </>
              )}

              {deleteAcc && openDelPass == false && (
                <>
                  <div>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Pellentesque bibendum fermentum purus gravida elementum.
                      Duis blandit nisi ut mi pellentesque pretium. Donec
                      bibendum volutpat est, id varius sem. Integer nisl ex,
                      ultricies et molestie quis, imperdiet sed augue. Maecenas
                      eget dignissim mauris. Sed egestas enim turpis. Quisque
                      ante erat, tristique eu elementum feugiat, vehicula eu
                      ante. Mauris nec lectus volutpat, facilisis risus sed,
                      vulputate velit.
                    </Typography>
                  </div>

                  <FormControl component="fieldset">
                    <RadioGroup
                      row
                      aria-label="position"
                      name="position"
                      defaultValue="disagree"
                    >
                      <FormControlLabel
                        value="disagree"
                        control={<Radio color="primary" />}
                        label={<IntlMessages id="settings.disagree" />}
                        onChange={event => {
                          setAgreeVal(event.target.value);
                        }}
                      />
                      <FormControlLabel
                        value="agree"
                        control={<Radio color="primary" />}
                        label={<IntlMessages id="settings.agree" />}
                        onChange={event => {
                          setAgreeVal(event.target.value);
                        }}
                      />
                    </RadioGroup>
                  </FormControl>
                  <div className="mb-3 d-flex align-items-center justify-content-between">
                    {/* <Grid container>
    <Grid item xs={9} className="m-s" > */}
                    <Button
                      variant="contained"
                      onClick={() => {
                        setAgreeVal(null);
                        handleClose();
                      }}
                      color="primary"
                      className="linear-g-r"
                    >
                      <IntlMessages id="appModule.cancel" />
                    </Button>
                    {agreeVal == "agree" && (
                      <Button
                        variant="contained"
                        onClick={() => {
                          setAgreeVal(null);
                          setOpenDelPass(true);
                        }}
                        color="primary"
                        className="linear-g-r"
                      >
                        <IntlMessages id="settings.confirmDel" />
                      </Button>
                    )}
                  </div>
                </>
              )}

              <div className="app-login-form">
                {password && (
                  <>
                    <form method="post">
                      <Grid container>
                        <Grid item xs={12}>
                          <TextField
                            type="password"
                            onChange={event => setOldPass(event.target.value)}
                            label={<IntlMessages id="settings.oldPassword" />}
                            fullWidth
                            defaultValue={oldPass}
                            margin="normal"
                            className="mt-0 mb-3 to-right"
                            required
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            type="password"
                            onChange={event => setNewPass(event.target.value)}
                            label={<IntlMessages id="settings.newPassword" />}
                            fullWidth
                            defaultValue={newPass}
                            margin="normal"
                            className="mt-0 mb-3 to-right"
                            required
                          />
                        </Grid>
                        {/* <div className="mb-3 d-flex align-items-center justify-content-between"> */}
                        <Grid item xs={6}>
                          <Button
                            variant="contained"
                            onClick={() => {
                              setOpenEdit(false);
                              handleClose();
                            }}
                            color="primary"
                            className="linear-g-r"
                          >
                            <IntlMessages id="appModule.cancel" />
                          </Button>
                        </Grid>
                        {oldPass && newPass && (
                          <Grid item xs={6} style={{ textAlign: "end" }}>
                            <Button
                              variant="contained"
                              onClick={() => {
                                console.log("change pass ", oldPass, newPass);

                                dispatch(changeMyPassword(oldPass, newPass));
                              }}
                              color="primary"
                              className="linear-g-r"
                            >
                              <IntlMessages id="appModule.change" />
                            </Button>
                          </Grid>
                        )}
                        {/* </div> */}
                      </Grid>
                    </form>
                  </>
                )}
                {phone && verifyPhone == null && (
                  <form method="post" className={classes.positionR}>
                    {/* old phone */}
                    <Grid
                      container
                      spacing={12}
                      style={{ minWidth: "149px", paddingBottom: "9px" }}
                    >
                      <Grid item xs={12}>
                        <InputLabel
                          id="phone-label"
                          style={{ paddingBottom: "7px" }}
                        >
                          <IntlMessages id="inputLabel.changePhone" />
                        </InputLabel>
                      </Grid>
                      <Grid item xs={12}>
                        <PhoneInput
                          onlyCountries={[
                            "gb",
                            "us",
                            "fr",
                            "de",
                            "eg",
                            "ma",
                            "sa",
                            "dz",
                            "bh",
                            "kw",
                            "tn",
                            "ae",
                            "my",
                            "mr",
                            "af"
                          ]}
                          countryCodeEditable={true}
                          disableCountryCode={true}
                          country={countryiso2}
                          value={Phone}
                          placeholder={""}
                          onChange={value => {
                            console.log("valueee ", value);
                            handleChangePhone(value);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          type="password"
                          onChange={event => setOldPass(event.target.value)}
                          label={<IntlMessages id="settings.oldPassword" />}
                          fullWidth
                          defaultValue={oldPass}
                          margin="normal"
                          className="mt-0 mb-3 to-right"
                          required
                        />
                      </Grid>
                    </Grid>

                    <div className="mb-3 d-flex align-items-center justify-content-between">
                      <Button
                        variant="contained"
                        onClick={() => {
                          setOpenEdit(false);
                          handleClose();
                        }}
                        color="primary"
                        className="linear-g-r"
                      >
                        <IntlMessages id="appModule.cancel" />
                      </Button>
                      {Phone && oldPass && (
                        <Button
                          variant="contained"
                          onClick={() => {
                            console.log(
                              "change phone ",
                              Phone.slice(1, Phone.length),
                              oldPass
                            );
                            dispatch(
                              changeUserLoginPhone(
                                Phone.slice(1, Phone.length),
                                oldPass
                              )
                            );
                          }}
                          color="primary"
                          className="linear-g-r"
                        >
                          <IntlMessages id="appModule.change" />
                        </Button>
                      )}
                    </div>
                  </form>
                )}
                {verifyPhone != null && (
                  <form method="post">
                    <TextField
                      type="number"
                      onChange={event =>
                        seteVrificationCode(event.target.value)
                      }
                      label={<IntlMessages id="appModule.verificationCode" />}
                      fullWidth
                      defaultValue={verificationCode}
                      margin="normal"
                      className="mt-0 mb-2 to-right"
                      required
                    />

                    <div className="mb-3 d-flex align-items-center justify-content-between">
                      {/* <Grid container>
    <Grid item xs={9} className="m-s" > */}
                      <Button
                        variant="contained"
                        onClick={() => {
                          setVerifyPhone(null);
                          handleClose();
                        }}
                        color="primary"
                        className="linear-g-r"
                      >
                        <IntlMessages id="appModule.cancel" />
                      </Button>
                      {/* </Grid>
    <Grid item xs={2}> */}
                      {verificationCode && (
                        <Button
                          variant="contained"
                          onClick={() => {
                            console.log("verificationCode ", verificationCode);
                            setVerifyPhone(null);
                            dispatch(
                              verifyUserLoginPhoneChange(verificationCode)
                            );
                          }}
                          color="primary"
                          className="linear-g-r"
                        >
                          <IntlMessages id="appModule.submit" />
                        </Button>
                      )}
                      {/* </Grid>
     </Grid> */}
                      {/* {phoneVerified && window.location.reload()} */}
                    </div>
                  </form>
                )}
                {deleteAcc && openDelPass == true && (
                  <form method="post">
                    <Grid container>
                      <Grid item xs={12}>
                        <TextField
                          type="password"
                          onChange={event => setPassForDel(event.target.value)}
                          label={<IntlMessages id="settings.yourPassword" />}
                          fullWidth
                          defaultValue={passForDel}
                          margin="normal"
                          className="mt-0 mb-3 to-right"
                          required
                        />
                      </Grid>
                      <Grid item xs={6}>
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
                      </Grid>
                      {passForDel && (
                        <Grid item xs={6} style={{ textAlign: "end" }}>
                          <Button
                            variant="contained"
                            onClick={() => {
                              console.log("pass ", passForDel);

                              dispatch(deleteMyAccount(passForDel));
                            }}
                            color="primary"
                            className="linear-g-r"
                          >
                            <IntlMessages id="appModule.submit" />
                          </Button>
                        </Grid>
                      )}
                    </Grid>
                  </form>
                )}

                {report && (
                  <>
                    <form method="post">
                      <Grid container>
                        <Grid item xs={12}>
                          <InputLabel id="reason-label">
                            <IntlMessages id="report.reason" />
                          </InputLabel>
                          <FormGroup>
                            {ARRAYS_OF_REASONS.map((value, i) => (
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={reason.i}
                                    onChange={handleChangeReason}
                                    name={i}
                                  />
                                }
                                label={value}
                              />
                            ))}
                          </FormGroup>
                        </Grid>
                        <Grid item xs={12}>
                          <InputLabel
                            id="comment-label"
                            style={{ marginBottom: ".5rem" }}
                          >
                            <IntlMessages id="report.comment" />
                          </InputLabel>
                          <TextareaAutosize
                            onChange={event => {
                              setComment(event.target.value);
                            }}
                            aria-label="minimum height"
                            defaultValue={comment}
                            rowsMin={3}
                            name="comment"
                            style={{ width: "100%" }}
                            required
                          />
                        </Grid>
                        {/* <div className="mb-3 d-flex align-items-center justify-content-between"> */}
                        <Grid item xs={6}>
                          <Button
                            variant="contained"
                            onClick={() => {
                              // setOpenEdit(false);
                              handleClose();
                            }}
                            color="primary"
                            className="linear-g-r"
                          >
                            <IntlMessages id="appModule.cancel" />
                          </Button>
                        </Grid>
                        {comment != "" && checkReasonValues() && (
                          <Grid item xs={6} style={{ textAlign: "end" }}>
                            <Button
                              variant="contained"
                              onClick={() => {
                                console.log("submit report ", comment, reason);

                                // dispatch(changeMyPassword(oldPass, newPass));
                              }}
                              color="primary"
                              className="linear-g-r"
                            >
                              <IntlMessages id="report.submit" />
                            </Button>
                          </Grid>
                        )}
                        {/* </div> */}
                      </Grid>
                    </form>
                  </>
                )}
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
