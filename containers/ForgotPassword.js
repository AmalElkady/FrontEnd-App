import React from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Router from "next/router";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
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

import {
  hideMessage,
  showAuthLoader,
  sendResetToken,
  changePassword
} from "../actions/Auth";

class ForgotPassword extends React.Component {
  constructor() {
    super();
    this.state = {
      token: "",
      phoneRes: "",
      newpassword: "",
      countryRes: "",
      viewPhone: ""
    };
  }

  componentDidUpdate() {
    console.log("forgot")
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
    if (this.props.phone && this.props.country) {
      this.setState({ ["phoneRes"]: this.props.phone });
      this.setState({ ["countryRes"]: this.props.country });
      this.setState({
        ["viewPhone"]: `${this.props.country}${this.props.phone}`
      });
    }
  }

  render() {
    const { token, phoneRes, newpassword, countryRes, viewPhone } = this.state;
    const {
      showMessage,
      loader,
      alertMessage,
      tokenSent,
      passwordChanged,
      authStateCleared,
      phone,
      country
    } = this.props;
    return (
      <div className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
        <div className="app-login-main-content">
          <div className="app-logo-content d-flex align-items-center justify-content-center">
            <Link href="/">
              <a>
                {" "}
                <img
                  src="../static/images/gila.png"
                  alt="App"
                  title="App"
                />{" "}
              </a>
            </Link>
          </div>

          <div className="app-login-content">
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
                  country={COUNTRY_CODE_TO_NAME_MAP[this.props.country] || "eg"}
                  value={this.state.viewPhone}
                  placeholder={""}
                  readonly={"readonly"}
                  onChange={(value, country, e, formattedValue) => {
                    this.setState({ countryRes: country.dialCode });
                    this.setState({
                      phoneRes: value.slice(country.dialCode.length)
                    });
                    console.log(country.dialCode);
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
                        this.setState({ newpassword: event.target.value })
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
                          country: countryRes
                        });
                        //add resendResetToken To Link To Change State
                      }}
                      color="primary"
                    >
                      <IntlMessages id="appModule.resetPassword" />
                    </Button>
                  )}

                  {!passwordChanged && tokenSent && (
                    <Button
                      variant="contained"
                      onClick={() => {
                        this.props.showAuthLoader();
                        this.props.changePassword({ token, newpassword });
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
                          country: countryRes
                        });
                      }}
                      color="primary"
                    >
                      <IntlMessages id="appModule.resendResetToken" />
                    </Button>
                  )}

                  {authStateCleared && (
                    <Link href="/signin">
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

        {loader && (
          <div className="loader-view">
            <CircularProgress />
          </div>
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
  showAuthLoader
})(ForgotPassword);
