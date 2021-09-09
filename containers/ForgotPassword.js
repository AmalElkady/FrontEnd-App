import React from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Router from "next/router";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import Timer from "../components/Timer";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import CircularProgress from "@material-ui/core/CircularProgress";
import Link from "next/link";
import IntlMessages from "../util/IntlMessages";
import { COUNTRY_CODE_TO_NAME_MAP } from "../util/data";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Grid from "@material-ui/core/Grid";

import {
  hideMessage,
  showAuthLoader,
  sendResetToken,
  changePassword,
  formSwitch2
} from "../actions/Auth";

class ForgotPassword extends React.Component {
  constructor() {
    super();
    this.state = {
      token: "",
      phoneRes: "",
      newpassword: "",
      countryRes: "",
      countryisoRes: "",
      viewPhone: ""
    };
  }

  componentDidUpdate() {
    console.log("forgot");
    if (this.props.showMessage) {
      setTimeout(() => {
        this.props.hideMessage();
      }, 3000);
    }
    if (this.props.authUser !== null) {
      Router.replace("/home/content");
    }
  }

  componentDidMount() {
    console.log("props from restpassword ", this.props);
    if (this.props.phone && this.props.country) {
      this.setState({ ["phoneRes"]: this.props.phone });
      this.setState({ ["countryRes"]: this.props.country });
      // this.setState({ ["countryisoRes"]: this.props.country });
      this.setState({
        ["viewPhone"]: `${this.props.country}${this.props.phone}`
      });
    }
  }

