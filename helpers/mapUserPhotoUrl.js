export const mapUserPhotoUrl = (usersArr, signedRequest) => {
  console.log("usersArr Url ", usersArr);
  if (signedRequest != null && usersArr.length != 0) {
    const newUsersArr = usersArr.map((e, i) => {
      if (!e._.includes("MP/")) {
        const editSignedRequest = signedRequest.replace("MP/*?", `MP/${e._}?`);
        e._ = editSignedRequest;
      }
      return e;
    });
    return newUsersArr;
  }
};
