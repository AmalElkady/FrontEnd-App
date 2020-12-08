import axios from "axios";
import { setCookie, removeCookie, getCookie } from "../util/session";
import { mapUserPhotoPath } from "../helpers/mapUserPhotoPath";
import { convertListToTwoArrays } from "../helpers/convertListToTwoArrays";

const profile = {};

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

profile.readProfileL2 = function(id, co, ci, va) {
  console.log("from profile service ", id, co, ci, va);

  // "profileid": "4bfdec53-7344-42d5-8966-d5d12eae85b2",
  // "country": "EG",
  // "city": "1",
  // "varea": "1"

  return new Promise(async (resolve, reject) => {
    try {
      const tokenValue = getCookie("access_token", false);
      const options = {
        url: "/readprofilel2",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: "Bearer " + tokenValue
        },
        data: {
          profileid: id,
          country: co,
          city: ci,
          varea: va
        }
      };

      let responseX = await callAxios(options);
      let response = responseX.data;

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

export { profile };
