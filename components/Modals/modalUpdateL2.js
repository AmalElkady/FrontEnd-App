import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { resetCheckMpUpload } from "../../actions/Auth";
import { openModal, updateProfileL2 } from "../../actions/Profile";
import {
  COUNTRY_CODE_TO_NAME_MAP,
  ARRAY_OF_WORKD,
  ARRAYS_OF_TPERCENT,
  ARRAYS_OF_TPERCENT_VALUES
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
import { styled } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Radio from "@material-ui/core/Radio";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
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

export default function ModalUploadL2({ data }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  ////// modal
  const [open, setOpen] = useState(false);
  const [nationality, setNationality] = useState("");
  const [tpercent, setTpercent] = useState("");
  const [workd, setWorkd] = useState("");
  const [title, setTitle] = useState("");
  const [education, setEdu] = useState("");
  const [bio, setBio] = useState("");

  const OpenModal = useSelector(state => state.profile.openModal);
  const country = useSelector(state => state.auth.country);
  const gender = useSelector(state => state.auth.gender);
  useEffect(() => {
    console.log("first dataaaaa ", data);
    setNationality(data.nationality);
    setEdu(data.education);
    setWorkd(data.workd);
    setTitle(data.title);
    setBio(data.bio);
    if (data.tpercent) {
      setTpercent(data.tpercent);
    }
  }, []);
  useEffect(() => {
    if (OpenModal) {
      handleOpen();
    }
  }, [OpenModal]);

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
                    <IntlMessages id="appModule.profileL2Update" />
                  </h2>
                </div>

                <div className="app-login-form">
                  <form method="post" className={classes.positionR}>
                    {/* nationality */}
                    <Grid
                      container
                      spacing={12}
                      style={{ minWidth: "149px", paddingBottom: "9px" }}
                    >
                      <Grid item xs={12}>
                        <InputLabel
                          id="nationality-label"
                          style={{ paddingBottom: "7px" }}
                        >
                          <IntlMessages id="inputLabel.nationality" />
                        </InputLabel>
                      </Grid>
                      <Grid item xs={12}>
                        <PhoneInput
                          countryCodeEditable={false}
                          disableCountryCode={true}
                          country={
                            COUNTRY_CODE_TO_NAME_MAP[nationality] ||
                            COUNTRY_CODE_TO_NAME_MAP[country] ||
                            COUNTRY_CODE_TO_NAME_MAP["+" + country]
                          }
                          value={country}
                          placeholder={"Choose Country"}
                          readonly={"readonly"}
                          onChange={(value, country, e, formattedValue) => {
                            setNationality(country.countryCode);
                          }}
                        />
                      </Grid>
                    </Grid>
                    {/* tPercent */}
                    {!gender && (
                      <Grid
                        container
                        spacing={12}
                        style={{
                          minWidth: "149px",
                          paddingTop: "9px",
                          paddingBottom: "9px"
                        }}
                      >
                        <Grid item xs={12}>
                          <InputLabel id="tpercent-label">
                            <IntlMessages id="inputLabel.tpercent" />
                          </InputLabel>
                        </Grid>
                        <Grid item xs={12}>
                          <StyledFormControl style={{ minWidth: "149px" }}>
                            <Select
                              labelId="tpercent-label"
                              id="tpercent"
                              value={tpercent}
                              onChange={event => {
                                setTpercent(event.target.value);
                              }}
                              name="tpercent"
                            >
                              {ARRAYS_OF_TPERCENT.map((value, i) => (
                                <MenuItem
                                  key={ARRAYS_OF_TPERCENT_VALUES[i]}
                                  value={ARRAYS_OF_TPERCENT_VALUES[i]}
                                  control={<Radio />}
                                  label={value}
                                >
                                  {value}
                                </MenuItem>
                              ))}

                              {/* <MenuItem
                              key={1}
                              value={1}
                              control={<Radio />}
                              label={"With no conditions"}
                            >
                              {"With no conditions"}
                            </MenuItem>

                            <MenuItem
                              key={2}
                              value={2}
                              control={<Radio />}
                              label={"With conditions"}
                            >
                              {"With conditions"}
                            </MenuItem> */}
                            </Select>
                          </StyledFormControl>
                        </Grid>
                      </Grid>
                    )}

                    <Grid
                      container
                      spacing={12}
                      style={{
                        minWidth: "149px",
                        paddingTop: "9px",
                        paddingBottom: "9px"
                      }}
                    >
                      <Grid item xs={12}>
                        <InputLabel id="education-label">
                          <IntlMessages id="inputLabel.education" />
                        </InputLabel>
                      </Grid>
                      <Grid item xs={12}>
                        <StyledFormControl style={{ minWidth: "149px" }}>
                          <Select
                            labelId="education-label"
                            id="education"
                            value={education}
                            onChange={event => {
                              setEdu(event.target.value);
                            }}
                            name="education"
                          >
                            <MenuItem
                              key={"1"}
                              value={"1"}
                              control={<Radio />}
                              label={<IntlMessages id="education.1" />}
                            >
                              {<IntlMessages id="education.1" />}
                            </MenuItem>
                            <MenuItem
                              key={"2"}
                              value={"2"}
                              control={<Radio />}
                              label={<IntlMessages id="education.2" />}
                            >
                              {<IntlMessages id="education.2" />}
                            </MenuItem>
                            <MenuItem
                              key={"3"}
                              value={"3"}
                              control={<Radio />}
                              label={<IntlMessages id="education.3" />}
                            >
                              {<IntlMessages id="education.3" />}
                            </MenuItem>
                          </Select>
                        </StyledFormControl>
                      </Grid>
                    </Grid>

                    {/* workD */}
                    <Grid
                      container
                      spacing={12}
                      style={{
                        minWidth: "149px",
                        paddingTop: "9px",
                        paddingBottom: "-3px"
                      }}
                    >
                      <Grid item xs={12}>
                        <InputLabel id="workd-label">
                          <IntlMessages id="inputLabel.workd" />
                        </InputLabel>
                      </Grid>
                      <Grid item xs={12}>
                        <StyledFormControl style={{ minWidth: "149px" }}>
                          <Select
                            labelId="workd-label"
                            id="workd"
                            value={workd}
                            onChange={event => {
                              setWorkd(event.target.value);
                            }}
                            name="workd"
                          >
                            {ARRAY_OF_WORKD.map(value => {
                              let v = parseInt(
                                `${value.props.id}`.split(".")[1]
                              );
                              return (
                                <MenuItem
                                  key={v}
                                  value={v}
                                  control={<Radio />}
                                  label={value}
                                >
                                  {value}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </StyledFormControl>
                      </Grid>
                    </Grid>

                    {/* title */}
                    <Grid
                      container
                      spacing={12}
                      style={{ paddingBottom: "9px" }}
                    >
                      <Grid
                        item
                        xs={6}
                        style={{ width: "100%", paddingRight: "18px" }}
                      >
                        <TextField
                          type="text"
                          onChange={event => {
                            setTitle(event.target.value);
                          }}
                          label={<IntlMessages id="inputLabel.title" />}
                          defaultValue={title}
                          margin="normal"
                          name="title"
                          style={{ width: "100%" }}
                        />
                      </Grid>
                    </Grid>
                    {/* bio */}
                    <Grid
                      container
                      spacing={12}
                      style={{ paddingTop: "9px", paddingBottom: "9px" }}
                    >
                      <Grid container spacing={12}>
                        <InputLabel id="bio-label">
                          <IntlMessages id="inputLabel.bio" />
                        </InputLabel>
                      </Grid>
                      <Grid container spacing={12}>
                        <TextareaAutosize
                          onChange={event => {
                            setBio(event.target.value);
                          }}
                          aria-label="minimum height"
                          defaultValue={bio}
                          rowsMin={3}
                          name="bio"
                          style={{ width: "100%" }}
                        />
                      </Grid>
                    </Grid>

                    <div className="mb-3 d-flex align-items-center justify-content-between">
                      <Button
                        className={classes.positionA}
                        variant="contained"
                        onClick={() => {
                          console.log(nationality);
                          //console.log(tpercent);
                          console.log(workd);
                          console.log(title);
                          console.log(education);
                          console.log(bio);
                          dispatch(
                            updateProfileL2(
                              nationality,
                              tpercent,
                              title,
                              workd,
                              education,
                              bio
                            )
                          );
                          handleClose();
                        }}
                        color="primary"
                      >
                        <IntlMessages id="updateProfile.update" />
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
