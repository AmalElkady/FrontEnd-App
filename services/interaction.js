import axios from "axios";
import { setCookie, removeCookie, getCookie } from "../util/session";
import Router from "next/router";
import { auth } from "../okta/okta";

const interaction = {};

let axiosRequest = axios.create({
  baseURL: "http://128.199.32.156/api/",
  responseType: "json"
});

let callAxios = options => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axiosRequest(options);
      console.log("**********data*********");
      console.log(response);
      console.log("**********data*********");

      if (!response.data) {
        resolve({ data: { message: "error" } });
      } else {
        console.log(
          "********** new token  response.data.token ",
          response.data.token
        );
        if (
          response.data.token &&
          (response.data.status != "ACTIVE" || response.data.status == null)
        ) {
          setCookie("access_token", response.data.token);
          console.log(
            "********** new token  response.data.token trueeeeeee ",
            response.data.token
          );
          if (response.data.verify) {
            resolve({ data: { response: "ok" } });
          } else if (response.data.signedRequest) {
            resolve({ data: { signedRequest: response.data.signedRequest } });
          } else {
            options.headers.Authorization = "Bearer " + response.data.token;
            response = await axiosRequest(options);
            resolve(response);
          }
        } else if (response.data.message) {
          if (response.data.message == "unauthorized") {
            console.log("**********Authorization*********");
            removeCookie("access_token");
            resolve({
              data: { code: "unauthorized", message: "unauthorized" }
            });
          } else if (response.data.code == "JWT_8") {
            console.log("**********expired token*********");
            // removeCookie("access_token");
            // auth.signOut();
            // Router.replace("/");
            resolve({
              data: { code: "JWT_8" }
            });
          } else if (response.data.code == "JWT_7") {
            console.log("**********expired token*********");
            resolve({
              data: { code: "JWT_7" }
            });
          } else {
            resolve(response);
          }
        } else {
          resolve(response);
        }
      }
    } catch (error) {
      console.log(error);
      resolve({ data: { message: "error" } });
    }
  }).catch(err => {
    console.log(err);
  });
};

interaction.requestPPAccessApproveRemove = function(
  action,
  profileid,
  country,
  city,
  varea
) {
  // "profileid": "1511edf6-5f16-4813-801f-a40ce8e355a2",
  // "country": "20",
  // "city": "1",
  // "varea": "1"

  console.log(
    "from service requestPPAccessApproveRemove ",
    action,
    profileid,
    country,
    city,
    varea
  );
  return new Promise(async (resolve, reject) => {
    try {
      const tokenValue = getCookie("access_token", false);
      const options = {
        url: `/requestppaccessapproveremove?action=${action}`,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: "Bearer " + tokenValue
        },
        data: {
          profileid,
          country,
          city,
          varea
        }
      };

      let responseX = await callAxios(options);
      let response = responseX.data;

      console.log("response requestppaccessapproveremove", response);
      if (response) {
        resolve(response);
      } else {
        resolve({ message: "no response !" });
      }
    } catch (err) {
      resolve({ message: err.message });
    }
  }).catch(err => {
    console.log(err);
  });
};

interaction.requestGetPhotoPPReadOutgoingRequestsApprovales = function(
  scoreH,
  offset
) {
  // "scoreH": "",
  // "offset": ""

  console.log("from service outgoing ", scoreH, offset);
  return new Promise(async (resolve, reject) => {
    try {
      const tokenValue = getCookie("access_token", false);
      const options = {
        url: `/getphotoppreadoutgoingrequestsapprovals`,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: "Bearer " + tokenValue
        },
        data: {
          scoreH,
          offset
        }
      };

      let responseX = await callAxios(options);
      let response = responseX.data;

      console.log("response outgoing", response);
      if (response) {
        resolve(response);
      } else {
        resolve({ message: "no response !" });
      }
    } catch (err) {
      resolve({ message: err.message });
    }
  }).catch(err => {
    console.log(err);
  });
};

interaction.requestGetPhotoReadPPIncomingApprovePendingRequests = function(
  action,
  scoreH,
  offset
) {
  // "scoreH": "",
  // "offset": ""

  console.log("from service incoming ", action, scoreH, offset);
  return new Promise(async (resolve, reject) => {
    try {
      const tokenValue = getCookie("access_token", false);
      const options = {
        url: `/getPhotoPPReadIncomingApprovedPendingRequests?action=${action}`,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: "Bearer " + tokenValue
        },
        data: {
          scoreH,
          offset
        }
      };

      let responseX = await callAxios(options);
      let response = responseX.data;

      console.log("response incoming", response);
      if (response) {
        resolve(response);
      } else {
        resolve({ message: "no response !" });
      }
    } catch (err) {
      resolve({ message: err.message });
    }
  }).catch(err => {
    console.log(err);
  });
};

