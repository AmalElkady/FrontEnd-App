import axios from "axios";
import { setCookie, removeCookie, getCookie } from "../util/session";
import base64url from "base64url";

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

profile.readMyProfile = function(params) {
  console.log("from profile service my profile ", params);

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
        console.log("data of my profile from service ", response);
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

profile.readMyPhotos = function(params) {
  console.log("from profile service my photo ", params);

  return new Promise(async (resolve, reject) => {
    try {
      const tokenValue = getCookie("access_token", false);
      const options = {
        url: `/readmyphotos?photo=${params}`,
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


profile.changePassword = function(oldPassword,newPassword) {
    //  "oldPassword" : "{{password}}",
    //     "newPassword" : "NewPassword#123"
  console.log("from change password service ",oldPassword,newPassword);
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
        console.log("response of change password ",response);
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


profile.changeUserLoginPhone = function(newPhone,password) {
    	// "newPhone" : "{{newphone}}",
	    // "password" : "{{password}}"
    console.log("from change phone service ",newPhone,password);
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
         newPhone,password
        }
      };

      let responseX = await callAxios(options);
      let response = responseX.data;

      if (response.response) {
        console.log("response of change phone ",response);
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

profile.verifyUserLoginPhoneChange=function(verifyTokenCode) {
    		//"verifyTokenCode" : "742036"

    console.log("from verify change phone service ",verifyTokenCode);
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
        console.log("response of verify change phone ",response);
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


profile.readMyPhoneAndMyPwData=function() {
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

        console.log("response read my phone and pw data ",response);
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



profile.readMyPaymentsAndSub=function(count,start,end) {
  // "count": "true",
	// "start": 0,
	// "end": 10
  console.log("from service read payments ",count,start,end)
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
        count,start,end
        }
      };

      let responseX = await callAxios(options);
      let response = responseX.data;

        console.log("response read my payments and sub ",response);
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



profile.requestPhotouploadPP=function(file,photoNum) {
  // "filetype" : "/png"
  console.log("from service rrequestPhotouploadPP ",file)
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
       	filetype :file.type,
        filesize :file.size
        }
      };

      let responseX = await callAxios(options);
      let response = responseX.data;

        console.log("response requestPhotouploadPP",response);
      if (response.signedRequest) {
                    const formData = new FormData();
                Object.keys(response.signedRequest.fields).forEach(key => {
                  formData.append(key, response.signedRequest[key]);
                });
                // Actual file has to be appended last.
                formData.append("file", file);
                const xhr = new XMLHttpRequest();
                xhr.open("POST", response.signedRequest.url, true);
                xhr.send(formData);
                xhr.onload = async function() {
                if(this.status === 204 ){
                console.log("trueeeeeeee pp 204");
                      resolve(true);
                 } else{
                reject(this.responseText);
                 }
                };
       // resolve(response);
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



profile.requestRemovePhotoPP=function(photoNum) {
  console.log("from service requestRemovePhotoPP ",photoNum)
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

        console.log("response requestRemovePhotoPP",response);
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
