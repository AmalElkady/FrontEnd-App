import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { resetCheckMpUpload } from "../../actions/Auth";
import { openModal, updateProfileL2 } from "../../actions/Profile";
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

export default function ModalChangePhone({ data }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  ////// modal
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [Phone, setPhone] = useState("");
  const [City, setCity] = useState("");

  const OpenModal = useSelector(state => state.profile.openModal);
  const country = useSelector(state => state.auth.country);

  useEffect(() => {
    console.log("first dataaaaa ", data);
    // setPhone(data.phone);
  }, []);
  useEffect(() => {
    if (OpenModal) {
      handleOpen();
    }
  }, [OpenModal]);

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
          <div className="app-login-main-content">
            <div className="app-login-content-2">
              <div className="app-login-header">
                <h2>
                  <IntlMessages id="appModule.changeYourPhone" />
                </h2>
                {/* <h2> {`+${country} ${phone}`} </h2> */}
                <h2>
                  {" "}
                  01004059778
                  <IconButton
                    aria-label="Edit"
                    onClick={handleOpenEdit}
                    className="edit-icon-2 linear-g-r"
                  >
                    <EditIcon fontSize="small"></EditIcon>
                  </IconButton>
                </h2>
              </div>

              <div className="app-login-form">
                {openEdit && (
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
                        {/* <PhoneInput
                        countryCodeEditable={false}
                        disableCountryCode={true}
                        // country={
                        //   COUNTRY_CODE_TO_NAME_MAP[nationality] ||
                        //   COUNTRY_CODE_TO_NAME_MAP[country] ||
                        //   COUNTRY_CODE_TO_NAME_MAP["+" + country]
                        // }
                        // value={country}
                        placeholder={"Choose Country"}
                        readonly={"readonly"}
                        // onChange={(value, country, e, formattedValue) => {
                        //  // setNationality(country.countryCode);
                        // }}
                      /> */}
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
                          countryCodeEditable={false}
                          country={"eg"}
                          value={Phone}
                          placeholder={""}
                          readonly={"readonly"}
                          //   onChange={(value, country, e, formattedValue) => {
                          //     this.setState({ countrySign: country.dialCode });
                          //     this.setState({
                          //       phoneSign: value.slice(country.dialCode.length)
                          //     });
                          //   }}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        style={{ minWidth: "90px", paddingRight: "18px" }}
                      >
                        <StyledFormControl style={{ minWidth: "90px" }}>
                          <InputLabel id="city-label">
                            <IntlMessages id="inputLabel.city" />
                          </InputLabel>
                          <Select
                            labelId="city-label"
                            id="city"
                            // value={city}
                            //onChange={handleChange}
                            name="city"
                          >
                            {/* {COUNTRY_CITY_MAP[this.state.countryiso2].map((value,i) => (
                                                <MenuItem
                                                  key={COUNTRY_CITY_MAP_VALUE[this.state.countryiso2][i]}
                                                  value={COUNTRY_CITY_MAP_VALUE[this.state.countryiso2][i]}
                                                  control={<Radio />}
                                                  label={value}>
                                                      {value}
                                                </MenuItem>
                                              ))} */}
                          </Select>
                        </StyledFormControl>
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
                      <Button
                        variant="contained"
                        onClick={() => {
                          // console.log(nationality);
                          // dispatch(
                          // );
                          handleClose();
                        }}
                        color="primary"
                        className="linear-g-r"
                      >
                        <IntlMessages id="appModule.change" />
                      </Button>
                    </div>
                  </form>
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
