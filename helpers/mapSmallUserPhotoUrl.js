export const mapSmallUserPhotoUrl = (usersArr, signedRequest) => {
  console.log("usersArr ", usersArr);
  if (Array.isArray(usersArr)) {
    if (signedRequest != null && usersArr.length != 0) {
      const newUsersArr = usersArr.map((e, i) => {
        // e = JSON.parse(e);
        if (e != null) {
          if (!e._.includes("MP/")) {
            e._ = e._.replace(".jpeg", ".jpg");
            const editSignedRequest = signedRequest.replace(
              "MP/*?",
              `MP/${e.co}_${e.ci}_${e.va}/${e.i}_49x49${e._}?`
            );
            e._ = editSignedRequest;
          }
          return e;
        }
      });
      return newUsersArr;
    }
  } else if (typeof usersArr === "object" && usersArr !== null) {
    console.log("object to map******");
    if (signedRequest != null) {
      if (!usersArr._.includes("MP/")) {
        usersArr._ = usersArr._.replace(".jpeg", ".jpg");
        const editSignedRequest = signedRequest.replace(
          "MP/*?",
          `MP/${usersArr.cociva}/${usersArr.i}_49x49${usersArr._}?`
        );
        usersArr._ = editSignedRequest;
      }
      return usersArr;
    }
  }
};
