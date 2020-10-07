import React from "react";
import Link from "next/link";
import IntlMessages from "../../../util/IntlMessages";

const LockScreen1 = () => {
  return (
    <div className="login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
      <div className="login-content text-center">
        <div className="login-header">
          <Link href="/app-module/login-1" title="Jambo">
            <a className="app-logo">
              <img src="../../../static/images/logo-color.png"
                   alt="jambo" title="jambo"/></a>
          </Link>
        </div>

        <div className="login-avatar mb-4">
          <img
            className="rounded-circle size-120"
            src="https://via.placeholder.com/260x260"
            alt=""
            title=""
          />
        </div>
        <div className="mb-4">
          <h3>John Smith</h3>
          <p>
            <IntlMessages id="appModule.enterPasswordUnlock" />
          </p>
        </div>
        <form method="get" action="/app-module/login-1">
          <div className="form-group mb-4">
            <input
              type="password"
              placeholder="Password"
              className="form-control form-control-lg"
            />
          </div>
          <div className="form-group">
            <Link href="/app-module/login-1">
              <a className="btn btn-primary jr-btn-rounded">
                <IntlMessages id="appModule.unlock"/></a>
            </Link>
          </div>
        </form>
        <div>
          <Link href="/app-module/login-1">
            <a className="right-arrow">
              <IntlMessages id="appModule.signInDiffAccount"/></a>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default LockScreen1;
