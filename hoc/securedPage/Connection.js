import React, { useState, useEffect, Component } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import moment from "moment";
import VisibilityIcon from "@material-ui/icons/Visibility";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import IntlMessages from "../../util/IntlMessages";

import { addConnectionFlag } from "../../actions/Auth";
import {
  readAllMessagesCovers,
  resetMegsCovers,
  clearConversationSuccess,
  readConversation,
  setTypingMark,
  setTypingTimer
} from "../../actions/Messages";
import {
  increaseCount
  // pushInNotificationViewPPLove
} from "../../actions/Interaction";
import { increaseMgsUnRCount } from "../../actions/Messages";
import { requestPhotoRead, pusherActionDone } from "../../actions/Home";
import { mapSmallUserPhotoUrl } from "../../helpers/mapSmallUserPhotoUrl";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Pusher from "pusher-js";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";

import { getCookie } from "../../util/session";
import base64url from "base64url";
const API_KEY = "5b623d5355373a0a083a";

export default function Connection() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [userProfile, setUserProfile] = useState(null);
  const [notifType, setNotifType] = useState(null);
  const [clickedUser, setClickedUser] = useState(null);
  const [finalUserProfile, setFinalUserProfile] = useState(null);
  const [pusher, setPusher] = useState(null);

  const photoReadSignedRequest = useSelector(
    state => state.home.photoReadSignedRequest
  );
  const actionsStatus = useSelector(state => state.home.actionsStatus);
  const ClickedUserChat = useSelector(state => state.messages.clickedUserChat);
  const connectionPusher = useSelector(
    state => state.auth.haveConnectionPusher
  );
  const connectionChannel = useSelector(
    state => state.auth.haveConnectionChannel
  );
  const conversationMessages = useSelector(
    state => state.messages.conversationMessages
  );

  const typingFlag = useSelector(state => state.messages.typingFlag);
  const typingTimer = useSelector(state => state.messages.typingTimer);

  useEffect(() => {
    const subActionsChanged = actionsStatus.slice(0, 3);
    const subActionsNotChanged = actionsStatus.slice(3, 5);
    if (
      connectionPusher == null &&
      connectionChannel == null &&
      subActionsChanged.every(action => {
        return action != null;
      }) &&
      subActionsNotChanged.every(action => {
        return action == null;
      })
    ) {
      Pusher.logToConsole = true;
      let authUrl = "http://128.199.32.156/api/requestnotificationconnection";
      const tokenValue = getCookie("access_token", false);
      let authorizer = (channel, options) => {
        return {
          authorize: (socketId, callback) => {
            fetch(authUrl, {
              method: "POST",
              crossDomain: true,
              xhrFields: {
                withCredentials: true
              },
              headers: new Headers({
                "Content-Type": "application/json",
                "Access-Control-Request-Headers": "x-requested-with",
                // "Access-Control-Allow-Origin": "*",
                Authorization: "Bearer " + tokenValue
              }),
              body: JSON.stringify({
                socket_id: socketId,
                channel_name: channel.name
              })
            })
              .then(res => {
                if (!res.ok) {
                  throw new Error(`Received ${res.statusCode} from ${authUrl}`);
                }
                return res.json();
              })
              .then(data => {
                if (data.code == "JWT_7") {
                  const NewTokenValue = getCookie("access_token", false);
                  // fetch(authUrl, {
                  //   method: "POST",
                  //   crossDomain: true,
                  //   xhrFields: {
                  //     withCredentials: true
                  //   },
                  //   headers: new Headers({
                  //     "Content-Type": "application/json",
                  //     "Access-Control-Request-Headers": "x-requested-with",
                  //     // "Access-Control-Allow-Origin": "*",
                  //     Authorization: "Bearer " + NewTokenValue
                  //   }),
                  //   body: JSON.stringify({
                  //     socket_id: socketId,
                  //     channel_name: channel.name
                  //   })
                  // }).then(res => {
                  //   if (!res.ok) {
                  //     throw new Error(
                  //       `Received ${res.statusCode} from ${authUrl}`
                  //     );
                  //   }
                  //   return res.json();
                  // });
                  authorizer(channel, callback);
                } else {
                  callback(null, data);
                }
              })
              .catch(err => {
                callback(new Error(`Error calling auth endpoint: ${err}`), {
                  auth: ""
                });
              });
          }
        };
      };
      setPusher(
        new Pusher(API_KEY, {
          cluster: "eu",
          authorizer: authorizer
        })
      );
      // if (connectionPusher == null) {
      dispatch(
        addConnectionFlag(
          "p",
          new Pusher(API_KEY, {
            cluster: "eu",
            authorizer: authorizer
          })
        )
      );
      dispatch(pusherActionDone());
    }
    // }
  }, [actionsStatus]);

  useEffect(() => {
    // const tokenValue = getCookie("access_token", false);
    if (connectionPusher && pusher && connectionChannel == null) {
      const tokenValue = getCookie("access_token", false);
      const tokenUserData = JSON.parse(
        base64url.decode(`${tokenValue}`.split(".")[1])
      );
      dispatch(
        addConnectionFlag(
          "ch",
          connectionPusher.subscribe(
            `private-${tokenUserData.co}_${tokenUserData.ci}_${tokenUserData.va}_${tokenUserData.id}_${tokenUserData.gd}_${tokenUserData.jnt}`
          )
        )
      );
    }
  }, [connectionPusher]);

  useEffect(() => {
    if (connectionChannel != null) {
      connectionChannel.bind("message", function(data) {
        // check if in router.pathname and the opened chat id == coming user'id
        if (router.pathname == "/home/messages") {
          setUserProfile(data.value);
          // setNotifType("m");
          // const co = data.value.substring(0, 2);
          // const ci = data.value.substring(3, 5).replace(/_/, "");
          // let va = 0;
          // ci.length == 1
          //   ? (va = data.value.substring(5, 7).replace(/_/, ""))
          //   : (va = data.value.substring(6, 8).replace(/_/, ""));

          // let userId = 0;
          // va.length == 1
          //   ? (userId = data.value
          //       .substring(7, data.value.length)
          //       .replace(/_/, ""))
          //   : (userId = data.value
          //       .substring(8, data.value.length)
          //       .replace(/_/, ""));

          // ///
          // userId = userId.replace(/_/, "");
          // console.log(
          //   "clickedUserChat **",
          //   ClickedUserChat,
          //   co,
          //   ci,
          //   va,
          //   userId
          // );

          // if (ClickedUserChat == null || ClickedUserChat.i != userId) {
          //   dispatch(resetMegsCovers());
          //   dispatch(readAllMessagesCovers("", ""));
          // }
        } else {
          dispatch(increaseMgsUnRCount());
        }
      });
      connectionChannel.bind("love", function(data) {
        dispatch(increaseCount("L"));
        //check type
        let user = JSON.parse(data.value[0]);
        user.cociva = data.cociva;
        if (data.type == "R") {
          user.t = "R";
          setNotifType("lr");
        } else if (data.type == "M") {
          user.t = "M";
          setNotifType("lm");
        }
        setUserProfile(user);

        //else if type==M
      });
      connectionChannel.bind("view", function(data) {
        let user = JSON.parse(data.value[0]);
        user.cociva = data.cociva;
        setUserProfile(user);
        setNotifType("v");
        dispatch(increaseCount("V"));
      });
      connectionChannel.bind("privatephoto", function(data) {
        //  fillData('privatephoto-container',data.value);

        //dispatch(increaseCount("P"));
        //setUserProfile(JSON.parse(data.value[0]));
        let user = JSON.parse(data.value[0]);
        user.cociva = data.cociva;
        setUserProfile(user);
        dispatch(increaseCount("P"));
        if (data.type == "R") {
          user.t = "R";
          setNotifType("pr");
        } else if (data.type == "A") {
          user.t = "A";
          setNotifType("pa");
        }
      });

      connectionChannel.bind("typing", function(data) {
        // if signal comed ---> write Typing
        if (data.data) {
          dispatch(setTypingMark(true));
          // console.log(
          //   "data from typing-----------------------> ",
          //   typingTimer
          //   // moment().diff(typingTimer, "seconds")
          // );
        } else if (
          !data.data
          // ||
          // (typingTimer != null && moment().diff(typingTimer, "seconds") >= 10)
        ) {
          // console.log(
          //   "data from typing-------false----------------> ",
          //   typingTimer
          //   // moment().diff(typingTimer, "seconds")
          // );
          //after 10s if no signal comed or come not_typing --->remove Typing
          dispatch(setTypingMark(false));
        }
      });

      connectionChannel.bind("disconnect_signal", function(data) {
        //  fillData('disconnectsignal-container',data.value);

        if (data.value == 1) {
          // const tokenValue = getCookie("access_token", false);
          // const tokenUserData = JSON.parse(
          //   base64url.decode(`${tokenValue}`.split(".")[1])
          // );
          // connectionPusher.unsubscribe(
          //   `private-${tokenUserData.co}_${tokenUserData.ci}_${tokenUserData.va}_${tokenUserData.id}_${tokenUserData.gd}_${tokenUserData.jnt}`
          // );

          connectionPusher.disconnect();
        }
      });

      // dispatch(addConnectionFlage());
    }
  }, [connectionChannel]);

  // useEffect(() => {
  //   if (typingFlag) {
  //     console.log("set typing timer ^^^^^^^^");
  //     dispatch(setTypingTimer(Date.now()));
  //   }
  // }, [typingFlag]);

  useEffect(() => {
    if (userProfile != null && userProfile.hasOwnProperty("_")) {
      dispatch(requestPhotoRead());
    } else if (userProfile != null && !userProfile.hasOwnProperty("_")) {
      setNotifType("m");
    }
  }, [userProfile]);

  useEffect(() => {
    if (photoReadSignedRequest != null && userProfile != null) {
      setFinalUserProfile(null);
      let finalUserProfile = "";
      finalUserProfile = mapSmallUserPhotoUrl(
        userProfile,
        photoReadSignedRequest.signedRequest
      );
      setFinalUserProfile(finalUserProfile);
    }
  }, [photoReadSignedRequest]);

  useEffect(() => {
    if (finalUserProfile != null) {
      if (notifType == "m") {
        // NotificationManager.success(
        //   <>
        //     {/* NotificationManager.success(`${finalUserProfile.n} saw your profile`); */}
        //     {/* <img src={finalUserProfile._} />
        // {finalUserProfile.n} saw your profil{" "} */}
        //     <Grid container>
        //       <Grid item xs={3}>
        //         <div className="notif-img">
        //           <div>
        //             <img src={finalUserProfile._} />
        //           </div>
        //         </div>
        //       </Grid>
        //       <Grid item xs={1}></Grid>
        //       <Grid item xs={8}>
        //         <Typography variant="body1" component="p">
        //           {finalUserProfile.n} sent massage for you
        //         </Typography>
        //       </Grid>
        //     </Grid>
        //   </>,
        //   "",
        //   250000
        // );
      } else if (notifType == "v") {
        NotificationManager.success(
          <>
            {/* NotificationManager.success(`${finalUserProfile.n} saw your profile`); */}
            {/* <img src={finalUserProfile._} />
            {finalUserProfile.n} saw your profil{" "} */}

            <Grid container>
              <Grid item xs={3}>
                <div className="notif-img">
                  <div>
                    <img src={finalUserProfile._} />
                  </div>
                </div>
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={8}>
                <Typography variant="body1" component="p">
                  <VisibilityIcon /> {finalUserProfile.n}{" "}
                  <IntlMessages id="notif.view" />
                </Typography>
              </Grid>
            </Grid>
          </>,
          "",
          250000
        );
        //dispatch(pushInNotificationViewPPLove("NV", finalUserProfile));
      } else if (notifType == "lr") {
        //if type ==LR ---> show notification uI and increase count of notification love ,(add to income to notification love list)
        NotificationManager.success(
          <>
            {/* `${finalUserProfile.n} sent love for you` */}
            {/* `${finalUserProfile.n} accepted your request for private photos` */}

            <Grid container>
              <Grid item xs={3}>
                <div className="notif-img">
                  <div>
                    <img src={finalUserProfile._} />
                  </div>
                </div>
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={8} className="item-text">
                <Typography variant="body1" component="p">
                  <FavoriteIcon /> {finalUserProfile.n}{" "}
                  <IntlMessages id="notif.loveReq" />
                </Typography>
              </Grid>
            </Grid>
          </>,
          "",
          250000
        );
        //dispatch(pushInNotificationViewPPLove("NL", finalUserProfile));
      } else if (notifType == "lm") {
        NotificationManager.success(
          <>
            {/* `${finalUserProfile.n} sent match love` */}

            <Grid container>
              <Grid item xs={3}>
                <div className="notif-img">
                  <div>
                    <img src={finalUserProfile._} />
                  </div>
                </div>
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid
                item
                xs={8}
                className="item-text"
                style={{ position: "relative" }}
              >
                <FavoriteIcon />{" "}
                <FavoriteBorderIcon
                  style={{ position: "absolute", left: "1rem" }}
                />
                <Typography variant="body1" component="p">
                  {finalUserProfile.n} <IntlMessages id="notif.loveMatch" />
                </Typography>
              </Grid>
            </Grid>
          </>,
          "",
          250000
        );
        // dispatch(pushInNotificationViewPPLove("NL", finalUserProfile));
      } else if (notifType == "pr") {
        NotificationManager.success(
          <>
            {/* NotificationManager.success(
                   `${finalUserProfile.n} sent request to access your private photos`
                 ); */}
            {/* <img src={finalUserProfile._} />
            {finalUserProfile.n} sent request to access your private photos{" "} */}

            <Grid container>
              <Grid item xs={3}>
                <div className="notif-img">
                  <div>
                    <img src={finalUserProfile._} />
                  </div>
                </div>
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={8} className="item-text">
                <Typography variant="body1" component="p">
                  <LockIcon /> {finalUserProfile.n}{" "}
                  <IntlMessages id="notif.ppReq" />
                </Typography>
              </Grid>
            </Grid>
          </>,
          "",
          2500000
        );
        // dispatch(pushInNotificationViewPPLove("NP", finalUserProfile));
      } else if (notifType == "pa") {
        NotificationManager.success(
          <>
            {/* `${finalUserProfile.n} accepted your request for private photos` */}

            <Grid container>
              <Grid item xs={3}>
                <div className="notif-img">
                  <div>
                    <img src={finalUserProfile._} />
                  </div>
                </div>
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={8} className="">
                <Typography variant="body1" component="p">
                  <LockOpenIcon /> {finalUserProfile.n}{" "}
                  <IntlMessages id="notif.ppAcc" />
                </Typography>
              </Grid>
            </Grid>
          </>,
          "",
          250000
        );
        // dispatch(pushInNotificationViewPPLove("NP", finalUserProfile));
      }
      setUserProfile(null);
      setFinalUserProfile(null);
    }
  }, [finalUserProfile]);

  useEffect(() => {
    if (ClickedUserChat != null) {
      setClickedUser(ClickedUserChat);
    }
  }, [ClickedUserChat]);

  useEffect(() => {
    if (notifType == "m") {
      const co = userProfile.substring(0, 2);
      const ci = userProfile.substring(3, 5).replace(/_/, "");
      let va = 0;
      ci.length == 1
        ? (va = userProfile.substring(5, 7).replace(/_/, ""))
        : (va = userProfile.substring(6, 8).replace(/_/, ""));

      let userId = 0;
      va.length == 1
        ? (userId = userProfile
            .substring(7, userProfile.length)
            .replace(/_/, ""))
        : (userId = userProfile
            .substring(8, userProfile.length)
            .replace(/_/, ""));

      ///
      userId = userId.replace(/_/, "");
      if (ClickedUserChat == null || ClickedUserChat.i != userId) {
        dispatch(resetMegsCovers());
        dispatch(readAllMessagesCovers("", ""));
      } else if (ClickedUserChat != null || ClickedUserChat.i == userId) {
        dispatch(resetMegsCovers());
        dispatch(readAllMessagesCovers("", ""));
        dispatch(clearConversationSuccess(true));
        dispatch(
          readConversation(
            ClickedUserChat.i,
            ClickedUserChat.co,
            ClickedUserChat.ci,
            ClickedUserChat.va,
            "",
            "",
            ""
          )
        );
      }
      setNotifType(null);
    }
  }, [notifType]);

  return (
    <>
      {/* className="notif-container"  */}
      <NotificationContainer />
    </>
  );
}
