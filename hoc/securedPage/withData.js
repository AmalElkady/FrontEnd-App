import React, { Component } from "react";
import { getCookie } from "../../util/session";
import redirect from "../../util/redirect";
import asyncComponent from "../../util/asyncComponent";
import base64url from "base64url";
const VerifyEmail = asyncComponent(() =>
  import("../../containers/VerifyEmail")
);
const MPUpload = asyncComponent(() => import("../../containers/MPUpload"));
const L2ProfileADD = asyncComponent(() =>
  import("../../containers/L2ProfileADD")
);
const AutoLogout = asyncComponent(() => import("../../containers/AutoLogout"));
const AutoSignIn = asyncComponent(() => import("../../containers/SignIn"));
const Subscribe = asyncComponent(() => import("../../containers/Subscribe"));
import Page from "../../hoc/defaultPage";

let ComponentVerify = Page(() => <VerifyEmail />);
let ComponentMPUpload = Page(() => <MPUpload />);
let ComponentL2ProfileADD = Page(() => <L2ProfileADD />);
let ComponentAutoLogout = Page(() => <AutoLogout />);
let ComponentAutoSignIn = Page(() => <AutoSignIn />);
let ComponentSubscribe = Page(() => <Subscribe />);
//	  let gender = tokenUserData.gd == "1" ? "0" : "1";

//  const profile = {
//      uid: tokenUserData.id,
//	  sub: tokenUserData.sub,
//	  pv: tokenUserData.pv,
//	  gd: tokenUserData.gd,
//	  co: tokenUserData.co,
//	  ci: tokenUserData.ci,
//	  va: tokenUserData.va,
//	  ag: tokenUserData.ag
//	  };

export default ComposedComponent =>
  class WithData extends Component {
    static async getInitialProps(context) {
      //console.log(context.req.path);
      let token = getCookie("access_token", context.req);
      const isLoggedIn = token ? true : false;

      //  if (!isLoggedIn) {
      //     redirect(context, '/');
      //  }
      console.log("$$$$$$ CONTEXT $$$$$$");
      console.log(context.store.getState());
      console.log("$$$$$$ CONTEXT $$$$$$");

      if (
        !token &&
        context.store.getState().auth.country &&
        context.store.getState().auth.phone
      ) {
        return { isLoggedIn, path: context.pathname, login: true };
      } else if (!token) {
        return { isLoggedIn, path: context.pathname, login: false };
      }
      console.log("----------------------------------");
      let tokenUserData = JSON.parse(base64url.decode(token.split(".")[1]));
      console.log("token  ", tokenUserData);
      //check tokenUserData.profile (L2|MP|MPA)
      //MPA ===> Call api/checkMPUpload
      //check tokenUserData.pv != 1

      return {
        isLoggedIn,
        path: context.pathname,
        pv: tokenUserData.pv,
        sub: tokenUserData.sub,
        profile: tokenUserData.profile,
        login: false
      };
    }

    render() {
      console.log("props ", { ...this.props });

      if (this.props.isLoggedIn == false && !this.props.login) {
        //	 return <div><script>setTimeout(function() {window.location = "http://localhost:3000/"}, 1500)</script></div>
        return <ComponentVerify {...this.props} />;
        // return <ComposedComponent {...this.props} />;
        //return <ComponentAutoLogout {...this.props} />;
      } else if (this.props.isLoggedIn == false && this.props.login) {
        //return <ComponentAutoSignIn {...this.props} />
        return (
          <div>
            <script>
              setTimeout(function(){" "}
              {(window.location = "http://localhost:3000/")}, 1500)
            </script>
          </div>
        );
      } else if (this.props.pv == 0) {
        return <ComponentVerify {...this.props} />;
      } else if (this.props.profile != 0) {
        //STAGES ACTIONS TO ADD MISSING PROFILE COMPONENTS

        if (`${this.props.profile}`.includes("L2")) {
          return <ComponentL2ProfileADD {...this.props} />;
        } else if (
          `${this.props.profile}`.includes("MP") ||
          `${this.props.profile}`.includes("MPA")
        ) {
          return <ComponentMPUpload {...this.props} />;
        }
      } else if (this.props.sub === 0) {
        return <ComponentSubscribe {...this.props} />;
      } else {
        return <ComposedComponent {...this.props} />;
      }
    }
  };
