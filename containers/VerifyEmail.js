import React from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Router from "next/router";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Timer from "../components/Timer";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import ModalChangePhone from "../components/Modals/modalChangePhone";
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

import { openModal } from "../actions/Profile";
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
      Router.replace("/home/content");
    }
  }

  render() {
    const { verificationCode } = this.state;

    const {
      showMessage,
      loader,
      alertMessage,
      timeReturned,
      phoneVerified,
      phone,
      country,
      city,
      countryiso2,
      OpenModal
    } = this.props; //phoneVerified
    // const OpenModal = this.props.openModal;
    //console.log("timeReturned verify ", timeReturned);

    return (
      <>
      <div className="container">
        {timeReturned && <Timer />}

        <div
          className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3"
        >
          <div className="app-login-main-content" style={{position:"relative" ,marginTop:"5rem"}}>
           <Button
          variant="contained"
          onClick={() => {
            this.props.showAuthLoader();
            this.props.userSignOut();
          }}
          color="primary"
          className="linear-g-r out-btn-1"
        >
          <IntlMessages id="appModule.signOut" />
        </Button>
            <div className="app-logo-content d-flex align-items-center justify-content-center linear-g">
              <Link href="/">
                <a>
                  {" "}
                  <img
                    src="../static/images/Gila_Final_Logo_White.svg"
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
                <Button
                  variant="contained"
                  onClick={() => {
                    // this.props.showAuthLoader();
                    this.props.openModal(true);
                  }}
                  color="primary"
                  className="linear-g-r float-r"
                >
                  <IntlMessages id="appModule.changePhone" />
                </Button>
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

                  {/* <div className="mb-3 d-flex align-items-center justify-content-between"> */}
                    <Grid container style={{ paddingTop: "7px" }} spacing={12}>
                    <Grid item xs={9} className="m-s" >
                    <Button
                      variant="contained"
                      onClick={() => {
                        this.props.showAuthLoader();
                        this.props.resendVerificationToPhone();
                      }}
                      color="primary"
                      className="linear-g"
                      disabled={timeReturned ? disabled : ""}
                    >
                      <IntlMessages id="appModule.resendVerificationCode" />
                    </Button>
                    </Grid>
                    <Grid item xs={2}>
                      <Button
                        variant="contained"
                        onClick={() => {
                          this.props.showAuthLoader();
                          this.props.sendVerificationCode({ verificationCode });
                        }}
                        color="primary"
                        className="linear-g"
                      >
                        <IntlMessages id="appModule.submit" />
                      </Button>{" "}
                   </Grid>
                     </Grid>
                    {phoneVerified && window.location.reload()}
                  {/* </div> */}
                </form>
              </div>
            </div>
          </div>
          {OpenModal && <ModalChangePhone phone={phone} country={country}city={city} countryiso2={countryiso2}></ModalChangePhone>}

          {loader && (
            <div className="loader-view">
              <CircularProgress />
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

const mapStateToProps = ({ auth, profile }) => {
  const {
    loader,
    alertMessage,
    showMessage,
    authUser,
    timeReturned,
    phoneVerified,
    phone,
    country,
    city,
    countryiso2
  } = auth;
  const { openModal } = profile;
  const OpenModal = openModal;
  return {
    loader,
    alertMessage,
    showMessage,
    authUser,
    timeReturned,
    phoneVerified,
    phone,
    country,
    city,
    countryiso2,
    OpenModal
  };
};

export default connect(mapStateToProps, {
  sendVerificationCode,
  resendVerificationToPhone,
  hideMessage,
  showAuthLoader,
  userSignOut,
  openModal
})(VerifyEmail);
