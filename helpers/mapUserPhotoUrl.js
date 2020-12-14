export const mapUserPhotoUrl = (usersArr, signedRequest) => {
  if (Array.isArray(usersArr)) {
    if (signedRequest != null && usersArr.length != 0) {
      const newUsersArr = usersArr.map((e, i) => {
        if (!e._.includes("MP/")) {
          const editSignedRequest = signedRequest.replace(
            "MP/*?",
            `MP/${e._}?`
          );
          e._ = editSignedRequest;
        }
        return e;
      });
      return newUsersArr;
    }
  } else {
    if (signedRequest != null) {
      let editSignedRequest = "";
      if (!usersArr.includes("MP/")) {
        editSignedRequest = signedRequest.replace("MP/*?", `MP/${usersArr}?`);
      }
      return editSignedRequest;
    }
  }
};
