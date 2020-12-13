import { getCookie } from "../util/session";
import base64url from "base64url";
export const addUserGender = usersArr => {
  let token = getCookie("access_token");
  let tokenUserData = JSON.parse(base64url.decode(token.split(".")[1]));
  if (tokenUserData.gd == 1) {
    usersArr.forEach(e => {
      e.gd = 0;
    });
  } else {
    usersArr.forEach(e => {
      e.gd = 1;
    });
  }
  return usersArr;
};
