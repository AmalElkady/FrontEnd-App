import axios from "axios";
import { setCookie, removeCookie, getCookie } from "../util/session";
//import Pusher from "pusher-client";
import base64url from "base64url";
import Router from "next/router";
import { auth } from "../okta/okta";
import IntlMessages from "../util/IntlMessages";
const profile = {};

let axiosRequest = axios.create({
  baseURL: "http://128.199.32.156/api/",
  responseType: "json"
});

let callAxios = options => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axiosRequest(options);

      if (!response.data) {
        resolve({ data: { message: "error" } });
      } else {
        if (
          response.data.token &&
          (response.data.status != "ACTIVE" || response.data.status == null)
        ) {
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
            removeCookie("access_token");
            resolve({
              data: { code: "unauthorized", message: "unauthorized" }
            });
          } else if (
            // response.data.code == "JWT_7" ||
            response.data.code == "JWT_8"
          ) {
            //removeCookie("access_token");
            //auth.signOut();
            // Router.replace("/");
          } else if (response.data.code == "TIME") {
            resolve({ data: response.data });
          } else {
            resolve(response);
          }
        } else if (response.data.error) {
          resolve({ data: { message: "error" } });
        } else {
          resolve(response);
        }
      }
    } catch (error) {
      resolve({ data: { message: "error" } });
    }
  }).catch(err => {
    console.log(err);
  });
};

