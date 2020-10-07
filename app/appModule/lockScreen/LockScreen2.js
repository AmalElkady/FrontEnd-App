import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import IntlMessages from "../../../util/IntlMessages";

const LockScreen2 = () => {
  return (
    <div className="login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
      <div className="login-content text-center">
        <div className="login-header">
          <Link href="/app-module/login-2" title="Jambo">
            <a className="app-logo"> <img
              src="../../../static/images/logo-color.png"
              alt="jambo" title="jambo"/></a>
          </Link>
        </div>

        <div className="login-avatar mb-4">
          <img
            className="rounded-circle size-120"
            src="https://via.placeholder.com/260x260"
            alt="" title=""/>
        </div>
        <div className="mb-4">
          <h3>John Smith</h3>
          <p>
            <IntlMessages id="appModule.enterPasswordUnlock" />
          </p>
        </div>
        <form method="get" action="/app-module/login-2">
          <TextField
            type="password"
            id="required"
            label={<IntlMessages id="appModule.password" />}
            fullWidth
            defaultValue=""
            margin="normal"
            className="mt-0 mb-4"
          />

          <div className="mb-2">
            <Button
              color="primary"
              variant="contained"
              className="text-white">
              <IntlMessages id="appModule.unlock" />
            </Button>
          </div>
        </form>
        <div>
          <Link href="/app-module/login-2">
            <a className="right-arrow"> <IntlMessages id="appModule.signInDiffAccount"/></a>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default LockScreen2;
