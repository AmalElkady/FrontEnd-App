import axios from "axios";
import { setCookie, removeCookie, getCookie } from "../util/session";

const messages = {};

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
        if (response.data.token && response.data.status != "ACTIVE") {
          setCookie("access_token", response.data.token);

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

messages.sendMessage = function(profileid, country, city, varea, message) {
  console.log(
    "from messages service sendMessage ",
    profileid,
    country,
    city,
    varea,
    message
  );

  return new Promise(async (resolve, reject) => {
    try {
      const tokenValue = getCookie("access_token", false);
      const options = {
        url: "/sendmessage",
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
          varea,
          message
        }
      };

      let responseX = await callAxios(options);
      let response = responseX.data;

      console.log("sendmessage from service ", response);
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

messages.getMessagesTotalUrCount = function() {
  console.log("from messages service readmessagestotalurcount ");

  return new Promise(async (resolve, reject) => {
    try {
      const tokenValue = getCookie("access_token", false);
      const options = {
        url: "/readmessagestotalurcount",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: "Bearer " + tokenValue
        }
      };

      let responseX = await callAxios(options);
      let response = responseX.data;

      console.log("readmessagestotalurcount from service ", response);
      if (response.count) {
        resolve(response.count);
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

messages.readConversation = function(
  profileid,
  country,
  city,
  varea,
  scoreL,
  offset,
  limit
) {
  console.log(
    "from messages service readConversation ",
    profileid,
    country,
    city,
    varea,
    scoreL,
    offset,
    limit
  );

  return new Promise(async (resolve, reject) => {
    try {
      const tokenValue = getCookie("access_token", false);
      const options = {
        url: "/readconversation",
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
          varea,
          scoreL,
          offset,
          limit
        }
      };

      let responseX = await callAxios(options);
      let response = responseX.data;

      console.log("readConversation from service ", response);
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

export { messages };
