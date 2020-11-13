export const mapUserPhotoUrl = (usersArr, signedRequest) => {
  console.log("signedRequest ", signedRequest);
  console.log("usersArrsigned ", usersArr);
  if (signedRequest != null) {
    const newUsersArr = usersArr.map((e, i) => {
      if (i % 2 == 0) {
        console.log(`e._ : ${e._}`);
        signedRequest = signedRequest.replace("MP/*?", `MP/${e._}?`);
        console.log(`signedRequestEdit${i} : ${signedRequest}`);
        e._ = signedRequest;
      }
      return e;
    });
    return newUsersArr;
  }
};
