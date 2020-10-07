import React from "react";
import Link from "next/link";
import IntlMessages from "../../../util/IntlMessages";

const SignUP1 = () => {
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
            <div className="form-group">
              <input
                type="text"
                placeholder="Name"
                className="form-control form-control-lg"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Email"
                className="form-control form-control-lg"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                className="form-control form-control-lg"
              />
            </div>
            <div className="mt-4 mb-2">
              <Link href="/">
                <a className="btn btn-primary jr-btn-rounded"> <IntlMessages id="appModule.regsiter"/></a>
              </Link>
            </div>
            <p>
              <IntlMessages id="appModule.hvAccount"/>
              <Link href="/app-module/login-1">
                <a className="ml-1"> <IntlMessages id="appModule.signIn"/></a>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUP1;
