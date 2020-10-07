import React from "react";
import Link from "next/link";
import IntlMessages from "../../../util/IntlMessages";

const Login1 = () => {
  return (
    <div className="login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
      <div className="login-content">
        <div className="login-header">
          <Link href="/" title="Jambo">
            <a className="app-logo">
            <img
              src="../../../static/images/logo-color.png"
              alt="jambo" title="jambo"/></a>
          </Link>
        </div>

        <div className="login-form">
          <form>
            <fieldset>
              <div className="form-group">
                <input
                  name="email"
                  id="email"
                  className="form-control form-control-lg"
                  placeholder="Email"
                  type="email"
                />
              </div>
              <div className="form-group">
                <input
                  name="password"
                  id="password"
                  className="form-control form-control-lg"
                  placeholder="Password"
                  type="password"
                />
              </div>
              <div className="form-group d-flex justify-content-between align-items-center">
                <label className="custom-control custom-checkbox float-left">
                  <input type="checkbox" className="custom-control-input" />
                  <span className="custom-control-indicator" />
                  <span className="custom-control-description">
                    Remember me
                  </span>
                </label>

                <div>
                  <Link href="/app-module/forgot-password-1" title="Reset Password">
                    <a> <IntlMessages id="appModule.forgotPassword"/></a>
                  </Link>
                </div>
              </div>

              <Link href="/">
                <a className="btn jr-btn-rounded btn-primary btn-rounded"> <IntlMessages id="appModule.signIn"/></a>
              </Link>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login1;
