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
import { hideMessage, showAuthLoader, userSignIn } from "../actions/Auth";

import { toggleCollapsedNav } from "../actions/Setting";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      phoneSign: "",
      password: "Password#123",
      countrySign: "", //+201144778899
      viewPhone: ""
    };
  }

  componentDidUpdate() {
    if (this.props.showMessage) {
      setTimeout(() => {
        this.props.hideMessage();
      }, 100);
    }
    if (this.props.authUser !== null) {
      Router.replace("/dashboard/crypto");
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
    const { phoneSign, password, countrySign, viewPhone } = this.state;
    const { showMessage, loader, alertMessage, phone, country } = this.props;
    return (
      <div className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
        <div className="app-login-main-content">
          <div className="app-logo-content d-flex align-items-center justify-content-center">
            <Link href="/">
              <a>
                <img src="../static/images/gila.png" alt="App" title="App" />
              </a>
            </Link>
          </div>

          <div className="app-login-content">
            <div className="app-login-header mb-4">
              <Grid container spacing={12}>
                <InputLabel id="phone-label" style={{ paddingBottom: "7px" }}>
                  <IntlMessages id="appModule.phone" />
                </InputLabel>
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
                    className="mt-1 my-sm-3"
                  />

                  <div className="mb-3 d-flex align-items-center justify-content-between">
                    <Button
                      onClick={() => {
                        this.props.showAuthLoader();
                        this.props.userSignIn({
                          phone: phoneSign,
                          password,
                          country: countrySign
                        });
                        this.props.toggleCollapsedNav(false);
                      }}
                      variant="contained"
                      color="primary"
                    >
                      <IntlMessages id="appModule.signIn" />
                    </Button>

                    <Link href="/signup">
                      <a className="a-underLine">
                        <IntlMessages id="signIn.signUp" />
                      </a>
                    </Link>
                  </div>

                  <Link href="/forgotpassword">
                    <a className="a-underLine">
                      <IntlMessages id="appModule.forgotPassword" />
                    </a>
                  </Link>
                </fieldset>
              </form>
            </div>
          </div>
        </div>

        {loader && (
          <div className="loader-view">
            <div className="loader2"></div>
            {/* <CircularProgress /> */}
          </div>
        )}

        {showMessage && NotificationManager.error(alertMessage)}
        <NotificationContainer />
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { loader, alertMessage, showMessage, authUser, phone, country } = auth;
  return { loader, alertMessage, showMessage, authUser, phone, country };
};

export default connect(mapStateToProps, {
  userSignIn,
  hideMessage,
  showAuthLoader,
  toggleCollapsedNav
})(SignIn);
