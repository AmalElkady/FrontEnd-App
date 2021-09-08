import React, { Component } from "react";
import { getCookie } from "../../util/session";
import redirect from "../../util/redirect";
import asyncComponent from "../../util/asyncComponent";
import Pusher from "pusher-js";
import { profile } from "../../services/profile";
import { addConnectionFlage } from "../../actions/Auth";

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
const API_KEY = "5b623d5355373a0a083a";

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
      console.log("token ****  ", token);
      const tokenUserData = JSON.parse(
        base64url.decode(`${token}`.split(".")[1])
      );
      // let tokenUserData = JSON.parse(base64url.decode(token.split(".")[1]));
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

    // componentDidMount() {
    //   Pusher.logToConsole = true;
    //   let authUrl = "http://128.199.32.156/api/requestnotificationconnection";
    //   const tokenValue = getCookie("access_token", false);
    //   let authorizer = (channel, options) => {
    //     return {
    //       authorize: (socketId, callback) => {
    //         fetch(authUrl, {
    //           method: "POST",
    //           headers: new Headers(
    //             // { "Content-Type": "application/json", 'Authorization': "Bearer 0A08DACEF62A50AB89EA8188ABABAFBD6DD94909A78A5BCC089A9E764DC3A866" }

    //             {
    //               "Content-Type": "application/json",
    //               Authorization: "Bearer " + tokenValue
    //             }
    //           ),
    //           body: JSON.stringify({
    //             socket_id: socketId,
    //             channel_name: channel.name
    //           })
    //         })
    //           .then(res => {
    //             if (!res.ok) {
    //               throw new Error(`Received ${res.statusCode} from ${authUrl}`);
    //             }
    //             return res.json();
    //           })
    //           .then(data => {
    //             console.log(data);
    //             callback(null, data);
    //           })
    //           .catch(err => {
    //             callback(new Error(`Error calling auth endpoint: ${err}`), {
    //               auth: ""
    //             });
    //           });
    //       }
    //     };
    //   };

    //   this.pusher = new Pusher(API_KEY, {
    //     cluster: "eu",
    //     // authorizer: profile.pusherAuth
    //     authorizer: authorizer
    //   });

    //   //const tokenValue = getCookie("access_token", false);

    //   const tokenUserData = JSON.parse(
    //     base64url.decode(`${tokenValue}`.split(".")[1])
    //   );
    //   this.channel = this.pusher.subscribe(
    //     `private-${tokenUserData.co}_${tokenUserData.ci}_${tokenUserData.va}_${tokenUserData.id}`
    //   );

    //   this.channel.bind("message", function(data) {
    //     console.log("data.value ", data.value);
    //   });
    //   this.channel.bind("love", function(data) {
    //     console.log("data.value***** ", data.value);
    //   });
    //   this.channel.bind("view", function(data) {
    //     // fillData('view-container',data.value);
    //     console.log("data.value ", data.value);
    //   });
    //   this.channel.bind("privatephoto", function(data) {
    //     //  fillData('privatephoto-container',data.value);
    //     console.log("data.value ", data.value);
    //   });
    //   this.channel.bind("disconnect_signal", function(data) {
    //     //  fillData('disconnectsignal-container',data.value);
    //     console.log("data.value ", data.value);
    //   });
    // }

    render() {
      console.log("props ", { ...this.props });

      if (this.props.isLoggedIn == false && !this.props.login) {
        //	 return <div><script>setTimeout(function() {window.location = "http://localhost:3000/"}, 1500)</script></div>
        //return <ComponentVerify {...this.props} />;
        // return <ComposedComponent {...this.props} />;
        return <ComponentAutoLogout {...this.props} />;
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
        console.log("44444$$$$$$$$$$$");
        return <ComposedComponent {...this.props} />;
      }
    }
  };