profile.readPhotosPP = function(id, co, ci, va) {
  return new Promise(async (resolve, reject) => {
    try {
      const tokenValue = getCookie("access_token", false);
      const options = {
        url: "/requestphotoread?photo=1",
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

profile.readProfileL2 = function(id, co, ci, va) {
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

profile.readMyProfile = function(params) {
  return new Promise(async (resolve, reject) => {
    try {
      const tokenValue = getCookie("access_token", false);
      const options = {
        url: `/readmyprofile?profile=${params}`,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: "Bearer " + tokenValue
        }
      };

      let responseX = await callAxios(options);
      let response = responseX.data;

      if (response) {
        if (params == "L1") {
          response.profile.L1 = JSON.parse(response.profile.L1);
        }
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

profile.readMyPhotos = function(params, size) {
  return new Promise(async (resolve, reject) => {
    try {
      const tokenValue = getCookie("access_token", false);
      const options = {
        url: `/readmyphotos?photo=${params}&size=${size}`,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: "Bearer " + tokenValue
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

profile.updateProfileL1 = function(martial) {
  // "martial": "2"

  return new Promise(async (resolve, reject) => {
    try {
      const tokenValue = getCookie("access_token", false);
      const options = {
        url: `/addupdateprofile?update=L1`,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: "Bearer " + tokenValue
        },
        data: {
          martial
        }
      };

      let responseX = await callAxios(options);
      let response = responseX.data;

      if (response) {
        resolve(response.response);
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

profile.updateProfileL2 = function(na, tpercent, title, workd, edu, bio) {
  // "nationality": "",
  //  "tpercent": "",
  //  "title" :  "",
  //  "workd": "",
  //  "education": "",
  //  "bio": ""
  return new Promise(async (resolve, reject) => {
    try {
      const tokenValue = getCookie("access_token", false);
      const options = {
        url: `/addupdateprofile?update=L2`,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: "Bearer " + tokenValue
        },
        data: {
          nationality: na,
          tpercent,
          title,
          workd,
          education: edu,
          bio
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

profile.changePassword = function(oldPassword, newPassword) {
  //  "oldPassword" : "{{password}}",
  //     "newPassword" : "NewPassword#123"

  return new Promise(async (resolve, reject) => {
    try {
      const tokenValue = getCookie("access_token", false);
      const options = {
        url: `/changepassword`,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: "Bearer " + tokenValue
        },
        data: {
          oldPassword,
          newPassword
        }
      };

      let responseX = await callAxios(options);
      let response = responseX.data;

      if (response.response) {
        resolve(response.response);
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

profile.changeUserLoginPhone = function(newPhone, password) {
  // "newPhone" : "{{newphone}}",
  // "password" : "{{password}}"
  return new Promise(async (resolve, reject) => {
    try {
      const tokenValue = getCookie("access_token", false);
      const options = {
        url: `/changeuserloginphone`,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: "Bearer " + tokenValue
        },
        data: {
          newPhone,
          password
        }
      };

      let responseX = await callAxios(options);
      let response = responseX.data;

      if (response.response) {
        resolve(response.response);
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

profile.verifyUserLoginPhoneChange = function(verifyTokenCode) {
  //"verifyTokenCode" : "742036"
  return new Promise(async (resolve, reject) => {
    try {
      const tokenValue = getCookie("access_token", false);
      const options = {
        url: `/verifyuserphonechange`,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: "Bearer " + tokenValue
        },
        data: {
          verifyTokenCode
        }
      };

      let responseX = await callAxios(options);
      let response = responseX.data;

      if (response.response) {
        resolve(response.response);
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

profile.readMyPhoneAndMyPwData = function() {
  return new Promise(async (resolve, reject) => {
    try {
      const tokenValue = getCookie("access_token", false);
      const options = {
        url: `/readmyphoneandpwdata`,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: "Bearer " + tokenValue
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

profile.readMyPaymentsAndSub = function(count, start, end) {
  // "count": "true",
  // "start": 0,
  // "end": 10

  return new Promise(async (resolve, reject) => {
    try {
      const tokenValue = getCookie("access_token", false);
      const options = {
        url: `/readmypaymentsandsub`,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: "Bearer " + tokenValue
        },
        data: {
          count,
          start,
          end
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

profile.requestPhotouploadPP = function(file, photoNum) {
  // "filetype" : "/png"

  return new Promise(async (resolve, reject) => {
    try {
      const tokenValue = getCookie("access_token", false);
      const options = {
        url: `/requestphotoupload?photo=${photoNum}`,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: "Bearer " + tokenValue
        },
        data: {
          filetype: `${file.type}`.slice(5),
          filesize: file.size
        }
      };
      let responseX = await callAxios(options);

      if (responseX.data.code) {
        resolve({ message: responseX.data.code });
      } else if (responseX.data.signedRequest) {
        const formData = new FormData();
        Object.keys(responseX.data.signedRequest.fields).forEach(key => {
          formData.append(key, responseX.data.signedRequest.fields[key]);
        });
        // Actual file has to be appended last.
        formData.append("file", file);
        const xhr = new XMLHttpRequest();
        xhr.open("POST", responseX.data.signedRequest.url, true);
        xhr.send(formData);
        xhr.onload = async function() {
          if (this.status === 204) {
            // optionsCheck.url = "/checkmpupload";
            //           await callAxios(optionsCheck);
            resolve(true);
          } else {
            reject(this.responseText);
          }
        };
      } else {
        resolve({ message: "Error" });
      }

      // console.log("response requestPhotouploadPP", response);
      // if (response.signedRequest) {
      //   const formData = new FormData();
      //   Object.keys(response.signedRequest.fields).forEach(key => {
      //     formData.append(key, response.signedRequest[key]);
      //   });
      //   // Actual file has to be appended last.
      //   formData.append("file", file);
      //   const xhr = new XMLHttpRequest();
      //   xhr.open("POST", response.signedRequest.url, true);
      //   xhr.send(formData);
      //   xhr.onload = async function() {
      //     if (this.status === 204) {
      //       console.log("trueeeeeeee pp 204");
      //       resolve(true);
      //     } else {
      //       reject(this.responseText);
      //     }
      //   };
      //   // resolve(response);
      // } else {
      //   resolve({ message: "no response !" });
      // }
    } catch (err) {
      resolve({ message: err.message });
    }
  }).catch(err => {
    console.log(err);
  });
};

profile.requestRemovePhotoPP = function(photoNum) {
  return new Promise(async (resolve, reject) => {
    try {
      const tokenValue = getCookie("access_token", false);
      const options = {
        url: `/requestremovephoto?photo=${photoNum}`,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: "Bearer " + tokenValue
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

profile.requestPermissionPPReadRemove = function(
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

  return new Promise(async (resolve, reject) => {
    try {
      const tokenValue = getCookie("access_token", false);
      const options = {
        url: `/requestpermissionppreadaddremove?action=${action}`,
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

profile.updateMainPhoto = function(file) {
  return new Promise(async (resolve, reject) => {
    if (file) {
      try {
        //http:// /api/checkmpupload
        //http:// /api/requestphotoupload?photo=0
        const tokenValue = getCookie("access_token", false);

        let optionsCheck = {
          url: "/requestphotoupload?photo=0",
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
            Authorization: "Bearer " + tokenValue
          },
          data: {
            filetype: `${file.type}`.slice(5),
            filesize: file.size
          }
        };
        // optionsCheck.url = "/requestphotoupload?photo=0";
        // optionsCheck.data = {'filetype':`${file.type}`.slice(5), 'filesize': file.size/*file.size*/}

        let checkUploadRequestResponse = await callAxios(optionsCheck);

        if (checkUploadRequestResponse.data.code) {
          resolve({ message: checkUploadRequestResponse.data.code });
        } else if (checkUploadRequestResponse.data.signedRequest) {
          //upload file axios

          const formData = new FormData();
          Object.keys(
            checkUploadRequestResponse.data.signedRequest.fields
          ).forEach(key => {
            formData.append(
              key,
              checkUploadRequestResponse.data.signedRequest.fields[key]
            );
          });
          // Actual file has to be appended last.
          formData.append("file", file);
          const xhr = new XMLHttpRequest();
          xhr.open(
            "POST",
            checkUploadRequestResponse.data.signedRequest.url,
            true
          );
          xhr.send(formData);
          xhr.onload = async function() {
            if (this.status === 204) {
              optionsCheck.url = "/checkmpupload";
              await callAxios(optionsCheck);
              resolve(true);
            } else {
              reject(this.responseText);
            }
          };

          // console.log("imageUploadResult ",imageUploadResult);

          // if(imageUploadResult.data.message){
          // resolve({"message": imageUploadResult.data.message});
          // }else{
          // 	optionsCheck.url = "/checkmpupload";
          // 	await callAxios(optionsCheck);
          // 	resolve(true);
          // }
          //when resolve true refresh page (MPUpload)
          //when resolve true in create user refresh page (SignUp)

          //   } else {
          //   resolve({"message": "Error"});
          // }
        } else {
          resolve({ message: checkMPUploadResponse.data.code });
        }
      } catch (err) {
        resolve({ message: err });
      }
    } else {
      resolve({ message: "empty values not allowed !" });
    }
  }).catch(err => {
    console.log(err);
  });
};

profile.deleteMyAccount = function(password, score, key) {
  console.log("from services ", password);
  return new Promise(async (resolve, reject) => {
    try {
      const tokenValue = getCookie("access_token", false);
      const options = {
        url: `/deleteaccount`,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: "Bearer " + tokenValue
        },
        data: {
          password,
          score,
          key
        }
      };

      let responseX = await callAxios(options);
      let response = responseX.data;
      console.log("response from delete ", response);
      if (response.response) {
        resolve(response.response);
      } else if (response.code === "DELETEACCOUNT_14") {
        resolve({ message: <IntlMessages id="error.notCorrectPass" /> });
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

profile.pusherAuth = function() {
  // Enable pusher logging - don't include this in production
  // Pusher.logToConsole = true;

  let authUrl = "/api/requestnotoficationconnection";
  const tokenValue = getCookie("access_token", false);
  let authorizer = (channel, options) => {
    return {
      authorize: (socketId, callback) => {
        fetch(authUrl, {
          method: "POST",
          headers: new Headers(
            // { "Content-Type": "application/json", 'Authorization': "Bearer 0A08DACEF62A50AB89EA8188ABABAFBD6DD94909A78A5BCC089A9E764DC3A866" }

            {
              Accept: "application/json",
              "Content-Type": "application/json;charset=UTF-8",
              Authorization: "Bearer " + tokenValue
            }
          ),
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
            callback(null, data);
          })
          .catch(err => {
            callback(new Error(`Error calling auth endpoint: ${err}`), {
              auth: ""
            });
          });
      }
    };
  };
  return authorizer;
};

export { profile };