interaction.sendLoveMatchRequest = function(profileid, country, city, varea) {
  // "profileid": "1511edf6-5f16-4813-801f-a40ce8e355a2",
  // "country": "20",
  // "city": "1",
  // "varea": "1"

  console.log(
    "from service sendLoveMatchRequest ",
    profileid,
    country,
    city,
    varea
  );
  return new Promise(async (resolve, reject) => {
    try {
      const tokenValue = getCookie("access_token", false);
      const options = {
        url: `/sendlovematchrequest`,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: "Bearer " + tokenValue
        },
        data: {
          profileid,
          country,
          city,
          varea
        }
      };

      let responseX = await callAxios(options);
      let response = responseX.data;

      console.log("response sendlovematchrequest", response);
      if (response) {
        resolve(response);
      } else {
        resolve({ message: "no response !" });
      }
    } catch (err) {
      resolve({ message: err.message });
    }
  }).catch(err => {
    console.log(err);
  });
};

interaction.getLoveSentRequests = function(scoreH, offset) {
  // "scoreH": "",
  // "offset": ""

  console.log("from service getLoveSentRequests ", scoreH, offset);
  return new Promise(async (resolve, reject) => {
    try {
      const tokenValue = getCookie("access_token", false);
      const options = {
        url: `/getlovesentrequests`,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: "Bearer " + tokenValue
        },
        data: {
          scoreH,
          offset
        }
      };

      let responseX = await callAxios(options);
      let response = responseX.data;

      console.log("response getlovesentrequests", response);
      if (response) {
        resolve(response);
      } else {
        resolve({ message: "no response !" });
      }
    } catch (err) {
      resolve({ message: err.message });
    }
  }).catch(err => {
    console.log(err);
  });
};

interaction.getLoveMatchedAndReceivedRequests = function(
  action,
  scoreH,
  offset
) {
  // "scoreL": "",
  //  "scoreH":""
  // "offset": ""

  let scoreL = "";
  if (action === 1) {
    scoreL = scoreH;
    scoreH = "";
  }
  console.log(
    "from service getLoveMatchedAndReceivedRequests ",
    scoreH,
    scoreL,
    offset
  );
  return new Promise(async (resolve, reject) => {
    try {
      const tokenValue = getCookie("access_token", false);
      const options = {
        url: `/getlovematchedandreceivedrequests?action=${action}`,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: "Bearer " + tokenValue
        },
        data: {
          scoreH,
          scoreL,
          offset
        }
      };

      let responseX = await callAxios(options);
      let response = responseX.data;

      console.log("response getlovematchedandreceivedrequests", response);
      if (response) {
        resolve(response);
      } else {
        resolve({ message: "no response !" });
      }
    } catch (err) {
      resolve({ message: err.message });
    }
  }).catch(err => {
    console.log(err);
  });
};

interaction.getUserViews = function(start, end) {
  // "scoreH": "",
  // "offset": 0

  console.log("from service getuserviews ", start, end);
  return new Promise(async (resolve, reject) => {
    try {
      const tokenValue = getCookie("access_token", false);
      const options = {
        url: `/getuserviews`,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: "Bearer " + tokenValue
        },
        data: {
          scoreH: start,
          offset: end
        }
      };

      let responseX = await callAxios(options);
      let response = responseX.data;

      console.log("response getuserviews", response);
      if (response) {
        resolve(response);
      } else if (response.code) {
        resolve({ profiles: "", dates: "", order: "" });
      } else {
        resolve({ message: "no response !" });
      }
    } catch (err) {
      resolve({ message: err.message });
    }
  }).catch(err => {
    console.log(err);
  });
};

interaction.blockUser = function(profileid, country, city, varea) {
  // "profileid": "1511edf6-5f16-4813-801f-a40ce8e355a2",
  // "country": "20",
  // "city": "1",
  // "varea": "1"

  console.log("from service blockuser ", profileid, country, city, varea);
  return new Promise(async (resolve, reject) => {
    try {
      const tokenValue = getCookie("access_token", false);
      const options = {
        url: `/blockuser`,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: "Bearer " + tokenValue
        },
        data: {
          profileid,
          country,
          city,
          varea
        }
      };

      let responseX = await callAxios(options);
      let response = responseX.data;

      console.log("response blockuser", response);
      if (response) {
        resolve(response);
      } else {
        resolve({ message: "no response !" });
      }
    } catch (err) {
      resolve({ message: err.message });
    }
  }).catch(err => {
    console.log(err);
  });
};

