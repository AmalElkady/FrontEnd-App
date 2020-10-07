import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { NotificationContainer } from "react-notifications";
import Link from "next/link";
import IntlMessages from "../../../util/IntlMessages";

class SignUP2 extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: ""
    };
  }

  render() {
    const { name, email, password } = this.state;

    return (
      <div
        className="login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
        <div className="login-content text-center">
          <div className="login-header">
            <Link href="/" title="Jambo">
              <a className="app-logo">
                <img src="../../../static/images/logo-color.png"
                     alt="jambo" title="jambo"/>
              </a>
            </Link>
          </div>

          <div className="mb-4">
            <h2>
              <IntlMessages id="appModule.createAccount"/>
            </h2>
          </div>

          <div className="login-form">
            <form method="post" action="/">
              <TextField
                type="text"
                id="signUpName"
                label="Name"
                onChange={event => this.setState({ name: event.target.value })}
                fullWidth
                defaultValue={name}
                margin="normal"
                className="mt-0 mb-2"
              />

              <TextField
                type="signUpEmail"
                onChange={event => this.setState({ email: event.target.value })}
                id="required"
                label={<IntlMessages id="appModule.email"/>}
                fullWidth
                defaultValue={email}
                margin="normal"
                className="mt-0 mb-2"
              />

              <TextField
                type="signUpPassword"
                onChange={event =>
                  this.setState({ password: event.target.value })
                }
                id="required"
                label={<IntlMessages id="appModule.password"/>}
                fullWidth
                defaultValue={password}
                margin="normal"
                className="mt-0 mb-4"
              />

              <div className="mb-3">
                <Button
                  color="primary"
                  variant="contained"
                  className="text-white"
                >
                  <IntlMessages id="appModule.regsiter"/>
                </Button>
              </div>
              <p>
                <IntlMessages id="appModule.hvAccount"/>
                <Link href="/app-module/login-2">
                  <a className="ml-1"> <IntlMessages id="appModule.signIn"/></a>
                </Link>
              </p>
            </form>
          </div>
        </div>
        <NotificationContainer/>
      </div>
    );
  }
}

export default SignUP2;
