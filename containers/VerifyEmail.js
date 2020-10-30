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
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

//sendResetToken ===> sendVerificationCode
//changePassword ===> resendVerificationToPhone

import {
  hideMessage,
  showAuthLoader,
  sendVerificationCode,
  resendVerificationToPhone,
  userSignOut
} from "../actions/Auth";

class VerifyEmail extends React.Component {
  constructor() {
    super();
    this.state = {
      verificationCode: ""
    };
  }

  componentDidUpdate() {
    if (this.props.showMessage) {
      setTimeout(() => {
        this.props.hideMessage();
      }, 3000);
    }
    if (this.props.authUser !== null && this.props.phoneVerified) {
      //Router.replace('/dashboard/crypto');
    }
  }

  render() {
    const { verificationCode } = this.state;

    const {
      showMessage,
      loader,
      alertMessage,
      phoneVerified,
      phone,
      country
    } = this.props; //phoneVerified
    return (
      <>
        <Button
          variant="contained"
          onClick={() => {
            this.props.showAuthLoader();
            this.props.userSignOut();
          }}
          color="primary"
        >
          <IntlMessages id="appModule.signOut" />
        </Button>

        <div
          style={{ minHeight: "705px" }}
          className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3"
        >
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
                  <IntlMessages id="appModule.verifyPhone" />{" "}
                </h1>
                <h1> {`+${country} ${phone}`} </h1>
              </div>

              <div className="app-login-form">
                <form>
                  <TextField
                    type="number"
                    onChange={event =>
                      this.setState({ verificationCode: event.target.value })
                    }
                    label={<IntlMessages id="appModule.verificationCode" />}
                    fullWidth
                    defaultValue={verificationCode}
                    margin="normal"
                    className="mt-0 mb-2"
                  />

                  <div className="mb-3 d-flex align-items-center justify-content-between">
                    <Grid container style={{ paddingTop: "7px" }} spacing={12}>
                      <Button
                        variant="contained"
                        onClick={() => {
                          this.props.showAuthLoader();
                          this.props.sendVerificationCode({ verificationCode });
                        }}
                        color="primary"
                      >
                        <IntlMessages id="appModule.submit" />
                      </Button>{" "}
                    </Grid>

                    <Button
                      variant="contained"
                      onClick={() => {
                        this.props.showAuthLoader();
                        this.props.resendVerificationToPhone();
                      }}
                      color="primary"
                    >
                      <IntlMessages id="appModule.resendVerificationCode" />
                    </Button>
                    {phoneVerified && window.location.reload()}
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
    phoneVerified,
    phone,
    country
  } = auth;
  return {
    loader,
    alertMessage,
    showMessage,
    authUser,
    phoneVerified,
    phone,
    country
  };
};

export default connect(mapStateToProps, {
  sendVerificationCode,
  resendVerificationToPhone,
  hideMessage,
  showAuthLoader,
  userSignOut
})(VerifyEmail);