  render() {
    const {
      token,
      phoneRes,
      newpassword,
      countryRes,
      countryisoRes,
      viewPhone
    } = this.state;
    const {
      showMessage,
      loader,
      alertMessage,
      tokenSent,
      timeReturned,
      passwordChanged,
      authStateCleared,
      phone,
      country
    } = this.props;
    return (
      <>
        {/* timer */}
        {/* {timeReturned && <Timer />} */}
        <div className="intro-bg">
          <div className="bg-layout">
            <Grid container spacing={12}>
              <Grid item xs={10}></Grid>
              <Grid item xs={2} className="lang-container">
                {/* <Dropdown
                className="quick-menu"
                isOpen={langSwitcher}
                toggle={() => onLangSwitcherSelect(event)}
              >
                <DropdownToggle
                  className="d-inline-block"
                  tag="span"
                  data-toggle="dropdown"
                >
                  <IconButton className={`icon-btn`}>
                    <i className={`flag flag-24 flag-${locale.icon}`} />
                  </IconButton>
                </DropdownToggle>

                <DropdownMenu className={`w-50 ${classes.dropdownL}`}>
                  <LanguageSwitcher
                    switchLanguage={switchLanguage}
                    handleRequestClose={handleRequestClose}
                  />
                </DropdownMenu>
              </Dropdown> */}
              </Grid>
            </Grid>
            <Grid container spacing={12}>
              <Grid item xs={5} className="main-logo">
                {/* <div > */}
                {/* style={{width:"100%"}} */}
                <img
                  src="../static/images/Gila_logo_front_page.svg"
                  alt="Gila"
                  title="Gila"
                />
                {/* </div> */}
              </Grid>
            </Grid>
            <Grid container spacing={12}>
              <Grid item xs={4} className=""></Grid>
              <Grid item xs={8} className="login-form">
                <div className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
                  <div
                    className="app-login-main-content app-login-main-content-2"
                    style={{
                      position: "relative"
                    }}
                  >
                    <div className="app-login-content app-login-content-2 ">
                      <div className="app-login-header">
                        <h1>
                          {" "}
                          <IntlMessages id="appModule.forgotPasswordHeader" />{" "}
                        </h1>
                      </div>

                      <div className="mb-4">
                        {!authStateCleared && !tokenSent && (
                          <h2>
                            <IntlMessages id="appModule.resetPasswordPageHeader" />
                          </h2>
                        )}

                        {authStateCleared && (
                          <h2>
                            <IntlMessages id="appModule.resetPasswordSuccess" />
                          </h2>
                        )}
                        {!passwordChanged && tokenSent && (
                          <h2>
                            <IntlMessages id="appModule.tokenSent" />
                          </h2>
                        )}
                      </div>

                      <div className="mb-4">
                        {!authStateCleared && !tokenSent && (
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
                            country={
                              COUNTRY_CODE_TO_NAME_MAP[this.props.country] ||
                              "eg"
                            }
                            value={this.state.viewPhone}
                            placeholder={""}
                            readonly={"readonly"}
                            onChange={(value, country, e, formattedValue) => {
                              this.setState({ countryRes: country.dialCode });
                              this.setState({
                                phoneRes: value.slice(country.dialCode.length)
                              });
                              this.setState({
                                countryisoRes: country.countryCode
                              });
                            }}
                          />
                        )}
                      </div>

                      <div className="app-login-form">
                        <form>
                          {!passwordChanged && tokenSent && (
                            <div>
                              <TextField
                                type="text"
                                onChange={event =>
                                  this.setState({ token: event.target.value })
                                }
                                label={<IntlMessages id="appModule.token" />}
                                fullWidth
                                defaultValue={token}
                                margin="normal"
                                className="mt-0 mb-2"
                              />

                              <TextField
                                type="password"
                                label={<IntlMessages id="appModule.password" />}
                                fullWidth
                                onChange={event =>
                                  this.setState({
                                    newpassword: event.target.value
                                  })
                                }
                                defaultValue={newpassword}
                                margin="normal"
                                className="mt-1 my-sm-3"
                              />
                            </div>
                          )}

                          <div className="mb-3 d-flex align-items-center justify-content-between">
                            {!authStateCleared && !tokenSent && (
                              <Button
                                variant="contained"
                                onClick={() => {
                                  this.props.showAuthLoader();
                                  this.props.sendResetToken({
                                    phone: phoneRes,
                                    country: countryRes,
                                    countryiso2: countryisoRes
                                  });
                                  //add resendResetToken To Link To Change State
                                }}
                                color="primary"
                                //  disabled={{ timeReturned }}
                                style={{ width: "100%" }}
                                className="linear-g-r"
                              >
                                <IntlMessages id="appModule.resetPassword" />
                              </Button>
                            )}

                            {!passwordChanged && tokenSent && (
                              <Button
                                variant="contained"
                                onClick={() => {
                                  this.props.showAuthLoader();
                                  this.props.changePassword({
                                    token,
                                    newpassword
                                  });
                                }}
                                color="primary"
                              >
                                <IntlMessages id="appModule.submit" />
                              </Button>
                            )}

                            {!passwordChanged && tokenSent && (
                              <Button
                                variant="contained"
                                onClick={() => {
                                  this.props.showAuthLoader();
                                  this.props.sendResetToken({
                                    phone: phoneRes,
                                    country: countryRes,
                                    countryiso2: countryisoRes
                                  });
                                }}
                                color="primary"
                                disabled={{ timeReturned }}
                              >
                                <IntlMessages id="appModule.resendResetToken" />
                              </Button>
                            )}

                            {authStateCleared && (
                              <Link href="/">
                                <a>
                                  {" "}
                                  <IntlMessages id="appModule.signin" />{" "}
                                </a>
                              </Link>
                            )}
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
            {loader && (
              // <div className="loader-view">
              //   <CircularProgress />
              // </div>
              <div className="loading-border loading--full-height">
                <img
                  src="../static/images/Gila_Final_Logo_form.svg"
                  alt="App"
                  title="App"
                  className="rotate-image loader-img"
                />
              </div>
            )}
            {showMessage && NotificationManager.error(alertMessage)}
            <NotificationContainer />
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const {
    loader,
    alertMessage,
    showMessage,
    authUser,
    tokenSent,
    passwordChanged,
    authStateCleared,
    phone,
    country
  } = auth;
  return {
    loader,
    alertMessage,
    showMessage,
    authUser,
    tokenSent,
    passwordChanged,
    authStateCleared,
    phone,
    country
  };
};

export default connect(mapStateToProps, {
  sendResetToken,
  changePassword,
  hideMessage,
  showAuthLoader,
  formSwitch2
})(ForgotPassword);