interaction.unblockUser = function(profileid, country, city, varea) {
  // "profileid": "1511edf6-5f16-4813-801f-a40ce8e355a2",
  // "country": "EG",
  // "city": "1",
  // "varea": "1"

  console.log("from service unblockuser ", profileid, country, city, varea);
  return new Promise(async (resolve, reject) => {
    try {
      const tokenValue = getCookie("access_token", false);
      const options = {
        url: `/unblockuser`,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: "Bearer " + tokenValue
        },
        data: {
          profileid,
          country,
          city,
          varea
        }
      };

      let responseX = await callAxios(options);
      let response = responseX.data;

      console.log("response unblockuser", response);
      if (response) {
        resolve(response);
      } else {
        resolve({ message: "no response !" });
      }
    } catch (err) {
      resolve({ message: err.message });
    }
  }).catch(err => {
    console.log(err);
  });
};

interaction.getBlockedUsers = function(scoreH, offset) {
  // "scoreH": "",
  // "offset": ""

  console.log("from service getblockedusers ", scoreH, offset);
  return new Promise(async (resolve, reject) => {
    try {
      const tokenValue = getCookie("access_token", false);
      const options = {
        url: `/getblockedusers`,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: "Bearer " + tokenValue
        },
        data: {
          scoreH,
          offset
        }
      };

      let responseX = await callAxios(options);
      let response = responseX.data;

      console.log("response getblockedusers", response);
      if (response) {
        resolve(response);
      } else {
        resolve({ message: "no response !" });
      }
    } catch (err) {
      resolve({ message: err.message });
    }
  }).catch(err => {
    console.log(err);
  });
};

interaction.getNotificationViewPPLove = function(
  unread,
  viewScoreHigh,
  ppScoreHigh,
  loveScoreHigh,
  offset
) {
  // "viewScoreHigh": "",
  // "ppScoreHigh": "",
  // "loveScoreHigh": "",
  // "offset": ""

  console.log(
    "from service getNotificationViewPPLove ",
    unread,
    viewScoreHigh,
    ppScoreHigh,
    loveScoreHigh,
    offset
  );
  return new Promise(async (resolve, reject) => {
    try {
      const tokenValue = getCookie("access_token", false);
      const options = {
        url: `getnotificationviewpplove?unread=${unread}`,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: "Bearer " + tokenValue
        },
        data: {
          viewScoreHigh,
          ppScoreHigh,
          loveScoreHigh,
          offset
        }
      };

      let responseX = await callAxios(options);
      let response = responseX.data;

      console.log("response getNotificationViewPPLove", response);
      if (response) {
        if (response.code == "JWT_7") {
          const tokenValueNew = getCookie("access_token", false);
          console.log(
            "response getNotificationViewPPLove tokenValue!=tokenValueNew ",
            tokenValue,
            tokenValueNew
          );
          if (tokenValue != tokenValueNew) {
            console.log(
              "response tokenValue!=tokenValueNew ",
              tokenValue,
              tokenValueNew
            );
            // hole 2s then
            setTimeout(() => {
              console.log("from  hold 2s");
              interaction.getNotificationViewPPLove(
                unread,
                viewScoreHigh,
                ppScoreHigh,
                loveScoreHigh,
                offset
              );
            }, 2000);
          } else {
            console.log(
              "response tokenValue==tokenValueNew ",
              tokenValue,
              tokenValueNew
            );
          }
        } else if (response.code == "JWT_8") {
          console.log("resolve jwt_8");
          resolve({ error_jwt8: "true" });
        } else {
          resolve(response);
        }
      } else {
        resolve({ message: "no response !" });
      }
    } catch (err) {
      resolve({ message: err.message });
    }
  }).catch(err => {
    console.log(err);
  });
};

interaction.cleanNotificationViewPPLove = function(
  remove,
  viewScoreLow,
  viewScoreHigh,
  ppScoreLow,
  ppScoreHigh,
  loveScoreLow,
  loveScoreHigh
) {
  // "viewScoreLow":"",
  // "viewScoreHigh": "",
  // "ppScoreLow":"",
  // "ppScoreHigh": "",
  // "loveScoreLow":"",
  // "loveScoreHigh": ""

  console.log(
    "from service getNotificationViewPPLove ",
    remove,
    viewScoreLow,
    viewScoreHigh,
    ppScoreLow,
    ppScoreHigh,
    loveScoreLow,
    loveScoreHigh
  );
  return new Promise(async (resolve, reject) => {
    try {
      const tokenValue = getCookie("access_token", false);
      const options = {
        url: `getnotificationviewpplove?remove=${remove}`,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: "Bearer " + tokenValue
        },
        data: {
          viewScoreLow,
          viewScoreHigh,
          ppScoreLow,
          ppScoreHigh,
          loveScoreLow,
          loveScoreHigh
        }
      };

      let responseX = await callAxios(options);
      let response = responseX.data;

      console.log("response cleanNotificationViewPPLove", response);
      if (response) {
        resolve(response);
      } else {
        resolve({ message: "no response !" });
      }
    } catch (err) {
      resolve({ message: err.message });
    }
  }).catch(err => {
    console.log(err);
  });
};

export { interaction };
