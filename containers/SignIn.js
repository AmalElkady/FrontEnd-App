import React from "react";
import Link from "next/link";
import { connect } from "react-redux";
import Router from "next/router";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import IntlMessages from "../util/IntlMessages";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import {
  hideMessage,
  showAuthLoader,
  userSignIn,
  formSwitch,
  formSwitch2
} from "../actions/Auth";

import { toggleCollapsedNav } from "../actions/Setting";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ReCAPTCHA from "react-google-recaptcha";
import moment from "moment";

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      phoneSign: "",
      password: "",
      countrySign: "",
      viewPhone: "",
      rcaptchaValue: null
    };
  }

  componentDidUpdate() {
    if (this.props.showMessage) {
      setTimeout(() => {
        this.props.hideMessage();
      }, 100);
    }
    if (this.props.authUser != null) {
      // console.log(
      //   "jnt from login %%%%%% ",
      //   this.props.c,
      //   moment().diff(this.props.jnt, "hours")
      // );
      Router.replace("/home/content");
    }
  }

  componentDidMount() {
    if (this.props.phone && this.props.country) {
      this.setState({ ["phoneSign"]: this.props.phone });
      this.setState({ ["countrySign"]: this.props.country });
      this.setState({
        ["viewPhone"]: `${this.props.country}${this.props.phone}`
      });
    }
  }
  render() {
    const {
      phoneSign,
      password,
      countrySign,
      viewPhone,
      rcaptchaValue
    } = this.state;
    const { showMessage, loader, alertMessage, phone, country } = this.props;
    return (
      <div className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
        <div className="app-login-main-content app-login-main-content-2">
          {/* <div className="app-logo-content d-flex align-items-center justify-content-center">
            <Link href="/">
              <a>
                <img src="../static/images/gila.png" alt="App" title="App" />
              </a>
            </Link>
          </div> */}

          <div className="app-login-content-2">
            <div className="app-login-header">
              <Grid container spacing={12}>
                <InputLabel id="phone-label" style={{ paddingBottom: "7px" }}>
                  <IntlMessages id="appModule.phone" />
                </InputLabel>
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
                  countryCodeEditable={false}
                  country={"eg"}
                  value={viewPhone}
                  placeholder={""}
                  readonly={"readonly"}
                  onChange={(value, country, e, formattedValue) => {
                    this.setState({ countrySign: country.dialCode });
                    this.setState({
                      phoneSign: value.slice(country.dialCode.length)
                    });
                  }}
                />
              </Grid>
            </div>

            <div className="app-login-form">
              <form
                onKeyPress={event => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    this.props.showAuthLoader();
                    this.props.userSignIn({
                      phone: phoneSign,
                      password,
                      country: countrySign
                    });
                    this.props.toggleCollapsedNav(false);
                  }
                }}
              >
                <fieldset>
                  <TextField
                    type="password"
                    label={<IntlMessages id="appModule.password" />}
                    fullWidth
                    onChange={event =>
                      this.setState({ password: event.target.value })
                    }
                    defaultValue={password}
                    margin="normal"
                    className="mt-1 my-sm-3 to-right"
                  />

                  {/* <div className="mb-3 d-flex align-items-center justify-content-between"> */}
                  <Grid container>
                    <Grid item xs={12}>
                      <ReCAPTCHA
                        sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                        onChange={value => {
                          console.log("Captcha value2:", value);
                          this.setState({ rcaptchaValue: value });
                        }}
                        className="not-robot"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        onClick={() => {
                          this.props.showAuthLoader();
                          this.props.userSignIn({
                            phone: phoneSign,
                            password,
                            country: countrySign,
                            score: "",
                            key: ""
                          });
                          this.props.toggleCollapsedNav(false);
                          this.setState({
                            ["RcaptchaValue"]: null
                          });
                        }}
                        variant="contained"
                        color="primary"
                        style={{ width: "100%" }}
                        className="linear-g-r"
                        disabled={rcaptchaValue === null ? true : false}
                      >
                        <IntlMessages id="appModule.signIn" />
                      </Button>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      style={{ textAlign: "center", margin: "1rem" }}
                    >
                      {/* <Link onClick={()=>{this.props.formSwitch(true)}}> */}
                      <a
                        className="a-underLine-none"
                        onClick={() => {
                          this.props.formSwitch(true);
                        }}
                      >
                        <IntlMessages id="signIn.signUp" />
                      </a>
                      {/* </Link> */}
                      {/* </div> */}
                    </Grid>
                    <Grid item xs={12} style={{ textAlign: "center" }}>
                      <Link href="/forgotpassword">
                        {/* onClick={()=>{this.props.formSwitch2(true)}} */}
                        <a className="a-underLine-none">
                          <IntlMessages id="appModule.forgotPassword" />
                        </a>
                      </Link>
                    </Grid>
                  </Grid>
                </fieldset>
              </form>
            </div>
          </div>
        </div>

        {loader && (
          //  <div className="loader-view">
          <div className="loading-border loading--full-height">
            <img
              src="../static/images/Gila_Final_Logo_form.svg"
              alt="App"
              title="App"
              className="rotate-image loader-img"
            />
          </div>

          // <div className="loader2"></div>
          // <CircularProgress />
          // </div>
        )}

        {showMessage && NotificationManager.error(alertMessage)}
        <NotificationContainer />
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const {
    loader,
    alertMessage,
    showMessage,
    authUser,
    jnt,
    phone,
    country
  } = auth;
  return { loader, alertMessage, showMessage, authUser, jnt, phone, country };
};

export default connect(mapStateToProps, {
  userSignIn,
  hideMessage,
  showAuthLoader,
  toggleCollapsedNav,
  formSwitch,
  formSwitch2
})(SignIn);
