import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import {
  changeUserPhoneBeforeVerif,
  resetPhonechangeFlag
} from "../../actions/Auth";
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

export default function ModalChangePhone({
  phone,
  country,
  countryiso2,
  city
}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  ////// modal
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [Phone, setPhone] = useState("");
  const [City, setCity] = useState("");

  const OpenModal = useSelector(state => state.profile.openModal);
  const phoneChangedBefore = useSelector(
    state => state.auth.phoneChangedBefore
  );

  useEffect(() => {
    console.log("first dataaaaa ", phone, country, countryiso2);
    console.log("first dataaaaa countryiso2", countryiso2, city);
    setCity(city);
    setPhone(phone);
  }, []);
  useEffect(() => {
    if (OpenModal) {
      handleOpen();
    }
  }, [OpenModal]);

  useEffect(() => {
    if (phoneChangedBefore) {
      NotificationManager.success("Your phone changed successfully", "Success");
      dispatch(resetPhonechangeFlag());
      handleClose();
    }
  }, [phoneChangedBefore]);

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

  const handleChangeCity = event => {
    console.log("");
    setCity(event.target.value);
  };

  const handleChangePhone = value => {
    setPhone(value);
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
          <div className={classes.paper}>
            <div className="logo-form">
              <img
                src="../../static/images/Gila_Final_Logo_form.svg"
                alt="App"
                title="App"
              />
            </div>
            {/* <div className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3"> */}
            {/* <div className="app-login-main-content"> */}
              <div className="app-login-content-2">
                <div className="app-login-header">
                  <h2>
                    <IntlMessages id="appModule.changeYourPhone" />
                  </h2>
                  <h2>
                    {" "}
                    {`+${country} ${phone}`}
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
                              "us",
                              "fr",
                              "eg",
                              "ma",
                              "sa",
                              "dz",
                              "kw",
                              "ar",
                              "ca",
                              "sg",
                              "ua",
                              "pt",
                              "af",
                              "al",
                              "az",
                              "ba",
                              "bd",
                              "bf",
                              "bg",
                              "bh",
                              "bj",
                              "ci",
                              "cm",
                              "cn",
                              "de",
                              "dj",
                              "es",
                              "gb",
                              "gm",
                              "gn",
                              "gw",
                              "id",
                              "in",
                              "iq",
                              "ir",
                              "it",
                              "jo",
                              "ke",
                              "kg",
                              "km",
                              "lb",
                              "lr",
                              "ly",
                              "me",
                              "mg",
                              "mk",
                              "ml",
                              "mm",
                              "mr",
                              "mv",
                              "mw",
                              "my",
                              "ne",
                              "ng",
                              "om",
                              "ph",
                              "pk",
                              "ps",
                              "qa",
                              "ru",
                              "sd",
                              "sl",
                              "sn",
                              "so",
                              "sy",
                              "td",
                              "tg",
                              "th",
                              "tj",
                              "tm",
                              "tn",
                              "tr",
                              "tz",
                              "ug",
                              "uz",
                              "ye"
                            ]}
                            countryCodeEditable={true}
                            disableCountryCode={true}
                            country={countryiso2}
                            value={Phone}
                            placeholder={""}
                            onChange={(value, country, e, formattedValue) => {
                              //   this.setState({ countrySign: country.dialCode });
                              //   this.setState({
                              //     phoneSign: value.slice(country.dialCode.length)
                              //   });
                              console.log("valueee ", value);
                              handleChangePhone(value);
                            }}
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
                              value={City}
                              onChange={handleChangeCity}
                              name="city"
                            >
                              {COUNTRY_CITY_MAP[countryiso2].map((value, i) => (
                                <MenuItem
                                  key={COUNTRY_CITY_MAP_VALUE[countryiso2][i]}
                                  value={COUNTRY_CITY_MAP_VALUE[countryiso2][i]}
                                  control={<Radio />}
                                  label={value}
                                >
                                  {value}
                                </MenuItem>
                              ))}
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
                            console.log("change phone");
                            console.log("city ", City);
                            console.log("phone ", Phone);
                            console.log("country ", country);
                            console.log("countryiso2 ", countryiso2);

                            dispatch(
                              changeUserPhoneBeforeVerif(
                                Phone,
                                country,
                                countryiso2.toUpperCase(),
                                City
                              )
                            );
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
