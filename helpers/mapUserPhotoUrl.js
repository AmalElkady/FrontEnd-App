export const mapUserPhotoUrl = (usersArr, signedRequest) => {
  console.log("arr to map url ", usersArr);
  if (signedRequest != null) {
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
